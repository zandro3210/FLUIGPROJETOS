function createDataset(fields, constraints, sortFields) {
var newDataset = DatasetBuilder.newDataset();
newDataset.addColumn("version");
newDataset.addColumn("sequence");
newDataset.addColumn("id");
newDataset.addColumn("option");
newDataset.addRow(new Array("1",1,"VIEW_APROVA","1"));
newDataset.addRow(new Array("1",1,"VIEW_CALC","1"));
newDataset.addRow(new Array("1",1,"VIEW_HIST","1"));
newDataset.addRow(new Array("1",1,"VIEW_PROJETO","1"));
newDataset.addRow(new Array("1",2,"VIEW_APROVA","1"));
newDataset.addRow(new Array("1",2,"VIEW_CALC","1"));
newDataset.addRow(new Array("1",2,"VIEW_HIST","1"));
newDataset.addRow(new Array("1",2,"VIEW_PROJETO","1"));
newDataset.addRow(new Array("1",3,"VIEW_APROVA","1"));
newDataset.addRow(new Array("1",3,"VIEW_CALC","1"));
newDataset.addRow(new Array("1",3,"VIEW_HIST","1"));
newDataset.addRow(new Array("1",3,"VIEW_PROJETO","1"));
return newDataset;}