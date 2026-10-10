const state={
  username:"Jogador",characters:[],selected:null,gender:"masculine",
  stage:1,parent:0,tone:0,category:"tshirt",
  clothes:{tshirt:0,pants:1,feet:0,accessory:0},
  variants:{tshirt:0,pants:0,feet:0,accessory:0}
};
const $=id=>document.getElementById(id);
let lobbyRevealDone=false;
const emit=(name,...args)=>{try{if(window.cef&&cef.emit)cef.emit(name,...args)}catch(e){}};
const on=(name,cb)=>{try{if(window.cef&&cef.on)cef.on(name,cb)}catch(e){}};
// O parentesco agora e aplicado pela gamemode via skin/DFF real.
const syncParent=index=>{ state.parent=Number(index)||0; };

const tips=[
  "Cada personagem possui sua própria história e progresso.",
  "Seu personagem salva posição, dinheiro, vida e aparência separadamente.",
  "Escolha com cuidado qual vida você quer continuar.",
  "Use o card + para criar uma nova história em Lurion RP."
];
const parents=["Adrian","Alex","Amelia","Andrew","Angel","Anthony","Ashley","Audrey","Ava","Benjamin"];

const clothing={
 masculine:{
  tshirt:Array.from({length:12},(_,i)=>({id:i+1,name:"Camiseta "+(i+1),icon:"icon_male_tshirt_"+(i+1)+".png"})),
  pants:Array.from({length:8},(_,i)=>({id:i+1,name:i===0?"Cueca":"Calça "+(i+1),icon:"icon_male_pants_"+(i+1)+".png"})),
  feet:Array.from({length:8},(_,i)=>({id:i+1,name:"Calçado "+(i+1),icon:"icon_male_feet_"+(i+1)+".png"})),
  accessory:[
   {id:0,name:"Sem acessório",icon:"icon_unknown.png"},
   {id:1,name:"Acessório",icon:"icon_male_acess_2.png"},
   {id:2,name:"Mochila",icon:"icon_male_backpack_1.png"}
  ]
 },
 feminine:{
  tshirt:Array.from({length:12},(_,i)=>({id:i+1,name:"Camiseta "+(i+1),icon:"icon_female_tshirt_"+(i+1)+".png"})),
  pants:[1,2,3,4,5,6,8,9,10].map(i=>({id:i,name:i===1?"Roupa base":"Calça "+i,icon:"icon_female_pants_"+i+".png"})),
  feet:Array.from({length:9},(_,i)=>({id:i+1,name:"Calçado "+(i+1),icon:"icon_female_feet_"+(i+1)+".png"})),
  accessory:[
   {id:0,name:"Sem acessório",icon:"icon_unknown.png"},
   {id:1,name:"Acessório 1",icon:"icon_female_acess_1.png"},
   {id:2,name:"Acessório 2",icon:"icon_female_acess_2.png"},
   {id:3,name:"Mochila",icon:"icon_female_backpack_1.png"}
  ]
 }
};

// Bancos de estampas originais do Pixel Characters.
// 0 = textura original da peca; 1..max = variacoes do banco Sailor compatível.
const variationMap={
 tshirt:{
  1:{alias:"t1",max:1}, 2:{alias:"t2",max:82}, 3:{alias:"t3",max:69}, 4:{alias:"t4",max:60},
  5:{alias:"t4",max:60}, 6:{alias:"t4",max:60}, 7:{alias:"t4",max:60}, 8:{alias:"t3",max:69},
  9:{alias:"t4",max:60},10:{alias:"t2",max:82},11:{alias:"t3",max:69},12:{alias:"t4",max:60}
 },
 pants:{
  1:{alias:"l1",max:4},2:{alias:"l2",max:26},3:{alias:"l2",max:26},4:{alias:"l3",max:31},
  5:{alias:"l3",max:31},6:{alias:"l3",max:31},7:{alias:"l3",max:31},8:{alias:"l4",max:14}
 },
 feet:{
  1:{alias:"s1",max:16},2:{alias:"b1",max:23},3:{alias:"b2",max:55},4:{alias:"b1",max:23},
  5:{alias:"b3",max:16},6:{alias:"b2",max:55},7:{alias:"b4",max:10},8:{alias:"b5",max:10}
 },
 accessory:{
  1:{alias:"h1",max:11},2:{alias:"bp1",max:29}
 }
};


