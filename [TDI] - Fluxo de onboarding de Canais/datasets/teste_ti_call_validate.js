function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	
	var dataset = DatasetFactory.getDataset("teste_ti_validate", null, null, null);
	var json = dataset.getValue(0, "USER");
	var obj = JSON.parse(json);
					
	log.info("SENNHEISER " + obj);
	
    var codUsuario = obj.user;
	var senha = obj.pass;
	
	log.info("SENNHEISER " + codUsuario + "SENNHEISER " + senha);

	return newDataset;
}
