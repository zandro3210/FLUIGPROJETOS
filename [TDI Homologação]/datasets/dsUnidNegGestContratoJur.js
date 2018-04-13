function createDataset(fields, constraints, sortFields) {
	
	// dsUnidNegGestContratoJur
	//servico CAD_CONTR

	try{
	
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
	
		log.info ("DATASET dsUnidNegGestContratoJur - PTO 0");

		newDataset.addColumn("CG_CNPJ");
		newDataset.addColumn("CG_CODIGO");
		newDataset.addColumn("CG_NOME");
	    newDataset.addColumn("CG_MUN");
		newDataset.addColumn("CG_EST");
		newDataset.addColumn("CG_BANCO");
	    newDataset.addColumn("CG_AGENCIA");
		newDataset.addColumn("CG_CONTA");

		
		log.info ("DATASET dsUnidNegGestContratoJur PTO 1");
		
		var integracao = ServiceManager.getService('CAD_CONTR');
		
		//2- Locator
			// DESENV
			var serviceLocator = integracao.instantiate('_161._93._16._172.CAD_CONTRLocator');
		
			//PRODUCAO
			//var serviceLocator = integracao.instantiate('');
		
		//3- metodo dentro do Locator - Soap
		var service = serviceLocator.getCAD_CONTRSOAP();
	
		log.info ("DATASET dsUnidNegGestContratoJur PTO 1.5");
		
		var hiddenCodUNeg = ""; 
		var nomeUNeg   = "";
		var cnpjUNeg = ""; 
		
		if (fields) {
			if (fields[0] != null){
				cnpjUNeg = fields[0]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
				hiddenCodUNeg = fields[2]; 
				nomeUNeg = fields[4]; 
			}
		}
		
		// TESTE
		//cnpjUNeg = "";
		//hiddenCodUNeg = ""; 
		//nomeUNeg = "prx"; 
    	
		log.info("DATASET   dsUnidNegGestContratoJur PTO 2" +
				" - cnpjUNeg: " + cnpjUNeg +
				" - hiddenCodUNeg: " + hiddenCodUNeg +
				" - nomeUNeg: " + nomeUNeg);
		
		// Invoca o servico
		var retorno = service.UNIDNEGOCIOS(hiddenCodUNeg,cnpjUNeg,nomeUNeg.toUpperCase());
		
		log.info ("DATASET dsProspectGestContratoJur PTO 3" + retorno);
		
		var arrayListaUNeg = retorno.getLISTAUNINEG();
	    
		log.info ("DATASET dsProspectGestContratoJur PTO 4" + arrayListaUNeg.length);
	    
		for (var i = 0; i < arrayListaUNeg.length; i++) {
			var r = arrayListaUNeg[i];
			newDataset.addRow(new Array(r.getCG_CNPJ(),r.getCG_CODIGO(),r.getCG_NOME(),r.getCG_MUN(),r.getCG_EST(),r.getCG_BANCO(),r.getCG_AGENCIA(),r.getCG_CONTA()));
		}

		log.info ("DATASET dsUnidNegGestContratoJur PTO 6");
	
	} // try		
	catch(error) {
		log.info ("DATASET dsUnidNegGestContratoJur - PTO 7:" + error.message);
		newDataset.addRow(new Array("erro",error.message,"erro","erro","erro","erro","erro","erro")); 
	}
		
	return newDataset;	
}
