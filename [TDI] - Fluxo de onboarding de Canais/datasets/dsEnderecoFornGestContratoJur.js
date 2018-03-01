function createDataset(fields, constraints, sortFields) {
	
	//servico CAD_CONTR

	try{
	
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
	
		log.info ("DATASET dsEnderecoGestContratoJur - PTO 0");

		newDataset.addColumn("CE_END");
		newDataset.addColumn("CE_NEND");
		newDataset.addColumn("CE_BAIRRO");
		newDataset.addColumn("CE_CEP");
		newDataset.addColumn("CE_COMPL");
		
	   	log.info ("DATASET dsEnderecoGestContratoJur PTO 1");
		
		var integracao = ServiceManager.getService('CAD_CONTR');
		//2- Locator
			// DESENV
			var serviceLocator = integracao.instantiate('_161._93._16._172.CAD_CONTRLocator');
		
			//PRODUCAO
			//var serviceLocator = integracao.instantiate('');
		
		//3- metodo dentro do Locator - Soap
		var service = serviceLocator.getCAD_CONTRSOAP();
	
		log.info ("DATASET dsEnderecoGestContratoJur PTO 1.5");
		
		var hiddenCodEmp = ""; 
		var hiddenCodFilial    = "";
		var nomeFornec    = "";
		var cnpjFornec    = ""; 
		
		if (fields) {
			if (fields[0] != null){
				
				hiddenCodEmp = fields[0]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
				hiddenCodFilial = fields[2]; 
				cnpjFornec = fields[4]; 
			}
		}
		
		// TESTE
	    //hiddenCodEmp = "00"; 
	    //hiddenCodFilial = "02"; 						
	    //cnpjFornec = "82637893000145";
    	
		log.info("DATASET   dsEnderecoGestContratoJur PTO 2 " + 
				" cnpjFornec: " + cnpjFornec +
				" hiddenCodEmp: " + hiddenCodEmp +
				" hiddenCodFilial: " + hiddenCodFilial);
		
		// Invoca o servico
		//var retorno = service.FORNECEDOR(hiddenCodEmp,hiddenCodFilial,null,cnpjFornec,nomeFornec.toUpperCase());
		var retorno = service.FORNECEDOR(hiddenCodEmp,hiddenCodFilial,null,cnpjFornec,null);
		
		log.info ("DATASET dsEnderecoGestContratoJur PTO 3 - retorno:" + retorno);
		
		var arrayListaForn = retorno.getLISTAFORN();
		
		//var listaEnderecos = arrayListaForn.getLISTFOREND();
		var listaEnderecos = arrayListaForn[0].getCE_END();
		var arrayListaForEnd = listaEnderecos.getLISTFOREND();
		
		log.info ("DATASET  dsEnderecoGestContratoJur PTO 4 - length arrayListaForEnd:" + arrayListaForEnd.length);
		
	    // pegando os enderecos
			for (var z = 0; z < arrayListaForEnd.length; z++) {
				var s = arrayListaForEnd[z];
				
				log.info ("DATASET  dsEnderecoGestContratoJur PTO 5: " + s.getCE_END());
				//newDataset.addRow(new Array(r.getCE_CODIGO(),r.getCE_NOME(),r.getCE_CNPJ(),r.getCE_AGENCIA(),r.getCE_BANCO(),r.getCE_CONTA()));
				//newDataset.addRow(new Array(r.getCE_END(),r.getCE_BAIRRO(),r.getCE_CEP(),r.getCE_MUN(),r.getCE_EST()));
				newDataset.addRow(new Array(s.getCE_END(),s.getCE_NEND(),s.getCE_BAIRRO(),s.getCE_CEP(),s.getCE_COMPL()));
			}
			

				log.info ("DATASET  dsEnderecoGestContratoJur PTO 6");
	
	} // try		
	catch(error) {
		log.info ("DATASET   dsEnderecoGestContratoJur - PTO 7:" + error.message);
		newDataset.addRow(new Array("erro",error.message,"erro")); 
	}
		
	return newDataset;	


}