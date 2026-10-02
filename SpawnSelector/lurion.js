const lurionEmit = (name, ...args) => {
    try {
        if (window.cef && cef.emit) cef.emit(name, ...args);
    } catch (e) {}
};

const lurionOn = (name, cb) => {
    try {
        if (window.cef && cef.on) cef.on(name, cb);
    } catch (e) {}
};

const lurionLocations = [
    {
        key: "delperro",
        label: "Píer de Del Perro",
        icon: "fas fa-water",
        image: "files/map-ui.png",
        ui: { x: 32.5, y: 23 }
    },
    {
        key: "celltowa",
        label: "Hotel Celltowa",
        icon: "fas fa-building",
        image: "files/map-ui.png",
        ui: { x: 34, y: 31.5 }
    },
    {
        key: "airport",
        label: "Aeroporto de LS",
        icon: "fas fa-plane",
        image: "files/map-ui.png",
        ui: { x: 21, y: 31.5 }
    },
    {
        key: "pinkcage",
        label: "Hotel Pinkcage",
        icon: "fas fa-hotel",
        image: "files/map-ui.png",
        ui: { x: 38.5, y: 43 }
    }
];

function lurionOpenSelector(hasLastLocation) {
    window.dispatchEvent(new MessageEvent("message", {
        data: {
            action: "spawnSelector",
            open: true,
            resourceName: "lurion",
            lastLocation: Number(hasLastLocation) === 1,
            infos: {
                date: false,
                weather: false,
                windSpeed: false,
                temperature: false,
                playerCount: false
            },
            weatherData: {
                windSpeed: 0,
                playerCount: "",
                time: { hour: 0, minute: 0 },
                tempType: "c",
                temp: 0,
                weather: "",
                icon: "fas fa-sun"
            }
        }
    }));

    window.dispatchEvent(new MessageEvent("message", {
        data: {
            action: "setupLocations",
            locations: lurionLocations
        }
    }));
}

let lurionSpawnTransitionLocked = false;

function lurionEnsureSpawnFade() {
    let fade = document.getElementById("spawnFade");
    if (!fade) {
        fade = document.createElement("div");
        fade.id = "spawnFade";
        fade.className = "spawn-fade reveal";
        document.body.appendChild(fade);
    }
    return fade;
}

function lurionRevealSpawnSelector() {
    lurionSpawnTransitionLocked = false;
    const fade = lurionEnsureSpawnFade();
    fade.classList.remove("reveal");
    setTimeout(() => fade.classList.add("reveal"), 350);
}

function lurionBeginSpawnTransition(key) {
    if (lurionSpawnTransitionLocked) return;
    lurionSpawnTransitionLocked = true;
    const fade = lurionEnsureSpawnFade();
    fade.classList.remove("reveal");
    setTimeout(() => lurionEmit("spawn:select", String(key)), 1050);
}

window.clFunc = function(name1, name2, key) {
    if (name1 !== "spawn") return;
    if (name2 === "lastLocation") return lurionBeginSpawnTransition("last");
    if (name2 === "normal" && key) lurionBeginSpawnTransition(key);
};

lurionOn("spawn:show", (hasLastLocation) => {
    lurionOpenSelector(hasLastLocation);
    lurionRevealSpawnSelector();
});

lurionOn("spawn:error", (message) => {
    lurionSpawnTransitionLocked = false;
    const fade = lurionEnsureSpawnFade();
    fade.classList.add("reveal");
    console.warn("Spawn selector:", message || "erro");
});

window.addEventListener("DOMContentLoaded", () => {
    lurionEmit("spawn:ready");
});


/* LURION: base 1920x1080; reduz em telas menores e nunca passa de 100% */
const LURION_SPAWN_WIDTH = 1920;
const LURION_SPAWN_HEIGHT = 1080;

function lurionFitSpawnSelector() {
    const body = document.getElementById("body");
    if (!body) return;

    const scale = Math.min(
        1,
        window.innerWidth / LURION_SPAWN_WIDTH,
        window.innerHeight / LURION_SPAWN_HEIGHT
    );

    body.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

window.addEventListener("resize", lurionFitSpawnSelector);

if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", lurionFitSpawnSelector);
} else {
    lurionFitSpawnSelector();
}
