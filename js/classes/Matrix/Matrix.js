define(['classes/Node', 'classes/Compass'], function(Node, Compass) {
	var Matrix = function(config) {
		this.init(config);
	};

	/**
	 * A class for organizing and accessing a 2-dimensional array of nodes.
	 *
	 * @param		{integer}		width
	 * @param		{integer}		height
	 * @param		{object}		origin	X- and Y-coordinates
	 * @param		{object}		parent	Parent matrix
	 */
	Matrix.prototype.init = function(config) {
		this.width	= config.width || 0;
		this.height	= config.height || 0;
		this.origin	= config.origin || {x: 0, y: 0};
		this.nodes	= [];
		this.children	= [];
		this.parent	= config.parent;

		for(var y = 0; y < this.height; y++) {
			var column = [];

			for(var x = 0; x < this.width; x++) {
				column.push(false);
			}

			this.nodes.push(column);
		}
	}

	/**
	 * Applies a callback function to each node.
	 *
	 * @param		{function}
	 */
	Matrix.prototype.eachNode = function(callback) {
		for(var j in this.nodes) {
			var column = this.nodes[j];

			for(var i in column) {
				var node = this.getNode(i, j);

				callback(node);
			}
		}
	}

	/**
	 * Checks if supplied coordinates are within the matrix's boundaries.
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
	 * Gets the node at the provided indices.
	 *
	 * @return	{object}
	 */
	Matrix.prototype.getNode = function(x, y) {
		if( this.pointExists(x, y) ) {
			return this.nodes[y][x]
		}

		return false;
	}

	/**
	 * Gets the points that make up a line region.
	 *
	 * @returns	{array}
	 */
	Matrix.prototype.getLinePoints = function(origin, terminus) {
		var points = [];

		if( origin.x == terminus.x && origin.y == terminus.y ) {
			return points;
		}

		var slope = (terminus.y - origin.y) / (terminus.x - origin.x);

		if( Math.abs(slope) > 1 ) {
			slope = (terminus.x - origin.x) / (terminus.y - origin.y);

			if( origin.y < terminus.y ) {
				var start	= origin;
				var end	= terminus;
			} else {
				var start	= terminus;
				var end	= origin;
				var reverse = true;
			}

			var offset = start.x - slope * start.y;

			for(var y = start.y; y <= end.y; y++) {
				var x = slope * y + offset;
				x = Math.round(x);

				points.push({x: x, y: y, type: 'edge'});
			}

			if( reverse ) {
				points.reverse();
			}
		} else {
			if( origin.x < terminus.x ) {
				var start	= origin;
				var end	= terminus;
				var reverse = false;
			} else {
				var start	= terminus;
				var end	= origin;
				var reverse = true;
			}

			var offset = start.y - slope * start.x;

			for(var x = start.x; x <= end.x; x++) {
				var y = slope * x + offset;
				y = Math.round(y);

				points.push({x: x, y: y, type: 'edge'});
			}

			if( reverse ) {
				points.reverse();
			}
		}

		return points;
	}

	/**
	 * Gets the points that make up a rectangular region.
	 *
	 * @param		{object}	origin	Start point
	 * @param		{object}	terminus	End point
	 * @param		{string}	types	Which point types to include: edge or interior
	 * @returns	{array}
	 */
	Matrix.prototype.getRectanglePoints = function(origin, terminus, types) {
		var types	 = types || 'all';
		var points = [];

		var width		= terminus.x - origin.x + 1;
		var height	= terminus.y - origin.y + 1;

		var start	= {x: false, y: false};
		var end	= {x: false, y: false};

		if( width < 0 ) {
			start.x	= terminus.x;
			end.x	= origin.x;
			width	= Math.abs(width);
		} else {
			start.x	= origin.x;
			end.x	= terminus.x;
		}

		if( height < 0 ) {
			start.y	= terminus.y;
			end.y	= origin.y;
			height	= Math.abs(height);
		} else {
			start.y	= origin.y;
			end.y	= terminus.y;
		}

		for(var y = 0; y < height; y++) {
			for(var x = 0; x < width; x++) {
				var offsetPoint = {type: 'interior'};

				offsetPoint.x = x + start.x;
				offsetPoint.y = y + start.y;

				if( x == 0 || y == 0 ) {
					offsetPoint.type = 'edge';
				}
				if( x == width - 1 || y == height - 1 ) {
					offsetPoint.type = 'edge';
				}

				// Check against "types" argument to see if point should be included
				if( types == offsetPoint.type || types == 'all' ) {
					points.push(offsetPoint);
				}
			}
		}

		return points;
	}

	/**
	 * Gets the points that make up a circular region.
	 *
	 * @param		{integer}		origin	Contains X- and Y-coordinates and marks center of circle
	 * @param		{integer}		radius	Radius of circle
	 * @param		{string}		types	Which point types to return: edge, interior or all
	 * @returns	{array}
	 */
	Matrix.prototype.getCirclePoints = function(origin, radius, types) {
		var types			= types || 'all';
		var points		= [];
		var offsetPoints	= [];

		// Check against "types" argument to see if point should be included
		var shouldIncludePoint = function(point) {
			if( point.type == types || types == 'all' ) {
				return true;
			}

			return false;
		}

		radius--;

		// If supplied radius was 1, should only return the origin
		if( !radius ) {
			points.push({x: origin.x, y: origin.y, type: 'interior'});

			return points;
		}

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

		return offsetPoints;
	}


	Matrix.prototype.getCrossPoints = function(origin, limit) {
		var limit		= limit || false;
		var points	= [];
		var compass	= new Compass();

		// Include the origin
		points.push(origin);

		for(var i = 0; i < 4; i++) {
			// get points

			compass.rotate();
		}

		return points;
	}

	/**
	 * Gets the points that make up an outward, clockwise-spiraling line.
	 *
	 * @param		{object}		origin	Center point of the spiral
	 * @param		{object}		limit	Optional parameter which limits the size of the spiral
	 * @return	{array}
	 */
	Matrix.prototype.getSpiralPoints = function(origin, limit) {
		// clockwise vs. counterclockwise
		var limit		= limit || false;
		var points	= [];
		var compass	= new Compass();
		var armLength	= 0;
		var armPoint	= origin;
		var inBounds	= true;

		points.push(armPoint);

		// Gather points as long as we're within the matrix's boundaries
		while( inBounds ) {
			for(var i = 1; i < armLength + 1; i++) {
				var state		= compass.getState();
				var coordMod	= state.coordinates;

				armPoint = {x: armPoint.x + coordMod.x, y: armPoint.y + coordMod.y};
				inBounds = this.pointExists(armPoint.x, armPoint.y);

				if( inBounds ) {
					points.push(armPoint);
				}
			}

			armLength++;
			compass.rotate();

			if( limit ) {
				if( armLength >= limit ) {
					break;
				}
			}
		}
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
		var newHeight	= this.height + negX + posY;
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

				tempMatrix.node[node.y][node.x] = node;
			}
		});

		// Adjust this matrix to have the same nodes and dimensions of the new one
		this.nodes	= tempMatrix.nodes;
		this.width	= newWidth;
		this.height	= newHeight;
		this.origin	= {x: this.origin.x - negX, y: this.origin.y - negY};
	}

	/**
	 * Checks a collection of points for any that lie outside matrix's dimensions and rebounds the matrix if need be.
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
		}
	}

	/**
	 * Shift the matrix's nodes.
	 */
	Matrix.prototype.translate = function(x, y) {

	}

	Matrix.prototype.incorporatePoints = function(points, origin, nodeConfig) {
		// checkBounds() and rebound() if need be
		// set each point in "points" as new Node(nodeConfig)
	}

	// extend into various patterns
	// possibly have seed() run at init() based on child class specs

	return Matrix;
})
