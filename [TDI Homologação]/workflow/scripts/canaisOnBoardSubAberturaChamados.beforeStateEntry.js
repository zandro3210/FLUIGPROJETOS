

function beforeStateEntry(sequenceId) {
	log.info("@SubAbeturadeChamados  beforeStateEntry sequenceId: " + sequenceId);
	log.error("@SubAberturadeChamados  hAPI.getActualThread:'" + hAPI.getActualThread("7143", getValue("WKNumProces"), 15) + "'");
	if (sequenceId == Activity.EMAIL_CORPORATIVO) {
		// [OK]
		ZendeskTools.cadastroEmailCorporativo();
	}

	log.error("@SubAberturadeChamados  criacaoCoridticket'" + hAPI.getCardValue("criacaoCoridticket") + "'");
	if (sequenceId == Activity.CRIACAO_COD_CRM && hAPI.getCardValue("criacaoCoridticket") == "") {
		ZendeskTools.cadastroUnidadeVenda();
	}

	if (sequenceId == Activity.PORTAL_CLIENTE && hAPI.getCardValue("criacaoPortalidticket") == "") {
		// [OK]
		ZendeskTools.inclusaoPortal();
	}

	if (sequenceId == Activity.USUARIO_CRM_VENDAS && hAPI.getCardValue("criacaoEstruturaidticket") == "") {
		ZendeskTools.cadastroVendedorEstruturaVendas();
	}

	if (sequenceId == Activity.CADASTRO_FORNECEDOR && hAPI.getCardValue("criacaoFornecedoridticket") == "") {
		// [OK]
		ZendeskTools.cadastroFornecedor();
	}

}

