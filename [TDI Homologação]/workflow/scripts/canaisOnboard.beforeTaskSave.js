function beforeTaskSave(colleagueId,nextSequenceId,userList){
	var CURRENT_STATE = getValue("WKNumState");
	log.info('@beforeTaskSave  CURRENT_STATE:  '+CURRENT_STATE);
	if(nextSequenceId == Activity.ANALISAR_CNPJ){
		var quantity = 0;
		log.info('@beforeTaskSave nextSequenceId == Activity.ANALISAR_CNPJ');
		if(hAPI.getCardValue("fgCopiaRg") == "sim") quantity++;
		if(hAPI.getCardValue("fgRelatorioFaturamento") == "sim") quantity++;
		if(hAPI.getCardValue("fgEireli") == "sim") quantity++;
		if(hAPI.getCardValue("objetoCanalTotvs") == "sim") quantity++;
		if(hAPI.getCardValue("cartaoCnpj") == "sim") quantity++;
		if(hAPI.getCardValue("contratoSocial") == "sim") quantity++;
		if(hAPI.getCardValue("certidaoNegativa") == "sim") quantity++;
		if(hAPI.getCardValue("carteiraClientes") == "sim") quantity++;
		log.info('@beforeTaskSave Attachments.validate(quantity)');
		Attachments.validate(quantity);  
	}
	else if(nextSequenceId == Activity.INFORMAR_CODIGO_UNIDADE && CURRENT_STATE != Activity.ANALISAR_CONTRATO_ASSINADO) 
	{
		log.info('@beforeTaskSave Attachments.validate(1);');
		Attachments.validate(1);
	}
	else if(nextSequenceId == Activity.FIM_CANCELADO){
		var reason = "";
		
		if(CURRENT_STATE == Activity.ANALISAR_REPROVACAO_CANAIS) reason = "Reprovado pela equipe de Canais!";
		else if(CURRENT_STATE == Activity.ANALISAR_REPROVACAO_FRANQUIA) reason = "Reprovado pela franquia!";
		
		hAPI.setCardValue("dsMotivoReprovacao", reason);
	}


	
}