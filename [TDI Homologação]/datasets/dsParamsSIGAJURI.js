function createDataset(fields, constraints, sortFields) {
	// Dataset de parametros da Widget. Expandir conforme necessidade, mantendo os parametros o mais centralizados possivel.~
	
	var dsParamsSIGAJURI = DatasetBuilder.newDataset();
	
	var dataset = DatasetFactory.getDataset("pass_validate", null, null, null);
	var json = dataset.getValue(0, "USER");
	var obj = JSON.parse(json);

	// Invoca o servico
	var codUsuario = obj.user;
	var senha = obj.pass;
	
	// Usu?rio Admin para a widget.
	dsParamsSIGAJURI.addColumn("sAdmin");
	// Senha do usu?rio Admin para a widget.
	dsParamsSIGAJURI.addColumn("sPassword");
	// Id do Form da Widget, usado para salvar as informações de aprovadores de follow-up
	dsParamsSIGAJURI.addColumn("nFormIdAprov");
	// Id da Empresa no Fluig.
	dsParamsSIGAJURI.addColumn("nTenantId");
	// Id do Form da Widget, usado para salvar as informações de distribuição de contratos
	dsParamsSIGAJURI.addColumn("nFormIdContrato");
	// Id do Form da Widget, usado para salvar as informações de distribuição de contratos
	dsParamsSIGAJURI.addColumn("nFormIdConsultivo");
	// user, senha, id da widget e o código da empresa. 
	dsParamsSIGAJURI.addRow(new Array(codUsuario, senha, 4640716, 10097,0,0));
	
	return dsParamsSIGAJURI;
}