function createDataset(fields, constraints, sortFields) {
	var targetAlias, 
		event, 
		documentId,
		datasetResult = DatasetBuilder.newDataset();
	
	datasetResult.addColumn("Result");

	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == "targetAlias") {
				targetAlias = constraints[i].initialValue;
			} else if (constraints[i].fieldName == "event") {
				event = constraints[i].initialValue;
			} else if (constraints[i].fieldName == "documentId") {
				documentId = constraints[i].initialValue;
			}
		}
		if (targetAlias == null || event == null || documentId == null) {
			datasetResult.addRow(["Gamification error: Missing integration params"]);
			return datasetResult;
		}
	}

		// OAuth variables
		var FLUIG_HOST,
		GAME_POINT,
		OAUTH_APP_PUBLIC,
		OAUTH_APP_PRIVATE,
		OAUTH_USER_APP_PUBLIC,
		OAUTH_USER_APP_SECRET,

		constraintActiveProperties = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST),
		datasetPropriedadesDeGamificacao = DatasetFactory.getDataset('PropriedadesDeGamificacao', null, [constraintActiveProperties], null);

		if (datasetPropriedadesDeGamificacao == null || datasetPropriedadesDeGamificacao.rowsCount == 0) {
			throw "Gamification properties not defined.";
		}
		
		FLUIG_HOST = datasetPropriedadesDeGamificacao.getValue(0, "fluigpath");
		OAUTH_APP_PUBLIC = datasetPropriedadesDeGamificacao.getValue(0, "OAUTH_APP_PUBLIC");
		OAUTH_APP_PRIVATE = datasetPropriedadesDeGamificacao.getValue(0, "OAUTH_APP_PRIVATE");
		OAUTH_USER_APP_PUBLIC = datasetPropriedadesDeGamificacao.getValue(0, "OAUTH_USER_APP_PUBLIC");
		OAUTH_USER_APP_SECRET = datasetPropriedadesDeGamificacao.getValue(0, "OAUTH_USER_APP_SECRET");
		GAME_POINT = datasetPropriedadesDeGamificacao.getValue(0, "UserScore");
		
		var colaboratorTeam = "TimeCampanha";
		
		// Definition Of Gamification Event
		var jsonContent = {};
		jsonContent.collaboratorAlias = targetAlias
		jsonContent.collaboratorTeam = colaboratorTeam;		/*** INTEGRACAO RM ***/
		jsonContent.eventCode = event;
		jsonContent.points = "1";
		jsonContent.universalId = jsonContent.eventCode + "_" + documentId + "_" + targetAlias;

		var jsonString = 
			"{\"collaboratorAlias\":\"" + jsonContent.collaboratorAlias 
			+ "\",\"teamCode\":\"" + jsonContent.collaboratorTeam
			+ "\",\"eventCode\":\""	+ jsonContent.eventCode
			+ "\",\"points\":\"" + jsonContent.points
			+ "\",\"universalId\":\"" + jsonContent.universalId + "\"}";
//
		var consumer = oauthUtil.getGenericConsumer(OAUTH_APP_PUBLIC, OAUTH_APP_PRIVATE,
				OAUTH_USER_APP_PUBLIC, OAUTH_USER_APP_SECRET);
		var data = consumer.post(FLUIG_HOST	+ "/gamificationapi/public/event/completeEvent", jsonString) + "";
		log.info(data);
		
		datasetResult.addRow(["Gamification SUCCESS"]);
		
		return datasetResult;

}

