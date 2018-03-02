function createDataset(fields, constraints, sortFields) {

	//servico CAD_CONTR

	try{
	
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
	
		log.info ("DATASET dsFornecedorGestContratoJur - PTO 0");

		newDataset.addColumn("CE_CODIGO");
		newDataset.addColumn("CE_NOME");
		newDataset.addColumn("CE_CNPJ");
		newDataset.addColumn("CE_AGENCIA");
	    newDataset.addColumn("CE_BANCO");
		newDataset.addColumn("CE_CONTA");
	    newDataset.addColumn("CE_MUN");
		newDataset.addColumn("CE_EST");

		
		log.info ("DATASET dsFornecedorGestContratoJur PTO 1");
		
		var integracao = ServiceManager.getService('CAD_CONTR');
		//2- Locator
			// DESENV
			//var serviceLocator = integracao.instantiate('_161._93._16._172.CAD_CONTRLocator');
		
			//PRODUCAO
			var serviceLocator = integracao.instantiate('');
		
		//3- metodo dentro do Locator - Soap
		var service = serviceLocator.getCAD_CONTRSOAP();
	
		log.info ("DATASET dsFornecedorGestContratoJur PTO 1.5");
		
		var hiddenCodEmp = ""; 
		var hiddenCodFilial    = "";
		var nomeFornec    = "";
		var cnpjFornec    = ""; 
		
		if (fields) {
			if (fields[0] != null){
				
				hiddenCodEmp = fields[0]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
				hiddenCodFilial = fields[2]; 
				nomeFornec = fields[4]; 
				cnpjFornec = fields[6]; 
			}
		}
		
		// TESTE
	    //hiddenCodEmp = "00"; 
	    //hiddenCodFilial = "02"; 						
	    //nomeFornec = "blum";
    	//cnpjFornec = "";
    	
		log.info("DATASET   dsFornecedorGestContratoJur PTO 2 - nomeFornec: " + nomeFornec + 
				" cnpjFornec: " + cnpjFornec +
				"hiddenCodEmp: " + hiddenCodEmp +
				"hiddenCodFilial: " + hiddenCodFilial);
		
		// Invoca o servico
		var retorno = service.FORNECEDOR(hiddenCodEmp,hiddenCodFilial,null,cnpjFornec,nomeFornec.toUpperCase());
		
		log.info ("DATASET dsFornecedorGestContratoJur PTO 3" + retorno);
		
		var arrayListaForn = retorno.getLISTAFORN();
	    
		log.info ("DATASET  dsFornecedorGestContratoJur PTO 4" + arrayListaForn.length);
	    
		for (var i = 0; i < arrayListaForn.length; i++) {
			var r = arrayListaForn[i];
			newDataset.addRow(new Array(r.getCE_CODIGO(),r.getCE_NOME(),r.getCE_CNPJ(),r.getCE_AGENCIA(),r.getCE_BANCO(),r.getCE_CONTA(),r.getCE_MUN(),r.getCE_EST()));
		}

		log.info ("DATASET  dsFornecedorGestContratoJur PTO 6");
	
	} // try		
	catch(error) {
		log.info ("DATASET   dsfornecedor - PTO 7:" + error.message);
		newDataset.addRow(new Array("erro",error.message,"erro","erro","erro","erro","erro","erro")); 
	}
		
	return newDataset;	

}