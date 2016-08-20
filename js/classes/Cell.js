define(['node'], function(Node) {
	var Cell = function(config) {
		this.init(config || {});
	};

	Cell.extend(Node);

	Cell.prototype.init = function(config) {
		this.parent.init(this, config);

		this.generator	= false;	// directionality? spawn live cells in particular directions: all, some or none
		this.immortal	= false;	// always "alive"
		this.inert	= false;	// does not reproduce
		this.modified	= false;	// tracks changes to this cell during a cycle. reverts to false at end of cycle
		this.stage	= 'dead';	// which stage of its lifecycle this cell is in
	}

	Cell.prototype.cycle = function() {
		this.reproduce();
		this.age();
	}

	Cell.prototype.reproduce = function() {
		if( !this.inert ) {
			// reproduce into neighboring cell tiles
		}
	}

	Cell.prototype.age = function() {
		switch( this.stage ) {
			case 'alive':
				if( !this.immortal ) {
					this.stage = 'dying';
				}
				break;
			case 'dying':
				this.stage = 'dead';
				break;
			case 'dead':
			default:
				break;
		}
	}

	return Cell;
});
