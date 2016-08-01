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
	};

	// linkNode
	Node.prototype.addReference = function() {
		// create a link to a new node
	}

	return Node;
});
