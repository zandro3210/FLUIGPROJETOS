function createDataset(fields, constraints, sortFields) {
	var dsGeraMinutaSIGAJURI = DatasetBuilder.newDataset();
	dsGeraMinutaSIGAJURI.addColumn("id_peticao");
	
	var cdCajuri = "";
	var cdTipoCon = "";
	var cdPeticao = "";
	
	for (var i = 0; i < constraints.length; i++){
		if (constraints[i].fieldName == "cdCajuri"){
			cdCajuri = constraints[i].initialValue;
		} else if (constraints[i].fieldName == "cdTipoCon"){
			cdTipoCon = constraints[i].initialValue;			
		}
	}
	
	try{

		var service = ServiceManager.getService('SIGAJURI');
		var serviceHelper = service.getBean();
		var serviceLocator = serviceHelper.instantiate('br.com.totvs.cp.wscorp0001._8001.WSFLUIGJURIDICO');
		var UpdFUService = serviceLocator.getWSFLUIGJURIDICOSOAP();
		
		cdPeticao = UpdFUService.mtgeraminuta(cdCajuri,cdTipoCon);
		
		dsGeraMinutaSIGAJURI.addRow(new Array(cdPeticao));
	}
	catch(e){
		log.info("*** dsGeraMinutaSIGAJURI - Não foi possível realizar a operação de geração de minutas automáticas: " + (e.message));
		dsGeraMinutaSIGAJURI.addRow(new Array("0"));
	}
	
	return dsGeraMinutaSIGAJURI;
}