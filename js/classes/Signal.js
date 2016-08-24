define(['node'], function(Node) {
	var Signal = function(config) {
		this.init(config || {});
	};

	Signal.extend(Node);

	Signal.prototype.init = function(config) {
		this.parent.init(this, config);

		this.generator	= false;	// directionality? spawn live Signals in particular directions: all, some or none
		this.immortal	= false;	// always "alive"
		this.inert	= false;	// does not reproduce
		this.modified	= false;	// tracks changes to this Signal during a cycle. reverts to false at end of cycle
		this.stage	= 'dead';	// which stage of its lifecycle this Signal is in
		this.spawn	= [];
		this.lifecycle = ['starter', 'alive', 'dying', 'dead'];
	}

	/**
	 * Gets the Signal's color so it can be drawn to a canvas.
	 *
	 * @return	{string}	color	An rgba color value
	 */
	Signal.prototype.getColor = function() {
		var color = '';

		switch( this.stage ) {
			case 'starter':
				color = 'rgba(205, 255, 200, 1)';
				break;
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

	Signal.prototype.setGenerator = function(value) {
		if( typeof(value) == 'boolean' ) {
			this.generator = value;
		}

		return this;
	}

	Signal.prototype.setImmortal = function(value) {
		if( typeof(value) == 'boolean' ) {
			this.immortal = value;
		}

		return this;
	}

	Signal.prototype.setInert = function(value) {
		if( typeof(value) == 'boolean' ) {
			this.inert = value;
		}

		return this;
	}

	Signal.prototype.setModified = function(value) {
		if( typeof(value) == 'boolean' ) {
			this.modified = value;
		}

		return this;
	}

	Signal.prototype.setStage = function(stage) {
		if( this.lifecycle.indexOf(stage) != -1 ) {
			this.stage = stage;
		}

		return this;
	}

	Signal.prototype.cycle = function() {
		this.resetSpawn();
		this.reproduce();
		this.age();
		this.setModified(true);
	}

	Signal.prototype.reproduce = function() {
		var self = this;

		if( !this.inert && this.isHealthy() ) {
			this.eachLink(function(node) {
				if( !node.modified ) {
					if( !node.isAlive() ) {
						node.animate();
						self.addSpawn(node);

						if( self.stage == 'starter' ) {
							return true;
						}
					} else {
						node.age();
					}

					node.setModified(true);
				}
			});
		}
	}

	Signal.prototype.resetSpawn = function() {
		this.spawn = [];
	}

	Signal.prototype.getSpawn = function() {
		return this.spawn;
	}

	Signal.prototype.addSpawn = function(node) {
		this.spawn.push(node);
	}

	Signal.prototype.isAlive = function() {
		if( this.stage == 'starter' || this.stage == 'alive' || this.stage == 'dying' ) {
			return true;
		}

		return false;
	}

	Signal.prototype.isHealthy = function() {
		if( this.stage == 'starter' || this.stage == 'alive' ) {
			return true;
		}

		return false;
	}

	Signal.prototype.animate = function() {
		this.stage = 'alive';
	}

	Signal.prototype.age = function() {
		if( !this.modified ) {
			switch( this.stage ) {
				case 'starter':
					this.stage = 'dying';
					break;
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

			this.setModified(true);
		}
	}

	return Signal;
});
