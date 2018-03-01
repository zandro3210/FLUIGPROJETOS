function createDataset(fields, constraints, sortFields) {
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("C_CODITCTB");
	newDataset.addColumn("C_DSCITCTB");
	
	try {
		log.info ("DATASET ds_item_contabil_protheus - dsUnidadeTOTVS - PTO 1");
		
		var service = ServiceManager.getService('wscorpfluig');
	
		log.info ("DATASET ds_item_contabil_protheus - dsUnidadeTOTVS - PTO 2 - servico ok");
	
		var locator = service.instantiate('com.totvs.autoatendimento.fluig.FLUIG');
			
		log.info ("DATASET ds_item_contabil_protheus - dsUnidadeTOTVS - PTO 3 - instantiate ok");
	
		var soap = locator.getFLUIGSOAP();
		
		log.info ("DATASET ds_item_contabil_protheus - dsUnidadeTOTVS - PTO 4 - metodo getFLUIGSOAP ok");
		
		var empresa = "00";
		var filial = "00001000100";
		var centrocusto = "";
		var itemcontabil = "";
		
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
				} 
			}
		}
		
		log.info("DATASET  dsItemContabilProtheus  - dsUnidadeTOTVS PTO 4.5 - do fields/constraints: " + empresa + " - " + filial + ":" + itemcontabil + ":" + centrocusto);
		
		// Invoca o servico
		var retorno = soap.itemctb(empresa, filial, centrocusto);
		
		log.info ("DATASET dsItemContabilProtheus - dsUnidadeTOTVS PTO 6" + retorno);
		
		var list = retorno.getLISTICTB();
	    
		log.info ("DATASET  dsItemContabilProtheus  - dsUnidadeTOTVS PTO 7" + list);
	    
	  	for (var i=0; i<list.size(); i++) {
			var r = list.get(i);
			if (itemcontabil != "") {
				if (itemcontabil.toLowerCase() == r.getCHCOD().trim().toLowerCase()) {
					newDataset.addRow(new Array(r.getCHCOD().trim(), r.getCHDESCR().trim()));
				}
			} else {
				newDataset.addRow(new Array(r.getCHCOD().trim(), r.getCHDESCR().trim()));
			}
			log.info ("r.getC_DSCITCTB(): " + r.getCHCOD() + "r.getC_DSCITCTB(): " + r.getCHDESCR());

		}
			
	  	log.info ("DATASET dsItemContabilProtheus - dsUnidadeTOTVS PTO 8");
		
	} catch(error) {
		log.info (" ++ DATASET dsItemContabilProtheus - dsUnidadeTOTVS - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro", error.message)); 
	}
	
	return newDataset;	

}