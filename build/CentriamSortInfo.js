'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SortInfo = function () {
    function SortInfo(json) {
        _classCallCheck(this, SortInfo);

        if (json) {
            this.column = json.column;
            this.sortType = json.sortType || SortInfo.UNSORTED;
        }
    }

    /**
     *
     * @param {CentriamColumnConfig} col - the column we want to get the sorting name for
     * @return {String} the name of the column sort
     *
     */


    _createClass(SortInfo, [{
        key: 'getSortColName',
        value: function getSortColName(col) {
            if (this.column && col.definedKey === this.columnDefinedKey) {
                switch (this.sortType) {
                    case SortInfo.ASCENDING:
                        return 'asc-sort';
                    case SortInfo.DESCENDING:
                        return 'desc-sort';
                    default:
                        return 'no-sort';
                }
            }
            return 'no-sort';
        }
    }, {
        key: 'getSortColStyle',
        value: function getSortColStyle(col) {
            if (this.column && col.definedKey === this.columnDefinedKey) {
                switch (this.sortType) {
                    case SortInfo.ASCENDING:
                        return {};
                    case SortInfo.DESCENDING:
                        return {};
                    default:
                        return {};
                }
            }
            return {};
        }
    }, {
        key: 'columnDefinedKey',
        get: function get() {
            return this.column && this.column.definedKey;
        }
    }]);

    return SortInfo;
}();

SortInfo.ASCENDING = 'ascending';
SortInfo.DESCENDING = 'descending';
SortInfo.UNSORTED = 'unsorted';
exports.default = SortInfo;