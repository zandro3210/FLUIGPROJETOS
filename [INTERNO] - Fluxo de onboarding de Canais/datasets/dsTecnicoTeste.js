function createDataset(fields, constraints, sortFields) {
	
	log.info("DATASET dsTecnicoTotvs - Inicio");
	
	var newDataset = DatasetBuilder.newDataset();
	
	newDataset.addColumn("CODIGO_TECNICO");
	
	log.info("ENTROU DATASET TECNICO");
    var email = "";
    
	/*if (constraints != null) {
		email = constraints[0].getInitialValue(); 
	}*/
    
	log.info("VALOR2 DO CONSTRAINTS: " + constraints);
	log.info("VALOR DO EMAIL: " + email);	

	//if(email == null || email == ""){
		//email = "jucane.medeiros@totvs.com.br"; /*** TESTE!!! ***/
	//}
	
	//email = "waldir.junior@totvs.com.br";
	//email = "marcos.gomes@totvs.com.br";
	email="edilsonm@totvs.com.br";
	
	log.info("DEPOIS DO FIELDS");
	// Conecta o servico - nome do cadastro de servicos!!

	var periodicService = ServiceManager.getService('GPSAPTOS');
	log.info("DATASET dsTecnicoTotvs - getService OK");
	
	//desenv
	//var serviceLocator = periodicService.instantiate('_164._93._16._172.GPSAPTOSLocator'); 
	
	//producao
	var serviceLocator = periodicService.instantiate('_101._93._16._172.GPSAPTOSLocator');
	
	log.info("DATASET dsTecnicoTotvs - instantiate OK");
	
	var service = serviceLocator.getGPSAPTOSSOAP();
	log.info("DATASET dsTecnicoTotvs - getGPSAPTOSSOAP OK");
	
	try{
		var emailAnalista = service.GETLISTAANALISTAEMAIL(email);
		log.info("DATASET dsTecnicoTotvs - GETLISTAANALISTAEMAIL OK");
		
		var listCoord = emailAnalista.getSTLISTAANACOORD();
		log.info("DATASET dsTecnicoTotvs - getSTLISTAANACOORD OK");
		
		log.info("VALOR DE listCoord:" + listCoord.length);
		
		for(var i =0; i < listCoord.length;i++){
			log.info("DENTRO DO FOR1");
			var analista = listCoord[i];
			
			newDataset.addRow(new Array (analista.getTECNICO()));
			
			log.info("DENTRO DO FOR2");
		}
	}catch(error) {newDataset.addRow(new Array("erro" + error.message)); } 	
		
    return newDataset;

}