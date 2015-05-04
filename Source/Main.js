"use strict";

// @Compiler-Compress "true"
// @Compiler-Transpile "true"
// @Compiler-Output "../Dist/Main.js"

(function(){

let ArrayProto = Array.prototype;
let ConstructorName = function(Obj){
  return Obj.constructor.name || Obj.constructor.toString().split(/function (.*?)\(\)/)[1] || '';
};
let Matches = function(el, selector){
  return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);

}
let Regex = {
  ID: /^#\w+$/,
  Class: /^\.\w+$/,
  TagName: /^\w+$/,
  CRLF: /\r?\n/g
};
let Parser = null; // Our HTML Parser

if(typeof window === 'undefined'){
  window = {};
}

let Old$ = window.$;
let OldjQuery = window.jQuery;

class dQuery{
  constructor(Elements){
    this.Elements = $dQuery.elements(Elements);
  }
  get length(){
    return this.Elements.length;
  }
  // Events and stuff
  on(Types, Arg2, Arg3, Arg4){
    if(this.length){
      if(typeof Arg3 !== 'undefined'){
        // Event, Selector, Callback
        Arg4 = Arg4 || Arg3;
        let Selector = Arg2;
        Arg2 = function(e){
          if(Matches(e.target, Selector) || $(e.target).hasParent(Selector)){
            Arg3.call(this, e);
          }
        };
      } else {
        // Event, Callback
        Arg4 = Arg4 || Arg2;
      }
      let Me = this;
      Types.split(' ').forEach(function(Type){
        Me.forEach(function(Element){
          Element.__events = Element.__events || {};
          Element.__events[Type] = Element.__events[Type] || {};
          Element.__events[Type][Arg4] = Arg2;
          Element.addEventListener(Type, Arg2);
        });
      });
    }
    return this;
  }
  off(Types, Callback){
    if(this.length){
      let Me = this;
      if(typeof Callback === 'undefined'){
        // Remove all
        Types.split(' ').forEach(function(Type){
          Me.forEach(function(Element){
            if(!Element.__events || !Element.__events[Type]) return ;
            for(let Key in Element.__events[Type]){
              Element.removeEventListener(Type, Element.__events[Type][Key]);
            }
            Element.__events[Type] = {};
          });
        });
      } else if(typeof Callback === 'function') {
        // Remove only one
        Types.split(' ').forEach(function(Type){
          Me.forEach(function(Element){
            if(!Element.__events || !Element.__events[Type] || !Element.__events[Type][Callback]) return ;
            Element.removeEventListener(Type, Element.__events[Type][Callback]);
            delete Element.__events[Type][Callback];
          });
        });
      }
    }
    return this;
  }
  once(Types, Arg2, Arg3){
    if(this.length){
      let Me = this;
      if(typeof Arg3 !== 'undefined'){
        this.on(Types, Arg2, function Callback(e){
          Arg3.call(this, e);
          Me.off(Types, Callback);
        }, Arg3);
      } else {
        this.on(Types, function Callback(e){
          Arg2.call(this, e);
          Me.off(Types, Callback);
        });
      }
    }
    return this;
  }
  trigger(Arg1, Arg2){
    if(this.length){
      let Event;
      if(typeof Arg1 === 'string'){
        // Type, Args
        Event = $dQuery.Event(Arg1, Arg2);
      } else {
        // Event Object
        Event = Arg1;
      }
      this.forEach(function(Element){
        Element.dispatchEvent(Event);
      });
    }
    return this;
  }
  // DOM Search and Selection stuff
  eq(Index){
    if(this.length){
      return new dQuery(Index < this.length ? [this.Elements[Index]] : []);
    }
    return this;
  }
  select(Index){
    this.Elements = Index < this.length ? [this.Elements[Index]] : [];
    return this;
  }
  selectChild(Index, Index2){
    if(typeof Index2 === 'undefined'){
      Index2 = Index;
      Index = 0;
    }
    this.Elements = Index < this.length ? (
      Index2 < this.Elements[Index].childElementCount ? [this.Elements[Index].children[Index2]] : []
    ) : [];
    return this;
  }
  find(Selector){
    return new dQuery(this.Elements[0].querySelectorAll(Selector));
  }
  children(Selector){
    if(this.length){
      if(!Selector){
        return new dQuery(this.Elements[0].children);
      } else {
        return this.find(":scope > " + Selector);
      }
    }
    return this;
  }
  forEach(Callback){
    try {
      ArrayProto.forEach.call(this.Elements, Callback);
    } catch(err){
      if(err !== null) throw err;
    }
    return this;
  }
  each(Callback){ // I hate you jQuery!!!
    try {
      ArrayProto.forEach.call(this.Elements, function(Item, Index, Array){
        if(Callback.call(Item, Index, Item, Array) === false) // I hate you too!
          throw null;
      });
    } catch(err){
      if(err !== null) throw err;
    }
    return this;
  }
  first(){
    if(this.length)
      return new dQuery([this.Elements[0]]);
    return this;
  }
  last(){
    if(this.length)
      return new dQuery([this.Elements[this.length - 1]]);
    return this;
  }
  next(){
    if(this.length)
      return new dQuery(this.Elements[0].nextElementSibling !== null ? [this.Elements[0].nextElementSibling] : []);
    return this;
  }
  prev(){
    if(this.length)
      return new dQuery(this.Elements[0].previousElementSibling !== null ? [this.Elements[0].previousElementSibling] : []);
    return this;
  }
  closest(Selector){
    if(this.length){
      let Element = this.Elements[0];
      if(Matches(Element, Selector)) return new dQuery(Element);
      while(Element = Element.parentNode) {
        if (ConstructorName(Element) === 'HTMLDocument'){
          return new dQuery();
        } else if(!Selector.length || Matches(Element, Selector)){
          return new dQuery(Element);
        } else {
          let Child = Element.querySelector(Selector);
          if(Child !== null){
            return new dQuery(Child);
          }
        }
      }
    }
    return this;
  }
  // DOM Events
  ready(Callback){
    if(document.readyState === 'complete'){
      Callback.call(document);
    } else {
      document.addEventListener('DOMContentLoaded', Callback);
    }
  }
  // DOM Validation
  matches(Selector){
    return this.length && Matches(this.Elements[0], Selector);
  }
  hasParent(Selector){
    if(!this.length) return false;
    let Element = this.Elements[0];
    while(Element = Element.parentNode) {
      if (ConstructorName(Element) === 'HTMLDocument'){
        return false;
      } else if(!Selector.length || Matches(Element, Selector)){
        return true;
      }
    }
    return false;
  }
  // DOM Manipulation
  css(Key, Value){
    if(typeof Value !== 'undefined'){
      if(this.length)
        this.forEach(function(Element){
          Element.style[Key] = Value;
        });
      return this;
    } else {
      if(this.length)
        return this.Elements[0].style[Key] || getComputedStyle(this.Elements[0])[Key] || null;
      return null;
    }
  }
  hide(){
    this.css('display', 'none');
    return this;
  }
  addClass(Names){
    if(this.length)
      Names.split(' ').forEach(function(Name){
        this.forEach(function(Element){
          Element.classList.add(Name);
        });
      }.bind(this));
    return this;
  }
  removeClass(Names){
    if(this.length)
      Names.split(' ').forEach(function(Name){
        this.forEach(function(Element){
          Element.classList.remove(Name);
        });
      }.bind(this));
    return this;
  }
  toggleClass(Names){
    if(this.length)
      Names.split(' ').forEach(function(Name){
        this.forEach(function(Element){
          Element.classList.toggle(Name);
        });
      }.bind(this));
    return this;
  }
  hasClass(Name){
    return this.length && this.Elements[0].classList.contains(Name);
  }
  remove(){
    this.forEach(function(Element){
      try {
        Element.parentNode.removeChild(Element);
      } catch(err){}
    });
    return this;
  }
  parent(Selector){
    if(!this.length) return this;
    if(typeof Selector == 'undefined')
      return new dQuery(this.Elements[0].parentNode);
    let Element = this.Elements[0];
    while(Element = Element.parentNode) {
      if (ConstructorName(Element) === 'HTMLDocument'){
        break ;
      } else if(!Selector.length || Matches(Element, Selector)){
        return new dQuery(Element);
      }
    }
    return new dQuery();
  }
  focus(){
    if(this.length)
      this.Elements[0].focus();
    return this;
  }
  data(Key, Value){
    if(typeof Value === 'undefined'){
      let Element = this.Elements[0];
      if(typeof Key !== 'undefined'){
        if(!this.length) return {};
        return (Element.dataset && Element.dataset[Key]) || (Element.__data && Element.__data[Key])
      } else {
        if(!this.length) return false;
        return $.extend({}, this.Elements[0].dataset, this.Elements[0].__data);
      }
    } else {
      this.forEach(function(Element){
        Element.__data = Element.__data || {};
        Element.__data[Key] = Value;
      });
      return this;
    }
  }
  attr(Key, Value){
    if(typeof Value === 'undefined'){
      return this.length && this.Elements[0].getAttribute(Key);
    } else {
      Value = String(Value);
      this.forEach(function(Element){
        Element.setAttribute(Key, String(Value));
      });
      return this;
    }
  }
  prop(Key, Value){
    if(typeof Value === 'undefined'){
      return this.length && this.Elements[0][Key];
    } else {
      this.forEach(function(Element){
        Element[Key] = Value;
      });
      return this;
    }
  }
  removeAttr(Key){
    if(this.length)
      this.forEach(function(Element){
        Element.removeAttribute(Key);
      });
    return this;
  }
  parents(Selector){
    if(!this.length) return this;
    let Elements = [];
    let Element = this.Elements[0];
    while(Element = Element.parentNode){
      if(ConstructorName(Element) === 'HTMLDocument'){
        break ;
      } else if(!Selector.length || Matches(Element, Selector)) {
        Elements.push(Element);
      }
    }
    return new dQuery(Elements);
  }
  parentsUntil(Selector){
    if(!this.length) return this;
    let Elements = [];
    let Element = this.Elements[0];
    while(Element = Element.parentNode){
      if(ConstructorName(Element) === 'HTMLDocument' || !Selector.length || Matches(Element, Selector)){
        break;
      } else {
        Elements.push(Element);
      }
    }
    return new dQuery(Elements);
  }
  clone(){
    if(this.length){
      if(this.length === 1){
        return new dQuery([this.Elements[0].cloneNode(true)]);
      } else {
        return new dQuery(ArrayProto.map.call(this.Elements, function(Item){
          return Item.cloneNode(true);
        }))
      }
    }
    return this;
  }
  empty(){
    if(this.length)
      this.forEach(function(Element){
        try {Element.innerHTML = '';} catch(err){}
        // Imagine a parent and a child in elements and we try to empty the
        // child after parent gets emptied
      });
    return this;
  }
  html(Value){
    if(typeof Value === 'undefined'){
      return this.length && this.Elements[0].innerHTML;
    } else {
      if(this.length)
        this.forEach(function(Element){
          try {Element.innerHTML = Value;} catch(err){}
          // Imagine a parent and a child in elements and we try to empty the
          // child after parent gets emptied
        });
      return this;
    }
  }
  text(Value){
    if(typeof Value === 'undefined'){
      return this.length && this.Elements[0].textContent;
    } else {
      if(this.length)
        this.forEach(function(Element){
          try { Element.textContent = Value; } catch(err){}
          // Imagine a parent and a child in elements and we try to empty the
          // child after parent gets emptied
        });
      return this;
    }
  }
  serialize(){
    if(!this.length) return '';
    let ToReturn = [];
    ArrayProto.forEach.call(this.Elements[0].elements, function(Item){
      if(!Item.name) return ;
      ToReturn.push(Item.name + '=' + Item.value.replace(Regex.CRLF, "\n"));
    });
    return ToReturn.join('&');
  }
  serializeAssoc(){
    if(!this.length) return '';
    let ToReturn = {};
    ArrayProto.forEach.call(this.Elements[0].elements, function(Item){
      if(!Item.name) return ;
      ToReturn[Item.name] = Item.value;
    });
    return ToReturn;
  }
  // -- DOM Inserts and stuff
  after(Content){
    if(this.length){
      let Me = this;
      if(typeof Content === 'string'){
        Me.forEach(function(Element){
          Element.insertAdjacentHTML('afterend', Content);
        });
      } else {
        ArrayProto.forEach.call($dQuery.elements(Content), function(ArgumentElement){
          Me.Elements[0].parentNode.insertBefore(ArgumentElement, Me.Elements[0].nextSibling);
        });
      }
    }
    return this;
  }
  before(Content){
    if(this.length){
      let Me = this;
      if(typeof Content === 'string'){
        Me.forEach(function(Element){
          Element.insertAdjacentHTML('beforebegin', Content);
        });
      } else {
        ArrayProto.forEach.call($dQuery.elements(Content), function(ArgumentElement){
          Me.Elements[0].parentNode.insertBefore(ArgumentElement, Me.Elements[0].previousSibling);
        });
      }
    }
    return this;
  }
  append(Content){
    if(this.length){
      let Me = this;
      if(typeof Content === 'string'){
        Me.forEach(function(Element){
          Element.insertAdjacentHTML('beforeend', Content);
        });
      } else {
        ArrayProto.forEach.call($dQuery.elements(Content), function(ArgumentElement){
          Me.Elements[0].appendChild(ArgumentElement);
        });
      }
    }
    return this;
  }
  prepend(Content){
    if(this.length){
      let Me = this;
      if(typeof Content === 'string'){
        Me.forEach(function(Element){
          Element.insertAdjacentHTML('afterbegin', Content);
        });
      } else {
        ArrayProto.forEach.call(ArrayProto.reverse.call($dQuery.elements(Content)), function(ArgumentElement){
          Me.Elements[0].insertBefore(ArgumentElement, Me.Elements[0].firstChild);
        });
      }
    }
    return this;
  }
  appendTo(Target){
    if(this.length){
      if(typeof Target === 'string'){
        Target = document.querySelector(Target);
      } else {
        Target = $dQuery.elements(Target)[0];
      }
      if(Target){
        this.forEach(function(Element){
          Target.appendChild(Element);
        });
      }
    }
    return this;
  }
  prependTo(Target){
    if(this.length){
      if(typeof Target === 'string'){
        Target = document.querySelector(Target);
      } else {
        Target = $dQuery.elements(Target)[0];
      }
      if(Target){
        ArrayProto.forEach.call(ArrayProto.reverse.call(this.Elements), function(Element){
          Target.insertBefore(Element, Target.firstChild);
        });
      }
    }
    return this;
  }
  insertBefore(Target){
    if(this.length){
      if(typeof Target === 'string'){
        Target = document.querySelector(Target);
      } else {
        Target = $dQuery.elements(Target)[0];
      }
      if(Target){
        ArrayProto.forEach.call(ArrayProto.reverse.call(this.Elements), function(Element){
          Target.parentNode.insertBefore(Element, Target);
        });
      }
    }
    return this;
  }
  insertAfter(Target){
    if(this.length){
      if(typeof Target === 'string'){
        Target = document.querySelector(Target);
      } else {
        Target = $dQuery.elements(Target)[0];
      }
      if(Target){
        ArrayProto.forEach.call(this.Elements, function(Element){
          Target.parentNode.insertBefore(Element, Target.nextSibling);
        });
      }
    }
    return this;
  }
  replaceWith(Content){
    if(this.length){
      if(typeof Content === 'string'){
        this.forEach(function(Element){
          try {Element.outerHTML = Content;} catch(err){}
          // Imagine a parent and a child in elements and we try to empty the
          // child after parent gets emptied
        });
      } else {
        Content = $dQuery.elements(Content)[0];
        if(Content){
          this.Elements[0].parentNode.replaceChild(Content, this.Elements[0]);
        }
      }
    }
    return this;
  }
  //
  // <!-----------------------------DOLLAR---------------------------------->
  //
  static $(Selector){
    if(Regex.ID.test(Selector)){
      return new dQuery([document.getElementById(Selector.substr(1))]);
    } else if(Regex.Class.test(Selector)){
      return new dQuery(document.getElementsByClassName(Selector.substr(1)));
    } else if(Regex.TagName.test(Selector)){
      return new dQuery(document.getElementsByTagName(Selector));
    } else if(typeof Selector === 'string'){
      if(Selector.substr(0,1) === '<'){
        return new dQuery($dQuery.fromHTML(Selector));
      } else {
        return new dQuery(document.querySelectorAll(Selector));
      }
    } else {
      return new dQuery(Selector);
    }
  }
  static elements(Elements){
    if(Elements === null || typeof Elements !== 'object'){
      return []
    } else if(ConstructorName(Elements) === 'Array'){
      let MyElements = [];
      if(Elements.length){
        Elements.forEach(function(Element){
          if(ConstructorName(Element).substr(0,4) === 'HTML'){
            MyElements.push(Element);
          }
        });
      }
      return MyElements;
    } else if(typeof Elements === 'object' && Elements !== null) {
      if(ConstructorName(Elements) === 'NodeList') {
        return Elements;
      } else if(ConstructorName(Elements) === 'HTMLCollection'){
        return ArrayProto.slice.call(Elements);
      } else if(ConstructorName(Elements).substr(0,4) === 'HTML'){
        return [Elements];
      } else if(Elements instanceof dQuery){
        return Elements.Elements;
      } else {
        return [];
      }
    } else {
      return [];
    }
  }
  static extend(out){
    out = typeof out === 'object' ? out : {};

    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];

      if (typeof obj !== 'object') continue;

      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object' && obj[key] !== null){
            out[key] = typeof out[key] === 'object' && out[key] !== null && ConstructorName(out[key]) === ConstructorName(obj[key]) ? out[key] : obj[key].constructor();
            if(ConstructorName(out[key]) === 'Array'){
              out[key] = out[key].concat(obj[key]);
            } else {
              dQuery.extend(out[key], obj[key]);
            }
          } else out[key] = obj[key];
        }
      }
    }

    return out;
  }
  static noConflict(){
    window.$ = Old$;
    window.jQuery = OldjQuery;
  }
  static fromHTML(Content){
    Parser = Parser || document.createElement("span");
    Parser.innerHTML = Content;
    return Parser.children;
  }
  static Event(Type, Args){
    var Event;
    if(typeof Args === 'undefined'){
      Event = document.createEvent('HTMLEvents');
      Event.initEvent(Type, true, false);
    } else {
      Event = document.createEvent('CustomEvent');
      Event.initCustomEvent(Type, true, true, Args);
    }
    return Event;
  }
  static serialize(Object){
    let ToReturn = [];
    for(var Key in Object){
      if(Object.hasOwnProperty(Key)){
        ToReturn.push(Key + '=' + String(Object[Key]).replace(Regex.CRLF, "\n"));
      }
    }
    return ToReturn.join('&');
  }
  static proxy(func, thisArg){
    return func.bind.apply(func, ArrayProto.slice.call(arguments, 1));
  }
  static isFunction(func){
    return typeof func === 'function';
  }
  static each(Item, Callback){
    if(Item instanceof dQuery){
      Item = Item.Elements;
    }
    if(typeof Item.length !== 'undefined'){
      ArrayProto.forEach.call(Item, function(Value, Key){
        Callback.call(Value, Key, Value, Item);
      });
    } else {
      for(var i in Item){
        if(Item.hasOwnProperty(i)){
          Callback.call(Item[i], i, Item[i], Item);
        }
      }
    }
  }
}

