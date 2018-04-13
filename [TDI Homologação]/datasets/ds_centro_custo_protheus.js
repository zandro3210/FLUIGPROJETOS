function createDataset(fields, constraints, sortFields) {

	//servico dscentroCustoProtheus
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CG_COD");
	newDataset.addColumn("CG_DESCR");
	
	try {
		var service = ServiceManager.getService('wscorpfluig');
		var locator = service.instantiate('com.totvs.autoatendimento.fluig.FLUIG');
		var soap = locator.getFLUIGSOAP();

		log.info("datafields:" + fields)
		
		var empresa  = "00";
		var filial = "";
		var centrocusto = "";
		if (constraints != null) {
			for(var c in constraints){
				log.info("constraints[c].getFieldName():" + constraints[c].getFieldName());
				if (constraints[c].getFieldName() == "empresa"){
					empresa = constraints[c].getInitialValue(); 
				} else if (constraints[c].getFieldName() == "filial"){
					filial = constraints[c].getInitialValue(); 
				} else if (constraints[c].getFieldName() == "centrocusto"){
					centrocusto = constraints[c].getInitialValue(); 
				}
			}
		}

		if (empresa == "" || empresa == null){
			newDataset.addRow(new Array("erro", "Empresa Pagadora nao foi informada"));
			return newDataset;	
		}
		
		log.info ("DATASET ds_centro_custo :" + empresa + ":" + filial + ":" + centrocusto);
		var retorno = soap.ccusto(empresa, filial, centrocusto);

		log.info ("DATASET ds_centro_custo :" + retorno);
		var list = retorno.getLISTCC();
	    
		log.info ("DATASET dscentroCustoProtheus - fields - PTO 7" + list);
	    
	  	for (var i=0; i<list.size(); i++) {
			var r = list.get(i);
			log.info ("DATASET dscentroCustoProtheus - fields - PTO 7.5: " +
					  "r.getCG_COD(): " + r.getCGCOD() +
					  "r.getCG_DESCR(): " + r.getCGDESCR());
			newDataset.addRow(new Array(r.getCGCOD(), r.getCGDESCR()));	
		}
			
	  	log.info ("DATASET dscentroCustoProtheus - fields - PTO 8");
	} catch (error) {
		log.info (" ++ DATASET dscentroCustoProtheus - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro", error.message)); 
	}	
		

	return newDataset;	
}