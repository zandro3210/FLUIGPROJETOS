function createDataset(fields, constraints, sortFields) {
	// Dataset para recuperar os assuntos juridicos do SIGAJURIS via Webservice.
	
	var dsAssJur = DatasetBuilder.newDataset();
	dsAssJur.addColumn("id");
	dsAssJur.addColumn("AssJur");
	
	try{

		var service = ServiceManager.getService('SIGAJURI');
		var serviceHelper = service.getBean();
		var serviceLocator = serviceHelper.instantiate('wsfluigjuridico.sigajuri.totvs.com.WSFLUIGJURIDICO');
		var AssJurService = serviceLocator.getWSFLUIGJURIDICOSOAP();
		
		var AssJur = AssJurService.mtassuntosjuridicos();
		var Dados = AssJur.getDADOS().getSTRUDADOS();
		
		dsAssJur.addRow(new Array("*", "*"));
		
		for(var i = 0; i < Dados.size(); i++){
			dsAssJur.addRow(new Array(Dados.get(i).getCODIGO(), Dados.get(i).getDESCRICAO().trim()));
		}	
	}
	catch(e){
		dsAssJur.addRow(new Array("", e.message));
	}
	
	return dsAssJur;
}