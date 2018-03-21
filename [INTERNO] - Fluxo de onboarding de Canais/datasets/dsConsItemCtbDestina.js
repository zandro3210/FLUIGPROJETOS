function createDataset(fields, constraints, sortFields) {

	//servico dsConsItemCtbDestina

	try{
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
		
		newDataset.addColumn("C_CODITCTB");
		newDataset.addColumn("C_DSCITCTB");
		
		log.info ("DATASET dsConsItemCtbDestina - PTO 1");
		
		var integracao = ServiceManager.getService('FLUIG3');
		
		log.info ("DATASET dsConsItemCtbDestina - PTO 2 - servico ok");
		
		//2- Locator
		// com o pacote pkgWkfSolicPagamento definido
		var serviceLocator = integracao.instantiate('pkgWkfSolicPagamento.FLUIGLocator');
			
		log.info ("DATASET dsConsItemCtbDestina - PTO 3 - instantiate ok");
		
		//3- metodo dentro do Locator - Soap
		var service = serviceLocator.getFLUIGSOAP();
	
		log.info ("DATASET dsConsItemCtbDestina - PTO 4 - metodo getFLUIGSOAP ok");

		// usado no formulario - campo de nome do banco - busca em partes
		if (fields) {
			if (fields[0] != null){
				
				var cdEmp = "";
					cdEmp  = fields[0]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
				var cdFilial  = "";
					cdFilial  = fields[2]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
				var cdCcusto  = "";
					cdCcusto  = fields[4]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
		
				//teste
				//var cdEmp = "00";
				//var cdFilial = "01";
				//var cdCcusto = "603310103";
				
				log.info("DATASET  dsConsItemCtbDestina - fields - PTO 5: " + cdEmp + " - " + cdFilial + " - " + cdCcusto);
				
				// Invoca o servico
				var retorno = service.CONSITCTB(cdEmp,cdFilial,cdCcusto);
				
				log.info ("DATASET dsConsItemCtbDestina - fields - PTO 6" + retorno);
				
				var arrayListaItemCtb = retorno.getALISTITCTB();
			    
				log.info ("DATASET  dsConsItemCtbDestina - fields - PTO 7 - arrayListaItemCtb: " + arrayListaItemCtb);
			    
			  	for (var i = 0; i < arrayListaItemCtb.length; i++) {
					var r = arrayListaItemCtb[i];
					newDataset.addRow(new Array(r.getC_CODITCTB(),r.getC_DSCITCTB()));	
				}
					
			  	log.info ("DATASET dsConsItemCtbDestina - fields - PTO 8");
			}
		
		} // fields
		else if (constraints != null) {
			var cdEmp = constraints[0].getInitialValue();
			var cdFilial = constraints[1].getInitialValue();
			var cdCcusto = constraints[2].getInitialValue();
		
			//teste
			//var cdEmp = "00";
			//var cdFilial = "01";
			//var cdCcusto = "603310103";
		
			log.info("DATASET  dsConsItemCtbDestina - constraint - PTO 9: " + cdEmp + " - " + cdFilial + " - " + cdCcusto);
			
			// Invoca o servico
			var retorno = service.CONSITCTB(cdEmp,cdFilial,cdCcusto);
			
			log.info ("DATASET dsConsItemCtbDestina - constraint - PTO 10:" + retorno);
			
			var arrayListaItemCtb = retorno.getALISTITCTB();
			      
			log.info ("DATASET  dsConsItemCtbDestina - constraint - PTO 11 - arrayListaItemCtb:" + arrayListaItemCtb);
		    
		    for (var i = 0; i < arrayListaItemCtb.length; i++) {
				var r = arrayListaItemCtb[i];
				newDataset.addRow(new Array(r.getC_CODITCTB(),r.getC_DSCITCTB()));	
			}
				
		  	log.info ("DATASET dsConsItemCtbDestina - constraint - PTO 12:");

		} // constraints
		  	
	} // try 
	catch(error) {
		log.info (" ++ DATASET dsConsItemCtbDestina - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro", error.message)); 
	}	
	return newDataset;	
}