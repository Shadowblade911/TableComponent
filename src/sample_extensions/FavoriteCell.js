import React from 'react';
import CentriamTableCell from '../centriamTable/CentriamTableCell.js'

/**
 *  Cell that extends Centriam cell. Using this for demonstration purposes, should not be included with final product...
 */
export default class FavoriteCell extends CentriamTableCell{
    render(){
        return (
            <td>
                {this.value && this.value[this.props.favoriteKey]}
            </td>
        )
    }
};

CentriamTableCell.CELL_TYPES[FavoriteCell.name] = FavoriteCell;


// add your own sorting function like so.
FavoriteCell.getSortFunction = function(){
    return function(isAscending, key, col){
        var actualKey = col.additionalConfig.favoriteKey;
        return isAscending ? FavoriteCell.DEFAULT_SORT.bind(this, actualKey) : FavoriteCell.REVERSE_SORT.bind(this, actualKey)
    }
};

/**
 * @param a
 * @param b
 * @return {number}
 */
FavoriteCell.DEFAULT_SORT = function(key, a,b){
    let nullCheck = CentriamTableCell.COMPARE_FULL_CHAIN(a, b, 'favorites', key);
    return nullCheck !== null ? nullCheck :
        a['favorites'][key] > b['favorites'][key] ? 1 :  a['favorites'][key] < b['favorites'][key] ? -1 : 0;
};

/**
 * @param a
 * @param b
 * @return {number}
 */
FavoriteCell.REVERSE_SORT = function(key, a,b){
    let nullCheck = CentriamTableCell.COMPARE_FULL_CHAIN(a, b, 'favorites', key);
    return nullCheck !== null ? -nullCheck :
        a['favorites'][key] > b['favorites'][key] ? -1 :  a['favorites'][key] < b['favorites'][key] ? 1 : 0;
};
