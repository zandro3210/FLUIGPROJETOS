function createDataset(fields, constraints, sortFields) {

	//desenv
	var pacote = "br.com.totvs.wsautoatendimento.wscorp";

	//PRE
	//var pacote = "br.com.totvs.preautoatendimento._8083.wscorp";
	
	var servico = ServiceManager.getService("MaximeUnifAccess");
	var filter = servico.instantiate(pacote + ".STRUPARAMLISTACARGO");
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
		var retorno = ws.listacargo(filter);
		
		var arr = retorno.getSTRURETLISTACARGO();
		
		for (var i=0;i<arr.length;i++) {
			var p = arr[i];
			newDataset.addRow(new Array(p.getQ3CARGO(), 
										p.getQ3DESCSUM()));
		}
	}catch(e){   
		newDataset.addRow(new Array(e, 
				""));
		log.info("ERROR:" + e);
	}
	
	return newDataset;		   
	
}