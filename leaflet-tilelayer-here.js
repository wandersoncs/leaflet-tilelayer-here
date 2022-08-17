L.TileLayer.HERE = L.TileLayer.extend({
	options: {
		subdomains: '1234',
		minZoom: 2,
		maxZoom: 18,

		// option style: String = 'explore.day'
		style: 'explore.day',

		// option resource: String = 'base'
		resource: 'base',

		// option format: String = 'png8'
		// Image format to be used (`png8`, `png`, or `jpg`)
		format: 'png8',

		// option apiKey: String = ''
		// Required option. The `apiKey` provided as part of the HERE credentials
		apiKey: ''
	},


	initialize: function initialize(options) {
		options = L.setOptions(this, options);

		options.tileResolution = 256;

		if (L.Browser.retina) {
			options.tileResolution = 512;
		}

		var tileUrl = 'https://maps.hereapi.com/v3/{resource}/mc/{z}/{x}/{y}/{format}?apiKey={apiKey}&style={style}&size={tileResolution}';
		var copyrightUrl = 'https://maps.hereapi.com/v3/copyright?apiKey={apiKey}';

		this._attributionUrl = L.Util.template(copyrightUrl, this.options);

		L.TileLayer.prototype.initialize.call(this, tileUrl, options);

		this._attributionText = '';
	},

	onAdd: function onAdd(map) {
		L.TileLayer.prototype.onAdd.call(this, map);

		if (!this._attributionBBoxes) {
			this._fetchAttributionBBoxes();
		}
	},

	onRemove: function onRemove(map) {
		L.TileLayer.prototype.onRemove.call(this, map);

		if (this._map.attributionControl) {
			this._map.attributionControl.removeAttribution(this._attributionText);
		}

		this._map.off('moveend zoomend resetview', this._findCopyrightBBox, this);
	},

	_fetchAttributionBBoxes: function _onMapMove() {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = L.bind(function () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				this._parseAttributionBBoxes(JSON.parse(xmlhttp.responseText));
			}
		}, this);
		xmlhttp.open("GET", this._attributionUrl, true);
		xmlhttp.send();
	},

	_parseAttributionBBoxes: function _parseAttributionBBoxes(json) {
		if (!this._map) { return; }
		var providers = json.copyrights.in;

		for (var i = 0; i < providers.length; i++) {
			if (providers[i].boundingBoxes) {
				for (var j = 0; j < providers[i].boundingBoxes.length; j++) {
					var box = providers[i].boundingBoxes[j];
					providers[i].boundingBoxes[j] = L.latLngBounds([[box.east, box.north], [box.west, box.south]]);
				}
			}
		}

		this._map.on('moveend zoomend resetview', this._findCopyrightBBox, this);

		this._attributionProviders = providers;

		this._findCopyrightBBox();
	},

	_findCopyrightBBox: function _findCopyrightBBox() {
		if (!this._map) { return; }
		var providers = this._attributionProviders;
		var visibleProviders = [];
		var zoom = this._map.getZoom();
		var visibleBounds = this._map.getBounds();

		for (var i = 0; i < providers.length; i++) {
			if (providers[i].minLevel < zoom && providers[i].maxLevel > zoom)

				if (!providers[i].boundingBoxes) {
					// No boxes = attribution always visible
					visibleProviders.push(providers[i]);
					break;
				}

			for (var j = 0; j < providers[i].boundingBoxes.length; j++) {
				var box = providers[i].boundingBoxes[j];
				if (visibleBounds.overlaps(box)) {
					visibleProviders.push(providers[i]);
					break;
				}
			}
		}

		var attributionText = '© <a href="https://legal.here.com/terms/serviceterms/gb/">HERE maps</a>';

		if (attributionText !== this._attributionText && this._map.attributionControl) {
			this._map.attributionControl.removeAttribution(this._attributionText);
			this._map.attributionControl.addAttribution(this._attributionText = attributionText);
		}
	}
});


L.tileLayer.here = function (opts) {
	return new L.TileLayer.HERE(opts);
}
