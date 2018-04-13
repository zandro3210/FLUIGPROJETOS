function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODIGO");
	newDataset.addColumn("DESCRICAO");
	
	newDataset.addRow(new Array("protheus", "Microsiga Protheus"));
	newDataset.addRow(new Array("rm", "RM"));
	newDataset.addRow(new Array("logix", "Logix"));
	newDataset.addRow(new Array("datasul", "Datasul"));
	newDataset.addRow(new Array("tecnologia", "Tecnologia"));
	
	return newDataset;	
}