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


	//// Retirando do BeforeStateENtry

	log.info("@beforeTaskSave CANAISONBOARDS diz: "+CURRENT_STATE);
	if(CURRENT_STATE != Activity.INICIO && CURRENT_STATE != Activity.ZERO && CURRENT_STATE != Activity.ANALISAR_CONTRATO_ASSINADO )
	{
		log.info("@beforeTaskSave Attachments.updateTotal()");
		try {
			Attachments.updateTotal(); //Utilizado um if por que ocorre erro ao tentar alterar o valor de um campo na abertura da solicitação.

		}
		catch(err) {
			log.info("@beforeTaskSave erro: '" + err + "'");
		}
	} 
	if(CURRENT_STATE == Activity.FIM_CANCELADO){
		log.info("@beforeTaskSave sendMailCancel()");
		sendMailCancel(); 
	}
	
	if(CURRENT_STATE == 65){
		log.info("@beforeTaskSave 65");
		var planilha = hAPI.getCardValue("codPlanilha");
		var item = hAPI.getCardValue("codItem");
		var territorio = hAPI.getCardValue("codTerritorio");
		var municipio = hAPI.getCardValue("codMunicipio");
		
		if(planilha != ""){			
			var cap = handleCapillarity("CONFIRMA",planilha,item,territorio,municipio);
			log.info("#cap: "+cap);
			
			if(cap != "OK"){
				log.info("Não foi possível confirmar a reserva de capilaridade! "+cap);
				throw "Não foi possível confirmar a reserva de capilaridade! "+cap;
			}
		}
	}
	
	/**
	 * Envia e-mail notificando o requisitante informando o motivo da reprovacao/cancelamento.
	 * 
	 * @returns void.
	 */
	function sendMailCancel(){
		log.info("@beforeStateEntry/sendMailCancel diz: Inicio");
		var parameters = new java.util.HashMap();
		var recipients = new java.util.ArrayList();
		var sender = hAPI.getCardValue("cdSolicitante");
		var tenantId = numbersOnly(getValue("WKCompany"));
		
		parameters.put("SERVER_URL", hAPI.getCardValue("dsUrlServidor"));
		parameters.put("TENANT_ID", tenantId);
		parameters.put("RECEIVER", hAPI.getCardValue("nmSolicitante"));
		parameters.put("NR_SOLICITATION", getValue("WKNumProces"));
		parameters.put("DS_REASON", hAPI.getCardValue("dsMotivoReprovacao"));
		parameters.put("subject", "Fluxo Onboard");
		
		recipients.add(hAPI.getCardValue("cdSolicitante"));
		
		notifier.notify(sender, "tplCustomCanaisOnboardReprovacao", parameters, recipients, "text/html");
	}

	function numbersOnly(string){
		return java.lang.String.valueOf(string).replaceAll(/\./, "");
	}
}