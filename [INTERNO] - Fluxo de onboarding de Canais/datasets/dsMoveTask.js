function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {

    try {
       
   
    // Cria o dataset
    log.error("---@dsMoveTask start ");
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("result");

    constraints = {};
    constraints.processInstanceId = 44;
    constraints.choosedState = 28;
    // Parâmetros de autenticação
    var username = "zandro3210";
    var password = "123";
    var companyId = "7143";
    var userId = "zandro3210";
    var processInstanceId = constraints.processInstanceId; // número da solicitação.
    var choosedState = constraints.choosedState; // número da atividade.
    // Conecta o servico e busca os ECMWorkflowEngineService
    var servico = ServiceManager.getService("ECMWorkflowEngineService").getBean();
    log.error("---@dsMoveTask start serviceWork.getBean()");
    var ECMWorkflowEngineServiceService = servico.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService");
    log.error("---@dsMoveTask start ECMWorkflowEngineServiceService.getWorkflowEngineServicePort()");
    var WorkflowEngineService = ECMWorkflowEngineServiceService.getWorkflowEngineServicePort();
    log.error("---@dsMoveTask start saveAndSendTasksaveAndSendTask");


   

    var companyId = getValue("WKCompany");
    var processInstanceId = parseInt(constraints.processInstanceId);
    var choosedState = parseInt(constraints.choosedState);
    var colleagueIds = servico.instantiate("net.java.dev.jaxb.array.StringArray");
    colleagueIds.getItem().add("System:Auto");
    var comments =  " através da solicitação numero " + getValue("WKNumProces") + " por " + getValue("WKUser");

    var completeTask = true;
    var attachments = servico.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");
    var cardData = WorkflowEngineService.getInstanceCardData(username,password,companyId,userId,processInstanceId);
    

    
    
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
                            0);




     }
        catch(err) {
            log.error("---@dsMoveTask error"+ err);
        }
    return dataset;
}function onMobileSync(user) {

}