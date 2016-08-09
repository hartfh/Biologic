define(['shape'], function(Shape) {
	var CompositeShape = function(config) {
		this.init(config || {});
	}

	CompositeShape.extend(Shape);

	CompositeShape.prototype.init = function(config) {
		this.parent.init(this, config);

		// additions
	}

	CompositeShape.prototype.generatePoints = function(config) {}

	// composite shape methods and algorithms

	return CompositeShape;
});
