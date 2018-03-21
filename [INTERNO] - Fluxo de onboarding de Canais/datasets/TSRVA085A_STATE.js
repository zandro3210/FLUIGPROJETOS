function createDataset(fields, constraints, sortFields) {
var newDataset = DatasetBuilder.newDataset();
newDataset.addColumn("sequence");
newDataset.addColumn("version");
newDataset.addColumn("agreementPercentage");
newDataset.addRow(new Array(2,"1",1));
return newDataset;}