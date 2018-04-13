function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetFactory.getDataset("pass_validate_rm", null, null, null);
	var json = dataset.getValue(0, "USER");
	var obj = JSON.parse(json);

	var USER = obj.user;
	var PASSWORD = obj.pass;
	var CONSULTA = "INTEGR_ECM.15";
	var APLICACAO = "V";
	var COLIGADA = "0";
	
	var newDataset = DatasetBuilder.newDataset();
	
	newDataset.addColumn("ERRO");
	newDataset.addColumn("BOX2012");
	
	var corpore = ServiceManager.getService('CorporeGlbSSL');
	var locator = corpore.instantiate('br.com.totvs.br.WsGlbSSL');
	var service = locator.getWsGlbSSLSoap();
	
	var parametros = "<PARAM><EMAIL>rodrigo.sombrio@totvs.com.br</EMAIL></PARAM>";
	
	if (constraints != null) {
		for(var c in constraints){
			if (constraints[c].getFieldName() == "parametros"){
				parametros = constraints[c].getInitialValue(); 
			}
		}
	}
	
	try {
		var result = service.getResultSQL(USER, PASSWORD, COLIGADA, APLICACAO, CONSULTA, parametros, false);
		
		var db = javax.xml.parsers.DocumentBuilderFactory.newInstance().newDocumentBuilder();
		var is = new org.xml.sax.InputSource();
		is.setCharacterStream(new java.io.StringReader(result));
		var doc = db.parse(is);
		var nodes = doc.getElementsByTagName("Row");
		
		for (var i=0;i<nodes.getLength();i++) {
			var element = nodes.item(i);
   			newDataset.addRow(new Array(
   	   				"",
   					getValue(element, "BOX2012")
   	   			));
		}
	} catch(error) { 
		newDataset.addRow(new Array("erro", error.message)); 
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