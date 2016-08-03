define([], function() {
	var Node = function(config) {
		var config = config || {};

		var north	= config.north || false;
		var south = config.south || false;
		var east	= config.east || false;
		var west	= config.west || false;

		this.getNorth = function() {
			return north;
		}

		this.getSouth = function() {
			return south;
		}

		this.getEast = function() {
			return east;
		}

		this.getWest = function() {
			return west;
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

		this.removeLink = function(direction) {

		}

		/**
		 * Create a link from this node to to another one.
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
	};

	return Node;
});
