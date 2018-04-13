function createDataset(fields, constraints, sortFields) {
	var email = getEmail(constraints);
	
	if(email == null) return null;
	
	var dataset = DatasetBuilder.newDataset();
	var urlWithParams = "https://wscorp.totvs.com.br/TCRMS022A?cEmail="+email;
	var object = getDatasetRest(urlWithParams);
	
	dataset.addColumn("NOMEVEND");
	dataset.addColumn("CODVEND");
	
	for(var i=0; i<object.VENDEDORES.length; i++){
		var row = [];
		
		row.push(object.VENDEDORES[i].NOMEVEND);
		row.push(object.VENDEDORES[i].CODVEND);
		
		dataset.addRow(row);
	}	
	
	return dataset;
}

/**
 * Retorna o valor da constraint email.
 * @param constraints
 * @returns String.
 */
function getEmail(constraints){
	if(constraints == null || constraints.length == 0 || constraints[0].fieldName.toLowerCase() != "email"){
		log.error("Constraint email deve ser informada!");
		return null;
	}
	else return constraints[0].initialValue;
}

/**
 * Acessa o dataset que faz requsicao rest.
 * @param urlWithParams: url
 * @returns Object.
 */
function getDatasetRest(urlWithParams){
	var c1 = DatasetFactory.createConstraint("url", urlWithParams, urlWithParams, ConstraintType.MUST);
    var constraints = [c1];
    var dataset = DatasetFactory.getDataset("dsGenericGetRestNoAuth", null, constraints, null);
    var string = dataset.getValue(0, "response");
    
    return JSON.parse(string);
}