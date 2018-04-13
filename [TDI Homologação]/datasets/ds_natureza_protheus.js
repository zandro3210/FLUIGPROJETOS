function createDataset(fields, constraints, sortFields) {

	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CD_CODIGO");
	newDataset.addColumn("CD_DESCR");
	
	try{
		
		var service = ServiceManager.getService('wscorpfluig');
		var locator = service.instantiate('com.totvs.autoatendimento.fluig.FLUIG');
		var soap = locator.getFLUIGSOAP();
		
		var empresa = "00";
		var filial = "";
		var de = "";
		var ate = "";
		
		if (constraints != null) {
			for(var c in constraints){
				if (constraints[c].getFieldName() == "empresa") {
					empresa = constraints[c].getInitialValue(); 
				} else if (constraints[c].getFieldName() == "filial") {
					filial = constraints[c].getInitialValue();
				} else if (constraints[c].getFieldName() == "de"){
					de  = constraints[c].getInitialValue(); 
				} else if (constraints[c].getFieldName() == "ate"){
					ate = constraints[c].getInitialValue(); 
				}
			}
		} else if (fields && fields != null) {
		    de = fields[0]; 
		    ate = fields[2];
		}
		
		var retorno = soap.natur(empresa, filial, de, ate);
		var list = retorno.getLISTANATUR();

	  	for (var i=0; i<list.size(); i++) {
			var r = list.get(i);
			newDataset.addRow(new Array(r.getCDCODIGO(),r.getCDDESCR()));
		}
				
	} catch(error) {
		log.info (" ++ DATASET dsNatureza - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro", error.message)); 
	}

	return newDataset;
	
}