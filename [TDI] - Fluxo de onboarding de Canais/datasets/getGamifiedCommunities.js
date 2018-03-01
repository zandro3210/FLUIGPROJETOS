function createDataset(fields, constraints, sortFields) {
	
	    //Cria as colunas
	    var dataset = DatasetBuilder.newDataset();
	    dataset.addColumn("formId");
	    dataset.addColumn("id");
	    dataset.addColumn("community");
	     
	    //Cria a constraint para buscar os formulários ativos
	    var datasetPrincipal = DatasetFactory.getDataset("getActiveGames", fields, constraints, sortFields);
	     
	    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
	        var documentId = datasetPrincipal.getValue(i, "metadata#id");
	        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");
	         
	        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
	        var c1 = DatasetFactory.createConstraint("tablename", "allowedcommunities" ,"allowedcommunities", ConstraintType.MUST);
	        var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
	        var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
	        var constraintsFilhos = new Array(c1, c2, c3);
	 
	        //Busca o dataset
	        var datasetFilhos = DatasetFactory.getDataset("gameDataset", null, constraintsFilhos, null);
	 
	        for (var j = 0; j < datasetFilhos.rowsCount; j++) {
	            //Adiciona os valores nas colunas respectivamente.
	            dataset.addRow(new Array(
	                    documentId,
	                    datasetFilhos.getValue(j, "wdk_sequence_id"),
	                    datasetFilhos.getValue(j, "communityalias")));
	        }

	    }
	     
	    return dataset;
	
}