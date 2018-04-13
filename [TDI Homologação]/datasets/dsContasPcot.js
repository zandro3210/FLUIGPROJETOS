function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();

	log.info("***Entrou Dataset dsContasPcot");

	// DADOS DA CONTA
	newDataset.addColumn("CE_COD");
	newDataset.addColumn("CE_DESCR");
	
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
		var codConta = '';
		var descConta = '';
		var tipo = '';

		if (constraints != null) {
			for ( var c in constraints) {
				if (constraints[c].getFieldName() == "C_EMPRESA") {
					empresa = constraints[c].getInitialValue();
				} else if (constraints[c].getFieldName() == "C_FILIAL") {
					filial = constraints[c].getInitialValue();
				} else if (constraints[c].getFieldName() == "CE_CC") {
					centroCusto = constraints[c].getInitialValue();
				} else if (constraints[c].getFieldName() == "CE_CONTA") {
					codConta = constraints[c].getInitialValue();
				} else if (constraints[c].getFieldName() == "CE_TP") {
					tipo = constraints[c].getInitialValue();
				} else if (constraints[c].getFieldName() == "CE_DESCR") {
					descConta = constraints[c].getInitialValue();
				}
			}
		}

		log.info("Ponto1:" + ws);

		var retorno = ws.contctb(empresa, filial, centroCusto, codConta, tipo, descConta);

		var contas = retorno.getCONTLIST();

		var limit = -1;

		for (var i = 0; i < contas.size(); i++) {
			var conta = contas.get(i);
			newDataset.addRow(new Array(conta.getCECOD(), conta.getCEDESCR()));

			if (i == limit) {
				break;
			}
		}
		
	} catch (e) {
		newDataset.addRow(new Array("erro Dataset dsContasPcot:" + e.message,
				""));
	}

	return newDataset;
}