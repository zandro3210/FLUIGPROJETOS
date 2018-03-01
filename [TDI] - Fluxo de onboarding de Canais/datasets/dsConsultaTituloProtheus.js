function createDataset(fields, constraints, sortFields) {

	try{
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
		
		newDataset.addColumn("CE_CODIGO");
		newDataset.addColumn("CE_LOJA");
		newDataset.addColumn("CE_NUMTIT");
		newDataset.addColumn("CE_PARCELA");
		newDataset.addColumn("CE_PEFIXO");
		newDataset.addColumn("CE_TIPO");
		newDataset.addColumn("CE_VALOR");
		newDataset.addColumn("CE_INSS");
		newDataset.addColumn("CE_ISS");
		newDataset.addColumn("CE_IRRF");
		newDataset.addColumn("CE_CSLL");
		newDataset.addColumn("CE_PIS");
		newDataset.addColumn("CE_COFINS");
		
		
		log.info ("DATASET dsConsultaTituloProtheus - PTO 1");
	
		//desenv
		//var integracao = ServiceManager.getService('FLUIG3');
		
		//producao
		var integracao = ServiceManager.getService('FLUIG3');
		
		log.info ("DATASET dsConsultaTituloProtheus - PTO 2 - servico ok");
		
		//2- Locator
			// TESTE
			//var serviceLocator = integracao.instantiate('_197._102._16._172.FLUIGLocator');
			//PRODUCAO 
			//var serviceLocator = integracao.instantiate('br.com.totvs.wsautoatendimento.wscorp.FLUIGLocator');

			// com o pacote pkgWkfSolicPagamento definido
			var serviceLocator = integracao.instantiate('pkgWkfSolicPagamento.FLUIGLocator');

		
		log.info ("DATASET dsConsultaTituloProtheus - PTO 3 - instantiate ok");
		
		//3- metodo dentro do Locator - Soap
		var service = serviceLocator.getFLUIGSOAP();
	
		log.info ("DATASET dsConsultaTituloProtheus - PTO 4 - metodo getFLUIGSOAP ok");
		
		
		if (constraints != null) {
			
			var cdEmp 	  = constraints[0].getInitialValue(); // empresa pagadora
			var cdFilial  = constraints[1].getInitialValue(); // empresa pagadora
			var cdTitulo  = constraints[2].getInitialValue();
			var cdPrefixo = constraints[3].getInitialValue();
			var cnpj 	  = constraints[4].getInitialValue(); // cnpj fornecedor
			var codForn   = constraints[5].getInitialValue(); // cod  fornecedor
			var lojaForn  = constraints[6].getInitialValue(); // loja fornecedor
			
			log.info("DATASET dsConsultaTituloProtheus - constraint - PTO 5: " + 
					cdEmp + " - " + cdFilial + " - " + cdTitulo  + " - " + cdPrefixo + " - " + cnpj + " - " + codForn + " - " + lojaForn);
			
			// Invoca o servico
			var retorno = service.CONSPAG(cdEmp,cdFilial,cdTitulo,cdPrefixo,cnpj,codForn.toString(),lojaForn.toString());
			
			log.info ("DATASET dsConsultaTituloProtheus - constraint - PTO 6:" + retorno);
			
			var arrayListaTitulo = retorno.getLISTACPAG();
		    
			log.info ("DATASET  dsConsultaTituloProtheus - constraint - PTO 7:" + arrayListaTitulo);
		  	for (var i = 0; i < arrayListaTitulo.length; i++) {
				var r = arrayListaTitulo[i];
				newDataset.addRow(new Array(r.getCE_CODIGO(),r.getCE_LOJA(),r.getCE_NUMTIT(),r.getCE_PARCELA(),r.getCE_PEFIXO(),r.getCE_TIPO(),r.getCE_VALOR(),r.getCE_INSS(),r.getCE_ISS(), r.getCE_IRRF(), r.getCE_CSLL(), r.getCE_PIS(), r.getCE_COFINS()));
				log.info ("r.getCE_CODIGO(): " + r.getCE_CODIGO() +
						  "r.getCE_LOJA(): " + r.getCE_LOJA() +
						  "r.getCE_NUMTIT(): " + r.getCE_NUMTIT() +
						  "r.getCE_PARCELA(): " + r.getCE_PARCELA() +
						  "r.getCE_PEFIXO(): " + r.getCE_PEFIXO() +
						  "r.getCE_TIPO(): " + r.getCE_TIPO() +
						  "r.getCE_VALOR(): " + r.getCE_VALOR() +
						  "r.getCE_INSS(): " + r.getCE_INSS()	+
						  "r.getCE_ISS(): " + r.getCE_ISS()	+
						  "r.getCE_IRRF(): " + r.getCE_IRRF()	+
						  "r.getCE_CSLL(): " + r.getCE_CSLL()	+
						  "r.getCE_PIS(): " + r.getCE_PIS()	+
						  "r.getCE_COFINS(): " + r.getCE_COFINS());
			}
					
		  	log.info ("DATASET dsConsultaTituloProtheus - constraint - PTO 8 - fim");
		}	
	} // try 
	catch(error) {
		log.info (" ++ DATASET dsConsultaTituloProtheus - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro", error.message, "erro","erro","erro","erro", "erro", "erro", "erro", "erro", "erro", "erro", "erro")); 
	}
	
	return newDataset;	
}