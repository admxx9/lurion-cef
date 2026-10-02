resourceName = null;
spawnSelectorOpen = false;
const date = new Date();
const weekday = ["Dom.","Seg.","Ter.","Qua.","Qui.","Sex.","Sáb."];
const month = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
isNew = true;
const locationPreviewData = {};
window.addEventListener('message', function(event) {
    ed = event.data;
	if (ed.action === "spawnSelector") {
		if (ed.open === true) {
			resourceName = ed.resourceName;
			spawnSelectorOpen = true;
            document.getElementById("MDBLDWindSpeed").innerHTML=Math.floor(ed.weatherData.windSpeed) + " m/s";
            document.getElementById("MDBLDPlayers").innerHTML=ed.weatherData.playerCount;
            let hour = null;
            let minute = null;
            hour = ed.weatherData.time.hour;
            if (ed.weatherData.time.hour < 10) {
                hour = "0" + ed.weatherData.time.hour;
            }
            minute = ed.weatherData.time.minute;
            if (ed.weatherData.time.minute < 10) {
                minute = "0" + ed.weatherData.time.minute;
            }
            document.getElementById("MDBLDTime").innerHTML=hour + ":" + minute;
            let day = weekday[date.getDay()];
            let name = month[date.getMonth()];
            let dayM = date.getDate();
            document.getElementById("MDBLDDate").innerHTML=day + " " + name;
            let tempLabel = "Celsius";
            if (ed.weatherData.tempType === "f") {
                tempLabel = "Fahrenheit";
            }
            document.getElementById("MDBLDDegree").innerHTML=Math.floor(ed.weatherData.temp) + "° " + tempLabel;
            let weatherLabel = ed.weatherData.weather;
            if (weatherLabel === "extrasunny") {
                weatherLabel = "extra sunny";
            }
            document.getElementById("MDBLDWeather").innerHTML=weatherLabel;
            document.getElementById("MDBLWeatherIcon").className=ed.weatherData.icon;
            if (ed.infos.date === true) {
                document.getElementById("MDBLDivDate").style.display = "flex";
            }
            if (ed.infos.weather === true) {
                document.getElementById("MDBLDivWeather").style.display = "flex";
            }
            if (ed.infos.windSpeed === true) {
                document.getElementById("MDBLDivWindSpeed").style.display = "flex";
            }
            if (ed.infos.temperature === true) {
                document.getElementById("MDBLDivDegree").style.display = "flex";
            }
            if (ed.infos.playerCount === true) {
                document.getElementById("MDBLDivPlayerCount").style.display = "flex";
            }
			body.style.display = "block";
            if (ed.lastLocation === true && isNew === false) {
                document.getElementById("MDBottomCenter").style.display = "flex";
            }
		} else {
			spawnSelectorOpen = false;
			body.style.display = "none";
            document.getElementById("body").innerHTML = `
            <div id="MDTop">
                <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; position: absolute; left: 42%; bottom: 37%; font-size: 30px; color: #A838F8;">
                    <i style="text-shadow: 0px 0px 20px #A838F8;" class="fas fa-map-marker-alt"></i>
                </div>
                <!-- <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; position: relative; font-size: 30px; color: #A838F8;">
                    <i style="text-shadow: 0px 0px 10px #A838F8;" class="fas fa-map-marker-alt"></i>
                </div> -->
                <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 5px;">
                    <h4 style="color: #A838F8; font-size: 20px; font-weight: 600;">Seletor de Spawn</h4>
                    <h4 style="color: #a7b1b9; font-size: 14px;">Clique em um local para nascer lá</h4>
                </div>
            </div>
            <div id="MDBottomCenter">
                <div id="MDBCRadial" onclick="clFunc('spawn', 'lastLocation')"><i style="position: absolute; font-size: 40px;" class="far fa-long-arrow-right"></i></div>
                <h4 id="MDBottomCenterH4">OU <span style="color: #A838F8; border-bottom: 2px solid #A838F8; padding-bottom: 3px;">SPAWNAR</span> NA ÚLTIMA LOCALIZAÇÃO</h4>
            </div>
            <div id="MDBottomLeft">
                <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center;">
                    <h4 style="color: white; font-size: 17px;">Clima da Cidade</h4>
                </div>
                <div id="MDBLInside">
                    <div class="MDBLDiv" id="MDBLDivDate">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="far fa-clock"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 id="MDBLDTime" style="color: white;">10:22</h4>
                            <h4 id="MDBLDDate" style="color: #a7b1b9; font-size: 13px;">Quinta-feira, 14 Dez</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivWeather">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" id="MDBLWeatherIcon" class="fas fa-sun"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Clima</h4>
                            <h4 id="MDBLDWeather" style="color: white; font-size: 13px; text-transform: capitalize;">Névoa</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivWindSpeed">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="far fa-wind"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Velocidade do Vento</h4>
                            <h4 id="MDBLDWindSpeed" style="color: white; font-size: 13px;">3 m/s</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivDegree">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="far fa-temperature-low"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Temperatura</h4>
                            <h4 id="MDBLDDegree" style="color: white; font-size: 13px;">27 Celsius</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivPlayerCount">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="fas fa-users"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Jogadores</h4>
                            <h4 id="MDBLDPlayers" style="color: white; font-size: 13px;">95/128</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div id="MDTLine"></div>
            <div id="MDTLine2"></div>`;
		}
	} else if (ed.action === "setupLocations") {
        ed.locations.forEach(function(ssData, index) {
            locationPreviewData[index] = { label: ssData.label, image: ssData.image || "files/map.png" };
            let label = null;
            if (ssData.label.length >= 14) {
                label = ssData.label.substring(0, 14) + ".";
            } else {
                label = ssData.label;
            }
            var spawnLocationsHTML = `
            <div id="MDMarkerDiv" style="left: ${ssData.ui.x}%; top: ${ssData.ui.y}%;">
                <div class="MDMDLeftSide" id="MDMDLeftSide-${index}" onmouseenter="handlerIn('${index}')" onmouseleave="handlerOut('${index}')" onclick="clFunc('spawn', 'normal', '${ssData.key}')">
                    <div class="MDMDLDDiv1"></div>
                    <div class="MDMDLDDiv2">
                        <i style="transform: rotate(-135deg); font-size: 19px;" class="${ssData.icon}"></i>
                    </div>
                    <div class="MDMDLDDiv3"></div>
                </div>
                <div class="MDMDPreview" id="MDMDPreview-${index}">
                    <img id="MDMDPreviewImg-${index}" src="files/map.png" alt="">
                    <div class="MDMDPreviewFooter" id="MDMDPreviewFooter-${index}">${label}</div>
                </div>
            </div>`;
            appendHtml(document.getElementById("body"), spawnLocationsHTML);
        });
        isNew = false
        if (isNew === false) {
            document.getElementById("MDBottomCenter").style.display = "flex";
        }
    } else if (ed.action === "setupApartments") {
        ed.locations.forEach(function(ssData, index) {
            locationPreviewData[index] = { label: ssData.label, image: ssData.image || "files/map.png" };
            let label = null;
            if (ssData.label.length >= 14) {
                label = ssData.label.substring(0, 14) + ".";
            } else {
                label = ssData.label;
            }
            var spawnLocationsHTML = `
            <div id="MDMarkerDiv" style="left: ${ssData.coords.x}%; top: ${ssData.coords.y}%;">
                <div class="MDMDLeftSide" id="MDMDLeftSide-${index}" onmouseenter="handlerIn('${index}')" onmouseleave="handlerOut('${index}')" onclick="clFunc('spawn', 'apartment', '${ssData.name}')">
                    <div class="MDMDLDDiv1"></div>
                    <div class="MDMDLDDiv2">
                        <i style="transform: rotate(-135deg); font-size: 19px;" class="fad fa-building"></i>
                    </div>
                    <div class="MDMDLDDiv3"></div>
                </div>
                <div class="MDMDPreview" id="MDMDPreview-${index}">
                    <img id="MDMDPreviewImg-${index}" src="files/map.png" alt="">
                    <div class="MDMDPreviewFooter" id="MDMDPreviewFooter-${index}">${label}</div>
                </div>
            </div>`;
			appendHtml(document.getElementById("body"), spawnLocationsHTML);
		});
        isNew = true;
        if (isNew === true) {
            document.getElementById("MDBottomCenter").style.display = "none";
        }
    }
})

