#Centriam Table Component 


## The Basics

This is a table component designed to be as configurable as possible. Each part of the table is broken down into smaller
components with the intention of being able to extend what's needed for your case. 

---

### Centriam Table

This is the where the magic is coming together, and the simplest part to work with. It should not be necessary 
to change how this chunk of code behaves. Everything you need to make this work should be available by passing
in properties to the table. 

| Prop Name   |          Use                                    |   Default                    |
|-------------|:------------------------------------------------|------------------------------|
|data         | This is the source of data                      | N/A no data means no table   |
|columnConfigs| The configuration of the columns                | N/A no columns means no table|
|rowClick     | Function to be called on click of a row         | no operation                 |
|rowHeight    | how tall the rows should be                     | auto                         |
|headerClick  | The function called when the headers are clicked| an internal sort             |
|sortInfo     | an object describing the sorting information    | centriam default sort        |
|isPaginated  | if the table should be paginated                | false                        |
|rowSelection | Have the table allow 'selection' of rows        | true                         |
|selectedRow  | the currently selected row                      | null                         |

Note: if you allow rowSelection, and have your own rowClick function, the table will select the row and set it's internal 
state before calling your row click function. 

#### pagination properties
if you pass in a truthy value to the isPaginated property, then you can also pass in this information 

| Prop Name            |          Use                                    |   Default                                   |
|----------------------|:------------------------------------------------|---------------------------------------------|
|currentPage           | The page that you are displaying                | 1                                           |
|viewPage              | what page you appear to be showing              | 1                                           |
|pageSizeOptions       | the size options for the pages                  | 5, 10, 15, 25, 50 and 100                   |
|pageSize              | The number of records to display on a page      | the 'middle' value of pageSizeOptions (25)  |
|maxPage               | The number of pages shown                       | (data length / page size) + 1               |
|changePageFunction    | The function called when you change pages       | simple page update                          |              
|changePageSizeFunction| the function called when the page size changes  | simple change page size function            |


#### Header Click
The header click function is how we are handling sorting. By default, it does an internal sort, and only rearranges the 
data. Since it is exposed and can be overridden, we can do much more than just an internal sort. There are a few things 
to know about overriding the header click function
1) We bind the main table class to the function. Therefore, this.setState will allow you to change any state properties.
2) the setState method by default expects two things, 
    1) the data to be changed
    2) that you update the sortInfo in order to show what the new sorting is supposed to look like
3) the sortInfo class you use should override CentriamSortInfo or implement a method, getSortColName and getSortColStyle
which should return a string and an object respectively. 

#### changePageFunction
The changePageFunction can also be overridden, and the table class is bound to the function. Meaning you can use it to 
page requests on the backend if desired. If you do that you should always keep the state variable currentPage set to 1,
but change the viewPage to whatever page the user is requesting. Additionally, you should ensure that a state variable
called pageDisplay is updated as well. 



### Centriam Column Config
This is how the table interacts with the data. These describe how to map data to a table and how to display them. 

| Prop Name          |          Use                                     |   Default                    |
|--------------------|:-------------------------------------------------|------------------------------|
|key                 | The unique key for the column                    | N\A this is required         |
|propKey             | The key key in the row that we wish to display   | defaults to the key          |
|label               | What the column's title is displayed as          | empty string                 |
|displayComponent    | The cell type used to display the content        | Base centriam table cell     |
|minWidth            | The minimum width of the column in pixels        | null                         |
|growth              | How many shares of growth this column gets       | null                         |
|formattingFunction  | A function to format the value before display    | null                         |
|additionalConfig    | any additional parameters for the cell           | null                         |
|sortable            | whether or not the column is sortable            | true                         |
---

### Centriam Table Cell
The cells for displaying data. Unlike the table or the Column config, no properties should be overwritten, 
the properties of the table cell are what gets passed to it from Column configs. Instead, when using this class, you 
should extend the class into your own class, and as part of that you override the methods of the class. Overwriting the
render method will let you customize the display for example. 

You can write your own sorting functions for your cells, by adding a static method on constructor called getSortFunction.
 The getSortFunction should return a function that takes, in order, a boolean value to sort by ascending or descending,
 the key on which to sort, and the column config 
 
### Run this and commit changes before making PR:
npm run build-css && babel src/centriamTable/ --out-dir build