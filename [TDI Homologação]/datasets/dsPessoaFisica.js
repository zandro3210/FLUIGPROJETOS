function createDataset(fields, constraints, sortFields) {
	
	//log.info (" ++ DATASET DSPESSOAFISICA - INICIO");
	
	var newDataset = DatasetBuilder.newDataset();
	
	try {
		newDataset.addColumn("NOME");
		newDataset.addColumn("CPF");
		newDataset.addColumn("DTNASCIMENTO");
		newDataset.addColumn("EMAIL");
		
		var emailInformado = "luiz.keller@totvs.com.br";
		
		if ((constraints != null) && (constraints.length > 0)) {
			emailInformado = constraints[0].getInitialValue(); 
		}
		
		// Parâmetros
		var codUsuario = "integr_prova";
		var senha = "pRov4s@fluig";
		var codColigada = "0";
		var codAplicacao = "V";
		var codSentenca = "INTEGR_FLG.19";
		var xmlParamsValue = "<PARAM><EMAIL>" + emailInformado + "</EMAIL></PARAM>";
		var schema = false;
		
		var pessoaFisica = ServiceManager.getService('RHRM');
		var locator = pessoaFisica.instantiate('br.com.totvs.rhrm.WsGlbSSL');
		var service = locator.getWsGlbSSLSoap();
		
		//log.info (" ++ DATASET DSPESSOAFISICA - SERVICE INSTACIADO");
		
		var retorno = service.getResultSQL(codUsuario, senha, codColigada, codAplicacao, codSentenca, xmlParamsValue, schema );
		
		//log.info (" ++ DATASET DSPESSOAFISICA - SERVICE RETORNO:  " + retorno);
		
		var db = javax.xml.parsers.DocumentBuilderFactory.newInstance().newDocumentBuilder();
		var is = new org.xml.sax.InputSource();
		is.setCharacterStream(new java.io.StringReader(retorno));
		var doc = db.parse(is);
		var nodes = doc.getElementsByTagName("Row");
		
		//log.info (" ++ DATASET DSPESSOAFISICA - NODES:  " + nodes.getLength());
		
		for (var i=0;i<nodes.getLength();i++) {
			var element = nodes.item(i);
			
   			newDataset.addRow(new Array(
   					getValue(element, "NOME"),
   					getValue(element, "CPF"),
   					getDataFromRM(getValue(element, "DTNASCIMENTO")),
   					getValue(element, "EMAIL")
   	   			));
		}
	}
	catch(error) {
		log.info (" ++ DATASET DSPESSOAFISICA - ERRO:  " + error.message);
		newDataset.addRow(new Array(error.message, 
				"1-erro",
				"2-erro",
				"3-erro")); 
	}
	
	return newDataset;
	
}

function getValue(e, field) {
	log.info (" DSPESSOAFISICA FIELD:  " + field);
	var name = e.getElementsByTagName(field);
	if (name.getLength() > 0) {
		var line = name.item(0);
		var child = line.getFirstChild();
		return child.getNodeValue();
	} else {
		return "";
	}
}

function getDataFromRM(dataRM) {
	var dia = dataRM.substring(8, 10);
	var mes = dataRM.substring(5, 7);
	var ano = dataRM.substring(0, 4);
	
	return dia + "/" + mes + "/" + ano;
}