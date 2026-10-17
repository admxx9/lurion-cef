(function () {
  "use strict";

  var root = document.getElementById("root");
  var eye = document.getElementById("eye");
  var panel = document.getElementById("panel");
  var label = document.getElementById("label");
  var opts = document.getElementById("opts");
  var hint = document.querySelector(".hint");
  var lastKey = "";
  var selIndex = 0;
  var isOpen = false;
  var closeSent = false;

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

  function hasMenu() {
    return root.classList.contains("menu");
  }

  function requestClose() {
    if (!isOpen || closeSent) return;
    closeSent = true;
    cefEmit("target:close");
  }

  function applySel(idx) {
    selIndex = Number(idx) || 0;
    var buttons = opts.querySelectorAll(".opt");
    for (var i = 0; i < buttons.length; i++) {
      if (i === selIndex) buttons[i].classList.add("sel");
      else buttons[i].classList.remove("sel");
    }
  }

  function setOpen(on) {
    isOpen = !!on;
    closeSent = false;
    if (on) {
      root.classList.add("on");
      root.classList.remove("off");
    } else {
      root.className = "off";
      lastKey = "";
      selIndex = 0;
      panel.className = "panel";
      eye.className = "eye";
      opts.innerHTML = "";
      if (hint) hint.textContent = "Segure ALT";
    }
  }

  function setMenu(on) {
    if (on) root.classList.add("menu");
    else root.classList.remove("menu");
    if (hint) hint.textContent = on ? "Clique · Y/N · solta ALT" : "Segure ALT";
  }

  function setTarget(etype, eid, name, optionsCsv) {
    var key = String(etype) + ":" + String(eid) + ":" + String(optionsCsv || "");
    if (key === lastKey) return;
    lastKey = key;

    label.textContent = name || "Nada";
    opts.innerHTML = "";
    var has = etype > 0 && optionsCsv;
    eye.className = has ? "eye active" : "eye";
    panel.className = has ? "panel show" : "panel";
    if (!has) return;

    String(optionsCsv).split(";").forEach(function (chunk) {
      if (!chunk) return;
      var parts = chunk.split("|");
      var id = parts[0];
      var title = parts[1] || id;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "opt";
      btn.textContent = title;
      btn.onclick = function () {
        cefEmit("target:select", id);
      };
      opts.appendChild(btn);
    });
    applySel(0);
  }

  function onOpen() { setOpen(true); }
  function onClose() { setOpen(false); }
  function onMenu() {
    var a = Array.prototype.slice.call(arguments);
    setMenu(Number(a[0]) === 1);
  }
  function onSet() {
    var a = Array.prototype.slice.call(arguments);
    setTarget(Number(a[0]) || 0, Number(a[1]) || -1, a[2] || "Nada", a[3] || "");
  }
  function onSel() {
    var a = Array.prototype.slice.call(arguments);
    applySel(a[0]);
  }

  function isAltEvent(ev) {
    return (
      ev.key === "Alt" ||
      ev.code === "AltLeft" ||
      ev.code === "AltRight" ||
      ev.keyCode === 18
    );
  }

  try {
    if (typeof cef !== "undefined" && cef && typeof cef.on === "function") {
      cef.on("target:open", onOpen);
      cef.on("target:close", onClose);
      cef.on("target:set", onSet);
      cef.on("target:menu", onMenu);
      cef.on("target:sel", onSel);
    }
  } catch (e) {}

  // So fecha via CEF quando menu/mouse ativo — senao o blur/keyup matava o olho
  window.addEventListener(
    "keydown",
    function (ev) {
      if (!isAltEvent(ev)) return;
      if (hasMenu()) ev.preventDefault();
    },
    true
  );
  window.addEventListener(
    "keyup",
    function (ev) {
      if (!isAltEvent(ev)) return;
      if (!hasMenu()) return;
      ev.preventDefault();
      requestClose();
    },
    true
  );

  cefEmit("target:ready");
})();
