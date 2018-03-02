function createDataset(fields, constraints, sortFields){
	if(constraints == null || constraints.length == 0 || constraints[0].fieldName.toLowerCase() != "url"){
		log.error("Constraint url deve ser informada!");
		return null;
	}
	
	var dataset = DatasetBuilder.newDataset();
	var urlWithParams = constraints[0].initialValue;
	var string = restGetRequest(urlWithParams);
	
	dataset.addColumn("response");	
	dataset.addRow([string]);	
	
	return dataset;
}

/**
 * Efetua a requisicao do metodo get.
 * 
 * @param urlWithParams: URL do Rest jah com os parametros.
 * @returns String.
 */
function restGetRequest(urlWithParams){
	var connection = createConnection(urlWithParams);
	var response = readResponse(connection);
		
	return response;
}

/**
 * Cria a conexao com o endereco informado.
 * @param urlWithParams: URL do Rest jah com os parametros.
 * @returns
 */
function createConnection(urlWithParams){
	try {
		log.info("URL: "+urlWithParams);
		
		var url = new java.net.URL(urlWithParams);
		var conn = url.openConnection();
		
		conn.setRequestMethod("GET");
		
		return conn;
	} catch (e) {
		log.error("Erro ao criar conexao: "+e);
	}
}

/**
 * Captura o retorno enviado pelo rest.
 * @param connection: Objeto de conexao com o servico rest.
 * @returns String.
 */
function readResponse(connection){
	try {
		var responseCode = connection.getResponseCode();
		var inputStreamReader = new java.io.InputStreamReader(connection.getInputStream());
		var input = new java.io.BufferedReader(inputStreamReader);
		var response = new java.lang.StringBuffer();
		var inputLine;
		
		log.info("Response Code: "+responseCode);
		
		while ((inputLine = input.readLine()) != null) {
			response.append(inputLine);
		}
		
		input.close();

		return response.toString();
	} catch (e) {
		log.error(e);
	}
}