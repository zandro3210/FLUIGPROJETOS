var PRD = "https://wscorp.totvs.com.br";
var HML = "http://172.24.52.10:8048";
var SERVER = PRD;

function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();	
	
	var constraintNames = ["codUnidade"];
	var map = ConstraintUtils.getConstraintsValue(constraints, constraintNames);
	log.info("#map: "+map);	
	if(map.get("codunidade") == null){
		log.error("@dsCanaisDadosUnidade/createDataset diz: Constraint codUnidade deve ser informada!");
		return null;
	}
			
	var unitData = DsCanaisUnidade.getUnitData(map.get("codunidade"));
	
	dataset.addColumn("RazaoSocial");
	dataset.addColumn("Endereco");
	dataset.addColumn("Municipio");
	dataset.addColumn("Estado");
	dataset.addColumn("CEP");
	dataset.addColumn("CNPJ");
	
	if(unitData.result){
		dataset.addRow([unitData.obj.RazaoSocial,
		                unitData.obj.Endereco,
		                unitData.obj.Municipio,
		                unitData.obj.Estado,
		                unitData.obj.CEP,
		                unitData.obj.CNPJ]);
	}
	
	return dataset;
}

var DsCanaisUnidade = {
		/** Retorna o status do municipio. **/
		getUnitData: function(codUnidade){			
			var urlWithParams = SERVER+"/DadosUnidade?Unidade="+codUnidade;
			var unitData = this.callDatasetRest(urlWithParams);

			return unitData;
		},
		callDatasetRest: function(urlWithParams){
			log.info('@dsCanaisDadosUnidade/callDatasetRest diz: urlWithParams = '+urlWithParams);
			var c1 = DatasetFactory.createConstraint("url", urlWithParams, urlWithParams, ConstraintType.MUST);
			var constraints = [c1];
		    var dataset = DatasetFactory.getDataset("dsGenericRest", null, constraints, null);
		    var string = dataset.getValue(0, "response");
		    
		    return this.toJson(string);
		},
		toJson: function(string){
			try{
				return JSON.parse(string);
			}
			catch (e) {
				string = this.removeTab(string);
				return JSON.parse(string);
			}
		},
		removeTab: function(string){
			return String(string).replace(/\t/g,'');
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
		log.info("#getConstraintsValue constraints: "+constraints);
		log.info("#getConstraintsValue constraintNames: "+constraintNames);
	    var map = this.constraintToMap(constraints);
	     
	    for(var i=0; i<constraintNames.length; i++){
	        var constraintValue = map.get(constraintNames[i]); 
			log.info("#constraintValue: "+constraintValue);
	        if(constraintValue == null) log.warn("Constraint "+constraintNames[i]+" esta com valor nulo.");
	    }
	     
	    return map;
	},
	/** Converte as Contraints em HashMap **/
	constraintToMap: function(constraints){
		log.info("#constraintToMap constraints: "+constraints);
	    if(constraints == null) 
			return null;
	     
	    var map = new java.util.HashMap();
	         
	    for(var i=0; i<constraints.length; i++){
	        map.put(constraints[i].fieldName.toLowerCase(), constraints[i].initialValue);
	    }
	     
	    return map;
	}		
}