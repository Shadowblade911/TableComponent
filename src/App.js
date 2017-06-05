import React from 'react';
import CentriamTable from './centriamTable/CentriamTable.js'
import {data, data2, columns, columns2} from './testData/tableTestData.js';
import * as dndData from './testData/dndTestData.js';
import logo from './logo.svg';
import './App.css';


function rowClick(data){console.log(data.name);}

const changeData = function(){

    const singleDatum = data[Math.floor(Math.random() * data.length)];

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
            data={dndData.data}
            columnConfigs={dndData.columns}
            rowClick={rowClick}
            rowHeight={60}
            isPaginated={true}
            pageSize={5}
        />

        <div style={{width:"50%", marginTop:'50px', display:'inline-block', verticalAlign:'top'}}>
            <CentriamTable
                data={data2}
                columnConfigs={columns2}
            />
        </div>
          <div style={{width:"50%", marginTop:'50px', display:'inline-block',verticalAlign:'top'}}>
              <CentriamTable
                  data={data}
                  headerClick={changeData}
                  columnConfigs={columns}
              />
          </div>
      </div>
    );
  }
}


export default App;
