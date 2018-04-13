function createDataset(fields, constraints, sortFields) {

	try{
		log.info("DATASET DSWORKFLOWROLECAIXAEBANCO- INI");
		
		var datasetSolic = DatasetBuilder.newDataset();
			datasetSolic.addColumn("roleId");
			datasetSolic.addColumn("roleDescription");
	
		//Define os campos para ordenação
	    var fields = new Array("workflowRolePK.roleId","roleDescription");
	    var dataset      = DatasetFactory.getDataset("workflowRole", fields, null, null);
	    //var dataset      = DatasetFactory.getDataset("workflowRole", null, null, null);
    
	    var id;
	    log.info ("pto 1: dataset.rowsCount: " + dataset.rowsCount);
	   
	    if (dataset != null){
	    	if (dataset.rowsCount > 0) {
	    		log.info ("pto 1: ENTROUUU");
	    		
	    		for (var i = 0; i < dataset.rowsCount; i++) {
			    	id = new String(dataset.getValue(i, "workflowRolePK.roleId")); //workflowRolePK.roleId
			    	
			    	log.info ("id.substring(0,17): " + id.substring(0,17));
			    	
			    	if (id.substring(0,17) == "CST_CAIXA_PEQUENO") {
			    		// nao colocar id pois é uma var tipo String e nao eu certo - ela so serve para fazer o substring 
			    		datasetSolic.addRow(new Array(dataset.getValue(i, "workflowRolePK.roleId"), //workflowRolePK.roleId
			    									  dataset.getValue(i, "roleDescription")));
			    		log.info(dataset.getValue(i, "workflowRolePK.roleId") + " - " + dataset.getValue(i, "roleDescription"));
					}
				}
				
	    	}
	    	else{
	    		log.info ("dataset.rowsCount zero: " + dataset.rowsCount);
	    	}
	    }
	    else{
	    	log.info ("dataset null");
	    }
	
	    log.info(" DATASET DSWORKFLOWROLECAIXAEBANCO - FIM");
	} // try 
	catch(error) {
		log.info (" ++ DATASET DSWORKFLOWROLECAIXAEBANCO - ERRO: " + error.message);
		newDataset.addRow(new Array("erro", "erro")); 
	}
    
	return datasetSolic;
    
}