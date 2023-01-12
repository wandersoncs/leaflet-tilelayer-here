
# Leaflet.TileLayer.HERE

![](https://img.shields.io/npm/v/leaflet-tilelayer-here)

Displays map tiles from [HERE Raster Tile API](https://developer.here.com/documentation/raster-tile-api/dev_guide/index.html) in your Leaflet map.

## Installing
```
npm i -S leaflet-tilelayer-here
```
or using Yarn
```
yarn add leaflet-tilelayer-here
```

## Usage
```
L.tileLayer.here({ apiKey: 'abcde' }).addTo(map);
```

The following options are available:

| option       | type    | default        |                                                                            |
| ------------ | ------- | -------------- | -------------------------------------------------------------------------- |
| `style`      | String  | `'explore.day'`| The "map style", as documented in the HERE API.                            |
| `resource`   | String  | `'base'`       | The "map resource", as documented in the HERE API.                         |
| `format`     | String  | `'png8'`       | Image format to be used (`png8`, `png`, or `jpg`)                          |
| `apiKey`     | String  | none           | Required option. The `apiKey` provided as part of the HERE credentials     |
| `features`   | String  | none           | Optional map features parameter, as documented in the HERE API.            |
| `mapVersion` | String  | none           | Optional parameter(mv) to request the current version of a map, as documented in the HERE API. |
| `language`   | String  | none           | Optional parameter to request(lang) tiles with specific language, as documented in the HERE API. |


## Legalese

----------------------------------------------------------------------------

As long as you retain this notice you can do whatever you want with this stuff. 
If we meet some day, and you think this stuff is worth it, you can buy me a beer in return.

----------------------------------------------------------------------------
