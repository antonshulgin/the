// jshint node: true
// jshint esnext: true
'use strict';

const assert = require('assert');
const the = require('../dist/the.min.js');

describe('isFrozen', function () {

	const Thing = function () {};

	const validValues = [
		Object.freeze({ value: 42 }),
		Object.freeze({})
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
		Object.create({ some: 'thing' }),
		Thing.prototype,
		[],
		[].join(''),
		console,
		false,
		function () { return 42; },
		new Object(),
		new Thing(),
		{},
		new Array(),
		new Array([null, 42, undefined]),
		new Boolean(),
		new Boolean(false),
		new Boolean(true),
		new Date(),
		new Function(),
		new Number(),
		new Number(42),
		new RegExp('^[\w\d\s]+$', 'gi'),
		new RegExp(),
		new String('42'),
		new String(),
		new String(42),
		true,
		undefined
	];

	validValues.forEach(function (value) {
		describe(''+value, function () {
			it('should return true', function () {
				assert.equal(true, the(value).isFrozen(true));
			});
		});
	});

	invalidValues.forEach(function (value) {
		describe(''+value, function () {
			it('should return false', function () {
				assert.equal(false, the(value).isFrozen(true));
			});
		});
	});

});
