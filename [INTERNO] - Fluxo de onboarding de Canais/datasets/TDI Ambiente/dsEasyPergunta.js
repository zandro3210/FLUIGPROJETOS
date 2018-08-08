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
	dataset.addColumn("modulo");
	for(var i=0;i<asks.getLength(); i++){
		var ask = asks.item(i).getChildNodes();
		var index = ask.item(0).getTextContent();
		var code = ask.item(1).getTextContent();
		var owner = ask.item(2).getTextContent();
		var obs = ask.item(3).getTextContent();
		var value = ask.item(5).getTextContent();
		var name = ask.item(6).getTextContent();
		var type = ask.item(7).getTextContent();
		var modulo = ask.item(8).getTextContent();		
		var options = ask.item(9).getTextContent();		
	
		dataset.addRow([index, code, owner, obs, name, type, options, value,modulo]);
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
		//var string = "<XMLRETURNRESULT><QUESTIONS><QUESTION><INDEX>1</INDEX><CODE>C01</CODE><OWNER></OWNER><OBS>O processo de compras pode ser realizado via Solicitação de Compras (rotina que o usuário faz a Solicitação de Compras->Gera Cotação->Atualiza e analisa cotação->Gera pedido de compra) ou realizar a compra diretamente pela rotina de pedido de compra, sem necessidade de análise pela área de compras.</OBS><COND></COND><DEFAULT></DEFAULT><DESC>As compras são realizadas mediante uma solicitação de compras?</DESC><TYPE>1</TYPE><MODULO>COM</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>1.1</INDEX><CODE>C01.01</CODE><OWNER>C01</OWNER><OBS>Manual - O usuário realizará a compa de forma manual.</OBS><COND></COND><DEFAULT></DEFAULT><DESC>Como são geradas as solicitações de compra?</DESC><TYPE>2</TYPE><MODULO>COM</MODULO><OPTIONS>1=MANUAL;2=PONTO DE PEDIDO</OPTIONS></QUESTION><QUESTION><INDEX>1.2</INDEX><CODE>C01.02</CODE><OWNER>C01</OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Haverá aprovação de Solicitação de Compras?</DESC><TYPE>1</TYPE><MODULO>COM</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>10</INDEX><CODE>E04</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Utiliza processo de requisição de materiais?</DESC><TYPE>1</TYPE><MODULO>EST</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>10.1</INDEX><CODE>E04.01</CODE><OWNER>E04</OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Utiliza processo de aprovação das Solicitações de Materiais?</DESC><TYPE>1</TYPE><MODULO>EST</MODULO><OPTIONS>1=Sim;2=Nao</OPTIONS></QUESTION><QUESTION><INDEX>11</INDEX><CODE>E05</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Utiliza processo de transferência de materiais?</DESC><TYPE>1</TYPE><MODULO>EST</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>12</INDEX><CODE>E06</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Existe controle de Lotes / Validade / Rastreabilidade?</DESC><TYPE>1</TYPE><MODULO>EST</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>13</INDEX><CODE>FT01</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT>2</DEFAULT><DESC>Utilizará orçamento de vendas?</DESC><TYPE>1</TYPE><MODULO>FAT</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>14</INDEX><CODE>FT02</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT>2</DEFAULT><DESC>Utilizará controle de reservas de estoque?</DESC><TYPE>1</TYPE><MODULO>FAT</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>15</INDEX><CODE>FT03</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Emite Nf-e de Produto (DANFE-estado) ?</DESC><TYPE>1</TYPE><MODULO>FAT</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>15.1</INDEX><CODE>FT0301</CODE><OWNER>FT03</OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Quantos Estados?</DESC><TYPE>3</TYPE><MODULO>FAT</MODULO><OPTIONS>0=</OPTIONS></QUESTION><QUESTION><INDEX>16</INDEX><CODE>FT04</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Emite Nfs-e (Nota de Serviço Eletrônica) por Município ?</DESC><TYPE>1</TYPE><MODULO>FAT</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>16.1</INDEX><CODE>FT0401</CODE><OWNER>FT04</OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Quantos municipios?</DESC><TYPE>3</TYPE><MODULO>FAT</MODULO><OPTIONS>0=</OPTIONS></QUESTION><QUESTION><INDEX>17</INDEX><CODE>FT05</CODE><OWNER></OWNER><OBS> </OBS><COND></COND><DEFAULT>2</DEFAULT><DESC>Existe controle de cargas?</DESC><TYPE>1</TYPE><MODULO>FAT</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>18</INDEX><CODE>FT06</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT>2</DEFAULT><DESC>Existe controle do custo dos fretes / auditoria?</DESC><TYPE>1</TYPE><MODULO>FAT</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>19</INDEX><CODE>FT07</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Haverá controle de comissões para vendedores?</DESC><TYPE>1</TYPE><MODULO>FAT</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>19.1</INDEX><CODE>FT0701</CODE><OWNER>FT07</OWNER><OBS>O Protheus efetua o controle de comissões, desde que predeterminados os percentuais no Cadastro de Vendedores, no Cadastro de Clientes e no Cadastro de Produtos. As comissões são tratadas como obrigações a pagar pelo sistema e são calculadas automaticamente na preparação e geração das notas fiscais ou na implantação de um título a receber. Para o cálculo das comissões o sistema verifica o percentual de comissão atribuído ao Cadastro do Vendedor, entre emissão e baixa, sendo que aquela referente à baixa somente será calculada após o título a receber ter sido baixado. O valor base da comissão é calculado considerando os dados do Cadastro do Vendedor, no que se referir a Frete, IPI, ICMS, ICMS Retido e ISS. O sistema permite alteração nas comissões de vendas calculadas e a atualização da data para pagamento das comissões, o que viabiliza o controle daquelas que já foram pagas.</OBS><COND></COND><DEFAULT></DEFAULT><DESC>Sobre comissões, será um % fixo de comissão no modelo padrão Protheus (ver Help com regras)?</DESC><TYPE>1</TYPE><MODULO>FAT</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>2</INDEX><CODE>C02</CODE><OWNER></OWNER><OBS>Cotação de preço, por regra da companhia se faz necessária a análise de preços entre diferentes fornecedores.</OBS><COND></COND><DEFAULT></DEFAULT><DESC>Necessita realizar cotação de preços?</DESC><TYPE>1</TYPE><MODULO>COM</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>2.1</INDEX><CODE>C02.01</CODE><OWNER>C02</OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Qual será maneira de realizar a cotação dos preços?</DESC><TYPE>2</TYPE><MODULO>COM</MODULO><OPTIONS>1=MANUAL;2=ELETRONICA WF</OPTIONS></QUESTION><QUESTION><INDEX>20</INDEX><CODE>FT08</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT>2</DEFAULT><DESC>Deseja implantar as funcionalidades de CRM para controle das oportunidades de vendas?</DESC><TYPE>1</TYPE><MODULO>FAT</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>21</INDEX><CODE>FT09</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Irá utilizar funcionalidade de bloqueio de crédito?</DESC><TYPE>1</TYPE><MODULO>FAT</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>22</INDEX><CODE>FT10</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Irá utilizar funcionalidade de bloqueio de estoque ?</DESC><TYPE>1</TYPE><MODULO>FAT</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>23</INDEX><CODE>FT11</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Irá utilizar funcionalidade de bloqueio de regras de negócio?</DESC><TYPE>1</TYPE><MODULO>FAT</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>24</INDEX><CODE>F01</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Ira utilizar CNAB a pagar?</DESC><TYPE>1</TYPE><MODULO>FIN</MODULO><OPTIONS>1=Sim;2=Não</OPTIONS></QUESTION><QUESTION><INDEX>24.1</INDEX><CODE>F01.01</CODE><OWNER>F01</OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Quais bancos do CNAB Tipo Fornecedor?</DESC><TYPE>5</TYPE><MODULO>FIN</MODULO><OPTIONS>0=BRADESCO;2=SANTANDER;3=CAIXA;4=BRASIL;5=ITAU;6=OUTROS;7=NAO UTILIZA</OPTIONS></QUESTION><QUESTION><INDEX>24.2</INDEX><CODE>F01.02</CODE><OWNER>F01</OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Quais bancos no CNAB de Impostos e tributos?</DESC><TYPE>5</TYPE><MODULO>FIN</MODULO><OPTIONS>0=BRADESCO;2=SANTANDER;3=CAIXA;4=BRASIL;5=ITAU;6=OUTROS;7=NAO UTLIZA</OPTIONS></QUESTION><QUESTION><INDEX>24.3</INDEX><CODE>F01.03</CODE><OWNER>F01</OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Quais bancos no CNAB de Concessionárias?</DESC><TYPE>5</TYPE><MODULO>FIN</MODULO><OPTIONS>0=BRADESCO;2=SANTANDER;3=CAIXA;4=BRASIL;5=ITAU;6=OUTROS;7=NAO UTILIZA</OPTIONS></QUESTION><QUESTION><INDEX>25</INDEX><CODE>F02</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Irá utilizar CNAB a receber?</DESC><TYPE>1</TYPE><MODULO>FIN</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>25.1</INDEX><CODE>F02.01</CODE><OWNER>F02</OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Quais bancos?</DESC><TYPE>5</TYPE><MODULO>FIN</MODULO><OPTIONS>1=BRADESCO;2=SANTANDER;3=CAIXA;4=BRASIL;5=ITAU;6=OUTROS</OPTIONS></QUESTION><QUESTION><INDEX>26</INDEX><CODE>F03</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Irá utilizar CNAB de extrato/conciliação?</DESC><TYPE>1</TYPE><MODULO>FIN</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>26.1</INDEX><CODE>F03.01</CODE><OWNER>F03</OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Quais bancos?</DESC><TYPE>5</TYPE><MODULO>FIN</MODULO><OPTIONS>1=BRADESCO;2=SANTANDER;3=CAIXA;4=BRASIL;5=ITAU;6=OUTROS</OPTIONS></QUESTION><QUESTION><INDEX>27</INDEX><CODE>F04</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>A empresa fará emissão de boleto?</DESC><TYPE>1</TYPE><MODULO>FIN</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>27.1</INDEX><CODE>F04.01</CODE><OWNER>F04</OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Quais bancos?</DESC><TYPE>5</TYPE><MODULO>FIN</MODULO><OPTIONS>1=BRADESCO;2=SANTANDER;3=CAIXA;4=BRASIL;5=ITAU;6=OUTROS</OPTIONS></QUESTION><QUESTION><INDEX>28</INDEX><CODE>F05</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Possui controle de aplicação e empréstimo (sem controle de ações)?</DESC><TYPE>1</TYPE><MODULO>FIN</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>28.1</INDEX><CODE>F05.01</CODE><OWNER>F05</OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Em quantos bancos?</DESC><TYPE>3</TYPE><MODULO>FIN</MODULO><OPTIONS>0=</OPTIONS></QUESTION><QUESTION><INDEX>29</INDEX><CODE>F06</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Utiliza impressão de cheques?</DESC><TYPE>1</TYPE><MODULO>FIN</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>29.1</INDEX><CODE>F06.01</CODE><OWNER>F06</OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Quais bancos?</DESC><TYPE>5</TYPE><MODULO>FIN</MODULO><OPTIONS>1=BRADESCO;2=SANTANDER;3=CAIXA;4=BRASIL;5=ITAU;6=OUTROS</OPTIONS></QUESTION><QUESTION><INDEX>3</INDEX><CODE>C03</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Utiliza pedido de compras com alçadas de aprovação?</DESC><TYPE>1</TYPE><MODULO>COM</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>3.1</INDEX><CODE>C03.01</CODE><OWNER>C03</OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Quantos níveis de alçadas/aprovadores?</DESC><TYPE>3</TYPE><MODULO>COM</MODULO><OPTIONS>0=</OPTIONS></QUESTION><QUESTION><INDEX>30</INDEX><CODE>F07</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Sera necessario criar algum tipo de alcada de aprovacao de pagamentos?</DESC><TYPE>1</TYPE><MODULO>FIN</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>31</INDEX><CODE>F08</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT>2</DEFAULT><DESC>Utiliza controle de solicitação de fundos? (administração de fundo fixo para pagamentos antecipados)</DESC><TYPE>1</TYPE><MODULO>FIN</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>32</INDEX><CODE>F09</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Utiliza fundo fixo (caixinha)?</DESC><TYPE>1</TYPE><MODULO>FIN</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>32.1</INDEX><CODE>F09.01</CODE><OWNER>F09</OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Utiliza controle de alçadas para Liberação de Despesas?</DESC><TYPE>1</TYPE><MODULO>FIN</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>33</INDEX><CODE>F10</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT>2</DEFAULT><DESC>Deseja gerenciar viagens e reembolsos?</DESC><TYPE>1</TYPE><MODULO>FIN</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>34</INDEX><CODE>F11</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT>2</DEFAULT><DESC>Tem necessidade de controlar o financeiro em outra moeda?</DESC><TYPE>1</TYPE><MODULO>FIN</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>36</INDEX><CODE>000001</CODE><OWNER></OWNER><OBS>Naturezas Bancos Condição de Pagamento TES Tipo de Movimento Centro de Custo Classe de Valor Item Contabil LP Plano de Contas Transportadoras</OBS><COND></COND><DEFAULT>1</DEFAULT><DESC>Deseja Realizar Importação de Cadastros Modelo (Backoffice)</DESC><TYPE>1</TYPE><MODULO></MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>4</INDEX><CODE>C04</CODE><OWNER></OWNER><OBS>Não está contemplado realizar integração com Fluig para aprovações. Neste caso está contemplado o envio de um informativo via e-mail no modelo padrão do Protheus. A aprovação deverá ocorrer no próprio sistema.</OBS><COND></COND><DEFAULT></DEFAULT><DESC>Deseja realizar via envio de WF informativo de pedido de compra (via e-mail)?</DESC><TYPE>1</TYPE><MODULO>COM</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>5</INDEX><CODE>C05</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Trabalha com contratos de compras?</DESC><TYPE>1</TYPE><MODULO>COM</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>5.1</INDEX><CODE>C05.01</CODE><OWNER>C05</OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>O contrato é do tipo autorização de entrega ou um contrato mercantil?</DESC><TYPE>2</TYPE><MODULO>COM</MODULO><OPTIONS>1=AUTORIZACAO DE ENTRAGA;2=CONTRATO MERCANTIL</OPTIONS></QUESTION><QUESTION><INDEX>6</INDEX><CODE>C06</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Realiza importação de produtos?</DESC><TYPE>1</TYPE><MODULO>COM</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>6.1</INDEX><CODE>C06.01</CODE><OWNER>C06</OWNER><OBS>Despachante - É necessário executar a rotina de Despesas de Importação para rateio dos custos entre as NFs de entrada, visto que o cliente não possui o módulo de Controle de Importação (SIGAEIC) e esse módulo não está contemplado na Oferta de Serviços. Interno: É necessária a implantação do módulo de Controle de Importação (SIGAEIC - COMEX). </OBS><COND></COND><DEFAULT></DEFAULT><DESC>Quem faz os trâmites da importação?</DESC><TYPE>2</TYPE><MODULO>COM</MODULO><OPTIONS>1=DESPACHANTE;2=INTERNO</OPTIONS></QUESTION><QUESTION><INDEX>7</INDEX><CODE>E01</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Os produtos serão controlados em outra unidade de medida além da principal ?</DESC><TYPE>1</TYPE><MODULO>EST</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>8</INDEX><CODE>E02</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Haverá controle de/em poder de terceiros?</DESC><TYPE>1</TYPE><MODULO>EST</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION><QUESTION><INDEX>9</INDEX><CODE>E03</CODE><OWNER></OWNER><OBS></OBS><COND></COND><DEFAULT></DEFAULT><DESC>Existe controle de localização dos materiais dentro do armazém?</DESC><TYPE>1</TYPE><MODULO>EST</MODULO><OPTIONS>1=SIM;2=NAO</OPTIONS></QUESTION></QUESTIONS></XMLRETURNRESULT>";
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