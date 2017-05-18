
export default class SortInfo {
    constructor(json){
        if(json) {
            this.column = json.column;
            this.sortType = json.sortType || SortInfo.UNSORTED;
            this.additionalInfo = json.additionalInfo;
        }
    }

    /**
     *
     * @param {CentriamColumnConfig} co - the column we want to get the sorting name for
     * @return {String} the name of the column sort
     *
     * TODO: move the name out into another object that could be overriden
     *
     */
    getSortColName(col){
        if(this.column && col.definedKey === this.column.definedKey){
            switch(this.sortType) {
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
}

SortInfo.ASCENDING = 'ascending';
SortInfo.DESCENDING = 'descending';
SortInfo.UNSORTED = 'unsorted';