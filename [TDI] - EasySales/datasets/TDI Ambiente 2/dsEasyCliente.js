var PRD = "http://ttvprtv3app08.cp.totvs.com.br:8048";
var HML = "http://172.24.52.10:8049";
var SERVER = PRD;

function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	var constraintNames = ["codigo","entidade"];
	var map = ConstraintUtils.getConstraintsValue(constraints, constraintNames);
	
	if(map.get("codigo") == null){
		log.error("@dsEasyCliente/createDataset diz: Constraint codigo deve ser informada!");
		return null;
	}
	if(map.get("entidade") == null){
		log.error("@dsEasyCliente/createDataset diz: Constraint entidade deve ser informada!");
		return null;
	}
	
	var customer = DsEasyCliente.getCustomer(map.get("codigo"), map.get("entidade"));
	var row = [
				customer.codigo,
				customer.loja,
				customer.cgc.trim(),
				customer.nome,
				customer.nreduz,
				customer.pessoa,
				customer.tipo,
				customer.codseg,
				customer.endereco,
				customer.bairro,
				customer.cidade,
				customer.uf,
				customer.cep,
				customer.complemento,
				customer.ddd,
				customer.telefone,
				customer.email,
				customer.contato
	           ];
	
	dataset.addColumn("codigo");
	dataset.addColumn("loja");
	dataset.addColumn("cgc");
	dataset.addColumn("nome");
	dataset.addColumn("nreduz");
	dataset.addColumn("pessoa");
	dataset.addColumn("tipo");
	dataset.addColumn("codseg");
	dataset.addColumn("endereco");
	dataset.addColumn("bairro");
	dataset.addColumn("cidade");
	dataset.addColumn("uf");
	dataset.addColumn("cep");
	dataset.addColumn("complemento");
	dataset.addColumn("ddd");
	dataset.addColumn("telefone");
	dataset.addColumn("email");
	dataset.addColumn("contato");
	
	dataset.addRow(row);
	
	return dataset;
}

var DsEasyCliente = {
	/** Retorna o codigo do cliente enviado via constraint. **/
	getCode: function(constraints){
	    if(constraints.length == 0 || constraints[0].fieldName.toLowerCase() != "codigo"){
	        log.error('@dsEasyCliente/getCode diz: constraint codigo é obrigatória.');
	        return null;
	    }
	    else return constraints[0].initialValue;
	},
	/** Retorna a entidade enviado via constraint. **/
	getEntity: function(constraints){
	    if(constraints.length == 0 || constraints[0].fieldName.toLowerCase() != "entidade"){
	        log.error('@dsEasyCliente/getEntity diz: constraint entidade é obrigatória.');
	        return null;
	    }
	    else return constraints[0].initialValue;
	},
	/** Retorna o cliente. **/
	getCustomer: function(customerId, entity){
		var urlWithParams = SERVER+"/rest/WSRGT12CLI/"+customerId+"/"+entity;
		var customer = this.callDatasetRest(urlWithParams);
		//var customer = {"codigo": "TEXHMP","loja": "00","cgc": "38342172635 ","nome": "TDI TESTE SUSTENTACAO INOVACAO","nreduz": "TDI TESTE SUSTENTACAO / INOVACAO","pessoa": "F","tipo": "F","codseg": "000003","endereco": "AV BRAS LEME","bairro": "SANTANA","cidade": "SAO PAULO","uf": "SP","cep": "02511000","complemento": "","ddd": "011","telefone": "20997099","email": "teste@teste","contato": ""};
		
		if(customer.hasOwnProperty("errorCode")) return null; 
		else return customer;
	},
	/** Executa a chamada ao dataset generico de rest. **/
	callDatasetRest: function(urlWithParams){
		var c1 = DatasetFactory.createConstraint("url", urlWithParams, urlWithParams, ConstraintType.MUST);
	    var constraints = [c1];
	    var dataset = DatasetFactory.getDataset("dsGenericGetRestNoAuth", null, constraints, null);
	    var string = dataset.getValue(0, "response");
	    
	    return JSON.parse(string);
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
