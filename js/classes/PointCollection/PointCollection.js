define([], function() {
	var PointCollection = function(config) {};

	PointCollection.prototype.init = function(self, config) {
		self.points = [];

		self.generatePoints(config);
		self.substantiate();
	}

	/**
	 * Loads a point into a collection.
	 *
	 * @param		{object}	point
	 */
	PointCollection.prototype.addPoint = function(point) {
		this.points.push({x: point.x, y: point.y});
	}

	/**
	 * Check if a collection already contains a point.
	 *
	 * @param		{object}		comparePoint
	 * @return	{boolean}
	 */
	PointCollection.prototype.hasPoint = function(comparePoint) {
		var result = false;

		this.eachPoint(function(point) {
			if( point.x == comparePoint.x && point.y == comparePoint.y ) {
				result = true;

				return true;
			}
		});

		return result;
	}

	/**
	 * An abstract method which fills this.points with point objects.
	 */
	PointCollection.prototype.generatePoints = function() {}

	/**
	 * Passes each point to a callback function. Will break the loop if the callback function returns true;
	 *
	 * @param		{function}	callback
	 */
	PointCollection.prototype.eachPoint = function(callback) {
		for(var i in this.points) {
			var point		= this.points[i];

			if( callback(point) ) {
				break;
			}
		}
	}

	/**
	 * Finds the lowest and highest X- and Y-values within a collection.
	 *
	 * @return	{object}
	 */
	PointCollection.prototype.findExtremes = function() {
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
	 * Check if a collection has any negative points and elimnate them by translating it.
	 */
	PointCollection.prototype.substantiate = function() {
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
	PointCollection.prototype.translate = function(x, y) {
		var x = x || 0;
		var y = y || 0;

		this.eachPoint(function(point) {
			point.x += x;
			point.y += y;
		});
	}

	/**
	 * Rotates all points about their calculated center.
	 *
	 * @param		{float}	degrees
	 */
	PointCollection.prototype.rotate = function(degrees) {
		var newPoints = [];

		// Calculate the collection's center by determing the height/width of the occupied space
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
			var newPoint = {x: Math.floor(rotatedX), y: Math.floor(rotatedY)};

			newPoint.x += center.x;
			newPoint.y += center.y;

			newPoints.push(newPoint);
		});

		this.points = newPoints;
	}

	/**
	 * Combine two PointCollection objects into one by combining their points.
	 *
	 * @param		{object}	collection
	 */
	PointCollection.prototype.absorb = function(pointCollection) {
		var self = this;

		pointCollection.eachPoint(function(point) {
			if( !self.hasPoint(point) ) {
				self.addPoint(point);
			}
		});

		delete pointCollection;
	}

	// mirror or flip. vertically vs horizontally
	PointCollection.prototype.mirror = function() {

	}

	// Ensure "array" isn't a protected word
	PointCollection.prototype.array = function() {
		// create a circular array of shapes
	}

	return PointCollection;
});
