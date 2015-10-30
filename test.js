var assert = require("assert"),
    pointOnLine = require("./index.js");

var linePlain = [
  [0,0],
  [1,1],
  [2,1]
];

var pointPlain = [0.5,0.5];

// Test basic
assert.equal(pointOnLine(linePlain,pointPlain),true);
assert.equal(pointOnLine(linePlain,[1.5,1]),true);

// Test coincident points
assert.equal(pointOnLine(linePlain,[0,0]),true);
assert.equal(pointOnLine(linePlain,[1,1]),true);
assert.equal(pointOnLine(linePlain,[2,1]),true);

// Test outside line
assert.equal(pointOnLine(linePlain,[0,1]),false);
assert.equal(pointOnLine(linePlain,[2,2]),false);
assert.equal(pointOnLine(linePlain,[-1,-1]),false);

// Test irrelevant extra coordinates
assert.equal(pointOnLine([[0,0,"who cares?"],[1,1,"not this"]],[0.5,0.5,0.5]),true);

// Test bad inputs
assert.throws(function(){ pointOnLine("abc",[1,1]); });
assert.throws(function(){ pointOnLine("abc",[1,1]); });
assert.throws(function(){ pointOnLine([1,1],[1,1]); });
assert.throws(function(){ pointOnLine([[0,1],[1,1]],[]); });
assert.throws(function(){ pointOnLine([[0,1],[1,1]],[1]); });
assert.throws(function(){ pointOnLine([[0,1],[1,1]],[1]); });
assert.throws(function(){ pointOnLine([[0,1],[1,1]],["a","b"]); });
assert.throws(function(){ pointOnLine([[0,1],[1,1]],["a","b"]); });
assert.throws(function(){ pointOnLine([[0,1],[1,1]],[0.5,Infinity]); });
assert.throws(function(){ pointOnLine([[-Infinity,-Infinity],[Infinity,Infinity]],[0,0]); });

var lineGeometry = {
  type: "LineString",
  properties: {},
  coordinates: linePlain
};

var lineFeature = {
  type: "Feature",
  properties: {},
  geometry: lineGeometry
};

var pointGeometry = {
  type: "Point",
  properties: {},
  coordinates: pointPlain
};

var pointFeature = {
  type: "Feature",
  properties: {},
  geometry: pointGeometry
};

[pointPlain,pointGeometry,pointFeature].forEach(function(point){
  [linePlain,lineGeometry,lineFeature].forEach(function(line){
    //console.log(line,point);
    assert.equal(pointOnLine(line,point),true);
  });
});
