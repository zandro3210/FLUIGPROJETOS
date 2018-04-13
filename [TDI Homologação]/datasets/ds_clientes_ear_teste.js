function createDataset(fields, constraints, sortFields) {
	
	var corpore = ServiceManager.getService('WSDCliente');
	var locator = corpore.instantiate('br.com.totvs.wsautoatendimento.wscorp.WSDCLIENTE');
	var service = locator.getWSDCLIENTESOAP();
	
	log.info("***DATASET DS_CLIENTES_EAR");
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CNPJ");
	newDataset.addColumn("CODIGO");
	newDataset.addColumn("COD_SEGMENTO");
	newDataset.addColumn("DESCRICAO");
	newDataset.addColumn("DESC_SEGMENTO");
	newDataset.addColumn("LOJA");
	
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
	
	//teste
	if (mail == "andre.felipe@totvs.com.br") {
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
		
//		log.info("Andre c:" + c);

		log.info("***LOJA: " + c.getCLOJA());
		newDataset.addRow(new Array(c.getCCNPJ(),
									c.getCCODIGO(),
									c.getCCODSEG(),
									c.getCDESCRICAO(),
									c.getCDESCSEG(),
									c.getCLOJA()));
		
	}

	log.info("***FIM DATASET DS_CLIENTES_EAR");
	return newDataset;		
}