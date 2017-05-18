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

        let {data, columnConfigs} = props;

        let self = this;

        let totalGrowth = 0;

        for(let config of columnConfigs){
            totalGrowth += (config.growth || 0);
        }

        self.precentGrowth = (100/totalGrowth);

        self.srcData = data.map(function(datum){return datum;});


        self.state = {
            data: props.data,
            rowHeight: props.rowHeight || 60,
            rowClick: props.rowClick  || noop, // noop function
            onSort: props.onSort || noop,
            sortInfo: new SortInfo()
        };

        self.columns = columnConfigs;

        self.headerClick = function(col){
            let sortFunc = col.sortFunction;
            let sortedData;
            let newSortInfo = new SortInfo(this.state.sortInfo);



            if(newSortInfo.columnDefinedKey === col.definedKey){
                switch(newSortInfo.sortType) {
                    case SortInfo.UNSORTED:
                        sortedData = self.state.data.sort(sortFunc(true, col.propKey, col));
                        newSortInfo.sortType = SortInfo.ASCENDING;
                        break;
                    case SortInfo.ASCENDING:
                        sortedData = self.state.data.sort(sortFunc(false, col.propKey, col));
                        newSortInfo.sortType = SortInfo.DESCENDING;
                        break;
                    case SortInfo.DESCENDING:
                        sortedData = self.srcData.map(function (datum) {return datum;});
                        newSortInfo.sortType = SortInfo.UNSORTED;
                        break;
                    default:
                        throw new Error("Unknown state: " + newSortInfo.sortType);
                }
            } else {
                sortedData = self.state.data.sort(sortFunc(true, col.propKey, col));
                newSortInfo.columnDefinedKey = col.definedKey;
                newSortInfo.additionalInfo = col.additionalConfig
            }

            this.state.onSort(newSortInfo);

            self.setState({
                data: sortedData,
                sortInfo: newSortInfo
            });
        }
    }

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
        for(let r = 0; r < data.length; r++) {
            let datum = data[r];
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




        return (
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
        );


    }
};