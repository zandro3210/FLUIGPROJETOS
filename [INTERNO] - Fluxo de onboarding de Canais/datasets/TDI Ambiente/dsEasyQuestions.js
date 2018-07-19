function createDataset(fields, constraints, sortFields) {
	log.error('@EasyQuestions/getGroup start');
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("nivel");
	dataset.addColumn("codigo");
	dataset.addColumn("pai");
	dataset.addColumn("obs");
	dataset.addColumn("nome");
	dataset.addColumn("tipo");
	dataset.addColumn("opcoes");
	dataset.addColumn("padrao");
	dataset.addColumn("modulo");
	dataset.addColumn("nomemodulo");

	var group = DsEasyQuestions.getGroup(constraints);

	if (group == null) return null;

	log.error('@EasyQuestions/group: ' + group);
	var asks = DsEasyQuestions.getAsks(group);
	log.error('@EasyQuestions/asks: ' + asks);

	log.error('@EasyQuestions/asks.size(): ' + asks.size());
	
	for (var i = 0; i < asks.size(); i++) {
		var x = asks.get(i);
		var index = x.getINDEX();
		var code = x.getCODE();
		var owner = x.getOWNER();
		var obs = x.getOBS()
		var value = x.getDEFAULT();
		var name = x.getDESC()
		var type = x.getTYPE();
		var modulo = x.getMODULO();
		var options = x.getOPTIONS();
		var nomemodulo = x.getNOMEMODULO();
		dataset.addRow([index, code, owner, obs, name, type, options, value, modulo, nomemodulo]);
	}

	return dataset;
}

var DsEasyQuestions = {
	/** Retorna o codigo do grupo enviado via constraint. **/
	getGroup: function (constraints) {
		if (constraints.length == 0 || constraints[0].fieldName.toLowerCase() != "grupo") {
			log.error('@DsEasyQuestions/getGroup diz: constraint grupo é obrigatória.');
			return null;
		}
		else return constraints[0].initialValue;
	},
	/** Retorna uma lista com as perguntas **/
	getAsks: function (groupId) {


		var service = this.callSoap();
		log.error('@DsEasyQuestions/ service' + service);
		var DATAQUESTIONRETURN = service.questions('105', groupId);
		log.error('@DsEasyQuestions/ DATAQUESTIONRETURN' + DATAQUESTIONRETURN);
		var ARRAYOFQUESTION = DATAQUESTIONRETURN.getDETAIL();
		log.error('@DsEasyQuestions/ ARRAYOFQUESTION' + ARRAYOFQUESTION);
		return ARRAYOFQUESTION.getQUESTION();
	},
	/** Faz a chamada ao webservice **/
	callSoap: function () {
		var serviceInstantiate = ServiceManager.getServiceInstance("TESSERVICES");
		var locator = serviceInstantiate.instantiate("br.com.microsiga.webservices.tesservices.TESSERVICES");
		return locator.getTESSERVICESSOAP();
	}
	
}