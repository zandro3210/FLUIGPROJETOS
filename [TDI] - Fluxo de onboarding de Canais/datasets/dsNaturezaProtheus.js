function createDataset(fields, constraints, sortFields) {

	//servico wsBancoProtheus
	try{
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
	
		
		log.info ("DATASET WSBANCOPROTHEUS - dsNatureza - CRIZZZZ");
	
		newDataset.addColumn("CD_CODIGO");
		newDataset.addColumn("CD_DESCR");
		
		log.info ("DATASET WSBANCOPROTHEUS - dsNatureza PTO 1");
		
		var integracao = ServiceManager.getService('FLUIG3');

		//2- Locator
		// com o pacote pkgWkfSolicPagamento definido
		var serviceLocator = integracao.instantiate('pkgWkfSolicPagamento.FLUIGLocator');
			
			
		//3- metodo dentro do Locator - Soap
		var service = serviceLocator.getFLUIGSOAP();
	
		log.info ("DATASET WSBANCOPROTHEUS - dsNatureza PTO 1.5");
		
		if (fields) {
			if (fields[0] != null){
				
				var cdNaturezaDe = ""; // enviado pelo custom.js
					cdNaturezaDe = fields[0]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
				var cdNaturezaAte = ""; // enviado pelo custom.js
					cdNaturezaAte = fields[2]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
					
				log.info("DATASET  WSBANCOPROTHEUS - dsNatureza PTO 2 - cdNaturezaDe: " + cdNaturezaDe + " - " + cdNaturezaAte);
				
				// Invoca o servico
				var retorno = service.NATUR(cdNaturezaDe,cdNaturezaAte);
				
				log.info ("DATASET WSBANCOPROTHEUS - dsNatureza PTO 3" + retorno);
				
				var arrayListaNatur = retorno.getLISTANATUR();
			    
				log.info ("DATASET  WSBANCOPROTHEUS - dsNatureza PTO 4" + arrayListaNatur.length);
			    
				for (var i = 0; i < arrayListaNatur.length; i++) {
					var r = arrayListaNatur[i];
					newDataset.addRow(new Array(r.getCD_CODIGO(),r.getCD_DESCR()));
				}
				
				log.info ("DATASET WSBANCOPROTHEUS - dsNatureza PTO 6");
			}
		}
	} // try 
	catch(error) {
		log.info (" ++ DATASET dsNatureza - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro", error.message)); 
	}

	return newDataset;
	
}