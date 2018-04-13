function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	
	log.info("Dataset dsAlcadaAprovacao - INICIO");
	
	newDataset.addColumn("OPCAO");
	newDataset.addColumn("STATUS");
	newDataset.addColumn("DESCRICAO");
	newDataset.addColumn("NUMPEDIDO");
	newDataset.addColumn("UNIDADE");
	newDataset.addColumn("NOMEDEST");
	newDataset.addColumn("EMAILDEST");
	newDataset.addColumn("CENTROCUS");
	newDataset.addColumn("ITEMCONTA");
	newDataset.addColumn("NOMESOLIC");
	newDataset.addColumn("EMAILSOLIC");
	newDataset.addColumn("FORNECEDOR");
	newDataset.addColumn("VALORTOTAL");
	newDataset.addColumn("EMISSAO");
	newDataset.addColumn("MENSAGEM");
	newDataset.addColumn("TITULO");
	//contratos
	newDataset.addColumn("COMPET");
	newDataset.addColumn("DESCCONTRA");
	newDataset.addColumn("MEDICAO");
	newDataset.addColumn("NRCONTRATO");
	newDataset.addColumn("VIGENCIA");
	
	var idProc;
	var chaveZXS ;

	log.info("Dataset dsAlcadaAprovacao - VALIDACAO CONSTRAINTS E FIELDS");
	
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
	
	//chaveZXS = "0001SC095944";
	//chaveZXS = "0001PCM006182";
	//chaveZXS = "0001PCM005704";
	//idProc = 169631;
	
	log.info("Dataset dsAlcadaAprovacao - VALOR DO chaveZXS...:" + chaveZXS);
	log.info("Dataset dsAlcadaAprovacao - Solicitacao do Fluig...:" + idProc);
	
	try {
		
		var NOME_SERVICO = "WSGETDATAALCAPR";
		var CAMINHO_SERVICO = "com.totvs.protheus.alcadaaprov.WSGETDATAALCAPR";		
		var servico = ServiceManager.getService(NOME_SERVICO);
		log.info("Dataset dsAlcadaAprovacao - Solicitacao Fluig:" + idProc + " - SERVICO:" + servico);
		
		var instancia = servico.instantiate(CAMINHO_SERVICO);
		log.info("Dataset dsAlcadaAprovacao - instancia:" + instancia);
		
		var ws = instancia.getWSGETDATAALCAPRSOAP();
		
		log.info("Dataset dsAlcadaAprovacao - Solicitacao Fluig:" + idProc + " - Ponto1 - RETORNO getWSGETDATAALCAPRSOAP:" + ws);
		
		var process = ws.fgetdata(chaveZXS,idProc);
		var opcao = process.getOPCAO();
		
		var dados = null;
		
		log.info("Dataset dsAlcadaAprovacao - Solicitacao Fluig:" + idProc + " - Ponto2 - chaveZXS:" + chaveZXS + " - OPCAO: " + opcao);
		
		if(opcao != 3) {
			dados = process.getRETSC1SC7();
			
			newDataset.addRow(new Array(opcao,
					process.isSTATUS(),
					process.getDESCRICAO(),
					dados.getNMSOLORPED(),
					process.getUNIDADE(),
					dados.getNOMEDEST(),
					dados.getEMAILDEST(),
					dados.getCENTROCUS(),
					dados.getITEMCONTA(),
					findNomeByEmail(dados.getEMAILSOLC()),
					dados.getEMAILSOLC(),
					dados.getFORNECEDOR(),
					parseFloat(dados.getVALORTOTAL()).toFixed(2),
					dados.getEMISSAO(),
					dados.getMENSAGEM(),
					setaTitulo(opcao),
					"","","","",""
					));
		} else {
			dados = process.getRETTIPOMD();
			
			newDataset.addRow(new Array(opcao,
					process.isSTATUS(),
					process.getDESCRICAO(),
					dados.getNUMMEDICAO(),
					process.getUNIDADE(),
					dados.getNOMEDEST(),
					dados.getEMAILDEST(),
					dados.getCENTROCUS(),
					dados.getITEMCONTA(),
					findNomeByEmail(dados.getEMAILSOLC()),
					dados.getEMAILSOLC(),
					dados.getFORNECEDOR(),
					parseFloat(dados.getVALORTOTAL()).toFixed(2),
					"",
					"",
					setaTitulo(opcao),
					//contratos
					dados.getCOMPET(),
					dados.getDESCCONTRA(),
					dados.getMEDICAO(),
					dados.getNRCONTRATO(),
					dados.getVIGENCIA()
					));
		}
		
		log.info("Dataset dsAlcadaAprovacao - Solicitacao Fluig:" + idProc + " - PTO 3 - ANTES RETORNO DATASET TRY");
		return newDataset;

	}
	catch (e) {
		newDataset.addRow(new Array("Dataset dsAlcadaAprovacao - ERRO:" + e.message, "", "", "", "", "", "", "", "", "", "","", "", "", "", "", "", "")); 
	}
	
	return newDataset;
}
function findNomeByEmail(email) {
	var nome = "";
	if(email != null && email != "") { 
		try {
			var cEmail = DatasetFactory.createConstraint("mail", email, email, ConstraintType.MUST);
			var fields = new Array("colleagueId","colleagueName");
			var colaborador = DatasetFactory.getDataset("colleague", fields, new Array(cEmail), null);
			
			if(colaborador.values.length > 0) {
				nome = colaborador.getValue(0, "colleagueName");
			}
		} catch (e) {
			return e.message; 
		}
	}
		
	return nome;
}

function setaTitulo(opcao) {
	log.info("Dataset dsAlcadaAprovacao - FUNCAO setaTitulo - INICIO ");
	
	// 1 = Solicitacao Compra
	// 2 = Pedido Compra
	// 3 = Medicao de contrato
	var titulo; 
	log.info("Dataset dsAlcadaAprovacao - FUNCAO setaTitulo - opcao:" + opcao);
	
	if(opcao == 1) {
		titulo = "SOLICITA\u00C7\u00C3O DE COMPRA ";
	} else if (opcao == 2){
		titulo = "PEDIDO DE COMPRA ";
	}
	else if (opcao == 3){
		titulo = "MEDI\u00C7\u00C3O DE CONTRATO ";
	}
	log.info("Dataset dsAlcadaAprovacao - FUNCAO setaTitulo - titulo: " + titulo);
	
	return titulo;
}