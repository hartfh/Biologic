require(['classes/Layer', 'classes/Matrix/Matrix'], function(Layer, Matrix) {
	var testLayer = new Layer({name: 'primary-layer'});

	var args = {origin: {x: 2, y: 2}, width: 5, height: 5, parent: false};
	var testMatrix = new Matrix(args);

	//var testPoints = testMatrix.getRectanglePoints({x: -1, y: 0}, {x: 7, y: 1}, 'edge');
	//testMatrix.checkBounds(testPoints);

	var testPoints2 = testMatrix.getCrossPoints({x: 2, y: 2}, 3);
	console.log(testPoints2);

	testLayer.draw(testMatrix, {x: 0, y: 0});
});
