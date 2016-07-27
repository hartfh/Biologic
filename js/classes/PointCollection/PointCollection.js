define([], function() {
	var PointCollection = function(config) {};

	PointCollection.prototype.init = function(self, config) {
		self.points = [];

		self.generatePoints(config);
		self.substantiate();
	}

	/**
	 * An abstract method which fills this.points with point objects.
	 */
	PointCollection.prototype.generatePoints = function() {}

	/**
	 * Passes each point to a callback function.
	 *
	 * @param		{function}	callback
	 */
	PointCollection.prototype.eachPoint = function(callback) {
		for(var i in this.points) {
			var point = this.points[i];

			callback(point);
		}
	}

	/**
	 * Check if a collection has any negative points and elimnate them by translating it.
	 */
	PointCollection.prototype.substantiate = function() {
		var lowestX = 0;
		var lowestY = 0;

		// Find the largest negative X- and Y-values
		this.eachPoint(function(point) {
			if( point.x < lowestX ) {
				lowestX = point.x;
			}
			if( point.y < lowestY ) {
				lowestY = point.y;
			}
		});

		// If any points are negative, translate entire collection to eliminate negative values
		if( lowestX < 0 || lowestY < 0 ) {
			this.translate( Math.abs(lowestX), Math.abs(lowestY) );
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

	PointCollection.prototype.rotate = function() {

	}

	PointCollection.prototype.mirror = function() {
		
	}

	// Ensure "array" isn't a protected word
	PointCollection.prototype.array = function() {
		// create a circular array of shapes
	}

	return PointCollection;
});
