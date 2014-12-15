class dQuery
  constructor:(selector)->
    me = this
    if typeof selector is 'string'
      @elements = document.querySelectorAll selector
    else if typeof selector is 'object'
      @elements = selector
    else
      @elements = []
      console.log(selector)
      console.log(typeof selector)
    @length = @elements.length
    $.each @events,(event)->
      me.each (obj)->
        obj.addEventListener event,(e)->
          me.trigger event,e
          return
        return
      return
  triggers:[]
  events:['click','keydown','keyup','submit','keypress']
  entities: {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  }
  ready:(cb)->
    @each (val)->
      if(val instanceof HTMLDocument)
        if val.readyState is "complete"
          cb()
        else
          val.addEventListener 'DOMContentLoaded',cb,false
      else if val instanceof HTMLImageElement
        if val.complete
          cb()
        else
          val.onload = cb
      return
    return
  on:(name,cb)->
    name = name.split('.')
    if typeof name[1] is 'undefined' then name[1] = (Math.random() + 1).toString(36).substring(7)
    if typeof @triggers[name[0]] is 'undefined' then @triggers[name[0]] = {}
    @triggers[name[0]][name[1]] = cb
    return this
  off:(name)->
    name = name.split '.'
    if typeof name[1] is 'undefined'
      delete @triggers[name[0]]
    else
      delete @triggers[name[0]][name[1]]
    return this
  trigger:(name,args)->
    for i,callback of @triggers[name]
      callback(args)
    return this
  attr:(name,value)->
    if typeof value is undefined
      if @length is 0 then return ''
      return @elements[0].getAttribute name
    else
      if @length is 0 then return
      @each (el)->
        el.setAttribute name,value
    return this
  # Select could be an array
  parent:(selector)->
    # Similar to jQuery's Parent Untill
    if @length is 0 then return new dQuery
    if typeof selector is 'undefined'
      selector = null
    else
      firstChar = selector.charAt(0)
      if firstChar is '.' or firstChar is '#' or firstChar is '['
        selector = selector.substr(1)
      else
        firstChar = null
    el = @elements[0]
    parents = []
    while (el = el.parentNode) and el isnt document
      if selector is null
        parents.push el
      else
        if firstChar is null
          if firstChar is '.' and el.classList.contains selector then parents.push el
          else if firstChar is '#' and el.id is selector then parents.push el
          else if firstChar is '[' and el.hasAttribute(selector.substr 0,selector.length-1) then parents.push el
        else
        if el.tagName.toLowerCase() is selector
          parents.push el
    return new dQuery parents
  closest:(selector)->
    # Similar to jQuery's Parent Until
    if @length is 0 then return new dQuery
    if typeof selector is 'undefined'
      selector = null
    else
      firstChar = selector.charAt(0)
      if firstChar is '.' or firstChar is '#' or firstChar is '['
        selector = selector.substr(1)
      else
        firstChar = null
    el = @elements[0]
    while (el = el.parentNode) and el isnt document
      if selector is null
        return new dQuery [el]
      else
        if firstChar is null
          if firstChar is '.' and el.classList.contains selector then return new dQuery [el]
          else if firstChar is '#' and el.id is selector then return new dQuery [el]
          else if firstChar is '[' and el.hasAttribute(selector.substr 0,selector.length-1) then return new dQuery [el]
        else
        if el.tagName.toLowerCase() is selector
          return new dQuery [el]
    return new dQuery
  find:(selector)->
    if @length is 0 then return new dQuery()
    return new dQuery @elements[0].querySelectorAll selector
  removeAttr:(name)->
    if @length is 0 then return false
    @each (el)->
      el.removeAttribute name
      return
    return this
  hasClass:(name)->
    if @length is 0 then return false
    return @elements[0].classList.contains name
  addClass:(name)->
    if @length is 0 then return false
    @each (el)->
      el.classList.add name
      return
    return this
  removeClass:(name)->
    if @length is 0 then return false
    @each (el)->
      el.classList.remove name
      return
    return this
  toggleClass:(name)->
    if @length is 0 then return false
    @each (el)->
      el.classList.toggle name
      return
    return this
  each:(cb)->
    if @length is 0 then return false
    $.each @elements,cb
    return this
  html:(text)->
    if @length is 0 then return false
    if typeof text is 'undefined'
      return @elements[0].innerHTML
    @each (el)->
      el.innerHTML = text
      return
    return this
  text:(text)->
    me = this
    if @length is 0 then return false
    if typeof text is 'undefined'
      return @elements[0].innerHTML.replace /[&<>"'\/]/g,(s)->
        me.entities[s]
    else
      escaped = text.replace /[&<>"'\/]/g,(s)->
        me.entities[s]
      @each (el)->
        el.innerHTML = escaped
        return
    return this
  replaceWith:(obj)->
    if not(obj instanceof dQuery) or obj.length < 1 or @length < 1 then return false
    @elements[0].parentNode.replaceChild obj.elements[0],@elements[0]
    return new dQuery [obj.elements[0]] # jQuery returns @elements[0] but that behaviour of it forces us to stop chaining at replaceWith
  prepend:(obj)->
    if not(obj instanceof dQuery) or obj.length < 1 or @length < 1 then return false
    return new dQuery [@elements[0].insertBefore obj.elements[0],@elements[0].firstChild]
  append:(obj)->
    if not(obj instanceof dQuery) or obj.length < 1 or @length < 1 then return false
    return new dQuery [@elements[0].appendChild obj.elements[0]]
  first:->
    if @length is 0 then return false
    return new dQuery [@elements[0]]
  last:->
    if @length is 0 then return false
    return new dQuery [@elements[@length-1]]
  val:(val)->
    if @length is 0 then return false
    if typeof val is 'undefined'
      @elements[0].value = val
    else
      return @elements[0].value
    return
  appendTo:(obj)->
    if not(obj instanceof dQuery) or obj.length < 1 or @length < 1 then return false
    obj.elements[0].appendChild @elements[0]
    return this
  prependTo:(obj)->
    if not(obj instanceof dQuery) or obj.length < 1 or @length < 1 then return false
    obj.elements[0].insertBefore @elements[0],obj.elements[0].firstChild
    return this

$ = (selector)->
  return new dQuery selector
$.extend = (a, b)->
  for key in b
    if b.hasOwnProperty key
      a[key] = b[key]
  return a
$.each = (obj,cb)->
  if obj instanceof Array
    obj.forEach cb
  else if typeof obj.length isnt 'undefined'
    i=0
    while i<obj.length and typeof obj[i] isnt 'undefined'
      cb obj[i],i,obj
      ++i
  else
    for i,val of obj when obj.hasOwnProperty i
      cb val,i,obj
  return

