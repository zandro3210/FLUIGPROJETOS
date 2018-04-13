function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("nmSolucao");
	dataset.addColumn("dscSolucao");
	dataset.addColumn("idSubsegmento");
	dataset.addColumn("nmSubsegmento");
	dataset.addColumn("idSegmento");
	dataset.addColumn("cross");
	dataset.addColumn("case");
	dataset.addColumn("porteopcp");
	dataset.addColumn("porteopcm");
	dataset.addColumn("porteopcg");
	dataset.addColumn("tutorial");
	
	var constraintsSD = [];
	
	var cActive = DatasetFactory.createConstraint("metadata#active","true", "true", ConstraintType.MUST);
	
	constraintsSD.push(cActive);

	// solucoes em destaque
	var solucoesDestaqueDS = DatasetFactory.getDataset("solucoesDestaque", null, constraintsSD, null);

	if(solucoesDestaqueDS != null && solucoesDestaqueDS.rowsCount > 0){
		var constraintsSolucoes = [];
		constraintsSolucoes.push(cActive);
		for(var i = 0; i < solucoesDestaqueDS.rowsCount; i++){
			var nmSolucao = solucoesDestaqueDS.getValue(i,"zoomDestaque");
			constraintsSolucoes.push(DatasetFactory.createConstraint("nmSolucao", nmSolucao, nmSolucao, ConstraintType.SHOULD));
		}
		// solucoes
		var solucoesDS = DatasetFactory.getDataset("Solucoes",null,constraintsSolucoes,null);
		if(solucoesDS != null && solucoesDS.rowsCount > 0){
			for(var j = 0; j < solucoesDS.rowsCount; j++){
		    	var documentId = solucoesDS.getValue(j,"metadata#id");
				var documentVersion = solucoesDS.getValue(j,"metadata#version");
				var nmSolucao = solucoesDS.getValue(j,"nmSolucao");
		        
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
		        	var documentIdSubSegmento = datasetSS1.getValue(0,"documentid");
		        	
		        	var constraintsSS2 = [];
		        	constraintsSS2.push(cActive);
		        	constraintsSS2.push(DatasetFactory.createConstraint("documentId", documentIdSubSegmento, documentIdSubSegmento, ConstraintType.MUST));
		        	// seguimento
		        	var datasetSS2 = DatasetFactory.getDataset("Subsegmentos", null, constraintsSS2, null);
		        	if(datasetSS2 != null && datasetSS2.rowsCount > 0){
						for(var k = 0; k < datasetSS2.rowsCount; k++){
							dataset.addRow([
							                nmSolucao,
							                solucoesDS.getValue(j,"dscSolucao"),
							                datasetSS2.getValue(k,"idSegmento"),
							                datasetSS2.getValue(k,"nmSubsegmento"),
							                datasetSS2.getValue(k,"idSegmento"),
							                solucoesDS.getValue(j,"btCross") == "Sim",
							                isCase,
							                solucoesDS.getValue(j,"porteopcp"),
							                solucoesDS.getValue(j,"porteopcm"),
							                solucoesDS.getValue(j,"porteopcg"),
							                isTutoriais
							                ]);
						}
		        	}
		        }
			}
		}
	}
	return dataset;
}