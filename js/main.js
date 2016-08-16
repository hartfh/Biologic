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
		'blank':				'classes/Shape/Blank',
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

// TODO:
// -fix bugs in flip()
// -decide what rotate() should rotate about. (possibly the origin, unless specific, now that negative points are allowed)
// -Finish PolarArray

require(['utilities', 'grid', 'blank', 'line', 'rectangle', 'circle', 'spiral', 'ordered-field', 'polar-array', 'rectangular-array', 'blob'], function(utilities, Grid, Blank, Line, Rectangle, Circle, Spiral, OrderedField, PolarArray, RectangularArray, Blob) {
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
		origin:	{x: 10, y: 10},
		width:	5,
		height:	9,
		edges:	true
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
		origin:	{x: 15, y: 15},
		radius:	6,
		edges:	true
	});
	*/

	var testCircle = new Circle({
		origin:		{x: 4, y: 4},
		radius:		7,
		edges:		true,
		//density:		80,
		substantiate:	false
	});

	//testCircle.rotate(0);

	/*
	var testPolarArray = new PolarArray({
		origin:	{x: 15, y: 15},
		radius:	8,
		number:	4,
		shape:	{
			type:	'circle',
			config:	{
				radius:		5
			}
		}
	});
	*/

	/*
	var testRectangularArray = new RectangularArray({
		origin:	{x: 0, y: 0},
		width:	46,
		height:	28,
		spacing:	15,
		shape:	{
			type:	'rectangle',
			config:	{
				width:	4,
				height:	5
			}
			type:	'circle',
			config:	{
				radius:	5
			}
			type:	'spiral',
			config:	{
				limit:	11
			}
		},
		//edges:	true
	});
	*/

	var testGrid = new Grid({width: 59, height: 30, name: 'grid-1'});

	/*
	testGrid.toNodes(testBlob, function(node) {
		node.color = 'red';
	});
	*/

	testGrid.toNodes(testCircle, function(node) {
		node.color = 'red';
	});

	/*
	console.log(testLine);
	console.log(testRectangle);
	console.log(testCircle);
	console.log(testSpiral);
	console.log(testOrderedField);
	*/
	//console.log(testBlob);
	//console.log(testPolarArray);

	testGrid.draw();
});
