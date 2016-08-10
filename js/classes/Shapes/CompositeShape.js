define(['utilities', 'shape'], function(utilites, Shape) {
	var CompositeShape = function(config) {
		this.init(config || {});
	}

	CompositeShape.extend(Shape);

	CompositeShape.prototype.init = function(config) {
		this.parent.init(this, config);

		// additions
	}

	// CompositeShape.prototype.array = function() {}

	// gather simple shapes
	// rotate or flip some
	// combine

	return CompositeShape;
});
