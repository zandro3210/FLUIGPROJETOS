function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	
	log.info("Dataset dsAlcadaAprovacaoItens - INICIO");
	
	newDataset.addColumn("OPCAO");
	newDataset.addColumn("ITEM");
	newDataset.addColumn("CODPROD");
	newDataset.addColumn("DESCPROD");
	newDataset.addColumn("QTDE");
	newDataset.addColumn("VLRUNITARIO");
	newDataset.addColumn("VLRTOTAL");
	newDataset.addColumn("DETALHES");
	newDataset.addColumn("CTACONTAB");
	newDataset.addColumn("NECESSIDADE");
	newDataset.addColumn("TIPOOPERACAO");
	newDataset.addColumn("JUSTIFICATIVA");
	newDataset.addColumn("OBSERVACAO");

	var chaveZXS ;
	var idProc;

	log.info("Dataset dsAlcadaAprovacaoItens - VALIDANDO CONSTRAINTS E FIELDS");

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
	
	//	var chaveZXS = "0001SC095944";
	//	var chaveZXS = "0001PCM006142";
	//	var chaveZXS = "0001MDM00287";
	//	var idProc = 169228;
	
	log.info("Dataset dsAlcadaAprovacaoItens - VALOR DO chaveZXS...:" + chaveZXS);
	log.info("Dataset dsAlcadaAprovacaoItens - Solicitacao do Fluig...:" + idProc);
	
	var NOME_SERVICO = "WSGETDATAALCAPR";
	var CAMINHO_SERVICO = "com.totvs.protheus.alcadaaprov.WSGETDATAALCAPR";		
	var servico = ServiceManager.getService(NOME_SERVICO);
	log.info("Dataset dsAlcadaAprovacaoItens - SERVICO:" + servico);
	
	var instancia = servico.instantiate(CAMINHO_SERVICO);
	log.info("Dataset dsAlcadaAprovacaoItens - instancia:" + instancia);
	var ws = instancia.getWSGETDATAALCAPRSOAP();
	
	try {
		
		log.info("Dataset dsAlcadaAprovacaoItens - Ponto1 - RETORNO getWSGETDATAALCAPRSOAP:" + ws);
		
		var process = ws.fgetdata(chaveZXS,idProc);
		var opcao = process.getOPCAO();
		var dados = null;
		var itens = null;

		log.info("Dataset dsAlcadaAprovacaoItens - Ponto2 - chaveZXS:" + chaveZXS + " - OPCAO: " + opcao);
		
		if(opcao != 3) {
			dados = process.getRETSC1SC7();
			itens = dados.getITENS().getARRAYITENSGETDATAALCAPR();
			for(var i=0; i<itens.size();i++){
				var item = itens.get(i);
				
				newDataset.addRow(new Array(opcao,
						item.getITEM(),
						item.getCODPROD(),
						item.getDESCPROD(),
						item.getQTDE(),
						parseFloat(item.getVLRUNIT()).toFixed(2),
						parseFloat(item.getVLRTOTAL()).toFixed(2),
						item.getDETALHES(),
						item.getCTACONTAB(),
						item.getNECESSIDA().toString(),
						item.getTIPOOPERA(),
						item.getJUSTIFICA(),
						item.getOBSERVACA()
				));
			}
		} else {
			// se for medicao 

			dados = process.getRETTIPOMD();
			itens = dados.getITENS().getRETTIPOMDITENSGETDATAALCAPR();
			for(var i=0; i<itens.size();i++){
				var item = itens.get(i);
				// regra nova 27/03/2015 - a pedido diogo --> se quantidade for < 1 entao nao mostrar o item zerado				
				if (item.getQTDE() >= 1) {
					newDataset.addRow(new Array(opcao,
												item.getITEM(),
												item.getCODPROD(),
												item.getDESCPROD(),
												item.getQTDE(),
												parseFloat(item.getVLRUNIT()).toFixed(2),
												parseFloat(item.getVLRTOTAL()).toFixed(2),
												"",
												item.getCTACONTAB(),
												"",
												"",
												"",
												item.getOBSERVACA()
									));
				} // if
			} // for
		} // else
		
		log.info("Dataset dsAlcadaAprovacaoItens - PTO 3 - ANTES RETORNO DATASET TRY");
		return newDataset;
		
	} catch (e) {
		newDataset.addRow(new Array("Dataset dsAlcadaAprovacaoItens - ERRO:" + e.message, "", "", "", "", "", "", "", "", "", "","", "", "")); 
	}
	
	return newDataset;

}