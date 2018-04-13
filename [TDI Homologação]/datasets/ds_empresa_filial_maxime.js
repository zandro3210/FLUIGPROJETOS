function createDataset(fields, constraints, sortFields) {
	
	
//	var pacote = "_161._93._16._172._7032";

	//PRE
	var pacote = "br.com.totvs.wsautoatendimento.wscorp";

	var servico = ServiceManager.getService("FLUIG");
	var fluig = servico.instantiate(pacote + ".FLUIGLocator");
	
	log.info("UNIFACCESS:" + fluig);
	
	var ws = fluig.getFLUIGSOAP();
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("empresa"); 
	newDataset.addColumn("filial");
	newDataset.addColumn("nomeEmpresa"); 
	newDataset.addColumn("nomeFilial"); 
	newDataset.addColumn("cnpj"); 
	
	try {
		var retorno = ws.EMPRPAG("");
		
		var arr = retorno.getLISTAEMPR();
		
		for (var i=0;i<arr.length;i++) {
			var p = arr[i];
			newDataset.addRow(new Array(p.getCC_CODIGO(), 
										p.getCC_FILIAL(), 
										p.getCC_NMEMPR(), 
										p.getCC_NMFIL(), 
										p.getCC_CNPJ()));
		}
	}catch(e){   
		newDataset.addRow(new Array(e, ""));
		log.info("ERROR:" + e);
	}
	
	/*
	newDataset.addRow(new Array("00", "01"));
	newDataset.addRow(new Array("00", "02"));
	newDataset.addRow(new Array("00", "03"));
	newDataset.addRow(new Array("00", "04"));
	newDataset.addRow(new Array("00", "05"));
	newDataset.addRow(new Array("00", "06"));
	newDataset.addRow(new Array("00", "07"));
	newDataset.addRow(new Array("00", "08"));
	newDataset.addRow(new Array("00", "09"));
	newDataset.addRow(new Array("00", "11"));
	newDataset.addRow(new Array("00", "12"));
	newDataset.addRow(new Array("01", "01"));
	newDataset.addRow(new Array("02", "01"));
	newDataset.addRow(new Array("03", "01"));
	newDataset.addRow(new Array("04", "01"));
	newDataset.addRow(new Array("05", "01"));
	newDataset.addRow(new Array("09", "01"));
	newDataset.addRow(new Array("10", "01"));
	newDataset.addRow(new Array("13", "01"));
	newDataset.addRow(new Array("14", "01"));
	newDataset.addRow(new Array("16", "01"));
	newDataset.addRow(new Array("18", "01"));
	newDataset.addRow(new Array("19", "01"));
*/
	
	return newDataset;
	
}