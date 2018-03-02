function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("nmSolucao");
	dataset.addColumn("dscSolucao");
	dataset.addColumn("idSubsegmento");
	dataset.addColumn("nmSubsegmento");
	dataset.addColumn("idSegmento");
	dataset.addColumn("btCross");
	dataset.addColumn("categorias");
	dataset.addColumn("isCase");
	dataset.addColumn("porteopcp");
	dataset.addColumn("porteopcm");
	dataset.addColumn("porteopcg");
	dataset.addColumn("tutorial");
	
	var paramPesquisa = null;
	var nmSegmento = null;
	var nmSubsegmento = null;
	var btCross = null;
	var categorias = null;
	var porteopcp = null;
	var porteopcm = null;
	var porteopcg = null;
	
	if (constraints != null) {
		for(var i in constraints) {
			if(constraints[i].fieldName == "paramPesquisa"){
				paramPesquisa = "%"+constraints[i].initialValue+"%";
			}
			if(constraints[i].fieldName == "nmSegmento"){
				nmSegmento = constraints[i].initialValue;
			}
			if(constraints[i].fieldName == "nmSubsegmento"){
				nmSubsegmento = constraints[i].initialValue;
			}
			if(constraints[i].fieldName == "btCross"){
				btCross = constraints[i].initialValue;
			}
			if(constraints[i].fieldName == "categorias"){
				categorias = constraints[i].initialValue;
			}			
			if(constraints[i].fieldName == "porteopcp"){
				porteopcp = constraints[i].initialValue;
			}
			if(constraints[i].fieldName == "porteopcm"){
				porteopcm = constraints[i].initialValue;
			}
			if(constraints[i].fieldName == "porteopcg"){
				porteopcg = constraints[i].initialValue;
			}
		}
	}
	
	var cActive = DatasetFactory.createConstraint("metadata#active","true", "true", ConstraintType.MUST);
	
	var constraintsSolucoes = [];
	constraintsSolucoes.push(cActive);
	if(paramPesquisa != null){
		var const1 = DatasetFactory.createConstraint("nmSolucao", paramPesquisa, paramPesquisa, ConstraintType.MUST);
		const1.setLikeSearch(true);
		constraintsSolucoes.push(const1);		
	}
	if(btCross != null){
		var ct = btCross == "true" ? ConstraintType.MUST : ConstraintType.MUST_NOT;
		constraintsSolucoes.push(DatasetFactory.createConstraint("btCross", "Sim", "Sim", ct));
		
		if(categorias != null){
			constraintsSolucoes.push(DatasetFactory.createConstraint("categorias", categorias, categorias, ct));
		}
	}
	// solucoes
	var solucoesDS = DatasetFactory.getDataset("Solucoes",null,constraintsSolucoes,null);
	if(solucoesDS != null && solucoesDS.rowsCount > 0){
		for(var i = 0; i < solucoesDS.rowsCount; i++){
	    	var nmSolucao = solucoesDS.getValue(i,"nmSolucao");
	    	var documentId = solucoesDS.getValue(i,"metadata#id");
			var documentVersion = solucoesDS.getValue(i,"metadata#version");
	        
	        var constraintsCases = [];
	        constraintsCases.push(cActive);
	        constraintsCases.push(DatasetFactory.createConstraint("tablename", "tabledetailname1" ,"tabledetailname1", ConstraintType.MUST));
	        constraintsCases.push(DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST));
	        constraintsCases.push(DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST));

	        //cases
	        var datasetCases = DatasetFactory.getDataset("Solucoes", null, constraintsCases, null);
	        
	        var isCase = datasetCases != null && datasetCases.rowsCount > 0;
	        
	        //tutoriais
	        var constraintsTutoriais = [];
	        constraintsTutoriais.push(cActive);
	        constraintsTutoriais.push(DatasetFactory.createConstraint("tablename", "tabledetailname5" ,"tabledetailname5", ConstraintType.MUST));
	        constraintsTutoriais.push(DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST));
	        constraintsTutoriais.push(DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST));

	      
	        var datasetTutoriais = DatasetFactory.getDataset("Solucoes", null, constraintsTutoriais, null);
	        
	        var isTutoriais = datasetTutoriais != null && datasetTutoriais.rowsCount > 0;
	        
	        var constraintsSS1 = [];
	        constraintsSS1.push(cActive);
	        constraintsSS1.push(DatasetFactory.createConstraint("tablename", "tabledetailname2" ,"tabledetailname2", ConstraintType.MUST));
	        constraintsSS1.push(DatasetFactory.createConstraint("idSolucao", nmSolucao, nmSolucao, ConstraintType.MUST));
	        // solucoes do subsegmento
	        var datasetSS1 = DatasetFactory.getDataset("Subsegmentos", null, constraintsSS1, null);
	        if(datasetSS1 != null && datasetSS1.rowsCount > 0){
	        	for(var l = 0; l < datasetSS1.rowsCount; l++){
		        	var documentIdSubSegmento = datasetSS1.getValue(l,"documentid");
		        	
		        	var constraintsSS2 = [];
		        	constraintsSS2.push(cActive);
		        	constraintsSS2.push(DatasetFactory.createConstraint("documentId", documentIdSubSegmento, documentIdSubSegmento, ConstraintType.MUST));
		        	if(nmSegmento != null){
		        		var segmentos = nmSegmento.split(";");
		        		for(var k = 0; k < segmentos.length; k++){
		        			constraintsSS2.push(DatasetFactory.createConstraint("idSegmento", segmentos[k], segmentos[k], ConstraintType.SHOULD));
		        		}
		        	}
		        	if(nmSubsegmento != null){
		        		var subSegmentos = nmSubsegmento.split(";");
		        		for(var k = 0; k < subSegmentos.length; k++){
		        			constraintsSS2.push(DatasetFactory.createConstraint("nmSubsegmento", subSegmentos[k], subSegmentos[k], ConstraintType.SHOULD));
		        		}
		        	}
		        	// segmento
		        	var datasetSS2 = DatasetFactory.getDataset("Subsegmentos", null, constraintsSS2, null);
		        	if(datasetSS2 != null && datasetSS2.rowsCount > 0){
						for(var j = 0; j < datasetSS2.rowsCount; j++){
							var pequeno = solucoesDS.getValue(i,"porteopcp");
							var medio = solucoesDS.getValue(i,"porteopcm");
							var grande = solucoesDS.getValue(i,"porteopcg");
							
							var adiciona = false;
							
							if(porteopcp == null && porteopcm == null && porteopcg == null){
								adiciona = true;
							}
							if(porteopcp == "true" && pequeno != null){
									adiciona = true;
							}
							if(porteopcm == "true" && medio != null){
									adiciona = true;
							}
							if(porteopcg == "true" && grande != null){
									adiciona = true;
							}
							if(adiciona){
								dataset.addRow([
								                nmSolucao,
								                solucoesDS.getValue(i,"dscSolucao"),
								                datasetSS2.getValue(j,"nmSubsegmento"),
								                datasetSS2.getValue(j,"nmSubsegmento"),
								                datasetSS2.getValue(j,"idSegmento"),
								                ""+(solucoesDS.getValue(i,"btCross") == "Sim"),
								                solucoesDS.getValue(i,"categorias") == null ? "" : solucoesDS.getValue(i,"categorias"),
								                ""+(isCase),
								                ""+(pequeno == "Pequeno"),
								                ""+(medio == "Médio"),
								                ""+(grande == "Grande"),
								                ""+(isTutoriais)
								                ]);
							}
						}
		        	}
		        }
	        }
		}
	}
	return dataset;
}

