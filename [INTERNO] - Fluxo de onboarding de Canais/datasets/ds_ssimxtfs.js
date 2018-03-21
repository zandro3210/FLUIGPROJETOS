function createDataset(fields, constraints, sortFields) {
	
	var NOME_SERVICO = "SSIMXTFS";
	var CAMINHO_SERVICO = "_156._93._16._172.SSIMXTFSLocator";		
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("resultado");
	
	var chamado = "04\\BAOS95";
	var projeto = "";
	var usuario = "jv01\\piero.dallabona";
	var workspace = "JVD0003351";
	var collection = "TI";
	
	if (constraints != null) {
		for(var c in constraints){
			if (constraints[c].getFieldName() == "chamado"){
				chamado = constraints[c].getInitialValue(); 
			} 
			if (constraints[c].getFieldName() == "projeto"){
				projeto = constraints[c].getInitialValue(); 
			} 
			if (constraints[c].getFieldName() == "usuario"){
				usuario = constraints[c].getInitialValue(); 
			} 
			if (constraints[c].getFieldName() == "workspace"){
				workspace = constraints[c].getInitialValue(); 
			} 
			if (constraints[c].getFieldName() == "collection"){
				collection = constraints[c].getInitialValue(); 
			} 
		}
	}
	
	var servico = ServiceManager.getService(NOME_SERVICO);
	log.info("Servico: " + servico);

	var instancia = servico.instantiate(CAMINHO_SERVICO);
	log.info("Instancia: " + instancia);
	
	log.info("###################################################################");
	log.info("###################################################################");
	log.info("###################################################################");
	log.info("###################################################################");
	log.info("###################################################################");
	log.info("###################################################################");
	log.info("###################################################################");
	

	var ws = instancia.getSSIMXTFSSOAP();
	
		
	try {
		var retorno = ws.VERIFICACHAMADO(chamado,projeto,usuario,workspace,collection);	
					
		newDataset.addRow(new Array(retorno)); 
		return newDataset;
			
	} catch (e) {
		newDataset.addRow(new Array(e.message)); 
	}
	
	return newDataset;
	
}