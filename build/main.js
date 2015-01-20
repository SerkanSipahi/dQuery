(function(d,w,Old$){
  var
    $,
    Element = HTMLElement,
    Document = HTMLDocument,
    Input = HTMLInputElement,
    LeNode = Node,
    LeRegex = /^[A-Za-z]+[\w\-:]*$/,
    Parser = document.createElement('div'),
    Events = [];
  
                   
                  
    function dQuery(selector){"use strict";
      var elements = [];
      if(selector instanceof LeNode){
        elements.push(selector);
      } else if(typeof selector === 'string'){
        selector = selector.trim();
        if(selector.substr(0,1) === '<'){
          elements = $.fromHTML(selector);
        } else {
          // Converting from NodeList to Array, dQuery/dQuery#17
          $.each(d.querySelectorAll(selector),function(n     ){
            elements.push(n);
          });
        }
      } else if(typeof selector === 'object'){
        elements = $.elements(selector);
      }
      this.elements = elements;
      this.length = elements.length;
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
          var target = $(e.target);
          if($.validate(b,target) || $(target).hasParent(b)){
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
      this.elements =
        this.elements[Index]
        ? [this.elements[Index]]
        : [];
      this.length = this.elements.length;
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
        return $(this.elements[this.length-1]);
      }
      return this;
    };
    // DOM Operations
    dQuery.prototype.each=function(Callback)                {"use strict";
      $.each(this.elements,Callback);
      return this;
    };
    dQuery.prototype.eachElement=function(Callback)                {"use strict";
      $.each(this.elements,function(n     ){
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
      this.elements = [];
      this.length = 0;
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
      if(el.length && this.length && !el[0] instanceof Document){
        $.each(this.elements.reverse(),function(n            ){
          el[0].parentNode.insertBefore(n,el[0]);
        });
      }
      return this;
    };
    dQuery.prototype.insertAfter=function(element)       {"use strict";
      var el = $.elements(element);
      if(el.length && this.length && !el[0] instanceof Document){
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
          if(n instanceof Input) {
            val = n.value;
            return false;
          }
        });
        return val;
      } else {
        this.eachElement(function(n            ){
          if(n instanceof Input){
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
      $.each(this.elements[0].elements,function(){
        if(this.name){
          if((this.type === 'checkbox' || this.type === 'radio') && !this.checked){
            return ;
          }
          toReturn[this.name] = this.value.replace(BRFix, "\n");
        }
      });
      return toReturn;
    };
    dQuery.prototype.serialize=function(Array)       {"use strict";
      if(this.length === 0)
        return '';
      var data = [],spaceFix = /%20/g;
      $.each(Array || this.serializeAssoc(),function(value       ,key       ){
        data.push((key+'='+value).replace(spaceFix,'+'));
      });
      return data.join('&');
    };
  
  
    function LeDollar(selector){"use strict";
      return new dQuery(selector);
    }
    LeDollar.each=function(object,callback){"use strict";
      var i, ret;
      if(!object) return ;
      try{
        if(object instanceof Array || object instanceof NodeList){
          Array.prototype.forEach.call(object,function(element,index,array){
            if(callback.call(element,element,index,array) === false)
              throw null;
          });
        } else if(typeof object.length !== 'undefined'){
          for(i=0;i<object.length;++i){
            if(callback.call(object[i],object[i],i,object) === false)
              break;
          }
        } else {
          for(i in object){
            if(object.hasOwnProperty(i)){
              if(callback.call(object[i],object[i],i,object) === false)
                break;
            }
          }
        }
      } catch(e){

      }
    };
    LeDollar.elements=function(object, trim)        {"use strict";
      var toReturn = [];
      if(object instanceof dQuery){
        toReturn = object.elements;
      } else if(object instanceof Array || object instanceof NodeList) {
        $.each(object,function(n            ){
          if(n instanceof Node){
            toReturn.push(n);
          }
        });
      } else if(object instanceof Node){
        toReturn.push(object);
      } else if(typeof object === 'string'){
        if(trim){
          object = object.trim();
        }
        if(object.substr(0,1) === '<'){
          toReturn = $.fromHTML(object);
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
      $.each(arguments,function(obj){
        $.each(obj,function(val,key){
          if(typeof val === 'object'){
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
  
  LeDollar.fn = {};
  Object.observe(LeDollar.fn,function(changes){
    $.each(changes[0].object,function(callback,name){
      dQuery.prototype[name] = callback;
    });
  });
  $ = w.$ = w.dQuery = LeDollar;
})(document,window,window.$);