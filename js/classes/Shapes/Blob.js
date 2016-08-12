define(['shape'], function(Shape) {
	var Blob = function(config) {
		this.parent.init(this, config);
	};

	Blob.extend(Shape);

	Blob.prototype.generatePoints = function() {
		// get main circle.
		// get smaller circles along main circle's edge.
		// possibly repeat process again until circles reach a minimum size threshold.
		// stop and combine all circles.
	}

	return Blob;
});
