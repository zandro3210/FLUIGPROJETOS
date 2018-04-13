function createDataset(fields, constraints, sortFields) {

	log.info("ds_metas_segmentos")
	
	var servico = ServiceManager.getService("TCRM007");
	var ws = servico.instantiate("com.totvs.crm.vendas.TCRMS007");
	var soap = ws.getTCRMS007SOAP();
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("vendedor"); 
	newDataset.addColumn("codigounidade"); 
	newDataset.addColumn("cargo"); 
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("codigocargo"); 
	newDataset.addColumn("unidade"); 
	newDataset.addColumn("meta"); 
	newDataset.addColumn("codigosegmento"); 
	newDataset.addColumn("segmento"); 
	newDataset.addColumn("unidadepropria"); 
	
	var mail = "carlos.fiorini@totvs.com.br";
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "mail"){
				mail = constraints[c].getInitialValue(); 
			}
		}
	}
	
	if (mail == "rodrigo.sombrio@totvs.com.br" || mail == "vanessa.sassoon@totvs.com.br") {
		mail = "carlos.fiorini@totvs.com.br";
	}
	if (mail == "roberto.duessmann@totvs.com.br") {
		//mail = "rodrigo.vieira@totvs.com.br";
		//mail = "mafarinas@totvs.com.br";
		//mail = "marcosng@totvs.com.br";
		//mail = "luis.mulla@totvs.com.br";
		//mail = "marco.cafasso@totvs.com.br";
		
//		mail = "marcosng@totvs.com.br";
//		mail = "marco.cafasso@totvs.com.br";
//		mail = "luis.mulla@totvs.com.br";
//		mail = "mafarinas@totvs.com.br";
//		mail = "alexandre.azevedo@totvs.com.br";
//		mail = "carlos.fiorini@totvs.com.br";
//		mail = "nara.sampaio@totvs.com.br";
//		mail = "fabio.fantini@totvs.com.br";
//		mail = "ewagner@totvs.com.br";
//		mail = "wxavier@totvs.com.br";
//		mail = "flavio.azevedo@totvs.com.br";
//		mail = "pcardoso@totvs.com.br";
//		mail = "roberto.galvao@totvs.com.br";
//		mail = "wilson@totvs.com.br";
//		mail = "jonkel.magalhaes@totvs.com.br";
//		mail = "danilo.prates@totvs.com.br";

//		mail = "eduardo.lima@totvs.com.br";
//		mail = "margareth@totvs.com.br";
//		mail = "rafael.cota@totvs.com.br";	
//		mail = "wilson@totvs.com.br";	
//		mail = "sidney.flores@totvs.com.br";	
//		mail = "paulo.morais@totvs.com.br";
		
//		mail = "pcardoso@totvs.com.br";
		
		mail = "percy.arjona@totvs.com.br";
		
		
//		mail = "luis.mulla@totvs.com.br";
//		mail = "eloise.am@totvs.com.br";		

		log.info("alter mail Forecast from roberto:" + mail);
				
	}
	
	if (mail == "martha.salgado@totvs.com.br") {
		//mail = "marcosng@totvs.com.br";
		mail = "mafarinas@totvs.com.br";
		log.info("alter mail Forecast from martha:" + mail);
	}

	try {
		
		log.info("mail:" + mail)
		
		var r = soap.retdadosvend(mail);
		
		log.info("r:" + r.getVENDEDORES())
		
		var list = r.getVENDEDORES().getDADOSVENDEDOR();
		
		for (var i=0; i<list.size(); i++) {
			var vendedor = list.get(i);
			log.info("vendedor:" + vendedor)
			var metas = vendedor.getMETAS().getMETASVENDEDOR();
			for (var x=0; x<metas.size(); x++) {
				var m = metas.get(x);

				newDataset.addRow(new Array(vendedor.getVENDEDOR().trim(), 
											vendedor.getCODIGOUNID().trim(),
											vendedor.getCARGO().trim(),
											vendedor.getCODIGO().trim(),
											vendedor.getCODIGOCARGO().trim(),
											vendedor.getUNIDADE().trim(),
											m.getMETA(),
											m.getCODIGOSEGMENTO().trim(),
											m.getSEGMENTO().trim(),
											vendedor.getUNIDPROPRI()));
				
			}
		}
	} catch(e) {   
		newDataset.addRow(new Array("erro", e, "", "", "", "", "", "", ""));
	}
	
	return newDataset;		   
	
}
