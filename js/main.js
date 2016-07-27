require(['classes/Layer', 'classes/Matrix', 'classes/PointCollection/Line', 'classes/PointCollection/Rectangle', 'classes/PointCollection/Circle', 'classes/PointCollection/Spiral', 'classes/PointCollection/Grid'], function(Layer, Matrix, Line, Rectangle, Circle, Spiral, Grid) {
	var testLayer = new Layer({name: 'primary-layer'});

	/*
	var args = {origin: {x: 0, y: 0}, width: 10, height: 10, parent: false};
	var testMatrix = new Matrix(args);

	var testPoints = testMatrix.getRectanglePoints({x: 0, y: 0}, {x: 12, y: 12}, 'edge');

	testMatrix.addNodes(testPoints, {});

	var child = testMatrix.addChild({origin: {x: 2, y: 2}, width: 9, height: 9});

	//var testPoints2 = child.getSpiralPoints({x: 4, y: 4});
	var testPoints2 = child.getCrossPoints({x: 4, y: 4});
	//var testPoints2 = child.getCirclePoints({x: 4, y: 4}, 4, 'edge');
	testPoints2 = child.rotatePoints(testPoints2, 15);
	child.addNodes(testPoints2, {});
	child.shiftNodes(1, 0);

	testLayer.draw(testMatrix, {x: 0, y: 0});
	*/

	/*
	MatrixFactory:
	-create double edge: make a matrix, then make an identical child that is 1pt smaller
	*/

	var testLine = new Line({
		origin:		{x: 1, y: 1},
		terminus:		{x: 3, y: 5}
	});

	var testRectangle = new Rectangle({
		origin:		{x: 1, y: 1},
		terminus:		{x: 3, y: 3}
	});

	var testCircle = new Circle({
		origin:		{x: 2, y: 2},
		radius:		3,
		types:		'edge'
	});

	var testSpiral = new Spiral({
		origin:		{x: 1, y: 1},
		limit:		6
	});

	var testGrid = new Grid({
		spacing:		2,
		origin:		{x: 0, y: 0},
		terminus:		{x: 5, y: 5}
	});

	console.log(testLine);
	console.log(testRectangle);
	console.log(testCircle);
	console.log(testSpiral);
	console.log(testGrid);
});
