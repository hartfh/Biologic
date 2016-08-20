define(['constants', 'cell', 'compass'], function(constants, Cell, Compass) {
	/**
	 * Represents a 2-dimensional grid of points using a graph data structure.
	 *
	 * @param		{object}		config			Configuration object
	 * @param		{integer}		config.width		Width of the grid
	 * @param		{integer}		config.height		Height of the grid
	 */
	var Grid = function(config) {
		this.width	= config.width || 0;
		this.height	= config.height || 0;
		this.name		= config.name;
		this.nodes	= [];
		this.ctx;

		for(var j = 0; j < this.width; j++) {
			var column = [];

			for(var i = 0; i < this.height; i++) {
				column.push( new Cell() );
			}

			this.nodes.push(column);
		}

		for(var j = 0; j < this.width; j++) {
			for(var i = 0; i < this.height; i++) {
				this.addNode(i, j);
			}
		}

		constants.$app.append('<canvas id="' + config.name + '" width="1200" height="900" />');
		var elem	= document.getElementById(config.name);
		this.ctx	= elem.getContext('2d');
	}

	Grid.prototype.cycle = function() {
		// this.activeCells = [];
		// keep "alive" cells in an array (initially load them somehow).
		// each cycle we create a new array and load newly alive cells into it? old array gets oerwritten
		// don't track immortal/inert cells


		var modifiedCells = [];

		// add modified cells into array

		// revert each cell in modified array to unmodified

		// redraw only the old and newly modified cells
		// add in a drawNode() method?
	}

	/**
	 * Clears all nodes from the drawing area.
	 */
	Grid.prototype.clear = function() {
		var endX = this.width * constants.nodeWidth;
		var endY = this.height * constants.nodeWidth;

		this.ctx.clearRect(0, 0, endX, endY);
	}

	/**
	 * Draws all nodes to the drawing area.
	 */
	Grid.prototype.draw = function() {
		this.clear();

		var self		= this;
		var nodeWidth	= constants.nodeWidth;

		this.eachNode(function(node, x, y) {
			var nodeStartX = x * nodeWidth;
			var nodeStartY = y * nodeWidth;

			var swatch = 'rgba(135, 135, 200, 1)';

			/*
			var color = node.getContent('color');
			*/
			if( node.color == 'red' ) {
				swatch = 'rgba(109, 0, 9, 1)';
			}

			self.ctx.fillStyle = swatch;
			self.ctx.fillRect(nodeStartX, nodeStartY, nodeWidth, nodeWidth);
		});
	}


	/**
	 * Passes each node at a Shape object's coordinates to a callback function.
	 *
	 * @param		{array}		coords		Array of point objects
	 * @param		{function}	callback		Callback function
	 */
	Grid.prototype.toNodes = function(coords, callback) {
		for(var i in coords) {
			var coord	= coords[i];
			var node	= this.getNode(coord.x, coord.y);

			callback(node);
		}
	}

	/**
	 * Checks if an X- and Y-coordinate are within this object's dimensions.
	 *
	 * @param		{integer}		x
	 * @param		{integer}		y
	 * @return	{boolean}
	 */
	Grid.prototype.withinBounds = function(x, y) {
		if( x >= this.width || x < 0 ) {
			return false;
		}
		if( y >= this.height || y < 0 ) {
			return false;
		}

		return true;
	}

	/**
	 * Get the node at the provided coordinates.
	 *
	 * @param		{integer}		x
	 * @param		{integer}		y
	 * @return	{object}
	 */
	Grid.prototype.getNode = function(x, y) {
		if( this.withinBounds(x, y) ) {
			return this.nodes[x][y];
		}

		return false;
	}

	/**
	 * Add a new node into the provided coordinates.
	 *
	 * @param		{integer}		x
	 * @param		{integer}		y
	 */
	Grid.prototype.addNode = function(x, y) {
		this.removeNode(x, y);

		var north = this.getNode(x, y - 1);
		var south = this.getNode(x, y + 1);
		var east	= this.getNode(x + 1, y);
		var west	= this.getNode(x - 1, y);

		var args = {
			north:	north,
			south:	south,
			east:	east,
			west:	west
		};


		var node = new Cell(args);

		this.nodes[y][x] = node;

		// Get adjacent nodes and link them to the new one
		if( north ) { north.addLink('south', node); }
		if( south ) { south.addLink('north', node); }
		if( east ) { east.addLink('west', node); }
		if( west ) { west.addLink('east', node); }
	}

	/**
	 * Remove the node at the provided coordinates and all links to it by surrounding nodes.
	 *
	 * @param		{integer}		x
	 * @param		{integer}		y
	 */
	Grid.prototype.removeNode = function(x, y) {
		if( this.withinBounds(x, y) ) {
			var node = this.getNode(x, y);

			if( node ) {
				var compass = new Compass();

				// Remove surrounding nodes' reference to this one
				for(var i = 0; i < 4; i++) {
					var dirData	= compass.getState();
					var direction	= dirData.direction;
					var linkedNode	= node.getLink(direction);

					compass.rotate().rotate();

					var oppDirData		= compass.getState();
					var oppDirection	= oppDirData.direction;

					if( linkedNode ) {
						linkedNode.removeLink(oppDirection);
					}

					compass.rotate();
				}

				// Destroy this node
				this.nodes[y][x] = false;
			}
		}
	}

	/**
	 * Passes each node to a callback function.
	 *
	 * @param		{function}	callback	Callback function. Break the loop by returning true
	 */
	Grid.prototype.eachNode = function(callback) {
		for(var x in this.nodes) {
			var column = this.nodes[x];

			for(var y in column) {
				var node = column[y];

				if( callback(node, x, y) ) {
					break;
				}
			}
		}
	}

	return Grid;
});
