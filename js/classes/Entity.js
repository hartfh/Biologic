define(['classes/Matrix/Matrix'], function(Matrix) {
	var Entity = function(config) {
		this.init(config);
	};

	Entity.prototype.init = function(config) {
		this.origin	= config.origin || {x: 0, y: 0};
		this.children	= [];
		this.matrix	= new Matrix(config.width, config.height);
	}

	Entity.prototype.addChild = function() {
		// create a new matrix and push to this.children
	}

	// recursively pull all child matrices and nodes into this one
	Entity.prototype.flatten = function() {

	}

	// getChild

	return Entity;
});
