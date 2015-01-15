(function(w,d){
  var
    $ ,
    Element = HTMLElement ,
    Document = HTMLDocument,
    $$ = function(){
      return d.querySelector.apply(d,arguments);
    },
    regexID = /^[A-Za-z]+[\w-:.]*$/;
  class dQuery{
    elements:Array;
    length:Number;
    constructor(selector){
      var elements = [];
      if(selector instanceof Document || selector instanceof Element){
        elements.push(selector);
      } else if(typeof selector === 'string'){
        elements = d.querySelectorAll(selector);
      } else if(typeof selector === 'object'){
        $.each(selector,function(entry){
          if(entry instanceof Document || entry instanceof Element)
            elements.push(entry);
        });
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
        $.each(this.elements[0].childNodes,function(){
          if($.validate(Selector,this)){
            toReturn.push(this);
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
      if(this.length > 0){
        this.elements[0].focus();
      }
      return this;
    }
    child(Number:Number):dQuery{
      if(this.length === 0) return this;
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
      this.each(function(){
        this.addEventListener(type, callback,true);
      });
      return callback;
    }
    off(type:String,callback:Function):dQuery{
      this.each(function(){
        this.removeEventListener(type,callback,true);
      });
      return this;
    }
    trigger(type:String,args:Object):dQuery{
      var event;
      if(typeof args === 'undefined'){
        event = d.createEvent('HTMLEvents');
        event.initEvent(type, true, false);
      } else {
        if (window.CustomEvent) {
          event = new CustomEvent(type, {detail: args});
        } else {
          event = d.createEvent('CustomEvent');
          event.initCustomEvent(type, true, true, args);
        }
      }
      this.each(function(){
        this.dispatchEvent(event);
      });
      return this;
    }
    contains(object:dQuery):Boolean{
      if(this.length === 0 || object.length === 0)return false;
      return this.elements[0] !== object.elements[0] && this.elements[0].contains(object.elements[0]);
    }
    empty():void{
      if(this.elements.length !== 0){
        this.elements[0].innerHTML = '';
      }
    }
    is(object):Boolean{
      if(this.length === 0 || object.length === 0)return false;
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
      if(this.length === 0)return ;
      if(typeof value === 'undefined'){
        return this.elements[0].getAttribute(name);
      } else {
        this.each(function(){
          this.setAttribute(name,value);
        });
        return this;
      }
    }
    removeAttr(name:String):dQuery{
      if(this.length !== 0){
        this.each(function(){
          this.removeAttribute(name);
        });
      }
      return this;
    }
    html(text:String){
      if(this.length === 0)return ;
      if(typeof text === 'undefined'){
        return this.elements[0].innerHTML;
      } else {
        this.each(function(){
          this.innerHTML = text;
        });
      }
      return this;
    }
    text(text:String){
      if(this.length === 0)return ;
      if(typeof text === 'undefined'){
        return this.elements[0].textContent
      } else {
        this.each(function(){
          this.textContent = text;
        });
      }
      return this;
    }
    val(text:String){
      if(this.length === 0)return ;
      if(typeof text === 'undefined'){
        return this.elements[0].value;
      } else {
        this.each(function(){
          this.value = text;
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
      } else {
        return this;
      }
    }
    hasClass(name:String):Boolean{
      if(this.length === 0)return false;
      return this.elements[0].classList.contains(name);
    }
    addClass(name:String){
      if(this.length !== 1){
        this.elements.forEach(function(){
          this.classList.add(name);
        });
      }
      return this;
    }
    removeClass(name:String):dQuery{
      if(this.length !== 1){
        this.elements.forEach(function(){
          this.classList.remove(name);
        });
      }
      return this;
    }
    toggleClass(name:String):dQuery{
      if(this.length !== 1){
        this.elements.forEach(function(){
          this.classList.toggle(name);
        });
      }
      return this;
    }
    find(selector:String):dQuery{
      if(this.length === 0)return this;
      return $(this.elements[0].querySelectorAll(selector));
    }
    clone():dQuery{
      if(this.length === 0)return this;
      return $(this.elements[0].cloneNode(true));
    }
    remove():void{
      if(this.length === 0 || this.elements[0] instanceof Document)return ;
      this.each(function(){
        this.parentNode.removeChild(this);
      });
      this.elements = [];
      this.length = 0;
    }
    parent():dQuery{
      if(this.length === 0 || this.elements[0] instanceof Document)return this;
      return $(this.elements[0].parentNode);
    }
    next():dQuery{
      if(this.length === 0 || this.elements[0] instanceof Document)return this;
      return $(this.elements[0].nextElementSibling);
    }
    prev():dQuery{
      if(this.length === 0 || this.elements[0] instanceof Document)return this;
      return $(this.elements[0].previousElementSibling);
    }
    prepend(object:dQuery):dQuery{
      if(object.length > 0 && this.length > 0){
        var self = this;
        $.each(object.elements.reverse(),function(){
          self.elements[0].insertBefore(this,self.elements[0].firstChild);
        });
      }
      return this;
    }
    append(object:dQuery):dQuery{
      if(object.length > 0 && this.length > 0){
        var self = this;
        $.each(object.elements,function(){
          self.elements[0].appendChild(this);
        })
      }
      return this;
    }
    appendTo(object:dQuery):dQuery{
      object.append(this);
      return this;
    }
    prependTo(object:dQuery):dQuery{
      object.prepend(this);
      return this;
    }
    replaceWith(object:dQuery):dQuery{
      if(this.length === 0 || object.length === 0) return ;
      this.elements[0].parentNode.replaceChild(object.elements[0],this.elements[0]);
      return this;
    }
    closest(selector:String):dQuery{
      if(this.length === 0) return $();
      if(typeof selector === 'undefined' || selector.length === 0)return $(this.elements[0].parentNode);
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
      var skip = (typeof selector === 'undefined' || selector.length === 0);
      var el = this.elements[0],elements=[];
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
      if(typeof selector === 'undefined' || selector.length === 0)return $(this.elements[0].parentNode);
      var el = this.elements[0],elements=[];
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
      if(this.length === 0) return false;
      return this.closest(selector).length > 0;
    }
    serializeAssoc():Object{
      if(this.length === 0)return {};
      var
        self = this.elements[0],
        BRFix = /\r?\n/g,
        toReturn = {};
      $.each(self.elements,function(){
        if(!this.name || ((this.type === 'checkbox' || this.type === 'radio') && !this.checked))
          return ;
        toReturn[this.name] = this.value.replace(BRFix,"\n");
      });
      return toReturn;
    }
    serialize():String{
      if(this.length === 0)return '';
      var data = [],spaceFix = /%20/g;
      $.each(this.serializeAssoc(),function(value,key){
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
    static validate(Selector:String,el:Element):Boolean{
      return (el instanceof HTMLElement || el instanceof HTMLDocument) && (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, Selector);
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
      var i;
      if(typeof object == 'undefined') return ;
      if(object instanceof Array || object instanceof NodeList){
        [].forEach.call(object,function(element,index,array){
          callback.call(element,element,index,array);
        });
      } else if(typeof object.length !== 'undefined'){
        for(i=0;i<object.length;++i){
          callback.call(object[i],object[i],i,object);
        }
      } else {
        for(i in object){
          if(object.hasOwnProperty(i)){
            callback.call(object[i],object[i],i,object);
          }
        }
      }
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