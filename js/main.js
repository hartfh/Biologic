require.config({
	//baseUrl:	'',
	paths: {
		'utilities':			'utilities',
		'constants':			'constants',
		'grid':				'classes/Grid',
		'node':				'classes/Node',
		'cell':				'classes/Cell',
		'compass':			'classes/Compass',
		'shape':				'classes/Shapes/Shape',
		'line':				'classes/Shapes/Line',
		'rectangle':			'classes/Shapes/Rectangle',
		'circle':				'classes/Shapes/Circle',
		'spiral':				'classes/Shapes/Spiral',
		'ordered-field':		'classes/Shapes/OrderedField',
		'polar-array':			'classes/Shapes/PolarArray',
		'rectangular-array':	'classes/Shapes/RectangularArray',
		'blob':				'classes/Shapes/Blob',
	}
});

require(['utilities', 'grid', 'line', 'rectangle', 'circle', 'spiral', 'ordered-field', 'polar-array', 'rectangular-array', 'blob'], function(utilities, Grid, Line, Rectangle, Circle, Spiral, OrderedField, PolarArray, RectangularArray, Blob) {
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
		//origin:		{x: 8, y: 8},
		radius:		8,
		type:		'edge',
		density:		50
	});

	var testSpiral = new Spiral({
		origin:		{x: 8, y: 8},
		limit:		14
	});

	var testOrderedField = new OrderedField({
		origin:		{x: 0, y: 0},
		terminus:		{x: 5, y: 5},
		spacing:		2
	});

	var testBlob = new Blob({

	});

	var testPolarArray = new PolarArray({

	});

	var testRectangularArray = new RectangularArray({

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
	console.log(testOrderedField);
	console.log(testBlob);
	console.log(testPolarArray);
	console.log(testRectangularArray);

	testGrid.draw();
});
