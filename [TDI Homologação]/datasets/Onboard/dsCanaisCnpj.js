var PRD = "https://wscorp.totvs.com.br";
var HML = "http://104.41.46.242:8084";
var SERVER = HML;

function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	var constraintNames = ["cnpj"];
	var map = ConstraintUtils.getConstraintsValue(constraints, constraintNames);
	log.info('dsCanaisCNPJ map:  '+ map);
	if(map.get("cnpj") == null){
		log.error("@dsCanaisCnpj/createDataset diz: Constraint cnpj deve ser informada!");
		return null;
	}
		
	dataset.addColumn("cnpjOk");
	log.info('dsCanaisCNPJ map.get("cnpj"):  '+ map.get("cnpj"));
	isOk = DsCanaisCnpj.getCnpjStatus(map.get("cnpj"));
	log.info('dsCanaisCNPJ isOk:  '+ isOk);
	dataset.addRow([isOk]);
	
	return dataset;
}

var DsCanaisCnpj = {
	/** Retorna o status do cnpj. **/
	getCnpjStatus: function(cnpj){
		var urlWithParams = SERVER+"/SAASJURI/existprocess/"+cnpj;
		var credential = this.getCredential();
		log.info('dsCanaisCNPJ iniciando a consulta');
		var status = this.callDatasetRest(urlWithParams, credential.user, credential.password);
		log.info('dsCanaisCNPJ status.result:  '+ status.result);
		return status.result;
	},
	getCredential: function(){
		var c1 = DatasetFactory.createConstraint("type", "canaisProtheus", "canaisProtheus", ConstraintType.MUST);
		var constraints = [c1];
	    var dataset = DatasetFactory.getDataset("dsConnector", null, constraints, null);
	    var credential = {user: dataset.getValue(0, "user"), password: dataset.getValue(0, "password")};
		log.info('dsCanaisCNPJ user:  '+ dataset.getValue(0, "user"));
		log.info('dsCanaisCNPJ password:  '+ dataset.getValue(0, "password"));
	    return credential;
	},
	callDatasetRest: function(urlWithParams, user, password){
		log.info('@dsCanaisCnpj/callDatasetRest diz: urlWithParams = '+urlWithParams);
		var c1 = DatasetFactory.createConstraint("url", urlWithParams, urlWithParams, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("user", user, user, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("password", password, password, ConstraintType.MUST);
	    var constraints = [c1, c2, c3];
	    var dataset = DatasetFactory.getDataset("dsGenericRest", null, constraints, null);
	    var string = dataset.getValue(0, "response");
	    
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
