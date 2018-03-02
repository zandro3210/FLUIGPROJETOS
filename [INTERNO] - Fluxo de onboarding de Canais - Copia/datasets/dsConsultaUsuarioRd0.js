function createDataset(fields, constraints, sortFields) {
	
	try{
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
		
		newDataset.addColumn("CHAVE");
		newDataset.addColumn("DESCRICAO");
		
		log.info ("DATASET WSINDICADORES - dsConsultaUsuarioRd0 - PTO 1");
		
		// SERVICO criado COM Axis ECM 3
		var periodicService = ServiceManager.getService('WSINDICADORES');
		log.info ("DATASET WSINDICADORES - dsConsultaUsuarioRd0 - PTO 2 - servico ok");
		
		var serviceLocator = periodicService.instantiate('pkgIndicadoresAxis.WSINDICADORESLocator');
		log.info ("DATASET WSINDICADORES - dsConsultaUsuarioRd0 - PTO 3 - instantiate ok");
		
		var service = serviceLocator.getWSINDICADORESSOAP();
		log.info ("DATASET WSINDICADORES - dsConsultaUsuarioRd0 - PTO 4 - metodo getFLUIGSOAP ok");
			
		// Invoca o servico
		var retorno = service.CONUSRRD0("");
		
		log.info ("DATASET WSINDICADORES - dsConsultaUsuarioRd0 - PTO 5" + retorno);
		
		var arrayListaCodRd0 = retorno.getCODRD0_CONS_RET();
	    
		log.info ("DATASET WSINDICADORES - dsConsultaUsuarioRd0 - PTO 6" + arrayListaCodRd0);
		    
	  	for (var i = 0; i < arrayListaCodRd0.length; i++) {
			var r = arrayListaCodRd0[i];
			newDataset.addRow(new Array(r.getCCODRD0(),r.getCNOMERD0()));
			}
			
	  	log.info ("DATASET WSINDICADORES - dsConsultaUsuarioRd0 - PTO 7");
		
		
	} // try
	catch(error) {
		log.info (" ++ DATASET WSINDICADORES - dsConsultaUsuarioRd0 - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro",error.message)); 
	}
	
	return newDataset;	

}