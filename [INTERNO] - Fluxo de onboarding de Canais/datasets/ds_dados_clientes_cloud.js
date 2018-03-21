function createDataset(fields, constraints, sortFields) {
	
	log.info("DS_DADOS_CLIENTES_CLOUD");
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("cnpj");
	newDataset.addColumn("codcli");
	newDataset.addColumn("emailcontato");
	newDataset.addColumn("emailear");
	newDataset.addColumn("nomecontato");
	newDataset.addColumn("nomeear");
	newDataset.addColumn("proposta");
	newDataset.addColumn("razaosocial");
	newDataset.addColumn("segmento");
	newDataset.addColumn("telcontato");
	newDataset.addColumn("valorproposta");
	newDataset.addColumn("lojacli");
	newDataset.addColumn("contrato");
	newDataset.addColumn("codigoear");
	
	var cliente = "TEZGEM";
	
	if (constraints != null) {
		for(var c in constraints){
			if (constraints[c].getFieldName() == "cliente"){
				cliente = constraints[c].getInitialValue(); 
			}  
		}
	}

	log.info("DS_DADOS_CLIENTES_CLOUD cliente:" + cliente);
	
	try {
		var corpore = ServiceManager.getService('WSSERVICOSCLOUD');
		log.info("DS_DADOS_CLIENTES_CLOUD - getservice ok");
		
		
		var locator = corpore.instantiate('com.totvs.tdi.cloud.WSSERVICOSCLOUD');
		log.info("DS_DADOS_CLIENTES_CLOUD - instantiate ok");
		
		
		var service = locator.getWSSERVICOSCLOUDSOAP();
		log.info("DS_DADOS_CLIENTES_CLOUD - getWSSERVICOSCLOUDSOAP ok");
		
		
		var dados = service.dadosclientewffluig(cliente);
		
		log.info("DS_DADOS_CLIENTES_CLOUD - dadosclientewffluig :" + 
				dados.getCNPJ() + ":" + dados.getRAZAOSOCIAL());

		
		newDataset.addRow(new Array(dados.getCNPJ().trim(),
								    dados.getCODCLI().trim(),
								    dados.getEMAILCONTATO().trim(),
								    dados.getEMAILEAR().trim(),
								    dados.getNOMECONTATO().trim(),
								    dados.getNOMEEAR().trim(),
								    dados.getPROPOSTA().trim(),
								    dados.getRAZAOSOCIAL().trim(),
								    dados.getSEGMENTO().trim(),
								    dados.getTELCONTATO().trim(),
								    dados.getVALORPROPOSTA(),
								    dados.getLOJACLI().trim(),
								    dados.getCONTRATO().trim(),
								    dados.getCODEAR().trim()));
		
	} catch (e) {
		log.info("DS_DADOS_CLIENTES_CLOUD - " + e.message);
		newDataset.addRow(new Array("erro",
									cliente,
									"",
									e.message,
									"",
									"",
									"",
									"",
									"",
									"",
									"",
									"",
									""));
	}

	log.info(" LIBERACAO SENHA - DS_GO_GAR_CLIENTE - FIM - ANTES DO RETURN"); 
	return newDataset;		
}