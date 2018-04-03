function beforeStateEntry(sequenceId) {
	log.info("@SubAbeturadeChamados  beforeStateEntry sequenceId: " + sequenceId);
	if (sequenceId == Activity.EMAIL_CORPORATIVO) {
		solicitacaoEmailcoporativo();
	}

	if (sequenceId == Activity.CRIACAO_COD_CRM) {
		solicitacaoCodigoCRM();
	}






}

function solicitacaoEmailcoporativo() {
	var subject = retornaParametrizacao("emailCortitulo");
	log.info("@SubAbeturadeChamados  beforeStateEntry subject: '" + subject + "'");
	var template = "abertura_de_chamados";
	var params = [];

	var mensagem = "";
	if (hAPI.getCardValue("tipoSolic") == "master")
		mensagem += retornaParametrizacao("emailCormaster");
	else
		mensagem += retornaParametrizacao("emailCorfranquia");

	mensagem += "<br/><br/><br/><table>";
	mensagem += "<tr>";
	mensagem += "<th>Campos<th/>";
	mensagem += "<th>Valores<th/>";
	mensagem += "</tr>";
	mensagem += "<tr>";
	mensagem += "<td>Razão Social</td>";
	mensagem += "<td>" + hAPI.getCardValue("razaoSocial") + "</td>";
	mensagem += "</tr>";
	mensagem += "<tr>";
	mensagem += "<td>CNPJ</td>";
	mensagem += "<td>" + hAPI.getCardValue("nrCnpj") + "</td>";
	mensagem += "</tr>";
	mensagem += "<tr>";
	mensagem += "<td>Sugestão de E-mail</td>";
	mensagem += "<td>" + hAPI.getCardValue("sugestaoEmail") + "</td>";
	mensagem += "</tr>";
	mensagem += "</table>";

	var url = "<a style='color:red;' href='" + retornaParametrizacao("nmUrl") + "?token=" + hAPI.getCardValue("token") + "&task=" + Activity.JOIN_CHAMADOS + "&thread=1'>Por favor após terminar atividade clique aqui </a><br />";
	params.push({ name: "TITULO", value: "E-mail Corporativo - Fluxo onBoard" });
	params.push({ name: "MENSAGEM", value: mensagem });
	params.push({ name: "URL", value: url });

	var receivers = [];
	receivers.push(retornaParametrizacao("emailCoremail"));
	log.info("@SubAbeturadeChamados  beforeStateEntry onNotify() ");
	onNotify(subject, receivers, template, params, "text/html");
}
function solicitacaoCodigoCRM() {

	var url = "https://apimanager-homolog.totvs.com/api/token";
	var headers = [];



	log.info("@SubAbeturadeChamados start solicitacaoCodigoCRM");
	var string = DsGenericRest.callRequest(url, null, null, "POST", headers);

}
var DsGenericRest = {

	callRequest: function (url, params, login, method, headers) {
		try {

			var urlParameters = new java.lang.String("grant_type=client_credentials");
		
			var postData = 	new java.net.URLEncoder.encode(urlParameters,"UTF-8");
			log.info("@SubAbeturadeChamados postData:'" + postData+"'");

			log.info("@SubAbeturadeChamados url:" + url);
			var wurl =  new java.net.URL(url);
		
			var conn = wurl.openConnection();


			

			conn.setDoOutput(true);
			conn.setRequestMethod( "POST" );
			conn.setInstanceFollowRedirects(false);
			conn.setRequestProperty( "Content-Type", "application/x-www-form-urlencoded");
			conn.setRequestProperty("charset", "utf-8");
			conn.setRequestProperty( "Accept", "*/*" );
			conn.setRequestProperty( "Authorization", "Basic MUZ5ZDNRUUVlVGVXZ1VmdUd4Y2Q3YnI5d1k0YTowS1lSN1hKU3pjWkJ5N1hKTF9BYjlQUUNLQkVh");
		
			conn.setUseCaches(false);
			var writer = new java.io.OutputStreamWriter(conn.getOutputStream());
			log.info("@SubAbeturadeChamados conn.getOutputStream():'" + conn.getOutputStream()+"'");
			writer.write(postData);
			writer.flush();


			
			log.info("@SubAbeturadeChamados conn.getResponseCode():'" + conn.getResponseCode()+"'");
			var line;
			log.info("@SubAbeturadeChamados conn.getInputStream():'" + conn.getInputStream()+"'");
			var reader = new java.io.BufferedReader(new java.io.InputStreamReader(conn.getInputStream()));
			log.info("@SubAbeturadeChamados reader:'" + reader+"'");

			

			while ((line = reader.readLine()) != null) {
				log.info("@SubAbeturadeChamados line:'" + line+"'");
			}
			writer.close();
			reader.close();

			



		
		} catch (e) {
			log.error("@SubAbeturadeChamados/readResponse diz: Erro ao ler resposta");
			log.error("@SubAbeturadeChamados/readResponse diz: " + e);
		}


		try{

			var url =  new java.net.URL("http://apimanager-homolog.totvs.com/api/zendesk/1.0/groups");
			var con =  url.openConnection();
	
			// optional default is GET
			con.setRequestMethod("GET");
	
			//add request header
			con.setRequestProperty("Authorization-zendesk", "Basic bGVhbmRyb0Bha3RpZW5vdy5jb20vdG9rZW46RVNNa0VNRFladnRYMEVWSzBUSTVGRXYxYkgyWm5hbnUxZ3hxY29kUw==");
			con.setRequestProperty("Authorization", "Bearer e3ad16f6-0a64-308a-8118-482039724c47");
	
			
			log.info("@SubAbeturadeChamados GET con.getResponseCode():'" + con.getResponseCode()+"'");
			var reader = new java.io.BufferedReader(new java.io.InputStreamReader(con.getInputStream()));
			log.info("@SubAbeturadeChamados GET reader:'" + reader+"'");

			log.info("@SubAbeturadeChamados GET  con.getResponseCode():'" + con.getResponseCode() +"'");
			
			while ((line = reader.readLine()) != null) {
				reader.append(line);
				log.info("@SubAbeturadeChamados GET  line:'" + line+"'");
			}
			writer.close();
			reader.close();
			//print result
		
		}catch(e){
			log.info("@SubAbeturadeChamados GET  error:'" + e+"'");
		}
		
	}

}
