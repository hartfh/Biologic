require(['classes/Layer', 'classes/Matrix/Matrix'], function(Layer, Matrix) {
	var testLayer = new Layer({name: 'primary-layer'});

	var args = {origin: {x: 2, y: 2}, width: 5, height: 5, parent: false};
	var test = new Matrix(args);

	var testPoints = test.getRectanglePoints({x: -1, y: 0}, {x: 7, y: 1});
	test.checkBounds(testPoints)
	console.log( test );
});
