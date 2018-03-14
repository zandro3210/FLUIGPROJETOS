function beforeCancelProcess(colleagueId,processId){
	
	var numProcess 	= getValue("WKNumProces");
	if(numProcess != 1942997){
	log.info(' @@1 CRIS - CANCELAMENTO MANUAL - Aprovacao de Chamados Zendesk - beforeCancelProcess - Cancela Solicitacao - INICIO  - numProcess ' + 
				numProcess  + ' colleagueId ' + colleagueId);
	
	try {
		
		log.info(' @@2 - 1104 - CRIS - CANCELAMENTO MANUAL - Aprovacao de Chamados Zendesk - beforeCancelProcess - Cancela Solicitacao  - numProcess ' + 
				numProcess  + 
				+ ' ticket: ' + hAPI.getCardValue('ticket') 
				+ ' urlticket: ' + hAPI.getCardValue('urlticket')
				+ ' nmcont: ' + hAPI.getCardValue('nmcont') 
				+ ' nmorg: ' + hAPI.getCardValue('nmorg') 
				+ ' idAprovador: ' + hAPI.getCardValue('idAprovador')
				+ ' hieraraprovadoresoriginal: ' + hAPI.getCardValue('hieraraprovadoresoriginal')
				+ ' priorid: ' + hAPI.getCardValue('priorid')
				+ ' probrelac: ' + hAPI.getCardValue('probrelac')
				+ 'requesterId:' + hAPI.getCardValue('requesterId')
				+ ' cicloatual: ' + hAPI.getCardValue('cicloatual')
				+ ' emailUsuar_movimenta_tar: ' + hAPI.getCardValue('emailUsuar_movimenta_tar'));
		
		
		// Conecta o servico
		var NOME_SERVICO = "WSZendesk";
		var CAMINHO_SERVICO = "totvs.tdi.zendesk.WorkflowToZendesk_Service";		
		var servico = ServiceManager.getService(NOME_SERVICO);
		log.info(" @@3 CRIS - CANCELAMENTO MANUAL - Aprovacao de Chamados Zendesk - beforeCancelProcess - Cancela Solicitacao  - numProcess " + 
				numProcess  + " - SERVICO:" + servico);
		var instancia = servico.instantiate(CAMINHO_SERVICO);
		log.info(" @@4 CRIS - CANCELAMENTO MANUAL - Aprovacao de Chamados Zendesk - beforeCancelProcess - Cancela Solicitacao  - numProcess " + 
				numProcess  + " - INSTANCIA:" + instancia);
		var ws = instancia.getWorkflowToZendeskPort();
		
		//get email do colleagueId
		var cId = DatasetFactory.createConstraint("colleagueId", colleagueId, colleagueId, ConstraintType.MUST);
		var fields = new Array("colleagueId","colleagueName", "mail");
		var colaborador = DatasetFactory.getDataset("colleague", fields, new Array(cId), null);
		
		var emailAprovador = colaborador.getValue(0, "mail");
			
   	    var tipo_solicitacao = hAPI.getCardValue('tipo_solicitacao');

		//dados do ticket
		var ticketId = hAPI.getCardValue('ticket');
		
		log.info ('getValue(WKUserComment): ' + getValue("WKUserComment"));
		
		if (getValue("WKUserComment").startsWith("#cancelTI")){
			var statusAprovacao = 'CanceladoManualFluig';
			// é quando ocorre erro de tarefa automatica, ou outra situacao que tenha que ser forcado
			var justificativa = 'Solicita&ccedil;&atilde;o ' +  processId + ' cancelada automaticamente devido prazo limite estipulado.';
		}
		else if (getValue("WKUserComment").toLowerCase() == "@cancelzend@" ||
				 getValue("WKUserComment").startsWith("@cancelzend@") ||
				 getValue("WKUserComment").startsWith("@CANCELZEND@")){
				var statusAprovacao = 'CanceladoManualZendesk';
				var justificativa = 'Solicita&ccedil;&atilde;o ' +  processId + ' cancelada pelo Zendesk - Ticket Resolvido';
		}
		else{
			var statusAprovacao = 'CanceladoManualFluig';
			var justificativa = 'Solicita&ccedil;&atilde;o ' +  processId + ' cancelada manualmente por ' + emailAprovador + ' Observa&ccedil;&otilde;es: ' + getValue("WKUserComment");
		}

		var cicloAprovacao = hAPI.getCardValue('cicloatual');
	
		var ticket = servico.instantiate('totvs.tdi.zendesk.Ticket');
		ticket.setId(ticketId);
		
		var dados = servico.instantiate('totvs.tdi.zendesk.Dados');
		dados.setRequesterId(hAPI.getCardValue('requesterId'));

		 var comment = servico.instantiate('totvs.tdi.zendesk.Comment');
		 comment.setPublic(false);
		 comment.setBody(justificativa);

		 dados.setComment(comment);
		 
		 var aprovacao = servico.instantiate('totvs.tdi.zendesk.Aprovacao');
	    	aprovacao.setStatusAprovacao(statusAprovacao);
	    	//aprovacao.setCicloAprovacao(cicloAprovacao);
	    	aprovacao.setCicloAprovacao(parseInt(cicloAprovacao));
	    	
	    	//aprovacao.setIdProcesso(numProcess);
	    	aprovacao.setIdProcesso(parseFloat(numProcess));
	    	
	    	aprovacao.setHistoricoDeAprovacao(justificativa);
	    	aprovacao.setAprovador(emailAprovador);
	    	
 	 ticket.setAprovacao(aprovacao);
     ticket.setDados(dados);
	     
	    log.info(' @@5 - 1104 - CRIS - CANCELAMENTO MANUAL - Aprovacao de Chamados Zendesk - beforeCancelProcess - Cancela Solicitacao  - numProcess ' + 
				numProcess  +
				' >> setTicketId: ' + ticketId +
				' >> setRequesterId: ' + hAPI.getCardValue('requesterId') +
				' >> setPublic: false' +
				' >> setBody: ' + justificativa +
				' >> setComment' + comment +
				' >> setAprovador: ' + emailAprovador +
				' >> setHistoricoDeAprovacao: ' + justificativa +
				' >> setStatusAprovacao: ' + statusAprovacao +
				' >> setCicloAprovacao: ' + cicloAprovacao +
				' >> setIdProcesso: ' + numProcess);		
        	
	    // TRATAMENTO DE RETORNOS DE CODIGOS - nao é possivel so pelo codigo, pois tem valores no json que podem coincidir com estes numeros
        // https://pt.wikipedia.org/wiki/Lista_de_c%C3%B3digos_de_status_HTTP
    	//retornoUP.indexOf("422") > -1 ||
	    
	    var retorno = ws.updateTicket(ticket);
	    
		if (retorno) {
			if (retorno != null) {

				var retornoUP = retorno.toUpperCase();
				log.info(' @@5.0 CRIS - CANCELAMENTO MANUAL - Aprovacao de Chamados Zendesk - beforeCancelProcess - RETORNO UPPER - numProcess ' + 
						  numProcess  + retornoUP);
				if (getValue("WKUserComment").startsWith("#cancelTI") ){
					// deixar passar o cancelamento, pois é quando ocorre erro de tarefa automatica, ou outra situacao que tenha que ser forcado
				}
				else{				
					 if (retornoUP.indexOf("ERROR: ZENDESK ERROR") > -1 || 
					    	 retornoUP.indexOf("CONNECTION REFUSED") > -1 ||
					    	 retornoUP.indexOf("BAD REQUEST") > -1 ||
					    	 retornoUP.indexOf('"ERRO":"ERRO DE AUTENTICA"') > -1 ||
					    	 retornoUP.indexOf("CONNECTEXCEPTION") > -1 ||
					    	 retornoUP.indexOf("UNPROCESSABLE ENTITY") > -1 ||
					    	 retornoUP.indexOf("429 - NULL - SERVER:") > -1 
				    	 ){
				    	
						 if (retornoUP.indexOf("429 - NULL - SERVER:") > -1){
							 log.info('%%5.1.1 ERROR ATIV 4 - Aprovacao de Chamados Zendesk - beforeStateEntry  - numProcess ' + 
									  numProcess  + 'retorno: ' + retorno);
							throw('Estamos com alto consumo de requisicoes na Zendesk e não foi possivel completar sua transação. Por favor confirme o cancelamento novamente.   ' +
								  'ERROR: ' + retorno);
						 }
						 else{
							log.info('%%5.1 ERROR ATIV 4 - Aprovacao de Chamados Zendesk - beforeStateEntry  - numProcess ' + 
									  numProcess  + 'retorno: ' + retorno);
							throw('Falha na integração com a Zendesk. Por favor confirme o cancelamento novamente.   ' +
								  'ERROR: ' + retorno);	
						 }
					}
				}
			}
			else{
				log.info('%%5.2 NULO - CANCEL MANUAL: Aprovacao de Chamados Zendesk - beforeCancelProcess ' + retorno);
				throw('Falha na integração com a Zendesk. Por favor confirme o cancelamento novamente.   ' +
					  'ERROR: ' + retorno);	
			}
			
		}
		else{
			log.info('%%5.5 UNIDEFINED - CANCEL MANUAL: Aprovacao de Chamados Zendesk - beforeCancelProcess ' + retorno);
			throw('Falha na integração com a Zendesk. Por favor confirme o cancelamento novamente.   ' +
				  'ERROR: ' + retorno);	
		}
		
	    
        log.info (' @@6 CRIS - CANCELAMENTO MANUAL - Aprovacao de Chamados Zendesk - beforeCancelProcess - Cancela Solicitacao - RETORNO - numProcess ' + 
					numProcess  +
				  'retorno: ' + retorno);
	}catch(E){
		log.info('ERROR CATCH CANCEL MANUAL: Aprovacao de Chamados Zendesk - beforeCancelProcess ' + E);
		throw('Falha na integração com a Zendesk. Por favor confirme o cancelamento novamente.   ' +
				  'ERROR: ' + retorno);	
	}

    log.info (' @@7 CRIS - CANCELAMENTO MANUAL - Aprovacao de Chamados Zendesk - beforeCancelProcess - Cancela Solicitacao  FIM - numProcess ' + 
			numProcess );
	}else{log.info("Cancelando o processo: "+numProcess)}
}

