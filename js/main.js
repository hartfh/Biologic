require.config({
	//baseUrl:	'',
	paths: {
		'utilities':			'utilities',
		'constants':			'constants',
		'matrix':				'classes/Matrix',
		'grid':				'classes/Grid',
		'node':				'classes/Node',
		'signal':				'classes/Signal',
		'compass':			'classes/Compass',
		'asset-tracker':		'classes/AssetTracker',
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
		'branch':				'classes/Shape/Branch',
		'shape-field':			'classes/Shape/ShapeField'
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

// Other classes:
// Character class, Something else to track pixels and tiles (Map class?)
// Ability to load map data initially and on the fly
// Pixel grid with larger tile grid (way to reconcile the two)
// Include object tracking but possibly export object details into its own module?

require(['utilities', 'matrix', 'grid', 'blank', 'line', 'rectangle', 'circle', 'tube', 'spiral', 'ordered-field', 'polar-array', 'rectangular-array', 'linear-array', 'blob', 'irregular-line', 'branch', 'shape-field', 'asset-tracker'], function(utilities, Matrix, Grid, Blank, Line, Rectangle, Circle, Tube, Spiral, OrderedField, PolarArray, RectangularArray, LinearArray, Blob, IrregularLine, Branch, ShapeField, AssetTracker) {

	var matrix = new Matrix({
		width:	40,
		height:	40
	});

	matrix.toEachCell(function(cell, x, y) {
		return true;
		/*
		matrix.eachNeighbor(x, y, function(neighbor) {
			console.log(neighbor);
		});
		*/
	});

	matrix.randomize(13);

	console.log(matrix);

	setInterval(function() {
		matrix.applyLifeFilter();
		tempDraw();
	}, 85)


	var tempDraw = function() {
		// Temporary matrix drawing code:
		jQuery('#app-container').append('<canvas id="matrix-layer" width="1200" height="900" />');
		var elem	= document.getElementById('matrix-layer');
		var ctx	= elem.getContext('2d');

		var cellWidth	= 10;

		matrix.forEachCell(function(cell, x, y) {
			var color = 'rgba(70, 80, 70, 1)';

			if( cell ) {
				color = 'rgba(230, 90, 110, 1)';
			}

			ctx.fillStyle = color;
			ctx.fillRect(cellWidth * x, cellWidth * y, cellWidth, cellWidth);
		});
	}

	tempDraw();


	/*
	var nodeWidth	= constants.nodeWidth;
	var coords	= node.getCoordinates();
	var nodeStartX = coords.x * nodeWidth;
	var nodeStartY	= coords.y * nodeWidth;
	var color		= node.getColor();

	this.ctx.fillStyle = color;
	this.ctx.fillRect(nodeStartX, nodeStartY, nodeWidth, nodeWidth);
	*/

	//var testGrid = new Grid({width: 200, height: 140, name: 'grid-1'});
	//var testAT = new AssetTracker();
	//var handle1 = testAT.load({'one': 11111});
	//console.log( testAT.get(handle1) );
	//console.log(testAT);

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

	/*
	var testShape = new Branch({
		start:		{x: 40, y: 10},
		direction:	'south'
	});
	*/

	/*
	var testShape = new Rectangle({
		origin:		{x: 5, y: 5},
		width:		40,
		height:		40
	});

	testShape.selectRandom({density: 43});

	testGrid.toNodes(testShape, function(node) {
		testGrid.addActiveNode(node);
		node.setStage('alive').setInert(true).setImmortal(true);
	});

	testGrid.draw();
	*/

	/*
	// Rectangle with a blob cut out
	var testRect = new Rectangle({
		origin:		{x: 80, y: 40},
		width: 		50,
		height:		50
	});

	var testBlob = new Blob({
		origin:	{x: 105, y: 65},
		radius:	4
	});

	testRect.subtract(testBlob).selectAll().saveSelection();

	testGrid.toNodes(testRect, function(node) {
		node.setStage('alive').setInert(true).setImmortal(true);
	});
	*/

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
