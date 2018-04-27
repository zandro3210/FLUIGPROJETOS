var PRD = "";
var HML = "http://172.16.93.222:8091";
var SERVER = HML;

function servicetask74(attempt, message){
	CustomServiceTaskEar.sendEar();
	//return true;
}

var CustomServiceTaskEar = {
	/** Envia os dados d o ear para o Easy Sales **/
	sendEar: function(){
		var url = SERVER+"/rest/WSRPESESN";
		return this.restRequest(url, hAPI.getCardValue("jsonExecutivo"));
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
			log.info("@CustomServiceTaskEar/createConnection diz: url = "+url);
			log.info("@CustomServiceTaskEar/createConnection diz: parameters = "+parameters);
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
			log.error("@CustomServiceTaskEar/createConnection diz: Erro ao criar conexao: "+e);
			throw "Fluig não conseguiu se comunicar com Easy Sales. Detalhes: "+e;
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
			log.info("@CustomServiceTaskEar/readResponse diz: responseCode = "+responseCode);
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
				log.error("@CustomServiceTaskEar/readResponse diz: Erro ao efetuar a chamada REST");
				log.error("@CustomServiceTaskEar/readResponse diz: "+response.toString());
				throw "Um erro inesperado ocorreu. Detalhes: "+response.toString();
			}

			return response.toString();
		} catch (e) {
			log.error("@CustomServiceTaskEar/readResponse diz: Erro ao ler resposta");
			log.error("@CustomServiceTaskEar/readResponse diz: "+e);
			throw "Fluig não entendeu o que Easy Sales respondeu. Detalhes: "+e;
		}
	}
}