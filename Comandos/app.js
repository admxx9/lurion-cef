(function () {
  const box = document.getElementById("box");
  const btn = document.getElementById("btnClose");
  let closing = false;
  let allowKeys = false;

  function cefEmit(eventName, ...args) {
    try {
      if (typeof cef !== "undefined" && typeof cef.emit === "function") {
        cef.emit(eventName, ...args);
        return true;
      }
    } catch (e) {}
    return false;
  }

  function resetUi() {
    closing = false;
    if (box) {
      box.style.display = "";
      box.classList.add("is-on");
      box.classList.remove("is-out");
    }
    // Ignora Enter residual do chat (/comandos).
    allowKeys = false;
    setTimeout(function () { allowKeys = true; }, 400);
  }

  function closeHelp() {
    if (closing) return;
    closing = true;
    cefEmit("help:close");
  }

  btn.addEventListener("click", closeHelp);

  document.addEventListener("keydown", function (ev) {
    if (!allowKeys || closing) return;
    // Nao fecha no Enter — so Escape / botao JOGAR.
    if (ev.key === "Escape") {
      ev.preventDefault();
      closeHelp();
    }
  });

  resetUi();

  function ready() {
    resetUi();
    cefEmit("help:ready");
  }

  if (document.readyState === "complete") ready();
  else window.addEventListener("load", ready);
})();
