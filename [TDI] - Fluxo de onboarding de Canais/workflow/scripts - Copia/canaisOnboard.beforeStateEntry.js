function beforeStateEntry(sequenceId){
	log.info("@beforeStateEntry CANAISONBOARDS diz: "+sequenceId);
	if(sequenceId != Activity.INICIO && sequenceId != Activity.ZERO)
	{
		log.info("@beforeStateEntry Attachments.updateTotal()");
		try {
			Attachments.updateTotal(); //Utilizado um if por que ocorre erro ao tentar alterar o valor de um campo na abertura da solicitação.

		}
		catch(err) {
			log.info("@beforeStateEntry erro: '" + err + "'");
		}
	} 
	if(sequenceId == Activity.FIM_CANCELADO){
		log.info("@beforeStateEntry sendMailCancel()");
		sendMailCancel(); 
	}
	
	if(sequenceId == 65){
		log.info("@beforeStateEntry 65");
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