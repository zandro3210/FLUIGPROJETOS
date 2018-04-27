function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	var group = DsEasyPergunta.getGroup(constraints);
	
	if(group == null) return null;	
	
	var asks = DsEasyPergunta.getAsks(group);
	
	dataset.addColumn("nivel");
	dataset.addColumn("codigo");
	dataset.addColumn("pai");
	dataset.addColumn("obs");
	dataset.addColumn("nome");
	dataset.addColumn("tipo");
	dataset.addColumn("opcoes");
	dataset.addColumn("padrao");
	
	for(var i=0;i<asks.getLength(); i++){
		var ask = asks.item(i).getChildNodes();
		var index = ask.item(0).getTextContent();
		var code = ask.item(1).getTextContent();
		var owner = ask.item(2).getTextContent();
		var obs = ask.item(3).getTextContent();
		var value = ask.item(5).getTextContent();
		var name = ask.item(6).getTextContent();
		var type = ask.item(7).getTextContent();
		var options = ask.item(8).getTextContent();		
		
		dataset.addRow([index, code, owner, obs, name, type, options, value]);
	}
	
	return dataset;
}

var DsEasyPergunta = {
	/** Retorna o codigo do grupo enviado via constraint. **/
		getGroup: function(constraints){
	    if(constraints.length == 0 || constraints[0].fieldName.toLowerCase() != "grupo"){
	        log.error('@DsEasyPergunta/getGroup diz: constraint grupo é obrigatória.');
	        return null;
	    }
	    else return constraints[0].initialValue;
	},
	/** Retorna uma lista com as perguntas **/
	getAsks: function(groupId){
		var string = this.callSoap(groupId);
		//var string = "<XMLRETURNRESULT><QUESTIONS><QUESTION><INDEX>1</INDEX><CODE>1</CODE><OWNER></OWNER><OBS>a</OBS><COND></COND><DEFAULT>1</DEFAULT><DESC>Ira utilizar CNAB a pagar?</DESC><TYPE>1</TYPE><OPTIONS>1=Sim;2=Nao</OPTIONS></QUESTION><QUESTION><INDEX>1.1</INDEX><CODE>1.01</CODE><OWNER>1</OWNER><OBS>b</OBS><COND></COND><DEFAULT>2</DEFAULT><DESC>Quais bancos no CNAB a Pagar?</DESC><TYPE>5</TYPE><OPTIONS>1=Bradesco;2=Santander;3=Itau;4=Caixa;5=Banco do Brasil;6=Outros</OPTIONS></QUESTION><QUESTION><INDEX>1.2</INDEX><CODE>2</CODE><OWNER>1</OWNER><OBS>c</OBS><COND></COND><DEFAULT></DEFAULT><DESC>Ira utilizar CNAB a pagar Impostos/Tributos?</DESC><TYPE>1</TYPE><OPTIONS>1=Sim;2=Não</OPTIONS></QUESTION><QUESTION><INDEX>2.1</INDEX><CODE>2.01</CODE><OWNER>2</OWNER><OBS>d</OBS><COND></COND><DEFAULT></DEFAULT><DESC>Quais bancos?</DESC><TYPE>5</TYPE><OPTIONS>1=Bradesco;2=Santander;3=Itau;4=Caixa;5=Banco do Brasil;6=Outros</OPTIONS></QUESTION><QUESTION><INDEX>1.3</INDEX><CODE>3</CODE><OWNER>1</OWNER><OBS>e</OBS><COND></COND><DEFAULT></DEFAULT><DESC>Ira utilizar CNAB a pagar Concessionarias?</DESC><TYPE>1</TYPE><OPTIONS>1=Sim;2=Não</OPTIONS></QUESTION><QUESTION><INDEX>3.1</INDEX><CODE>3.01</CODE><OWNER>3</OWNER><OBS>f</OBS><COND></COND><DEFAULT></DEFAULT><DESC>Quais Bancos?</DESC><TYPE>5</TYPE><OPTIONS>1=Bradesco;2=Santander;3=Itau;4=Caixa;5=Banco do Brasil</OPTIONS></QUESTION><QUESTION><INDEX>10</INDEX><CODE>10</CODE><OWNER></OWNER><OBS>g</OBS><COND></COND><DEFAULT></DEFAULT><DESC>Utiliza fundo fixo (caixinha)?</DESC><TYPE>1</TYPE><OPTIONS>1=Sim;2=Não</OPTIONS></QUESTION><QUESTION><INDEX>11</INDEX><CODE>11</CODE><OWNER></OWNER><OBS>h</OBS><COND></COND><DEFAULT></DEFAULT><DESC>Deseja gerenciar viagens e reembolsos?</DESC><TYPE>1</TYPE><OPTIONS>1=Sim;2=Não</OPTIONS></QUESTION><QUESTION><INDEX>12</INDEX><CODE>12</CODE><OWNER></OWNER><OBS>i</OBS><COND></COND><DEFAULT></DEFAULT><DESC>Tem necessidade de controlar o financeiro em outra moeda?</DESC><TYPE>1</TYPE><OPTIONS>1=Sim;2=Não</OPTIONS></QUESTION><QUESTION><INDEX>13</INDEX><CODE>13</CODE><OWNER></OWNER><OBS>j</OBS><COND></COND><DEFAULT>2</DEFAULT><DESC>Trabalha com Multiplas Naturezas Financeiras?</DESC><TYPE>1</TYPE><OPTIONS>1=Sim;2=Não</OPTIONS></QUESTION><QUESTION><INDEX>14</INDEX><CODE>14</CODE><OWNER></OWNER><OBS>k</OBS><COND></COND><DEFAULT>2</DEFAULT><DESC>Utiliza Concilização Automatica de Extrato?</DESC><TYPE>1</TYPE><OPTIONS>1=Sim;2=Não</OPTIONS></QUESTION><QUESTION><INDEX>14.1</INDEX><CODE>14.01</CODE><OWNER>14</OWNER><OBS>l</OBS><COND></COND><DEFAULT></DEFAULT><DESC>Quais bancos?</DESC><TYPE>5</TYPE><OPTIONS>1=Bradesco;2=Santander;3=Itau;4=Caixa;5=Banco do Brasil;6=Outros</OPTIONS></QUESTION><QUESTION><INDEX>4</INDEX><CODE>4</CODE><OWNER></OWNER><OBS>m</OBS><COND></COND><DEFAULT></DEFAULT><DESC>Ira utilizar CNAB a receber?</DESC><TYPE>1</TYPE><OPTIONS>1=Sim;2=Nao</OPTIONS></QUESTION><QUESTION><INDEX>4.1</INDEX><CODE>4.01</CODE><OWNER>4</OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Quais Bancos?</DESC><TYPE>5</TYPE><OPTIONS>1=Bradesco;2=Santander;3=Itau;4=Caixa;5=Banco do Brasil;6=Outros</OPTIONS></QUESTION><QUESTION><INDEX>5</INDEX><CODE>5</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT>2</DEFAULT><DESC>A empresa fara emissao de boleto?</DESC><TYPE>1</TYPE><OPTIONS>1=Sim;2=Não</OPTIONS></QUESTION><QUESTION><INDEX>5.1</INDEX><CODE>5.01</CODE><OWNER>5</OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Quais Bancos?</DESC><TYPE>5</TYPE><OPTIONS>1=Bradesco;2=Santander;3=Itau;4=Caixa;5=Banco do Brasil;6=Outros</OPTIONS></QUESTION><QUESTION><INDEX>6</INDEX><CODE>6</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Possui controle de aplicacao e emprestimo (sem controle de acoes)?</DESC><TYPE>1</TYPE><OPTIONS>1=Sim;2=Não</OPTIONS></QUESTION><QUESTION><INDEX>6.1</INDEX><CODE>6.01</CODE><OWNER>6</OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Em quantos bancos distintos?</DESC><TYPE>3</TYPE><OPTIONS></OPTIONS></QUESTION><QUESTION><INDEX>7</INDEX><CODE>7</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Utiliza impressao de cheque?</DESC><TYPE>1</TYPE><OPTIONS>1=Sim;2=Não</OPTIONS></QUESTION><QUESTION><INDEX>7.1</INDEX><CODE>7.01</CODE><OWNER>7</OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Quais Bancos?</DESC><TYPE>5</TYPE><OPTIONS>1=Bradesco;2=Santander;3=Itau;4=Caixa;5=Banco do Brasil;6=Outros</OPTIONS></QUESTION><QUESTION><INDEX>8</INDEX><CODE>8</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Sera necessario criar algum tipo de alcada de aprovacao de pagamentos?</DESC><TYPE>1</TYPE><OPTIONS>1=Sim;2=Não</OPTIONS></QUESTION><QUESTION><INDEX>9</INDEX><CODE>9</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Utiliza controle de solicitacao de fundos?(administracao de fundo fixo para pagamentos antecipados)</DESC><TYPE>1</TYPE><OPTIONS>1=Sim;2=Não</OPTIONS></QUESTION></QUESTIONS></XMLRETURNRESULT>";
		var xml = this.toDocument(string);
		var asks = xml.getElementsByTagName("QUESTION");
		
		return asks;
	},
	/** Faz a chamada ao webservice **/
	callSoap: function(modelId){
		var serviceInstantiate = ServiceManager.getServiceInstance("TESSERVICES");
		var locator = serviceInstantiate.instantiate("br.com.microsiga.webservices.tesservices.TESSERVICES");
		var service = locator.getTESSERVICESSOAP();
		var data = service.getdata('', '2', '105', modelId);
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