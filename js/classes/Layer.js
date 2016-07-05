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

	/**
	 * Recursively draws the nodes of a matrix and all its child matrices.
	 *
	 * @param		{object}	matrix
	 * @param		{object}	origin
	 */
	Layer.prototype.draw = function(matrix, origin) {
		var self			= this;
		var nodeWidth		= constants.tilePxWidth;
		this.ctx.fillStyle	= 'rgba(105, 105, 200, 1)';

		// Draw all nodes in the supplied matrix
		matrix.eachNode(function(node) {
			if( node ) {
				var nodeStartX = node.x * nodeWidth + origin.x;
				var nodeStartY = node.y * nodeWidth + origin.y;

				self.ctx.fillRect(nodeStartX, nodeStartY, nodeWidth, nodeWidth);
			}
		});

		// Recurse through the child matrices
		for(var i in matrix.children) {
			var childMatrix	= matrix.children[i];
			var originSum		= {x: origin.x + childMatrix.origin.x, y: origin.y + childMatrix.origin.y};

			this.draw(childMatrix, originSum);
		}
	}

	return Layer;
});
