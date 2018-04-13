function createDataset(fields, constraints, sortFields) {
	// Dataset utilizado para executar a chamada ao webservice de Cards, editando ou cadastrando as configuracoes do widget a serem consumidas no workflow.
	
	// Cria um dataset para retorno com uma unica coluna que conter� o resultado da chamada ao Webservice.
	var dsResultado = DatasetBuilder.newDataset();
	dsResultado.addColumn("Status");	
	
	// Recupera valores do dataset de parametros (Login e senha de Admin, Id do Form da Widget e Id da Empresa) para chamar o webservice.
	var dsParamsSIGAJURI = DatasetFactory.getDataset("dsParamsSIGAJURI", new Array(), new Array(), null);
	var sAdmin = dsParamsSIGAJURI.getValue(0, "sAdmin");
	var sPassword = dsParamsSIGAJURI.getValue(0, "sPassword");
	var nFormId = parseInt(dsParamsSIGAJURI.getValue(0, "nFormIdAprov"));
	var nTenantId = parseInt(dsParamsSIGAJURI.getValue(0, "nTenantId"));
	
	var clAdmin = getColleagueIdByMail(sAdmin);
	
	// Prepara um array de campos com os nomes dos campos do Form utilizado pela widget para guardar os dados.
	var campos = new Array('cdAssJur', 'sAssJur', 'cdTipoFU', 'sTipoFU', 'cdGrupo', 'sGrupo', 'cdPapel', 'sPapel', 'sPrioridade', 'sFaixaInicial', 'sFaixaFinal', 'cdAprovadorSIGAJURI', 'sAprovadorSIGAJURI');
	// Prepara um array de valores, extraindo os valores das constraints e colocando na mesma ordem do array de campos acima.
	var valores = getValores(constraints);
	
	// Verifica se a opera��o � uma insercao ou uma edicao. CardId � nulo em insercoes e � um inteiro em edicoes.
	var cardId = null;
	cardId = isUpdate(valores);
	
	
	try{
		// Instancia as variaveis necessarias para o consumo do webservice de Cards.
		var service = ServiceManager.getService('CardService_SIGAJURI');
		var serviceLocator = service.instantiate('com.totvs.technology.ecm.dm.ws.ECMCardServiceService');
		var cardService = serviceLocator.getCardServicePort();
		var cardDtoArray = service.instantiate('com.totvs.technology.ecm.dm.ws.CardDtoArray'); // Variavel principal em insercoes novas.
		var cardDto = service.instantiate('com.totvs.technology.ecm.dm.ws.CardDto');
		var docSecDto = service.instantiate('com.totvs.technology.ecm.dm.ws.DocumentSecurityConfigDto');
		var docSecDtoArray = service.instantiate('com.totvs.technology.ecm.dm.ws.DocumentSecurityConfigDtoArray');
		var cardFieldDtoArray = service.instantiate('com.totvs.technology.ecm.dm.ws.CardFieldDtoArray'); // Variavel principal em edicoes de cards existentes.
		
		// Bloco para setar as propriedades principais do Card.
		cardDto.setDocumentDescription('');
		cardDto.setAdditionalComments("Ficha criada pelo Widget SIGAJURI_FollowUp");
		cardDto.setParentDocumentId(nFormId);
		cardDto.setColleagueId(clAdmin);
		cardDto.setValidationStartDate(null);
		cardDto.setExpires(false);
		cardDto.setExpirationDate(null);
		cardDto.setUserNotify(false);
		cardDto.setInheritSecurity(true);
		cardDto.setTopicId(1);
		cardDto.setVersionDescription('');
		cardDto.setDocumentKeyWord('');
		
		
		// Blocos para setar propriedades de seguranca.
		var docSecList = cardDto.getDocsecurity();
		for (var i = 0; i < docSecList.size(); i++){
			docSecDtoArray.getItem().add(docSecList.get(i));
		}
		
		docSecDto.setAttributionValue(sAdmin);
		docSecDto.setAttributionType(1); // 1 - Colaborador; 2 - Grupos; 3 - Todos.
		docSecDto.setSecurityLevel(3); // 0 - Leitura; 1 - Grava��o; 2 - Modifica��o; 3 - Total.
		docSecDto.setPermission(true);
		docSecDto.setSecurityVersion(false);
		docSecDto.setShowContent(true);
		
		cardDto.getDocsecurity().add(docSecDto);
		
		// Laco FOR para incluir os campos a serem alterados no Card.
		for (var i = 0; i < campos.length; i++){
			var cardFieldDto = service.instantiate('com.totvs.technology.ecm.dm.ws.CardFieldDto');
			cardFieldDto.setField(campos[i]);
			cardFieldDto.setValue(valores[i]);
			
			cardFieldDtoArray.getItem().add(cardFieldDto); // cardFieldDtoArray sera usado somente em edicoes.
			cardDto.getCardData().add(i, cardFieldDto);	 // em insercoes, cardDto possui um array proprio e dispensa cardFieldDtoArray.
		}
		
		// Insere cardDto no Array a ser utilizado em insercoes novas.
		cardDtoArray.getItem().add(cardDto);
		
		// Variavel que vai receber o resultado do chamada do webservice.
		var webserviceResultArray = null;
		
		// Se cardId for nulo, trata-se de uma insercao (service.create), caso seja inteiro, temos uma edicao (updateCardData)
		if (cardId != null){
			webserviceResultArray = cardService.updateCardData(nTenantId, sAdmin, sPassword, cardId, cardFieldDtoArray);
		}
		else {
			webserviceResultArray = cardService.create(nTenantId, sAdmin, sPassword, cardDtoArray);
		}
		
		// Recupera-se o resultado da chamada do webservice e inclui-se esse valor no dataset de retorno. 
		// Caso ocorra um erro na chamada do webservice, ele sera repassado para o widget tratar, pois nao dispara excecao no dataset.
		for (var i = 0; i < webserviceResultArray.getItem().size(); i++){
			var resultado = webserviceResultArray.getItem().get(i);
			dsResultado.addRow(new Array(resultado.getWebServiceMessage()));
		}
		
	}
	catch(e){
		// Caso ocorra algum erro entre o instanciamento do webservice e a sua execucao, a excecao sera repassada a widget.
		dsResultado.addRow(new Array('ERRO:' + e.message));
	}
	
	return dsResultado;
}

