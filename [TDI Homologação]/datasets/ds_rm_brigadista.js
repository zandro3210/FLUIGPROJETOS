function createDataset(fields, constraints, sortFields) {
	
	log.info('### entrou DS_RM_BRIGADISTA ###');
	
	if (constraints != null) {
		var email = constraints[0].getInitialValue(); 
	}
       
	           
	
	var ds_usuariorm = DatasetFactory.getDataset("ds_rm_usuario", null, null, null);
    
	var USER = ds_usuariorm.getValue(0, "codUsuario");
	var PASSWORD = ds_usuariorm.getValue(0, "senha");
	var CONSULTA = "INTEGR_FLG.26";
	var APLICACAO = "V";
	var COLIGADA = "0";
		
	log.info('*** USER:'+USER);
	log.info('*** PASSWORD:'+PASSWORD);
	
	var newDataset = DatasetBuilder.newDataset();
	
	newDataset.addColumn("NOME");
	newDataset.addColumn("RG");
	newDataset.addColumn("IDADE");
	newDataset.addColumn("EMAIL");
	newDataset.addColumn("COD_EMPRESA");
	newDataset.addColumn("NOME_EMPRESA");
	newDataset.addColumn("COD_UNICDADE");
	newDataset.addColumn("NOME_UNIDADE");
	newDataset.addColumn("SETOR");
	newDataset.addColumn("TELEFONE_SOLICITANTE");
	newDataset.addColumn("HORARIO");
	newDataset.addColumn("MATRICULA_SOLICITANTE");
	newDataset.addColumn("NOME_GESTOR");
	newDataset.addColumn("MATRICULA_GESTOR");
	newDataset.addColumn("COD_EMPRESA_GESTOR");
	newDataset.addColumn("COD_UNIDADE_GESTOR");
	newDataset.addColumn("EMAIL_GESTOR");
	newDataset.addColumn("TELEFONE_GESTOR");
	
	var brigadista = ServiceManager.getService('CorporeGlbSSL');
	log.info('### brigadista:'+brigadista);
	var locator = brigadista.instantiate('br.com.totvs.br.WsGlbSSL');
	log.info('### locator:'+locator);
	var service = locator.getWsGlbSSLSoap();
	log.info('### service:'+service);
	
	var parametros = "<![CDATA["+email+"]]>";
	
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
		
		log.info('Result:'+result);
		
		var db = javax.xml.parsers.DocumentBuilderFactory.newInstance().newDocumentBuilder();
		var is = new org.xml.sax.InputSource();
		is.setCharacterStream(new java.io.StringReader(result));
		var doc = db.parse(is);
		var nodes = doc.getElementsByTagName("Row");
		
		for (var i=0;i<nodes.getLength();i++) {
			var element = nodes.item(i);
			
   			newDataset.addRow(new Array(
   					getValue(element, "NOME"),
   					getValue(element, "RG"),
   					getValue(element, "IDADE"),
   					getValue(element, "EMAIL"),
   					getValue(element, "COD_EMPRESA"),
   					getValue(element, "NOME_EMPRESA"),
   					getValue(element, "COD_UNICDADE"),
   					getValue(element, "NOME_UNIDADE"),
   					getValue(element, "SETOR"),
   					getValue(element, "TELEFONE_SOLICITANTE"),
   					getValue(element, "HORARIO"),
   					getValue(element, "MATRICULA_SOLICITANTE"),
   					getValue(element, "NOME_GESTOR"),
   					getValue(element, "MATRICULA_GESTOR"),
   					getValue(element, "COD_EMPRESA_GESTOR"),
   					getValue(element, "COD_UNIDADE_GESTOR"),
   					getValue(element, "EMAIL_GESTOR"),
   					getValue(element, "TELEFONE_GESTOR")
   					
   	   			));
			
		}
		
	} catch(error) { 
		newDataset.addRow(new Array("erro", "erro", error.message, "erro", "erro", "erro", "erro", "erro", "erro", "erro", "erro", "erro")); 
	}	

	return newDataset;		
	
	log.info('newDataset:'+newDataset);
}

function getValue(e, field) {
	var name = e.getElementsByTagName(field);
	var line = name.item(0);
	if(line != null){
		var child = line.getFirstChild();
		return child.getNodeValue();
	}else{return;}
}