function defineStructure() {
    addColumn("nmSolucao");
    addColumn("dscSolucao");
    addColumn("idSubsegmento");
    addColumn("nmSubsegmento");
    addColumn("idSegmento");
    addColumn("nmSegmento");
    addColumn("btCross");
    addColumn("categorias");
    addColumn("isCase");
    addColumn("porteopcp");
    addColumn("porteopcm");
    addColumn("porteopcg");
    addColumn("tutorial");

    setKey([ "nmSolucao", "nmSubsegmento", "nmSegmento" ]);
    addIndex([ "nmSolucao", "nmSubsegmento", "nmSegmento" ]);
    addIndex([ "btCross" ]);
}

function onSync(lastSyncDate) {
    var dataset = DatasetBuilder.newDataset();
    
    var newerDataset = createDataset();
    var olderDataset = DatasetFactory.getDataset("ds_solucoes", null, null, null);
    
    var ifNull = function(value, ifNullValue){
    	return value == null || value == "" ? ifNullValue : value;
    }
    
    if(newerDataset != null){
    	var updated = [];
    	for(var i = 0; i < newerDataset.rowsCount; i++){
    		dataset.addOrUpdateRow([
    				ifNull(newerDataset.getValue(i,"nmSolucao"), ""),
					ifNull(newerDataset.getValue(i,"dscSolucao"), ""),
					ifNull(newerDataset.getValue(i,"idSubsegmento"), ""),
					ifNull(newerDataset.getValue(i,"nmSubsegmento"), ""),
					ifNull(newerDataset.getValue(i,"idSegmento"), ""),
					ifNull(newerDataset.getValue(i,"idSegmento"), ""),
					ifNull(newerDataset.getValue(i,"btCross"), "false"),
					ifNull(newerDataset.getValue(i,"categorias"), ""),
					ifNull(newerDataset.getValue(i,"isCase"), "false"),
					ifNull(newerDataset.getValue(i,"porteopcp"), "false"),
					ifNull(newerDataset.getValue(i,"porteopcm"), "false"),
					ifNull(newerDataset.getValue(i,"porteopcg"), "false"),
					ifNull(newerDataset.getValue(i,"tutorial"), "false")
    		]);
    		updated.push(newerDataset.getValue(i,"nmSolucao") + ";" + newerDataset.getValue(i,"nmSubsegmento") + ";" + newerDataset.getValue(i,"idSegmento"));
    	}
    	if(olderDataset != null){
	    	for(var i = 0; i < olderDataset.rowsCount; i++){
	    		if(updated.indexOf(olderDataset.getValue(i,"nmSolucao") + ";" + olderDataset.getValue(i,"nmSubsegmento") + ";" + olderDataset.getValue(i,"idSegmento")) == -1){
	    			dataset.deleteRow([
	        				ifNull(olderDataset.getValue(i,"nmSolucao"), ""),
	    					ifNull(olderDataset.getValue(i,"dscSolucao"), ""),
	    					ifNull(olderDataset.getValue(i,"idSubsegmento"), ""),
	    					ifNull(olderDataset.getValue(i,"nmSubsegmento"), ""),
	    					ifNull(olderDataset.getValue(i,"idSegmento"), ""),
	    					ifNull(olderDataset.getValue(i,"idSegmento"), ""),
	    					ifNull(olderDataset.getValue(i,"btCross"), "false"),
	    					ifNull(olderDataset.getValue(i,"categorias"), ""),
	    					ifNull(olderDataset.getValue(i,"isCase"), "false"),
	    					ifNull(olderDataset.getValue(i,"porteopcp"), "false"),
	    					ifNull(olderDataset.getValue(i,"porteopcm"), "false"),
	    					ifNull(olderDataset.getValue(i,"porteopcg"), "false"),
	    					ifNull(olderDataset.getValue(i,"tutorial"), "false")
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