function createDataset(fields, constraints, sortFields) {
	//dsEnderecoUNegGestContratoJur
	//servico CAD_CONTR

	try{
	
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
	
		log.info ("DATASET dsEnderecoUNegGestContratoJur - PTO 0");

		newDataset.addColumn("CG_END");
		newDataset.addColumn("CG_NEND");
		newDataset.addColumn("CG_BAIRRO");
		newDataset.addColumn("CG_CEP");
		newDataset.addColumn("CG_COMPL");
		newDataset.addColumn("CG_MUN");
		
	   	log.info ("DATASET dsEnderecoUNegGestContratoJur PTO 1");
		
		var integracao = ServiceManager.getService('CAD_CONTR');
		//2- Locator
			// DESENV
			var serviceLocator = integracao.instantiate('_161._93._16._172.CAD_CONTRLocator');
		
			//PRODUCAO
			//var serviceLocator = integracao.instantiate('');
		
		//3- metodo dentro do Locator - Soap
		var service = serviceLocator.getCAD_CONTRSOAP();
	
		log.info ("DATASET dsEnderecoUNegGestContratoJur PTO 1.5");
		
		var hiddenCodUNeg = "";
		var nomeUNeg    = "";
		var cnpjUNeg    = ""; 
		
		if (fields) {
			if (fields[0] != null){
				
				hiddenCodUNeg = fields[0]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
			}
		}
		
		// TESTE
	    //hiddenCodUNeg = "ASE354";

	    hiddenCodUNeg = hiddenCodUNeg.replace("/","");
	    
	    log.info("DATASET   dsEnderecoUNegGestContratoJur PTO 2 " + 
				" - hiddenCodProsp: " + hiddenCodUNeg );
		
	    // Invoca o servico
		var retorno = service.UNIDNEGOCIOS(hiddenCodUNeg,cnpjUNeg,nomeUNeg);
		
		log.info ("DATASET dsEnderecoProspGestContratoJur PTO 3 - retorno:" + retorno);
		
		var arrayListaUNeg = retorno.getLISTAUNINEG();
		
		var listaEnderecos = arrayListaUNeg[0].getCG_END();
		var arrayListEnd = listaEnderecos.getLISTUNEND();
		
		log.info ("DATASET  dsEnderecoUNegGestContratoJur PTO 4 - length arrayListEnd:" + arrayListEnd.length);
		
	    // pegando os enderecos
			for (var z = 0; z < arrayListEnd.length; z++) {
				var s = arrayListEnd[z];
				
				log.info ("DATASET  dsEnderecoUNegGestContratoJur PTO 5: " + s.getCG_END());
				newDataset.addRow(new Array(s.getCG_END(),s.getCG_NEND(),s.getCG_BAIRRO(),s.getCG_CEP(),s.getCG_COMPL(),s.getCG_MUN()));
			}
				log.info ("DATASET  dsEnderecoProspGestContratoJur PTO 6");
	
	} // try		
	catch(error) {
		log.info ("DATASET   dsEnderecoUNegGestContratoJur - PTO 7:" + error.message);
		newDataset.addRow(new Array("erro",error.message,"erro","erro","erro")); 
	}
		
	return newDataset;	
	
}