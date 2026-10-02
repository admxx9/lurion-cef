let lastRadio = 'Offline';
let voice = 'Médio';

function updateTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('horas').innerHTML =
    String(hours).padStart(2, '0') + ':' + minutes;
}

setInterval(updateTime, 1000);

cef.on('hud:stats', (street, pearls, life, armour, thirst, hunger) => {
  setPlayerStats(street, pearls, life, armour, thirst, hunger);
});

function setPlayerStats(street, pearls, life, armour, thirst, hunger) {
  if (street) {
    document.getElementById('rua').textContent = street;
  }
  document.getElementById('radio').textContent = lastRadio;
  document.getElementById('perolas').textContent = pearls;
  document.querySelector('.lifeFill').style.strokeDashoffset =
    125 * (100 - life) / 100;
  document.querySelector('.ArmourFill').style.strokeDashoffset =
    125 * (100 - armour) / 100;
  document.querySelector('.sedeFill').style.strokeDashoffset =
    125 * (100 - thirst) / 100;
  document.querySelector('.HungerFill').style.strokeDashoffset =
    125 * (100 - hunger) / 100;
}

cef.on(
  'hud:vehicle',
  (
    inVehicle,
    engineHealth,
    speed,
    fuel,
    nitroLevel,
    seatbelt,
    tyreState,
    locked,
    headlights,
    radarX,
    radarY,
    radarHeading
  ) => {
    setVehicleStats(
      inVehicle,
      engineHealth,
      speed,
      fuel,
      nitroLevel,
      seatbelt,
      tyreState,
      locked,
      headlights
    );

    if (typeof window.lurionRadarVehicleUpdate === 'function') {
      window.lurionRadarVehicleUpdate(
        inVehicle,
        radarX,
        radarY,
        radarHeading,
        speed
      );
    }
  }
);

function setVehicleStats(
  inVehicle,
  engineHealth,
  speed,
  fuel,
  nitroLevel,
  seatbelt,
  tyreState,
  locked,
  headlights
) {
  const carContainer = document.getElementById('car-container');

  if (inVehicle) {
    carContainer.style.display = 'block';

    document.getElementById('rpm').style.strokeDasharray =
      speed * 10 / 100 + 31 + 'rem';
    document.getElementById('fuel').style.strokeDasharray =
      9 + fuel * 7.5 / 100 + 'rem';

    const nitroPct = getPorcent(nitroLevel, 2000);
    document.getElementById('nitro').style.strokeDasharray =
      9 + nitroPct * 7.5 / 100 + 'rem';

    const seatbeltEl = document.querySelector('.Seatbelt');
    seatbeltEl.classList.toggle('Green', seatbelt === 1);
    seatbeltEl.classList.toggle('Gray', seatbelt !== 1);

    const healthCar = document.querySelector('.HealthCar');
    healthCar.classList.remove('Gray', 'Yellow', 'Red');
    if (engineHealth >= 501) {
      healthCar.classList.add('Gray');
    } else if (engineHealth <= 500 && engineHealth >= 200) {
      healthCar.classList.add('Yellow');
    } else {
      healthCar.classList.add('Red');
    }

    const tyres = document.querySelector('.Tyres');
    tyres.classList.remove('Gray', 'Yellow', 'Red');
    if (tyreState === 0) {
      tyres.classList.add('Gray');
    } else if (tyreState === 1) {
      tyres.classList.add('Yellow');
    } else {
      tyres.classList.add('Red');
    }

    const headlightEl = document.querySelector('.Headlight');
    headlightEl.classList.toggle('Blue', headlights === 1);
    headlightEl.classList.toggle('Gray', headlights !== 1);

    const lockedEl = document.querySelector('.Locked');
    lockedEl.classList.toggle('Gray', locked === 1);
    lockedEl.classList.toggle('Green', locked !== 1);

    const mileage = document.querySelector('.mileage-frame p');
    if (speed < 9) {
      mileage.innerHTML = '<span>00</span>' + speed;
    } else if (speed < 99) {
      mileage.innerHTML = '<span>0</span>' + speed;
    } else {
      mileage.innerHTML = String(speed);
    }
  } else {
    carContainer.style.display = 'none';
  }
}

