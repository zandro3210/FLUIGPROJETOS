function createDataset(fields, constraints, sortFields) {
	
	//log.info (" ++ DATASET DSQUESTOESPROVA - INICIO ");
	
	var newDataset = DatasetBuilder.newDataset();
	
	try {
		newDataset.addColumn("CODPROVA");
		newDataset.addColumn("CODQUESTAO");
		newDataset.addColumn("DESCRICAOQUESTAO");
		
		var codProva = "200502CERT0101";
		
		if ((constraints != null) && (constraints.length > 0)) {
			codProva = constraints[0].getInitialValue(); 
		}
		
		// Parâmetros
		var codUsuario = "integr_prova";
		var senha = "pRov4s@fluig";
		var codColigada = "0";
		var codAplicacao = "V";
		var codSentenca = "INTEGR_FLG.18";
		var xmlParamsValue = "<PARAM><CODPROVA>" + codProva + "</CODPROVA><CODQUESTAO>-1</CODQUESTAO></PARAM>";
		var schema = false;
		
		var revisaoProva = ServiceManager.getService('RHRM');
		var locator = revisaoProva.instantiate('br.com.totvs.rhrm.WsGlbSSL');
		var service = locator.getWsGlbSSLSoap();
		
		//log.info (" ++ DATASET DSQUESTOESPROVA - SERVICE INSTACIADO");
		
		var retorno = service.getResultSQL(codUsuario, senha, codColigada, codAplicacao, codSentenca, xmlParamsValue, schema );
		
		//log.info (" ++ DATASET DSQUESTOESPROVA - SERVICE RETORNO:  " + retorno);
		
		var db = javax.xml.parsers.DocumentBuilderFactory.newInstance().newDocumentBuilder();
		var is = new org.xml.sax.InputSource();
		is.setCharacterStream(new java.io.StringReader(retorno));
		var doc = db.parse(is);
		var nodes = doc.getElementsByTagName("Row");
		
		var lastCodQuestao = "";
		
		for (var i=0;i<nodes.getLength();i++) {
			var element = nodes.item(i);
			
			var codQuestao = getValue(element, "CODQUESTAO"); 
			
			if (lastCodQuestao != codQuestao) {
	   			newDataset.addRow(new Array(
	   					getValue(element, "CODPROVA"),
	   					codQuestao,
	   					getValue(element, "DESCRICAOQUESTAO")
	   	   			));
	   			lastCodQuestao = codQuestao;
			}
		}
	}
	catch(error) {
		log.info (" ++ DATASET DSQUESTOESPROVA - ERRO:  " + error.message);
		newDataset.addRow(new Array(error.message, 
				"1-erro",
				"2-erro",
				"3-erro")); 
	}
	
	return newDataset;
	
}

function getValue(e, field) {
	//log.info (" DSQUESTOESPROVA FIELD:  " + field);
	var name = e.getElementsByTagName(field);
	if (name.getLength() > 0) {
		var line = name.item(0);
		var child = line.getFirstChild();
		return child.getNodeValue();
	} else {
		return "";
	}
}