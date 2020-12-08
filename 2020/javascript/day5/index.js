const fs = require('fs');

const INPUT = fs.readFileSync('./input.txt', 'utf-8').trim().split(/\n/);

function getRow(seatSpec) {
	return 127 & +`0b${seatSpec.replace(/[^FB]/g, '').replace(/[FB]/g, (lowHigh) => lowHigh === 'F' ? 0 : 1)}`;
}

function getCol(seatSpec) {
	return 7 & +`0b${seatSpec.replace(/[^LR]/g, '').replace(/[LR]/g, (lowHigh) => lowHigh === 'L' ? 0 : 1)}`;
}

function getSeatID(seatSpec) {
	const row = getRow(seatSpec);
	const col = getCol(seatSpec);
	return row * 8 + col;
}

global._getRow = getRow;
global._getCol = getCol;
global._getSeatID = getSeatID;

function assert(predicate, message) {
	if (!predicate) {
		throw Error(message);
	}
}

assert(getSeatID('BFFFBBFRRR') === 567, `BFFFBBFRRR should equal 567`);
assert(getSeatID('FFFBBBFRRR') === 119, `FFFBBBFRRR should equal 119`);
assert(getSeatID('BBFFBBFRLL') === 820, `BBFFBBFRLL should equal 820`);

function part1(list) {
	console.log('The maximum seatID:', list.reduce((acc, seatSpec) => Math.max(acc, getSeatID(seatSpec)), 0));
}

function part2(list) {
	const allIds = list.map(getSeatID).sort((a, b) => a - b);
	console.log(`${allIds.length} IDs. Unique?`, allIds.find((id, index) => id + 1 !== +allIds[index + 1]) + 1);
}

part2(INPUT);


