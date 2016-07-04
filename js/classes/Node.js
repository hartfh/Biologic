define(function() {
	var Node = function(config) {
		this.init(config);
	};

	Node.prototype.init = function(config) {
		this.x = config.x;
		this.y = config.y;
	}

	return Node;
});
