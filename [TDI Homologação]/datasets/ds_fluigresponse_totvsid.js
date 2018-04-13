function createDataset(fields, constraints, sortFields) {
	
	var numProcess;
	var statusAprovacao;
	var emailAprovador;
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("SUCESSO");
	newDataset.addColumn("RECEBIDOS");
	newDataset.addColumn("PROCESSADOS");
	newDataset.addColumn("ERROS");
	
	/* Ambiente de desenvolimento do Serviço FluigResponseTotvsId http://10.171.23.16/FluigResponse.svc?singleWsdl. 
	/Não foi possível criar o serviço em prod devido o WS estar fora.*/
	
	var integracao = ServiceManager.getService('FluigResponseTotvsId');
	var locator = integracao.instantiate('com.totvs.tdi.totvsid.FluigResponse');
	var service = locator.getBasicHttpBindingIFluigResponse();

	log.info("datafields:" + fields)

	var dataAtual = new Date();
	var da = new java.util.GregorianCalendar(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate());
	var xda = javax.xml.datatype.DatatypeFactory.newInstance().newXMLGregorianCalendar(da);

	log.info("Constraintss :" + constraints)

	if ((constraints != null) && (constraints.length > 0)) {
		numProcess = constraints[0].getInitialValue();
		statusAprovacao = constraints[1].getInitialValue();
		emailAprovador = constraints[2].getInitialValue();
	}
	
	log.info("Denis.fevereiro: " + numProcess + " " + statusAprovacao + " " + emailAprovador);
	var retorno = service.receberStatusProcesso(numProcess, new java.lang.Integer(statusAprovacao), emailAprovador, xda);

	var error = retorno.getErrorMessage().getValue();
	if (error == null) {
		error = "";
	}
	log.info("error messa:" + error);

	newDataset.addRow(new Array(retorno.isSucesso(), retorno.getQtdRegistrosRecebidos(), retorno.getQtdRegistrosProcessados(), error));

	return newDataset;

}
