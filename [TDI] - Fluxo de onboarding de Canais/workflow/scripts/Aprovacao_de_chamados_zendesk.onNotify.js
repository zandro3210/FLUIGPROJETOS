function onNotify(subject, receivers, template, params){
	
	log.info('@@ Aprovacao de Chamados Zendesk - onNotify - INICIO');
	
	var tipo_solicitacao = hAPI.getCardValue('tipo_solicitacao');
		log.info('Aprovacao de Chamados Zendesk - onNotify - tipo_solicitacao: ' + tipo_solicitacao);
		
		if (tipo_solicitacao != null && tipo_solicitacao != ""){
			
			if (tipo_solicitacao.startsWith("ouvidoria") ||
				tipo_solicitacao.startsWith("OUVIDORIA")){
				
				var comentario = "Workflow de Ouvidoria - No Solic Ouvidoria: " +
								 hAPI.getCardValue('ticket') +
								 " - Cliente: " + hAPI.getCardValue('nmorg');
				
				if (hAPI.getCardValue('ticket_reclamado') != null && hAPI.getCardValue('ticket_reclamado') != ""){
					comentario = comentario +  " - No Solic Reclamada: " + hAPI.getCardValue('ticket_reclamado');
				}
				
				log.info('Aprovacao de Chamados Zendesk - onNotify comentario: ' + comentario);
				
				subject.add(comentario);
			}
		}
	
	log.info('Aprovacao de Chamados Zendesk - onNotify - FIM');	
}