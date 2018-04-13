function createDataset(fields, constraints, sortFields) {
var newDataset = DatasetBuilder.newDataset();
newDataset.addColumn("version");
newDataset.addColumn("sequence");
newDataset.addColumn("id");
newDataset.addColumn("option");
newDataset.addRow(new Array("1",1,"VIEW_CAB","1"));
newDataset.addRow(new Array("1",2,"VIEW_CAB","1"));
newDataset.addRow(new Array("1",3,"VIEW_CAB","1"));
return newDataset;}