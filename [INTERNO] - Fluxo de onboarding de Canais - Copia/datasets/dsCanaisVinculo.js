var PRD = "https://wscorp.totvs.com.br";
//var HML = "http://172.24.28.197:8048";
var HML = "http://172.24.52.10:8048";
var SERVER = PRD;

function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	var constraintNames = ["cpf"];
	var map = ConstraintUtils.getConstraintsValue(constraints, constraintNames);
	
	if(map.get("cpf") == null){
		log.error("@dsCanaisVinculo/createDataset diz: Constraint cpf deve ser informada!");
		return null;
	}
		
	dataset.addColumn("vinculoOk");
	
	isOk = DsCanaisVinculo.getCpfStatus(map.get("cpf"));
	dataset.addRow([isOk]);
	
	return dataset;
}

var DsCanaisVinculo = {
	/** Retorna o status do cpf. **/
	getCpfStatus: function(cpf){
		var urlWithParams = SERVER+"/VALIDACAODECPF?cpf="+cpf;
		var status = this.callDatasetRest(urlWithParams);

		return JSON.stringify(status);
	},
	callDatasetRest: function(urlWithParams){
		log.info('@dsCanaisVinculo/callDatasetRest diz: urlWithParams = '+urlWithParams);
		var c1 = DatasetFactory.createConstraint("url", urlWithParams, urlWithParams, ConstraintType.MUST);
	    var constraints = [c1];
	    var dataset = DatasetFactory.getDataset("dsGenericRest", null, constraints, null);
	    var string = dataset.getValue(0, "response");
	    log.info('@dsCanaisVinculo/callDatasetRest diz: string = '+string);
	    return JSON.parse(string);
	}
}

var ConstraintUtils = {
	/**
	 * Captura o valor das constraints enviadas ao dataset.
	 * 
	 * @param constraints: Array de constraints.
	 * @param constraintNames: Array com o nome das constraints obrigatorias para o dataset.
	 * 
	 * @returns HashMap<String,String>
	 */
	getConstraintsValue: function(constraints, constraintNames){
	    var map = this.constraintToMap(constraints);
	     
	    for(var i=0; i<constraintNames.length; i++){
	        var constraintValue = map.get(constraintNames[i]); 
	        if(constraintValue == null) log.warn("Constraint "+constraintNames[i]+" esta com valor nulo.");
	    }
	     
	    return map;
	},
	/** Converte as Contraints em HashMap **/
	constraintToMap: function(constraints){
	    if(constraints == null) return null;
	     
	    var map = new java.util.HashMap();
	         
	    for(var i=0; i<constraints.length; i++){
	        map.put(constraints[i].fieldName.toLowerCase(), constraints[i].initialValue);
	    }
	     
	    return map;
	}		
}