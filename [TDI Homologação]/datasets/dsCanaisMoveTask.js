function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {

    var token;
    var task;
    var thread;
    var value;
    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "token") { 
                token = constraints[i].initialValue; 
            }
            else if (constraints[i].fieldName == "task") {
                task = constraints[i].initialValue; 
            }
            else if (constraints[i].fieldName == "thread") {
                thread = constraints[i].initialValue; 
            }
            else if (constraints[i].fieldName == "value") {
                value = constraints[i].initialValue; 
            }
        }
    }
    log.error("---@dsCanaisMoveTask start");

    log.error("---@dsCanaisMoveTask token:" + token);
    log.error("---@dsCanaisMoveTask task:" + task);
    log.error("---@dsCanaisMoveTask thread:" + thread);
    log.error("---@dsCanaisMoveTask value:" + value);
    var nmAdmUserid = "ue48u8x3tea5f9fe1524055205797";
    var cst2 = DatasetFactory.createConstraint("userSecurityId", nmAdmUserid, nmAdmUserid, ConstraintType.MUST);
    var constraintsUser= new Array(cst2);
    var params = DatasetFactory.getDataset("dscanaisOnboardParametrizacao", null, constraintsUser, null);
    log.error("---@dsCanaisMoveTask constraints.token:" + token);


    var c1 = DatasetFactory.createConstraint("token", token, token, ConstraintType.MUST);
    var filters = [cst2,c1];
    var Canais = DatasetFactory.getDataset("dscanaisOnBoardSubAberturaChamados", null, filters, null);

    

    try {

        // Cria o dataset
      
        var dataset = DatasetBuilder.newDataset();
        dataset.addColumn("result");

        // Parâmetros de autenticação
        var login = params.getValue(0, "usuarioAdm");
        log.error("---@dsCanaisMoveTask username" + login);
        var password = params.getValue(0, "nmAdmPassword");
        log.error("---@dsCanaisMoveTask password" + password);
        var companyId = params.getValue(0, "nmAdmCompanyid");
        log.error("---@dsCanaisMoveTask companyId" + companyId);
        var userId = params.getValue(0, "nmAdmUserid");
        log.error("---@dsCanaisMoveTask userId" + userId);
        var processInstanceId = parseInt(Canais.getValue(0,"nrSubsolicitacao")); // número da solicitação.
        log.error("---@dsCanaisMoveTask Canais.getValue(0,'nrSubsolicitacao')" + Canais.getValue(0,"nrSubsolicitacao"));
        var choosedState = task; // número da atividade.
        log.error("---@dsCanaisMoveTask task" + task);
        // Conecta o servico e busca os ECMWorkflowEngineService
        var servico = ServiceManager.getService("ECMWorkflowEngineServiceService").getBean();
        log.error("---@dsCanaisMoveTask  serviceWork.getBean()");
        var ECMWorkflowEngineServiceService = servico.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService");
        log.error("---@dsCanaisMoveTask  ECMWorkflowEngineServiceService.getWorkflowEngineServicePort()");
        var WorkflowEngineService = ECMWorkflowEngineServiceService.getWorkflowEngineServicePort();
        log.error("---@dsCanaisMoveTask  saveAndSendTasksaveAndSendTask");




 
     
        var colleagueIds = servico.instantiate("net.java.dev.jaxb.array.StringArray");
        colleagueIds.getItem().add(nmAdmUserid);

        log.error("---@dsCanaisMoveTask  params.getValue(0, 'usuarioResponsavelMovimentacao'):" + params.getValue(0, "usuarioResponsavelMovimentacao"));
        var comments = " atividade movimentada pela página pública";

        var completeTask = true;
        var attachments = servico.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");
        var cardData = WorkflowEngineService.getInstanceCardData(login, password, companyId, userId, processInstanceId);

        if (thread == "1" && task == "62"){
            

            var _emailcorporativo = servico.instantiate("net.java.dev.jaxb.array.StringArray");
            _emailcorporativo.getItem().add("_emailcorporativo");
            _emailcorporativo.getItem().add(value);
            cardData.getItem().add(_emailcorporativo);
            log.error("---@dsCanaisMoveTask  Email Corporativo::'" + value + "'" );         
            
        }


        if (thread == "2" && task == "15"){
            

            var codUnidadeVenda = servico.instantiate("net.java.dev.jaxb.array.StringArray");
            codUnidadeVenda.getItem().add("criacaoCoridUnidadeVenda");
            codUnidadeVenda.getItem().add(value);
            cardData.getItem().add(codUnidadeVenda);
            log.error("---@dsCanaisMoveTask  codUnidadeVenda:'" + value + "'" );         
            
        }
        


        var appointment = servico.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray");
        var managerMode = false;




        WorkflowEngineService.saveAndSendTask(login,
            password,
            companyId,
            processInstanceId,
            choosedState,
            colleagueIds,
            comments,
            userId,
            completeTask,
            attachments,
            cardData,
            appointment,
            managerMode,
            thread);




    }
    catch (err) {
        log.error("@dsCanaisMoveTask error:'" + err + "'");
    }
    return dataset;
} function onMobileSync(user) {

}
