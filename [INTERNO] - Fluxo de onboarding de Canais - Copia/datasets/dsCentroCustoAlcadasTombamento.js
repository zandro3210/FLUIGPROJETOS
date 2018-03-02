function createDataset(fields, constraints, sortFields) {

	log.info (" ++ DATASET dsCentroCustoAlcadasTombamento - INICIO ++ " );
	
	try {

	    // Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
	    
		/*coluna 0*/ newDataset.addColumn("COORDENADOR_CC");
		/*coluna 1*/ newDataset.addColumn("GESTOR");
		/*coluna 2*/ newDataset.addColumn("GESTOREXECUTIVO"); 
		/*coluna 3*/ newDataset.addColumn("DIRETOR");
		/*coluna 4*/ newDataset.addColumn("DIRETOREXECUTIVO");
		/*coluna 5*/ newDataset.addColumn("VP");
		/*coluna 6*/ newDataset.addColumn("GESTOR_CC");
		/*coluna 7*/ newDataset.addColumn("EMAILCOORDENADOR");
		/*coluna 8*/ newDataset.addColumn("EMAILGESTOR");
		/*coluna 9*/ newDataset.addColumn("EMAILGESTOREXECUTIVO");
		/*coluna 10*/ newDataset.addColumn("EMAILDIRETOR");
		/*coluna 11*/ newDataset.addColumn("EMAILDIRETOREXECUTIVO");
		/*coluna 12*/ newDataset.addColumn("EMAILVP");
		/*coluna 13*/ newDataset.addColumn("EMAILGESTOR_CC");
		
		    
		
		var nivel = "";
	    var ccusto = "";
	
	    
	    if (fields) {
	    	nivel  = fields[0]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
	    	ccusto  = fields[2]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
	    }
	    
	    //teste
		//nivel = "2";
	    //ccusto = "603360101";
	
	    
	    if (nivel != ""){
	
	    	var dataset = DatasetFactory.getDataset("pass_validate_rm", null, null, null);
	    	var json = dataset.getValue(0, "USER");
	    	var obj = JSON.parse(json);
	    	
	    	// Invoca o servico
			var codUsuario = obj.user;
			var senha = obj.pass;
			var codColigada = "0";
			var codAplicacao = "V";
			var codSentenca = "INTEGR_FLG.05";
			var xmlParamsValue = "<PARAM><NIVEL>" + nivel + "</NIVEL>" + 
								 "<CODCCUSTO>" + ccusto + "</CODCCUSTO></PARAM>";
			var schema = false;
		
			// SERVICO criado COM OPCAO 2 - Axis ECM 3
			//var periodicService = ServiceManager.getService('CorporeGlbSSL');
			//var serviceLocator = periodicService.instantiate('br.com.totvs.www.br.WsGlbSSLLocator');
			//var service = serviceLocator.getwsGlbSSLSoap();
			 
			log.info (" ++ DATASET dsCentroCustoAlcadasTombamento xmlParamsValue:  " + xmlParamsValue); 
		
			// SERVICO criado COM OPCAO 1 - CFX 
			var corpore = ServiceManager.getService('CorporeGlbSSL');
			log.info (" ++ DATASET dsCentroCustoAlcadasTombamento getservice OK");
			var locator = corpore.instantiate('br.com.totvs.br.WsGlbSSL');
			log.info (" ++ DATASET dsCentroCustoAlcadasTombamento instantiate OK");
			var service = locator.getWsGlbSSLSoap();
			log.info (" ++ DATASET dsCentroCustoAlcadasTombamento getWsGlbSSLSoap OK");
			 
			
			var retorno = service.getResultSQL(codUsuario, senha, codColigada, codAplicacao, codSentenca, xmlParamsValue, schema );
	        
			//var DocumentElement = new XML(retorno);
	        //log.info (" ++ DATASET DSHIERARQUIA - DADOS DESTINATARIO DESPESA:  " + DocumentElement);
	        //log.info (" ++ RETORNO XML:  " + retorno);
	        

    		log.info (" ++ DATASET DEPOIS DO FOR RETORNO dsCentroCustoAlcadasTombamento XML:  " + retorno);

    		
			var db = javax.xml.parsers.DocumentBuilderFactory.newInstance().newDocumentBuilder();
			var is = new org.xml.sax.InputSource();
			is.setCharacterStream(new java.io.StringReader(retorno));
			var doc = db.parse(is);
			var nodes = doc.getElementsByTagName("Row");

    		log.info (" ++ DATASET dsCentroCustoAlcadasTombamento NODES:  " + nodes.getLength());
    		
    		if (nivel == "1") {
				for (var i=0;i<nodes.getLength();i++) {
					var element = nodes.item(i);
					
		   			newDataset.addRow(new Array(
		   					getValue(element, "COORDENADOR_CC"),
		   					getValue(element, "GESTOR"),
		   					getValue(element, "GESTOREXECUTIVO"),
		   					getValue(element, "DIRETOR"),
		   					getValue(element, "DIRETOREXECUTIVO"),
		   					getValue(element, "VP"),
		   					"", // NAO RETIRAR
		   					getValue(element, "EMAILCOORDENADOR"),
		   					getValue(element, "EMAILGESTOR"),
		   					getValue(element, "EMAILGESTOREXECUTIVO"),
		   					getValue(element, "EMAILDIRETOR"),
		   					getValue(element, "EMAILDIRETOREXECUTIVO"),
		   					getValue(element, "EMAILVP"),
		   					"" // NAO RETIRAR
		   	   			));
				}
    		}
    		else{
    			for (var i=0;i<nodes.getLength();i++) {
					var element = nodes.item(i);
					log.info ("element:" + element);
		   			newDataset.addRow(new Array(
		   					"", // NAO RETIRAR 
		   					"", // NAO RETIRAR
		   					getValue(element, "GESTOREXECUTIVO"),
		   					getValue(element, "DIRETOR"),
		   					getValue(element, "DIRETOREXECUTIVO"),
		   					getValue(element, "VP"),  
		   					getValue(element, "GESTOR_CC"),
		   					"", // NAO RETIRAR 
		   					"", // NAO RETIRAR
		   					getValue(element, "EMAILGESTOREXECUTIVO"),
		   					getValue(element, "EMAILDIRETOR"),
		   					getValue(element, "EMAILDIRETOREXECUTIVO"),
		   					getValue(element, "EMAILVP"),
		   					getValue(element, "EMAILGESTOR_CC")
		   	   			));
		   			
				}
    		}
	    } // IF nivel != ""
	} // try 
	catch(error) {
		log.info (" ++ DATASET dsCentroCustoAlcadasTombamento - ERRO:  " + error.message);
		newDataset.addRow(new Array(error.message,"erro","erro","erro","erro","erro","erro","erro","erro","erro","erro","erro","erro","erro")); 
	}
	 
	log.info (" ++ DATASET dsCentroCustoAlcadasTombamento - FIM ++ " );
	
	return newDataset;
}


function getValue(e, field) {
	var name = e.getElementsByTagName(field);
	var line = name.item(0);
	var child = line.getFirstChild();
	log.info("++ DATASET dsCentroCustoAlcadasTombamento CHILD:" + child.getNodeValue() + ":" + child.getTextContent());
	return child.getNodeValue();
}

