var PRD = "https://187.94.57.182";
var HML = "http://172.24.52.14:8091";
var SERVER = HML;
function servicetask111(attempt, message) {
	
	var proposta = hAPI.getCardValue("proposta");
	log.info("@servicetask111 diz idproposta" + proposta);
	var url = SERVER + "/rest/WSGETREPORT?Proposta=" + proposta;
	var c1 = DatasetFactory.createConstraint("url", url, url, ConstraintType.MUST);
	var constraints = [c1];
	var dataset = DatasetFactory.getDataset("dsGenericGetRestNoAuth", null, constraints, null);
	data = dataset.getValue(0, "response");
	if (data == "undefined"){
		log.info("@servicetask111 diz: data" + data);
	}else{
		log.info("@servicetask111 diz: data" + data);
		hAPI.setCardValue("jsonGrafico", data);
	}

}