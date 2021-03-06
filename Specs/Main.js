"use strict";
// Specifications
document.addEventListener('DOMContentLoaded', function(){

describe("dQuery", function() {
  describe("constructor", function(){
    it("accepts css selectors", function(){
      expect( $("div[id=Demo]").length ).toBe(1);
    });
    it("accepts id selectors", function(){
      expect( $("#Demo").length ).toBe(1);
    });
    it("accepts class selectors", function(){
      expect( $(".Demo").length ).toBe(1);
    });
    it("accepts tag name selectors", function(){
      expect( $("custom-element").length ).toBe(1);
    });
    it("creates DOM from string", function(){
      expect( $("<p>Hey</p><p>Yo</p>").length ).toBe(2);
    });
    it("accepts DOMElements", function(){
      expect( $(document.getElementById('Demo')).length ).toBe(1);
    });
  });
  describe("events", function(){
    describe("on", function(){
      it("triggers events infinite times", function(){
        var
          El = $("<div />"),
          Times = 0,
          Event = null;
        El.on('click', function(e){
          ++Times;
          e.times = Times;
        });
        El.trigger(Event = $.Event('click'));
        expect(Event.times).toBe(1);
        El.trigger(Event = $.Event('click'));
        expect(Event.times).toBe(2);
      });
      it("accepts 3 arguments too", function(){
        let Listener = null;
        let Event = $.Event('click');
        $(document).on('click', 'form', Listener = function(e){
          e.events_on_3args = true;
        });
        $("form").trigger(Event);
        expect(Event.events_on_3args).toBe(true);
      });
    });
    describe("off", function(){
      it("cancels event listeners with 2 arguments", function(){
        var
          El = $("<div />"),
          Times = 0,
          Event = null;
        El.on('click', function(e){
          ++Times;
          e.times = Times;
        });
        El.trigger(Event = $.Event('click'));
        expect(Event.times).toBe(1);
        El.off('click');
        El.trigger(Event = $.Event('click'));
        expect(Event.times).toBeUndefined();
      });
      it("cancels event listeners with 3 arguments", function(){
        let Listener = null;
        let Event = null;
        $(document).on('click', 'form', Listener = function(e){
          e.testing = true;
        });
        $("form").trigger(Event = $.Event('click'));
        expect(Event.testing).toBe(true);
        $(document).off('click', Listener);
        $("form").trigger(Event = $.Event('click'));
        expect(Event.testing).toBeUndefined();
      });
      it("can cancel only one listener", function(){
        var
          El = $("<div />"),
          Times = 0,
          Event = null,
          Listener = null;
        El.on('click', Listener =function(e){
          ++Times;
          e.times = Times;
        });
        El.on('click', function(e){
          ++Times;
          e.times = Times;
        });
        El.trigger(Event = $.Event('click'));
        expect(Event.times).toBe(2);
        El.off('click', Listener);
        El.trigger(Event = $.Event('click'));
        expect(Event.times).toBe(3);
      });
    });
    describe("once", function(){
      it("triggers callbacks only once", function(){
        var
          El = $("<div />"),
          Times = 0,
          Event = null;
        El.once('click', function(e){
          ++Times;
          e.times = Times;
        });
        El.trigger(Event = $.Event('click'));
        expect(Event.times).toBe(1);
        El.trigger(Event = $.Event('click'));
        expect(Event.times).toBeUndefined();
      });
      it("expects 3 arguments too", function(){
        var
          Listener = null,
          Event = null;
        $(document).once('click', 'form', Listener = function(e){
          e.once_3args = true;
        });
        $("form").trigger(Event = $.Event('click'));
        expect(Event.once_3args).toBe(true);
        $(document).off('click', Listener);
        $("form").trigger(Event = $.Event('click'));
        expect(Event.times).toBeUndefined();
      });
    });
  });
  describe('eq',function(){
    it("returns a new dQuery object with that el", function(){
      let Parent = $("<div></div><div></div>");
      let Derived = Parent.eq(0);
      expect(Parent.length).toBe(2);
      expect(Derived.length).toBe(1);
    });
    it("returns empty on invalid offset", function(){
      let Parent = $("<div></div><div></div>");
      let Derived = Parent.eq(4);
      expect(Parent.length).toBe(2);
      expect(Derived.length).toBe(0);
    });
  });
  describe('select', function(){
    it('selects the specified element', function(){
      let Element = $("<div></div><div></div>");
      expect(Element.length).toBe(2);
      Element.select(0);
      expect(Element.length).toBe(1);
    });
    it('empties the object when invalid index is specified', function(){
      let Element = $("<div></div><div></div>");
      expect(Element.length).toBe(2);
      Element.select(12313);
      expect(Element.length).toBe(0);
    });
  });
  describe('selectChild', function(){
    it("returns a new dQuery object with that child", function(){
      let Element = $("<div><div></div></div>");
      expect(Element.Elements[0].childNodes.length).toBe(1);
      Element.selectChild(0);
      expect(Element.Elements[0].childNodes.length).toBe(0);
    });
    it("accepts a second argument as well", function(){
      let Element = $("<div></div><div><div><div></div><div></div></div></div>");
      expect(Element.Elements[0].childNodes.length).toBe(0);
      Element.selectChild(1,0);
      expect(Element.Elements[0].childNodes.length).toBe(2);
    });
  });
  describe('find', function(){
    it("works", function(){
      expect( $(document.body).find("form[id=form]").length ).toBe(1);
      expect( $(document.body).find("form[id=form]:first-child").length ).toBe(1);
      expect( $(document.body).find("form[id=form]:last-child").length ).toBe(1);
      expect( $(document.body).find("custom-element").length ).toBe(1);
    });
  });
  describe("children", function(){
    it("works without a single parameter", function(){
      expect( $("<div><div></div><div></div></div>").children().length ).toBe(2);
    });
    it("accepts a selector as a parameter", function(){
      expect( $("<div><div></div><div class='hey'></div></div>").children('.hey').length ).toBe(1);
    });
  });
  describe("forEach", function(){
    let Element = $("<div></div><div></div><div></div><div></div><div></div>");
    it("passes the element as the first argument", function(){
      Element.forEach(function(Element){
        expect(Element instanceof HTMLElement).toBe(true);
      });
    });
    it("stops when you throw a null exception", function(){
      let Times = 0;
      Element.forEach(function(){
        ++ Times;
        throw null;
      });
      expect(Times).toBe(1);
    });
    it("re-throws a non-null exception", function(){
      let Exception;
      try {
        Element.forEach(function(){
          throw new Error("ERROR!");
        });
      } catch(err){Exception = err;}
      expect(Exception).toBeDefined();
    });
  });
  describe("first", function(){
    let Element = $("<div data-first='yes'></div><div></div>");
    it("returns a new dQuery object with the first element", function(){
      expect( Element.first().attr('data-first') ).toBe('yes');
    });
  });
  describe("last", function(){
    let Element = $("<div data-first='yes'></div><div></div>");
    it("returns a new dQuery object with the last element", function(){
      expect( Element.last().attr('data-first') ).toBeNull();
    });
  });
  describe("next", function(){
    it("returns a new dQuery object with the next sibling", function(){
      expect( $("input[name=name]").next().Elements[0].tagName ).toBe('CUSTOM-ELEMENT');
    });
  });
  describe("prev", function(){
    it("returns a new dQuery object with the prev sibling", function(){
      expect( $("custom-element").prev().Elements[0].tagName ).toBe('INPUT');
    });
  });
  describe("closest", function(){
    it("finds the closest first match of the selector", function(){
      let Element = $("<div><div><custom-element attr='yes'></custom-element><custom-element attr='no'></custom-element></div></div>");
      expect( Element.closest('custom-element').attr('attr') ).toBe('yes');
    });
  });
  describe("ready", function(){
    it("works", function(){
      $(document).ready(function(){
        expect(true).toBe(true);
      });
    })
  });
  describe('matches', function(){
    it('works', function(){
      expect( $("<div data-yes></div>").matches('div[data-no]') ).toBe(false);
      expect( $("<div data-yes></div>").matches('div[data-yes]') ).toBe(true);
    });
  });
  describe("hasParent", function(){
    it("works", function(){
      expect( $("<div><c-el></c-el></div>").selectChild(0).hasParent('div') ).toBe(true);
      expect( $("<div data-yes><c-el></c-el></div>").selectChild(0).hasParent('div[data-no]') ).toBe(false);
      expect( $("<div data-yes><c-el></c-el></div>").selectChild(0).hasParent('div[data-yes]') ).toBe(true);
    });
  });
  describe("css", function(){
    let Element = $("<div></div>");
    it("can get css of an el", function(){
      expect( $(document.body).css('width') ).toBeTruthy();
    });
    it("can set css of an el", function(){
      expect( Element.css('display', 'none').css('display') ).toBe('none');
    });
  });
  describe("hide", function(){
    let Element = $("<div>Hey</div>");
    it("works", function(){
      $(document.body).append(Element);
      expect(Element.css('width')).toBeDefined();
      Element.hide();
      expect(Element.css('width')).toBe('auto');
      Element.remove();
    });
  });
  describe("classes", function(){
    let Element = $("<div></div>");
    it("can add a class", function(){
      Element.addClass("test");
      expect(true).toBeTruthy();
    });
    it("can check if a class exists", function(){
      expect(Element.hasClass('test')).toBe(true);
    });
    it("can remove a class", function(){
      Element.removeClass('test');
      expect(true).toBeTruthy();
    });
    it("can toggle a class", function(){
      Element.toggleClass('test');
      expect(Element.hasClass('test')).toBe(true);
      Element.removeClass('test');
    });
    it("works with multiple classes too", function(){
      Element.addClass('test test2 test3');
      expect(Element.hasClass('test')).toBe(true);
      expect(Element.hasClass('test2')).toBe(true);
      expect(Element.hasClass('test3')).toBe(true);
      Element.toggleClass("test test2");
      expect(Element.hasClass('test')).toBe(false);
      expect(Element.hasClass('test2')).toBe(false);
      expect(Element.hasClass('test3')).toBe(true);
      Element.removeClass('Hey test3');
      expect(Element.hasClass('test')).toBe(false);
    });
  });
  describe("parent", function(){
    it("works", function(){
      expect( $("<div><cus-el></cus-el></div>").selectChild(0).parent().Elements[0].tagName ).toBe('DIV');
    });
  });
  describe("focus", function(){
    it("works", function(){
      let Element = $("<input type='email' />");
      $(document.body).prepend(Element);
      Element.focus();
      expect(Element.matches(':focus')).toBe(true);
      Element.remove();
    });
  });
  describe("prop", function(){
    it("works", function(){
      let Element = $("<input type='email' disabled />");
      expect(Element.prop('disabled')).toBe(true);
      Element.prop('disabled', false);
      expect(Element.prop('disabled')).toBe(false);
    });
  });
  describe("proxy", function(){
    it("works", function(){
      var a = {b: 1};
      $.proxy(function(c){
        expect(this.b).toBe(1);
        expect(c).toBe("Hey");
      }, a, "Hey")();
    });
  });
  describe('isFunction', function(){
    it('works', function(){
      expect($.isFunction(null)).toBe(false);
      expect($.isFunction(function(){})).toBe(true);
    });
  });
  describe("data", function(){
    it("reads data-* from elements", function(){
      expect($("<div data-test='yes' />").data().test).toBe('yes');
      expect($("<div data-test='yes' />").data('test')).toBe('yes');
    });
    it("works normally", function(){
      expect($("<div />").data('yes', 'yes').data('yes')).toBe('yes');
    });
    it("works with objects", function(){
      expect($("<div />").data('yes', {a:{b:1}}).data('yes').a.b).toBe(1);
    });
  });
  describe("$.each", function(){
    it("works", function(){
      $.each({a: 1}, function(key, value){
        expect(key).toBe('a');
        expect(value).toBe(1);
      });
      $.each(['1'], function(key, value){
        expect(key).toBe(0);
        expect(value).toBe('1');
      });
    });
  });
});
});