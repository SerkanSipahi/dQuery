"use strict";
// Specifications
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

});