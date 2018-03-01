function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();

	log.info("***Entrou Dataset dsClassePcot");

	// DADOS DA CONTA
	newDataset.addColumn("CDCLASSE");
	newDataset.addColumn("CDDESCR");

	try {

//		var NOME_SERVICO = "WSPLANOCONTA";
//		var CAMINHO_SERVICO = "com.totvs.fluig.protheus.plano_contas.PLANOCONTAS";
		var NOME_SERVICO = "WSFORMPCOT";
		var CAMINHO_SERVICO = "br.com.totvs.formpcot.FORMPCOT";
		var servico = ServiceManager.getService(NOME_SERVICO);
		log.info("SERVICO:" + servico);
		var instancia = servico.instantiate(CAMINHO_SERVICO);
		log.info("instancia:" + instancia);

//		var ws = instancia.getPLANOCONTASSOAP();
		var ws = instancia.getFORMPCOTSOAP();

		var empresa = '00';
		var filial = '00001000100';
		var centroCusto = '';
		var itemContabil = '';
		
		if (constraints != null) {
			for ( var c in constraints) {
				if (constraints[c].getFieldName() == "C_EMPRESA") {
					empresa = constraints[c].getInitialValue();
				} else if (constraints[c].getFieldName() == "C_FILIAL") {
					filial = constraints[c].getInitialValue();
				} else if (constraints[c].getFieldName() == "CD_CC") {
					centroCusto = constraints[c].getInitialValue();
				} else if (constraints[c].getFieldName() == "CD_ITCT") {
					itemContabil = constraints[c].getInitialValue();
				}
			}
		}
		
//		var retorno = ws.classectb('00', codClasse,'');
		var retorno = ws.classvl(empresa, filial, centroCusto, itemContabil);

//		var itens = retorno.getLISTACLASSE();
		var itens = retorno.getCLVLLIST();

		for (var i = 0; i < itens.size(); i++) {
			var item = itens.get(i);
//			newDataset.addRow(new Array(item.getCDCLASSE(), item.getCDDESCR()));
			newDataset.addRow(new Array(item.getCDCOD(), item.getCDDESCR()));
		}
	} catch (e) {
		newDataset.addRow(new Array("erro Dataset dsClassePcot:"
				+ e.message, ""));
	}
	
	log.info("***Antes retorno Dataset dsClassePcot");
	return newDataset;
}