var ZendeskTools = {

	inclusaoPortal: function () {

		var configuracaoFilho = {};
		configuracaoFilho.colunas = [];
		configuracaoFilho.colunas.push("cpfSocio");
		configuracaoFilho.colunas.push("nmSocio");
		configuracaoFilho.dataset = "formcanaisOnBoard";
		configuracaoFilho.tabela = "tableQuadroSocietario";
		configuracaoFilho.where = [];
		configuracaoFilho.where.push({ name: "token", value1: "" + hAPI.getCardValue("token"), value2: "" + hAPI.getCardValue("token") });

		var Societarios = DatasetFactory.getDataset("dsCanaistablefilhos", [JSON.stringify(configuracaoFilho)], null, null);
		var mensagem = "\rCódigo a Unidade:'" + hAPI.getCardValue("sugestaoEmail") + "'" + "\r";
		mensagem += " CNPJ: '" + hAPI.getCardValue("nrCnpj") + "'";

		for (var i = 0; i < Societarios.rowsCount; i++) {
			mensagem += " (" + (i + 1) + ") Societário  Nome Completo: '" + Societarios.getValue(i, "nmSocio") + "'";
			mensagem += " (" + (i + 1) + ") CPF: '" + Societarios.getValue(i, "cpfSocio") + "'";
		}

		mensagem += " E-mail: '" + hAPI.getCardValue("_emailcorporativo") + "'";
		mensagem += " Por favor após terminar atividade clique aqui: " + retornaParametrizacao("nmUrl") + "/" + hAPI.getCardValue("token") + "/" + Activity.JOIN_CHAMADOS + "/3/" + Activity.PORTAL_CLIENTE;

		var ticket = {};
		ticket.subject = "" + retornaParametrizacao("criacaoPortaltitulo");
		ticket.comment = { body: "" + retornaParametrizacao("criacaoPortaltitulo") + "  " + mensagem };
		ticket.priority = "" + retornaParametrizacao("criacaoPortalstatus");
		ticket.external_id = "" + hAPI.getCardValue("nrSubsolicitacao");
		ticket.group_id = "" + retornaParametrizacao("criacaoPortalgroupid");
		ticket.ticket_form_id = "" + retornaParametrizacao("criacaoPortalticket_form_id");
		ticket.brand_id = "" + retornaParametrizacao("criacaoPortalticketbrand");
		ticket.tags = [];
		ticket.custom_fields = [];
		ticket.fields = [];

		// Tags
		var configuracaoFilho = {};
		configuracaoFilho.colunas = [];
		configuracaoFilho.colunas.push("tbcriacaoPortalTagsdesc");
		configuracaoFilho.dataset = "dscanaisOnboardParametrizacao";
		configuracaoFilho.tabela = "tablecriacaoPortalTags";
		configuracaoFilho.where = [];

		var Tags = DatasetFactory.getDataset("dsCanaistablefilhos", [JSON.stringify(configuracaoFilho)], null, null);
		for (var i = 0; i < Tags.rowsCount; i++) {
			ticket.tags.push("" + Tags.getValue(i, configuracaoFilho.colunas[0]));
		}

		// Custom Field e Fields
		var configuracaoFilho = {};
		configuracaoFilho.colunas = [];
		configuracaoFilho.colunas.push("tablecriacaoPortaldescricao");
		configuracaoFilho.colunas.push("tablecriacaoPortaltipo");
		configuracaoFilho.colunas.push("tablecriacaoPortalidzendesk");
		configuracaoFilho.colunas.push("tablecriacaoPortalvaluezendesk");
		configuracaoFilho.dataset = "dscanaisOnboardParametrizacao";
		configuracaoFilho.tabela = "tablecriacaoPortal";
		configuracaoFilho.where = [];

		var CustomFields = DatasetFactory.getDataset("dsCanaistablefilhos", [JSON.stringify(configuracaoFilho)], null, null);
		for (var i = 0; i < CustomFields.rowsCount; i++) {
			ticket["" + CustomFields.getValue(i, configuracaoFilho.colunas[1])].push({ id: "" + CustomFields.getValue(i, configuracaoFilho.colunas[2]), value: "" + CustomFields.getValue(i, configuracaoFilho.colunas[3]) });
		}

		var result = this.criarTicket({ ticket: ticket });
		log.info("@SubAbeturadeChamados RestPost result.ticket.id:" + result.ticket.id);
		hAPI.setCardValue("criacaoPortalidticket", result.ticket.id)
		hAPI.setCardValue("_dtinclusaoportal", retornaDataAtual());
	},
	cadastroEmailCorporativo: function () {
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

		var url = "<a style='color:red;' href='" + retornaParametrizacao("nmUrl") + "/" + hAPI.getCardValue("token") + "/" + Activity.JOIN_EMAIL + "/1/" + Activity.EMAIL_CORPORATIVO + "'>Por favor após terminar atividade clique aqui </a><br />";
		params.push({ name: "TITULO", value: "E-mail Corporativo - Fluxo onBoard" });
		params.push({ name: "MENSAGEM", value: mensagem });
		params.push({ name: "URL", value: url });

		var receivers = [];
		receivers.push(retornaParametrizacao("emailCoremail"));
		log.info("@SubAbeturadeChamados  beforeStateEntry onNotify() ");
		onNotify(subject, receivers, template, params, "text/html");
		hAPI.setCardValue("_dtemail", retornaDataAtual());
	},
	cadastroUnidadeVenda: function () {


		var mensagem = "Razão Social: " + hAPI.getCardValue("razaoSocial") + "\r ";
		mensagem += " CNPJ: " + hAPI.getCardValue("nrCnpj") + "\r ";
		mensagem += " Endereço Completo: " + hAPI.getCardValue("endereco") + " " + hAPI.getCardValue("cep") +  " " + hAPI.getCardValue("nmMunicipio") + " " + hAPI.getCardValue("uf")  + "\\r";
		mensagem += " Tipo: " +   hAPI.getCardValue("tpContrato") + "\r ";
		mensagem += " AGN: ";
		if (hAPI.getCardValue("tipoSolic") == "master" &&   hAPI.getCardValue("tpContrato") == "PVF")
			mensagem += "PVF ";
		
		if (hAPI.getCardValue("tipoSolic") == "master" &&   hAPI.getCardValue("tpContrato") == "MASTER PVF")
			mensagem += "MVF";
	
		if (hAPI.getCardValue("tipoSolic") == "franquia" &&   hAPI.getCardValue("tpContrato") == "CAT")
			mensagem += "CAT";
		
		if (hAPI.getCardValue("tipoSolic") == "franquia" &&   hAPI.getCardValue("tpContrato") == "AVT")
			mensagem += "AVT";

		if (hAPI.getCardValue("tipoSolic") == "franquia" &&   hAPI.getCardValue("tpContrato") == "CNT")
			mensagem += "CNT";

		mensagem += " Mod. Licença: ";

		if (hAPI.getCardValue("tpContrato") == "CNT")
			mensagem += "000003 - Modelo De Licencas CNT";

		if (hAPI.getCardValue("tpContrato") == "AVT")
			mensagem += "000005 - Modelo De Licencas AVT";

		if (hAPI.getCardValue("tpContrato") == "CAT")
			mensagem += "000008 - Modelo De Licenças CAT";

		mensagem += " Nome Responsável: " + hAPI.getCardValue("nome") + "\r ";
		mensagem += " Telefone: " + hAPI.getCardValue("telefone") + "\r ";
		mensagem += " E-mail: " + (hAPI.getCardValue("tipoSolic") == "master" ? hAPI.getCardValue("sugestaoEmail") : hAPI.getCardValue("email")) + "\r ";
		mensagem += " Unidade Responsável: " + hAPI.getCardValue("dsUnidadeResponsavel") + "\r ";
		mensagem += " Código da unidade Responsável: " + hAPI.getCardValue("cdUnidadeResponsavel") + "\r ";
		mensagem += " Por favor após terminar atividade clique aqui: " + retornaParametrizacao("nmUrl") + "/" + hAPI.getCardValue("token") + "/" + Activity.JOIN_EMAIL + "/2/" + Activity.CRIACAO_COD_CRM;

		var ticket = {};
		ticket.subject = "" + retornaParametrizacao("criacaoCortitulo");
		ticket.comment = { body: "" + retornaParametrizacao("criacaoCortitulo") + "  " + mensagem };
		ticket.priority = "" + retornaParametrizacao("criacaoCorstatus");
		ticket.external_id = "" + hAPI.getCardValue("nrSubsolicitacao");
		ticket.group_id = "" + retornaParametrizacao("criacaoCorgroupid");
		ticket.ticket_form_id = "" + retornaParametrizacao("criacaoCorticket_form_id");
		ticket.brand_id = "" + retornaParametrizacao("criacaoCorbrand");
		ticket.tags = [];
		ticket.custom_fields = [];
		ticket.fields = [];

		// Tags
		var configuracaoFilho = {};
		configuracaoFilho.colunas = [];
		configuracaoFilho.colunas.push("tablecriacaoCorTagsdesc");
		configuracaoFilho.dataset = "dscanaisOnboardParametrizacao";
		configuracaoFilho.tabela = "tablecriacaoCorTags";
		configuracaoFilho.where = [];

		var Tags = DatasetFactory.getDataset("dsCanaistablefilhos", [JSON.stringify(configuracaoFilho)], null, null);
		for (var i = 0; i < Tags.rowsCount; i++) {
			ticket.tags.push("" + Tags.getValue(i, configuracaoFilho.colunas[0]));
		}

		// Custom Field e Fields
		var configuracaoFilho = {};
		configuracaoFilho.colunas = [];
		configuracaoFilho.colunas.push("tablecriacaoCordescricao");
		configuracaoFilho.colunas.push("tablecriacaoCortipo");
		configuracaoFilho.colunas.push("tablecriacaoCoridzendesk");
		configuracaoFilho.colunas.push("tablecriacaoCorvaluezendesk");
		configuracaoFilho.dataset = "dscanaisOnboardParametrizacao";
		configuracaoFilho.tabela = "tablecriacaoCor";
		configuracaoFilho.where = [];

		var CustomFields = DatasetFactory.getDataset("dsCanaistablefilhos", [JSON.stringify(configuracaoFilho)], null, null);
		for (var i = 0; i < CustomFields.rowsCount; i++) {
			ticket["" + CustomFields.getValue(i, configuracaoFilho.colunas[1])].push({ id: "" + CustomFields.getValue(i, configuracaoFilho.colunas[2]), value: "" + CustomFields.getValue(i, configuracaoFilho.colunas[3]) });
		}

		var result = this.criarTicket({ ticket: ticket });
		log.info("@SubAbeturadeChamados RestPost result.ticket.id:" + result.ticket.id);
		hAPI.setCardValue("criacaoCoridticket", result.ticket.id)
		hAPI.setCardValue("_dtcricaoCRM", retornaDataAtual());

	},
	cadastroFornecedor: function () {

		var mensagem = "Razão Social: " + hAPI.getCardValue("razaoSocial") + "\r";
		mensagem += " CNPJ/CPF: " + hAPI.getCardValue("nrCnpj") + "\r";
		mensagem += " Endereço Completo: " + hAPI.getCardValue("endereco") + "\r";
		mensagem += " CEP: " + hAPI.getCardValue("cep") + "\r";
		mensagem += " Município: " + hAPI.getCardValue("nmMunicipio") + "\r";
		mensagem += " UF: " + hAPI.getCardValue("uf") + "\r";
		mensagem += " Banco: " + hAPI.getCardValue("banco") + "\r";
		mensagem += " Agência: " + hAPI.getCardValue("agencia") + "\r";
		mensagem += " Conta: " + hAPI.getCardValue("conta") + "\r";
		mensagem += " E-mail para recibimento de relatório de comissões: " + hAPI.getCardValue("emailRecebimentoRelatrio") + "\r";
		mensagem += " Por favor após terminar atividade clique aqui: " + retornaParametrizacao("nmUrl") + "/" + hAPI.getCardValue("token") + "/" + Activity.JOIN_CHAMADOS + "/4/" + Activity.CADASTRO_FORNECEDOR;

		var ticket = {};
		ticket.subject = "" + retornaParametrizacao("criacaoFornecedortitulo");
		ticket.comment = { body: "" + retornaParametrizacao("criacaoFornecedortitulo") + "   " + mensagem };
		ticket.priority = "" + retornaParametrizacao("criacaoFornecedorstatus");
		ticket.external_id = "" + hAPI.getCardValue("nrSubsolicitacao");
		ticket.group_id = "" + retornaParametrizacao("criacaoPortalgroupid");
		ticket.ticket_form_id = "" + retornaParametrizacao("criacaoPortalticket_form_id");
		ticket.brand_id = "" + retornaParametrizacao("criacaoPortalticketbrand");
		ticket.tags = [];
		ticket.custom_fields = [];
		ticket.fields = [];

		// Tags
		var configuracaoFilho = {};
		configuracaoFilho.colunas = [];
		configuracaoFilho.colunas.push("tablecriacaoFornecedorTagsdesc");
		configuracaoFilho.dataset = "dscanaisOnboardParametrizacao";
		configuracaoFilho.tabela = "tablecriacaoFornecedorTags";
		configuracaoFilho.where = [];

		var Tags = DatasetFactory.getDataset("dsCanaistablefilhos", [JSON.stringify(configuracaoFilho)], null, null);
		for (var i = 0; i < Tags.rowsCount; i++) {
			ticket.tags.push("" + Tags.getValue(i, configuracaoFilho.colunas[0]));
		}

		// Custom Field e Fields
		var configuracaoFilho = {};
		configuracaoFilho.colunas = [];
		configuracaoFilho.colunas.push("tablecriacaoFordescricao");
		configuracaoFilho.colunas.push("tablecriacaoFortipo");
		configuracaoFilho.colunas.push("tablecriacaoForidzendesk");
		configuracaoFilho.colunas.push("tablecriacaoForvaluezendesk");
		configuracaoFilho.dataset = "dscanaisOnboardParametrizacao";
		configuracaoFilho.tabela = "tablecriacaoFornecedor";
		configuracaoFilho.where = [];

		var CustomFields = DatasetFactory.getDataset("dsCanaistablefilhos", [JSON.stringify(configuracaoFilho)], null, null);
		for (var i = 0; i < table.rowsCount; i++) {
			ticket["" + CustomFields.getValue(i, configuracaoFilho.colunas[1])].push({ id: "" + CustomFields.getValue(i, configuracaoFilho.colunas[2]), value: "" + CustomFields.getValue(i, configuracaoFilho.colunas[3]) });
		}

		var result = this.criarTicket({ ticket: ticket });
		log.info("@SubAbeturadeChamados RestPost result.ticket.id:" + result.ticket.id);
		hAPI.setCardValue("criacaoFornecedoridticket", result.ticket.id)
		hAPI.setCardValue("_dtfornecedor", retornaDataAtual());
	},
	criarTicket: function (data) {
		var url = SERVER_ZENDESK + "/api/zendesk/1.0/tickets";
		var access_token = this.retornaTokenAccesstoken();
		var headers = [];
		var method = "POST";
		var authString = new java.lang.String(retornaParametrizacao("basicApizendesklogin") + ":" + retornaParametrizacao("basicApizendeskpassword"));
		var bytes = authString.getBytes();
		authEnc = new java.util.Base64.getEncoder().encodeToString(bytes);
		headers.push({ name: "Content-Type", key: "application/json" });
		headers.push({ name: "charset", key: "utf-8" });
		headers.push({ name: "Authorization-zendesk", key: "Basic " + authEnc });
		headers.push({ name: "Authorization", key: "Bearer " + access_token });

		return Rest(url, JSON.stringify(data), null, method, headers);

	},
	cadastroVendedorEstruturaVendas: function () {


		var mensagem = "";
		if (hAPI.getCardValue("tipoSolicMaster") == "master" && hAPI.getCardValue("slVinculoMaster") == "nao") {
			mensagem += " Código da Unidade Responsável: " + hAPI.getCardValue("cdUnidadeResponsavel") + "\\r";
			mensagem += " Unidade Responsável: " + hAPI.getCardValue("dsUnidadeResponsavel") + "\\r";
		}
		if (hAPI.getCardValue("tipoSolicMaster") == "franquia" || (hAPI.getCardValue("tipoSolicMaster") == "master" && hAPI.getCardValue("slVinculoMaster") == "sim")) {
			mensagem += " Unidade de Venda: " + hAPI.getCardValue("criacaoCoridUnidadeVenda") + "\\r";
		}

		mensagem += "E-mail do Gestor do Solicitante: " + hAPI.getCardValue("emailGestorSolicitante") + "\\r";
		mensagem += " Nome Completo: " + hAPI.getCardValue("nome") + "\\r";
		mensagem += " Segmento Que Atuará: " + this.retornaSegmentos();
		mensagem += " Perfil: ESN";
		mensagem += " CPF/CNPJ: " +  hAPI.getCardValue("cpf") + "/" + hAPI.getCardValue("nrCnpj") +  "\\r";
		mensagem += " E-mail: " + hAPI.getCardValue("_emailcorporativo") + "\\r";
		mensagem += " Endereço Completo: " + hAPI.getCardValue("endereco") + " " + hAPI.getCardValue("cep") +  " " + hAPI.getCardValue("nmMunicipio") + " " + hAPI.getCardValue("uf")  + "\\r";
		mensagem += " Estado: " + hAPI.getCardValue("uf") + "\\r";
		mensagem += " Nome Responsável: " + hAPI.getCardValue("nome") + "\\r";
		mensagem += " Telefone: " + hAPI.getCardValue("telefone") + "\\r";
		mensagem += " Tipo Atendimento: BASE E NOVOS";

		mensagem += " Por favor após terminar atividade clique aqui: " + retornaParametrizacao("nmUrl") + "/" + hAPI.getCardValue("token") + "/" + Activity.JOIN_CHAMADOS + "/6/" + Activity.USUARIO_CRM_VENDAS;


		var ticket = {};
		ticket.subject = "" + retornaParametrizacao("criacaoEstruturatitulo");
		ticket.comment = { body: "" + retornaParametrizacao("criacaoEstruturatitulo") + "   " + mensagem };
		ticket.priority = "" + retornaParametrizacao("criacaoEstruturastatus");
		ticket.external_id = "" + hAPI.getCardValue("nrSubsolicitacao");
		ticket.group_id = "" + retornaParametrizacao("criacaoEstruturagroupid");
		ticket.ticket_form_id = "" + retornaParametrizacao("criacaoEstruturaticket_form_id");
		ticket.brand_id = "" + retornaParametrizacao("criacaoEstruturabrand");
		ticket.tags = [];
		ticket.custom_fields = [];
		ticket.fields = [];

		// Tags
		var configuracaoFilho = {};
		configuracaoFilho.colunas = [];
		configuracaoFilho.colunas.push("tablecriacaoFornecedorTagsdesc");
		configuracaoFilho.dataset = "dscanaisOnboardParametrizacao";
		configuracaoFilho.tabela = "tablecriacaoFornecedorTags";
		configuracaoFilho.where = [];

		var Tags = DatasetFactory.getDataset("dsCanaistablefilhos", [JSON.stringify(configuracaoFilho)], null, null);
		for (var i = 0; i < Tags.rowsCount; i++) {
			ticket.tags.push("" + Tags.getValue(i, configuracaoFilho.colunas[0]));
		}

		// Custom Field e Fields
		var configuracaoFilho = {};
		configuracaoFilho.colunas = [];
		configuracaoFilho.colunas.push("tablecriacaoFordescricao");
		configuracaoFilho.colunas.push("tablecriacaoFortipo");
		configuracaoFilho.colunas.push("tablecriacaoForidzendesk");
		configuracaoFilho.colunas.push("tablecriacaoForvaluezendesk");
		configuracaoFilho.dataset = "dscanaisOnboardParametrizacao";
		configuracaoFilho.tabela = "tablecriacaoFornecedor";
		configuracaoFilho.where = [];

		var CustomFields = DatasetFactory.getDataset("dsCanaistablefilhos", [JSON.stringify(configuracaoFilho)], null, null);
		for (var i = 0; i < table.rowsCount; i++) {
			ticket["" + CustomFields.getValue(i, configuracaoFilho.colunas[1])].push({ id: "" + CustomFields.getValue(i, configuracaoFilho.colunas[2]), value: "" + CustomFields.getValue(i, configuracaoFilho.colunas[3]) });
		}

		var result = this.criarTicket({ ticket: ticket });
		log.info("@SubAbeturadeChamados RestPost result.ticket.id:" + result.ticket.id);
		hAPI.setCardValue("criacaoEstruturaidticket", result.ticket.id)
		hAPI.setCardValue("_dtusuariocrm", retornaDataAtual());

	},
	retornaSegmentos: function () {
		var resultado = "";

		resultado += hAPI.getCardValue("cbSegAgroindustria") + "\\r";
		resultado += hAPI.getCardValue("cbSegConstrucao") + "\\r";
		resultado += hAPI.getCardValue("cbSegDistribuicao") + "\\r";
		resultado += hAPI.getCardValue("cbSegEducacional") + "\\r";
		resultado += hAPI.getCardValue("cbSegJuridico") + "\\r";
		resultado += hAPI.getCardValue("cbSegLogistica") + "\\r";
		resultado += hAPI.getCardValue("cbSegManufatura") + "\\r";
		resultado += hAPI.getCardValue("cbSegSaude") + "\\r";
		resultado += hAPI.getCardValue("cbSegServicos") + "\\r";
		resultado += hAPI.getCardValue("cbSegVarejo") + "\\r";
		resultado += hAPI.getCardValue("cbSegVestuario") + "\\r"; 
		resultado += hAPI.getCardValue("cbSegBeleza") + "\\r"; 
		resultado += hAPI.getCardValue("cbSegAppGestao") + "\\r";
		resultado += hAPI.getCardValue("cbSegBarRestaurante") + "\\r";
		resultado += hAPI.getCardValue("cbSegOdonto") + "\\r";

		return resultado;
	},
	retornaTokenAccesstoken: function () {
		var url = SERVER_ZENDESK + "/api/token";
		var params = "grant_type=client_credentials";
		var headers = [];
		var method = "POST";
		var authString = new java.lang.String(retornaParametrizacao("basicApimanagerlogin") + ":" + retornaParametrizacao("basicApimanagerpassword"));
		log.info("@SubAbeturadeChamados retornaParametrizacao('basicApimanagerlogin'):" + retornaParametrizacao("basicApimanagerlogin"));
		log.info("@SubAbeturadeChamados retornaParametrizacao('basicApimanagerpassword'):" + retornaParametrizacao("basicApimanagerpassword"));
		var bytes = authString.getBytes();
		authEnc = new java.util.Base64.getEncoder().encodeToString(bytes);
		headers.push({ name: "Content-Type", key: "application/x-www-form-urlencoded" });
		headers.push({ name: "charset", key: "utf-8" });
		headers.push({ name: "Accept", key: "*/*" });
		headers.push({ name: "Authorization", key: "Basic " + authEnc });


		var token = Rest(url, params, null, method, headers);

		log.info("@SubAbeturadeChamados RestPost token.access_token:" + token.access_token);

		return token.access_token;
	}
};





