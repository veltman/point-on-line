// Check if point is on line
module.exports = function(line,point) {

  // Convert to array of coords if it's GeoJSON
  line = coerceToLineString(line);

  // Convert to x/y pair if it's GeoJSON
  point = coerceToPoint(point);

  var l = line.length;

  for (var i = 1, l = line.length; i < l; i++) {
    if (pointOnLine(line[i-1],line[i],point)) {
      return true;
    }
  }

  return false;

};

function coerceToPoint(point) {

  if (isPoint(point)) {
    return point;
  }

  if (point.type) {

    if (point.type === "Feature" && point.geometry && point.geometry.type && point.geometry.type === "Point" && isPoint(point.geometry.coordinates)) {
      return point.geometry.coordinates;
    } else if (point.type === "Point" && isPoint(point.coordinates)) {
      return point.coordinates;
    }

  }

  throw new TypeError("Invalid point. Expected one of: [x,y]/[lng,lat] coordinates, a GeoJSON Point geometry, a GeoJSON feature with a Point geometry.");

}

function coerceToLineString(line) {

  if (isLineString(line)) {
    return line;
  }

  if (line.type) {

    if (line.type === "Feature" && line.geometry && line.geometry.type && line.geometry.type === "LineString" && isLineString(line.geometry.coordinates)) {
      return line.geometry.coordinates;
    } else if (line.type === "LineString" && isLineString(line.coordinates)) {
      return line.coordinates;
    }

  }

  throw new TypeError("Invalid line. Expected one of: an array of [x,y]/[lng,lat] coordinates, a GeoJSON LineString geometry, a GeoJSON feature with a LineString geometry.");

}

// Is it an array of points?
function isLineString(obj) {
  return Array.isArray(obj) && obj.every(isPoint) && obj.length >= 2;
}

// Is it an array with numbers at the first two positions?
function isPoint(obj) {
  return Array.isArray(obj) && obj.length >= 2 && Number.isFinite(obj[0]) && Number.isFinite(obj[1]);
}

function pointOnLine(a,b,c) {

  //console.log(a,b,c);

  if (!colinear(a,b,c)) {
    return false;
  }

  // Check x is between
  // Check coincident case
  if (a[0] !== b[0] && !between(a[0],c[0],b[0])) {
    return false;
  }

  // Check y is between
  return between(a[1],c[1],b[1]);

}

// Is a coordinate b between a & c?
function between(a,b,c) {
  return (a <= b && b <= c) || (c <= b && b <= a);
}

// Are points a, b, and c on the same line?
function colinear(a,b,c) {
  return (b[0] - a[0]) * (c[1] - a[1]) === (c[0] - a[0]) * (b[1] - a[1]);
}
