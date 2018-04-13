function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();	
	dataset.addColumn("USER");
	
	var url = java.net.URL("http://fluig.totvs.com/teste-ti/portal");
	
	var conn = url.openConnection();
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Accept", "application/json");
	
		if (conn.getResponseCode() != 200) {
			log.info("Error dataset pass portal" +  conn.getResponseCode());
		}
		
		log.info("dataset validate")		
		
		var br = new java.io.BufferedReader(new java.io.InputStreamReader((conn.getInputStream())));
		while ((output = br.readLine()) != null) {
			dataset.addRow([output]);
		}
		
		conn.disconnect();
	
	return dataset;
}