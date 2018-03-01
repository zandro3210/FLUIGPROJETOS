function createDataset(fields, constraints, sortFields) {
	
	var corpore = ServiceManager.getService('TSRVS003');
	var locator = corpore.instantiate('com.totvs.pms.TSRVS003');
	var service = locator.getTSRVS003SOAP();
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("TECNICO");
	newDataset.addColumn("NOMETECNICO");
	newDataset.addColumn("CARGO");
	newDataset.addColumn("DESCRICAOCARGO");
	
	var valor = "sombrio";
	
	if (constraints != null) {
		for(var c in constraints){
			if (constraints[c].getFieldName() == "nome"){
				valor = constraints[c].getInitialValue();
			} 
		}
	}
	
	var array = service.getlistaanalistanome(valor);
	var list = array.getSTLISTAANACOORD();
	for (var i=0;i<list.size();i++) {
		var analista = list.get(i);
		
		newDataset.addRow(new Array(analista.getTECNICO(),
				analista.getNOMETECNICO(),
				analista.getCARGO(),
				analista.getDESCRICAOCARGO()));
	}
	return newDataset;
}