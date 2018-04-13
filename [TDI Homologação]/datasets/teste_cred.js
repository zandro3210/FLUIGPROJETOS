function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();	
	dataset.addColumn("USER");
	
	var url = new java.net.URL("http://prefluig14.totvs.com/ti-pass-management/portal");	
	var conn = url.openConnection();
	conn.setRequestMethod("GET");
	conn.setRequestProperty("Accept", "application/json");

	if (conn.getResponseCode() != 200) {
		log.info("Error dataset pass" +  conn.getResponseCode());
	}
	var br = new java.io.BufferedReader(new java.io.InputStreamReader((conn.getInputStream())));
	while ((output = br.readLine()) != null) {
		dataset.addRow([output]);
	}
	conn.disconnect();
	return dataset;
}