function createDataset(fields, constraints, sortFields) {

	//servico dsClasseProtheus

	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CL_COD");
	newDataset.addColumn("CL_DESCR");
	
	
	try {
		log.info ("DATASET dsClasseProtheus  - PTO 1");
		
		var service = ServiceManager.getService('wscorpfluig');
		var locator = service.instantiate('com.totvs.autoatendimento.fluig.FLUIG');
		var soap = locator.getFLUIGSOAP();
		
		log.info ("DATASET dsClasseProtheus - PTO 4 - metodo getFLUIGSOAP ok");
		
		var empresa = "00";
		var filial = "00001000100";
		var centrocusto = "";
		var itemcontabil = "";
		var classe = "";
		
		if (constraints != null) {
			for (var c in constraints){
				if (constraints[c].getFieldName() == "empresa") {
					empresa = constraints[c].getInitialValue(); 
				} else if (constraints[c].getFieldName() == "filial") {
					filial = constraints[c].getInitialValue(); 
				} else if (constraints[c].getFieldName() == "centrocusto") {
					centrocusto = constraints[c].getInitialValue(); 
				} else if (constraints[c].getFieldName() == "itemcontabil") {
					itemcontabil = constraints[c].getInitialValue(); 
				} else if (constraints[c].getFieldName() == "classe") {
					classe = constraints[c].getInitialValue(); 
				}
			}
		}
		
		log.info("DATASET  dsClasseProtheus - fields - PTO 5: " + empresa + " - " + filial + " - " + centrocusto + " - " + itemcontabil);
		var retorno = soap.clvl(empresa, filial, centrocusto, itemcontabil);
		
		log.info ("DATASET dsClasseProtheus - constraint - PTO 10:" + retorno);
		
		var list = retorno.getLISTCLVL();
	    
		log.info ("DATASET dsClasseProtheus - dsbanco - constraint - PTO 11:" + list);
	    
		for (var i = 0; i<list.size(); i++) {
			var r = list.get(i);
			if (classe != "") {
				if (classe.toLowerCase() == r.getCLCOD().toLowerCase()) {
					newDataset.addRow(new Array(r.getCLCOD(), r.getCLDESCR()));
				}
			} else {
				newDataset.addRow(new Array(r.getCLCOD(), r.getCLDESCR()));
			}
		}
	} catch (error) {
		log.info (" ++ DATASET dsClasseProtheus - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro", error.message)); 
	}	
	
	return newDataset;	
}