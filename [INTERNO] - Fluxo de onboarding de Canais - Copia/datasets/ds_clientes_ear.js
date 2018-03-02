function createDataset(fields, constraints, sortFields) {
	
	var corpore = ServiceManager.getService('WSDCliente');
	var locator = corpore.instantiate('br.com.totvs.wsautoatendimento.wscorp.WSDCLIENTE');
	var service = locator.getWSDCLIENTESOAP();
	
	log.info("***DATASET DS_CLIENTES_EAR");
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("LOJA");
	newDataset.addColumn("CNPJ");
	newDataset.addColumn("DESCRICAO");
	newDataset.addColumn("CODIGO");
	newDataset.addColumn("COD_SEGMENTO");
	newDataset.addColumn("DESC_SEGMENTO");
	
	var mail = "";
	//var mail = "malves@totvs.com.br";
	var mail = "wally@totvs.com.br";
	
	
	if (constraints != null) {
		for(var c in constraints){
			if (constraints[c].getFieldName() == "mail"){
				mail = constraints[c].getInitialValue(); 
			}
		}
	}
	
	// Hablita os campos de zoom para abrir solicitações
	if (mail == "andre.felipe@totvs.com.br" ||
		mail == 'rafael.antonio@totvs.com.br' ||
		mail == 'solange.koch@totvs.com.br' ||
		mail == 'jader.raphael@totvs.com.br') {
		mail = "wally@totvs.com.br";
	}
	
	/*if (mail == "cristina.poffo@totvs.com.br") {
		mail = "wally@totvs.com.br";
	}*/

	log.info("***mail: " + mail);

	var array = service.wsdLSTCLI(mail);
	var list = array.getCLISTRUCT();
	for (var i=0;i<list.size();i++) {
		var c = list.get(i);

		log.info("***LOJA: " + c.getCLOJA());
		newDataset.addRow(new Array(c.getCLOJA(),
									c.getCCNPJ(),
									c.getCDESCRICAO(),
									c.getCCODIGO(),
									c.getCCODSEG(),
									c.getCDESCSEG()));
		
	}

	log.info("***FIM DATASET DS_CLIENTES_EAR");
	return newDataset;		
}