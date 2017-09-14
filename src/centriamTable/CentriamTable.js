import React from 'react';
import SortInfo from './CentriamSortInfo.js';

function noop(){}


export default class CentriamTable extends React.Component {
    /**
     *
     * @param {[]} data - the data to display
     * @param {[CentriamColumnConfig]} columnConfigs - the column configurations
     * @param {function()} headerClick - a function to be called on the header clicks
     * @param {function()} rowClick -a function to be called when a user clicks on a row
     * @param {boolean} rowSelection - let the table component handle row selection.
     * @param {number} rowHeight - the height of the rows on the table
     * @param {SortInfo} sortInfo - the default sort info
     * @param {"frontend"|"backend"} paginationMode - How to handle pagination
     *                          "frontend": internally, by the library
     *                          "backend": externally, by the library user through callbacks
     * @param {boolean} isPaginated - (deprecated) whether or not this table should be paginated on the frontend
     * @param {number} currentPage -the current page. If using back end paging, this should always be 1
     * @param {number} pageDisplay - this is an editable field for controlling an input
     * @param {number} viewPage - displaying what the 'current' page is.
     * @param {[number]} pageSizeOptions - the array of page size options. If left as a single value, the page size cannot be changed
     * @param {function()} changePageFunction - a function to be called when we change the pages
     * @param {function(MouseEvent)} changePageSizeFunction - a function to be called when we change the page sizes
     * @param {function(int)} changePageSizeFunctionInt - similar to changePageSizeFunction, but called with the new value
     * @param {number} pageSize - the default page size. Will default to the 'middle' value of the page size options
     * @param {number} maxPage - the last page. Populate this with back end data if paging on the back end
     */
    constructor(props){
        super(props);

        let {data, rowSelection=true, onSelectionChanged=noop,  rowClick=noop, columnConfigs, headerClick} = props;

        let self = this;

        let totalGrowth = 0;

        for(let config of columnConfigs){
            totalGrowth += (config.growth || 0);
        }

        self.precentGrowth = (100/totalGrowth);

        self.srcData = data.map(function(datum){return datum;});


        self.state = {
            data: props.data,
            rowHeight: props.rowHeight,
            sortInfo: props.sortInfo || new SortInfo(),
            selectedRow: props.selectedRow
        };

        this.rowClick = rowSelection ? function(data){
            if(this.state.selectedRow !== data){
                onSelectionChanged(data);
            }
            this.setState(Object.assign({}, this.state, {selectedRow : data}));
            rowClick(data);
        }.bind(this) : rowClick;


        if(self.props.paginationMode || self.props.isPaginated){
            self.state = Object.assign({},
                self.state,
                {
                    currentPage: self.props.currentPage || 1,
                    pageDisplay: self.props.pageDisplay || 1,
                    viewPage: self.props.viewPage || 1,
                    pageSizeOptions: self.props.pageSizeOptions || [5, 10, 15, 25, 50, 100],
                    changePageFunction: (self.props.changePageFunction && self.props.changePageFunction.bind(self)) ||
                        function(page){
                            self.setState({
                                currentPage: page,
                                viewPage: page,
                                pageDisplay: page
                            });
                        },
                    changePageSizeFunction: (
                        self.props.changePageSizeFunction ? self.props.changePageSizeFunction.bind(self) :
                        self.props.changePageSizeFunctionInt ? function(mouseEvent) {
                            self.props.changePageSizeFunctionInt.call(self, mouseEvent.target.value);
                        } :
                        function(e){

                            let newMaxPage =  Math.ceil(self.state.data.length / ( e.target.value));
                            let newCurrentPage = self.state.currentPage;
                            let newPageDisplay = self.state.pageDisplay;
                            let newViewPage = self.state.viewPage;
                            if(newCurrentPage > newMaxPage){
                                newCurrentPage = newMaxPage;
                                newViewPage = newMaxPage;
                                newPageDisplay = newMaxPage;
                            }

                            self.setState({
                                pageSize: e.target.value,
                                maxPage: newMaxPage,
                                currentPage: newCurrentPage,
                                viewPage: newViewPage,
                                pageDisplay: newPageDisplay,
                            });
                        }
                    ),
                }
            );

            self.state.pageSize = self.props.pageSize ? self.props.pageSize : self.state.pageSizeOptions.length ?
                self.state.pageSizeOptions[Math.floor(self.state.pageSizeOptions.length / 2)] :
                self.state.pageSizeOptions;

            self.state.maxPage = self.props.maxPage || Math.ceil(self.state.data.length / self.state.pageSize);
        }

        //we can use the headerClick to pass in a new sorting function if we don't want to use the default
        self.headerClick = headerClick ? headerClick.bind(self) : function(col){
            let sortFunc = col.sortFunction;
            let sortedData;
            let SortInfoClass = this.state.sortInfo.constructor;
            let newSortInfo = new SortInfoClass(this.state.sortInfo);

            if(newSortInfo.columnDefinedKey === col.definedKey){
                switch(newSortInfo.sortType) {
                    case SortInfo.UNSORTED:
                        sortedData = this.state.data.sort(sortFunc(true, col.propKey, col));
                        newSortInfo.sortType = SortInfo.ASCENDING;
                        break;
                    case SortInfo.ASCENDING:
                        sortedData = this.state.data.sort(sortFunc(false, col.propKey, col));
                        newSortInfo.sortType = SortInfo.DESCENDING;
                        break;
                    case SortInfo.DESCENDING:
                        sortedData = this.srcData.map(function (datum) {return datum;});
                        newSortInfo.sortType = SortInfo.UNSORTED;
                        break;
                    default:
                        throw new Error("Unknown state: " + newSortInfo.sortType);
                }
            } else {
                sortedData = this.state.data.sort(sortFunc(true, col.propKey, col));
                newSortInfo.column = col;
                newSortInfo.sortType = SortInfo.ASCENDING;
            }

            this.setState({
                data: sortedData,
                sortInfo: newSortInfo
            });
        }
    }


