define(['classes/NodeOld', 'compass'], function(NodeOld, Compass) {
	var Matrix = function(config) {
		this.init(config);
	};

	// TODO: edge detection methods?
	// TODO: borders around edges of shapes
	// TODO: grow or expand edges by 1pt
	// TODO: center point or center line finding method
	// create matrix factory pattern? generates random or semi-random matrices

	// extend into various "creation patterns"
	// possibly have seed() run at init() based on child class specs

	// Right triangle

	// Circular grid of points (points lie along edge of circle)
	// make use of rotate. get one point, rotate, copy, rotate, etc.

	// Cross: array of rectangles

	// Elbow: two rectangles that form a 90 degree bend (direction, length2, length2, width->applies to both)

	// Matrix.prototype.getCrossPoints = function(origin, limit, thickness) { // similar to old CrossPoints but essentially consists of four rectangles }

	// Subtract/Erase/Clear: subtract points / clear nodes from a shape or Matrix

	// Reset: clears all of a matrix's nodes. possibly deletes all children too


	// Flower: array of circles (number of circles, size->applies to all); get hollow circle and select evenly distributed points along edge
	Matrix.prototype.getFlowerPoints = function() {
		// create one circle, rotate, copy, etc.
		// also possibly one larger circle at center?
	}

	// rotate entire matrix?
	Matrix.prototype.rotate = function() {

	}

	// combined this matrix with another. also absorb all children of that matrix. unclear how to handle overlapping nodes (which takes precedence?).
	Matrix.prototype.mergeWith = function(matrix) {

	}

	// reset all nodes as either 'edge' or 'interior'
	// have to calculate where each node lies (if node has one or more "false" neighbors => is edge. or possibly just corner neighbors?)
	Matrix.prototype.setNodeLocations = function() {

	}

	/**
	 * A class for organizing and accessing a 2-dimensional array of nodes.
	 *
	 * @param		{integer}		width
	 * @param		{integer}		height
	 * @param		{object}		origin	X- and Y-coordinates
	 * @param		{object}		parent	Parent matrix
	 */
	Matrix.prototype.init = function(config) {
		this.width	= config.width || 0;			// Width of 2-D nodes array
		this.height	= config.height || 0;			// Height of 2-D nodes array
		this.origin	= config.origin || {x: 0, y: 0};	// Start point of this matrix relative to parent matrix
		this.nodes	= [];						// 2-dimensional array of Node objects
		this.staging	= [];						// Staging area for changes to nodes
		this.children	= [];						// Child matrices
		this.parent	= config.parent;				// Parent matrix

		for(var y = 0; y < this.height; y++) {
			var column = [];

			for(var x = 0; x < this.width; x++) {
				column.push(false);
			}

			this.nodes.push(column);
		}
	}

	/**
	 * Copies contents of nodes array into a fresh staging array.
	 */
	Matrix.prototype.pushStaging = function() {
		var self = this;

		this.clearStaging();

		this.eachNode(function(node) {
			var duplicate = node.duplicate();

			self.staging[node.y][node.x] = duplicate;
		});
	}

	/**
	 * Copies contents of staging into nodes array, then clears staging.
	 */
	Matrix.prototype.pullStaging = function() {
		this.nodes = this.staging;

		this.clearStaging();
	}

	/**
	 * Resets and prepares staging as an empty 2-dimensional matrix with dimensions equal to current width and height properties.
	 */
	Matrix.prototype.clearStaging = function() {
		this.staging = [];

		for(var y = 0; y < this.height; y++) {
			var column = [];

			for(var x = 0; x < this.width; x++) {
				column.push(false);
			}

			this.staging.push(column);
		}
	}

	/**
	 * Creates a new matrix and adds it to this matrix's children.
	 *
	 * @param		{object}	config	Configuration object for child matrix.
	 * @return	{object}
	 */
	Matrix.prototype.addChild = function(config) {
		var child = new Matrix(config);

		this.children.push(child);

		return child;
	}

	// reverse position of all nodes
	Matrix.prototype.flip = function() {
		// flip vertically or horizontally
	}

	/**
	 * Expands matrix in the negative and/or positive directions.
	 *
	 * @param		{integer}		negX		Amount to expand in negative x direction
	 * @param		{integer}		negY		Amount to expand in negative y direction
	 * @param		{integer}		posX		Amount to expand in positive x direction
	 * @param		{integer}		posY		Amount to expand in positive y direction
	 */
	Matrix.prototype.rebound = function(negX, negY, posX, posY) {
		var negX = Math.abs(negX) || 0;
		var negY = Math.abs(negY) || 0;
		var posX = posX || 0;
		var posY = posY || 0;

		// Create a new temporary matrix that is larger than original
		var newWidth	= this.width + negX + posX;
		var newHeight	= this.height + negY + posY;
		var tempArgs	= {
			width:	newWidth,
			height:	newHeight,
			origin:	{x: 0, y: 0},
			parent:	null
		};
		var tempMatrix = new Matrix(tempArgs);

		// Copy offset nodes into the temporary matrix
		this.eachNode(function(node) {
			if( node ) {
				node.x += negX;
				node.y += negY;

				tempMatrix.nodes[node.y][node.x] = node;
			}
		});

		// Adjust this matrix to have the same nodes and dimensions of the new one
		this.nodes	= tempMatrix.nodes;
		this.width	= newWidth;
		this.height	= newHeight;
		this.origin	= {x: this.origin.x - negX, y: this.origin.y - negY};
	}

	/**
	 * Checks a collection of points for any that lie outside this matrix's dimensions and rebounds the matrix if need be.
	 *
	 * @param		{array}		points	Array of objects containing X- and Y-coordinates
	 */
	Matrix.prototype.checkBounds = function(points) {
		var minX = 0;
		var minY = 0;
		var maxX = this.width - 1;
		var maxY = this.height - 1;

		// Find highest and lowest X- and Y-coordinates
		for(var i in points) {
			var point = points[i];

			if( point.x < minX ) {
				minX = point.x;
			}
			if( point.y < minY ) {
				minY = point.y;
			}
			if( point.x > maxX ) {
				maxX = point.x;
			}
			if( point.y > maxY ) {
				maxY = point.y;
			}
		}

		// If any of the most extreme points lie outside the matrix's dimensions, expand it to accomodate them
		var minDifferenceX	= 0 - minX;
		var minDifferenceY	= 0 - minY;
		var maxDifferenceX	= maxX - (this.width - 1);
		var maxDifferenceY	= maxY - (this.height - 1);

		if( minDifferenceX || minDifferenceY || maxDifferenceX || maxDifferenceY ) {
			this.rebound(minDifferenceX, minDifferenceY, maxDifferenceX, maxDifferenceY);

			// Adjust any negative points to have positive coordinates
			if( minDifferenceX || minDifferenceY ) {
				pointLooop:
				for(var i in points) {
					var point = points[i];

					point.x += minDifferenceX;
					point.y += minDifferenceY;

					points[i] = point;
				}
			}
		}
	}

	/**
	 * Checks if provided coordinates are within this matrix's boundaries.
	 *
	 * @param		{integer}		x
	 * @param		{integer}		y
	 * @return	{boolean}
	 */
	Matrix.prototype.pointExists = function(x, y) {
		if( typeof(x) == 'undefined' || typeof(y) == 'undefined' ) {
			throw new TypeError('Invalid matrix indices supplied');
		}

		if( x < 0 || x >= this.width ) {
			return false;
		}

		if( y < 0 || y >= this.height ) {
			return false;
		}

		return true;
	}

	/**
	 * Passes each point in this matrix as an argument to a provided callback function.
	 *
	 * @param		{function}	callback
	 */
	Matrix.prototype.eachPoint = function(callback) {
		for(var j = 0; j < this.height; j++) {
			for(var i = 0; i < this.width; i++) {
				callback({x: i, y: j});
			}
		}
	}

	/**
	 * Get the points that make a cross/plus(+) sign.
	 *
	 * @param		{object}		origin	Point object representing the center of the cross
	 * @param		{integer}		limit	Sets a maximum for the length of the cross' arms
	 * @return	{array}
	 */
	Matrix.prototype.getCrossPoints = function(origin, limit) {
		var limit		= limit || 20;		// Default arm length
		var points	= [];
		var compass	= new Compass();

		// Include the origin
		points.push(origin);

		// Repeat four times: once for each direction
		directionLoop:
		for(var i = 0; i < 4; i++) {
			// gather points
			var state			= compass.getState();
			var coordinates	= state.coordinates;

			// Extend arm of points outwards
			armLoop:
			for(var k = 1; k < limit + 1; k++) {
				var newX = origin.x + (coordinates.x * k);
				var newY = origin.y + (coordinates.y * k);

				if( newX < 0 || newY < 0 ) {
					break armLoop;
				}
				if( newX >= this.width || newY >= this.height ) {
					break armLoop;
				}

				points.push({x: newX, y: newY});
			}

			compass.rotate();
		}

		return points;
	}


	/**
	 * Get a collection of random points from anywhere in this matrix.
	 *
	 * @param		{float}	percent	Decimal chance for any given point to be included
	 * @return	{array}
	 */
	Matrix.prototype.getRandomPoints = function(percent) {
		var points = [];

		this.eachPoint(function(point) {
			if( percent >= Math.random() ) {
				points.push(point);
			}
		});

		return points;
	}

	/**
	 * Gets the node at the provided coordinates.
	 *
	 * @param		{integer}		x
	 * @param		{integer}		y
	 * @return	{object}
	 */
	Matrix.prototype.getNode = function(x, y) {
		if( this.pointExists(x, y) ) {
			return this.nodes[y][x]
		}

		return false;
	}

	/**
	 * Creates a new Node and adds it into this matrix.
	 *
	 * @param		{integer}		x		Node X-coordinate in matrix
	 * @param		{integer}		y		Node Y-coordinate in matrix
	 * @param		{object}		config	Configuration object for new Node
	 * @return	{object}
	 */
	Matrix.prototype.addNode = function(x, y, config) {
		var config = config || {};

		config.x = x;
		config.y = y;

		var node = new NodeOld(config);

		this.nodes[y][x] = node;

		return node;
	}

	/**
	 * Creates new nodes from a set of provided points.
	 *
	 * @param		{array}	points		Array of point objects
	 * @param		{object}	nodeConfig	Configuration object for new Node
	 * @return	{array}
	 */
	Matrix.prototype.addNodes = function(points, nodeConfig) {
		var addedNodes = [];

		this.checkBounds(points);

		// Create new nodes
		for(var i in points) {
			var point	= points[i];
			var node	= this.addNode(point.x, point.y, nodeConfig);

			addedNodes.push(node);
		}

		return addedNodes;
	}

	/**
	 * Applies a callback function to each node in this matrix.
	 *
	 * @param		{function}
	 */
	Matrix.prototype.eachNode = function(callback) {
		for(var j in this.nodes) {
			var column = this.nodes[j];

			for(var i in column) {
				var node = this.getNode(i, j);

				if( node ) {
					callback(node);
				}
			}
		}
	}

	/**
	 * Shifts this matrix's nodes.
	 *
	 * @param		{integer}		x
	 * @param		{integer}		y
	 */
	Matrix.prototype.shiftNodes = function(x, y) {
		var self = this;

		// Check if the matrix needs to be rebounded to accommodate node shift
		var negX = 0;
		var negY = 0;
		var posX = 0;
		var posY = 0;

		if( x > 0 ) {
			posX = x;
		} else if( x < 0 ) {
			negX = x;
		}

		if( y > 0 ) {
			posY = y;
		} else if( y < 0 ) {
			negY = y;
		}

		if( negX || negY || posX || posY ) {
			this.rebound(negX, negY, posX, posY);
		}

		this.clearStaging();

		// Copy nodes into staging array in shifted indices and update their coordinate properties
		this.eachNode(function(node) {
			node.x += x;
			node.y += y;

			self.staging[node.y][node.x] = node;
		});

		this.pullStaging();
	}

	// TODO: write this
	Matrix.prototype.flatten = function() {
		// pull all child matrices and their nodes into this matrix's nodes
	}

	return Matrix;
});
