const ResourceType = Object.freeze({ CREDITS:'credits', DARK_MATTER:'darkMatter', RESEARCH_POINTS:'researchPoints', BASIC_ALLOY:'basicAlloy' });
const SpeciesType = Object.freeze({ TERRAN:'Terran', XENO_GLITCH:'Xeno-Glitch', KRONOS_TITAN:'Kronos-Titan', NEBULON:'Nebulon' });
const ModuleCategory = Object.freeze({ PRODUCTION:'production', COMMERCIAL:'commercial', RESEARCH:'research', DEFENSE:'defense', CORRIDOR:'corridor', DOCKING:'docking', HOUSING:'housing', SUPPORT:'support' });
const ModuleType = Object.freeze({ DOCKING_BAY:'dockingBay', CORRIDOR:'corridor', SOLAR_PANEL:'solarPanel', DEBRIS_RECYCLER:'debrisRecycler', ALGAE_FARM:'algaeFarm', CREW_QUARTER:'crewQuarter', QUANTUM_LAB:'quantumLab', RECHARGING:'rechargingStation', ATMOSPHERIC:'atmosphericRegulator', NUCLEAR_REACTOR:'nuclearReactor', PLASMA_REFINERY:'plasmaRefinery', SPACE_CANTINA:'spaceCantina', LASER_TURRET:'laserTurret', ANTIMATTER:'antimatterReactor', HEAVY_FABRICATOR:'heavyFabricator', ALIEN_CASINO:'alienCasino', CARRIER_HANGAR:'carrierHangar', STELLAR_CORE:'stellarCoreTap', CHRONOS:'chronosRefinery', HYPERSPACE:'hyperspaceTerminal', OMEGA:'omegaRailgun' });
const Condition = Object.freeze({ OPERATIONAL:'operational', DAMAGED:'damaged', DISABLED:'disabled', DESTROYED:'destroyed' });
const Tier = Object.freeze({ DEBRIS:1, PIONEER:2, HUB:3, REGIME:4 });

