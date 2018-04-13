function afterCancelProcess(colleagueId,processId){
	log.info("##afterCancelProcess");
	
	var planilha = hAPI.getCardValue("codPlanilha");
	var item = hAPI.getCardValue("codItem");
	var territorio = hAPI.getCardValue("codTerritorio");
	var municipio = hAPI.getCardValue("codMunicipio");
	
	if(planilha != ""){
		var cap = handleCapillarity("CANCELA",planilha,item,territorio,municipio);
		log.info("Retorno do cancelamento de reserva: "+cap);
	}
}