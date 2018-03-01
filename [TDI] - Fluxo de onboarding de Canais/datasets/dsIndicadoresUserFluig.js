function createDataset(fields, constraints, sortFields) {
	
	try {
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
		
		newDataset.addColumn("MATFLUIG");
		newDataset.addColumn("CODINDICADOR");
		
		var matricula = "ricardo.andre.totvs.com.br.10097";
		
		if (constraints != null) {
			matricula = constraints[0].getInitialValue();
		}
		
		// consulta WS do Protheus os indicadores relaciona ao usuario
		
		// SERVICO criado COM Axis ECM 3
		var periodicService = ServiceManager.getService('WSINDICADORES');
		log.info ("CONSULTA USUARIO FLUIG - dsIndicadoresUserFluig.js - PTO 2 - servico ok");
		
		var serviceLocator = periodicService.instantiate('pkgIndicadoresAxis.WSINDICADORESLocator');
		log.info ("CONSULTA USUARIO FLUIG - dsIndicadoresUserFluig.js - PTO 3 - instantiate ok");
		
		var service = serviceLocator.getWSINDICADORESSOAP();
		log.info ("CONSULTA USUARIO FLUIG - dsIndicadoresUserFluig.js - PTO 4 - metodo getWSINDICADORESSOAP() ok");
			
		// Invoca o servico
		var retorno = service.CONUSRFLUIG(matricula,"");
		log.info ("CONSULTA USUARIO FLUIG - dsIndicadoresUserFluig.js - PTO 5" + retorno);
		
		var arrayIndicadoresUser = retorno.getCONUSRFINDI();
		log.info ("CONSULTA USUARIO FLUIG - dsIndicadoresUserFluig.js - PTO 6" + arrayIndicadoresUser);
		
		
		if(arrayIndicadoresUser != null && arrayIndicadoresUser.length > 0) {
			log.info ("CONSULTA USUARIO FLUIG - dsIndicadoresUserFluig.js - PTO 7 " + arrayIndicadoresUser[0].getAINDICADORES().getTCONFLUIND());
			var arrayIndicadores = arrayIndicadoresUser[0].getAINDICADORES().getTCONFLUIND();
			for (var i = 0; i < arrayIndicadores.length; i++) {
				var r = arrayIndicadores[i];
				log.info ("CONSULTA USUARIO FLUIG - dsIndicadoresUserFluig.js - PTO 8" + r);
				newDataset.addRow(new Array(matricula, r.getCINDICADORES()));
				log.info ("matricula: " + matricula +
							" r.getCINDICADORES(): " + r.getCINDICADORES());
			}
		}
	  	
	} // try
	catch(error) {
		log.info (" ++ DATASET WSINDICADORES - dsTipoIndicador - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro",error.message)); 
	}
	
	return newDataset;	

}