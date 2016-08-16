define(['shape', 'rectangle', 'circle', 'spiral'], function(Shape, Rectangle, Circle, Spiral) {
	var PolarArray = function(config) {
		this.parent.init(this, config);
	}

	PolarArray.extend(Shape);

	PolarArray.prototype.generatePoints = function(config) {
		var origin	= config.origin || {x: 0, y: 0};
		var number	= config.number || 1;
		var increment	= Math.floor(360 / number);

		for(var d = 0; d < 360; d += increment) {
			switch( config.shape.type ) {
				case 'rectangle':
					var shape = Rectangle;
					break;
				default:
					return;
					break;
			}

			// generate new shape
			// rotate it
			// translate it (translation can be )
			// add points
		}
	}

	return PolarArray;
});
