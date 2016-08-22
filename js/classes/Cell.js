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
		this.spawn	= [];
		this.lifecycle = ['alive', 'dying', 'dead'];
	}

	/**
	 * Gets the cell's color so it can be drawn to a canvas.
	 *
	 * @return	{string}	color	An rgba color value
	 */
	Cell.prototype.getColor = function() {
		var color = '';

		switch( this.stage ) {
			case 'alive':
				color = 'rgba(255, 200, 200, 1)';
				break;
			case 'dying':
				color = 'rgba(100, 50, 50, 1)';
				break;
			case 'dead':
				color = 'rgba(50, 0, 0, 1)';
				break;
			default:
				color = 'rgba(0, 0, 0, 1)';
				break;
		}

		return color;
	}

	Cell.prototype.setGenerator = function(value) {
		if( typeof(value) == 'boolean' ) {
			this.generator = value;
		}
	}

	Cell.prototype.setImmortal = function(value) {
		if( typeof(value) == 'boolean' ) {
			this.immortal = value;
		}
	}

	Cell.prototype.setInert = function(value) {
		if( typeof(value) == 'boolean' ) {
			this.inert = value;
		}
	}

	Cell.prototype.setModified = function(value) {
		if( typeof(value) == 'boolean' ) {
			this.modified = value;
		}
	}

	Cell.prototype.setStage = function(stage) {
		if( this.lifecycle.indexOf(stage) != -1 ) {
			this.stage = stage;
		}
	}

	Cell.prototype.cycle = function() {
		this.resetSpawn();
		this.reproduce();
		this.age();
		this.setModified(true);
	}

	Cell.prototype.reproduce = function() {
		var self = this;

		if( !this.inert ) {
			this.eachLink(function(node) {
				if( !node.isAlive() ) {
					node.animate();
					self.addSpawn(node);
				} else {
					node.age();
				}

				node.modified = true;
			});
		}
	}

	Cell.prototype.resetSpawn = function() {
		this.spawn = [];
	}

	Cell.prototype.getSpawn = function() {
		return this.spawn;
	}

	Cell.prototype.addSpawn = function(node) {
		this.spawn.push(node);
	}

	Cell.prototype.isAlive = function() {
		if( this.stage == 'alive' || this.stage == 'dying' ) {
			return true;
		}

		return false;
	}

	Cell.prototype.animate = function() {
		this.stage = 'alive';
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
