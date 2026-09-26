const data={
  tiffany:{no:'01',title:'ティファニー館',latin:'TIFFANY-KAN',dog:'assets/dog/look-up.png'},
  ogura:{no:'02',title:'小倉BLD',latin:'OGURA BLD.',dog:'assets/dog/sleep.png'},
  nexterra:{no:'03',title:'ネクステラ橋本',latin:'NEXTERRA HASHIMOTO',dog:'assets/dog/look-back.png'},
  kanekura:{no:'04',title:'宵灯橋本',latin:'TOMORI HASHIMOTO',dog:'assets/dog/walk-away.png'}
};
const keys=Object.keys(data),section=document.querySelector('.buildings'),detail=document.querySelector('#detail');
const switcher=document.querySelector('#switcherPanel'),switchBtn=document.querySelector('#buildingSwitcher');
let currentKey=null;
function openBuilding(key,smooth=true){const d=data[key];currentKey=key;document.querySelector('#detailNo').textContent=`BUILDING ${d.no}`;document.querySelector('#detailTitle').textContent=d.title;document.querySelector('#detailLatin').textContent=d.latin;document.querySelector('#dog').src=d.dog;section.hidden=true;detail.hidden=false;closeSwitcher();window.scrollTo({top:detail.offsetTop,behavior:smooth?'smooth':'auto'});history.replaceState(null,'',`#${key}`)}
function closeDetail(){detail.hidden=true;section.hidden=false;closeSwitcher();history.replaceState(null,'','#buildings');setTimeout(()=>section.scrollIntoView({behavior:'smooth'}),20)}
function moveBuilding(delta){const i=keys.indexOf(currentKey);openBuilding(keys[(i+delta+keys.length)%keys.length],false)}
function toggleSwitcher(){const opening=switcher.hidden;switcher.hidden=!opening;switchBtn.setAttribute('aria-expanded',String(opening))}
function closeSwitcher(){switcher.hidden=true;switchBtn?.setAttribute('aria-expanded','false')}
document.querySelectorAll('.door').forEach(btn=>btn.addEventListener('click',()=>openBuilding(btn.dataset.building)));
document.querySelectorAll('[data-jump]').forEach(btn=>btn.addEventListener('click',()=>openBuilding(btn.dataset.jump,false)));
document.querySelector('#closeDetail').addEventListener('click',closeDetail);
document.querySelector('#backBottom').addEventListener('click',closeDetail);
document.querySelector('#nextBuilding').addEventListener('click',()=>moveBuilding(1));
document.querySelector('#prevBuilding').addEventListener('click',()=>moveBuilding(-1));
document.querySelector('#nextBuildingTop').addEventListener('click',()=>moveBuilding(1));
switchBtn.addEventListener('click',toggleSwitcher);document.querySelector('#closeSwitcher').addEventListener('click',closeSwitcher);
const initial=location.hash.slice(1);if(data[initial])openBuilding(initial,false);
