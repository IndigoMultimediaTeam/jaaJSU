!function(e,t){"use strict";let n;"function"==typeof define&&define.amd?define([],function(){return t(window,document)}):"undefined"!=typeof exports?module.exports=t(window,document):(n=t(window,document),Object.keys(n).forEach(e=>window[e]=n[e]),window.jaaJSU_version="0.5.3")}(0,function(e,t){"use strict";var n={};function r(e,t){n[t]=e}function a(e){return(t,n,r)=>a=>e(a,t,n,r)}function i(e,t,n,r){const a=e.length;for(let i=0,o=a-1;i<a;i++,o--)r=t.call(n,{item:e[i],last:!o,key:i,share:r});return r}function o(e,t,n,r){for(let a=0;a<e.length;a++)r=t.call(n,{item:e[a],key:a,share:r});return r}function c(e){throw new Error("Missing parameter: "+e)}r({arrayIndex:function(e,t,n){return(n+e+t%n)%n},each:i,eachFun:a(i),eachDynamic:o,eachDynamicFun:a(o),getLast:function(e){return e[e.length-1]},partition:function(e){return{head:function(){const[t,...n]=e;return[t,n]},tail:function(){let t=[...e];const n=t.pop();return[t,n]},onIndex:function(t){let n=[...e];return[n.splice(0,t),n]},byCondition:function(t){let n=[[],[]];return i(e,({item:e,key:r})=>n[+!Boolean(t(e,r))].push(e)),n}}},removeItem:function(e,t){let n=[...e];for(var r=0;r<n.length;)n[r]===t?n.splice(r,1):r++;return n},sortRandom:function(){return Math.random()-.5}},"$array");var s={serialize:function(){const e=e=>t=>e().then((e=>Array.prototype.concat.bind(e))(t)),t=(t,n)=>t.then(e(n));return e=>e.reduce(t,Promise.resolve([]))}(),iterate_:function(e){return new Promise(function(t,n){let r=Promise.resolve();for(let t=0,n=e.length;t<n;t++)r=r.then(e[t]);r.then(t).catch(n)})},CANCEL:Symbol("$async.CANCEL"),iterateMixed_:function(...e){return new Promise(function(t,n){return function n(r){if(!e.length)return t(r);const a=e.shift(),i="function"==typeof a?a(r):a;if(null!==i){if(i===s.CANCEL)return;if(i.then)return i.then(n)}return Promise.resolve(n(i))}()})},sequention_:function(...e){return function(...t){return new Promise(function(n,r){let a=Promise.resolve(...t);for(let t=0,n=e.length;t<n;t++)a=a.then(e[t]);a.then(n).catch(r)})}},each_:function(...e){return function(...t){return Promise.all(e.map(e=>e(...t)))}}};r(s,"$async");var u={ready_:function(...e){return new Promise(function(n){"loading"!==t.readyState?n(...e):t.addEventListener("readystatechange",function r(){"loading"!==t.readyState&&(t.removeEventListener("readystatechange",r),n(...e))})})},elementReady_:function(e,n=t){const r=Object.keys(e)[0],a=e[r];return new Promise(function(e,t){requestAnimationFrame(function t(){const i=n[r](a);i?e(i):requestAnimationFrame(t)})})},empty:function(e){let t=e.childNodes.length;for(;t--;)e.removeChild(e.lastChild)},insertAfter:function(e,t){const{parentNode:n,nextSibling:r}=t;r?n.insertBefore(e,r):n.appendChild(e)},removeElements:function(e,t,n){t=t||0,n=n||e.length;let r=[],a=0;for(let i=t;i<n;i++)r[a++]=e[i];for(let e=0,t=r.length;e<t;e++)r[e].remove()},replace:function(e,t){u.insertAfter(t,e),e.remove()},toggleAttribute:function(e,t,n,r){const a=e.getAttribute(t)===n?r:n;return e.setAttribute(t,a),a},toggleDataset:function(e,t,n,r){return e.dataset[t]=e.dataset[t]===n?r:n},each:i,eachFun:a(i),eachDynamic:o,eachDynamicFun:a(o)};const l=function(){const e={add:function(){return e},component:function(){return e},mount:t,update:n,share:{mount:t,update:n,destroy:function(){return null},isStatic:function(){return!0}}};return e;function t(e,t="childLast"){switch(t){case"replace":e.remove();break;case"replaceContent":u.empty(e)}return null}function n(){return!0}}();function f(e,t,n,r){const a=Object.keys(e);for(let i,o=0,c=a.length;o<c;o++)i=a[o],r=t.call(n,{item:e[i],key:i,index:o,share:r});return r}function m(e,t,n){let r;for(let a in e)e.hasOwnProperty(a)&&(r=t.call(n,{item:e[a],key:a,target:e,share:r}));return r}u.component=function(e,n,{mapUpdate:r}={}){if(void 0===e||"EMPTY"===e.toUpperCase())return l;let a=null;const i=t.createDocumentFragment();let o,c=[],s=0,f=[];const m={add:d,addText:function(e,n=0){h(n);const r=t.createTextNode(e);let a=c[s]=g().appendChild(r);return s+=1,Object.assign({oninit:function(e){return e(a),m}},m)},component:function({mount:e,update:t,isStatic:n},r=0){h(r),c[s]=e(g()),n()||(a||(a=p()),a.registerComponent(t));return s+=1,m},setShift:function(e=0){let t;e?f.splice(f.length+1+e):(t=f.pop(),f.push(t,t))},mount:A,update:b,share:{mount:A,update:b,destroy:function(){return o.remove(),null},isStatic:function(){return!a}}};return d(e,n);function d(e,n,r=0){h(r),n=n||{};const l=t.createElement(e);s?c[s]=g().appendChild(l):o=c[0]=i.appendChild(l);let f=c[s];return s+=1,u.assign(f,n),Object.assign({getReference:()=>f,oninit:function(e){return e(f),m},onupdate:function(e,t){return e?(a||(a=p()),u.assign(f,a.register(f,e,t)),m):m}},m)}function A(e,t="childLast"){switch(t){case"replace":u.replace(e,i);break;case"replaceContent":u.empty(e),e.appendChild(i);break;case"before":e.parentNode.insertBefore(i,e);break;case"after":u.insertAfter(i,e);break;default:"childFirst"===t&&e.childNodes.length?e.insertBefore(i,e.childNodes[0]):e.appendChild(i)}return o}function h(e){e?(f.splice(f.length+1+e),f[f.length-1]=s):f.push(s)}function g(){return c[f[f.length-2]]||i}function p(){const e={},t=[],n=new Map,a=new Map,i=new Map;let o=0;return{register:function(t,r,c){Object.assign(e,r);const s=o++;n.set(s,t);const u=Object.keys(r);for(let e,t=0,n=u.length;t<n;t++)e=u[t],i.has(e)?i.set(e,[...i.get(e),s]):i.set(e,[s]);return a.set(s,c),c.call(t,r)||{}},registerComponent:function(e){-1===t.indexOf(e)&&t.push(e)},update:function(o){const s="function"==typeof r?r(o):o;let l=!1;for(let e=0,n=t.length;e<n;e++)t[e](s)&&!l&&(l=!0);if(!i.size)return l;const f=Object.keys(s).filter(t=>i.has(t)&&e[t]!==s[t]),m=f.length;if(!m)return l;Object.assign(e,s);const d=[];for(let e,t=0;t<m;t++)for(let n,r=0,a=(e=i.get(f[t])).length;r<a;r++)n=e[r],-1===d.indexOf(n)&&d.push(n);for(let e=0,t=d.length;e<t;e++)A(d[e]);return!0;function A(t){const r=a.get(t).call(n.get(t),e)||{},i=n.get(t);if(null===i.parentNode)return c(t,f);u.assign(i,r)}},getData:function(){return e},unregister:c};function c(e,t){a.delete(e),n.delete(e);for(let e,n,a=0,o=t.length;a<o;a++)e=t[a],1===(n=i.get(e)).length?i.delete(e):i.set(e,n.filter(r));function r(t){return t!==e}}}function b(e){return!!a&&a.update("function"==typeof e?e(a.getData()):e)}},u.add=function(e,n){let r=t.createDocumentFragment(),a=[],i=[];for(var o=0,c=n.length;o<c;o++)a[o]=t.createElement(n[o][0]),o?void 0!==n[o][1].$?(i[o]=i[n[o][1].$].appendChild(a[o]),delete n[o][1].$):i[o]=i[o-1].appendChild(a[o]):i[o]=r.appendChild(a[o]),u.assign(i[o],n[o][1]);if(e.appendChild(r),o)return i[0]},u.assign=function(e,t){const n=Object.keys(t);for(let r,a,i=0,o=n.length;i<o;i++)if(void 0!==(a=t[r=n[i]]))switch(r){case"style":if("string"==typeof a)e.setAttribute("style",a);else for(let t,n=0,r=Object.keys(a),i=r.length;n<i;n++)t=r[n],e.style.setProperty(t,a[t]);break;case"style_vars":for(let t,n=0,r=Object.keys(a),i=r.length;n<i;n++)t=r[n],e.style.setProperty(t,a[t]);break;case"classList":if(!e[r].toggle)break;for(let t,n,r=0,i=Object.keys(a),o=i.length;r<o;r++)-1===(n=a[t=i[r]])?e.classList.toggle(t):e.classList.toggle(t,Boolean(n));break;case"dataset":for(let t,n=0,r=Object.keys(a),i=r.length;n<i;n++)t=r[n],e.dataset[t]=a[t];break;case"href":e.setAttribute(r,a);break;default:e[r]=a}else Reflect.has(e,r)&&Reflect.deleteProperty(e,r)},u.forceRedraw=function(e=t.body){let n=e.style.display;e.style.display="none";e.offsetHeight;e.style.display=n},r(u,"$dom"),r({branches:function(e=((e,t)=>(e.push(t),e)),t=(()=>[])){return function(...n){return function(...r){return n.reduce((t,n)=>e(t,n(...r)),"function"==typeof t?t():t)}}},component:function(e){let t=[];const n={pipe:function(e){return t.push(e),n},run:function(n){return t.reduce((e,t)=>t(e),"function"==typeof e?e(n):n)}};return n},conditionalCall:function(e,t){return!!e&&("function"==typeof t?t(e):e)},constant:e=>()=>e,each:function(...e){return function(t){for(let n=0,r=e.length;n<r;n++)e[n](t)}},identity:e=>e,ifElse:function(e,t=(e=>e),n=Boolean){return function(...r){return n(...r)?e(...r):"function"==typeof t?t(...r):void 0}},partial:function(e,...t){return function(...n){return e.call(this,...t,...n)}},schedule:function(t,{context:n=e,delay:r=150}={}){d.timeoutAnimationFrame(function e(){t.shift().call(n),t.length>0&&d.timeoutAnimationFrame(e,r)},r)},sequention:function(...e){return function(t){let n=t;for(let t=0,r=e.length;t<r;t++)n=e[t](n);return n}}},"$function"),r({each:f,eachFun:a(f),eachDynamic:m,eachDynamicFun:a(m),fromArray:function(e,t=((e,t,n)=>e[""+n]=t),n={}){return e.reduce((e,n,r)=>(t(e,n,r),e),n)},hasProp:function(e=c("obj"),t=c("prop")){return Object.prototype.hasOwnProperty.call(e,t)},immutable_keys:function(e={}){return new Proxy(Object.keys(e).reduce(function(t,n){return t[n]=e[n],t},{}),{get(e,t){if(-1!==Object.keys(e).indexOf(t))return e[t];switch(t){case"set":return function(e){return function(t,n){return-1===Object.keys(e).indexOf(t)&&(e[t]=n,!0)}}(e);case"keys":return function(){return Object.keys(e)};default:return}},set:()=>!1})},method:(e,...t)=>n=>n[e](...t),methodFrom:e=>t=>(...n)=>e[t](...n),pluck:e=>t=>t[e],pluckFrom:e=>t=>e[t],setter:(e,t)=>n=>(n[e]=t,n),setterFrom:e=>t=>n=>(e[t]=n,e)},"$object");var d={debounce:function(e,t,n){var r,a,i,o;return t||(t=150),function(){i=this,a=[].slice.call(arguments,0),o=new Date;let c=function(){let s=new Date-o;s<t?r=setTimeout(c,t-s):(r=null,n||e.apply(i,a))};n&&!r&&e.apply(i,a),r||(r=setTimeout(c,t))}},trottle:function(e,t){t||(t=1);var n,r,a,i=0;function o(){i===t?(i=0,cancelAnimationFrame(a)):a=requestAnimationFrame(o)}return function(){r=this,n=[].slice.call(arguments,0),i||(i++,e.apply(r,n),a=requestAnimationFrame(o))}},poll_:function(e,t,n){var r=Number(new Date)+(t||2e3);n=n||100;var a=function(t,i){var o=e();o?t(o):Number(new Date)<r?setTimeout(a,n,t,i):i(new Error("timed out for "+e+": "+arguments))};return new Promise(a)},once:function(e,t){var n;return function(){return e&&(n=e.apply(t||this,arguments),e=null),n}},timeoutAnimationFrame:function(e,t=150){setTimeout(requestAnimationFrame.bind(null,e),t)}};return r(d,"$optimiziers"),r({clearSpaces:function(e){return"string"==typeof e&&e.replace(/\s+/g,"")},countChars:function(e){if("string"!=typeof e)return!1;const t=e.length;let n,r=0;for(let a=0;a<t;a++)r+=94==(n=e.charCodeAt(a))||n>127?2:1;return r},generateUnique:()=>(new Date).getTime()+"_"+(performance.now().toString(36)+Math.random().toString(36)).replace(/\./g,(""+Math.random()).charAt(0)).substr(0,10),getSubstring:function(e,t,n=0){return n<0&&(n=0),e.length>t+n&&(e=e.substring(n,t)),e},letterInc:function(e,t,n){void 0===n&&(n=e.length-1);let r,a,i=e.charCodeAt(n);return t||(t=1),i?i<65?i=65:i>90&&i<97?i=97:i>122&&(i=122):i=0,r=i+t,(a=!(0===i||r<65)&&(!(r>90&&r<97)&&(!(r>122)&&String.fromCharCode(r))))&&(e=e.substr(0,n)+a+e.substr(n+1)),e},escapeHTML:function(e){var t={"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"};return e.replace(/[<>&"]/g,e=>t[e])},clearHTML:function(e){var n=t.createElement("div");return n.innerHTML=e,n.textContent},containsRepeatingChars:function(e,t=2){if("string"!=typeof e)return!1;let n=new RegExp("(\\S)(\\1{"+t+",})","g");return e=e.replace(/\s+/g,"_"),n.test(e)},containsSequential:function(e,t){if("string"!=typeof e)return!1;t=t||2;let n=!1,r=+e[0],a=1;for(let i=1,o=e.length;i<o;i++)+e[i]-a!==r||n?n||(r=+e[i],a=1):++a>t&&(n=!0);if(!n){r=String.fromCharCode(e.charCodeAt(0)),a=1;for(let i=1,o=e.length;i<o;i++)this.letterInc(String.fromCharCode(e.charCodeAt(i)),-a)!==r||n?n||(r=String.fromCharCode(e.charCodeAt(i)),a=1):++a>t&&(n=!0)}return n},isEmail:function(e){let t=e.split("@");if(2!==t.length)return!1;if(3!==(t=[t[0],...t[1].split(".")]).length)return!1;const n=!/(#|\?|!|\\|\/|\||\.\.)/i.test(t[0]);return n&&t.reduce((e,t)=>e&&t.length>1&&!/\s/.test(t),n)},isFilled:function(e){return"string"==typeof e&&(!!e.trim()&&e)},template:function(e,t=Object.keys){if("string"!=typeof e)throw Error("Type of 'str' is not string!");const n=/\$\{([\s]*[^;\s\{]+[\s]*)\}/g,r=Object.freeze({partial:function(t={}){return e=a(t),r},partialRest:function(...t){let a=0,i=t.length;return e=e.replace(n,function(e){return a++<i?t[a-1]:e}),r},setKeysFilter:function(e){return t=e,r},isSubstituted:function(){return!n.test(e)},execute:a});return r;function a(r={}){const a=t(r);return a.length?e.replace(n,function(e,t){return-1!==a.indexOf(t)?r[t]:e}):e}},toCamelCase:function(e){if("string"!=typeof e)throw Error("Type of 'str' is not string!");if(!e)return e;let[t,...n]=e.split("");return[t.toUpperCase(),...n].join("")}},"$string"),r(function(){const e=(({time:e,date:t,seconds:n})=>({time:e,date:t,time_seconds:Object.assign(n,e),date_time:Object.assign({},e,t),date_time_seconds:Object.assign({},Object.assign(n,e),t)}))({time:{hour:"2-digit",minute:"2-digit"},date:{year:"numeric",day:"2-digit",month:"2-digit"},seconds:{second:"2-digit"}}),t=(({dash:e,colon:t,space:n,two_dig:r})=>({YMD_2d:[["year","numeric"],e,["month",r],e,["day",r]],Hms_2d:[["hour",r,"h23"],t,["minute",r],t,["second",r]],YMDHms_2d:[["year","numeric"],e,["month",r],e,["day",r],n,["hour",r,"h23"],t,["minute",r],t,["second",r]]}))({dash:["text","-"],colon:["text",":"],space:["text"," "],two_dig:"2-digit"}),n=["th","st","nd","rd"],r=e=>-1!==e.indexOf("-"),a=e=>-1!==e.indexOf("T");let i="en-GB",o="";const c=Object.freeze(["Africa/Abidjan","Africa/Accra","Africa/Algiers","Africa/Bissau","Africa/Cairo","Africa/Casablanca","Africa/Ceuta","Africa/El_Aaiun","Africa/Johannesburg","Africa/Juba","Africa/Khartoum","Africa/Lagos","Africa/Maputo","Africa/Monrovia","Africa/Nairobi","Africa/Ndjamena","Africa/Sao_Tome","Africa/Tripoli","Africa/Tunis","Africa/Windhoek","America/Adak","America/Anchorage","America/Araguaina","America/Argentina/Buenos_Aires","America/Argentina/Catamarca","America/Argentina/Cordoba","America/Argentina/Jujuy","America/Argentina/La_Rioja","America/Argentina/Mendoza","America/Argentina/Rio_Gallegos","America/Argentina/Salta","America/Argentina/San_Juan","America/Argentina/San_Luis","America/Argentina/Tucuman","America/Argentina/Ushuaia","America/Asuncion","America/Atikokan","America/Bahia_Banderas","America/Bahia","America/Barbados","America/Belem","America/Belize","America/Blanc-Sablon","America/Boa_Vista","America/Bogota","America/Boise","America/Cambridge_Bay","America/Campo_Grande","America/Cancun","America/Caracas","America/Cayenne","America/Costa_Rica","America/Creston","America/Cuiaba","America/Curacao","America/Danmarkshavn","America/Dawson_Creek","America/Dawson","America/Denver","America/Detroit","America/Edmonton","America/Eirunepe","America/El_Salvador","America/Fort_Nelson","America/Fortaleza","America/Glace_Bay","America/Godthab","America/Goose_Bay","America/Grand_Turk","America/Guatemala","America/Guayaquil","America/Guyana","America/Halifax","America/Havana","America/Hermosillo","America/Chicago","America/Chihuahua","America/Indiana/Indianapolis","America/Indiana/Knox","America/Indiana/Marengo","America/Indiana/Petersburg","America/Indiana/Tell_City","America/Indiana/Vevay","America/Indiana/Vincennes","America/Indiana/Winamac","America/Inuvik","America/Iqaluit","America/Jamaica","America/Juneau","America/Kentucky/Louisville","America/Kentucky/Monticello","America/La_Paz","America/Lima","America/Los_Angeles","America/Maceio","America/Managua","America/Manaus","America/Martinique","America/Matamoros","America/Mazatlan","America/Menominee","America/Merida","America/Metlakatla","America/Mexico_City","America/Miquelon","America/Moncton","America/Monterrey","America/Montevideo","America/Nassau","America/New_York","America/Nipigon","America/Nome","America/Noronha","America/North_Dakota/Beulah","America/North_Dakota/Center","America/North_Dakota/New_Salem","America/Ojinaga","America/Panama","America/Pangnirtung","America/Paramaribo","America/Phoenix","America/Port_of_Spain","America/Port-au-Prince","America/Porto_Velho","America/Puerto_Rico","America/Punta_Arenas","America/Rainy_River","America/Rankin_Inlet","America/Recife","America/Regina","America/Resolute","America/Rio_Branco","America/Santarem","America/Santiago","America/Santo_Domingo","America/Sao_Paulo","America/Scoresbysund","America/Sitka","America/St_Johns","America/Swift_Current","America/Tegucigalpa","America/Thule","America/Thunder_Bay","America/Tijuana","America/Toronto","America/Vancouver","America/Whitehorse","America/Winnipeg","America/Yakutat","America/Yellowknife","Antarctica/Casey","Antarctica/Davis","Antarctica/Macquarie","Antarctica/Mawson","Antarctica/Palmer","Antarctica/Rothera","Antarctica/Syowa","Antarctica/Troll","Antarctica/Vostok","Asia/Almaty","Asia/Amman","Asia/Anadyr","Asia/Aqtau","Asia/Aqtobe","Asia/Ashgabat","Asia/Atyrau","Asia/Baghdad","Asia/Baku","Asia/Bangkok","Asia/Barnaul","Asia/Beirut","Asia/Bishkek","Asia/Brunei","Asia/Colombo","Asia/Damascus","Asia/Dhaka","Asia/Dili","Asia/Dubai","Asia/Dushanbe","Asia/Famagusta","Asia/Gaza","Asia/Hebron","Asia/Ho_Chi_Minh","Asia/Hong_Kong","Asia/Hovd","Asia/Chita","Asia/Choibalsan","Asia/Irkutsk","Asia/Jakarta","Asia/Jayapura","Asia/Jerusalem","Asia/Kabul","Asia/Kamchatka","Asia/Karachi","Asia/Kathmandu","Asia/Khandyga","Asia/Kolkata","Asia/Krasnoyarsk","Asia/Kuala_Lumpur","Asia/Kuching","Asia/Macau","Asia/Magadan","Asia/Makassar","Asia/Manila","Asia/Nicosia","Asia/Novokuznetsk","Asia/Novosibirsk","Asia/Omsk","Asia/Oral","Asia/Pontianak","Asia/Pyongyang","Asia/Qatar","Asia/Qyzylorda","Asia/Riyadh","Asia/Sakhalin","Asia/Samarkand","Asia/Seoul","Asia/Shanghai","Asia/Singapore","Asia/Srednekolymsk","Asia/Taipei","Asia/Tashkent","Asia/Tbilisi","Asia/Tehran","Asia/Thimphu","Asia/Tokyo","Asia/Tomsk","Asia/Ulaanbaatar","Asia/Urumqi","Asia/Ust-Nera","Asia/Vladivostok","Asia/Yakutsk","Asia/Yangon","Asia/Yekaterinburg","Asia/Yerevan","Atlantic/Azores","Atlantic/Bermuda","Atlantic/Canary","Atlantic/Cape_Verde","Atlantic/Faroe","Atlantic/Madeira","Atlantic/Reykjavik","Atlantic/South_Georgia","Atlantic/Stanley","Australia/Adelaide","Australia/Brisbane","Australia/Broken_Hill","Australia/Currie","Australia/Darwin","Australia/Eucla","Australia/Hobart","Australia/Lindeman","Australia/Lord_Howe","Australia/Melbourne","Australia/Perth","Australia/Sydney","Europe/Amsterdam","Europe/Andorra","Europe/Astrakhan","Europe/Athens","Europe/Belgrade","Europe/Berlin","Europe/Brussels","Europe/Budapest","Europe/Bucharest","Europe/Copenhagen","Europe/Dublin","Europe/Gibraltar","Europe/Helsinki","Europe/Chisinau","Europe/Istanbul","Europe/Kaliningrad","Europe/Kiev","Europe/Kirov","Europe/Lisbon","Europe/London","Europe/Luxembourg","Europe/Madrid","Europe/Malta","Europe/Minsk","Europe/Monaco","Europe/Moscow","Europe/Oslo","Europe/Paris","Europe/Prague","Europe/Riga","Europe/Rome","Europe/Samara","Europe/Saratov","Europe/Simferopol","Europe/Sofia","Europe/Stockholm","Europe/Tallinn","Europe/Tirane","Europe/Ulyanovsk","Europe/Uzhgorod","Europe/Vienna","Europe/Vilnius","Europe/Volgograd","Europe/Warsaw","Europe/Zaporozhye","Europe/Zurich","Indian/Cocos","Indian/Chagos","Indian/Christmas","Indian/Kerguelen","Indian/Mahe","Indian/Maldives","Indian/Mauritius","Indian/Reunion","Pacific/Apia","Pacific/Auckland","Pacific/Bougainville","Pacific/Easter","Pacific/Efate","Pacific/Enderbury","Pacific/Fakaofo","Pacific/Fiji","Pacific/Funafuti","Pacific/Galapagos","Pacific/Gambier","Pacific/Guadalcanal","Pacific/Guam","Pacific/Honolulu","Pacific/Chatham","Pacific/Chuuk","Pacific/Kiritimati","Pacific/Kosrae","Pacific/Kwajalein","Pacific/Majuro","Pacific/Marquesas","Pacific/Nauru","Pacific/Niue","Pacific/Norfolk","Pacific/Noumea","Pacific/Pago_Pago","Pacific/Palau","Pacific/Pitcairn","Pacific/Pohnpei","Pacific/Port_Moresby","Pacific/Rarotonga","Pacific/Tahiti","Pacific/Tarawa","Pacific/Tongatapu","Pacific/Wake","Pacific/Wallis"]),s=Object.freeze({"-01:00":238,"-02:00":242,"-03:00":107,"-04:00":49,"-05:00":92,"-06:00":62,"-07:00":120,"-08:00":337,"-09:00":320,"-09:30":330,"-10:00":323,"-11:00":332,"+01:00":15,"+02:00":8,"+03:00":270,"+04:00":306,"+04:30":191,"+05:00":221,"+05:30":173,"+05:45":194,"+06:00":207,"+06:30":232,"+07:00":182,"+08:00":220,"+08:30":210,"+08:45":249,"+09:00":176,"+09:30":248,"+10:00":229,"+11:00":314,"+12:00":345,"+13:00":316,"+14:00":326,BST:275,CET:284,EET:264,WET:274});function u(e){return f(e.toISOString())}function l(){return f((new Date).toISOString())}function f(e){let t,n,r=0,a="",i="",o="",c="";for(;e.length;)t=e[0],/\d/.test(t)?e.search(/\d\d\d\d-\d\d-\d\d/)?e.search(/\d\d\/\d\d\/\d\d\d\d/)?e.search(/\d\d:\d\d:\d\d/)?e.search(/\d\d:\d\d/)?e=e.substr(1):(o="T"+e.substr(0,5)+":00",e=e.substr(5)):(o="T"+e.substr(0,8),e=e.substr(8)):(i=e.substr(0,10).split("/").sort((e,t)=>t).join("-"),e=e.substr(10)):(i=e.substr(0,10),e=e.substr(10)):/[ ,\._]/.test(t)||/T\d/.test(t)?e=e.substr(1):e.search(/[\+\-]\d\d:\d\d/)?e.search(/[A-Z]{2,}/)?"Z"===t?(c="Z",e=e.substr(1)):e=e.substr(1):(a=-1===(n=e.search(/[^A-Z]/))?e:e.substr(0,n),e=e.substr(a.length),"CET"===a&&(c=a,a="")):(a=e.substr(0,6),e=e.substr(6),Reflect.has(s,a)&&(c=a,a="")),(r+=1)>5&&i&&o&&c&&(e="");return[i,o,c]}function m(e,{locale:t=i,declension:n=!0,timeZone:r=o}={}){return e?a=>e.map(function(e,t,n,r){const a=y.bind(null,n);return function([n,i,o]){let c=function(e,t,n,r,a,i,o){switch(!0){case"text"===t:return n;case"week"===t:return P(e);case"weekday"===t&&"numeric"===n:return E()(e);case"month"===t&&"long"===n&&a:return e.toLocaleString(i,o({[t]:n,day:"numeric"})).replace(/[\d \.\/\\]/g,"");case"hour"===t&&"a"===r.toLowerCase():return e.toLocaleString("A"===r?"en-US":"en-GB",o({[t]:n,hourCycle:"h12"})).replace(/[\d \.\/\\]/g,"");case"hour"===t:return e.toLocaleString(i,o({[t]:n,hourCycle:r})).replace(/[ \.\/\\pam]/gi,"");default:return e.toLocaleString(i,o({[t]:n}))}}(e,n,i,o,r,t,a);return"2-digit"===i&&1===c.length&&(c="0"+c),"two_letters"===o?c=c.substr(0,2):"ordinal_number"===o&&-1!==t.indexOf("en")&&(c=v(c)),c}}(d(a),t,r,n)).join(""):e=>e.join("")}function d([e,t,n]=[]){return e||(e=l()[0]),t||(t="T00:00:00"),n||(n=b(e)),"CET"===n&&(n=g([e,t])),new Date(e+t+n)}function A(e,t=1){const n=!!e&&d(e).getTime();return function(e){return(d(e).getTime()-(n||d(l()).getTime()))/t}}function h(e){const{abs:t,floor:n,round:r}=Math,a=e<0?"%s ago":"in %s";return(e=t(e))<1500?"now":(e=n(e/1e3))<10?a.replace("%s","a few seconds"):e<60?a.replace("%s",e+" seconds"):1===(e=n(e/60))?a.replace("%s","a minute"):e<60?a.replace("%s",e+" minutes"):1===(e=r(e/60))?a.replace("%s","an hour"):e<24?a.replace("%s",e+" hours"):1===r(e/=24)?a.replace("%s","a day"):e<29.5?a.replace("%s",r(e)+" days"):1===r(e/=30.41666)?a.replace("%s","a month"):e<12?a.replace("%s",r(e)+" months"):1===(e=r(e/12))?a.replace("%s","a year"):a.replace("%s",e+" years")}function g([e,t]=[]){if(!e||!t){let n=l();e||(e=n[0]),t||(t=n[1].replace(/\.\d+/,""))}const n=e+t,r=e.split("-").reverse().join("/")+", "+t.replace("T",""),[a,i]=["+01:00","+02:00"].map(e=>new Date(n+e).toLocaleString("en-GB",{timeZone:"Europe/Prague"}));return r===a?"+01:00":r===i?"+02:00":"Z"}function p(e){return k(e).getTimezoneOffset()}function b(e){return C(p(e))}function y(e,t){return e?-1!==c.indexOf(e)?Object.assign({timeZone:e},t):void 0!==s[e]?Object.assign({timeZone:c[s[e]]},t):t:t}function k(e){return e?(Array.isArray(e)||(e=f(e)),new Date(...e[0].split("-").map((e,t)=>1===t?+e-1:+e))):new Date}function C(e){const{floor:t,abs:n}=Math;let r=e>0?"-":"+";return r+=_(t((e=n(e))/60))+":"+_(e%60)}function w(e){return t=>(t.setDate(t.getDate()+e),t)}function E(e="numeric",{locale:t=i,timeZone:n=o}={}){return"numeric"===e?e=>e.getDay():n=>n.toLocaleString(t,{weekday:e})}function P(e){const t=new Date(e.valueOf());t.setDate(t.getDate()+3-(e.getDay()+6)%7);var n=t.valueOf();return t.setMonth(0,1),4!==t.getDay()&&t.setMonth(0,1+(4-t.getDay()+7)%7),1+Math.ceil((n-t)/6048e5)}function M(e,t,n){const r=e.substr(3);return n["set"+r](n["get"+r]()+t),n}function _(e){return 1===(e=String(e)).length?"0"+e:e}function S(e,t=(new Date).getFullYear()){return new Date(+t,+e,0).getDate()}function v(e){const t="number"==typeof e?e:parseInt(e);if(isNaN(t))return e;let r=t%100;return e+(n[(r-20)%10]||n[r]||n[0])}return{_:void 0,fromNow:l,fromString:function(e,t=o){if(!e)return l();let n=f(e);return 3!==n.length?r(n[0])?a(n[1])?n[2]=t||"":(n[2]=t||n[1],n[1]=""):n.unshift(""):t&&(n[2]=t),n},fromDate:u,fromDateArguments:function(...e){return f((e.filter(e=>void 0!==e).length?new Date(...e):new Date).toISOString())},toDate:d,toString:function(e,t){return m(!!e&&function(e=""){let t,n,r=[];for(;e.length;)switch(e[0]){case"M":a();break;case"d":i();break;case"W":c("week","W");break;case"Y":o();break;case"D":c("day","D");break;case"H":s("hour","H","h23");break;case"k":s("hour","k","h24");break;case"h":s("hour","h","h12");break;case"A":u("A");break;case"a":u("a");break;case"m":l("minute","m");break;case"s":l("second","s");break;case"[":f();break;default:n=e[0],(t=r.length-1)>-1&&"text"===r[t][0]?r[t][1]+=n:r.push(["text",n]),e=e.substring(1)}function a(){let t="numeric";if(e.search(/MMMM/))if(e.search(/MMM/))if(e.search(/MM/)){if(!e.search(/Mo/))return e=e.substring(2),r.push(["month",t,"ordinal_number"]);e=e.substring(1)}else t="2-digit",e=e.substring(2);else t="short",e=e.substring(3);else t="long",e=e.substring(4);r.push(["month",t])}function i(){let t="numeric";if(e.search(/dddd/))if(e.search(/ddd/)){if(!e.search(/dd/))return t="short",e=e.substring(2),r.push(["weekday",t,"two_letters"]);e=e.substring(1)}else t="short",e=e.substring(3);else t="long",e=e.substring(4);r.push(["weekday",t])}function o(){let t="2-digit";e.search(/YYYY/)?e=e.substring(2):(t="numeric",e=e.substring(4)),r.push(["year",t])}function c(t,n){let a="numeric";if(!e.search(new RegExp(n+"o")))return e=e.substring(2),r.push([t,a,"ordinal_number"]);e.search(new RegExp(n+n))?e=e.substring(1):(a="2-digit",e=e.substring(2)),r.push([t,a])}function s(t,n,a){let i="numeric";e.search(new RegExp(n+n))?e=e.substring(1):(i="2-digit",e=e.substring(2)),r.push([t,i,a])}function u(t){e=e.substring(1),r.push(["hour","numeric",t])}function l(t,n){let a="numeric";e.search(new RegExp(n+n))?e=e.substring(1):(a="2-digit",e=e.substring(2)),r.push([t,a])}function f(){const t=e.indexOf("]");if(-1===t)return e=e.substring(1),!1;r.push(["text",e.substr(1,t-1)]),e=e.substr(t+1)}return r}(e),t)},toStringPreDefined:function(e="YMDHms_2d",n={}){return m(t[e],n)},toLocaleString:function(t="date_time",{locale:n=i,timeZone:r=o}={}){return a=>d(a).toLocaleString(n,y(r,e[t]))},toRelative:function(e){return t=>h(A(e)(t))},getDiff:function(e,t="seconds",n=!1){const r=A(e,-{seconds:1e3,minutes:6e4,hours:36e5,days:864e5,weeks:6048e5,months:24192e5,years:290304e5}[t]);return function(e){const t=r(e);return n?t:Math.floor(t)}},getRelative:h,getCETOffset:g,getTimeZoneOffset:p,getTimeZoneOffsetString:b,getTimeZone:function(e,{locale:t=i,description:n="long",offset:r=!1}={}){const a=k(e);let o="none"===n?"":a.toLocaleString(t,{timeZoneName:n}).replace(a.toLocaleString(t),"").trim();const c=r?"UTC"+C(a.getTimezoneOffset()):"";return o&&c&&(o=" ("+o+")"),c+o},Date:{getWeekDay:E,getWeekNumber:P,addDays:w,addMonths:function(e){return t=>(t.setMonth(t.getMonth()+e),t)}},setTimeZone:function(e=o){return([t="",n=""]=[])=>[t,n,e]},modify:function(e){const t=Object.keys(e);return function(n){const r=d(n);for(let n,a=0;n=t[a];a++)"addDays"===n?w(e[n])(r):"add"===n.substr(0,3)?M(n,e[n],r):"setMonth"===n?r.setMonth(e[n]-1):Reflect.has(r,n)?r[n](e[n]):"setDay"===n&&r.setDate(e[n]);return u(r)}},double:_,getOrdinalSuffix:v,getMonthName:function(e,t){if("number"!=typeof e&&(e=parseInt(e)),isNaN(e))return!1;let n=["December","January","February","March","April","May","June","July","August","September","October","November"][e%12];return t&&(-1===t&&(t=3,4===n.length&&(t=4)),n=n.substring(0,t)),n},getDaysInMonth:function([e=l()[0]]=[]){const[t,n,r]=e.split("-").map(Number);return S(n,r)},daysInMonth:S,getTimeZones:()=>c,isTimeZone:e=>-1!==c.indexOf(e),setInternalZone:e=>o=e,setInternalLocale:e=>i=e}}(),"$time"),n});