const MODULES = {
  [ModuleType.DOCKING_BAY]: { name:'Docking Bay', category:ModuleCategory.DOCKING, cost:0, consume:0, generate:0, tier:1, color:'#4eafff', desc:'Infrastruktur awal stasiun' },
  [ModuleType.CORRIDOR]: { name:'Corridor', category:ModuleCategory.CORRIDOR, cost:50, consume:0, generate:0, tier:1, color:'#526f8a', desc:'Koneksi antar modul' },
  [ModuleType.SOLAR_PANEL]: { name:'Solar Panel Array', category:ModuleCategory.PRODUCTION, cost:350, consume:0, generate:10, tier:1, color:'#ffd35a', desc:'+10 kW daya' },
  [ModuleType.DEBRIS_RECYCLER]: { name:'Debris Recycler', category:ModuleCategory.PRODUCTION, cost:500, consume:3, generate:0, tier:1, color:'#ff9e4f', desc:'+1 Basic Alloy/tick per kru' },
  [ModuleType.ALGAE_FARM]: { name:'Algae Farm', category:ModuleCategory.HOUSING, cost:300, consume:1, generate:0, tier:1, color:'#69e78e', desc:'+5 kapasitas kru' },
  [ModuleType.CREW_QUARTER]: { name:'Basic Crew Quarter', category:ModuleCategory.HOUSING, cost:650, consume:2, generate:0, tier:1, color:'#bb8cff', desc:'+10 kapasitas kasur' },
  [ModuleType.QUANTUM_LAB]: { name:'Quantum Lab', category:ModuleCategory.RESEARCH, cost:850, consume:4, generate:0, tier:1, color:'#58efff', desc:'Menghasilkan RP dari kru' },
  [ModuleType.RECHARGING]: { name:'Recharging Station', category:ModuleCategory.SUPPORT, cost:250, consume:1, generate:0, tier:1, color:'#80d6ff', desc:'Kebutuhan Xeno-Glitch' },
  [ModuleType.ATMOSPHERIC]: { name:'Atmospheric Regulator', category:ModuleCategory.SUPPORT, cost:250, consume:1, generate:0, tier:1, color:'#b0f3ff', desc:'Kebutuhan Nebulon' },
  [ModuleType.NUCLEAR_REACTOR]: { name:'Nuclear Reactor', category:ModuleCategory.PRODUCTION, cost:5000, consume:0, generate:45, tier:2, color:'#a8ff58', desc:'+45 kW, butuh Uranium pada desain penuh' },
  [ModuleType.PLASMA_REFINERY]: { name:'Plasma Refinery', category:ModuleCategory.PRODUCTION, cost:6000, consume:10, generate:0, tier:2, color:'#ff5cc8', desc:'Produksi Plasma' },
  [ModuleType.SPACE_CANTINA]: { name:'Space Cantina', category:ModuleCategory.COMMERCIAL, cost:4200, consume:4, generate:0, tier:2, color:'#f5aa58', desc:'+Credits dari kru' },
  [ModuleType.LASER_TURRET]: { name:'Laser Turret MK-I', category:ModuleCategory.DEFENSE, cost:3500, consume:3, generate:0, tier:2, color:'#ff596f', desc:'Mitigasi Space Pirates' },
  [ModuleType.ANTIMATTER]: { name:'Antimatter Reactor', category:ModuleCategory.PRODUCTION, cost:18000, consume:0, generate:120, tier:3, color:'#d06bff', desc:'Energi masif' },
  [ModuleType.HEAVY_FABRICATOR]: { name:'Heavy Fabricator', category:ModuleCategory.PRODUCTION, cost:15000, consume:12, generate:0, tier:3, color:'#ff8d50', desc:'Logistik produksi' },
  [ModuleType.ALIEN_CASINO]: { name:'Alien Casino', category:ModuleCategory.COMMERCIAL, cost:22000, consume:8, generate:0, tier:3, color:'#ffcc4f', desc:'Pendapatan VIP' },
  [ModuleType.CARRIER_HANGAR]: { name:'Carrier Hangar', category:ModuleCategory.PRODUCTION, cost:25000, consume:10, generate:0, tier:3, color:'#6aaeff', desc:'Armada drone' },
  [ModuleType.STELLAR_CORE]: { name:'Stellar Core Tap', category:ModuleCategory.PRODUCTION, cost:100000, consume:0, generate:999, tier:4, color:'#fff6a3', desc:'Energi tak terbatas' },
  [ModuleType.CHRONOS]: { name:'Chronos Refinery', category:ModuleCategory.PRODUCTION, cost:95000, consume:30, generate:0, tier:4, color:'#b267ff', desc:'Refinery premium' },
  [ModuleType.HYPERSPACE]: { name:'Hyperspace Terminal', category:ModuleCategory.COMMERCIAL, cost:110000, consume:25, generate:0, tier:4, color:'#55fff0', desc:'Turisme +300%' },
  [ModuleType.OMEGA]: { name:'Omega Railgun', category:ModuleCategory.DEFENSE, cost:120000, consume:20, generate:0, tier:4, color:'#ff4d65', desc:'Pertahanan puncak' }
};

