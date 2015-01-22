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
  class dQuery{
    elements:Array;
    length:Number;
    constructor(selector){
      var elements = [];
      if(selector instanceof LeNode){
        elements.push(selector);
      } else if(typeof selector === 'string'){
        selector = selector.trim();
        if(selector.substr(0,1) === '<'){
          elements = $.fromHTML(selector);
        } else {
          elements = $.elements(d.querySelectorAll(selector));
        }
      } else if(typeof selector === 'object'){
        elements = $.elements(selector);
      }
      this.elements = elements;
      this.length = elements.length;
    }
    // Callback-kind-of stuff first
    ready(callback:Function):dQuery{
      this.on('DOMContentLoaded',callback);
      return this;
    }
    click(callback:Function):dQuery{
      this.on('click',callback);
      return this;
    }
    submit(callback:Function):dQuery{
      this.on('submit',callback);
      return this;
    }
    on(type:String,b,c):Function{
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
        this.each(function(n:Node){
          Events.push({node:n,event:callback,name:name});
          n.addEventListener(type, callback,true);
        });
      } else {
        this.each(function(n:Node){
          n.addEventListener(type, callback,true);
        });
      }
      return callback;
    }
    off(type:String,callback:Function):dQuery{
      if(!callback && type.indexOf('.') !== -1){
        var name = type;
        type = type.split('.')[0];
        this.each(function(n:HTMLElement){
          $.each(Events,function(obj){
            if(obj.name === name && obj.node === n){
              n.removeEventListener(type,obj.event,true);
              Events.splice(Events.indexOf(obj),1);
              return false;
            }
          });
        });
      } else {
        this.each(function(n:HTMLElement){
          n.removeEventListener(type,callback,true);
        });
      }
      return this;
    }
    trigger(type:String,args:Object):dQuery{
      var event;
      if(typeof args === 'undefined'){
        event = d.createEvent('HTMLEvents');
        event.initEvent(type, true, false);
      } else {
        event = d.createEvent('CustomEvent');
        event.initCustomEvent(type, true, true, args);
      }
      this.each(function(n:Node){
        n.dispatchEvent(event);
      });
    }
    // DOM Accessors
    children(Selector:String){
      if(!this.length)
        return this;
      if(typeof Selector === 'undefined'){
        return $(this.elements[0].childNodes);
      } else {
        var toReturn = [];
        $.each(this.elements[0].childNodes,function(n:HTMLElement){
          if($.validate(Selector,n)){
            toReturn.push(n);
          }
        });
        return $(toReturn);
      }
    }
    child(Index:Number){ // Indexes start at 0
      if(!this.length)
        return this;
      return $(this.elements[0].childNodes[Index || 0]);
    }
    eq(Index:Number){ // Indexes start at 0
      if(!this.length)
        return this;
      this.elements =
        this.elements[Index]
        ? [this.elements[Index]]
        : [];
      this.length = this.elements.length;
      return this;
    }
    find(selector:String):dQuery{
      if(!this.length)
        return this;
      return $(this.elements[0].querySelectorAll(selector));
    }
    parent():dQuery{
      if(!this.length || this.elements[0] instanceof Document)
        return this;
      return $(this.elements[0].parentNode);
    }
    next():dQuery{
      if(!this.length || this.elements[0] instanceof Document)
        return this;
      return $(this.elements[0].nextElementSibling);
    }
    prev():dQuery{
      if(!this.length || this.elements[0] instanceof Document)
        return this;
      return $(this.elements[0].previousElementSibling);
    }
    closest(selector:String):dQuery{
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
    }
    parents(selector:String):dQuery {
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
    }
    parentsUntil(selector:String):dQuery{
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
    }
    first(){
      if(this.length){
        return $(this.elements[0]);
      } else {
        return this;
      }
    }
    last(){
      if(this.length){
        return $(this.elements[this.length-1]);
      }
      return this;
    }
    // DOM Operations
    each(Callback:Function):dQuery{
      $.each(this.elements,Callback);
      return this;
    }
    eachElement(Callback:Function):dQuery{
      $.each(this.elements,function(n:Node){
        if(n instanceof Element){
          return Callback.apply(this,arguments);
        }
      });
    }
    // DOM Manipulation
    addClass(name:String){
      if(this.length !== 0){
        this.eachElement(function(n:HTMLElement){
          n.classList.add(name);
        });
      }
      return this;
    }
    removeClass(name:String):dQuery{
      if(this.length !== 0){
        this.eachElement(function(n:HTMLElement){
          n.classList.remove(name);
        });
      }
      return this;
    }
    toggleClass(name:String):dQuery{
      if(this.length){
        this.eachElement(function(n:HTMLElement){
          n.classList.toggle(name);
        });
      }
      return this;
    }
    clone():dQuery{
      if(!this.length)
        return this;
      return $(this.elements[0].cloneNode(true));
    }
    remove():void{
      if(!this.length || this.elements[0] instanceof Document)
        return ;
      this.each(function(n:HTMLElement){
        n.parentNode.removeChild(n);
      });
      this.elements = [];
      this.length = 0;
    }
    prepend(object):dQuery{
      if(this.length){
        var target = this.elements[0];
        $.each($.elements(object).reverse(),function(n:HTMLElement){
          target.insertBefore(n,target.firstChild);
        });
      }
      return this;
    }
    append(object):dQuery{
      if(object.length && this.length){
        var element = this.elements[0];
        $.each($.elements(object).reverse(),function(n:HTMLElement){
          element.appendChild(n);
        })
      }
      return this;
    }
    appendTo(object):dQuery{
      if(this.length){
        $.each($.elements(object),function(n:HTMLElement){
          $.each(this.elements.reverse(),function(nn:HTMLElement){
            n.appendChild(nn);
          });
        }.bind(this));
      }
      return this;
    }
    prependTo(object):dQuery{
      if(this.length){
        $.each($.elements(object),function(n:HTMLElement){
          $.each(this.elements.reverse(),function(nn:HTMLElement){
            n.insertBefore(nn,n.firstChild);
          });
        }.bind(this));
      }
      return this;
    }
    insertBefore(element):dQuery{
      var el = $.elements(element);
      if(el.length && this.length && !el[0] instanceof Document){
        $.each(this.elements.reverse(),function(n:HTMLElement){
          el[0].parentNode.insertBefore(n,el[0]);
        });
      }
      return this;
    }
    insertAfter(element):dQuery{
      var el = $.elements(element);
      if(el.length && this.length && !el[0] instanceof Document){
        $.each(this.elements.reverse(),function(n:HTMLElement){
          el[0].parentNode.insertBefore(n,el[0].nextSibling);
        });
      }
      return this;
    }
    replaceWith(object):dQuery{
      if(!this.length) return this;
      var elements = $.elements(object);
      if(elements.length > 0){
        this.elements[0].parentNode.replaceChild(elements[0],this.elements[0]);
      }
      return this;
    }
    focus():dQuery{
      this.eachElement(function(n:HTMLElement){
        return n.focus() && false; // Always false to break the Loop, Yo!
      });
      return this;
    }
    contains(object):Boolean{
      var el = $.elements(object);
      return this.length && object.length &&
        this.elements[0] !== el[0] &&
        this.elements[0].contains(el[0]);
    }
    empty():void{
      if(this.length){
        this.each(function(n:HTMLElement){
          n.textContent = ''; // works for both text nodes & html nodes
        });
      }
    }
    // Boolean Stuff
    hasClass(name:String):Boolean{
      return this.length && this.elements[0].classList.contains(name);
    }
    hasParent(selector:String):Boolean{
      return this.length && this.closest(selector).length > 0;
    }
    // Juicy Stuff
    attr(name:String,value:String){
      if(!this.length)
        return ;
      if(arguments.length === 1){
        return this.elements[0].getAttribute(name);
      } else {
        this.eachElement(function(n:HTMLElement){
          n.setAttribute(name,value);
        });
        return this;
      }
    }
    removeAttr(name:String):dQuery{
      if(this.length){
        this.eachElement(function(n:HTMLElement){
          n.removeAttribute(name);
        });
      }
      return this;
    }
    html(text:String){ // Yep, no support for text nodes in .html, use .text instead
      if(this.length === 0)
        return ;
      if(arguments.length === 0){
        var html;
        this.eachElement(function(n:HTMLElement){
          html = n.innerHTML;
          return false;
        });
        return html;
      } else {
        this.eachElement(function(n:HTMLElement){
          n.innerHTML = text;
        });
      }
      return this;
    }
    text(text:String){
      if(!this.length)
        return ;
      if(arguments.length === 0){
        return this.elements[0].textContent
      } else {
        this.each(function(n:HTMLElement){
          n.textContent = text;
        });
      }
      return this;
    }
    val(text:String){
      if(!this.length)
        return ;
      if(arguments.length === 0){
        var val;
        this.eachElement(function(n:HTMLElement){
          if(n instanceof Input) {
            val = n.value;
            return false;
          }
        });
        return val;
      } else {
        this.eachElement(function(n:HTMLElement){
          if(n instanceof Input){
            n.value = text;
          }
        });
      }
      return this;
    }
    serializeAssoc():Object{
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
    }
    serialize(Array):String{
      if(this.length === 0)
        return '';
      return $.serialize(this.serializeAssoc());
    }
  }
  class LeDollar{
    static constructor(args){
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
      }
      return new dQuery(args);
    }
    static serialize(Array):String{
      var data = [],spaceFix = /%20/g;
      $.each(Array,function(value:String,key:String){
        data.push((key+'='+value).replace(spaceFix,'+'));
      });
      return data.join('&');
    }
    static each(object,callback){
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
    }
    static elements(object, trim = true):Array{
      var toReturn = [];
      if(object instanceof dQuery){
        toReturn = object.elements;
      } else if(object instanceof Array || object instanceof NodeList) {
        $.each(object,function(n:HTMLElement){
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
    }
    static validate(Selector:String,el:HTMLElement):Boolean{
      return (el instanceof Element || el instanceof Document) && (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, Selector);
    }
    static rand():String{
      return (Math.random() + 1).toString(36).substring(7)
    }
    static extend(out) {
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
    };
    static fromHTML(html:String):Array{
      var toReturn = [];
      Parser.innerHTML = html;
      $.each(Parser.childNodes,function(n:HTMLElement){
        toReturn.push(n.cloneNode(true));
      });
      Parser.innerHTML = '';
      return toReturn;
    }
    static noConflict(){
      w.$ = Old$;
      return dQuery;
    }
    // Ajax Stuff
    static ajax(Opts){
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
    }
    static get(url,Opts){
      Opts = Opts || {};
      if(url)
        Opts.url = url;
      return $.ajax(Opts);
    }
    static getJSON(url,Data){
      var Opts = {};
      if(Data)
        Opts.data = data;
      if(url)
        Opts.url = url;
      Opts.dataType = 'JSON';
      return $.ajax(Opts);
    }
    static post(url,Data){
      var Opts = {};
      if(Data)
        Opts.data = data;
      if(url)
        Opts.url = url;
      Opts.type = 'POST';
      return $.ajax(Opts);
    }
    static postJSON(url,Data){
      var Opts = {};
      if(Data)
        Opts.data = data;
      if(url)
        Opts.url = url;
      Opts.type = 'POST';
      Opts.dataType = 'JSON';
      return $.ajax(Opts);
    }
  }
  LeDollar.fn = {};
  LeDollar.ajaxDefaults = {
    type:"GET",
    contentType:'application/x-www-form-urlencoded', // set to null to disable
    url: w.location.href,
    data: {},
    dataType: 'text',
    beforeSend:function(xhr,opts){},
    withCredentials:false
  };
  Object.observe(LeDollar.fn,function(changes){
    $.each(changes[0].object,function(callback,name){
      dQuery.prototype[name] = callback;
    });
  });
  $ = w.$ = w.dQuery = LeDollar;
})(document,window,window.$);