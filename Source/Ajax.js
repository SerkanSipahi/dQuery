"use strict";

$dQuery.ajaxDefaults = {
  type:"GET",
  contentType:'application/x-www-form-urlencoded', // set to null to disable
  url: window.location.href,
  data: {},
  dataType: 'text',
  beforeSend:function(xhr,opts){},
  withCredentials:false
};
$dQuery.ajax = function(Opts){
  return new Promise(function(resolve,reject){
    Opts = $dQuery.extend({},$dQuery.ajaxDefaults,Opts);
    Opts.data = (Opts.data instanceof FormData) ? Opts.data : $dQuery.serialize(Opts.data);
    var XHR = new XMLHttpRequest();
    XHR.open(Opts.type,Opts.url,true);
    if(Opts.beforeSend(XHR,Opts) === false){
      return reject(new Error("Rejected in beforeSend"));
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
        reject(new Error("HTTP Error"), XHR);
      }
    };
    XHR.onerror = function(){
      reject(XHR);
    };
    XHR.send(Opts.data);
  });
};
$dQuery.get = function(url,Opts){
  Opts = Opts || {};
  if(url)
    Opts.url = url;
  return $dQuery.ajax(Opts);
};
$dQuery.getJSON = function(url,Data){
  var Opts = {};
  if(Data)
    Opts.data = data;
  if(url)
    Opts.url = url;
  Opts.dataType = 'JSON';
  return $dQuery.ajax(Opts);
};
$dQuery.post = function(url,Data){
  var Opts = {};
  if(Data)
    Opts.data = data;
  if(url)
    Opts.url = url;
  Opts.type = 'POST';
  return $dQuery.ajax(Opts);
};
$dQuery.postJSON = function(url,Data){
  var Opts = {};
  if(Data)
    Opts.data = data;
  if(url)
    Opts.url = url;
  Opts.type = 'POST';
  Opts.dataType = 'JSON';
  return $dQuery.ajax(Opts);
};
