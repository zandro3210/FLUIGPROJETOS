function createDataset(fields, constraints, sortFields) { 
	
	var newDataset = DatasetBuilder.newDataset();
	
	if(fields == null){
		newDataset.addColumn("INFO");
		newDataset.addRow(["Informe uma query!"]);
		return newDataset;
	}
		
	var minhaQuery = fields[0];
	log.info("QUERY: "+minhaQuery);
	var dataSource = "/jdbc/FluigDSRO";       

	var ic = new javax.naming.InitialContext();
	var ds = ic.lookup(dataSource);
	var created = false;
	try {
		var conn = ds.getConnection();
		var stmt = conn.createStatement();
		stmt.executeUpdate(minhaQuery);
	} catch(e) {
		log.error("ERRO==============> " + e.message);
	} finally {
		if(stmt != null) stmt.close();
		if(conn != null) conn.close();		
	}
	return newDataset;
}