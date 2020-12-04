const fs = require('fs');

const INPUT = fs.readFileSync('./input.txt', 'utf-8').trim().split(/\n\n/).map(passport => passport.replace(/\n/g, ' '));

/**
	byr (Birth Year)
	iyr (Issue Year)
	eyr (Expiration Year)
	hgt (Height)
	hcl (Hair Color)
	ecl (Eye Color)
	pid (Passport ID)
	cid (Country ID)
*/

const REQUIRED = [ 'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid' ];
const TEST = /( |^)(byr|iyr|eyr|hgt|hcl|ecl|pid|cid)/;

function intersection(arr1, arr2) {
	var acc = [], index = 0;
	for (; index < arr1.length; ++index) {
		if (arr2.includes(arr1[index])) {
			acc.push(arr1[index]);
		}
	}
	return acc;
}

function validateRequiredFieldsExist(passport) {
	return intersection(REQUIRED, passport.split(TEST)).length === REQUIRED.length;
}

function validateFields(passport) {
	return passport.split(' ').every(entry => {
		const [ field, value ] = entry.split(':');

		switch (field) {
			case 'byr':
				return value.length === 4 && 1920 <= +value && +value <= 2002;
			case 'iyr':
				return value.length === 4 && 2010 <= +value && +value <= 2020;
			case 'eyr':
				return value.length === 4 && 2020 <= +value && +value <= 2030;
			case 'hgt':
				const [ , num, unit ] = value.match(/(\d+)(cm|in)$/) || [];
				return unit === 'cm'
					? 150 <= +num && +num <= 193
					: unit === 'in'
						? 59 <= +num && +num <= 76
						: false;
			case 'hcl':
				return /^#[0-9a-f]{6}$/i.test(value);
			case 'ecl':
				return [ 'amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
			case 'pid':
				return /^[0-9]{9}$/.test(value);
			default:
				return true;
		}
	})
}

function part1(list) {
	let valid = 0;
	for (let index = 0; index < list.length; ++index) {
		if (validateRequiredFieldsExist(list[index])) {
			++valid;
		}
	}

	console.log(`There are ${valid} valid passports`);
}

function part2(list) {
	let valid = 0;
	for (let index = 0; index < list.length; ++index) {
		const passport = list[index];
		if (validateRequiredFieldsExist(passport) && validateFields(passport)) {
			++valid;
		}
	}

	console.log(`There are ${valid} valid passports`);
}

// part1(INPUT);
part2(INPUT);
