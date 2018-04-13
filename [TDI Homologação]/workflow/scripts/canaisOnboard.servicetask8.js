function servicetask8(attempt, message) {
	log.info('Start servicetask8 servicetask8 ');
	var isOk = "true";
	
	hAPI.setCardValue("cnpjOk", isOk);
	log.info('@servicetask8  isOk:  '+isOk);
	if(isOk == "false") 
		hAPI.setCardValue("dsMotivoReprovacao", "CPNJ não está OK!");
}

/**
 * Verifica se o CNPJ informado estah OK.
 * 
 * @returns void.
 */
function verifyCnpj(){
	log.info('Start servicetask8 verifyCnpj() ');
	var cnpj = hAPI.getCardValue("nrCnpj").replaceAll("\\D", "");//Retira o . / -
	log.info('Start servicetask8 replace');
	var c1 = DatasetFactory.createConstraint("cnpj", cnpj, cnpj, ConstraintType.MUST);
	var constraints = new Array(c1);
	log.info('servicetask8 getDataset em breve');
	var dataset = DatasetFactory.getDataset("dsCanaisCnpj", null, constraints, null);
	log.info('@servicetask8 dataset' + dataset);
	log.info('@servicetask8 dataset.getValue(0, "cnpjOk")' + dataset.getValue(0, "cnpjOk"));
	

	return dataset.getValue(0, "cnpjOk");
}