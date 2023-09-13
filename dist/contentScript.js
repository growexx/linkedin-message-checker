/*! For license information please see contentScript.js.LICENSE.txt */
(()=>{"use strict";var t={WITH_CHATGPT:"withChatGPT",WITHOUT_CHATGPT:"withoutChatGPT",OPEN_PROFILE:"openProfile",SCRAPE_DETAILS:"scrapeDetails",GET_FROM_LS:"getFromLS",SCRAPE_SKILLS:"scrapeSkills",SCRAPE_POST:"scrapePost",CSV_NOT_CONTAIN_FIELD:"Csv not contain ProfileUrls field.",MESSAGE:"Message",NO_DATA_SELECTED:"No data selected",OUTPUT_FILE_NAME:"linkedUserData.csv",TEXT_CSV:"text/csv",TAB_DETAILS:"tabDetails",LINKEDIN_URL:"linkedin.com",OK:"OK",PROFILE_DETAILS:"profileDetails",MY_CONNECTION:"My Connection",MY_MESSEGING:"My Messaging",CURRENTPAGEMAPPING:"currentPageMapping",FETCHALLLIST:"fetchAllList",MSG_SCRAPE_DETAILS:"msgScrapeDetails",MAPDATA:"mapData",NAVIGATE:"navigate",EXTRACTFROMUSERPAGE:"extractFromUserPage",SCROLL:"scroll",EXTRACTPAGENUMBER:"extractPageNumber",SCROLLMSGCONNECTION:"scrollMsgConnection",LOADMOREMSGCONNECTION:"loadMoreMsgConnection",EXTRACTMSGCONNECTION:"extractMsgConnection"};function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}function r(){r=function(){return n};var t,n={},a=Object.prototype,o=a.hasOwnProperty,i=Object.defineProperty||function(t,e,r){t[e]=r.value},c="function"==typeof Symbol?Symbol:{},u=c.iterator||"@@iterator",s=c.asyncIterator||"@@asyncIterator",l=c.toStringTag||"@@toStringTag";function f(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(t){f=function(t,e,r){return t[e]=r}}function p(t,e,r,n){var a=e&&e.prototype instanceof b?e:b,o=Object.create(a.prototype),c=new I(n||[]);return i(o,"_invoke",{value:O(t,r,c)}),o}function m(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}n.wrap=p;var d="suspendedStart",h="suspendedYield",y="executing",g="completed",v={};function b(){}function x(){}function E(){}var S={};f(S,u,(function(){return this}));var w=Object.getPrototypeOf,N=w&&w(w(D([])));N&&N!==a&&o.call(N,u)&&(S=N);var A=E.prototype=b.prototype=Object.create(S);function C(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function T(t,r){function n(a,i,c,u){var s=m(t[a],t,i);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==e(f)&&o.call(f,"__await")?r.resolve(f.__await).then((function(t){n("next",t,c,u)}),(function(t){n("throw",t,c,u)})):r.resolve(f).then((function(t){l.value=t,c(l)}),(function(t){return n("throw",t,c,u)}))}u(s.arg)}var a;i(this,"_invoke",{value:function(t,e){function o(){return new r((function(r,a){n(t,e,r,a)}))}return a=a?a.then(o,o):o()}})}function O(e,r,n){var a=d;return function(o,i){if(a===y)throw new Error("Generator is already running");if(a===g){if("throw"===o)throw i;return{value:t,done:!0}}for(n.method=o,n.arg=i;;){var c=n.delegate;if(c){var u=L(c,n);if(u){if(u===v)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(a===d)throw a=g,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);a=y;var s=m(e,r,n);if("normal"===s.type){if(a=n.done?g:h,s.arg===v)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(a=g,n.method="throw",n.arg=s.arg)}}}function L(e,r){var n=r.method,a=e.iterator[n];if(a===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,L(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),v;var o=m(a,e.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,v;var i=o.arg;return i?i.done?(r[e.resultName]=i.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,v):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function _(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function I(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(_,this),this.reset(!0)}function D(r){if(r||""===r){var n=r[u];if(n)return n.call(r);if("function"==typeof r.next)return r;if(!isNaN(r.length)){var a=-1,i=function e(){for(;++a<r.length;)if(o.call(r,a))return e.value=r[a],e.done=!1,e;return e.value=t,e.done=!0,e};return i.next=i}}throw new TypeError(e(r)+" is not iterable")}return x.prototype=E,i(A,"constructor",{value:E,configurable:!0}),i(E,"constructor",{value:x,configurable:!0}),x.displayName=f(E,l,"GeneratorFunction"),n.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===x||"GeneratorFunction"===(e.displayName||e.name))},n.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,E):(t.__proto__=E,f(t,l,"GeneratorFunction")),t.prototype=Object.create(A),t},n.awrap=function(t){return{__await:t}},C(T.prototype),f(T.prototype,s,(function(){return this})),n.AsyncIterator=T,n.async=function(t,e,r,a,o){void 0===o&&(o=Promise);var i=new T(p(t,e,r,a),o);return n.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},C(A),f(A,l,"Generator"),f(A,u,(function(){return this})),f(A,"toString",(function(){return"[object Generator]"})),n.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},n.values=D,I.prototype={constructor:I,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(k),!e)for(var r in this)"t"===r.charAt(0)&&o.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function n(n,a){return c.type="throw",c.arg=e,r.next=n,a&&(r.method="next",r.arg=t),!!a}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var u=o.call(i,"catchLoc"),s=o.call(i,"finallyLoc");if(u&&s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var a=n;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,v):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),k(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;k(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:D(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),v}},n}function n(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=a(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,c=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return c=t.done,t},e:function(t){u=!0,i=t},f:function(){try{c||null==r.return||r.return()}finally{if(u)throw i}}}}function a(t,e){if(t){if("string"==typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?o(t,e):void 0}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function i(t,e,r,n,a,o,i){try{var c=t[o](i),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,a)}function c(t){return function(){var e=this,r=arguments;return new Promise((function(n,a){var o=t.apply(e,r);function c(t){i(o,n,a,c,u,"next",t)}function u(t){i(o,n,a,c,u,"throw",t)}c(void 0)}))}}var u,s={};document.addEventListener("DOMContentLoaded",(function(){u=document.body.scrollHeight}));var l=function(){var t=c(r().mark((function t(){var e,i,c,u,s,l,f,p,m,d,h,y,g,v,b,x;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:window.scrollTo({top:document.body.scrollHeight,left:0,behavior:"smooth"}),e=document.querySelectorAll(".display-flex.flex-column.full-width.align-self-center"),i=[],u=n(e);try{for(u.s();!(s=u.n()).done;)l=s.value,f=l.querySelector(".display-flex.align-items-center.mr1.hoverable-link-text.t-bold"),p=f.querySelector("span.visually-hidden").textContent.trim(),m=0,(d=l.querySelector(".hoverable-link-text.display-flex.align-items-center.t-14.t-normal.t-black"))&&(h=d.textContent.trim(),(y=h.match(/\d+/))&&(g=y[0],m=g)),v={skillName:p,numOfEndorsement:m},i.push(v)}catch(t){u.e(t)}finally{u.f()}return i.sort((function(t,e){return e.numOfEndorsement-t.numOfEndorsement})),b=i.map((function(t){return t.skillName})),r=new Set(b),b=function(t){if(Array.isArray(t))return o(t)}(r)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(r)||a(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),x=b.slice(0,5),c=x.join(" | "),t.abrupt("return",c);case 12:case"end":return t.stop()}var r}),t)})));return function(){return t.apply(this,arguments)}}(),f=function(){var t=c(r().mark((function t(){var e,a,o,i,c,u,s;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:window.scrollTo({top:document.body.scrollHeight,left:0,behavior:"smooth"}),e=[],a=document.querySelector(".artdeco-card.ember-view.pb3"),o=a.querySelectorAll(".profile-creator-shared-feed-update__container"),i=n(o),t.prev=5,u=r().mark((function t(){var a,o,i,u,s,l,f,p;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a=c.value,!(o=a.querySelector(".update-components-header__text-wrapper"))){t.next=7;break}if(i=o.querySelector(".update-components-text-view.white-space-pre-wrap.break-words"),!(u=i.querySelector(".update-components-text-view__mention").nextSibling.textContent.trim())||!u.includes("reposted")){t.next=7;break}return t.abrupt("return",1);case 7:a.querySelector(".feed-shared-inline-show-more-text__see-more-less-toggle.see-more.t-14.t-black--light.t-normal.hoverable-link-text")&&(s=a.querySelector(".feed-shared-update-v2__commentary"))&&(l=function(t){if(t.nodeType===Node.TEXT_NODE)f.push(t.textContent.trim());else if(t.nodeType===Node.ELEMENT_NODE){var e,r=n(t.childNodes);try{for(r.s();!(e=r.n()).done;){var a=e.value;l(a)}}catch(t){r.e(t)}finally{r.f()}}},f=[],l(s),p=f.join(" "),e.push(p));case 10:case"end":return t.stop()}}),t)})),i.s();case 8:if((c=i.n()).done){t.next=14;break}return t.delegateYield(u(),"t0",10);case 10:if(!t.t0){t.next=12;break}return t.abrupt("break",14);case 12:t.next=8;break;case 14:t.next=19;break;case 16:t.prev=16,t.t1=t.catch(5),i.e(t.t1);case 19:return t.prev=19,i.f(),t.finish(19);case 22:return s=e.join(" | "),t.abrupt("return",s);case 24:case"end":return t.stop()}}),t,null,[[5,16,19,22]])})));return function(){return t.apply(this,arguments)}}(),p=function(){document.querySelectorAll("*").forEach((function(t,e){if("UL"===(a=t).tagName||"OL"===a.tagName||"MENU"===a.tagName||"DL"===a.tagName||("DIV"===a.tagName||"ARTICLE"===a.tagName||"SECTION"===a.tagName)&&function(t){var e,r=["list","list-type","data-list","data-list-type"],a=n(t.attributes);try{for(a.s();!(e=a.n()).done;){var o=e.value;if(r.includes(o.name)||o.value.includes("list"))return!0}}catch(t){a.e(t)}finally{a.f()}return!1}(a)){var r=document.createElement("button");r.name="list",r.setAttribute("list-selected",!1),r.style.border="1px solid #000",r.style.display="block",r.style.padding="0px",r.style.width="0px",r.style.height="0px",r.style.width="20px",r.style.height="20px",r.style.borderRadius="20px",r.style.zIndex="999",r.style.background="transparent",t.style.background="#F2EE9D",r.style.position="absolute",t.prepend(r),r.onclick=function(e){e.target.style.backgroundColor="#7895CB",localStorage.setItem("selectedList",JSON.stringify({classList:Array.from(t.classList),attributes:t.attributes}))},t.setAttribute("list-id",e)}var a}))},m=function(){var t=c(r().mark((function t(e,n){var a,o;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=document.querySelectorAll("div.msg-conversation-card__row.align-items-center.display-flex"),o={},a.forEach((function(t,e){var r=document.querySelectorAll("time.msg-overlay-list-bubble-item__time-stamp")[e].textContent.trim();isNaN(Date.parse(r))&&(r=new Date),/\d{4}/.test(r)||(r=r+" "+(new Date).getFullYear()),o[e]={name:document.querySelectorAll("h3.msg-conversation-listitem__participant-names.msg-conversation-card__participant-names")[e].textContent.trim(),time:r,img:document.querySelectorAll("div.msg-selectable-entity.msg-selectable-entity--3 img")[e].src,profile_index:e}})),localStorage.setItem("msgConnections",JSON.stringify({msgConnections:o})),t.abrupt("return",d(n));case 5:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}(),d=function(){var t=c(r().mark((function t(e){var n,a,o,i,c,u,s;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=JSON.parse(localStorage.getItem("msgConnections")).msgConnections,n=Object.values(n),a=new Date,(o=new Date(a)).setDate(a.getDate()-30),i=n.filter((function(t){return new Date(t.time)<o})),c=i.filter((function(t){return e.some((function(e){return t.name===e.name}))})),u=i.slice(0,15),c.length>0&&(c.length<15&&(c.concat(i),s=c.concat(i.filter((function(t){return!c.includes(t)}))),u=s.slice(0,15)),c.length>=15&&(u=c.slice(0,15))),localStorage.setItem("TotalfilterConnection",JSON.stringify({totalFilteredArray:i})),localStorage.setItem("matchConnection",JSON.stringify({matchConnection:c})),localStorage.setItem("filterConnection",JSON.stringify({filteredArray:u})),t.abrupt("return",u);case 13:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();function h(t){return new Promise((function(e){setTimeout(e,t)}))}var y=function t(e,a){var o,i=n(e);try{var u=function(){var e=o.value;if(e.nodeType!==Node.TEXT_NODE&&e.children.length>0){if("A"===e.tagName){e.style.textDecoration="underline",e.style.textDecorationStyle="double";var n=document.createElement("button"),i=document.createTextNode("i");n.appendChild(i),n.style.padding="10px",n.style.color="blue",n.style.height="20px",n.style.width="20px",n.style.display="flex",n.style.justifyContent="center",n.style.alignItems="center",n.style.border="1px solid #000",n.style.borderRadius="20px",n.style.margin="1px",n.className="info-url",n.setAttribute("data-url",e.href),e.prepend(n)}else"P"===e.tagName?e.style.border="1px solid red":"DIV"===e.tagName&&e.textContent?e.style.textDecoration="underline":"IMG"===e.tagName&&(e.style.border="1px solid #444");Array.from(e.children).forEach((function(t,r){var n="".concat(e.getAttribute("data-point"),",").concat(r);t.setAttribute("data-point",n)})),t(e.children,a)}else""!==e.textContent.trim()&&"BUTTON"!==e.parentElement.tagName&&"BUTTON"!==e.tagName&&(e.style.background="yellow",e.style.color="red");e.onclick=function(){var t=c(r().mark((function t(e){return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),e.stopPropagation(),e.target.style.color="black",s={dataPoint:e.target.getAttribute("data-point"),content:e.target.textContent.trim()},chrome.runtime.sendMessage({message:"mapped",mapContent:s}),t.abrupt("return",!1);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()};for(i.s();!(o=i.n()).done;)u()}catch(t){i.e(t)}finally{i.f()}},g=function(){var t=document.querySelector(".".concat(JSON.parse(localStorage.getItem("selectedList")).classList.join(".")));Array.from(t.children).forEach((function(t,e){t.setAttribute("data-point",e)}));var e=x(t.children);y(e||t.children,Number(t.getAttribute("list-id"))),function(){for(var t=document.querySelectorAll("*"),e=[],r=[],n=0;n<t.length;n++){var a=t[n];v(a)?e.push(a):b(a)&&r.push(a)}var o=[];e.forEach((function(t){t.style.textDecoration="underline",t.style.textDecorationStyle="double",t.style.backgroundColor="#F2EE9D";for(var e={},r=0;r<t.attributes.length;r++){var n=t.attributes[r],a=n.name,i=n.value;e[a]=i}o.push({parentElement:t.parentElement.className,textContent:t.textContent,tagName:t.tagName,attributes:e})})),localStorage.setItem("pageBtnDetails",JSON.stringify(o))}()};function v(t){var e;return!(("A"!==t.tagName&&"BUTTON"!==t.tagName&&"INPUT"!==t.tagName||!("next"===t.getAttribute("rel")||"prev"===t.getAttribute("rel")||t.getAttribute("data-page")||null!==(e=t.getAttribute("href"))&&void 0!==e&&e.includes("page=")||t.getAttribute("data-page-number")||t.textContent.toLowerCase().includes("next")||t.textContent.toLowerCase().includes("prev")))&&!/^\d+$/.test(t.textContent.trim()))}function b(t){return!("UL"!==t.tagName&&"OL"!==t.tagName&&"DIV"!==t.tagName&&"NAV"!==t.tagName||!(t.classList.contains("pagination")||t.classList.contains("pager")||t.classList.contains("pages")||t.getAttribute("data-pagination")||t.getAttribute("data-pager")))}var x=function(t){var e=Array.from(t,(function(t){return t.tagName})),r=e.reduce((function(t,e){return t[e]=(t[e]||0)+1,t}),{}),a=null,o=0;for(var i in r)r[i]>o&&(a=i,o=r[i]);var c,u=[],s=n(t);try{for(s.s();!(c=s.n()).done;){var l=c.value;l.tagName===a&&u.push(l)}}catch(t){s.e(t)}finally{s.f()}return u},E=function(){var t=c(r().mark((function t(){var e,a,o,i,c,u;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,h(1e3);case 2:e=document.querySelectorAll(".entity-result__title-text a > span"),a=[],o=n(e);try{for(o.s();!(i=o.n()).done;)c=i.value,u=c.querySelector("span").textContent.trim(),a.push(u)}catch(t){o.e(t)}finally{o.f()}return localStorage.setItem("extractedData",JSON.stringify(a)),t.abrupt("return",a);case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),S=function(){var t=c(r().mark((function t(e){return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:JSON.parse(localStorage.getItem("pageBtnDetails")).forEach((function(t){var r=t.textContent,n=t.parentElement;r.trim()==e.pageNumber&&w(n,e.pageNumber)}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),w=function(t,e){Array.from(document.getElementsByClassName(t)).forEach((function(t){var r,a=n(t.children);try{for(a.s();!(r=a.n()).done;){var o=r.value;o.textContent.trim()==e&&o.click()}}catch(t){a.e(t)}finally{a.f()}}))},N=function(){var t=c(r().mark((function t(){return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:window.scrollTo({top:u,left:0,behavior:"smooth"});case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),A=function(){var t=c(r().mark((function t(){var e;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=document.querySelectorAll(".artdeco-pagination__indicator").length,t.abrupt("return",[1,e]);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),C=function(){var t=document.getElementsByClassName("block mlA mrA artdeco-button artdeco-button--muted artdeco-button--1 artdeco-button--tertiary ember-view");if(t.length>0){var e=t[0].getBoundingClientRect();if(e.top>=0&&e.left>=0&&e.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&e.right<=(window.innerWidth||document.documentElement.clientWidth))return!0}return!1},T=function(){var t=c(r().mark((function t(){var e,n,a;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(e=document.getElementsByClassName("msg-conversations-container__conversations-list")[0])){t.next=22;break}case 2:if(n=C(),a=e.scrollTop>=e.scrollHeight-e.clientHeight,n||a){t.next=9;break}e.scrollTo({top:e.scrollHeight,behavior:"smooth"}),t.next=18;break;case 9:if(!(n&&a||n&&!a)){t.next=18;break}return t.next=12,O();case 12:if(t.sent){t.next=17;break}return t.abrupt("return",!0);case 17:return t.abrupt("return",!1);case 18:return t.next=20,h(1500);case 20:t.next=2;break;case 22:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),O=function(){var t=c(r().mark((function t(){return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return document.getElementsByClassName("block mlA mrA artdeco-button artdeco-button--muted artdeco-button--1 artdeco-button--tertiary ember-view")[0].click(),t.next=4,h(1e3);case 4:return t.abrupt("return",T());case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),L=function(){var t=c(r().mark((function t(){var e,n;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=document.querySelectorAll("div.msg-conversation-card__row.msg-conversation-card__title-row"),n={},e.forEach((function(t,e){var r=t.querySelector("time.msg-conversation-listitem__time-stamp").textContent.trim(),a=t.querySelector("h3.msg-conversation-listitem__participant-names.msg-conversation-card__participant-names").textContent.trim(),o=document.querySelectorAll("div.msg-selectable-entity--4")[e].querySelector("div > img")?document.querySelectorAll("div.msg-selectable-entity--4")[e].querySelector("div > img").currentSrc:"";isNaN(Date.parse(r))&&(r=new Date),/\d{4}/.test(r)||(r=r+" "+(new Date).getFullYear()),n[e]={name:a,time:r,img:o,profile_index:e}})),localStorage.setItem("msgConnections",JSON.stringify({msgConnections:n})),t.abrupt("return",n);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();chrome.runtime.onMessage.addListener(function(){var e=c(r().mark((function e(n,a,o){var i,c,u,s,d,y,v;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=n.message,e.next=e.t0===t.OPEN_PROFILE?3:e.t0===t.SCRAPE_DETAILS?6:e.t0===t.GET_FROM_LS?11:e.t0===t.SCRAPE_SKILLS?14:e.t0===t.SCRAPE_POST?19:e.t0===t.CURRENTPAGEMAPPING?24:e.t0===t.FETCHALLLIST?27:e.t0===t.NAVIGATE?29:e.t0===t.SCROLL?33:e.t0===t.MAPDATA?36:e.t0===t.EXTRACTFROMUSERPAGE?40:e.t0===t.FETCHFROMLS?43:e.t0===t.EXTRACTPAGENUMBER?46:e.t0===t.SCROLLMSGCONNECTION?51:e.t0===t.LOADMOREMSGCONNECTION?56:e.t0===t.EXTRACTMSGCONNECTION?59:62;break;case 3:return r=n.url,window.location=r,o({status:t.OK}),e.abrupt("return",!0);case 6:return e.next=8,m(n.url,n.csvData);case 8:return i=e.sent,o(i),e.abrupt("break",63);case 11:return c=JSON.parse(localStorage.getItem(t.PROFILE_DETAILS)),o(c),e.abrupt("break",63);case 14:return e.next=16,l();case 16:return u=e.sent,o(u),e.abrupt("break",63);case 19:return e.next=21,f();case 21:return s=e.sent,o(s),e.abrupt("break",63);case 24:return e.next=26,E(n);case 26:case 42:case 62:return e.abrupt("break",63);case 27:return p(),e.abrupt("break",63);case 29:return e.next=31,h(1e3);case 31:return S(n),e.abrupt("break",63);case 33:return N(),o({status:"OK"}),e.abrupt("return",!0);case 36:return e.next=38,h(1e3);case 38:return g(),e.abrupt("break",63);case 40:return e.next=42,E(n);case 43:return d=JSON.parse(localStorage.getItem("extractedData")),o({pageNumber:n.pageNumber,data:d}),e.abrupt("break",63);case 46:return e.next=48,A(n);case 48:return y=e.sent,o({pageData:y}),e.abrupt("break",63);case 51:return e.next=53,T(n);case 53:return e.sent,o({status:"OK"}),e.abrupt("return",!0);case 56:return O(n),o({status:"OK"}),e.abrupt("return",!0);case 59:return v=L(n),o({data:v}),e.abrupt("return",!0);case 63:return e.abrupt("return",!0);case 64:case"end":return e.stop()}var r}),e)})));return function(t,r,n){return e.apply(this,arguments)}}())})();