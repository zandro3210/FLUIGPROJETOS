function createDataset(fields, constraints, sortFields) {
	var NOME_SERVICO = "MaximeTable";
	var CAMINHO_SERVICO = "br.com.microsiga.webservices.cfgtable_apw.CFGTABLE";
	
	var servico = ServiceManager.getService(NOME_SERVICO);
	var instancia = servico.instantiate(CAMINHO_SERVICO);
	var ws = instancia.getCFGTABLESOAP(); 
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("descricao");
	
	var PROTHEUS_LOGIN = "MSALPHA";
	if (constraints != null) {
		var c = constraints[0];
		if (c != undefined) {
			PROTHEUS_LOGIN = c.initialValue.toUpperCase();
		}
	}
	
	try {
		
		log.info("createDataset gettable: " + ws);
		
		var retorno = ws.gettable(PROTHEUS_LOGIN, "ZL4", "", "", "ZL4_CODIGO,ZL4_DESPOR");
		var dados = retorno.getTABLEDATA();
		var fields = dados.getFIELDVIEW();
		
		log.info("createDataset gettable: " + fields.size());
		
		for (var i=0;i<fields.size();i++) {
			var tag = fields.get(i).getFLDTAG();
			var s = tag.getSTRING();
			newDataset.addRow(new Array(s.get(0), s.get(1)));
		}
		
	}catch(e){   
		log.info("ERROR:" + e);
	}
	
	return newDataset;		   
	
}