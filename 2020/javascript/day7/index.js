const fs = require('fs');

const INPUT = fs.readFileSync('./input.txt', 'utf-8').trim().split(/\n/);

const CONTENTS = {};
const REVERSE_CONTENTS = {};

// build a map of the input associating something with what it can store
// also build a reverse map associating something with what it can be stored in

function parseRule(line) {
	const [ bag, contents ] = line.split(' bags contain ');
	
	const contentsArr = contents.split(',').map(content => content.trim().replace(/ bags?/, '').replace(/\./g, ''));

	CONTENTS[bag] = contentsArr;

	contentsArr.forEach(content => {
		const key = content.replace(/^\d /, '').replace(/ bag/, '');
		if (!REVERSE_CONTENTS[key]) {
			REVERSE_CONTENTS[key] = [];
		}
		REVERSE_CONTENTS[key].push(bag);
	});
}

INPUT.forEach(parseRule);

function lookupBag(bag) {
	console.log({ stores: CONTENTS[bag], canBeStoredIn: REVERSE_CONTENTS[bag] });
}

function uniq(arr) {
	return Array.from(new Set(arr));
}

function canBeStoredInDeep(bag) {
	const canBeStoredIn = REVERSE_CONTENTS[bag];
	return canBeStoredIn && uniq([ ...canBeStoredIn, ...canBeStoredIn.reduce((acc, bag) => [ ...acc, ...(canBeStoredInDeep(bag) || []) ], []) ]);
}

function countContainedBagsDeep(bag) {
	const containedBags = CONTENTS[bag];
	console.log("containedBags:", containedBags);

	let total = 0;
	if (containedBags) {
		containedBags.forEach(containedBag => {
			const [ count, ...innerBag ] = containedBag.split(' ') 
			total = +total + +count|0 + count * countContainedBagsDeep(innerBag.join(' '));
		});
	}

	return total;
}

function part1() {
	const bag = 'shiny gold';

	const canBeStoredIn = canBeStoredInDeep(bag);
	console.log(`A "${bag}" bag can be stored in ${canBeStoredIn.length} different bags: ${canBeStoredIn}`);
}

function part2() {
	const bag = 'shiny gold';
	console.log(`Total? ${countContainedBagsDeep(bag)}`);
}

global._lookupBag = lookupBag;

// part1();
part2();