/* ANTIGO

function beforeCancelProcess(colleagueId,processId){

var numProcess 	= getValue("WKNumProces");
log.info(' @@1 CRIS - CANCELAMENTO MANUAL - Aprovacao de Chamados Zendesk - beforeCancelProcess - Cancela Solicitacao - INICIO  - numProcess ' + 
			numProcess  + ' colleagueId ' + colleagueId);

try {
	
	log.info(' @@2 CRIS - CANCELAMENTO MANUAL - Aprovacao de Chamados Zendesk - beforeCancelProcess - Cancela Solicitacao  - numProcess ' + 
			numProcess  + 
			+ ' ticket: ' + hAPI.getCardValue('ticket') 
			+ ' urlticket: ' + hAPI.getCardValue('urlticket')
			+ ' nmcont: ' + hAPI.getCardValue('nmcont') 
			+ ' nmorg: ' + hAPI.getCardValue('nmorg') 
			+ ' idAprovador: ' + hAPI.getCardValue('idAprovador')
			+ ' hieraraprovadoresoriginal: ' + hAPI.getCardValue('hieraraprovadoresoriginal')
			+ ' priorid: ' + hAPI.getCardValue('priorid')
			+ ' probrelac: ' + hAPI.getCardValue('probrelac')
			+ 'requesterId:' + hAPI.getCardValue('requesterId')
			+ ' cicloatual: ' + hAPI.getCardValue('cicloatual')
			+ ' emailUsuar_movimenta_tar: ' + hAPI.getCardValue('emailUsuar_movimenta_tar'));
	
	
	// Conecta o servico
	var NOME_SERVICO = "WSZendesk";
	var CAMINHO_SERVICO = "totvs.tdi.zendesk.WorkflowToZendesk_Service";		
	var servico = ServiceManager.getService(NOME_SERVICO);
	log.info(" @@3 CRIS - CANCELAMENTO MANUAL - Aprovacao de Chamados Zendesk - beforeCancelProcess - Cancela Solicitacao  - numProcess " + 
			numProcess  +
			" - SERVICO:" + servico);
	var instancia = servico.instantiate(CAMINHO_SERVICO);
	log.info(" @@4 CRIS - CANCELAMENTO MANUAL - Aprovacao de Chamados Zendesk - beforeCancelProcess - Cancela Solicitacao  - numProcess " + 
			numProcess  +
			" - INSTANCIA:" + instancia);
	var ws = instancia.getWorkflowToZendeskPort();
	
	//get email do colleagueId
	var cId = DatasetFactory.createConstraint("colleagueId", colleagueId, colleagueId, ConstraintType.MUST);
	var fields = new Array("colleagueId","colleagueName", "mail");
	var colaborador = DatasetFactory.getDataset("colleague", fields, new Array(cId), null);
	
	var emailAprovador = colaborador.getValue(0, "mail");
		
	//dados do ticket
	var ticketId = hAPI.getCardValue('ticket');
	
	log.info ('getValue(WKUserComment): ' + getValue("WKUserComment"));
	
	// alterado em 17/08
	if (getValue("WKUserComment").startsWith("#cancelTI")){
		var statusAprovacao = 'CanceladoManualFluig';
		// é quando ocorre erro de tarefa automatica, ou outra situacao que tenha que ser forcado
		var justificativa = 'Solicita&ccedil;&atilde;o ' +  processId + ' cancelada automaticamente devido prazo limite estipulado.';
	}
	else if (getValue("WKUserComment").toLowerCase() == "@cancelzend@" ||
			 getValue("WKUserComment").startsWith("@cancelzend@") ||
			 getValue("WKUserComment").startsWith("@CANCELZEND@")){
			var statusAprovacao = 'CanceladoManualZendesk';
			var justificativa = 'Solicita&ccedil;&atilde;o ' +  processId + ' cancelada pelo Zendesk - Ticket Resolvido';
	}
	else{
		var statusAprovacao = 'CanceladoManualFluig';
		var justificativa = 'Solicita&ccedil;&atilde;o ' +  processId + ' cancelada manualmente por ' + emailAprovador + ' Observa&ccedil;&otilde;es: ' + getValue("WKUserComment");
	}

	var cicloAprovacao = hAPI.getCardValue('cicloatual');

	var ticket = servico.instantiate('totvs.tdi.zendesk.Ticket');
	ticket.setTicketId(ticketId);
	// nao alterar o status do ticket
    //ticket.setStatus("open");

	//ticket.setRequesterId(emailAprovador);
    // ALTERACAO 31/05 - 01/06
    ticket.setRequesterId(hAPI.getCardValue('requesterId'));

    var comment = servico.instantiate('totvs.tdi.zendesk.Comment');
    //comment.setPublic(true);
    //alteração para onda 2
    var tipo_solicitacao = hAPI.getCardValue('tipo_solicitacao');

    comment.setPublic(false);
    comment.setBody(justificativa);
    ticket.setComment(comment);
    
    var custom = servico.instantiate('totvs.tdi.zendesk.CustomFields');
    custom.setAprovador(emailAprovador);
    custom.setHistoricoDeAprovacao(justificativa);
    custom.setStatusAprovacao(statusAprovacao);
    custom.setCicloAprovacao(cicloAprovacao);
    custom.setIdProcesso(processId);
    ticket.setCustomFields(custom);
     
    log.info(' @@5 CRIS - CANCELAMENTO MANUAL - Aprovacao de Chamados Zendesk - beforeCancelProcess - Cancela Solicitacao  - numProcess ' + 
			numProcess  +
			' >> setTicketId: ' + ticketId +
			' >> setRequesterId: ' + hAPI.getCardValue('requesterId') +
			' >> setPublic: false' +
			' >> setBody: ' + justificativa +
			' >> setComment' + comment +
			' >> setAprovador: ' + emailAprovador +
			' >> setHistoricoDeAprovacao: ' + justificativa +
			' >> setStatusAprovacao: ' + statusAprovacao +
			' >> setCicloAprovacao: ' + cicloAprovacao +
			' >> setIdProcesso: ' + numProcess +
			' >> setCustomFields: ' + custom);		
    	
    // TRATAMENTO DE RETORNOS DE CODIGOS - nao é possivel so pelo codigo, pois tem valores no json que podem coincidir com estes numeros
    // https://pt.wikipedia.org/wiki/Lista_de_c%C3%B3digos_de_status_HTTP
	//retornoUP.indexOf("422") > -1 ||
    
    if (getValue("WKUserComment").startsWith("#cancelTI") ){
		// deixar passar o cancelamento, pois é quando ocorre erro de tarefa automatica, ou outra situacao que tenha que ser forcado
	}
	else{	    
		
		var retorno = ws.updateTicket(ticket);
    
		if (retorno) {
			if (retorno != null) {

				var retornoUP = retorno.toUpperCase();
				log.info(' @@5.0 CRIS - CANCELAMENTO MANUAL - Aprovacao de Chamados Zendesk - beforeCancelProcess - RETORNO UPPER - numProcess ' + 
						  numProcess  + retornoUP);
							
			    if (retornoUP.indexOf("ERROR: ZENDESK ERROR") > -1 ||
			    	retornoUP.indexOf("CONNECTION REFUSED") > -1 ||
			    	retornoUP.indexOf("BAD REQUEST") > -1 
			    	){
			    	
					log.info('%%5.1 ERROR CANCEL MANUAL: Aprovacao de Chamados Zendesk - beforeCancelProcess ' + retorno);
					throw('Falha na integração com a Zendesk. Por favor confirme o cancelamento novamente.   ' +
						  'ERROR: ' + retorno);	
				};
			}
			else{
				log.info('%%5.2 NULO - CANCEL MANUAL: Aprovacao de Chamados Zendesk - beforeCancelProcess ' + retorno);
				throw('Falha na integração com a Zendesk. Por favor confirme o cancelamento novamente.   ' +
					  'ERROR: ' + retorno);	
			}
			
		}
		else{
			log.info('%%5.5 UNIDEFINED - CANCEL MANUAL: Aprovacao de Chamados Zendesk - beforeCancelProcess ' + retorno);
			throw('Falha na integração com a Zendesk. Por favor confirme o cancelamento novamente.   ' +
				  'ERROR: ' + retorno);	
		}
	
    
        log.info (' @@6 CRIS - CANCELAMENTO MANUAL - Aprovacao de Chamados Zendesk - beforeCancelProcess - Cancela Solicitacao - RETORNO - numProcess ' + 
					numProcess  +
				  'retorno: ' + retorno);
	}
}catch(E){
	if (retorno){
		log.info('ERROR CATCH CANCEL MANUAL: Aprovacao de Chamados Zendesk - beforeCancelProcess ' + E);
		throw('Falha na integração com a Zendesk. Por favor confirme o cancelamento novamente.   ' +
				  'ERROR: ' + retorno);
	}
	else{
		log.info('ERROR CATCH CANCEL MANUAL: Aprovacao de Chamados Zendesk - beforeCancelProcess ' + E);
		throw('Falha na integração com a Zendesk. Por favor confirme o cancelamento novamente.   ' + E);
	}
}

log.info (' @@7 CRIS - CANCELAMENTO MANUAL - Aprovacao de Chamados Zendesk - beforeCancelProcess - Cancela Solicitacao  FIM - numProcess ' + 
		numProcess );

}
*/