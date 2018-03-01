function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetFactory.getDataset("pass_validate_rm", null, null, null);
	var json = dataset.getValue(0, "USER");
	var obj = JSON.parse(json);

	var USER = obj.user;
	var PASSWORD = obj.pass;
	var CONSULTA = "INTEGR_ECM.05";
	var APLICACAO = "V";
	var COLIGADA = "0";
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("VP");
	newDataset.addColumn("CODFUNCAO_VP");
	newDataset.addColumn("FUNCAO_VP");
	newDataset.addColumn("CODCARGO_VP");
	newDataset.addColumn("CARGO_VP");
	newDataset.addColumn("CPF_VP");
	newDataset.addColumn("EMAIL_VP");
	newDataset.addColumn("DIRETOR_EXECUTIVO");
	newDataset.addColumn("CODFUNCAO_DIR_EXEC");
	newDataset.addColumn("FUNCAO_DIR_EXEC");
	newDataset.addColumn("CODCARGO_DIR_EXEC");
	newDataset.addColumn("CARGO_DIR_EXEC");
	newDataset.addColumn("CPF_DIR_EXEC");
	newDataset.addColumn("EMAIL_DIR_EXEC");
	newDataset.addColumn("DIRETOR");
	newDataset.addColumn("CODFUNCAO_DIRETOR");
	newDataset.addColumn("FUNCAO_DIR");
	newDataset.addColumn("CODCARGO_DIRETOR");
	newDataset.addColumn("CARGO_DIRETOR");
	newDataset.addColumn("CPF_DIR");
	newDataset.addColumn("EMAIL_DIR");
	newDataset.addColumn("GESTOR_EXECUTIVO");
	newDataset.addColumn("CODFUNCAO_GEST_EXEC");
	newDataset.addColumn("FUNCAO_GEST_EXEC");
	newDataset.addColumn("CODCARGO_GEST_EXEC");
	newDataset.addColumn("CARGO_GEST_EXEC");
	newDataset.addColumn("CPF_GEST_EXEC");
	newDataset.addColumn("EMAIL_GEST_EXEC");
	newDataset.addColumn("GESTOR");
	newDataset.addColumn("CODFUNCAO_GEST");
	newDataset.addColumn("FUNCAO_GEST");
	newDataset.addColumn("CODCARGO_GEST");
	newDataset.addColumn("CARGO_GEST");
	newDataset.addColumn("CPF_GEST");
	newDataset.addColumn("EMAIL_GEST");
	newDataset.addColumn("COLIGADA_CHEFE");
	newDataset.addColumn("COORDENADOR");
	newDataset.addColumn("CODFUNCAO_COORD");
	newDataset.addColumn("FUNCAO_COORD");
	newDataset.addColumn("CODCARGO_COORD");
	newDataset.addColumn("CARGO_COORD");
	newDataset.addColumn("CPF_COORD");
	newDataset.addColumn("EMAIL_COORD");
	newDataset.addColumn("CHAPA_COORD");
	newDataset.addColumn("CODCOLIGADA");
	newDataset.addColumn("NOME_COLIGADA");
	newDataset.addColumn("CODFILIAL");
	newDataset.addColumn("NOME_FILIAL");
	newDataset.addColumn("CHAPA");
	newDataset.addColumn("NOME");
	newDataset.addColumn("COD_FUNCAO");
	newDataset.addColumn("NOME_FUNCAO");
	newDataset.addColumn("COD_SECAO");
	newDataset.addColumn("NOME_SECAO");
	newDataset.addColumn("CODCCUSTO");
	newDataset.addColumn("NOME_CCUSTO");
	newDataset.addColumn("ITEM");
	newDataset.addColumn("DESCRICAO_ITEM");
	newDataset.addColumn("CLASSE");
	newDataset.addColumn("DESCRICAO_CLASSE");
	newDataset.addColumn("EMAIL");
	newDataset.addColumn("CPF");
	newDataset.addColumn("DATAADMISSAO");
	newDataset.addColumn("TIPO_FUNCIONARIO");
	newDataset.addColumn("MEMBROCIPA");
	newDataset.addColumn("SALARIO");
	
	var corpore = ServiceManager.getService('CorporeGlbSSL');
	var locator = corpore.instantiate('br.com.totvs.br.WsGlbSSL');
	var service = locator.getWsGlbSSLSoap();
	
	var tag = "EMAIL_PARTICIPANTE";
	//var valor = "tiago.mafra@totvs.com.br";
	var valor = "cristina.poffo@totvs.com.br";
	if (constraints != null) {
		for(var c in constraints){
			log.info("const:" + constraints[c].getFieldName());
			if (constraints[c].getFieldName() == "tag"){
				tag = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "valor"){
				valor = constraints[c].getInitialValue(); 
			}
		}
	}
	
	log.info("INTEGR_ECM.05:" + tag + ":" + valor);
	var parametros = "<PARAM><" + tag + ">" + valor + "</" + tag + "></PARAM>";
	
	try {
		log.info("### ds_integr_ecm_05_corpore PARAM:" + parametros);
		var result = service.getResultSQL(USER, PASSWORD, COLIGADA, APLICACAO, CONSULTA, parametros, false);
		
		log.info("### ds_integr_ecm_05_corpore AFTER getResultSQL");
		
		var db = javax.xml.parsers.DocumentBuilderFactory.newInstance().newDocumentBuilder();
		var is = new org.xml.sax.InputSource();
		is.setCharacterStream(new java.io.StringReader(result));
		var doc = db.parse(is);
		var nodes = doc.getElementsByTagName("Row");
		
		for (var i=0;i<nodes.getLength();i++) {
			var element = nodes.item(i);
			
   			newDataset.addRow(new Array(
   					getValue(element, "VP"),
   					getValue(element, "CODFUNCAO_VP"),
   					getValue(element, "FUNCAO_VP"),
   					getValue(element, "CODCARGO_VP"),
   					getValue(element, "CARGO_VP"),
   					getValue(element, "CPF_VP"),
   					getValue(element, "EMAIL_VP"),
   					getValue(element, "DIRETOR_x0020_EXECUTIVO"),
   					getValue(element, "CODFUNCAO_DIR_EXEC"),
   					getValue(element, "FUNCAO_DIR_EXEC"),
   					getValue(element, "CODCARGO_DIR_EXEC"),
   					getValue(element, "CARGO_DIR_EXEC"),
   					getValue(element, "CPF_DIR_EXEC"),
   					getValue(element, "EMAIL_DIR_EXEC"),
   					getValue(element, "DIRETOR"),
   					getValue(element, "CODFUNCAO_DIRETOR"),
   					getValue(element, "FUNCAO_DIR"),
   					getValue(element, "CODCARGO_DIRETOR"),
   					getValue(element, "CARGO_DIRETOR"),
   					getValue(element, "CPF_DIR"),
   					getValue(element, "EMAIL_DIR"),
   					getValue(element, "GESTOR_x0020_EXECUTIVO"),
   					getValue(element, "CODFUNCAO_GEST_EXEC"),
   					getValue(element, "FUNCAO_GEST_EXEC"),
   					getValue(element, "CODCARGO_GEST_EXEC"),
   					getValue(element, "CARGO_GEST_EXEC"),
   					getValue(element, "CPF_GEST_EXEC"),
   					getValue(element, "EMAIL_GEST_EXEC"),
   					getValue(element, "GESTOR"),
   					getValue(element, "CODFUNCAO_GEST"),
   					getValue(element, "FUNCAO_GEST"),
   					getValue(element, "CODCARGO_GEST"),
   					getValue(element, "CARGO_GEST"),
   					getValue(element, "CPF_GEST"),
   					getValue(element, "EMAIL_GEST"),
   					getValue(element, "COLIGADA_CHEFE"),
   					getValue(element, "COORDENADOR"),
   					getValue(element, "CODFUNCAO_COORD"),
   					getValue(element, "FUNCAO_COORD"),
   					getValue(element, "CODCARGO_COORD"),
   					getValue(element, "CARGO_COORD"),
   					getValue(element, "CPF_COORD"),
   					getValue(element, "EMAIL_COORD"),
   					getValue(element, "CHAPA_COORD"),
   					getValue(element, "CODCOLIGADA"),
   					getValue(element, "NOME_COLIGADA"),
   					getValue(element, "CODFILIAL"),
   					getValue(element, "NOME_FILIAL"),
   					getValue(element, "CHAPA"),
   					getValue(element, "NOME"),
   					getValue(element, "COD_FUNCAO"),
   					getValue(element, "NOME_FUNCAO"),
   					getValue(element, "COD_SECAO"),
   					getValue(element, "NOME_SECAO"),
   					getValue(element, "CODCCUSTO"),
   					getValue(element, "NOME_CCUSTO"),
   					getValue(element, "ITEM"),
   					getValue(element, "DESCRICAO_ITEM"),
   					getValue(element, "CLASSE"),
   					getValue(element, "DESCRICAO_CLASSE"),
   					getValue(element, "EMAIL"),
   					getValue(element, "CPF"),
   					getValue(element, "DATAADMISSAO"),
   					getValue(element, "TIPO_FUNCIONARIO"),
   					getValue(element, "MEMBROCIPA"),
   					"0"
   	   			));
			
		}
	} 
	catch(error) {
		log.info("### ds_integr_ecm_05_corpore ERROR: " + error.message);
		newDataset.addRow(new Array(error.message, "erro")); 
	}
	
	return newDataset;
	
}

function getValue(e, field) {
	log.info("FIELD:" + field);
	var name = e.getElementsByTagName(field);
	var line = name.item(0);
	var child = line.getFirstChild();
	log.info("CHILD:" + child.getNodeValue() + ":" + child.getTextContent());
	return child.getNodeValue();
}