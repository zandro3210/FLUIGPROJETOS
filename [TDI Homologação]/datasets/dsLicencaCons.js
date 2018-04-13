function createDataset(fields, constraints, sortFields) {
	log.info("DATASET dsLicencaCons");
	
	var newDataset = DatasetBuilder.newDataset();
	
	newDataset.addColumn("STATUS");
	newDataset.addColumn("VALIDADE");
	
	var data_solic = java.util.Calendar.getInstance();
	
	/*if (fields != null) {
		email = fields[0]; 
	}
	*/
	
	var data = "03/03/2016";
	var login_fluig = "rodrigo.sombrio@totvs.com.br";
	
	log.info("constraints:" + constraints)
	
	if (constraints != null) {
		for(var c in constraints){
			if (constraints[c].getFieldName() == "login_fluig"){
				login_fluig  = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "data_solic"){
				data = constraints[c].getInitialValue(); 
			}
		}
	}
    
	log.info("login_fluig...:" + login_fluig + " - data...: " + data);	
	
	var arrayData = data.split("/", 3);
	
	log.info("VALOR DE arrayData...: " + arrayData);
	
	data_solic.set(java.util.Calendar.DAY_OF_MONTH, new java.lang.Integer(arrayData[0]));
	data_solic.set(java.util.Calendar.MONTH, new java.lang.Integer(arrayData[1]) -1);
	data_solic.set(java.util.Calendar.YEAR, new java.lang.Integer(arrayData[2]));
	
	//log.info("LOGIN FLUIG: " + login_fluig);
	log.info("DATA SOLIC2: " + data_solic.getTime());
	
	try{
		//	Conecta o servico - nome do cadastro de servicos!! 
		var periodicService = ServiceManager.getService('LIBERALIC');
		log.info("DATASET dsLicencaCons - getService ok");
		
		//desenv
		//var serviceLocator = periodicService.instantiate('_164._93._16._172.LIBERALICLocator');

		//producao
		var serviceLocator = periodicService.instantiate('br.com.totvs.cp.wscorplibsenhas.LIBERALICLocator');
		
		log.info("DATASET dsLicencaCons - instantiate ok");
		
		var service = serviceLocator.getLIBERALICSOAP();
		log.info("DATASET dsLicencaCons - getLIBERALICSOAP ok");
		
		log.info("teste antes do LIBCONS_CON:login_fluig :" + login_fluig + " data_solic " + data_solic.getTime());
	
		log.info("ANTES DE CHAMAR O LIBCONS...:" + data_solic.getTime());
		var retorno = service.LIBCONS_CON(login_fluig,data_solic.getTime());
		log.info("DATASET dsLicencaCons - LIBCONS_CON ok");
		
		var dataTeste = retorno.getVALIDADE();
		log.info("DATASET dsLicencaCons - getVALIDADE ok");
		
		log.info("dataTeste...:" + dataTeste);
		
		var formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
		var data2 = formatter.format(dataTeste);
		
		log.info("data2...:" + data2);
		
		newDataset.addRow(new Array (retorno.getSTATUS(),data2));
		
		log.info("CRIANDO DATASET DSLICENCA :" + retorno.getSTATUS());
	}catch(error) {newDataset.addRow(new Array("erro DATASET dsLicencaCons: " + error.message,"","")); } 	
		
    return newDataset;

}