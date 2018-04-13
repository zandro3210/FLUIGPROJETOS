function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();

	log.info("***Entrou Dataset dsCentrosCustoVP");

	// DADOS DA CONTA
	newDataset.addColumn("vpnome");
	newDataset.addColumn("vpemail");
	newDataset.addColumn("codccusto");
	newDataset.addColumn("nomeccusto");

	var list = new Array();

	try {

		var NOME_SERVICO = "WSRMSERVICE";
		var CAMINHO_SERVICO = "br.com.totvs.br.WsGlbSSL";
		var servico = ServiceManager.getService(NOME_SERVICO);
		log.info("Dataset dsCentrosCustoVP - SERVICO:" + servico);
		var instancia = servico.instantiate(CAMINHO_SERVICO);
		log.info("Dataset dsCentrosCustoVP - instancia:" + instancia);
		var ws = instancia.getWsGlbSSLSoap();

		log.info("***Dataset dsCentrosCustoVP - instanciou o servico: - constraints"
						+ constraints);

		// var emailVP = "alexandre.mafra@totvs.com.br"
		// var c1 = DatasetFactory.createConstraint("emailVp",
		// "alexandre.mafra@totvs.com.br", "alexandre.mafra@totvs.com.br",
		// ConstraintType.MUST);
		// var c2 = DatasetFactory.createConstraint("emailVp",
		// "marceloc@totvs.com.br", "alexandre.mafra@totvs.com.br",
		// ConstraintType.MUST);
		//	
		// constraints = new Array(c1);

		if (constraints != null) {
			for (var x = 0; x < constraints.length; x++) {
				var emailVP = constraints[x].getInitialValue();				
				log.info ( "Dataset dsCentrosCustoVP - " + x + " - emailVP.indexOf(@):" + emailVP.indexOf("@"));
				
				if (emailVP.indexOf("@") != -1) {
					var dataset = DatasetFactory.getDataset("pass_validate_rm", null, null, null);
					var json = dataset.getValue(0, "USER");
					var obj = JSON.parse(json);
					
					var codUsuario = obj.user;
					var senha = obj.pass;
					var codColigada = 0;
					var codAplicacao = "V";
					var codSentenca = "INTEGR_FLG.12";
					var xmlParamsValue = "<PARAM><VPMAIL>" + emailVP
							+ "</VPMAIL></PARAM>";

					var retorno = ws.getResultSQL(codUsuario, senha,
							codColigada, codAplicacao, codSentenca,
							xmlParamsValue, false);

					log.info("Dataset dsCentrosCustoVP - retorno: " + retorno);
					
					if (retorno.indexOf("<VP>") != -1) {
					
						var rows = retorno.split("<Row>");
	
						for (var i = 0; i < rows.length; i++) {
	
							if (i == 0) {
								i++;
							}
							var row = rows[i];
	
							// nome vp
							log.info ( "Dataset dsCentrosCustoVP - " + x + " - row.indexOf(<VP>) + 4:" + row.indexOf("<VP>") + 4);
							
							var vpIni = (row.indexOf("<VP>") + 4);
							var vpFim = (row.indexOf("</VP>"));
							var vp = row.substring(vpIni, vpFim).trim();
	
							log.info ("Dataset dsCentrosCustoVP - DADOS DSCENTROCUSTOVP - antes email");
							
							// email vp
							log.info ("Dataset dsCentrosCustoVP - " +  x + " - row.indexOf(<EMAILVP>) + 9:" + row.indexOf("<EMAILVP>") + 9);
							
							var emailVpIni = (row.indexOf("<EMAILVP>") + 9);
							var emailVpFim = (row.indexOf("</EMAILVP>"));
							var emailVp = row.substring(emailVpIni, emailVpFim)
									.trim();
							
							log.info ("Dataset dsCentrosCustoVP - DADOS DSCENTROCUSTOVP - depos email: " + emailVp);
	
							// codigo centro de custo
							log.info ("Dataset dsCentrosCustoVP - " + x + " - row.indexOf(<CODCCUSTO>) + 11:" + row.indexOf("<CODCCUSTO>") + 11);
							
							var codCCustoIni = (row.indexOf("<CODCCUSTO>") + 11);
							var codCCustoFim = (row.indexOf("</CODCCUSTO>"));
							var codCCusto = row.substring(codCCustoIni,
									codCCustoFim).trim();
	
							// descricao centro de custo
							log.info ("Dataset dsCentrosCustoVP - " + x + " - row.indexOf(<NOMECENTROCUSTO>) + 17:" + row.indexOf("<NOMECENTROCUSTO>") + 17);
							
							var nomeCCustoIni = (row.indexOf("<NOMECENTROCUSTO>") + 17);
							var nomeCCustoFim = (row.indexOf("</NOMECENTROCUSTO>"));
							var nomeCCusto = row.substring(nomeCCustoIni,
									nomeCCustoFim).trim();
	
							var achou = false;
							for (var y = 0; y < list.length; y++) {
								if (codCCusto == list[y].centrocusto) {
									achou = true;
									break;
								}
							}
	
							// adiciona se nao existe na list
							if (!achou) {
								// cria objeto e insere no array
								var vpCentroCusto = new Object();
								vpCentroCusto.nomevp = vp;
								vpCentroCusto.emailvp = emailVP;
								vpCentroCusto.centrocusto = codCCusto;
								vpCentroCusto.descricao = nomeCCusto;
	
								list.push(vpCentroCusto);
							}
						}
	
						// popula o dataset
						for (var i = 0; i < list.length; i++) {
							var vp = list[i].nomevp;
							var email = list[i].emailvp;
							var ccusto = list[i].centrocusto;
							var descrccusto = list[i].descricao;
	
							newDataset.addRow(new Array(vp, email, ccusto,
									descrccusto));
							
							log.info ("Dataset dsCentrosCustoVP - POPULA DATASET: " + vp + " - "+
									+ email + " - "+
									+ ccusto + " - "+
									+ descrccusto);
						}
					} else {
						newDataset.addRow(new Array("Atenção: "	+ "VP " + emailVP + " sem centro de custo vinculado no RM", "", "", ""));
					}
				}
			}
		} else {
			newDataset.addRow(new Array("Nenhum VP encontrado para o BC logado, verifique o cadastro VP X Business Controller", "", "", ""));
		}
	} catch (e) {
		newDataset.addRow(new Array("erro Dataset dsCentrosCustoVP: "
				+ e.message, "", "", ""));
	}
	return newDataset;
}
