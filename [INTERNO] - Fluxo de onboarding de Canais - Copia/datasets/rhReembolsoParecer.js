function createDataset(fields, constraints, sortFields) {	// Cria o dataset	var newDataset = DatasetBuilder.newDataset();	newDataset.addColumn("retorno");		var dataset = DatasetFactory.getDataset("pass_validate_rm", null, null, null);	var json = dataset.getValue(0, "USER");	var obj = JSON.parse(json);	// Invoca o servico	var codUsuario = obj.user;	var senha = obj.pass;	// Conecta o servico e busca os participantes	var periodicService = ServiceManager.getService('rhWSGeral');	var serviceHelper  	= periodicService.getBean();	var serviceLocator 	= serviceHelper.instantiate('br.com.totvs.www.br.WsRequisicaoSSLLocator');	var service         = serviceLocator.getwsRequisicaoSSLSoap();		// Invoca o servico	log.info("ANTES");	try {		var fieldsXml = 				"<VREQGERALPARECER>"+					"<CHAPASOLICITANTE>"+ fields[0] +"</CHAPASOLICITANTE>"+					"<CODCOLREQUISICAO>"+ fields[1] +"</CODCOLREQUISICAO>"+					"<CODCOLSOLICITANTE>"+ fields[1] +"</CODCOLSOLICITANTE>"+					"<CODSTATUS>3</CODSTATUS>"+					"<DATAPARECER>"+ fields[2] +"</DATAPARECER>"+					"<DATAPREVISTA>"+ fields[3] +"</DATAPREVISTA>"+					"<IDREQ>"+ fields[4] +"</IDREQ>"+					"<PARECER>"+ fields[5] +"</PARECER>"+					"</VREQGERALPARECER>";		var retorno = service.incluirReqGeralParecer(fields[0], codUsuario, senha,fieldsXml);		newDataset.addRow(new Array(retorno.toString()));		log.info("retorno: " + retorno.toString());	} 	catch(error) { 		newDataset.addRow(new Array(error.message)); 	}	return newDataset;}