function handlerIn(index) {
    const data = locationPreviewData[index] || {};
    const card = document.getElementById("MDMDPreview-" + index);
    const img = document.getElementById("MDMDPreviewImg-" + index);
    const footer = document.getElementById("MDMDPreviewFooter-" + index);

    if (!card) return;
    if (img) img.src = data.image || "files/map.png";
    if (footer) footer.textContent = data.label || "LOCAL";

    // Aeroporto abre o card do lado oposto do botao.
    if ((data.label || "").toLowerCase().includes("airport") || (data.label || "").toLowerCase().includes("aeroporto")) {
        card.classList.add("preview-left");
    } else {
        card.classList.remove("preview-left");
    }

    card.style.display = "flex";
}

function handlerOut(index) {
    const card = document.getElementById("MDMDPreview-" + index);
    if (card) card.style.display = "none";
}

function clFunc(name1, name2, name3, name4, name5, name6) {
	if (name1 === "spawn") {
        if (name2 === "apartment") {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", `https://${resourceName}/spawn`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({type: name2, name: name3}));
            document.getElementById("body").innerHTML = `
            <div id="MDTop">
                <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; position: absolute; left: 42%; bottom: 37%; font-size: 30px; color: #A838F8;">
                    <i style="text-shadow: 0px 0px 20px #A838F8;" class="fas fa-map-marker-alt"></i>
                </div>
                <!-- <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; position: relative; font-size: 30px; color: #A838F8;">
                    <i style="text-shadow: 0px 0px 10px #A838F8;" class="fas fa-map-marker-alt"></i>
                </div> -->
                <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 5px;">
                    <h4 style="color: #A838F8; font-size: 20px; font-weight: 600;">Seletor de Spawn</h4>
                    <h4 style="color: #a7b1b9; font-size: 14px;">Clique em um local para nascer lá</h4>
                </div>
            </div>
            <div id="MDBottomCenter">
                <div id="MDBCRadial" onclick="clFunc('spawn', 'lastLocation')"><i style="position: absolute; font-size: 40px;" class="far fa-long-arrow-right"></i></div>
                <h4 id="MDBottomCenterH4">OU <span style="color: #A838F8; border-bottom: 2px solid #A838F8; padding-bottom: 3px;">SPAWNAR</span> NA ÚLTIMA LOCALIZAÇÃO</h4>
            </div>
            <div id="MDBottomLeft">
                <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center;">
                    <h4 style="color: white; font-size: 17px;">Clima da Cidade</h4>
                </div>
                <div id="MDBLInside">
                    <div class="MDBLDiv" id="MDBLDivDate">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="far fa-clock"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 id="MDBLDTime" style="color: white;">10:22</h4>
                            <h4 id="MDBLDDate" style="color: #a7b1b9; font-size: 13px;">Quinta-feira, 14 Dez</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivWeather">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" id="MDBLWeatherIcon" class="fas fa-sun"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Clima</h4>
                            <h4 id="MDBLDWeather" style="color: white; font-size: 13px; text-transform: capitalize;">Névoa</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivWindSpeed">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="far fa-wind"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Velocidade do Vento</h4>
                            <h4 id="MDBLDWindSpeed" style="color: white; font-size: 13px;">3 m/s</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivDegree">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="far fa-temperature-low"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Temperatura</h4>
                            <h4 id="MDBLDDegree" style="color: white; font-size: 13px;">27 Celsius</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivPlayerCount">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="fas fa-users"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Jogadores</h4>
                            <h4 id="MDBLDPlayers" style="color: white; font-size: 13px;">95/128</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div id="MDTLine"></div>
            <div id="MDTLine2"></div>`;
        } else {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", `https://${resourceName}/spawn`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({type: name2, x: Number(name3), y: Number(name4), z: Number(name5), w: Number(name6)}));
            document.getElementById("body").innerHTML = `
            <div id="MDTop">
                <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; position: absolute; left: 42%; bottom: 37%; font-size: 30px; color: #A838F8;">
                    <i style="text-shadow: 0px 0px 20px #A838F8;" class="fas fa-map-marker-alt"></i>
                </div>
                <!-- <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; position: relative; font-size: 30px; color: #A838F8;">
                    <i style="text-shadow: 0px 0px 10px #A838F8;" class="fas fa-map-marker-alt"></i>
                </div> -->
                <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 5px;">
                    <h4 style="color: #A838F8; font-size: 20px; font-weight: 600;">Seletor de Spawn</h4>
                    <h4 style="color: #a7b1b9; font-size: 14px;">Clique em um local para nascer lá</h4>
                </div>
            </div>
            <div id="MDBottomCenter">
                <div id="MDBCRadial" onclick="clFunc('spawn', 'lastLocation')"><i style="position: absolute; font-size: 40px;" class="far fa-long-arrow-right"></i></div>
                <h4 id="MDBottomCenterH4">OU <span style="color: #A838F8; border-bottom: 2px solid #A838F8; padding-bottom: 3px;">SPAWNAR</span> NA ÚLTIMA LOCALIZAÇÃO</h4>
            </div>
            <div id="MDBottomLeft">
                <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center;">
                    <h4 style="color: white; font-size: 17px;">Clima da Cidade</h4>
                </div>
                <div id="MDBLInside">
                    <div class="MDBLDiv" id="MDBLDivDate">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="far fa-clock"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 id="MDBLDTime" style="color: white;">10:22</h4>
                            <h4 id="MDBLDDate" style="color: #a7b1b9; font-size: 13px;">Quinta-feira, 14 Dez</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivWeather">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" id="MDBLWeatherIcon" class="fas fa-sun"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Clima</h4>
                            <h4 id="MDBLDWeather" style="color: white; font-size: 13px; text-transform: capitalize;">Névoa</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivWindSpeed">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="far fa-wind"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Velocidade do Vento</h4>
                            <h4 id="MDBLDWindSpeed" style="color: white; font-size: 13px;">3 m/s</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivDegree">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="far fa-temperature-low"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Temperatura</h4>
                            <h4 id="MDBLDDegree" style="color: white; font-size: 13px;">27 Celsius</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivPlayerCount">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="fas fa-users"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Jogadores</h4>
                            <h4 id="MDBLDPlayers" style="color: white; font-size: 13px;">95/128</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div id="MDTLine"></div>
            <div id="MDTLine2"></div>`;
        }
	}
}

function appendHtml(el, str) {
	var div = document.createElement('div');
	div.innerHTML = str;
	while (div.children.length > 0) {
		el.appendChild(div.children[0]);
	}
}