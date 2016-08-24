define(['shape'], function(Shape) {
	var Tube = function(config) {
		this.parent.init(this, config);
	};

	Tube.extend(Shape);

	Tube.prototype.generatePoints = function() {
		
	}

	return Tube;
})
