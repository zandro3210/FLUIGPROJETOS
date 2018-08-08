

function createDataset(fields, constraints, sortFields) {

	log.info("@dsEasyRestPost diz: inicio");

	var objeto = JSON.parse(constraints[0].getInitialValue());

	log.info("@dsEasyRestPost diz: params:" + constraints[0].getInitialValue());


	var result = Rest.send(objeto.url, objeto.data);
	log.info("@dsEasyRestPost  result" + result);



	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("response");
	dataset.addRow([result]);
	return dataset;

}





var Rest = {

	send: function(url,data){

		return this.restRequest(url, data);
	},
	/** Faz a chamada ao webservice **/
	restRequest: function(url, parameters){
		var connection = this.createConnection(url, parameters);
		var response = this.readResponse(connection);
			
		return response;
	},
	/** Cria a conexao com o endereco informado. **/
	createConnection: function(url, parameters){
		try {
			log.info("@Rest/createConnection diz: url = "+url);
			log.info("@Rest/createConnection diz: parameters = "+parameters);
			var urlObj = new java.net.URL(url);
			var conn = urlObj.openConnection();
			var output; 
			
			conn.setRequestMethod("POST");
			conn.setDoOutput(true);
			
			output = new java.io.DataOutputStream(conn.getOutputStream());
			
			output.writeBytes(parameters);
			output.flush();
			output.close();

			return conn;
		} catch (e) {
			log.error("@Rest/createConnection diz: Erro ao criar conexao: "+e);
			throw "Fluig não conseguiu se comunicar. Detalhes: "+e;
		}
	},
	/**
	 * Captura o retorno enviado pelo rest.
	 * @param connection: Objeto de conexao com o servico rest.
	 * @returns String.
	 */
	readResponse: function(connection){
		try {
			var responseCode = connection.getResponseCode();
			log.info("@Rest/readResponse diz: responseCode = "+responseCode);
			var inputStream = connection.getInputStream();
			var inputStreamReader = new java.io.InputStreamReader(inputStream);
			var input = new java.io.BufferedReader(inputStreamReader);
			var response = new java.lang.StringBuffer();
			var inputLine;			
			
			while ((inputLine = input.readLine()) != null) {
				response.append(inputLine);
			}
			
			input.close();
			
			if(responseCode != 200 && responseCode != 201){
				log.error("@Rest/readResponse diz: Erro ao efetuar a chamada REST");
				log.error("@Rest/readResponse diz: "+response.toString());
				throw "Um erro inesperado ocorreu. Detalhes: "+response.toString();
			}

			return response.toString();
		} catch (e) {
			log.error("@Rest/readResponse diz: Erro ao ler resposta");
			log.error("@Rest/readResponse diz: "+e);
			throw "Fluig não entendeu o retorno. Detalhes: "+e;
		}
	}
}