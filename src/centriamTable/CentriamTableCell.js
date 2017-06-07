import React from 'react';

/**
 * Very basic table cell. This should be extended by the consuming application
 * if you need to extend this, make sure to write your own versions of the getSortFunction methods
 * and register the Cell in the CentriamCellRegistry
 */
export default class CentriamTableCell extends React.Component {
    constructor({data, dataKey, minWidth, percentage, formattingFunction, ...props}) {
        super();

        //confirm that data
        let value = data && data[dataKey];

        this.value = formattingFunction && typeof formattingFunction === 'function' ?
            formattingFunction(value) : value;

        let style = {};

        if(minWidth){
            style['minWidth'] = minWidth;
        }

        if(percentage){
            style['width'] = percentage;
        }

        this.style = style;
    }



    render(){
        return (
            <td style={this.style}>
                {this.value}
            </td>
        );
    };

    /**
     * Okay, bit of black magic going on here so I'll explain the purpose of this
     * sortFunction itself is a getter. centriamColunConfig.sortFunction returns a function for sorting
     * That function should take a single parameter, is ascending, and return a function that either will sort
     * the data ascending, or descending based off the first parameter.  If your column has a special form of sorting,
     * override this function
     * @return {Function} - a function that returns one of two functions. Input should be a boolean value
     */
    static getSortFunction(){
        return (isAscending, key, col) => isAscending ?
            CentriamTableCell.DEFAULT_SORT.bind(this, key) :
            CentriamTableCell.REVERSE_SORT.bind(this, key);
    };

};


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
CentriamTableCell.DEFAULT_SORT = function(key, a,b){
    if(a[key] && !b[key]){
        return -1
    }

    if(!a[key] && b[key]){
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
CentriamTableCell.REVERSE_SORT = function(key, a,b){
    if(a[key] && !b[key]){
        return -1
    }

    if(!a[key] && b[key]){
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
CentriamTableCell.COMPARE_CHECK_NULL = function(a, b){
    return a ? (b ? null : 1) : (b ? -1 : 0);
};

/**
 * supporting function because arguments.slice was throwing errors for me
 * @param {Number} start - starting index (0 based) for pulling out arguments
 * @param {[String]} args - an arguments object
 * @return {Array} - all the keys on the argument object past the starting index (inclusive)
 */
CentriamTableCell.splitArgs = function(start, args){
    let arr = [];
    for(let i = start; i < args.length; i++){
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
CentriamTableCell.COMPARE_FULL_CHAIN = function(a, b){
    let keyChain = CentriamTableCell.splitArgs(2, arguments);
    let value = CentriamTableCell.COMPARE_CHECK_NULL(a,b);

    if(value == null && keyChain.length){
        let currentValueA = a;
        let currentValueB = b;
        for(let i = 0; i < keyChain.length; i++){
            currentValueA = currentValueA[keyChain[i]];
            currentValueB = currentValueB[keyChain[i]];

            value = CentriamTableCell.COMPARE_CHECK_NULL(currentValueA, currentValueB);

            if(value != null){
                break;
            }
        }
    }
    return value;
};