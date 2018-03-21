function createDataset(fields, constraints, sortFields) {
	
	var corpore = ServiceManager.getService('TSRVS001');
	var locator = corpore.instantiate('com.totvs.services.TSRVS001');
	var service = locator.getTSRVS001SOAP();
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("LOJA");
	newDataset.addColumn("CNPJ");
	newDataset.addColumn("NAME");
	newDataset.addColumn("CODE");
	newDataset.addColumn("SEGMENTO");

	var valor = "99061";
	var index = 1;
	
	if (constraints != null) {
		for(var c in constraints){
			if (constraints[c].getFieldName() == "codigo"){
				valor = constraints[c].getInitialValue().toUpperCase(); 
			} else if (constraints[c].getFieldName() == "nome"){
				valor = constraints[c].getInitialValue().toUpperCase();
				index = 2;
			} 
		}
	}
	
	log.info("***codigo: " + valor + ":" + index);

	var array = service.brwcustomer(valor, new java.math.BigInteger(index), new java.math.BigInteger(300), "");
	var list = array.getSTCUSTOMERVIEW();
	for (var i=0;i<list.size();i++) {
		var c = list.get(i);

		log.info("***LOJA: " + c.getLOJA());
		newDataset.addRow(new Array(c.getLOJA(),
									c.getCNPJ(),
									c.getNAME().trim(),
									c.getCODE().trim(),
									c.getSEGMENTO()));
	}

	log.info("***FIM DATASET DS_CLIENTES_servicos");
	return newDataset;	
		
}