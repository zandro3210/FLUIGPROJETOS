function createDataset(fields, constraints, sortFields) {
	// Dataset para recuperar os escritórios cadastrados no SIGAJURIS via Webservice (NS7).
	
	var dsParte = DatasetBuilder.newDataset();
	dsParte.addColumn("id");
	dsParte.addColumn("Razao_Social");
	dsParte.addColumn("Cnpj");
	
	try{

		var service = ServiceManager.getService('SIGAJURI');
		var serviceHelper = service.getBean();
		var serviceLocator = serviceHelper.instantiate('br.com.totvs.cp.wscorp0001._8001.WSFLUIGJURIDICO');
		var AssJurService = serviceLocator.getWSFLUIGJURIDICOSOAP();
		
		var Empresa = AssJurService.mtpartescontrarias();
		var Dados = Empresa.getSTRUEMPRESA();
		
		for(var i = 0; i < Dados.size(); i++){
			dsParte.addRow(new Array(Dados.get(i).getCODIGO(), Dados.get(i).getRAZAOSOCIAL().trim(), Dados.get(i).getCNPJ().trim()));
		}	
	}
	catch(e){
		dsParte.addRow(new Array("", e.message));
	}
	
	return dsParte;
}