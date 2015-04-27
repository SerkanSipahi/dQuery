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
        El.trigger(Event = $.event('click'));
        expect(Event.times).toBe(1);
        El.trigger(Event = $.event('click'));
        expect(Event.times).toBe(2);
      });
      it("accepts 3 arguments too", function(){
        let Listener = null;
        let Event = $.event('click');
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
        El.trigger(Event = $.event('click'));
        expect(Event.times).toBe(1);
        El.off('click');
        El.trigger(Event = $.event('click'));
        expect(Event.times).toBeUndefined();
      });
      it("cancels event listeners with 3 arguments", function(){
        let Listener = null;
        let Event = null;
        $(document).on('click', 'form', Listener = function(e){
          e.testing = true;
        });
        $("form").trigger(Event = $.event('click'));
        expect(Event.testing).toBe(true);
        $(document).off('click', Listener);
        $("form").trigger(Event = $.event('click'));
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
        El.trigger(Event = $.event('click'));
        expect(Event.times).toBe(2);
        El.off('click', Listener);
        El.trigger(Event = $.event('click'));
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
        El.trigger(Event = $.event('click'));
        expect(Event.times).toBe(1);
        El.trigger(Event = $.event('click'));
        expect(Event.times).toBeUndefined();
      });
      it("expects 3 arguments too", function(){
        var
          Listener = null,
          Event = null;
        $(document).once('click', 'form', Listener = function(e){
          e.once_3args = true;
        });
        $("form").trigger(Event = $.event('click'));
        expect(Event.once_3args).toBe(true);
        $(document).off('click', Listener);
        $("form").trigger(Event = $.event('click'));
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
});
});