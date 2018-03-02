function createDataset(fields, constraints, sortFields) {
	
	var datasetResult = DatasetBuilder.newDataset(),
		text,
		socialAlias,
		eventType,
		ignoreCommunity = false;

	datasetResult.addColumn("Result");

	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == "text") {
				text = constraints[i].initialValue;
			} else if (constraints[i].fieldName == "socialAlias") {
				socialAlias = constraints[i].initialValue;
			} else if (constraints[i].fieldName == "eventType") {
				eventType = constraints[i].initialValue;
			} 
		}
		if (text == null) {
			datasetResult.addRow(["Gamification error: Missing social event query params"]);
			return datasetResult;
		}
		
		if(eventType == "articleLike") {
			ignoreCommunity = true;
		}
		
	}
	
	var datasetActiveGames = DatasetFactory.getDataset("getActiveGames", ["documentid,eventidentifier"], null, null);
	
	if(datasetActiveGames!= null && datasetActiveGames.rowsCount > 0) {
		for (var i = 0; i < datasetActiveGames.rowsCount; i++) {
			var documentiId = datasetActiveGames.getValue(i, "documentid");
			var documentIdConstraint = DatasetFactory.createConstraint("metadata#id",  documentiId, documentiId, ConstraintType.MUST);
			var datasetGamifiedCommunities = DatasetFactory.getDataset("getGamifiedCommunities", null, [documentIdConstraint], null);
			var eventidentifier = datasetActiveGames.getValue(i, "eventidentifier");
			
			if(!ignoreCommunity) {
				if(datasetGamifiedCommunities!= null && datasetGamifiedCommunities.rowsCount > 0) {
					var allowedCommunity = false;
					for (var j = 0; j < datasetGamifiedCommunities.rowsCount; j++) {
						if(datasetGamifiedCommunities.getValue(j, "community") == socialAlias) {
							allowedCommunity = true;
							break;
						}
					}
					if(!allowedCommunity) {
						continue;
					}
				}
			}
			
			var datasetGamifiedTags = DatasetFactory.getDataset("getGamifiedTags", null, [documentIdConstraint], null);
			
			if(datasetGamifiedTags!= null && datasetGamifiedTags.rowsCount > 0) {
				var allowedTag = false;
				for (var j = 0; j < datasetGamifiedTags.rowsCount; j++) {
					
					var tag = "";
					
					if(eventType != "articleLike") {
						tag = "#";
					}
					
					var expectedTag = (tag + datasetGamifiedTags.getValue(j, "hashtag")).toLowerCase();
					if (text.toLowerCase().contains(expectedTag)) {
						allowedTag = true;
						break;
					} 
				}
				if(!allowedTag) {
					continue;
				}
			}
			datasetResult.addRow(["true"]);
			return datasetResult;
		}
	}
	
	datasetResult.addRow(["false"]);
	
	return datasetResult;
	
}