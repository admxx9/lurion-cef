(function () {
  "use strict";

  var HOT_COUNT = 5;
  var BAG_COUNT = 94; // 5+94 = 99 slots
  var BAG_START = 5;
  var TOTAL = HOT_COUNT + BAG_COUNT;
  var groundItems = []; // drops perto: { dropIdx, id, name, qty }

  var ICONS = {
    water: "./assets/items/lp_softdrink.png",
    sandwich: "./assets/items/lp_breakfast-sandwich.png",
    apple: "./assets/items/lp_apple.png",
    burger: "./assets/items/lp_burger.png",
    pizza: "./assets/items/lp_pizza.png",
    phone: "./assets/items/2.png",
    idcard: "./assets/items/1.png",
    weapon_m4: "./assets/items/lp_cuntgun.png",
    weapon_ak: "./assets/items/lp_cuntgun.png",
    weapon_deagle: "./assets/items/lp_cuntgun.png",
    weapon_colt: "./assets/items/lp_cuntgun.png",
    weapon_shotgun: "./assets/items/lp_cuntgun.png",
    weapon_mp5: "./assets/items/lp_cuntgun.png",
    weapon_sniper: "./assets/items/lp_cuntgun.png",
    weapon_generic: "./assets/items/lp_cuntgun.png",
    ammo: "./assets/items/lp_pellet_clip.png",
    ammo_rifle: "./assets/items/lp_pellet_clip.png",
    ammo_pistol: "./assets/items/lp_pellet.png",
    ammo_shotgun: "./assets/items/lp_pellet.png"
  };
  var WEIGHT = {
    water: 0.2, sandwich: 0.3, apple: 0.15, burger: 0.35, pizza: 0.4,
    phone: 0.15, idcard: 0.05,
    weapon_m4: 3.5, weapon_ak: 3.8, weapon_deagle: 1.5, weapon_colt: 1.0,
    weapon_shotgun: 3.2, weapon_mp5: 2.5, weapon_sniper: 4.0, weapon_generic: 2.5,
    ammo: 0.05, ammo_rifle: 0.05, ammo_pistol: 0.04, ammo_shotgun: 0.06
  };

  var root = document.getElementById("root");
  var dock = document.getElementById("dock");
  var dockRow = document.getElementById("dockRow");
  var grid = document.getElementById("grid");
  var hotbar = document.getElementById("hotbar");
  var tradeGrid = document.getElementById("tradeGrid");
  var tradeBox = document.getElementById("tradeBox");
  var tradeBridge = document.getElementById("tradeBridge");
  var tradeQty = document.getElementById("tradeQty");
  var usedKg = document.getElementById("usedKg");
  var weightBars = document.getElementById("weightBars");
  var actions = document.getElementById("actions");
  var tooltip = document.getElementById("tooltip");
  var sepOverlay = document.getElementById("sepOverlay");
  var sepInput = document.getElementById("sepInput");
  var dragGhost = document.getElementById("dragGhost");

  var slots = [];
  var currentTab = "bag";
  var isOpen = false;
  var actionSlot = -1;
  var selectedSlot = -1;
  var hoverTimer = null;
  var hoverSlot = -1;
  var drag = null;
  var closeTimer = null;
  var selectedHot = 0;
  var dockEnabled = false;
  var invKeyLockUntil = 0;

  function cefEmit(name) {
    var args = Array.prototype.slice.call(arguments, 1);
    try {
      if (typeof cef !== "undefined" && cef && typeof cef.emit === "function") {
        cef.emit.apply(cef, [name].concat(args));
        return true;
      }
    } catch (e) {}
    return false;
  }

  function iconFor(id) {
    if (ICONS[id]) return ICONS[id];
    if (id && String(id).indexOf("weapon_") === 0) return ICONS.weapon_generic;
    if (id && String(id).indexOf("ammo") === 0) return ICONS.ammo;
    return "./assets/items/3.png";
  }

  function weightOf(item) {
    if (!item) return 0;
    return (WEIGHT[item.id] || 0.2) * (item.qty || 1);
  }

  function isWeapon(id) {
    return id && String(id).indexOf("weapon_") === 0;
  }
  function isAmmo(id) {
    return id && String(id).indexOf("ammo") === 0;
  }
  function isFood(id) {
    return id === "water" || id === "sandwich" || id === "apple" || id === "burger" || id === "pizza";
  }

  function ensureSlots() {
    if (slots.length === TOTAL) return;
    slots = [];
    for (var i = 0; i < TOTAL; i++) slots.push(null);
  }

  function setWeight() {
    var total = 0;
    for (var i = 0; i < TOTAL; i++) total += weightOf(slots[i]);
    usedKg.textContent = total.toFixed(1);
    weightBars.innerHTML = "";
    var filled = Math.max(0, Math.min(4, Math.ceil((total / 40) * 4)));
    if (total > 0 && filled < 1) filled = 1;
    for (var b = 0; b < 4; b++) {
      var el = document.createElement("i");
      if (b < filled) el.className = "on";
      weightBars.appendChild(el);
    }
  }

  function hideTooltip() {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }
    hoverSlot = -1;
    tooltip.className = "tooltip";
  }

  function showTooltipAt(slotIndex, x, y) {
    var item = slots[slotIndex];
    if (!item) return;
    document.getElementById("tipName").textContent = item.name || item.id;
    document.getElementById("tipWeight").textContent = (WEIGHT[item.id] || 0.2).toFixed(1);
    document.getElementById("tipQty").textContent = String(item.qty);
    tooltip.className = "tooltip on";
    var tw = 222;
    var left = x + 14;
    var top = y + 14;
    if (left + tw > window.innerWidth - 8) left = x - tw - 8;
    if (top + 80 > window.innerHeight - 8) top = y - 86;
    tooltip.style.left = left + "px";
    tooltip.style.top = top + "px";
  }

  function scheduleTooltip(slotIndex, x, y) {
    hideTooltip();
    hoverSlot = slotIndex;
    hoverTimer = setTimeout(function () {
      if (hoverSlot === slotIndex && !drag && actionSlot < 0) {
        showTooltipAt(slotIndex, x, y);
      }
    }, 1500);
  }

  function closeActions() {
    actionSlot = -1;
    actions.className = "actions";
  }

  function syncTradeQtyFromSlot(slotIndex) {
    var item = slots[slotIndex];
    if (!item || !tradeQty) return;
    tradeQty.value = String(item.qty || 1);
  }

  function getSendQty(slotIndex) {
    var item = slots[slotIndex];
    if (!item) return 0;
    var q = parseInt(tradeQty && tradeQty.value, 10);
    if (!isFinite(q) || q < 1) q = item.qty;
    if (q > item.qty) q = item.qty;
    return q;
  }

  function markSelectedClass() {
    document.querySelectorAll("#root .slot.selected").forEach(function (el) {
      el.classList.remove("selected");
    });
    if (selectedSlot < 0) return;
    document.querySelectorAll('#root .slot[data-slot="' + selectedSlot + '"]').forEach(function (el) {
      el.classList.add("selected");
    });
  }

  function selectSlot(slotIndex, doRender) {
    if (slotIndex < 0 || !slots[slotIndex]) {
      selectedSlot = -1;
      if (doRender !== false) renderAll();
      else markSelectedClass();
      return;
    }
    selectedSlot = slotIndex;
    syncTradeQtyFromSlot(slotIndex);
    // NUNCA re-render no meio do drag — isso quebrava mover item e gerava fantasma
    if (doRender === false || drag) markSelectedClass();
    else renderAll();
  }

  function openActions(slotIndex) {
    var item = slots[slotIndex];
    if (!item) return;
    hideTooltip();
    actionSlot = slotIndex;
    selectSlot(slotIndex);
    document.getElementById("actName").textContent = item.name || item.id;
    document.getElementById("actWeight").textContent = (WEIGHT[item.id] || 0.2).toFixed(1);
    document.getElementById("actQty").textContent = String(item.qty);
    var label = "Usar";
    if (isWeapon(item.id)) label = "Equipar";
    else if (isAmmo(item.id)) label = "Carregar";
    else if (item.id === "phone" || item.id === "idcard") label = "Equipar";
    document.getElementById("btnUse").textContent = label;
    actions.className = "actions on";
  }

  function openSeparate(slotIndex) {
    var item = slots[slotIndex];
    if (!item || item.qty < 2) {
      cefEmit("inv:toast", "Inventario", "Quantidade insuficiente para separar.");
      return;
    }
    actionSlot = slotIndex;
    selectSlot(slotIndex);
    sepInput.value = "1";
    sepOverlay.className = "sep-overlay on";
    setTimeout(function () {
      sepInput.focus();
      sepInput.select();
    }, 30);
  }

  function closeSeparate() {
    sepOverlay.className = "sep-overlay";
  }

  function fillSlotEl(el, item, slotIndex, showNum, dockMode) {
    el.innerHTML = "";
    el.dataset.slot = String(slotIndex);
    el.className = "slot" +
      (dockMode && slotIndex === selectedHot ? " sel" : "") +
      (slotIndex === selectedSlot ? " selected" : "");
    if (!item) {
      if (showNum) {
        var n0 = document.createElement("div");
        n0.className = "num";
        n0.textContent = String(slotIndex + 1);
        el.appendChild(n0);
      }
      return;
    }
    var img = document.createElement("img");
    img.className = "icon";
    img.src = iconFor(item.id);
    img.alt = item.name || item.id;
    img.draggable = false;
    el.appendChild(img);
    if (showNum) {
      var num = document.createElement("div");
      num.className = "num";
      num.textContent = String(slotIndex + 1);
      el.appendChild(num);
    } else if (item.qty > 1) {
      var qty = document.createElement("div");
      qty.className = "qty";
      qty.textContent = String(item.qty);
      el.appendChild(qty);
    }
    if (dockMode && item.qty > 1) {
      var st = document.createElement("div");
      st.className = "stack";
      st.textContent = item.qty + "x";
      el.appendChild(st);
    }
  }

  function bindSlotEvents(el, slotIndex) {
    el.onmouseenter = function (ev) {
      if (drag || actionSlot >= 0) return;
      if (slots[slotIndex]) scheduleTooltip(slotIndex, ev.clientX, ev.clientY);
    };
    el.onmousemove = function (ev) {
      if (tooltip.classList.contains("on") && hoverSlot === slotIndex) {
        showTooltipAt(slotIndex, ev.clientX, ev.clientY);
      }
    };
    el.onmouseleave = function () {
      if (hoverSlot === slotIndex) hideTooltip();
    };
    el.oncontextmenu = function (ev) {
      ev.preventDefault();
      if (!slots[slotIndex]) return;
      openActions(slotIndex);
    };
    el.onmousedown = function (ev) {
      if (ev.button !== 0) return;
      if (!slots[slotIndex]) {
        if (actionSlot >= 0) closeActions();
        selectedSlot = -1;
        markSelectedClass();
        return;
      }
      ev.preventDefault();
      ev.stopPropagation();
      hideTooltip();
      closeActions();
      selectSlot(slotIndex, false);
      var rect = el.getBoundingClientRect();
      var item = slots[slotIndex];
      var cx = ev.clientX;
      var cy = ev.clientY;
      drag = {
        from: slotIndex,
        offsetX: cx - rect.left,
        offsetY: cy - rect.top,
        shift: !!ev.shiftKey,
        startX: cx,
        startY: cy,
        pointerId: ev.pointerId,
        captureEl: el
      };
      el.classList.add("dragging");
      try {
        if (el.setPointerCapture && ev.pointerId != null)
          el.setPointerCapture(ev.pointerId);
      } catch (e2) {}
      dragGhost.innerHTML = "";
      var gImg = document.createElement("img");
      gImg.src = iconFor(item.id);
      gImg.draggable = false;
      dragGhost.appendChild(gImg);
      dragGhost.className = "drag-ghost on";
      dragGhost.style.left = Math.round(cx - drag.offsetX) + "px";
      dragGhost.style.top = Math.round(cy - drag.offsetY) + "px";
    };
  }

  function renderZone(into, start, count, numbered) {
    into.innerHTML = "";
    for (var i = 0; i < count; i++) {
      var idx = start + i;
      var el = document.createElement("div");
      fillSlotEl(el, slots[idx], idx, numbered, false);
      bindSlotEvents(el, idx);
      into.appendChild(el);
    }
  }

  function renderTradeMirror() {
    if (!tradeGrid) return;
    tradeGrid.innerHTML = "";
    var titleEl = document.getElementById("tradeTitle");

    // Sem parceiro: mostra itens do chao perto
    if (groundItems.length > 0) {
      if (titleEl) titleEl.textContent = "Chao (perto)";
      for (var g = 0; g < groundItems.length; g++) {
        (function (item) {
          var el = document.createElement("div");
          el.className = "slot ground-slot";
          el.title = "Clique pra pegar";
          var img = document.createElement("img");
          img.className = "icon";
          img.src = iconFor(item.id);
          img.draggable = false;
          el.appendChild(img);
          if (item.qty > 1) {
            var q = document.createElement("div");
            q.className = "qty";
            q.textContent = String(item.qty);
            el.appendChild(q);
          }
          el.onclick = function (ev) {
            ev.preventDefault();
            cefEmit("inv:pickupground", String(item.dropIdx));
          };
          tradeGrid.appendChild(el);
        })(groundItems[g]);
      }
      // completa grade pra soltar envio
      var fill = Math.max(0, 15 - groundItems.length);
      for (var f = 0; f < fill; f++) {
        var empty = document.createElement("div");
        empty.className = "slot trade-drop";
        empty.dataset.trade = "1";
        tradeGrid.appendChild(empty);
      }
      return;
    }

    if (titleEl) titleEl.textContent = "Troca / Chao";
    for (var i = 0; i < 15; i++) {
      var el2 = document.createElement("div");
      el2.className = "slot trade-drop";
      el2.dataset.trade = "1";
      tradeGrid.appendChild(el2);
    }
  }

  function setGroundItems(payload) {
    groundItems = [];
    if (payload) {
      String(payload).split(";").forEach(function (chunk) {
        if (!chunk) return;
        var p = chunk.split("|");
        if (p.length < 4) return;
        groundItems.push({
          dropIdx: Number(p[0]),
          id: p[1],
          name: p[2],
          qty: Number(p[3]) || 1
        });
      });
    }
    var hint = document.getElementById("tradeHint");
    var partner = document.getElementById("tradePartner");
    if (groundItems.length > 0) {
      if (partner) partner.textContent = groundItems.length + " no chao";
      if (hint) hint.textContent = "clique no item pra pegar";
    } else {
      if (partner) partner.textContent = "solte aqui / enviar";
      if (hint) hint.textContent = "sem parceiro = chao";
    }
    renderTradeMirror();
  }

  function renderDock() {
    if (!dockRow) return;
    dockRow.innerHTML = "";
    for (var i = 0; i < HOT_COUNT; i++) {
      var el = document.createElement("div");
      fillSlotEl(el, slots[i], i, true, true);
      dockRow.appendChild(el);
    }
  }

  function renderAll() {
    ensureSlots();
    renderZone(hotbar, 0, HOT_COUNT, true);
    renderZone(grid, BAG_START, BAG_COUNT, false);
    renderTradeMirror();
    renderDock();
    setWeight();
  }

  function setItems(payload) {
    ensureSlots();
    for (var i = 0; i < TOTAL; i++) slots[i] = null;
    if (payload) {
      String(payload).split(";").forEach(function (chunk) {
        if (!chunk) return;
        var p = chunk.split("|");
        var slot = Number(p[0]);
        if (slot < 0 || slot >= TOTAL) return;
        slots[slot] = { id: p[1], name: p[2], qty: Number(p[3]) || 1 };
      });
    }
    if (selectedSlot >= 0 && !slots[selectedSlot]) selectedSlot = -1;
    renderAll();
  }

  function setTab(tab) {
    if (tab === "clothing") return;
    if (tab === currentTab) return;
    currentTab = tab;
    root.classList.remove("tab-bag", "tab-trade", "tab-clothing");
    root.classList.add("tab-" + tab);
    var tabs = document.querySelectorAll(".tab");
    for (var i = 0; i < tabs.length; i++) {
      var t = tabs[i].getAttribute("data-tab");
      if (t === "clothing") continue;
      if (t === tab) tabs[i].classList.add("active");
      else tabs[i].classList.remove("active");
    }
    closeActions();
    hideTooltip();
  }

  function showDock(on) {
    if (!dock) return;
    dock.className = on ? "dock on" : "dock";
  }

  function applyDockVisibility() {
    if (isOpen) showDock(false);
    else showDock(dockEnabled);
  }

  function setDockEnabled(on) {
    dockEnabled = !!on;
    applyDockVisibility();
    renderDock();
    cefEmit("inv:dock", dockEnabled ? 1 : 0);
  }

  function toggleDock() {
    if (isOpen) return;
    setDockEnabled(!dockEnabled);
  }

  function openUi() {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    isOpen = true;
    document.body.classList.add("inv-open");
    showDock(false);
    root.classList.remove("closing", "off");
    root.classList.add("on", "tab-" + currentTab);
    var hb = document.getElementById("hotbarBlock");
    if (hb) {
      hb.style.transition = "none";
      hb.style.transform = "translateY(-80px)";
      hb.style.opacity = "0";
      void hb.offsetWidth;
      hb.style.transition = "";
      hb.style.transform = "";
      hb.style.opacity = "";
    }
  }

  function closeUi() {
    if (!isOpen && root.classList.contains("off")) {
      document.body.classList.remove("inv-open");
      applyDockVisibility();
      return;
    }
    isOpen = false;
    closeActions();
    hideTooltip();
    closeSeparate();
    endDrag();
    root.classList.add("closing");
    closeTimer = setTimeout(function () {
      root.className = "off";
      document.body.classList.remove("inv-open");
      applyDockVisibility();
      renderDock();
      closeTimer = null;
    }, 420);
  }

  function hotbarOnly() {
    isOpen = false;
    root.className = "off";
    document.body.classList.remove("inv-open");
    applyDockVisibility();
    renderDock();
  }

  function endDrag() {
    if (!drag) return;
    if (drag.pointerId != null && drag.captureEl) {
      try {
        if (drag.captureEl.releasePointerCapture)
          drag.captureEl.releasePointerCapture(drag.pointerId);
      } catch (e) {}
    }
    document.querySelectorAll("#root .slot.dragging").forEach(function (el) {
      el.classList.remove("dragging");
      el.style.opacity = "";
    });
    dragGhost.className = "drag-ghost";
    dragGhost.innerHTML = "";
    dragGhost.style.left = "-9999px";
    dragGhost.style.top = "-9999px";
    if (tradeBox) tradeBox.classList.remove("drop-hot");
    if (tradeBridge) tradeBridge.classList.remove("drop-hot");
  }

  // Hit-test por retangulo — elementsFromPoint no CEF falha com focus/overlay
  function slotFromPoint(x, y) {
    var nodes = document.querySelectorAll("#hotbar .slot[data-slot], #grid .slot[data-slot]");
    var best = -1;
    var bestArea = 1e15;
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (!el || el.classList.contains("trade-drop")) continue;
      var r = el.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
        var area = r.width * r.height;
        if (area < bestArea) {
          bestArea = area;
          best = Number(el.dataset.slot);
        }
      }
    }
    return best;
  }

  function pointInEl(el, x, y) {
    if (!el) return false;
    var r = el.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  }

  function hitTradeDrop(x, y) {
    if (currentTab !== "trade") return false;
    if (slotFromPoint(x, y) >= 0) return false;
    if (pointInEl(tradeBox, x, y)) return true;
    if (pointInEl(tradeBridge, x, y)) return true;
    return false;
  }

  function finishDragAt(x, y, shift) {
    if (!drag) return;
    var to = slotFromPoint(x, y);
    var from = drag.from;
    var moved =
      Math.abs(x - (drag.startX || x)) > 4 ||
      Math.abs(y - (drag.startY || y)) > 4;
    var tradeHit = hitTradeDrop(x, y);
    endDrag();
    drag = null;
    document.querySelectorAll(".slot.drop-target").forEach(function (el) {
      el.classList.remove("drop-target");
    });

    if (to >= 0 && to !== from && slots[from]) {
      if (shift && slots[from].qty > 1) {
        openSeparate(from);
        window.__sepMoveTo = to;
        return;
      }
      var a = slots[from];
      var b = slots[to];
      if (!b) {
        slots[to] = a;
        slots[from] = null;
      } else if (b.id === a.id && !isWeapon(a.id)) {
        b.qty += a.qty;
        slots[from] = null;
      } else {
        slots[from] = b;
        slots[to] = a;
      }
      selectedSlot = to;
      renderAll();
      // payload string — CEF int multi-arg falhava e o server devolvia o item
      cefEmit("inv:move", String(from) + "|" + String(to));
      return;
    }

    if (tradeHit && moved && from >= 0 && slots[from]) {
      selectSlot(from, false);
      doSend(from);
      return;
    }

    renderAll();
  }

  function doSend(slotIndex) {
    slotIndex = Number(slotIndex);
    if (slotIndex < 0 || !slots[slotIndex]) {
      cefEmit("inv:toast", "Inventario", "Selecione um item primeiro.");
      return;
    }
    var qty = getSendQty(slotIndex);
    if (qty < 1) {
      cefEmit("inv:toast", "Inventario", "Quantidade invalida.");
      return;
    }
    cefEmit("inv:send", String(slotIndex) + "|" + String(qty));
  }

  function useHotSlot(idx) {
    if (!isOpen && !dockEnabled) return;
    selectedHot = idx;
    renderDock();
    if (isOpen) renderZone(hotbar, 0, HOT_COUNT, true);
    var item = slots[idx];
    if (item) cefEmit("inv:use", item.id);
  }

  function onDragMove(ev) {
    if (!drag) return;
    ev.preventDefault();
    var x = ev.clientX;
    var y = ev.clientY;
    dragGhost.style.left = Math.round(x - drag.offsetX) + "px";
    dragGhost.style.top = Math.round(y - drag.offsetY) + "px";
    var over = slotFromPoint(x, y);
    document.querySelectorAll("#hotbar .slot[data-slot], #grid .slot[data-slot]").forEach(function (el) {
      var s = Number(el.dataset.slot);
      if (s === over && s !== drag.from) el.classList.add("drop-target");
      else el.classList.remove("drop-target");
    });
    var tradeHit = hitTradeDrop(x, y);
    if (tradeBox) tradeBox.classList.toggle("drop-hot", !!tradeHit);
    if (tradeBridge) tradeBridge.classList.toggle("drop-hot", !!tradeHit);
  }

  function onDragUp(ev) {
    if (!drag) return;
    if (ev.button != null && ev.button !== 0) return;
    var shift = drag.shift || !!ev.shiftKey;
    finishDragAt(ev.clientX, ev.clientY, shift);
  }

  document.addEventListener("mousemove", onDragMove, true);
  document.addEventListener("mouseup", onDragUp, true);
  document.addEventListener("pointermove", onDragMove, true);
  document.addEventListener("pointerup", onDragUp, true);
  document.addEventListener("pointercancel", onDragUp, true);
  document.addEventListener("dragstart", function (ev) { ev.preventDefault(); }, true);

  document.getElementById("tabs").addEventListener("click", function (ev) {
    var btn = ev.target.closest(".tab");
    if (!btn || btn.classList.contains("disabled") || btn.disabled) return;
    setTab(btn.getAttribute("data-tab"));
  });

  document.getElementById("btnUse").onclick = function () {
    if (actionSlot < 0 || !slots[actionSlot]) return;
    var id = slots[actionSlot].id;
    closeActions();
    cefEmit("inv:use", id);
  };
  document.getElementById("btnSep").onclick = function () {
    if (actionSlot < 0) return;
    var s = actionSlot;
    closeActions();
    openSeparate(s);
  };
  document.getElementById("btnTradeSend").onclick = function () {
    var slot = selectedSlot;
    if (slot < 0 && actionSlot >= 0) slot = actionSlot;
    doSend(slot);
  };
  if (tradeQty) {
    tradeQty.addEventListener("mousedown", function (ev) { ev.stopPropagation(); });
    tradeQty.addEventListener("click", function (ev) { ev.stopPropagation(); });
  }

  document.getElementById("sepOk").onclick = function () {
    var qty = parseInt(sepInput.value, 10) || 0;
    var s = actionSlot;
    var moveTo = window.__sepMoveTo;
    window.__sepMoveTo = undefined;
    closeSeparate();
    if (s < 0 || !slots[s]) return;
    if (qty < 1 || qty >= slots[s].qty) {
      cefEmit("inv:toast", "Inventario", "Quantidade invalida para separar.");
      return;
    }
    var empty = -1;
    if (typeof moveTo === "number" && moveTo >= 0 && !slots[moveTo]) empty = moveTo;
    else {
      for (var i = 0; i < TOTAL; i++) {
        if (!slots[i]) {
          empty = i;
          break;
        }
      }
    }
    if (empty < 0) {
      cefEmit("inv:toast", "Inventario", "Sem espaco livre na mochila.");
      return;
    }
    slots[s].qty -= qty;
    slots[empty] = { id: slots[s].id, name: slots[s].name, qty: qty };
    renderAll();
    cefEmit("inv:separate", String(s) + "|" + String(empty) + "|" + String(qty));
    actionSlot = -1;
  };
  document.getElementById("sepCancel").onclick = function () {
    window.__sepMoveTo = undefined;
    closeSeparate();
  };

  document.addEventListener("keydown", function (ev) {
    var isQuote =
      ev.key === "'" ||
      ev.key === '"' ||
      ev.code === "Quote" ||
      ev.keyCode === 222 ||
      ev.which === 222;
    if (isQuote) {
      ev.preventDefault();
      ev.stopPropagation();
      var now = Date.now();
      if (now < invKeyLockUntil) return;
      invKeyLockUntil = now + 350;

      if (isOpen) {
        if (sepOverlay.classList.contains("on")) {
          closeSeparate();
          return;
        }
        if (actionSlot >= 0) {
          closeActions();
          return;
        }
        closeUi();
        cefEmit("inv:toggle");
      } else {
        cefEmit("inv:toggle");
      }
      return;
    }

    if ((ev.key === "h" || ev.key === "H" || ev.code === "KeyH") && !ev.ctrlKey && !ev.altKey) {
      if (!isOpen) {
        ev.preventDefault();
        toggleDock();
      }
      return;
    }

    if (ev.key >= "1" && ev.key <= "5") {
      useHotSlot(Number(ev.key) - 1);
      return;
    }

    if (!isOpen) return;
    if (ev.key === "Escape" || ev.key === "Tab") {
      ev.preventDefault();
      if (sepOverlay.classList.contains("on")) {
        closeSeparate();
        return;
      }
      if (actionSlot >= 0) {
        closeActions();
        return;
      }
      closeUi();
      cefEmit("inv:toggle");
    }
  }, true);

  try {
    if (typeof cef !== "undefined" && cef && typeof cef.on === "function") {
      cef.on("inv:open", openUi);
      cef.on("inv:close", closeUi);
      cef.on("inv:hotbar", function () {
        var a = Array.prototype.slice.call(arguments);
        if (a.length && Number(a[0]) === 1) dockEnabled = true;
        if (a.length && Number(a[0]) === 0) dockEnabled = false;
        hotbarOnly();
      });
      cef.on("inv:set", function () {
        var a = Array.prototype.slice.call(arguments);
        setItems(a[0]);
      });
      cef.on("inv:ground", function () {
        var a = Array.prototype.slice.call(arguments);
        setGroundItems(a[0] || "");
      });
      cef.on("inv:partner", function () {
        var a = Array.prototype.slice.call(arguments);
        var el = document.getElementById("tradePartner");
        var hint = document.getElementById("tradeHint");
        var titleEl = document.getElementById("tradeTitle");
        if (Number(a[0]) === 1) {
          if (el) el.textContent = String(a[1] || "parceiro perto");
          if (hint) hint.textContent = "enviar = dar ao player";
          if (titleEl) titleEl.textContent = "Troca";
        } else {
          if (groundItems.length > 0) {
            if (el) el.textContent = groundItems.length + " no chao";
            if (hint) hint.textContent = "clique no item pra pegar";
            if (titleEl) titleEl.textContent = "Chao (perto)";
          } else {
            if (el) el.textContent = "solte aqui / enviar";
            if (hint) hint.textContent = "sem parceiro = chao";
            if (titleEl) titleEl.textContent = "Troca / Chao";
          }
        }
      });
    }
  } catch (e) {}

  try {
    var q = new URLSearchParams(location.search);
    if (q.get("preview") === "1") {
      setItems(
        "0|water|Agua|5;1|sandwich|Sanduiche|2;2|apple|Maca|3;3|burger|Burger|1;4|pizza|Pizza|1;5|weapon_m4|M4|1;6|ammo_rifle|Municao|120"
      );
      if (q.get("dock") === "1") {
        dockEnabled = true;
        hotbarOnly();
      } else {
        openUi();
        if (q.get("tab") === "trade") setTab("trade");
      }
    } else {
      dockEnabled = false;
      hotbarOnly();
    }
  } catch (e2) {
    dockEnabled = false;
    hotbarOnly();
  }

  ensureSlots();
  renderAll();
  cefEmit("inv:ready");
})();
