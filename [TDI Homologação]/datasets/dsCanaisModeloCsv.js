function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
		
	dataset.addColumn("documentId");
	
	documentId = "5905577"; //Producao
	dataset.addRow([documentId]);
	
	return dataset;
}