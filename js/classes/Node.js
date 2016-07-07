define(function() {
	var Node = function(config) {
		this.init(config);
	};

	Node.prototype.init = function(config) {
		this.x = config.x || 0;
		this.y = config.y || 0;
		// this.parent??
		// this.type  (type converts into a color)
	}

	/**
	 * Creates a copy of this node.
	 *
	 * @return	{object}
	 */
	Node.prototype.duplicate = function() {
		var duplicate	= new Node({});
		var props		= this.getOwnPropertyNames();

		for(var i in props) {
			var prop = props[i];

			duplicate[prop] = this[prop];
		}

		return duplicate;
	}

	return Node;
});
