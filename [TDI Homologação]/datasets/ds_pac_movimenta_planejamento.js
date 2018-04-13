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
	dataset.addColumn('status');

	var empresa = getValue("WKCompany");
	var integrationUser = null;
	var usuarioExecutor = null;
	var usuarioDestino = null;
	var targetTask = null;
	var fromTask = null;

	if (constraints != null){
		for(var i=0;i<constraints.length;i++) {
			if (constraints[i].fieldName == "MANAGER"){
				usuarioExecutor = constraints[i].initialValue;
			}else if (constraints[i].fieldName == "TARGET_TASK"){
				targetTask = constraints[i].initialValue;
			}
		}
	}
	
	if(usuarioExecutor == null) {
		dataset.addRow([0, 'Necessário informar o gestor (parâmetro MANAGER)', -1]);
		return dataset;
	}
	
	if(targetTask == null || targetTask != 9 && targetTask != 17) {
		dataset.addRow([0, 'Necessário informar uma atividade válida (parâmetro TARGET_TASK 9 ou 17)', -1]);
		return dataset;
	}
	
	fromTask = targetTask == 9 ? 17 : 9;
	
	integrationUser = getIntegrationUser();
	
	if (integrationUser == null){
		dataset.addRow( [ 0, "Verifique dados de integração!", -1] );		
		return dataset;
	}
	
	var process = [];
	var fields = ["workflowProcessPK.processInstanceId"];
	var constraints = [];
	var order = null;
	
	constraints.push(DatasetFactory.createConstraint("active",true, true, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint("processId","pac_planejamento","pac_planejamento", ConstraintType.MUST));
	
	var wpDataset = DatasetFactory.getDataset("workflowProcess", fields, constraints, order);
	if(wpDataset != null && wpDataset.rowsCount > 0) {
		fields = ["processTaskPK.processInstanceId", "processTaskPK.colleagueId"];
		constraints = [];
		constraints.push(DatasetFactory.createConstraint("active",true, true, ConstraintType.MUST));
		for(var i = 0; i < wpDataset.rowsCount; i++) {
			var processInstanceId = wpDataset.getValue(i, "workflowProcessPK.processInstanceId"); 
			constraints.push(DatasetFactory.createConstraint("processTaskPK.processInstanceId",processInstanceId, processInstanceId, ConstraintType.SHOULD));
		}
		var ptDataset = DatasetFactory.getDataset("processTask", fields, constraints, order);
		if(ptDataset != null && ptDataset.rowsCount > 0) {
			var tempProcess = {};
			fields = ["processHistoryPK.processInstanceId"];
			constraints = [];
			constraints.push(DatasetFactory.createConstraint("active",true, true, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("stateSequence",fromTask, fromTask, ConstraintType.MUST));
			for(var i = 0; i < ptDataset.rowsCount; i++) {
				var processInstanceId = ptDataset.getValue(i, "processTaskPK.processInstanceId");
				constraints.push(DatasetFactory.createConstraint("processHistoryPK.processInstanceId",processInstanceId, processInstanceId, ConstraintType.SHOULD));
				tempProcess[processInstanceId] = ptDataset.getValue(i, "processTaskPK.colleagueId");
			}
			var phDataset = DatasetFactory.getDataset("processHistory", fields, constraints, order);
			if(phDataset != null && phDataset.rowsCount > 0) {
				for(var i = 0; i < phDataset.rowsCount; i++) {
					var processInstanceId = phDataset.getValue(i, "processHistoryPK.processInstanceId");
					process.push({
						"processInstanceId": processInstanceId,
						"colleagueId": tempProcess[processInstanceId]
					});
				}
			}
		}
	}
	
	for(var i = 0; i < process.length; i++) {
		try{
			var workflowEngineProvider = ServiceManager.getServiceInstance("WorkflowEngineService");
			var workflowEngineLocator = workflowEngineProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService");
			var workflowEngineService = workflowEngineLocator.getWorkflowEngineServicePort();	
			var colaboradorDestinoArr  = workflowEngineProvider.instantiate("net.java.dev.jaxb.array.StringArray");
			var anexo               = workflowEngineProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");
			var cardData            = workflowEngineProvider.instantiate("net.java.dev.jaxb.array.StringArrayArray");
			var apontamento         = workflowEngineProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray");
			
			colaboradorDestinoArr.getItem().add(process[i].colleagueId);
			
			var resultMov = workflowEngineService.saveAndSendTask(
					integrationUser.login, 
					integrationUser.password, 
					empresa, 
					new java.lang.Integer(process[i].processInstanceId), 
					new java.lang.Integer(targetTask),
					colaboradorDestinoArr, 
					"Movimentado pela diretoria de operações", 
					usuarioExecutor, 
					true, 
					anexo, 
					cardData, 
					apontamento, 
					true, 
					0);
			
			if (resultMov != null){
				log.info("pac_planejamento - Movimentacao -> " + resultMov.getItem().get(0).getItem() );
				
				dataset.addRow( [process[i].processInstanceId, "Movimentado", 1] );
			}
		}catch(e){
			log.info("Erro - Movimenta atividade pac_execucao");
			log.error(e);
			dataset.addRow( [ process[i].processInstanceId, "Solicitação não movimentada! Verifique Conexão!", -1] );		
		}
	}
	return dataset;
}