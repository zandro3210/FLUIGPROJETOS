function createDataset(fields, constraints, sortFields) {
var newDataset = DatasetBuilder.newDataset();
newDataset.addColumn("version");
newDataset.addColumn("sequence");
newDataset.addColumn("id");
newDataset.addColumn("option");
newDataset.addRow(new Array("1",2,"",""));
newDataset.addRow(new Array("1",3,"VIEW_APR","1"));
newDataset.addRow(new Array("1",3,"VIEW_PF9","1"));
newDataset.addRow(new Array("1",4,"VIEW_APR","1"));
newDataset.addRow(new Array("1",4,"VIEW_PF9","1"));
return newDataset;}