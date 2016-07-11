require(['classes/Layer', 'classes/Matrix/Matrix'], function(Layer, Matrix) {
	var testLayer = new Layer({name: 'primary-layer'});

	var args = {origin: {x: 0, y: 0}, width: 10, height: 10, parent: false};
	var testMatrix = new Matrix(args);

	//var testPoints = testMatrix.getRectanglePoints({x: -1, y: 0}, {x: 7, y: 1}, 'edge');
	//testMatrix.checkBounds(testPoints);

	var testPoints2 = testMatrix.getSpiralPoints({x: 3, y: 3}, 7);
	console.log(testPoints2);

	testLayer.draw(testMatrix, {x: 0, y: 0});
});
