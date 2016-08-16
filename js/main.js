require.config({
	//baseUrl:	'',
	paths: {
		'utilities':			'utilities',
		'constants':			'constants',
		'grid':				'classes/Grid',
		'node':				'classes/Node',
		'cell':				'classes/Cell',
		'compass':			'classes/Compass',
		'shape':				'classes/Shape/Shape',
		'shape-matrix':		'classes/Shape/ShapeMatrix',
		'line':				'classes/Shape/Line',
		'rectangle':			'classes/Shape/Rectangle',
		'circle':				'classes/Shape/Circle',
		'spiral':				'classes/Shape/Spiral',
		'ordered-field':		'classes/Shape/OrderedField',
		'polar-array':			'classes/Shape/PolarArray',
		'rectangular-array':	'classes/Shape/RectangularArray',
		'blob':				'classes/Shape/Blob'
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
		radius:	6,
		edges:	true
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
