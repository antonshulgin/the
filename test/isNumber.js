// jshint node: true
// jshint esnext: true
'use strict';

const assert = require('assert');
const the = require('../dist/the.min.js');

describe('isNumber', function () {

	const Thing = function () {};

	const validValues = [
		-8,
		0,
		0xFF,
		1e0,
		4.20,
		42
	];

	const invalidValues = [
		'42',
		(function () { return arguments; })(),
		-Infinity,
		/.+/i,
		Infinity,
		NaN,
		Thing.prototype,
		[],
		false,
		new Number(),
		new Number(42),
		new Thing(),
		null,
		true,
		undefined,
		{}
	];

	validValues.forEach(function (value) {
		describe(''+value, function () {
			it('should return true', function () {
				assert.equal(true, the(value).isNumber(true));
			});
		});
	});

	invalidValues.forEach(function (value) {
		describe(''+value, function () {
			it('should return false', function () {
				assert.equal(false, the(value).isNumber(true));
			});
		});
	});

});
