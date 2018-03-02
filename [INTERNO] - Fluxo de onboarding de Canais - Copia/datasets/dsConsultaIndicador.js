function createDataset(fields, constraints, sortFields) {
	
	try{
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
		
		newDataset.addColumn("CODINDICADOR");
		newDataset.addColumn("IDINDICADOR");
		newDataset.addColumn("DESCINDICADOR");
		newDataset.addColumn("UNIDADEMEDIDA");
		newDataset.addColumn("DIRECIONADOR");
		
		log.info ("DATASET WSINDICADORES - dsConsultaIndicador - PTO 1");
		
		// SERVICO criado COM Axis ECM 3
		var periodicService = ServiceManager.getService('WSINDICADORES');
		log.info ("DATASET WSINDICADORES - dsConsultaIndicador - PTO 2 - servico ok");
		
		var serviceLocator = periodicService.instantiate('pkgIndicadoresAxis.WSINDICADORESLocator');
		log.info ("DATASET WSINDICADORES - dsConsultaIndicador - PTO 3 - instantiate ok");
		
		var service = serviceLocator.getWSINDICADORESSOAP();
		log.info ("DATASET WSINDICADORES - dsConsultaIndicador - PTO 4 - metodo getFLUIGSOAP ok");
		
		//TRECHO COMENTADO DEVIDO A PROBLEMAS NO SERVICO DO PROTHEUS
		//newDataset.addRow(new Array("COD INDICADOR","DESC INDICADOR","true")); //PALIATIVO
		
////////////////////////////////////////////////////////////////////////////////////////////////////////////			
		// Invoca o servico
		var retorno = service.CONSIND_DEATE("","");
		
		log.info ("DATASET WSINDICADORES - dsConsultaIndicador - PTO 5" + retorno);
		
		var arrayListaIndicadores = retorno.getCONS_INDIF3_RET();
	    
		log.info ("DATASET WSINDICADORES - dsConsultaIndicador - PTO 6" + arrayListaIndicadores);
		    
	  	for (var i = 0; i < arrayListaIndicadores.length; i++) {
			var r = arrayListaIndicadores[i];
			newDataset.addRow(new Array(r.getCCODIND(),r.getCIDIND(),r.getCINDDESC(),r.getCUNIDMED(), setaDirecionador(r.getCDIRECIO())));
			}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	  	log.info ("DATASET WSINDICADORES - dsConsultaIndicador - PTO 7");
		
		
	} // try
	catch(error) {
		log.info (" ++ DATASET WSINDICADORES - dsConsultaIndicador - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro",error.message)); 
	}
	
	return newDataset;	
	
	function setaDirecionador(cod){
		if(cod == 1) {
			return "Maior melhor";
		} else {
			return "Menor melhor";
		}
	}
}