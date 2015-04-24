"use strict";

let ArrayProto = Array.prototype;
let Regex = {
  ID: /^#\w+$/,
  Class: /^\.\w+$/,
  TagName: /^\w+$/,
  CRLF: /\r?\n/g
};
let Parser = null; // Our HTML Parser

class dQuery{
  constructor(Elements){
    this.Elements = $dQuery.Elements(Elements);
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
          e.stopPropagation();
          if(e.target.matches(Selector) || $(e.target).hasParent(Selector)){
            Arg3.call(this, e);
          }
        };
      } else {
        // Event, Callback
        Arg4 = Arg4 || Arg2;
        let Callback = Arg2;
        Arg2 = function(e){
          e.stopPropagation();
          Callback.call(this, e);
        }
      }
      let Me = this;
      Types.split(' ').forEach(function(Type){
        Me.each(function(Element){
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
          Me.each(function(Element){
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
          Me.each(function(Element){
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
        this.on(Types, function Callback(e){
          Arg2.call(this, e);
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
      this.each(function(Element){
        Element.dispatchEvent(Event);
      });
    }
    return this;
  }
  // DOM Search and Selection stuff
  eq(Index){
    if(Index < this.length){
      return new dQuery([this.Elements[Index]]);
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
      let El = this.Elements[0].querySelector(Selector);
      return new dQuery(El ? [El] : []);
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
    return this.length && this.Elements[0].matches(Selector);
  }
  hasParent(Selector){
    if(!this.length) return false;
    let Element = this.Elements[0];
    while(Element = Element.parentNode) {
      if (Element.constructor.name === 'HTMLDocument'){
        return false;
      } else if(!Selector.length || Element.matches(Selector)){
        return true;
      }
    }
    return false;
  }
  // DOM Manipulation
  css(Key, Value){
    if(typeof Value !== 'undefined'){
      if(this.length)
        this.each(function(Element){
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
  addClass(Name){
    if(this.length)
      this.each(function(Element){
        Element.classList.add(Name);
      });
    return this;
  }
  removeClass(Name){
    if(this.length)
      this.each(function(Element){
        Element.classList.remove(Name);
      });
    return this;
  }
  toggleClass(Name){
    if(this.length)
      this.each(function(Element){
        Element.classList.toggle(Name);
      });
    return this;
  }
  hasClass(Name){
    return this.length && this.Elements[0].classList.contains(Name);
  }
  remove(){
    let ToReturn = [];
    this.each(function(Element){
      try {
        ToReturn.push(Element);
        Element.parentNode.removeChild(Element);
      } catch(err){}
    });
    return ToReturn;
  }
  parent(){
    if(this.length)
      return this.Elements[0].parentNode;
    return this;
  }
  focus(){
    if(this.length)
      this.Elements[0].focus();
    return this;
  }
  attr(Key, Value){
    if(typeof Value === 'undefined'){
      return this.length && this.Elements[0].getAttribute(Key);
    } else {
      Value = String(Value);
      this.each(function(Element){
        Element.setAttribute(Key, Value);
      });
      return this;
    }
  }
  removeAttr(Key){
    if(this.length)
      this.each(function(Element){
        Element.removeAttribute(Key);
      });
    return this;
  }
  parents(Selector){
    if(!this.length) return this;
    let Elements = [];
    let Element = this.Elements[0];
    while(Element = Element.parentNode){
      if(Element.constructor.name === 'HTMLDocument'){
        break ;
      } else if(!Selector.length || Element.matches(Selector)) {
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
      if(Element.constructor.name === 'HTMLDocument' || !Selector.length || Element.matches(Selector)){
        break;
      } else {
        Elements.push(Element);
      }
    }
    return new dQuery(Elements);
  }
  clone(){
    if(this.length){
      return new dQuery([this.Elements[0].cloneNode(true)]);
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
        this.each(function(Element){
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
        this.each(function(Element){
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
        Me.each(function(Element){
          Element.insertAdjacentHTML('afterend', Content);
        });
      } else {
        ArrayProto.forEach.call($dQuery.Elements(Content), function(ArgumentElement){
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
        Me.each(function(Element){
          Element.insertAdjacentHTML('beforebegin', Content);
        });
      } else {
        ArrayProto.forEach.call($dQuery.Elements(Content), function(ArgumentElement){
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
        Me.each(function(Element){
          Element.insertAdjacentHTML('beforeend', Content);
        });
      } else {
        ArrayProto.forEach.call($dQuery.Elements(Content), function(ArgumentElement){
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
        Me.each(function(Element){
          Element.insertAdjacentHTML('afterbegin', Content);
        });
      } else {
        ArrayProto.forEach.call(ArrayProto.reverse.call($dQuery.Elements(Content)), function(ArgumentElement){
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
        Target = $dQuery.Elements(Target)[0];
      }
      if(Target){
        this.each(function(Element){
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
        Target = $dQuery.Elements(Target)[0];
      }
      if(Target){
        ArrayProto.forEach.call(ArrayProto.reverse.call(this.Elements), function(Element){
          Target.appendChild(Element);
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
        Target = $dQuery.Elements(Target)[0];
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
        Target = $dQuery.Elements(Target)[0];
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
        this.each(function(Element){
          try {Element.outerHTML = Content;} catch(err){}
          // Imagine a parent and a child in elements and we try to empty the
          // child after parent gets emptied
        });
      } else {
        Content = $dQuery.Elements(Content)[0];
        if(Content){
          this.Elements[0].parentNode.replaceChild(Content, this.Elements[0]);
        }
      }
    }
    return this;
  }
}

dQuery.prototype.each = dQuery.prototype.forEach;             // each                 ---> forEach
dQuery.prototype.addListener = dQuery.prototype.on;           // addListener          ---> on
dQuery.prototype.addEventListener = dQuery.prototype.on;      // addEventListener     ---> on
dQuery.prototype.removeListener = dQuery.prototype.off;       // removeListener       ---> off
dQuery.prototype.removeEventListener = dQuery.prototype.off;  // removeEventListener  ---> off

function $dQuery(Selector){
  if(Regex.ID.test(Selector)){
    return new dQuery([document.getElementById(Selector.substr(1))]);
  } else if(Regex.Class.test(Selector)){
    return new dQuery(document.getElementsByClassName(Selector.substr(1)));
  } else if(Regex.TagName.test(Selector)){
    return new dQuery(document.getElementsByTagName(Selector));
  } else if(typeof Selector === 'string'){
    if(Selector.substr(0,1) === '<'){
      return new dQuery($dQuery.FromHTML(Selector));
    } else {
      return new dQuery(document.querySelectorAll(Selector));
    }
  } else {
    return new dQuery(Selector);
  }
}

$dQuery.fn = dQuery.prototype;
$dQuery.Elements = function(Elements){
  if(Elements.constructor.name === 'Array'){
    let MyElements = [];
    if(Elements.length){
      Elements.forEach(function(Element){
        if(Element.constructor.name.substr(0,4) === 'HTML'){
          MyElements.push(Element);
        }
      });
    }
    return MyElements;
  } else if(typeof Elements === 'object' && Elements !== null) {
    if(Elements.constructor.name === 'NodeList') {
      return Elements;
    } else if(Elements.constructor.name.substr(0,4) === 'HTML'){
      if(Elements.length){
        return ArrayProto.slice.call(Elements);
      } else {
        return [Elements];
      }
    } else if(Elements instanceof dQuery){
      return Elements.Elements;
    } else {
      return [];
    }
  } else {
    return [];
  }
};

$dQuery.FromHTML = function(Content){
  Parser = Parser || document.createElement("span");
  Parser.innerHTML = Content;
  return Parser.children;
};

$dQuery.Event = function(Type, Args){
  var Event;
  if(typeof Args === 'undefined'){
    Event = document.createEvent('HTMLEvents');
    Event.initEvent(Type, true, false);
  } else {
    Event = document.createEvent('CustomEvent');
    Event.initCustomEvent(Type, true, true, Args);
  }
  return Event;
};

if(typeof module !== 'undefined'){
  module.exports = $dQuery;
} else if(typeof exports !== 'undefined'){
  exports.$ = $dQuery;
} else if(typeof window !== 'undefined'){
  window.$ = $dQuery;
}
