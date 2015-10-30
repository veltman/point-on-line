# Point-on-line

Test whether a point is on a line or LineString.

# Installation

Install via npm:

```
npm install point-on-line
```

# Usage

```js
var pointOnLine = require("point-on-line");

pointOnLine([[0,0],[1,1]],[0.5,0.5]); // true
pointOnLine([[0,0],[1,4],[6,3]],[9,3]); // false
pointOnLine("sharks","pizza"); // Error
```

### pointOnLine(line,point)

Returns `true` if `point` is on any of the line segments in `line`, including the endpoints.

Returns `false` otherwise.

`line` needs to be one of the following:

* An array of x/y (or lng/lat) coordinate pairs (e.g. `[[0,1],[2,2],[3,3]]` is a jagged line with three points)
* A GeoJSON feature that has a geometry of type `LineString`
* A GeoJSON geometry of type `LineString`

`point` needs to be one of the following:

* An x/y (or lng/lat) coordinate pair (e.g. ``[51,75]``)
* A GeoJSON feature that has a geometry of type `Point`
* A GeoJSON geometry of type `Point`

## Precision issues

The limitations of JavaScript float precision may cause some problems.  Any integers and well under 2^53 should be fine.
