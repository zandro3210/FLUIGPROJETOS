function createDataset(fields, constraints, sortFields) {

	//servico FLUIG
	try{
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
	
		log.info (" novo 18/08 DATASET dsAprovadoresFaixaValorProtheus - INICIO");
	
		newDataset.addColumn("CK_CPFAPRO");	  	// COLUNA 0 
		newDataset.addColumn("CK_EMAIL");	  	// COLUNA 1
		newDataset.addColumn("CK_NMAPROV");		// COLUNA 2
		newDataset.addColumn("CK_CARGOAPR");	// COLUNA 3
		newDataset.addColumn("CK_NIVEL");		// COLUNA 4
		newDataset.addColumn("CK_VLRMIN");		// COLUNA 5
		newDataset.addColumn("CK_VLRMAX");		// COLUNA 6
		
		log.info ("DATASET dsAprovadoresFaixaValorProtheus - PTO 1");
		
		var integracao = ServiceManager.getService('FLUIG4V2');
		log.info ("DATASET dsAprovadoresFaixaValorProtheus - PTO 2 - getService ok");
		
		//2- Locator
			// TESTE
			//var serviceLocator = integracao.instantiate('_197._102._16._172.FLUIGLocator');
		
			//PRODUCAO 
			//var serviceLocator = integracao.instantiate('br.com.totvs.wsautoatendimento.wscorp.FLUIGLocator');
			
			// com o pacote pkgWkfSolicPagamento definido
			var serviceLocator = integracao.instantiate('pkgWkfSolicPagamento.FLUIGLocator');
		
		
		log.info ("DATASET dsAprovadoresFaixaValorProtheus - PTO 3 - instantiate ok");
		
		//3- metodo dentro do Locator - Soap
		var service = serviceLocator.getFLUIGSOAP();
		log.info ("DATASET dsAprovadoresFaixaValorProtheus - PTO 4 - getFLUIGSOAP ok");
		
		var cdEmpresa = "";
		var cdFilial = "";
		//var cdCpf = "";
		var cdCcusto = "";
		var cdItemCtbl = "";
		var cdValor = "";
		var emailSolic = "";


		//TESTE
		var cdEmpresa = "00";
		var cdFilial = "00001000100";
		var cdCcusto = "4A3300600";
		var cdItemCtbl = "0005";
		var cdValor = "180500";
		var emailSolic = "paulo.rsouza@totvs.com.br";

		log.info (	"DATASET dsAprovadoresFaixaValorProtheus - DADOS : " +
				"cdEmpresa: " + cdEmpresa +
				"cdFilial: " + cdFilial +
				"cdCcusto: " + cdCcusto +
				"cdItemCtbl: " + cdItemCtbl +
				"cdValor: " + cdValor +
				"emailSolic: " + emailSolic		
				);

		//teste
		//newDataset.addRow(new Array("02853029905","cristina.poffo@totvs.com.br","CRISTINA M POFFO", "80","1","100","1000"));
		// newDataset.addRow(new Array("xxxxxxxxx","gisele.lima@totvs.com.br","gisele.lima", "80","1","100","1000"));
		
		// chamada antes T12
		//var retorno = service.APROVSP(cdEmpresa,cdFilial,cdCpf,parseFloat(cdValor));
		
		//alterados parametros para o T12	
		//Empresa, Filial, Centro de Custo, Item Contábil, Valor
		var retorno = service.APROVSP(cdEmpresa,cdFilial,cdCcusto, cdItemCtbl,parseFloat(cdValor),emailSolic);
		
		log.info ("DATASET dsAprovadoresFaixaValorProtheus - PTO 5 - APROVSP ok - retorno:" + retorno );
		
		var arrayListaPr = retorno.getLISTAPR();


		if (arrayListaPr){
			if (arrayListaPr.length > 0) {
				log.info ("DATASET dsAprovadoresFaixaValorProtheus - PTO 6 - getLISTAPR ok - arrayListaPr: " + arrayListaPr.length);
			    
				for (var i = 0; i < arrayListaPr.length; i++) {
					var r = arrayListaPr[i];
					log.info ("DATASET dsAprovadoresFaixaValorProtheus - PTO 6.5 " +
							  "- getCK_CPFAPRO: " + r.getCK_CPFAPRO() + 
							  "- getCK_EMAIL: " + r.getCK_EMAIL() +
							  "- getCK_NMAPROV: " + r.getCK_NMAPROV() +
							  "- getCK_CARGOAPR: " + r.getCK_CARGOAPR() +
							  "- getCK_NIVEL: " + r.getCK_NIVEL() +
							  "- getCK_VLRMIN: " + r.getCK_VLRMIN() +
							  "- getCK_VLRMAX: " + r.getCK_VLRMAX() 
							 );
					
					newDataset.addRow(new Array(r.getCK_CPFAPRO(),
												r.getCK_EMAIL(),
												r.getCK_NMAPROV(),
												r.getCK_CARGOAPR(),
												r.getCK_NIVEL(),
												r.getCK_VLRMIN(),
												r.getCK_VLRMAX()
												)
									 );
				}
			}
		}
		
		
		log.info ("DATASET dsAprovadoresFaixaValorProtheus PTO 7 - FIM OK");
	
	} // try 
	catch(error) {
		log.info (" ++ DATASET dsAprovadoresFaixaValorProtheus - PTO 8 - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro", error.message, "erro", "erro", "erro", "erro", "erro")); 
	}

	return newDataset;

}