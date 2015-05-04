dQuery
======
dQuery is a extremely lightweight DOM Manipulation library (like jQuery). Because dQuery uses vanilla API for complex operations, It's fast as hell and just 16kb (unminified).

dQuery aims to be 99.9% API compatible with jQuery, If you have existing jQuery code, there's a huge chance that it will run on dQuery without any kind-of change. Even the jQuery plugins that you use on your website.

if you know jQuery, then you already know dQuery, it's the same thing, dQuery supports all the major browsers, even IE (I <3 Dinosaurs ).

#### Ajax
dQuery's Ajax API is different than jQuery's, dQuery uses Promises instead of success and error callbacks.
An example usage would be
```js
$.ajax({
  url: "/",
  type: "POST",
  dataType: "JSON",
  data: {key: "value"}
}).then(function(Result){
  console.log(Result);
}).catch(function(Error){
  console.log(Error);
});
// or maybe
$.post('/', {key: "value"}).then(JSON.parse).then(function(Result){
  console.log(Result);
}).catch(function(Error){
  console.log(Error);
});
```

#### License
This project is licensed under the terms of MIT License. See the LICENSE file for more info.