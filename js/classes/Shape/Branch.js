define(['compass', 'shape', 'blank', 'line', 'rectangle'], function(Compass, Shape, Blank, Line, Rectangle) {
	var Branch = function(config) {
		this.parent.init(this, config);
	};

	Branch.extend(Shape);

	Branch.prototype.generatePoints = function(config) {
		// Configuration
		const LENGTH		= 6;
		var direction		= config.direction || 'south';
		var start			= config.start || {x: 0, y: 0};
		var points		= [];
		var compass		= new Compass();

		// Behavior
		var chanceRecurse		= 0.97;
		var chanceDeflect		= 0.3;
		var adjChanceDeflect	= chanceDeflect;
		var absolute			= 1;

		compass.setState(config.direction);

		var adjustment		= compass.getState().coordinates;
		var perpendicular	= compass.rotate().getState().coordinates;
		var offset		= {x: perpendicular.x, y: perpendicular.y};

		// Create the shape's points
		(function() {
			for(var i = 0; i < (LENGTH - 1); i++) {
				var point = {x: start.x, y: start.y};

				point.x += adjustment.x * i;
				point.y += adjustment.y * i;

				if( i != 0 ) {
					if( Math.random() < adjChanceDeflect ) {
						adjChanceDeflect	= adjChanceDeflect * 0.55;
						absolute			= (Math.random() > 0.5) ? 1 : -1;

						if( offset.x != 0 ) {
							offset.x += perpendicular.x * absolute;
						}
						if( offset.y != 0 ) {
							offset.y += perpendicular.y * absolute;
						}
					}
				}

				point.x += offset.x;
				point.y += offset.y;

				points.push(point);
			}

			// Chance to recurse
			if( Math.random() < chanceRecurse ) {
				chanceRecurse = chanceRecurse * 0.95;

				// Reset accumulated values
				offset			= {x: perpendicular.x * absolute, y: perpendicular.y * absolute};
				adjChanceDeflect	= chanceDeflect;

				// Set the next start point
				start	= {x: point.x + adjustment.x, y: point.y + adjustment.y};

				arguments.callee();
			}
		})();

		this.points = points;
	}

	return Branch;
})
