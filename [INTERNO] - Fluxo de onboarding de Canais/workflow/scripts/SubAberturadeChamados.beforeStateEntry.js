function beforeStateEntry(sequenceId){
	log.info("@SubAbeturadeChamados  beforeStateEntry sequenceId: "+sequenceId);
	if(sequenceId == Activity.EMAIL_CORPORATIVO )
	{
		solicitacaoEmailcoporativo();
	} 
	
	if(sequenceId == Activity.CRIACAO_COD_CRM )
	{
		solicitacaoEmailcoporativo();
	} 
	





}

function solicitacaoEmailcoporativo(){
	var subject = retornaParametrizacao("emailCortitulo");
	log.info("@SubAbeturadeChamados  beforeStateEntry subject: '"+subject + "'");
	var template = "abertura_de_chamados";
	var params = [];

	var mensagem = "";
	if (hAPI.getCardValue("tipoSolic") == "master" )
		mensagem +=  retornaParametrizacao("emailCormaster");
	else
		mensagem += retornaParametrizacao("emailCorfranquia");

	mensagem +="<br/><br/><br/><table>";
		mensagem +="<tr>";
			mensagem +="<th>Campos<th/>";
			mensagem +="<th>Valores<th/>";
		mensagem +="</tr>";
		mensagem +="<tr>";
			mensagem +="<td>Razão Social</td>";
			mensagem +="<td>" +  hAPI.getCardValue("razaoSocial") +"</td>";
		mensagem +="</tr>";
		mensagem +="<tr>";
			mensagem +="<td>CNPJ</td>";
			mensagem +="<td>" +  hAPI.getCardValue("nrCnpj") +"</td>";
		mensagem +="</tr>";
		mensagem +="<tr>";
			mensagem +="<td>Sugestão de E-mail</td>";
			mensagem +="<td>" +  hAPI.getCardValue("sugestaoEmail") +"</td>";
		mensagem +="</tr>";
	mensagem +="</table>";
	
	var url = "<a style='color:red;' href='" + retornaParametrizacao("nmUrl") + "?token=" + hAPI.getCardValue("token") + "&task="+  Activity.JOIN_CHAMADOS + "&thread=1'>Por favor após terminar atividade clique aqui </a><br />";		
	params.push({name:"TITULO",value: "E-mail Corporativo - Fluxo onBoard"});
	params.push({name:"MENSAGEM",value: mensagem});
	params.push({name:"URL",value: url  });
	
	var receivers = [];
	receivers.push(retornaParametrizacao("emailCoremail"));
	log.info("@SubAbeturadeChamados  beforeStateEntry onNotify() ");
	onNotify(subject, receivers, template, params,  "text/html" );
}
function solicitacaoCodigoCRM(){
	var url = "https://apimanager-homolog.totvs.com/api/token";
	var headers = [];
	var string = DsGenericRest.callRequest(url,null,null,"POST",);

}
var DsGenericRest = {

	callRequest: function(url,params, login,method,headers){
		var auth = this.getBasicAuth(login);
		var connection = this.createConnection(url, headers,method);
		return this.readResponse(connection);
	},
	/** Cria a conexao com o endereco informado. **/
	createConnection: function (url, headers,method){
		try {
			log.info("@dsGenericRest/createConnection diz: urlWithParams = "+url);
			
			var url = new java.net.URL(urlWithParams);
			var conn = url.openConnection();
			
			conn.setRequestMethod(method);

			if (headers != null){
				for (i = 0; i < headers.length; i++) { 
					conn.setRequestProperty(headers[i].name, "Basic "+ headers[i].key);
				}
			}
			
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
	getBasicAuth: function(login){
		var authEnc = null; 
		
		if(login){
			var authString = new java.lang.String(login.user+":"+ login.password);
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


