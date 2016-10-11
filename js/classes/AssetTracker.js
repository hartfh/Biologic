define([], function() {
	var AssetTracker = function(config) {
		var config = config || {};

		this.assets	= {};	// contains references to assets
		this.numAssets	= 0;		// ensures a unique handle for each loaded asset
	};

	AssetTracker.prototype.load = function(asset) {
		if( typeof(asset) == 'undefined' ) {
			return false;
		}

		var handle = 'asset-' + this.numAssets;

		this.assets[handle] = asset;

		this.numAssets++;

		return handle;
	};

	AssetTracker.prototype.unload = function(handle) {
		if( this.assets.hasOwnProperty(handle) ) {
			delete this.assets[handle];

			return true;
		}

		return false;
	};

	AssetTracker.prototype.get = function(handle) {
		if( this.assets.hasOwnProperty(handle) ) {
			return this.assets[handle];
		}

		return false;
	};

	return AssetTracker;
});