class Wallet {
  constructor() { this.data = { credits:3000, darkMatter:0, researchPoints:0, basicAlloy:0 }; }
  get(k) { return this.data[k] || 0; }
  add(k,v) { this.data[k] = Math.max(0, this.get(k) + v); }
  spend(k,v) { if (this.get(k) < v) return false; this.data[k] -= v; return true; }
}
class CrewMember {
  constructor(id,name,species) { this.id=id; this.name=name; this.species=species; this.level=1; this.exp=0; this.happiness=100; this.stress=0; this.assignedModuleId=null; }
  get isOrganic(){ return this.species===SpeciesType.TERRAN || this.species===SpeciesType.NEBULON; }
  get housing(){ return this.species===SpeciesType.KRONOS_TITAN ? 2 : 1; }
  get researchMult(){ return this.species===SpeciesType.XENO_GLITCH ? 1.25 : 1; }
  get productionMult(){ return this.species===SpeciesType.KRONOS_TITAN ? 1.20 : 1; }
  get commercialMult(){ return this.species===SpeciesType.NEBULON ? 1.30 : 1; }
  get powerDraw(){ return this.species===SpeciesType.XENO_GLITCH && this.assignedModuleId ? 2 : 0; }
  get efficiency(){ return 1 + ((this.level - 1) * .125); }
  addExp(v){ if(this.level>=5) return false; this.exp+=v; let leveled=false; while(this.level<5 && this.exp>=this.level*100){ this.exp-=this.level*100; this.level++; leveled=true; } if(this.level>=5)this.exp=0; return leveled; }
  addStress(v){ this.stress=Math.min(100,Math.max(0,this.stress+v)); }
}
class Module {
  constructor(id,type,x,y,z=0){ const d=MODULES[type]; this.id=id; this.type=type; this.def=d; this.x=x; this.y=y; this.z=z; this.condition=Condition.OPERATIONAL; this.crewIds=new Set(); }
  get operational(){ return this.condition===Condition.OPERATIONAL; }
  get generate(){ return this.operational?this.def.generate:0; }
  get consume(){ return this.operational?this.def.consume:0; }
}
class GridManager {
  constructor(){ this.modules=new Map(); this.cellMap=new Map(); this.rotation=0; }
  key(x,y,z=0){ return `${x},${y},${z}`; }
  getAt(x,y,z=0){ return this.cellMap.get(this.key(x,y,z)); }
  add(type,x,y,z=0){ const id=`m-${Date.now()}-${Math.random().toString(36).slice(2,7)}`; const m=new Module(id,type,x,y,z); this.modules.set(id,m); this.cellMap.set(this.key(x,y,z),m); return m; }
  all(){ return [...this.modules.values()]; }
  neighbors(x,y,z=0){ return [[x+1,y,z],[x-1,y,z],[x,y+1,z],[x,y-1,z],[x,y,z+1],[x,y,z-1]]; }
  connected(x,y,z,type){ if(this.modules.size===0) return type===ModuleType.DOCKING_BAY || type===ModuleType.CORRIDOR; return this.neighbors(x,y,z).some(p=>{ const n=this.getAt(...p); return n && (n.def.category===ModuleCategory.CORRIDOR || n.def.category===ModuleCategory.DOCKING); }); }
}
class CrewManager {
  constructor(){ this.crew=[]; this.selectedCrewId=null; }
  add(c){ this.crew.push(c); }
  get(id){ return this.crew.find(c=>c.id===id); }
  assigned(moduleId){ return this.crew.filter(c=>c.assignedModuleId===moduleId); }
  powerDraw(){ return this.crew.reduce((s,c)=>s+c.powerDraw,0); }
  housingUsed(){ return this.crew.reduce((s,c)=>s+c.housing,0); }
  housingCap(modules){ return modules.reduce((s,m)=>s+(m.type===ModuleType.ALGAE_FARM?5:m.type===ModuleType.CREW_QUARTER?10:0),0); }
  assign(crew,module){ if(crew.assignedModuleId){ const old=game.grid.modules.get(crew.assignedModuleId); old?.crewIds.delete(crew.id); } crew.assignedModuleId=module?.id || null; module?.crewIds.add(crew.id); }
  tick(modules){ for(const c of this.crew){ if(!c.assignedModuleId){ c.addStress(-.12); continue; } const m=game.grid.modules.get(c.assignedModuleId); if(!m || !m.operational){ c.addStress(.22); continue; } c.addStress(-.025); }
    const pairs=modules.filter(m=>m.def.category===ModuleCategory.PRODUCTION).flatMap(m=>this.assigned(m.id).map(c=>({m,c})));
    const hasXeno=pairs.some(p=>p.c.species===SpeciesType.XENO_GLITCH), hasKronos=pairs.some(p=>p.c.species===SpeciesType.KRONOS_TITAN);
    if(hasXeno&&hasKronos) pairs.forEach(p=>{if(p.c.species===SpeciesType.XENO_GLITCH||p.c.species===SpeciesType.KRONOS_TITAN)p.c.addStress(.16);});
  }
}
class TechTreeManager {
  constructor(wallet,crew){ this.wallet=wallet; this.crew=crew; this.tier=Tier.DEBRIS; this.unlocked=new Set(Object.values(MODULES).filter(x=>x.tier===1).map(x=>x.name)); this.federationContract=false; }
  isUnlocked(type){ return MODULES[type].tier<=this.tier; }
  tick(){ if(this.tier===Tier.DEBRIS && this.crew.crew.length>=20 && this.wallet.get(ResourceType.BASIC_ALLOY)>=500){ this.tier=Tier.PIONEER; notify('Tier 2 unlocked: ORBITAL PIONEER','warning'); }
    if(this.tier===Tier.PIONEER && game.rating>=4 && this.wallet.get(ResourceType.CREDITS)>=100000){ this.tier=Tier.HUB; notify('Tier 3 unlocked: GALACTIC HUB','warning'); }
    const tier3Lab=game.grid.all().some(m=>m.type===ModuleType.QUANTUM_LAB && m.upgradeLevel>=3);
    if(this.tier===Tier.HUB && tier3Lab && this.federationContract){ this.tier=Tier.REGIME; notify('Tier 4 unlocked: STELLAR REGIME','warning'); }
  }
  addRP(v){ this.wallet.add(ResourceType.RESEARCH_POINTS,v); }
}
class EventManager {
  roll(){ const r=Math.random(); if(r<.012)return 'solar'; if(r<.024)return 'pirates'; return null; }
  process(event){ if(event==='solar') this.solar(); if(event==='pirates') this.pirates(); }
  solar(){ const affected=[]; for(const m of game.grid.all()){ if(m.def.generate===0 && Math.random()<.5 && m.operational){ m.condition=Condition.DISABLED; affected.push(m); setTimeout(()=>{if(m.condition===Condition.DISABLED)m.condition=Condition.OPERATIONAL;},7000); } }
    game.crew.crew.filter(c=>c.isOrganic).forEach(c=>c.addStress(2)); notify(`SOLAR FLARE: ${affected.length} non-essential modules offline. Organic crew stress +2.`, 'danger'); }
  pirates(){ const targets=game.grid.all().filter(m=>m.def.category===ModuleCategory.PRODUCTION && m.type!==ModuleType.SOLAR_PANEL); if(!targets.length){ notify('SPACE PIRATES detected, but no storage-production target found.', 'warning'); return; } const target=targets[Math.floor(Math.random()*targets.length)]; const defended=game.grid.all().some(m=>m.operational&&m.def.category===ModuleCategory.DEFENSE); if(defended){ target.condition=Condition.DAMAGED; notify(`SPACE PIRATES intercepted. ${target.def.name} damaged; defense mitigated attack.`, 'warning'); } else { target.condition=Condition.DESTROYED; notify(`SPACE PIRATES destroyed ${target.def.name}.`, 'danger'); } }
}

