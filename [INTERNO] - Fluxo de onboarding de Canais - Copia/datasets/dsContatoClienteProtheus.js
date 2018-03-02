function createDataset(fields, constraints, sortFields) {
	var entity = getConstraintValue(constraints, "entidade");
	var opportunity = getConstraintValue(constraints, "oportunidade");
	
	if(entity == null || opportunity == null) return null;
	
	var dataset = DatasetBuilder.newDataset();
	var urlWithParams = "https://wscorp.totvs.com.br/TCRMS022C?cEntidade="+entity+"&cCodigo="+opportunity;
	var object = getDatasetRest(urlWithParams);
	
	dataset.addColumn("CODIGO");
	dataset.addColumn("NOME");
	dataset.addColumn("EMAIL");
	dataset.addColumn("FONE");
	
	for(var i=0; i<object.CONTATOS.length; i++){
		var row = [];
		row.push(object.CONTATOS[i].CODIGO);
		row.push(object.CONTATOS[i].NOME);
		row.push(object.CONTATOS[i].EMAIL);
		row.push(object.CONTATOS[i].FONE);
		
		dataset.addRow(row);
	}	
	
	return dataset;
}

/**
 * Retorna o valor inicial de uma constraint.
 * 
 * @param constraints
 * @param constraintName: Nome da constraint.
 * @returns String.
 */
function getConstraintValue(constraints, constraintName){
	if(constraints == null || constraints.length == 0){
		log.error("Constraint "+constraintName+" deve ser informada!");
		return null;
	}
	
	for(var i=0; i<constraints.length; i++){
		if(constraints[i].fieldName.toLowerCase() == constraintName.toLowerCase()) return constraints[i].initialValue
	}
	
	log.error("Constraint "+constraintName+" deve ser informada!");
	return null;
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