function createDataset(fields, constraints, sortFields) {
	// Dataset para recuperar os escritórios cadastrados no SIGAJURIS via Webservice (NS7).
	
	var dsArea = DatasetBuilder.newDataset();
	dsArea.addColumn("id");
	dsArea.addColumn("Area");
	
	try{

		var service = ServiceManager.getService('SIGAJURI');
		var serviceHelper = service.getBean();
		var serviceLocator = serviceHelper.instantiate('wsfluigjuridico.sigajuri.totvs.com.WSFLUIGJURIDICO');
		var AssJurService = serviceLocator.getWSFLUIGJURIDICOSOAP();
		
		var AssJur = AssJurService.mtareasjuridicas();
		var Dados = AssJur.getDADOS().getSTRUDADOS();
		
		for(var i = 0; i < Dados.size(); i++){
			dsArea.addRow(new Array(Dados.get(i).getCODIGO(), Dados.get(i).getDESCRICAO().trim()));
		}	
	}
	catch(e){
		dsArea.addRow(new Array("", e.message));
	}
	
	return dsArea;
}