function greeting(){
 const h=new Date().getHours();
 return h<6?"Boa madrugada":h<12?"Bom dia":h<18?"Boa tarde":"Boa noite";
}
function updateHeader(){
 $("greeting").textContent=greeting();
 $("username").textContent=state.username;
 $("date").textContent=new Date().toLocaleDateString("pt-BR");
}
function formatTime(min){min=Number(min)||0;return min>=60?Math.floor(min/60)+" hora(s)":min+" minuto(s)"}

function renderCharacters(){
 const list=$("characters"); list.innerHTML="";
 if(!state.characters.length){
  const c=document.createElement("div");
  c.className="character-card create";
  c.innerHTML='<div class="plus-circle">+</div><div class="create-copy"><strong>Criar personagem</strong><span>Comece uma nova vida</span></div>';
  c.onclick=showCreator; list.appendChild(c); return;
 }
 state.characters.forEach(ch=>{
  const c=document.createElement("div");
  c.className="character-card"+(state.selected===ch.id?" active":"");
  c.dataset.characterId=String(ch.id);
  c.innerHTML='<h1>'+ch.first+' '+ch.last+'</h1><p>Trabalho: '+ch.job+'<br>Jogou por '+formatTime(ch.playtime)+'</p>';
  c.onclick=()=>selectCharacter(ch.id); list.appendChild(c);
 });
 if(state.characters.length<3){
  const c=document.createElement("div");
  c.className="character-card create";
  c.innerHTML='<div class="plus-circle">+</div><div class="create-copy"><strong>Criar personagem</strong><span>Adicionar outro personagem</span></div>';
  c.onclick=showCreator; list.appendChild(c);
 }
}
function selectCharacter(id){
 const next=Number(id);
 if(state.selected===next)return;

 state.selected=next;
 document.querySelectorAll(".character-card[data-character-id]").forEach(card=>{
  card.classList.toggle("active",Number(card.dataset.characterId)===next);
 });
 emit("lobby:select",String(next));
}

