(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{2679:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,9324,23)),Promise.resolve().then(s.bind(s,4136)),Promise.resolve().then(s.bind(s,7873)),Promise.resolve().then(s.bind(s,7043)),Promise.resolve().then(s.bind(s,6713)),Promise.resolve().then(s.t.bind(s,437,23))},4136:(e,t,s)=>{"use strict";s.d(t,{Providers:()=>i});var n=s(5155),r=s(9749);s(2115);var a=s(7398),o=s(376),c=s(2967);function i(e){let t,s;let i=(0,r.c)(6),{children:l,themeProps:d}=e,m=(0,o.useRouter)();return i[0]!==l||i[1]!==d?(t=(0,n.jsx)(c.N,{...d,children:l}),i[0]=l,i[1]=d,i[2]=t):t=i[2],i[3]!==m.push||i[4]!==t?(s=(0,n.jsx)(a.M,{navigate:m.push,children:t}),i[3]=m.push,i[4]=t,i[5]=s):s=i[5],s}},4630:(e,t,s)=>{"use strict";s.d(t,{A:()=>a});var n=s(5155),r=s(9749);function a(e){let t;let s=(0,r.c)(6),{icon:a,size:o,fill:c,className:i,onClick:l}=e,d=void 0===o?24:o,m=void 0!==c&&c,u=void 0===i?"":i;return s[0]!==u||s[1]!==m||s[2]!==a||s[3]!==l||s[4]!==d?(t=l?(0,n.jsx)("button",{className:"material-symbols-rounded ".concat(u),style:{fontSize:d,fontVariationSettings:'"FILL" '.concat(+!!m,', "opsz" ').concat(d)},onClick:l,children:a}):(0,n.jsx)("span",{className:"material-symbols-rounded ".concat(u),style:{fontSize:d,fontVariationSettings:'"FILL" '.concat(+!!m,', "opsz" ').concat(d)},children:a}),s[0]=u,s[1]=m,s[2]=a,s[3]=l,s[4]=d,s[5]=t):t=s[5],t}},6713:(e,t,s)=>{"use strict";s.d(t,{A:()=>l,WeatherDateContextProvider:()=>i});var n=s(5155),r=s(9749),a=s(2115),o=s(5734);let c=(0,a.createContext)({});function i(e){let t,s,i,l;let d=(0,r.c)(7),{children:m}=e;if(d[0]===Symbol.for("react.memo_cache_sentinel")){let e=new Date;t=a.useState,s=new o.ng(e.getFullYear(),e.getMonth()+1,e.getDate()),d[0]=t,d[1]=s}else t=d[0],s=d[1];let[u,h]=t(s);return d[2]!==u?(i={weatherDate:u,setWeatherDate:h},d[2]=u,d[3]=i):i=d[3],d[4]!==m||d[5]!==i?(l=(0,n.jsx)(c.Provider,{value:i,children:m}),d[4]=m,d[5]=i,d[6]=l):l=d[6],l}function l(){return(0,a.useContext)(c)}},7043:(e,t,s)=>{"use strict";s.d(t,{FirebaseContextProvider:()=>h});var n=s(5155),r=s(9749),a=s(7405),o=s(8679),c=s(778),i=s(1744),l=s(6723),d=s(6598);let m={apiKey:"AIzaSyAgEFttRhdRXCcaZY22LZmPmoemgZBfojQ",authDomain:"dlrc-weather.firebaseapp.com",projectId:"dlrc-weather",storageBucket:"dlrc-weather.appspot.com",messagingSenderId:"880572742716",appId:"1:880572742716:web:065e4a4ecddc6930155739",measurementId:"G-W7ZTMKLD8W"};function u(e){let t,s,m,u,h,x;let f=(0,r.c)(15),{children:p}=e,v=(0,d.sh)();f[0]!==v?(t=(0,a.xI)(v),f[0]=v,f[1]=t):t=f[1];let j=t;f[2]!==v?(s=(0,i.aU)(v),f[2]=v,f[3]=s):s=f[3];let g=s;f[4]!==v?(m=(0,l.c7)(v),f[4]=v,f[5]=m):m=f[5];let b=m;return(0,o.P5)(v),(0,c.FJ)(v),f[6]!==p||f[7]!==b?(u=(0,n.jsx)(d.Lg,{sdk:b,children:p}),f[6]=p,f[7]=b,f[8]=u):u=f[8],f[9]!==g||f[10]!==u?(h=(0,n.jsx)(d.z_,{sdk:g,children:u}),f[9]=g,f[10]=u,f[11]=h):h=f[11],f[12]!==j||f[13]!==h?(x=(0,n.jsx)(d.OJ,{sdk:j,children:h}),f[12]=j,f[13]=h,f[14]=x):x=f[14],x}function h(e){let t;let s=(0,r.c)(2),{children:a}=e;return s[0]!==a?(t=(0,n.jsx)(d.qB,{firebaseConfig:m,children:(0,n.jsx)(u,{children:a})}),s[0]=a,s[1]=t):t=s[1],t}},7873:(e,t,s)=>{"use strict";s.d(t,{Footer:()=>b,Header:()=>g});var n=s(5155),r=s(9749),a=s(2115),o=s(675),c=s(1711),i=s(3580),l=s(8739),d=s(6453),m=s(2396),u=s(4630),h=s(2967);function x(){let e,t;let s=(0,r.c)(6),{theme:a,setTheme:o}=(0,h.D)(),c="dark"===a?"light_mode":"dark_mode";return s[0]!==o||s[1]!==a?(e=()=>o("dark"===a?"light":"dark"),s[0]=o,s[1]=a,s[2]=e):e=s[2],s[3]!==c||s[4]!==e?(t=(0,n.jsx)(u.A,{className:"text-foreground-700",icon:c,size:24,onClick:e}),s[3]=c,s[4]=e,s[5]=t):t=s[5],t}var f=s(1744),p=s(6598);function v(){let e,t;let s=(0,r.c)(5),a=(0,p.jt)();s[0]!==a?(e=(0,f.rJ)(a,"weather"),s[0]=a,s[1]=e):e=s[1];let o=e,{data:c,status:i}=(0,p.dg)(o);return s[2]!==c||s[3]!==i?(t=(0,n.jsx)(u.A,{className:"text-foreground-700",icon:"download",size:24,onClick:()=>{"success"===i&&function(e){let t=e.flatMap(e=>e.measurements||[]);console.log(t);let s=new Blob([[["timestamp","airTemperature","relativeHumidity","atmosphericPressure","groundTemperature"]].concat(t.sort((e,t)=>e.timestamp.seconds-t.timestamp.seconds).map(e=>[new Date(1e3*e.timestamp.seconds+e.timestamp.nanoseconds/1e6).toISOString(),e.airTemperature,e.relativeHumidity,e.atmosphericPressure,e.groundTemperature])).map(e=>Object.values(e).join(",")).join("\n")],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(s),r=document.createElement("a");r.href=n,r.download="measurements.csv",document.body.appendChild(r),r.click(),document.body.removeChild(r)}(c)}}),s[2]=c,s[3]=i,s[4]=t):t=s[4],t}var j=s(6713);function g(){let e,t,s,a,h,f,p;let g=(0,r.c)(9),{weatherDate:b,setWeatherDate:w}=(0,j.A)();return g[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,n.jsx)(u.A,{className:"text-foreground-700",icon:"location_on",size:24}),g[0]=e):e=g[0],g[1]===Symbol.for("react.memo_cache_sentinel")?(t=(0,n.jsx)(o.$,{children:(0,n.jsxs)("div",{className:"flex items-center gap-2",children:[e,(0,n.jsxs)(c.h,{className:"text-xl text-foreground-700 hover:text-blue-600",href:"https://maps.app.goo.gl/nhkRUvDHx26tuS6U9",children:[(0,n.jsx)("span",{className:"block md:hidden",children:"DLRC"}),(0,n.jsx)("span",{className:"hidden md:block",children:"DLRC, Pashan - Sus Rd, Pune"})]})]})}),g[1]=t):t=g[1],g[2]===Symbol.for("react.memo_cache_sentinel")?(s=(0,n.jsx)(v,{}),a=(0,n.jsx)(x,{}),g[2]=s,g[3]=a):(s=g[2],a=g[3]),g[4]===Symbol.for("react.memo_cache_sentinel")?(h={selectorIcon:"text-foreground-700"},f=(0,n.jsx)(u.A,{icon:"edit_calendar",size:24}),g[4]=h,g[5]=f):(h=g[4],f=g[5]),g[6]!==w||g[7]!==b?(p=(0,n.jsxs)(i.H,{maxWidth:"full",children:[t,(0,n.jsx)(l.t,{justify:"end",children:(0,n.jsxs)(d.p,{className:"flex items-center gap-4",children:[s,a,(0,n.jsx)(m.g,{"aria-label":"weather date",classNames:h,selectorIcon:f,value:b,onChange:w})]})})]}),g[6]=w,g[7]=b,g[8]=p):p=g[8],p}function b(){let e,t,s,o,i,l;let d=(0,r.c)(8),[m,h]=(0,a.useState)(!1);d[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=()=>{h(window.innerWidth<768)};return e(),window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}},t=[window.innerWidth],d[0]=e,d[1]=t):(e=d[0],t=d[1]),(0,a.useEffect)(e,t),d[2]===Symbol.for("react.memo_cache_sentinel")?(s=(0,n.jsxs)("div",{className:"flex items-center gap-1 font-medium",children:[(0,n.jsx)(u.A,{icon:"copyright",size:20}),(0,n.jsx)(c.h,{className:"text-sm text-foreground-700 hover:text-blue-600",href:"https://www.dlrc.in/",children:"DLRC Foundation"})]}),d[2]=s):s=d[2];let x=m?"Ansh":"Ansh Tiwatne";return d[3]!==x?(o=(0,n.jsx)(c.h,{className:"text-sm font-medium text-foreground-700 hover:text-blue-600",href:"https://ansht.com",children:x}),d[3]=x,d[4]=o):o=d[4],d[5]===Symbol.for("react.memo_cache_sentinel")?(i=(0,n.jsx)("span",{className:"text-sm font-medium text-foreground-700",children:"Mr. Tarun"}),d[5]=i):i=d[5],d[6]!==o?(l=(0,n.jsxs)("div",{className:"flex items-center justify-between p-4 px-5 text-sm text-foreground-600",children:[s,(0,n.jsxs)("div",{children:["by"," ",o," ","&"," ",i]})]}),d[6]=o,d[7]=l):l=d[7],l}},9324:()=>{}},e=>{var t=t=>e(e.s=t);e.O(0,[533,840,992,507,888,997,248,815,339,809,802,285,273,441,667,358],()=>t(2679)),_N_E=e.O()}]);