const canvas=document.getElementById('game-canvas'); const ctx=canvas.getContext('2d');
const game={ wallet:new Wallet(), grid:new GridManager(), crew:new CrewManager(), rating:1, speed:1, tick:0, seconds:0, selectedBuild:null, selectedModuleId:null, hover:null, running:true };
game.tech=new TechTreeManager(game.wallet,game.crew); game.events=new EventManager();

function seed(){ const d=game.grid.add(ModuleType.DOCKING_BAY,0,0); game.grid.add(ModuleType.CORRIDOR,1,0); game.grid.add(ModuleType.CORRIDOR,2,0); game.grid.add(ModuleType.SOLAR_PANEL,1,1); game.grid.add(ModuleType.CREW_QUARTER,2,1); game.crew.add(new CrewMember('c1','Mira Voss',SpeciesType.TERRAN)); game.crew.add(new CrewMember('c2','Cy-17',SpeciesType.XENO_GLITCH)); game.crew.add(new CrewMember('c3','Gravem',SpeciesType.KRONOS_TITAN)); game.crew.add(new CrewMember('c4','Nebu',SpeciesType.NEBULON)); game.crew.assign(game.crew.get('c1'),d); renderAll(); notify('AstroForge station initialized. Select a Tier 1 module to build.'); }

