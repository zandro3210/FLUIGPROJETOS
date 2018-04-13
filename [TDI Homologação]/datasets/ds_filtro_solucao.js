function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("documentId");
	dataset.addColumn("tipo");
	dataset.addColumn("tamanho");
	
	var porteopcp = false;
	var porteopcm = false;
	var porteopcg = false;
	
	if (constraints != null) {
		for(var i in constraints) {
			if(constraints[i].fieldName == "tamanho" && constraints[i].initialValue == "P"){
				porteopcp = true;
			}
			if(constraints[i].fieldName == "tamanho" && constraints[i].initialValue == "M"){
				porteopcm = true;
			}
			if(constraints[i].fieldName == "tamanho" && constraints[i].initialValue == "G"){
				porteopcg = true;
			}
		}
	}
	
	var cActive = DatasetFactory.createConstraint("metadata#active","true", "true", ConstraintType.MUST);
	
	var constraintsSolucoes = [];
	constraintsSolucoes.push(cActive);
	// solucoes
	var solucoesDS = DatasetFactory.getDataset("Solucoes",null,constraintsSolucoes,null);
	if(solucoesDS != null && solucoesDS.rowsCount > 0){
		for(var i = 0; i < solucoesDS.rowsCount; i++){
			/* caso o filtro de tamanho seja informado e nao encontre o tamanho correspondente vai para proxima iteracao */
			if((porteopcp || porteopcm || porteopcg)
					&& !((porteopcp && solucoesDS.getValue(i,"porteopcp") == "Pequeno")
						|| (porteopcm && solucoesDS.getValue(i,"porteopcm") == "Médio")
						|| (porteopcg && solucoesDS.getValue(i,"porteopcg") == "Grande"))){
				continue;
			}
			
	    	var documentId = solucoesDS.getValue(i,"metadata#id");
			var documentVersion = solucoesDS.getValue(i,"metadata#version");
			var tamanhos = [
 		       {
		    	   tamanho : "P",
		    	   add : solucoesDS.getValue(i,"porteopcp") == "Pequeno"
		       },
		       {
		    	   tamanho : "M",
		    	   add : solucoesDS.getValue(i,"porteopcm") == "Médio"
		       },
		       {
		    	   tamanho : "G",
		    	   add : solucoesDS.getValue(i,"porteopcg") == "Grande"
		       }
			];
			if(!isNaN(documentId)){
				tamanhos.forEach(function(item){
					if(item.add){
						dataset.addRow([
			                documentId,
			                "solucao",
			                item.tamanho
			        	]);
					}
				});
			}
	        
	        var constraintsCases = [];
	        constraintsCases.push(cActive);
	        constraintsCases.push(DatasetFactory.createConstraint("tablename", "tabledetailname1" ,"tabledetailname1", ConstraintType.MUST));
	        constraintsCases.push(DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST));
	        constraintsCases.push(DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST));

	        // cases
	        var datasetCases = DatasetFactory.getDataset("Solucoes", null, constraintsCases, null);
	        
	        if(datasetCases != null && datasetCases.rowsCount > 0){
		        for(var j = 0; j < datasetCases.rowsCount; j++){
		        	var caseId = datasetCases.getValue(j,"column1_1");
		        	if(!isNaN(caseId)){
			        	tamanhos.forEach(function(item){
							if(item.add){
								dataset.addRow([
					                caseId,
					                "case",
					                item.tamanho
					        	]);
							}
						});
		        	}
		        }
	        }
	        
	        // materiais
	        var constraintsMateriais = [];
	        constraintsMateriais.push(cActive);
	        constraintsMateriais.push(DatasetFactory.createConstraint("tablename", "tabledetailname2" ,"tabledetailname2", ConstraintType.MUST));
	        constraintsMateriais.push(DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST));
	        constraintsMateriais.push(DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST));

	        var datasetMateriais = DatasetFactory.getDataset("Solucoes", null, constraintsMateriais, null);
	        
	        if(datasetMateriais != null && datasetMateriais.rowsCount > 0){
		        for(var j = 0; j < datasetMateriais.rowsCount; j++){
		        	var materialId = datasetMateriais.getValue(j,"column1_2");
		        	if(!isNaN(materialId)){
			        	tamanhos.forEach(function(item){
							if(item.add){
								dataset.addRow([
					                materialId,
					                "material",
					                item.tamanho
					        	]);
							}
						});
		        	}
		        }
	        }
	        
	        // videos
	        var constraintsVideos = [];
	        constraintsVideos.push(cActive);
	        constraintsVideos.push(DatasetFactory.createConstraint("tablename", "tabledetailname5" ,"tabledetailname5", ConstraintType.MUST));
	        constraintsVideos.push(DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST));
	        constraintsVideos.push(DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST));

	        var datasetVideos = DatasetFactory.getDataset("Solucoes", null, constraintsVideos, null);
	        
	        if(datasetVideos != null && datasetVideos.rowsCount > 0){
		        for(var j = 0; j < datasetVideos.rowsCount; j++){
		        	var videoId = datasetVideos.getValue(j,"column1_5");
		        	if(!isNaN(videoId)){
		        		tamanhos.forEach(function(item){
							if(item.add){
								dataset.addRow([
					                videoId,
					                "video",
					                item.tamanho
					        	]);
							}
						});
		        	}
		        }
	        }
		}
	}
	return dataset;
}

function defineStructure() {
    addColumn("documentId");
    addColumn("tipo");
    addColumn("tamanho");

    setKey([ "documentId", "tipo", "tamanho" ]);
    addIndex([ "documentId", "tipo", "tamanho" ]);
}

function onSync(lastSyncDate) {
    var dataset = DatasetBuilder.newDataset();
    
    var newerDataset = createDataset();
    var olderDataset = DatasetFactory.getDataset("ds_filtro_solucao", null, null, null);
    
    var ifNull = function(value, ifNullValue){
    	return value == null || value == "" ? ifNullValue : value;
    }
    
    if(newerDataset != null){
    	var updated = [];
    	for(var i = 0; i < newerDataset.rowsCount; i++){
    		dataset.addOrUpdateRow([
    				ifNull(newerDataset.getValue(i,"documentId"), ""),
					ifNull(newerDataset.getValue(i,"tipo"), ""),
					ifNull(newerDataset.getValue(i,"tamanho"), "")
    		]);
    		updated.push(newerDataset.getValue(i,"documentId") + ";" + newerDataset.getValue(i,"tipo") + ";" + newerDataset.getValue(i,"tamanho"));
    	}
    	if(olderDataset != null){
	    	for(var i = 0; i < olderDataset.rowsCount; i++){
	    		if(updated.indexOf(olderDataset.getValue(i,"documentId") + ";" + olderDataset.getValue(i,"tipo") + ";" + olderDataset.getValue(i,"tamanho")) == -1){
	    			dataset.deleteRow([
	        				ifNull(olderDataset.getValue(i,"documentId"), ""),
	    					ifNull(olderDataset.getValue(i,"tipo"), ""),
	    					ifNull(olderDataset.getValue(i,"tamanho"), "")
	        		]);
	    		}
	    	}
    	}
    }
    
    return dataset;
}

function onMobileSync(user) {
    var result = {
        'fields' : [],
        'constraints' : [],
        'sortingFields' : []
    };
    return result;
}