function createDataset(fields, constraints, sortFields) {
	//dsMunicGestContratoJur
	//servico CAD_CONTR

	try{
	
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
	
		log.info ("DATASET dsMunicGestContratoJur - PTO 0");

		newDataset.addColumn("CA_MUNICIPIO");
		
		log.info ("DATASET dsMunicGestContratoJur PTO 1");
		
		var integracao = ServiceManager.getService('CAD_CONTR');
		//2- Locator
			// DESENV
			var serviceLocator = integracao.instantiate('_161._93._16._172.CAD_CONTRLocator');
		
			//PRODUCAO
			//var serviceLocator = integracao.instantiate('');
		
		//3- metodo dentro do Locator - Soap
		var service = serviceLocator.getCAD_CONTRSOAP();
	
		log.info ("DATASET dsMunicGestContratoJur PTO 1.5");
		
		var uf = "";
		var munic = ""; 
		
		if (fields) {
			if (fields[0] != null){
				
				uf = fields[0]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
				munic = fields[2]; 
			}
		}
		
		// TESTE
	    //uf = "SC";
    	//munic = "Joi";
    	
		log.info("DATASET   dsMunicGestContratoJur PTO 2" +
				" - uf: " + uf +
				" - mumic: " + munic);
		
		// Invoca o servico
		var retorno = service.MUNICIPIO(uf, munic.toUpperCase());
		
		log.info ("DATASET dsMunicGestContratoJur PTO 3" + retorno);
		
		var arrayListaMunic = retorno.getLISTAMUNIC();
	    
		log.info ("DATASET  dsMunicGestContratoJur PTO 4" + arrayListaMunic.length);
	    
		for (var i = 0; i < arrayListaMunic.length; i++) {
			var r = arrayListaMunic[i];
			newDataset.addRow(new Array(r.getCA_MUNICIPIO()));
		}

		log.info ("DATASET  dsMunicGestContratoJur PTO 6");
	
	} // try		
	catch(error) {
		log.info ("DATASET   dsMunicGestContratoJur - PTO 7:" + error.message);
		newDataset.addRow(new Array(error.message)); 
	}
		
	return newDataset;	

	
}