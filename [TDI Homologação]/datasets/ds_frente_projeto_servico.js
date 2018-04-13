function createDataset(fields, constraints, sortFields) {
	
	var corpore = ServiceManager.getService('TSRVS001');
	var locator = corpore.instantiate('com.totvs.services.TSRVS001');
	var service = locator.getTSRVS001SOAP();
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("COORDENADOR");
	newDataset.addColumn("DESCRICAO");
	newDataset.addColumn("EDTPMS");
	newDataset.addColumn("FRENTE");
	newDataset.addColumn("MOTIVO");
	newDataset.addColumn("PROJETOPMS");
	
	var projeto = "0000001187";
	if (constraints != null) {
		for(var c in constraints){
			if (constraints[c].getFieldName() == "projeto"){
				projeto = constraints[c].getInitialValue(); 
			} 
		}
	}
	
	log.info("***codigo: " + projeto);

	var array = service.retfrentecfp(projeto);
	var list = array.getSTFRENTEENTREGA();
	for (var i=0;i<list.size();i++) {
		var c = list.get(i);

		log.info("***CODE: " + c.getFRENTE());
		newDataset.addRow(new Array(c.getCOORDENADOR(),
									c.getDESCRICAO(),
									c.getEDTPMS(),
									c.getFRENTE(),
									c.getMOTIVO(),
									c.getPROJETOPMS()));
	}

	log.info("***FIM DATASET DS_projeto_CLIENTES_servicos");
	return newDataset;		
}