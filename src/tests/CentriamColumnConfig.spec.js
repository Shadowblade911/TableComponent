import CentriamColumnConfig from '../centriamTable/CentriamColumnConfig.js';
import CentriamTableCell from '../centriamTable/CentriamTableCell.js';

describe('CentriamColumnConfig', function () {
    it('it will throw if no key is provided', function () {
        expect(function(){new CentriamColumnConfig({});}).toThrow();
    });

    it('it will not throw if a key is provided', function () {
        expect(function(){new CentriamColumnConfig({key:'test'});}).not.toThrow();
    });

    it('will default to using a CentriamTableCell if nothing is provided', function(){
        var config = new CentriamColumnConfig({key:'test'});

        expect(config.displayComponent.constructor.name === CentriamTableCell.constructor.name).toBeTruthy();
    });

    it("will use a different display component if given", function(){
        class testComponent {};

        var config = new CentriamColumnConfig({key:'test', displayComponent:testComponent});

        expect(config.displayComponent.constructor.name === testComponent.constructor.name).toBeTruthy();
    })

});