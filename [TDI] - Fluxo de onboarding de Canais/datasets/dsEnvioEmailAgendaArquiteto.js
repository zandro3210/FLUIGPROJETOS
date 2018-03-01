//var senderEmail = 'eduardo.sombrio@totvs.com.br';
var senderEmail = 'roberto.duessmann@totvs.com.br';
/** Email de Produção*/
//var senderEmail = 'jv.tdi.portais@totvs.com.br';

function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("STATUS");
	
	var filterDate = getFilterDate();
	var datasetAgendaArquiteto = getDatasetAgendaArquiteto(filterDate);
	for (var i = 0; i < datasetAgendaArquiteto.rowsCount; i++) {
		var agenda = {dataAgendaPrazo:filterDate};
		agenda.nrSolicitacao = datasetAgendaArquiteto.getValue(i, "nrSolicitacao");
		agenda.emailSolicitante = datasetAgendaArquiteto.getValue(i, "emailSolicitante");
		agenda.nomesTecnicos = datasetAgendaArquiteto.getValue(i, "nomesTecnicos") + "";
		agenda.nomesTecnicos = agenda.nomesTecnicos.replace(/,/g, ", ");
		agenda.numOportunidade = datasetAgendaArquiteto.getValue(i, "numOportunidade");
		agenda.descOportunidade = datasetAgendaArquiteto.getValue(i, "descOportunidade");
		agenda.cliProspect = datasetAgendaArquiteto.getValue(i, "cliProspect");
		agenda.descCliProspect = datasetAgendaArquiteto.getValue(i, "descCliProspect");
		try {
			sendMail(agenda);
	        dataset.addRow(["E-mail do processo "+ agenda.nrSolicitacao + " enviado com sucesso"]);
	    } catch (e) {
	    	dataset.addRow(["Erro ao enviar e-mail do processo "+ agenda.nrSolicitacao]);
	    }
	}
	return dataset;
}

function getFilterDate(){
	var filterDate = new Date();
	filterDate.setDate(filterDate.getDate()+2);
	return dateToString(filterDate.getTime());
}

function getDatasetAgendaArquiteto(filterDate){
	var constraintActive = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var constraintDate = DatasetFactory.createConstraint("dataAgendaPrazo", filterDate, filterDate, ConstraintType.MUST);
    var constraints = new Array(constraintActive, constraintDate);
    var campos = ["emailSolicitante","nrSolicitacao","nomesTecnicos","numOportunidade", "descOportunidade", "cliProspect", "descCliProspect"];
    var datasetAgendaArquiteto = DatasetFactory.getDataset("dsAgendaArquiteto", campos, constraints, null);
    return datasetAgendaArquiteto;
}

function sendMail(agenda){
	var message = "<html><body itemscope itemtype='http://schema.org/EmailMessage'>"
			+ "A solicitação " + agenda.nrSolicitacao + " referente ao agendamento do(s) Arquiteto/Demonstrador(S) " + agenda.nomesTecnicos + " no dia "+ agenda.dataAgendaPrazo
			+ " para a oportunidade " + agenda.numOportunidade + " - " + agenda.descOportunidade + " do Cliente " 
			+ agenda.cliProspect + " - " + agenda.descCliProspect + " irá expirar em 48 horas." 
			+ "<br><br>"
			+ "Caso não confirme a solitação dentro do prazo, a solicitação de agendamento será cancelada automaticamente."
			+ "<br><br>"
			+ "Atenciosamente,<br>TOTVS<br><br>[NÃO RESPONDER ESTE E-MAIL]"
			+ "</body></html>";
	var sender = com.fluig.foundation.mail.EMailSenderFactory.getEMailSender();
    sender.simpleEmail(parseInt(''+getValue('WKCompany'), 10)
    ,'Demanda Engenharia de Valor'
    ,senderEmail
    ,agenda.emailSolicitante
    ,message,'text/html');
}

function dateToString(date){
	var dateJava = new java.util.Date();
	dateJava.setTime(date);
	var formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
	return formatter.format(dateJava);
}

function onMobileSync(user) {

}