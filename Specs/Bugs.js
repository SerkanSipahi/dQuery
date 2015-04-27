"use strict";

document.addEventListener('DOMContentLoaded', function() {

  describe('dQuery Bugs', function(){
    it("clones all elements #30", function(){
      expect( $("<div></div><div></div>").clone().length ).toBe(2);
      expect( $("<div></div>").clone().length ).toBe(1);
    });
    it("plays well with null in extend #21", function(){
      expect($.extend({},{a:{b:null}},{a:{b:2}}).a.b).toBe(2);
    });
  });

});