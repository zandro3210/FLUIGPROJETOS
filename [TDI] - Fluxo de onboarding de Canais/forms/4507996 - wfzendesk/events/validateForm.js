function validateForm(form){
	var numActivity = getValue("WKNumState");
	var tarCompleta 	= getValue("WKCompletTask");
	var numProcess 	= getValue("WKNumProces");
	
	log.info('Aprovacao de Chamados Zendesk - validateForm - processo: ' + numProcess + ' - INICIO');
	
    if (tarCompleta == "false"){
		throw "&Eacute; necess&aacute;rio clicar no botao Movimentar!";
	}
  
	if (numActivity == 2) {
		var status_aprovacao = form.getValue('status_aprovacao');
		if (status_aprovacao == null || status_aprovacao == ""){	
			throw "&Eacute; necess&aacute;rio preencher o campo Aprovado/Reprovado!";
		}
		
		var justificativa = form.getValue('justificativa');
		if (justificativa == null || justificativa == ""){	
			throw "&Eacute; necess&aacute;rio preencher o campo Justificativa Aprov/Reprov!";
		}
	}
	
	log.info('Aprovacao de Chamados Zendesk - validateForm - processo: ' + numProcess + ' - FIM');
}