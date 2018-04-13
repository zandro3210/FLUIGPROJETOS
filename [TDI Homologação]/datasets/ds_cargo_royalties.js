function createDataset(fields, constraints, sortFields) {
	
	log.info("@@@ds_cargo_royalties")
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("vendedor"); 
	newDataset.addColumn("codigounidade"); 
	newDataset.addColumn("cargo"); 
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("codigocargo"); 
	newDataset.addColumn("unidade"); 

	var mail = "eneliza.folgoni@totvs.com.br";
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "mail"){
				mail = constraints[c].getInitialValue(); 
			}
		}
	}


	try {

		if(mail != null){
			var servico = ServiceManager.getService("TCRMS007axis");
			var ws = servico.instantiate("localhost.TCRMS007Locator");
			var soap = ws.getTCRMS007SOAP();


			var vendedor = soap.RETESTRUTURAVEND(mail);

			if(vendedor.getSTATUS().indexOf("OK") > -1){
				var user = vendedor.getVENDEDORES().getDADOSVENDEDOR();


				for(var i in user){

					newDataset.addRow(new Array(user[i].getVENDEDOR().trim(), 
							user[i].getCODIGOUNID().trim(),
							user[i].getCARGO().trim(),
							user[i].getCODIGO().trim(),
							user[i].getCODIGOCARGO().trim(),
							user[i].getUNIDADE().trim()));
				}

			}
		}else{
			newDataset.addRow(new Array("Email obrigatorio", "", "", "", "", ""));
		}

	} catch (e) {
		newDataset.addRow(new Array("erro", e, "", "", "", ""));
	}

	return newDataset;
}