function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CodCC");
	newDataset.addColumn("DescCC");
	var centroCusto = "";
	var NOME_SERVICO = "CC_PerfilAcesso3";
	var CAMINHO_SERVICO = "com.totvs.protheus.perfilacesso3.PERFILACESSO";		
	var servico = ServiceManager.getService(NOME_SERVICO);
	var instancia = servico.instantiate(CAMINHO_SERVICO);
	var SOAP = instancia.getPERFILACESSOSOAP();
	var Perfil = SOAP.lstcustos(centroCusto);
	var lstCentroCustos = Perfil.getCCUSTOS();	
	for (var i = 0; i < lstCentroCustos.size(); i++){
		newDataset.addRow(new Array(lstCentroCustos.get(i).getCCODIGO(), lstCentroCustos.get(i).getCDESCRI().trim()));
	}
	
	return newDataset;

}