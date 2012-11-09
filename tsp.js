var Point, distance, nearestNeighbor, permute, shortestPath, tspExhaustive;
var __indexOf = Array.prototype.indexOf || function(item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] === item) return i;
  }
  return -1;
};
Point = (function() {
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }
  Point.prototype.toString = function() {
    return "" + this.x + " " + this.y;
  };
  Point.prototype.equals = function(p) {
    return p.x === this.x && p.y === this.y;
  };
  return Point;
})();
distance = function(path) {
  var d, i, _ref;
  d = 0;
  for (i = 0, _ref = path.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
    d += Math.sqrt(Math.pow(path[i].x - path[(i + 1) % path.length].x, 2) + Math.pow(path[i].y - path[(i + 1) % path.length].y, 2));
  }
  return d;
};
Array.prototype.without = function(item) {
  var res;
  res = this.slice(0);
  if (__indexOf.call(this, item) < 0) {
    return res;
  }
  res.splice(this.indexOf(item), 1);
  return res;
};
permute = function(arr) {
  var perm, perms, value, _ref;
  if (arr.length < 1) {
    return [arr];
  }
  perms = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      value = arr[_i];
      _results.push((function() {
        var _j, _len2, _ref, _results2;
        _ref = permute(arr.without(value));
        _results2 = [];
        for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
          perm = _ref[_j];
          _results2.push([value].concat(perm));
        }
        return _results2;
      })());
    }
    return _results;
  })();
  return (_ref = []).concat.apply(_ref, perms);
};
shortestPath = function(paths) {
  var length, min, path, _i, _len, _ref, _ref2;
  _ref = [paths[0], distance(paths[0])], min = _ref[0], length = _ref[1];
  for (_i = 0, _len = paths.length; _i < _len; _i++) {
    path = paths[_i];
    if (distance(path) < length) {
      _ref2 = [path, distance(path)], min = _ref2[0], length = _ref2[1];
    }
  }
  return min;
};
tspExhaustive = function(points) {
  return shortestPath(permute(points));
};
nearestNeighbor = function(points) {
  var next, point;
  if (points.length <= 2) {
    return points;
  }
  next = shortestPath((function() {
    var _i, _len, _ref, _results;
    _ref = points.slice(1);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      point = _ref[_i];
      _results.push([points[0], point]);
    }
    return _results;
  })())[1];
  return [points[0]].concat(nearestNeighbor([next].concat(points.slice(1).without(next))));
};