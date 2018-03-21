function createDataset(fields, constraints, sortFields) {
	
	log.info (" ++ DATASET DSHIERARQUIA - INICIO ++ " );
	
	try {

		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
	    
		/*coluna 0*/ newDataset.addColumn("EMAIL_PARTICIPANTE");
		//coluna 1
		newDataset.addColumn("CHAPA_PARTICIPANTE");
		//coluna 2 
		newDataset.addColumn("PARTICIPANTE"); // nome do participante
		//coluna 3 
		newDataset.addColumn("CPF_PARTICIPANTE");
		//coluna 4 
		newDataset.addColumn("CODCCUSTO");
		//coluna 5 
		newDataset.addColumn("NOME_CCUSTO");
		//coluna 6 
		newDataset.addColumn("ITEM_CONTABIL");
		//coluna 7 
		newDataset.addColumn("CLASSE_VALOR");
		//coluna 8 
		newDataset.addColumn("CODFUNCAO_PARTICIPANTE"); 
		//coluna 9 
		newDataset.addColumn("FUNCAO_PARTICIPANTE");
		
		//coluna 10 
		//newDataset.addColumn("CODCARGO_PARTICIPANTE"); 
		
		//coluna 11 
		//newDataset.addColumn("CARGO_PARTICIPANTE"); 
		
		//coluna 12 newDataset.addColumn("SEXO_PARTICIPANTE"); 
		//coluna 13 newDataset.addColumn("DATA_ADMISSAO");
		
		//coluna 14 newDataset.addColumn("MES_ADMISSAO"); 
		//coluna 15 newDataset.addColumn("ANO_ADMISSAO"); 
		//coluna 16 newDataset.addColumn("DATA_NASCIMENTO"); 
		//coluna 17 newDataset.addColumn("FILIAL_PARTICIPANTE");
		//coluna 18 newDataset.addColumn("COLIGADA_PARTICIPANTE"); 
		
		//coluna 19 newDataset.addColumn("COD_SECAO_PARTICIPANTE"); 
		//coluna 20 newDataset.addColumn("SECAO_PARTICIPANTE");
				
		//coluna 21 newDataset.addColumn("COORDENADOR"); 
		//coluna 22 newDataset.addColumn("CODFUNCAO_COORD");
		//coluna 23 newDataset.addColumn("FUNCAO_COORD");  
		//coluna 24 newDataset.addColumn("CODCARGO_COORD");  
		//coluna 25 newDataset.addColumn("CARGO_COORD");  
		//coluna 26 newDataset.addColumn("CPF_COORD"); 
		//coluna 27 newDataset.addColumn("EMAIL_COORD");
		
		//coluna 28 newDataset.addColumn("GESTOR"); 
		//coluna 29 newDataset.addColumn("CODFUNCAO_GEST");
		//coluna 30 newDataset.addColumn("FUNCAO_GEST");
		//coluna 31 newDataset.addColumn("CODCARGO_GEST");  
		//coluna 32 newDataset.addColumn("CARGO_GEST");
		//coluna 33 newDataset.addColumn("CPF_GEST");
		//coluna 34 newDataset.addColumn("EMAIL_GEST");  

		//coluna 35 newDataset.addColumn("GESTOR EXECUTIVO");
		//coluna 36 newDataset.addColumn("CODFUNCAO_GEST_EXEC");
		//coluna 37 newDataset.addColumn("FUNCAO_GEST_EXEC");
		//coluna 38 newDataset.addColumn("CODCARGO_GEST_EXEC");
		//coluna 39 newDataset.addColumn("CARGO_GEST_EXEC");
		//coluna 40 newDataset.addColumn("CPF_GEST_EXEC");
		//coluna 41 newDataset.addColumn("EMAIL_GEST_EXEC");
		
		//coluna 42 newDataset.addColumn("DIRETOR");
		//coluna 43 newDataset.addColumn("CODFUNCAO_DIRETOR");
		//coluna 44 newDataset.addColumn("FUNCAO_DIR");
		//coluna 45 newDataset.addColumn("CODCARGO_DIRETOR");
		//coluna 46 newDataset.addColumn("CARGO_DIRETOR");
		//coluna 47 newDataset.addColumn("CPF_DIR");
		//coluna 48 newDataset.addColumn("EMAIL_DIR");
		
		//coluna 49 newDataset.addColumn("DIRETOR EXECUTIVO");
		//coluna 50 newDataset.addColumn("CODFUNCAO_DIR_EXEC");
		//coluna 51 newDataset.addColumn("FUNCAO_DIR_EXEC");
		//coluna 52 newDataset.addColumn("CODCARGO_DIR_EXEC");
		//coluna 53 newDataset.addColumn("CARGO_DIR_EXEC");
		//coluna 54 newDataset.addColumn("CPF_DIR_EXEC");
		//coluna 55 newDataset.addColumn("EMAIL_DIR_EXEC");
		
		//coluna 56 newDataset.addColumn("VP");
		//coluna 57 newDataset.addColumn("CODFUNCAO_VP");
		//coluna 58 newDataset.addColumn("FUNCAO_VP");
		//coluna 59 newDataset.addColumn("CODCARGO_VP");
		//coluna 60 newDataset.addColumn("CARGO_VP");
		//coluna 61 newDataset.addColumn("CPF_VP");
		//coluna 62 newDataset.addColumn("EMAIL_VP");
		
		
	    var email = "";
	
	    // para testar comente este if e descomente um dos emails abaixo
	 
	    
	    if (constraints != null) {
			email = constraints[0].getInitialValue(); 
		}
	    
	    //teste
		//email = "cristina.poffo@totvs.com.br";
	    //email = "mara.abrantes@totvs.com.br";
	    //email = "taisa.silva@totvs.com.br";
	    //email = "sandra.silva@totvs.com.br";
	    
	    log.info ("++ DATASET DSHIERARQUIA - e-mail:" + email);
 
	    if (email != ""){
	
			var dataset = DatasetFactory.getDataset("pass_validate_rm", null, null, null);
			var json = dataset.getValue(0, "USER");
			var obj = JSON.parse(json);
	
	    	// Invoca o servicos
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
				
	   			newDataset.addRow(new Array(
	   					getValue(element, "EMAIL_PARTICIPANTE"),
	   					getValue(element, "CHAPA_PARTICIPANTE"),
	   					getValue(element, "PARTICIPANTE"),
	   					getValue(element, "CPF_PARTICIPANTE"),
	   					getValue(element, "CODCCUSTO"),
	   					getValue(element, "NOME_CCUSTO"),
	   					getValue(element, "ITEM_CONTABIL"),
	   					getValue(element, "CLASSE_VALOR"),
	   					
	   					getValue(element, "CODFUNCAO_PARTICIPANTE")
	   					,
	   					getValue(element, "FUNCAO_PARTICIPANTE")
	   					/*,
	   					getValue(element, "CODCARGO_PARTICIPANTE")
	   					,
	   					getValue(element, "CARGO_PARTICIPANTE")
	   					,
	   					getValue(element, "SEXO_PARTICIPANTE"),
	   					getValue(element, "DATA_ADMISSAO"),
	   					getValue(element, "MES_ADMISSAO"),
	   					getValue(element, "ANO_ADMISSAO"),
	   					getValue(element, "DATA_NASCIMENTO"),
	   					getValue(element, "FILIAL_PARTICIPANTE"),
	   					getValue(element, "COLIGADA_PARTICIPANTE"),
	   					getValue(element, "COD_SECAO_PARTICIPANTE"),
	   					getValue(element, "SECAO_PARTICIPANTE"),
	   					getValue(element, "COORDENADOR"),
	   					getValue(element, "CODFUNCAO_COORD"),
	   					getValue(element, "FUNCAO_COORD"),
	   					getValue(element, "CODCARGO_COORD"),
	   					getValue(element, "CARGO_COORD"),
	   					getValue(element, "CPF_COORD"),
	   					getValue(element, "EMAIL_COORD"),
	   					getValue(element, "GESTOR"),
	   					getValue(element, "CODFUNCAO_GEST"),
	   					getValue(element, "FUNCAO_GEST"),
	   					getValue(element, "CODCARGO_GEST"),
	   					getValue(element, "CARGO_GEST"),
	   					getValue(element, "CPF_GEST"),
	   					getValue(element, "EMAIL_GEST"),
	   					getValue(element, "GESTOR_EXECUTIVO"),
	   					getValue(element, "CODFUNCAO_GEST_EXEC"),
	   					getValue(element, "FUNCAO_GEST_EXEC"),
	   					getValue(element, "CODCARGO_GEST_EXEC"),
	   					getValue(element, "CARGO_GEST_EXEC"),
	   					getValue(element, "CPF_GEST_EXEC"),
	   					getValue(element, "EMAIL_GEST_EXEC"),
	   					getValue(element, "DIRETOR"),
	   					getValue(element, "CODFUNCAO_DIRETOR"),
	   					getValue(element, "FUNCAO_DIR"),
	   					getValue(element, "CODCARGO_DIRETOR"),
	   					getValue(element, "CARGO_DIRETOR"),
	   					getValue(element, "CPF_DIR"),
	   					getValue(element, "EMAIL_DIR"),
	   					getValue(element, "DIRETOR_EXECUTIVO"),
	   					getValue(element, "CODFUNCAO_DIR_EXEC"),
	   					getValue(element, "FUNCAO_DIR_EXEC"),
	   					getValue(element, "CODCARGO_DIR_EXEC"),
	   					getValue(element, "CARGO_DIR_EXEC"),
	   					getValue(element, "CPF_DIR_EXEC"),
	   					getValue(element, "EMAIL_DIR_EXEC"),
	   					getValue(element, "VP"),
	   					getValue(element, "CODFUNCAO_VP"),
	   					getValue(element, "FUNCAO_VP"),
	   					getValue(element, "CODCARGO_VP"),
	   					getValue(element, "CARGO_VP"),
	   					getValue(element, "CPF_VP"),
	   					getValue(element, "EMAIL_VP")
	   					*/
	   	   			));
			}
	        		
			log.info (" ++ DEPOIS DO FOR RETORNO XML:  " + retorno);
				
						
	    } // IF EMAIL
	} // try 
	catch(error) {
		log.info (" ++ DATASET DSHIERARQUIA - ERRO:  " + error.message);
		newDataset.addRow(new Array(error.message
									, "erro", "erro", "erro","erro","erro","erro","erro","erro","erro"
									//,"erro"
									//,"erro"
									/*, "erro", "erro","erro","erro","erro","erro","erro","erro","erro",
									"erro", "erro", "erro","erro","erro","erro","erro","erro","erro","erro",
									"erro", "erro", "erro","erro","erro","erro","erro","erro","erro","erro",
									"erro", "erro", "erro","erro","erro","erro","erro","erro","erro","erro",
									"erro", "erro", "erro","erro","erro","erro","erro","erro","erro","erro",
									"erro", "erro"*/
									)); 
	}
	 
	log.info (" ++ DATASET DSHIERARQUIA - FIM ++ " );
	return newDataset;
}


function getValue(e, field) {
	var name = e.getElementsByTagName(field);
	var line = name.item(0);
	var child = line.getFirstChild();
	log.info("CHILD:" + child.getNodeValue() + ":" + child.getTextContent());
	return child.getNodeValue();
}

	