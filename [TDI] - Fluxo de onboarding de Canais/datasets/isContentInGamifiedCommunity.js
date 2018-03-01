function createDataset(fields, constraints, sortFields) {

	var parentContentId,
	contentType,
	companyId,
	datasetResult = DatasetBuilder.newDataset();

	datasetResult.addColumn("Result");

	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == "parentContentId") {
				parentContentId = constraints[i].initialValue;
			} else if (constraints[i].fieldName == "contentType") {
				contentType = constraints[i].initialValue;
			} else if (constraints[i].fieldName == "companyId") {
				companyId = constraints[i].initialValue;
			}
		}
		if (parentContentId == null || contentType == null || companyId == null) {
			datasetResult.addRow(["Gamification error: Missing community gamefication query params"]);
			return datasetResult;
		}
	}
	
	var datasetComunidadesGamificadas = DatasetFactory.getDataset('comunidadesGamificadas', ["registerValue"], null, null);
	if(datasetComunidadesGamificadas == null || datasetComunidadesGamificadas.rowsCount == 0) {
		log.warn("[Gamificacao: Nao existem comunidades cadastradas para gerar pontos");
		datasetResult.addRow(["Gamification error: No gameficated community registered"]);
		return datasetResult;
	} else {
		var gameficatedCommutityArray = new Array();
		for(var i=0; i < datasetComunidadesGamificadas.rowsCount; i++) {
			var gameficatedCommunityAlias = datasetComunidadesGamificadas.getValue(i, "registerValue");
			gameficatedCommutityArray.push(DatasetFactory.createConstraint("alias", gameficatedCommunityAlias, gameficatedCommunityAlias, ConstraintType.SHOULD));
		}
		// Pasta do tipo de documento
		var contentTypeString;
		if (contentType.indexOf("com.totvs.technology.social.article") != -1) {
			contentTypeString = 'articleFolder';
		} else if (contentType == "form") {
			contentTypeString = 'formFolder';
		} else if (contentType == "video") {
			contentTypeString = 'videoFolder';
		}
		var communityDataset = DatasetFactory.getDataset('CommunityDataset', [contentTypeString], gameficatedCommutityArray, null);
		if(communityDataset == null || communityDataset.rowsCount == 0) {
			log.error("Unable to find community by alias");
		} else {
			var found = false; 
			for(var i=0; i < communityDataset.rowsCount; i++) {
				if(parentContentId == communityDataset.getValue(i, contentTypeString)) {
					found = true;
					break;
				}
			}
			if(!found) {
				while(parentContentId != 0) {
					var parentDocArray = new Array();
					parentDocArray.push(DatasetFactory.createConstraint('documentPK.documentId', parentContentId, parentContentId, ConstraintType.MUST));
					parentDocArray.push(DatasetFactory.createConstraint('documentPK.companyId', companyId, companyId, ConstraintType.MUST));
					parentDocArray.push(DatasetFactory.createConstraint('activeVersion', 'true', 'true', ConstraintType.MUST));
					var parentDatasetDocument = DatasetFactory.getDataset('document', null, parentDocArray, null);

					if(parentDatasetDocument == null || parentDatasetDocument.rowsCount == 0) {
						datasetResult.addRow(["Gamification error: Unable to find parent document"]);
						return datasetResult;
					}
					
					parentContentId = parentDatasetDocument.getValue(0, "parentDocumentId");

					for(var i=0; i < communityDataset.rowsCount; i++) {
						if(parentContentId == communityDataset.getValue(i, contentTypeString)) {
							found = true;
							break;
						}
					}
					if(found) {
						break;
					}
				}
				if(!found) {
					datasetResult.addRow(["Gamification error: Content not gamificated"]);
					return datasetResult;
				}
			}
			datasetResult.addRow(["Gamification SUCCESS"]);
			return datasetResult;
		}
	}
}