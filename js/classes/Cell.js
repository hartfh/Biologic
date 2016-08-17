define(['node'], function(Node) {
	var Cell = function(config) {
		this.init(config || {});
	};

	Cell.extend(Node);

	Cell.prototype.init = function(config) {
		this.parent.init(this, config);

		// child class specific properties here
		//this.lifespan?

		// this.status; // alive, inert
		// this.special? // generator; immortal
	}

	//Cell.prototype.grow = function() {}

	//Cell.prototype.replicate = function() {}

	//Cell.prototype.expand = function(dir?) {}

	// various seed types. seed causes cell to expand out according to various guidelines (utilizing shapes, somehow)

	return Cell;
});
