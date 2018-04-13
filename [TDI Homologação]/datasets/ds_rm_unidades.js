function createDataset(fields, constraints, sortFields) {
	
	var ds_usuariorm = DatasetFactory.getDataset("ds_rm_usuario", null, null, null);
    
	var USER = ds_usuariorm.getValue(0, "codUsuario");
	var PASSWORD = ds_usuariorm.getValue(0, "senha");
	var CONSULTA = "INTEGR_FLG.27";
	var APLICACAO = "V";
	var COLIGADA = "0";
		
	log.info('*** USER:'+USER);
	log.info('*** PASSWORD:'+PASSWORD);
	
	var newDataset = DatasetBuilder.newDataset();
	
	newDataset.addColumn("COD_UNIDADE");
	newDataset.addColumn("NOME_UNIDADE");
	
	
	var brigadista = ServiceManager.getService('CorporeGlbSSL');
	log.info('### brigadista:'+brigadista);
	var locator = brigadista.instantiate('br.com.totvs.br.WsGlbSSL');
	log.info('### locator:'+locator);
	var service = locator.getWsGlbSSLSoap();
	log.info('### service:'+service);
	
	//LISTA TODAS AS COLIGADAS
	//var parametros = "<PARAM><EMPRESA>-1</EMPRESA></PARAM>";
	
	if (constraints != null) {
		for(var c in constraints){
			log.info("const:" + constraints[c].getFieldName());
			if (constraints[c].getFieldName() == "coligada"){
				parametros = "<PARAM><EMPRESA>"+constraints[c].getInitialValue()+"</EMPRESA></PARAM>"; 
			}
		}
	}
	
	log.info('###PARAM COLIGADA###');
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
   					getValue(element, "COD_UNIDADE"),
   					getValue(element, "NOME_UNIDADE")
   					
   	   			));

		}
		
	} catch(error) { 
		newDataset.addRow(new Array("erro", "erro", error.message, "erro", "erro", "erro", "erro", "erro", "erro", "erro", "erro", "erro")); 
	}	
	
	log.info('newDataset:'+newDataset);
	
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
