function createDataset(fields, constraints, sortFields) {

	log.info (" ++ DATASET dsDadosRmFuncGestContratoJur - INICIO ++ " );
	
	try {

		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
	    
		//coluna 0
		newDataset.addColumn("EMAIL_PARTICIPANTE");
		//coluna 1 
		newDataset.addColumn("PARTICIPANTE"); // nome do participante
		//coluna 2 
		newDataset.addColumn("CPF_PARTICIPANTE");
		//coluna 3 
		newDataset.addColumn("CODCARGO_PARTICIPANTE"); 
		//coluna 4
		newDataset.addColumn("CARGO_PARTICIPANTE"); 
		//coluna 5 
		newDataset.addColumn("DATA_NASCIMENTO"); 
		
	    var email = "";
	
	    // para testar comente este if e descomente um dos emails abaixo
	    
	    if (constraints != null) {
			email = constraints[0].getInitialValue(); 
		}
	    
	    //teste
		//email = "cristina.poffo@totvs.com.br";
		//email = "rodrigo.zuge@totvs.com.br";
	   
	    log.info ("++ DATASET dsDadosRmFuncGestContratoJur - e-mail:" + email);
 
	    if (email != ""){
	
			var dataset = DatasetFactory.getDataset("pass_validate_rm", null, null, null);
			var json = dataset.getValue(0, "USER");
			var obj = JSON.parse(json);
	
	    	// Invoca o servico
			var codUsuario = obj.user;
			var senha = obj.pass;
			
			var codColigada = "0";
			var codAplicacao = "V";
			var codSentenca = "INTEGR_FLG.13";
			var xmlParamsValue = "<PARAM><EMAIL>" + email + "</EMAIL></PARAM>";
			var schema = false;
		
			// SERVICO criado COM OPCAO 1 - CFX 
			var corpore = ServiceManager.getService('CorporeGlbSSL');
			var locator = corpore.instantiate('br.com.totvs.br.WsGlbSSL');
			var service = locator.getWsGlbSSLSoap();
			 
			
			var retorno = service.getResultSQL(codUsuario, senha, codColigada, codAplicacao, codSentenca, xmlParamsValue, schema );
	        
			var db = javax.xml.parsers.DocumentBuilderFactory.newInstance().newDocumentBuilder();
			var is = new org.xml.sax.InputSource();
			is.setCharacterStream(new java.io.StringReader(retorno));
			var doc = db.parse(is);
			var nodes = doc.getElementsByTagName("Row");
			
			for (var i=0;i<nodes.getLength();i++) {
				var element = nodes.item(i);
				 log.info ("++ DATASET dsDadosRmFuncGestContratoJur - retorno DATASET i: " + i);
	   			newDataset.addRow(new Array(
	   					getValue(element, "EMAIL_PARTICIPANTE"),
	   					getValue(element, "PARTICIPANTE"),
	   					getValue(element, "CPF_PARTICIPANTE"),
	   					getValue(element, "CODCARGO_PARTICIPANTE"),
	   					getValue(element, "CARGO_PARTICIPANTE"),
	   					getValue(element, "DATA_NASCIMENTO")
	   	   			));
			}
	        		
			log.info (" ++ DATASET dsDadosRmFuncGestContratoJur - DEPOIS DO FOR RETORNO XML:  " + retorno);
				
						
	    } // IF EMAIL
	} // try 
	catch(error) {
		log.info (" ++ DATASET dsDadosRmFuncGestContratoJur - ERRO:  " + error.message);
		newDataset.addRow(new Array(error.message, "erro", "erro", "erro","erro","erro")); 
	}
	 
	log.info (" ++ DATASET dsDadosRmFuncGestContratoJur - FIM ++ " );
	return newDataset;
}


function getValue(e, field) {
	var name = e.getElementsByTagName(field);
	var line = name.item(0);
	var child = line.getFirstChild();
	log.info("CHILD:" + child.getNodeValue() + ":" + child.getTextContent());
	return child.getNodeValue();
}
