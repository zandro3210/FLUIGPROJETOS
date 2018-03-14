function proximoAprovador(){
	
	log.info('Aprovacao_de_chamados_zendesk proximoAprovador ' + getValue("WKNumProces") + ":" + getValue("WKUser"));
	
	var cicloAprovacao = hAPI.getCardValue("cicloaprovacao");
	if (cicloAprovacao == null || cicloAprovacao == "null" || cicloAprovacao == ""){
		cicloAprovacao = "1";
		hAPI.setCardValue("cicloaprovacao",cicloAprovacao);
		log.info('ENTROU NO CICLO 1 : VALOR' + cicloAprovacao);
	} 
	
	log.info('Aprovacao_de_chamados_zendesk cicloaprovacao ' + cicloAprovacao);
	
	var listaAprovadores = hAPI.getCardValue("hieraraprovadores").split(",");
	
	log.info('@ CRIS listaAprovadores: ' + listaAprovadores + " - listaAprovadores.length: " + listaAprovadores.length);
	
	
	if(cicloAprovacao < 3 && cicloAprovacao <= (listaAprovadores.length - 1)) {
		
		// PEGA DO 1 EM DIANTE - PEGA DO SEGUNDO EM DIANTE
		var emailProximoAprovador = listaAprovadores[cicloAprovacao];
		
		log.info("Aprovacao_de_chamados_zendesk proximoAprovador: emailProximoAprovador " + emailProximoAprovador);
		
		var cEmail = DatasetFactory.createConstraint("mail", emailProximoAprovador, emailProximoAprovador, ConstraintType.MUST);
		var fields = new Array("colleagueId","colleagueName");
		var colaborador = DatasetFactory.getDataset("colleague", fields, new Array(cEmail), null);
		
		if (colaborador) {
			var idProximoAprovador = colaborador.getValue(0, "colleagueId");
			
			log.info('Aprovacao_de_chamados_zendesk - idProximoAprovador: ' + idProximoAprovador);
			
			globalVars.put("idAprovador", idProximoAprovador);
			hAPI.setCardValue("idAprovador", idProximoAprovador);
			
			globalVars.put("emailAprovador", emailProximoAprovador);
			hAPI.setCardValue("emailAprovador", emailProximoAprovador);
			
			//incrementa ciclo aprovacao
			cicloAprovacao++;
			hAPI.setCardValue("cicloAprovacao", cicloAprovacao);
			log.info('Aprovacao_de_chamados_zendesk - cicloAprovacao ficou: ' + cicloAprovacao);
			
			log.info('Aprovacao_de_chamados_zendesk proximoAprovador true');
			
			return true;
		}
		else 
		{
			log.info('Aprovacao_de_chamados_zendesk proximoAprovador false - colaborador nao encontrado');
			return false;
		}
		
	} else {
		log.info('Aprovacao_de_chamados_zendesk proximoAprovador false - ciclo maior que 3 ou lista chegou no ultimo');
		return false;
	}
}