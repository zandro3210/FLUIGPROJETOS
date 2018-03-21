function createDataset(fields, constraints, sortFields) {
var newDataset = DatasetBuilder.newDataset();
newDataset.addColumn("version");
newDataset.addColumn("sequence");
newDataset.addColumn("id");
newDataset.addColumn("option");
newDataset.addRow(new Array("1",1,"VIEW_CTHA","1"));
newDataset.addRow(new Array("1",1,"VIEW_CTHB","1"));
newDataset.addRow(new Array("1",2,"VIEW_CTHA","1"));
newDataset.addRow(new Array("1",2,"VIEW_CTHB","1"));
return newDataset;}