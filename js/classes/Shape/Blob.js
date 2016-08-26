define(['shape', 'blank', 'circle'], function(Shape, Blank, Circle) {
	var Blob = function(config) {
		this.parent.init(this, config);
	};

	Blob.extend(Shape);

	Blob.prototype.generatePoints = function(config) {
		var allCircles = []; // stores every circle created. Points are to be combined at the end.
		var origin	= config.origin || {x: 10, y: 10};
		var radius	= config.radius || 3;

		var number	= 2;

		// TODO: values need to be percentages based off of original radius
		var shape = function(origin, radius) {
			var newRadius = radius;

			if( Math.random() > 0.22 ) {
				newRadius--;
			}

			if( newRadius <= 1 ) {
				return false;
			}

			var mainCircle = new Circle({
				origin:	origin,
				radius:	newRadius
			});

			var rand	= Math.random();
			var num	= number;

			if( rand > 0.65 ) {
				num = 1;
			}

			mainCircle.selectEdge().selectRandom({number: num});

			var edgePoints = mainCircle.selected;

			for(var p in edgePoints) {
				var newOrigin = edgePoints[p];

				var subCircle = arguments.callee(newOrigin, newRadius);

				if( subCircle ) {
					mainCircle.add(subCircle);
				}
			}

			return mainCircle;
		}(origin, radius);

		this.points = shape.points;

		/*
		var starter	= new Circle({
			origin:		origin,
			radius:		radius
		});
		starter.selectEdge().selectRandom({number: number});

		for(var i in starter.selected) {
			var point = starter.selected[i];

			(function(origin, radius) {
				var subCircle = new Circle({
					origin:	origin,
					radius:	radius
				});

				var rand	= Math.random();
				var num	= number;
				if( rand > 0.15 ) {
					num = 2;

					if( rand > 0.9 ) {
						num = 1;
					}
				}

				starter.add(subCircle);

				var newRadius = radius - 1;

				if( newRadius <= 1 ) {
					return;
				}

				starter.selectEdge().selectRandom({number: num});

				var edgePoints = starter.selected;

				for(var p in edgePoints) {
					var newOrigin = edgePoints[p];

					arguments.callee(newOrigin, newRadius);
				}
			}(point, radius));
		}

		this.points = starter.points;
		*/


		// Old algorithm
		/*
		// Recursively gather points. Get the points of a circle, then recursively create circles centered along random edge points of that circle.
		(function(origin, radius) {
			var mainCircle	= new Circle({origin: origin, radius: radius});
			var numPoints	= 3;
			var rand		= Math.random();
			var newRadius	= radius;

			// High chance to set "numPoints" to 2, and small chance to set it to 1.
			if( rand > 0.15 ) {
				numPoints = 2;

				if( rand > 0.85 ) {
					numPoints = 1;
				}
			}

			// Add new circle's points to blob, then get some random points along its edge for offshoot circles.
			allCircles.push(mainCircle);
			mainCircle.selectEdge().selectRandom({number: numPoints});

			// Small chance to not reduce radius size.
			if( Math.random() > 0.07 ) {
				newRadius--;
			}

			// Stop if circle radius hits 1 or less.
			if( newRadius <= 1 ) {
				return;
			}

			// Create offshoot circles.
			for(var i in mainCircle.selected) {
				var randPoint = mainCircle.selected[i];

				arguments.callee(randPoint, newRadius);
			}
		}(origin, radius));

		// Add all circle points into this shape's points.
		for(var c in allCircles) {
			var subCircle = allCircles[c];

			for(var p in subCircle.points) {
				var point = subCircle.points[p];

				this.addPoint(point);
			}
		}
		*/
	}

	return Blob;
});
