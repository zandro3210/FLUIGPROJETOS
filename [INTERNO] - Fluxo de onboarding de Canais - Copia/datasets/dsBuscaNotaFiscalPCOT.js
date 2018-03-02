function createDataset(fields, constraints, sortFields) {
	var con = null;
	var st = null;
		try {
		// pega os ids cod lista e cod lista filho	
			var arrayCodigosLista = retornaArrayCodListaFilho();
			
		//	Tabelas
			var tabelaPai = "ml10097" + arrayCodigosLista[0];
			var tabelaNotaFilha = "ml10097"+ + arrayCodigosLista[1];
		
		//	Tabelas no Prefluig
		//	var tabelaMeta = "pre_producao_fluig.ml10097219";
		//	var tabelaParticipante = "pre_producao_fluig.ml10097220";
			
		//	Tabelas no Fluig
		//	var tabelaDgaCel = "fluigdb.ml10097423";

//			var empresa = "TOTVS";
//			var serie = "1";
//			var nf = "123";
//			var valor = "100,00";
	
			if(constraints == null || constraints.length == 0){
				var datasetError = DatasetBuilder.newDataset();
				datasetError.addColumn("ErrorMessage");
				datasetError.addRow(new Array("Informe os dados da nota fiscal (Empresa/Serie/Numero/Valor)"));

				return datasetError;
			} else if (constraints[0].initialValue == null) {
				var datasetError = DatasetBuilder.newDataset();
				datasetError.addColumn("ErrorMessage");
				datasetError.addRow(new Array("Informe a Empresa da Nota Fiscal"));

				return datasetError;
			} else if (constraints[1].initialValue == null) {
				var datasetError = DatasetBuilder.newDataset();
				datasetError.addColumn("ErrorMessage");
				datasetError.addRow(new Array("Informe a Serie da nota fiscal"));

				return datasetError;
			} else if (constraints[2].initialValue == null) {
				var datasetError = DatasetBuilder.newDataset();
				datasetError.addColumn("ErrorMessage");
				datasetError.addRow(new Array("Informe o numero da nota fiscal"));

				return datasetError;
			} else if (constraints[3].initialValue == null) {
				var datasetError = DatasetBuilder.newDataset();
				datasetError.addColumn("ErrorMessage");
				datasetError.addRow(new Array("Informe o valor da nota fiscal"));

				return datasetError;
			} else {
				empresa = constraints[0].initialValue;
				serie = constraints[1].initialValue;
				nf = constraints[2].initialValue;
				valor = constraints[3].initialValue;
			}
			var todayYear = (new java.util.GregorianCalendar()).get(java.util.GregorianCalendar.YEAR);
		
			var codigoDS = "java:/jdbc/FluigDS";
		
			var query = "SELECT nota.ID, ";
			query += "nota.companyid, ";
			query += "nota.cardid, ";
			query += "nota.documentid, ";
			query += "MAX(nota.version), ";
			query += "nota.tableid, ";
			query += "nota.empresa, ";
			query += "nota.serie, ";
			query += "nota.nf, ";
			query += "nota.valor, ";
			query += "master.nmUsuario, ";
			query += "master.dtRegistro ";
			query += "FROM " + tabelaNotaFilha +" nota ";
			//tabela pai
			query += "INNER JOIN " + tabelaPai +" master ";
			query += "	ON nota.masterid = master.ID ";
			//
			query += "WHERE nota.companyid = 10097 " ;
			query += "AND (nota.empresa = '"+ empresa +"' ";
			query += "AND nota.serie = '"+ serie +"' ";
			query += "AND nota.nf = '"+ nf +"' ";
			query += "AND nota.valor = '"+ valor +"') ";
			query += "GROUP BY nota.empresa, nota.documentid ";
			query += "ORDER BY nota.masterid, nota.id ";

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
			dataset.addColumn("empresa");  column++;
			dataset.addColumn("serie");  column++;
			dataset.addColumn("nf");  column++;
			dataset.addColumn("valor");  column++;
			dataset.addColumn("nmUsuario");  column++;
			dataset.addColumn("dtRegistro");  column++;

			while(rs.next()) {
				var row = new Array();
				for(var i = 0; i < column; i++)
					row.push(rs.getString(i + 1));
				dataset.addRow(row);
			}
		} catch(e) {
			var datasetError = DatasetBuilder.newDataset();
			datasetError.addColumn("ErrorMessage");
			datasetError.addRow(new Array("Erro Dataset: "+e.message));
			
			return datasetError;
		}
		
		if (st != null) st.close();
		if (con != null) con.close();
		
		return dataset;
}

function retornaArrayCodListaFilho(){
	var row = new Array();
	try{
		var codigoDS = "java:/jdbc/FluigDS";
	
		var query = "SELECT DISTINCT ";
		query += "doc.COD_LISTA, ";
		query += "meta.COD_LISTA_FILHO ";
		query += "FROM documento doc ";
		query += "LEFT OUTER JOIN meta_lista_rel meta "; 
		query += "ON doc.cod_lista = meta.cod_lista_pai ";
		query += "WHERE doc.cod_empresa=10097 ";
		query += "AND doc.versao_ativa = 1 ";
		query += "AND doc.NM_DATASET = 'dsCorrValoresPCOT' ";
		query += "AND meta.COD_TABELA = 'notasReclassificacao'";
		
		var ic = new javax.naming.InitialContext();
		var ds = ic.lookup(codigoDS);

		con = ds.getConnection();
		st = con.createStatement();
		var rs = st.executeQuery(query);
		
		if(rs.next()) {
				row.push(rs.getString(1)); //cod_lista
				row.push(rs.getString(2)) //cod_lista_filho
		}
	} catch(e) {
		log.info("Erro Dataset: "+e.message);
	}
	
	if (this.st != null) st.close();
	if (this.con != null) con.close();
	
	return row;
}