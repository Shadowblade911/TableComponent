import React from 'react';
import {data, data2, columns, columns2} from './testData/tableTestData.js';
import * as dndData from './testData/dndTestData.js';
import logo from './logo.svg';
import './App.css';
import CentriamTable from './centriamTable/CentriamTable.js';

const ddData = dndData.data;
const ddColumns = dndData.columns;

function rowClick(data){console.log(data.name);}

const changeData = function(){

    const singleDatum = data2[Math.floor(Math.random() * data2.length)];

    this.setState({
            data: [singleDatum]
        }
    )
};

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <CentriamTable
            data={ddData}
            columnConfigs={ddColumns}
            rowClick={rowClick}
            rowHeight={30}
            isPaginated={true}
            pageSize={10}
        />

        <div style={{width:"50%", marginTop:'50px', display:'inline-block', verticalAlign:'top'}}>
            <CentriamTable
                data={data2}
                headerClick={changeData}
                columnConfigs={columns2}
            />
        </div>
          <div style={{width:"50%", marginTop:'50px', display:'inline-block',verticalAlign:'top'}}>
              <CentriamTable
                  data={data}
                  rowHeight={60}
                  columnConfigs={columns}
              />
          </div>
      </div>
    );
  }
}


export default App;
