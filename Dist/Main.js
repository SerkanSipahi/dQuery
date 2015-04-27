"use strict";var _createClass=function(){function e(e,t){for(var n in t){var r=t[n];r.configurable=!0,r.value&&(r.writable=!0)}Object.defineProperties(e,t)}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),_classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},ArrayProto=Array.prototype,Regex={ID:/^#\w+$/,Class:/^\.\w+$/,TagName:/^\w+$/,CRLF:/\r?\n/g},Parser=null,Old$=window.$,dQuery=function(){function e(t){_classCallCheck(this,e),this.Elements=$dQuery.elements(t)}return _createClass(e,{length:{get:function(){return this.Elements.length}},on:{value:function(e,t,n,r){var i=this;return this.length&&!function(){"undefined"!=typeof n?!function(){r=r||n;var e=t;t=function(t){t.stopPropagation(),(t.target.matches(e)||$(t.target).hasParent(e))&&n.call(this,t)}}():!function(){r=r||t;var e=t;t=function(t){t.stopPropagation(),e.call(this,t)}}();var s=i;e.split(" ").forEach(function(e){s.each(function(n){n.__events=n.__events||{},n.__events[e]=n.__events[e]||{},n.__events[e][r]=t,n.addEventListener(e,t)})})}(),this}},off:{value:function(e,t){var n=this;return this.length&&!function(){var r=n;"undefined"==typeof t?e.split(" ").forEach(function(e){r.each(function(t){if(t.__events&&t.__events[e]){for(var n in t.__events[e])t.removeEventListener(e,t.__events[e][n]);t.__events[e]={}}})}):"function"==typeof t&&e.split(" ").forEach(function(e){r.each(function(n){n.__events&&n.__events[e]&&n.__events[e][t]&&(n.removeEventListener(e,n.__events[e][t]),delete n.__events[e][t])})})}(),this}},once:{value:function(e,t,n){var r=this;return this.length&&!function(){var i=r;"undefined"!=typeof n?r.on(e,t,function s(t){n.call(this,t),i.off(e,s)},n):r.on(e,function o(n){t.call(this,n),i.off(e,o)})}(),this}},trigger:{value:function(e,t){var n=this;return this.length&&!function(){var r=void 0;r="string"==typeof e?$dQuery.event(e,t):e,n.each(function(e){e.dispatchEvent(r)})}(),this}},eq:{value:function(t){return this.length?new e(t<this.length?[this.Elements[t]]:[]):this}},select:{value:function(e){return this.Elements=e<this.length?[this.Elements[e]]:[],this}},selectChild:{value:function(e,t){return"undefined"==typeof t&&(t=e,e=0),this.Elements=e<this.length&&t<this.Elements[e].childElementCount?[this.Elements[e].children[t]]:[],this}},find:{value:function(t){return new e(this.Elements[0].querySelectorAll(t))}},children:{value:function(t){return this.length?t?this.find(":scope > "+t):new e(this.Elements[0].children):this}},forEach:{value:function(e){try{ArrayProto.forEach.call(this.Elements,e)}catch(t){if(null!==t)throw t}return this}},first:{value:function(){return this.length?new e([this.Elements[0]]):this}},last:{value:function(){return this.length?new e([this.Elements[this.length-1]]):this}},next:{value:function(){return this.length?new e(null!==this.Elements[0].nextElementSibling?[this.Elements[0].nextElementSibling]:[]):this}},prev:{value:function(){return this.length?new e(null!==this.Elements[0].previousElementSibling?[this.Elements[0].previousElementSibling]:[]):this}},closest:{value:function(t){if(this.length){var n=this.Elements[0].querySelector(t);return new e(n?[n]:[])}return this}},ready:{value:function(e){"complete"===document.readyState?e.call(document):document.addEventListener("DOMContentLoaded",e)}},matches:{value:function(e){return this.length&&this.Elements[0].matches(e)}},hasParent:{value:function(e){if(!this.length)return!1;for(var t=this.Elements[0];t=t.parentNode;){if("HTMLDocument"===t.constructor.name)return!1;if(!e.length||t.matches(e))return!0}return!1}},css:{value:function(e,t){return"undefined"!=typeof t?(this.length&&this.each(function(n){n.style[e]=t}),this):this.length?this.Elements[0].style[e]||getComputedStyle(this.Elements[0])[e]||null:null}},hide:{value:function(){return this.css("display","none"),this}},addClass:{value:function(e){return this.length&&this.each(function(t){t.classList.add(e)}),this}},removeClass:{value:function(e){return this.length&&this.each(function(t){t.classList.remove(e)}),this}},toggleClass:{value:function(e){return this.length&&this.each(function(t){t.classList.toggle(e)}),this}},hasClass:{value:function(e){return this.length&&this.Elements[0].classList.contains(e)}},remove:{value:function(){var e=[];return this.each(function(t){try{e.push(t),t.parentNode.removeChild(t)}catch(n){}}),e}},parent:{value:function(){return this.length?new e(this.Elements[0].parentNode):this}},focus:{value:function(){return this.length&&this.Elements[0].focus(),this}},attr:{value:function(e,t){return"undefined"==typeof t?this.length&&this.Elements[0].getAttribute(e):(t=String(t),this.each(function(n){n.setAttribute(e,String(t))}),this)}},removeAttr:{value:function(e){return this.length&&this.each(function(t){t.removeAttribute(e)}),this}},parents:{value:function(t){if(!this.length)return this;for(var n=[],r=this.Elements[0];(r=r.parentNode)&&"HTMLDocument"!==r.constructor.name;)(!t.length||r.matches(t))&&n.push(r);return new e(n)}},parentsUntil:{value:function(t){if(!this.length)return this;for(var n=[],r=this.Elements[0];(r=r.parentNode)&&"HTMLDocument"!==r.constructor.name&&t.length&&!r.matches(t);)n.push(r);return new e(n)}},clone:{value:function(){return this.length?new e([this.Elements[0].cloneNode(!0)]):this}},empty:{value:function(){return this.length&&this.forEach(function(e){try{e.innerHTML=""}catch(t){}}),this}},html:{value:function(e){return"undefined"==typeof e?this.length&&this.Elements[0].innerHTML:(this.length&&this.each(function(t){try{t.innerHTML=e}catch(n){}}),this)}},text:{value:function(e){return"undefined"==typeof e?this.length&&this.Elements[0].textContent:(this.length&&this.each(function(t){try{t.textContent=e}catch(n){}}),this)}},serialize:{value:function(){if(!this.length)return"";var e=[];return ArrayProto.forEach.call(this.Elements[0].elements,function(t){t.name&&e.push(t.name+"="+t.value.replace(Regex.CRLF,"\n"))}),e.join("&")}},serializeAssoc:{value:function(){if(!this.length)return"";var e={};return ArrayProto.forEach.call(this.Elements[0].elements,function(t){t.name&&(e[t.name]=t.value)}),e}},after:{value:function(e){var t=this;return this.length&&!function(){var n=t;"string"==typeof e?n.each(function(t){t.insertAdjacentHTML("afterend",e)}):ArrayProto.forEach.call($dQuery.elements(e),function(e){n.Elements[0].parentNode.insertBefore(e,n.Elements[0].nextSibling)})}(),this}},before:{value:function(e){var t=this;return this.length&&!function(){var n=t;"string"==typeof e?n.each(function(t){t.insertAdjacentHTML("beforebegin",e)}):ArrayProto.forEach.call($dQuery.elements(e),function(e){n.Elements[0].parentNode.insertBefore(e,n.Elements[0].previousSibling)})}(),this}},append:{value:function(e){var t=this;return this.length&&!function(){var n=t;"string"==typeof e?n.each(function(t){t.insertAdjacentHTML("beforeend",e)}):ArrayProto.forEach.call($dQuery.elements(e),function(e){n.Elements[0].appendChild(e)})}(),this}},prepend:{value:function(e){var t=this;return this.length&&!function(){var n=t;"string"==typeof e?n.each(function(t){t.insertAdjacentHTML("afterbegin",e)}):ArrayProto.forEach.call(ArrayProto.reverse.call($dQuery.elements(e)),function(e){n.Elements[0].insertBefore(e,n.Elements[0].firstChild)})}(),this}},appendTo:{value:function(e){return this.length&&(e="string"==typeof e?document.querySelector(e):$dQuery.elements(e)[0],e&&this.each(function(t){e.appendChild(t)})),this}},prependTo:{value:function(e){return this.length&&(e="string"==typeof e?document.querySelector(e):$dQuery.elements(e)[0],e&&ArrayProto.forEach.call(ArrayProto.reverse.call(this.Elements),function(t){e.appendChild(t)})),this}},insertBefore:{value:function(e){return this.length&&(e="string"==typeof e?document.querySelector(e):$dQuery.elements(e)[0],e&&ArrayProto.forEach.call(ArrayProto.reverse.call(this.Elements),function(t){e.parentNode.insertBefore(t,e)})),this}},insertAfter:{value:function(e){return this.length&&(e="string"==typeof e?document.querySelector(e):$dQuery.elements(e)[0],e&&ArrayProto.forEach.call(this.Elements,function(t){e.parentNode.insertBefore(t,e.nextSibling)})),this}},replaceWith:{value:function(e){return this.length&&("string"==typeof e?this.each(function(t){try{t.outerHTML=e}catch(n){}}):(e=$dQuery.elements(e)[0],e&&this.Elements[0].parentNode.replaceChild(e,this.Elements[0]))),this}}},{$:{value:function(t){return new e(Regex.ID.test(t)?[document.getElementById(t.substr(1))]:Regex.Class.test(t)?document.getElementsByClassName(t.substr(1)):Regex.TagName.test(t)?document.getElementsByTagName(t):"string"==typeof t?"<"===t.substr(0,1)?$dQuery.fromHTML(t):document.querySelectorAll(t):t)}},elements:{value:function(t){if(null===t||"object"!=typeof t)return[];if("Array"!==t.constructor.name)return"object"==typeof t&&null!==t?"NodeList"===t.constructor.name?t:"HTML"===t.constructor.name.substr(0,4)?t.length?ArrayProto.slice.call(t):[t]:t instanceof e?t.Elements:[]:[];var n=function(){var e=[];return t.length&&t.forEach(function(t){"HTML"===t.constructor.name.substr(0,4)&&e.push(t)}),{v:e}}();return"object"==typeof n?n.v:void 0}},extend:{value:function(e){e=e||{};for(var t=1;t<arguments.length;t++){var n=arguments[t];if(n)for(var r in n)n.hasOwnProperty(r)&&("object"==typeof n[r]?$dQuery.extend(e[r],n[r]):e[r]=n[r])}return e}},noConflict:{value:function(){window.$=Old$}},fromHTML:{value:function(e){return Parser=Parser||document.createElement("span"),Parser.innerHTML=e,Parser.children}},event:{value:function(e,t){var n;return"undefined"==typeof t?(n=document.createEvent("HTMLEvents"),n.initEvent(e,!0,!1)):(n=document.createEvent("CustomEvent"),n.initCustomEvent(e,!0,!0,t)),n}}}),e}();dQuery.prototype.each=dQuery.prototype.forEach,dQuery.prototype.addListener=dQuery.prototype.on,dQuery.prototype.addEventListener=dQuery.prototype.on,dQuery.prototype.removeListener=dQuery.prototype.off,dQuery.prototype.removeEventListener=dQuery.prototype.off,"click submit mousedown mouseup change dblclick keydown keyup keypress input load mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup scroll unload".split(" ").forEach(function(e){dQuery.prototype[e]=function(t){return this.on(e,t),this}});var $dQuery=dQuery.$;$dQuery.fn=dQuery.prototype,$dQuery.elements=dQuery.elements,$dQuery.extend=dQuery.extend,$dQuery.noConflict=dQuery.noConflict,$dQuery.fromHTML=dQuery.fromHTML,$dQuery.event=dQuery.event,"undefined"!=typeof module?module.exports=$dQuery:"undefined"!=typeof exports?exports.$=$dQuery:"undefined"!=typeof window&&(window.$=$dQuery);