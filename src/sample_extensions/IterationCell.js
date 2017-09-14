import CentriamTableCell from '../centriamTable/CentriamTableCell';
import React from 'react';



export default class IterationCell extends CentriamTableCell {
    constructor(props){
        super(props);
        this.state = {
            val:0
        };
    }

    render(){
        return (
            <td >
                <a href="#" onClick={()=>this.setState({val:this.state.val+1})}>{this.state.val}</a>
            </td>
        )
    }
}