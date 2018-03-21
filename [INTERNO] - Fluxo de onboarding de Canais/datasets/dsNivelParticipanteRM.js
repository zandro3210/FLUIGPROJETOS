function createDataset(fields, constraints, sortFields) {
	
	log.info (" ++ criz 1 DATASET dsnivelParticipanteRM - INICIO ++ " );

	// SERVICO criado COM OPCAO 1 - CFX 

	try {

		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
	    
		/*coluna 0*/ newDataset.addColumn("CODCOLIGADA");
		/*coluna 1*/ newDataset.addColumn("CHAPA");
		/*coluna 2*/ newDataset.addColumn("NOME"); // nome do participante
		/*coluna 3*/ newDataset.addColumn("DATAADMISSAO");
		/*coluna 4*/ newDataset.addColumn("EMAIL");
		/*coluna 5*/ newDataset.addColumn("CPF");
		/*coluna 6*/ newDataset.addColumn("COD_FUNCAO");
		/*coluna 7*/ newDataset.addColumn("FUNCAO");
		/*coluna 8*/ newDataset.addColumn("COD_CARGO"); 
		/*coluna 9*/ newDataset.addColumn("CARGO"); 
		/*coluna 10*/ newDataset.addColumn("COD_NIVEL_HIERARQUICO"); 
		/*coluna 11*/ newDataset.addColumn("NIVEL_HIERARQUICO");
		
		var email = "";
	
	    // para testar comente este if e descomente um dos emails abaixo
	 
	    if (constraints != null) {
			email = constraints[0].getInitialValue(); 
		}
		
	    //teste
	    //email = "jucane.medeiros@totvs.com.br";
		//email = "cristina.poffo@totvs.com.br";
	    //email = "felipe.valcanaia@totvs.com.br";
	    //email = "rodrigo.zuge@totvs.com.br";
	    //email = "alexandre.mafra@totvs.com.br";
	    //email = "paulo.eduardo@totvs.com.br";
	    //email = "lcosentino@totvs.com.br";
	    log.info ("++ DATASET dsnivelParticipanteRM - e-mail:" + email);
 
	    if (email != ""){
			var dataset = DatasetFactory.getDataset("pass_validate_rm", null, null, null);
			var json = dataset.getValue(0, "USER");
			var obj = JSON.parse(json);
	
	    	// Invoca o servico
			var codUsuario = obj.user;
			var senha = obj.pass;
			var codColigada = "0";
			var codAplicacao = "V";
			var codSentenca = "INTEGR_ECM.01";
			var xmlParamsValue = "<PARAM><EMAIL>" + email + "</EMAIL></PARAM>";
			var schema = false;
		
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
	        
					
    		log.info (" ++dsnivelParticipanteRM  DEPOIS DO FOR RETORNO XML:  " + retorno);
				
						
	    } // IF EMAIL
	} // try 
	catch(error) {
		log.info (" ++ DATASET dsnivelParticipanteRM - ERRO:  " + error.message);
		newDataset.addRow(new Array(error.message, "erro", "erro", "erro", "erro", "erro", "erro", "erro", "erro", "erro", "erro", "erro" )); 
	}
	 
	log.info (" ++ DATASET dsnivelParticipanteRM - FIM ++ " );
	return newDataset;
}


function getValue(e, field) {
	var name = e.getElementsByTagName(field);
	var line = name.item(0);
	var child = line.getFirstChild();
	log.info("CHILD:" + child.getNodeValue() + ":" + child.getTextContent());
	return child.getNodeValue();
}
