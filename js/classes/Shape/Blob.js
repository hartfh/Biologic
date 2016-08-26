define(['shape', 'circle'], function(Shape, Circle) {
	var Blob = function(config) {
		this.parent.init(this, config);
	};

	Blob.extend(Shape);

	Blob.prototype.generatePoints = function(config) {
		var allCircles = []; // stores every circle created. Points are to be combined at the end. Then eliminate duplicates(?)

		var origin	= config.origin || {x: 6, y: 6};
		var radius	= config.radius || 3;
		//var density	= 10;

		// Recursively gather points. Get the points of a circle, then create recursive circles centered along random points of that circle.
		(function(origin, radius) {
			var mainCircle		= new Circle({origin: origin, radius: radius});
			var mainRandPoints	= new Circle({origin: origin, radius: radius});

			var num = 3;
			var rand = Math.random();

			if( rand > 0.15 ) {
				num = 2;

				if( rand > 0.85 ) {
					num = 1;
				}
			}
			mainRandPoints.selectEdge().selectRandom({number: num});

			allCircles.push(mainCircle);

			var newRadius = radius;

			if( Math.random() > 0.07 ) {
				newRadius--;
			}
			//console.log(newRadius)

			if( newRadius <= 1 ) {
				return;
			}

			for(var i in mainRandPoints.selected) {
				var randPoint = mainRandPoints.selected[i];

				arguments.callee(randPoint, newRadius);
			}
		}(origin, radius));

		// Add all circle points into this shape's points
		for(var c in allCircles) {
			var subCircle = allCircles[c];

			for(var p in subCircle.points) {
				var point = subCircle.points[p];

				this.addPoint(point);
			}

		}
	}

	return Blob;
});
