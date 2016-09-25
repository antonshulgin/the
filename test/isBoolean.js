// jshint node: true
// jshint esnext: true
'use strict';

const assert = require('assert');
const the = require('../dist/the.min.js');

describe('isBoolean', function () {

	const Thing = function () {};

	const validValues = [
		true,
		false,
	];

	const invalidValues = [
		'',
		'42',
		(function () { return arguments; })(),
		-8,
		-Infinity,
		/.+/i,
		0,
		0xFF,
		1e0,
		4.20,
		42,
		Infinity,
		NaN,
		Thing.prototype,
		[],
		[].join(''),
		function () { return 42; },
		new Array(),
		new Array([null, 42, undefined]),
		new Boolean(),
		new Boolean(false),
		new Boolean(true),
		new Date(),
		new Function(),
		new Number(),
		new Number(42),
		new Object(),
		new RegExp('^[\w\d\s]+$', 'gi'),
		new RegExp(),
		new String('42'),
		new String(),
		new String(42),
		new Thing(),
		undefined,
		{}
	];

	validValues.forEach(function (value) {
		describe(''+value, function () {
			it('should return true', function () {
				assert.equal(true, the(value).isBoolean(true));
			});
		});
	});

	invalidValues.forEach(function (value) {
		describe(''+value, function () {
			it('should return false', function () {
				assert.equal(false, the(value).isBoolean(true));
			});
		});
	});

});
