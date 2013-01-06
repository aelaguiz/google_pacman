var Util = function() {
};

Util.prototype = {
	rand: function () {
		var b = 4294967296;
		var c = 134775813;

		c = c * this.randSeed + 1;
		return (this.randSeed = c % b) / b;
	},

	seed: function (b) {
		this.randSeed = b;
	},

	getDistance: function (b, c) {
		return Math.sqrt((c[1] - b[1]) * (c[1] - b[1]) + (c[0] - b[0]) * (c[0] - b[0]));
	}
};
