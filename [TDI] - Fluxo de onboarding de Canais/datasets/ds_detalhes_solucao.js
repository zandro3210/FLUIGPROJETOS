function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	
	var detalhe = null;
	var nmSolucao = null;
	
	if (constraints != null) {
		for(var i in constraints) {
			if(constraints[i].fieldName == "detalhe"){
				detalhe = constraints[i].initialValue;
			}
			if(constraints[i].fieldName == "nmSolucao"){
				nmSolucao = constraints[i].initialValue;
			}
		}
	}
	
	if(nmSolucao != null){
    	var cActive = DatasetFactory.createConstraint("metadata#active", true ,true, ConstraintType.MUST);
        	
    	var constraintsSolucoes = [];
    	constraintsSolucoes.push(cActive);
    	constraintsSolucoes.push(DatasetFactory.createConstraint("nmSolucao", nmSolucao , nmSolucao, ConstraintType.MUST));    

    	var datasetSolucoes = DatasetFactory.getDataset("Solucoes", null, constraintsSolucoes, null);
    	log.info("datasetSolucoes="+datasetSolucoes);
    	if(datasetSolucoes != null && datasetSolucoes.rowsCount > 0){
    		log.info("datasetSolucoes.rowsCount="+datasetSolucoes.rowsCount);
    		var documentId = datasetSolucoes.getValue(0, "metadata#id");
    		var documentVersion = datasetSolucoes.getValue(0, "metadata#version");
    		
    		log.info("documentId="+documentId);
    		log.info("documentVersion="+documentVersion);
    		
    		constraintsSolucoes = [];
    		constraintsSolucoes.push(cActive);
    		constraintsSolucoes.push(DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST));
    		constraintsSolucoes.push(DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST));
    		
    		var datasetDetalhes = null;
    		
			if(detalhe == "beneficios"){
				constraintsSolucoes.push(DatasetFactory.createConstraint("tablename", "tabledetailname4" ,"tabledetailname4", ConstraintType.MUST));
				datasetDetalhes = DatasetFactory.getDataset("Solucoes", null, constraintsSolucoes, null);
				log.info("datasetDetalhes="+datasetDetalhes);
				if(datasetDetalhes != null && datasetDetalhes.rowsCount > 0){
					log.info("datasetDetalhes.rowsCount="+datasetDetalhes.rowsCount);
					dataset.addColumn("beneficio");
					for(var i = 0; i < datasetDetalhes.rowsCount; i++){
						dataset.addRow([datasetDetalhes.getValue(i, "column1_4")]);
					}
				}
			} else if(detalhe == "cases"){
				constraintsSolucoes.push(DatasetFactory.createConstraint("tablename", "tabledetailname1" ,"tabledetailname1", ConstraintType.MUST));
				datasetDetalhes = DatasetFactory.getDataset("Solucoes", null, constraintsSolucoes, null);

				if(datasetDetalhes != null && datasetDetalhes.rowsCount > 0){
					dataset.addColumn("cases");
					dataset.addColumn("caseTitle");
					dataset.addColumn("documentId");
					dataset.addColumn("documentDescription");
					dataset.addColumn("lastModifiedDate");
					dataset.addColumn("size");
					dataset.addColumn("iconId");
					dataset.addColumn("keyWord");
					for(var i = 0; i < datasetDetalhes.rowsCount; i++){
						var caseDocumentId = datasetDetalhes.getValue(i, "column1_1");
						if(caseDocumentId != null){
							caseDocumentId = caseDocumentId.trim();
						}
						var caseTitle = datasetDetalhes.getValue(i, "tituloVideoCase");
						
						var datasetDocuments = null;
						
						if(!isNaN(caseDocumentId)){
							var constraintsDocuments = [];
							constraintsDocuments.push(cActive);
							constraintsDocuments.push(DatasetFactory.createConstraint("documentPK.documentId", caseDocumentId, caseDocumentId, ConstraintType.SHOULD));
							
							datasetDocuments = DatasetFactory.getDataset("document", null, constraintsDocuments, null);
							
							if(datasetDocuments != null && datasetDocuments.rowsCount > 0){
								for(var j = 0; j < datasetDocuments.rowsCount; j++){
									dataset.addRow([
													datasetDocuments.getValue(j, "documentPK.documentId"),
													datasetDocuments.getValue(j, "documentDescription"),
													datasetDocuments.getValue(j, "documentPK.documentId"),
													datasetDocuments.getValue(j, "documentDescription"),
													datasetDocuments.getValue(j, "lastModifiedDate"),
													datasetDocuments.getValue(j, "size"),
													datasetDocuments.getValue(j, "iconId"),
													datasetDocuments.getValue(j, "keyWord")
													]);
								}
							}
						}  else{
							dataset.addRow([
											caseDocumentId,
											caseTitle,
											"",
											"",
											"",
											"",
											"",
											"",
											]);
						}
					}
				}
				
				/*constraintsSolucoes.push(DatasetFactory.createConstraint("tablename", "tabledetailname1" ,"tabledetailname1", ConstraintType.MUST));
				datasetDetalhes = DatasetFactory.getDataset("Solucoes", null, constraintsSolucoes, null);
				if(datasetDetalhes != null && datasetDetalhes.rowsCount > 0){
					var constraintsDocuments = [];
					constraintsDocuments.push(cActive);
					for(var i = 0; i < datasetDetalhes.rowsCount; i++){
						var caseDocumentId = datasetDetalhes.getValue(i, "column1_1");
						constraintsDocuments.push(DatasetFactory.createConstraint("documentPK.documentId", caseDocumentId, caseDocumentId, ConstraintType.SHOULD));
					}
					var datasetDocuments = DatasetFactory.getDataset("document", null, constraintsDocuments, null);
					if(datasetDocuments != null && datasetDocuments.rowsCount > 0){
						dataset.addColumn("documentId");
						dataset.addColumn("documentDescription");
						dataset.addColumn("lastModifiedDate");
						dataset.addColumn("size");
						dataset.addColumn("iconId");
						dataset.addColumn("keyWord");
						for(var i = 0; i < datasetDocuments.rowsCount; i++){
							dataset.addRow([
							                datasetDocuments.getValue(i, "documentPK.documentId"),
							                datasetDocuments.getValue(i, "documentDescription"),
							                datasetDocuments.getValue(i, "lastModifiedDate"),
							                datasetDocuments.getValue(i, "size"),
							                datasetDocuments.getValue(i, "iconId"),
							                datasetDocuments.getValue(i, "keyWord")
							                ]);
						}
					}
				}*/
			} else if(detalhe == "tutoriais"){
				constraintsSolucoes.push(DatasetFactory.createConstraint("tablename", "tabledetailname5" ,"tabledetailname5", ConstraintType.MUST));
				datasetDetalhes = DatasetFactory.getDataset("Solucoes", null, constraintsSolucoes, null);
				if(datasetDetalhes != null && datasetDetalhes.rowsCount > 0){
					dataset.addColumn("tutorial");
					dataset.addColumn("tutorialTitle");
					dataset.addColumn("documentId");
					dataset.addColumn("documentDescription");
					dataset.addColumn("lastModifiedDate");
					dataset.addColumn("size");
					dataset.addColumn("iconId");
					dataset.addColumn("keyWord");
					for(var i = 0; i < datasetDetalhes.rowsCount; i++){
						var tutorialDocumentId = datasetDetalhes.getValue(i, "column1_5");
						var tutorialTitle = datasetDetalhes.getValue(i, "column2_5");
						if(tutorialDocumentId != null){
							tutorialDocumentId = tutorialDocumentId.trim();
						}
						
						var datasetDocuments = null;
						
						if(!isNaN(tutorialDocumentId)){
							var constraintsDocuments = [];
							constraintsDocuments.push(cActive);
							constraintsDocuments.push(DatasetFactory.createConstraint("documentPK.documentId", tutorialDocumentId, tutorialDocumentId, ConstraintType.SHOULD));
							
							datasetDocuments = DatasetFactory.getDataset("document", null, constraintsDocuments, null);
							if(datasetDocuments != null && datasetDocuments.rowsCount > 0){
								for(var j = 0; j < datasetDocuments.rowsCount; j++){
									dataset.addRow([
									                datasetDocuments.getValue(j, "documentPK.documentId"),
									                datasetDocuments.getValue(j, "documentDescription"),
									                datasetDocuments.getValue(j, "documentPK.documentId"),
									                datasetDocuments.getValue(j, "documentDescription"),
									                datasetDocuments.getValue(j, "lastModifiedDate"),
									                datasetDocuments.getValue(j, "size"),
									                datasetDocuments.getValue(j, "iconId"),
									                datasetDocuments.getValue(j, "keyWord")
									                ]);
								}
							} 
						} else{
							dataset.addRow([
							                tutorialDocumentId,
							                tutorialTitle,
							                "",
							                "",
							                "",
							                "",
							                "",
							                "",
							                ]);
						}
					}
				}
			} else if(detalhe == "documentos"){
				constraintsSolucoes.push(DatasetFactory.createConstraint("tablename", "tabledetailname2" ,"tabledetailname2", ConstraintType.MUST));
				datasetDetalhes = DatasetFactory.getDataset("Solucoes", null, constraintsSolucoes, null);
				if(datasetDetalhes != null && datasetDetalhes.rowsCount > 0){
					var constraintsDocuments = [];
					constraintsDocuments.push(cActive);
					for(var i = 0; i < datasetDetalhes.rowsCount; i++){
						var caseDocumentId = datasetDetalhes.getValue(i, "column1_2");
						constraintsDocuments.push(DatasetFactory.createConstraint("documentPK.documentId", caseDocumentId, caseDocumentId, ConstraintType.SHOULD));
					}
					var datasetDocuments = DatasetFactory.getDataset("document", null, constraintsDocuments, null);
					if(datasetDocuments != null && datasetDocuments.rowsCount > 0){
						dataset.addColumn("documentId");
						dataset.addColumn("documentDescription");
						dataset.addColumn("lastModifiedDate");
						dataset.addColumn("size");
						dataset.addColumn("iconId");
						dataset.addColumn("keyWord");
						for(var i = 0; i < datasetDocuments.rowsCount; i++){
							dataset.addRow([
							                datasetDocuments.getValue(i, "documentPK.documentId"),
							                datasetDocuments.getValue(i, "documentDescription"),
							                datasetDocuments.getValue(i, "lastModifiedDate"),
							                datasetDocuments.getValue(i, "size"),
							                datasetDocuments.getValue(i, "iconId"),
							                datasetDocuments.getValue(i, "keyWord")
							                ]);
						}
					}
				}
			}
    	}
	}
	
	return dataset;
}
