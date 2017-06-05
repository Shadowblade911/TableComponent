import React from 'react';
import CentriamTableCell from './CentriamTableCell.js';
import SortInfo from './CentriamSortInfo.js';
import './table.css'


function noop(){}




export default class CentriamTable extends React.Component {
    /**
     *
     * @param {[]} data - the data to display
     * @param {[CentriamColumnConfig]} columnConfigs - the column configurations
     * @param {number} rowHeight - the height of the rows on the table
     */
    constructor(props){
        super(props);

        let {data, columnConfigs, headerClick} = props;

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
            rowClick: props.rowClick  || noop, // noop function
            sortInfo: props.sortInfo || new SortInfo()
        };

        if(!!self.props.isPaginated){
            self.state = Object.assign({},
                self.state,
                {
                    currentPage: self.props.currentPage || 1,
                    pageSize: self.props.pageSize || 25,
                    maxPage: self.props.maxPage || Math.ceil(self.state.data.length / ( self.props.pageSize || 25)),
                    changePageFunction: (self.props.changePageFunction && self.props.changePageFunction.bind(self)) || function(page){
                        self.setState({
                            currentPage: page
                        });
                    }
                }
            )
        }

        self.columns = columnConfigs;

        //we can use the headerClick to pass in a new sorting function if we don't want to use the default
        self.headerClick = headerClick ? headerClick.bind(self) : function(col){
            let sortFunc = col.sortFunction;
            let sortedData;
            let newSortInfo = new SortInfo(this.state.sortInfo);

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

     createPageButton = function(index){

        let classNames = "page-button "  + (this.state.currentPage === index ? "active" : "");

        return (
            <button
                key={index}
                className={classNames}
                onClick={() => {
                    this.state.currentPage !== index &&
                    this.state.changePageFunction(index);
                }}
            >
                <span>{index}</span>
            </button>
        )
    };

    render() {
        let self = this;

        let data = self.state.data;

        let headers = [];
        for(let col of self.columns){
            let style = {};
            style['minWidth'] =  col.minimumPixelWidth;
            style['width'] = col.percentageWidth(self.precentGrowth);
            style['height'] = self.state.rowHeight + 'px';



            let sortClassName = self.state.sortInfo.getSortColName(col);



            headers.push(
                <th
                    key={col.key}
                    style={style}
                    className={sortClassName}
                    onClick={() => this.headerClick(col)}
                >
                    <span className={"text-container " + sortClassName} >
                        {col.label}
                    </span>
                </th>
            );
        }

        var rows = [];
        let length = self.props.isPaginated ? self.state.pageSize: data.length;
        let offset = self.props.isPaginated ? self.state.pageSize * (self.state.currentPage - 1) : 0;
        for(let r = 0; r < length; r++) {
            let datum = data[offset + r];
            let cells = [];
            for(let c = 0; c < self.columns.length; c++){
                let col = self.columns[c];
                cells.push(
                    CentriamTableCell.render(col.displayComponent,
                        {
                            key: +(new Date()) + ':' +  r + ':' + c + ':' + col.key,
                            data: datum,
                            dataKey: col.propKey,
                            minWidth: col.minimumPixelWidth,
                            percentage: col.percentageWidth(self.precentGrowth),
                            formattingFunction: col.formattingFunction,
                            ...col.additionalConfig
                        }
                    )
                )
            }
            let row =  (
                <tr
                    key={+(new Date()) +  r}
                    style={{height: self.state.rowHeight + 'px'}}
                    onClick={()=>self.state.rowClick(datum)}
                >
                    {cells}
                </tr>
            );
            rows.push(row);
        }

        let pageButtons = [];
        if(self.props.isPaginated){
            let currentPage = self.state.currentPage;
            for(let i =1; i <= 5; i++){
                if(currentPage-i >= 1) {
                    pageButtons.unshift(self.createPageButton(currentPage - i));
                }
            }
            pageButtons.push(self.createPageButton(self.state.currentPage));
            for(let i =1; i <= 5; i++){
                if(currentPage+i <= self.state.maxPage) {
                    pageButtons.push(self.createPageButton(currentPage + i));
                }
            }
        }



        return (
            <div className="centriam-table-container">
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
                        <button
                            className="defined previous"
                            disabled={self.state.currentPage === 1}
                            onClick={() => {
                               this.state.changePageFunction(self.state.currentPage-1);
                            }}
                        >
                            Previous
                        </button>
                        {pageButtons}
                        <button
                            className="defined next"
                            disabled={self.state.currentPage === self.state.maxPage}
                            onClick={() => {
                                this.state.changePageFunction(self.state.currentPage+1);
                            }}
                        >
                            next
                        </button>
                    </div>
                }
            </div>
        );


    }
};