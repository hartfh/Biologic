define(['shape'], function(Shape) {
	var Blank = function(config) {
		this.parent.init(this, config);
	}

	Blank.extend(Shape);

	return Blank;
})
