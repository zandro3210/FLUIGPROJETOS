function createDataset(fields, constraints, sortFields) {
	
	log.info(" LIBERACAO SENHA - DS_GO_GAR_CLIENTE - INICIO");
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("LOJA");
	newDataset.addColumn("CLIENTE");
	newDataset.addColumn("GO");
	newDataset.addColumn("GAR");
	
	var loja = "00";
	var cliente = "TEVVV0";
	
	var loja = "00";
	
	if (constraints != null) {
		for(var c in constraints){
			if (constraints[c].getFieldName() == "loja"){
				loja = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "cliente"){
				cliente = constraints[c].getInitialValue(); 
			}  
		}
	}
	
		log.info(" LIBERACAO SENHA - DS_GO_GAR_CLIENTE - LOJA: " + loja + " - cliente:" + cliente);
	
	try {
		var corpore = ServiceManager.getService('WSCRM2');
		log.info(" LIBERACAO SENHA - DS_GO_GAR_CLIENTE - getservice ok");
		
		
		var locator = corpore.instantiate('localhost.TCRMS018');//Anterior: localhost.WSCRM
		log.info(" LIBERACAO SENHA - DS_GO_GAR_CLIENTE - instantiate ok");
		
		
		var service = locator.getTCRMS018SOAP(); //Anterior: getWSCRMSOAP();
		log.info(" LIBERACAO SENHA - DS_GO_GAR_CLIENTE - getWSCRMSOAP ok");
		
		
		var email = service.wsretemailgargo(cliente, loja);
		
		
		log.info(" LIBERACAO SENHA - DS_GO_GAR_CLIENTE - wsretemailgargo :" + 
				  email.getCEMAILGAR() + ":" + email.getCEMAILGO());

		
		newDataset.addRow(new Array(loja,
									cliente,
									email.getCEMAILGO(),
									email.getCEMAILGAR()));
									
	} catch (e) {
		newDataset.addRow(new Array(loja,
									cliente,
									"erro",
									"Webservice WSCRM esta fora"));
	}

	log.info(" LIBERACAO SENHA - DS_GO_GAR_CLIENTE - FIM - ANTES DO RETURN"); 
	return newDataset;		
}