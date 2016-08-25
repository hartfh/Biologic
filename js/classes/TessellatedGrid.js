define(['grid', 'tessellated-node'], function(Grid, TessellatedNode) {
	var TessellatedGrid = function(config) {
		this.parent.init(this, config);

		// more initialization stuff
	};

	TessellatedGrid.extend(Grid);

	return TessellatedGrid;
});
