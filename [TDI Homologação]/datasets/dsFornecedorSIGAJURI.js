function createDataset(fields, constraints, sortFields) {
	// Dataset para recuperar os fornecedores cadastrados no SIGAJURI via Webservice (SA2).
	
	var dsFornecedor = DatasetBuilder.newDataset();
	dsFornecedor.addColumn("id");
	dsFornecedor.addColumn("Razao_Social");
	dsFornecedor.addColumn("Cnpj");
	
	try{

		var service = ServiceManager.getService('SIGAJURI');
		var serviceHelper = service.getBean();
		var serviceLocator = serviceHelper.instantiate('br.com.totvs.cp.wscorp0001._8001.WSFLUIGJURIDICO');
		var AssJurService = serviceLocator.getWSFLUIGJURIDICOSOAP();
		
		var Empresa = AssJurService.mtfornecedores();
		var Dados = Empresa.getSTRUEMPRESA();
		
		for(var i = 0; i < Dados.size(); i++){
			dsFornecedor.addRow(new Array(Dados.get(i).getCODIGO(), Dados.get(i).getRAZAOSOCIAL().trim(), Dados.get(i).getCNPJ().trim()));
		}	
	}
	catch(e){
		dsFornecedor.addRow(new Array("", e.message));
	}
	
	return dsFornecedor;
}