import React from 'react';
import CentriamTableCell from '../centriamTable/CentriamTableCell.js'

/**
 *  Cell that extends Centriam cell. Using this for demonstration purposes, should not be included with final product...
 */
export default class TeacherCell extends CentriamTableCell{
    render(){
        return (
            <td>
                {this.value && this.value.name}
            </td>
        )
    }
};

CentriamTableCell.CELL_TYPES[TeacherCell.name] = TeacherCell;

TeacherCell.getSortFunction = function(){
    return function(isAscending, key){
        return function(a, b){
            let nullCheck = CentriamTableCell.COMPARE_FULL_CHAIN(a, b, key, 'name');
            return (isAscending ? 1: -1) * (
                    nullCheck !== null ? -nullCheck :
                        a[key]['name'] > b[key]['name'] ? 1 :
                        a[key]['name'] < b[key]['name'] ? -1 : 0
                );
        }
    }
};

