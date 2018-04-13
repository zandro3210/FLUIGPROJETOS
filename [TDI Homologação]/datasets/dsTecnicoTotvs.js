function createDataset(fields, constraints, sortFields) {
	
	log.info("DATASET dsTecnicoTotvs - Inicio");
	
	var newDataset = DatasetBuilder.newDataset();
	
	newDataset.addColumn("CODIGO_TECNICO");
	
    var email = "rodrigo.sombrio@totvs.com.br";
	if (constraints != null) {
		for(var c in constraints){
			if (constraints[c].getFieldName() == "email"){
				email = constraints[c].getInitialValue(); 
			} 
		}
	}
    
	log.info("VALOR2 DO CONSTRAINTS: " + constraints);
	log.info("VALOR DO EMAIL: " + email);	

	//if(email == null || email == ""){
		//email = "jucane.medeiros@totvs.com.br"; /*** TESTE!!! ***/
	//}
	
	log.info("DEPOIS DO FIELDS");
	// Conecta o servico - nome do cadastro de servicos!!

	var service = ServiceManager.getService('TSRVS003');
	log.info("DATASET dsTecnicoTotvs - getService OK");
	
	//desenv
	//var serviceLocator = periodicService.instantiate('_164._93._16._172.GPSAPTOSLocator'); 
	
	//producao
	var locator = service.instantiate('com.totvs.pms.TSRVS003');
	
	log.info("DATASET dsTecnicoTotvs - instantiate OK");
	
	var soap = locator.getTSRVS003SOAP();
	log.info("DATASET dsTecnicoTotvs - getGPSAPTOSSOAP OK");
	
	try{
		var retorno = soap.getlistaanalistaemail(email);
		log.info("DATASET dsTecnicoTotvs - GETLISTAANALISTAEMAIL OK");
		
		var list = retorno.getSTLISTAANACOORD();
		log.info("DATASET dsTecnicoTotvs - getSTLISTAANACOORD OK");
		
		log.info("VALOR DE listCoord:" + list.size());
		
		for(var i =0; i < list.size();i++){
			log.info("DENTRO DO FOR1");
			var analista = list.get(i);
			
			newDataset.addRow(new Array (analista.getTECNICO()));
			
			log.info("DENTRO DO FOR2");
		}
	}catch(error) {newDataset.addRow(new Array("erro" + error.message)); } 	
		
    return newDataset;

}