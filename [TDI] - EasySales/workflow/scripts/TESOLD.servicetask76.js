var PRD = "https://187.94.57.182";
var HML = "http://172.24.52.14:8091";
var SERVER = HML;

function servicetask76(attempt, message) {
	log.info("@servicetask76 diz: inicio");
	var groupSels = JSON.parse(hAPI.getCardValue("jsonGruposPerguntasSel"));
	log.info("@servicetask76 diz: 1");
	for (var key in groupSels) {
		log.info("@servicetask76 diz: 2");
		CustomServiceTaskProposal.sendProposal(groupSels[key]);
	}
	var proposta = hAPI.getCardValue("proposta");
	log.info("@servicetask76 diz idproposta" + proposta);
	var url = SERVER + "/rest/WSGETREPORT?Proposta=" + proposta;
	var c1 = DatasetFactory.createConstraint("url", url, url, ConstraintType.MUST);
	var constraints = [c1];
	var dataset = DatasetFactory.getDataset("dsGenericGetRestNoAuth", null, constraints, null);
	data = dataset.getValue(0, "response");
	log.info("@servicetask76 diz: data" + data);
	hAPI.setCardValue("jsonGrafico", data);
	//return true;
}

var CustomServiceTaskProposal = {
	/** Envia os dados da proposta para o Easy Sales **/
	sendProposal: function (groupName) {
		log.info("@servicetask76 diz: 3");
		var data = this.callSoap(this.getHeader(), this.getHeaderCont(groupName), this.getItem(), this.getItemCont());
		log.info("@CustomServiceTaskProposal/sendProposal diz: data = " + data);
	},
	getHeader: function () {
		log.info("@servicetask76 diz: 4");
		var header = "PJ8_FILIAL|PJ8_PAIS|PJ8_EAR|PJ8_GAR1|PJ8_DESC|PJ8_PROPUE|PJ8_CODCLI|PJ8_LOJA|PJ8_SEGCLI|PJ8_CLICON|PJ8_CONTEL|PJ8_CONMAI|PJ8_CLIMUN|PJ8_CLIEST|PJ8_PROPOS|PJ8_PREVIS|PJ8_OPORTU|PJ8_OREVIS|PJ8_ENTIDA|PJ8_MODORI|PJ8_XIDFLG|PJ8_STATUS|PJ8_CODPRO|PJ8_LJPROS";
		log.info("@CustomServiceTaskProposal/getHeader diz: header = " + header);
		return header;
	},
	getHeaderCont: function (groupName) {
		log.info("@servicetask76 diz: 5");
		var ear = this.getEarData();
		log.info("@CustomServiceTaskProposal/getHeaderCont diz: ear = " + JSON.stringify(ear));
		var entity = hAPI.getCardValue("dpNrEntidade");
		var pj8_codCli = (entity == "1") ? hAPI.getCardValue("dcCodigo") : "";
		var pj8_loja = (entity == "1") ? hAPI.getCardValue("dcLoja") : "";
		var pj8_codPro = (entity == "2") ? hAPI.getCardValue("dcCodigo") : "";
		var pj8_ljPros = (entity == "2") ? hAPI.getCardValue("dcLoja") : "";
		var groups = this.getAsksGroupsData(groupName);
		var header = ear.codunidade + "|";
		header += "105|";
		header += ear.codigo + "|";
		header += ear.GAR[0].codigo + "|";
		header += hAPI.getCardValue("proposta") + "|";
		header += groups + "|";
		header += pj8_codCli + "|";
		header += pj8_loja + "|";
		header += hAPI.getCardValue("dcCodseg") + "|";
		header += hAPI.getCardValue("dcContato") + "|";
		header += hAPI.getCardValue("dcDdd") + hAPI.getCardValue("dcTelefone") + "|";
		header += hAPI.getCardValue("dcEmail") + "|";
		header += hAPI.getCardValue("dcCidade") + "|";
		header += hAPI.getCardValue("dcUf") + "|";
		header += hAPI.getCardValue("proposta") + "|";
		header += hAPI.getCardValue("dpNrRevisao") + "|";
		header += hAPI.getCardValue("dpNrOportunidade") + "|";
		header += hAPI.getCardValue("dpNrRevisao") + "|";
		//header+= hAPI.getCardValue("dcPessoa")+"|";		
		header += hAPI.getCardValue("dpNrEntidade") + "|";
		header += this.getModels() + "|";
		header += hAPI.getCardValue("nrSolicitacao") + "|";
		header += hAPI.getCardValue("dpStatus") + "|";
		header += pj8_codPro + "|";
		header += pj8_ljPros;

		log.info("@CustomServiceTaskProposal/getHeaderCont diz: header = " + header);
		return header;
	},
	getItem: function () {
		log.info("@servicetask76 diz: 6");
		var def = "PJE_FILIAL|PJE_PAIS|PJE_NIVEL|PJE_CODPRG|PJE_RESPUE|PJE_OBS|PJE_PAI|";

		log.info("@CustomServiceTaskProposal/getItem diz: def = " + def);
		return def;
	},
	getItemCont: function () {
		log.info("@servicetask76 diz: 7");
		var ear = this.getEarData();
		var itens = JSON.parse(hAPI.getCardValue("jsonRespostas"));
		var def = [];

		for (var i = 0; i < itens.length; i++) {
			var item = itens[i];
			log.info("@CustomServiceTaskProposal/getItemCont diz: item = " + JSON.stringify(item));
			var askCode = item.name.replace("ask_", "");
			var askParams = this.getAskParams(askCode);
			var askCodigo = askCode.replace("___", ".");
			var pai = (askParams.pai == undefined) ? "" : askParams.pai;
			var obs = (askParams.obs == undefined) ? "" : askParams.obs;
			def.push(ear.codunidade + "|105|" + askParams.nivel + "|" + askCodigo + "|" + item.value + "|" + obs + "|" + pai);
		}

		log.info("@CustomServiceTaskProposal/getItemCont diz: def = " + def.join("<#>"));

		return def.join("<#>");
	},
	getAskParams: function (code) {
		code = code.replace("___", ".");
		var aux = hAPI.getCardValue("jsonPerguntas");
		log.info("@CustomServiceTaskProposal/getAskParams diz: aux = " + aux);
		var asks = JSON.parse(aux.replaceAll("&quot;", "'"));
		log.info("@CustomServiceTaskProposal/getAskParams diz: code = " + code);
		for (var i = 0; i < asks.length; i++) {
			var ask = asks[i];
			//		log.info("@CustomServiceTaskProposal/getAskParams diz: item = "+JSON.stringify(ask));
			if (ask.codigo == code) return ask;
		}

		return 'ERROR';
	},
	getEarData: function () {
		var ears = JSON.parse(hAPI.getCardValue("jsonExecutivo")).EXECUTIVOS;
		var earSel = hAPI.getCardValue("dsNmExecutivo");

		for (var i = 0; i < ears.length; i++) {
			var ear = ears[i];
			if (ear.nome == earSel) return ear;
		}

		return "ERROR";
	},
	getAsksGroupsData: function (groupName) {
		var models = JSON.parse(hAPI.getCardValue("jsonModelos"));
		var AllGroups = JSON.parse(hAPI.getCardValue("jsonGruposPerguntas"));
		//var groupSels = JSON.parse(hAPI.getCardValue("jsonGruposPerguntasSel"));

		for (var i = 0; i < models.length; i++) {
			var model = models[i];
			//var index = "switch_"+model.codigo;
			//var groupName = groupSels[index];
			var groupsOfModel = AllGroups[model.modori].asksGroups;
			for (var j = 0; j < groupsOfModel.length; j++) {
				var groupOfModel = groupsOfModel[j];
				if (groupOfModel.nome == groupName) return groupOfModel.codigo;
			}
		}

		return "ERROR";
	},
	getGrupoCode: function (desc) {
		var groups = JSON.parse(hAPI.getCardValue("jsonGruposPerguntas"));
		for (var i = 0; i < groups.length; i++) {
			var group = groups[i];
			if (group.nome == desc) return group.codigo;
		}

	},
	getModels: function () {
		var models = JSON.parse(hAPI.getCardValue("jsonModelos"));
		var data = [];

		for (var i = 0; i < models.length; i++) {
			var model = models[i];
			data.push(model.modori);
		}

		return data.join("|");
	},
	/** Faz a chamada ao webservice **/
	callSoap: function (headerdef, headercont, itemdef, itemcont) {
		try {
			var serviceInstantiate = ServiceManager.getServiceInstance("WSTESPROPOSAL");
			var locator = serviceInstantiate.instantiate("br.com.microsiga.webservices.tesservices.WSTESPROPOSAL");
			var service = locator.getWSTESPROPOSALSOAP();
			this.ToolsSoap(headerdef, headercont, itemdef, itemcont);
			var data = service.writeprop("XXYYZZ", '3', headerdef, headercont, itemdef, itemcont);
		
			return data;
		} catch (e) {
			log.error("@CustomServiceTaskProposal/callSoap diz: Erro na integracao: " + e);
			throw "Um erro inesperado ocorreu. Detalhes: " + e;
		}
	},
	ToolsSoap: function(headerdef, headercont, itemdef, itemcont){
		var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tes="http://webservices.microsiga.com.br/TESServices"> <soapenv:Header/> <soapenv:Body> <tes:WRITEPROP> <tes:ID>{{ID}}</tes:ID> <tes:OPERATION>{{OPERATION}}</tes:OPERATION> <tes:HEADERDEF>{{HEADERDEF}}</tes:HEADERDEF> <tes:HEADERCONT>{{HEADERCONT}}</tes:HEADERCONT> <tes:ITEMDEF>{{ITEMDEF}}</tes:ITEMDEF> <tes:ITEMCONT>{{ITEMCONT}}</tes:ITEMCONT> </tes:WRITEPROP> </soapenv:Body> </soapenv:Envelope>';
		xml = xml.replace("{{ID}}","XXYYZZ");
		xml = xml.replace("{{OPERATION}}","3");
		xml = xml.replace("{{HEADERDEF}}",headerdef);
		xml = xml.replace("{{HEADERCONT}}",headercont);
		xml = xml.replace("{{ITEMDEF}}",itemdef);
		xml = xml.replace("{{ITEMCONT}}",itemcont);
		log.info("@CustomServiceTaskProposal soap = '" + xml + "'");
	}
}

