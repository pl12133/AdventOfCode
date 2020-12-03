const fs = require('fs');

const INPUT = fs.readFileSync('./input.txt', 'utf-8').trim().split(/\n/);

// Get an index of an array that will "wrap" with the array.
function circularIndex(length, index) {
	return (index + length) % length;
}

// Get the character at a point on the map
function resolvePt(map, point) {
	const line = map[point[1]];

	return line[circularIndex(line.length, point[0])];
}

function translatePt(fromPt, deltaPt) {
	return [
		fromPt[0] + deltaPt[0],
		fromPt[1] + deltaPt[1]
	];
}

function traverse(map, startPt, deltaPt, { beforeMoveFn, afterMoveFn }) {
	let MOVES_REMAINING = 1000000; // infinite loop protection, so you dont wander the map forever...

	const boundY = map.length - 1;
	let position = startPt;

	console.log(`Beginning traversal of map with height ${boundY} from ${startPt} with movement ${deltaPt}`);

	while (position[1] < boundY && MOVES_REMAINING--) {
		// console.log('Before Position:', position);
		if (typeof beforeMoveFn === 'function') {
			beforeMoveFn(map, position);
		} 
		position = translatePt(position, deltaPt);

		if (typeof afterMoveFn === 'function') {
			afterMoveFn(map, position);
		}
	}
}

function part1(map) {
	let trees = 0;
	function checkForTree(map, position) {
		// console.log(`At [ ${position} ] is character ${resolvePt(map, position)}`);
		if (resolvePt(map, position) === '#') {
			++trees;
		}
	}

	traverse(
		map,
		[ 0, 0 ],
		[ 3, 1 ],
		{
			afterMoveFn: checkForTree
		}
	);

	console.log(`Found ${trees} trees`);
}

function part2(map) {
	let trees = [];
	function checkForTreeFactory(index) {
		return function checkForTree(map, position) {
			// console.log(`At [ ${position} ] is character ${resolvePt(map, position)}`);
			if (resolvePt(map, position) === '#') {
				trees[index] = (trees[index] || 0) + 1;
			}
		}
	}

	const movementPatterns = [
		[ 1, 1 ],
		[ 3, 1 ],
		[ 5, 1 ],
		[ 7, 1 ],
		[ 1, 2 ]
	];

	movementPatterns.forEach((pattern, index) => {	
		traverse(
			map,
			[ 0, 0 ],
			pattern,
			{
				afterMoveFn: checkForTreeFactory(index)
			}
		);
	});

	let accumulator = 1;
	trees.forEach((trees, index) => {
		console.log(`[Pattern ${index + 1}] Found ${trees} trees`);
		accumulator *= trees;
	});

	console.log('Product of all found trees:', accumulator);
}

const DEBUG = false;
if (DEBUG) {
	global._AOCDAY3DEBUG = {
		map: INPUT,
		traverse,
		circularIndex,
		resolvePt,
		translatePt
	}
}

// Allow time for debugger to attach
setTimeout(() => {
	// part1(INPUT);
	part2(INPUT);
}, DEBUG ? 5000 : 0);

