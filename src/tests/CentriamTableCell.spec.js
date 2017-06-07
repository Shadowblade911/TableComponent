import React from 'react';
import ReactDOM from 'react-dom';
import CentriamTableCell from '../centriamTable/CentriamTableCell.js';

describe('Cell', function () {
    it('renders with no problems', function () {
        const table = document.createElement('table');
        const tr = document.createElement('tr');
        table.appendChild(tr);
        expect(function(){ReactDOM.render(<CentriamTableCell />, tr);}).not.toThrow();
    });

    it('getSortFunction returns a function', function(){

        const func = CentriamTableCell.getSortFunction();

        expect(typeof func === 'function').toBeTruthy();

    });
});