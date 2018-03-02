function createDataset(fields, constraints, sortFields) {
	
	try{
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
		
		newDataset.addColumn("CODINDICADOR");
		newDataset.addColumn("IDINDICADOR");
		newDataset.addColumn("DESCINDICADOR");
		newDataset.addColumn("UNIDADEMEDIDA");
		newDataset.addColumn("DIRECIONADOR");
		newDataset.addColumn("CMATFLU");
		newDataset.addColumn("CMAILFL");
		
		
		log.info ("DATASET WSINDICADORES - dsConsultaIndicador - PTO 1");
		
		// SERVICO criado COM Axis ECM 3
		var periodicService = ServiceManager.getService('WSINDICADORES');
		log.info ("DATASET WSINDICADORES - dsConsultaIndicador - PTO 2 - servico ok");
		
		var serviceLocator = periodicService.instantiate('pkgIndicadoresAxis.WSINDICADORESLocator');
		log.info ("DATASET WSINDICADORES - dsConsultaIndicador - PTO 3 - instantiate ok");
		
		var service = serviceLocator.getWSINDICADORESSOAP();
		log.info ("DATASET WSINDICADORES - dsConsultaIndicador - PTO 4 - metodo getFLUIGSOAP ok");		
		
		//TESTE
//		var c1 = DatasetFactory.createConstraint("idIndicador",
//				 "0000002481", "0000002481",
//				 ConstraintType.MUST);
//		 var c2 = DatasetFactory.createConstraint("idIndicador",
//		 "0000000001", "0000000001",
//		 ConstraintType.MUST);
//		
////		 constraints = new Array(c1);
//		 constraints = new Array(c1, c2);
		//////
		
		if (constraints != null) {			
			for (var x = 0; x < constraints.length; x++) {
				var idIndicador = constraints[x].getInitialValue();
				
				// Invoca o servico
				var retorno = service.CONSINDICADOR(idIndicador,true);
		
				log.info ("DATASET WSINDICADORES - dsConsultaIndicador - PTO 5" + retorno);
		
				var arrayListaIndicadores = retorno.getINDICADOR_CONSULTA();
	    
				log.info ("DATASET WSINDICADORES - dsConsultaIndicador - PTO 6" + arrayListaIndicadores);
		    
				for (var i = 0; i < arrayListaIndicadores.length; i++) {
					var r = arrayListaIndicadores[i];
					newDataset.addRow(new Array(r.getCCODIND(),r.getCIDIND(),r.getCDESCIND(),r.getCSIMBIND(), setaDirecionador(r.getCDIRIND()),
							r.getCMATFLU(),r.getCMAILFL()));
					log.info ("r.getCCODIND(): " + r.getCCODIND() +
					  "r.getCIDIND(): " + r.getCIDIND() +
					  "r.getCINDDESC(): " + r.getCDESCIND() +
					  "r.getCSIMBIND(): " + r.getCSIMBIND() +
					  "r.getCDIRECIO(): " + r.getCDIRIND() +
					  "r.getCMATFLU(): " + r.getCMATFLU() +  
					  ",r.getCMAILFL(): " + r.getCMAILFL());
			
					log.info ("DATASET WSINDICADORES - dsConsultaIndicador - PTO 7");

				}
				
			}
		}
		
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





