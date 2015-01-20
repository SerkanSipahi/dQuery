!function(t,e,n){function s(e){"use strict";var n=[];e instanceof u?n.push(e):"string"==typeof e?(e=e.trim(),n="<"===e.substr(0,1)?r.fromHTML(e):r.elements(t.querySelectorAll(e))):"object"==typeof e&&(n=r.elements(e)),this.elements=n,this.length=n.length}function i(e){"use strict";if("string"==typeof e){var n=e.substr(0,1),i=e.substr(1);if("#"===n&&l.test(i))return new s(t.getElementById(i));if("."===n&&l.test(i))return new s(t.getElementsByClassName(i));if(l.test(i))return new s(t.getElementsByTagName(i))}return new s(e)}var r,o=HTMLElement,h=HTMLDocument,c=HTMLInputElement,u=Node,l=/^[A-Za-z]*$/,a=document.createElement("div"),f=[];s.prototype.ready=function(t){"use strict";return this.on("DOMContentLoaded",t),this},s.prototype.click=function(t){"use strict";return this.on("click",t),this},s.prototype.submit=function(t){"use strict";return this.on("submit",t),this},s.prototype.on=function(t,e,n){"use strict";var s;if(s=3===arguments.length?function(t){var s=r(t.target);(r.validate(e,s)||r(s).hasParent(e))&&n.apply(t.target,arguments)}:e,-1!==t.indexOf(".")){var i=t;t=t.split(".")[0],this.each(function(e){f.push({node:e,event:s,name:i}),e.addEventListener(t,s,!0)})}else this.each(function(e){e.addEventListener(t,s,!0)});return s},s.prototype.off=function(t,e){"use strict";if(e||-1===t.indexOf("."))this.each(function(n){n.removeEventListener(t,e,!0)});else{var n=t;t=t.split(".")[0],this.each(function(e){r.each(f,function(s){return s.name===n&&s.node===e?(e.removeEventListener(t,s.event,!0),f.splice(f.indexOf(s),1),!1):void 0})})}return this},s.prototype.trigger=function(e,n){"use strict";var s;"undefined"==typeof n?(s=t.createEvent("HTMLEvents"),s.initEvent(e,!0,!1)):(s=t.createEvent("CustomEvent"),s.initCustomEvent(e,!0,!0,n)),this.each(function(t){t.dispatchEvent(s)})},s.prototype.children=function(t){"use strict";if(!this.length)return this;if("undefined"==typeof t)return r(this.elements[0].childNodes);var e=[];return r.each(this.elements[0].childNodes,function(n){r.validate(t,n)&&e.push(n)}),r(e)},s.prototype.child=function(t){"use strict";return this.length?r(this.elements[0].childNodes[t||0]):this},s.prototype.eq=function(t){"use strict";return this.length?(this.elements=this.elements[t]?[this.elements[t]]:[],this.length=this.elements.length,this):this},s.prototype.find=function(t){"use strict";return this.length?r(this.elements[0].querySelectorAll(t)):this},s.prototype.parent=function(){"use strict";return!this.length||this.elements[0]instanceof h?this:r(this.elements[0].parentNode)},s.prototype.next=function(){"use strict";return!this.length||this.elements[0]instanceof h?this:r(this.elements[0].nextElementSibling)},s.prototype.prev=function(){"use strict";return!this.length||this.elements[0]instanceof h?this:r(this.elements[0].previousElementSibling)},s.prototype.closest=function(t){"use strict";if(this.length){if(!t||!t.length)return r(this.elements[0].parentNode);for(var e=this.elements[0];(e=e.parentNode)&&!(e instanceof h);)if(r.validate(t,e))return r(e)}return r()},s.prototype.parents=function(t){"use strict";if(!this.length)return r();for(var e=!t||!t.length,n=this.elements[0],s=[];(n=n.parentNode)&&!(n instanceof h);)(e||r.validate(t,n))&&s.push(n);return r(s)},s.prototype.parentsUntil=function(t){"use strict";if(this.length){if(!t||!t.length)return r(this.elements[0].parentNode);for(var e=this.elements[0],n=[];(e=e.parentNode)&&!(e instanceof h);)if(n.push(e),r.validate(t,e))return r(n)}return r()},s.prototype.first=function(){"use strict";return this.length?r(this.elements[0]):this},s.prototype.last=function(){"use strict";return this.length?r(this.elements[this.length-1]):this},s.prototype.each=function(t){"use strict";return r.each(this.elements,t),this},s.prototype.eachElement=function(t){"use strict";r.each(this.elements,function(e){return e instanceof o?t.apply(this,arguments):void 0})},s.prototype.addClass=function(t){"use strict";return 0!==this.length&&this.eachElement(function(e){e.classList.add(t)}),this},s.prototype.removeClass=function(t){"use strict";return 0!==this.length&&this.eachElement(function(e){e.classList.remove(t)}),this},s.prototype.toggleClass=function(t){"use strict";return this.length&&this.eachElement(function(e){e.classList.toggle(t)}),this},s.prototype.clone=function(){"use strict";return this.length?r(this.elements[0].cloneNode(!0)):this},s.prototype.remove=function(){"use strict";!this.length||this.elements[0]instanceof h||(this.each(function(t){t.parentNode.removeChild(t)}),this.elements=[],this.length=0)},s.prototype.prepend=function(t){"use strict";if(this.length){var e=this.elements[0];r.each(r.elements(t).reverse(),function(t){e.insertBefore(t,e.firstChild)})}return this},s.prototype.append=function(t){"use strict";if(t.length&&this.length){var e=this.elements[0];r.each(r.elements(t).reverse(),function(t){e.appendChild(t)})}return this},s.prototype.appendTo=function(t){"use strict";return this.length&&r.each(r.elements(t),function(t){r.each(this.elements.reverse(),function(e){t.appendChild(e)})}.bind(this)),this},s.prototype.prependTo=function(t){"use strict";return this.length&&r.each(r.elements(t),function(t){r.each(this.elements.reverse(),function(e){t.insertBefore(e,t.firstChild)})}.bind(this)),this},s.prototype.insertBefore=function(t){"use strict";var e=r.elements(t);return e.length&&this.length&&!e[0]instanceof h&&r.each(this.elements.reverse(),function(t){e[0].parentNode.insertBefore(t,e[0])}),this},s.prototype.insertAfter=function(t){"use strict";var e=r.elements(t);return e.length&&this.length&&!e[0]instanceof h&&r.each(this.elements.reverse(),function(t){e[0].parentNode.insertBefore(t,e[0].nextSibling)}),this},s.prototype.replaceWith=function(t){"use strict";if(!this.length)return this;var e=r.elements(t);return e.length>0&&this.elements[0].parentNode.replaceChild(e[0],this.elements[0]),this},s.prototype.focus=function(){"use strict";return this.eachElement(function(t){return t.focus()&&!1}),this},s.prototype.contains=function(t){"use strict";var e=r.elements(t);return this.length&&t.length&&this.elements[0]!==e[0]&&this.elements[0].contains(e[0])},s.prototype.empty=function(){"use strict";this.length&&this.each(function(t){t.textContent=""})},s.prototype.hasClass=function(t){"use strict";return this.length&&this.elements[0].classList.contains(t)},s.prototype.hasParent=function(t){"use strict";return this.length&&this.closest(t).length>0},s.prototype.attr=function(t,e){"use strict";if(this.length)return 1===arguments.length?this.elements[0].getAttribute(t):(this.eachElement(function(n){n.setAttribute(t,e)}),this)},s.prototype.removeAttr=function(t){"use strict";return this.length&&this.eachElement(function(e){e.removeAttribute(t)}),this},s.prototype.html=function(t){"use strict";if(0!==this.length){if(0===arguments.length){var e;return this.eachElement(function(t){return e=t.innerHTML,!1}),e}return this.eachElement(function(e){e.innerHTML=t}),this}},s.prototype.text=function(t){"use strict";if(this.length)return 0===arguments.length?this.elements[0].textContent:(this.each(function(e){e.textContent=t}),this)},s.prototype.val=function(t){"use strict";if(this.length){if(0===arguments.length){var e;return this.eachElement(function(t){return t instanceof c?(e=t.value,!1):void 0}),e}return this.eachElement(function(e){e instanceof c&&(e.value=t)}),this}},s.prototype.serializeAssoc=function(){"use strict";if(0===this.length)return{};var t=/\r?\n/g,e={};return r.each(this.elements[0].elements,function(){if(this.name){if(("checkbox"===this.type||"radio"===this.type)&&!this.checked)return;e[this.name]=this.value.replace(t,"\n")}}),e},s.prototype.serialize=function(t){"use strict";if(0===this.length)return"";var e=[],n=/%20/g;return r.each(t||this.serializeAssoc(),function(t,s){e.push((s+"="+t).replace(n,"+"))}),e.join("&")},i.each=function(t,e){"use strict";var n;if(t)try{if(t instanceof Array||t instanceof NodeList)Array.prototype.forEach.call(t,function(t,n,s){if(e.call(t,t,n,s)===!1)throw null});else if("undefined"!=typeof t.length)for(n=0;n<t.length&&e.call(t[n],t[n],n,t)!==!1;++n);else for(n in t)if(t.hasOwnProperty(n)&&e.call(t[n],t[n],n,t)===!1)break}catch(s){}},i.elements=function(t,e){"use strict";var n=[];return t instanceof s?n=t.elements:t instanceof Array||t instanceof NodeList?r.each(t,function(t){t instanceof Node&&n.push(t)}):t instanceof Node?n.push(t):"string"==typeof t&&(e&&(t=t.trim()),"<"===t.substr(0,1)&&(n=r.fromHTML(t))),n},i.validate=function(t,e){"use strict";return(e instanceof o||e instanceof h)&&(e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.oMatchesSelector).call(e,t)},i.rand=function(){"use strict";return(Math.random()+1).toString(36).substring(7)},i.extend=function(t){"use strict";return t=t||{},r.each(arguments,function(e){r.each(e,function(e,n){"object"==typeof e?(t[n]=t[n]||{},r.extend(t[n],e)):t[n]=e})}),t},i.fromHTML=function(t){"use strict";var e=[];return a.innerHTML=t,r.each(a.childNodes,function(t){e.push(t.cloneNode(!0))}),a.innerHTML="",e},i.noConflict=function(){"use strict";return e.$=n,s},i.fn={},Object.observe(i.fn,function(t){r.each(t[0].object,function(t,e){s.prototype[e]=t})}),r=e.$=e.dQuery=i}(document,window,window.$);