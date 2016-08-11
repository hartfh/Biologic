define(['compositeShape'], function(CompositeShape) {
	var Blob = function(config) {
		this.parent.parent.init(this, config);
	}

	Blob.extend(CompositeShape);

	return Blob;
});
