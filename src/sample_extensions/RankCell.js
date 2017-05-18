import CentriamTableCell from '../centriamTable/CentriamTableCell.js'

/**
 *  Cell that extends Centriam cell. Using this for demonstration purposes, should not be included with final product...
 */
export default class RankCell extends CentriamTableCell{};

CentriamTableCell.CELL_TYPES[RankCell.name] = RankCell;

RankCell.RANK_MAP = {
    hokage: 1,
    jonin: 2,
    chunin: 3,
    genin: 4
};

RankCell.getSortFunction = function(){
    return function(isAscending, key){
        return function(a, b){
            return RankCell.RANK_MAP[a[key].toLowerCase()] - RankCell.RANK_MAP[b[key].toLowerCase()]
                * (isAscending ? 1 : -1);
        }
    }
};


