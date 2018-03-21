function createDataset(fields, constraints, sortFields) {
	
	var corpore = ServiceManager.getService('TSRVS001');
	var locator = corpore.instantiate('com.totvs.services.TSRVS001');
	var service = locator.getTSRVS001SOAP();
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODE");
	newDataset.addColumn("DESCRIPTION");
	newDataset.addColumn("SEGMENTO");
	newDataset.addColumn("REASONCODE");
	newDataset.addColumn("REASONVALIDS");
	newDataset.addColumn("CUSTOMER");
	
	
	var cliente = "99061";
	var loja = "00";
	
	log.info("constraints:" + constraints)
	log.info("fields:" + fields)
	
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "cliente"){
				cliente = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "loja"){
				loja = constraints[c].getInitialValue();
			} 
		}
	}
	
	log.info("***codigo: " + cliente + ":" + loja);

	var array = service.brwprojectcfp(cliente, loja, "");
	var list = array.getSTPROJECTCFPVIEW();
	for (var i=0;i<list.size();i++) {
		var c = list.get(i);

		log.info("***CODE: " + c.getCODE());
		newDataset.addRow(new Array(c.getCODE(),
									c.getDESCRIPTION(),
									c.getSEGMENTO(),
									c.getREASONCODE(),
									c.getREASONVALIDS(),
									c.getCUSTOMER()));
	}

	log.info("***FIM DATASET DS_projeto_CLIENTES_servicos");
	return newDataset;		
}