function createDataset(fields, constraints, sortFields) {
	//dsClienteGestContratoJur
	//servico CAD_CONTR

	try{
	
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
	
		log.info ("DATASET dsClienteGestContratoJur - PTO 0");

		newDataset.addColumn("CD_CNPJ");
		newDataset.addColumn("CD_CODIGO");
		newDataset.addColumn("CD_NOME");
		newDataset.addColumn("CD_EST");
	    newDataset.addColumn("CD_MUN");
		newDataset.addColumn("CD_BANCO");
	    newDataset.addColumn("CD_AGENCIA");
		newDataset.addColumn("CD_CONTA");

		
		log.info ("DATASET dsClienteGestContratoJur PTO 1");
		
		var integracao = ServiceManager.getService('CAD_CONTR');
		//2- Locator
			// DESENV
			var serviceLocator = integracao.instantiate('_161._93._16._172.CAD_CONTRLocator');
		
			//PRODUCAO
			//var serviceLocator = integracao.instantiate('');
		
		//3- metodo dentro do Locator - Soap
		var service = serviceLocator.getCAD_CONTRSOAP();
	
		log.info ("DATASET dsClienteGestContratoJur PTO 1.5");
		
		var hiddenCodCli = ""; 
		var nomeCli   = "";
		var cnpjCli = ""; 
		
		if (fields) {
			if (fields[0] != null){
				
				cnpjCli = fields[0]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
				hiddenCodCli = fields[2]; 
				nomeCli = fields[4]; 
			}
		}
		
		// TESTE
		//cnpjCli = "";
		//hiddenCodCli = ""; 
		//nomeCli = "totvs"; 
    	
		log.info("DATASET   dsClienteGestContratoJur PTO 2" +
				" - cnpjCli: " + cnpjCli +
				" - hiddenCodCli: " + hiddenCodCli +
				" - nomeCli: " + nomeCli);
		
		// Invoca o servico
		var retorno = service.CLIENTE(hiddenCodCli,cnpjCli,nomeCli.toUpperCase());
		
		log.info ("DATASET dsClienteGestContratoJur PTO 3" + retorno);
		
		var arrayListaClien = retorno.getLISTACLIEN();
	    
		log.info ("DATASET  dsClienteGestContratoJur PTO 4" + arrayListaClien.length);
	    
		for (var i = 0; i < arrayListaClien.length; i++) {
			var r = arrayListaClien[i];
			newDataset.addRow(new Array(r.getCD_CNPJ(),r.getCD_CODIGO(),r.getCD_NOME(),r.getCD_MUN(),r.getCD_EST(),r.getCD_BANCO(),r.getCD_AGENCIA(),r.getCD_CONTA()));
		}

		log.info ("DATASET  dsClienteGestContratoJur PTO 6");
	
	} // try		
	catch(error) {
		log.info ("DATASET   dsClienteGestContratoJur - PTO 7:" + error.message);
		newDataset.addRow(new Array("erro",error.message,"erro","erro","erro","erro","erro","erro")); 
	}
		
	return newDataset;	
	
}