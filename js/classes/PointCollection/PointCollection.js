define([], function() {
	var PointCollection = function(config) {
		this.init(this, {});
	};

	PointCollection.prototype.init = function(self, config) {
		self.points = [];
	}

	PointCollection.prototype.rotate = function() {

	}

	// Ensure "array" isn't a protected word
	PointCollection.prototype.array = function() {
		// create a circular array of shapes
	}

	return PointCollection;
});
