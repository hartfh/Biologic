define(['classes/Compass'], function(Compass) {
	/**
	 * Represents points on a grid within a Grid object. Acts as a node in a graph (quadrupally linked list).
	 *
	 * @param		{object}	config		Configuration object
	 * @param		{object}	config.north	A node object to link in the "north" position
	 * @param		{object}	config.south	A node object to link in the "south" position
	 * @param		{object}	config.east	A node object to link in the "east" position
	 * @param		{object}	config.west	A node object to link in the "west" position
	 */
	var Node = function(config) {
		var config = config || {};

		// Properties are stored as private variables
		var north		= config.north || false;
		var south		= config.south || false;
		var east		= config.east || false;
		var west		= config.west || false;
		var contents	= {};

		this.addContent = function(object, handle) {
			if( !contents.hasOwnProperty(handle) ) {
				contents[handle] = object;
			}
		}

		this.removeContent = function(handle) {
			if( contents.hasOwnProperty(handle) ) {
				delete contents[handle];
			}
		}

		this.getContent = function(handle) {
			if( contents.hasOwnProperty(handle) ) {
				return contents[handle];
			}

			return false;
		}

		this.getContents = function() {
			return contents;
		}

		/**
		 * Get the node at a provided link.
		 *
		 * @param		{string}	direction
		 * @return	{object}	node
		 */
		this.getLink = function(direction) {
			var node;

			switch(direction) {
				case 'north':
					node = north;
					break;
				case 'south':
					node = south;
					break;
				case 'east':
					node = east;
					break;
				case 'west':
					node = west;
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
		this.removeLink = function(direction) {
			switch(direction) {
				case 'north':
					north = false;
					break;
				case 'south':
					south = false;
					break;
				case 'east':
					east = false;
					break;
				case 'west':
					west = false;
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
		this.addLink = function(direction, node) {
			switch(direction) {
				case 'north':
					north = node;
					break;
				case 'south':
					south = node;
					break;
				case 'east':
					east = node;
					break;
				case 'west':
					west = node;
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
		this.eachLink = function(callback) {
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
	};

	return Node;
});
