function createDataset(fields, constraints, sortFields) {
	// Dataset utilizado para executar a chamada ao webservice de Cards, apagando uma das configuracoes cadastradas na widget.
	
	// Cria um dataset para retorno com uma unica coluna que conter� o resultado da chamada ao Webservice.
	var dsResultado = DatasetBuilder.newDataset();
	dsResultado.addColumn("Status");	
	
	// Recupera valores do dataset de parametros (Login e senha de Admin e Id da Empresa) para chamar o webservice.
	var dsParamsSIGAJURI = DatasetFactory.getDataset("dsParamsSIGAJURI", new Array(), new Array(), null);
	var sAdmin = dsParamsSIGAJURI.getValue(0, "sAdmin");
	var sPassword = dsParamsSIGAJURI.getValue(0, "sPassword");
	var nTenantId = parseInt(dsParamsSIGAJURI.getValue(0, "nTenantId"));
	
	// cardId vai receber o Id do card a ser apagado do Form da widget.
	var cardId = null;
	cardId = getValores(constraints);
	
	try{
		// Instancia as variaveis necessarias para o consumo do webservice de Cards.
		var service = ServiceManager.getService('CardService');
		var serviceLocator = service.instantiate('com.totvs.technology.ecm.dm.ws.ECMCardServiceService');
		var cardService = serviceLocator.getCardServicePort();
		
		// Variavel que vai receber o resultado do chamada do webservice.
		var webserviceResultArray = cardService.deleteCard(nTenantId, sAdmin, sPassword, cardId);
		
		// Recupera-se o resultado da chamada do webservice e inclui-se esse valor no dataset de retorno. 
		// Caso ocorra um erro na chamada do webservice, ele sera repassado para o widget tratar, pois nao dispara excecao no dataset.
		for (var i = 0; i < webserviceResultArray.getItem().size(); i++){
			dsResultado.addRow(new Array(webserviceResultArray.getItem().get(i).getWebServiceMessage()));
		}
	}
	catch(e){
		// Caso ocorra algum erro entre o instanciamento do webservice e a sua execucao, a excecao sera repassada a widget
		dsResultado.addRow(new Array('ERRO:' + e.message));
	}
	
	return dsResultado;
}

/**
 * Recupera das Constrainst o valor do cardId a ser apagado
 * @param constraints Constraints passadas ao Dataset e que cont�m o cardId a ser apagado
 * @return {Integer} cardId a ser apagado do Form
 */
function getValores(constraints){
	var cardId = null;
	for (var i = 0; i < constraints.length; i++){
		if (constraints[i].fieldName == "cdCardId"){
			cardId = parseInt(constraints[i].initialValue);
		}
	}
	return cardId;
}