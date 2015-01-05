(function(w){
  var instances = [],$,entities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };
  class dQuery{
    elements:Array;
    length:Number;
    constructor(selector){
      var elements = [];
      if(selector instanceof HTMLDocument || selector instanceof HTMLElement){
        elements.push(selector);
      } else if(typeof selector === 'string'){
        elements = document.querySelectorAll(selector);
      } else if(typeof selector === 'object'){
        $.each(selector,function(entry){
          if(entry instanceof HTMLDocument || entry instanceof HTMLElement)
            elements.push(entry);
        });
      }
      this.elements = elements;
      this.length = elements.length;
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
        return this.elements[0].innerHTML.replace(/[&<>"'\/]/g,function(s){
          return entities[s];
        });
      } else {
        var escaped = text.replace(/[&<>"'\/]/g,function(s){
          return entities[s];
        });
        this.each(function(){
          this.innerHTML = escaped;
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
        return new dQuery(this.elements[0]);
      } else {
        return this;
      }
    }
    last(){
      if(this.length > 1){
        return new dQuery(this.elements[this.length-1]);
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
      return new dQuery(this.elements[0].querySelectorAll(selector));
    }
    clone():dQuery{
      if(this.length === 0)return this;
      return new dQuery(this.elements[0].cloneNode(true));
    }
    remove():void{
      if(this.length === 0 || this.elements[0] instanceof HTMLDocument)return ;
      this.each(function(){
        this.parentNode.removeChild(this);
      });
      this.elements = [];
      this.length = 0;
    }
    parent():dQuery{
      if(this.length === 0 || this.elements[0] instanceof HTMLDocument)return this;
      return new dQuery(this.elements[0].parentNode);
    }
    next():dQuery{
      if(this.length === 0 || this.elements[0] instanceof HTMLDocument)return this;
      return new dQuery(this.elements[0].nextElementSibling);
    }
    prev():dQuery{
      if(this.length === 0 || this.elements[0] instanceof HTMLDocument)return this;
      return new dQuery(this.elements[0].previousElementSibling);
    }
    prepend(object:dQuery):dQuery{
      if(this.length === 0) return ;
      if(object.length > 0){
        var self = this;
        $.each(object.elements.reverse(),function(){
          self.elements[0].insertBefore(this,self.elements[0].firstChild);
        });
      }
      return this;
    }
    append(object:dQuery):dQuery{
      if(this.length === 0) return ;
      if(object.length > 0){
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
      if(this.length === 0) return ;
      if(typeof selector === 'undefined' || selector.length === 0)return new dQuery(this.elements[0].parentNode);
      var Type = (selector.charAt(0) === '.' || selector.charAt(0) === '#' || selector.charAt(0) === '[') ? selector.charAt(0) : null;
      if(Type !== null){
        selector = selector.substr(1);
      }
      var el = this.elements[0];
      while(el = el.parentNode){
        if(el instanceof HTMLDocument){
          break;
        } else {
          if($.validate(Type,selector,el)){
            return new dQuery(el);
          }
        }
      }
      return new dQuery;
    }
    parents(selector:String):dQuery {
      if (this.length === 0) return;
      var skip = (typeof selector === 'undefined' || selector.length === 0),Type = null;
      if(!skip) {
        if(selector.charAt(0) === '.' || selector.charAt(0) === '#' || selector.charAt(0) === '['){
          Type = selector.charAt(0);
          selector = selector.substr(1);
        }
      }
      var el = this.elements[0],elements=[];
      while(el = el.parentNode){
        if(el instanceof HTMLDocument){
          break;
        } else {
          if(skip || $.validate(Type,selector,el)){
            elements.push(el);
          }
        }
      }
      return new dQuery(elements);
    }
    parentsUntil(selector:String):dQuery{
      if(this.length === 0) return ;
      if(typeof selector === 'undefined' || selector.length === 0)return new dQuery(this.elements[0].parentNode);
      var Type = (selector.charAt(0) === '.' || selector.charAt(0) === '#' || selector.charAt(0) === '[') ? selector.charAt(0) : null;
      if(Type !== null){
        selector = selector.substr(1);
      }
      var el = this.elements[0],elements=[];
      while(el = el.parentNode){
        if(el instanceof HTMLDocument){
          break;
        } else {
          elements.push(el);
          if($.validate(Type,selector,el)){
            return new dQuery(elements);
          }
        }
      }
      return new dQuery;
    }
  }
  class D{
    static validate(type:String,Selector:String,element:HTMLElement):Boolean{
      if(type === null){
        return element.tagName.toLowerCase() === Selector.toLowerCase();
      } else {
        if(type === '.'){
          return element.classList.contains(Selector);
        } else if(type === '#'){
          return element.id === Selector;
        } else if(type === '['){
          var Chunks = Selector.substr(0,Selector.length-1).split('=');
          if(typeof Chunks === 'undefined'){
            return element.hasAttribute(Chunks[0]);
          } else {
            return element.hasAttribute(Chunks[0]) && (element.getAttribute(Chunks[0]) === Chunks[1])
          }
        }
      }
      return false;
    }
    static constructor(args):dQuery{
      return new dQuery(args);
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
  w.$ = $ = D;
})(window);