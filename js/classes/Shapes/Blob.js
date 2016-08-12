define(['shape', 'circle'], function(Shape, Circle) {
	var Blob = function(config) {
		this.parent.init(this, config);
	};

	Blob.extend(Shape);

	Blob.prototype.generatePoints = function(config) {
		var allCircles = []; // stores every circle created. Points are to be combined at the end. Then eliminate duplicates(?)

		var center = config.center || {x: 0, y: 0};
		var radius = config.center || 3;

		// Recursively gather points. Get the points of a circle, then create recursive circles centered along random points of that circle.
		(function(center, radius) {
			var mainCircle		= new Circle({center: center, radius: radius});
			var mainRandPoints	= new Circle({center: center, radius: radius, type: 'edge', density: 20});

			allCircles.push(mainCircle);

			var newRadius = radius - 1;

			if( newRadius == 1 ) {
				return;
			}

			for(var i in mainRandPoints.points) {
				var randPoint = mainRandPoints.points[i];

				arguments.callee(randPoint, newRadius);
			}
		}(center, radius));

		// combine all circle points
		for(var c in allCircles) {
			var subCircle = allCircles[c];

			// eliminate duplicates
		}

		// this.addPoint({});

		// currently can only do "all" circle points. Cannot select "edge" or "interior".

		console.log(allCircles);
	}

	return Blob;
});
