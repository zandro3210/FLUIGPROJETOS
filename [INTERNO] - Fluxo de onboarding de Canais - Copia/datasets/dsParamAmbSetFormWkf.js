function createDataset(fields, constraints, sortFields) {
	//dsParamAmbSetFormWkf.js
	
	var newDataset = DatasetBuilder.newDataset();
	/*1*/ newDataset.addColumn("ambiente");
	var arrayAmb = new Array();
	arrayAmb.push ("PRODUCAO");
	newDataset.addRow(arrayAmb);
	return newDataset;	
}