function createDataset(fields, constraints, sortFields) {

	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODIGO");
	newDataset.addColumn("DESCRICAO");

	log.info('AA XX PTO 1 - ATIV 5 - TESTE CRIA TICKET CST');

	var numProcess;

	try {
	
		// Conecta o servico
		var NOME_SERVICO = "WSZendesk2";
		var CAMINHO_SERVICO = "totvs.tdi.zendesk.WorkflowToZendesk_Service";		
		var servico = ServiceManager.getService(NOME_SERVICO);
		log.info("XX  SERVICO:" + servico);
		
		var instancia = servico.instantiate(CAMINHO_SERVICO);
		log.info("XX  instancia:" + instancia);
		
		var ws = instancia.getWorkflowToZendeskPort();
			
		var ticket = servico.instantiate('totvs.tdi.zendesk.TicketVo');

		var emailAgente;
		var emailSolic;
		var externalId;
		var motivo;
		var produtos;
		var itens;
		
		//TRATAMENTO CARACTERES CAMPO MOTIVO
		
			//motivo = ' “lightá” ';
				
			motivo = '7T93301007 – ID INT COMP: DO 1 AO 15 = 9' + "\n";
					 
			
			log.info("SENHA TEMPORARIA RENOVE - beforeStateEntry - motivo ANTES: " + motivo);
			
			 var com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝ?Þßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ?";
			 var sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
			 var novastr="";
			
			 for(i=0; i<motivo.length; i++) {
			    troca=false;
			    for (a=0; a<com_acento.length; a++) {
			      if (motivo.substr(i,1)==com_acento.substr(a,1)) {
			        novastr+=sem_acento.substr(a,1);
			        troca=true;
			        break;
			      }
			    }
			    if (troca==false) {
			      novastr+=motivo.substr(i,1);
			    }
			  }
			  motivo = novastr;
			    
			  motivo = motivo.replace(/[^a-zA-Z0-9]+.n/g,"");
				
	          log.info("SENHA TEMPORARIA RENOVE - beforeStateEntry - motivo DEPOIS: " + motivo);

          //FIM tratamento motivo					
          
	      var texto = "Motivo: " + motivo + "\n";
	            
	          
		//SANDBOX
		
			//dados do ticket
				ticket.setStatus("open"); // "new", "open", "pending", "hold", "solved", "closed"
			
				//para teste:
					emailSolic = "cristinapoffo@yahoo.com.br";
					externalId = "TEXHMP";
					ticket.setRequesterEmail(emailSolic);				
					ticket.setSubmitterEmail(emailSolic);
					
					
				//ticket.setRequesterEmail(hAPI.getCardValue("emailContato"));
				//ticket.setSubmitterEmail(hAPI.getCardValue("emailContato"));
				
				ticket.setGroupId(41215087); //SANDBOX CST-SENHAS
				ticket.setTicketFormId(762548); 
				ticket.setBrandId(1339048);
				ticket.setExternalId(externalId.toUpperCase());
				ticket.setType("question")
				ticket.setSubject("CST SENHAS - Nova Solicitacao Senha Temporaria")
				ticket.setDescription(texto);
				ticket.setPriority("normal");
				
				//ticket.setAssigneeEmail(emailAgente); // somente o grupo
				ticket.getEmailsCCs().add("cristina.poffo@totvs.com.br");

		   log.info('XX  X0 @CRIS - ANTES RETORNO');

		/*   var retorno = ws.createTicket(ticket);
			
		   log.info('XX  X1 @CRIS - RETORNO: ' + retorno);

		   
		   if (retorno) {
				if (retorno != null) {

					var retornoUP = retorno.toUpperCase();
					log.info('SENHA TEMPORARIA - beforeStateEntry - retornoUP: ' + retornoUP);
				
					log.info("XXXX2"); 
					
					if (retornoUP.indexOf("ERROR: ZENDESK ERROR") > -1 || 
				    	retornoUP.indexOf("CONNECTION REFUSED") > -1 ||
				    	retornoUP.indexOf("BAD REQUEST") > -1 ||
				    	retornoUP.indexOf('"ERRO":"ERRO DE AUTENTICA"') > -1 ||
					    retornoUP.indexOf("UNPROCESSABLE ENTITY") > -1
				    	){
						
						// os erros elencados abaixo, nao vem em formato json, apenas os erros originados da zendesk
						//  estes erros sao um reotorno de tratamento do webservice WSZendesk
						//1- ERROR: ZENDESK ERROR - EMAIL REQUESTER NAO POSSUI RELACIONAMENTO COM A ORGANIZACAO INFORMADA
						//2- ERROR: ZENDESK ERROR - EXTERNAL ID NAO ENCONTRADA
						//3- ERROR: ZENDESK ERROR - EMAIL REQUESTER NAO ENCONTRADO/ERROR: ZENDESK - E-EMAIL SUBMITER NAO ENCONTRADO
						
						//ERROR: ZENDESK ERROR - EMAIL ASSIGNEE NAO ENCONTRADO
						//ERROR: ZENDESK ERROR - CCs EMAIL: " + emailCC + " NAO ENCONTRADO
						
						
						log.info("XXXX3"); 

						//1- ERROR: ZENDESK ERROR - EMAIL REQUESTER NAO POSSUI RELACIONAMENTO COM A ORGANIZACAO INFORMADA
						if (retornoUP.indexOf("REQUESTER NAO POSSUI RELACIONAMENTO") > -1){
							log.info('SENHA TEMPORARIA - beforeStateEntry - ERROR 1.1 - retorno:' +
									 ' CONTATO NAO POSSUI RELACIONAMENTO COM A ORGANIZACAO NA ZENDESK - Favor entrar em contato(ticket) com a área de Atendimento(ti@totvs.com.br)' +
									 ' Detalhes:' + retorno);
						}
						//2- ERROR: ZENDESK ERROR - EXTERNAL ID NAO ENCONTRADA
						else if (retornoUP.indexOf("EXTERNAL ID NAO ENCONTRADA") > -1){
							log.info('SENHA TEMPORARIA - beforeStateEntry - ERROR 1.2 - retorno: ' + 
									'ORGANIZACAO = NAO ENCONTRADA ' +
									' Detalhes:' + retorno);
						}
						//3- ERROR: ZENDESK ERROR - EMAIL REQUESTER NAO ENCONTRADO/ERROR: ZENDESK - E-EMAIL SUBMITER NAO ENCONTRADO
						else if (retornoUP.indexOf("REQUESTER NAO ENCONTRADO") > -1 ||
								 retornoUP.indexOf("SUBMITER NAO ENCONTRADO") > -1){
							log.info('SENHA TEMPORARIA - beforeStateEntry - ERROR 1.3 - retorno: ' +  
									' CONTATO NAO ENCONTRADO' +
									' Detalhes:' + retorno);
						}
						else{
				    		log.info('SENHA TEMPORARIA - beforeStateEntry - ERROR 1.4 - retorno: ' + retorno);
						}
					
						newDataset.addRow(new Array("erro", retorno));
					} //if (retornoUP.indexOf("ERROR: ZENDESK ERROR") > -1 || ...
					

					//Grava o ticket no formulario
				    try{
				    	//pegando o numero do ticket 
					    var obj = JSON.parse(retorno);
					    
					    log.info ('XX  X2 @CRIS - RETORNO:' + obj.ticket.id);
						
						newDataset.addRow(new Array("TICKET CRIADO", obj.ticket.id));
						   
				    }
				    catch (e) {
				    	log.info ('SENHA TEMPORARIA - beforeStateEntry - NAO CONSEGUIU PEGAR O TICKET NO JSON');
						newDataset.addRow(new Array("erro", e));
					}
				    
				} // if (retorno != null) {
				else{
					try{
						//pegando a descricao do erro 
					    var obj = JSON.parse(retorno);
					    var descErro  = obj.ticket.descricao;
					    log.info('SENHA TEMPORARIA - beforeStateEntry - ERROR 2 - ' + descErro + ' retorno: ' + retorno);
					}
					catch (e) {
						log.info('SENHA TEMPORARIA - beforeStateEntry - ERROR 2 - retorno: ' + retorno);
						newDataset.addRow(new Array("erro", e));

					}
				}
				
			} // if (retorno)
			else{
				try{
					//pegando a descricao do erro 
				    var obj = JSON.parse(retorno);
				    var descErro  = obj.ticket.descricao;
					log.info('SENHA TEMPORARIA - beforeStateEntry - ERROR 3 - ' + descErro + ' retorno: ' + retorno);
					throw('Falha na integração com a Zendesk. ' +
						  'ERRO: ' + descErro + ' retorno: ' + retorno);	
				}
				catch (e) {
					log.info('SENHA TEMPORARIA - beforeStateEntry - ERROR 3 - retorno: ' + retorno);
					newDataset.addRow(new Array("erro", e));
				}
			}
			
		*/ 	
		newDataset.addRow(new Array("teste","teste"));
	}catch(E){
		log.info('AA XX  PTO 7 - ERROR - beforeStateEntry ' + E);
		newDataset.addRow(new Array("erro", E));

	}

	    	return newDataset;	

}