function screenToGrid(sx,sy){ const rect=canvas.getBoundingClientRect(); const px=(sx-rect.left)*(canvas.width/rect.width), py=(sy-rect.top)*(canvas.height/rect.height); const cx=canvas.width*.52, cy=canvas.height*.49; const tw=74, th=37; const x=((px-cx)/(tw/2)+(py-cy)/(th/2))/2; const y=((py-cy)/(th/2)-(px-cx)/(tw/2))/2; return {x:Math.round(x),y:Math.round(y),z:0}; }
function gridToScreen(x,y,z=0){ const tw=74, th=37, cx=canvas.width*.52, cy=canvas.height*.49; const rx=game.grid.rotation===0?x:game.grid.rotation===1?-y:game.grid.rotation===2?-x:y; const ry=game.grid.rotation===0?y:game.grid.rotation===1?x:game.grid.rotation===2?-y:-x; return {x:cx+(rx-ry)*tw/2,y:cy+(rx+ry)*th/2-z*44}; }
function diamond(x,y,color,stroke='#2c7eae',alpha=1){ const w=74,h=37; ctx.save();ctx.globalAlpha=alpha;ctx.beginPath();ctx.moveTo(x,y-h/2);ctx.lineTo(x+w/2,y);ctx.lineTo(x,y+h/2);ctx.lineTo(x-w/2,y);ctx.closePath();ctx.fillStyle=color;ctx.fill();ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke();ctx.restore(); }
function drawModule(m){ const p=gridToScreen(m.x,m.y,m.z); const col=m.condition===Condition.DESTROYED?'#491b29':m.condition===Condition.DAMAGED?'#66571d':m.condition===Condition.DISABLED?'#263343':m.def.color; diamond(p.x,p.y,col,'#62cfff'); ctx.save(); ctx.fillStyle='rgba(0,0,0,.3)';ctx.fillRect(p.x-21,p.y-10,42,20); ctx.fillStyle='#ecfbff';ctx.font='bold 10px Rajdhani';ctx.textAlign='center';ctx.fillText(m.def.name.replace(' Array','').replace(' Basic',''),p.x,p.y+3);ctx.fillStyle='#a9dffc';ctx.font='10px Rajdhani';ctx.fillText(`L${m.z+1}`,p.x,p.y+13); if(m.id===game.selectedModuleId){ctx.strokeStyle='#ffd35a';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(p.x,p.y,40,23,0,0,Math.PI*2);ctx.stroke();}ctx.restore(); }
function draw(){ ctx.clearRect(0,0,canvas.width,canvas.height); const grad=ctx.createRadialGradient(canvas.width*.52,canvas.height*.49,30,canvas.width*.52,canvas.height*.49,650);grad.addColorStop(0,'#102a4b');grad.addColorStop(1,'#050914');ctx.fillStyle=grad;ctx.fillRect(0,0,canvas.width,canvas.height); for(let i=-9;i<=9;i++)for(let j=-9;j<=9;j++){const p=gridToScreen(i,j,0);diamond(p.x,p.y,'rgba(22,56,88,.13)','rgba(56,135,187,.16)');} const sorted=game.grid.all().sort((a,b)=>(a.x+a.y+a.z)-(b.x+b.y+b.z));sorted.forEach(drawModule); if(game.hover&&game.selectedBuild){const p=gridToScreen(game.hover.x,game.hover.y,0);const valid=!game.grid.getAt(game.hover.x,game.hover.y,0)&&game.grid.connected(game.hover.x,game.hover.y,0,game.selectedBuild);diamond(p.x,p.y,valid?'rgba(83,255,145,.35)':'rgba(255,75,100,.36)',valid?'#7cff9a':'#ff5c78');} requestAnimationFrame(draw); }
function totalPower(){ const gen=game.grid.all().reduce((s,m)=>s+m.generate,0); const consume=game.grid.all().reduce((s,m)=>s+m.consume,0)+game.crew.powerDraw(); return {gen,consume}; }
function simulationTick(){ if(!game.running||game.speed===0)return; for(let n=0;n<game.speed;n++){ const event=game.events.roll(); const p=totalPower(); const powered=p.gen>=p.consume; if(powered){ for(const m of game.grid.all()){ if(!m.operational)continue; const workers=game.crew.assigned(m.id); for(const c of workers){if(m.type===ModuleType.DEBRIS_RECYCLER){game.wallet.add(ResourceType.BASIC_ALLOY,1*c.productionMult*c.efficiency);c.addExp(1);}if(m.type===ModuleType.QUANTUM_LAB){game.tech.addRP(1*c.researchMult*c.efficiency);c.addExp(1);}if(m.type===ModuleType.SPACE_CANTINA){game.wallet.add(ResourceType.CREDITS,12*c.commercialMult*c.efficiency);c.addExp(1);}} } } else { notify('POWER DEFICIT: production and research paused.','danger'); }
    if(event)game.events.process(event); game.crew.tick(game.grid.all()); game.tech.tick(); game.tick++;game.seconds++; if(game.crew.crew.some(c=>c.stress>=100)){game.running=false;document.getElementById('game-over-overlay').classList.remove('hidden');} }
  renderAll(); }
