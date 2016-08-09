define(['utilities', 'shape'], function(utilities, Shape) {
	/**
	 * Creates a line shape of points.
	 *
	 * @param		{object}	config.origin		Start point
	 * @param		{object}	config.terminus	End point
	 */
	var Line = function(config) {
		this.parent.init(this, config);
	};

	Line.extend(Shape);

	Line.prototype.generatePoints = function(config) {
		var origin	= config.origin;
		var terminus	= config.terminus;

		if( origin.x == terminus.x && origin.y == terminus.y ) {
			return;
		}

		var slope = (terminus.y - origin.y) / (terminus.x - origin.x);

		if( Math.abs(slope) > 1 ) {
			slope = (terminus.x - origin.x) / (terminus.y - origin.y);

			if( origin.y < terminus.y ) {
				var start	= origin;
				var end	= terminus;
			} else {
				var start	= terminus;
				var end	= origin;
			}

			var offset = start.x - slope * start.y;

			for(var y = start.y; y <= end.y; y++) {
				var x = slope * y + offset;
				x = Math.round(x);

				this.addPoint({x: x, y: y});
			}
		} else {
			if( origin.x < terminus.x ) {
				var start	= origin;
				var end	= terminus;
			} else {
				var start	= terminus;
				var end	= origin;
			}

			var offset = start.y - slope * start.x;

			for(var x = start.x; x <= end.x; x++) {
				var y = slope * x + offset;
				y = Math.round(y);

				this.addPoint({x: x, y: y});
			}
		}
	}

	return Line;
});
