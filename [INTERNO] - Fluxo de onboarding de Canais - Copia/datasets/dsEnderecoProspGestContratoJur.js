function createDataset(fields, constraints, sortFields) {
	//dsEnderecoProspGestContratoJur
	//servico CAD_CONTR

	try{
	
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
	
		log.info ("DATASET dsEnderecoProspGestContratoJur - PTO 0");

		newDataset.addColumn("CF_END");
		newDataset.addColumn("CF_NEND");
		newDataset.addColumn("CF_BAIRRO");
		newDataset.addColumn("CF_CEP");
		newDataset.addColumn("CF_COMPL");
		newDataset.addColumn("CF_MUN");
		
	   	log.info ("DATASET dsEnderecoProspGestContratoJur PTO 1");
		
		var integracao = ServiceManager.getService('CAD_CONTR');
		//2- Locator
			// DESENV
			var serviceLocator = integracao.instantiate('_161._93._16._172.CAD_CONTRLocator');
		
			//PRODUCAO
			//var serviceLocator = integracao.instantiate('');
		
		//3- metodo dentro do Locator - Soap
		var service = serviceLocator.getCAD_CONTRSOAP();
	
		log.info ("DATASET dsEnderecoProspGestContratoJur PTO 1.5");
		
		var hiddenCodProsp = "";
		var nomeProsp    = "";
		var cnpjProsp    = ""; 
		
		if (fields) {
			if (fields[0] != null){
				
				hiddenCodProsp = fields[0]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
			}
		}
		
		// TESTE
	    //hiddenCodProsp = "177291/00";

	    hiddenCodProsp = hiddenCodProsp.replace("/","");
	    
	    log.info("DATASET   dsEnderecoProspGestContratoJur PTO 2 " + 
				" - hiddenCodProsp: " + hiddenCodProsp );
		
	    // Invoca o servico
		var retorno = service.PROSPECT(hiddenCodProsp,cnpjProsp,nomeProsp);
		
		log.info ("DATASET dsEnderecoProspGestContratoJur PTO 3 - retorno:" + retorno);
		
		var arrayListaProsp = retorno.getLISTAPROSP();
		
		var listaEnderecos = arrayListaProsp[0].getCF_END();
		var arrayListEnd = listaEnderecos.getLISTPROEND();
		
		log.info ("DATASET  dsEnderecoProspGestContratoJur PTO 4 - length arrayListEnd:" + arrayListEnd.length);
		
	    // pegando os enderecos
			for (var z = 0; z < arrayListEnd.length; z++) {
				var s = arrayListEnd[z];
				
				log.info ("DATASET  dsEnderecoProspGestContratoJur PTO 5: " + s.getCF_END());
				newDataset.addRow(new Array(s.getCF_END(),s.getCF_NEND(),s.getCF_BAIRRO(),s.getCF_CEP(),s.getCF_COMPL(),s.getCF_MUN()));
			}
				log.info ("DATASET  dsEnderecoProspGestContratoJur PTO 6");
	
	} // try		
	catch(error) {
		log.info ("DATASET   dsEnderecoProspGestContratoJur - PTO 7:" + error.message);
		newDataset.addRow(new Array("erro",error.message,"erro","erro","erro")); 
	}
		
	return newDataset;	

}