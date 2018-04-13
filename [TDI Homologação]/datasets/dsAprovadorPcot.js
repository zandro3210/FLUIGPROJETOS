function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();

	log.info("***Entrou Dataset dsAprovadorPcot");

	// DADOS DA CONTA
	newDataset.addColumn("NOMEAPROVADOR");
	newDataset.addColumn("EMAILAPROVADOR");

	try {

		var NOME_SERVICO = "WSFORMPCOT";
		var CAMINHO_SERVICO = "br.com.totvs.formpcot.FORMPCOT";
		var servico = ServiceManager.getService(NOME_SERVICO);
		log.info("SERVICO:" + servico);
		var instancia = servico.instantiate(CAMINHO_SERVICO);
		log.info("instancia:" + instancia);

		var ws = instancia.getFORMPCOTSOAP();

		var empresa = '00';
		var filial = '00001000100';
		var centroCusto = '';
		var itemContabil = '';
		var tipo = '';
		var pacote = '';
		
		if (constraints != null) {
			for ( var c in constraints) {
				if (constraints[c].getFieldName() == "C_EMPRESA") {
					empresa = constraints[c].getInitialValue();
				} else if (constraints[c].getFieldName() == "C_FILIAL") {
					filial = constraints[c].getInitialValue();
				} else if (constraints[c].getFieldName() == "CC_CC") {
					centroCusto = constraints[c].getInitialValue();
				} else if (constraints[c].getFieldName() == "CC_ITCT") {
					itemContabil = constraints[c].getInitialValue();
				} else if (constraints[c].getFieldName() == "CC_TIPO") {
					tipo = constraints[c].getInitialValue();
				} else if (constraints[c].getFieldName() == "CE_PACOTE") {
					pacote = constraints[c].getInitialValue();
				}
			}
		}
		
		var retorno = ws.aprpcot(empresa, filial, centroCusto, itemContabil, tipo, pacote);

		var itens = retorno.getAPRLIST();

		for (var i = 0; i < itens.size(); i++) {
			var item = itens.get(i);
			newDataset.addRow(new Array(item.getCCNMAPROV(), item.getCCEMAIL()));
		}
	} catch (e) {
		newDataset.addRow(new Array("erro Dataset dsAprovadorPcot:"
				+ e.message, ""));
	}
	
	log.info("***Antes retorno Dataset dsAprovadorPcot");
	return newDataset;
}function onMobileSync(user) {

}