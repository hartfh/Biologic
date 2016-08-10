require.config({
	//baseUrl:	'',
	paths: {
		'utilities':		'utilities',
		'constants':		'constants',
		'grid':			'classes/Grid',
		'node':			'classes/Node',
		'cell':			'classes/Cell',
		'compass':		'classes/Compass',
		'shape':			'classes/Shapes/Shape',
		'compositeShape':	'classes/Shapes/CompositeShape',
		'line':			'classes/Shapes/Simple/Line',
		'rectangle':		'classes/Shapes/Simple/Rectangle',
		'circle':			'classes/Shapes/Simple/Circle',
		'spiral':			'classes/Shapes/Simple/Spiral',
		'field':			'classes/Shapes/Simple/Field'
	}
});

require(['grid', 'line', 'rectangle', 'circle', 'spiral', 'field', 'compositeShape'], function(Grid, Line, Rectangle, Circle, Spiral, Field, CompositeShape) {
	//var testLayer = new Layer({name: 'primary-layer'});

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
		origin:		{x: 0, y: 0},
		terminus:		{x: 2, y: 2}
	});

	var testLine2 = new Line({
		origin:		{x: 3, y: 3},
		terminus:		{x: 6, y: 6}
	});

	var testRectangle = new Rectangle({
		origin:		{x: 1, y: 1},
		terminus:		{x: 3, y: 3}
	});

	var testCircle = new Circle({
		origin:		{x: 8, y: 8},
		radius:		8,
		type:		'edge'
	});

	var testSpiral = new Spiral({
		origin:		{x: 8, y: 8},
		limit:		14
	});

	var testField = new Field({
		origin:		{x: 0, y: 0},
		terminus:		{x: 5, y: 5},
		spacing:		2
	});

	//testLine.rotate(90);

	var testGrid = new Grid({width: 20, height: 20, name: 'grid-1'});

	testGrid.toNodes(testSpiral, function(node) {
		//node.updateContent('color', 'red');
	});


	console.log(testLine);
	console.log(testRectangle);
	console.log(testCircle);
	console.log(testSpiral);
	console.log(testField);

	testGrid.draw();
});