dQuery.fn = dQuery.prototype;
dQuery.fn.jquery = '2.1.3';
dQuery.fn.detach = dQuery.fn.remove;            // detch                ---> remove
dQuery.fn.one = dQuery.fn.once;                 // once                 ---> once
dQuery.fn.addListener = dQuery.fn.on;           // addListener          ---> on
dQuery.fn.addEventListener = dQuery.fn.on;      // addEventListener     ---> on
dQuery.fn.removeListener = dQuery.fn.off;       // removeListener       ---> off
dQuery.fn.removeEventListener = dQuery.fn.off;  // removeEventListener  ---> off
dQuery.fn.is = dQuery.fn.matches;

"click submit mousedown mouseup change dblclick keydown keyup keypress input load mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup scroll unload".split(' ').forEach(function(Event){
  dQuery.prototype[Event] = function(Callback){
    this.on(Event, Callback);
    return this;
  }
});

let $dQuery = dQuery.$;
Object.getOwnPropertyNames(dQuery).forEach(function(Item){
  if(['length', 'name', 'arguments','caller','prototype'].indexOf(Item) !== -1) return ;
  $dQuery[Item] = dQuery[Item];
});

if(typeof module !== 'undefined'){
  module.exports = $dQuery;
} else if(typeof exports !== 'undefined'){
  exports.$ = $dQuery;
} else {
  window.$ = $dQuery;
  window.jQuery = $dQuery;
}

// @Compiler-Include "Ajax.js"

  window.ConstructorName = ConstructorName;
})();