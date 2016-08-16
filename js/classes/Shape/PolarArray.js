define(['shape'], function(Shape) {
	var PolarArray = function(config) {
		this.parent.init(this, config);
	}

	PolarArray.extend(Shape);

	PolarArray.prototype.generatePoints = function(config) {

	}

	return PolarArray;
});
