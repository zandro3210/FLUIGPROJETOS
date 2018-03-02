/**
 * Dataset Cancelamento das a��es*/

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
	var numProcess = "";
	var numProcessPai = "";
	var ficha = "";
    var PAC_EXECUCAO_ATV_EXCLUSIVO_APROVACAO = 14;
    var usuarioExecutor = "";
    var fichaAtualizada = false;
    
    
	/**
	 *  Par�metro enviado na chamada do Zoom para coligada ********/
	var coligada = "";
	if (constraints != null){
		for(var i=0;i<constraints.length;i++) {
			if (constraints[i].fieldName == "NUM_PROCESS"){
				numProcess = constraints[i].initialValue;
			}else if (constraints[i].fieldName == "NUM_PROCESS_PAI"){
				numProcessPai = constraints[i].initialValue;
			}
		}
	}		
		
	if (numProcessPai == "" || numProcess == ""){
		dataset.addRow( [ 1, "Verifique os parâmetros de entrada!"] );		
		return dataset;		
	}
	
	/** 
	 * Usu�rio/Senha integrador */
	var cstActive = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var constraints = new Array(cstActive);
	var integrationUser = getIntegrationUser();
	
	if (integrationUser == null){
		dataset.addRow( [ 1, "Verifique dados de integração!"] );		
		return dataset;		
	}
	
	
	
	/**
	 * Ficha pac_execucao
	 * */
    var cstProcess = DatasetFactory.createConstraint("num_process", numProcess, numProcess, ConstraintType.MUST);
    var cstProcessPai = DatasetFactory.createConstraint("num_process_pai", numProcessPai, numProcessPai, ConstraintType.MUST);    
    
    constraints = new Array(cstActive, cstProcess, cstProcessPai);    
	datasetExecucao = DatasetFactory.getDataset("ds_pac_execucao", null, constraints, null);
		
    for(var i = 0; i < datasetExecucao.rowsCount; i++) {    	
    	ficha = datasetExecucao.getValue(i, "metadata#id");
    	usuarioExecutor = datasetExecucao.getValue(i, "responsavel_id"); 
    }
	
	if (ficha == ""){
		dataset.addRow( [ 1, "Ficha não encontrada!"] );		
		return dataset;		
	}
	
	
	
	/**
	 * Atualiza campos do fich�rio pac_execucao */
	try{
		var cardServiceProvider = ServiceManager.getServiceInstance("ECMCardService");
		var cardServiceLocator = cardServiceProvider.instantiate("com.totvs.technology.ecm.dm.ws.ECMCardServiceServiceLocator");
		var cardService = cardServiceLocator.getCardServicePort();
		var cardFieldDtoArray = cardServiceProvider.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDtoArray");
		
		var cardFieldStatus = cardServiceProvider.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");
		cardFieldStatus.setField("status");
		cardFieldStatus.setValue("cancelada");
		
		var vetCardFields = new Array();
		vetCardFields.push(cardFieldStatus);
		
		
		cardFieldDtoArray.setItem(vetCardFields);
		
		var result = cardService.updateCardData(empresa, integrationUser.login, integrationUser.password, ficha, cardFieldDtoArray);

		if (result != null){
			if (result.getItem(0).getWebServiceMessage() == "ok"){
				fichaAtualizada = true;
			}else{
				dataset.addRow( [ 1, "Ficha não atualizada!"] );		
				return dataset;
			}
		}
	}catch(e){
		log.info("Erro - Atualiza campos do fichário pac_execucao");
		log.error(e);
		dataset.addRow( [ 1, "Ficha não atualizada! Verifique Conexão!"] );		
		return dataset;
	}
	
	
	/**
	 * Movimenta atividade pac_execucao */
	if (fichaAtualizada == true){
		try{
			var workflowEngineProvider = ServiceManager.getServiceInstance("WorkflowEngineService");
			var workflowEngineLocator = workflowEngineProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService");
			var workflowEngineService = workflowEngineLocator.getWorkflowEngineServicePort();	
			var colaboradorDestinoArr  = workflowEngineProvider.instantiate("net.java.dev.jaxb.array.StringArray");
			var anexo               = workflowEngineProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");
			var cardData            = workflowEngineProvider.instantiate("net.java.dev.jaxb.array.StringArrayArray");
			var apontamento         = workflowEngineProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray");
			
			colaboradorDestinoArr.getItem().add("Pool:Group:DiretoriaOperacoes");
			
			var resultMov = workflowEngineService.saveAndSendTask(
					integrationUser.login, 
					integrationUser.password, 
					empresa, 
					new java.lang.Integer(numProcess), 
					PAC_EXECUCAO_ATV_EXCLUSIVO_APROVACAO, 
					colaboradorDestinoArr, 
					"Movimentação pelo processo de planejamento", 
					usuarioExecutor, 
					true, 
					anexo, 
					cardData, 
					apontamento, 
					false, 
					0);
			
			if (resultMov != null){
				/*for (var i = 0; i < resultMov.getItem().size(); i++){*/
					log.info("pac_planejamento - Movimentacao Cancelamento. i: " + i + " -> " + resultMov.getItem().get(i).getItem() );
				/*}*/
				
				dataset.addRow( [1, "Aprovação"] );
				return dataset;
			}
		}catch(e){
			log.info("Erro - Movimenta atividade pac_execucao");
			log.error(e);
			dataset.addRow( [ 1, "Atividade não movimentada para Aprovação! Verifique Conexão!"] );		
			return dataset;
		}
	}
    
	dataset.addRow( [1, "Cancelada"] );
	return dataset;

}