function createDataset(fields, constraints, sortFields) {

	//servico dsBancoProtheus

	try{
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
		
		newDataset.addColumn("CA_CODIGO");
		newDataset.addColumn("CA_NREDUZ");
		newDataset.addColumn("CA_AGENCIA");
		newDataset.addColumn("CA_NUMCONT");
		newDataset.addColumn("CA_NMAG");
		newDataset.addColumn("CA_NOME");
		
		log.info ("DATASET dsBancoProtheus - PTO 1");
		
		var integracao = ServiceManager.getService('FLUIG3');
		
		log.info ("DATASET dsBancoProtheus - PTO 2 - servico ok");
		
		//2- Locator
			// TESTE
			//var serviceLocator = integracao.instantiate('_197._102._16._172.FLUIGLocator');
			//PRODUCAO
			//var serviceLocator = integracao.instantiate('br.com.totvs.wsautoatendimento.wscorp.FLUIGLocator');
		
			// com o pacote pkgWkfSolicPagamento definido
			var serviceLocator = integracao.instantiate('pkgWkfSolicPagamento.FLUIGLocator');
			
		
		log.info ("DATASET dsBancoProtheus - PTO 3 - instantiate ok");
		
		//3- metodo dentro do Locator - Soap
		var service = serviceLocator.getFLUIGSOAP();
	
		log.info ("DATASET dsBancoProtheus - PTO 4 - metodo getFLUIGSOAP ok");
		
		// usado no formulario - campo de nome do banco - busca em partes
		if (fields) {
			if (fields[0] != null){
				
				var cdEmp = "";
					cdEmp  = fields[0]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
				var cdFilial  = "";
					cdFilial  = fields[2]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
				var nomeBanco  = "";
					nomeBanco  = fields[4]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
					
				log.info("DATASET  dsBancoProtheus - fields - PTO 5: " + cdEmp + " - " + cdFilial + " - " + nomeBanco);
				
				// Invoca o servico
				var retorno = service.BANCO(cdEmp,cdFilial,null,null,nomeBanco.toUpperCase(),null,null);
				
				log.info ("DATASET dsBancoProtheus - fields - PTO 6" + retorno);
				
				var arrayListaBancos = retorno.getLISTABANCOS();
			    
				log.info ("DATASET  dsBancoProtheus - fields - PTO 7" + arrayListaBancos);
			    
			  	for (var i = 0; i < arrayListaBancos.length; i++) {
					var r = arrayListaBancos[i];
					newDataset.addRow(new Array(r.getCA_CODIGO(),r.getCA_NREDUZ(),r.getCA_AGENCIA(),r.getCA_NUMCONT(),r.getCA_NMAG(),r.getCA_NOME()));	
				}
					
			  	log.info ("DATASET dsBancoProtheus - fields - PTO 8");
			}
		} // fields
		else if (constraints != null) {
			
			var cdEmp = constraints[0].getInitialValue();
			var cdFilial = constraints[1].getInitialValue();
			var cdbancoI = constraints[2].getInitialValue();
			var cdbancoF = constraints[3].getInitialValue();
			
			log.info("DATASET  dsBancoProtheus - constraint - PTO 9: " + cdEmp + " - " + cdFilial + " - " + cdbancoI  + " - " + cdbancoF);
			
			// Invoca o servico
			var retorno = service.BANCO(cdEmp,cdFilial,cdbancoI,cdbancoF,null,null,null);
			
			log.info ("DATASET dsBancoProtheus - constraint - PTO 10:" + retorno);
			
			var arrayListaBancos = retorno.getLISTABANCOS();
		    
			log.info ("DATASET  dsBancoProtheus - constraint - PTO 11:" + arrayListaBancos);
		    
		  	for (var i = 0; i < arrayListaBancos.length; i++) {
				var r = arrayListaBancos[i];
				newDataset.addRow(new Array(r.getCA_CODIGO(),r.getCA_NREDUZ(),r.getCA_AGENCIA(),r.getCA_NUMCONT(),r.getCA_NMAG(),r.getCA_NOME()));	
			}
				
		  	log.info ("DATASET dsBancoProtheus - constraint - PTO 12:");
		} // constraints	
		
	} // try 
	catch(error) {
		log.info (" ++ DATASET dsBancoProtheus - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro", error.message, "erro", "erro", "erro","erro")); 
	}	
	return newDataset;	
}