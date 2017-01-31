(function (global, undefined) {
	'use strict';

	var TAG = '[the.js]';

	function the(value) {
		var internals = {};
		var externals = {};

		setValue(value);

		externals.isNumber = isNumber;
		externals.isDefined = isDefined;
		externals.isNull = isNull;
		externals.isHexString = isHexString;
		externals.isString = isString;
		externals.isEmptyString = isEmptyString;
		externals.isBoolean = isBoolean;
		externals.isFunction = isFunction;
		externals.isObject = isObject;
		externals.isArray = isArray;
		externals.isDate = isDate;
		externals.isRegExp = isRegExp;
		externals.isInstanceOf = isInstanceOf;
		externals.hasPrototypeOf = hasPrototypeOf;
		externals.isFrozen = isFrozen;

		return externals;

		function isFrozen(isSilent) {
			var value = getValue();
			var isObject = the(value).isObject(true);
			var isFrozen = isObject && Object.isFrozen(value);
			return out(isFrozen, 'a frozen object', isSilent);
		}

		function hasPrototypeOf(constructor, isSilent) {
			var value = getValue();
			var theValue = the(value);
			var isDefined = theValue.isDefined(true);
			var isNotNull = !theValue.isNull(true);
			var hasPrototypeOf = isDefined && isNotNull && Object.getPrototypeOf(value).constructor.name === constructor.name;
			return out(hasPrototypeOf, 'value to have the prototype of ' + constructor.name, isSilent);
		}

		function isInstanceOf(constructor, isSilent) {
			var value = getValue();
			var hasPrototypeOf = the(value).hasPrototypeOf(constructor, true);
			var isInstanceOf = hasPrototypeOf && (value instanceof constructor);
			return out(isInstanceOf, 'an instance of ' + constructor.name, isSilent);
		}

		function isRegExp(isSilent) {
			var value = getValue();
			var isRegExp = (Object.prototype.toString.call(value) === '[object RegExp]');
			return out(isRegExp, 'a regular expression', isSilent);
		}

		function isDate(isSilent) {
			var value = getValue();
			var isDate = (Object.prototype.toString.call(value) === '[object Date]');
			return out(isDate, 'a date', isSilent);
		}

		function isArray(isSilent) {
			var value = getValue();
			var isArray = (Object.prototype.toString.call(value) === '[object Array]');
			return out(isArray, 'an array', isSilent);
		}

		function isObject(isSilent) {
			var value = getValue();
			var isObject = (Object.prototype.toString.call(value) === '[object Object]');
			return out(isObject, 'an object', isSilent);
		}

		function isFunction(isSilent) {
			var value = getValue();
			var isFunction = (Object.prototype.toString.call(value) === '[object Function]');
			return out(isFunction, 'a function', isSilent);
		}

		function isBoolean(isSilent) {
			var value = getValue();
			var isBoolean = (Object.prototype.toString.call(value) === '[object Boolean]');
			var isPlainBoolean = (typeof value === 'boolean');
			var isBooleanForReal = isBoolean && isPlainBoolean;
			return out(isBooleanForReal, 'a boolean', isSilent);
		}

		function isString(isSilent) {
			var value = getValue();
			var isString = (Object.prototype.toString.call(value) === '[object String]');
			var isPlainString = (typeof value === 'string');
			var isStringForReal = isString && isPlainString;
			return out(isStringForReal, 'a string', isSilent);
		}

		function isEmptyString(isSilent) {
			var value = getValue();
			var isString = the(value).isString(true);
			var isEmptyString = isString && (isString.length === 0);
			return out(isEmptyString, 'an empty string', isSilent);
		}

		function isHexString(isSilent) {
			var value = getValue();
			var isString = the(value).isString(true);
			var isHexString = isString && (/^[0-9a-f]+$/i).test(value);
			return out(isHexString, 'a hex string', isSilent);
		}

		function isNull(isSilent) {
			var value = getValue();
			var isNull = (value === null);
			return out(isNull, 'null', isSilent);
		}

		function isDefined(isSilent) {
			var value = getValue();
			var isDefined = (value !== undefined);
			return out(isDefined, 'a defined value', isSilent);
		}

		function isNumber(isSilent) {
			var value = getValue();
			var isNumber = (Object.prototype.toString.call(value) === '[object Number]');
			var isPlainNumber = (typeof value === 'number');
			var isFiniteNumber = isFinite(value);
			var isNumberForReal = isNumber && isPlainNumber && isFiniteNumber;
			return out(isNumberForReal, "a number", isSilent);
		}

		function setValue(value) {
			internals.value = value;
		}

		function getValue() {
			return internals.value;
		}

		function logWarning(value, typeDescription) {
			console.warn(
				'%s Expected %s, got %s (%s)',
				TAG,
				typeDescription,
				Object.prototype.toString.call(value),
				value
			);
			console.trace(value);
		}

		function out(isCorrectType, typeDescription, isSilent) {
			var value = getValue();
			if (!isCorrectType && !isSilent) {
				logWarning(value, typeDescription);
			}
			return isCorrectType;
		}
	}

	// jshint node: true
	try {
		module.exports = the;
	}
	catch (e) {
		global.the = the;
	}

})(this);
