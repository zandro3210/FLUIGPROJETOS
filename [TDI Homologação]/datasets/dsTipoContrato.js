function createDataset(fields, constraints, sortFields) {
	// Dataset para recuperar os Tipos de Contrato do SIGAJURI via Webservice. 
	
	var dsTipoCon = DatasetBuilder.newDataset();
	dsTipoCon.addColumn("id");
	dsTipoCon.addColumn("TipoCon");
	
	try{

		var service = ServiceManager.getService('SIGAJURI');
		var serviceHelper = service.getBean();
		var serviceLocator = serviceHelper.instantiate('br.com.totvs.cp.wscorp0001._8001.WSFLUIGJURIDICO');
		var TipoConService = serviceLocator.getWSFLUIGJURIDICOSOAP();
		
		var TipoCon = TipoConService.mttiposcontratos();
		var Dados = TipoCon.getDADOS().getSTRUDADOS();
		
		for(var i = 0; i < Dados.size(); i++){
			dsTipoCon.addRow(new Array(Dados.get(i).getCODIGO(), Dados.get(i).getDESCRICAO().trim()));
		}	
	}
	catch(e){
		dsTipoCon.addRow(new Array("", e.message));
	}
	
	return dsTipoCon;
}