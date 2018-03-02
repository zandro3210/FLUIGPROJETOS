function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("matriculaGerente");
	dataset.addColumn("nomeGerente");
	
	var myQuery = "SELECT fut.user_code, fu.full_name FROM fdn_userrole fur join fdn_usertenant " +
			"fut join fdn_user fu on fu.USER_ID = fut.USER_ID and  fut.LOGIN = fur.LOGIN where  " +
			"fur.role_code = 'TDI-GerentesGMUD'"; 
	
	var dataSource = "/jdbc/FluigDSRO";

	var conn = null;
	var stmt = null;
	var rs = null;
	var ic = new javax.naming.InitialContext();
	var ds = ic.lookup(dataSource);
	var created = false;
	try {
		conn = ds.getConnection();
		stmt = conn.createStatement();
		rs = stmt.executeQuery(myQuery);
		//var columnCount = rs.getMetaData().getColumnCount();
		while (rs.next()) {
			dataset.addRow(new Array(rs.getString("fut.user_code"), rs.getString("fu.full_name")) );
		}
	} catch (e) {
		log.error("ERRO==============> " + e.message);
	} finally {
		if (stmt != null) {
			stmt.close();
		}
		if (conn != null) {
			conn.close();
		}
		if (rs != null) {
			rs.close();
		}
	}	
	//var dtsRole = DatasetFactory.getDataset('workflowRole',null,null,null);
	//for (var g = 0; g < dtsRole.values.length; g++)
    //    dataset.addRow(new Array(dtsRole) );
    //}
	
	return dataset;
}