function setProgressSpeed(percent, selector) {
  const el = document.querySelector(selector);
  const radius = el.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;
  const progress = (percent * 100) / 220;

  el.style.strokeDasharray = circumference + ' ' + circumference;
  el.style.strokeDashoffset = '' + circumference;

  const offset =
    circumference - (-progress * 73 / 100 / 100) * circumference;
  el.style.strokeDashoffset = -offset;
}

function setCircle(value, className) {
  const el = document.querySelector('.' + className);
  el.style.strokeDashoffset = 125 * (100 - value) / 100;
}

function getPorcent(value = 0, max = 0) {
  return (value * 100) / max;
}


/* Coordenadas do marker chegam do Pawn e sao repassadas ao plugin nativo. */
cef.on('lurion:marker:set', (x, y, z) => {
  cef.emit('lurion:marker:set-native', Number(x), Number(y), Number(z));
});

/* ===================== Lurion Marker Editor ===================== */
const lurionMarkerEditor = {
  open: false,
  x: 0,
  y: 0,
  z: 0,
  step: 0.05
};

function markerEditorEnsureUI() {
  if (document.getElementById('lurion-marker-editor')) return;

  const style = document.createElement('style');
  style.id = 'lurion-marker-editor-style';
  style.textContent = `
    #lurion-marker-editor{
      position:fixed; right:28px; top:50%; transform:translateY(-50%);
      width:310px; padding:18px; z-index:999999;
      background:rgba(12,12,14,.94); border:1px solid rgba(255,255,255,.12);
      border-radius:14px; color:#fff; font-family:Arial,sans-serif;
      box-shadow:0 18px 55px rgba(0,0,0,.45); display:none;
      user-select:none;
    }
    #lurion-marker-editor .lm-title{font-size:16px;font-weight:700;margin-bottom:4px}
    #lurion-marker-editor .lm-sub{font-size:11px;color:#aaa;margin-bottom:14px}
    #lurion-marker-editor .lm-coords{display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;margin-bottom:12px}
    #lurion-marker-editor .lm-coord{background:#18181b;border:1px solid #29292f;border-radius:9px;padding:8px;text-align:center}
    #lurion-marker-editor .lm-coord b{display:block;font-size:10px;color:#888;margin-bottom:3px}
    #lurion-marker-editor .lm-coord span{font-size:12px}
    #lurion-marker-editor .lm-row{display:grid;grid-template-columns:36px 1fr 36px;gap:7px;align-items:center;margin:7px 0}
    #lurion-marker-editor .lm-row label{text-align:center;font-size:12px;color:#bbb}
    #lurion-marker-editor button,#lurion-marker-editor select{
      height:34px;border:1px solid #303036;background:#1b1b1f;color:#fff;
      border-radius:8px;outline:none;cursor:pointer;
    }
    #lurion-marker-editor button:hover{background:#29292f}
    #lurion-marker-editor .lm-tools{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:12px}
    #lurion-marker-editor .lm-save{background:#f0f0f0;color:#111;font-weight:700}
    #lurion-marker-editor .lm-cancel{background:#242428}
    #lurion-marker-editor .lm-full{grid-column:1/-1}
    #lurion-marker-editor .lm-step{display:grid;grid-template-columns:80px 1fr;gap:7px;align-items:center;margin-top:10px}
    #lurion-marker-editor .lm-step span{font-size:11px;color:#999}
  `;
  document.head.appendChild(style);

  const el = document.createElement('div');
  el.id = 'lurion-marker-editor';
  el.innerHTML = `
    <div class="lm-title">EDITOR DE MARKER</div>
    <div class="lm-sub">Garagem • ajuste em tempo real</div>
    <div class="lm-coords">
      <div class="lm-coord"><b>X</b><span id="lm-x">0.000</span></div>
      <div class="lm-coord"><b>Y</b><span id="lm-y">0.000</span></div>
      <div class="lm-coord"><b>Z</b><span id="lm-z">0.000</span></div>
    </div>
    <div class="lm-row"><button data-axis="x" data-dir="-1">−</button><label>X</label><button data-axis="x" data-dir="1">+</button></div>
    <div class="lm-row"><button data-axis="y" data-dir="-1">−</button><label>Y</label><button data-axis="y" data-dir="1">+</button></div>
    <div class="lm-row"><button data-axis="z" data-dir="-1">−</button><label>Z / ALTURA</label><button data-axis="z" data-dir="1">+</button></div>
    <div class="lm-step"><span>PRECISÃO</span><select id="lm-step"><option value="0.01">0.01</option><option value="0.05" selected>0.05</option><option value="0.10">0.10</option><option value="0.25">0.25</option><option value="0.50">0.50</option><option value="1.00">1.00</option></select></div>
    <div class="lm-tools">
      <button id="lm-here" class="lm-full">SPAWNAR NA MINHA POSIÇÃO</button>
      <button id="lm-cancel" class="lm-cancel">CANCELAR</button>
      <button id="lm-save" class="lm-save">SALVAR</button>
    </div>
  `;
  document.body.appendChild(el);

  el.querySelectorAll('button[data-axis]').forEach(btn => {
    btn.addEventListener('click', () => {
      const axis = btn.dataset.axis;
      const dir = Number(btn.dataset.dir);
      lurionMarkerEditor[axis] += lurionMarkerEditor.step * dir;
      markerEditorApply(true);
    });
  });

  document.getElementById('lm-step').addEventListener('change', e => {
    lurionMarkerEditor.step = Number(e.target.value) || 0.05;
  });
  document.getElementById('lm-here').addEventListener('click', () => cef.emit('lurion:marker:editor:here'));
  document.getElementById('lm-save').addEventListener('click', () => cef.emit('lurion:marker:editor:save'));
  document.getElementById('lm-cancel').addEventListener('click', () => cef.emit('lurion:marker:editor:cancel'));
}

