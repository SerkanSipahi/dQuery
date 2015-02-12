(function(LePrototype,w){
  $.ajaxDefaults = {
    type:"GET",
    contentType:'application/x-www-form-urlencoded', // set to null to disable
    url: w.location.href,
    data: {},
    dataType: 'text',
    beforeSend:function(xhr,opts){},
    withCredentials:false
  };
  LePrototype.ajax = function(Opts){
    return new Promise(function(resolve,reject){
      Opts = $.extend({},$.ajaxDefaults,Opts);
      Opts.data = (Opts.data instanceof FormData) ? Opts.data : $.serialize(Opts.data);
      var XHR = new XMLHttpRequest();
      XHR.open(Opts.type,Opts.url,true);
      if(Opts.beforeSend(XHR,Opts) === false){
        return reject();
      }
      if(Opts.withCredentials){
        XHR.withCredentials = true;
      }
      if(Opts.contentType){
        XHR.setRequestHeader("Content-Type",Opts.contentType);
      }
      XHR.onload = function(){
        if (XHR.status >= 200 && XHR.status < 400) {
          // Success!
          if(Opts.dataType.toUpperCase() === 'JSON'){
            resolve(JSON.parse(XHR.responseText),XHR);
          } else {
            resolve(XHR.responseText,XHR);
          }
        } else {
          reject(XHR);
        }
      };
      XHR.onerror = function(){
        reject(XHR);
      };
      XHR.send(Opts.data);
    });
  };
  LePrototype.get = function(url,Opts){
    Opts = Opts || {};
    if(url)
      Opts.url = url;
    return $.ajax(Opts);
  };
  LePrototype.getJSON = function(url,Data){
    var Opts = {};
    if(Data)
      Opts.data = data;
    if(url)
      Opts.url = url;
    Opts.dataType = 'JSON';
    return $.ajax(Opts);
  };
  LePrototype.post = function(url,Data){
    var Opts = {};
    if(Data)
      Opts.data = data;
    if(url)
      Opts.url = url;
    Opts.type = 'POST';
    return $.ajax(Opts);
  };
  LePrototype.postJSON = function(url,Data){
    var Opts = {};
    if(Data)
      Opts.data = data;
    if(url)
      Opts.url = url;
    Opts.type = 'POST';
    Opts.dataType = 'JSON';
    return $.ajax(Opts);
  };
})($,window);