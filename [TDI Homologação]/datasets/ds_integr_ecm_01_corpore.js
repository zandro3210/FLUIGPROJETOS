function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetFactory.getDataset("pass_validate_rm", null, null, null);
	var json = dataset.getValue(0, "USER");
	var obj = JSON.parse(json);
	
	var USER = obj.user;
	var PASSWORD = obj.pass;
	var CONSULTA = "INTEGR_ECM.01";
	var APLICACAO = "V";
	var COLIGADA = "0";
	
//	var ATTRIBUTES = new Array("CODCOLIGADA", "CHAPA" ,"NOME", "DATAADMISSAO", "EMAIL", "CPF", "COD_FUNCAO", "FUNCAO", "COD_CARGO", "CARGO", "COD_NIVEL_HIERARQUICO", "NIVEL_HIERARQUICO");
	
	var newDataset = DatasetBuilder.newDataset();
	
/*	for (var x=0;x<ATTRIBUTES.length;x++) {
		newDataset.addColumn(ATTRIBUTES[x]);
	}*/
	
	newDataset.addColumn("CODCOLIGADA");
	newDataset.addColumn("CHAPA");
	newDataset.addColumn("NOME");
	newDataset.addColumn("DATAADMISSAO");
	newDataset.addColumn("EMAIL");
	newDataset.addColumn("CPF");
	newDataset.addColumn("COD_FUNCAO");
	newDataset.addColumn("FUNCAO");
	newDataset.addColumn("COD_CARGO");
	newDataset.addColumn("CARGO");
	newDataset.addColumn("COD_NIVEL_HIERARQUICO");
	newDataset.addColumn("NIVEL_HIERARQUICO");
	
	var corpore = ServiceManager.getService('CorporeGlbSSL');
	var locator = corpore.instantiate('br.com.totvs.br.WsGlbSSL');
	var service = locator.getWsGlbSSLSoap();
	
	var parametros = "<PARAM><EMAIL>rodrigo.sombrio@totvs.com.br</EMAIL></PARAM>";
	
	if (constraints != null) {
		for(var c in constraints){
			log.info("const:" + constraints[c].getFieldName());
			if (constraints[c].getFieldName() == "parametros"){
				parametros = constraints[c].getInitialValue(); 
			}
		}
	}
	
	log.info("param:" + parametros);
	
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
   					getValue(element, "CODCOLIGADA"),
   					getValue(element, "CHAPA"),
   					getValue(element, "NOME"),
   					getValue(element, "DATAADMISSAO"),
   					getValue(element, "EMAIL"),
   					getValue(element, "CPF"),
   					getValue(element, "COD_FUNCAO"),
   					getValue(element, "FUNCAO"),
   					getValue(element, "COD_CARGO"),
   					getValue(element, "CARGO"),
   					getValue(element, "COD_NIVEL_HIERARQUICO"),
   					getValue(element, "NIVEL_HIERARQUICO")
   	   			));
			
		}
		
	} catch(error) { 
		newDataset.addRow(new Array("erro", "erro", error.message, "erro", "erro", "erro", "erro", "erro", "erro", "erro", "erro", "erro")); 
	}	

	return newDataset;		
}

function getValue(e, field) {
	var name = e.getElementsByTagName(field);
	var line = name.item(0);
	if(line != null){
		var child = line.getFirstChild();
		return child.getNodeValue();
	}else{return;}
}