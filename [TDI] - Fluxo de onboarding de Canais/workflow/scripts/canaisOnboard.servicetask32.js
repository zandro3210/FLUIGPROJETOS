function servicetask32(attempt, message) {
	log.info("##SERVIÇO DE CAPILARIDADE");
	var cap = verifyCapillarity();
	
	log.info("#cap: "+cap);
	if(cap != "false" && cap != false){
		hAPI.setCardValue("capilaridadeOk","true");
		
		var jsonCap = JSON.parse(cap);
		
		hAPI.setCardValue("codPlanilha",jsonCap["Planilha"]);
		hAPI.setCardValue("codItem",jsonCap["Item"]);
		hAPI.setCardValue("codTerritorio",jsonCap["Territorio"]);
		hAPI.setCardValue("codMunicipio",jsonCap["Municipio"]);
		
		var returnCap =handleCapillarity("RESERVA",jsonCap["Planilha"],jsonCap["Item"],jsonCap["Territorio"],jsonCap["Municipio"]);
		
		log.info("#returnCap: "+returnCap);
		if(returnCap != "OK"){
			log.info("Ocorreu um erro na reserva de capilaridade! "+returnCap);
			throw "Ocorreu um erro na reserva de capilaridade! "+returnCap;
		}
	}else{
		log.info("Municipio informado nao existe no cadastro de capilaridade");
		throw "Municipio informado nao existe no cadastro de capilaridade";
	}
}