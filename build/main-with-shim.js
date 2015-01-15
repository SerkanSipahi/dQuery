
;Object.observe||!function(e,t){"use strict";var n=function(e){var n=e.call(e),r=typeof r;return"object"==typeof t.alert?function(t){return n===e.call(t)||!!t&&typeof t.toString==r&&typeof t.valueOf==r&&/^\s*\bfunction\b/.test(""+t)}:function(t){return n===e.call(t)}}(e.prototype.toString),r=function(e){return"object"==typeof HTMLElement?e instanceof HTMLElement:e&&"object"==typeof e&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName},i=function(){return!!t.setImmediate}(),o=function(){return i?function(e){return setImmediate(e)}:function(e){return setTimeout(e,10)}}(),c=function(){return i?function(e){clearImmediate(e)}:function(e){clearTimeout(e)}}(),f=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},u=function(e,t){return e===t?0!==e||1/e===1/t:e!==e&&t!==t},a=function(e){return"undefined"==typeof e?!1:"get"in e||"set"in e},s=function(e,t,r){if("object"!=typeof e)throw new TypeError("Object.observeObject called on non-object");if(n(t)===!1)throw new TypeError("Object.observeObject: Expecting function");if(Object.isFrozen(t)===!0)throw new TypeError("Object.observeObject: Expecting unfrozen function");if(void 0!==r&&!Array.isArray(r))throw new TypeError("Object.observeObject: Expecting acceptList in the form of an array")},p=function h(){var e=[],h=function(t,n,r){s(t,n,r),r||(r=["add","update","delete","reconfigure","setPrototype","preventExtensions"]),Object.getNotifier(t).addListener(n,r),-1===e.indexOf(t)?e.push(t):Object.getNotifier(t)._checkPropertyListing()};h.prototype.deliverChangeRecords=function(e){Object.getNotifier(e).deliverChangeRecords()},e.lastScanned=0;var t=function(e){return function t(){var n=0,r=e.length,i=new Date,c=!1;for(n=e.lastScanned;r>n&&!c;n++)g.indexOf(e[n])>-1?(Object.getNotifier(e[n])._checkPropertyListing(),c=new Date-i>100):(e.splice(n,1),n--,r--);e.lastScanned=r>n?n:0,o(t)}}(e);return o(t),h}(),d=function(e){var t=[],n=[],r=[],i=!1,s=[],p=[],d=this;Object.defineProperty(d,"_watching",{enumerable:!0,get:function(e){return function(){return e}}(e)});var l=function(e,t){var n=(typeof e[t],Object.getOwnPropertyDescriptor(e,t));if("getNotifier"===t||a(n)||!n.enumerable)return!1;if(e instanceof Array&&f(t)){var r=s.length;return s[r]=t,p[r]=e[t],!0}return function(t,n){function r(){return p[r.info.idx]}function i(t){u(p[i.info.idx],t)||(Object.getNotifier(e).queueUpdate(e,n,"update",p[i.info.idx]),p[i.info.idx]=t)}s[t]=n,p[t]=e[n],r.info=i.info={idx:t},Object.defineProperty(e,n,{get:r,set:i})}(s.length,t),!0};d._checkPropertyListing=function(e){var t,n,r,i,o,c=d._watching,u=Object.keys(c),a=0,g=u.length,h=s.slice(0),y=!e;for(c instanceof Array&&(o=d._oldLength),a=0;g>a;a++)t=u[a],r=c[t],n=typeof r,-1===(i=s.indexOf(t))?l(c,t)&&y&&d.queueUpdate(c,t,"add",null,c[t]):(c instanceof Array&&!f(t)||p[i]!==r&&(y&&d.queueUpdate(c,t,"update",p[i],r),p[i]=r),h.splice(h.indexOf(t),1));if(c instanceof Array&&c.length!==o&&(y&&d.queueUpdate(c,"length","update",o,c),d._oldLength=c.length),y)for(g=h.length,a=0;g>a;a++){i=s.indexOf(h[a]),d.queueUpdate(c,h[a],"delete",p[i]),s.splice(i,1),p.splice(i,1);for(var a=i;a<s.length;a++)if(s[a]in c){var b=Object.getOwnPropertyDescriptor(c,s[a]).get;if(b){var v=b.info;v.idx=a}}}},d.addListener=function(e,r){var i=t.indexOf(e);-1===i?(t.push(e),n.push(r)):n[i]=r},d.removeListener=function(e){var r=t.indexOf(e);r>-1&&(t.splice(r,1),n.splice(r,1))},d.listeners=function(){return t},d.queueUpdate=function(e,t,n,r){this.queueUpdates([{type:n,object:e,name:t,oldValue:r}])},d.queueUpdates=function(e){var t,n=this,f=0,u=e.length||0;for(f=0;u>f;f++)t=e[f],r.push(t);i&&c(i),i=o(function(){i=!1,n.deliverChangeRecords()})},d.deliverChangeRecords=function(){var e=0,i=t.length;for(e=0;i>e;e++)if(t[e]){var o;if(n[e]){o=[];for(var c=0,f=r.length;f>c;c++)-1!==n[e].indexOf(r[c].type)&&o.push(r[c])}else o=r;o.length&&(t[e]===console.log?console.log(o):t[e](o))}r=[]},d.notify=function(t){if("object"!=typeof t||"string"!=typeof t.type)throw new TypeError("Invalid changeRecord with non-string 'type' property");t.object=e,d.queueUpdates([t])},d._checkPropertyListing(!0)},l=[],g=[];e.getNotifier=function(e){var t=g.indexOf(e),n=t>-1?l[t]:!1;return n||(t=g.length,g[t]=e,n=l[t]=new d(e)),n},e.observe=function(e,t,n){return r(e)?void 0:new p(e,t,n)},e.unobserve=function(e,t){s(e,t);var n=g.indexOf(e),r=n>-1?l[n]:!1;r&&(r.removeListener(t),0===r.listeners().length&&(g.splice(n,1),l.splice(n,1)))}}(Object,this);
;!function(t,e){function n(t){"use strict";var n=[];t instanceof o||t instanceof r?n.push(t):"string"==typeof t?n=e.querySelectorAll(t):"object"==typeof t&&i.each(t,function(t){(t instanceof o||t instanceof r)&&n.push(t)}),this.elements=n,this.length=n.length}function s(t){"use strict";if("string"==typeof t){var e=t.substr(0,1),s=t.substr(1);return new n("#"===e&&u.test(s)?document.getElementById(s):t)}return new n(t)}var i,r=HTMLElement,o=HTMLDocument,h=function(){return e.querySelector.apply(e,arguments)},u=/^[A-Za-z]+[\w-:.]*$/;n.prototype.ready=function(t){"use strict";return this.on("DOMContentLoaded",t),this},n.prototype.children=function(t){"use strict";if(0===this.length)return this;if("undefined"==typeof t)return i(this.elements[0].childNodes);var e=[];return i.each(this.elements[0].childNodes,function(){i.validate(t,this)&&e.push(this)}),i(e)},n.prototype.click=function(t){"use strict";return this.on("click",t)},n.prototype.submit=function(t){"use strict";return this.on("submit",t)},n.prototype.focus=function(){"use strict";return this.length>0&&this.elements[0].focus(),this},n.prototype.child=function(t){"use strict";if(0===this.length)return this;"undefined"==typeof t&&(t=1),--t;var e=this.elements[0].childNodes[t];return"undefined"==typeof e?i():i(e)},n.prototype.on=function(t,e,n){"use strict";var s;return s=3===arguments.length?function(t){(i.validate(e,t.target)||i(t.target).hasParent(e))&&n.apply(t.target,arguments)}:e,this.each(function(){this.addEventListener(t,s,!0)}),s},n.prototype.off=function(t,e){"use strict";return this.each(function(){this.removeEventListener(t,e,!0)}),this},n.prototype.trigger=function(t,n){"use strict";var s;return"undefined"==typeof n?(s=e.createEvent("HTMLEvents"),s.initEvent(t,!0,!1)):window.CustomEvent?s=new CustomEvent(t,{detail:n}):(s=e.createEvent("CustomEvent"),s.initCustomEvent(t,!0,!0,n)),this.each(function(){this.dispatchEvent(s)}),this},n.prototype.contains=function(t){"use strict";return 0===this.length||0===t.length?!1:this.elements[0]!==t.elements[0]&&this.elements[0].contains(t.elements[0])},n.prototype.empty=function(){"use strict";0!==this.elements.length&&(this.elements[0].innerHTML="")},n.prototype.is=function(t){"use strict";return 0===this.length||0===t.length?!1:t instanceof n?this.elements[0]===t.elements[0]:i.validate(t,this.elements[0])},n.prototype.each=function(t){"use strict";return i.each(this.elements,t),this},n.prototype.attr=function(t,e){"use strict";return 0!==this.length?"undefined"==typeof e?this.elements[0].getAttribute(t):(this.each(function(){this.setAttribute(t,e)}),this):void 0},n.prototype.removeAttr=function(t){"use strict";return 0!==this.length&&this.each(function(){this.removeAttribute(t)}),this},n.prototype.html=function(t){"use strict";return 0!==this.length?"undefined"==typeof t?this.elements[0].innerHTML:(this.each(function(){this.innerHTML=t}),this):void 0},n.prototype.text=function(t){"use strict";return 0!==this.length?"undefined"==typeof t?this.elements[0].textContent:(this.each(function(){this.textContent=t}),this):void 0},n.prototype.val=function(t){"use strict";return 0!==this.length?"undefined"==typeof t?this.elements[0].value:(this.each(function(){this.value=t}),this):void 0},n.prototype.first=function(){"use strict";return this.length>1?i(this.elements[0]):this},n.prototype.last=function(){"use strict";return this.length>1?i(this.elements[this.length-1]):this},n.prototype.hasClass=function(t){"use strict";return 0===this.length?!1:this.elements[0].classList.contains(t)},n.prototype.addClass=function(t){"use strict";return 1!==this.length&&this.elements.forEach(function(){this.classList.add(t)}),this},n.prototype.removeClass=function(t){"use strict";return 1!==this.length&&this.elements.forEach(function(){this.classList.remove(t)}),this},n.prototype.toggleClass=function(t){"use strict";return 1!==this.length&&this.elements.forEach(function(){this.classList.toggle(t)}),this},n.prototype.find=function(t){"use strict";return 0===this.length?this:i(this.elements[0].querySelectorAll(t))},n.prototype.clone=function(){"use strict";return 0===this.length?this:i(this.elements[0].cloneNode(!0))},n.prototype.remove=function(){"use strict";0===this.length||this.elements[0]instanceof o||(this.each(function(){this.parentNode.removeChild(this)}),this.elements=[],this.length=0)},n.prototype.parent=function(){"use strict";return 0===this.length||this.elements[0]instanceof o?this:i(this.elements[0].parentNode)},n.prototype.next=function(){"use strict";return 0===this.length||this.elements[0]instanceof o?this:i(this.elements[0].nextElementSibling)},n.prototype.prev=function(){"use strict";return 0===this.length||this.elements[0]instanceof o?this:i(this.elements[0].previousElementSibling)},n.prototype.prepend=function(t){"use strict";if(t.length>0&&this.length>0){var e=this;i.each(t.elements.reverse(),function(){e.elements[0].insertBefore(this,e.elements[0].firstChild)})}return this},n.prototype.append=function(t){"use strict";if(t.length>0&&this.length>0){var e=this;i.each(t.elements,function(){e.elements[0].appendChild(this)})}return this},n.prototype.appendTo=function(t){"use strict";return t.append(this),this},n.prototype.prependTo=function(t){"use strict";return t.prepend(this),this},n.prototype.replaceWith=function(t){"use strict";return 0!==this.length&&0!==t.length?(this.elements[0].parentNode.replaceChild(t.elements[0],this.elements[0]),this):void 0},n.prototype.closest=function(t){"use strict";if(0===this.length)return i();if("undefined"==typeof t||0===t.length)return i(this.elements[0].parentNode);for(var e=this.elements[0];(e=e.parentNode)&&!(e instanceof o);)if(i.validate(t,e))return i(e);return i()},n.prototype.parents=function(t){"use strict";if(0===this.length)return i();for(var e="undefined"==typeof t||0===t.length,n=this.elements[0],s=[];(n=n.parentNode)&&!(n instanceof o);)(e||i.validate(t,n))&&s.push(n);return i(s)},n.prototype.parentsUntil=function(t){"use strict";if(0===this.length)return i();if("undefined"==typeof t||0===t.length)return i(this.elements[0].parentNode);for(var e=this.elements[0],n=[];(e=e.parentNode)&&!(e instanceof o);)if(n.push(e),i.validate(t,e))return i(n);return i()},n.prototype.hasParent=function(t){"use strict";return 0===this.length?!1:this.closest(t).length>0},n.prototype.serializeAssoc=function(){"use strict";if(0===this.length)return{};var t=this.elements[0],e=/\r?\n/g,n={};return i.each(t.elements,function(){this.name&&("checkbox"!==this.type&&"radio"!==this.type||this.checked)&&(n[this.name]=this.value.replace(e,"\n"))}),n},n.prototype.serialize=function(){"use strict";if(0===this.length)return"";var t=[],e=/%20/g;return i.each(this.serializeAssoc(),function(n,s){t.push((s+"="+n).replace(e,"+"))}),t.join("&")},s.validate=function(t,e){"use strict";return(e instanceof HTMLElement||e instanceof HTMLDocument)&&(e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.oMatchesSelector).call(e,t)},s.rand=function(){"use strict";return(Math.random()+1).toString(36).substring(7)},s.extend=function(t,e){"use strict";var n,s={};for(n in t)t.hasOwnProperty(n)&&(s[n]=t[n]);for(n in e)e.hasOwnProperty(n)&&s.hasOwnProperty(n)&&(s[n]=e[n]);return s},s.each=function(t,e){"use strict";var n;if("undefined"!=typeof t)if(t instanceof Array||t instanceof NodeList)[].forEach.call(t,function(t,n,s){e.call(t,t,n,s)});else if("undefined"!=typeof t.length)for(n=0;n<t.length;++n)e.call(t[n],t[n],n,t);else for(n in t)t.hasOwnProperty(n)&&e.call(t[n],t[n],n,t)},s.fn={},Object.observe(s.fn,function(t){i.each(t[0].object,function(t,e){n.prototype[e]=t})}),t.$=i=s,t.$$=h}(window,document);
