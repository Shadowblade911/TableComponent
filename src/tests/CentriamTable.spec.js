import React from "react";
import ReactDOM from "react-dom";
import CentriamTable from "../centriamTable/CentriamTable.js";

describe("Table", function () {

    it("renders with no problems", function(){
        var node = document.createElement("div");
        expect(function(){ReactDOM.render(<CentriamTable data={[]} columnConfigs={[]}/>, node);}).not.toThrow();
    });



    describe("props", function(){
        var node, component;
        var data = [];
        var columns = [];
        function returnOne(){return 1}

        beforeEach(function() {
            node = document.createElement("div");
            component = ReactDOM.render(<CentriamTable data={data} columnConfigs={columns}/>, node);
        });

        it("should have a default header click function", function(){
            expect(typeof component.headerClick === "function").toBeTruthy();
        });

        it("should be able to take in a header click function", function(){
            component = ReactDOM.render(
                <CentriamTable
                    data={data}
                    columnConfigs={columns}
                    headerClick={returnOne}
                />,
                node);

            expect(function(){return component.headerClick() === returnOne()}).toBeTruthy()
        });


        it("should be able to take in a change page function if paginated", function(){
            component = ReactDOM.render(
                <CentriamTable
                    data={data}
                    columnConfigs={columns}
                    isPaginated={true}
                    changePageFunction={returnOne}
                />,
                node);

            expect(function(){return component.state.changePageFunction() === returnOne()}).toBeTruthy()
        });
        

        it("should be able to take in a change page size function  if paginated", function(){
            component = ReactDOM.render(
                <CentriamTable
                    data={data}
                    columnConfigs={columns}
                    isPaginated={true}
                    changePageSizeFunction={returnOne}
                />,
                node);

            expect(function(){return component.state.changePageFunction() === returnOne()}).toBeTruthy()
        })
    });


});