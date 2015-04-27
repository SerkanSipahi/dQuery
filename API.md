dQuery-API
==========

```js
type HTMLCol = HTMLElement | HTMLCollection | NodeList | Array<HTMLElement>
class dQuery{
  length:int
  constructor(HTMLCol)
  on(Types:String, Callback:Function):this
  on(Types:String, Selector:String, Callback:Function):this
  off(Types:String, Callback:Function):this
  once(Types:String, Callback:Function):this
  once(Types:String, Selector:String, Callback:Function):this
  trigger(Type:String, Arguments:Object):this
  trigger(Event:String):this
  eq(Index:Number):dQuery
  select(Index:Number):this
  selectChild(Index:Number):this
  find(Selector:String):dQuery
  children([Selector:String]):dQuery
  forEach(Callback:Function):this
  first():dQuery
  last():dQuery
  next():dQuery
  prev():dQuery
  closest(Selector:String):dQuery
  ready(Callback:Function):this
  matches(Selector:String):Boolean
  hasParent(Selector:String):Boolean
  css(Key:String):?String
  css(Key:String, Value:String | Boolean):this
  hide():this
  addClass(Class:String):this
  removeClass(Class:String):this
  toggleClass(Class:String):this
  hasClass(Class:String):Boolean
  remove():this
  parent():dQuery
  focus():this
  attr(Key:String):?String
  attr(Key:String, Value:String | Boolean):this
  removeAttr(Key:String):this
  parents([Selector:String]):dQuery
  parentsUntil(Selector:String):dQuery
  clone():dQuery
  empty():this
  html():this
  text():this
  serialize():String
  serializeAssoc():Object
  after(Content:String | HTMLCol):this
  before(Content:String | HTMLCol):this
  append(Content:String | HTMLCol):this
  prepend(Content:String | HTMLCol):this
  appendTo(Selector:String | HTMLCol):this
  prependTo(Selector:String | HTMLCol):this
  insertBefore(Selector:String | HTMLCol):this
  insertAfter(Selector:String | HTMLCol):this
  replaceWith(Selector:String | HTMLCol):this
}
```

```js
class $dQuery{
  fn:dQuery.prototype
  elements(Mixed):HTMLCol
  noConflict():void
  fromHTML(Content:String):HTMLCol
  event(Type:String, Args:Object):Event
}
```


#### Aliases
    each                    --> forEach
    addListener             --> on
    addEventListener        --> on
    removeListener          --> off
    removeEventListener     --> off

#### Event Methods:
    click submit mousedown mouseup change dblclick keydown keyup keypress input load mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup scroll unload