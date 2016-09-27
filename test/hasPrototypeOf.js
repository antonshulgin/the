// jshint node: true
// jshint esnext: true
'use strict';

const assert = require('assert');
const the = require('../dist/the.min.js');

describe('hasPrototypeOf', function () {

	const Thing = function () {};
	const NotThing = function () {};

	const validValues = [
		new Thing()
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
		Object.create({ something: 'something' }),
		Thing.prototype,
		[],
		[].join(''),
		false,
		function () { return 42; },
		new Array(),
		new Array([null, 42, undefined]),
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
		true,
		undefined,
		{}
	];

	const validConstructors = [
		Thing
	];

	const invalidConstructors = [
		Array,
		Date,
		Function,
		NotThing,
		Number,
		Object,
		RegExp,
		String
	];

	validValues.forEach(function (value) {
		describe(''+value, function () {
			it('should return true', function () {
				assert.equal(true, the(value).hasPrototypeOf(Thing, true));
			});
		});
	});

	validConstructors.forEach(function (constructor) {
		const thing = new Thing();
		describe(''+constructor, function () {
			it('should return true', function () {
				assert.equal(true, the(thing).hasPrototypeOf(constructor, true));
			});
		});
	});

	invalidValues.forEach(function (value) {
		describe(''+value, function () {
			it('should return false', function () {
				assert.equal(false, the(value).hasPrototypeOf(Thing, true));
			});
		});
	});

	invalidConstructors.forEach(function (constructor) {
		const thing = new Thing();
		describe(''+constructor, function () {
			it('should return false', function () {
				assert.equal(false, the(thing).hasPrototypeOf(constructor, true));
			});
		});
	});

});

