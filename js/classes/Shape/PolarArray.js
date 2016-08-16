define(['shape', 'rectangle', 'circle', 'spiral'], function(Shape, Rectangle, Circle, Spiral) {
	/**
	 * Creates a shape composed of subshapes rotated about a single origin.
	 *
	 * @param		{object}	config.origin		Point object
	 * @param		{integer}	config.number		Number of subshapes to array about the origin
	 * @param		{integer}	config.radius		Subshapes' distance from the origin
	 * @param		{object}	config.adjust		Point object. How much to offset each subshape's origin before rotation
	 */
	var PolarArray = function(config) {
		config.substantiate = false;
		this.parent.init(this, config);
	}

	PolarArray.extend(Shape);

	PolarArray.prototype.generatePoints = function(config) {
		var origin	= config.origin || {x: 0, y: 0};
		var number	= config.number || 1;
		var radius	= config.radius || 0;
		var adjust	= config.adjust || {x: 0, y: 0};
		var increment	= Math.floor(360 / number);
		var newPoints	= [];

		for(var d = 0; d < 360; d += increment) {
			switch( config.shape.type ) {
				case 'circle':
					var shape = Circle;
					break;
				case 'rectangle':
					var shape = Rectangle;
					break;
				case 'spiral':
					var shape = Spiral;
					break;
				default:
					return;
					break;
			}

			var subArgs	= config.shape.config;

			subArgs.origin			= {x: radius + adjust.x, y: adjust.y};
			subArgs.substantiate	= false;

			var subShape = new shape(subArgs);

			subShape.rotate(d);

			newPoints = newPoints.concat(subShape.points);
		}

		this.points = newPoints;

		this.translate(origin.x, origin.y);
	}

	return PolarArray;
});
