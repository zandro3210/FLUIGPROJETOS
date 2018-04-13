function servicetask85(attempt, message){
	CustomServiceTask85.sendMail();
}

var CustomServiceTask85 = {
	sendMail: function(){
		var parameters = new java.util.HashMap();
		var recipients = new java.util.ArrayList();
		var sender = hAPI.getCardValue("cdSolicitante");
		var tenantId = this.numbersOnly(getValue("WKCompany"));
		var mailTemplate = (hAPI.getCardValue("pvfMasterCat") == "sim") ? "tplCustomCanaisOnboardContratoInterno" : "tplCustomCanaisOnboardContrato";
		
		parameters.put("SERVER_URL", hAPI.getCardValue("dsUrlServidor"));
		parameters.put("TENANT_ID", tenantId);
		parameters.put("RECEIVER", hAPI.getCardValue("nome"));
		parameters.put("NR_SOLICITATION", hAPI.getCardValue("nrSolicitacao"));
		parameters.put("TOKEN", hAPI.getCardValue("token"));
		parameters.put("subject", "Fluxo Onboard");
		
		recipients.add(hAPI.getCardValue("email"));
		log.info('@canaisOnboard.servicetask85  CustomServiceTask85 start notify');
		notifier.notify(sender, mailTemplate, parameters, recipients, "text/html");
		log.info('@canaisOnboard.servicetask85  CustomServiceTask85 end notify');
	},
	numbersOnly: function(string){
		return java.lang.String.valueOf(string).replaceAll(/\./, "");	
	}
};