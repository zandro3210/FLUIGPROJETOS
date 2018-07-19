function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	var model = DsEasyGrupoPergunta.getModel(constraints);
	
	if(model == null) return null;	
	
	var asksGroups = DsEasyGrupoPergunta.getAsksGroups(model);
	
	dataset.addColumn("nome");
	dataset.addColumn("codigo");
	
	for(var i=0;i<asksGroups.getLength(); i++){
		var asksGroup = asksGroups.item(i).getChildNodes();
		var code = asksGroup.item(0).getTextContent();
		var name = asksGroup.item(1).getTextContent();
		dataset.addRow([name, code]);
	}
	
	return dataset;
}

var DsEasyGrupoPergunta = {
	/** Retorna o codigo do modelo enviado via constraint. **/
	getModel: function(constraints){
	    if(constraints.length == 0 || constraints[0].fieldName.toLowerCase() != "modelo"){
	        log.error('@dsEasyGrupoPergunta/getModel diz: constraint modelo é obrigatória.');
	        return null;
	    }
	    else return constraints[0].initialValue;
	},
	/** Retorna uma lista com os grupos de perguntas **/
	getAsksGroups: function(modelId){
		var string = this.callSoap(modelId);
		//var string = "<XMLRETURNRESULT><TESSTDPROPOSAL><CODE>777777</CODE><DESCRIPTION>PROPOSTA TESTE</DESCRIPTION><DETAILS></DETAILS></TESSTDPROPOSAL><TESSTDPROPOSAL><CODE>TEST</CODE><DESCRIPTION>GRUPO TESTE</DESCRIPTION><DETAILS>ESP</DETAILS></TESSTDPROPOSAL><TESSTDPROPOSAL><CODE>TEST06</CODE><DESCRIPTION>FINANCEIRO PADRÃO</DESCRIPTION><DETAILS></DETAILS></TESSTDPROPOSAL><TESSTDPROPOSAL><CODE>TEST10</CODE><DESCRIPTION>GRUPO FSW</DESCRIPTION><DETAILS></DETAILS></TESSTDPROPOSAL></XMLRETURNRESULT>";
		var xml = this.toDocument(string);
		var groups = xml.getElementsByTagName("TESSTDPROPOSAL");
		
		return groups;
	},
	/** Faz a chamada ao webservice **/
	callSoap: function(modelId){
		var serviceInstantiate = ServiceManager.getServiceInstance("TESSERVICES");
		var locator = serviceInstantiate.instantiate("br.com.microsiga.webservices.tesservices.TESSERVICES");
		var service = locator.getTESSERVICESSOAP();
		var data = service.getdata('', '1', '105', modelId);
		return data;
	},
	/** Converte uma string em um objeto Xml **/
	toDocument: function(xml){
		var doc = null;
		try {	
			var stringReader = new java.io.StringReader(xml);
			var inputSource = new org.xml.sax.InputSource(stringReader);
			var documentBuilderFactory = javax.xml.parsers.DocumentBuilderFactory.newInstance();
			var documentBuilder = documentBuilderFactory.newDocumentBuilder();
			doc = documentBuilder.parse(inputSource);
		} catch (e) {
			e.printStackTrace();
		}
		
		return doc;
	}
}