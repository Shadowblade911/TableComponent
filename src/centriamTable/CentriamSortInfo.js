
export default class SortInfo {
    constructor(json){
        if(json) {
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
    getSortColName(col){
        if(this.column && col.definedKey === this.columnDefinedKey){
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

    getSortColStyle(col){
        if(this.column && col.definedKey === this.columnDefinedKey){
            switch(this.sortType) {
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

    get columnDefinedKey(){
        return this.column && this.column.definedKey;
    }

    static ASCENDING = 'ascending';
    static DESCENDING = 'descending';
    static UNSORTED = 'unsorted';
}