function markerEditorRefreshText() {
  const fx = document.getElementById('lm-x');
  const fy = document.getElementById('lm-y');
  const fz = document.getElementById('lm-z');
  if (fx) fx.textContent = lurionMarkerEditor.x.toFixed(3);
  if (fy) fy.textContent = lurionMarkerEditor.y.toFixed(3);
  if (fz) fz.textContent = lurionMarkerEditor.z.toFixed(3);
}

function markerEditorApply(syncPawn) {
  markerEditorRefreshText();
  cef.emit('lurion:marker:set-native',
    Number(lurionMarkerEditor.x),
    Number(lurionMarkerEditor.y),
    Number(lurionMarkerEditor.z)
  );
  if (syncPawn) {
    cef.emit(
      'lurion:marker:editor:set',
      lurionMarkerEditor.x.toFixed(6) + '|' +
      lurionMarkerEditor.y.toFixed(6) + '|' +
      lurionMarkerEditor.z.toFixed(6)
    );
  }
}

cef.on('lurion:marker:editor:open', (x, y, z) => {
  markerEditorEnsureUI();
  lurionMarkerEditor.open = true;
  lurionMarkerEditor.x = Number(x);
  lurionMarkerEditor.y = Number(y);
  lurionMarkerEditor.z = Number(z);
  markerEditorApply(false);
  document.getElementById('lurion-marker-editor').style.display = 'block';
});

cef.on('lurion:marker:editor:update', (x, y, z) => {
  if (!lurionMarkerEditor.open) return;
  lurionMarkerEditor.x = Number(x);
  lurionMarkerEditor.y = Number(y);
  lurionMarkerEditor.z = Number(z);
  markerEditorApply(false);
});

cef.on('lurion:marker:editor:close', () => {
  lurionMarkerEditor.open = false;
  const el = document.getElementById('lurion-marker-editor');
  if (el) el.style.display = 'none';
});

/* Lurion native world marker: HUD signals gameplay ready. Rendering is GTA-native. */
function lurionNativeMarkerReady(){
  if (typeof cef !== 'undefined') cef.emit('lurion:marker:ready');
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', lurionNativeMarkerReady, { once:true });
} else {
  lurionNativeMarkerReady();
}
