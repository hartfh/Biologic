define(['classes/Node', 'classes/Compass'], function(Node, Compass) {
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
		this.nodes	= [];

		for(var j = 0; j < this.width; j++) {
			var column = [];

			for(var i = 0; i < this.height; i++) {
				column.push( new Node({}) );
			}

			this.nodes.push(column);
		}

		for(var j = 0; j < this.width; j++) {
			for(var i = 0; i < this.height; i++) {
				this.addNode(i, j);
			}
		}
	}

	// do something to nodes in a Shape's points
	Grid.prototype.withShape = function(shape, callback) {}
	Grid.prototype.toNodes = function(shape, callback) {}

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
			return this.nodes[y][x];
		}
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

		var node = new Node(args);

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

	return Grid;
});
