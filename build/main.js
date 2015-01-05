!function(t){function e(t){"use strict";var e=[];t instanceof HTMLDocument||t instanceof HTMLElement?e.push(t):"string"==typeof t?e=document.querySelectorAll(t):"object"==typeof t&&s.each(t,function(t){(t instanceof HTMLDocument||t instanceof HTMLElement)&&e.push(t)}),this.elements=e,this.length=e.length}function n(t){"use strict";return new e(t)}var s;e.prototype.ready=function(t){"use strict";return this.on("DOMContentLoaded",t),this},e.prototype.contains=function(t){"use strict";return 0===this.length||0===t.length?!1:this.elements[0]!==t.elements[0]&&this.elements[0].contains(t.elements[0])},e.prototype.empty=function(){"use strict";0!==this.elements.length&&(this.elements[0].innerHTML="")},e.prototype.is=function(t){"use strict";if(0===this.length||0===t.length)return!1;if(t instanceof e)return this.elements[0]===t.elements[0];var n=this.elements[0];return(n.matches||n.matchesSelector||n.msMatchesSelector||n.mozMatchesSelector||n.webkitMatchesSelector||n.oMatchesSelector).call(n,t)},e.prototype.each=function(t){"use strict";return s.each(this.elements,t),this},e.prototype.attr=function(t,e){"use strict";if(0!==this.length)return"undefined"==typeof e?this.elements[0].getAttribute(t):(this.each(function(){this.setAttribute(t,e)}),this)},e.prototype.removeAttr=function(t){"use strict";return 0!==this.length&&this.each(function(){this.removeAttribute(t)}),this},e.prototype.html=function(t){"use strict";if(0!==this.length)return"undefined"==typeof t?this.elements[0].innerHTML:(this.each(function(){this.innerHTML=t}),this)},e.prototype.text=function(t){"use strict";if(0!==this.length)return"undefined"==typeof t?this.elements[0].textContent:(this.each(function(){this.textContent=t}),this)},e.prototype.val=function(t){"use strict";if(0!==this.length)return"undefined"==typeof t?this.elements[0].value:(this.each(function(){this.value=t}),this)},e.prototype.first=function(){"use strict";return this.length>1?s(this.elements[0]):this},e.prototype.last=function(){"use strict";return this.length>1?s(this.elements[this.length-1]):this},e.prototype.hasClass=function(t){"use strict";return 0===this.length?!1:this.elements[0].classList.contains(t)},e.prototype.addClass=function(t){"use strict";return 1!==this.length&&this.elements.forEach(function(){this.classList.add(t)}),this},e.prototype.removeClass=function(t){"use strict";return 1!==this.length&&this.elements.forEach(function(){this.classList.remove(t)}),this},e.prototype.toggleClass=function(t){"use strict";return 1!==this.length&&this.elements.forEach(function(){this.classList.toggle(t)}),this},e.prototype.find=function(t){"use strict";return 0===this.length?this:s(this.elements[0].querySelectorAll(t))},e.prototype.clone=function(){"use strict";return 0===this.length?this:s(this.elements[0].cloneNode(!0))},e.prototype.remove=function(){"use strict";0===this.length||this.elements[0]instanceof HTMLDocument||(this.each(function(){this.parentNode.removeChild(this)}),this.elements=[],this.length=0)},e.prototype.parent=function(){"use strict";return 0===this.length||this.elements[0]instanceof HTMLDocument?this:s(this.elements[0].parentNode)},e.prototype.next=function(){"use strict";return 0===this.length||this.elements[0]instanceof HTMLDocument?this:s(this.elements[0].nextElementSibling)},e.prototype.prev=function(){"use strict";return 0===this.length||this.elements[0]instanceof HTMLDocument?this:s(this.elements[0].previousElementSibling)},e.prototype.prepend=function(t){"use strict";if(0!==this.length){if(t.length>0){var e=this;s.each(t.elements.reverse(),function(){e.elements[0].insertBefore(this,e.elements[0].firstChild)})}return this}},e.prototype.append=function(t){"use strict";if(0!==this.length){if(t.length>0){var e=this;s.each(t.elements,function(){e.elements[0].appendChild(this)})}return this}},e.prototype.appendTo=function(t){"use strict";return t.append(this),this},e.prototype.prependTo=function(t){"use strict";return t.prepend(this),this},e.prototype.replaceWith=function(t){"use strict";if(0!==this.length&&0!==t.length)return this.elements[0].parentNode.replaceChild(t.elements[0],this.elements[0]),this},e.prototype.closest=function(t){"use strict";if(0!==this.length){if("undefined"==typeof t||0===t.length)return s(this.elements[0].parentNode);var e="."===t.charAt(0)||"#"===t.charAt(0)||"["===t.charAt(0)?t.charAt(0):null;null!==e&&(t=t.substr(1));for(var n=this.elements[0];(n=n.parentNode)&&!(n instanceof HTMLDocument);)if(s.validate(e,t,n))return s(n);return s()}},e.prototype.parents=function(t){"use strict";if(0!==this.length){var e="undefined"==typeof t||0===t.length,n=null;e||("."===t.charAt(0)||"#"===t.charAt(0)||"["===t.charAt(0))&&(n=t.charAt(0),t=t.substr(1));for(var i=this.elements[0],r=[];(i=i.parentNode)&&!(i instanceof HTMLDocument);)(e||s.validate(n,t,i))&&r.push(i);return s(r)}},e.prototype.parentsUntil=function(t){"use strict";if(0!==this.length){if("undefined"==typeof t||0===t.length)return s(this.elements[0].parentNode);var e="."===t.charAt(0)||"#"===t.charAt(0)||"["===t.charAt(0)?t.charAt(0):null;null!==e&&(t=t.substr(1));for(var n=this.elements[0],i=[];(n=n.parentNode)&&!(n instanceof HTMLDocument);)if(i.push(n),s.validate(e,t,n))return s(i);return s()}},n.validate=function(t,e,n){"use strict";if(null===t)return n.tagName.toLowerCase()===e.toLowerCase();if("."===t)return n.classList.contains(e);if("#"===t)return n.id===e;if("["===t){var s=e.substr(0,e.length-1).split("=");return"undefined"==typeof s?n.hasAttribute(s[0]):n.hasAttribute(s[0])&&n.getAttribute(s[0])===s[1]}return!1},n.rand=function(){"use strict";return(Math.random()+1).toString(36).substring(7)},n.extend=function(t,e){"use strict";var n,s={};for(n in t)t.hasOwnProperty(n)&&(s[n]=t[n]);for(n in e)e.hasOwnProperty(n)&&s.hasOwnProperty(n)&&(s[n]=e[n]);return s},n.each=function(t,e){"use strict";var n;if(t instanceof Array||t instanceof NodeList)[].forEach.call(t,function(t,n,s){e.call(t,t,n,s)});else if("undefined"!=typeof t.length)for(n=0;n<t.length;++n)e.call(t[n],t[n],n,t);else for(n in t)t.hasOwnProperty(n)&&e.call(t[n],t[n],n,t)},t.$=s=n}(window);