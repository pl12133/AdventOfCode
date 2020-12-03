const fs = require('fs');

const list = fs.readFileSync('./input.txt', 'utf-8').split(/\n/);

// N + (logN?)
function part1() {
	const hits = []
	let index = 0, innerIndex = 0;

	for(;index < list.length; ++index) {
		const current = list[index];

		for (innerIndex = index + 1; innerIndex < list.length; ++innerIndex) {
			const innerCurrent = list[innerIndex]
			const result = +current + +innerCurrent;

			if (result === 2020) {
				hits.push([ current, innerCurrent ]);
			}
		}
	}

	console.log('Results:', hits.map(([ x, y ]) => `${x} * ${y} = ${x * y}`));
}

function part2() {
	let N = 0;
	const hits = []
	let index = 0, innerIndex = 0, innerIndex2 = 0;

	for(;index < list.length; ++index) {
		const current = list[index];

		for (innerIndex = index + 1; innerIndex < list.length; ++innerIndex) {
			const innerCurrent = list[innerIndex]
			const accumulator = +current + +innerCurrent;

			for (innerIndex2 = innerIndex + 1; innerIndex2 < list.length; ++innerIndex2) {
				const innerCurrent2 = list[innerIndex2]
				const result = accumulator + +innerCurrent2;

				if (result === 2020) {
					hits.push([ current, innerCurrent, innerCurrent2 ]);
				}

				++N;
			}
		}
	}

	console.log('Results:', hits.map(([ x, y, z ]) => `${x} * ${y} * ${z} = ${x * y * z}`));
	console.log('Loop iterations:', N);
}

part2();
