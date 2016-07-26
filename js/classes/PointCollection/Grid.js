define(['utilities', 'classes/PointCollection/PointCollection'], function(utilities, PointCollection) {
	/**
	 * Create a uniformly spaced grid of points.
	 *
	 * @param		{integer}		config.spacing		Amount to space out the points by
	 * @param		{object}		config.offset		Optional coordinate start point of grid
	 */
	var Grid = function(config) {
		this.init(config);
	};

	Grid.extend(PointCollection);

	Grid.prototype.init = function(config) {
		this.parent.init(this, config);

		var offset	= config.offset || {x: 0, y: 0};
		var spacing	= config.spacing;

		for(var j = offset.y; j < this.height; j += spacing) {
			for(var i = offset.x; i < this.width; i += spacing) {
				this.points.push({x: i, y: j});
			}
		}
	}

	return Grid;
});
