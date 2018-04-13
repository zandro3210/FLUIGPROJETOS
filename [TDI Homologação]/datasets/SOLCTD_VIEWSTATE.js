function createDataset(fields, constraints, sortFields) {
var newDataset = DatasetBuilder.newDataset();
newDataset.addColumn("version");
newDataset.addColumn("sequence");
newDataset.addColumn("id");
newDataset.addColumn("option");
newDataset.addRow(new Array("1",1,"VIEW_CTDA","1"));
newDataset.addRow(new Array("1",1,"VIEW_CTDB","1"));
newDataset.addRow(new Array("1",2,"VIEW_CTDA","1"));
newDataset.addRow(new Array("1",2,"VIEW_CTDB","1"));
return newDataset;}