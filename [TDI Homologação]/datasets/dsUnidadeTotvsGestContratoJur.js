function createDataset(fields, constraints, sortFields) {

	//dsUnidadeTotvsGestContratoJur
	
	try{
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
		
		newDataset.addColumn("CC_CNPJ");
		newDataset.addColumn("CC_CODIGO");
		newDataset.addColumn("CC_FILIAL");
		newDataset.addColumn("CC_NMEMPR");
		newDataset.addColumn("CC_NMFIL");
		newDataset.addColumn("CC_END");
		newDataset.addColumn("CC_MUN");
		newDataset.addColumn("CC_EST");
		newDataset.addColumn("CC_CEP");
		
		log.info ("DATASET dsUnidadeTotvsGestContratoJur- PTO 1");
		
		var integracao = ServiceManager.getService('CAD_CONTR');
	
		log.info ("DATASET dsUnidadeTotvsGestContratoJur - PTO 2 - servico ok");
	
		//2- Locator
			// TESTE
			var serviceLocator = integracao.instantiate('_161._93._16._172.CAD_CONTRLocator');
		
			//PRODUCAO
			//var serviceLocator = integracao.instantiate('br.com.totvs.wsautoatendimento.wscorp.FLUIGLocator');
		
			
		log.info ("DATASET dsUnidadeTotvsGestContratoJur - PTO 3 - instantiate ok");
	
		//3- metodo dentro do Locator - Soap
		var service = serviceLocator.getCAD_CONTRSOAP();
		
		log.info ("DATASET dsUnidadeTotvsGestContratoJur - PTO 4 - metodo getFLUIGSOAP ok");
		
		var cnpjEmpresa  = "";
		if (fields) {
		    cnpjEmpresa  = fields[0]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
				
		}
		
		
		// teste
		//cnpjEmpresa  = "53113791000122";
		
		
		log.info("DATASET  dsUnidadeTotvsGestContratoJur  - dsUnidadeTOTVS PTO 5: " + cnpjEmpresa);
		
		// Invoca o servico
		var retorno = service.EMPRPROT(cnpjEmpresa.toUpperCase());
		
		log.info ("DATASET dsUnidadeTotvsGestContratoJur PTO 6" + retorno);
		
		var arrayListaEmpresas = retorno.getLISTAEMP();
	    
		log.info ("DATASET  dsUnidadeTotvsGestContratoJur  - dsUnidadeTOTVS PTO 7" + arrayListaEmpresas);
	    
	  	for (var i = 0; i < arrayListaEmpresas.length; i++) {
			var r = arrayListaEmpresas[i];
			newDataset.addRow(new Array(r.getCC_CNPJ(),r.getCC_CODIGO(),r.getCC_FILIAL(),r.getCC_NMEMPR(),r.getCC_NMFIL(),
									   r.getCC_END(),r.getCC_MUN(),r.getCC_EST(),r.getCC_CEP()));
			
			log.info ("r.getCC_CNPJ(): " + r.getCC_CNPJ() +
					  "r.getCC_CODIGO(): " + r.getCC_CODIGO() +
					  "r.getCC_FILIAL(): " + r.getCC_FILIAL() +
					  "r.getCC_NMEMPR(): " + r.getCC_NMEMPR() +
					  "r.getCC_NMFIL(): " + r.getCC_NMFIL()  +
					  "r.getCC_END(): " + r.getCC_END() +
					  "r.getCC_MUN(): " + r.getCC_MUN() +
					  "r.getCC_EST(): " + r.getCC_EST() +
					  "r.getCC_CEP(): " + r.getCC_CEP()
					  );
		}
			
	  	log.info ("DATASET dsUnidadeTotvsGestContratoJur PTO 8");
	} // try 
	catch(error) {
		log.info (" ++ DATASET dsUnidadeTotvsGestContratoJur - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro",error.message,"erro","erro","erro","erro","erro","erro","erro")); 
	}
	
	return newDataset;	
}