define(['utilities', 'shape'], function(utilities, Shape) {
	/**
	 * Create a uniformly spaced grid of points.
	 *
	 * @param		{integer}		config.spacing		Amount to space out the points by
	 * @param		{object}		config.origin		Start point of grid
	 * @param		{object}		config.terminus	End point of grid
	 */
	var Field = function(config) {
		this.parent.init(this, config);
	};

	Field.extend(Shape);

	Field.prototype.generatePoints = function(config) {
		var spacing	= config.spacing;
		var origin	= config.origin || {x: 0, y: 0};
		var terminus	= config.terminus || {x: 0, y: 0};

		for(var j = origin.y; j < terminus.y; j += spacing) {
			for(var i = origin.x; i < terminus.x; i += spacing) {
				this.addPoint({x: i, y: j});
			}
		}
	}

	return Field;
});
