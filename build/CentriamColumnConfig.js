'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CentriamTableCell = require('./CentriamTableCell.js');

var _CentriamTableCell2 = _interopRequireDefault(_CentriamTableCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Column Configuration. Should be populated by the consuming application
 *
 * NOTE: I'm including a formattingFunction field, this needs to be calculated in the front end from a predetermined
 * list of filters. Loading it from the backend could be very dangerous.
 */
var CentriamColumnConfig = function () {
    /***
     * Column config, this will tell the table how to display
     * @param {String | Number} key - a unique key for the column
     * @param {String | null | undefined} propKey - the key to pull the correct information from the objects passed to the table,
     *                           defaults to the key
     * @param {String|null} label - the display label for human readability
     * @param {CentriamTableCell} displayComponent - the component for displaying the information
     * @param {Number|null} minWidth - the minimum width in pixels that this cell should contain
     * @param {Number} growth - how much of cell should grow in comparision to the other sections
     * @param {Function|null} formattingFunction - a formatting function to be called before displaying the cell contents
     * @param {{}|null|undefined} additionalConfig - any additional props that need to be passed
     */
    function CentriamColumnConfig(_ref) {
        var key = _ref.key,
            propKey = _ref.propKey,
            _ref$label = _ref.label,
            label = _ref$label === undefined ? '' : _ref$label,
            _ref$displayComponent = _ref.displayComponent,
            displayComponent = _ref$displayComponent === undefined ? _CentriamTableCell2.default : _ref$displayComponent,
            minWidth = _ref.minWidth,
            growth = _ref.growth,
            formattingFunction = _ref.formattingFunction,
            additionalConfig = _ref.additionalConfig;

        _classCallCheck(this, CentriamColumnConfig);

        if (key === undefined) {
            throw new Error('A key must be provided key was undefined');
        }
        this.key = key;
        this._propKey = propKey;
        this.label = label;
        this.displayComponent = displayComponent;
        this.minWidth = minWidth;
        this.growth = growth;
        this.formattingFunction = formattingFunction;
        this.additionalConfig = additionalConfig;
    }

    _createClass(CentriamColumnConfig, [{
        key: 'percentageWidth',


        /**
         *
         * @param {Number} base - the base percentage amount
         * @return {string} the percentage
         */
        value: function percentageWidth(base) {
            return this.growth && base * this.growth + '%';
        }

        /**
         * BLACK MAGIC
         * gets the sort function for the column's cell type by using the cell component's name (which was stored during creation
         * Cells as part of their source files should add themselves to the CentriamTableCell.CELL_TYPES hash. A cell is
         * responsible for it's own sorting method. However cells have a default type.
         * @return {Function}
         */

    }, {
        key: 'minimumPixelWidth',
        get: function get() {
            return this.minWidth && this.minWidth + 'px';
        }

        /**
         * This is a way of ensuring uniqueness for determining which column is sorted.
         * @return {string}
         */

    }, {
        key: 'definedKey',
        get: function get() {
            return this.key + (this._propKey ? ":" + this._propKey : '');
        }

        /**
         * This is used to get data from the record used in the table. If the propKey was given, we know to look up using
         * that instead of the regular key. If it was left undefined, we just use the regular key;
         * @return {*}
         */

    }, {
        key: 'propKey',
        get: function get() {
            return this._propKey || this.key;
        }

        /**
         * setter for propKey. This is basically to get the complier to shut up.
         * @param val
         */
        ,
        set: function set(val) {
            this._propKey = val;
        }
    }, {
        key: 'sortFunction',
        get: function get() {
            return this.displayComponent.getSortFunction();
        }
    }]);

    return CentriamColumnConfig;
}();

exports.default = CentriamColumnConfig;