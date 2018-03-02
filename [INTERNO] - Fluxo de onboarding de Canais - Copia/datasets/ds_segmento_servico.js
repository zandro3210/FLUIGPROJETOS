function createDataset(fields, constraints, sortFields) {
	
	var corpore = ServiceManager.getService('TSRVS001');
	var locator = corpore.instantiate('com.totvs.services.TSRVS001');
	var service = locator.getTSRVS001SOAP();
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODIGO");
	newDataset.addColumn("DESCRICAO");
	
	var array = service.brwsegcli("");
	var list = array.getSTSEGMENTOCLIENTE();
	for (var i=0;i<list.size();i++) {
		var c = list.get(i);

		log.info("***CODE: " + c.getCODIGO());
		newDataset.addRow(new Array(c.getCODIGO(),
									c.getDESCRICAO()));
	}

	log.info("***FIM DATASET DS_projeto_CLIENTES_servicos");
	return newDataset;		
}