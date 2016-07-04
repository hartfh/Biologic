define(function() {
	/**
	 * A class for tracking directionality in square, 2-dimensional arrays.
	 */
	var Compass = function(width) {
		this.state	= 0;
		this.width	= width || 1;
		this.key		= ['N', 'E', 'S', 'W'];
		this.states	= [
			{
				direction:	'N',
				coordinates:	{x: 0, y: -1},
				cornerA:		{x: 0, y: 0},
				cornerB:		{x: this.width - 1, y: 0}
			},
			{
				direction:	'E',
				coordinates:	{x: 1, y: 0},
				cornerA:		{x: this.width - 1, y: 0},
				cornerB:		{x: this.width - 1, y: this.width - 1}
			},
			{
				direction:	'S',
				coordinates:	{x: 0, y: 1},
				cornerA:		{x: this.width - 1, y: this.width - 1},
				cornerB:		{x: 0, y: this.width - 1}
			},
			{
				direction:	'W',
				coordinates:	{x: -1, y: 0},
				cornerA:		{x: 0, y: this.width - 1},
				cornerB:		{x: 0, y: 0}
			}
		];

		/**
		 * Set the compass to the specified direction.
		 *
		 * @param		{string}	direction		One of the directions in this.key
		 */
		this.setState = function(direction) {
			var index = this.key.indexOf(direction);

			if( index != -1 ) {
				this.state = index;
			}

			return this;
		}

		this.getState = function() {
			return this.states[this.state];
		}

		/**
		 * Rotate the compass by N 90-degree rotations. Defaults to one rotation if no argument supplied.
		 *
		 * @param		{integer}		rotations
		 */
		this.rotate = function(rotations) {
			var rotations = rotations || 1;

			for(var i = 0; i < rotations; i++) {
				this.state++;

				if( this.state == this.key.length ) {
					this.state = 0;
				}
			}

			return this;
		}

		/**
		 * Sets the compass to a random direction.
		 */
		this.randomize = function() {
			var maxIndex	= this.key.length;
			var randIndex	= Math.floor( Math.random() * maxIndex );
			var randDir	= this.key[randIndex];

			this.setState(randDir);
		}
	}

	return Compass;
});
