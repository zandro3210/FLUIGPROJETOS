function createDataset(fields, constraints, sortFields) {
var newDataset = DatasetBuilder.newDataset();
newDataset.addColumn("sequence");
newDataset.addColumn("version");
newDataset.addColumn("agreementPercentage");
return newDataset;}