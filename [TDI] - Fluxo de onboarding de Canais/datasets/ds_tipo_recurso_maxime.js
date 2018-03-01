function createDataset(fields, constraints, sortFields) {

	//desenv
//	var pacote = "_161._93._16._172._7032";

	//PRE
	log.info("createDataset UNIFACCESS: ");
	
	var pacote = "br.com.totvs.wsautoatendimento.wscorp";

	var servico = ServiceManager.getService("MaximeUnifAccess");
	var unifaccess = servico.instantiate(pacote + ".UNIFACCESS");
	var ws = unifaccess.getUNIFACCESSSOAP();
	
	log.info("UNIFACCESS:" + unifaccess);
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("descricao");
	
	try {
		var retorno = ws.listatiporecurso();
		
		var arr = retorno.getSTRURETLISTATIPORECURSO();
		
		for (var i=0;i<arr.size();i++) {
			var p = arr.get(i);
			newDataset.addRow(new Array(p.getCODIGO(), 
										p.getDESCRICAO()));
		}
	}catch(e){   
		newDataset.addRow(new Array(e, ""));
		log.info("ERROR:" + e);
	}
	
	return newDataset;		   
	
}