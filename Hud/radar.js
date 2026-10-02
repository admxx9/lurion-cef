const lurionRadar = {
  visible: false,
  x: 0,
  y: 0,
  heading: 0,
  speed: 0,
  raf: 0,
  arrow: new Image(),
  target: new Image(),
  destination: null,
  route: [],
  routeProgress: 0,
  routeRequest: 0,
  gpsNodesPromise: null,
  gpsWorker: null,
  worldCssSize: 0,
  routeCanvasVisible: false
};

const LURION_RADAR_MAP_WIDTH = 2048;
const LURION_RADAR_MAP_HEIGHT = 3072;
const LURION_RADAR_WORLD_MIN_X = -4140;
const LURION_RADAR_WORLD_MAX_X = 4860;
const LURION_RADAR_WORLD_MIN_Y = -5100;
const LURION_RADAR_WORLD_MAX_Y = 8400;
const LURION_RADAR_WORLD_WIDTH = LURION_RADAR_WORLD_MAX_X - LURION_RADAR_WORLD_MIN_X;
const LURION_RADAR_WORLD_HEIGHT = LURION_RADAR_WORLD_MAX_Y - LURION_RADAR_WORLD_MIN_Y;
const LURION_RADAR_RT_SIZE = 260;
const LURION_ROUTE_COLOR = '#ae00ff';
function lurionCefEmit(name, ...args) {
  try {
    if (window.cef && typeof cef.emit === 'function') cef.emit(name, ...args);
  } catch (e) {}
}

function lurionCefOn(name, callback) {
  try {
    if (window.cef && typeof cef.on === 'function') cef.on(name, callback);
  } catch (e) {}
}
function lurionRadarWorldToMap(x, y) {
  return {
    x: ((Number(x) - LURION_RADAR_WORLD_MIN_X) / LURION_RADAR_WORLD_WIDTH) * LURION_RADAR_MAP_WIDTH,
    y: ((LURION_RADAR_WORLD_MAX_Y - Number(y)) / LURION_RADAR_WORLD_HEIGHT) * LURION_RADAR_MAP_HEIGHT
  };
}

function lurionRadarMapToWorld(mx, my) {
  return {
    x: LURION_RADAR_WORLD_MIN_X + (mx / LURION_RADAR_MAP_WIDTH) * LURION_RADAR_WORLD_WIDTH,
    y: LURION_RADAR_WORLD_MAX_Y - (my / LURION_RADAR_MAP_HEIGHT) * LURION_RADAR_WORLD_HEIGHT
  };
}

function lurionRadarSetVisible(show) {
  lurionRadar.visible = !!show;
  const el = document.getElementById('lurion-radar');
  if (el) el.classList.toggle('active', lurionRadar.visible);
  if (!lurionRadar.visible && lurionBigMap.open) lurionBigMapClose();
}

function lurionMiniMapPoint(worldX, worldY, wantedX, wantedY, sourceSpan) {
  const mp = lurionRadarWorldToMap(worldX, worldY);
  return {
    x: ((mp.x - wantedX) / sourceSpan) * LURION_RADAR_RT_SIZE,
    y: ((mp.y - wantedY) / sourceSpan) * LURION_RADAR_RT_SIZE
  };
}

function lurionUpdateRouteProgress() {
  if (!lurionRadar.route.length) return;
  let bestIndex = lurionRadar.routeProgress;
  let bestDist = Infinity;
  const start = Math.max(0, lurionRadar.routeProgress - 2);
  const end = Math.min(lurionRadar.route.length - 1, lurionRadar.routeProgress + 45);
  for (let i = start; i <= end; i++) {
    const p = lurionRadar.route[i];
    const dx = p[0] - lurionRadar.x;
    const dy = p[1] - lurionRadar.y;
    const d = dx * dx + dy * dy;
    if (d < bestDist) {
      bestDist = d;
      bestIndex = i;
    }
  }
  if (bestDist < 180 * 180 && bestIndex > lurionRadar.routeProgress) {
    lurionRadar.routeProgress = bestIndex;
  }
}

