import CentriamTableCell from '../centriamTable/CentriamTableCell.js'

/**
 *  Cell that extends Centriam cell. Using this for demonstration purposes, should not be included with final product...
 */
export default class RankCell extends CentriamTableCell{};

RankCell.RANK_MAP = {
    kage: 1,
    jonin: 2,
    chunin: 3,
    genin: 4
};

RankCell.getSortFunction = function(){
    return function(isAscending, key){
        return function(a, b){
            let aMapped = RankCell.RANK_MAP[a[key].toLowerCase()];
            let bMapped = RankCell.RANK_MAP[b[key].toLowerCase()];
            return  (aMapped < bMapped ? -1 : aMapped > bMapped ? 1 : 0)
                * (isAscending ? 1 : -1);
        }
    }
};


