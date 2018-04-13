function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetFactory.getDataset("pass_validate_rm", null, null, null);
	var json = dataset.getValue(0, "USER");
	var obj = JSON.parse(json);

	var USER = obj.user;
	var PASSWORD = obj.pass;
	var CONSULTA = "INTEGR_FLG.04";
	var APLICACAO = "V";
	var COLIGADA = "0";
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("NOME");			
	newDataset.addColumn("MATRICULA");		
	newDataset.addColumn("ADMISSAO");
	newDataset.addColumn("DTNASCIMENTO");
	newDataset.addColumn("RUA");
	newDataset.addColumn("NUMERO");
	newDataset.addColumn("BAIRRO");
	newDataset.addColumn("CIDADE");
	newDataset.addColumn("ESTADO");
	newDataset.addColumn("CEP");
	newDataset.addColumn("TELEFONE1");
	newDataset.addColumn("TELEFONE2");
	newDataset.addColumn("EMAIL");
	
	var corpore = ServiceManager.getService('CorporeGlbSSL');
	var locator = corpore.instantiate('br.com.totvs.br.WsGlbSSL');
	var service = locator.getWsGlbSSLSoap();
	var tag = "EMAIL";
	var valor = "";
	
	if (constraints != null) {
		for(var c in constraints){
			log.info("const:" + constraints[c].getFieldName());
			if (constraints[c].getFieldName() == "tag"){
				tag = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "valor"){
				valor = constraints[c].getInitialValue(); 
			}
		}
	}
	
	log.info("INTEGR_FLG.04:" + tag + ":" + valor);
	var parametros = "<PARAM><" + tag + ">" + valor + "</" + tag + "></PARAM>";
	
	try {
		log.info("PARAM:" + parametros);
		var result = service.getResultSQL(USER, PASSWORD, COLIGADA, APLICACAO, CONSULTA, parametros, false);
		
		var db = javax.xml.parsers.DocumentBuilderFactory.newInstance().newDocumentBuilder();
		var is = new org.xml.sax.InputSource();
		is.setCharacterStream(new java.io.StringReader(result));
		var doc = db.parse(is);
		var nodes = doc.getElementsByTagName("Row");
		
		for (var i=0;i<nodes.getLength();i++) {
			var element = nodes.item(i);
			
   			newDataset.addRow(new Array(
   					getValue(element, "NOME"),
   					getValue(element, "MATRICULA"),
   					getValue(element, "ADMISSAO"),
   					getValue(element, "DTNASCIMENTO"),
   					getValue(element, "RUA"),
   					getValue(element, "NUMERO"),
   					getValue(element, "BAIRRO"),
   					getValue(element, "CIDADE"),
   					getValue(element, "ESTADO"),
   					getValue(element, "CEP"),
   					getValue(element, "TELEFONE1"),
   					getValue(element, "TELEFONE2"),
   					getValue(element, "EMAIL"),
   					"0"
   	   			));
		}
	} 
	catch(error) { 
		newDataset.addRow(new Array(error.message, "erro")); 
	}
	
	return newDataset;
	
}

function getValue(e, field) {
	var name = e.getElementsByTagName(field);
	var line = name.item(0);
	var child = line.getFirstChild();
	log.info("CHILD:" + child.getNodeValue() + ":" + child.getTextContent());
	return child.getNodeValue();
}