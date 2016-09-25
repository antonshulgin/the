(function (global, undefined) {
	'use strict';

	var TAG = '[the.js]';

	var TYPE_NUMBER = '[object Number]';
	var TYPE_STRING = '[object String]';
	var TYPE_BOOLEAN = '[object Boolean]';
	var TYPE_FUNCTION = '[object Function]';
	var TYPE_OBJECT = '[object Object]';
	var TYPE_ARRAY = '[object Array]';
	var TYPE_DATE = '[object Date]';
	var TYPE_REGEXP = '[object RegExp]';

	var PATTERN_ALPHANUMERIC_STRING = /^[\w\s]+$/;
	var PATTERN_HEX_STRING = /^[0-9a-f]+$/i;

	var internals = {};
	var externals = {};

	function the(value, isSilentCheck) {
		internals.value = value;
		internals.isSilentCheck = isSilentCheck;
		return externals;
	}

	function resetInternals() {
		internals.value = undefined;
		internals.isSilentCheck = false;
	}

	function isMatchingToStringCall(expectedType) {
		return Object.prototype.toString.call(internals.value) === expectedType;
	}

	function isEverythingTrue(statements) {
		for (var idx = 0, len = statements.length; idx < len; idx += 1) {
			if (!statements[idx]) { return false; }
		}
		return true;
	}

	function output(isMatchingToStringCallType, expectedTypeDesription) {
		if (!isMatchingToStringCallType && !internals.isSilentCheck) {
			console.warn(
				'%s Expected %s, got %s',
			 	TAG,
			 	expectedTypeDesription,
			 	Object.prototype.toString.call(internals.value)
			);
			console.trace(internals.value);
		}
		resetInternals();
		return isMatchingToStringCallType;
	}

	externals.isDefined = function () {
		var isDefined = (internals.value !== undefined);
		return output(isDefined, 'defined value');
	};

	externals.isUndefined = function () {
		var isUndefined = (internals.value === undefined);
		return output(isUndefined, 'undefined');
	};

	externals.isNull = function () {
		var isNull = (internals.value === null);
		return output(isNull, 'null');
	};

	externals.isNumber = function () {
		var isNumber = isMatchingToStringCall(TYPE_NUMBER);
		var isFiniteNumber = isFinite(internals.value);
		var isTotallyNumber = isNumber && isFiniteNumber;
		return output(isTotallyNumber, 'a number');
	};

	externals.isInteger = function () {
		var isNumber = isMatchingToStringCall(TYPE_NUMBER);
		var isInteger = isNumber && (parseInt(internals.value) === internals.value);
		return output(isInteger, 'an integer');
	};

	externals.isFloat = function () {
		var isNumber = isMatchingToStringCall(TYPE_NUMBER);
		var isFloat = isNumber && (parseFloat(internals.value) === internals.value);
		return output(isFloat, 'a float number');
	};

	externals.isString = function () {
		var isString = isMatchingToStringCall(TYPE_STRING);
		return output(isString, 'a string');
	};

	externals.isEmptyString = function () {
		var isString = isMatchingToStringCall(TYPE_STRING);
		var isEmptyString = isString && (internals.value.trim().length === 0);
		return output(isEmptyString, 'an empty string');
	};

	externals.isNonEmptyString = function () {
		var isString = isMatchingToStringCall(TYPE_STRING);
		var isNonEmptyString = isString && (internals.value.trim().length > 0);
		return output(isNonEmptyString, 'a non-empty string');
	};

	externals.isHexString = function () {
		var isString = isMatchingToStringCall(TYPE_STRING);
		var isHexString = isString && PATTERN_HEX_STRING.test(internals.value);
		return output(isHexString, 'a hex string');
	};

	externals.isAlphanumericString = function () {
		var isString = isMatchingToStringCall(TYPE_STRING);
		var isAlphanumericString = isString && PATTERN_ALPHANUMERIC_STRING.test(internals.value);
		return output(isAlphanumericString, 'an alphanumeric string');
	};

	externals.isBoolean = function () {
		var isBoolean = isMatchingToStringCall(TYPE_BOOLEAN);
		return output(isBoolean, 'a boolean');
	};

	externals.isFunction = function () {
		var isFunction = isMatchingToStringCall(TYPE_FUNCTION);
		return output(isFunction, 'a function');
	};

	externals.isObject = function () {
		var isObject = isMatchingToStringCall(TYPE_OBJECT);
		return output(isObject, 'an object');
	};

	externals.isArray = function () {
		var isArray = isMatchingToStringCall(TYPE_ARRAY);
		return output(isArray, 'an array');
	};

	externals.isEmptyArray = function () {
		var isArray = isMatchingToStringCall(TYPE_ARRAY);
		var isEmptyArray = isArray && (internals.value.length === 0);
		return output(isEmptyArray, 'an empty array');
	};

	externals.isNonEmptyArray = function () {
		var isArray = isMatchingToStringCall(TYPE_ARRAY);
		var isNonEmptyArray = isArray && (internals.value.length > 0);
		return output(isNonEmptyArray, 'a non-empty array');
	};

	externals.isDate = function () {
		var isDate = isMatchingToStringCall(TYPE_DATE);
		return output(isDate, 'a date object');
	};

	externals.isRegExp = function () {
		var isRegExp = isMatchingToStringCall(TYPE_REGEXP);
		return output(isRegExp, 'a regular expression');
	};

	externals.isInstanceOf = function (Constructor) {
		var isInstanceOf = internals.value instanceof Constructor;
		return output(isInstanceOf, 'an instance of ' + Constructor.name);
	};

	try {
		// jshint node: true
	 	module.exports = the;
 	}
	catch(e) {
		// jshint node: false
	 	global.the = the;
 	}

})(this);
