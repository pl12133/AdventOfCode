const fs = require('fs');

const INPUT = fs.readFileSync('./input.txt', 'utf-8').trim().split(/\n\n/);

function uniqChars(str) {
	return Array.from(new Set(str.replace(/[^a-z]/g, '').split(''))).join('')
}

function intersection(arr1, arr2) {
	var acc = [], index = 0;
	for (; index < arr1.length; ++index) {
		if (arr2.includes(arr1[index])) {
			acc.push(arr1[index]);
		}
	}
	return acc;
}

function part1(list) {
	console.log(
		list
			.reduce((total, answers) => total + uniqChars(answers).length, 0)
	);
}

function part2(list) {
	console.log(
		list
			.reduce((total, group) => total + group.split(/\n/).reduce((acc, line) => intersection(acc, line.split(''))).length, 0)
	)
}

part1(INPUT);
part2(INPUT);

