import React from 'react';
import CentriamTable from './centriamTable/CentriamTable.js'
import {data, data2, columns, columns2} from './tableTestData.js';
import logo from './logo.svg';
import './App.css';


function rowClick(data){console.log(data.name);}

function onSort(sortInfo){
    console.log(
        "Sorting on " + sortInfo.columnDefinedKey + " : " + sortInfo.sortType
    )
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <CentriamTable
            data={data}
            columnConfigs={columns}
            rowClick={rowClick}
            onSort={onSort}
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
                  columnConfigs={columns}
              />
          </div>
      </div>
    );
  }
}


export default App;
