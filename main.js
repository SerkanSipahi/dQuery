(function(d,w,Old$){
  var
    $,
    Element = HTMLElement,
    Document = HTMLDocument,
    LeNode = Node,
    LeRegex = /^[A-Za-z]+[\w\-:]*$/,
    Parser = document.createElement('div');
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
          // Converting from NodeList to Array, dQuery/dQuery#17
          $.each(d.querySelectorAll(selector),function(n:Node){
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
      this.each(function(n:Node){
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
    // DOM Operations
    each(Callback:Function):dQuery{
      $.each(this.elements,Callback);
      return this;
    }
  }
})(document,window,$);