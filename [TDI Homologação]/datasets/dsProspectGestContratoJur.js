function createDataset(fields, constraints, sortFields) {

	// dsProspectGestContratoJur
	//servico CAD_CONTR

	try{
	
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
	
		log.info ("DATASET dsProspectGestContratoJur - PTO 0");

		newDataset.addColumn("CF_CNPJ");
		newDataset.addColumn("CF_CODIGO");
		newDataset.addColumn("CF_NOME");
	    newDataset.addColumn("CF_MUN");
		newDataset.addColumn("CF_EST");
		newDataset.addColumn("CF_BANCO");
	    newDataset.addColumn("CF_AGENCIA");
		newDataset.addColumn("CF_CONTA");

		
		log.info ("DATASET dsProspectGestContratoJur PTO 1");
		
		var integracao = ServiceManager.getService('CAD_CONTR');
		//2- Locator
			// DESENV
			var serviceLocator = integracao.instantiate('_161._93._16._172.CAD_CONTRLocator');
		
			//PRODUCAO
			//var serviceLocator = integracao.instantiate('');
		
		//3- metodo dentro do Locator - Soap
		var service = serviceLocator.getCAD_CONTRSOAP();
	
		log.info ("DATASET dsProspectGestContratoJur PTO 1.5");
		
		var hiddenCodProsp = ""; 
		var nomeProsp   = "";
		var cnpjProsp = ""; 
		
		if (fields) {
			if (fields[0] != null){
				
				cnpjProsp = fields[0]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
				hiddenCodProsp = fields[2]; 
				nomeProsp = fields[4]; 
			}
		}
		
		// TESTE
		//cnpjProsp = "";
		//hiddenCodProsp = ""; 
		//nomeProsp = "crm"; 
    	
		log.info("DATASET   dsProspectGestContratoJur PTO 2" +
				" - cnpjProsp: " + cnpjProsp +
				" - hiddenCodProsp: " + hiddenCodProsp +
				" - nomeProsp: " + nomeProsp);
		
		// Invoca o servico
		var retorno = service.PROSPECT(hiddenCodProsp,cnpjProsp,nomeProsp.toUpperCase());
		
		log.info ("DATASET dsProspectGestContratoJur PTO 3" + retorno);
		
		var arrayListaProsp = retorno.getLISTAPROSP();
	    
		log.info ("DATASET  dsProspectGestContratoJur PTO 4" + arrayListaProsp.length);
	    
		for (var i = 0; i < arrayListaProsp.length; i++) {
			var r = arrayListaProsp[i];
			newDataset.addRow(new Array(r.getCF_CNPJ(),r.getCF_CODIGO(),r.getCF_NOME(),r.getCF_MUN(),r.getCF_EST(),r.getCF_BANCO(),r.getCF_AGENCIA(),r.getCF_CONTA()));
		}

		log.info ("DATASET  dsProspectGestContratoJur PTO 6");
	
	} // try		
	catch(error) {
		log.info ("DATASET   dsProspectGestContratoJur - PTO 7:" + error.message);
		newDataset.addRow(new Array("erro",error.message,"erro","erro","erro","erro","erro","erro")); 
	}
		
	return newDataset;	
	
}