function notify(text,type=''){ const box=document.getElementById('event-feed');const el=document.createElement('div');el.className=`event-note ${type}`;el.textContent=text;box.prepend(el);setTimeout(()=>el.remove(),6000); }
function renderBuild(){ const box=document.getElementById('build-list');box.innerHTML=''; Object.entries(MODULES).filter(([type,d])=>type!==ModuleType.DOCKING_BAY && game.tech.isUnlocked(type)).forEach(([type,d])=>{const b=document.createElement('button');b.className=`build-item ${game.selectedBuild===type?'selected':''}`;b.innerHTML=`<span class="name">${d.name}</span><span class="cost">${d.cost} CR</span><span class="meta">${d.desc}</span>`;b.disabled=game.wallet.get(ResourceType.CREDITS)<d.cost;b.onclick=()=>{game.selectedBuild=type;game.selectedModuleId=null;renderBuild();renderAll();};box.appendChild(b);}); }
function renderCrew(){ const box=document.getElementById('crew-list');box.innerHTML='';for(const c of game.crew.crew){const b=document.createElement('button');b.className=`crew-card ${game.crew.selectedCrewId===c.id?'selected':''}`;const assigned=c.assignedModuleId?game.grid.modules.get(c.assignedModuleId)?.def.name||'Unknown':'Unassigned';b.innerHTML=`<div class="crew-name"><span>${c.name}</span><span>L${c.level}</span></div><div class="species">${c.species}</div><div class="crew-stats"><span>Stress ${c.stress.toFixed(0)}</span><span>${assigned}</span></div>`;b.onclick=()=>assignCrewUI(c);box.appendChild(b);} }
function renderAll(){ const p=totalPower();document.getElementById('credits-display').textContent=Math.floor(game.wallet.get(ResourceType.CREDITS)).toLocaleString();document.getElementById('dark-matter-display').textContent=Math.floor(game.wallet.get(ResourceType.DARK_MATTER)).toLocaleString();document.getElementById('alloy-display').textContent=Math.floor(game.wallet.get(ResourceType.BASIC_ALLOY)).toLocaleString();document.getElementById('rp-display').textContent=Math.floor(game.wallet.get(ResourceType.RESEARCH_POINTS)).toLocaleString();document.getElementById('power-display').textContent=`${p.gen.toFixed(0)} / ${p.consume.toFixed(0)} kW`;document.getElementById('power-display').style.color=p.gen>=p.consume?'#7cff9a':'#ff5c78';const mins=String(Math.floor(game.seconds/60)).padStart(2,'0'),secs=String(game.seconds%60).padStart(2,'0');document.getElementById('galactic-time-display').textContent=`GALACTIC TIME ${mins}:${secs}`;const names=['','DEBRIS AGE','ORBITAL PIONEER','GALACTIC HUB','STELLAR REGIME'];document.getElementById('tier-display').textContent=`TIER ${game.tech.tier} — ${names[game.tech.tier]}`;const cap=game.crew.housingCap(game.grid.all());document.getElementById('crew-display').textContent=`CREW ${game.crew.housingUsed()} / ${cap}`;document.getElementById('rating-display').textContent=`RATING ${'★'.repeat(game.rating)}${'☆'.repeat(5-game.rating)}`;const selected=game.selectedModuleId?game.grid.modules.get(game.selectedModuleId):null;document.getElementById('selected-module-display').textContent=`Selected: ${selected?selected.def.name:'None'}`;renderBuild();renderCrew(); }
function assignCrewUI(c){ const m=game.selectedModuleId?game.grid.modules.get(game.selectedModuleId):null;if(!m){game.crew.selectedCrewId=c.id;notify(`Selected ${c.name}. Click a module to assign.`, 'warning');renderCrew();return;}game.crew.assign(c,m);game.crew.selectedCrewId=null;notify(`${c.name} assigned to ${m.def.name}.`);renderAll(); }
canvas.addEventListener('mousemove',e=>{game.hover=screenToGrid(e.clientX,e.clientY);const valid=game.selectedBuild&&!game.grid.getAt(game.hover.x,game.hover.y,0)&&game.grid.connected(game.hover.x,game.hover.y,0,game.selectedBuild);document.getElementById('placement-status').textContent=game.selectedBuild?(valid?'VALID PLACEMENT':'INVALID PLACEMENT'):'Ready';document.getElementById('placement-status').style.color=valid?'#7cff9a':'#ff5c78';});
canvas.addEventListener('click',e=>{const g=screenToGrid(e.clientX,e.clientY);const hit=game.grid.getAt(g.x,g.y,0);if(game.selectedBuild){const d=MODULES[game.selectedBuild];if(hit){notify('Tile occupied.','danger');return;}if(!game.grid.connected(g.x,g.y,0,game.selectedBuild)){notify('Module must connect to Corridor or Docking Bay.','danger');return;}if(!game.wallet.spend(ResourceType.CREDITS,d.cost)){notify('Insufficient Credits.','danger');return;}const m=game.grid.add(game.selectedBuild,g.x,g.y,0);notify(`${m.def.name} constructed.`);game.selectedBuild=null;renderAll();return;}if(hit){game.selectedModuleId=hit.id;if(game.crew.selectedCrewId){const c=game.crew.get(game.crew.selectedCrewId);game.crew.assign(c,hit);game.crew.selectedCrewId=null;notify(`${c.name} assigned to ${hit.def.name}.`);}renderAll();}});
document.querySelectorAll('[data-speed]').forEach(b=>b.addEventListener('click',()=>{game.speed=Number(b.dataset.speed);document.querySelectorAll('[data-speed]').forEach(x=>x.classList.toggle('active',Number(x.dataset.speed)===game.speed));}));
document.getElementById('rotate-button').onclick=()=>{game.grid.rotation=(game.grid.rotation+1)%4;notify('Camera orientation rotated 90°.');};
document.querySelector('[data-command="settings"]').onclick=()=>document.getElementById('help-overlay').classList.remove('hidden');document.querySelectorAll('[data-close-overlay]').forEach(b=>b.onclick=()=>document.getElementById(b.dataset.closeOverlay).classList.add('hidden'));document.getElementById('restart-button').onclick=()=>location.reload();
seed();setInterval(simulationTick,1000);draw();
