// jshint node: true
// jshint esnext: true
'use strict';

const assert = require('assert');
const the = require('../dist/the.min.js');

describe('isObject', function () {

	const Thing = function () {};

	const validValues = [
		Object.create({ some: 'thing' }),
		Thing.prototype,
		console,
		new Object(),
		new Thing(),
		{}
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
		[],
		[].join(''),
		false,
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
				assert.equal(true, the(value).isObject(true));
			});
		});
	});

	invalidValues.forEach(function (value) {
		describe(''+value, function () {
			it('should return false', function () {
				assert.equal(false, the(value).isObject(true));
			});
		});
	});

});