function showCreator(){
 state.stage=1; state.parent=0; state.tone=0; state.category="tshirt";
 state.clothes={tshirt:0,pants:1,feet:0,accessory:0};
 state.variants={tshirt:0,pants:0,feet:0,accessory:0};
 $("lobbyView").classList.add("hidden");
 $("createView").classList.remove("hidden");
 $("error").textContent="";
 setStage(1);
 emit("lobby:create");
}
function showLobby(){
 $("createView").classList.add("hidden");
 $("lobbyView").classList.remove("hidden");
 renderCharacters();
}
function setStage(n){
 state.stage=n;
 [1,2,3].forEach(i=>$("stage"+i).classList.toggle("stage-hidden",i!==n));
 document.querySelectorAll(".steps .hex").forEach((el,i)=>{
  el.classList.toggle("active",i===n-1);
  el.classList.toggle("disabled",i!==n-1);
 });
 $("createBtn").textContent=n===3?"CRIAR PERSONAGEM":"CONTINUAR";
 $("error").textContent="";
 if(n===2){renderParents();emit("character:stage","parent");}
 if(n===3){renderClothes();emit("character:stage","tshirt");}
}
function validateStage1(){
 const first=$("firstName").value.trim(),last=$("lastName").value.trim(),age=parseInt($("age").value,10);
 if(!first||!last||!age){$("error").textContent="Preencha todos os campos.";return false}
 if(age<18||age>60){$("error").textContent="A idade deve estar entre 18 e 60 anos.";return false}
 const re=/^[A-Za-zÀ-ÿ]+$/;
 if(!re.test(first)||!re.test(last)){$("error").textContent="Use apenas letras no nome e sobrenome.";return false}
 return true;
}
function setGender(g){
 state.gender=g;
 $("male").classList.toggle("active",g==="masculine");
 $("female").classList.toggle("active",g==="feminine");
 $("docGender").textContent=g==="masculine"?"Masculino":"Feminino";
 state.clothes={tshirt:0,pants:1,feet:0,accessory:0};
 state.variants={tshirt:0,pants:0,feet:0,accessory:0};
 emit("character:gender",g);
}
function syncDoc(){
 $("docFirst").textContent=$("firstName").value||"Jhon";
 $("docLast").textContent=$("lastName").value||"Doe";
 $("docAge").textContent=$("age").value||"N/A";
}
function renderParents(){
 const grid=$("parentsGrid");grid.innerHTML="";
 parents.forEach((name,index)=>{
  const locked=index!==0;
  const b=document.createElement("button");
  b.type="button";
  b.disabled=locked;
  b.className="parent-card"+(state.parent===index?" active":"")+(locked?" locked":"");
  b.innerHTML='<img src="assets/creator/parents/'+name+'.png"><span>'+name+'</span>'+(locked?'<div class="parent-lock"><span class="lock-icon">🔒</span></div>':'');
  if(!locked)b.onclick=()=>{state.parent=0;renderParents();emit("character:parent","0|"+String(state.tone));};
  grid.appendChild(b);
 });
}
function currentVariationConfig(){
 if(state.gender!=="masculine")return null;
 const cat=state.category,itemId=state.clothes[cat];
 return (variationMap[cat]&&variationMap[cat][itemId])||null;
}
function updateVariationReadout(){
 const cfg=currentVariationConfig(),range=$("variationRange"),value=$("variationValue");
 if(!cfg||!range||!value)return;
 const v=Number(range.value)||0;
 value.textContent=v===0?"ORIGINAL":String(v)+" / "+String(cfg.max);
 const pct=cfg.max>0?(v/cfg.max)*100:0;
 range.style.setProperty("--range-fill",pct+"%");
}
function renderVariationPanel(){
 const panel=$("variationPanel"),range=$("variationRange");
 if(!panel||!range)return;
 const cat=state.category,itemId=state.clothes[cat],cfg=currentVariationConfig();
 const items=clothing[state.gender][cat]||[];
 const item=items.find(x=>x.id===itemId);

 if(!cfg||cfg.max<1||!item){
  panel.classList.add("variation-hidden");
  return;
 }
 panel.classList.remove("variation-hidden");
 $("variationPiece").textContent=item.name;
 $("variationMax").textContent=String(cfg.max);
 const v=Math.max(0,Math.min(Number(state.variants[cat])||0,cfg.max));
 state.variants[cat]=v;
 range.min="0";range.max=String(cfg.max);range.value=String(v);
 updateVariationReadout();
}
let variationEmitTimer=null;
function queueVariationEmit(){
 const cat=state.category,v=Number($("variationRange").value)||0;
 state.variants[cat]=v;
 updateVariationReadout();
 clearTimeout(variationEmitTimer);
 variationEmitTimer=setTimeout(()=>emit("character:clothingVariant",cat+"|"+String(v)),80);
}
function renderClothes(){
 document.querySelectorAll(".clothes-tab").forEach(b=>b.classList.toggle("active",b.dataset.cat===state.category));
 const grid=$("clothesGrid");grid.innerHTML="";
 const items=clothing[state.gender][state.category]||[];
 items.forEach(item=>{
  const b=document.createElement("button");
  b.className="clothe-card"+(state.clothes[state.category]===item.id?" active":"");
  b.innerHTML='<img src="assets/creator/clothe_icons/'+item.icon+'"><span>'+item.name+'</span>';
  b.onclick=()=>{
   state.clothes[state.category]=item.id;
   state.variants[state.category]=0;
   emit("character:clothing",state.category+"|"+String(item.id));
   renderClothes();
  };
  grid.appendChild(b);
 });
 renderVariationPanel();
}
function finishCharacter(){
 const first=$("firstName").value.trim(),last=$("lastName").value.trim(),age=parseInt($("age").value,10);
 const p=[first,last,age,state.gender,state.parent,state.tone,
  state.clothes.tshirt,state.clothes.pants,state.clothes.feet,state.clothes.accessory,
  state.variants.tshirt,state.variants.pants,state.variants.feet,state.variants.accessory].join("|");
 $("error").textContent="Criando personagem...";
 emit("character:create",p);
}

