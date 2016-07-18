define(['classes/Matrix'], function(Matrix) {
	var MatrixFactory = function(config) {
		this.init(config);
	};

	MatrixFactory.prototype.init = function(config) {
		// initial setup, if any
	}

	MatrixFactory.prototype.makeMatrix = function(config) {
		// randomly generated or user defined
		// determine parent shape (composite vs. simple shape)
		// Composite Shape:
		// -number of sub-shapes
		// -allowable types of sub-shapes: rectangle, circle
		// -sizes of each
		// -their location in relation to one-another
		// determine insides/children (repeating inside vs. single item)

		return matrix;
	}

	return MatrixFactory;
});
