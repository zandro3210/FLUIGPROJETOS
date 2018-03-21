function createDataset(fields, constraints, sortFields) {
	var esn = null;
	var NUMERO = null;
	
	if(constraints!=null){
		for (var i=0 ; i < constraints.length ; i++){
			if (constraints[i].fieldName.toLowerCase() == "esn"){
				esn = constraints[i].initialValue;
			}else if (constraints[i].fieldName.toLowerCase() == "numero"){
				NUMERO = constraints[i].initialValue;
			}
		}
	}
	
	if(esn == null) return null;
	
	var dataset = DatasetBuilder.newDataset();
	var urlWithParams = "https://wscorp.totvs.com.br/TCRMS022B?cESN="+esn;
	var object = getDatasetRest(urlWithParams);
	
	dataset.addColumn("NUMERO");
	dataset.addColumn("DESCRICAO");
	dataset.addColumn("ENTIDADE");
	dataset.addColumn("CODIGO");
	dataset.addColumn("NOME");
	dataset.addColumn("SEGMENTO");
	dataset.addColumn("CODUNID");
	dataset.addColumn("UNIDADE");
		
	for(var i=0; i<object.OPORTUNIDADES.length; i++){
		if(NUMERO == null || object.OPORTUNIDADES[i].NUMERO.indexOf(NUMERO) > -1){
			var row = [];
			row.push(object.OPORTUNIDADES[i].NUMERO);
			row.push(object.OPORTUNIDADES[i].DESCRICAO);
			row.push(object.OPORTUNIDADES[i].ENTIDADE);
			row.push(object.OPORTUNIDADES[i].CODIGO);
			row.push(object.OPORTUNIDADES[i].NOME);
			row.push(object.OPORTUNIDADES[i].SEGMENTO);
			row.push(object.OPORTUNIDADES[i].CODUNID);
			row.push(object.OPORTUNIDADES[i].UNIDADE);		
			
			dataset.addRow(row);
		}
	}	
	
	return dataset;
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
    
    return JSON.parse(string.replace("\t",""));
}