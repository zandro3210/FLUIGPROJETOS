function createDataset(fields, constraints, sortFields) {
	// http://fluig.totvs.com/api/public/ecm/dataset/availableDatasets
	
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("Sigla");
		 
	java.net.URL url = new java.net.URL("http://fluig.totvs.com/api/public/ecm/dataset/availableDatasets");
	
	java.net.HttpURLConnection conn = (java.net.HttpURLConnection) url.openConnection();
	
	conn.setRequestMethod("GET");
	conn.setRequestProperty("Accept", "application/json");
 
	if (conn.getResponseCode() != 200) {
		throw new RuntimeException("Failed : HTTP error code : "
				+ conn.getResponseCode());
	}
 
	java.io.BufferedReader br = new java.io.BufferedReader(
		new java.io.InputStreamReader((conn.getInputStream()))
	);
		
	while ((output = br.readLine()) != null) {
		dataset.addRow([output]);
	}
 
	conn.disconnect();
	  
	return dataset;
}