function lurionDrawMiniRoute(ctx, wantedX, wantedY, sourceSpan) {
  if (!lurionRadar.destination) return;

  if (lurionRadar.route.length) {
    lurionUpdateRouteProgress();
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = LURION_ROUTE_COLOR;
    ctx.lineWidth = 7;

    const first = lurionMiniMapPoint(lurionRadar.x, lurionRadar.y, wantedX, wantedY, sourceSpan);
    ctx.moveTo(first.x, first.y);
    for (let i = lurionRadar.routeProgress; i < lurionRadar.route.length; i++) {
      const p = lurionRadar.route[i];
      const c = lurionMiniMapPoint(p[0], p[1], wantedX, wantedY, sourceSpan);
      ctx.lineTo(c.x, c.y);
    }
    ctx.stroke();
  }

  const dest = lurionMiniMapPoint(
    lurionRadar.destination.x,
    lurionRadar.destination.y,
    wantedX,
    wantedY,
    sourceSpan
  );
  ctx.fillStyle = LURION_ROUTE_COLOR;
  ctx.beginPath();
  ctx.arc(dest.x, dest.y, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 3;
  ctx.stroke();
}
function lurionRadarRefreshSize() {
  const world = document.getElementById('lurion-radar-world');
  if (!world) return;
  lurionRadar.worldCssSize = world.clientWidth || 346;
}

function lurionRadarDraw() {
  lurionRadar.raf = 0;
  if (!lurionRadar.visible) return;

  const world = document.getElementById('lurion-radar-world');
  const map = document.getElementById('lurion-radar-map');
  const canvas = document.getElementById('lurion-radar-canvas');
  if (!world || !map || !canvas) return;

  if (!lurionRadar.worldCssSize) lurionRadarRefreshSize();
  const worldSize = lurionRadar.worldCssSize || 346;

  const pos = lurionRadarWorldToMap(lurionRadar.x, lurionRadar.y);

  // Zoom fixo = menos layout/re-rasterizacao. Movimento agora e somente transform.
  const zoom = 1.10;
  const sourceSpan = LURION_RADAR_RT_SIZE / zoom;
  const cssScale = worldSize / sourceSpan;
  const left = worldSize / 2 - pos.x * cssScale;
  const top = worldSize / 2 - pos.y * cssScale;

  map.style.transform =
    'translate3d(' + left.toFixed(2) + 'px,' + top.toFixed(2) + 'px,0) scale(' +
    cssScale.toFixed(5) + ')';

  const rot = 'translate(-50%,-50%) rotate(' +
    Number(lurionRadar.heading).toFixed(2) + 'deg)';
  world.style.transform = rot;
  canvas.style.transform = rot;

  // Canvas fica praticamente parado: so e redesenhado quando ha rota GPS.
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  if (lurionRadar.destination) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lurionDrawMiniRoute(ctx, pos.x - sourceSpan / 2, pos.y - sourceSpan / 2, sourceSpan);
    lurionRadar.routeCanvasVisible = true;
  } else if (lurionRadar.routeCanvasVisible) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lurionRadar.routeCanvasVisible = false;
  }
}

function lurionRadarRequestDraw() {
  if (lurionRadar.raf) return;
  lurionRadar.raf = requestAnimationFrame(lurionRadarDraw);
}
class LurionMinHeap {
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
        let l = i * 2 + 1, r = l + 1, c = i;
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

function lurionLoadGpsNodes() {
  if (window.LURION_GPS_NODES && window.LURION_GPS_AREAS) return Promise.resolve();
  if (lurionRadar.gpsNodesPromise) return lurionRadar.gpsNodesPromise;

  lurionRadar.gpsNodesPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'radar/vehicleNodes.js?v=lurion-gps1';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Falha ao carregar vehicleNodes'));
    document.head.appendChild(script);
  });
  return lurionRadar.gpsNodesPromise;
}
function lurionGpsAreaId(x, y) {
  const ax = Math.floor((x + 3000) / 750);
  const ay = Math.floor((y + 3000) / 750);
  if (ax < 0 || ax > 7 || ay < 0 || ay > 7) return -1;
  return ax + ay * 8;
}

