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
      var elements;
      if(selector instanceof HTMLDocument || selector instanceof HTMLElement){
        elements = [selector];
      } else if(typeof selector === 'string'){
        elements = document.querySelectorAll(selector);
      } else if(typeof selector === 'object'){
        elements = [];
        $.each(selector,function(entry){
          if(entry instanceof HTMLDocument || entry instanceof HTMLElement)
            elements.push(entry);
        });
      } else {
        throw new Error("No Elements provided");
      }
      this.elements = elements;
      this.length = elements.length;
    }
    each(callback:Function):dQuery{
      $.each(this.elements,callback);
      return this;
    }
    attr(name:String,value:String){
      if(this.length === 0)return;
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
      if(this.length === 0)return this;
      this.each(function(){
        this.removeAttribute(name);
      });
      return this;
    }
    html(text){
      if(this.length === 0)return;
      if(typeof text === 'undefined'){
        return this.elements[0].innerHTML;
      } else {
        this.each(function(){
          this.innerHTML = text;
        });
      }
      return this;
    }
    text(text){
      if(this.length === 0)return;
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
    val(text){
      if(this.length === 0)return;
      if(typeof text === 'undefined'){
        return this.elements[0].value;
      } else {
        this.each(function(){
          this.value = text;
        });
      }
      return this;
    }
  }
  class D{
    static constructor(args):dQuery{
      // check if it already exists in the instances array
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