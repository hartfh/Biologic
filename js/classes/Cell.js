define(['node'], function(Node) {
	var Cell = function(config) {
		this.init(config || {});
	};

	Cell.extend(Node);

	Cell.prototype.init = function(config) {
		this.parent.init(this, config);

		// child class specific properties here
		//this.lifespan?
	}

	// various seed types. seed causes cell to expand out according to various guidelines (utilizing shapes, somehow)

	return Cell;
});
