function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	// Cria o dataset
	var newDataset = DatasetBuilder.newDataset();
		newDataset.addColumn("descricao");
		newDataset.addColumn("emailaprovador");
		newDataset.addColumn("status");
		try {
			
			
			var NOME_SERVICO = "WS_TDIFLUIG01_1";
			var CAMINHO_SERVICO = "com.totvs.protheus.crm.desconto.TCRMS005";		
			var servico = ServiceManager.getService(NOME_SERVICO);
			log.info("SERVICO:" + servico);
			var instancia = servico.instantiate(CAMINHO_SERVICO);
			log.info("instancia:" + instancia);
			var soap = instancia.getTCRMS005SOAP();
			
			newDataset.addRow(new Array("sem erro de instantiate", "", "soapui"));
			
		} catch(erro) {
			newDataset.addRow(new Array(erro.message, "", ""));
		}
		return newDataset;

}function onMobileSync(user) {

}