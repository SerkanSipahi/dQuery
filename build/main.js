!function(t,e,n){function i(t){"use strict";this.elements="undefined"==typeof t?[]:t instanceof Node?[t]:t instanceof NodeList?t:r.elements(t),this.length=this.elements.length}function s(e){"use strict";if("string"==typeof e){var n=e.substr(0,1),s=e.substr(1);if("#"===n&&u.test(s))return new i(t.getElementById(s));if("."===n&&u.test(s))return new i(t.getElementsByClassName(s));if(u.test(s))return new i(t.getElementsByTagName(s))}else if(e instanceof i)return e;return new i(e)}var r,o=HTMLElement,h=HTMLDocument,c=HTMLInputElement,u=(Node,/^[A-Za-z]*$/),l=document.createElement("div"),a=[];i.prototype.ready=function(t){"use strict";return this.on("DOMContentLoaded",t),this},i.prototype.click=function(t){"use strict";return this.on("click",t),this},i.prototype.submit=function(t){"use strict";return this.on("submit",t),this},i.prototype.on=function(t,e,n){"use strict";var i;if(i=3===arguments.length?function(t){(r.validate(e,t.target)||r(t.target).hasParent(e))&&n.apply(t.target,arguments)}:e,-1!==t.indexOf(".")){var s=t;t=t.split(".")[0],this.each(function(e){a.push({node:e,event:i,name:s}),e.addEventListener(t,i,!0)})}else this.each(function(e){e.addEventListener(t,i,!0)});return i},i.prototype.off=function(t,e){"use strict";if(e||-1===t.indexOf("."))this.each(function(n){n.removeEventListener(t,e,!0)});else{var n=t;t=t.split(".")[0],this.each(function(e){r.each(a,function(i){return i.name===n&&i.node===e?(e.removeEventListener(t,i.event,!0),a.splice(a.indexOf(i),1),!1):void 0})})}return this},i.prototype.trigger=function(e,n){"use strict";var i;"undefined"==typeof n?(i=t.createEvent("HTMLEvents"),i.initEvent(e,!0,!1)):(i=t.createEvent("CustomEvent"),i.initCustomEvent(e,!0,!0,n)),this.each(function(t){t.dispatchEvent(i)})},i.prototype.children=function(t){"use strict";if(!this.length)return this;if("undefined"==typeof t)return r(this.elements[0].childNodes);var e=[];return r.each(this.elements[0].childNodes,function(n){r.validate(t,n)&&e.push(n)}),r(e)},i.prototype.child=function(t){"use strict";return this.length?r(this.elements[0].childNodes[t||0]):this},i.prototype.eq=function(t){"use strict";return this.length?(t>=this.length?(this.elements=[],this.length=0):(this.elements=this.elements[t],this.length=1),this):this},i.prototype.find=function(t){"use strict";return this.length?r(this.elements[0].querySelectorAll(t)):this},i.prototype.parent=function(){"use strict";return!this.length||this.elements[0]instanceof h?this:r(this.elements[0].parentNode)},i.prototype.next=function(){"use strict";return!this.length||this.elements[0]instanceof h?this:r(this.elements[0].nextElementSibling)},i.prototype.prev=function(){"use strict";return!this.length||this.elements[0]instanceof h?this:r(this.elements[0].previousElementSibling)},i.prototype.closest=function(t){"use strict";if(this.length){if(!t||!t.length)return r(this.elements[0].parentNode);for(var e=this.elements[0];(e=e.parentNode)&&!(e instanceof h);)if(r.validate(t,e))return r(e)}return r()},i.prototype.parents=function(t){"use strict";if(!this.length)return r();for(var e=!t||!t.length,n=this.elements[0],i=[];(n=n.parentNode)&&!(n instanceof h);)(e||r.validate(t,n))&&i.push(n);return r(i)},i.prototype.parentsUntil=function(t){"use strict";if(this.length){if(!t||!t.length)return r(this.elements[0].parentNode);for(var e=this.elements[0],n=[];(e=e.parentNode)&&!(e instanceof h);)if(n.push(e),r.validate(t,e))return r(n)}return r()},i.prototype.first=function(){"use strict";return this.length?r(this.elements[0]):this},i.prototype.last=function(){"use strict";return this.length?r(this[this.length-1]):this},i.prototype.each=function(t){"use strict";return r.each(this,t),this},i.prototype.eachElement=function(t){"use strict";r.each(this,function(e){return e instanceof o?t.apply(this,arguments):void 0})},i.prototype.addClass=function(t){"use strict";return 0!==this.length&&this.eachElement(function(e){e.classList.add(t)}),this},i.prototype.removeClass=function(t){"use strict";return 0!==this.length&&this.eachElement(function(e){e.classList.remove(t)}),this},i.prototype.toggleClass=function(t){"use strict";return this.length&&this.eachElement(function(e){e.classList.toggle(t)}),this},i.prototype.clone=function(){"use strict";return this.length?r(this.elements[0].cloneNode(!0)):this},i.prototype.remove=function(){"use strict";!this.length||this.elements[0]instanceof h||(this.each(function(t){t.parentNode.removeChild(t)}),this.elements=[],this.length=0)},i.prototype.prepend=function(t){"use strict";if(this.length){var e=this.elements[0];r.each(r.elements(t).reverse(),function(t){e.insertBefore(t,e.firstChild)})}return this},i.prototype.append=function(t){"use strict";if(t.length&&this.length){var e=this.elements[0];r.each(r.elements(t).reverse(),function(t){e.appendChild(t)})}return this},i.prototype.appendTo=function(t){"use strict";return this.length&&r.each(r.elements(t),function(t){r.each(this.elements.reverse(),function(e){t.appendChild(e)})}.bind(this)),this},i.prototype.prependTo=function(t){"use strict";return this.length&&r.each(r.elements(t),function(t){r.each(this.elements.reverse(),function(e){t.insertBefore(e,t.firstChild)})}.bind(this)),this},i.prototype.insertBefore=function(t){"use strict";var e=r.elements(t);return!e.length||!this.length||e[0]instanceof h||r.each(this.elements.reverse(),function(t){e[0].parentNode.insertBefore(t,e[0])}),this},i.prototype.insertAfter=function(t){"use strict";var e=r.elements(t);return!e.length||!this.length||e[0]instanceof h||r.each(this.elements.reverse(),function(t){e[0].parentNode.insertBefore(t,e[0].nextSibling)}),this},i.prototype.replaceWith=function(t){"use strict";if(!this.length)return this;var e=r.elements(t);return e.length>0&&this.elements[0].parentNode.replaceChild(e[0],this.elements[0]),this},i.prototype.focus=function(){"use strict";return this.eachElement(function(t){return t.focus()&&!1}),this},i.prototype.contains=function(t){"use strict";var e=r.elements(t);return this.length&&t.length&&this.elements[0]!==e[0]&&this.elements[0].contains(e[0])},i.prototype.empty=function(){"use strict";this.length&&this.each(function(t){t.textContent=""})},i.prototype.hasClass=function(t){"use strict";return this.length&&this.elements[0].classList.contains(t)},i.prototype.hasParent=function(t){"use strict";return this.length&&this.closest(t).length>0},i.prototype.attr=function(t,e){"use strict";if(this.length)return 1===arguments.length?this.elements[0].getAttribute(t):(this.eachElement(function(n){n.setAttribute(t,e)}),this)},i.prototype.removeAttr=function(t){"use strict";return this.length&&this.eachElement(function(e){e.removeAttribute(t)}),this},i.prototype.html=function(t){"use strict";if(0!==this.length){if(0===arguments.length){var e;return this.eachElement(function(t){return e=t.innerHTML,!1}),e}return this.eachElement(function(e){e.innerHTML=t}),this}},i.prototype.text=function(t){"use strict";if(this.length)return 0===arguments.length?this.elements[0].textContent:(this.each(function(e){e.textContent=t}),this)},i.prototype.val=function(t){"use strict";if(this.length){if(0===arguments.length){var e;return this.eachElement(function(t){return t instanceof c||"TEXTAREA"===t.tagName?(e=t.value,!1):void 0}),e}return this.eachElement(function(e){(e instanceof c||"TEXTAREA"===e.tagName)&&(e.value=t)}),this}},i.prototype.serializeAssoc=function(){"use strict";if(0===this.length)return{};var t=/\r?\n/g,e={};return r.each(this.elements[0].elements,function(n){if(n.name){if(("checkbox"===n.type||"radio"===n.type)&&!n.checked)return;e[n.name]=n.value.replace(t,"\n")}}),e},i.prototype.serialize=function(){"use strict";return 0===this.length?"":r.serialize(this.serializeAssoc())},s.serialize=function(t){"use strict";var e=[],n=/%20/g;return r.each(t,function(t,i){e.push((i+"="+t).replace(n,"+"))}),e.join("&")},s.each=function(t,e){"use strict";var n;if(t)try{if("undefined"!=typeof t.length)Array.prototype.forEach.call(t,function(t,n,i){if(e.call(t,t,n,i)===!1)throw null});else for(n in t)if(t.hasOwnProperty(n)&&e.call(t[n],t[n],n,t)===!1)break}catch(i){}},s.elements=function(t,e){"use strict";var n=[];if(null===t)return n;if("string"==typeof t)e&&(t=t.trim()),"<"===t.substr(0,1)&&(n=r.fromHTML(t));else if("object"==typeof t){if("dQuery"===t.constructor.name)return t.elements;"undefined"!=typeof t.length?Array.prototype.forEach.call(t,function(t){"Node"===t.constructor.name&&n.push(t)}):t instanceof Node&&n.push(t)}return n},s.validate=function(t,e){"use strict";return(e instanceof o||e instanceof h)&&(e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.oMatchesSelector).call(e,t)},s.extend=function(t){"use strict";return t=t||{},r.each(Array.prototype.slice.call(arguments,1),function(e){r.each(e,function(e,n){"object"==typeof e&&null!==e?(t[n]=t[n]||{},r.extend(t[n],e)):t[n]=e})}),t},s.fromHTML=function(t){"use strict";var e=[];return l.innerHTML=t,r.each(l.childNodes,function(t){e.push(t.cloneNode(!0))}),l.innerHTML="",e},s.noConflict=function(){"use strict";return e.$=n,i},s.fn=i.prototype,r=e.$=e.dQuery=s,r.each(Object.getOwnPropertyNames(Array.prototype),function(t){"length"!==t&&(NodeList.prototype[t]=Array.prototype[t])})}(document,window,window.$);