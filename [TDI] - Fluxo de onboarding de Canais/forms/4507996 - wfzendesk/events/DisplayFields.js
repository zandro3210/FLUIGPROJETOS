function displayFields(form, customHTML) {
		
	var numAtividade = getValue("WKNumState");
	var numProcess 	= getValue("WKNumProces");
	
	log.info('Aprovacao de Chamados Zendesk - displayFields - processo ' + numProcess + ' - atividade ' + numAtividade + ' - INICIO');
			
	form.setValue('ecmvalidate', '1');
	form.setValue('ecmnumstate', numAtividade);
	form.setValue('ecmdef',getValue('WKDef'));
	log.info('ecmnumstate - '+form.getValue('ecmnumstate'));
	log.info('WKNumState - '+form.getValue('WKNumState'));
	log.info('WKDef - '+form.getValue('WKDef'));
	
	var emailAprovador = form.getValue('emailAprovador');
	var idAprovador = form.getValue('idAprovador');
	var ticketId = form.getValue('ticket');
	
	var tipo_solicitacao = form.getValue('tipo_solicitacao');
	
	log.info('Aprovacao de Chamados Zendesk - displayFields - numProcess ' + numProcess +
	 ' - tipo_solicitacao: ' + tipo_solicitacao); 
	
	if (tipo_solicitacao.startsWith("ouvidoria") ||
		tipo_solicitacao.startsWith("OUVIDORIA")){
		form.setValue('status_aprovacao', 'Aprovado');
	}
	
		
	if(emailAprovador == null || emailAprovador == ""){
		
		log.info('Aprovacao de Chamados Zendesk - displayFields - busca emailAprovador - Solicitacao ' + numProcess );
		
		
		var cId = DatasetFactory.createConstraint("colleagueId", idAprovador, idAprovador, ConstraintType.MUST);
		var fields = new Array("colleagueId","colleagueName", "mail");
		var colaborador = DatasetFactory.getDataset("colleague", fields, new Array(cId), null);
		
		emailAprovador = colaborador.getValue(0, "mail");
		form.setValue('emailAprovador', emailAprovador);
		
		log.info('Aprovacao de Chamados Zendesk - displayFields - emailAprovador ' + emailAprovador + ' - Solicitacao ' + numProcess );
				
	}
	
	if (parseInt(numAtividade) > 1)  
	{
	
		log.info('Aprovacao de Chamados Zendesk - displayFields - ALIMENTANDO USUARIO APROVADOR DO MOMENTO - INICIO - Solicitacao ' + numProcess );
		
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
		constraints = new Array(c1);
		colaborador = DatasetFactory.getDataset("colleague", null, constraints, null);
		form.setValue('emailUsuar_movimenta_tar', colaborador.getValue(0, "mail"));

		log.info('Aprovacao de Chamados Zendesk - displayFields - USUARIO APROVADOR DO MOMENTO - Solicitacao ' + numProcess +
				 ' emailUsuar_movimenta_tar: ' + form.getValue('emailUsuar_movimenta_tar'));

	}
	
	log.info('Aprovacao de Chamados Zendesk - displayFields - processo - FIM');
}