function createDataset(fields, constraints, sortFields) {

	try{
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
		
		newDataset.addColumn("RETORNO");

		//para setar - chama apenas uma vez o dataset
		var res = setaAmbiente();
		var LOGININTEGRADOR = res.getValue(0,"login");
		var PASSWORDINTEGRADOR = res.getValue(0,"password");

		log.info("LOGININTEGRADOR: " + LOGININTEGRADOR + "PASSINTEGRADOR: " + PASSWORDINTEGRADOR);
		
		var NOME_SERVICO = "ECMColleagueService";
		var CAMINHO_SERVICO = "com.totvs.technology.ecm.foundation.ws.ECMColleagueServiceService";		

		var servico = ServiceManager.getService(NOME_SERVICO);
		var instancia = servico.instantiate(CAMINHO_SERVICO);
		var ws = instancia.getColleagueServicePort();

		
		if (constraints != null) {
			
			var numcompany = constraints[0].getInitialValue();
			var matrTerc = constraints[1].getInitialValue();
			var nomeTerc = constraints[2].getInitialValue();
		}
		
		
		//TESTE
		//var numcompany = 10097;
		//var matrTerc = "34302534";
		//nomeTerc = "cris teste"
	
		var rsActivate = ws.activateColleague(LOGININTEGRADOR,PASSWORDINTEGRADOR,numcompany,matrTerc);
		
		log.info("SEGFIN - TERMO RESP TERCEIROS - DATASET SegInfActivateTerc" + 
		 	" rsActivate: " + rsActivate) ;

		newDataset.addRow(new Array(rsActivate));	

		
	} // try 
	catch(error) {
		log.info ("SEGFIN - TERMO RESP TERCEIROS - DATASET SegInfActivateTerc - ERRO" + error.message);
		newDataset.addRow(new Array(error.message)); 
	}	
	
	return newDataset;
	
}

function setaAmbiente(){
	try{
		var res = DatasetFactory.getDataset("dsParamAmbFormWkf", null, null, null);
		if (res){
			if (res.values.length > 0){return res;}
			else return "erro ao retornar dados de ambiente - nao retornou registro";
		}
		else return "erro ao retornar dados de ambiente - retornou nulo";
	}
	catch (e) {
		return "erro ao retornar dados de ambiente - NOK";
	}	
}

