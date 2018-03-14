function afterTaskCreate(colleagueId){
 			var numProcess 	= getValue("WKNumProces");
 			var nrProximaAtividade = getValue("WKNextState");
 		
 			log.info('Aprovacao de Chamados Zendesk - afterTaskCreate - numProcess ' + numProcess +
 					' colleagueId: ' + colleagueId );
 			
 			/*
 			 * Define prazo da aprovacao de acordo com o tipo da solicitacao
 			 * Caso seja 2 - Solicitacao Ouvidoria - prazo de 8 horas uteis
 			*/
 			
 			var tipo_solicitacao = hAPI.getCardValue('tipo_solicitacao');
 			var idAprovador = hAPI.getCardValue('idAprovador');
 			
 			log.info('Aprovacao de Chamados Zendesk - afterTaskCreate - numProcess ' + numProcess +
 					' nrProximaAtividade: ' + nrProximaAtividade + ' altera prazo - Tipo solicitacao ' + tipo_solicitacao);
 			
 			var data = new java.util.Date();
 			var hora    = data.getHours();          // 0-23
 			var min     = data.getMinutes();        // 0-59
 			var seg     = data.getSeconds();        // 0-59
 			var totalHoraAtual = (parseInt(hora)*60*60) + (parseInt(min)*60) + seg;
 			
 			log.info('Aprovacao de Chamados Zendesk - afterTaskCreate - numProcess ' + numProcess +
 					 'Prazo original tarefa - hora: ' + hora + 'minuto : ' + min + 'segundo: ' + seg);
 			log.info('Aprovacao de Chamados Zendesk - afterTaskCreate - numProcess ' + numProcess +
 					 'Tipo solicitacao: ' + tipo_solicitacao);
 		
 			log.info('Aprovacao de Chamados Zendesk - afterTaskCreate - numProcess ' + numProcess +
 					 'Prazo original tarefa em segundos:' + totalHoraAtual); 
 		
 			if (nrProximaAtividade == 2){
 			
 				log.info('Aprovacao de Chamados Zendesk - afterTaskCreate - numProcess ' + numProcess +
 						 ' - entrou prox atividade = 2'); 
 		
 				if (tipo_solicitacao != null){
 					log.info('Aprovacao de Chamados Zendesk - afterTaskCreate - numProcess ' + numProcess +
 					 ' - tipo_solicitacao != null '); 
 		
 					if(tipo_solicitacao.startsWith("ouvidoria") ||
 					   tipo_solicitacao.startsWith("OUVIDORIA")){
 		
 						log.info('Aprovacao de Chamados Zendesk - afterTaskCreate - numProcess ' + numProcess +
 						 ' - tipo_solicitacao eh ouvidoria'); 
 		
 						//teste
 						//var prazoMinutos = 5;
 		
 						//producao
 						//var prazoMinutos = 480; // equivalente a 8 horas
 						//alterado em 23/08 - solicitado que fosse 24 horas corridas - criado calendario Zendesk
 						// exceto final de semana
 						var prazoMinutos = 1440; // equivalente a 24 horas
 		
 						
 						 //Calcula o prazo com tempo em segundos com a hora atual - senao ele assume a primeira hora do calendario(8:00)
 						 //foi usado esta funcao em minutos para facilitar os testes
 						 //var obj = hAPI.calculateDeadLineTime(data,totalHoraAtual, prazoMinutos, "Comercial");
 						 var obj = hAPI.calculateDeadLineTime(data,totalHoraAtual, prazoMinutos, "Zendesk");
 						 var dt = obj[0];
 						 var segundos = obj[1];
 						 
 						 
 						 log.info('Tempo contando como novo prazo : data ' + dt + ' segundos ' + segundos);
 						 
 						 
 						log.info('Aprovacao de Chamados Zendesk - afterTaskCreate - altera prazo: data ' + dt + 
 								 ' segundos ' + segundos);
 						 
 						 //Altera o prazo do processo
 						 hAPI.setDueDate(numProcess,0,idAprovador,dt,segundos);
 					}
 					else{
 						
 						log.info('Aprovacao de Chamados Zendesk - afterTaskCreate - numProcess ' + numProcess +
 						 ' - tipo_solicitacao eh NORMAL'); 
 		
 						//teste
 						//var prazoMinutos = 3;
 		
 						//alterado em 23/08 - solicitado que fosse 24 horas corridas - criado calendario Zendesk
 						// exceto final de semana
 						var prazoMinutos = 2880; // equivalente a 24 horas
 		
						log.info("@Prazo minutos e datas: "+prazoMinutos+"/data: "+data+"/totalHoraAtual: "+totalHoraAtual);
		
 						var obj = hAPI.calculateDeadLineTime(data,totalHoraAtual, prazoMinutos, "Zendesk");
 						log.info("@LOG OBJ "+obj);
						var dt = obj[0];
 						var segundos = obj[1];
 						 
 						log.info("@Passou aqui1");
						
 						log.info('Tempo contando como novo prazo : data ' + dt + ' segundos ' + segundos);
 						 
 						 
 						log.info('Aprovacao de Chamados Zendesk - afterTaskCreate - altera prazo: data ' + dt + 
 								 ' segundos ' + segundos);
 						 
 						 //Altera o prazo do processo
 						 hAPI.setDueDate(numProcess,0,idAprovador,dt,segundos);
						 log.info("@Passou aqui2");
 					}
 				}	
 			}
 		}