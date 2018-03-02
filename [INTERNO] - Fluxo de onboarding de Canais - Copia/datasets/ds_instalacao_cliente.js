function createDataset(fields, constraints, sortFields) {
	var corpore = ServiceManager.getService('WSPF04');
	var locator = corpore.instantiate('com.totvs.WSPF04');
	var service = locator.getWSPF04SOAP();

	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("LS_ALIAS");
	newDataset.addColumn("LS_ENVOPER");
	newDataset.addColumn("LS_IPCONN");
	newDataset.addColumn("LS_MSBLQL");
	newDataset.addColumn("LS_UUID");
	
	var codigo = "99061";
	var loja = "00";
	
	if (constraints != null) {
		for(var c in constraints){
			if (constraints[c].getFieldName() == "cliente"){
				codigo = constraints[c].getInitialValue();
			} else if (constraints[c].getFieldName() == "loja"){
				loja= constraints[c].getInitialValue();
			} 
		}
	}
	
	var array = service.pf4GETTOTVSID(codigo, loja);
	var list = array.getSTRURETGETTOTVSID();
	for (var i=0;i<list.size();i++) {
		var instalacao = list.get(i);
		
		newDataset.addRow(new Array(instalacao.getLSALIAS(),
				instalacao.getLSENVOPER(),
				instalacao.getLSIPCONN(),
				instalacao.getLSMSBLQL(),
				instalacao.getLSUUID()));
	}
	return newDataset;
}