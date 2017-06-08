import SortInfo from '../centriamTable/CentriamSortInfo.js';

describe('SortInfo', function () {
    it('can be instantated with no problems', function () {
        expect(function(){new SortInfo();}).not.toThrow();
    });

    describe('functions', function(){
        var sortInfo;

        beforeEach(function(){
            sortInfo = new SortInfo();
        });

        it('should have a getSortColName function', function(){
            expect(typeof sortInfo.getSortColName === 'function').toBeTruthy();
        });

        it('should have a getSortColStyle function', function(){
            expect(typeof sortInfo.getSortColStyle === 'function').toBeTruthy();
        });

    });

    describe('interactions with column configs', function(){
        var col, sortInfo;

        beforeEach(function(){
            sortInfo = new SortInfo();
            col = {definedKey: 'key'};
        });

        it('should take an object with a column as a property and use it', function(){
            var info = new SortInfo({column:col});

            expect(info.column.definedKey === col.definedKey).toBeTruthy();
        })


    })

});