function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();

	log.info("***Entrou Dataset dsCentroCustoPcot");

	// DADOS DA CONTA
	newDataset.addColumn("COD");
	newDataset.addColumn("DESCR");
	
	try {

		var NOME_SERVICO = "WSFORMPCOT";
		// var CAMINHO_SERVICO = "_197._102._16._172._7032.PLANOCONTAS";
		// var CAMINHO_SERVICO = "com.totvs.fluig.protheus.plano_contas.PLANOCONTAS";
		var CAMINHO_SERVICO = "br.com.totvs.formpcot.FORMPCOT";
		var servico = ServiceManager.getService(NOME_SERVICO);
		log.info("SERVICO:" + servico);
		var instancia = servico.instantiate(CAMINHO_SERVICO);
		log.info("instancia:" + instancia);
		var ws = instancia.getFORMPCOTSOAP();

		var empresa = '00';
		var filial = '00001000100';
		var centroCusto = '';

		if (constraints != null) {
			for ( var c in constraints) {
				if (constraints[c].getFieldName() == "C_EMPRESA") {
					empresa = constraints[c].getInitialValue();
				} else if (constraints[c].getFieldName() == "C_FILIAL") {
					filial = constraints[c].getInitialValue();
				} else if (constraints[c].getFieldName() == "CA_CC") {
					centroCusto = constraints[c].getInitialValue();
				}
			}
		}

		log.info("Ponto1:" + ws);

		var retorno = ws.ccpcot(empresa, filial, centroCusto);

		var contas = retorno.getCCLIST();

		var limit = -1;

		for (var i = 0; i < contas.size(); i++) {
			var conta = contas.get(i);
			newDataset.addRow(new Array(conta.getCACOD(), conta.getCADESCR()));

			if (i == limit) {
				break;
			}
		}
		
	} catch (e) {
		newDataset.addRow(new Array("erro Dataset dsCentroCustoPcot:" + e.message,
				""));
	}

	return newDataset;
}