var PRD = "https://wscorp.totvs.com.br";
var HML = "http://172.24.52.10:8048";
var SERVER = HML;

function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	var email = DsEasyExecutivo.getEmail(constraints);

	if(email == null) return null;
	
	var ears = DsEasyExecutivo.getEars(email);
		
	dataset.addColumn("codigo");
	dataset.addColumn("nome");
	dataset.addColumn("unidade");
	dataset.addColumn("codunidade");
	dataset.addColumn("gar");
	dataset.addColumn("dar");
	dataset.addColumn("go");
	
	for(var i=0; i<ears.length; i++){
		var ear = ears[i];
		var row = [
		           ear.codigo, 
		           ear.nome, 
		           ear.unidade,
		           ear.codunidade,
		           JSON.stringify(ear.GAR), 
		           JSON.stringify(ear.DAR),
		           JSON.stringify(ear.GO),
		           ];
		dataset.addRow(row);
	}
	
	return dataset;
}

var DsEasyExecutivo = {
	/** Retorna o email enviado via constraint. **/
	getEmail: function(constraints){
	    if(constraints.length == 0 || constraints[0].fieldName.toLowerCase() != "email"){
	        log.error('@dsEasyExecutivo/getEmail diz: constraint email é obrigatória.');
	        return null;
	    }
	    else{
		    log.info('@dsEasyExecutivo/getEmail diz: email = '+constraints[0].initialValue.toLowerCase());
			return constraints[0].initialValue.toLowerCase();
		}	
	},
	/** Retorna uma lista com os ears. **/
	getEars: function(email){
		var urlWithParams = SERVER+"/rest/WSRGT12ESN/"+email;
		var ears = this.callDatasetRest(urlWithParams);
		//var ears = {"EXECUTIVOS":[{"codigo": "T99001","nome": "EAR TESTE","codunidade": "TSE999","unidade": "TOTVS NAO ENCONTRADA - META A DISTRIBUIR","GAR":[{"codigo": "T99002","nome": "GAR TESTE","codunidade": "TSE999","unidade": "TOTVS NAO ENCONTRADA - META A DISTRIBUIR"}],"DAR":[{"codigo": "T99992","nome": "DAR - TESTE","codunidade": "TSE999","unidade": "TOTVS NAO ENCONTRADA - META A DISTRIBUIR"},{"codigo": "T99992","nome": "DAR - TESTE","codunidade": "TSE999","unidade": "TOTVS NAO ENCONTRADA - META A DISTRIBUIR"}],"GO":[]}]};
				
		if(ears.hasOwnProperty("errorCode")) return null; 
		else return ears.EXECUTIVOS;
	},
	/** Executa a chamada ao dataset generico de rest. **/
	callDatasetRest: function(urlWithParams){
		log.info('@dsEasyExecutivo/callDatasetRest diz: urlWithParams = '+urlWithParams);
		var c1 = DatasetFactory.createConstraint("url", urlWithParams, urlWithParams, ConstraintType.MUST);
	    var constraints = [c1];
	    var dataset = DatasetFactory.getDataset("dsGenericGetRestNoAuth", null, constraints, null);
	    var string = dataset.getValue(0, "response");
	    
	    return JSON.parse(string);
	}
};