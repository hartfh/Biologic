define(['shape-matrix'], function(ShapeMatrix) {
	/**
	 * An abstract parent class for creating shapes made up of point objects containing X- and Y-coordinates.
	 *
	 * @param		{object}	config				Configuration object
	 * @param		{integer}	config.density			What percentage of randomly chosen points to keep
	 * @param		{boolean}	config.substantiate		Determines whether to call this.substantiate()
	 */
	var Shape = function(config) {};

	Shape.prototype.init = function(self, config) {
		var config		= config || {};
		var density		= config.density || 100;
		var substantiate	= config.substantiate;

		if( typeof(config.substantiate) == 'undefined' ) {
			substantiate = true;
		}

		self.points	= [];
		self.selected	= [];

		self.generatePoints(config);
		self.eliminateDuplicates();

		if( substantiate ) {
			self.substantiate();
		}

		self.selectAll();

		//self.pushToOrigin();
	}

	/**
	 * Abstract method which adds points to this shape.
	 */
	Shape.prototype.generatePoints = function(config) {}

	/**
	 * Loads a point into a shape.
	 *
	 * @param		{object}	point
	 */
	Shape.prototype.addPoint = function(point) {
		this.points.push({x: point.x, y: point.y});
	}

	Shape.prototype.selectAll = function() {
		this.selected = this.points;

		return this;
	}

	/**
	 * Reduces a shape's selected points to just those lying on the edge.
	 *
	 * @param		{object}	config				Configuration object
	 * @param		{boolean}	config.substantiate		Whether or not to temporarily set all points to positive for use in a ShapeMatrix.
	 * @param		{boolean}	config.greedy			Whether or not to include diagonal points when determining edges
	 * @return	{object}	this
	 */
	Shape.prototype.selectEdge = function(config) {
		var config		= config || {};
		var greedy		= config.greedy || false;
		var substantiate	= config.substantiate || false;
		var types			= this.separateTypes({
			greedy:		greedy,
			substantiate:	substantiate
		});

		this.selected = types.edge;

		return this;
	}

	/**
	 * Reduces a shape's selected points to just those lying on the interior.
	 *
	 * @param		{object}	config				Configuration object
	 * @param		{boolean}	config.substantiate		Whether or not to temporarily set all points to positive for use in a ShapeMatrix.
	 * @param		{boolean}	config.greedy			Whether or not to include diagonal points when determining edges
	 * @return	{object}	this
	 */
	Shape.prototype.selectInside = function(config) {
		var config		= config || {};
		var greedy		= config.greedy || false;
		var substantiate	= config.substantiate || false;
		var types			= this.separateTypes({
			greedy:		greedy,
			substantiate:	substantiate
		});

		this.selected = types.inside;

		return this;
	}

	/**
	 * Reduces a shape's selected points to a randomly chosen subset.
	 *
	 * @param		{object}	config			Configuration object
	 * @param		{float}	config.density		A float ranging from 0 - 100 that expresses the percentage of a shape's points that should remain
	 * @param		{integer}	config.number		Number of points to randomly select
	 * @return	{object}	this
	 */
	Shape.prototype.selectRandom = function(config) {
		var percentToKeep	= config.density / 100;
		var numberToGet	= config.number || false;
		var randomPoints	= [];

		if( percentToKeep < 1 ) {
			this.eachSelected(function(point) {
				if( Math.random() < percentToKeep ) {
					randomPoints.push(point);
				}
			});
		}

		if( numberToGet ) {
			if( numberToGet > this.selected.length ) {
				numberToGet = this.selected.length;
			}

			for(var n = 0; n < numberToGet; n++) {
				var randIndex = Math.floor( Math.random() * this.selected.length );

				randomPoints.push( this.selected[randIndex] );

				this.selected.splice(randIndex, 1);
			}
		}

		this.selected = randomPoints;

		return this;
	}

	/**
	 * Reduces a shape's points to just those in the "selected" property.
	 *
	 * @return	{object}	this
	 */
	Shape.prototype.saveSelected = function() {
		this.points = this.selected;

		return this;
	}

	/**
	 * Passes each point as well as its index to a callback function. Will exit the loop if the callback function returns true.
	 *
	 * @param		{function}	callback
	 */
	Shape.prototype.eachPoint = function(callback) {
		for(var index in this.points) {
			var point	= this.points[index];

			if( callback(point, index) ) {
				break;
			}
		}
	}

	/**
	 * Passes each selected point as well as its index to a callback function. Will exit the loop if the callback function returns true.
	 *
	 * @param		{function}	callback
	 */
	Shape.prototype.eachSelected = function(callback) {
		for(var index in this.selected) {
			var point	= this.selected[index];

			if( callback(point, index) ) {
				break;
			}
		}
	}

	/**
	 * Combine the points in one shape with another.
	 *
	 * @param		{object}	shape 	A Shape Object
	 */
	Shape.prototype.add = function(shape) {
		var self = this;

		shape.eachPoint(function(point) {
			self.addPoint(point);
		});

		this.eliminateDuplicates();

		return this;
	}

	/**
	 * Remove the points in one shape from another.
	 *
	 * @param		{object}	shape	A Shape object
	 */
	Shape.prototype.subtract = function(shape) {
		// Rather than splicing out point indices from this.points, simply track the points to keep in a new array
		var newPoints = [];

		this.eachPoint(function(point) {
			var keep = true;

			shape.eachPoint(function(subtractPoint, subtractIndex) {
				if( point.x == subtractPoint.x && point.y == subtractPoint.y ) {
					keep = false;

					return true;
				}
			});

			if( keep ) {
				newPoints.push(point);
			}
		});

		this.points = newPoints;

		return this;
	}

	Shape.prototype.grow = function() {
		var self = this;

		this.selectEdge();

		this.eachPoint(function(point, index) {
			self.addPoint({x: point.x + 1, y: point.y});
			self.addPoint({x: point.x - 1, y: point.y});
			self.addPoint({x: point.x, y: point.y + 1});
			self.addPoint({x: point.x, y: point.y - 1});
		});

		this.selectAll();
		this.eliminateDuplicates();

		return this;
	}

	/**
	 * Removes any duplicate points from the shape.
	 */
	Shape.prototype.eliminateDuplicates = function() {
		var uniquePoints = [];

		this.eachPoint(function(point, index) {
			var add = true;

			for(var u in uniquePoints) {
				var uniquePoint = uniquePoints[u];

				if( uniquePoint.x == point.x && uniquePoint.y == point.y ) {
					add = false;
					break;
				}
			}

			if( add ) {
				uniquePoints.push(point);
			}
		});

		this.points = uniquePoints;
	}

	/**
	 * Separate shape's points into "inside" and "edge" points.
	 *
	 * @param		{object}	config				Configuration object
	 * @param		{boolean}	config.substantiate		Whether or not to temporarily set all points to positive for use in a ShapeMatrix.
	 * @param		{boolean}	config.greedy			Whether or not to include diagonal points when determining edges
	 */
	Shape.prototype.separateTypes = function(config) {
		var config		= config || {};
		var substantiate	= config.substantiate || false;
		var greedy		= config.greedy || false;

		var extremes	= this.findExtremes();
		var width		= extremes.highest.x + 1;
		var height	= extremes.highest.y + 1;

		if( substantiate ) {
			this.substantiate();

			var tempExtremes	= this.findExtremes();
			var width			= tempExtremes.highest.x + 1;
			var height		= tempExtremes.highest.y + 1;
		}

		var matrix = new ShapeMatrix(width, height);

		matrix.loadPoints(this);

		var types = matrix.separateTypes(greedy);

		// Unsubstantiate the shape
		if( substantiate ) {
			this.translate(extremes.lowest.x, extremes.lowest.y);
		}

		return types;
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

	Shape.prototype.scale = function() {
		
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

		/*
		// Calculate the shape's center
		var extremes	= this.findExtremes();
		var width		= extremes.highest.x;
		var height	= extremes.highest.y;

		var centerX	= Math.ceil( (width * 0.5) );
		var centerY	= Math.ceil( (height * 0.5) );
		var center	= {x: centerX, y: centerY};
		*/

		var radians	= degrees * Math.PI / 180;

		//this.translate(-1 * centerX, -1 * centerY);

		this.eachPoint(function(point) {
			var rotatedX = point.x * Math.cos(radians) - point.y * Math.sin(radians);
			var rotatedY = point.y * Math.cos(radians) + point.x * Math.sin(radians);
			var newPoint = {x: Math.round(rotatedX), y: Math.round(rotatedY)};

			newPoints.push(newPoint);
		});

		this.points = newPoints;
		this.selected = newPoints;

		return this;

		//this.translate(centerX, centerY);
		//this.substantiate();
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
