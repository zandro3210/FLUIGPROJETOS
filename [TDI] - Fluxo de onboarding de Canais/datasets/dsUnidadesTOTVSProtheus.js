function createDataset(fields, constraints, sortFields) {

	//servico dsUnidadesTOTVSProtheus
	
	try{
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
		
		newDataset.addColumn("CC_CNPJ");
		newDataset.addColumn("CC_CODIGO");
		newDataset.addColumn("CC_FILIAL");
		newDataset.addColumn("CC_NMEMPR");
		newDataset.addColumn("CC_NMFIL");
		
		log.info ("DATASET dsUnidadesTOTVSProtheus - dsUnidadeTOTVS - PTO 1");
		
		var integracao = ServiceManager.getService('FLUIG3');
	
		log.info ("DATASET dsUnidadesTOTVSProtheus - dsUnidadeTOTVS - PTO 2 - servico ok");
	
		//2- Locator
		// com o pacote pkgWkfSolicPagamento definido
		var serviceLocator = integracao.instantiate('pkgWkfSolicPagamento.FLUIGLocator');
			
	
			
		log.info ("DATASET dsUnidadesTOTVSProtheus - dsUnidadeTOTVS - PTO 3 - instantiate ok");
	
		//3- metodo dentro do Locator - Soap
		var service = serviceLocator.getFLUIGSOAP();
		
		log.info ("DATASET dsUnidadesTOTVSProtheus - dsUnidadeTOTVS - PTO 4 - metodo getFLUIGSOAP ok");
		
		var cnpjEmpresa  = "";
		if (fields) {
		    cnpjEmpresa  = fields[0]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
				
			log.info("DATASET  dsUnidadesTOTVSProtheus  - dsUnidadeTOTVS PTO 5: " + cnpjEmpresa);
			
			// Invoca o servico
			var retorno = service.EMPRPAG(cnpjEmpresa.toUpperCase());
			
			log.info ("DATASET dsUnidadesTOTVSProtheus - dsUnidadeTOTVS PTO 6" + retorno);
			
			var arrayListaEmpresas = retorno.getLISTAEMPR();
		    
			log.info ("DATASET  dsUnidadesTOTVSProtheus  - dsUnidadeTOTVS PTO 7" + arrayListaEmpresas);
		    
		  	for (var i = 0; i < arrayListaEmpresas.length; i++) {
				var r = arrayListaEmpresas[i];
				newDataset.addRow(new Array(r.getCC_CNPJ(),r.getCC_CODIGO(),r.getCC_FILIAL(),r.getCC_NMEMPR(),r.getCC_NMFIL()));
				log.info ("r.getCC_CNPJ(): " + r.getCC_CNPJ() +
						  "r.getCC_CODIGO(): " + r.getCC_CODIGO() +
						  "r.getCC_FILIAL(): " + r.getCC_FILIAL() +
						  "r.getCC_NMEMPR(): " + r.getCC_NMEMPR() +
						  "r.getCC_NMFIL(): " + r.getCC_NMFIL() );

			}
				
		  	log.info ("DATASET dsUnidadesTOTVSProtheus - dsUnidadeTOTVS PTO 8");
		}
		else{
			log.info ("DATASET dsUnidadesTOTVSProtheus - dsUnidadeTOTVS PTO 9 - SEM FIELDS");
		}
	} // try 
	catch(error) {
		log.info (" ++ DATASET dsUnidadesTOTVSProtheus - dsUnidadeTOTVS - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro",error.message,"erro","erro","erro")); 
	}
	
	return newDataset;	
}