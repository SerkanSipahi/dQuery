
;Object.observe||!function(e,t){"use strict";var n=function(e){var n=e.call(e),r=typeof r;return"object"==typeof t.alert?function(t){return n===e.call(t)||!!t&&typeof t.toString==r&&typeof t.valueOf==r&&/^\s*\bfunction\b/.test(""+t)}:function(t){return n===e.call(t)}}(e.prototype.toString),r=function(e){return"object"==typeof HTMLElement?e instanceof HTMLElement:e&&"object"==typeof e&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName},i=function(){return!!t.setImmediate}(),o=function(){return i?function(e){return setImmediate(e)}:function(e){return setTimeout(e,10)}}(),c=function(){return i?function(e){clearImmediate(e)}:function(e){clearTimeout(e)}}(),f=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},u=function(e,t){return e===t?0!==e||1/e===1/t:e!==e&&t!==t},a=function(e){return"undefined"==typeof e?!1:"get"in e||"set"in e},s=function(e,t,r){if("object"!=typeof e)throw new TypeError("Object.observeObject called on non-object");if(n(t)===!1)throw new TypeError("Object.observeObject: Expecting function");if(Object.isFrozen(t)===!0)throw new TypeError("Object.observeObject: Expecting unfrozen function");if(void 0!==r&&!Array.isArray(r))throw new TypeError("Object.observeObject: Expecting acceptList in the form of an array")},p=function h(){var e=[],h=function(t,n,r){s(t,n,r),r||(r=["add","update","delete","reconfigure","setPrototype","preventExtensions"]),Object.getNotifier(t).addListener(n,r),-1===e.indexOf(t)?e.push(t):Object.getNotifier(t)._checkPropertyListing()};h.prototype.deliverChangeRecords=function(e){Object.getNotifier(e).deliverChangeRecords()},e.lastScanned=0;var t=function(e){return function t(){var n=0,r=e.length,i=new Date,c=!1;for(n=e.lastScanned;r>n&&!c;n++)g.indexOf(e[n])>-1?(Object.getNotifier(e[n])._checkPropertyListing(),c=new Date-i>100):(e.splice(n,1),n--,r--);e.lastScanned=r>n?n:0,o(t)}}(e);return o(t),h}(),d=function(e){var t=[],n=[],r=[],i=!1,s=[],p=[],d=this;Object.defineProperty(d,"_watching",{enumerable:!0,get:function(e){return function(){return e}}(e)});var l=function(e,t){var n=(typeof e[t],Object.getOwnPropertyDescriptor(e,t));if("getNotifier"===t||a(n)||!n.enumerable)return!1;if(e instanceof Array&&f(t)){var r=s.length;return s[r]=t,p[r]=e[t],!0}return function(t,n){function r(){return p[r.info.idx]}function i(t){u(p[i.info.idx],t)||(Object.getNotifier(e).queueUpdate(e,n,"update",p[i.info.idx]),p[i.info.idx]=t)}s[t]=n,p[t]=e[n],r.info=i.info={idx:t},Object.defineProperty(e,n,{get:r,set:i})}(s.length,t),!0};d._checkPropertyListing=function(e){var t,n,r,i,o,c=d._watching,u=Object.keys(c),a=0,g=u.length,h=s.slice(0),y=!e;for(c instanceof Array&&(o=d._oldLength),a=0;g>a;a++)t=u[a],r=c[t],n=typeof r,-1===(i=s.indexOf(t))?l(c,t)&&y&&d.queueUpdate(c,t,"add",null,c[t]):(c instanceof Array&&!f(t)||p[i]!==r&&(y&&d.queueUpdate(c,t,"update",p[i],r),p[i]=r),h.splice(h.indexOf(t),1));if(c instanceof Array&&c.length!==o&&(y&&d.queueUpdate(c,"length","update",o,c),d._oldLength=c.length),y)for(g=h.length,a=0;g>a;a++){i=s.indexOf(h[a]),d.queueUpdate(c,h[a],"delete",p[i]),s.splice(i,1),p.splice(i,1);for(var a=i;a<s.length;a++)if(s[a]in c){var b=Object.getOwnPropertyDescriptor(c,s[a]).get;if(b){var v=b.info;v.idx=a}}}},d.addListener=function(e,r){var i=t.indexOf(e);-1===i?(t.push(e),n.push(r)):n[i]=r},d.removeListener=function(e){var r=t.indexOf(e);r>-1&&(t.splice(r,1),n.splice(r,1))},d.listeners=function(){return t},d.queueUpdate=function(e,t,n,r){this.queueUpdates([{type:n,object:e,name:t,oldValue:r}])},d.queueUpdates=function(e){var t,n=this,f=0,u=e.length||0;for(f=0;u>f;f++)t=e[f],r.push(t);i&&c(i),i=o(function(){i=!1,n.deliverChangeRecords()})},d.deliverChangeRecords=function(){var e=0,i=t.length;for(e=0;i>e;e++)if(t[e]){var o;if(n[e]){o=[];for(var c=0,f=r.length;f>c;c++)-1!==n[e].indexOf(r[c].type)&&o.push(r[c])}else o=r;o.length&&(t[e]===console.log?console.log(o):t[e](o))}r=[]},d.notify=function(t){if("object"!=typeof t||"string"!=typeof t.type)throw new TypeError("Invalid changeRecord with non-string 'type' property");t.object=e,d.queueUpdates([t])},d._checkPropertyListing(!0)},l=[],g=[];e.getNotifier=function(e){var t=g.indexOf(e),n=t>-1?l[t]:!1;return n||(t=g.length,g[t]=e,n=l[t]=new d(e)),n},e.observe=function(e,t,n){return r(e)?void 0:new p(e,t,n)},e.unobserve=function(e,t){s(e,t);var n=g.indexOf(e),r=n>-1?l[n]:!1;r&&(r.removeListener(t),0===r.listeners().length&&(g.splice(n,1),l.splice(n,1)))}}(Object,this);
;!function(t,e,n){function s(e){"use strict";var n=[];e instanceof u?n.push(e):"string"==typeof e?(e=e.trim(),"<"===e.substr(0,1)?n=r.fromHTML(e):r.each(p(t,e),function(t){n.push(t)})):"object"==typeof e&&(n=r.elements(e)),this.elements=n,this.length=n.length}function i(t){"use strict";return new s(t)}var r,o=HTMLElement,h=HTMLDocument,c=HTMLInputElement,u=Node,l=/^[A-Za-z]+[\w\-:]*$/,a=document.createElement("div"),f=[],p=function(t,e){var n,s=e.substr(0,1);return"#"===s&&(n=e.substr(1))&&l.test(n)&&t instanceof h?t.getElementById(n):"."===s&&(n=e.substr(1))&&l.test(n)?t.getElementsByClassName(n):l.test(e)?t.getElementsByTagName(e):t.querySelectorAll(e)};s.prototype.ready=function(t){"use strict";return this.on("DOMContentLoaded",t),this},s.prototype.click=function(t){"use strict";return this.on("click",t),this},s.prototype.submit=function(t){"use strict";return this.on("submit",t),this},s.prototype.on=function(t,e,n){"use strict";var s;if(s=3===arguments.length?function(t){var s=r(t.target);(r.validate(e,s)||r(s).hasParent(e))&&n.apply(t.target,arguments)}:e,-1!==t.indexOf(".")){var i=t;t=t.split(".")[0],this.each(function(e){f.push({node:e,event:s,name:i}),e.addEventListener(t,s,!0)})}else this.each(function(e){e.addEventListener(t,s,!0)});return s},s.prototype.off=function(t,e){"use strict";if(e||-1===t.indexOf("."))this.each(function(n){n.removeEventListener(t,e,!0)});else{var n=t;t=t.split(".")[0],this.each(function(e){r.each(f,function(s){return s.name===n&&s.node===e?(e.removeEventListener(t,s.event,!0),f.splice(f.indexOf(s),1),!1):void 0})})}return this},s.prototype.trigger=function(e,n){"use strict";var s;"undefined"==typeof n?(s=t.createEvent("HTMLEvents"),s.initEvent(e,!0,!1)):(s=t.createEvent("CustomEvent"),s.initCustomEvent(e,!0,!0,n)),this.each(function(t){t.dispatchEvent(s)})},s.prototype.children=function(t){"use strict";if(!this.length)return this;if("undefined"==typeof t)return r(this.elements[0].childNodes);var e=[];return r.each(this.elements[0].childNodes,function(n){r.validate(t,n)&&e.push(n)}),r(e)},s.prototype.child=function(t){"use strict";return this.length?r(this.elements[0].childNodes[t||0]):this},s.prototype.eq=function(t){"use strict";return this.length?(this.elements=this.elements[t]?[this.elements[t]]:[],this.length=this.elements.length,this):this},s.prototype.find=function(t){"use strict";return this.length?r(p(this.elements[0],t)):this},s.prototype.parent=function(){"use strict";return!this.length||this.elements[0]instanceof h?this:r(this.elements[0].parentNode)},s.prototype.next=function(){"use strict";return!this.length||this.elements[0]instanceof h?this:r(this.elements[0].nextElementSibling)},s.prototype.prev=function(){"use strict";return!this.length||this.elements[0]instanceof h?this:r(this.elements[0].previousElementSibling)},s.prototype.closest=function(t){"use strict";if(this.length){if(!t||!t.length)return r(this.elements[0].parentNode);for(var e=this.elements[0];(e=e.parentNode)&&!(e instanceof h);)if(r.validate(t,e))return r(e)}return r()},s.prototype.parents=function(t){"use strict";if(!this.length)return r();for(var e=!t||!t.length,n=this.elements[0],s=[];(n=n.parentNode)&&!(n instanceof h);)(e||r.validate(t,n))&&s.push(n);return r(s)},s.prototype.parentsUntil=function(t){"use strict";if(this.length){if(!t||!t.length)return r(this.elements[0].parentNode);for(var e=this.elements[0],n=[];(e=e.parentNode)&&!(e instanceof h);)if(n.push(e),r.validate(t,e))return r(n)}return r()},s.prototype.first=function(){"use strict";return this.length?r(this.elements[0]):this},s.prototype.last=function(){"use strict";return this.length?r(this.elements[this.length-1]):this},s.prototype.each=function(t){"use strict";return r.each(this.elements,t),this},s.prototype.eachElement=function(t){"use strict";r.each(this.elements,function(e){return e instanceof o?t.apply(this,arguments):void 0})},s.prototype.addClass=function(t){"use strict";return 0!==this.length&&this.eachElement(function(e){e.classList.add(t)}),this},s.prototype.removeClass=function(t){"use strict";return 0!==this.length&&this.eachElement(function(e){e.classList.remove(t)}),this},s.prototype.toggleClass=function(t){"use strict";return this.length&&this.eachElement(function(e){e.classList.toggle(t)}),this},s.prototype.clone=function(){"use strict";return this.length?r(this.elements[0].cloneNode(!0)):this},s.prototype.remove=function(){"use strict";!this.length||this.elements[0]instanceof h||(this.each(function(t){t.parentNode.removeChild(t)}),this.elements=[],this.length=0)},s.prototype.prepend=function(t){"use strict";if(this.length){var e=this.elements[0];r.each(r.elements(t).reverse(),function(t){e.insertBefore(t,e.firstChild)})}return this},s.prototype.append=function(t){"use strict";if(t.length&&this.length){var e=this.elements[0];r.each(r.elements(t).reverse(),function(t){e.appendChild(t)})}return this},s.prototype.appendTo=function(t){"use strict";return this.length&&r.each(r.elements(t),function(t){r.each(this.elements.reverse(),function(e){t.appendChild(e)})}.bind(this)),this},s.prototype.prependTo=function(t){"use strict";return this.length&&r.each(r.elements(t),function(t){r.each(this.elements.reverse(),function(e){t.insertBefore(e,t.firstChild)})}.bind(this)),this},s.prototype.insertBefore=function(t){"use strict";var e=r.elements(t);return e.length&&this.length&&!e[0]instanceof h&&r.each(this.elements.reverse(),function(t){e[0].parentNode.insertBefore(t,e[0])}),this},s.prototype.insertAfter=function(t){"use strict";var e=r.elements(t);return e.length&&this.length&&!e[0]instanceof h&&r.each(this.elements.reverse(),function(t){e[0].parentNode.insertBefore(t,e[0].nextSibling)}),this},s.prototype.replaceWith=function(t){"use strict";if(!this.length)return this;var e=r.elements(t);return e.length>0&&this.elements[0].parentNode.replaceChild(e[0],this.elements[0]),this},s.prototype.focus=function(){"use strict";return this.eachElement(function(t){return t.focus()&&!1}),this},s.prototype.contains=function(t){"use strict";var e=r.elements(t);return this.length&&t.length&&this.elements[0]!==e[0]&&this.elements[0].contains(e[0])},s.prototype.empty=function(){"use strict";this.length&&this.each(function(t){t.textContent=""})},s.prototype.hasClass=function(t){"use strict";return this.length&&this.elements[0].classList.contains(t)},s.prototype.hasParent=function(t){"use strict";return this.length&&this.closest(t).length>0},s.prototype.attr=function(t,e){"use strict";return this.length?1===arguments.length?this.elements[0].getAttribute(t):(this.eachElement(function(n){n.setAttribute(t,e)}),this):void 0},s.prototype.removeAttr=function(t){"use strict";return this.length&&this.eachElement(function(e){e.removeAttribute(t)}),this},s.prototype.html=function(t){"use strict";if(0!==this.length){if(0===arguments.length){var e;return this.eachElement(function(t){return e=t.innerHTML,!1}),e}return this.eachElement(function(e){e.innerHTML=t}),this}},s.prototype.text=function(t){"use strict";return this.length?0===arguments.length?this.elements[0].textContent:(this.each(function(e){e.textContent=t}),this):void 0},s.prototype.val=function(t){"use strict";if(this.length){if(0===arguments.length){var e;return this.eachElement(function(t){return t instanceof c?(e=t.value,!1):void 0}),e}return this.eachElement(function(e){e instanceof c&&(e.value=t)}),this}},s.prototype.serializeAssoc=function(){"use strict";if(0===this.length)return{};var t=/\r?\n/g,e={};return r.each(this.elements[0].elements,function(){if(this.name){if(("checkbox"===this.type||"radio"===this.type)&&!this.checked)return;e[this.name]=this.value.replace(t,"\n")}}),e},s.prototype.serialize=function(t){"use strict";if(0===this.length)return"";var e=[],n=/%20/g;return r.each(t||this.serializeAssoc(),function(t,s){e.push((s+"="+t).replace(n,"+"))}),e.join("&")},i.each=function(t,e){"use strict";var n;if(t)try{if(t instanceof Array||t instanceof NodeList)Array.prototype.forEach.call(t,function(t,n,s){if(e.call(t,t,n,s)===!1)throw null});else if("undefined"!=typeof t.length)for(n=0;n<t.length&&e.call(t[n],t[n],n,t)!==!1;++n);else for(n in t)if(t.hasOwnProperty(n)&&e.call(t[n],t[n],n,t)===!1)break}catch(s){}},i.elements=function(t,e){"use strict";var n=[];return t instanceof s?n=t.elements:t instanceof Array||t instanceof NodeList?r.each(t,function(t){t instanceof Node&&n.push(t)}):t instanceof Node?n.push(t):"string"==typeof t&&(e&&(t=t.trim()),"<"===t.substr(0,1)&&(n=r.fromHTML(t))),n},i.validate=function(t,e){"use strict";return(e instanceof o||e instanceof h)&&(e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.oMatchesSelector).call(e,t)},i.rand=function(){"use strict";return(Math.random()+1).toString(36).substring(7)},i.extend=function(t){"use strict";return t=t||{},r.each(arguments,function(e){r.each(e,function(e,n){"object"==typeof e?(t[n]=t[n]||{},r.extend(t[n],e)):t[n]=e})}),t},i.fromHTML=function(t){"use strict";var e=[];return a.innerHTML=t,r.each(a.childNodes,function(t){e.push(t.cloneNode(!0))}),a.innerHTML="",e},i.noConflict=function(){"use strict";return e.$=n,s},i.fn={},Object.observe(i.fn,function(t){r.each(t[0].object,function(t,e){s.prototype[e]=t})}),r=e.$=e.dQuery=i}(document,window,window.$);
