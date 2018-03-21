function createDataset(fields, constraints, sortFields) {
	var dsEnceAssjur = DatasetBuilder.newDataset();
	dsEnceAssjur.addColumn("retorno");
	
	var cdAssJur = "";
	var sStatus = "";
	var sObs = "";
	var sUser = "";
	var cdCajuri = "";
	
	var retorno = true;
	
	
	for (var i = 0; i < constraints.length; i++){
		if (constraints[i].fieldName == "cdAssJur"){
			cdAssJur = constraints[i].initialValue;
		} else if (constraints[i].fieldName == "sStatus"){
			sStatus = constraints[i].initialValue;			
		} else if (constraints[i].fieldName == "sObs"){
			sObs = constraints[i].initialValue;
		} else if (constraints[i].fieldName == "sUser"){
			sUser = constraints[i].initialValue;			
		} else if (constraints[i].fieldName == "cdCajuri"){
			cdCajuri = constraints[i].initialValue;			
		}
	}
	
	try{

		var service = ServiceManager.getService('SIGAJURI');
		var serviceHelper = service.getBean();
		var serviceLocator = serviceHelper.instantiate('wsfluigjuridico.sigajuri.totvs.com.WSFLUIGJURIDICO');
		var UpdFUService = serviceLocator.getWSFLUIGJURIDICOSOAP();
		
		var aDados = serviceHelper.instantiate('wsfluigjuridico.sigajuri.totvs.com.STRUENCERRA');
		aDados.setTIPOASSUNTOJURIDICO(cdAssJur);
		aDados.setOBSERVACOES(sObs);
		aDados.setASSUNTOJURIDICO(cdCajuri);
		aDados.setEMAILUSUARIOENCERRA(sUser);
		aDados.setSTATUS(sStatus);
					
		retorno = UpdFUService.mtjurencerraassjur(aDados);
		
		dsEnceAssjur.addRow(new Array(retorno));
	}
	catch(e){
		dsEnceAssjur.addRow(new Array(e.message));
	}
	
	return dsEnceAssjur;
}