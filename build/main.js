!function(t,e,n){function i(e){"use strict";var n;e instanceof h?n=[e]:"string"==typeof e?(e=e.trim(),n="<"===e.substr(0,1)?s.fromHTML(e):s.elements(t.querySelectorAll(e))):n="object"==typeof e?s.elements(e):[],s.each(n,function(t,e){this[e]=t}.bind(this)),this.length=n.length}function r(e){"use strict";if("string"==typeof e){var n=e.substr(0,1),r=e.substr(1);if("#"===n&&a.test(r))return new i(t.getElementById(r));if("."===n&&a.test(r))return new i(t.getElementsByClassName(r));if(a.test(r))return new i(t.getElementsByTagName(r))}else if(e instanceof i)return e;return new i(e)}var s,o=HTMLElement,c=HTMLDocument,u=HTMLInputElement,h=Node,a=/^[A-Za-z]*$/,f=document.createElement("div"),l=[];i.prototype.ready=function(t){"use strict";return this.on("DOMContentLoaded",t),this},i.prototype.click=function(t){"use strict";return this.on("click",t),this},i.prototype.submit=function(t){"use strict";return this.on("submit",t),this},i.prototype.on=function(t,e,n){"use strict";var i;if(i=3===arguments.length?function(t){var i=s(t.target);(s.validate(e,i)||s(i).hasParent(e))&&n.apply(t.target,arguments)}:e,-1!==t.indexOf(".")){var r=t;t=t.split(".")[0],this.each(function(e){l.push({node:e,event:i,name:r}),e.addEventListener(t,i,!0)})}else this.each(function(e){e.addEventListener(t,i,!0)});return i},i.prototype.off=function(t,e){"use strict";if(e||-1===t.indexOf("."))this.each(function(n){n.removeEventListener(t,e,!0)});else{var n=t;t=t.split(".")[0],this.each(function(e){s.each(l,function(i){return i.name===n&&i.node===e?(e.removeEventListener(t,i.event,!0),l.splice(l.indexOf(i),1),!1):void 0})})}return this},i.prototype.trigger=function(e,n){"use strict";var i;"undefined"==typeof n?(i=t.createEvent("HTMLEvents"),i.initEvent(e,!0,!1)):(i=t.createEvent("CustomEvent"),i.initCustomEvent(e,!0,!0,n)),this.each(function(t){t.dispatchEvent(i)})},i.prototype.children=function(t){"use strict";if(!this.length)return this;if("undefined"==typeof t)return s(this[0].childNodes);var e=[];return s.each(this[0].childNodes,function(n){s.validate(t,n)&&e.push(n)}),s(e)},i.prototype.child=function(t){"use strict";return this.length?s(this[0].childNodes[t||0]):this},i.prototype.eq=function(t){"use strict";if(!this.length)return this;if(t>=this.length)s.empty(this);else{var e=this[t];s.empty(this),this.length=1,this[t]=e}return this},i.prototype.find=function(t){"use strict";return this.length?s(this[0].querySelectorAll(t)):this},i.prototype.parent=function(){"use strict";return!this.length||this[0]instanceof c?this:s(this[0].parentNode)},i.prototype.next=function(){"use strict";return!this.length||this[0]instanceof c?this:s(this[0].nextElementSibling)},i.prototype.prev=function(){"use strict";return!this.length||this[0]instanceof c?this:s(this[0].previousElementSibling)},i.prototype.closest=function(t){"use strict";if(this.length){if(!t||!t.length)return s(this[0].parentNode);for(var e=this[0];(e=e.parentNode)&&!(e instanceof c);)if(s.validate(t,e))return s(e)}return s()},i.prototype.parents=function(t){"use strict";if(!this.length)return s();for(var e=!t||!t.length,n=this[0],i=[];(n=n.parentNode)&&!(n instanceof c);)(e||s.validate(t,n))&&i.push(n);return s(i)},i.prototype.parentsUntil=function(t){"use strict";if(this.length){if(!t||!t.length)return s(this[0].parentNode);for(var e=this[0],n=[];(e=e.parentNode)&&!(e instanceof c);)if(n.push(e),s.validate(t,e))return s(n)}return s()},i.prototype.first=function(){"use strict";return this.length?s(this[0]):this},i.prototype.last=function(){"use strict";return this.length?s(this[this.length-1]):this},i.prototype.each=function(t){"use strict";return s.each(this,t),this},i.prototype.eachElement=function(t){"use strict";s.each(this,function(e){return e instanceof o?t.apply(this,arguments):void 0})},i.prototype.addClass=function(t){"use strict";return 0!==this.length&&this.eachElement(function(e){e.classList.add(t)}),this},i.prototype.removeClass=function(t){"use strict";return 0!==this.length&&this.eachElement(function(e){e.classList.remove(t)}),this},i.prototype.toggleClass=function(t){"use strict";return this.length&&this.eachElement(function(e){e.classList.toggle(t)}),this},i.prototype.clone=function(){"use strict";return this.length?s(this[0].cloneNode(!0)):this},i.prototype.remove=function(){"use strict";!this.length||this[0]instanceof c||(this.each(function(t){t.parentNode.removeChild(t)}),s.empty(this))},i.prototype.prepend=function(t){"use strict";if(this.length){var e=this[0];s.each(s.elements(t).reverse(),function(t){e.insertBefore(t,e.firstChild)})}return this},i.prototype.append=function(t){"use strict";if(t.length&&this.length){var e=this[0];s.each(s.elements(t).reverse(),function(t){e.appendChild(t)})}return this},i.prototype.appendTo=function(t){"use strict";return this.length&&s.each(s.elements(t),function(t){s.each(s.elements(this).reverse(),function(e){t.appendChild(e)})}.bind(this)),this},i.prototype.prependTo=function(t){"use strict";return this.length&&s.each(s.elements(t),function(t){s.each(s.elements(this).reverse(),function(e){t.insertBefore(e,t.firstChild)})}.bind(this)),this},i.prototype.insertBefore=function(t){"use strict";var e=s.elements(t);return!e.length||!this.length||e[0]instanceof c||s.each(s.elements(this).reverse(),function(t){e[0].parentNode.insertBefore(t,e[0])}),this},i.prototype.insertAfter=function(t){"use strict";var e=s.elements(t);return!e.length||!this.length||e[0]instanceof c||s.each(s.elements(this).reverse(),function(t){e[0].parentNode.insertBefore(t,e[0].nextSibling)}),this},i.prototype.replaceWith=function(t){"use strict";if(!this.length)return this;var e=s.elements(t);return e.length>0&&this[0].parentNode.replaceChild(e[0],this[0]),this},i.prototype.focus=function(){"use strict";return this.eachElement(function(t){return t.focus()&&!1}),this},i.prototype.contains=function(t){"use strict";var e=s.elements(t);return this.length&&t.length&&this[0]!==e[0]&&this[0].contains(e[0])},i.prototype.empty=function(){"use strict";this.length&&this.each(function(t){t.textContent=""})},i.prototype.hasClass=function(t){"use strict";return this.length&&this[0].classList.contains(t)},i.prototype.hasParent=function(t){"use strict";return this.length&&this.closest(t).length>0},i.prototype.attr=function(t,e){"use strict";if(this.length)return 1===arguments.length?this[0].getAttribute(t):(this.eachElement(function(n){n.setAttribute(t,e)}),this)},i.prototype.removeAttr=function(t){"use strict";return this.length&&this.eachElement(function(e){e.removeAttribute(t)}),this},i.prototype.html=function(t){"use strict";if(0!==this.length){if(0===arguments.length){var e;return this.eachElement(function(t){return e=t.innerHTML,!1}),e}return this.eachElement(function(e){e.innerHTML=t}),this}},i.prototype.text=function(t){"use strict";if(this.length)return 0===arguments.length?this[0].textContent:(this.each(function(e){e.textContent=t}),this)},i.prototype.val=function(t){"use strict";if(this.length){if(0===arguments.length){var e;return this.eachElement(function(t){return t instanceof u||"TEXTAREA"===t.tagName?(e=t.value,!1):void 0}),e}return this.eachElement(function(e){e instanceof u&&(e.value=t)}),this}},i.prototype.serializeAssoc=function(){"use strict";if(0===this.length)return{};var t=/\r?\n/g,e={};return s.each(this[0].elements,function(n){if(n.name){if(("checkbox"===n.type||"radio"===n.type)&&!n.checked)return;e[n.name]=n.value.replace(t,"\n")}}),e},i.prototype.serialize=function(){"use strict";return 0===this.length?"":s.serialize(this.serializeAssoc())},r.serialize=function(t){"use strict";var e=[],n=/%20/g;return s.each(t,function(t,i){e.push((i+"="+t).replace(n,"+"))}),e.join("&")},r.empty=function(t){"use strict";var e;if("undefined"!=typeof t.length){for(e=0;e<t.length;++e)delete t[e];t.length=0}else if(t instanceof Array)t=[];else for(e in t)t.hasOwnProperty(e)&&delete t[e]},r.each=function(t,e){"use strict";var n;if(t)try{if(t instanceof Array||t instanceof NodeList)Array.prototype.forEach.call(t,function(t,n,i){if(e.call(t,t,n,i)===!1)throw null});else if("undefined"!=typeof t.length)for(n=0;n<t.length&&e.call(t[n],t[n],n,t)!==!1;++n);else for(n in t)if(t.hasOwnProperty(n)&&e.call(t[n],t[n],n,t)===!1)break}catch(i){}},r.elements=function(t,n){"use strict";var r=[];return t instanceof Array||t instanceof NodeList||t instanceof i||t instanceof e.jQuery?s.each(t,function(t){t instanceof Node&&r.push(t)}):t instanceof Node?r.push(t):"string"==typeof t&&(n&&(t=t.trim()),"<"===t.substr(0,1)&&(r=s.fromHTML(t))),r},r.validate=function(t,e){"use strict";return(e instanceof o||e instanceof c)&&(e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.oMatchesSelector).call(e,t)},r.rand=function(){"use strict";return(Math.random()+1).toString(36).substring(7)},r.extend=function(t){"use strict";return t=t||{},s.each(Array.prototype.slice.call(arguments,1),function(e){s.each(e,function(e,n){"object"==typeof e&&null!==e?(t[n]=t[n]||{},s.extend(t[n],e)):t[n]=e})}),t},r.fromHTML=function(t){"use strict";var e=[];return f.innerHTML=t,s.each(f.childNodes,function(t){e.push(t.cloneNode(!0))}),f.innerHTML="",e},r.noConflict=function(){"use strict";return e.$=n,i},r.ajax=function(t){"use strict";return new Promise(function(e,n){t=s.extend({},s.ajaxDefaults,t),t.data=t.data instanceof FormData?t.data:s.serialize(t.data);var i=new XMLHttpRequest;return i.open(t.type,t.url,!0),t.beforeSend(i,t)===!1?n():(t.withCredentials&&(i.withCredentials=!0),t.contentType&&i.setRequestHeader("Content-Type",t.contentType),i.onload=function(){i.status>=200&&i.status<400?"JSON"===t.dataType.toUpperCase()?e(JSON.parse(i.responseText),i):e(i.responseText,i):n(i)},i.onerror=function(){n(i)},void i.send(t.data))})},r.get=function(t,e){"use strict";return e=e||{},t&&(e.url=t),s.ajax(e)},r.getJSON=function(t,e){"use strict";var n={};return e&&(n.data=data),t&&(n.url=t),n.dataType="JSON",s.ajax(n)},r.post=function(t,e){"use strict";var n={};return e&&(n.data=data),t&&(n.url=t),n.type="POST",s.ajax(n)},r.postJSON=function(t,e){"use strict";var n={};return e&&(n.data=data),t&&(n.url=t),n.type="POST",n.dataType="JSON",s.ajax(n)},r.fn=i.prototype,r.ajaxDefaults={type:"GET",contentType:"application/x-www-form-urlencoded",url:e.location.href,data:{},dataType:"text",beforeSend:function(){},withCredentials:!1},s=e.$=e.dQuery=r}(document,window,window.$);