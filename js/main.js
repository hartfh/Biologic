require(['classes/Layer', 'classes/Matrix/Matrix'], function(Layer, Matrix) {
	var testLayer = new Layer({name: 'primary-layer'});

	var args = {origin: {x: 0, y: 0}, width: 10, height: 10, parent: false};
	var testMatrix = new Matrix(args);

	//var testPoints = testMatrix.getCrossPoints({x: 5, y: 5});
	var testPoints = testMatrix.getRectanglePoints({x: 0, y: 0}, {x: 12, y: 12}, 'edge');
	//var testPoints = testMatrix.getSpiralPoints({x: 5, y: 5});

	testMatrix.addNodes(testPoints, {});

	var child = testMatrix.addChild({origin: {x: 2, y: 2}, width: 9, height: 9});

	//var testPoints2 = child.getSpiralPoints({x: 4, y: 4});
	//var testPoints2 = child.getCrossPoints({x: 4, y: 4});
	var testPoints2 = child.getCirclePoints({x: 4, y: 4}, 4, 'edge');
	child.addNodes(testPoints2, {});

	testLayer.draw(testMatrix, {x: 0, y: 0});
});
