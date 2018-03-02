function createDataset(fields, constraints, sortFields) {
	
	try{
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
		
		newDataset.addColumn("CHAVE");
		newDataset.addColumn("DESCRICAO");
		
		log.info ("DATASET WSINDICADORES - dsConsultaPainel - PTO 1");
		
		// SERVICO criado COM Axis ECM 3
		var periodicService = ServiceManager.getService('WSINDICADORES');
		log.info ("DATASET WSINDICADORES - dsConsultaPainel - PTO 2 - servico ok");
		
		var serviceLocator = periodicService.instantiate('pkgIndicadoresAxis.WSINDICADORESLocator');
		log.info ("DATASET WSINDICADORES - dsConsultaPainel - PTO 3 - instantiate ok");
		
		var service = serviceLocator.getWSINDICADORESSOAP();
		log.info ("DATASET WSINDICADORES - dsConsultaPainel - PTO 4 - metodo getFLUIGSOAP ok");
			
		// Invoca o servico
		var retorno = service.CONSPAINEL("");
		
		log.info ("DATASET WSINDICADORES - dsConsultaPainel - PTO 5" + retorno);
		
		var arrayListaPaineis = retorno.getPAINEL_CONSULTA();
	    
		log.info ("DATASET WSINDICADORES - dsConsultaPainel - PTO 6" + arrayListaPaineis);
		    
	  	for (var i = 0; i < arrayListaPaineis.length; i++) {
			var r = arrayListaPaineis[i];
			newDataset.addRow(new Array(r.getCCODPAINEL(),r.getCDESCPAINEL()));
			log.info ("r.getCCODPAINEL(): " + r.getCCODPAINEL() +
					  "r.getCDESCPAINEL(): " + r.getCDESCPAINEL());
			}
			
	  	log.info ("DATASET WSINDICADORES - dsConsultaPainel - PTO 7");
		
		
	} // try
	catch(error) {
		log.info (" ++ DATASET WSINDICADORES - dsConsultaPainel - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro",error.message)); 
	}
	
	return newDataset;	

}