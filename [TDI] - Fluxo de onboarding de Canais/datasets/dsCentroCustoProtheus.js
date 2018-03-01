function createDataset(fields, constraints, sortFields) {

	//servico dscentroCustoProtheus

	try{
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
		
		newDataset.addColumn("CG_COD");
		newDataset.addColumn("CG_DESCR");
		
		log.info ("DATASET dscentroCustoProtheus  - PTO 1");
		
		var integracao = ServiceManager.getService('FLUIG3');
		
		log.info ("DATASET dscentroCustoProtheus - PTO 2 - servico ok");
		
		//2- Locator
			// TESTE
			//var serviceLocator = integracao.instantiate('_197._102._16._172.FLUIGLocator');
			//PRODUCAO
			//var serviceLocator = integracao.instantiate('br.com.totvs.wsautoatendimento.wscorp.FLUIGLocator');
		
			// com o pacote pkgWkfSolicPagamento definido
			var serviceLocator = integracao.instantiate('pkgWkfSolicPagamento.FLUIGLocator');
			
		
		log.info ("DATASET dscentroCustoProtheus - PTO 3 - instantiate ok");
		
		//3- metodo dentro do Locator - Soap
		var service = serviceLocator.getFLUIGSOAP();
	
		log.info ("DATASET dscentroCustoProtheus - PTO 4 - metodo getFLUIGSOAP ok");

		var cdEmp = "";
		var cdFilial  = "";
		var cdCcusto  = "";
		
		// usado no formulario - campo de nome do banco - busca em partes
		if (fields) {
			if (fields[0] != null){
		
				log.info("DATASET dscentroCustoProtheus - fields ");
				
					cdEmp  = fields[0]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
					cdFilial  = fields[2]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
					cdCcusto  = fields[4]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo

				//teste
				//cdEmp  = "00";
				//cdFilial  = "00001000600";
				//cdCcusto  = "";
					
				log.info("DATASET  dscentroCustoProtheus - fields - PTO 5: " + cdEmp + " - " + cdFilial + " - " + cdCcusto);
				
				// Invoca o servico
				var retorno = service.CCUSTO(cdEmp,cdFilial,cdCcusto);
				
				log.info ("DATASET dscentroCustoProtheus - fields - PTO 6" + retorno);
				
				var arrayListCC = retorno.getLISTCC();
			    
				log.info ("DATASET dscentroCustoProtheus - fields - PTO 7" + arrayListCC);
			    
			  	for (var i = 0; i < arrayListCC.length; i++) {
					var r = arrayListCC[i];
					log.info ("DATASET dscentroCustoProtheus - fields - PTO 7.5: " +
							  "r.getCG_COD(): " + r.getCG_COD() +
							  "r.getCG_DESCR(): " + r.getCG_DESCR());
					newDataset.addRow(new Array(r.getCG_COD(),r.getCG_DESCR()));	
				}
					
			  	log.info ("DATASET dscentroCustoProtheus - fields - PTO 8");
			}
		} // fields
		else if (constraints != null) {
			log.info("DATASET dscentroCustoProtheus - constraints");
		
			cdEmp = constraints[0].getInitialValue();
			log.info("DATASET dscentroCustoProtheus - constraint 0: " + constraints[0].getInitialValue());
			cdFilial = constraints[1].getInitialValue();
			log.info("DATASET dscentroCustoProtheus - constraint 1: " + constraints[1].getInitialValue());
			cdCcusto = constraints[2].getInitialValue();
			log.info("DATASET dscentroCustoProtheus - constraint 2: " + constraints[2].getInitialValue());
			
			log.info("DATASET dscentroCustoProtheus - constraint - PTO 9: " + cdEmp + " - " + cdFilial + " - " + cdCcusto);
			
			if (cdEmp == "" || cdEmp == null){
				newDataset.addRow(new Array("erro", "Empresa Pagadora nao foi informada")); 
			}
			//teste
			//var cdEmp = 00
			//var cdFilial = 00;
			//var cdCcusto;
			
			// Invoca o servico
			var retorno = service.CCUSTO(cdEmp,cdFilial,cdCcusto);
			
			log.info ("DATASET dscentroCustoProtheus - constraint - PTO 10:" + retorno);
			
			
			var arrayListCC = retorno.getLISTCC();
		    
			log.info ("DATASET dscentroCustoProtheus - dsbanco - constraint - PTO 11:" + arrayListCC);
		    
		  	for (var i = 0; i < arrayListCC.length; i++) {
				var r = arrayListCC[i];
				newDataset.addRow(new Array(r.getCG_COD(),r.getCG_DESCR()));	
			}
			
		  	log.info ("DATASET dscentroCustoProtheus - constraint - PTO 12:");
		} // constraints	
		
	} // try 
	catch(error) {
		log.info (" ++ DATASET dscentroCustoProtheus - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro", error.message)); 
	}	
	return newDataset;	
}