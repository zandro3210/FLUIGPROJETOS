function beforeStateEntry(sequenceId){

}
/*  
	var numProcess 	= getValue("WKNumProces");
	
	log.info('Aprovacao de Chamados Zendesk - beforeStateEntry - numProcess ' + numProcess +
			' sequenceId: ' + sequenceId );
	
	if (sequenceId != "1") {
		log.info("BSE - Troca do ecmvalidate");
		hAPI.setCardValue("ecmvalidate", "1");
		log.info("BSE - Novo ecmvalidate = " + hAPI.getCardValue("ecmvalidate"));
	}
	
	// APOS CRIACAO - VAI PARA O PRIMEIRO APROVADOR
	if (sequenceId == 2){
		log.info('@CRIS - ATIV 2 - Aprovacao de Chamados Zendesk - beforeStateEntry - APROVACAO numProcess ' + numProcess +
				' sequenceId: ' + sequenceId + ' ticket: ' + hAPI.getCardValue('ticket') 
				+ ' urlticket: ' + hAPI.getCardValue('urlticket')
				+ ' nmcont: ' + hAPI.getCardValue('nmcont') 
				+ ' nmorg: ' + hAPI.getCardValue('nmorg') 
				+ ' idAprovador: ' + hAPI.getCardValue('idAprovador')
				+ ' hieraraprovadoresoriginal: ' + hAPI.getCardValue('hieraraprovadoresoriginal')
				+ ' priorid: ' + hAPI.getCardValue('priorid')
				+ ' probrelac: ' + hAPI.getCardValue('probrelac')
				+ 'requesterId:' + hAPI.getCardValue('requesterId')
				+ 'tipo_solicitacao:' + hAPI.getCardValue('tipo_solicitacao')
				+ ' cicloatual: ' + hAPI.getCardValue('cicloatual') +
				+ ' emailUsuar_movimenta_tar: ' + hAPI.getCardValue('emailUsuar_movimenta_tar'));
		
		//valida hierarquia aprovacao e retira o e-mail do presidente
		if(hAPI.getCardValue('hieraraprovadoresoriginal') == null || hAPI.getCardValue('hieraraprovadoresoriginal') == ""){
			
			log.info('Aprovacao de Chamados Zendesk - beforeStateEntry - verifica hierarquia aprovacao - processo ' + numProcess);
		
			var aprovadores = (hAPI.getCardValue('hieraraprovadores')).toLowerCase();
			//setando emails originais
			hAPI.setCardValue('hieraraprovadoresoriginal',aprovadores);
			
			
			// verificando duplicados e retirando
			var arrayUnicos = "";
			var arrayVerifDuplic = aprovadores.split(",");
			for ( var a = 0; a < arrayVerifDuplic.length; a++) {
				if(arrayUnicos.indexOf(arrayVerifDuplic[a]) == -1){
					if (arrayUnicos.length > 0) {
						arrayUnicos += "," + arrayVerifDuplic[a];
					}
					else{
						arrayUnicos += arrayVerifDuplic[a];
					}
				}
			}
			
			log.info("arrayUnicos: " + arrayUnicos + " - processo " + numProcess);
						
			var cAtive = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
			var dsEmailsExcluidos = DatasetFactory.getDataset("dsEmailsExcluidosEscalonamentoZendesk", null, new Array(cAtive), null);
			
			if(dsEmailsExcluidos.values.length > 0) {
				log.info("dsEmailsExcluidos.values.length > 0 - processo " + numProcess);
				
				var arrayHierarquia = arrayUnicos.split(",");
				var novaHierarquia = arrayHierarquia[0];
				
				var arrayExcluidos = (dsEmailsExcluidos.getValue(0, 'emailsExcluidos')).toLowerCase();
				
				if(arrayHierarquia.length > 1) {
					
					log.info("arrayHierarquia.length > 1 - processo " + numProcess);

					for(h=1;h<arrayHierarquia.length;h++) {
					  	if(arrayExcluidos.indexOf(arrayHierarquia[h]) == -1){
					  		novaHierarquia += "," + arrayHierarquia[h];
					  		log.info("novaHierarquia:" + novaHierarquia + " - processo " + numProcess);
					  	}
					}
				  hAPI.setCardValue('hieraraprovadores',novaHierarquia);
				  log.info('@CRISAprovacao de Chamados Zendesk - beforeStateEntry - nova hierarquia ' + novaHierarquia + ' - processo ' + numProcess);
				}
			}
		}
	}
  
	
	//APROVADOR MOVIMENTANDO A ATIVIDADE 2 - FINALIZACAO
	if (sequenceId == 4) {
	  
		log.info('Aprovacao de Chamados Zendesk - beforeStateEntry - Finaliza Solicitacao ' + numProcess );
		
		log.info('@CRIS - 1104 - ATIV 4 - Aprovacao de Chamados Zendesk - beforeStateEntry - APROVACAO numProcess ' + numProcess +
				' sequenceId: ' + sequenceId + ' ticket: ' + hAPI.getCardValue('ticket') 
				+ ' urlticket: ' + hAPI.getCardValue('urlticket')
				+ ' nmcont: ' + hAPI.getCardValue('nmcont') 
				+ ' nmorg: ' + hAPI.getCardValue('nmorg') 
				+ ' idAprovador: ' + hAPI.getCardValue('idAprovador')
				+ ' hieraraprovadoresoriginal: ' + hAPI.getCardValue('hieraraprovadoresoriginal')
				+ ' priorid: ' + hAPI.getCardValue('priorid')
				+ ' probrelac: ' + hAPI.getCardValue('probrelac')
				+ 'requesterId:' + hAPI.getCardValue('requesterId')
				+ 'tipo_solicitacao:' + hAPI.getCardValue('tipo_solicitacao')
				+ ' cicloatual: ' + hAPI.getCardValue('cicloatual') 
				+ ' emailUsuar_movimenta_tar: ' + hAPI.getCardValue('emailUsuar_movimenta_tar') +
				' LIBERACAO ONDA 2 - 29072016 23 H');
		
		try {
			// Conecta o servico
			var NOME_SERVICO = "WSZendesk";
			var CAMINHO_SERVICO = "totvs.tdi.zendesk.WorkflowToZendesk_Service";		
			var servico = ServiceManager.getService(NOME_SERVICO);
			log.info("SERVICO:" + servico);
			var instancia = servico.instantiate(CAMINHO_SERVICO);
			log.info("instancia:" + instancia);
			var ws = instancia.getWorkflowToZendeskPort();
				
			//dados do ticket
			var ticketId = hAPI.getCardValue('ticket');
			var statusAprovacao = hAPI.getCardValue('status_aprovacao');
			var cicloAprovacao = hAPI.getCardValue('cicloatual');
			var justificativa = hAPI.getCardValue('justificativa');
			var idAprovador = hAPI.getCardValue('idAprovador');
			var emailAprovador = hAPI.getCardValue('emailAprovador');
			
			var comentarios = '';
			var tipo_solicitacao = hAPI.getCardValue('tipo_solicitacao');
			
			log.info('Aprovacao de Chamados Zendesk - beforeStateEntry - numProcess ' + numProcess +
			 ' - tipo_solicitacao: ' + tipo_solicitacao); 
			
			if (tipo_solicitacao.startsWith("ouvidoria") ||
				tipo_solicitacao.startsWith("OUVIDORIA")){
				if ((hAPI.getCardValue('emailUsuar_movimenta_tar') == "") ||
				    (hAPI.getCardValue('emailUsuar_movimenta_tar') == hAPI.getCardValue('emailAprovador'))) {
					comentarios = 'Solicita&ccedil;&atilde;o ' +  numProcess + ' finalizada por ' + emailAprovador + '. Observa&ccedil;&otilde;es: ' + justificativa;
				}
				else{
					comentarios = 'Solicita&ccedil;&atilde;o ' +  numProcess + ' finalizada em nome de ' + emailAprovador + '. Observa&ccedil;&otilde;es: ' + justificativa +
								  '. Responsavel Substituto: ' + hAPI.getCardValue('emailUsuar_movimenta_tar');
				}
			}
			else{
				if (statusAprovacao == 'Aprovado') {
					if ((hAPI.getCardValue('emailUsuar_movimenta_tar') == "") ||
					   (hAPI.getCardValue('emailUsuar_movimenta_tar') == hAPI.getCardValue('emailAprovador'))) {
						comentarios = 'Solicita&ccedil;&atilde;o ' +  numProcess + ' aprovada por ' + emailAprovador + '. Observa&ccedil;&otilde;es: ' + justificativa;
					}
					else{
						comentarios = 'Solicita&ccedil;&atilde;o ' +  numProcess + ' aprovada em nome de ' + emailAprovador + '. Observa&ccedil;&otilde;es: ' + justificativa +
									  '. Responsavel Substituto: ' + hAPI.getCardValue('emailUsuar_movimenta_tar');
					}
				} else {
					if ((hAPI.getCardValue('emailUsuar_movimenta_tar') == "") ||
						(hAPI.getCardValue('emailUsuar_movimenta_tar') == hAPI.getCardValue('emailAprovador'))) {
						comentarios = 'Solicita&ccedil;&atilde;o ' + numProcess + ' reprovada por ' + emailAprovador + '. Observa&ccedil;&otilde;es: ' + justificativa;
					}
					else{
						comentarios = 'Solicita&ccedil;&atilde;o ' + numProcess + ' reprovada em nome de ' + emailAprovador + '. Observa&ccedil;&otilde;es: ' + justificativa +
						  			  '. Responsavel Substituto: ' + hAPI.getCardValue('emailUsuar_movimenta_tar');
						
					}
				}
			}
			
			var ticket = servico.instantiate('totvs.tdi.zendesk.Ticket');
			ticket.setId(ticketId);
	        
			var dados = servico.instantiate('totvs.tdi.zendesk.Dados');
			dados.setRequesterId(hAPI.getCardValue('requesterId'));
			
	        var comment = servico.instantiate('totvs.tdi.zendesk.Comment');
		    comment.setPublic(false);
	    	comment.setBody(comentarios);
		    
		    dados.setComment(comment);
		    
		    var tipo_solicitacao = hAPI.getCardValue('tipo_solicitacao');
	    	
	    	var aprovacao = servico.instantiate('totvs.tdi.zendesk.Aprovacao');
	    	aprovacao.setStatusAprovacao(statusAprovacao);
	    	//aprovacao.setCicloAprovacao(cicloAprovacao);
	    	aprovacao.setCicloAprovacao(parseInt(cicloAprovacao));
	    	
	    	//aprovacao.setIdProcesso(numProcess);
	    	aprovacao.setIdProcesso(parseFloat(numProcess));
	    	
	    	aprovacao.setHistoricoDeAprovacao(comentarios);
	    	aprovacao.setAprovador(emailAprovador);
	        
	        ticket.setAprovacao(aprovacao);
	        ticket.setDados(dados);
	        
	        
	        log.info('@CRIS - 1104 - ATIV 4 - Aprovacao de Chamados Zendesk - beforeStateEntry - ANTES WS.UPDATETICKET' +
	        		' - processo : ' + numProcess +
					' >> sequenceId: ' + sequenceId + 
					' >> setTicketId: ' + ticketId +
					' >> setRequesterId: ' + hAPI.getCardValue('requesterId') +
					' >> setPublic: false' +
					' >> setBody: ' + comentarios +
					' >> setComment' + comment +
					' >> setAprovador: ' + emailAprovador +
					' >> setHistoricoDeAprovacao: ' + comentarios +
					' >> setStatusAprovacao: ' + statusAprovacao +
					' >> setCicloAprovacao: ' + cicloAprovacao +
					' >> setIdProcesso: ' + numProcess);		
	        	        
	        
	        var retorno = ws.updateTicket(ticket);
		    
			if (retorno) {
				if (retorno != null) {

					var retornoUP = retorno.toUpperCase();
					log.info(' @@5.0 CRIS - ATIV 4 - Aprovacao de Chamados Zendesk - beforeStateEntry - RETORNO UPPER - numProcess ' + 
							  numProcess  + " - " + retornoUP);
				
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
							throw('Estamos com alto consumo de requisicoes na Zendesk e não foi possivel completar sua transação. Por favor envie/finalize novamente.   ' +
								  'ERROR: ' + retorno);
						 }
						 else{
							log.info('%%5.1 ERROR ATIV 4 - Aprovacao de Chamados Zendesk - beforeStateEntry  - numProcess ' + 
									  numProcess  + 'retorno: ' + retorno);
							throw('Falha na integração com a Zendesk. Por favor envie/finalize novamente.   ' +
								  'ERROR: ' + retorno);	
						 }
					}
				}
				else{
					log.info('%%5.2 NULO - ATIV 4 - Aprovacao de Chamados Zendesk - beforeStateEntry - numProcess ' + 
							  numProcess  + 'retorno: ' + retorno);
					throw('Falha na integração com a Zendesk. Por favor envie/finalize novamente.   ' +
						  'ERROR: ' + retorno);	
				}
				
			}
			else{
				log.info('%%5.5 UNIDEFINED - ATIV 4 - Aprovacao de Chamados Zendesk - beforeStateEntry - numProcess ' + 
						  numProcess  + 'retorno: ' + retorno);
				throw('Falha na integração com a Zendesk. Por favor envie/finalize novamente.   ' +
					  'ERROR: ' + retorno);	
			}
				        
	        
	        log.info ('%%6 - ATIV 4 - Aprovacao de Chamados Zendesk - beforeStateEntry - RETORNO DO WS.UPDATETICKET ' +
	        		  ' - processo : ' + numProcess +
					  ' >> sequenceId: ' + sequenceId + 
					  'retorno: ' + retorno);
	        
		}catch(E){
			log.info('ERROR - ATIV 4 -: Aprovacao de Chamados Zendesk - beforeStateEntry ' + E);
			throw('ERROR: Aprovacao de Chamados Zendesk - beforeStateEntry ' + E);
		}
	}
  
	//CANCELAMENTO AUTOMATICO
	if (sequenceId == 16) {
		log.info('Aprovacao de Chamados Zendesk - beforeStateEntry - CANCELAMENTO AUTOMATICO - numProcess: ' + numProcess );
		

		log.info('@CRIS - 1104 - ATIV 16 - Aprovacao de Chamados Zendesk - beforeStateEntry - CANCELAMENTO AUTOMATICO numProcess ' + numProcess +
				' sequenceId: ' + sequenceId + ' ticket: ' + hAPI.getCardValue('ticket') 
				+ ' urlticket: ' + hAPI.getCardValue('urlticket')
				+ ' nmcont: ' + hAPI.getCardValue('nmcont') 
				+ ' nmorg: ' + hAPI.getCardValue('nmorg') 
				+ ' idAprovador: ' + hAPI.getCardValue('idAprovador')
				+ ' hieraraprovadoresoriginal: ' + hAPI.getCardValue('hieraraprovadoresoriginal')
				+ ' priorid: ' + hAPI.getCardValue('priorid')
				+ ' probrelac: ' + hAPI.getCardValue('probrelac')
				+ 'requesterId:' + hAPI.getCardValue('requesterId')
				+ 'tipo_solicitacao:' + hAPI.getCardValue('tipo_solicitacao')
				+ ' cicloatual: ' + hAPI.getCardValue('cicloatual'));
		
		try {
			// Conecta o servico
			var NOME_SERVICO = "WSZendesk";
			var CAMINHO_SERVICO = "totvs.tdi.zendesk.WorkflowToZendesk_Service";		
			var servico = ServiceManager.getService(NOME_SERVICO);
			log.info("SERVICO:" + servico);
			var instancia = servico.instantiate(CAMINHO_SERVICO);
			log.info("instancia:" + instancia);
			var ws = instancia.getWorkflowToZendeskPort();
				
			 var tipo_solicitacao = hAPI.getCardValue('tipo_solicitacao');

			 
			//dados do ticket
			var ticketId = hAPI.getCardValue('ticket');
			var statusAprovacao = 'CanceladoAutomatico';
			var cicloAprovacao = hAPI.getCardValue('cicloatual');
			var justificativa = 'Solicita&ccedil;&atilde;o ' + numProcess + ' cancelada automaticamente devido prazo limite estipulado.';
			var emailAprovador = hAPI.getCardValue('emailAprovador');
		
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
		     
	        log.info('@CRIS - 1104 - ATIV 16 - Aprovacao de Chamados Zendesk - beforeStateEntry - CANCELAMENTO AUTOMATICO ' +
	        		' - processo : ' + numProcess +
					' >> sequenceId: ' + sequenceId + 
					' >> setTicketId: ' + ticketId +
					' >> setRequesterId: ' + hAPI.getCardValue('requesterId') +
					' >> setPublic: false' +
					' >> setBody: ' + justificativa +
					' >> setComment' + comment +
					' >> setAprovador: ' + emailAprovador +
					' >> setHistoricoDeAprovacao: ' + justificativa +
					' >> setStatusAprovacao: ' + statusAprovacao +
					' >> setCicloAprovacao: ' + cicloAprovacao +
					' >> setIdProcesso: ' + numProcess );		
	        	        		    
		    var retorno = ws.updateTicket(ticket);
		    
			if (retorno) {
				if (retorno != null) {

					var retornoUP = retorno.toUpperCase();
					log.info(' @@5.0 CRIS - ATIV 16 - Aprovacao de Chamados Zendesk - beforeStateEntry - CANCELAMENTO AUTOMATICO - RETORNO UPPER - numProcess ' + 
							  numProcess  + retornoUP);
				
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
				else{
					log.info('%%5.2 NULO - ATIV 16 - Aprovacao de Chamados Zendesk - beforeStateEntry - CANCELAMENTO AUTOMATICO - numProcess ' + 
							  numProcess  + 'retorno: ' + retorno);
					throw('Falha na integração com a Zendesk. Por favor confirme o cancelamento novamente.   ' +
						  'ERROR: ' + retorno);	
				}
				
			}
			else{
				log.info('%%5.5 UNIDEFINED - ATIV 16 - Aprovacao de Chamados Zendesk - beforeStateEntry - CANCELAMENTO AUTOMATICO - numProcess ' + 
						  numProcess  + 'retorno: ' + retorno);
				throw('Falha na integração com a Zendesk. Por favor confirme o cancelamento novamente.   ' +
					  'ERROR: ' + retorno);	
			}
		    
		    
	        log.info ('@CRIS - ATIV 16 - Aprovacao de Chamados Zendesk - beforeStateEntry - CANCELAMENTO AUTOMATICO numProcess ' + numProcess +
	        		  ' >> sequenceId: ' + sequenceId + 
					  'retorno: ' + retorno);
		    
		}catch(E){
			log.info('ERROR - ATIV 16 : Aprovacao de Chamados Zendesk - beforeStateEntry - CANCELAMENTO AUTOMATICO' + E);
			throw('ERROR: Aprovacao de Chamados Zendesk - beforeStateEntry ' + E);
		}
	}
}




ANTIGO
  
 function beforeStateEntry(sequenceId){
	var numProcess 	= getValue("WKNumProces");
	
	log.info('Aprovacao de Chamados Zendesk - beforeStateEntry - numProcess ' + numProcess +
			' sequenceId: ' + sequenceId );
	
	if (sequenceId != "1") {
		log.info("BSE - Troca do ecmvalidate");
		hAPI.setCardValue("ecmvalidate", "1");
		log.info("BSE - Novo ecmvalidate = " + hAPI.getCardValue("ecmvalidate"));
	}
	
	// APOS CRIACAO - VAI PARA O PRIMEIRO APROVADOR
	if (sequenceId == 2){
		log.info('@CRIS - ATIV 2 - Aprovacao de Chamados Zendesk - beforeStateEntry - APROVACAO numProcess ' + numProcess +
				' sequenceId: ' + sequenceId + ' ticket: ' + hAPI.getCardValue('ticket') 
				+ ' urlticket: ' + hAPI.getCardValue('urlticket')
				+ ' nmcont: ' + hAPI.getCardValue('nmcont') 
				+ ' nmorg: ' + hAPI.getCardValue('nmorg') 
				+ ' idAprovador: ' + hAPI.getCardValue('idAprovador')
				+ ' hieraraprovadoresoriginal: ' + hAPI.getCardValue('hieraraprovadoresoriginal')
				+ ' priorid: ' + hAPI.getCardValue('priorid')
				+ ' probrelac: ' + hAPI.getCardValue('probrelac')
				+ 'requesterId:' + hAPI.getCardValue('requesterId')
				+ 'tipo_solicitacao:' + hAPI.getCardValue('tipo_solicitacao')
				+ ' cicloatual: ' + hAPI.getCardValue('cicloatual') +
				+ ' emailUsuar_movimenta_tar: ' + hAPI.getCardValue('emailUsuar_movimenta_tar'));
		
		//valida hierarquia aprovacao e retira o e-mail do presidente
		if(hAPI.getCardValue('hieraraprovadoresoriginal') == null || hAPI.getCardValue('hieraraprovadoresoriginal') == ""){
			
			log.info('Aprovacao de Chamados Zendesk - beforeStateEntry - verifica hierarquia aprovacao - processo ' + numProcess);
		
			var aprovadores = (hAPI.getCardValue('hieraraprovadores')).toLowerCase();
			//setando emails originais
			hAPI.setCardValue('hieraraprovadoresoriginal',aprovadores);
			
			
			// verificando duplicados e retirando
			var arrayUnicos = "";
			var arrayVerifDuplic = aprovadores.split(",");
			for ( var a = 0; a < arrayVerifDuplic.length; a++) {
				if(arrayUnicos.indexOf(arrayVerifDuplic[a]) == -1){
					if (arrayUnicos.length > 0) {
						arrayUnicos += "," + arrayVerifDuplic[a];
					}
					else{
						arrayUnicos += arrayVerifDuplic[a];
					}
				}
			}
			
			log.info("arrayUnicos: " + arrayUnicos + " - processo " + numProcess);
						
			var cAtive = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
			var dsEmailsExcluidos = DatasetFactory.getDataset("dsEmailsExcluidosEscalonamentoZendesk", null, new Array(cAtive), null);
			
			if(dsEmailsExcluidos.values.length > 0) {
				log.info("dsEmailsExcluidos.values.length > 0 - processo " + numProcess);
				
				var arrayHierarquia = arrayUnicos.split(",");
				var novaHierarquia = arrayHierarquia[0];
				
				var arrayExcluidos = (dsEmailsExcluidos.getValue(0, 'emailsExcluidos')).toLowerCase();
				
				if(arrayHierarquia.length > 1) {
					
					log.info("arrayHierarquia.length > 1 - processo " + numProcess);

					for(h=1;h<arrayHierarquia.length;h++) {
					  	if(arrayExcluidos.indexOf(arrayHierarquia[h]) == -1){
					  		novaHierarquia += "," + arrayHierarquia[h];
					  		log.info("novaHierarquia:" + novaHierarquia + " - processo " + numProcess);
					  	}
					}
				  hAPI.setCardValue('hieraraprovadores',novaHierarquia);
				  log.info('@CRISAprovacao de Chamados Zendesk - beforeStateEntry - nova hierarquia ' + novaHierarquia + ' - processo ' + numProcess);
				}
			}
		}
	}
  
	
	//APROVADOR MOVIMENTANDO A ATIVIDADE 2 - FINALIZACAO
	if (sequenceId == 4) {
	  
		log.info('Aprovacao de Chamados Zendesk - beforeStateEntry - Finaliza Solicitacao ' + numProcess );
		
		log.info('@CRIS - ATIV 4 - Aprovacao de Chamados Zendesk - beforeStateEntry - APROVACAO numProcess ' + numProcess +
				' sequenceId: ' + sequenceId + ' ticket: ' + hAPI.getCardValue('ticket') 
				+ ' urlticket: ' + hAPI.getCardValue('urlticket')
				+ ' nmcont: ' + hAPI.getCardValue('nmcont') 
				+ ' nmorg: ' + hAPI.getCardValue('nmorg') 
				+ ' idAprovador: ' + hAPI.getCardValue('idAprovador')
				+ ' hieraraprovadoresoriginal: ' + hAPI.getCardValue('hieraraprovadoresoriginal')
				+ ' priorid: ' + hAPI.getCardValue('priorid')
				+ ' probrelac: ' + hAPI.getCardValue('probrelac')
				+ 'requesterId:' + hAPI.getCardValue('requesterId')
				+ 'tipo_solicitacao:' + hAPI.getCardValue('tipo_solicitacao')
				+ ' cicloatual: ' + hAPI.getCardValue('cicloatual') 
				+ ' emailUsuar_movimenta_tar: ' + hAPI.getCardValue('emailUsuar_movimenta_tar') +
				' LIBERACAO ONDA 2 - 29072016 23 H');
		
		try {
			// Conecta o servico
			var NOME_SERVICO = "WSZendesk";
			var CAMINHO_SERVICO = "totvs.tdi.zendesk.WorkflowToZendesk_Service";		
			var servico = ServiceManager.getService(NOME_SERVICO);
			log.info("SERVICO:" + servico);
			var instancia = servico.instantiate(CAMINHO_SERVICO);
			log.info("instancia:" + instancia);
			var ws = instancia.getWorkflowToZendeskPort();
				
			//dados do ticket
			var ticketId = hAPI.getCardValue('ticket');
			var statusAprovacao = hAPI.getCardValue('status_aprovacao');
			var cicloAprovacao = hAPI.getCardValue('cicloatual');
			var justificativa = hAPI.getCardValue('justificativa');
			var idAprovador = hAPI.getCardValue('idAprovador');
			var emailAprovador = hAPI.getCardValue('emailAprovador');
			
			var comentarios = '';
			var tipo_solicitacao = hAPI.getCardValue('tipo_solicitacao');
			
			log.info('Aprovacao de Chamados Zendesk - beforeStateEntry - numProcess ' + numProcess +
			 ' - tipo_solicitacao: ' + tipo_solicitacao); 
			
			if (tipo_solicitacao.startsWith("ouvidoria") ||
				tipo_solicitacao.startsWith("OUVIDORIA")){
				if ((hAPI.getCardValue('emailUsuar_movimenta_tar') == "") ||
				    (hAPI.getCardValue('emailUsuar_movimenta_tar') == hAPI.getCardValue('emailAprovador'))) {
					comentarios = 'Solicita&ccedil;&atilde;o ' +  numProcess + ' finalizada por ' + emailAprovador + '. Observa&ccedil;&otilde;es: ' + justificativa;
				}
				else{
					comentarios = 'Solicita&ccedil;&atilde;o ' +  numProcess + ' finalizada em nome de ' + emailAprovador + '. Observa&ccedil;&otilde;es: ' + justificativa +
								  '. Responsavel Substituto: ' + hAPI.getCardValue('emailUsuar_movimenta_tar');
				}
			}
			else{
				if (statusAprovacao == 'Aprovado') {
					if ((hAPI.getCardValue('emailUsuar_movimenta_tar') == "") ||
					   (hAPI.getCardValue('emailUsuar_movimenta_tar') == hAPI.getCardValue('emailAprovador'))) {
						comentarios = 'Solicita&ccedil;&atilde;o ' +  numProcess + ' aprovada por ' + emailAprovador + '. Observa&ccedil;&otilde;es: ' + justificativa;
					}
					else{
						comentarios = 'Solicita&ccedil;&atilde;o ' +  numProcess + ' aprovada em nome de ' + emailAprovador + '. Observa&ccedil;&otilde;es: ' + justificativa +
									  '. Responsavel Substituto: ' + hAPI.getCardValue('emailUsuar_movimenta_tar');
					}
				} else {
					if ((hAPI.getCardValue('emailUsuar_movimenta_tar') == "") ||
						(hAPI.getCardValue('emailUsuar_movimenta_tar') == hAPI.getCardValue('emailAprovador'))) {
						comentarios = 'Solicita&ccedil;&atilde;o ' + numProcess + ' reprovada por ' + emailAprovador + '. Observa&ccedil;&otilde;es: ' + justificativa;
					}
					else{
						comentarios = 'Solicita&ccedil;&atilde;o ' + numProcess + ' reprovada em nome de ' + emailAprovador + '. Observa&ccedil;&otilde;es: ' + justificativa +
						  			  '. Responsavel Substituto: ' + hAPI.getCardValue('emailUsuar_movimenta_tar');
						
					}
				}
			}
			
			var ticket = servico.instantiate('totvs.tdi.zendesk.Ticket');
	        ticket.setTicketId(ticketId);
	        
	        // nao alterar o status do ticket
	        //ticket.setStatus("open");

	        // ALTERACAO 31/05 - 01/06
	        ticket.setRequesterId(hAPI.getCardValue('requesterId'));
	
	        var comment = servico.instantiate('totvs.tdi.zendesk.Comment');
		    //alteração para onda 2
		    var tipo_solicitacao = hAPI.getCardValue('tipo_solicitacao');
		    
		    comment.setPublic(false);
	    	comment.setBody(comentarios);
	        ticket.setComment(comment);
	        var custom = servico.instantiate('totvs.tdi.zendesk.CustomFields');
	        custom.setAprovador(emailAprovador);
	        custom.setHistoricoDeAprovacao(comentarios);
	        custom.setStatusAprovacao(statusAprovacao);
	        custom.setCicloAprovacao(cicloAprovacao);
	        custom.setIdProcesso(numProcess);
	        ticket.setCustomFields(custom);
	        
	        
	        log.info('@CRIS - ATIV 4 - Aprovacao de Chamados Zendesk - beforeStateEntry - ANTES WS.UPDATETICKET' +
	        		' - processo : ' + numProcess +
					' >> sequenceId: ' + sequenceId + 
					' >> setTicketId: ' + ticketId +
					' >> setRequesterId: ' + hAPI.getCardValue('requesterId') +
					' >> setPublic: false' +
					' >> setBody: ' + comentarios +
					' >> setComment' + comment +
					' >> setAprovador: ' + emailAprovador +
					' >> setHistoricoDeAprovacao: ' + comentarios +
					' >> setStatusAprovacao: ' + statusAprovacao +
					' >> setCicloAprovacao: ' + cicloAprovacao +
					' >> setIdProcesso: ' + numProcess +
					' >> setCustomFields: ' + custom);		
	        	        
	        
	        var retorno = ws.updateTicket(ticket);
		    
			if (retorno) {
				if (retorno != null) {

					var retornoUP = retorno.toUpperCase();
					log.info(' @@5.0 CRIS - ATIV 4 - Aprovacao de Chamados Zendesk - beforeStateEntry - RETORNO UPPER - numProcess ' + 
							  numProcess  + retornoUP);
				
				    if (retornoUP.indexOf("ERROR: ZENDESK ERROR") > -1 || 
				    	retornoUP.indexOf("CONNECTION REFUSED") > -1 ||
				    	retornoUP.indexOf("BAD REQUEST") > -1 
				    	){
				    	
						log.info('%%5.1 ERROR ATIV 4 - Aprovacao de Chamados Zendesk - beforeStateEntry  - numProcess ' + 
								  numProcess  + 'retorno: ' + retorno);
						throw('Falha na integração com a Zendesk. Por favor confirme o cancelamento novamente.   ' +
							  'ERROR: ' + retorno);	
					};
				}
				else{
					log.info('%%5.2 NULO - ATIV 4 - Aprovacao de Chamados Zendesk - beforeStateEntry - numProcess ' + 
							  numProcess  + 'retorno: ' + retorno);
					throw('Falha na integração com a Zendesk. Por favor confirme o cancelamento novamente.   ' +
						  'ERROR: ' + retorno);	
				}
				
			}
			else{
				log.info('%%5.5 UNIDEFINED - ATIV 4 - Aprovacao de Chamados Zendesk - beforeStateEntry - numProcess ' + 
						  numProcess  + 'retorno: ' + retorno);
				throw('Falha na integração com a Zendesk. Por favor confirme o cancelamento novamente.   ' +
					  'ERROR: ' + retorno);	
			}
				        
	        
	        log.info ('%%6 - ATIV 4 - Aprovacao de Chamados Zendesk - beforeStateEntry - RETORNO DO WS.UPDATETICKET ' +
	        		  ' - processo : ' + numProcess +
					  ' >> sequenceId: ' + sequenceId + 
					  'retorno: ' + retorno);
	        
		}catch(E){
			log.info('ERROR - ATIV 4 -: Aprovacao de Chamados Zendesk - beforeStateEntry ' + E);
			throw('ERROR: Aprovacao de Chamados Zendesk - beforeStateEntry ' + E);
		}
	}
  
	//CANCELAMENTO AUTOMATICO
	if (sequenceId == 12) {
		log.info('Aprovacao de Chamados Zendesk - beforeStateEntry - CANCELAMENTO AUTOMATICO - numProcess: ' + numProcess );
		

		log.info('@CRIS - ATIV 12 - Aprovacao de Chamados Zendesk - beforeStateEntry - CANCELAMENTO AUTOMATICO numProcess ' + numProcess +
				' sequenceId: ' + sequenceId + ' ticket: ' + hAPI.getCardValue('ticket') 
				+ ' urlticket: ' + hAPI.getCardValue('urlticket')
				+ ' nmcont: ' + hAPI.getCardValue('nmcont') 
				+ ' nmorg: ' + hAPI.getCardValue('nmorg') 
				+ ' idAprovador: ' + hAPI.getCardValue('idAprovador')
				+ ' hieraraprovadoresoriginal: ' + hAPI.getCardValue('hieraraprovadoresoriginal')
				+ ' priorid: ' + hAPI.getCardValue('priorid')
				+ ' probrelac: ' + hAPI.getCardValue('probrelac')
				+ 'requesterId:' + hAPI.getCardValue('requesterId')
				+ 'tipo_solicitacao:' + hAPI.getCardValue('tipo_solicitacao')
				+ ' cicloatual: ' + hAPI.getCardValue('cicloatual'));
		
		try {
			// Conecta o servico
			var NOME_SERVICO = "WSZendesk";
			var CAMINHO_SERVICO = "totvs.tdi.zendesk.WorkflowToZendesk_Service";		
			var servico = ServiceManager.getService(NOME_SERVICO);
			log.info("SERVICO:" + servico);
			var instancia = servico.instantiate(CAMINHO_SERVICO);
			log.info("instancia:" + instancia);
			var ws = instancia.getWorkflowToZendeskPort();
				
			//dados do ticket
			var ticketId = hAPI.getCardValue('ticket');
			//alterado em 17/08/16
			//comentar //var statusAprovacao = 'Cancelado';
			var statusAprovacao = 'CanceladoAutomatico';
			var cicloAprovacao = hAPI.getCardValue('cicloatual');
			var justificativa = 'Solicita&ccedil;&atilde;o ' + numProcess + ' cancelada automaticamente devido prazo limite estipulado.';
			var emailAprovador = hAPI.getCardValue('emailAprovador');
		
			var ticket = servico.instantiate('totvs.tdi.zendesk.Ticket');
			ticket.setTicketId(ticketId);
			// nao alterar o status do ticket
	        //ticket.setStatus("open");
			
			// ALTERACAO 31/05 - 01/06
	        ticket.setRequesterId(hAPI.getCardValue('requesterId'));
	
			
	        var comment = servico.instantiate('totvs.tdi.zendesk.Comment');
		    
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
	        custom.setIdProcesso(numProcess);
		    ticket.setCustomFields(custom);
		     
	        log.info('@CRIS - ATIV 12 - Aprovacao de Chamados Zendesk - beforeStateEntry - CANCELAMENTO AUTOMATICO ' +
	        		' - processo : ' + numProcess +
					' >> sequenceId: ' + sequenceId + 
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
	        	        		    
		    var retorno = ws.updateTicket(ticket);
		    
			if (retorno) {
				if (retorno != null) {

					var retornoUP = retorno.toUpperCase();
					log.info(' @@5.0 CRIS - ATIV 12 - Aprovacao de Chamados Zendesk - beforeStateEntry - CANCELAMENTO AUTOMATICO - RETORNO UPPER - numProcess ' + 
							  numProcess  + retornoUP);
				
				    if (retornoUP.indexOf("ERROR: ZENDESK ERROR") > -1 || 
				    	retornoUP.indexOf("CONNECTION REFUSED") > -1 ||
				    	retornoUP.indexOf("BAD REQUEST") > -1 
				    	){
				    	
						log.info('%%5.1 ERROR ATIV 12 - Aprovacao de Chamados Zendesk - beforeStateEntry  - CANCELAMENTO AUTOMATICO - numProcess ' + 
								  numProcess  + 'retorno: ' + retorno);
						throw('Falha na integração com a Zendesk. Por favor confirme o cancelamento novamente.   ' +
							  'ERROR: ' + retorno);	
					};
				}
				else{
					log.info('%%5.2 NULO - ATIV 12 - Aprovacao de Chamados Zendesk - beforeStateEntry - CANCELAMENTO AUTOMATICO - numProcess ' + 
							  numProcess  + 'retorno: ' + retorno);
					throw('Falha na integração com a Zendesk. Por favor confirme o cancelamento novamente.   ' +
						  'ERROR: ' + retorno);	
				}
				
			}
			else{
				log.info('%%5.5 UNIDEFINED - ATIV 12 - Aprovacao de Chamados Zendesk - beforeStateEntry - CANCELAMENTO AUTOMATICO - numProcess ' + 
						  numProcess  + 'retorno: ' + retorno);
				throw('Falha na integração com a Zendesk. Por favor confirme o cancelamento novamente.   ' +
					  'ERROR: ' + retorno);	
			}
		    
		    
	        log.info ('@CRIS - ATIV 12 - Aprovacao de Chamados Zendesk - beforeStateEntry - CANCELAMENTO AUTOMATICO numProcess ' + numProcess +
	        		  ' >> sequenceId: ' + sequenceId + 
					  'retorno: ' + retorno);
		    
		}catch(E){
			log.info('ERROR - ATIV 12 : Aprovacao de Chamados Zendesk - beforeStateEntry - CANCELAMENTO AUTOMATICO' + E);
			throw('ERROR: Aprovacao de Chamados Zendesk - beforeStateEntry ' + E);
		}
	}
}
 */