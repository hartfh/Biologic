require.config({
	//baseUrl:	'',
	paths: {
		'utilities':			'utilities',
		'constants':			'constants',
		'grid':				'classes/Grid',
		'node':				'classes/Node',
		'signal':				'classes/Signal',
		'compass':			'classes/Compass',
		'shape':				'classes/Shape/Shape',
		'shape-matrix':		'classes/Shape/ShapeMatrix',
		'blank':				'classes/Shape/Blank',
		'line':				'classes/Shape/Line',
		'rectangle':			'classes/Shape/Rectangle',
		'circle':				'classes/Shape/Circle',
		'tube':				'classes/Shape/Tube',
		'spiral':				'classes/Shape/Spiral',
		'ordered-field':		'classes/Shape/OrderedField',
		'polar-array':			'classes/Shape/PolarArray',
		'rectangular-array':	'classes/Shape/RectangularArray',
		'linear-array':		'classes/Shape/LinearArray',
		'blob':				'classes/Shape/Blob',
		'irregular-line':		'classes/Shape/IrregularLine',
		'branch':				'classes/Shape/Branch'
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

// Add "satellite" option to Blob (define number, defaults to zero)
// Other blob ideas: after making Branches, combine branches with blob to make "arms".
// Possibly even connect to other blobs, creating a branching network
// Do similar as above with rectangles and branches using straight lines

require(['utilities', 'grid', 'blank', 'line', 'rectangle', 'circle', 'tube', 'spiral', 'ordered-field', 'polar-array', 'rectangular-array', 'linear-array', 'blob', 'irregular-line', 'branch'], function(utilities, Grid, Blank, Line, Rectangle, Circle, Tube, Spiral, OrderedField, PolarArray, RectangularArray, LinearArray, Blob, IrregularLine, Branch) {

	var testGrid = new Grid({width: 200, height: 140, name: 'grid-1'});

	/*
	var testPolarArray = new PolarArray({
		origin:	{x: 15, y: 15},
		radius:	7,
		number:	4,
		adjust:	{x: 0, y: 0},
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
		}
	});
	*/

	/*
	var lineTest = new IrregularLine({
		origin:	{x: 5, y: 5},
		terminus:	{x: 37, y: 27}
	});

	//lineTest.grow().grow().selectEdge();

	testGrid.toNodes(lineTest, function(node) {
		node.setStage('alive').setInert(true).setImmortal(true);
	});
	*/
	var branchTest = new Branch({});

	var testShape = new Line({
		origin:	{x: 5, y: 5},
		terminus:	{x: 27, y: 17}
	});

	testShape.scale(3).grow().grow().selectEdge();

	testGrid.toNodes(testShape, function(node) {
		node.setStage('alive').setInert(true).setImmortal(true);
	});

	/*
	var testBlob = new Blob({
		origin:	{x: 85, y: 67},
		radius:	7
	});

	//testBlob.selectEdge({greedy: true}).saveSelected().grow().grow().grow().selectEdge();
	testBlob.selectEdge({greedy: true});

	testGrid.toNodes(testBlob, function(node) {
		node.setStage('alive').setInert(true).setImmortal(true);
	});
	*/

	/*
	testBlob.selectInside();

	testGrid.toNodes(testBlob, function(node) {
		node.setStage('dying').setInert(true).setImmortal(true);
	});
	*/

	testGrid.draw();

	/*
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

	var testRectangle3 = new Rectangle({
		origin:	{x: 16, y: 20},
		width:	3,
		height:	8,
	});

	var testCircle = new Circle({
		origin:	{x: 36, y: 16},
		radius:	4
	});

	testRectangle
		.subtract(testRectangle2)
		.add(testRectangle3)
		.selectEdge({greedy: true});

	testCircle
		.selectEdge({greedy: true})
		.selectRandom({density: 80});

	testGrid.toNodes(testRectangle, function(node) {
		node
			.setStage('alive')
			.setInert(true)
			.setImmortal(true);
	});

	testGrid.toNodes(testCircle, function(node) {
		node
			.setStage('alive')
			.setInert(true)
			.setImmortal(true);
	});

	testRectangle
		.selectAll()
		.selectInside({greedy: true})
		.selectRandom({number: 1});

	testGrid.toNodes(testRectangle, function(node) {
		node.setStage('starter');
		testGrid.active.push(node);
	});

	testGrid.draw();

	//for(var i = 0; i < 1; i++) { testGrid.cycle(); }

	var startSequence = function() {
		setInterval(function() {
			testGrid.cycle();
		}, 100);
	}
	startSequence();
	*/
});
