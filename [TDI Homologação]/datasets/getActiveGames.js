function createDataset(fields, constraints, sortFields) {
	
	var resultConstraints = new Array(),
		constraintsGames = new Array();
	
	if(constraints != null) {
		for(var i = 0; i < constraints.length; i++) {
			constraintsGames.push(constraints[i]);
		}
	}

	constraintsGames.push(DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST));
	constraintsGames.push(DatasetFactory.createConstraint('isactive', 'Ativo', 'Ativo', ConstraintType.MUST));
	
	var dataset = DatasetFactory.getDataset("gameDataset", ["startdate","enddate"], constraintsGames, null);
	
	if (dataset == null || dataset.rowsCount == 0) {
		throw "Unable to get registered games";
	}
	
	for (var i = 0; i < dataset.rowsCount; i++) {
		var startDate = dataset.getValue(i, "startdate");
		var endDate = dataset.getValue(i, "enddate");
		
		if(startDate != "" || startDate != null) {
			var startDateSplit = startDate.split('/');
			if(startDateSplit.length >= 3) {
				var startDateDate = new Date(startDateSplit[2], startDateSplit[1] - 1, startDateSplit[0]);
				if(new Date() < startDateDate) {
					continue;
				}
			}
		}
		
		if(endDate != "" || endDate != null) {
			var endDateSplit = endDate.split('/');
			if(endDateSplit.length >= 3) {
				var endDateDate = new Date(endDateSplit[2], endDateSplit[1] - 1, endDateSplit[0], 23, 59, 99 ,9999);
				if(new Date() > endDateDate) {
					continue;
				}
			}
		}
		
		var constraint = DatasetFactory.createConstraint('id', dataset.getValue(i, "id"), dataset.getValue(i, "id"), ConstraintType.SHOULD);
		resultConstraints.push(constraint);
	}
	if(resultConstraints.length == 0) {
		var datasetEmptyResult = DatasetBuilder.newDataset();
		datasetEmptyResult.addColumn("Result");
		datasetEmptyResult.addRow(["empty"]);
		return datasetEmptyResult;
	}
	return DatasetFactory.getDataset("gameDataset", fields, resultConstraints, sortFields);
	
	
}