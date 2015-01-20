(function(d,w,Old$){
  var
    $,
    Element = HTMLElement,
    Document = HTMLDocument,
    LeNode = Node,
    LeRegex = /^[A-Za-z]+[\w\-:]*$/,
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
    // DOM Operations
    each(Callback:Function):dQuery{
      $.each(this.elements,Callback);
      return this;
    }
  }
  class LeDollar{
    static constructor(selector){
      return new dQuery(selector);
    }
    static each(object,callback){
      var i, ret;
      if(typeof object == 'undefined') return ;
      try{
        if(object instanceof Array || object instanceof NodeList){
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
  }
  $ = w.$ = LeDollar;
  w.dQuery = dQuery;
})(document,window,window.$);