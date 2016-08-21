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
		'linear-array':		'classes/Shape/LinearArray',
		'blob':				'classes/Shape/Blob'
	}
});

// TODO:
// Fix bugs in flip()
// Add Line to Array classes
// Finish LinearArray class
// Consider other classes: Branching pattern, Shapes utilizing recursion, Something like Blob but with Rectangles
//   -Other irregular shapes: Fractal that uses a subshape
// Create various types of Cell behavior. (e.g. generator, alive with lifespan, inert)
// Setup some premade shape arrangements that specify starting stats for some of the cells.
// 	-Might want a new class that combines shape creation with modifications to cells. e.g. Pattern or Template
// Shape for creating rings/donuts with a "hole" in them. Or possibly just create a subtract() method. Also join().
//	-Create a ring with 1px inside region. Allow a single cell to loop around in it.
//	-Can create wires/circuits for cells.

// Create an "engine" class(?). Instantiates a Grid, creates shapes, loads them. Cycles Grid every 1-2 seconds.
// Find some way to combine engine with advanced shapes

// Remove separateTypes() from shape creation. Change Grid.toNodes() to accept just a Shape object.
// Possibly change getEdges/Insides to calculate points.

require(['utilities', 'grid', 'blank', 'line', 'rectangle', 'circle', 'spiral', 'ordered-field', 'polar-array', 'rectangular-array', 'linear-array', 'blob'], function(utilities, Grid, Blank, Line, Rectangle, Circle, Spiral, OrderedField, PolarArray, RectangularArray, LinearArray, Blob) {
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
		height:	9
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
		radius:	6
	});
	*/

	/*
	var testCircle = new Circle({
		origin:		{x: 0, y: 0},
		radius:		10,
		//density:		80,
		substantiate:	false
	});
	*/

	//testCircle.rotate(90);

	var testPolarArray = new PolarArray({
		origin:	{x: 15, y: 15},
		radius:	7,
		number:	4,
		adjust:	{x: 0, y: 0},
		shape:	{
			/*
			type:	'spiral',
			config:	{
				limit:	11
			}
			*/
			type:	'circle',
			config:	{
				radius:		5
			}
			/*
			type:	'rectangle',
			config:	{
				width:	9,
				height:	7
			}
			*/
		}
	});

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
		}
	});
	*/

	var testGrid = new Grid({width: 59, height: 30, name: 'grid-1'});


	/*
	testGrid.toNodes(testBlob, function(node) {
		node.color = 'red';
	});
	*/

	var testRectangle = new Rectangle({
		origin:	{x: 10, y: 10},
		width:	14,
		height:	12
	});

	var testRectangle2 = new Rectangle({
		origin:	{x: 13, y: 13},
		width:	8,
		height:	6
	});

	var testCircle = new Circle({
		origin:	{x: 36, y: 16},
		radius:	4
	});

	testRectangle.subtract(testRectangle2);
	testRectangle.selectEdges({greedy: true});

	testCircle.selectEdges({greedy: true}).selectRandom({density: 80});

	testGrid.toNodes(testRectangle, function(node) {
		node.color = 'red';
	});

	testGrid.toNodes(testCircle, function(node) {
		node.color = 'red';
	});

	testRectangle.selectAll().selectInsides({greedy: true}).selectRandom({number: 2});

	testGrid.toNodes(testRectangle, function(node) {
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
