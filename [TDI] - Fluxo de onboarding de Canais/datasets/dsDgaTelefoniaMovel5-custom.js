function createDataset(fields, constraints, sortFields) {
	var con = null;
	var st = null;

	try {
	//	Tabelas no Desenv
	//	var tabelaDgaCel = "fluig13x.ml10097378";
	
	//	Tabelas no Prefluig
	//	var tabelaMeta = "pre_producao_fluig.ml10097219";
	//	var tabelaParticipante = "pre_producao_fluig.ml10097220";
		
	//	Tabelas no Fluig
		var tabelaDgaCel = "fluigdb.ml10097423";

		var emailLogado = "";

		if(constraints == null || constraints.length == 0 || constraints[0].initialValue == null){
			var datasetError = DatasetBuilder.newDataset();
			datasetError.addColumn("ErrorMessage");
			datasetError.addRow(new Array("Informe o email do usuario"));

			return datasetError;
		} else {
			emailLogado = constraints[0].initialValue;
		}

		var todayYear = (new java.util.GregorianCalendar()).get(java.util.GregorianCalendar.YEAR);
	
		var codigoDS = "java:/jdbc/FluigDSRO";
	
		var query = "SELECT dgacel.ID, ";
		query += "dgacel.companyid, ";
		query += "dgacel.cardid, ";
		query += "dgacel.documentid, ";
		query += "MAX(dgacel.version), ";
		query += "dgacel.tableid, ";
		query += "dgacel.anoMes, ";
		query += "dgacel.valor, ";
		query += "dgacel.centroCusto, ";
		query += "dgacel.linha, ";
		query += "dgacel.nome, ";
		query += "dgacel.email, ";
		query += "dgacel.gestor, ";
		query += "dgacel.gestorExecutivo, ";
		query += "dgacel.diretor, ";
		query += "dgacel.vp ";
		query += "FROM " + tabelaDgaCel +" dgacel ";
		query += "WHERE dgacel.companyid = 10097 " ;
		query += "AND STR_TO_DATE(CONCAT(dgacel.anoMes,'01'),'%Y%m%d') BETWEEN '"+ todayYear +"-01-01' and '"+ todayYear +"-12-31' ";
		query += "AND (dgacel.gestor = '"+ emailLogado +"' ";
		query += "OR dgacel.gestorExecutivo = '"+ emailLogado +"' ";
		query += "OR dgacel.diretor = '"+ emailLogado +"' ";
		query += "OR dgacel.vp = '"+ emailLogado +"') ";
		query += "GROUP BY dgacel.anoMes, dgacel.documentid ";
		query += "ORDER BY dgacel.nome, dgacel.centroCusto ";

		var dataset = DatasetBuilder.newDataset();
		var ic = new javax.naming.InitialContext();
		var ds = ic.lookup(codigoDS);

		con = ds.getConnection();
		st = con.createStatement();
		var rs = st.executeQuery(query);
		var column = 0;
		dataset.addColumn("ID");  column++;
		dataset.addColumn("companyid");  column++;
		dataset.addColumn("cardid");  column++;
		dataset.addColumn("documentid");  column++;
		dataset.addColumn("version");  column++;
		dataset.addColumn("tableid");  column++;
		dataset.addColumn("anoMes");  column++;
		dataset.addColumn("valor");  column++;
		dataset.addColumn("centroCusto");  column++;
		dataset.addColumn("linha");  column++;
		dataset.addColumn("nome");  column++;
		dataset.addColumn("email");  column++;
		dataset.addColumn("gestor");  column++;
		dataset.addColumn("gestorExecutivo");  column++;
		dataset.addColumn("diretor"); column++;
		dataset.addColumn("vp"); column++;

		while(rs.next()) {
			var row = new Array();
			for(var i = 0; i < column; i++)
				row.push(rs.getString(i + 1));
			dataset.addRow(row);
		}
	} catch(e) {
		log.info("Erro Dataset: "+e.message);
	}

	if (st != null) st.close();
	if (con != null) con.close();

	return dataset;
}
