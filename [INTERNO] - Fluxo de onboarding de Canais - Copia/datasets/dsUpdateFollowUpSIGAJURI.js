function createDataset(fields, constraints, sortFields) {
	var dsUpdateFollowUpSIGAJURI = DatasetBuilder.newDataset();
	dsUpdateFollowUpSIGAJURI.addColumn("retorno");
	
	var sFollowUp = "";
	var sStatus = "";
	var sObsExec = "";
	var sDocs = "";
	
	var retorno = true;
	
	
	for (var i = 0; i < constraints.length; i++){
		if (constraints[i].fieldName == "sFollowUp"){
			sFollowUp = constraints[i].initialValue;
		} else if (constraints[i].fieldName == "sStatus"){
			sStatus = constraints[i].initialValue;			
		} else if (constraints[i].fieldName == "sDocs"){
			sDocs = constraints[i].initialValue;
		} else if (constraints[i].fieldName == "sObsExec"){
			sObsExec = constraints[i].initialValue;			
		}
	}
	
	try{

		var service = ServiceManager.getService('SIGAJURI');
		var serviceHelper = service.getBean();
		var serviceLocator = serviceHelper.instantiate('wsfluigjuridico.sigajuri.totvs.com.WSFLUIGJURIDICO');
		var UpdFUService = serviceLocator.getWSFLUIGJURIDICOSOAP();
		
		retorno = UpdFUService.mtjursyncfollowup(sFollowUp, sStatus, sObsExec, sDocs);
		
		dsUpdateFollowUpSIGAJURI.addRow(new Array(retorno));
	}
	catch(e){
		dsUpdateFollowUpSIGAJURI.addRow(new Array(e.message));
	}
	
	return dsUpdateFollowUpSIGAJURI;
}