function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	var urlWithParams;
	var object;
	var date = getFirstDay();
		
	for(var i=0; i<12; i++){		
		urlWithParams = "https://prewscorp.totvs.com.br/TCRMS028?data="+dateToStringBr(date);
		object = getDatasetRest(urlWithParams);

		if(isValid(object)) break;
		date = lessMonth(date);
	}
		
	dataset.addColumn("TIU");
	dataset.addColumn("DATA");
	dataset.addRow([object.DATA.TIU,dateToStringBr(date)]);
	
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
    
    return JSON.parse(string);
}

function isValid(response){
	return response.STATUS == "200";
}

function lessMonth(date){
	var calendar = java.util.Calendar.getInstance();
    calendar.setTime(date);
    calendar.add(java.util.Calendar.MONTH, -1);        
	
	return calendar.getTime();
}

/**
 * Converte um objeto Date para uma string no padrao dd/mm/yyyy.
 * 
 * @param date: Data a ser convertida.
 * @returns String.
 */
function dateToStringBr(date){
    var formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
      
    return formatter.format(date);
}

/**
 * Retorna a data definida no primeiro dia do mes atual.
 * 
 * @returns Date.
 */
function getFirstDay(){
	var calendar = java.util.Calendar.getInstance();
    calendar.set(java.util.Calendar.DAY_OF_MONTH, 1);
    
	return calendar.getTime();
}