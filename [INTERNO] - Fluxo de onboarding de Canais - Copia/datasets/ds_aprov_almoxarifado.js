function createDataset(fields, constraints, sortFields) {
	
	var NOME_SERVICO = "wsEcmCrm";
	var CAMINHO_SERVICO = "localhost.WSECMCRMLocator";		
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("dataNecessid");
	newDataset.addColumn("dataSolicit");
	newDataset.addColumn("item");
	newDataset.addColumn("numSol");
	newDataset.addColumn("produto");
	newDataset.addColumn("qtde");
	newDataset.addColumn("solicitante");
	
	
	var solicitacaoId = "54960";
	if (constraints != null) {
		for(var c in constraints){
			if (constraints[c].getFieldName() == "solicitacao"){
				solicitacaoId = constraints[c].getInitialValue(); 
			} 
		}
	}
	
	var servico = ServiceManager.getService(NOME_SERVICO);
	log.info("Servico: " + servico);

	var instancia = servico.instantiate(CAMINHO_SERVICO);
	log.info("Instancia: " + instancia);

	var ws = instancia.getWSECMCRMSOAP();
	
	log.info("solicitacaoId: " + solicitacaoId);
		
	try {
		var solicitacao = ws.ENVIASOLALM(solicitacaoId);	
		
		if (!isEmpty(solicitacao)) {
			
			log.info("solicitacao: " + solicitacao.getNUMSOL());
			
			newDataset.addRow(new Array(solicitacao.getDATANEC(), 
					solicitacao.getDATASOL(), 
					solicitacao.getITEM(), 
					solicitacao.getNUMSOL(), 
					solicitacao.getPRODUTO(), 
					solicitacao.getQUANTIDADE(), 
					solicitacao.getSOLICITANTE())); 
			return newDataset;
		}		
		
		
	} catch (e) {
		newDataset.addRow(new Array(e.message, "", "", "", "", "", "")); 
	}
	
	return newDataset;
	

	function isEmpty(v) {
		return v == null || v.length == 0;
	}
	
}