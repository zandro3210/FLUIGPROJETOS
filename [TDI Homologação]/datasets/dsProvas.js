function createDataset(fields, constraints, sortFields) {
	
	//log.info (" ++ DATASET DSPROVAS - INICIO ");
	
	var newDataset = DatasetBuilder.newDataset();
	
	try {
		newDataset.addColumn("CODPROVA");
		newDataset.addColumn("NOMEPROVA");
		newDataset.addColumn("DESCRICAOPROVA");
		newDataset.addColumn("TIPOPROVA");
		newDataset.addColumn("TIPO");
		newDataset.addColumn("CODAREA");
		newDataset.addColumn("AREA");
		newDataset.addColumn("CODMATERIA");
		newDataset.addColumn("MATERIA");
		newDataset.addColumn("GRAUDIFICULDADE");
		newDataset.addColumn("QUANTIDADE");
		
		var codProva = -1;
		
		if ((constraints != null) && (constraints.length > 0)) {
			codProva = constraints[0].getInitialValue(); 
		}
		
		// Parâmetros
		var codUsuario = "integr_prova";
		var senha = "pRov4s@fluig";
		var codColigada = "0";
		var codAplicacao = "V";
		var codSentenca = "INTEGR_FLG.17";
		var xmlParamsValue = "<PARAM><CODPROVA>" + codProva + "</CODPROVA></PARAM>";
		var schema = false;
		
		var revisaoProva = ServiceManager.getService('RHRM');
		var locator = revisaoProva.instantiate('br.com.totvs.rhrm.WsGlbSSL');
		var service = locator.getWsGlbSSLSoap();
		
		//log.info (" ++ DATASET DSPROVAS - SERVICE INSTACIADO");
		
		var retorno = service.getResultSQL(codUsuario, senha, codColigada, codAplicacao, codSentenca, xmlParamsValue, schema );
		
		//log.info (" ++ DATASET DSPROVAS - SERVICE RETORNO:  " + retorno);
		
		var db = javax.xml.parsers.DocumentBuilderFactory.newInstance().newDocumentBuilder();
		var is = new org.xml.sax.InputSource();
		is.setCharacterStream(new java.io.StringReader(retorno));
		var doc = db.parse(is);
		var nodes = doc.getElementsByTagName("Row");
		
		for (var i=0;i<nodes.getLength();i++) {
			var element = nodes.item(i);
			
   			newDataset.addRow(new Array(
   					getValue(element, "CODPROVA"),
   					getValue(element, "NOMEPROVA"),
   					getValue(element, "DESCRICAOPROVA"),
   					getValue(element, "TIPOPROVA"),
   					getValue(element, "TIPO"),
   					getValue(element, "CODAREA"),
   					getValue(element, "AREA"),
   					getValue(element, "CODMATERIA"),
   					getValue(element, "MATERIA"),
   					getValue(element, "GRAUDIFICULDADE"),
   					getValue(element, "QUANTIDADE")
   	   			));
		}
	}
	catch(error) {
		log.info (" ++ DATASET DSPROVAS - ERRO:  " + error.message);
		newDataset.addRow(new Array(error.message, 
				"1-erro",
				"2-erro",
				"3-erro",
				"4-erro",
				"5-erro",
				"6-erro",
				"7-erro",
				"8-erro",
				"9-erro",
				"10-erro",
				"11-erro")); 
	}
	
	return newDataset;
	
}

function getValue(e, field) {
	log.info (" DSPROVAS FIELD:  " + field);
	var name = e.getElementsByTagName(field);
	if (name.getLength() > 0) {
		var line = name.item(0);
		var child = line.getFirstChild();
		return child.getNodeValue();
	} else {
		return "";
	}
}