function createDataset(fields, constraints, sortFields) {
	
	try{
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
		
		newDataset.addColumn("CHAVE");
		newDataset.addColumn("DESCRICAO");
		
		log.info ("DATASET WSINDICADORES - dsAbrangenciaVisao - PTO 1");
		
		// SERVICO criado COM Axis ECM 3
		var periodicService = ServiceManager.getService('WSINDICADORES');
		log.info ("DATASET WSINDICADORES - dsAbrangenciaVisao - PTO 2 - servico ok");
		
		var serviceLocator = periodicService.instantiate('pkgIndicadoresAxis.WSINDICADORESLocator');
		log.info ("DATASET WSINDICADORES - dsAbrangenciaVisao - PTO 3 - instantiate ok");
		
		var service = serviceLocator.getWSINDICADORESSOAP();
		log.info ("DATASET WSINDICADORES - dsAbrangenciaVisao - PTO 4 - metodo getFLUIGSOAP ok");
			
		// Invoca o servico
		var retorno = service.CONSSX5VIS("");
		
		log.info ("DATASET WSINDICADORES - dsAbrangenciaVisao - PTO 5" + retorno);
		
		var arrayListaTipos = retorno.getCONS_SX5();
	    
		log.info ("DATASET WSINDICADORES - dsAbrangenciaVisao - PTO 6" + arrayListaTipos);
		    
	  	for (var i = 0; i < arrayListaTipos.length; i++) {
			var r = arrayListaTipos[i];
			newDataset.addRow(new Array(r.getCCHAVE(),r.getCDESC()));
			log.info ("r.getCCHAVE(): " + r.getCCHAVE() +
					  "r.getCDESC(): " + r.getCDESC());
			}
			
	  	log.info ("DATASET WSINDICADORES - dsAbrangenciaVisao - PTO 7");
		
		
	} // try
	catch(error) {
		log.info (" ++ DATASET WSINDICADORES - dsAbrangenciaVisao - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro",error.message)); 
	}
	
	return newDataset;	

}