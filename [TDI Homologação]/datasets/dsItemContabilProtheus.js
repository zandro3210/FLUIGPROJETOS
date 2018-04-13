function createDataset(fields, constraints, sortFields) {
//dsItemContabilProtheus

	try{
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
		
		newDataset.addColumn("C_CODITCTB");
		newDataset.addColumn("C_DSCITCTB");

		log.info ("DATASET dsItemContabilProtheus - dsUnidadeTOTVS - PTO 1");
		
		var integracao = ServiceManager.getService('FLUIG3');
	
		log.info ("DATASET dsItemContabilProtheus - dsUnidadeTOTVS - PTO 2 - servico ok");
	
		//2- Locator
		// com o pacote pkgWkfSolicPagamento definido
		var serviceLocator = integracao.instantiate('pkgWkfSolicPagamento.FLUIGLocator');
			
			
		log.info ("DATASET dsItemContabilProtheus - dsUnidadeTOTVS - PTO 3 - instantiate ok");
	
		//3- metodo dentro do Locator - Soap
		var service = serviceLocator.getFLUIGSOAP();
		
		log.info ("DATASET dsItemContabilProtheus - dsUnidadeTOTVS - PTO 4 - metodo getFLUIGSOAP ok");
		
		if (fields) {
		    cdEmp  = fields[0]; 
		    cdFilial  = fields[2];
		}
		else if (constraints[0] != null && constraints[0] != undefined) {
			cdEmp = constraints[0].getInitialValue();
			cdFilial = constraints[1].getInitialValue();
		}
		
		log.info("DATASET  dsItemContabilProtheus  - dsUnidadeTOTVS PTO 4.5 - do fields/constraints: " + cdEmp + " - " + cdFilial);
		
		if (cdEmp == undefined || cdEmp == null || cdEmp == "C_CODITCTB"){ var cdEmp  = "00";}
		if (cdFilial == undefined || cdFilial == null){ var cdFilial  = "01";}
		
		//teste
	    //cdEmp  = "00";
	    //cdFilial  = "01";

		log.info("DATASET  dsItemContabilProtheus  - dsUnidadeTOTVS PTO 5: " + cdEmp + " - " + cdFilial);
		
		// Invoca o servico
		var retorno = service.LISTITCTB(cdEmp, cdFilial);
		
		log.info ("DATASET dsItemContabilProtheus - dsUnidadeTOTVS PTO 6" + retorno);
		
		var arrayListaItemCont = retorno.getLISTXITENS();
	    
		log.info ("DATASET  dsItemContabilProtheus  - dsUnidadeTOTVS PTO 7" + arrayListaItemCont);
	    
	  	for (var i = 0; i < arrayListaItemCont.length; i++) {
			var r = arrayListaItemCont[i];
			newDataset.addRow(new Array(r.getC_CODITCTB(),r.getC_DSCITCTB()));
			log.info ("r.getC_DSCITCTB(): " + r.getC_CODITCTB() +
					  "r.getC_DSCITCTB(): " + r.getC_DSCITCTB() 
					  );

		}
			
	  	log.info ("DATASET dsItemContabilProtheus - dsUnidadeTOTVS PTO 8");
		
		/*
		if (fields) {
		    cdEmp  = fields[0]; 
		    cdFilial  = fields[2];
		    
		    //teste
		    //cdEmp  = "00";
		    //cdFilial  = "01";
		    	
			log.info("DATASET  dsItemContabilProtheus  - dsUnidadeTOTVS PTO 5: " + cdEmp + " - " + cdFilial);
			
			// Invoca o servico
			var retorno = service.LISTITCTB(cdEmp, cdFilial);
			
			log.info ("DATASET dsItemContabilProtheus - dsUnidadeTOTVS PTO 6" + retorno);
			
			var arrayListaItemCont = retorno.getLISTXITENS();
		    
			log.info ("DATASET  dsItemContabilProtheus  - dsUnidadeTOTVS PTO 7" + arrayListaItemCont);
		    
		  	for (var i = 0; i < arrayListaItemCont.length; i++) {
				var r = arrayListaItemCont[i];
				newDataset.addRow(new Array(r.getC_CODITCTB(),r.getC_DSCITCTB()));
				log.info ("r.getC_DSCITCTB(): " + r.getC_CODITCTB() +
						  "r.getC_DSCITCTB(): " + r.getC_DSCITCTB() 
						  );

			}
				
		  	log.info ("DATASET dsItemContabilProtheus - dsUnidadeTOTVS PTO 8");
		}
		else if (constraints != null) {
		
			cdEmp = constraints[0].getInitialValue();
			cdFilial = constraints[1].getInitialValue();

		    //teste
		    //cdEmp  = "00";
		    //cdFilial  = "01";

			log.info("DATASET  dsItemContabilProtheus  - dsUnidadeTOTVS PTO 9: " + cdEmp + " - " + cdFilial);
			
			// Invoca o servico
			var retorno = service.LISTITCTB(cdEmp, cdFilial);
			
			log.info ("DATASET dsItemContabilProtheus - dsUnidadeTOTVS PTO 10" + retorno);
			
			var arrayListaItemCont = retorno.getLISTXITENS();
		    
			log.info ("DATASET  dsItemContabilProtheus  - dsUnidadeTOTVS PTO 11" + arrayListaItemCont);
		    
		  	for (var i = 0; i < arrayListaItemCont.length; i++) {
				var r = arrayListaItemCont[i];
				newDataset.addRow(new Array(r.getC_CODITCTB(),r.getC_DSCITCTB()));
				log.info ("r.getC_DSCITCTB(): " + r.getC_CODITCTB() +
						  "r.getC_DSCITCTB(): " + r.getC_DSCITCTB() 
						  );

			}
				
		  	log.info ("DATASET dsItemContabilProtheus - dsUnidadeTOTVS PTO 12");
		}
		*/
	} // try 
	catch(error) {
		log.info (" ++ DATASET dsItemContabilProtheus - dsUnidadeTOTVS - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro",error.message)); 
	}
	
	return newDataset;	

}