function createDataset(fields, constraints, sortFields) {
	
	// Cria o dataset
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CC_CNPJ");
	newDataset.addColumn("CC_CODIGO");
	newDataset.addColumn("CC_FILIAL");
	newDataset.addColumn("CC_NMEMPR");
	newDataset.addColumn("CC_NMFIL");
	
	try {
		var integracao = ServiceManager.getService('FLUIG3');
		var serviceLocator = integracao.instantiate('pkgWkfSolicPagamento.FLUIGLocator');
		var service = serviceLocator.getFLUIGSOAP();

		log.info("datafields:" + fields)
		
		var filter  = "";
		if (constraints != null) {
			for(var c in constraints){
				if (constraints[c].getFieldName() == "CC_CNPJ"){
					filter = constraints[c].getInitialValue(); 
				} 
			}
		    filter = filter.toUpperCase();
		}
		
		log.info("empre pag:" + filter)
		
		var retorno = service.EMPRPAG(filter);
		log.info("empre pag retorno:" + retorno)
		var list = retorno.getLISTAEMPR();
		log.info("empre pag:" + list)
	  	for (var i = 0; i < list.length; i++) {
			var r = list[i];
			newDataset.addRow(new Array(r.getCC_CNPJ(),
										r.getCC_CODIGO(),
										r.getCC_FILIAL(),
										r.getCC_NMEMPR(),
										r.getCC_NMFIL()));
		}
	} catch (error) {
		newDataset.addRow(new Array("erro", error.message, "erro", "erro", "erro")); 
	}
	
	return newDataset;	
}