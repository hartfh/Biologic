define(['shape'], function(Shape) {
	var RectangularArray = function(config) {
		this.parent.init(this, config);
	}

	RectangularArray.extend(Shape);

	RectangularArray.prototype.generatePoints = function() {

	}

	return RectangularArray;
});
