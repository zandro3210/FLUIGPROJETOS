

function beforeStateEntry(sequenceId) {
	log.info("@SubAbeturadeChamados  beforeStateEntry sequenceId: " + sequenceId);
	log.error("@SubAberturadeChamados  hAPI.getActualThread:'" + hAPI.getActualThread("7143", getValue("WKNumProces"), 15) + "'" );
	if (sequenceId == Activity.EMAIL_CORPORATIVO) {
		solicitacaoEmailcoporativo();
	}

	log.error("@SubAberturadeChamados  criacaoCoridticket'" + 	hAPI.getCardValue("criacaoCoridticket")+ "'" );
	if (sequenceId == Activity.CRIACAO_COD_CRM && hAPI.getCardValue("criacaoCoridticket") == "") {
		solicitacaoCodigoCRM();
	}

	if (sequenceId == Activity.PORTAL_CLIENTE  && hAPI.getCardValue("criacaoPortalidticket") == "" ) {
		solicitacaoInclusaoPortal();
	}

	if (sequenceId == Activity.USUARIO_CRM_VENDAS && hAPI.getCardValue("criacaoEstruturaidticket") == "") {
		solicitacaoCRMEstrutura();
	}

	if (sequenceId == Activity.CADASTRO_FORNECEDOR && hAPI.getCardValue("criacaoFornecedoridticket") == "" ) {
		solicitacaoFornecedor();
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

	var url = "<a style='color:red;' href='" + retornaParametrizacao("nmUrl") + "/" + hAPI.getCardValue("token") + "/" + Activity.JOIN_EMAIL + "/1/" + Activity.EMAIL_CORPORATIVO  +"'>Por favor após terminar atividade clique aqui </a><br />";
	params.push({ name: "TITULO", value: "E-mail Corporativo - Fluxo onBoard" });
	params.push({ name: "MENSAGEM", value: mensagem });
	params.push({ name: "URL", value: url });

	var receivers = [];
	receivers.push(retornaParametrizacao("emailCoremail"));
	log.info("@SubAbeturadeChamados  beforeStateEntry onNotify() ");
	onNotify(subject, receivers, template, params, "text/html");
	hAPI.setCardValue("_dtemail",retornaDataAtual());
	
}
function solicitacaoCodigoCRM() {

	var access_token =	retornaTokenAccesstoken();
	var configuracaoFilho = {};
	configuracaoFilho.colunas = [];
	configuracaoFilho.colunas.push("tablecriacaoCordescricao");
	configuracaoFilho.colunas.push("tablecriacaoCoridzendesk");
	configuracaoFilho.colunas.push("tablecriacaoCorvaluezendesk");
	configuracaoFilho.dataset = "dscanaisOnboardParametrizacao";
	configuracaoFilho.tabela = "tablecriacaoCor";
	configuracaoFilho.where = [];

	var tablecriacaoCor = DatasetFactory.getDataset("dsCanaistablefilhos",[JSON.stringify(configuracaoFilho)],null ,null);

	var api = '"custom_fields":[';
	for (var i = 0; i < tablecriacaoCor.rowsCount; i++) {
		api += '{ "id": "' + tablecriacaoCor.getValue(i, configuracaoFilho.colunas[1]) + '", "value" : "' + tablecriacaoCor.getValue(i, configuracaoFilho.colunas[2]) + '"},';
	}
	api = api.substring(0,api.length-1);
	api += ']';
	var url = SERVER_ZENDESK + "/api/zendesk/1.0/tickets";
	var mensagem = "";
	mensagem += "Razão Social: " +  hAPI.getCardValue("razaoSocial") + "\\r ";
	mensagem += " CNPJ: " +  hAPI.getCardValue("nrCnpj") + "\\r ";
	mensagem += " Endereço Completo: " +  hAPI.getCardValue("endereco") + "\\r ";
	mensagem += " Cidade: " +  hAPI.getCardValue("nmMunicipio") + "\\r ";
	mensagem += " Estado: " +  hAPI.getCardValue("uf") + "\\r ";
	mensagem += " Nome Responsável: " +  hAPI.getCardValue("nome") + "\\r ";
	mensagem += " Telefone: " +  hAPI.getCardValue("telefone") + "\\r ";
	mensagem += " E-mail: " +  ( hAPI.getCardValue("tipoSolic") == "master" ?  hAPI.getCardValue("sugestaoEmail") : hAPI.getCardValue("email")) + "\\r ";
	mensagem += " Unidade Responsável: " +  hAPI.getCardValue("dsUnidadeResponsavel") + "\\r ";
	mensagem += " Código da unidade Responsável: " +  hAPI.getCardValue("cdUnidadeResponsavel") + "\\r ";
	mensagem += " Por favor após terminar atividade clique aqui: " + retornaParametrizacao("nmUrl") + "/" + hAPI.getCardValue("token") + "/" + Activity.JOIN_EMAIL + "/2/" + Activity.CRIACAO_COD_CRM;
	
	var params = '{"ticket":{"subject":"' + retornaParametrizacao("criacaoCortitulo") +'","comment":{"body":"' + retornaParametrizacao("criacaoCortitulo") + ' '  + mensagem + '  "},"priority":"' + retornaParametrizacao("criacaoCorstatus") +'",' + api+ ',"external_id":"' + hAPI.getCardValue("nrSubsolicitacao") +'"}}';


	var headers = [];
	var method = "POST";
	var authString = new java.lang.String(retornaParametrizacao("basicApizendesklogin")+":"+retornaParametrizacao("basicApizendeskpassword"));
	var bytes = authString.getBytes();
	authEnc = new java.util.Base64.getEncoder().encodeToString(bytes);
	headers.push({ name: "Content-Type", key : "application/json"});
	headers.push({ name: "charset", key : "utf-8"});
	headers.push({ name: "Authorization-zendesk", key : "Basic " + authEnc});
	headers.push({ name: "Authorization", key : "Bearer " + access_token});


	var criacaoCor = Rest(url, params, null,method, headers);
	log.info("@SubAbeturadeChamados RestPost criacaoCor.ticket.id:" + criacaoCor.ticket.id);
	hAPI.setCardValue("criacaoCoridticket",criacaoCor.ticket.id)
	hAPI.setCardValue("_dtcricaoCRM",retornaDataAtual());


}
function solicitacaoInclusaoPortal() {

	
	var configuracaoFilho = {};
	configuracaoFilho.colunas = [];
	configuracaoFilho.colunas.push("cpfSocio");
	configuracaoFilho.dataset = "formcanaisOnBoard";
	configuracaoFilho.tabela = "tableQuadroSocietario";
	configuracaoFilho.where = [];
	configuracaoFilho.where.push({ name : "token" , value1: "" + hAPI.getCardValue("token"), value2: "" + hAPI.getCardValue("token")});

	
	var dsCanaistableQuadroSocietario =  DatasetFactory.getDataset("dsCanaistablefilhos",[JSON.stringify(configuracaoFilho)],null ,null);
	var url = SERVER_ZENDESK + "/api/zendesk/1.0/tickets";
	var mensagem = "";
	mensagem += "\\rSolicito a inclusão do e-mail:'" + hAPI.getCardValue("sugestaoEmail") + "'" + "\\r";
	//mensagem += " CPF: '" +  dsCanaistableQuadroSocietario.getValue(0, "cpfSocio") + "'";
	
	mensagem += " Por favor após terminar atividade clique aqui: " + retornaParametrizacao("nmUrl") + "/" + hAPI.getCardValue("token") + "/" + Activity.JOIN_CHAMADOS + "/3/" + Activity.PORTAL_CLIENTE;
	
	var params = '{"ticket":{"subject":"' + retornaParametrizacao("criacaoPortaltitulo") +'","comment":{"body":"' + retornaParametrizacao("criacaoPortaltitulo") + ' '  + mensagem + '  "},"priority":"' + retornaParametrizacao("criacaoPortalstatus") +'","external_id":"' + hAPI.getCardValue("nrSubsolicitacao") +'"}}';

	var access_token =	retornaTokenAccesstoken();
	var headers = [];
	var method = "POST";
	var authString = new java.lang.String(retornaParametrizacao("basicApizendesklogin")+":"+retornaParametrizacao("basicApizendeskpassword"));
	var bytes = authString.getBytes();
	authEnc = new java.util.Base64.getEncoder().encodeToString(bytes);
	headers.push({ name: "Content-Type", key : "application/json"});
	headers.push({ name: "charset", key : "utf-8"});
	headers.push({ name: "Authorization-zendesk", key : "Basic " + authEnc});
	headers.push({ name: "Authorization", key : "Bearer " + access_token});


	var criacaoCor = Rest(url, params, null,method, headers);
	log.info("@SubAbeturadeChamados RestPost criacaoCor.ticket.id:" + criacaoCor.ticket.id);
	hAPI.setCardValue("criacaoPortalidticket",criacaoCor.ticket.id)
	hAPI.setCardValue("_dtinclusaoportal",retornaDataAtual());


}
function solicitacaoCRMEstrutura() {

	var access_token =	retornaTokenAccesstoken();
	var configuracaoFilho = {};
	configuracaoFilho.colunas = [];
	configuracaoFilho.colunas.push("tablecriacaoEstdescricao");
	configuracaoFilho.colunas.push("tablecriacaoEstidzendesk");
	configuracaoFilho.colunas.push("tablecriacaoEstvaluezendesk");
	configuracaoFilho.dataset = "dscanaisOnboardParametrizacao";
	configuracaoFilho.tabela = "tablecriacaoEstrutura";
	configuracaoFilho.where = [];
	
	var tablecriacaoEstrutura = DatasetFactory.getDataset("dsCanaistablefilhos",[JSON.stringify(configuracaoFilho)],null ,null);
	var api = '"custom_fields":[';
	for (var i = 0; i < tablecriacaoEstrutura.rowsCount; i++) {
		api += '{ "id": "' + tablecriacaoEstrutura.getValue(i, configuracaoFilho.colunas[1]) + '", "value" : "' + tablecriacaoEstrutura.getValue(i, configuracaoFilho.colunas[2]) + '"},';
	}
	api = api.substring(0,api.length-1);
	api += ']';
	var url = SERVER_ZENDESK + "/api/zendesk/1.0/tickets";
	var mensagem = "";
	if (hAPI.getCardValue("tipoSolicMaster") == "master" &&  hAPI.getCardValue("slVinculoMaster") == "nao" ){
		mensagem += " Código da Unidade Responsável: " +  hAPI.getCardValue("cdUnidadeResponsavel") + "\\r";
		mensagem += " Unidade Responsável: " +  hAPI.getCardValue("dsUnidadeResponsavel") + "\\r";
	}
	if (  hAPI.getCardValue("tipoSolicMaster") == "franquia"   || (hAPI.getCardValue("tipoSolicMaster") == "master" &&  hAPI.getCardValue("slVinculoMaster") == "sim")){
		mensagem += " Unidade de Venda: " +  hAPI.getCardValue("criacaoCoridUnidadeVenda") + "\\r";
	}

	mensagem += " Código do Gerente: " +  hAPI.getCardValue("cdGerente") + "\\r";
	mensagem += " Nome do Gerente: " +  hAPI.getCardValue("nmGerente") + "\\r";
	mensagem += " Razão Social: " +  hAPI.getCardValue("razaoSocial") + "\\r";
	mensagem += " CNPJ: " +  hAPI.getCardValue("nrCnpj") + "\\r";
	mensagem += " Endereço Completo: " +  hAPI.getCardValue("endereco") + "\\r";
	mensagem += " Cidade: " +  hAPI.getCardValue("nmMunicipio") + "\\r";
	mensagem += " Estado: " +  hAPI.getCardValue("uf") + "\\r";
	mensagem += " Nome Responsável: " +  hAPI.getCardValue("nome") + "\\r";
	mensagem += " Telefone: " +  hAPI.getCardValue("telefone") + "\\r";
	mensagem += " E-mail Partner: " +   hAPI.getCardValue("sugestaoEmail") + "\\r";
    mensagem += " Tipo AGN: " + "\\r";
	
	if (hAPI.getCardValue("tipoSolicMaster") == "master" &&  hAPI.getCardValue("slVinculoMaster") == "sim" ){
		mensagem += " Master PVF" + "\\r";
	}
	if (hAPI.getCardValue("tipoSolicMaster") == "master" &&  hAPI.getCardValue("slVinculoMaster") == "nao" ){
		mensagem += " PVF" + "\\r";
	}
	if (hAPI.getCardValue("tipoSolicMaster") == "franquia"){
		mensagem += hAPI.getCardValue("tpContrato") + "\\r";
	}

	mensagem += " Por favor após terminar atividade clique aqui: " + retornaParametrizacao("nmUrl") + "/" + hAPI.getCardValue("token") + "/" + Activity.JOIN_CHAMADOS + "/6/" + Activity.USUARIO_CRM_VENDAS;
	
	var params = '{"ticket":{"subject":"' + retornaParametrizacao("criacaoEstruturatitulo") +'","comment":{"body":"' + retornaParametrizacao("criacaoEstruturatitulo") + ' '  + mensagem + '  "},"priority":"' + retornaParametrizacao("criacaoEstruturastatus") +'",' + api +',"external_id":"' + hAPI.getCardValue("nrSubsolicitacao") +'"}}';


	var headers = [];
	var method = "POST";
	var authString = new java.lang.String(retornaParametrizacao("basicApizendesklogin")+":"+retornaParametrizacao("basicApizendeskpassword"));
	var bytes = authString.getBytes();
	authEnc = new java.util.Base64.getEncoder().encodeToString(bytes);
	headers.push({ name: "Content-Type", key : "application/json"});
	headers.push({ name: "charset", key : "utf-8"});
	headers.push({ name: "Authorization-zendesk", key : "Basic " + authEnc});
	headers.push({ name: "Authorization", key : "Bearer " + access_token});


	var criacaoCor = Rest(url, params, null,method, headers);
	log.info("@SubAbeturadeChamados RestPost criacaoCor.ticket.id:" + criacaoCor.ticket.id);
	hAPI.setCardValue("criacaoEstruturaidticket",criacaoCor.ticket.id)
	hAPI.setCardValue("_dtusuariocrm",retornaDataAtual());

}
function solicitacaoFornecedor() {

	var access_token =	retornaTokenAccesstoken();
	var configuracaoFilho = {};
	configuracaoFilho.colunas = [];
	configuracaoFilho.colunas.push("tablecriacaoFordescricao");
	configuracaoFilho.colunas.push("tablecriacaoForidzendesk");
	configuracaoFilho.colunas.push("tablecriacaoForvaluezendesk");
	configuracaoFilho.dataset = "dscanaisOnboardParametrizacao";
	configuracaoFilho.tabela = "tablecriacaoFornecedor";
	configuracaoFilho.where = [];
	
	var tablecriacaoFornecedor =  DatasetFactory.getDataset("dsCanaistablefilhos",[JSON.stringify(configuracaoFilho)],null ,null);
	var api = '"custom_fields":[';
	for (var i = 0; i < tablecriacaoFornecedor.rowsCount; i++) {
		api += '{ "id": "' + tablecriacaoFornecedor.getValue(i, configuracaoFilho.colunas[1]) + '", "value" : "' + tablecriacaoFornecedor.getValue(i, configuracaoFilho.colunas[2]) + '"},';
	}
	api = api.substring(0,api.length-1);
	api += ']';
	var url = SERVER_ZENDESK + "/api/zendesk/1.0/tickets";
	var mensagem = "";
	mensagem += "Razão Social: " +  hAPI.getCardValue("razaoSocial") + "\\r";
	mensagem += " CNPJ: " +  hAPI.getCardValue("nrCnpj") + "\\r";
	mensagem += " Banco: " +  hAPI.getCardValue("banco") + "\\r";
	mensagem += " Agência: " +  hAPI.getCardValue("agencia") + "\\r";
	mensagem += " Conta: " +  hAPI.getCardValue("conta") + "\\r";
	mensagem += " E-mail para recibimento de relatório de comissões: " +  hAPI.getCardValue("emailRecebimentoRelatrio") + "\\r";
	mensagem += " Por favor após terminar atividade clique aqui: " + retornaParametrizacao("nmUrl") + "/" + hAPI.getCardValue("token") + "/" + Activity.JOIN_CHAMADOS + "/4/" + Activity.CADASTRO_FORNECEDOR ;
	
	var params = '{"ticket":{"subject":"' + retornaParametrizacao("criacaoFornecedortitulo") +'","comment":{"body":"' + retornaParametrizacao("criacaoFornecedortitulo") + ' '  + mensagem + '  "},"priority":"' + retornaParametrizacao("criacaoFornecedorstatus") +'",' + api +',"external_id":"' + hAPI.getCardValue("nrSubsolicitacao") +'"}}';


	var headers = [];
	var method = "POST";
	var authString = new java.lang.String(retornaParametrizacao("basicApizendesklogin")+":"+retornaParametrizacao("basicApizendeskpassword"));
	var bytes = authString.getBytes();
	authEnc = new java.util.Base64.getEncoder().encodeToString(bytes);
	headers.push({ name: "Content-Type", key : "application/json"});
	headers.push({ name: "charset", key : "utf-8"});
	headers.push({ name: "Authorization-zendesk", key : "Basic " + authEnc});
	headers.push({ name: "Authorization", key : "Bearer " + access_token});


	var criacaoCor = Rest(url, params, null,method, headers);
	log.info("@SubAbeturadeChamados RestPost criacaoFornecedoridticket.ticket.id:" + criacaoCor.ticket.id);
	hAPI.setCardValue("criacaoFornecedoridticket",criacaoCor.ticket.id)
	hAPI.setCardValue("_dtfornecedor",retornaDataAtual());

}


function Rest(url, params, login, method, headers) {
		try {




			log.info("@SubAbeturadeChamados RestPost url:" + url);
			var wurl =  new java.net.URL(url);
		
			var conn = wurl.openConnection();

			
			if (method == "POST")
			    conn.setDoOutput(true);

			conn.setRequestMethod(method);
			log.info("@SubAbeturadeChamados RestPost method:" + method);
			conn.setInstanceFollowRedirects(false);

			for (i = 0; i < headers.length; i++) { 
				log.info("@SubAbeturadeChamados RestPost headers[i].name:'" + headers[i].name + "' headers[i].key:'" + headers[i].key + "'");
				conn.setRequestProperty( headers[i].name, headers[i].key);
			}
					
			if (method == "POST"){
				conn.setUseCaches(false);
				var writer = new java.io.OutputStreamWriter(conn.getOutputStream());
				log.info("@SubAbeturadeChamados RestPost conn.getOutputStream():'" + conn.getOutputStream()+"'");
			}
			

			if (params){
				writer.write(params);
				log.info("@SubAbeturadeChamados RestPost params:'" + params +"'");
				writer.flush();
			}
		
		
			log.info("@SubAbeturadeChamados RestPost conn.getResponseCode():'" + conn.getResponseCode()+"'");
			var line;
			log.info("@SubAbeturadeChamados RestPost conn.getInputStream():'" + conn.getInputStream()+"'");
			var reader = new java.io.BufferedReader(new java.io.InputStreamReader(conn.getInputStream()));
			log.info("@SubAbeturadeChamados RestPost reader:'" + reader+"'");

			var response = new java.lang.StringBuffer();

			while ((line = reader.readLine()) != null) {
				log.info("@SubAbeturadeChamados RestPost line:'" + line+"'");
				response.append(line);
			}
			if (method == "POST")
				writer.close();

			reader.close();

			return JSON.parse(response);



		
		} catch (e) {
			log.error("@SubAbeturadeChamados RestPost erro: " + e);
			return e;
		}
			

}
function retornaTokenAccesstoken(){
	var url = SERVER_ZENDESK + "/api/token";
	var params = "grant_type=client_credentials";
	var headers = [];
	var method = "POST";
	var authString = new java.lang.String(retornaParametrizacao("basicApimanagerlogin")+":"+retornaParametrizacao("basicApimanagerpassword"));
	log.info("@SubAbeturadeChamados retornaParametrizacao('basicApimanagerlogin'):" + retornaParametrizacao("basicApimanagerlogin"));
	log.info("@SubAbeturadeChamados retornaParametrizacao('basicApimanagerpassword'):" + retornaParametrizacao("basicApimanagerpassword"));
	var bytes = authString.getBytes();
	authEnc = new java.util.Base64.getEncoder().encodeToString(bytes);
	headers.push({ name: "Content-Type", key : "application/x-www-form-urlencoded"});
	headers.push({ name: "charset", key : "utf-8"});
	headers.push({ name: "Accept", key : "*/*"});
	headers.push({ name: "Authorization", key : "Basic " + authEnc});


	var token = Rest(url, params, null, method, headers);

	log.info("@SubAbeturadeChamados RestPost token.access_token:" + token.access_token);

	return token.access_token;
}

function retornaDataAtual(){

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	
	var yyyy = today.getFullYear();
	if(dd<10){
		dd='0'+dd;
	} 
	if(mm<10){
		mm='0'+mm;
	} 
	return  dd+'/'+mm+'/'+yyyy;

}