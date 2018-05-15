function capillarityUtils(){
	
}

function verifyCapillarity(){
	log.info("#verifyCapillarity");
	var city = hAPI.getCardValue("nmMunicipio");
	var c1 = DatasetFactory.createConstraint("city", city, city, ConstraintType.MUST);
	var constraints = new Array(c1);
	var dataset = DatasetFactory.getDataset("dsCanaisCapilaridade", null, constraints, null);
	var isOk = "false";
	
	if(dataset && dataset.rowsCount > 0) 
		isOk = dataset.getValue(0, "capilaridadeOk");

	return isOk;
}

function handleCapillarity(action,idSpreadSheet,idItem,idTerritory,idMunicipio){
	log.info("#handleCapillarity");
	var state = hAPI.getCardValue("uf");
	var city = encodeURI(idMunicipio);
	
	var urlWithParams = "http://172.24.52.10:8048/TrataMunicipio?Item_Planilha=";
	//var urlWithParams = "https://wscorp.totvs.com.br/TrataMunicipio?Item_Planilha=";
	
	urlWithParams += '{'+
						'"'+action+'":'+
									'{'+
									 	'"PO0_NRPLAN":"'+idSpreadSheet+'",'+
									 	'"PO0_ITEM":"'+idItem+'",'+
									 	'"PO0_EST":"'+state+'",'+
									 	'"PO0_MUN":"'+city+'",'+
									 	'"PO0_CODTER":"'+idTerritory+'"'+
									 '}'+
					'}';
	
	
	var capReturn = callDatasetRest(urlWithParams);
	
	return capReturn.Status;
}

function callDatasetRest(urlWithParams){
	log.info('#CALLDATSET CAPILARIDADE = '+urlWithParams);
	var c1 = DatasetFactory.createConstraint("url", urlWithParams, urlWithParams, ConstraintType.MUST);
	var constraints = [c1];
    var dataset = DatasetFactory.getDataset("dsGenericRest", null, constraints, null);
    var string = dataset.getValue(0, "response");
    
    return JSON.parse(string);
}