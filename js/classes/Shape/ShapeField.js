define(['shape'], function(Shape) {
	var ShapeField = function(config) {
		this.parent.init(this, config);
	};

	ShapeField.extend(Shape);

	ShapeField.prototype.generatePoints = function() {

	};

	return ShapeField;
});
