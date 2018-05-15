var PRD = "https://wscorp.totvs.com.br";
var HML = "http://172.24.52.10:8048";
var SERVER = HML;

function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	var constraintNames = ["city"];
	var map = ConstraintUtils.getConstraintsValue(constraints, constraintNames);
		
	if(map.get("city") == null){
		log.error("@dsCanaisCnpj/createDataset diz: Constraint city deve ser informada!");
		return null;
	}
		
	dataset.addColumn("capilaridadeOk");
	
	isOk = DsCanaisCapilaridade.getCityStatus(map.get("city"));
	dataset.addRow([isOk]);
	
	return dataset;
}

var DsCanaisCapilaridade = {
	/** Retorna o status do municipio. **/
	getCityStatus: function(city){
		city = encodeURI(city);
		var urlWithParams = SERVER+"/VagasDisponiveis?Municipio="+city;
		var cityDetails = this.callDatasetRest(urlWithParams);

		return this.isOk(cityDetails);
	},
	callDatasetRest: function(urlWithParams){
		log.info('@dsCanaisCapilaridade/callDatasetRest diz: urlWithParams = '+urlWithParams);
		var c1 = DatasetFactory.createConstraint("url", urlWithParams, urlWithParams, ConstraintType.MUST);
		var constraints = [c1];
	    var dataset = DatasetFactory.getDataset("dsGenericRest", null, constraints, null);
	    var string = dataset.getValue(0, "response");
	    
	    return JSON.parse(string);
	},
	isOk: function(cityDetails){
		var vacancy = parseInt(cityDetails.Vagas);
		var reserved = parseInt(cityDetails["Reservados Fluig"]);
		var total = vacancy - reserved;
		
		if(vacancy > 0 && cityDetails.STATUS == "ABERTO") return JSON.stringify(cityDetails);
		else return false;
	}
};

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