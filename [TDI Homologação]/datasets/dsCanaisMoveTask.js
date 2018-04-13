function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {

    log.error("---@dsCanaisMoveTask start");

    log.error("---@dsCanaisMoveTask constraints:" + constraints);
    var params = DatasetFactory.getDataset("dscanaisOnboardParametrizacao", null, null, null);
    log.error("---@dsCanaisMoveTask constraints.token:" + constraints[0].getInitialValue());


    var c1 = DatasetFactory.createConstraint("token", constraints[0].getInitialValue(), constraints[0].getInitialValue(), ConstraintType.MUST);
    var filters = [c1];
    var Canais = DatasetFactory.getDataset("dsCanaisAberturaChamados", null, filters, null);

    

    try {

        // Cria o dataset
      
        var dataset = DatasetBuilder.newDataset();
        dataset.addColumn("result");

        // Parâmetros de autenticação
        var username = params.getValue(0, "nmAdmUserid");
        var password = params.getValue(0, "nmAdmPassword");
        var companyId = params.getValue(0, "nmAdmCompanyid");
        var userId = params.getValue(0, "nmAdmUserid");
        log.error("---@dsCanaisMoveTask Canais.getValue(0,'nrSubsolicitacao')" + Canais.getValue(0,"nrSubsolicitacao"));
        var processInstanceId = parseInt(Canais.getValue(0,"nrSubsolicitacao")); // número da solicitação.
        log.error("---@dsCanaisMoveTask constraints.número da atividade:" + constraints[1].getInitialValue());
        var choosedState = constraints[1].getInitialValue(); // número da atividade.
        // Conecta o servico e busca os ECMWorkflowEngineService
        var servico = ServiceManager.getService("ECMWorkflowEngineService").getBean();
        log.error("---@dsCanaisMoveTask  serviceWork.getBean()");
        var ECMWorkflowEngineServiceService = servico.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService");
        log.error("---@dsCanaisMoveTask  ECMWorkflowEngineServiceService.getWorkflowEngineServicePort()");
        var WorkflowEngineService = ECMWorkflowEngineServiceService.getWorkflowEngineServicePort();
        log.error("---@dsCanaisMoveTask  saveAndSendTasksaveAndSendTask");




 
        log.error("---@dsCanaisMoveTask  companyid:'" + companyId + "'" );
        var colleagueIds = servico.instantiate("net.java.dev.jaxb.array.StringArray");
        colleagueIds.getItem().add(params.getValue(0, "usuarioResponsavelMovimentacao"));
        var comments = " atividade movimentada pela página pública";

        var completeTask = true;
        var attachments = servico.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");
        var cardData = WorkflowEngineService.getInstanceCardData(username, password, companyId, userId, processInstanceId);


        if (constraints[2].getInitialValue() == "2" && constraints[1].getInitialValue() == "15"){
            

            var codUnidadeVenda = servico.instantiate("net.java.dev.jaxb.array.StringArray");
            codUnidadeVenda.getItem().add("criacaoCoridUnidadeVenda");
            codUnidadeVenda.getItem().add(constraints[3].getInitialValue());
            cardData.getItem().add(codUnidadeVenda);
            log.error("---@dsCanaisMoveTask  codUnidadeVenda:'" + constraints[3].getInitialValue() + "'" );

           
           
            
        }
        


        var appointment = servico.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray");
        var managerMode = false;




        WorkflowEngineService.saveAndSendTask(username,
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
            constraints[2].getInitialValue());




    }
    catch (err) {
        log.error("@dsCanaisMoveTask error:'" + err + "'");
    }
    return dataset;
} function onMobileSync(user) {

}
