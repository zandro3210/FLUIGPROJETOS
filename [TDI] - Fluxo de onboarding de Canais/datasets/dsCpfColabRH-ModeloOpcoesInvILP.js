function createDataset(fields, constraints, sortFields) {
	
	log.info (" ++ DATASET dsCpfColab - INICIO ++ " );
	
	try {

		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
	    
		/*coluna 0*/ newDataset.addColumn("EMAIL");
		/*coluna 1*/ newDataset.addColumn("NOME"); // nome do participante
		/*coluna 2*/ newDataset.addColumn("CPF");

	    var email = "";
	    // para testar comente este if e descomente um dos emails abaixo
	    if (constraints != null) {
			email = constraints[0].getInitialValue(); 
		}
	    
	    //teste
		//email = "cristina.poffo@totvs.com.br";
	    
	    log.info ("++ DATASET dsCpfColab - e-mail:" + email);
 
	    if (email != ""){
	
			var dataset = DatasetFactory.getDataset("pass_validate_rm", null, null, null);
			var json = dataset.getValue(0, "USER");
			var obj = JSON.parse(json);
	
	    	// Invoca o servico
			var codUsuario = obj.user;
			var senha = obj.pass;
			
			/*
			var codColigada = "0";
			var codAplicacao = "V";
			var codSentenca = "INTEGR_PTH.01";
			*/
			
			var codColigada = "0";
			var codAplicacao = "V";
			var codSentenca = "INTEGR_FLG.16";
			

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
				
	   			newDataset.addRow(new Array(
	   					getValue(element, "EMAIL"),
	   					getValue(element, "NOME"),
	   					getValue(element, "CPF")
	   	   			));
			}
	        
					
    		log.info (" ++ DATASET dsCpfColab - DEPOIS DO FOR RETORNO XML:  " + retorno);
				
						
	    } // IF EMAIL
	} // try 
	catch(error) {
		log.info (" ++ DATASET dsCpfColab - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro", error.message, "erro")); 
	}
	 
	log.info (" ++ DATASET dsCpfColab - FIM ++ " );
	return newDataset;
}


function getValue(e, field) {
	var name = e.getElementsByTagName(field);
	var line = name.item(0);
	var child = line.getFirstChild();
	log.info("CHILD:" + child.getNodeValue() + ":" + child.getTextContent());
	return child.getNodeValue();
}

