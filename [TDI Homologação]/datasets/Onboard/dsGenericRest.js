function createDataset(fields, constraints, sortFields){
	var dataset = DatasetBuilder.newDataset();
	var constraintNames = ["url", "user", "password"];
	var map = ConstraintUtils.getConstraintsValue(constraints, constraintNames);
	
	if(map.get("url") == null){
		log.error("@dsGenericRest/createDataset diz: Constraint url deve ser informada!");
		return null;
	}
		
	var string = DsGenericRest.callRequest(map.get("url"), map.get("user"), map.get("password"));
	
	dataset.addColumn("response");	
	dataset.addRow([string]);	
	
	return dataset;
}

var DsGenericRest = {
	/**
	 * Efetua a requisicao.
	 * 
	 * @param urlWithParams: URL do Rest jah com os parametros.
	 * @param user: Nao obrigatorio.
	 * @param password: Nao obrigatorio.
	 * @returns String.
	 */
	callRequest: function(urlWithParams, user, password){
		var auth = this.getBasicAuth(user, password);
		var connection = this.createConnection(urlWithParams, auth);
		return this.readResponse(connection);
	},
	/** Cria a conexao com o endereco informado. **/
	createConnection: function (urlWithParams, basicAuth){
		try {
			log.info("@dsGenericRest/createConnection diz: urlWithParams = "+urlWithParams);
			
			var url = new java.net.URL(urlWithParams);
			var conn = url.openConnection();
			
			conn.setRequestMethod("GET");
			
			if(basicAuth != null) conn.setRequestProperty("Authorization", "Basic "+basicAuth);
		
			return conn;
		} catch (e) {
			log.error("@dsGenericRest/createConnection diz: Erro ao criar conexao: "+e);
		}
	},
	/** Captura o retorno enviado pelo rest. **/
	readResponse: function (connection){
		try {
			var responseCode = connection.getResponseCode();
			var inputStream = (parseInt(responseCode) == 200) ? connection.getInputStream() : connection.getErrorStream();
			var inputStreamReader = new java.io.InputStreamReader(inputStream);
			var input = new java.io.BufferedReader(inputStreamReader);
			var response = new java.lang.StringBuffer();
			var inputLine;
			
			log.info("@dsGenericRest/readResponse diz: responseCode = "+responseCode);
			
			while ((inputLine = input.readLine()) != null) {
				response.append(inputLine);
			}
			
			input.close();
			
			if(responseCode != 200){
				log.error("@dsGenericRest/readResponse diz: Erro ao efetuar a chamada REST");
				log.error("@dsGenericRest/readResponse diz: "+response.toString());
			}

			return response.toString();
		} catch (e) {
			log.error("@dsGenericRest/readResponse diz: Erro ao ler resposta");
			log.error("@dsGenericRest/readResponse diz: "+e);
		}
	},
	getBasicAuth: function(user, password){
		var authEnc = null; 
		
		if(user != null && password != null){
			var authString = new java.lang.String(user+":"+password);
			var bytes = authString.getBytes();
			authEnc = java.util.Base64.getEncoder().encodeToString(bytes);
		}
		
		return authEnc;
	}
}

var ConstraintUtils = {
	/**
	 * Captura o valor das constraints enviadas ao dataset.
	 * 
	 * @param constraints: Array de constraints.
	 * @param constraintNames: Array com o nome das constraints obrigatorias para o dataset.
	 * 
	 * @returns HashMap<String,String>
	 */
	getConstraintsValue: function(constraints, constraintNames){
	    var map = this.constraintToMap(constraints);
	     
	    for(var i=0; i<constraintNames.length; i++){
	        var constraintValue = map.get(constraintNames[i]); 
	        if(constraintValue == null) log.warn("Constraint "+constraintNames[i]+" esta com valor nulo.");
	    }
	     
	    return map;
	},
	/** Converte as Contraints em HashMap **/
	constraintToMap: function(constraints){
	    if(constraints == null) return null;
	     
	    var map = new java.util.HashMap();
	         
	    for(var i=0; i<constraints.length; i++){
	        map.put(constraints[i].fieldName.toLowerCase(), constraints[i].initialValue);
	    }
	     
	    return map;
	}		
}
