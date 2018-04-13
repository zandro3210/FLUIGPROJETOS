function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	
	log.info("Entrou Dataset dsAlcadaAprovacaoSolic - INICIO");
	
	newDataset.addColumn("SOLICITACAO");
	
	var chaveZXS ;
	var idProc;

	log.info("Dataset dsAlcadaAprovacaoSolic - VALIDACAO CONSTRAINTS E FIELDS");
	
	if (constraints != null) {
		for(var c in constraints){
			if (constraints[c].getFieldName() == "chaveZXS"){
				chaveZXS = constraints[c].getInitialValue(); 
			}
			
			if (constraints[c].getFieldName() == "idProc"){
				idProc = constraints[c].getInitialValue(); 
			}
		}
	}
	
	chaveZXS = "0501SC000464";
	//chaveZXS = "0001PCM006142";
	//chaveZXS = "0001MDM00287";
	//chaveZXS = "0001PCM003152";
	//idProc = 169228;
	idProc = "252029";
	
	log.info("Dataset dsAlcadaAprovacaoSolic - VALOR DO chaveZXS...:" + chaveZXS);
	log.info("Dataset dsAlcadaAprovacaoSolic - Solicitacao do Fluig...:" + idProc);
	
	var NOME_SERVICO = "WSGETDATAALCAPR";
	var CAMINHO_SERVICO = "com.totvs.protheus.alcadaaprov.WSGETDATAALCAPR";		
	var servico = ServiceManager.getService(NOME_SERVICO);
	log.info("Dataset dsAlcadaAprovacaoSolic - SERVICO:" + servico);
	
	var instancia = servico.instantiate(CAMINHO_SERVICO);
	log.info("Dataset dsAlcadaAprovacaoSolic - instancia:" + instancia);
	
	var ws = instancia.getWSGETDATAALCAPRSOAP();
	
	log.info("Dataset dsAlcadaAprovacaoSolic - Ponto1 - RETORNO getWSGETDATAALCAPRSOAP:" + ws);
	
	try {
		var process = ws.fgetdata(chaveZXS,idProc);
		
		log.info("Dataset dsAlcadaAprovacaoSolic - Ponto1.5 - processo:" + process);
		
		var opcao = process.getOPCAO();
		
		log.info("Dataset dsAlcadaAprovacaoSolic - Ponto2 - chave:" + chaveZXS + " - opcao: " + opcao);
		
		var solicitacoes = process.getIDPROCESS().getSTRING();
		
		log.info("Dataset dsAlcadaAprovacaoSolic - Ponto3 - solicitacoes.size():" + solicitacoes.size());
		
		var solicitacao ;
		for(var i=0; i<solicitacoes.size()+1;i++){
			solicitacao = solicitacoes.get(i);
			log.info("Dataset dsAlcadaAprovacaoSolic - Ponto4 - encontrou solic:" + solicitacao);
			newDataset.addRow(new Array(solicitacao));
		}
		log.info("Dataset dsAlcadaAprovacaoSolic - PTO 5 - ANTES RETORNO DATASET TRY");
		return newDataset;

	} catch (e) {
		newDataset.addRow(new Array("Dataset dsAlcadaAprovacaoSolic ERRO:" + e.message)); 
	}
	
	return newDataset;
}