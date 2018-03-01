function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();

	log.info("***Entrou Dataset dsItemContabilSegmento");

	// DADOS DA CONTA
	newDataset.addColumn("DESCRSEGMENTO");
	newDataset.addColumn("ITEM");

	try {

//		var NOME_SERVICO = "WSPLANOCONTA";
//		var CAMINHO_SERVICO = "com.totvs.fluig.protheus.plano_contas.PLANOCONTAS";
		var NOME_SERVICO = "WSFORMPCOT";
		var CAMINHO_SERVICO = "br.com.totvs.formpcot.FORMPCOT";
		var servico = ServiceManager.getService(NOME_SERVICO);
		log.info("SERVICO:" + servico);
		var instancia = servico.instantiate(CAMINHO_SERVICO);
		log.info("instancia:" + instancia);

		var ws = instancia.getFORMPCOTSOAP();

		var descSegmento = '';
		
		var empresa = '00';
		var filial = '00001000100';
		var centroCusto = '';

		if (constraints != null) {
			for ( var c in constraints) {
				if (constraints[c].getFieldName() == "C_EMPRESA") {
					empresa = constraints[c].getInitialValue();
				} else if (constraints[c].getFieldName() == "C_FILIAL") {
					filial = constraints[c].getInitialValue();
				} else if (constraints[c].getFieldName() == "CE_CC") {
					centroCusto = constraints[c].getInitialValue();
				}
			}
		}
		
		
		var retorno = ws.itctbpcot('00', filial, centroCusto);

		var itens = retorno.getICTBLIST();

		for (var i = 0; i < itens.size(); i++) {
			var item = itens.get(i);
			newDataset.addRow(new Array(item.getCBDESCR(), item.getCBCOD()));
		}
	} catch (e) {
		newDataset.addRow(new Array("erro Dataset dsItemContabilSegmento:"
				+ e.message, ""));
	}

	return newDataset;
}