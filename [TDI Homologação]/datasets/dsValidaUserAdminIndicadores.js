function createDataset(fields, constraints, sortFields) {
	
	try {
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
		
		newDataset.addColumn("EMAIL");
		newDataset.addColumn("ISADMINISTRADOR");
		
		var userAdmin = false;
		var email = "";
		
		if (constraints != null) {
			email = constraints[0].getInitialValue();
		}
		
		// consulta WS do Protheus para validar os usuario que podem incluir ou alterar essa tela
		
		// SERVICO criado COM Axis ECM 3
		var periodicService = ServiceManager.getService('WSINDICADORES');
		log.info ("CADASTRO USUARIO FLUIG - dsValidaUserAdminIndicadores.js - PTO 2 - servico ok");
		
		var serviceLocator = periodicService.instantiate('pkgIndicadoresAxis.WSINDICADORESLocator');
		log.info ("CADASTRO USUARIO FLUIG - dsValidaUserAdminIndicadores.js - PTO 3 - instantiate ok");
		
		var service = serviceLocator.getWSINDICADORESSOAP();
		log.info ("CADASTRO USUARIO FLUIG - dsValidaUserAdminIndicadores.js - PTO 4 - metodo getWSINDICADORESSOAP() ok");
			
		// Invoca o servico
		var retorno = service.CONSADMINFL("");
		log.info ("CADASTRO USUARIO FLUIG - dsValidaUserAdminIndicadores.js - PTO 5" + retorno);
		
		var arrayUsuariosAdmin = retorno.getCONSADMIN();
		log.info ("CADASTRO USUARIO FLUIG - dsValidaUserAdminIndicadores.js - PTO 6" + arrayUsuariosAdmin);
		
	  	for (var i = 0; i < arrayUsuariosAdmin.length; i++) {
			var r = arrayUsuariosAdmin[i];
			if(r.getCMAILADM() == email) {
				userAdmin = true;
				break;
			}
		}
		newDataset.addRow(new Array(email,userAdmin));
	  	
	} // try
	catch(error) {
		log.info (" ++ DATASET WSINDICADORES - dsTipoIndicador - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro",error.message)); 
	}
	
	return newDataset;	

}