define(['compass'], function(Compass) {
	/**
	 * Represents points on a grid within a Grid object. Acts as a node in a graph (4-way linked list).
	 *
	 * @param		{object}	config		Configuration object
	 * @param		{object}	config.north	A node object to link in the "north" position
	 * @param		{object}	config.south	A node object to link in the "south" position
	 * @param		{object}	config.east	A node object to link in the "east" position
	 * @param		{object}	config.west	A node object to link in the "west" position
	 */
	var Node = function(config) {
		var config = config || {};

		this.init(this, config);
	};

	/**
	 * Perform basic setup similar to a constructor function.
	 *
	 * @param		{object}	self		Reference to this class' prototype
	 * @param		{object}	config	Configuration object
	 */
	Node.prototype.init = function(self, config) {
		self.north	= config.north || false;
		self.south	= config.south || false;
		self.east		= config.east || false;
		self.west		= config.west || false;
	}

	/**
	 * Get the node at a provided link.
	 *
	 * @param		{string}	direction
	 * @return	{object}	node
	 */
	Node.prototype.getLink = function(direction) {
		var node;

		switch(direction) {
			case 'north':
				node = this.north;
				break;
			case 'south':
				node = this.south;
				break;
			case 'east':
				node = this.east;
				break;
			case 'west':
				node = this.west;
				break;
			default:
				node = false;
				break;
		}

		return node;
	}

	/**
	 * Remove one of this node's links to another node.
	 *
	 * @param		{string}	direction
	 */
	Node.prototype.removeLink = function(direction) {
		switch(direction) {
			case 'north':
				this.north = false;
				break;
			case 'south':
				this.south = false;
				break;
			case 'east':
				this.east = false;
				break;
			case 'west':
				this.west = false;
				break;
			default:
				break;
		}
	}

	/**
	 * Create a link from this node to another node.
	 *
	 * @param		{string}	direction
	 * @param		{object}	node
	 */
	Node.prototype.addLink = function(direction, node) {
		switch(direction) {
			case 'north':
				this.north = node;
				break;
			case 'south':
				this.south = node;
				break;
			case 'east':
				this.east = node;
				break;
			case 'west':
				this.west = node;
				break;
			default:
				break;
		}
	}

	/**
	 * Passes each linked node to a callback function.
	 *
	 * @param		{function}	callback
	 */
	Node.prototype.eachLink = function(callback) {
		var compass = new Compass();

		for(var i = 0; i < 4; i++) {
			var state	= compass.getState();
			var node	= this.getLink(state.direction);

			if( node ) {
				callback(node);
			}

			compass.rotate();
		}
	}

	return Node;
});
