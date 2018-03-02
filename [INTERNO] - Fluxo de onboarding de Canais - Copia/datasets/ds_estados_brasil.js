function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("codigoProtheus"); 
	newDataset.addColumn("nome");
	
	newDataset.addRow(new Array("", "Outro"));
	newDataset.addRow(new Array("EX", "Externo"));
	newDataset.addRow(new Array("AC", "Acre"));
	newDataset.addRow(new Array("AL", "Alagoas"));
	newDataset.addRow(new Array("AP", "Amapá"));
	newDataset.addRow(new Array("AM", "Amazonas"));
	newDataset.addRow(new Array("BA", "Bahia"));
	newDataset.addRow(new Array("CE", "Ceára"));
	newDataset.addRow(new Array("DF", "Distrito Federal"));
	newDataset.addRow(new Array("ES", "Espirito Santo"));
	newDataset.addRow(new Array("GO", "Goiás"));
	newDataset.addRow(new Array("MA", "Maranhão"));
	newDataset.addRow(new Array("MT", "Mato Grosso"));
	newDataset.addRow(new Array("MS", "Mato Grosso do Sul"));
	newDataset.addRow(new Array("MG", "Minas Gerais"));
	newDataset.addRow(new Array("PR", "Parana"));
	newDataset.addRow(new Array("PB", "Paraiba"));
	newDataset.addRow(new Array("PA", "Pará"));
	newDataset.addRow(new Array("PE", "Pernambuco"));
	newDataset.addRow(new Array("PI", "Piaiu"));
	newDataset.addRow(new Array("RJ", "Rio de Janeiro"));
	newDataset.addRow(new Array("RN", "Rio Grando do Norte"));
	newDataset.addRow(new Array("RS", "Rio Grande do Sul"));
	newDataset.addRow(new Array("RO", "Rondonia"));
	newDataset.addRow(new Array("RR", "Roraima"));
	newDataset.addRow(new Array("SC", "Santa Catarina"));
	newDataset.addRow(new Array("SP", "São Paulo"));
	newDataset.addRow(new Array("SE", "Sergipe"));
	newDataset.addRow(new Array("TO", "Tocantins"));
	
	return newDataset; 

}