(function (global, undefined) {
	'use strict';

	var TAG = '[the.js]';

	var internals = {};
	var externals = {};

	function the(value) {
		internals.reset();
		internals.setValue(value);
		return externals;
	}

	externals.isInstanceOf = function (constructor, isSilent) {
		var value = internals.getValue();
		var isInstanceOf = (value instanceof constructor);
		return internals.out(isInstanceOf, 'an instance of ' + constructor.name, isSilent);
	};

	externals.isRegExp = function (isSilent) {
		var value = internals.getValue();
		var isRegExp = (Object.prototype.toString.call(value) === '[object RegExp]');
		return internals.out(isRegExp, 'a regular expression', isSilent);
	};

	externals.isDate = function (isSilent) {
		var value = internals.getValue();
		var isDate = (Object.prototype.toString.call(value) === '[object Date]');
		return internals.out(isDate, 'a date', isSilent);
	};

	externals.isArray = function (isSilent) {
		var value = internals.getValue();
		var isArray = (Object.prototype.toString.call(value) === '[object Array]');
		return internals.out(isArray, 'an array', isSilent);
	};

	externals.isObject = function (isSilent) {
		var value = internals.getValue();
		var isObject = (Object.prototype.toString.call(value) === '[object Object]');
		return internals.out(isObject, 'an object', isSilent);
	};

	externals.isFunction = function (isSilent) {
		var value = internals.getValue();
		var isFunction = (Object.prototype.toString.call(value) === '[object Function]');
		return internals.out(isFunction, 'a function', isSilent);
	};

	externals.isBoolean = function (isSilent) {
		var value = internals.getValue();
		var isBoolean = (Object.prototype.toString.call(value) === '[object Boolean]');
		var isPlainBoolean = (typeof value === 'boolean');
		var isBooleanForReal = isBoolean && isPlainBoolean;
		return internals.out(isBooleanForReal, 'a boolean', isSilent);
	};

	externals.isString = function (isSilent) {
		var value = internals.getValue();
		var isString = (Object.prototype.toString.call(value) === '[object String]');
		var isPlainString = (typeof value === 'string');
		var isStringForReal = isString && isPlainString;
		return internals.out(isStringForReal, 'a string', isSilent);
	};

	externals.isNull = function (isSilent) {
		var value = internals.getValue();
		var isNull = (value === null);
		return internals.out(isNull, 'null', isSilent);
	};

	externals.isDefined = function (isSilent) {
		var value = internals.getValue();
		var isDefined = (value !== undefined);
		return internals.out(isDefined, 'a defined value', isSilent);
	};

	externals.isNumber = function (isSilent) {
		var value = internals.getValue();
		var isNumber = (Object.prototype.toString.call(value) === '[object Number]');
		var isPlainNumber = (typeof value === 'number');
		var isFiniteNumber = isFinite(value);
		var isNumberForReal = isNumber && isPlainNumber && isFiniteNumber;
		return internals.out(isNumberForReal, "a number", isSilent);
	};

	internals.setValue = function (value) {
		internals.value = value;
	};

	internals.getValue = function () {
		return internals.value;
	};

	internals.reset = function () {
		internals.setValue(undefined);
	};

	internals.out = function (isCorrectType, typeDescription, isSilent) {
		var value = internals.getValue();
		if (!isCorrectType && !isSilent) {
			console.warn(
				'%s Expected %s, got %s (%s)',
			 	TAG,
			 	typeDescription,
			 	Object.prototype.toString.call(value),
				value
			);
			console.trace(value);
		}
		return isCorrectType;
	};

	// jshint node: true
	try {
		module.exports = the;
	}
	catch (e) {
		global.the = the;
	}

})(this);
