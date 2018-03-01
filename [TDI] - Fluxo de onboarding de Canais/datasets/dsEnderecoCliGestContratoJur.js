function createDataset(fields, constraints, sortFields) {
	//dsEnderecoCliGestContratoJur
	//servico CAD_CONTR

	try{
	
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
	
		log.info ("DATASET dsEnderecoCliGestContratoJur - PTO 0");

		newDataset.addColumn("CD_END");
		newDataset.addColumn("CD_NEND");
		newDataset.addColumn("CD_BAIRRO");
		newDataset.addColumn("CD_CEP");
		newDataset.addColumn("CD_COMPL");
		newDataset.addColumn("CD_MUN");
		
	   	log.info ("DATASET dsEnderecoCliGestContratoJur PTO 1");
		
		var integracao = ServiceManager.getService('CAD_CONTR');
		//2- Locator
			// DESENV
			var serviceLocator = integracao.instantiate('_161._93._16._172.CAD_CONTRLocator');
		
			//PRODUCAO
			//var serviceLocator = integracao.instantiate('');
		
		//3- metodo dentro do Locator - Soap
		var service = serviceLocator.getCAD_CONTRSOAP();
	
		log.info ("DATASET dsEnderecoCliGestContratoJur PTO 1.5");
		
		var hiddenCodCli = "";
		var nomecli    = "";
		var cnpjcli    = ""; 
		
		if (fields) {
			if (fields[0] != null){
				
				hiddenCodCli = fields[0]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
			}
		}
		
		// TESTE
	    //hiddenCodCli = "99057 00";
	    //hiddenCodCli = "T5914900";
	    
	    hiddenCodCli = hiddenCodCli.replace("/","");
	    
	    log.info("DATASET   dsEnderecoCliGestContratoJur PTO 2 " + 
				" - hiddenCodCli: " + hiddenCodCli );
		
	    // Invoca o servico
		var retorno = service.CLIENTE(hiddenCodCli,cnpjcli,nomecli);
		
		log.info ("DATASET dsEnderecoCliGestContratoJur PTO 3 - retorno:" + retorno);
		
		var arrayListaClien = retorno.getLISTACLIEN();
		
		var listaEnderecos = arrayListaClien[0].getCD_END();
		var arrayListEnd = listaEnderecos.getLISTEND();
		
		log.info ("DATASET  dsEnderecoCliGestContratoJur PTO 4 - length arrayListEnd:" + arrayListEnd.length);
		
	    // pegando os enderecos
			for (var z = 0; z < arrayListEnd.length; z++) {
				var s = arrayListEnd[z];
				
				log.info ("DATASET  dsEnderecoCliGestContratoJur PTO 5: " + s.getCD_END());
				newDataset.addRow(new Array(s.getCD_END(),s.getCD_NEND(),s.getCD_BAIRRO(),s.getCD_CEP(),s.getCD_COMPL(),s.getCD_MUN()));
			}
				log.info ("DATASET  dsEnderecoCliGestContratoJur PTO 6");
	
	} // try		
	catch(error) {
		log.info ("DATASET   dsEnderecoCliGestContratoJur - PTO 7:" + error.message);
		newDataset.addRow(new Array("erro",error.message,"erro","erro","erro")); 
	}
		
	return newDataset;	

}