var Attachments = {
	/** Atualiza o campo que contem a quantidade total de anexos da solicitacao. **/
	updateTotal: function(){
		
		try {
			log.info('@nrAttachment updateTotal size start ');
		debugger;
	    var nrAttachment = hAPI.listAttachments().size();
	    log.info('@nrAttachment updateTotal size:  '+nrAttachment);
	    hAPI.setCardValue("nrAnexo", nrAttachment); 
		log.info('@nrAttachment updateTotal end');
		}
		catch(err) {
			log.info('@nrAttachment updateTotal erro: :  '+err);
		}
	},
	/** Valida se foi enviado anexos na atividade. **/
	validate: function(quantity){
		log.info('@nrAttachment validate start ');
	    var nrAttachmentPrevious = parseInt(hAPI.getCardValue("nrAnexo"));
		var minimalAmountExpected = nrAttachmentPrevious+quantity;
	    var nrAttachmentCurrent = hAPI.listAttachments().size();
	  
	    if(nrAttachmentCurrent < minimalAmountExpected){
			var expected = minimalAmountExpected - nrAttachmentPrevious;
			var sended = nrAttachmentCurrent - nrAttachmentPrevious;
			log.info("O envio de anexos \u00E9 obrigat\u00F3rio nesta atividade!<br/>Esperado "+expected+", enviado "+sended+".");
			throw "O envio de anexos \u00E9 obrigat\u00F3rio nesta atividade!<br/>Esperado "+expected+", enviado "+sended+".";
		}
		log.info('@nrAttachment validate end ');
	}	
};