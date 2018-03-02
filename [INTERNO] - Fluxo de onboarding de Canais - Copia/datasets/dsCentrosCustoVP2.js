function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();

	log.info("***Dataset dsCentrosCustoVP2");

	// DADOS DA CONTA
	newDataset.addColumn("vpnome");
	newDataset.addColumn("vpemail");
	newDataset.addColumn("codccusto");
	newDataset.addColumn("nomeccusto");

	try {

		var NOME_SERVICO = "WSRMSERVICE";
		var CAMINHO_SERVICO = "br.com.totvs.br.WsGlbSSL";
		var servico = ServiceManager.getService(NOME_SERVICO);
		log.info("SERVICO:" + servico);
		var instancia = servico.instantiate(CAMINHO_SERVICO);
		log.info("instancia:" + instancia);
		var ws = instancia.getWsGlbSSLSoap();

		log.info("***Dataset dsCentrosCustoVP - instanciou o servico: - constraints" + constraints);

		// var emailVP = "alexandre.mafra@totvs.com.br"
//		var c1 = DatasetFactory.createConstraint("emailVp",
//				 "dbianco@totvs.com.br", "dbianco@totvs.com.br",
//				 ConstraintType.MUST);
//		 var c2 = DatasetFactory.createConstraint("emailVp",
//		 "marceloc@totvs.com.br", "marceloc@totvs.com.br",
//		 ConstraintType.MUST);
//		
//		 constraints = new Array(c1);
//		 constraints = new Array(c1, c2);

		var listavp = "";
		var listacc = [];
		if (constraints != null) {
			for (var x = 0; x < constraints.length; x++) {
				var emailVP = constraints[x].getInitialValue();
				if (emailVP.indexOf("@") != -1) {
					listavp += (listavp == "") ? "'" + constraints[x].getInitialValue() + "'" : ",'" + constraints[x].getInitialValue() + "'"; 
		
					var dataset = DatasetFactory.getDataset("pass_validate_rm", null, null, null);
					var json = dataset.getValue(0, "USER");
					var obj = JSON.parse(json);
					
					var codUsuario = obj.user;
					var senha = obj.pass;
					
					var codColigada = 0;
					var codAplicacao = "V";
					var codSentenca = "INTEGR_FLG.12";
					var xmlParamsValue = "<PARAM><VPMAIL>" + emailVP + "</VPMAIL></PARAM>";

					try {

						log.info("***Dataset dsCentrosCustoVP - chamando RM");
						var retorno = ws.getResultSQL(codUsuario, senha, codColigada, codAplicacao, codSentenca, xmlParamsValue, false);
						log.info("***Dataset dsCentrosCustoVP - chamando RM FIM");
	/*					var db = javax.xml.parsers.DocumentBuilderFactory.newInstance().newDocumentBuilder();
						var is = new org.xml.sax.InputSource();
						log.info("***Dataset dsCentrosCustoVP - PARSER");
						is.setCharacterStream(new java.io.StringReader(retorno));
						var doc = db.parse(is);
						var nodes = doc.getElementsByTagName("Row");
						log.info("***Dataset dsCentrosCustoVP - PARSER FIM");
					
						for (var i=0;i<nodes.getLength();i++) {
							var element = nodes.item(i);
							var cc = getValue(element, "");
						//	listacc.push(listacc); 
							newDataset.addRow(new Array(getValue(element, "VP"), getValue(element, "EMAILVP"), cc, getValue(element, "NOMECENTROCUSTO")));
						}*/
						
						var rows = retorno.split("<Row>");
						for (var i=1;i<rows.length; i++) {
							var row = rows[i];
							var cc = getValue2(row, "CODCCUSTO");
							listacc += (listacc == "") ? "'" + cc + "'" : ",'" + cc + "'";
							newDataset.addRow(new Array(getValue2(row, "VP"), getValue2(row, "EMAILVP"), cc, getValue2(row, "NOMECENTROCUSTO")));
						}
					
						log.info("***Dataset dsCentrosCustoVP - nodes FIM");
					} catch (e) {
						newDataset.addRow(new Array("erro Dataset dsCentrosCustoVP: "
								+ codSentenca + " " + xmlParamsValue
								+ e.message, "VP do RM",emailVP, ""));
					}
					
					log.info("***Dataset dsCentrosCustoVP - FIM FORs");
				}
			}
			
			var sql = "select codCCusto, descCCusto, nomeVP, emailVP from ml10097959 ml, documento d" +
					" where ml.emailVP in (" + listavp + ")" +
					"   and ml.codCCusto not in (" + listacc + ")" +
					"   and d.cod_empresa = ml.companyid " +
					"   and d.NR_DOCUMENTO = ml.documentid " + 
					"   and d.NR_VERSAO = ml.version" +
					"   and d.VERSAO_ATIVA = 1";
			
			var dataSource = "java:/jdbc/FluigDSRO";
		    var ic = new javax.naming.InitialContext();
		    var ds = ic.lookup(dataSource);
		    
	        try {
		    	var conn = ds.getConnection();
		    	var stmt = conn.createStatement();

		    	log.info("DS_SQL==============> " + sql);
		    	var rs = stmt.executeQuery(sql);
		    	while (rs.next()) {
		    		log.info("getCardId isLast");
		    	/*	var ok = true;
		    		for (var i=0;i<listacc.length;i++) {
		    			if (listacc[i] == rs.getString(1)) { 
		    				ok = false;
		    				break;
		    			}
		    		}
		    		if (ok) {*/
		    			newDataset.addRow(new Array(rs.getString(3), rs.getString(4), rs.getString(1), rs.getString(2)));
//		    		}
		    	}
		    } catch(e) {
		    	log.error("DS_SQL==============> " + e.message);
		    } finally {
		    	if (rs != null) rs.close();
		    	if (stmt != null) stmt.close();
		    	if (conn != null) conn.close();
		    }			
			
		} else {
			newDataset.addRow(new Array("Nenhum VP encontrado para o BC logado, verifique o cadastro VP X Business Controller", "", "", ""));
		}
	} catch (e) {
		newDataset.addRow(new Array("erro Dataset dsCentrosCustoVP: " + e.message, "", "", ""));
	}
	log.info("***Dataset dsCentrosCustoVP - FIM DATASET");
	return newDataset;
}

function getValue(e, field) {
	var name = e.getElementsByTagName(field);
	var line = name.item(0);
	var child = line.getFirstChild();
	log.info("CHILD:" + child.getNodeValue() + ":" + child.getTextContent());
	return child.getNodeValue();
}

function getValue2(r, field) {
	
	var tag = "<" + field + ">";
	var start = (r.indexOf(tag) + tag.length);
	var end = (r.indexOf("</" + field + ">"));
	return r.substring(start, end).trim();
	
}