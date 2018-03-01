function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	
	log.info("***Entrou Dataset dsEnviaQualif");
	
	//RESPONSAVEL OPORTUNIDADE CRM
	newDataset.addColumn("RESP1");
	newDataset.addColumn("RESP2");
	newDataset.addColumn("RESP3");
	//DADOS ATENDIMENTO
	newDataset.addColumn("ASSISTENTE");
	newDataset.addColumn("CAMPANHA");
	newDataset.addColumn("MIDIA");
	newDataset.addColumn("ORIGEM");
	newDataset.addColumn("OPORTUNIDADE");
	//DADOS EMPRESA
	newDataset.addColumn("NOMEENT");
	newDataset.addColumn("CODENT");
	newDataset.addColumn("RAZAO");
	newDataset.addColumn("NFANT");
	newDataset.addColumn("CNPJCPF");
	newDataset.addColumn("CNAE");
	newDataset.addColumn("SEGMENTO");
	newDataset.addColumn("ENDERECO");
	newDataset.addColumn("BAIRRO");
	newDataset.addColumn("CIDADE");
	newDataset.addColumn("CEP");
	newDataset.addColumn("ESTADO");
	newDataset.addColumn("FONE");
	newDataset.addColumn("HPAGE");
	newDataset.addColumn("FATURAMENTO");
	newDataset.addColumn("FUNCIONARIOS");
	newDataset.addColumn("OBSERVACOES");
	//DADOS DO CONTATO
	newDataset.addColumn("CONTATO");
	newDataset.addColumn("CARGO");
	newDataset.addColumn("EMAIL");
	newDataset.addColumn("CELULAR");
	//OBSERVACOES COMPLEMENTARES
	newDataset.addColumn("OBSCOMPL");
	//SCRIPT
	newDataset.addColumn("SCRIPTATEND");
	
	newDataset.addColumn("DARCODIGO");
	newDataset.addColumn("DARMAIL");
	newDataset.addColumn("DARNOME");
	newDataset.addColumn("EARCODIGO");
	newDataset.addColumn("EARMAIL");
	newDataset.addColumn("EARNOME");
	newDataset.addColumn("GARCODIGO");
	newDataset.addColumn("GARMAIL");
	newDataset.addColumn("GARNOME");
	newDataset.addColumn("DATAOPORTUNIDADE");
	newDataset.addColumn("ATENDIMENTO");
	
	processId = "239818";
	
	if (constraints != null) {
		for(var c in constraints){
			if (constraints[c].getFieldName() == "processId"){
				processId = constraints[c].getInitialValue(); 
			} 
		}
	}
	
	//var processId = "176645";
	log.info("VALOR DO processId...:" + processId);
	
	var NOME_SERVICO = "WSECMCRM5";
	var CAMINHO_SERVICO = "com.protheus.crm5.WSECMCRM";		
	var servico = ServiceManager.getService(NOME_SERVICO);
	log.info("SERVICO:" + servico);
	var instancia = servico.instantiate(CAMINHO_SERVICO);
	log.info("instancia:" + instancia);
	var ws = instancia.getWSECMCRMSOAP();
	
	log.info("Ponto1:" + ws);
	
	try {
		var process = ws.enviaqualif(processId);
		
		log.info("Ponto2:" + processId);
		
		newDataset.addRow(new Array(process.getRESP1(),
				process.getRESP2(),
				process.getRESP3(),
				//DADOS ATENDIMENTO
				process.getASSISTENTE(),
				process.getCAMPANHA(),
				process.getMIDIA(),
				process.getORIGEM(),
				process.getOPORTUNIDADE(),
				//DADOS EMPRESA
				process.getNOMEENT(),
				process.getCODIGO(),
				process.getRAZAO(),
				process.getNFANT(),
				process.getCNPJCPF(),
				process.getCNAE(),
				process.getSEGMENTO(),
				process.getENDERECO(),
				process.getBAIRRO(),
				process.getCIDADE(),
				process.getCEP(),
				process.getESTADO(),
				process.getFONE(),
				process.getHPAGE(),
				process.getFATURAMENTO(),
				process.getFUNCIONARIOS(),
				process.getOBSERVACOES(),
				//DADOS DO CONTATO
				process.getCONTATO(),
				process.getCARGO(),
				process.getEMAIL(),
				process.getCELULAR(),
				//OBSERVACOES COMPLEMENTARES
				process.getOBSCOMPL(),
				//SCRIPT
				process.getSCRIPTATEND(),
				process.getDARCODIGO(),
				process.getDARMAIL(),
				process.getDARNOME(),
				process.getEARCODIGO(),
				process.getEARMAIL(),
				process.getEARNOME(),
				process.getGARCODIGO(),
				process.getGARMAIL(),
				process.getGARNOME(),
				process.getDATAOPORTUNIDADE(),
				process.getATENDIMENTO()
			));
		
			return newDataset;
			

	} catch (e) {
		newDataset.addRow(new Array("erro Dataset DSPROSPECTCRM:" + e.message,"", "", "", "", "", "", "", "","","","", "", "", "", "", "", "", "","","","", "", "", "", "","","","","","","")); 
	}
	
	return newDataset;

}