    pageJump = function(e){
        if(e.which === 13 || e.keyCode === 13){
            var val = e.target.value;
            val = Number(val);
            if(!isNaN(val)){
                val = val < 1 ? 1 : val > this.state.maxPage ? this.state.maxPage : val;
                this.state.currentPage !== val &&
                this.state.changePageFunction(val);
            }
        }
    };

    renderRowId = function(data){
        let cols = [];
        for(let col of this.props.columnConfigs){
            cols.push(data[col.propKey]);
        }
        return cols.join(':');
    };

    render() {
        let self = this;

        let data = self.state.data;

        let headers = [];
        for(let col of self.props.columnConfigs){
            let style = self.state.sortInfo.getSortColStyle(col);
            style['minWidth'] =  col.minimumPixelWidth;
            style['width'] = col.percentageWidth(self.precentGrowth);
            style['height'] = self.state.rowHeight + 'px';


            let sortClassName;
            if(col.sortable){
                sortClassName = self.state.sortInfo.getSortColName(col);
            }

            headers.push(
                <th
                    key={col.key}
                    style={style}
                    className={sortClassName}
                    onClick={col.sortable ?
                        () => this.headerClick(col)
                        : undefined
                    }
                >
                    <div className={sortClassName} style={{position: 'relative', display: 'table'}}>
                        <span className={"text-container " + sortClassName} >
                            {col.label}
                        </span>
                    </div>
                </th>
            );
        }

        var rows = [];
        let frontendPaginate = self.props.paginationMode === 'frontend' || (self.props.isPaginated && self.props.paginationMode !== 'backend');
        let length = frontendPaginate ? self.state.pageSize: data.length;
        let offset = frontendPaginate ? self.state.pageSize * (self.state.currentPage - 1) : 0;

        for(let r = 0; r < length; r++) {
            let datum = data[offset + r];
            let cells = [];
            for(let c = 0; c < self.props.columnConfigs.length; c++){
                let col = self.props.columnConfigs[c];

                let Component = col.displayComponent;
                let props = {
                    key: this.renderRowId(datum) + ':' + col.propKey,
                    data: datum,
                    dataKey: col.propKey,
                    minWidth: col.minimumPixelWidth,
                    percentage: col.percentageWidth(self.precentGrowth),
                    formattingFunction: col.formattingFunction,
                    ...col.additionalConfig
                };

                cells.push(
                    <Component {...props}/>
                )
            }
            let row =  (
                <tr
                    key={this.renderRowId(datum)}
                    style={{height: self.state.rowHeight + 'px'}}
                    onClick={()=>self.rowClick(datum)}
                    className={self.state.selectedRow === datum ? "selected" : ''}
                >
                    {cells}
                </tr>
            );
            rows.push(row);
        }


        let className = this.props.className ? this.props.className + " centriam-table-container" : 'centriam-table-container';

        return (
            <div className={className}>
                <table className="centriam-table">
                    <thead>
                    <tr>
                        {headers}
                    </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                {self.props.isPaginated &&
                    <div className="paging-row">
                        {self.state.pageSizeOptions && self.state.pageSizeOptions.length && <div className="page-size">
                            <span>Rows:</span> <select value={self.state.pageSize} onChange={self.state.changePageSizeFunction.bind(this)}>
                                {
                                    self.state.pageSizeOptions.map(function(option){
                                        return (<option key={option} value={option}>{option}</option>)
                                    })
                                }
                            </select>
                        </div>}
                        <div className="page-controls">
                            <span>Go To:</span> <input type="text"
                                          onChange={(e) => {
                                              this.setState({pageDisplay: e.target.value});
                                          }}
                                          onKeyPress={this.pageJump.bind(this)}
                                          value={this.state.pageDisplay}
                                    />
                        </div>
                        <div>
                            <span>{this.state.viewPage} of {this.state.maxPage}</span>
                        </div>
                        <div>
                            <button className="defined"
                                    disabled={this.state.currentPage === 1}
                                    onClick={()=>{
                                        this.state.changePageFunction(this.state.currentPage-1);
                                    }}
                            >
                                <span className="previous"></span>
                            </button>
                            <button className="defined"
                                    disabled={this.state.currentPage === this.state.maxPage}
                                    onClick={()=>{
                                        this.state.changePageFunction(this.state.currentPage+1);
                                    }}
                            ><span className="next"></span></button>
                        </div>
                    </div>
                }
            </div>
        );


    }
};
