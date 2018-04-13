function createDataset(fields, constraints, sortFields) {
	
	
	log.info("DATASET dsLicencaHistorico - Inicio");

	var login_fluig  = "elieser.santos@totvs.com.br";
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "login_fluig"){
				login_fluig = constraints[c].getInitialValue(); 
			} 
		}
		if (login_fluig.indexOf("fluig") > 0) {
			login_fluig = login_fluig.replace("fluig.com", "totvs.com.br");
		}
	}
	
	var newDataset = DatasetBuilder.newDataset();
	
	newDataset.addColumn("MOTIVO");
	newDataset.addColumn("DATA_SOLIC");
	newDataset.addColumn("SOLICITACAO");
	newDataset.addColumn("DATA_PROC");
	newDataset.addColumn("DATA_VALIDADE");
	newDataset.addColumn("HASHID");
	newDataset.addColumn("HORA");
	newDataset.addColumn("STATUS");
	
	log.info("ENTROU DATASET HISTORICO");
	
	var data_solic = java.util.Calendar.getInstance(); 

	
	log.info("login_fluig:" + login_fluig);
	
	var formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
	
	try{
		//	Conecta o servico - nome do cadastro de servicos!! 
		var periodicService = ServiceManager.getService('LIBERALIC');
		var serviceHelper = periodicService.getBean();
		var serviceLocator = "";
		log.info("DATASET dsLicencaHistorico - getService OK");
		
		//desenv
		//var serviceLocator = periodicService.instantiate('_164._93._16._172.LIBERALICLocator');
		
		try {
			serviceLocator = serviceHelper.instantiate('corpslv_01.LIBERALICLocator');
		} catch (e) {
			serviceLocator = serviceHelper.instantiate('br.com.totvs.cp.wscorplibsenhas.LIBERALICLocator');
		}

		
		log.info("DATASET dsLicencaHistorico - instantiate OK");
		
		var service = serviceLocator.getLIBERALICSOAP();
		log.info("DATASET dsLicencaHistorico - getLIBERALICSOAP OK");
		
		var retorno = service.LIBCONS_HIS(login_fluig,"","");
		log.info("DATASET dsLicencaHistorico - LIBCONS_HIS OK");
		
		var lista = retorno.getCONSULTA();
		var consulta = lista.getHDTECH();
		log.info("consulta:" + consulta.length);
		for (var i=0;i<consulta.length;i++) {
			var clt = consulta[i];
			var motivo = clt.getMOTIVO();
			var status = clt.getSTATUS();
			
			if(status == "1"){
				status = "SUCESSO";
			}else{
				status = "SEM SUCESSO";
			}
			
			
			var dataProc = formatter.format(clt.getDATAPROC());
			var dataSolic = formatter.format(clt.getDTSOLICIT());
			var dataValid = formatter.format(clt.getDATAVALID());
			
			
			log.info("dataProc:" + dataProc);
			
			newDataset.addRow(new Array(motivo,
										dataSolic,
										clt.getSOLFLUIG(),
										dataProc,
										dataValid,
										clt.getHASHID(),
										clt.getHORA(),
										status));
		}
		log.info("EXECUTANDO DATASET DSLICENCAHISTORICO");
	}catch(error) {newDataset.addRow(new Array("erro DATASET dsLicencaHistorico: " + error.message,"","","","","","","")); } 	
		
    return newDataset;

}