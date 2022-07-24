
# Leaflet.TileLayer.HERE

![](https://img.shields.io/npm/v/leaflet-tilelayer-here)

Displays [map tiles from HERE maps](https://developer.here.com/rest-apis/documentation/enterprise-map-tile/topics/quick-start.html) in your Leaflet map.

## Installing
```
npm i -S leaflet-tilelayer-here
```
or using Yarn
```
yarn add leaflet-tilelayer-here
```

## Usage
You will need credentials that you can get [here](https://developer.here.com/documentation/map-tile/dev_guide/topics/credentials-auth-options.html).

```
L.tileLayer.here({ apiKey: 'abcde' }).addTo(map);
```

The following options are available:

| option       | type    | default        |                                                                            |
| ------------ | ------- | -------------- | -------------------------------------------------------------------------- |
| `scheme`     | String  | `'normal.day'` | The "map scheme", as documented in the HERE API.                           |
| `resource`   | String  | `'maptile'`    | The "map resource", as documented in the HERE API.                         |
| `mapId`      | String  | `'newest'`     | Version of the map tiles to be used, or a hash of an unique map            |
| `format`     | String  | `'png8'`       | Image format to be used (`png8`, `png`, or `jpg`)                          |
| `useCIT`     | Boolean | false          | Whether to use the CIT-URL when loading the tiles                          |
| `useHTTPS`   | Boolean | true           | Whether to use HTTPS when requesting the tiles                             |
| `language`   | String  | none           | The primary language on the tiles                                          |
| `language2`  | String  | none           | The second language on the tiles                                           |
| `apiKey`     | String  | none           | Required option. The `apiKey` provided as part of the HERE credentials     |



## Legalese

----------------------------------------------------------------------------

As long as you retain this notice you can do whatever you want with this stuff. 
If we meet some day, and you think this stuff is worth it, you can buy me a beer in return.

----------------------------------------------------------------------------
