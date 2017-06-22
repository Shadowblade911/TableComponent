'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CentriamSortInfo = require('./CentriamSortInfo.js');

var _CentriamSortInfo2 = _interopRequireDefault(_CentriamSortInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function noop() {}

var CentriamTable = function (_React$Component) {
    _inherits(CentriamTable, _React$Component);

    /**
     *
     * @param {[]} data - the data to display
     * @param {[CentriamColumnConfig]} columnConfigs - the column configurations
     * @param {function()} headerClick - a function to be called on the header clicks
     * @param {function()} rowClick -a function to be called when a user clicks on a row
     * @param {number} rowHeight - the height of the rows on the table
     * @param {SortInfo} sortInfo - the default sort info
     * @param {boolean} isPaginated - whether or not this table should be paginated
     * @param {number} currentPage -the current page. If using back end paging, this should always be 1
     * @param {number} pageDisplay - this is an editable field for controlling an input
     * @param {number} viewPage - displaying what the 'current' page is.
     * @param {[number]} pageSizeOptions - the array of page size options. If left as a single value, the page size cannot be changed
     * @param {function()} changePageFunction - a function to be called when we change the pages
     * @param {function()} changePageSizeFunction - a function to be called when we change the page sizes
     * @param {number} pageSize - the default page size. Will default to the 'middle' value of the page size options
     * @param {number} maxPage - the last page. Populate this with back end data if paging on the back end
     */
    function CentriamTable(props) {
        _classCallCheck(this, CentriamTable);

        var _this = _possibleConstructorReturn(this, (CentriamTable.__proto__ || Object.getPrototypeOf(CentriamTable)).call(this, props));

        _this.pageJump = function (e) {
            if (e.which === 13 || e.keyCode === 13) {
                var val = e.target.value;
                val = Number(val);
                if (!isNaN(val)) {
                    val = val < 1 ? 1 : val > this.state.maxPage ? this.state.maxPage : val;
                    this.state.currentPage !== val && this.state.changePageFunction(val);
                }
            }
        };

        var data = props.data,
            columnConfigs = props.columnConfigs,
            headerClick = props.headerClick;


        var self = _this;

        var totalGrowth = 0;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = columnConfigs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var config = _step.value;

                totalGrowth += config.growth || 0;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        self.precentGrowth = 100 / totalGrowth;

        self.srcData = data.map(function (datum) {
            return datum;
        });

        self.state = {
            data: props.data,
            rowHeight: props.rowHeight,
            rowClick: props.rowClick || noop, // noop function
            sortInfo: props.sortInfo || new _CentriamSortInfo2.default()

        };

        if (!!self.props.isPaginated) {
            self.state = Object.assign({}, self.state, {
                currentPage: self.props.currentPage || 1,
                pageDisplay: self.props.pageDisplay || 1,
                viewPage: self.props.viewPage || 1,
                pageSizeOptions: self.props.pageSizeOptions || [5, 10, 15, 25, 50, 100],
                changePageFunction: self.props.changePageFunction && self.props.changePageFunction.bind(self) || function (page) {
                    self.setState({
                        currentPage: page,
                        viewPage: page,
                        pageDisplay: page
                    });
                },
                changePageSizeFunction: self.props.changePageFunction && self.props.changePageFunction.bind(self) || function (e) {

                    var newMaxPage = Math.ceil(self.state.data.length / e.target.value);
                    var newCurrentPage = self.state.currentPage;
                    var newPageDisplay = self.state.pageDisplay;
                    var newViewPage = self.state.viewPage;
                    if (newCurrentPage > newMaxPage) {
                        newCurrentPage = newMaxPage;
                        newViewPage = newMaxPage;
                        newPageDisplay = newMaxPage;
                    }

                    self.setState({
                        pageSize: e.target.value,
                        maxPage: newMaxPage,
                        currentPage: newCurrentPage,
                        viewPage: newViewPage,
                        pageDisplay: newPageDisplay
                    });
                }
            });

            self.state.pageSize = self.props.pageSize ? self.props.pageSize : self.state.pageSizeOptions.length ? self.state.pageSizeOptions[Math.floor(self.state.pageSizeOptions.length / 2)] : self.state.pageSizeOptions;

            self.state.maxPage = self.props.maxPage || Math.ceil(self.state.data.length / self.state.pageSize);
        }

        self.columns = columnConfigs;

        //we can use the headerClick to pass in a new sorting function if we don't want to use the default
        self.headerClick = headerClick ? headerClick.bind(self) : function (col) {
            var sortFunc = col.sortFunction;
            var sortedData = void 0;
            var SortInfoClass = this.state.sortInfo.constructor;
            var newSortInfo = new SortInfoClass(this.state.sortInfo);

            if (newSortInfo.columnDefinedKey === col.definedKey) {
                switch (newSortInfo.sortType) {
                    case _CentriamSortInfo2.default.UNSORTED:
                        sortedData = this.state.data.sort(sortFunc(true, col.propKey, col));
                        newSortInfo.sortType = _CentriamSortInfo2.default.ASCENDING;
                        break;
                    case _CentriamSortInfo2.default.ASCENDING:
                        sortedData = this.state.data.sort(sortFunc(false, col.propKey, col));
                        newSortInfo.sortType = _CentriamSortInfo2.default.DESCENDING;
                        break;
                    case _CentriamSortInfo2.default.DESCENDING:
                        sortedData = this.srcData.map(function (datum) {
                            return datum;
                        });
                        newSortInfo.sortType = _CentriamSortInfo2.default.UNSORTED;
                        break;
                    default:
                        throw new Error("Unknown state: " + newSortInfo.sortType);
                }
            } else {
                sortedData = this.state.data.sort(sortFunc(true, col.propKey, col));
                newSortInfo.column = col;
                newSortInfo.sortType = _CentriamSortInfo2.default.ASCENDING;
            }

            this.setState({
                data: sortedData,
                sortInfo: newSortInfo
            });
        };
        return _this;
    }

    _createClass(CentriamTable, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var self = this;

            var data = self.state.data;

            var headers = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                var _loop2 = function _loop2() {
                    var col = _step2.value;

                    var style = self.state.sortInfo.getSortColStyle(col);
                    style['minWidth'] = col.minimumPixelWidth;
                    style['width'] = col.percentageWidth(self.precentGrowth);
                    style['height'] = self.state.rowHeight + 'px';

                    var sortClassName = self.state.sortInfo.getSortColName(col);

                    headers.push(_react2.default.createElement(
                        'th',
                        {
                            key: col.key,
                            style: style,
                            className: sortClassName,
                            onClick: function onClick() {
                                return _this2.headerClick(col);
                            }
                        },
                        _react2.default.createElement(
                            'span',
                            { className: "text-container " + sortClassName },
                            col.label
                        )
                    ));
                };

                for (var _iterator2 = self.columns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    _loop2();
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            var rows = [];
            var length = self.props.isPaginated ? self.state.pageSize : data.length;
            var offset = self.props.isPaginated ? self.state.pageSize * (self.state.currentPage - 1) : 0;

            var _loop = function _loop(r) {
                var datum = data[offset + r];
                var cells = [];
                for (var c = 0; c < self.columns.length; c++) {
                    var _col = self.columns[c];

                    var Component = _col.displayComponent;
                    var props = _extends({
                        key: +new Date() + ':' + r + ':' + c + ':' + _col.key,
                        data: datum,
                        dataKey: _col.propKey,
                        minWidth: _col.minimumPixelWidth,
                        percentage: _col.percentageWidth(self.precentGrowth),
                        formattingFunction: _col.formattingFunction
                    }, _col.additionalConfig);

                    cells.push(_react2.default.createElement(Component, props));
                }
                var row = _react2.default.createElement(
                    'tr',
                    {
                        key: +new Date() + r,
                        style: { height: self.state.rowHeight + 'px' },
                        onClick: function onClick() {
                            return self.state.rowClick(datum);
                        }
                    },
                    cells
                );
                rows.push(row);
            };

            for (var r = 0; r < length; r++) {
                _loop(r);
            }

            return _react2.default.createElement(
                'div',
                { className: 'centriam-table-container' },
                _react2.default.createElement(
                    'table',
                    { className: 'centriam-table' },
                    _react2.default.createElement(
                        'thead',
                        null,
                        _react2.default.createElement(
                            'tr',
                            null,
                            headers
                        )
                    ),
                    _react2.default.createElement(
                        'tbody',
                        null,
                        rows
                    )
                ),
                self.props.isPaginated && _react2.default.createElement(
                    'div',
                    { className: 'paging-row' },
                    self.state.pageSizeOptions && self.state.pageSizeOptions.length && _react2.default.createElement(
                        'div',
                        { className: 'page-size' },
                        _react2.default.createElement(
                            'span',
                            null,
                            'Rows:'
                        ),
                        ' ',
                        _react2.default.createElement(
                            'select',
                            { value: self.state.pageSize, onChange: self.state.changePageSizeFunction.bind(this) },
                            self.state.pageSizeOptions.map(function (option) {
                                return _react2.default.createElement(
                                    'option',
                                    { key: option, value: option },
                                    option
                                );
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'page-controls' },
                        _react2.default.createElement(
                            'span',
                            null,
                            'Go To:'
                        ),
                        ' ',
                        _react2.default.createElement('input', { type: 'text',
                            onChange: function onChange(e) {
                                _this2.setState({ pageDisplay: e.target.value });
                            },
                            onKeyPress: this.pageJump.bind(this),
                            value: this.state.pageDisplay
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'span',
                            null,
                            this.state.viewPage,
                            ' of ',
                            this.state.maxPage
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'button',
                            { className: 'defined',
                                disabled: this.state.currentPage === 1,
                                onClick: function onClick() {
                                    _this2.state.changePageFunction(_this2.state.currentPage - 1);
                                }
                            },
                            _react2.default.createElement('span', { className: 'previous' })
                        ),
                        _react2.default.createElement(
                            'button',
                            { className: 'defined',
                                disabled: this.state.currentPage === this.state.maxPage,
                                onClick: function onClick() {
                                    _this2.state.changePageFunction(_this2.state.currentPage + 1);
                                }
                            },
                            _react2.default.createElement('span', { className: 'next' })
                        )
                    )
                )
            );
        }
    }]);

    return CentriamTable;
}(_react2.default.Component);

exports.default = CentriamTable;
;