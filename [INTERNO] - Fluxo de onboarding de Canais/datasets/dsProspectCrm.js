function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	
	log.info("***Entrou Dataset PROSPECT");
	
	newDataset.addColumn("UNIDADE");
	newDataset.addColumn("EAR");
	newDataset.addColumn("GAR");
	newDataset.addColumn("CNPJ");
	newDataset.addColumn("RAZAO");
	newDataset.addColumn("NOME_FANTASIA");
	newDataset.addColumn("ENDERECO");
	newDataset.addColumn("CIDADE");
	newDataset.addColumn("ESTADO");
	newDataset.addColumn("CEP");
	newDataset.addColumn("JUSTIFICATIVA");
	
	if (constraints != null) {
		for(var c in constraints){
			if (constraints[c].getFieldName() == "prospect"){
				prospectId = constraints[c].getInitialValue(); 
			} 
		}
	}
	
	//var prospectId = "SUS02332900";
	log.info("VALOR DO prospectId...:" + prospectId);
	
	var NOME_SERVICO = "wsEcmCrm3";
	var CAMINHO_SERVICO = "localhost.WSECMCRMLocator";		
	var servico = ServiceManager.getService(NOME_SERVICO);
	log.info("SERVICO:" + servico);
	var instancia = servico.instantiate(CAMINHO_SERVICO);
	log.info("instancia:" + instancia);
	var ws = instancia.getWSECMCRMSOAP();
	
	log.info("Ponto1:" + ws);
	
	try {
		var prospect = ws.ENVIAAPRGE(prospectId);
		
		log.info("Ponto2:" + prospectId);
		
		newDataset.addRow(new Array(prospect.getUNIDADE(), 
						  prospect.getSOLICITANTE(), 
						  prospect.getGAR(), 
						  prospect.getCNPJ(),
						  prospect.getRAZAOSOCIAL(),
						  prospect.getNOMEFANTASIA(),
						  prospect.getENDERECO(),
						  prospect.getCIDADE(),
						  prospect.getESTADO(),
						  prospect.getCEP(),
						  prospect.getJUSTIFICATIVA()));

		/*log.info("DATASET-VALOR DOS CAMPOS...:" + prospect.getUNIDADE() + " - " 
				+ prospect.getSOLICITANTE() + " - "
				+ prospect.getGAR() + " - "
				+ prospect.getCNPJ() + " - "
				+ prospect.getRAZAOSOCIAL() + " - "
				+ prospect.getNOMEFANTASIA() + " - "
				+ prospect.getENDERECO() + " - "
				+ prospect.getCIDADE() + " - "
				+ prospect.getESTADO() + " - "
				+ prospect.getCEP() + " - "
				+ prospect.getJUSTIFICATIVA());*/
		
			return newDataset;
			

	} catch (e) {
		newDataset.addRow(new Array("erro Dataset DSPROSPECTCRM:" + e.message,"", "", "", "", "", "", "", "","","")); 
	}
	
	return newDataset;

}