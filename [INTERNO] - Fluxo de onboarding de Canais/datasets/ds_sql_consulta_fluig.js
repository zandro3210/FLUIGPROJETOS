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
		var rs = stmt.executeQuery(minhaQuery);
		var columnCount = rs.getMetaData().getColumnCount();
		while(rs.next()) {
			if(!created) {
				for(var i=1;i<=columnCount; i++) {
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
			log.info("Arr: " + Arr);
			newDataset.addRow(Arr);
		}
	} catch(e) {
		log.error("ERRO==============> " + e.message);
	} finally {
		if(stmt != null) stmt.close();
		if(conn != null) conn.close();
	}
	return newDataset;
}