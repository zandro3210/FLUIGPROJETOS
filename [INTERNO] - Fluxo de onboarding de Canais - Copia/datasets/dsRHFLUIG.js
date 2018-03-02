function createDataset(fields, constraints, sortFields) {
	
	log.info (" ++ DATASET DSPESSOAFISICA - INICIO");
	
	var newDataset = DatasetBuilder.newDataset();
	var DTINICIO = "2016/10/01";
	var DTFIM = "2016/10/03";
	
	 if (constraints != null) {
		log.info("entrou no constraints");
		        for (var i = 0; i < constraints.length; i++) {
				log.info("entrou no constraints22");
				log.info("entrou no constraints33");
		                DTINICIO = constraints[i].initialValue; 
		                DTFIM = constraints[i].finalValue; 
		            }
		     }
	
	log.info("DATAS:" +DTINICIO+" -/- "+DTFIM)
	try {
		log.info (" ++ DATASET DSPESSOAFISICA - entrou no try");
		newDataset.addColumn("NOME");
		newDataset.addColumn("EMAIL");
		newDataset.addColumn("DATADEMISSAO");
			
		// Parâmetros
		log.info (" ++ DATASET DSPESSOAFISICA - INICIO DOS PARAMETROS");
		var dataset = DatasetFactory.getDataset("pass_validate_rm", null, null, null);
		var json = dataset.getValue(0, "USER");
		var obj = JSON.parse(json);

    	// Invoca o servico
		var codUsuario = obj.user;
		var senha = obj.pass;
		
		var codColigada = "0";
		var codAplicacao = "P";
		var codSentenca = "INTEGR_ECM008";
		var xmlParamsValue = "<PARAM><DATAINICIO> " +DTINICIO+ "</DATAINICIO><DATAFIM>" +DTFIM+ "</DATAFIM></PARAM>";
		var schema = false;
		
		var pessoaFisica = ServiceManager.getService('RHRM');
		var locator = pessoaFisica.instantiate('br.com.totvs.rhrm.WsGlbSSL');
		var service = locator.getWsGlbSSLSoap();
		
		log.info (" ++ DATASET DSPESSOAFISICA - SERVICE INSTACIADO - PAULO");
		
		var retorno = service.getResultSQL(codUsuario, senha, codColigada, codAplicacao, codSentenca, xmlParamsValue, schema );
		
		log.info (" ++ DATASET DSPESSOAFISICA - SERVICE RETORNO - PAULO:  " + retorno);
		
		var db = javax.xml.parsers.DocumentBuilderFactory.newInstance().newDocumentBuilder();
		var is = new org.xml.sax.InputSource();
		is.setCharacterStream(new java.io.StringReader(retorno));
		var doc = db.parse(is);
		var nodes = doc.getElementsByTagName("Row");
		
		log.info (" ++ DATASET DSPESSOAFISICA - NODES:  " + nodes.getLength());
		
		for (var i=0;i<nodes.getLength();i++) {
			var element = nodes.item(i);
			
   			newDataset.addRow(new Array(
   					getValue(element, "NOME"),
   					getValue(element, "EMAIL"),
   					getDataFromRM(getValue(element, "DATADEMISSAO"))
   	   			));
		}
	}
	catch(error) {
		log.info (" ++ DATASET DSPESSOAFISICA - ERRO - PAULO:  " + error.message);
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