$("male").onclick=()=>setGender("masculine");
$("female").onclick=()=>setGender("feminine");
["firstName","lastName","age"].forEach(id=>$(id).addEventListener("input",syncDoc));

document.querySelectorAll(".tone").forEach(b=>b.onclick=()=>{
 state.tone=Number(b.dataset.tone);
 document.querySelectorAll(".tone").forEach(x=>x.classList.toggle("active",x===b));
 emit("character:parent",String(state.parent)+"|"+String(state.tone));
});
document.querySelectorAll(".clothes-tab").forEach(b=>b.onclick=()=>{
 state.category=b.dataset.cat;
 renderClothes();
 emit("character:stage",state.category);
});

$("variationRange").addEventListener("input",queueVariationEmit);
$("variationRange").addEventListener("change",()=>{
 clearTimeout(variationEmitTimer);
 const cat=state.category,v=Number($("variationRange").value)||0;
 state.variants[cat]=v;
 updateVariationReadout();
 emit("character:clothingVariant",cat+"|"+String(v));
});

$("backBtn").onclick=()=>{
 if(state.stage===1){showLobby();return}
 setStage(state.stage-1);
};
$("createBtn").onclick=()=>{
 if(state.stage===1){if(validateStage1())setStage(2);return}
 if(state.stage===2){setStage(3);return}
 finishCharacter();
};
$("playBtn").onclick=()=>{
 if(state.selected===null)return;
 const f=$("fade");f.classList.remove("reveal");
 setTimeout(()=>emit("lobby:play",String(state.selected)),1050);
};

on("lobby:account",username=>{state.username=username||"Jogador";updateHeader()});
on("lobby:clear",()=>{state.characters=[];state.selected=null;renderCharacters()});
on("lobby:addCharacter",(id,first,last,job,playtime,skin)=>{
 const character={id:Number(id),first,last,job,playtime:Number(playtime),skin:Number(skin)};
 state.characters.push(character);
 if(state.selected===null){
  state.selected=character.id;
  emit("lobby:select",String(character.id));
 }
 renderCharacters();
});
on("lobby:show",()=>{showLobby();if(lobbyRevealDone)return;lobbyRevealDone=true;$("fade").classList.remove("reveal");setTimeout(()=>$("fade").classList.add("reveal"),350)});
on("lobby:createSuccess",(id,first,last,job,playtime,skin)=>{
 state.characters.push({id:Number(id),first,last,job,playtime:Number(playtime),skin:Number(skin)});
 state.selected=Number(id);showLobby();emit("lobby:select",String(id));
});
on("lobby:error",message=>{$("error").textContent=message||"Não foi possível concluir."});
on("character:parent:apply",parentId=>syncParent(Number(parentId)||0));

let tipIndex=0;
setInterval(()=>{
 const t=$("tip");t.style.opacity="0";
 setTimeout(()=>{tipIndex=(tipIndex+1)%tips.length;t.textContent=tips[tipIndex];t.style.opacity="1"},350);
},3000);

updateHeader();renderCharacters();syncDoc();setGender("masculine");renderParents();renderClothes();
emit("lobby:ready");