function Rest(url, params, login, method, headers) {
	try {




		log.info("@SubAbeturadeChamados RestPost url:" + url);
		var wurl = new java.net.URL(url);

		var conn = wurl.openConnection();


		if (method == "POST")
			conn.setDoOutput(true);

		conn.setRequestMethod(method);
		log.info("@SubAbeturadeChamados RestPost method:" + method);
		conn.setInstanceFollowRedirects(false);

		for (i = 0; i < headers.length; i++) {
			log.info("@SubAbeturadeChamados RestPost headers[i].name:'" + headers[i].name + "' headers[i].key:'" + headers[i].key + "'");
			conn.setRequestProperty(headers[i].name, headers[i].key);
		}

		if (method == "POST") {
			conn.setUseCaches(false);
			var writer = new java.io.OutputStreamWriter(conn.getOutputStream());
			log.info("@SubAbeturadeChamados RestPost conn.getOutputStream():'" + conn.getOutputStream() + "'");
		}


		if (params) {
			writer.write(params);
			log.info("@SubAbeturadeChamados RestPost params:'" + params + "'");
			writer.flush();
		}


		log.info("@SubAbeturadeChamados RestPost conn.getResponseCode():'" + conn.getResponseCode() + "'");
		var line;
		log.info("@SubAbeturadeChamados RestPost conn.getInputStream():'" + conn.getInputStream() + "'");
		var reader = new java.io.BufferedReader(new java.io.InputStreamReader(conn.getInputStream()));
		log.info("@SubAbeturadeChamados RestPost reader:'" + reader + "'");

		var response = new java.lang.StringBuffer();

		while ((line = reader.readLine()) != null) {
			log.info("@SubAbeturadeChamados RestPost line:'" + line + "'");
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

function retornaDataAtual() {

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!

	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	return dd + '/' + mm + '/' + yyyy;

}