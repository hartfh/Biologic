define(function() {
     Function.prototype.extend = function(superclass) {
          this.prototype = new superclass();
          this.prototype.constructor = this;
		this.prototype.parent = superclass.prototype;

          return this;
     }
});