function lurionGpsClosestNode(x, y) {
  const nodes = window.LURION_GPS_NODES;
  const areas = window.LURION_GPS_AREAS;
  const base = lurionGpsAreaId(x, y);
  if (base < 0) return null;

  const bx = base % 8, by = Math.floor(base / 8);
  let best = null, bestD = Infinity;
  for (let oy = -1; oy <= 1; oy++) {
    for (let ox = -1; ox <= 1; ox++) {
      const ax = bx + ox, ay = by + oy;
      if (ax < 0 || ax > 7 || ay < 0 || ay > 7) continue;
      const ids = areas[ax + ay * 8] || [];
      for (const id of ids) {
        const n = nodes[id];
        if (!n) continue;
        const dx = n[0] - x, dy = n[1] - y;
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

function lurionGpsCalculatePath(startX, startY, endX, endY) {
  const nodes = window.LURION_GPS_NODES;
  const start = lurionGpsClosestNode(startX, startY);
  const end = lurionGpsClosestNode(endX, endY);
  if (start == null || end == null) return null;
  if (start === end) {
    const n = nodes[start];
    return [[n[0], n[1]], [endX, endY]];
  }

  const heap = new LurionMinHeap();
  const dist = Object.create(null);
  const prev = Object.create(null);
  const done = Object.create(null);
  dist[start] = 0;
  heap.push([0, start]);

  while (heap.length) {
    const item = heap.pop();
    const d = item[0], id = item[1];
    if (done[id]) continue;
    done[id] = 1;
    if (id === end) break;

    const node = nodes[id];
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

  const result = ids.map(id => {
    const n = nodes[id];
    return [n[0], n[1]];
  });
  result.push([endX, endY]);
  return result;
}
function lurionRadarClearDestination() {
  lurionRadar.destination = null;
  lurionRadar.route = [];
  lurionRadar.routeProgress = 0;
  lurionRadar.routeRequest++;

  if (lurionRadar.gpsWorker) {
    try { lurionRadar.gpsWorker.terminate(); } catch (_) {}
    lurionRadar.gpsWorker = null;
  }

  lurionBigMapSetStatus('Destino removido.');
  lurionRadarRequestDraw();
  lurionBigMapRequestDraw();
}

function lurionRadarSetDestination(x, y) {
  x = Math.max(-3000, Math.min(3000, Number(x)));
  y = Math.max(-3000, Math.min(3000, Number(y)));
  lurionRadar.destination = { x, y };
  lurionRadar.route = [];
  lurionRadar.routeProgress = 0;

  const request = ++lurionRadar.routeRequest;
  lurionBigMapSetStatus('Calculando rota pelas ruas...');
  lurionRadarRequestDraw();
  lurionBigMapRequestDraw();

  if (lurionRadar.gpsWorker) {
    try { lurionRadar.gpsWorker.terminate(); } catch (_) {}
    lurionRadar.gpsWorker = null;
  }

  try {
    const worker = new Worker('radar/gps-worker.js?v=worker2');
    lurionRadar.gpsWorker = worker;

    worker.onmessage = function (event) {
      const data = event.data || {};
      if (data.type !== 'route' || data.request !== request) return;

      try { worker.terminate(); } catch (_) {}
      if (lurionRadar.gpsWorker === worker) lurionRadar.gpsWorker = null;

      if (request !== lurionRadar.routeRequest || !lurionRadar.destination) return;
      if (!data.route || !data.route.length) {
        lurionBigMapSetStatus('NÃ£o foi possÃ­vel calcular rota para esse ponto.');
        return;
      }

      lurionRadar.route = data.route;
      lurionRadar.routeProgress = 0;
      lurionBigMapSetStatus('Destino marcado. ENTER remove o destino.');
      lurionRadarRequestDraw();
      lurionBigMapRequestDraw();
    };

    worker.onerror = function () {
      try { worker.terminate(); } catch (_) {}
      if (lurionRadar.gpsWorker === worker) lurionRadar.gpsWorker = null;
      if (request === lurionRadar.routeRequest) {
        lurionBigMapSetStatus('Falha ao calcular a rota.');
      }
    };

    worker.postMessage({
      type: 'route',
      request: request,
      startX: lurionRadar.x,
      startY: lurionRadar.y,
      endX: x,
      endY: y
    });
  } catch (_) {
    lurionBigMapSetStatus('GPS indisponÃ­vel neste cliente.');
  }
}
const lurionBigMap = {
  open: false,
  zoom: 0.95,
  centerX: 0,
  centerY: 0,
  raf: 0,
  dragging: false,
  moved: false,
  pointerId: null,
  startX: 0,
  startY: 0,
  startCenterX: 0,
  startCenterY: 0
};

function lurionBigMapEnsureUI() {
  let root = document.getElementById('lurion-bigmap');
  if (root) return root;

  root = document.createElement('div');
  root.id = 'lurion-bigmap';
  root.innerHTML = `
    <img id="lurion-bigmap-map" class="lurion-bigmap-map" src="radar/map-pastgen-4k.jpg?v=pastgen1" alt="">
    <canvas id="lurion-bigmap-canvas"></canvas>
    <img class="lurion-bigmap-cross" src="radar/cross.png" alt="">
    <div class="lurion-bigmap-top">
      <div class="lurion-bigmap-title">MAPA / GPS</div>
      <div id="lurion-bigmap-status">Mova a mira e pressione ENTER para marcar.</div>
    </div>
    <div class="lurion-bigmap-help">
      <b>F2 / ESC</b> fechar &nbsp; â€¢ &nbsp;
      <b>WASD / SETAS</b> mover &nbsp; â€¢ &nbsp;
      <b>Q/E ou -/+</b> zoom &nbsp; â€¢ &nbsp;
      <b>ENTER</b> marcar &nbsp; â€¢ &nbsp;
      <b>ESPAÃ‡O</b> centralizar
    </div>
  `;
  document.body.appendChild(root);

  return root;
}

function lurionBigMapResizeCanvas() {
  const canvas = document.getElementById('lurion-bigmap-canvas');
  if (!canvas) return;

  // Render interno propositalmente leve. O CSS amplia para a tela real.
  // 1024x576 reduz muito o custo do Chromium dentro do GTA.
  const scale = Math.min(
    1,
    1024 / Math.max(1, window.innerWidth),
    576 / Math.max(1, window.innerHeight)
  );
  const w = Math.max(640, Math.round(window.innerWidth * scale));
  const h = Math.max(360, Math.round(window.innerHeight * scale));

  if (canvas.width !== w) canvas.width = w;
  if (canvas.height !== h) canvas.height = h;
}

function lurionBigMapSpans(canvas) {
  const spanX = LURION_RADAR_WORLD_WIDTH / lurionBigMap.zoom;
  const spanY = spanX * (canvas.height / canvas.width);
  return { x: spanX, y: spanY };
}
function lurionBigMapWorldToScreen(x, y, canvas) {
  const span = lurionBigMapSpans(canvas);
  return {
    x: canvas.width / 2 + ((x - lurionBigMap.centerX) / span.x) * canvas.width,
    y: canvas.height / 2 - ((y - lurionBigMap.centerY) / span.y) * canvas.height
  };
}

function lurionBigMapScreenToWorld(px, py, canvas) {
  const rect = canvas.getBoundingClientRect();
  const cx = ((px - rect.left) / rect.width) * canvas.width;
  const cy = ((py - rect.top) / rect.height) * canvas.height;
  const span = lurionBigMapSpans(canvas);
  return {
    x: lurionBigMap.centerX + ((cx - canvas.width / 2) / canvas.width) * span.x,
    y: lurionBigMap.centerY - ((cy - canvas.height / 2) / canvas.height) * span.y
  };
}

function lurionBigMapSetStatus(text) {
  const el = document.getElementById('lurion-bigmap-status');
  if (el) el.textContent = text;
}


function lurionBigMapPositionImage() {
  const img = document.getElementById('lurion-bigmap-map');
  if (!img) return;

  const viewW = Math.max(1, window.innerWidth);
  const viewH = Math.max(1, window.innerHeight);
  const baseW = viewW;
  const baseH = baseW * (LURION_RADAR_WORLD_HEIGHT / LURION_RADAR_WORLD_WIDTH);

  const u = (lurionBigMap.centerX - LURION_RADAR_WORLD_MIN_X) / LURION_RADAR_WORLD_WIDTH;
  const v = (LURION_RADAR_WORLD_MAX_Y - lurionBigMap.centerY) / LURION_RADAR_WORLD_HEIGHT;
  const baseX = u * baseW;
  const baseY = v * baseH;
  const left = viewW / 2 - baseX * lurionBigMap.zoom;
  const top = viewH / 2 - baseY * lurionBigMap.zoom;

  img.style.width = baseW.toFixed(2) + 'px';
  img.style.height = baseH.toFixed(2) + 'px';
  img.style.transform =
    'translate3d(' + left.toFixed(2) + 'px,' + top.toFixed(2) + 'px,0) scale(' +
    lurionBigMap.zoom.toFixed(4) + ')';
}

function lurionBigMapDrawRoute(ctx, canvas) {
  if (lurionRadar.route.length) {
    lurionUpdateRouteProgress();
    ctx.beginPath();
    ctx.strokeStyle = LURION_ROUTE_COLOR;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const start = lurionBigMapWorldToScreen(lurionRadar.x, lurionRadar.y, canvas);
    ctx.moveTo(start.x, start.y);
    for (let i = lurionRadar.routeProgress; i < lurionRadar.route.length; i++) {
      const p = lurionRadar.route[i];
      const s = lurionBigMapWorldToScreen(p[0], p[1], canvas);
      ctx.lineTo(s.x, s.y);
    }
    ctx.stroke();
  }

  if (lurionRadar.destination) {
    const d = lurionBigMapWorldToScreen(
      lurionRadar.destination.x,
      lurionRadar.destination.y,
      canvas
    );
    ctx.fillStyle = LURION_ROUTE_COLOR;
    ctx.beginPath();
    ctx.arc(d.x, d.y, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.font = '600 14px Arial';
    ctx.fillText('DESTINO', d.x + 19, d.y + 5);
  }
}
function lurionBigMapDraw() {
  lurionBigMap.raf = 0;
  if (!lurionBigMap.open) return;

  const canvas = document.getElementById('lurion-bigmap-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });

  // O mapa em si e DOM/GPU. O canvas desenha somente rota e seta.
  lurionBigMapPositionImage();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  lurionBigMapDrawRoute(ctx, canvas);

  const player = lurionBigMapWorldToScreen(lurionRadar.x, lurionRadar.y, canvas);
  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.rotate((-lurionRadar.heading * Math.PI) / 180);
  if (lurionRadar.arrow.complete) {
    ctx.drawImage(lurionRadar.arrow, -14, -14, 28, 28);
  } else {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(0, -14);
    ctx.lineTo(10, 11);
    ctx.lineTo(0, 7);
    ctx.lineTo(-10, 11);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function lurionBigMapRequestDraw() {
  if (!lurionBigMap.open || lurionBigMap.raf) return;
  lurionBigMap.raf = requestAnimationFrame(lurionBigMapDraw);
}
function lurionBigMapOpen() {
  if (lurionBigMap.open) return;
  const root = lurionBigMapEnsureUI();
  lurionBigMap.open = true;
  lurionBigMap.zoom = 0.95;
  lurionBigMap.centerX = lurionRadar.x;
  lurionBigMap.centerY = lurionRadar.y;
  root.classList.add('active');
  document.documentElement.classList.add('lurion-bigmap-open');
  document.body.classList.add('lurion-bigmap-open');
  lurionBigMapResizeCanvas();
  lurionCefEmit('radar:bigmap', 1);
  lurionBigMapSetStatus(
    lurionRadar.destination
      ? 'Destino marcado. ENTER remove o destino.'
      : 'WASD ou setas movem a mira. ENTER marca o destino.'
  );
  lurionBigMapRequestDraw();
}

function lurionBigMapClose() {
  if (!lurionBigMap.open) return;
  lurionBigMap.open = false;
  const root = document.getElementById('lurion-bigmap');
  if (root) root.classList.remove('active');
  document.documentElement.classList.remove('lurion-bigmap-open');
  document.body.classList.remove('lurion-bigmap-open');
  lurionCefEmit('radar:bigmap', 0);
}

function lurionBigMapToggle() {
  if (lurionBigMap.open) lurionBigMapClose();
  else lurionBigMapOpen();
}

// Radar pequeno agora e 100% o radar nativo do GTA.
// O CEF apenas alterna a visibilidade quando o estado veiculo muda.
let lurionNativeRadarVisible = null;

function lurionNativeRadarSetVisible(show) {
  const visible = !!show;
  if (lurionNativeRadarVisible === visible) return;
  lurionNativeRadarVisible = visible;
  lurionCefEmit('game:hud:setComponentVisible', 'radar', visible);
}

function lurionHideOtherNativeHud() {
  // O HUD global do GTA fica ligado para permitir o radar original,
  // mas todos estes componentes continuam escondidos pelo cef_interface.
  const hidden = [
    'weapon',
    'health',
    'breath',
    'armour',
    'money',
    'vehicle_name',
    'area_name',
    'clock',
    'radio',
    'wanted',
    'crosshair',
    'vital_stats',
    'help_text'
  ];

  for (const component of hidden) {
    lurionCefEmit('game:hud:setComponentVisible', component, false);
  }
}

window.lurionRadarVehicleUpdate = function (inVehicle, x, y, heading, speed) {
  const showNativeRadar = Number(inVehicle) === 1;

  // X/Y continuam atualizados a pe exclusivamente para o F2/GPS grande.
  lurionRadar.x = Number(x) || 0;
  lurionRadar.y = Number(y) || 0;
  lurionRadar.heading = Number(heading) || 0;
  lurionRadar.speed = Number(speed) || 0;

  // A pe: radar GTA oculto. Em veiculo: radar GTA visivel.
  lurionNativeRadarSetVisible(showNativeRadar);

  if (lurionBigMap.open) lurionBigMapRequestDraw();
};

function lurionBigMapMove(dx, dy, fast) {
  const canvas = document.getElementById('lurion-bigmap-canvas');
  if (!canvas) return;
  const span = lurionBigMapSpans(canvas);
  const step = span.x * (fast ? 0.065 : 0.028);
  lurionBigMap.centerX = Math.max(LURION_RADAR_WORLD_MIN_X, Math.min(LURION_RADAR_WORLD_MAX_X, lurionBigMap.centerX + dx * step));
  lurionBigMap.centerY = Math.max(LURION_RADAR_WORLD_MIN_Y, Math.min(LURION_RADAR_WORLD_MAX_Y, lurionBigMap.centerY + dy * step));
  lurionBigMapRequestDraw();
}

function lurionBigMapZoom(factor) {
  lurionBigMap.zoom = Math.max(0.25, Math.min(6, lurionBigMap.zoom * factor));
  lurionBigMapRequestDraw();
}

function lurionBigMapMarkCenter() {
  if (lurionRadar.destination) {
    lurionRadarClearDestination();
    return;
  }
  const x = lurionBigMap.centerX;
  const y = lurionBigMap.centerY;
  if (x < LURION_RADAR_WORLD_MIN_X || x > LURION_RADAR_WORLD_MAX_X ||
      y < LURION_RADAR_WORLD_MIN_Y || y > LURION_RADAR_WORLD_MAX_Y) {
    lurionBigMapSetStatus('A mira estÃ¡ fora da Ã¡rea do mapa.');
    return;
  }
  lurionRadarSetDestination(x, y);
}

window.addEventListener('keydown', (e) => {
  const isF2 = e.key === 'F2' || e.code === 'F2' || e.keyCode === 113;
  if (isF2) {
    if (e.repeat) return;
    e.preventDefault();
    e.stopPropagation();
    lurionBigMapToggle();
    return;
  }

  if (!lurionBigMap.open) return;

  let handled = true;
  switch (e.code) {
    case 'Escape':
      lurionBigMapClose();
      break;
    case 'ArrowUp':
    case 'KeyW':
      lurionBigMapMove(0, 1, e.shiftKey);
      break;
    case 'ArrowDown':
    case 'KeyS':
      lurionBigMapMove(0, -1, e.shiftKey);
      break;
    case 'ArrowLeft':
    case 'KeyA':
      lurionBigMapMove(-1, 0, e.shiftKey);
      break;
    case 'ArrowRight':
    case 'KeyD':
      lurionBigMapMove(1, 0, e.shiftKey);
      break;
    case 'KeyQ':
    case 'Minus':
    case 'NumpadSubtract':
      lurionBigMapZoom(1 / 1.16);
      break;
    case 'KeyE':
    case 'Equal':
    case 'NumpadAdd':
      lurionBigMapZoom(1.16);
      break;
    case 'Enter':
    case 'NumpadEnter':
      if (!e.repeat) lurionBigMapMarkCenter();
      break;
    case 'Space':
      lurionBigMap.centerX = lurionRadar.x;
      lurionBigMap.centerY = lurionRadar.y;
      lurionBigMapRequestDraw();
      break;
    default:
      handled = false;
  }

  if (handled) {
    e.preventDefault();
    e.stopPropagation();
  }
}, true);

window.addEventListener('resize', () => {
  if (lurionBigMap.open) {
    lurionBigMapResizeCanvas();
    lurionBigMapRequestDraw();
  }
});

window.addEventListener('DOMContentLoaded', () => {
  // Mantem somente o radar original disponivel no HUD nativo.
  lurionHideOtherNativeHud();

  // Comeca oculto; hud:vehicle liga ao entrar em carro/moto.
  lurionNativeRadarSetVisible(false);
});

window.addEventListener('beforeunload', () => {
  // Evita deixar o radar nativo preso visivel ao trocar de tela CEF.
  lurionCefEmit('game:hud:setComponentVisible', 'radar', false);
});
