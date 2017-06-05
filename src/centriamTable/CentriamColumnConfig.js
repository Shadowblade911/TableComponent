import CentriamTableCell from './CentriamTableCell.js';

/**
 * Column Configuration. Should be populated by the consuming application
 *
 * NOTE: I'm including a formattingFunction field, this needs to be calculated in the front end from a predetermined
 * list of filters. Loading it from the backend could be very dangerous.
 */
export default class CentriamColumnConfig {
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
    constructor({
        key,
        propKey,
        label='',
        displayComponent=CentriamTableCell,
        minWidth,
        growth,
        formattingFunction,
        additionalConfig
    }){
        this.key                = key;
        this._propKey           = propKey;
        this.label              = label;
        this.displayComponent   = displayComponent;
        this.minWidth           = minWidth;
        this.growth             = growth;
        this.formattingFunction = formattingFunction;
        this.additionalConfig   = additionalConfig;
    }


    get minimumPixelWidth(){
        return this.minWidth && this.minWidth + 'px';
    }

    /**
     * This is a way of ensuring uniqueness for determining which column is sorted.
     * @return {string}
     */
    get definedKey(){
        return this.key + (this._propKey ? ":" + this._propKey : '');
    }

    /**
     * This is used to get data from the record used in the table. If the propKey was given, we know to look up using
     * that instead of the regular key. If it was left undefined, we just use the regular key;
     * @return {*}
     */
    get propKey(){
        return this._propKey || this.key;
    }

    /**
     * setter for propKey. This is basically to get the complier to shut up.
     * @param val
     */
    set propKey(val){
        this._propKey = val;
    }


    /**
     *
     * @param {Number} base - the base percentage amount
     * @return {string} the percentage
     */
    percentageWidth(base){
        return this.growth && (base * this.growth + '%');
    }

    /**
     * BLACK MAGIC
     * gets the sort function for the column's cell type by using the cell component's name (which was stored during creation
     * Cells as part of their source files should add themselves to the CentriamTableCell.CELL_TYPES hash. A cell is
     * responsible for it's own sorting method. However cells have a default type.
     * @return {Function}
     */
    get sortFunction(){
        return this.displayComponent.getSortFunction();
    }

}

