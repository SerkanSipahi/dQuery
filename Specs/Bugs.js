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
    it("accepts booleans in $.extend #34", function(){
      expect($.extend(true, {a:{b:1}}).a.b).toBe(1);
    });
    it("passes index as first argument to dQuery.fn.each #35", function(){
      $("<div></div>").each(function(Index){
        expect(Index).toBe(0);
      }).forEach(function(Item, Index){
        expect(Index).toBe(0);
      });
    });
    it("looks for indirect children in dQuery.fn.closest #37", function(){
      expect($(
        `<div>
          <div class="first"></div>
          <div class="second">
            <input />
          </div>
        </div>`
      ).find('.first').closest('input').length).toBe(1);
    });
  });

});