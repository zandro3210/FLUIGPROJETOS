function createDataset(fields, constraints, sortFields) {
	
	try{
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
		
		newDataset.addColumn("CHAVE");
		newDataset.addColumn("DESCRICAO");
		newDataset.addColumn("ATIVO");
		
		log.info ("DATASET WSINDICADORES - dsConsultaDimensao - PTO 1");
		
		// SERVICO criado COM Axis ECM 3
		var periodicService = ServiceManager.getService('WSINDICADORES');
		log.info ("DATASET WSINDICADORES - dsConsultaDimensao - PTO 2 - servico ok");
		
		var serviceLocator = periodicService.instantiate('pkgIndicadoresAxis.WSINDICADORESLocator');
		log.info ("DATASET WSINDICADORES - dsConsultaDimensao - PTO 3 - instantiate ok");
		
		var service = serviceLocator.getWSINDICADORESSOAP();
		log.info ("DATASET WSINDICADORES - dsConsultaDimensao - PTO 4 - metodo getFLUIGSOAP ok");
			
		// Invoca o servico
		var retorno = service.CONSASSUNTO("");
		
		log.info ("DATASET WSINDICADORES - dsConsultaDimensao - PTO 5" + retorno);
		
		var arrayListaAssuntos = retorno.getASSUNTO_CONSULTA();
	    
		log.info ("DATASET WSINDICADORES - dsConsultaDimensao - PTO 6" + arrayListaAssuntos);
		    
	  	for (var i = 0; i < arrayListaAssuntos.length; i++) {
			var r = arrayListaAssuntos[i];
			newDataset.addRow(new Array(r.getCCODASSUNTO(),r.getCDESCASSUNTO(),r.isLATIVO()));
			log.info ("r.getCCODASSUNTO(): " + r.getCCODASSUNTO() +
					  "r.getCDESCASSUNTO: " + r.getCDESCASSUNTO() +
					  "r.isATIVO(): " + r.isLATIVO());
			}
			
	  	log.info ("DATASET WSINDICADORES - dsConsultaDimensao - PTO 7");
		
		
	} // try
	catch(error) {
		log.info (" ++ DATASET WSINDICADORES - dsConsultaDimensao - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro",error.message)); 
	}
	
	return newDataset;	

}