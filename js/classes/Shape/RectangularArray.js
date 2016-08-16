define(['shape', 'rectangle', 'circle', 'spiral', 'ordered-field'], function(Shape, Rectangle, Circle, Spiral, OrderedField) {
	var RectangularArray = function(config) {
		this.parent.init(this, config);
	}

	RectangularArray.extend(Shape);

	RectangularArray.prototype.generatePoints = function(config) {
		var args = {
			origin:	config.origin || {x: 0, y: 0},
			width:	config.width || 0,
			height:	config.height || 0,
			spacing:	config.spacing || 1
		};

		var tempField	= new OrderedField(args);
		var subArgs	= config.shape.config;
		var newPoints	= [];

		tempField.eachPoint(function(point, index) {
			subArgs.origin = point;

			switch( config.shape.type ) {
				case 'rectangle':
					var shape = Rectangle;
					break;
				case 'circle':
					var shape = Circle;
					// offset the circle's origin to ensure it's at the true, final center of the shape
					subArgs.origin.x += config.shape.config.radius;
					subArgs.origin.y += config.shape.config.radius;
					break;
				case 'spiral':
					var shape = Spiral;
					var pseudoRadius = Math.floor(config.shape.config.limit * 0.5) - 1;
					subArgs.origin.x += pseudoRadius;
					subArgs.origin.y += pseudoRadius;
					break;
				default:
					return;
					break;
			}

			var subShape = new shape(subArgs);

			newPoints = newPoints.concat(...subShape.points);
		});

		this.points = newPoints;
	}

	return RectangularArray;
});
