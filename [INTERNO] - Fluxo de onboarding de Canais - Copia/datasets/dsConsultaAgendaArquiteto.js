function defineStructure() {
	addColumn("instaceId");
	addColumn("DataAbertura");
	addColumn("DataEncerramento");
	addColumn("Status");
	addColumn("Anexos");
	addColumn("CodigoExecutivo");
	addColumn("Executivo");
	addColumn("NumeroOportunidade");
	addColumn("DescricaoOportunidade");
	addColumn("Cliente");
	addColumn("DescricaoCliente");
	addColumn("Segmento");
	addColumn("Unidade");
	addColumn("Produto");
	addColumn("Modulos");
	addColumn("TipoSolicitacao");
	addColumn("TipoDemonstracao");
	
	setKey(["instaceId"]);
}
function onSync(lastSyncDate) {
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("instaceId");
	dataset.addColumn("DataAbertura");
	dataset.addColumn("DataEncerramento");
	dataset.addColumn("Status");
	dataset.addColumn("Anexos");
	dataset.addColumn("CodigoExecutivo");
	dataset.addColumn("Executivo");
	dataset.addColumn("NumeroOportunidade");
	dataset.addColumn("DescricaoOportunidade");
	dataset.addColumn("Cliente");
	dataset.addColumn("DescricaoCliente");
	dataset.addColumn("Segmento");
	dataset.addColumn("Unidade");
	dataset.addColumn("Produto");
	dataset.addColumn("Modulos");
	dataset.addColumn("TipoSolicitacao");
	dataset.addColumn("TipoDemonstracao");
	
	//Carrega as informações de todas as solicitações do processo agendaArquiteto
	var processId = "agendaArquiteto";
	var cProcessId = DatasetFactory.createConstraint("processId",processId,processId,ConstraintType.MUST);
	var dsWorkflowProcess = DatasetFactory.getDataset("workflowProcess",["workflowProcessPK.processInstanceId","active"],[cProcessId],["workflowProcessPK.processInstanceId"]);
	
	//Itera nas solicitações do processo agendaArquiteto
	for(a = 0 ; a != dsWorkflowProcess.rowsCount ; a++){
		var instanceId = dsWorkflowProcess.getValue(a,"workflowProcessPK.processInstanceId");
		//log.warn("=== instanceId: " + instanceId);
		var status = (dsWorkflowProcess.getValue(a,"active") == "true" ? "Em andamento" : "Finalizado");
		//log.warn("=== status: " + status);
		
		//Busca informações de histórico das solicitações
		var cInstance = DatasetFactory.createConstraint("processHistoryPK.processInstanceId",instanceId,instanceId,ConstraintType.MUST);
		var cPreviousMovement = DatasetFactory.createConstraint("previousMovementSequence","0","0",ConstraintType.MUST);
		var dsProcessHistory = DatasetFactory.getDataset("processHistory",["movementDate","active"],[cInstance,cPreviousMovement],null);
		
		status = (dsProcessHistory.getValue(0,"active") == "true" ? "Atividade inicial" : status);
		//log.warn("=== status: " + status);
		var DataAbertura = dsProcessHistory.getValue(0,"movementDate").toString().substring(0,10);
		//log.warn("=== DataAbertura: " + DataAbertura);
		
		//Trata informação de encerramento
		if(status == "Finalizado"){
			var cActive = DatasetFactory.createConstraint("active","true","true",ConstraintType.MUST);
			var dsProcessHistory2 = DatasetFactory.getDataset("processHistory",["movementDate","stateSequence"],[cInstance],null);
			var idx = dsProcessHistory2.rowsCount - 1;
			var DataEncerramento = dsProcessHistory2.getValue(idx,"movementDate").toString().substring(0,10);
			status = (dsProcessHistory2.getValue(idx,"stateSequence") == "5" ? "Cancelado por inatividade" : (dsProcessHistory2.getValue(idx,"stateSequence") == "9" ? "Realizado" : "Cancelado"));
		}else{
			var DataEncerramento = "";
		}
		//log.warn("=== status: " + status);
		//log.warn("=== DataEncerramento: " + DataEncerramento);
		
		
		//Busca informações de anexos
		var anexos = new Array();
		var cOriginalMovementSeq = DatasetFactory.createConstraint("originalMovementSequence","1","1",ConstraintType.MUST);
		var cAttachProcessId = DatasetFactory.createConstraint("processAttachmentPK.processInstanceId",instanceId,instanceId,ConstraintType.MUST);
		var cSeqAttachNot = DatasetFactory.createConstraint("processAttachmentPK.attachmentSequence","1","1",ConstraintType.MUST_NOT);
		
		var dsAttachments = DatasetFactory.getDataset("processAttachment",["documentId"],[cOriginalMovementSeq,cAttachProcessId,cSeqAttachNot],["documentId"]);
		for(b = 0 ; b != dsAttachments.rowsCount ; b++){
			anexos.push(buscaDescricao(dsAttachments.getValue(b,"documentId")));
		}
		//log.warn("=== anexos: " + anexos.toString());
		
		//Busca informações do formulário
		var cSeqAttach = DatasetFactory.createConstraint("processAttachmentPK.attachmentSequence","1","1",ConstraintType.MUST);
		var dsFicha = DatasetFactory.getDataset("processAttachment",["documentId"],[cOriginalMovementSeq,cAttachProcessId,cSeqAttach],null);
		var fichaId = dsFicha.getValue(0,"documentId");
		var cMeta_id = DatasetFactory.createConstraint("metadata#id",fichaId,fichaId,ConstraintType.MUST);
		var cMetadata_active = DatasetFactory.createConstraint("metadata#active","true","true",ConstraintType.MUST);
		
		var dsDadosSolicitacao = DatasetFactory.getDataset("dsAgendaArquiteto",null,[cMeta_id,cMetadata_active],null);
		//log.warn("=== dsDadosSolicitacao: " + dsDadosSolicitacao.rowsCount);
		
		if(dsDadosSolicitacao.rowsCount == 1){
			var codigoEar = dsDadosSolicitacao.getValue(0,"codigoEar");//
			var ear = dsDadosSolicitacao.getValue(0,"ear");//
			var entidade = dsDadosSolicitacao.getValue(0,"entidade");
			var codigoUnidade = dsDadosSolicitacao.getValue(0,"codigoUnidade");
			var unidade = dsDadosSolicitacao.getValue(0,"unidade");
			var localAtendimento = dsDadosSolicitacao.getValue(0,"localAtendimento");
			var cliProspect = dsDadosSolicitacao.getValue(0,"cliProspect");//
			var descCliProspect = dsDadosSolicitacao.getValue(0,"descCliProspect");//
			var municipio = dsDadosSolicitacao.getValue(0,"municipio");
			var numOportunidade = dsDadosSolicitacao.getValue(0,"numOportunidade");//
			var descOportunidade = dsDadosSolicitacao.getValue(0,"descOportunidade");//
			var tipoProjeto = dsDadosSolicitacao.getValue(0,"tipoProjeto");
			var tpSolicitacao = dsDadosSolicitacao.getValue(0,"tpSolicitacao");
			var tipoDemo = dsDadosSolicitacao.getValue(0,"tipoDemo");
			var segmento = dsDadosSolicitacao.getValue(0,"segmento");
			var produto = dsDadosSolicitacao.getValue(0,"produto");
			var modulos = dsDadosSolicitacao.getValue(0,"modulos");
		}else{
			var codigoEar = "";
			var ear = "";
			var entidade = "";
			var codigoUnidade = "";
			var unidade = "";
			var localAtendimento = "";
			var cliProspect = "";
			var descCliProspect = "";
			var municipio = "";
			var numOportunidade = "";
			var descOportunidade = "";
			var tipoProjeto = "";
			var tpSolicitacao = "";
			var tipoDemo = "";
			var segmento = "";
			var produto = "";
			var modulos = "";
		}
		
		dataset.addRow(new Array(	
									instanceId,
									DataAbertura,
									DataEncerramento,
									status,
									anexos.toString(),
									codigoEar,
									ear,
									numOportunidade,
									descOportunidade,
									cliProspect,
									descCliProspect,
									segmento,
									unidade,
									produto,
									modulos,
									tpSolicitacao,
									tipoDemo
		));
	}
	
	return dataset;
}
function createDataset(fields, constraints, sortFields) {

}function onMobileSync(user) {

}

function buscaDescricao(documentId){
	var cActiveVersion = DatasetFactory.createConstraint("activeVersion","true","true",ConstraintType.MUST);
	var cDocumentId = DatasetFactory.createConstraint("documentPK.documentId",documentId,documentId,ConstraintType.MUST);
	
	var dsDocument = DatasetFactory.getDataset("document",["documentDescription"],[cActiveVersion,cDocumentId],null);
	
	return dsDocument.getValue(0,"documentDescription");
}