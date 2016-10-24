define([], function() {
	var Matrix = function(config) {
		this.init(config);
	};

	Matrix.prototype.init = function(config) {
		this.width	= config.width;
		this.height	= config.height;
		this.cells	= [];

		for(var x = 0; x < this.width; x++) {
			var column = [];

			for(var y = 0; y < this.height; y++) {
				column.push(false);
			}

			this.cells.push(column);
		}
	}

	Matrix.prototype.seed = function() {

	}

	/**
	 * Assign a random boolean value to each cell in the matrix.
	 *
	 * @param		{float}		density	A value ranging from 0 - 100, representing the chance of a cell to be set to true.
	 */
	Matrix.prototype.randomize = function(density) {
		if( typeof(density) != 'number' ) {
			var density = 50;
		}
		if( density < 0 || density > 100 ) {
			var density = 50;
		}

		density = density / 100;

		this.toEachCell(function() {
			return ( Math.random() < density );
		});
	}

	Matrix.prototype.getCell = function(x, y) {
		// Cover out of bounds indices. Have them wrap around to other end of array
		if( x < 0 ) {
			x = this.width - 1;
		}
		if( y < 0 ) {
			y = this.height - 1;
		}
		if( x >= this.width ) {
			x = 0;
		}
		if( y >= this.height ) {
			y = 0;
		}

		return this.cells[x][y];
	}

	Matrix.prototype.eachNeighbor = function(i, j, callback) {
		for(var x = -1; x < 2; x++) {
			for(var y = -1; y < 2; y++) {
				if( x == 0 && y == 0 ) {
					continue;
				}

				var adjX		= i + x;
				var adjY		= j + y;
				var neighbor	= this.getCell(adjX, adjY);

				callback(neighbor, adjX, adjY);
			}
		}
	}

	Matrix.prototype.forEachCell = function(callback) {
		for(var x = 0; x < this.width; x++) {
			for(var y = 0; y < this.height; y++) {
				var cell = this.getCell(x, y);

				callback(cell, x, y);
			}
		}
	}

	// Creates a duplicate of cell information to apply each change to, before overwriting original cell data
	Matrix.prototype.toEachCell = function(callback) {
		var duplicate = [];

		for(var x = 0; x < this.width; x++) {
			var dupColumn = [];

			for(var y = 0; y < this.height; y++) {
				var cell = this.getCell(x, y);

				dupColumn.push( callback(cell, x, y) );
			}

			duplicate.push(dupColumn);
		}

		this.cells = duplicate;
	}

	Matrix.prototype.applyLifeFilter = function() {
		var self = this;

		this.toEachCell(function(cell, x, y) {
			var neighbors = 0;

			self.eachNeighbor(x, y, function(neighbor) {
				if( neighbor ) {
					neighbors++;
				}
			});

			if( cell ) {
				if( neighbors < 2 || neighbors > 3 ) {
					return false;
				}

				return true;
			} else {
				if( neighbors == 3 ) {
					return true;
				}
			}

			return false;
		});
	}

	return Matrix;
});
