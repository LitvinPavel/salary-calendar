if(!self.define){let e,r={};const s=(s,a)=>(s=new URL(s+".js",a).href,r[s]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=r,document.head.appendChild(e)}else e=s,importScripts(s),r()})).then((()=>{let e=r[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(a,l)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(r[n])return;let c={};const i=e=>s(e,n),o={module:{uri:n},exports:c,require:i};r[n]=Promise.all(a.map((e=>o[e]||i(e)))).then((e=>(l(...e),c)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"salary-calendar"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/salary-calendar/css/app.537f1c24.css",revision:null},{url:"/salary-calendar/css/chunk-vendors.76820d5b.css",revision:null},{url:"/salary-calendar/index.html",revision:"359b9dd52a4e74666073001c1d748b32"},{url:"/salary-calendar/js/about.915ec07a.js",revision:null},{url:"/salary-calendar/js/app.5e99d97b.js",revision:null},{url:"/salary-calendar/js/chunk-vendors.ff48eefd.js",revision:null},{url:"/salary-calendar/manifest.json",revision:"07c580f5206ebaa4ce8dc94fccae087e"},{url:"/salary-calendar/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
