"use strict";

let ArrayProto = Array.prototype;
let Regex = {
  ID: /^#\w+$/,
  Class: /^\.\w+$/,
  TagName: /^\w+$/
};
class dQuery{
  constructor(Elements){
    if(Elements.constructor.name === 'Array'){
      let MyElements = this.Elements = [];
      if(Elements.length){
        Elements.forEach(function(Element){
          if(Element.constructor.name.substr(0,4) === 'HTML'){
            MyElements.push(Element);
          }
        });
      }
    } else {
      this.Elements = Elements ? (Elements.constructor.name === 'NodeList' || Elements.constructor.name === 'HTMLElement' || Elements.constructor.name === 'HTMLCollection' ? Elements : []) : [];
    }
  }
  // DOM Search and Selection stuff
  eq(Index){
    this.Elements = Index < this.Elements.length ? [this.Elements[Index]] : [];
    return this;
  }
  selectChild(Index, Index2){
    if(typeof Index2 === 'undefined'){
      Index2 = Index;
      Index = 0;
    }
    this.Elements = Index < this.Elements.length ? (
      Index2 < this.Elements[Index].childElementCount ? [this.Elements[Index].children[Index2]] : []
    ) : [];
    return this;
  }
  find(Selector){
    return new dQuery(this.Elements[0].querySelectorAll(Selector));
  }
  children(Selector){
    return this.find(":scope > " + Selector);
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
    if(this.Elements.length)
      return new dQuery([this.Elements[0]]);
    return this;
  }
  last(){
    if(this.Elements.length)
      return new dQuery([this.Elements[this.Elements.length - 1]]);
    return this;
  }
  next(){
    if(this.Elements.length)
      return new dQuery(this.Elements[0].nextElementSibling !== null ? [this.Elements[0].nextElementSibling] : []);
    return this;
  }
  prev(){
    if(this.Elements.length)
      return new dQuery(this.Elements[0].previousElementSibling !== null ? [this.Elements[0].previousElementSibling] : []);
    return this;
  }
  closest(Selector){
    if(this.Elements.length){
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
    return this.Elements.length && this.Elements[0].matches(Selector);
  }
  // DOM Manipulation
  css(Key, Value){
    if(typeof Value !== 'undefined'){
      if(this.Elements.length)
        this.each(function(Element){
          Element.style[Key] = Value;
        });
      return this;
    } else {
      if(this.Elements.length)
        return this.Elements[0].style[Key] || getComputedStyle(this.Elements[0])[Key] || null;
      return null;
    }
  }
  addClass(Name){
    if(this.Elements.length)
      this.each(function(Item){
        Item.classList.add(Name);
      });
    return this;
  }
  removeClass(Name){
    if(this.Elements.length)
      this.each(function(Item){
        Item.classList.remove(Name);
      });
    return this;
  }
  toggleClass(Name){
    if(this.Elements.length)
      this.each(function(Item){
        item.classList.toggle(Name);
      });
    return this;
  }
  remove(){
    let ToReturn = [];
    this.each(function(Item){
      try {
        ToReturn.push(Item);
        Item.parentNode.removeChild(Item);
      } catch(err){}
    });
    return ToReturn;
  }
  parent(){
    if(this.Elements.length)
      return this.Elements[0].parentNode;
    return this;
  }
  focus(){
    if(this.Elements.length)
      this.Elements[0].focus();
    return this;
  }
}

dQuery.prototype.each = dQuery.prototype.forEach; // each ---> forEach

function $dQuery(Selector){
  if(Regex.ID.test(Selector)){
    return new dQuery([document.getElementById(Selector.substr(1))]);
  } else if(Regex.Class.test(Selector)){
    return new dQuery(document.getElementsByClassName(Selector.substr(1)));
  } else if(Regex.TagName.test(Selector)){
    return new dQuery(document.getElementsByTagName(Selector));
  } else {
    return new dQuery(document.querySelectorAll(Selector));
  }
}
if(typeof module !== 'undefined'){
  module.exports = $dQuery;
} else if(typeof exports !== 'undefined'){
  exports.$ = $dQuery;
} else if(typeof window !== 'undefined'){
  window.$ = $dQuery;
}
