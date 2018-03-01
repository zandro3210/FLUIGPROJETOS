function createDataset(fields, constraints, sortFields) {
	
	//log.info (" ++ DATASET DSALTERNATIVASQUESTAO - INICIO ");
	
	var newDataset = DatasetBuilder.newDataset();
	
	try {
		newDataset.addColumn("CODPROVA");
		newDataset.addColumn("CODQUESTAO");
		newDataset.addColumn("ALTERNATIVA");
		newDataset.addColumn("INDCORRETA");
		
		var codProva = "200502CERT0101";
		var codQuestao = "00001";
		
		if ((constraints != null) && (constraints.length > 0)) {
			codProva = constraints[0].getInitialValue();
			var codQuestao = constraints[1].getInitialValue();
		}
		
		// Parâmetros
		var codUsuario = "integr_prova";
		var senha = "pRov4s@fluig";
		var codColigada = "0";
		var codAplicacao = "V";
		var codSentenca = "INTEGR_FLG.18";
		var xmlParamsValue = "<PARAM><CODPROVA>" + codProva + "</CODPROVA><CODQUESTAO>" + codQuestao + "</CODQUESTAO></PARAM>";
		var schema = false;
		
		var revisaoProva = ServiceManager.getService('RHRM');
		var locator = revisaoProva.instantiate('br.com.totvs.rhrm.WsGlbSSL');
		var service = locator.getWsGlbSSLSoap();
		
		//log.info (" ++ DATASET DSALTERNATIVASQUESTAO - SERVICE INSTACIADO");
		
		var retorno = service.getResultSQL(codUsuario, senha, codColigada, codAplicacao, codSentenca, xmlParamsValue, schema );
		
		//log.info (" ++ DATASET DSALTERNATIVASQUESTAO - SERVICE RETORNO:  " + retorno);
		
		var db = javax.xml.parsers.DocumentBuilderFactory.newInstance().newDocumentBuilder();
		var is = new org.xml.sax.InputSource();
		is.setCharacterStream(new java.io.StringReader(retorno));
		var doc = db.parse(is);
		var nodes = doc.getElementsByTagName("Row");
		
		for (var i=0;i<nodes.getLength();i++) {
			var element = nodes.item(i); 
			
   			newDataset.addRow(new Array(
   					getValue(element, "CODPROVA"),
   					getValue(element, "CODQUESTAO"),
   					getValue(element, "ALTERNATIVA"),
   					getValue(element, "INDCORRETA")
   	   			));
		}
	}
	catch(error) {
		log.info (" ++ DATASET DSQUESTOESPROVA - ERRO:  " + error.message);
		newDataset.addRow(new Array(error.message, 
				"1-erro",
				"2-erro",
				"3-erro",
				"4-erro")); 
	}
	
	return newDataset;
	
}

function getValue(e, field) {
	//log.info (" DSALTERNATIVASQUESTAO FIELD:  " + field);
	var name = e.getElementsByTagName(field);
	if (name.getLength() > 0) {
		var line = name.item(0);
		var child = line.getFirstChild();
		return child.getNodeValue();
	} else {
		return "";
	}
}