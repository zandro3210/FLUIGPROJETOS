var PRD = "https://wscorp.totvs.com.br/";
var HML = "http://172.24.52.10:8048";
var SERVER = HML;

function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	var ear = DsEasyProposta.getEar(constraints);
	
	if(ear == null) return null;	
	
	var proposals = DsEasyProposta.getProposals(ear);
	
	dataset.addColumn("proposta");
	dataset.addColumn("revisao");
	dataset.addColumn("oportunidade");	
	dataset.addColumn("revprop");
	dataset.addColumn("entidade");
	dataset.addColumn("codigo");
	dataset.addColumn("loja");
	dataset.addColumn("status");
	dataset.addColumn("data");
	dataset.addColumn("vendedor");
	dataset.addColumn("modelos");
	
	for(var i=0; i<proposals.length; i++){
		var proposal = proposals[i];
		var models = JSON.stringify(proposal.modelos);
		var row = [
		           proposal.proposta, 
		           proposal.revprop, 
		           proposal.oportunidade, 
		           proposal.revoport, 
		           proposal.entidade, 
		           proposal.codigo, 
		           proposal.loja, 
		           proposal.status, 
		           proposal.data, 
		           proposal.vendedor,
		           models];

		dataset.addRow(row);
	}
	
	return dataset;
}

var DsEasyProposta = {
	/** Retorna o codigo do ear enviado via constraint. **/
	getEar: function(constraints){
	    if(constraints.length == 0 || constraints[0].fieldName.toLowerCase() != "ear"){
	        log.error('@dsEasyProposta/getEar diz: constraint ear é obrigatória.');
	        return null;
	    }
	    else return constraints[0].initialValue;
	},
	/** Retorna uma lista com as propostas. **/
	getProposals: function(ear){
		var urlWithParams = SERVER+"/rest/WSRGT12PROPOSAL/"+ear;
		var proposals = this.callDatasetRest(urlWithParams);
		//var proposals = {"propostas":[{"proposta": "Z00301","revprop": "01","oportunidade": "X00155","revoport": "01","entidade": "1","codigo": "TEXHMP","loja": "00","status": "Y","data": "20171101","vendedor": "T99001","modelos":[{"modori": "T 3100057 ","descmod": "TOTVS DIGITAL - FIN + PROCESSO SELETIVO RM"}]},{"proposta": "Z00305","revprop": "01","oportunidade": "X00155","revoport": "01","entidade": "1","codigo": "TEXHMP","loja": "00","status": "Y","data": "20171101","vendedor": "T99001","modelos":[{"modori": "T 3100057 ","descmod": "TOTVS DIGITAL - FIN + PROCESSO SELETIVO RM"}]},{"proposta": "Z00377","revprop": "01","oportunidade": "X00155","revoport": "01","entidade": "1","codigo": "TEXHMP","loja": "00","status": "Y","data": "20171110","vendedor": "T99001","modelos":[{"modori": "T 3100057 ","descmod": "TOTVS DIGITAL - FIN + PROCESSO SELETIVO RM"}]},{"proposta": "Z00430","revprop": "01","oportunidade": "X00179","revoport": "01","entidade": "1","codigo": "TEXHMP","loja": "00","status": "Y","data": "20171122","vendedor": "T99001","modelos":[{"modori": "T 10005002 ","descmod": "TOTVS LIGHT - FINANCEIRO - PROTHEUS"}]}]};
	    
		if(proposals.hasOwnProperty("errorCode")) return null; 
		else return proposals.propostas;
	},
	/** Executa a chamada ao dataset generico de rest. **/
	callDatasetRest: function(urlWithParams){
		var c1 = DatasetFactory.createConstraint("url", urlWithParams, urlWithParams, ConstraintType.MUST);
	    var constraints = [c1];
	    var dataset = DatasetFactory.getDataset("dsGenericGetRestNoAuth", null, constraints, null);
	    var string = dataset.getValue(0, "response");
	    
	    return JSON.parse(string);
	}
}