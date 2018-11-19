!function(e,t){"use strict";let n;"function"==typeof define&&define.amd?define([],function(){return t(window,document)}):"undefined"!=typeof exports?module.exports=t(window,document):(n=t(window,document),Object.keys(n).forEach(e=>window[e]=n[e]),window.jaaJSU_version="0.1")}(0,function(e,t){"use strict";function n(e,t){const n=e.length;for(let r=0,o=n-1;r<n;r++,o--)t(e[r],r,!o)}function r(e){throw new Error("Missing parameter: "+e)}var o={clearSpaces:function(e){return"string"==typeof e&&e.replace(/\s+/g,"")},countChars:function(e){if("string"!=typeof e)return!1;const t=e.length;let n,r=0;for(let o=0;o<t;o++)r+=94==(n=e.charCodeAt(o))||n>127?2:1},generateUnique:()=>(new Date).getTime()+"_"+(performance.now().toString(36)+Math.random().toString(36)).replace(/\./g,(""+Math.random()).charAt(0)).substr(0,10),getSubstring:function(e,t,n){return n||(n=0),n<0&&(n=0),e.length>t+n&&(e=e.substring(n,t)),e},letterInc:function(e,t,n){void 0===n&&(n=e.length-1);let r,o,i=e.charCodeAt(n);return t||(t=1),i?i<65?i=65:i>90&&i<97?i=97:i>122&&(i=122):i=0,r=i+t,(o=!(0===i||r<65)&&(!(r>90&&r<97)&&(!(r>122)&&String.fromCharCode(r))))&&(e=e.substr(0,n)+o+e.substr(n+1)),e},escapeHTML:function(e){var t={"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"};return e.replace(/[<>&"]/g,e=>t[e])},clearHTML:function(e){var n=t.createElement("div");return n.innerHTML=e,n.textContent},containsRepeatingChars:function(e,t){if("string"!=typeof e)return!1;t=t||2;let n=new RegExp("(\\S)(\\1{"+t+",})","g");return e=e.replace(/\s+/g,"_"),n.test(e)},containsSequential:function(e,t){if("string"!=typeof e)return!1;t=t||2;let n=!1,r=+e[0],o=1;for(let i=1,u=e.length;i<u;i++)+e[i]-o!==r||n?n||(r=+e[i],o=1):++o>t&&(n=!0);if(!n){r=String.fromCharCode(e.charCodeAt(0)),o=1;for(let i=1,u=e.length;i<u;i++)this.letterInc(String.fromCharCode(e.charCodeAt(i)),-o)!==r||n?n||(r=String.fromCharCode(e.charCodeAt(i)),o=1):++o>t&&(n=!0)}return n},isNonEmpty:function(e){return"string"==typeof e&&(!!e.trim()&&e)},template:function(e){if("string"!=typeof e)throw Error("Type of 'str' is not string!");const t=/\$\{([\s]*[^;\s\{]+[\s]*)\}/g;return Object.freeze({execute:function(n={}){const r=Object.keys(n);return r.length?e=e.replace(t,function(e,t){return-1!==r.indexOf(t)?n[t]:t}):e},isSubstituted:function(){return!t.test(e)}})}},i={ready_:function(){let e=null;return arguments&&(e=1===arguments.length?arguments[0]:arguments),new Promise(function(n){"loading"!==t.readyState?n(e):t.addEventListener("readystatechange",function r(){"loading"!==t.readyState&&(t.removeEventListener("readystatechange",r),n(e))})})},elementReady_:function(e,n){n||(n=t);const r=Object.keys(e)[0],o=e[r];return new Promise(function(e,t){requestAnimationFrame(function t(){const i=n[r](o);i?e(i):requestAnimationFrame(t)})})},forceRedraw:function(e,t){if(e=e||active_page_el,t=t||"iOS",device.platform===t||"all"===t){let t=e.style.display;e.style.display="none";e.offsetHeight;e.style.display=t}},removeElements:function(e,t,n){t=t||0,n=n||e.length;let r=[],o=0;for(let i=t;i<n;i++)r[o++]=e[i];for(let e=0,t=r.length;e<t;e++)r[e].remove()},each:n,add:function(e,n){let r,o=t.createDocumentFragment(),i=[],u=[];for(var a=0,c=n.length;a<c;a++){i[a]=t.createElement(n[a][0]),a?void 0!==n[a][1].$?(u[a]=u[n[a][1].$].appendChild(i[a]),delete n[a][1].$):u[a]=u[a-1].appendChild(i[a]):u[a]=o.appendChild(i[a]);for(let e=0,t=(r=Object.keys(n[a][1])).length;e<t;e++)switch(r[e]){case"style":u[a].setAttribute("style",n[a][1][r[e]]);break;case"style_vars":for(let e=0,t=Object.keys(n[a][1].style_vars),r=t.length;e<r;e++)u[a].style.setProperty(t[e],n[a][1].style_vars[t[e]]);break;case"href":u[a].setAttribute("href",n[a][1][r[e]]);break;default:u[a][r[e]]=n[a][1][r[e]]}}if(e.appendChild(o),a)return u[0]}},u={serialize:function(){const e=e=>t=>e().then((e=>Array.prototype.concat.bind(e))(t)),t=(t,n)=>t.then(e(n));return e=>e.reduce(t,Promise.resolve([]))}(),iterate_:function(e){return new Promise(function(t,n){let r=Promise.resolve();for(let t=0,n=e.length;t<n;t++)r=r.then(e[t]);r.then(t).catch(n)})},CANCEL:Symbol("$async.CANCEL"),iterateMixed_:function(...e){return new Promise(function(t,n){return function n(r){if(!e.length)return t(r);const o=e.shift(),i="function"==typeof o?o(r):o;if(null!==i){if(i===u.CANCEL)return;if(i.then)return i.then(n)}return Promise.resolve(n(i))}()})},sequention_:function(...e){return function(...t){return new Promise(function(n,r){let o=Promise.resolve(...t);for(let t=0,n=e.length;t<n;t++)o=o.then(e[t]);o.then(n).catch(r)})}},each_:function(...e){return function(...t){return Promise.all(e.map(e=>e(...t)))}}},a={getOrdinalSuffix:function(e){if("number"!=typeof e&&(e=parseInt(e)),isNaN(e))return!1;let t=["th","st","nd","rd"],n=e%100;return e+(t[(n-20)%10]||t[n]||t[0])},getMonthName:function(e,t){if("number"!=typeof e&&(e=parseInt(e)),isNaN(e))return!1;let n=["December","January","February","March","April","May","June","July","August","September","October","November"][e%12];return t&&(-1===t&&(t=3,4===n.length&&(t=4)),n=n.substring(0,t)),n},getTimeStamp:function(e){let t=e?new Date(e):new Date;return t.getFullYear()+"-"+this.double(t.getMonth()+1)+"-"+this.double(t.getDate())+" "+this.double(t.getHours())+":"+this.double(t.getMinutes())+":"+this.double(t.getSeconds())},getDateStamp:function(e){let t=e?new Date(e):new Date;return t.getFullYear()+"-"+this.double(t.getMonth()+1)+"-"+this.double(t.getDate())},getTimeString:function(e){let t=e?new Date(e):new Date;return this.double(t.getHours())+":"+this.double(t.getMinutes())+":"+this.double(t.getSeconds())},getDiff:function(e,t){var n;switch(e.length){case 19:n=a.getTimeStamp(t);break;case 10:n=a.getDateStamp(t);break;case 8:n=t?a.getTimeString(t):a.getTimeStamp(t),e=a.getDateStamp()+" "+e;break;default:return console.error("Unknown error!"),0}return new Date(e).getTime()-new Date(n).getTime()},double:function(e){return 1==(e=e.toString()).length?"0"+e:2==e.length?e:"00"}};return{$string:o,$dom:i,$async:u,$optimiziers:{debounce:function(e,t,n){var r,o,i,u;return t||(t=150),function(){i=this,o=[].slice.call(arguments,0),u=new Date;let a=function(){let c=new Date-u;c<t?r=setTimeout(a,t-c):(r=null,n||e.apply(i,o))};n&&!r&&e.apply(i,o),r||(r=setTimeout(a,t))}},trottle:function(e,t){t||(t=1);var n,r,o,i=0;function u(){i===t?(i=0,cancelAnimationFrame(o)):o=requestAnimationFrame(u)}return function(){r=this,n=[].slice.call(arguments,0),i||(i++,e.apply(r,n),o=requestAnimationFrame(u))}},poll_:function(e,t,n){var r=Number(new Date)+(t||2e3);n=n||100;var o=function(t,i){var u=e();u?t(u):Number(new Date)<r?setTimeout(o,n,t,i):i(new Error("timed out for "+e+": "+arguments))};return new Promise(o)},once:function(e,t){var n;return function(){return e&&(n=e.apply(t||this,arguments),e=null),n}},timeoutAnimationFrame:function(e,t=150){setTimeout(requestAnimationFrame.bind(null,e),t)}},$time:a,$array:{arrayIndex:function(e,t,n){return(n+e+t%n)%n},each:n,getLast:function(e){return e[e.length-1]},removeItem:function(e,t){for(var n=0;n<e.length;)e[n]===t?e.splice(n,1):n++},sortRandom:function(){return Math.random()-.5}},$object:{hasProp:function(e=r("obj"),t=r("prop")){return Object.prototype.hasOwnProperty.call(e,t)},fromArray:function(e,t=((e,t,n)=>e[""+n]=t),n={}){return e.reduce((e,n,r)=>(t(e,n,r),e),n)},immutable_keys:function(e){return new Proxy(Object.keys(e).reduce(function(t,n){return t[n]=e[n],t},{}),{get(e,t){if(-1!==Object.keys(e).indexOf(t))return e[t];switch(t){case"set":return function(e){return function(t,n){return-1===Object.keys(e).indexOf(t)&&(e[t]=n,!0)}}(e);case"keys":return function(){return Object.keys(e)};default:return}},set:()=>!1})},each:function(e,t){const n=Object.keys(e);for(let r=0,o=n.length;r<o;r++){const o=n[r];t(e[o],o,r)}}},$function:{each:function(...e){return function(...t){for(let n=0,r=e.length;n<r;n++)e[n](...t)}},map:function(...e){return function(...t){let n=[];for(let r=0,o=e.length;r<o;r++)n.push(e[r](...t));return n}},sequention:function(...e){return function(...t){let n=t;for(let t=0,r=e.length;t<r;t++)n=e[t](...n);return n}},schedule:function(t,{context:n=e,delay:r=150}={}){$optimiziers.timeoutAnimationFrame(function e(){t.shift().call(n),t.length>0&&$optimiziers.timeoutAnimationFrame(e,r)},r)},conditionalCall:function(e,t){return!!e&&("function"==typeof t?t(e):e)}}}});