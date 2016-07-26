define(['utilities', 'classes/PointCollection/PointCollection'], function(utilities, PointCollection) {
	/**
	 * Creates a circle shape of points.
	 *
	 * @param		{integer}		config.origin	Contains X- and Y-coordinates and marks center of circle
	 * @param		{integer}		config.radius	Radius of circle
	 * @param		{string}		config.types	Which point types to return: edge, interior or all
	 */
	var Circle = function(config) {
		this.init(config);
	};

	Circle.extend(PointCollection);

	Circle.prototype.init = function(config) {
		this.parent.init(this, config);

		var types			= config.types || 'all';
		var points		= [];
		var offsetPoints	= [];
		var origin		= config.origin;
		var radius		= config.radius;

		// Check against "types" argument to see if point should be included
		var shouldIncludePoint = function(point) {
			if( point.type == types || types == 'all' ) {
				return true;
			}

			return false;
		}

		// If supplied radius was 1, should only return the origin
		if( !radius ) {
			points.push({x: origin.x, y: origin.y, type: 'interior'});
		}

		radius--;

		// Get edge points on one 45 deg arc
		for(var i = 0; i < radius; i++) {
			var edgePoint = {type: 'edge'};
			var j = Math.sqrt( (radius * radius) - (i * i) );
			j = Math.round(j);

			if( !isNaN(j) ) {
				edgePoint.x = i;
				edgePoint.y = j;

				if( shouldIncludePoint(edgePoint) ) {
					points.push(edgePoint);
				}
			}
		}

		// Mirror the points into a 90 degree arc
		for(var index in points) {
			var point = points[index];
			var mirrorPoint = {type: 'edge'};

			// Skip any points that will turn out the same after being mirrored
			if( point.x == point.y ) {
				continue;
			}

			mirrorPoint.x = point.y;
			mirrorPoint.y = point.x;

			if( shouldIncludePoint(mirrorPoint) ) {
				points.push(mirrorPoint);
			}
		}

		// Add all points inside the arc
		var previousX = null;

		for(var index in points) {
			var point = points[index];

			// Ensure that the Y values don't repeat to avoid duplicate points
			if(point.x == previousX) {
				continue;
			}

			for(var insideY = point.y - 1; insideY > -1; insideY--) {
				var insidePoint = {type: 'interior'};

				insidePoint.x = point.x;
				insidePoint.y = insideY;

				if( shouldIncludePoint(insidePoint) ) {
					points.push(insidePoint);
				}
			}

			previousX = point.x;
		}

		// Mirror points about Y-axis
		for(var index in points) {
			var point = points[index];
			var mirrorPoint = {};

			if( point.x != 0 ) {
				mirrorPoint.x = -1 * point.x;
				mirrorPoint.y = point.y;
				mirrorPoint.type = point.type;

				if( shouldIncludePoint(mirrorPoint) ) {
					points.push(mirrorPoint);
				}
			}
		}

		// Mirror points about X-axis
		for(var index in points) {
			var point = points[index];
			var mirrorPoint = {};

			if( point.y != 0 ) {
				mirrorPoint.x = point.x;
				mirrorPoint.y = -1 * point.y;
				mirrorPoint.type = point.type;

				if( shouldIncludePoint(mirrorPoint) ) {
					points.push(mirrorPoint);
				}
			}
		}

		// Apply offset to points based on origin
		for(var index in points) {
			var point = points[index];

			var offsetPoint = {};

			offsetPoint.x = point.x + origin.x;
			offsetPoint.y = point.y + origin.y;
			offsetPoint.type = point.type;

			// Any point that touches the grid edge is considered an 'edge' point
			if( offsetPoint.x == 0 ^ offsetPoint.y == 0 ) {
				offsetPoint.type = 'edge';
			}
			if( shouldIncludePoint(offsetPoint) ) {
				offsetPoints.push(offsetPoint);
			}
		}

		this.points = offsetPoints;
	}

	return Circle;
});