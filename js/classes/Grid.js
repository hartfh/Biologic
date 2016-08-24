define(['constants', 'signal', 'compass'], function(constants, Signal, Compass) {
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
		this.nodes	= [];	// All nodes
		this.active	= [];	// Active nodes
		this.modified	= [];	// Nodes modified this cycle
		this.ctx;

		for(var j = 0; j < this.width; j++) {
			var column = [];

			for(var i = 0; i < this.height; i++) {
				column.push( new Signal() );
			}

			this.nodes.push(column);
		}

		for(var j = 0; j < this.width; j++) {
			for(var i = 0; i < this.height; i++) {
				this.addNode(j, i);
			}
		}

		constants.$app.append('<canvas id="' + config.name + '" width="1200" height="900" />');
		var elem	= document.getElementById(config.name);
		this.ctx	= elem.getContext('2d');
	}

	Grid.prototype.cycle = function() {
		var self = this;
		var nodesToKeepActive = [];

		this.eachActiveNode(function(node) {
			node.cycle();

			if( node.isAlive() ) {
				nodesToKeepActive.push(node);
			}

			self.addModifiedNode(node);

			var newNodes = node.getSpawn();

			for(var i in newNodes) {
				var newNode = newNodes[i];

				self.addModifiedNode(newNode);

				nodesToKeepActive.push(newNode);
			}
		});

		this.eachModifiedNode(function(node) {
			self.drawNode(node);
			node.setModified(false);
		});

		this.modified	= [];
		this.active	= nodesToKeepActive;
	}

	Grid.prototype.addActiveNode = function(node) {
		this.active.push(node);
	}

	Grid.prototype.addModifiedNode = function(node) {
		this.modified.push(node);
	}

	Grid.prototype.eachModifiedNode = function(callback) {
		for(var i in this.modified) {
			var node = this.modified[i];

			callback(node);
		}
	}

	Grid.prototype.eachActiveNode = function(callback) {
		for(var i in this.active) {
			var node = this.active[i];

			callback(node);
		}
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

		this.eachNode(function(node) {
			self.drawNode(node);
		});
	}

	Grid.prototype.drawNode = function(node) {
		var nodeWidth	= constants.nodeWidth;
		var coords	= node.getCoordinates();
		var nodeStartX = coords.x * nodeWidth;
		var nodeStartY	= coords.y * nodeWidth;
		var color		= node.getColor();

		this.ctx.fillStyle = color;
		this.ctx.fillRect(nodeStartX, nodeStartY, nodeWidth, nodeWidth);
	}

	/**
	 * Passes each node at a Shape object's coordinates to a callback function.
	 *
	 * @param		{object}		shape		Shape object
	 * @param		{function}	callback		Callback function
	 */
	Grid.prototype.toNodes = function(shape, callback) {
		var coords = shape.selected || [];

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
			x:		x,
			y:		y,
			north:	north,
			south:	south,
			east:	east,
			west:	west
		};


		var node = new Signal(args);

		this.nodes[x][y] = node;

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
				this.nodes[x][y] = false;
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
