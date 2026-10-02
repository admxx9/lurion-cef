importScripts('vehicleNodes.js?v=worker2');

const NODES = globalThis.LURION_GPS_NODES;
const AREAS = globalThis.LURION_GPS_AREAS;

class MinHeap {
  constructor() { this.a = []; }
  push(item) {
    const a = this.a;
    a.push(item);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (a[p][0] <= item[0]) break;
      a[i] = a[p];
      i = p;
    }
    a[i] = item;
  }
  pop() {
    const a = this.a;
    if (!a.length) return null;
    const root = a[0];
    const last = a.pop();
    if (a.length) {
      let i = 0;
      while (true) {
        const l = i * 2 + 1;
        const r = l + 1;
        let c = i;
        if (l < a.length && a[l][0] < last[0]) c = l;
        if (r < a.length && a[r][0] < (c === i ? last[0] : a[l][0])) c = r;
        if (c === i) break;
        a[i] = a[c];
        i = c;
      }
      a[i] = last;
    }
    return root;
  }
  get length() { return this.a.length; }
}

function areaId(x, y) {
  const ax = Math.floor((x + 3000) / 750);
  const ay = Math.floor((y + 3000) / 750);
  if (ax < 0 || ax > 7 || ay < 0 || ay > 7) return -1;
  return ax + ay * 8;
}

function closestNode(x, y) {
  const base = areaId(x, y);
  if (base < 0) return null;

  const bx = base % 8;
  const by = Math.floor(base / 8);
  let best = null;
  let bestD = Infinity;

  for (let oy = -1; oy <= 1; oy++) {
    for (let ox = -1; ox <= 1; ox++) {
      const ax = bx + ox;
      const ay = by + oy;
      if (ax < 0 || ax > 7 || ay < 0 || ay > 7) continue;
      const ids = AREAS[ax + ay * 8] || [];

      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const n = NODES[id];
        if (!n) continue;
        const dx = n[0] - x;
        const dy = n[1] - y;
        const d = dx * dx + dy * dy;
        if (d < bestD) {
          bestD = d;
          best = Number(id);
        }
      }
    }
  }
  return best;
}

function calculatePath(startX, startY, endX, endY) {
  const start = closestNode(startX, startY);
  const end = closestNode(endX, endY);
  if (start == null || end == null) return null;

  const heap = new MinHeap();
  const dist = Object.create(null);
  const prev = Object.create(null);
  const done = Object.create(null);

  dist[start] = 0;
  heap.push([0, start]);

  while (heap.length) {
    const item = heap.pop();
    const d = item[0];
    const id = item[1];

    if (done[id]) continue;
    done[id] = 1;
    if (id === end) break;

    const node = NODES[id];
    if (!node) continue;
    const edges = node[2];

    for (let i = 0; i < edges.length; i++) {
      const nid = edges[i][0];
      if (done[nid]) continue;
      const nd = d + Number(edges[i][1]);
      if (dist[nid] === undefined || nd < dist[nid]) {
        dist[nid] = nd;
        prev[nid] = id;
        heap.push([nd, nid]);
      }
    }
  }

  if (!done[end]) return null;

  const ids = [];
  let cur = end;
  while (cur !== undefined) {
    ids.push(cur);
    if (cur === start) break;
    cur = prev[cur];
  }
  if (ids[ids.length - 1] !== start) return null;
  ids.reverse();

  const route = new Array(ids.length + 1);
  for (let i = 0; i < ids.length; i++) {
    const n = NODES[ids[i]];
    route[i] = [n[0], n[1]];
  }
  route[route.length - 1] = [endX, endY];
  return route;
}

self.onmessage = function (event) {
  const d = event.data || {};
  if (d.type !== 'route') return;

  try {
    const started = Date.now();
    const route = calculatePath(d.startX, d.startY, d.endX, d.endY);
    self.postMessage({
      type: 'route',
      request: d.request,
      route: route,
      ms: Date.now() - started
    });
  } catch (error) {
    self.postMessage({
      type: 'route',
      request: d.request,
      route: null,
      error: String(error && error.message ? error.message : error)
    });
  }
};

