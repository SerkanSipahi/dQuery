(function(w,d){
  var
    $ ,
    Element = HTMLElement ,
    Document = HTMLDocument,
    $$ = function(){
      return d.querySelector.apply(d,arguments);
    },
    regexID = /^[A-Za-z]+[\w-:.]*$/,
    Parser = document.createElement('div');
  class dQuery{
    elements:Array;
    length:Number;
    constructor(selector){
      var elements = [];
      if(selector instanceof Document || selector instanceof Element){
        elements.push(selector);
      } else if(typeof selector === 'string'){
        if(selector.trim().substr(0,1) === '<'){
          elements = $.fromHTML(selector);
        } else {
          elements = d.querySelectorAll(selector);
        }
      } else if(typeof selector === 'object'){
        elements = $.elements(selector);
      }
      this.elements = elements;
      this.length = elements.length;
    }
    ready(callback:Function):dQuery{
      this.on('DOMContentLoaded',callback);
      return this;
    }
    children(Selector:String):dQuery{
      if(this.length === 0) return this;
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
    click(Callback:Function):dQuery{
      return this.on('click',Callback);
    }
    submit(Callback:Function):dQuery{
      return this.on('submit',Callback);
    }
    focus():dQuery{
      var el = this.elements;
      if(this.length > 0){
        for(var i in el){
          if(el.hasOwnProperty(i) && [i] instanceof Element || el[i] instanceof Document){
            el[i].focus();
            break;
          }
        }
      }
      return this;
    }
    child(Number:Number):dQuery{
      if(this.length === 0)
        return this;
      if(typeof Number === 'undefined'){
        Number = 1;
      }
      --Number;
      var target = this.elements[0].childNodes[Number];
      if(typeof target === 'undefined'){
        return $();
      } else {
        return $(target);
      }
    }
    on(type:String,b,c):Function{
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
      this.each(function(n:HTMLElement){
        n.addEventListener(type, callback,true);
      });
      return callback;
    }
    off(type:String,callback:Function):dQuery{
      this.each(function(n:HTMLElement){
        n.removeEventListener(type,callback,true);
      });
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
      this.each(function(){
        this.dispatchEvent(event);
      });
      return this;
    }
    contains(object:dQuery):Boolean{
      if(this.length === 0 || object.length === 0)
        return false;
      return this.elements[0] !== object.elements[0] && this.elements[0].contains(object.elements[0]);
    }
    empty():void{
      if(this.elements.length !== 0){
        this.each(function(n:HTMLElement){
          n.innerHTML = '';
        });
      }
    }
    is(object):Boolean{
      if(this.length === 0 || object.length === 0)
        return false;
      if(object instanceof dQuery){
        return this.elements[0] === object.elements[0];
      } else {
        return $.validate(object,this.elements[0]);
      }
    }
    each(callback:Function):dQuery{
      $.each(this.elements,callback);
      return this;
    }
    attr(name:String,value:String){
      if(this.length === 0)
        return ;
      if(typeof value === 'undefined'){
        return this.elements[0].getAttribute(name);
      } else {
        this.each(function(n:HTMLElement){
          n.setAttribute(name,value);
        });
        return this;
      }
    }
    removeAttr(name:String):dQuery{
      if(this.length !== 0){
        this.each(function(n:HTMLElement){
          n.removeAttribute(name);
        });
      }
      return this;
    }
    html(text:String){
      if(this.length === 0)
        return ;
      if(typeof text === 'undefined'){
        return this.elements[0].innerHTML;
      } else {
        this.each(function(n:HTMLElement){
          n.innerHTML = text;
        });
      }
      return this;
    }
    text(text:String){
      if(this.length === 0)
        return ;
      if(typeof text === 'undefined'){
        return this.elements[0].textContent
      } else {
        this.each(function(n:HTMLElement){
          n.textContent = text;
        });
      }
      return this;
    }
    val(text:String){
      if(this.length === 0)
        return ;
      if(typeof text === 'undefined'){
        return this.elements[0].value;
      } else {
        this.each(function(n:HTMLInputElement){
          n.value = text;
        });
      }
      return this;
    }
    first(){
      if(this.length > 1){
        return $(this.elements[0]);
      } else {
        return this;
      }
    }
    last(){
      if(this.length > 1){
        return $(this.elements[this.length-1]);
      }
      return this;
    }
    hasClass(name:String):Boolean{
      if(this.length === 0)
        return false;
      return this.elements[0].classList.contains(name);
    }
    addClass(name:String){
      if(this.length !== 1){
        this.each(function(n:HTMLElement){
          n.classList.add(name);
        });
      }
      return this;
    }
    removeClass(name:String):dQuery{
      if(this.length !== 1){
        this.each(function(n:HTMLElement){
          n.classList.remove(name);
        });
      }
      return this;
    }
    toggleClass(name:String):dQuery{
      if(this.length !== 1){
        this.each(function(n:HTMLElement){
          n.classList.toggle(name);
        });
      }
      return this;
    }
    find(selector:String):dQuery{
      if(this.length === 0)return this;
      return $(this.elements[0].querySelectorAll(selector));
    }
    clone():dQuery{
      if(this.length === 0)
        return this;
      return $(this.elements[0].cloneNode(true));
    }
    remove():void{
      if(this.length === 0 || this.elements[0] instanceof Document)
        return ;
      this.each(function(n:HTMLElement){
        n.parentNode.removeChild(n);
      });
      this.elements = [];
      this.length = 0;
    }
    parent():dQuery{
      if(this.length === 0 || this.elements[0] instanceof Document)
        return this;
      return $(this.elements[0].parentNode);
    }
    next():dQuery{
      if(this.length === 0 || this.elements[0] instanceof Document)
        return this;
      return $(this.elements[0].nextElementSibling);
    }
    prev():dQuery{
      if(this.length === 0 || this.elements[0] instanceof Document)
        return this;
      return $(this.elements[0].previousElementSibling);
    }
    prepend(object):dQuery{
      if(this.length > 0){
        var target = this.elements[0];
        $.each($.elements(object).reverse(),function(n:HTMLElement){
          target.insertBefore(n,target.firstChild);
        });
      }
      return this;
    }
    append(object):dQuery{
      if(object.length > 0 && this.length > 0){
        var element = this.elements[0];
        $.each($.elements(object).reverse(),function(n:HTMLElement){
          element.appendChild(n);
        })
      }
      return this;
    }
    appendTo(object):dQuery{
      if(this.length > 0){
        $.each($.elements(object),function(n:HTMLElement){
          $.each(this.elements.reverse(),function(nn:HTMLElement){
            n.appendChild(nn);
          });
        }.bind(this));
      }
      return this;
    }
    prependTo(object):dQuery{
      if(this.length > 0){
        $.each($.elements(object),function(n:HTMLElement){
          $.each(this.elements.reverse(),function(nn:HTMLElement){
            n.insertBefore(nn,n.firstChild);
          });
        }.bind(this));
      }
      return this;
    }
    replaceWith(object):dQuery{
      if(this.length === 0) return this;
      var elements = $.elements(object);
      if(elements.length > 0){
        this.elements[0].parentNode.replaceChild(elements[0],this.elements[0]);
      }
      return this;
    }
    closest(selector:String):dQuery{
      if(this.length === 0) return $();
      if(typeof selector === 'undefined' || selector.length === 0)
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
      return $();
    }
    parents(selector:String):dQuery {
      if (this.length === 0) return $();
      var
        skip = (typeof selector === 'undefined' || selector.length === 0),
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
      if(this.length === 0) return $();
      if(typeof selector === 'undefined' || selector.length === 0)
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
      return $();
    }
    hasParent(selector:String):Boolean{
      if(this.length === 0)
        return false;
      return this.closest(selector).length > 0;
    }
    serializeAssoc():Object{
      if(this.length === 0)
        return {};
      var
        self = this.elements[0],
        BRFix = /\r?\n/g,
        toReturn = {};
      $.each(self.elements,function(){
        if(!(!this.name || ((this.type === 'checkbox' || this.type === 'radio') && !this.checked))) {
          toReturn[this.name] = this.value.replace(BRFix, "\n");
        }
      });
      return toReturn;
    }
    insertBefore(element):dQuery{
      var el = $.elements(element);
      if(el.length > 0 && this.length > 0){
        $.each(this.elements.reverse(),function(n:HTMLElement){
          el[0].parentNode.insertBefore(n,el[0]);
        });
      }
      return this;
    }
    insertAfter(element):dQuery{
      var el = $.elements(element);
      if(el.length > 0 && this.length > 0){
        $.each(this.elements.reverse(),function(n:HTMLElement){
          el[0].parentNode.insertBefore(n,el[0].nextSibling);
        });
      }
      return this;
    }
    serialize():String{
      if(this.length === 0)
        return '';
      var data = [],spaceFix = /%20/g;
      $.each(this.serializeAssoc(),function(value:String,key:String){
        data.push((key+'='+value).replace(spaceFix,'+'));
      });
      return data.join('&');
    }
  }
  class D{
    static constructor(args):dQuery{
      if(typeof args === 'string'){
        var
          first = args.substr(0,1),
          rest = args.substr(1);
        if(first === '#' && regexID.test(rest)){
          return new dQuery(document.getElementById(rest));
        } else {
          return new dQuery(args);
        }
      } else {
        return new dQuery(args);
      }
    }
    static validate(Selector:String,el:HTMLElement):Boolean{
      return (el instanceof Element || el instanceof Document) && (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, Selector);
    }
    static rand():String{
      return (Math.random() + 1).toString(36).substring(7)
    }
    static extend(b,c){
      var a = {},key;
      for(key in b){
        if(b.hasOwnProperty(key))
          a[key] = b[key];
      }
      for(key in c){
        if(c.hasOwnProperty(key) && a.hasOwnProperty(key))
          a[key] = c[key];
      }
      return a;
    }
    static each(object,callback:Function):void{
      var
        i,
        ret;
      if(typeof object == 'undefined') return ;
      try{
        if(object instanceof Array || object instanceof NodeList){
          Array.prototype.forEach.call(object,function(element,index,array){
            ret = callback.call(element,element,index,array);
            if(ret === false)
              throw null;
          });
        } else if(typeof object.length !== 'undefined'){
          for(i=0;i<object.length;++i){
            ret = callback.call(object[i],object[i],i,object);
            if(ret === false)
              break;
          }
        } else {
          for(i in object){
            if(object.hasOwnProperty(i)){
              ret = callback.call(object[i],object[i],i,object);
              if(ret === false)
                break;
            }
          }
        }
      } catch(e){}
    }
    static elements(object):Array{
      var toReturn = [];
      if(object instanceof dQuery){
        toReturn = object.elements;
      } else if(object instanceof Array || object instanceof NodeList) {
        $.each(object,function(n:HTMLElement){
          if(n instanceof Element){
            toReturn.push(n);
          }
        });
      } else if(object instanceof Element){
        toReturn.push(object);
      } else if(typeof object === 'string' && object.trim().substr(0,1) === '<'){
        toReturn = $.fromHTML(object);
      }
      return toReturn;
    }
    static fromHTML(html:String):Array{
      var toReturn = [];
      Parser.innerHTML = html;
      $.each(Parser.childNodes,function(n:HTMLElement){
        toReturn.push(n.cloneNode(true));
      });
      Parser.innerHTML = '';
      return toReturn;
    }
  }
  D.fn = {};
  Object.observe(D.fn,function(changes){
    $.each(changes[0].object,function(callback,name){
      dQuery.prototype[name] = callback;
    });
  });
  w.$ = $ = D;
  w.$$ = $$;
})(window,document);