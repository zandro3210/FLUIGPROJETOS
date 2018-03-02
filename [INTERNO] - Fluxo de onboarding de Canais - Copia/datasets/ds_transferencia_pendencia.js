function createDataset(fields, constraints, sortFields) {
	var getIntegrationUser = function() {
		var result = null;
		var ds = DatasetFactory.getDataset("pass_validate", null, null, null);
		if(ds != null && ds.rowsCount > 0) {
			var user = null;
			eval("user = " + ds.getValue(0, "USER"));
			result = {
					"login": user.user,
					"password": user.pass
			};
//			ds = DatasetFactory.getDataset("colleague", ["colleaguePK.colleagueId","mail"], [DatasetFactory.createConstraint("mail",user.user, user.user, ConstraintType.MUST)], null);
//			if(ds != null && ds.rowsCount > 0) {
//				result["colleagueId"] = ds.getValue(0, "colleaguePK.colleagueId");
//			}
		}
		return result;
	};
	
	var dataset = DatasetFactory.newDataset();	
	dataset.addColumn('id');
	dataset.addColumn('mensagem');	
	
	var empresa = getValue("WKCompany");
	var matriculaColaboradorOrigem = "";
	var matriculaColaboradorDestino = "";
	var numProcessIni = 0;
	var numProcessFim = 0;
	
	
	if (constraints != null){
		for(var i=0;i<constraints.length;i++) {
			if (constraints[i].fieldName == "COLABORADOR_ORIGEM"){
				matriculaColaboradorOrigem = constraints[i].initialValue; 				
			}else if (constraints[i].fieldName == "COLABORADOR_DESTINO"){
				matriculaColaboradorDestino = constraints[i].initialValue; 				
			}else if (constraints[i].fieldName == "NUM_PROCESS"){
				numProcessIni = constraints[i].initialValue;
				numProcessFim = constraints[i].finalValue;				
			}
		}
	}

	
	if (matriculaColaboradorOrigem == "" || matriculaColaboradorDestino == "" || numProcessFim == 0){
		dataset.addRow( [ 1, "Verifique os parâmetros de entrada!"] );		
		return dataset;		
	}

	log.info("OutstandingService - USER INTEGRATOR - BEFORE");
	/** 
	 * Usu?rio/Senha integrador */
	var cstActive = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var constraints = new Array(cstActive);
	var integrationUser = getIntegrationUser();  
	
	if (integrationUser == null){
		dataset.addRow( [ 1, "Verifique dados de integração!"] );		
		return dataset;		
	}
	
	log.info("OutstandingService - BEFORE");
	
	var outstandingProvider = ServiceManager.getService("OutstandingService");
	var outstandingEngineLocator = outstandingProvider.instantiate("com.totvs.technology.ecm.dm.ws.ECMOutstandingServiceService");
	var outstandingService = outstandingEngineLocator.getOutstandingServicePort();
	var stringArray = outstandingProvider.instantiate("net.java.dev.jaxb.array.StringArray");

	log.info("OutstandingService - AFTER");
	// Adiciona no array as pend?ncias que ser?o transferidas.
	stringArray.getItem().add("transferDocumentSecurity:true"); // Permiss?o de grava??o em pastas.
	stringArray.getItem().add("transferActiveDocuments:true"); // Documentos ativos.
	stringArray.getItem().add("transferMyDocumentsInApproval:true"); // Documentos aguardando aprova??o.
	stringArray.getItem().add("transferPendingWorkflow:true"); // Tarefas workflow pendentes.
	stringArray.getItem().add("transferOpenWorkflow:true"); // Processos workflow abertos.
	stringArray.getItem().add("transferApprovers:true"); // Aprovador de pasta/documentos.
	stringArray.getItem().add("transferApprovals:true"); // Tarefas aprova??o documento.
	stringArray.getItem().add("transferBlogs:true"); // Transfer?ncia de blogs.
	
	// Intervalo de documentos.
	stringArray.getItem().add("documentIdInitial:0"); // N?mero do documento inicial.
	stringArray.getItem().add("documentIdFinal:0"); // N?mero do documento final.
	
	// Intervalo de solicita??es.
	stringArray.getItem().add("instanceIdInitial:" + numProcessIni); // N?mero da solicita??o inicial.
	stringArray.getItem().add("instanceIdFinal:" + numProcessFim); // N?mero da solicita??o final.
	
	log.info("OutstandingService - BEFORE TRY");
	try{
		// Transfere pend?ncias de um colaborador para outro colaborador.
		var result = outstandingService.transfer(integrationUser.login, 
				integrationUser.password, 
				empresa, 
				matriculaColaboradorOrigem, 
				matriculaColaboradorDestino, 
				stringArray);
		
		dataset.addRow( [1, "OK"] );
		return dataset;
	}catch(e){
		log.info(" Erro ao transferir atividade pac_planejamento -> pac_execucao");
		log.error(e);	
		
		dataset.addRow( [1, "NOK"] );
		return dataset;
	}
}