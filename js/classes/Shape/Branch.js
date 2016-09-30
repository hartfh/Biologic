define(['shape', 'blank', 'line', 'rectangle'], function(Shape, Blank, Line, Rectangle) {
	var Branch = function(config) {
		this.parent.init(this, config);
	};

	Branch.extend(Shape);

	Branch.prototype.generatePoints = function(config) {
		/*
		function sortLowestToHighest(a, b) {
			var a = a.x + a.y;
			var b = b.x + b.y;

			if( a > b ) {
				return 1;
			} else if( a < b ) {
				return -1;
			} else {
				return 0;
			}
		}

		var origin	= config.origin;
		var terminus	= config.terminus;
		var width		= Math.abs(terminus.x - origin.x);
		var height	= Math.abs(terminus.y - origin.y);
		var starter	= new Blank();
		//var adjuster	= (width > height) ? width : height;
		var scale		= 6;

		var line = new Line({
			origin:		origin,
			terminus:		terminus
		});

		line.selectRandom({number: 7}).saveSelected();

		var randomPoints = line.selected;

		for(var i in randomPoints) {
			var point	= randomPoints[i];

			var xAdjust = Math.floor( Math.random() * height / scale );
			var yAdjust = Math.floor( Math.random() * width / scale );

			var randXDir = ( Math.random() > 0.5 ) ? -1 : 1;
			var randYDir = ( Math.random() > 0.5 ) ? -1 : 1;

			randomPoints[i].x += xAdjust * randXDir;
			randomPoints[i].y += yAdjust * randYDir;
		}

		randomPoints.sort(sortLowestToHighest)

		randomPoints = [origin, ...randomPoints, terminus];

		for(var i in randomPoints) {
			if( i != 0 ) {
				var pointOne	= randomPoints[i - 1];
				var pointTwo	= randomPoints[i];

				var line = new Line({
					origin:	pointOne,
					terminus:	pointTwo
				});

				starter.add(line);
			}
		}

		this.points = starter.points;
		this.eliminateDuplicates();
		*/
	}

	return Branch;
})