/**
 * Recupera os valores passados nas constraints e os ordena de forma correta em um array.
 * @param constraints Constraints passadas ao Dataset e que ser�o ordenas em um array mais simples e de f�cil acesso.
 * @return {Array} Retorna o array final, ordenado de modo a condizer com o array de campos.
 */
function getValores(constraints){
	var valores = new Array();
	for (var i = 0; i < constraints.length; i++){
		if (constraints[i].fieldName == "cdAssJur"){
			valores[0] = constraints[i].initialValue;
		} else if (constraints[i].fieldName == "sAssJur"){
			valores[1] = constraints[i].initialValue;
			
		} else if (constraints[i].fieldName == "cdTipoFU"){
			valores[2] = constraints[i].initialValue;
			
		} else if (constraints[i].fieldName == "sTipoFU"){
			valores[3] = constraints[i].initialValue;
			
		} else if (constraints[i].fieldName == "cdGrupo"){
			valores[4] = constraints[i].initialValue;
			
		} else if (constraints[i].fieldName == "sGrupo"){
			valores[5] = constraints[i].initialValue;
			
		} else if (constraints[i].fieldName == "cdPapel"){
			valores[6] = constraints[i].initialValue;
			
		} else if (constraints[i].fieldName == "sPapel"){
			valores[7] = constraints[i].initialValue;
			
		} else if (constraints[i].fieldName == "sPrioridade"){
			valores[8] = constraints[i].initialValue;
			
		} else if (constraints[i].fieldName == "sFaixaInicial"){
			valores[9] = constraints[i].initialValue;
			
		} else if (constraints[i].fieldName == "sFaixaFinal"){
			valores[10] = constraints[i].initialValue;
			
		} else if (constraints[i].fieldName == "cdAprovadorSIGAJURI"){
			valores[11] = constraints[i].initialValue;
			
		}else if (constraints[i].fieldName == "sAprovadorSIGAJURI"){
			valores[12] = constraints[i].initialValue;
			
		}
	}
	return valores;
}

/**
 * Recebe um array de valores e determina se eles se referem a uma edi��o ou a uma nova inser��o.
 * @param valores Valores recebidos das contraints e adaptados a ordem correta de processamento (usar ap�s getValores).
 * @return {Integer|null} Se for uma edi��o, retorna o Inteiro que representa o card a ser editado. Se for uma inser��o, retorna nulo.
 */
function isUpdate(valores){
	var cdAssJur = valores[0];
	var cdTipoFU = valores[2];
	var cdGrupo = valores[4];
	var cdPapel = valores[6];
	
	var fields = new Array();
	var constraints = new Array();
	var resultado = null;
	
	fields.push('metadata#id');
	fields.push('metadata#active');
	fields.push('cdAssJur');
	fields.push('cdTipoFU');
	fields.push('cdGrupo');
	fields.push('cdPapel');
	
	constraints.push(DatasetFactory.createConstraint('cdAssJur', cdAssJur, cdAssJur, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint('cdTipoFU', cdTipoFU, cdTipoFU, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint('cdGrupo', cdGrupo, cdGrupo, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint('cdPapel', cdPapel, cdPapel, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint('metadata#active', true, true, ConstraintType.MUST));
	
	var dsCards = DatasetFactory.getDataset("wcmSIGAJURI_FollowUp", fields, constraints, null);
	
	if (dsCards.rowsCount > 0){
		resultado = dsCards.getValue(0, 'metadata#id');
	}
	
	return resultado == null ? resultado : parseInt(resultado);
}

function getColleagueIdByMail(Email){
	var fields = new Array();
	var constraints = new Array();
	var sort = new Array();
	var colleagues = null;
	var colID = Email;
	
	fields.push("colleaguePK.colleagueId");
	
	constraints.push(DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint("mail", Email, Email, ConstraintType.MUST));
	
	try{
		log.info("*** getColleagueIdByMail: Chamando Dataset.");
		colleagues = DatasetFactory.getDataset("colleague", fields, constraints, sort);
		
		log.info("*** getColleagueIdByMail: Processando UserName.");
		if (colleagues && colleagues.rowsCount > 0){
			colID = colleagues.getValue(0, "colleaguePK.colleagueId");
		}
	}catch(e){
		log.error("*** getColleagueIdByMail: Falha ao recuperar o dataset.");
		log.error("*** getColleagueIdByMail: ERROR: " + e.message);
	}
	
	return colID;
}