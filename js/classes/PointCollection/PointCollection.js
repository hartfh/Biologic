define([], function() {
	var PointCollection = function(config) {
		this.init(this, {});
	};

	PointCollection.prototype.init = function(self, config) {
		self.points = [];
	}

	return PointCollection;
});
