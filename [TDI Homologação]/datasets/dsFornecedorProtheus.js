function createDataset(fields, constraints, sortFields) {

	//servico wsBancoProtheus

	try{
	
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
	
		log.info ("DATASET dsfornecedor - PTO 0");
	
		newDataset.addColumn("CB_CODIGO");
		newDataset.addColumn("CB_NOME");
		newDataset.addColumn("CB_CNPJ");
		newDataset.addColumn("CB_CODBANC");
	    newDataset.addColumn("CB_AGENCIA");
		newDataset.addColumn("CB_NUMCONT");
		newDataset.addColumn("CB_TIPO");
		newDataset.addColumn("CB_LOJA");
		newDataset.addColumn("CB_NREDUZ");
		newDataset.addColumn("CB_END");
		newDataset.addColumn("CB_PAIS");
				
		log.info ("DATASET dsfornecedor PTO 1");
		
		var integracao = ServiceManager.getService('FLUIG3');

		//2- Locator
		// com o pacote pkgWkfSolicPagamento definido
		var serviceLocator = integracao.instantiate('pkgWkfSolicPagamento.FLUIGLocator');
			
			
		//3- metodo dentro do Locator - Soap
		var service = serviceLocator.getFLUIGSOAP();
	
		log.info ("DATASET dsfornecedor PTO 1.5");
		
		if (fields) {
			if (fields[0] != null){
				
				var hiddenCodEmp = ""; // enviado pelo custom.js
				    hiddenCodEmp = fields[0]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
				var hiddenCodFilial    = ""; // enviado pelo custom.js
				    hiddenCodFilial = fields[2]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
				var nomeFornec    = ""; // enviado pelo custom.js
					nomeFornec = fields[4]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
				var cnpjFornec    = ""; // enviado pelo custom.js
					cnpjFornec = fields[6]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
					
				log.info("DATASET   dsfornecedor PTO 2 - nomeFornec: " + nomeFornec + 
						" cnpjFornec: " + cnpjFornec +
						"hiddenCodEmp: " + hiddenCodEmp +
						"hiddenCodFilial: " + hiddenCodFilial);
				
				// Invoca o servico
				var retorno = service.FORNEC(hiddenCodEmp,hiddenCodFilial,nomeFornec.toUpperCase(),cnpjFornec);
				
				log.info ("DATASET dsfornecedor PTO 3" + retorno);
				
				var arrayListaFornec = retorno.getLISTAFORNEC();
			    
				log.info ("DATASET  dsfornecedor PTO 4" + arrayListaFornec.length);
			    
				for (var i = 0; i < arrayListaFornec.length; i++) {
					var r = arrayListaFornec[i];
					newDataset.addRow(new Array(r.getCB_CODIGO(),r.getCB_NOME(),r.getCB_CNPJ(),r.getCB_CODBANC(),r.getCB_AGENCIA(),r.getCB_NUMCONT(),r.getCB_TIPO(),r.getCB_LOJA(),r.getCB_NREDUZ(),r.getCB_END(), r.getCB_PAIS()));
				}
				
				log.info ("DATASET  dsfornecedor PTO 6");
			} // > 0
		} // FIELDS
	} // try		
	catch(error) {
		log.info ("DATASET   dsfornecedor - PTO 7:" + error.message);
		newDataset.addRow(new Array("erro",error.message,"erro","erro","erro","erro","erro","erro", "erro", "erro", "erro")); 
	}
		
	return newDataset;	
}