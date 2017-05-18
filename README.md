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
|rowHeight    | how tall the rows should be                     | 60px                         |
|onSort       | a function to be called for back end sorting    | no operation                 |
|sortInfo     | Default sorting info. Meant for back end sorting| an empty sort info object    |
 
---
 

### Centriam Column Config
This is how the table interacts with the data. These describe how to map data to a table and how to display them. 

| Prop Name          |          Use                                     |   Default                    |
|--------------------|:-------------------------------------------------|------------------------------|
|key                 | The unique key for the column                    | N\A this is required         |
|propKey             | The key key in the row that we wish to display   | defaults to the key          |
|label               | What the column's title is displayed as          | empty string                 |
|displayComponent    | The cell type used to display the content        | Base centriam table cell     |
|minWidth            | The minimum width of the column in pixels        | null                           |
|growth              | How many shares of growth this column gets       | null                            |
|formattingFunction  | A function to format the value before display    | null                         |
|additionalConfig    | any additional parameters for the cell           | null                         | 
---

### Centriam Table Cell
The cells for displaying data. Unlike the table or the Column config, no properties should be overwritten, 
the properties of the table cell are what gets passed to it from Column configs. Instead, when using this class, you 
should extend the class into your own class, and as part of that you override the methods of the class. Overwriting the
render method will let you customize the display for example. 

Additionally, every class should add it's constructor's name into the CentriamTableCell.CELL_TYPES hash, using the 
constructor's name as the key, and the constructor as the value. 

You can write your own sorting functions for your cells, by adding a static method on constructor called getSortFunction.
 The getSortFunction should return a function that takes, in order, a boolean value to sort by ascending or descending,
 the key on which to sort, and the column config 