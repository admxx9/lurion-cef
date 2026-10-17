(function () {
  "use strict";

  var root = document.getElementById("root");
  var bars = document.getElementById("bars");
  var selLiters = document.getElementById("selLiters");
  var priceL = document.getElementById("priceL");
  var inTank = document.getElementById("inTank");
  var total = document.getElementById("total");
  var btnBuy = document.getElementById("btnBuy");
  var btnBuyLabel = document.getElementById("btnBuyLabel");
  var fillStatus = document.getElementById("fillStatus");
  var perLiter = 13;
  var maxNeed = 100;
  var tankNow = 0;
  var selected = 20;
  var filling = false;

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

  function buildBars() {
    bars.innerHTML = "";
    for (var i = 0; i < 31; i++) {
      var el = document.createElement("i");
      bars.appendChild(el);
    }
  }

  function setFillingUi(on) {
    filling = !!on;
    root.classList.toggle("filling", filling);
    btnBuy.disabled = filling;
    btnBuyLabel.textContent = filling ? "Abastecendo..." : "Checkout";
    if (fillStatus) fillStatus.className = filling ? "fill-status on" : "fill-status";
  }

  function refresh() {
    if (selected > maxNeed) selected = maxNeed;
    if (selected < 1) selected = 1;
    selLiters.textContent = String(selected);
    priceL.textContent = "$" + perLiter + ".00";
    inTank.textContent = String(tankNow);
    total.textContent = "$" + selected * perLiter + ".00";

    var filled = Math.round((selected / 100) * 31);
    if (filling) filled = Math.round((tankNow / 100) * 31);
    var nodes = bars.querySelectorAll("i");
    for (var i = 0; i < nodes.length; i++) {
      if (i < filled) nodes[i].className = "on";
      else nodes[i].className = "";
    }

    document.querySelectorAll(".mid").forEach(function (btn) {
      var pct = Number(btn.getAttribute("data-pct"));
      var litersFromPct = Math.max(1, Math.round((pct / 100) * maxNeed));
      if (!filling && (litersFromPct === selected || (pct === 100 && selected === maxNeed)))
        btn.classList.add("on");
      else btn.classList.remove("on");
    });
  }

  function open() {
    var a = Array.prototype.slice.call(arguments);
    maxNeed = Number(a[0]) || 100;
    perLiter = Number(a[2]) || 13;
    tankNow = Number(a[3]) || 0;
    selected = Math.min(20, maxNeed);
    setFillingUi(false);
    root.className = "on";
    refresh();
  }

  function closeUi() {
    setFillingUi(false);
    root.className = "off";
  }

  document.querySelectorAll(".top").forEach(function (btn) {
    btn.onclick = function () {
      if (filling) return;
      document.querySelectorAll(".top").forEach(function (b) {
        b.classList.remove("on");
      });
      btn.classList.add("on");
    };
  });

  document.querySelectorAll(".mid").forEach(function (btn) {
    btn.onclick = function () {
      if (filling) return;
      var pct = Number(btn.getAttribute("data-pct")) || 25;
      selected = Math.max(1, Math.round((pct / 100) * maxNeed));
      refresh();
    };
  });

  btnBuy.onclick = function () {
    if (filling) return;
    cefEmit("gas:buy", selected);
  };

  document.addEventListener("keydown", function (ev) {
    if (filling) return;
    if (ev.key === "Escape" || ev.key === "Backspace") cefEmit("gas:close");
  });

  buildBars();

  try {
    if (typeof cef !== "undefined" && cef && typeof cef.on === "function") {
      cef.on("gas:open", open);
      cef.on("gas:close", closeUi);
      cef.on("gas:filling", function () {
        setFillingUi(true);
        if (fillStatus) fillStatus.textContent = "Abastecendo tanque...";
        refresh();
      });
      cef.on("gas:progress", function () {
        var a = Array.prototype.slice.call(arguments);
        tankNow = Number(a[0]) || tankNow;
        refresh();
      });
      cef.on("gas:filldone", function () {
        setFillingUi(false);
        closeUi();
      });
      cef.on("gas:nomoney", function () {
        if (fillStatus) {
          fillStatus.textContent = "Sem dinheiro suficiente";
          fillStatus.className = "fill-status on warn";
          setTimeout(function () {
            fillStatus.className = "fill-status";
          }, 2500);
        }
      });
    }
  } catch (e) {}

  try {
    var q = new URLSearchParams(location.search);
    if (q.get("preview") === "1") open(60, 0, 13, 40);
  } catch (e) {}

  cefEmit("gas:ready");
})();
