define(['shape', 'rectangle', 'circle', 'spiral'], function(Shape, Rectangle, Circle, Spiral) {
	var LinearArray = function(config) {
		this.parent.init(this, config);
	};

	LinearArray.extend(Shape);

	LinearArray.prototype.generatePoints = function(config) {

	}

	// TODO: finish this

	return LinearArray;
});
