!function(t,e){t.ajaxDefaults={type:"GET",contentType:"application/x-www-form-urlencoded",url:e.location.href,data:{},dataType:"text",beforeSend:function(){},withCredentials:!1},t.ajax=function(e){return new Promise(function(a,n){e=$.extend({},t.ajaxDefaults,e),e.data=e.data instanceof FormData?e.data:$.serialize(e.data);var r=new XMLHttpRequest;return r.open(e.type,e.url,!0),e.beforeSend(r,e)===!1?n():(e.withCredentials&&(r.withCredentials=!0),e.contentType&&r.setRequestHeader("Content-Type",e.contentType),r.onload=function(){r.status>=200&&r.status<400?"JSON"===e.dataType.toUpperCase()?a(JSON.parse(r.responseText),r):a(r.responseText,r):n(r)},r.onerror=function(){n(r)},void r.send(e.data))})},t.get=function(t,e){return e=e||{},t&&(e.url=t),$.ajax(e)},t.getJSON=function(t,e){var a={};return e&&(a.data=data),t&&(a.url=t),a.dataType="JSON",$.ajax(a)},t.post=function(t,e){var a={};return e&&(a.data=data),t&&(a.url=t),a.type="POST",$.ajax(a)},t.postJSON=function(t,e){var a={};return e&&(a.data=data),t&&(a.url=t),a.type="POST",a.dataType="JSON",$.ajax(a)}}($,window);