'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Very basic table cell. This should be extended by the consuming application
 * if you need to extend this, make sure to write your own versions of the getSortFunction methods
 * and register the Cell in the CentriamCellRegistry
 */
var CentriamTableCell = function (_React$Component) {
    _inherits(CentriamTableCell, _React$Component);

    function CentriamTableCell(_ref) {
        var data = _ref.data,
            dataKey = _ref.dataKey,
            minWidth = _ref.minWidth,
            percentage = _ref.percentage,
            formattingFunction = _ref.formattingFunction,
            props = _objectWithoutProperties(_ref, ['data', 'dataKey', 'minWidth', 'percentage', 'formattingFunction']);

        _classCallCheck(this, CentriamTableCell);

        //confirm that data
        var _this = _possibleConstructorReturn(this, (CentriamTableCell.__proto__ || Object.getPrototypeOf(CentriamTableCell)).call(this));

        var value = data && data[dataKey];

        _this.value = formattingFunction && typeof formattingFunction === 'function' ? formattingFunction(value, data) : value;

        var style = {};

        if (minWidth) {
            style['minWidth'] = minWidth;
        }

        if (percentage) {
            style['width'] = percentage;
        }

        _this.style = style;
        return _this;
    }

    _createClass(CentriamTableCell, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'td',
                { style: this.style },
                this.value
            );
        }
    }], [{
        key: 'getSortFunction',


        /**
         * Okay, bit of black magic going on here so I'll explain the purpose of this
         * sortFunction itself is a getter. centriamColunConfig.sortFunction returns a function for sorting
         * That function should take a single parameter, is ascending, and return a function that either will sort
         * the data ascending, or descending based off the first parameter.  If your column has a special form of sorting,
         * override this function
         * @return {Function} - a function that returns one of two functions. Input should be a boolean value
         */
        value: function getSortFunction() {
            var _this2 = this;

            return function (isAscending, key, col) {
                return isAscending ? CentriamTableCell.DEFAULT_SORT.bind(_this2, key) : CentriamTableCell.REVERSE_SORT.bind(_this2, key);
            };
        }
    }]);

    return CentriamTableCell;
}(_react2.default.Component);

exports.default = CentriamTableCell;
;

/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
/*  Everything below this line is internal helper methods that are more than likely not needed for extending the tables
/*  They are being left outside of the constructor in order to keep the constructor cleaner and to make it easier to
/*  use the constructor as an example for extending.
/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

/**
 * Default ascending sort
 * @param a
 * @param b
 * @return {number}
 */
CentriamTableCell.DEFAULT_SORT = function (key, a, b) {
    if (a[key] && !b[key]) {
        return -1;
    }

    if (!a[key] && b[key]) {
        return 1;
    }

    return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;
};

/**
 * Default ascending sort
 * @param a
 * @param b
 * @return {number}
 */
CentriamTableCell.REVERSE_SORT = function (key, a, b) {
    if (a[key] && !b[key]) {
        return -1;
    }

    if (!a[key] && b[key]) {
        return 1;
    }

    return a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0;
};

/**
 *
 * @param a - first value to compare against
 * @param b - second value to compare against
 * @return {number|null} - null if both values are true, 1 if a should be moved forward, -1 if it should be moved back
 *                          0 if a and b are both null
 */
CentriamTableCell.COMPARE_CHECK_NULL = function (a, b) {
    return a ? b ? null : 1 : b ? -1 : 0;
};

/**
 * supporting function because arguments.slice was throwing errors for me
 * @param {Number} start - starting index (0 based) for pulling out arguments
 * @param {[String]} args - an arguments object
 * @return {Array} - all the keys on the argument object past the starting index (inclusive)
 */
CentriamTableCell.splitArgs = function (start, args) {
    var arr = [];
    for (var i = start; i < args.length; i++) {
        arr.push(args[i]);
    }
    return arr;
};

/**
 * Function to go down a complicated chain and determine if there is a null in the chain
 * @param {{}} a - first object to ensure there are no nulls on
 * @param {{}} b - the second object to ensure there are no nulls on
 * @return {number|null} Either 1, -1, or 0 if a should be greater than, less than, or equal to b. null if they actually
 *                      had data
 */
CentriamTableCell.COMPARE_FULL_CHAIN = function (a, b) {
    var keyChain = CentriamTableCell.splitArgs(2, arguments);
    var value = CentriamTableCell.COMPARE_CHECK_NULL(a, b);

    if (value == null && keyChain.length) {
        var currentValueA = a;
        var currentValueB = b;
        for (var i = 0; i < keyChain.length; i++) {
            currentValueA = currentValueA[keyChain[i]];
            currentValueB = currentValueB[keyChain[i]];

            value = CentriamTableCell.COMPARE_CHECK_NULL(currentValueA, currentValueB);

            if (value != null) {
                break;
            }
        }
    }
    return value;
};