!function(t){function e(t){"use strict";var e;if(t instanceof HTMLDocument||t instanceof HTMLElement)e=[t];else if("string"==typeof t)e=document.querySelectorAll(t);else{if("object"!=typeof t)throw new Error("No Elements provided");e=[],i.each(t,function(t){(t instanceof HTMLDocument||t instanceof HTMLElement)&&e.push(t)})}this.elements=e,this.length=e.length}function n(t){"use strict";return new e(t)}var i,r={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};e.prototype.each=function(t){"use strict";return i.each(this.elements,t),this},e.prototype.attr=function(t,e){"use strict";if(0!==this.length)return"undefined"==typeof e?this.elements[0].getAttribute(t):(this.each(function(){this.setAttribute(t,e)}),this)},e.prototype.removeAttr=function(t){"use strict";return 0===this.length?this:(this.each(function(){this.removeAttribute(t)}),this)},e.prototype.html=function(t){"use strict";if(0!==this.length)return"undefined"==typeof t?this.elements[0].innerHTML:(this.each(function(){this.innerHTML=t}),this)},e.prototype.text=function(t){"use strict";if(0!==this.length){if("undefined"==typeof t)return this.elements[0].innerHTML.replace(/[&<>"'\/]/g,function(t){return r[t]});var e=t.replace(/[&<>"'\/]/g,function(t){return r[t]});return this.each(function(){this.innerHTML=e}),this}},e.prototype.val=function(t){"use strict";if(0!==this.length)return"undefined"==typeof t?this.elements[0].value:(this.each(function(){this.value=t}),this)},n.rand=function(){"use strict";return(Math.random()+1).toString(36).substring(7)},n.extend=function(t,e){"use strict";var n,i={};for(n in t)t.hasOwnProperty(n)&&(i[n]=t[n]);for(n in e)e.hasOwnProperty(n)&&i.hasOwnProperty(n)&&(i[n]=e[n]);return i},n.each=function(t,e){"use strict";var n;if(t instanceof Array||t instanceof NodeList)[].forEach.call(t,function(t,n,i){e.call(t,t,n,i)});else if("undefined"!=typeof t.length)for(n=0;n<t.length;++n)e.call(t[n],t[n],n,t);else for(n in t)t.hasOwnProperty(n)&&e.call(t[n],t[n],n,t)},t.$=i=n}(window);