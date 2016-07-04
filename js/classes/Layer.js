define(['constants'], function(constants) {
	var Layer = function(config) {
		this.init(this, config);
	};

	Layer.prototype.init = function(self, config) {
		constants.$app.append('<canvas id="' + config.name + '" width="1000" height="500" />');

		var elem	= document.getElementById(config.name);

		self.ctx	= elem.getContext('2d');
	}

	Layer.prototype.clear = function(origin, terminus) {
		var width		= constants.tilePxWidth;
		var startX	= origin.x * width;
		var startY	= origin.y * width;
		var endX		= terminus.x * width;
		var endY		= terminus.y * width;

		this.ctx.clearRect(startX, startY, endX, endY);
	}

	// new drawing method will need to check each entity and flatten them into one?
	// maybe have some flag that sets an entity to "updated" and redraw it then

	/*
	Layer.prototype.draw = function(points, vportAdjustment, shave, vportDims) {
		this.eachTile(points, vportAdjustment, shave, vportDims, this.drawTile);
	}
	*/

	/*
	Layer.prototype.eachTile = function(points, vportAdjustment, shave, vportDims, callback) {
		for(var index in points) {
			var point		= points[index];
			var shaveX	= 0;
			var shaveY	= 0;

			// Determines how much of the right and bottom tiles should be shaved off
			if( ( (index % vportDims.width) + 1 ) == vportDims.width ) {
				shaveX = shave.x;
			}
			if( (index / vportDims.width) >= vportDims.height - 1 ) {
				shaveY = shave.y;
			}

			callback(point, vportAdjustment, shaveX, shaveY, this);
		}
	}
	*/

	//Layer.prototype.drawTile = function() {}

	return Layer;
});
