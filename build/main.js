(function(d,w,Old$){
  var
    $,
    Element = HTMLElement,
    Document = HTMLDocument,
    Input = HTMLInputElement,
    LeNode = Node,
    LeRegex = /^[A-Za-z]*$/,
    Parser = document.createElement('div'),
    Events = [];
  
                  
                    // Sometimes NodeList... both work the same though
    function dQuery(selector){"use strict";
      if(typeof selector === 'undefined'){
        this.elements = [];
      } else {
        if(selector instanceof Node) {
          this.elements = [selector];
        } else if(selector instanceof NodeList){
          this.elements = selector;
        } else {
          this.elements = $.elements(selector);
        }
      }
      this.length = this.elements.length;
    }
    // Callback-kind-of stuff first
    dQuery.prototype.ready=function(callback)                {"use strict";
      this.on('DOMContentLoaded',callback);
      return this;
    };
    dQuery.prototype.click=function(callback)                {"use strict";
      this.on('click',callback);
      return this;
    };
    dQuery.prototype.submit=function(callback)                {"use strict";
      this.on('submit',callback);
      return this;
    };
    dQuery.prototype.on=function(type       ,b,c)         {"use strict";
      var callback;
      if(arguments.length === 3) {
        callback = function(e){
          if($.validate(b,e.target) || $(e.target).hasParent(b)){
            c.apply(e.target,arguments);
          }
        };
      } else {
        callback = b;
      }
      if(type.indexOf('.') !== -1){
        var name = type;
        type = type.split('.')[0];
        this.each(function(n     ){
          Events.push({node:n,event:callback,name:name});
          n.addEventListener(type, callback,true);
        });
      } else {
        this.each(function(n     ){
          n.addEventListener(type, callback,true);
        });
      }
      return callback;
    };
    dQuery.prototype.off=function(type       ,callback)                {"use strict";
      if(!callback && type.indexOf('.') !== -1){
        var name = type;
        type = type.split('.')[0];
        this.each(function(n            ){
          $.each(Events,function(obj){
            if(obj.name === name && obj.node === n){
              n.removeEventListener(type,obj.event,true);
              Events.splice(Events.indexOf(obj),1);
              return false;
            }
          });
        });
      } else {
        this.each(function(n            ){
          n.removeEventListener(type,callback,true);
        });
      }
      return this;
    };
    dQuery.prototype.trigger=function(type       ,args)              {"use strict";
      var event;
      if(typeof args === 'undefined'){
        event = d.createEvent('HTMLEvents');
        event.initEvent(type, true, false);
      } else {
        event = d.createEvent('CustomEvent');
        event.initCustomEvent(type, true, true, args);
      }
      this.each(function(n     ){
        n.dispatchEvent(event);
      });
    };
    // DOM Accessors
    dQuery.prototype.children=function(Selector)       {"use strict";
      if(!this.length)
        return this;
      if(typeof Selector === 'undefined'){
        return $(this.elements[0].childNodes);
      } else {
        var toReturn = [];
        $.each(this.elements[0].childNodes,function(n            ){
          if($.validate(Selector,n)){
            toReturn.push(n);
          }
        });
        return $(toReturn);
      }
    };
    dQuery.prototype.child=function(Index)       {"use strict"; // Indexes start at 0
      if(!this.length)
        return this;
      return $(this.elements[0].childNodes[Index || 0]);
    };
    dQuery.prototype.eq=function(Index)       {"use strict"; // Indexes start at 0
      if(!this.length)
        return this;
      if(Index >= this.length){
        $.empty(this);
      } else{
        var el = this[Index];
        $.empty(this);
        this.length = 1;
        this[Index] = el;
      }
      return this;
    };
    dQuery.prototype.find=function(selector)              {"use strict";
      if(!this.length)
        return this;
      return $(this.elements[0].querySelectorAll(selector));
    };
    dQuery.prototype.parent=function()       {"use strict";
      if(!this.length || this.elements[0] instanceof Document)
        return this;
      return $(this.elements[0].parentNode);
    };
    dQuery.prototype.next=function()       {"use strict";
      if(!this.length || this.elements[0] instanceof Document)
        return this;
      return $(this.elements[0].nextElementSibling);
    };
    dQuery.prototype.prev=function()       {"use strict";
      if(!this.length || this.elements[0] instanceof Document)
        return this;
      return $(this.elements[0].previousElementSibling);
    };
    dQuery.prototype.closest=function(selector)              {"use strict";
      if(this.length){
        if(!selector || !selector.length)
          return $(this.elements[0].parentNode);
        var el = this.elements[0];
        while(el = el.parentNode){
          if(el instanceof Document){
            break;
          } else {
            if($.validate(selector,el)){
              return $(el);
            }
          }
        }
      }
      return $();
    };
    dQuery.prototype.parents=function(selector)               {"use strict";
      if (!this.length)
        return $();
      var
        skip = (!selector || !selector.length),
        el = this.elements[0],
        elements = [];
      while(el = el.parentNode){
        if(el instanceof Document){
          break;
        } else {
          if(skip || $.validate(selector,el)){
            elements.push(el);
          }
        }
      }
      return $(elements);
    };
    dQuery.prototype.parentsUntil=function(selector)              {"use strict";
      if(this.length){
        if(!selector || !selector.length)
          return $(this.elements[0].parentNode);
        var
          el = this.elements[0],
          elements = [];
        while(el = el.parentNode){
          if(el instanceof Document){
            break;
          } else {
            elements.push(el);
            if($.validate(selector,el)){
              return $(elements);
            }
          }
        }
      }
      return $();
    };
    dQuery.prototype.first=function(){"use strict";
      if(this.length){
        return $(this.elements[0]);
      } else {
        return this;
      }
    };
    dQuery.prototype.last=function(){"use strict";
      if(this.length){
        return $(this[this.length-1]);
      }
      return this;
    };
    // DOM Operations
    dQuery.prototype.each=function(Callback)                {"use strict";
      $.each(this,Callback);
      return this;
    };
    dQuery.prototype.eachElement=function(Callback)                {"use strict";
      $.each(this,function(n     ){
        if(n instanceof Element){
          return Callback.apply(this,arguments);
        }
      });
    };
    // DOM Manipulation
    dQuery.prototype.addClass=function(name)       {"use strict";
      if(this.length !== 0){
        this.eachElement(function(n            ){
          n.classList.add(name);
        });
      }
      return this;
    };
    dQuery.prototype.removeClass=function(name)              {"use strict";
      if(this.length !== 0){
        this.eachElement(function(n            ){
          n.classList.remove(name);
        });
      }
      return this;
    };
    dQuery.prototype.toggleClass=function(name)              {"use strict";
      if(this.length){
        this.eachElement(function(n            ){
          n.classList.toggle(name);
        });
      }
      return this;
    };
    dQuery.prototype.clone=function()       {"use strict";
      if(!this.length)
        return this;
      return $(this.elements[0].cloneNode(true));
    };
    dQuery.prototype.remove=function()     {"use strict";
      if(!this.length || this.elements[0] instanceof Document)
        return ;
      this.each(function(n            ){
        n.parentNode.removeChild(n);
      });
      $.empty(this);
    };
    dQuery.prototype.prepend=function(object)       {"use strict";
      if(this.length){
        var target = this.elements[0];
        $.each($.elements(object).reverse(),function(n            ){
          target.insertBefore(n,target.firstChild);
        });
      }
      return this;
    };
    dQuery.prototype.append=function(object)       {"use strict";
      if(object.length && this.length){
        var element = this.elements[0];
        $.each($.elements(object).reverse(),function(n            ){
          element.appendChild(n);
        })
      }
      return this;
    };
    dQuery.prototype.appendTo=function(object)       {"use strict";
      if(this.length){
        $.each($.elements(object),function(n            ){
          $.each(this.elements.reverse(),function(nn            ){
            n.appendChild(nn);
          });
        }.bind(this));
      }
      return this;
    };
    dQuery.prototype.prependTo=function(object)       {"use strict";
      if(this.length){
        $.each($.elements(object),function(n            ){
          $.each(this.elements.reverse(),function(nn            ){
            n.insertBefore(nn,n.firstChild);
          });
        }.bind(this));
      }
      return this;
    };
    dQuery.prototype.insertBefore=function(element)       {"use strict";
      var el = $.elements(element);
      if(el.length && this.length && !(el[0] instanceof Document)){
        $.each(this.elements.reverse(),function(n            ){
          el[0].parentNode.insertBefore(n,el[0]);
        });
      }
      return this;
    };
    dQuery.prototype.insertAfter=function(element)       {"use strict";
      var el = $.elements(element);
      if(el.length && this.length && !(el[0] instanceof Document)){
        $.each(this.elements.reverse(),function(n            ){
          el[0].parentNode.insertBefore(n,el[0].nextSibling);
        });
      }
      return this;
    };
    dQuery.prototype.replaceWith=function(object)       {"use strict";
      if(!this.length) return this;
      var elements = $.elements(object);
      if(elements.length > 0){
        this.elements[0].parentNode.replaceChild(elements[0],this.elements[0]);
      }
      return this;
    };
    dQuery.prototype.focus=function()       {"use strict";
      this.eachElement(function(n            ){
        return n.focus() && false; // Always false to break the Loop, Yo!
      });
      return this;
    };
    dQuery.prototype.contains=function(object)        {"use strict";
      var el = $.elements(object);
      return this.length && object.length &&
        this.elements[0] !== el[0] &&
        this.elements[0].contains(el[0]);
    };
    dQuery.prototype.empty=function()     {"use strict";
      if(this.length){
        this.each(function(n            ){
          n.textContent = ''; // works for both text nodes & html nodes
        });
      }
    };
    // Boolean Stuff
    dQuery.prototype.hasClass=function(name)               {"use strict";
      return this.length && this.elements[0].classList.contains(name);
    };
    dQuery.prototype.hasParent=function(selector)               {"use strict";
      return this.length && this.closest(selector).length > 0;
    };
    // Juicy Stuff
    dQuery.prototype.attr=function(name       ,value)       {"use strict";
      if(!this.length)
        return ;
      if(arguments.length === 1){
        return this.elements[0].getAttribute(name);
      } else {
        this.eachElement(function(n            ){
          n.setAttribute(name,value);
        });
        return this;
      }
    };
    dQuery.prototype.removeAttr=function(name)              {"use strict";
      if(this.length){
        this.eachElement(function(n            ){
          n.removeAttribute(name);
        });
      }
      return this;
    };
    dQuery.prototype.html=function(text)       {"use strict"; // Yep, no support for text nodes in .html, use .text instead
      if(this.length === 0)
        return ;
      if(arguments.length === 0){
        var html;
        this.eachElement(function(n            ){
          html = n.innerHTML;
          return false;
        });
        return html;
      } else {
        this.eachElement(function(n            ){
          n.innerHTML = text;
        });
      }
      return this;
    };
    dQuery.prototype.text=function(text)       {"use strict";
      if(!this.length)
        return ;
      if(arguments.length === 0){
        return this.elements[0].textContent
      } else {
        this.each(function(n            ){
          n.textContent = text;
        });
      }
      return this;
    };
    dQuery.prototype.val=function(text)       {"use strict";
      if(!this.length)
        return ;
      if(arguments.length === 0){
        var val;
        this.eachElement(function(n            ){
          if(n instanceof Input || n.tagName === 'TEXTAREA'){
            val = n.value;
            return false;
          }
        });
        return val;
      } else {
        this.eachElement(function(n            ){
          if(n instanceof Input || n.tagName === 'TEXTAREA'){
            n.value = text;
          }
        });
      }
      return this;
    };
    dQuery.prototype.serializeAssoc=function()       {"use strict";
      if(this.length === 0)
        return {};
      var
        BRFix = /\r?\n/g,
        toReturn = {};
      $.each(this.elements[0].elements,function(n){
        if(n.name){
          if((n.type === 'checkbox' || n.type === 'radio') && !n.checked){
            return ;
          }
          toReturn[n.name] = n.value.replace(BRFix, "\n");
        }
      });
      return toReturn;
    };
    dQuery.prototype.serialize=function()       {"use strict";
      if(this.length === 0)
        return '';
      return $.serialize(this.serializeAssoc());
    };
  
  
    function LeDollar(args){"use strict";
      if(typeof args === 'string'){
        var
          first = args.substr(0,1),
          rest = args.substr(1);
        if(first === '#' && LeRegex.test(rest)){
          return new dQuery(d.getElementById(rest));
        } else if(first === '.' && LeRegex.test(rest)) {
          return new dQuery(d.getElementsByClassName(rest));
        } else if(LeRegex.test(rest)){
          return new dQuery(d.getElementsByTagName(rest))
        }
      } else if(args instanceof dQuery){
        return args
      }
      return new dQuery(args);
    }
    LeDollar.serialize=function(Array)       {"use strict";
      var data = [],spaceFix = /%20/g;
      $.each(Array,function(value       ,key       ){
        data.push((key+'='+value).replace(spaceFix,'+'));
      });
      return data.join('&');
    };
    LeDollar.empty=function(object){"use strict";
      var i;
      if(typeof object.length !== 'undefined'){
        for(i = 0 ; i < object.length; ++i){
          delete object[i];
        }
        object.length = 0;
      } else if(object instanceof Array){
        object = [];
      } else {
        for(i in object){
          if(object.hasOwnProperty(i)){
            delete object[i];
          }
        }
      }
    };
    LeDollar.each=function(object,callback){"use strict";
      var i, ret;
      if(!object) return ;
      try{
        if(object instanceof Array || object instanceof NodeList || typeof object.length !== 'undefined'){
          Array.prototype.forEach.call(object,function(element,index,array){
            if(callback.call(element,element,index,array) === false)
              throw null;
          });
        } else {
          for(i in object){
            if(object.hasOwnProperty(i)){
              if(callback.call(object[i],object[i],i,object) === false)
                break;
            }
          }
        }
      } catch(e){}
    };
    LeDollar.elements=function(object, trim)        {"use strict";
      var
        toReturn = [],
        constructor;
      if(object === null) {
        return toReturn;
      }
      if(typeof object === 'string'){
        if(trim){
          object = object.trim();
        }
        if(object.substr(0,1) === '<'){
          toReturn = $.fromHTML(object);
        }
      } else if(typeof object === 'object'){
        constructor = object.constructor.name;
        if(constructor === 'dQuery'){
          return object.elements;
        } else if(constructor === 'Array' || constructor === 'NodeList'){
          object.forEach(function(n     ){
            if(n.constructor.name === 'Node'){
              toReturn.push(n);
            }
          });
        } else if(typeof object.length !== 'undefined'){
          Array.prototype.forEach.call(object,function(n     ){
            if(n.constructor.name === 'Node'){
              toReturn.push(n);
            }
          });
        } else if(object instanceof Node){
          toReturn.push(object);
        }
      }
      return toReturn;
    };
    LeDollar.validate=function(Selector       ,el)                    {"use strict";
      return (el instanceof Element || el instanceof Document) && (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, Selector);
    };
    LeDollar.rand=function()       {"use strict";
      return (Math.random() + 1).toString(36).substring(7)
    };
    LeDollar.extend=function(out) {"use strict";
      out = out || {};
      $.each(Array.prototype.slice.call(arguments,1),function(obj){
        $.each(obj,function(val,key){
          if(typeof val === 'object' && val !== null){
            out[key] = out[key] || {};
            $.extend(out[key],val);
          } else {
            out[key] = val;
          }
        });
      });
      return out;
    };;
    LeDollar.fromHTML=function(html)             {"use strict";
      var toReturn = [];
      Parser.innerHTML = html;
      $.each(Parser.childNodes,function(n            ){
        toReturn.push(n.cloneNode(true));
      });
      Parser.innerHTML = '';
      return toReturn;
    };
    LeDollar.noConflict=function(){"use strict";
      w.$ = Old$;
      return dQuery;
    };
    // Ajax Stuff
    LeDollar.ajax=function(Opts){"use strict";
      return new Promise(function(resolve,reject){
        Opts = $.extend({},$.ajaxDefaults,Opts);
        Opts.data = (Opts.data instanceof FormData) ? Opts.data : $.serialize(Opts.data);
        var XHR = new XMLHttpRequest();
        XHR.open(Opts.type,Opts.url,true);
        if(Opts.beforeSend(XHR,Opts) === false){
          return reject();
        }
        if(Opts.withCredentials){
          XHR.withCredentials = true;
        }
        if(Opts.contentType){
          XHR.setRequestHeader("Content-Type",Opts.contentType);
        }
        XHR.onload = function(){
          if (XHR.status >= 200 && XHR.status < 400) {
            // Success!
            if(Opts.dataType.toUpperCase() === 'JSON'){
              resolve(JSON.parse(XHR.responseText),XHR);
            } else {
              resolve(XHR.responseText,XHR);
            }
          } else {
            reject(XHR);
          }
        };
        XHR.onerror = function(){
          reject(XHR);
        };
        XHR.send(Opts.data);
      });
    };
    LeDollar.get=function(url,Opts){"use strict";
      Opts = Opts || {};
      if(url)
        Opts.url = url;
      return $.ajax(Opts);
    };
    LeDollar.getJSON=function(url,Data){"use strict";
      var Opts = {};
      if(Data)
        Opts.data = data;
      if(url)
        Opts.url = url;
      Opts.dataType = 'JSON';
      return $.ajax(Opts);
    };
    LeDollar.post=function(url,Data){"use strict";
      var Opts = {};
      if(Data)
        Opts.data = data;
      if(url)
        Opts.url = url;
      Opts.type = 'POST';
      return $.ajax(Opts);
    };
    LeDollar.postJSON=function(url,Data){"use strict";
      var Opts = {};
      if(Data)
        Opts.data = data;
      if(url)
        Opts.url = url;
      Opts.type = 'POST';
      Opts.dataType = 'JSON';
      return $.ajax(Opts);
    };
  
  LeDollar.fn = dQuery.prototype;
  LeDollar.ajaxDefaults = {
    type:"GET",
    contentType:'application/x-www-form-urlencoded', // set to null to disable
    url: w.location.href,
    data: {},
    dataType: 'text',
    beforeSend:function(xhr,opts){},
    withCredentials:false
  };
  $ = w.$ = w.dQuery = LeDollar;
  $.each(Object.getOwnPropertyNames(Array.prototype),function(n){
    if(n !== 'length'){
      NodeList.prototype[n] = Array.prototype[n];
    }
  });
})(document,window,window.$);