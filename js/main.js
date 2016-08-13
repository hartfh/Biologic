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
		'blob':				'classes/Shapes/Blob'
	}
});

require(['utilities', 'grid', 'line', 'rectangle', 'circle', 'spiral', 'ordered-field', 'polar-array', 'rectangular-array', 'blob'], function(utilities, Grid, Line, Rectangle, Circle, Spiral, OrderedField, PolarArray, RectangularArray, Blob) {
	//var testLayer = new Layer({name: 'primary-layer'});

	/*
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
	*/

	var testBlob = new Blob({
		origin:	{x: 15, y: 15},
		radius:	6
	});

	var testPolarArray = new PolarArray({

	});

	var testRectangularArray = new RectangularArray({

	});

	//testLine.rotate(90);

	var testGrid = new Grid({width: 30, height: 30, name: 'grid-1'});

	testGrid.toNodes(testBlob, function(node) {
		node.color = 'red';
	});

	/*
	console.log(testLine);
	console.log(testRectangle);
	console.log(testCircle);
	console.log(testSpiral);
	console.log(testOrderedField);
	*/
	console.log(testBlob);
	console.log(testPolarArray);
	console.log(testRectangularArray);

	testGrid.draw();
});
