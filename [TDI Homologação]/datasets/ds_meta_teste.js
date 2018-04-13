function createDataset(fields, constraints, sortFields) {
	
	var NOME_SERVICO = "wsEcmCrm";
	var CAMINHO_SERVICO = "localhost.WSECMCRMLocator";		
	var newDataset = DatasetBuilder.newDataset();
	
	log.info("Entrou Dataset");
	
	newDataset.addColumn("aprovador");
	newDataset.addColumn("solicitante");
	newDataset.addColumn("dataAlt");
	newDataset.addColumn("segmento");
	newDataset.addColumn("linhaReceita");
	newDataset.addColumn("dataMeta");
	newDataset.addColumn("valorAnt");
	newDataset.addColumn("valorAtual");
	/*
	if (constraints != null) {
		for(var c in constraints){
			if (constraints[c].getFieldName() == "meta"){
				metaId = constraints[c].getInitialValue(); 
			} 
		}
	}
	*/
	var metaId = "000186";
	
	log.info("VALOR DO METAID...:" + metaId);
	
	log.info("Ponto2 Dataset");
	
	var servico = ServiceManager.getService(NOME_SERVICO);
	log.info("Servico: " + servico);

	var instancia = servico.instantiate(CAMINHO_SERVICO);
	log.info("Instancia: " + instancia);

	var ws = instancia.getWSECMCRMSOAP();
	
	log.info("Ponto3 Dataset");
	
	log.info("metaId...:" + metaId);
	
	try {
		var meta = ws.ENVIAAPRMET(metaId);
		
		log.info("Ponto4 Dataset");
		
		var it = meta.getITENSAPR();
		var itens = it.getITENSAPRMET();

		if (isEmpty(itens)) {
			
			log.info("Ponto5 Dataset");
			newDataset.addRow(new Array(meta.getAPROVADOR(), 
					meta.getSOLICITANTE(), 
					meta.getDATAALT(), 
					"",
					"",
					"",
					"",
					"")); 
			return newDataset;
		}
		if (!isEmpty(itens)) {
			log.info("Ponto6 Dataset");
			for (var i=0;i<itens.length;i++) {
				var g = itens[i];
				log.info("item: " + g);
				newDataset.addRow(new Array(meta.getAPROVADOR(), 
											meta.getSOLICITANTE(), 
											meta.getDATAALT(), 
											g.getSEGMENTO(),
											g.getLINHAREC(),
											g.getDATAALT(),
											g.getVALOROLD(),
											g.getVALORNEW())); 
				log.info("aprov...:" + meta.getAPROVADOR());
			}
		} 
		
	} catch (e) {
		newDataset.addRow(new Array(e.message,"", "", "", "", "", "", "", "")); 
	}
	
	log.info("Ponto7 Dataset");
	return newDataset;
	

	function isEmpty(v) {
		return v == null || v.length == 0;
	}
	
}