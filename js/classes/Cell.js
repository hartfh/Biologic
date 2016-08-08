define(['classes/Node'], function(Node) {
	var Cell = function(config) {
		var config = config || {};

		this.parent.init(this, config);

		// extra constructor stuff here
	};

	Cell.extend(Node);

	// various seed types. seed causes cell to expand out according to various guidelines (utilizing shapes, somehow)

	return Cell;
});
