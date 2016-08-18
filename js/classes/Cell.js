define(['node'], function(Node) {
	var Cell = function(config) {
		this.init(config || {});
	};

	Cell.extend(Node);

	Cell.prototype.init = function(config) {
		this.parent.init(this, config);

		//this.lifespan = X;  // starts high and counts down

		// this.status; // alive, inert
		// this.special? // generator; immortal

		// 

		// directionality: spawn live cells in particular directions: all, some or none
	}

	Cell.prototype.age = function() {
		// include "immortal" check here?
		this.lifespan--;

		if( this.lifespan == 0 ) {
			// ?
		}
	}

	//Cell.prototype.expand/grow = function(dir?) {}

	return Cell;
});
