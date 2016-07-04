define(['utilities', 'classes/Matrix/Matrix'], function(utilities, Matrix) {
	var Circle = function(radius) {
		this.init(radius);
	};

	Circle.extend(Matrix);

	Circle.prototype.init = function(radius) {
		this.parent.init(radius, radius);
	}

	return Circle;
});
