function createDataset(fields, constraints, sortFields) {
	//dsUfGestContratoJur
	//servico CAD_CONTR

	try{
	
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
	
		log.info ("DATASET dsUfGestContratoJur - PTO 0");

		newDataset.addColumn("CB_CODIGO");
		newDataset.addColumn("CB_NMEST");

		
		log.info ("DATASET dsUfGestContratoJur PTO 1");
		
		var integracao = ServiceManager.getService('CAD_CONTR');
		//2- Locator
			// DESENV
			var serviceLocator = integracao.instantiate('_161._93._16._172.CAD_CONTRLocator');
		
			//PRODUCAO
			//var serviceLocator = integracao.instantiate('');
		
		//3- metodo dentro do Locator - Soap
		var service = serviceLocator.getCAD_CONTRSOAP();
	
		log.info ("DATASET dsUfGestContratoJur PTO 1.5");
		
		var uf = ""; 
		var desc = "";
		
		if (fields) {
			if (fields[0] != null){
				
				uf = fields[0]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
				desc = fields[2];
			}
		}
		
		// TESTE
	    //uf = ""; 
	    //desc = ""; 						
	    
		log.info("DATASET   dsUfGestContratoJur " +
				" - uf: " + uf +
				" - desc: " + desc );
		
		// Invoca o servico
		var retorno = service.ESTADO(uf,desc);
		
		log.info ("DATASET dsUfGestContratoJur PTO 3" + retorno);
		
		var arrayListaEst = retorno.getLISTAEST();
	    
		log.info ("DATASET  dsUfGestContratoJur PTO 4" + arrayListaEst.length);
	    
		for (var i = 0; i < arrayListaEst.length; i++) {
			var r = arrayListaEst[i];
			newDataset.addRow(new Array(r.getCB_CODIGO(),r.getCB_NMEST()));
		}

		log.info ("DATASET  dsUfGestContratoJur PTO 6");
	
	} // try		
	catch(error) {
		log.info ("DATASET   dsUfGestContratoJur - PTO 7:" + error.message);
		newDataset.addRow(new Array("erro",error.message)); 
	}
		
	return newDataset;	

}
