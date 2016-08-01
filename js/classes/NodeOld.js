define(function() {
	var NodeOld = function(config) {
		this.init(config);
	};

	NodeOld.prototype.init = function(config) {
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
	NodeOld.prototype.duplicate = function() {
		var duplicate	= new NodeOld({});
		var props		= Object.getOwnPropertyNames(this);

		for(var i in props) {
			var prop = props[i];

			duplicate[prop] = this[prop];
		}

		return duplicate;
	}

	return NodeOld;
});
