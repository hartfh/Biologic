define(['utilities', 'classes/Shapes/Shape', 'classes/Compass'], function(utilities, Shape, Compass) {
	/**
	 * Creates a spiral shape of points.
	 *
	 * @param		{object}		config.origin	Center point of the spiral
	 * @param		{integer}		config.limit	Optional parameter which limits the size of the spiral
	 */
	var Spiral = function(config) {
		this.parent.init(this, config);
	};

	Spiral.extend(Shape);

	Spiral.prototype.generatePoints = function(config) {
		var limit		= config.limit || 30;	// Limit on arm length
		var compass	= new Compass();
		var armLength	= 0;					// Tracks current arm length
		var armPoint	= config.origin;

		this.addPoint(armPoint);

		// Gather points as long as we're within the limit
		while( true ) {
			for(var i = 1; i < armLength + 1; i++) {
				var state		= compass.getState();
				var coordMod	= state.coordinates;

				armPoint = {x: armPoint.x + coordMod.x, y: armPoint.y + coordMod.y};

				this.addPoint(armPoint);
			}

			armLength++;

			compass.rotate();

			if( armLength >= limit ) {
				break;
			}
		}
	}

	return Spiral;
});
