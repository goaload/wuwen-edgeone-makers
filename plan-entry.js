import './app.js';
const back=document.querySelector('#view3d');back.textContent='返回漫游';back.removeAttribute('aria-disabled');back.onclick=()=>{window.top.location.href=new URL('./',location.href).href;};document.querySelector('#viewPlan').click();
