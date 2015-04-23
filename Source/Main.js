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
      Elements.forEach(function(Element){
        if(Element.constructor.name.substr(0,4) === 'HTML'){
          MyElements.push(Element);
        }
      });
    } else {
      this.Elements = Elements ? (Elements instanceof NodeList || Elements instanceof HTMLElement ? Elements : []) : [];
    }
  }
}
function $dQuery(Selector){
  if(Regex.ID.test(Selector)){
    return new dQuery(document.getElementById(Selector.substr(1)));
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
