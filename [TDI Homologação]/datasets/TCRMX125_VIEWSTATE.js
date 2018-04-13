function createDataset(fields, constraints, sortFields) {
var newDataset = DatasetBuilder.newDataset();
newDataset.addColumn("version");
newDataset.addColumn("sequence");
newDataset.addColumn("id");
newDataset.addColumn("option");
newDataset.addRow(new Array("1",1,"FIELDZRM","1"));
newDataset.addRow(new Array("1",1,"GRIDCNB","1"));
newDataset.addRow(new Array("1",2,"FIELDZRM","1"));
newDataset.addRow(new Array("1",2,"GRIDCNB","1"));
newDataset.addRow(new Array("1",3,"FIELDZRM","1"));
newDataset.addRow(new Array("1",3,"GRIDCNB","1"));
return newDataset;}