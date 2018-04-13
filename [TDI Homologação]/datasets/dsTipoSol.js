function createDataset(fields, constraints, sortFields) {
	// Dataset para recuperar os Tipos de Contrato do SIGAJURI via Webservice. 
	
	var dsTipoSol = DatasetBuilder.newDataset();
	dsTipoSol.addColumn("id");
	dsTipoSol.addColumn("TipoSol");
	
	try{

		var service = ServiceManager.getService('SIGAJURI');
		var serviceHelper = service.getBean();
		var serviceLocator = serviceHelper.instantiate('br.com.totvs.cp.wscorp0001._8001.WSFLUIGJURIDICO');
		var TipoSolService = serviceLocator.getWSFLUIGJURIDICOSOAP();
		
		var TipoSol = TipoSolService.mttipossolicitacao();
		var Dados = TipoSol.getDADOS().getSTRUDADOS();
		
		for(var i = 0; i < Dados.size(); i++){
			dsTipoSol.addRow(new Array(Dados.get(i).getCODIGO(), Dados.get(i).getDESCRICAO().trim()));
		}	
	}
	catch(e){
		dsTipoSol.addRow(new Array("", e.message));
	}
	
	return dsTipoSol;
}