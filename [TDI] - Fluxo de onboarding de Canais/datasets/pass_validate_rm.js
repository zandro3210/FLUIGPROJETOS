function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("USER");

	try {
		var url = java.net.URL("http://fluig.totvs.com/ti-pass-management/rm");

		var conn = url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Accept", "application/json");

		if (conn.getResponseCode() != 200) {
			log.info("Error dataset pass portal" + conn.getResponseCode());
		}

		var br = new java.io.BufferedReader(new java.io.InputStreamReader((conn.getInputStream())));
		
		while ((output = br.readLine()) != null) {
			dataset.addRow([ output ]);
		}
		
	} catch(error) {
		log.info("Error dataset pass rm " + error.message);
	} finally {
		if (conn != null) {
			conn.disconnect();
		}
		if (br != null) {
			br.close();
		}
	}
	return dataset;
}