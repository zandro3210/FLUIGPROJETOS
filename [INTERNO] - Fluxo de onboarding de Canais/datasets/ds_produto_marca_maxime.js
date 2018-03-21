function createDataset(fields, constraints, sortFields) {
	//desenv
//	var pacote = "_161._93._16._172._7032";

	//PRE
	var pacote = "br.com.totvs.wsautoatendimento.wscorp";

	var NOME_SERVICO = "MaximeUnifAccess";
	var CAMINHO_SERVICO = pacote + ".UNIFACCESS";
	
	var servico = ServiceManager.getService(NOME_SERVICO);
	var instancia = servico.instantiate(CAMINHO_SERVICO);
	var ws = instancia.getUNIFACCESSSOAP(); 
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("descricao");
	
	try {
		var retorno = ws.rpesquisa("1");
		var dados = retorno.getRETPESQ();
		for (var i=0;i<dados.size();i++) {
			var produto = dados.get(i);
			newDataset.addRow(new Array(produto.getCODIGO().trim(),produto.getDESCRI()));
		}
	}catch(e){   
		log.info("ERROR:" + e);
	}
	
	return newDataset;		   
	
}