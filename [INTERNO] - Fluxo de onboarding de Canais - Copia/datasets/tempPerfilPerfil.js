function createDataset(fields, constraints, sortFields) {
	
	// Cria o dataset
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CodCC");
	newDataset.addColumn("CodPerfil");
	newDataset.addColumn("DesPerfil");

	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == "CodCC") {
				centroCusto = constraints[i].initialValue;
			}
		}
	}else{
		centroCusto = "";
	}
	//centroCusto = "11131000";
	var NOME_SERVICO = "CC_PerfilAcesso3";
	var CAMINHO_SERVICO = "com.totvs.protheus.perfilacesso3.PERFILACESSO";
	var servico = ServiceManager.getService(NOME_SERVICO);
	var instancia = servico.instantiate(CAMINHO_SERVICO);
	var SOAP = instancia.getPERFILACESSOSOAP();
	var Perfil = SOAP.lstperfiscc(centroCusto);
	var lstPerfil = Perfil.getPERFILXCC();
	
	
	for (var i = 0; i < lstPerfil.size(); i++){
		newDataset.addRow(new Array(centroCusto,lstPerfil.get(i).getCCODIGO(), lstPerfil.get(i).getCDESCRI()));
	}	
	
	return newDataset;

}
