function createDataset(fields, constraints, sortFields) {

	//desenv
//	var pacote = "_161._93._16._172._7032";

	//PRE
	var pacote = "br.com.totvs.wsautoatendimento.wscorp";

	var servico = ServiceManager.getService("MaximeUnifAccess");
	var filter = servico.instantiate(pacote + ".STRUPARAMLISTACENTROCUSTO");
	var unifaccess = servico.instantiate(pacote + ".UNIFACCESS");
	
	log.info("UNIFACCESS:" + unifaccess);
	
	var ws = unifaccess.getUNIFACCESSSOAP();
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("descricao");
	
	var campo = null;
	var valor = "";
	if (constraints != null) {
		for(var c in constraints){
			if (constraints[c].getFieldName() == "campo"){
				campo = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "valor"){
				valor = constraints[c].getInitialValue(); 
			}
		}
	}
	
	filter.setFILTROSQL("");
	if (campo != null) {
		filter.setFILTROSQL(campo + " = '" + valor + "'"); 
	}
	
	log.info("GET reotrno");
	
	try {
		var retorno = ws.listacentrocusto(filter);
		
		var arr = retorno.getSTRURETLISTACENTROCUSTO();
		
		for (var i=0;i<arr.size();i++) {
			var p = arr.get(i);
			newDataset.addRow(new Array(p.getCTTCUSTO(), 
										p.getCTTDESC01()));
		}
	}catch(e){   
		newDataset.addRow(new Array(e, ""));
		log.info("ERROR:" + e);
	}
	
	return newDataset;		   
	
}