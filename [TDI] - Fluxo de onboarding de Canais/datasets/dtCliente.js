function createDataset(fields, constraints, sortFields) {		// Cria o dataset	var newDataset = DatasetBuilder.newDataset();	newDataset.addColumn("CODIGO");	newDataset.addColumn("RAZAO");	newDataset.addColumn("SEGMENTO");	newDataset.addColumn("MODALIDADE");	newDataset.addColumn("CONTATO");	newDataset.addColumn("CARGO");	newDataset.addColumn("AREA");	newDataset.addColumn("FONECONTATO");	newDataset.addColumn("EMAILCONTATO");	newDataset.addColumn("EAR");    		// Conecta o servico e busca o cliente	var periodicService = ServiceManager.getService('wsOportunidade');	var serviceHelper  = periodicService.getBean();	var serviceLocator = serviceHelper.instantiate('br.com.totvs.ssimwsportal.CHAMTECLocator');	var service = serviceLocator.getCHAMTECSOAP();	// Invoca o servico	try {log.info("DTCLIENTE");		var cliente = "T03450";	     if (fields != null) {	    	 cliente = fields[0].toUpperCase(); 	     }			     var a = service.RETSA1(cliente); //FIELDS[0]	     	     var nomeVendedor = service.FETCH_SA3_FIELD("false", "", a.get_A1VEND(), "A3_NOME", "", "", "");	     	 	 var c1 = DatasetFactory.createConstraint("segmento", a.get_A1CODSEG(), a.get_A1CODSEG(), ConstraintType.MUST); 		 var c2 = DatasetFactory.createConstraint("subSegmento", a.get_A1CODSUB(), a.get_A1CODSUB(), ConstraintType.MUST); 		 var dsSegmento = DatasetFactory.getDataset("ds_segmentos_sub_segmentos ", null, new Array(c1,c2), null);	     var segmento = a.get_A1CODSEG() + " - " + a.get_A1CODSUB();	  	 if (dsSegmento != null && dsSegmento.rowsCount > 0) {			segmento = dsSegmento.getValue(0, "descricaoSegmento") + " - " + dsSegmento.getValue(0, "descricaoSubSegmento"); 		 }	     	     log.info("nomeVendedor:" + nomeVendedor);	     	     newDataset.addRow(new Array(a.get_A1COD(),a.get_A1NOME(),segmento,a.get_A1MODCFD(),a.get_A1CONTATO(),a.get_A1_CARGO(),a.get_A1CTARE(),a.get_A1TEL(),a.get_A1EMAIL(),nomeVendedor));	     	} catch(error) { log.info("DTCLIENTE"); newDataset.addRow(new Array("erro", error.message,"erro", "erro","erro","erro","erro","erro","erro","erro")); }	return newDataset;}