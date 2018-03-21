function createDataset(fields, constraints, sortFields) {
	
	var datasetpass = DatasetFactory.getDataset("pass_validate", null, null, null);
	var json = datasetpass.getValue(0, "USER");
	var obj = JSON.parse(json);

	// Invoca o servico
	var codUsuario = obj.user;
	var senha = obj.pass;
	
	var companyId = 10097;	
	log.info (" ++ DS ACTIVE USER - INICIO");
	
	var newDataset = DatasetBuilder.newDataset();
	
	
	 if (constraints != null) {
		log.info("entrou no constraints");
		        for (var i = 0; i < constraints.length; i++) {
		                mail = constraints[i].initialValue; 
		            }
		     }
	
	mail = "marcia.prata@totvs.com.br";
	log.info ("CONSTRAINT: "+mail);

	try {

		newDataset.addColumn("ACTIVE");
			
		var us = ServiceManager.getService('userportal');
		var locator = us.instantiate('com.totvs.technology.ecm.foundation.ws.ECMColleagueServiceService');
		var service = locator.getColleagueServicePort();
		
		var retorno = service.getColleaguesMail(codUsuario, senha, companyId, mail).getItem().toArray();
	
		for(var i in retorno){
			log.info("Retornouu: "+i);
					
			newDataset.addRow(new Array(retorno[i].isActive())); 
		}
		
				
	}
	catch(error) {
		newDataset.addRow(new Array( 
				"1-erro",
				"2-erro")); 
	}
	
	return newDataset;
	
}