define(['classes/Node', 'classes/Compass'], function(Node, Compass) {
	// Represents a 2-d grid of points using a graph data structure
	var Grid = function(config) {
		this.width	= config.width || 0;
		this.height	= config.height || 0;
		this.nodes	= [];

		this.init(this);
	}

	Grid.prototype.init = function(self) {
		for(var j = 0; j < self.width; j++) {
			var column = [];

			for(var i = 0; i < self.height; i++) {
				column.push(false);
			}

			self.nodes.push(column);
		}
	}

	/**
	 * Checks if an X- and Y-coordinate are within this object's node array.
	 *
	 * @param		{integer}		x
	 * @param		{integer}		y
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
	 * Get the node at the provided coordinates. Returns false if the coordinates refer to an empty position.
	 *
	 * @param		{integer}		x
	 * @param		{integer}		y
	 * @return	{object}
	 */
	Grid.prototype.getNode = function(x, y) {
		if( this.withinBounds(x, y) ) {
			return this.nodes[y][x];
		}

		return false;
	}

	Grid.prototype.removeNode = function(x, y) {
		if( this.withinBounds(x, y) ) {
			var node		= this.getNode(x, y);
			var compass	= new Compass();

			if( node ) {
				// Remove other nodes' reference to this one
				for(var i = 0; i < 4; i++) {
					var dirData	= compass.getState();
					var direction	= dirData.label;
					var linkedNode	= node.getLink(direction);

					compass.rotate().rotate();

					var oppDirData		= compass.getState();
					var oppDirection	= oppDirData.label;

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

	Grid.prototype.addNode = function(x, y) {
		// TODO: check if node already exists?
		// TODO: destroy old node and destroy links to it

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

	return Grid;
});
