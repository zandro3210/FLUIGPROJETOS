function createDataset(fields, constraints, sortFields) {

	log.info (" ++ DATASET dsCentroCustoTombamento - INICIO ++ " );
	
	try {

	    // Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
	    
		/*coluna 0*/ newDataset.addColumn("CODCCUSTO");
		/*coluna 0*/ newDataset.addColumn("DESCRICAO");
		
	    var ccusto = "";

	    if (fields) {
	    	ccusto  = fields[0]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
	    }
	    
	    //teste
	    //ccusto = "603360101";
	    //ccusto = "-1";
	
       // CCUSTO -1 RETORNA TODOS OS CCUSTO E DESCRICAO
	   if (ccusto != ""){
		   
			var dataset = DatasetFactory.getDataset("pass_validate_rm", null, null, null);
			var json = dataset.getValue(0, "USER");
			var obj = JSON.parse(json);
	
	    	// Invoca o servico
			var codUsuario = obj.user;
			var senha = obj.pass;
			var codColigada = "0";
			var codAplicacao = "V";
			var codSentenca = "INTEGR_FLG.09";
			var xmlParamsValue ="<PARAM><CODCCUSTO>" + ccusto + "</CODCCUSTO></PARAM>";
			var schema = false;
		
			log.info (" ++ DATASET dsCentroCustoTombamento xmlParamsValue:  " + xmlParamsValue); 
		
			// SERVICO criado COM OPCAO 1 - CFX 
			var corpore = ServiceManager.getService('CorporeGlbSSL');
			log.info (" ++ DATASET dsCentroCustoTombamento getservice OK");
			var locator = corpore.instantiate('br.com.totvs.br.WsGlbSSL');
			log.info (" ++ DATASET dsCentroCustoTombamento instantiate OK");
			var service = locator.getWsGlbSSLSoap();
			log.info (" ++ DATASET dsCentroCustoTombamento getWsGlbSSLSoap OK");
			 
			
			var retorno = service.getResultSQL(codUsuario, senha, codColigada, codAplicacao, codSentenca, xmlParamsValue, schema );
	        
			log.info (" ++ DATASET DEPOIS DO FOR RETORNO dsCentroCustoTombamento XML:  " + retorno);

    		
			var db = javax.xml.parsers.DocumentBuilderFactory.newInstance().newDocumentBuilder();
			var is = new org.xml.sax.InputSource();
			is.setCharacterStream(new java.io.StringReader(retorno));
			var doc = db.parse(is);
			var nodes = doc.getElementsByTagName("Row");

    		log.info (" ++ DATASET dsCentroCustoTombamento NODES:  " + nodes.getLength());
    		
			for (var i=0;i<nodes.getLength();i++) {
				var element = nodes.item(i);
				
	   			newDataset.addRow(new Array(
				   		   		  getValue(element, "CODCCUSTO"),
				   		   		  getValue(element, "DESCRICAO")
				   	   			  ));
			}
		} // IF ccusto != ""
	   else{
		   
			var dataset = DatasetFactory.getDataset("pass_validate_rm", null, null, null);
			var json = dataset.getValue(0, "USER");
			var obj = JSON.parse(json);
	
	    	// Invoca o servico
			var codUsuario = obj.user;
			var senha = obj.pass;
		   
			var codColigada = "0";
			var codAplicacao = "V";
			var codSentenca = "INTEGR_FLG.09";
			var xmlParamsValue ="<PARAM><CODCCUSTO>-1</CODCCUSTO></PARAM>";
			var schema = false;
		
			log.info (" ++ DATASET dsCentroCustoTombamento xmlParamsValue:  " + xmlParamsValue); 
		
			// SERVICO criado COM OPCAO 1 - CFX 
			var corpore = ServiceManager.getService('CorporeGlbSSL');
			log.info (" ++ DATASET dsCentroCustoTombamento getservice OK");
			var locator = corpore.instantiate('br.com.totvs.br.WsGlbSSL');
			log.info (" ++ DATASET dsCentroCustoTombamento instantiate OK");
			var service = locator.getWsGlbSSLSoap();
			log.info (" ++ DATASET dsCentroCustoTombamento getWsGlbSSLSoap OK");
			 
			
			var retorno = service.getResultSQL(codUsuario, senha, codColigada, codAplicacao, codSentenca, xmlParamsValue, schema );
	        
			log.info (" ++ DATASET DEPOIS DO FOR RETORNO dsCentroCustoTombamento XML:  " + retorno);

   		
			var db = javax.xml.parsers.DocumentBuilderFactory.newInstance().newDocumentBuilder();
			var is = new org.xml.sax.InputSource();
			is.setCharacterStream(new java.io.StringReader(retorno));
			var doc = db.parse(is);
			var nodes = doc.getElementsByTagName("Row");

			log.info (" ++ DATASET dsCentroCustoTombamento NODES:  " + nodes.getLength());
   		
			for (var i=0;i<nodes.getLength();i++) {
				var element = nodes.item(i);
				
	   			newDataset.addRow(new Array(
				   		   		  getValue(element, "CODCCUSTO"),
				   		   		  getValue(element, "DESCRICAO")
				   	   			  ));
			}		   
	   }
	} // try 
	catch(error) {
		log.info (" ++ DATASET dsCentroCustoTombamento - ERRO:  " + error.message);
		newDataset.addRow(new Array(error.message,"erro","erro")); 
	}
	 
	log.info (" ++ DATASET dsCentroCustoTombamento - FIM ++ " );
	
	return newDataset;
}


function getValue(e, field) {
	var name = e.getElementsByTagName(field);
	var line = name.item(0);
	var child = line.getFirstChild();
	log.info("++ DATASET dsCentroCustoTombamento CHILD:" + child.getNodeValue() + ":" + child.getTextContent());
	return child.getNodeValue();
}

