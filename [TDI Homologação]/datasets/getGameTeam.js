function createDataset(fields, constraints, sortFields) {

	var datasetResult       = DatasetBuilder.newDataset(),
	//ALTERAR
		integrationUser     = "user",
		integrationPassword = "password",
	//ALTERAR
		codColigada			= 0,
		codAplicacao 		= "V",
		codSentenca 		= "INTEGR_GAME.06";
		

	datasetResult.addColumn("Result");

	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == "user") {
				user = constraints[i].initialValue;
			}
		}
		if (user == null) {
			datasetResult.addRow(["Gamification error: Missing community gamefication query params"]);
			return datasetResult;
		}
	}
	
	
	try {
		var service = ServiceManager.getService("GetResultSQL");
		var serviceHelper = service.getBean();
		var serviceLocator = serviceHelper.instantiate('br.com.totvs.br.WsGlbSSL');

		var wsGlbSSLSoap = serviceLocator.getWsGlbSSLSoap()

		var resultSQL = wsGlbSSLSoap.getResultSQL(integrationUser, integrationPassword, codColigada, codAplicacao, codSentenca, "<PARAM><USUARIO>" + user + "</USUARIO></PARAM>" , false );

		var xml = new XML(resultSQL)
	} catch (e) {
		datasetResult.addRow(["Gamification error: Error trying to call WS getResultSQL from RM Server" + e]);
		return datasetResult;
	}

	log.warn(xml);

	if(xml == null || xml.Row == "" || xml.Row.length() == 0) {
		datasetResult.addRow(["Gamification error: problem trying to parse RM xml"]);
		return datasetResult;
	}
	var row = xml.Row;

	if(row.teamCode == "") {
		datasetResult.addRow(["Gamification error: problem trying to parse RM xml"]);
		return datasetResult;
	}
	var teamCode = row.teamCode + "";

	datasetResult.addRow([teamCode]);

	return datasetResult;
}