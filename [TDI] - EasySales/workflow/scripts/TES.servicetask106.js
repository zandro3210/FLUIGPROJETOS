var PRD = "";
var HML = "http://172.24.52.14:8091";
var SERVER = HML;


var PROD_CRM = "";
var HML_CRM = "http://172.24.52.10:8048";
var SERVER_CRM = HML_CRM;

function servicetask106(attempt, message) {

        log.info("@servicetask106 diz: inicio");
        var proposta = hAPI.getCardValue("proposta");
        log.info("@servicetask106 diz idproposta" + proposta);
	  
		
		// Recuperar JSON da proposta já otimizada
		var url = SERVER+"/rest/WSGETPROPOSTA?Proposta=" + proposta;
		var c1 = DatasetFactory.createConstraint("url", url, url, ConstraintType.MUST);
	    var constraints = [c1];
	    var dataset = DatasetFactory.getDataset("dsGenericGetRestNoAuth", null, constraints, null);
		var data = dataset.getValue(0, "response");
		log.info("@servicetask106 diz: data" + data);
		hAPI.setCardValue("jsonDatawsgetproposta",data);

		// Enviar JSON da proposta otimziada para TOTVS12 CRM
		CustomServiceTaskCustomer106.sendCustomer(data);


}
    
	var CustomServiceTaskCustomer106 = {
	
		sendCustomer: function(data){
			var url = SERVER_CRM+"/WSRPT12RETORC";
			return this.restRequest(url, data);
		},
	
		restRequest: function(url, parameters){
			var connection = this.createConnection(url, parameters);
			var response = this.readResponse(connection);
				
			return response;
		},

		createConnection: function(url, parameters){
			try {
				log.info("@CustomServiceTaskCustomer/createConnection diz: url = "+url);
				log.info("@CustomServiceTaskCustomer/createConnection diz: parameters = "+parameters);
				var urlObj = new java.net.URL(url);
				var conn = urlObj.openConnection();
				var output; 
				
				conn.setRequestMethod("PUT");
				conn.setDoOutput(true);
				
				output = new java.io.DataOutputStream(conn.getOutputStream());
				
				output.writeBytes(parameters);
				output.flush();
				output.close();
	
				return conn;
			} catch (e) {
				log.error("@CustomServiceTaskCustomer/createConnection diz: Erro ao criar conexao: "+e);
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
				log.info("@CustomServiceTaskCustomer/readResponse diz: responseCode = "+responseCode);
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
					log.error("@CustomServiceTaskCustomer/readResponse diz: Erro ao efetuar a chamada REST");
					log.error("@CustomServiceTaskCustomer/readResponse diz: "+response.toString());
					throw "Um erro inesperado ocorreu. Detalhes: "+response.toString();
				}
	
				return response.toString();
			} catch (e) {
				log.error("@CustomServiceTaskCustomer/readResponse diz: Erro ao ler resposta");
				log.error("@CustomServiceTaskCustomer/readResponse diz: "+e);
				throw "Fluig não entendeu o que Easy Sales respondeu. Detalhes: "+e;
			}
		}
	}