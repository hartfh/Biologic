define(function() {
	var Shape = function(config) {};

	Shape.prototype.init = function(self, config) {
		var config = config || {};
		var density = config.density || 100;

		self.points = [];

		self.generatePoints(config);
		self.randomize(density);
		self.substantiate();
		self.elimDuplicates();
	}

	/**
	 * Loads a point into a shape.
	 *
	 * @param		{object}	point
	 */
	Shape.prototype.addPoint = function(point) {
		this.points.push({x: point.x, y: point.y});
	}

	/**
	 * Abstract method which adds points to this shape.
	 */
	Shape.prototype.generatePoints = function(config) {}

	/**
	 * Passes each point as well as its index to a callback function. Will exit the loop if the callback function returns true.
	 *
	 * @param		{function}	callback
	 */
	Shape.prototype.eachPoint = function(callback) {
		for(var i in this.points) {
			var point	= this.points[i];

			if( callback(point, i) ) {
				break;
			}
		}
	}


	Shape.prototype.elimDuplicates = function() {
		// TODO: remove any duplicate points
		// create a new points array and only load things into it if they're not already in it. Then set new points array as the definitive one.
	}

	/**
	 * Reduces a shape's points to a randomly chosen subset.
	 *
	 * @param		{float}	density	A float ranging from 0 - 100 that expresses the percentage of a shape's points that should remain
	 */
	Shape.prototype.randomize = function(density) {
		var percentToKeep	= density / 100;
		var randomPoints	= [];

		if( percentToKeep < 1 ) {
			this.eachPoint(function(point) {
				if( Math.random() < percentToKeep ) {
					randomPoints.push(point);
				}
			});

			this.points = randomPoints;
		}
	}

	/**
	 * Finds the lowest and highest X- and Y-values within a shape.
	 *
	 * @return	{object}		Contains "highest" and "lowest" properties, each of which is a point object
	 */
	Shape.prototype.findExtremes = function() {
		var lowestX	= 0;
		var lowestY	= 0;
		var highestX	= 0;
		var highestY	= 0;

		this.eachPoint(function(point) {
			if( point.x < lowestX ) {
				lowestX = point.x;
			}
			if( point.y < lowestY ) {
				lowestY = point.y;
			}
			if( point.x > highestX ) {
				highestX = point.x;
			}
			if( point.y > highestY ) {
				highestY = point.y;
			}
		});

		return {
			lowest:	{x: lowestX, y: lowestY},
			highest:	{x: highestX, y: highestY}
		};
	}

	/**
	 * Check if a shape has any negative points and if so eliminate them by translating it.
	 */
	Shape.prototype.substantiate = function() {
		var extremes = this.findExtremes();

		// If any points are negative, translate entire collection to eliminate negative values
		if( extremes.lowest.x < 0 || extremes.lowest.y < 0 ) {
			this.translate( Math.abs(extremes.lowest.x), Math.abs(extremes.lowest.y) );
		}
	}

	/**
	 * Shifts all points by two integer amounts.
	 *
	 * @param		{integer}		x
	 * @param		{integer}		y
	 */
	Shape.prototype.translate = function(x, y) {
		var x = x || 0;
		var y = y || 0;

		this.eachPoint(function(point) {
			point.x += x;
			point.y += y;
		});
	}

	// TODO: possibly bugged on shapes with an even width
	/**
	 * Rotates all points about their calculated center.
	 *
	 * @param		{float}	degrees
	 */
	Shape.prototype.rotate = function(degrees) {
		var newPoints = [];

		// Calculate the shape's center by determing the height/width of the occupied space
		var extremes	= this.findExtremes();

		var width		= extremes.highest.x - extremes.lowest.x;
		var height	= extremes.highest.y - extremes.lowest.y;

		var centerX	= Math.ceil( extremes.lowest.x + (width * 0.5) );
		var centerY	= Math.ceil( extremes.lowest.y + (height * 0.5) );
		var center	= {x: centerX, y: centerY};

		var radians	= degrees * Math.PI / 180;

		// Rotate each point about the calculated center
		this.eachPoint(function(point) {
			point.x -= center.x;
			point.y -= center.y;

			var rotatedX = point.x * Math.cos(radians) - point.y * Math.sin(radians);
			var rotatedY = point.y * Math.cos(radians) + point.x * Math.sin(radians);
			var newPoint = {x: Math.round(rotatedX), y: Math.round(rotatedY)};

			newPoint.x += center.x;
			newPoint.y += center.y;

			newPoints.push(newPoint);
		});

		this.points = newPoints;
	}

	// TODO: possibly bugged on shapes with an even height
	Shape.prototype.flipY = function() {
		var extremes	= this.findExtremes();
		var centerY	= extremes.highest.y * 0.5;

		this.eachPoint(function(point, index) {
			var diff = point.y - centerY;

			point.y = centerY - diff;
		});
	}

	// TODO: possibly bugged on shapes with an even width
	Shape.prototype.flipX = function() {
		var extremes	= this.findExtremes();
		var centerX	= extremes.highest.x * 0.5;

		this.eachPoint(function(point, index) {
			var diff = point.x - centerX;

			point.x = centerX - diff;
		});
	}

	return Shape;
});
