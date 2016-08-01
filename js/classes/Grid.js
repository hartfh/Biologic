define(['classes/Node'], function(Node) {
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

	Grid.prototype.getNode = function(x, y) {
		if( this.withinBounds(x, y) ) {
			return this.nodes[y][x];
		}

		return false;
	}

	Grid.prototype.addNode = function() {
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

		// get adjacent nodes and link them to the new one
		if( north ) { north.linkNode(dir, node); }
	}

	return Grid;
});
