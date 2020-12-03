const fs = require('fs');

const INPUT = fs.readFileSync('./input.txt', 'utf-8').trim().split(/\n/);

function validateList(list, validator) {
	const invalid = [];

	for (let index = 0; index < list.length; ++index) {
		const value = list[index];
		// console.log("value:", value);

		if (!validator(...value.split(': '))) {
			invalid.push(value);
		}
	}

	return invalid;
}

function part1(list) {
	function valid(policy, password) {
		const [ min, rest ] = policy.split('-');
		const [ max, char ] = rest.split(' ');

		const count = password.split('').filter(c => c === char).length;

		// console.log({ policy, password, min, max, char, count });
		return min <= count && count <= max;
	}

	const invalid = validateList(list, valid);

	// console.log('Invalid Passwords:', invalid);
	console.log('Num Invalid Passwords:', invalid.length);
	console.log('Num Valid Passwords:', list.length - invalid.length);
}

// part1(INPUT);

function part2(list) {
	function valid(policy, password) {
		const [ first, rest ] = policy.split('-');
		const [ last, char ] = rest.split(' ');

		return password.charAt(first - 1) === char ^ password.charAt(last - 1) === char;
	}

	const invalid = validateList(list, valid);

	// console.log('Invalid Passwords:', invalid);
	console.log('Num Invalid Passwords:', invalid.length);
	console.log('Num Valid Passwords:', list.length - invalid.length);
}

part2(INPUT);
