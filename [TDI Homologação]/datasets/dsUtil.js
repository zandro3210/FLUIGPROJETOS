function createDataset(fields, constraints, sortFields) {
	//var minhaQuery = "SELECT * from meta_lista_rel where cod_lista_pai = 505";
	var minhaQuery = "SELECT * from documento where cod_empresa = 10097 and nr_documento = 2055165 and versao_ativa = 1 ";
	
	//var minhaQuery = "SELECT * from ml10097113 LIMIT 10 ";
	//var minhaQuery = "SELECT * from ml10097171 order by 1 desc";
	
	var minhaQuery = " SELECT ";
	/*
	minhaQuery += " fichario.cdSolicitacao, fichario.IDREQ, fichario.matriculaUsuario, fichario.nmUsuario, fichario.dtRegistro, fichario.cdCondicao, fichario.curso, fichario.cdOpcaoCurso, fichario.semestre, fichario.dtIniSem, fichario.dtTerSem, fichario.dtIniCur, fichario.dtTerCur, fichario.instituicao, fichario.totParCur, fichario.valMens, fichario.ReqJustificativa, fichario.comentarios,  ";
	minhaQuery += " fichario.nomeCoordenador, fichario.aprovacaoCoordenador, fichario.ReqAprovar, fichario.ReqParecer, ";
	minhaQuery += " fichario.nomeGestor, fichario.aprovacaoGestor, fichario.ReqAprovarGestor, fichario.ReqParecerGestor, ";
	minhaQuery += " fichario.nomeRh, fichario.aprovacaoRh, fichario.ReqAprovarRH, fichario.ReqParecerRh, fichario.excecaoRh, fichario.valorLimite, fichario.percentualDesconto ";
	*/
	minhaQuery  = " SELECT ";
	minhaQuery += " anexo_proces.NUM_PROCES as cdSolicitacao, fichario.IDREQ, fichario.matriculaUsuario, fichario.nmUsuario, fichario.dtRegistro, fichario.cdCondicao, fichario.curso, " +
	              " fichario.cdOpcaoCurso, fichario.semestre, fichario.dtIniSem, fichario.dtTerSem, fichario.dtIniCur, fichario.dtTerCur, fichario.instituicao, fichario.totParCur, fichario.valMens, fichario.ReqJustificativa, fichario.comentarios,  ";
	minhaQuery += " fichario.nomeCoordenador, fichario.aprovacaoCoordenador, fichario.ReqAprovar, fichario.ReqParecer, ";
	minhaQuery += " fichario.nomeGestor, fichario.aprovacaoGestor, fichario.ReqAprovarGestor, fichario.ReqParecerGestor, ";
	minhaQuery += " fichario.nomeRh, fichario.aprovacaoRh, fichario.ReqAprovarRH, fichario.ReqParecerRh, fichario.excecaoRh, fichario.valorLimite, fichario.percentualDesconto ";
	minhaQuery += "     from documento join ml10097171 as fichario on fichario.ID = documento.COD_REG_LISTA and fichario.documentid = documento.NR_DOCUMENTO ";
	minhaQuery += "                    join anexo_proces on anexo_proces.nr_documento = documento.NR_DOCUMENTO and anexo_proces.NUM_SEQ_ANEXO = 1 ";
	minhaQuery += "                    join histor_proces on histor_proces.NUM_PROCES = anexo_proces.NUM_PROCES and histor_proces.LOG_ATIV = 1 ";
	minhaQuery += "    where documento.cod_empresa = 10097 ";
	minhaQuery += "      and documento.versao_ativa = 1 ";
	minhaQuery += "      and str_to_date(fichario.dtRegistro, '%d/%m/%Y') between str_to_date('2015-07-01', '%Y-%m-%d') and str_to_date('2015-07-15', '%Y-%m-%d')";
	minhaQuery += "   order by 1 ";

	//var minhaQuery = "SELECT * from ml10097171 ";
	
	/*
	var minhaQuery = "SELECT fichario.cdSolicitacao, str_to_date(fichario.dtRegistro, '%d/%m/%Y') from documento join ml10097171 as fichario on fichario.ID = documento.COD_REG_LISTA and fichario.documentid = documento.NR_DOCUMENTO ";
	minhaQuery += "                    join histor_proces on histor_proces.NUM_PROCES = fichario.cdSolicitacao and histor_proces.LOG_ATIV = 1 ";
	minhaQuery += "    where documento.cod_empresa = 10097 ";
	minhaQuery += "      and documento.versao_ativa = 1 ";
	minhaQuery += "      and str_to_date(fichario.dtRegistro, '%d/%m/%Y') = str_to_date('12/06/2014', '%d/%m/%Y') ";
	//minhaQuery += "      and str_to_date(fichario.dtRegistro, '%d/%m/%Y') between str_to_date('13/06/2010', '%Y-%m-%d') and str_to_date('13/07/2015', '%Y-%m-%d')";
	*/
	// contagem
	//var minhaQuery = "SELECT 506, count(*) as teste from ml10097506";
	//minhaQuery += " UNION ALL ";
	//minhaQuery += "SELECT 507, count(*) from ml10097507";
 
 log.error("DS_SQL==============> INICIO");
 if (constraints != null) {
	for (var i = 0; i < constraints.length; i++) {
		if (constraints[i].fieldName == "sql") {
			minhaQuery = constraints[i].initialValue;
		}
	}
}
 
 var dataSource = "java:/jdbc/FluigDS";

 var newDataset = DatasetBuilder.newDataset();
 var ic = new javax.naming.InitialContext();
 var ds = ic.lookup(dataSource);
 var created = false;
 try {
  var conn = ds.getConnection();
  var stmt = conn.createStatement();
  var rs = stmt.executeQuery(minhaQuery);
  var columnCount = rs.getMetaData().getColumnCount();
  while(rs.next()) {
   if(!created) {
    for(var i=1;i<=columnCount; i++) {
    log.info("DS_SQL==============> Columns = " + rs.getMetaData().getColumnName(i));
     newDataset.addColumn(rs.getMetaData().getColumnName(i));
    }
    created = true;
   }
   var Arr = new Array();
   for(var i=1;i<=columnCount; i++) {
    var obj = rs.getObject(rs.getMetaData().getColumnName(i));
    if(null!=obj){
     Arr[i-1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
    }
    else {
     Arr[i-1] = "null";
    }
   }
     newDataset.addRow(Arr);
    }
 } catch(e) {
  log.error("DS_SQL==============> " + e.message);
  newDataset.addColumn("teste");
  newDataset.addRow([e.message]);
 } finally {
  if(stmt != null) stmt.close();
  if(conn != null) conn.close();
 }
 return newDataset;
}