define(['utilities', 'classes/PointCollection/PointCollection'], function(utilities, PointCollection) {
	/**
	 * Creates a rectangular shape of points.
	 *
	 * @param		{object}	config.origin		Start point
	 * @param		{object}	config.terminus	End point
	 * @param		{string}	config.types		Which point types to include: edge or interior
	 */
	var Rectangle = function(config) {
		this.parent.init(this, config);
	};

	Rectangle.extend(PointCollection);

	Rectangle.prototype.generatePoints = function(config) {
		var origin	= config.origin;
		var terminus	= config.terminus;
		var types		= types || 'all';

		var width		= terminus.x - origin.x + 1;
		var height	= terminus.y - origin.y + 1;

		var start	= {x: false, y: false};
		var end	= {x: false, y: false};

		if( width < 0 ) {
			start.x	= terminus.x;
			end.x	= origin.x;
			width	= Math.abs(width);
		} else {
			start.x	= origin.x;
			end.x	= terminus.x;
		}

		if( height < 0 ) {
			start.y	= terminus.y;
			end.y	= origin.y;
			height	= Math.abs(height);
		} else {
			start.y	= origin.y;
			end.y	= terminus.y;
		}

		for(var y = 0; y < height; y++) {
			for(var x = 0; x < width; x++) {
				var offsetPoint = {type: 'interior'};

				offsetPoint.x = x + start.x;
				offsetPoint.y = y + start.y;

				if( x == 0 || y == 0 ) {
					offsetPoint.type = 'edge';
				}
				if( x == width - 1 || y == height - 1 ) {
					offsetPoint.type = 'edge';
				}

				// Check against "types" argument to see if point should be included
				if( types == offsetPoint.type || types == 'all' ) {
					this.points.push(offsetPoint);
				}
			}
		}
	}

	return Rectangle;
});
