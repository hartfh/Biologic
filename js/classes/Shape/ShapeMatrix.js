define(function() {
	/**
	 * A helper class for Shape. Allow for easy access to adjacent points.
	 *
	 * @param		{integer}		width
	 * @param		{integer}		height
	 */
	var ShapeMatrix = function(width, height) {
		this.width	= width;
		this.height	= height;
		this.grid		= [];

		for(var x = 0; x < this.width; x++) {
			var column = [];

			for(var y = 0; y < this.height; y++) {
				column.push(false);
			}

			this.grid.push(column);
		}
	};

	/**
	 * Adds Shape points into the ShapeMatrix.
	 *
	 * @param		{object}	shape	A Shape object
	 */
	ShapeMatrix.prototype.loadPoints = function(shape) {
		var points = shape.points;

		for(var i in points) {
			var point = points[i];

			this.grid[point.x][point.y] = true;
		}
	}

	/**
	 * Get a point within this matrix. Returns false if the coordinates are out of bounds.
	 *
	 * @param		{integer}		x
	 * @param		{integer}		y
	 */
	ShapeMatrix.prototype.getPoint = function(x, y) {
		if( x < 0 || x >= this.width ) {
			return false;
		}
		if( y < 0 || y >= this.height ) {
			return false;
		}

		return this.grid[x][y];
	}

	/**
	 * Passes each point to a callback function.
	 *
	 * @param		{function}	callback
	 */
	ShapeMatrix.prototype.eachPoint = function(callback) {
		for(var x = 0; x < this.width; x++) {
			for(var y = 0; y < this.height; y++) {
				var point = this.getPoint(x, y);

				callback(point, x, y);
			}
		}
	}

	/**
	 * Returns a points that are considered to be edges.
	 *
	 * @return	{array}	edgePoints
	 */
	ShapeMatrix.prototype.getEdgePoints = function() {
		var self		= this;
		var edgePoints = [];

		this.eachPoint(function(point, x, y) {
			if( point ) {
				var neighbors = 0;

				if( self.getPoint(x, y + 1) ) {
					neighbors++;
				}
				if( self.getPoint(x, y - 1) ) {
					neighbors++;
				}
				if( self.getPoint(x + 1, y) ) {
					neighbors++;
				}
				if( self.getPoint(x - 1, y) ) {
					neighbors++;
				}

				if( neighbors < 4 ) {
					edgePoints.push({x: x, y: y});
				}
			}
		});

		return edgePoints;
	}

	return ShapeMatrix;
});
