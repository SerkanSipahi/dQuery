Migration Guide
=========

To make stuff simpler, dQuery uses Promise for $.ajax-like functions.
You'll need to make these changes If you're using `$.get` ,`$.post` , `$.getJSON` , `$.postJSON` or `$.ajax` in your Code.

#### Good Ones
This type of requests won't need any change. This would work perfectly fine in both jQuery & dQuery.
```js
$.ajax({
  type: "POST",
  url: "some.php",
  data: { name: "John", location: "Boston" }
})
```

#### $.ajax
```js
  $.ajax({
    url: "demo_test.txt",
    success: function(result){
      $("#div1").html(result);
    }
  });
  // Becomes
  $.ajax({
    url: "demo_test.txt",
  }).then(function(result){
    $("#div1").html(result);
  });
```
```js
  $.ajax({
    url: "demo_test.txt",
    error: function(XHR){
      $("#div1").html("Uh Oh, something went wrong");
    }
  });
  // Becomes
  $.ajax({
    url: "demo_test.txt",
  }).catch(function(XHR){
    $("#div1").html("Uh Oh, something went wrong");
  });
```
```js
  $.ajax({
      type: "POST",
    url: "demo_test.txt",
    success: function(result){
      $("#div1").html(result);
    },
    error: function(XHR){
      $("#div1").html("Uh Oh, something went wrong");
    }
  });
  // Becomes
  $.ajax({
    type: "POST",
    url: "demo_test.txt",
  }).done(function(response){
    $("#div1").html(response);
  }).catch(function(XHR){
    $("#div1").html("Uh Oh, something went wrong");
  });
```

#### `$.get`/`$.post`/`$.getJSON`/`$.postJSON`
```js
  $.get('/',function(response){
   console.log(response);
  });
  // Becomes
  $.get('/').then(function(response){
   console.log(response);
  });
```
```js
  $.get('/',{name:"steel"},function(response){
   console.log(response);
  });
  // Becomes
  $.get('/',{name:"steel"}).then(function(response){
   console.log(response);
  });
```