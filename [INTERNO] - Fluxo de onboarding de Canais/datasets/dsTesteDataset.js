function createDataset(fields, constraints, sortFields) {
	var con = null;
	var st = null;
		try {
		
		//	Tabelas
			var tabelaPai = "ml10097";
			var tabelaNotaFilha = "ml10097";
		
	
			var todayYear = (new java.util.GregorianCalendar()).get(java.util.GregorianCalendar.YEAR);
		
			var codigoDS = "java:/jdbc/FluigDS";
		
			
//			var query = "SELECT DISTINCT ";
//			query += "doc.COD_LISTA, ";
//			query += "meta.COD_LISTA_FILHO ";
//			query += "FROM documento doc ";
//			query += "LEFT OUTER JOIN meta_lista_rel meta "; 
//			query += "ON doc.cod_lista = meta.cod_lista_pai ";
//			query += "WHERE doc.cod_empresa=10097 ";
//			query += "AND doc.versao_ativa = 1 ";
//			query += "AND doc.NM_DATASET = 'dsCorrValoresPCOT' ";
//			query += "AND meta.COD_TABELA = 'notasReclassificacao'";
			
//			var query = "SELECT * FROM ML10097348 ";
			var query = "SELECT * FROM ML10097463 ";
			
			var query = "SELECT pcot.cdSolicitacao, ";	
			query += "pcot.nmUsuario, ";
			query += "'LOCALIZACAO' as localizacao, ";	
			query += "'RESPONSAVEL' as responsavel,	 ";
			query += "pcot.dtRegistro, ";
			query += "pcot.motivo, ";
			query += "CASE pcot.tpSolicitacao ";
			query += "WHEN 1  ";
			query += "THEN 'Transferência entre Centro de Custo ou Item Contábil' ";
			query += "WHEN 2 ";
			query += "THEN 'Transferência entre Contas Contábeis' ";
			query += "END ";
			query += "AS tipo_solicitacao, "; 
			query += "pcot.valorLancamento, ";
			query += "pcot.cContabilO, ";
			query += "pcot.descCContabilO, ";
			query += "pcot.segmentoO, ";
			query += "pcot.itemContabilO, ";
			query += "pcot.cCustoO, ";
			query += "pcot.descCCustoO, ";
			query += "pcot.cContabilD, ";
			query += "pcot.descCContabilD, ";
			query += "pcot.segmentoD, ";
			query += "pcot.itemContabilD, ";
			query += "pcot.cCustoD, ";
			query += "pcot.descCCustoD, ";
			query += "pcot.alteracaoDre, ";
			query += "pcot.donoCCustoO, ";
			query += "pcot.donoCCustoD, ";
			query += "pcot.bcRespAprovacao, ";
			query += "pcot.pcotCContabil, ";
			query += "pcot.gestorPcot, ";
			query += "pcot.donoPcot, ";
			query += "pcot.nomeAprovador, ";
			query += "pcot.idDataAprov, ";
			query += "CASE pcot.status ";
			query += "WHEN 1  ";
			query += "THEN 'Aprovado' ";
			query += "WHEN 2 ";
			query += "THEN 'Reprovado' ";
			query += "END ";
			query += "AS status, ";
			query += "pcot.observacoesAprovacao, ";
			query += "pcot.responsavelAjuste, ";
			query += "pcot.idDataAceiteAjuste, ";
			query += "CASE pcot.ajuste ";
			query += "WHEN 1  ";
			query += "THEN 'Aceito' ";
			query += "WHEN 2 ";
			query += "THEN 'Recusado' ";
			query += "END ";
			query += "AS ajuste, ";
			query += "pcot.observacoesAjuste, ";
			query += "filhoNota.dataEmissao, ";
			query += "filhoNota.empresa, ";
			query += "filhoNota.serie, ";
			query += "filhoNota.nf, ";
			query += "filhoNota.valor ";
			query += "FROM  ";
			query += "ML10097463 pcot left outer join ML10097464 filhoNota ";
			query += "ON filhoNota.masterid = pcot.ID ";
			query += "WHERE pcot.version = (select max(version) from ML10097463 where documentid = pcot.documentid group by documentid) ";

			var dataset = DatasetBuilder.newDataset();
			var ic = new javax.naming.InitialContext();
			var ds = ic.lookup(codigoDS);

			con = ds.getConnection();
			st = con.createStatement();
			var rs = st.executeQuery(query);
			var column = 0;
			dataset.addColumn("COD_LISTA");  column++;
			dataset.addColumn("COD_LISTA_FILHO");  column++;
			dataset.addColumn("COD_LISTA");  column++;
			dataset.addColumn("COD_LISTA_FILHO");  column++;
			dataset.addColumn("COD_LISTA");  column++;
			dataset.addColumn("COD_LISTA_FILHO");  column++;
			dataset.addColumn("COD_LISTA");  column++;
			dataset.addColumn("COD_LISTA_FILHO");  column++;
			dataset.addColumn("COD_LISTA");  column++;
			dataset.addColumn("COD_LISTA_FILHO");  column++;
			dataset.addColumn("COD_LISTA");  column++;
			dataset.addColumn("COD_LISTA_FILHO");  column++;
			dataset.addColumn("COD_LISTA");  column++;
			dataset.addColumn("COD_LISTA_FILHO");  column++;
			dataset.addColumn("COD_LISTA");  column++;
			dataset.addColumn("COD_LISTA_FILHO");  column++;
			dataset.addColumn("COD_LISTA");  column++;
			dataset.addColumn("COD_LISTA_FILHO");  column++;
			dataset.addColumn("COD_LISTA");  column++;
			dataset.addColumn("COD_LISTA_FILHO");  column++;
			
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
