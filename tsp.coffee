# Traveling Salesman Problem algorithms
# Author: Steven Ruppert
# For CSCI 406 Algorithms Fall 2011

class Point
	constructor: (@x,@y) ->
	toString: ->
		"#{@x} #{@y}"
	equals: (p) ->
		p.x is @x and p.y is @y

# length of a path of points in the order of the array, returning to the start of the path from the end
distance = (path) ->
	d = 0
	for i in [0...path.length]
		d += Math.sqrt( Math.pow(path[i].x-path[(i+1)%path.length].x,2) + Math.pow(path[i].y-path[(i+1)%path.length].y,2) )
	return d
	
# returns one level deep copy (from slice) of the array without 'item'
# keeps order of original array
Array::without = (item) ->
	res = this.slice 0 # copy original array
	return res unless item in this # don't delete anything that isn't there
	res.splice this.indexOf(item), 1 # remove item from res
	res # return res

# returns array of permutations of arr
permute = (arr) ->
	return [arr] if arr.length < 1
	perms = (for value in arr # for each value of the array
		( [value].concat perm ) for perm in permute( arr.without(value) ) ) # concatenate the value with the permutations of the rest of the array
	[].concat perms... # removes second dimensional array structure from last command, to generate a 'flat' array
	
# returns the shortest path from array of paths 'paths'
shortestPath = (paths) ->
	[min, length] = [paths[0], distance paths[0]] # start with first path
	[min, length] = [path, distance path] for path in paths when ( distance(path) < length )
	return min

# exhaustive o(n!) path search
tspExhaustive = (points) ->
	shortestPath permute(points) # the shortest path of all the possible paths

# nearest neighbor o(n^2) search
nearestNeighbor = (points) ->
	return points if points.length <= 2
	next = shortestPath( [points[0], point] for point in points.slice(1) )[1] # closest point 
	return [points[0]].concat nearestNeighbor( [next].concat(points.slice(1).without(next)) ) # first point to nearest neighbor tour from the next point to the unvisited points
	