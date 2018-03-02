function createDataset(fields, constraints, sortFields) {

	log.info("ds_metas_segmentos")
	
	var servico = ServiceManager.getService("TCRMWSVEND");
	var ws = servico.instantiate("com.totvs.crm.vendas.TCRMWSVEND");
	var soap = ws.getTCRMWSVENDSOAP();
	
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
	
	var mail = "eduardo.lima@totvs.com.br";
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "mail"){
				mail = constraints[c].getInitialValue(); 
			}
		}
	}
	
	if (mail == "rodrigo.sombrio@totvs.com.br") {
		mail = "edemar.kluck@totvs.com.br";
	}

	try {
		
		log.info("mail:" + mail)
		
		var r = soap.retdadosvend(mail);
		
		log.info("r:" + r.getVENDEDORES())
		
		var list = r.getVENDEDORES().getDADOSVENDEDOR();
		
		var listaunidades = new java.util.HashMap();
		
		for (var i=0; i<list.size(); i++) {
			var vendedor = list.get(i);
			log.info("vendedor:" + vendedor);
			
			var nome = vendedor.getVENDEDOR().toLowerCase().trim();
			if (nome.indexOf("desat") != -1) {
				var metas = vendedor.getMETAS().getMETASVENDEDOR();
				
				var un = listaunidades.get(vendedor.getCODIGOUNID().trim());
				if (un == null) {
					if (metas.size() > 0) {
						listaunidades.put(vendedor.getCODIGOUNID().trim(), "");
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
														m.getSEGMENTO().trim()));
							
						}
					}
				}			
				
			}
			
		}
	} catch(e) {   
		newDataset.addRow(new Array("erro", e, "", "", "", "", "", "", ""));
	}
	
	return newDataset;		   
	
}
