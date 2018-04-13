function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	
	log.info("***Entrou Dataset dsAlcadaAprovacao");
	
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
//	var chaveZXS = "0001PCM006182";
//	var chaveZXS = "0001MDM00287";
	
	//idProc = 248038;
	
	log.info("VALOR DO chaveZXS...:" + chaveZXS);
	log.info("Solicitacao do Fluig...:" + idProc);
	
	var NOME_SERVICO = "WSGETDATAALCAPR";
	var CAMINHO_SERVICO = "com.totvs.protheus.alcadaaprov.WSGETDATAALCAPR";		
	var servico = ServiceManager.getService(NOME_SERVICO);
	log.info("SERVICO:" + servico);
	var instancia = servico.instantiate(CAMINHO_SERVICO);
	log.info("instancia:" + instancia);
	var ws = instancia.getWSGETDATAALCAPRSOAP();
	
	log.info("Ponto1:" + ws);
	
	try {
		var process = ws.fgetdata(chaveZXS,idProc);
		var opcao = process.getOPCAO();
		
		var dados = null;
		
		log.info("Ponto2:" + chaveZXS);
		
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
			return newDataset;

	} catch (e) {
		newDataset.addRow(new Array("erro Dataset dsAlcadaAprovacao:" + e.message, "", "", "", "", "", "", "", "", "", "","", "", "", "", "", "", "")); 
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
		// 1 = Solicitacao Compra
		// 2 = Pedido Compra
		// 3 = Medicao de contrato
	var titulo;
		if(opcao == 1) {
			titulo = "SOLICITA\u00C7\u00C3O DE COMPRA ";
		} else if (opcao == 2){
			titulo = "PEDIDO DE COMPRA ";
		}
		else if (opcao == 3){
			titulo = "MEDI\u00C7\u00C3O DE CONTRATO ";
		}
		return titulo;
	}