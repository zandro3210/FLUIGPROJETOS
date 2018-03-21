function createDataset(fields, constraints, sortFields) {

	var userCode,
	datasetResult = DatasetBuilder.newDataset();

	datasetResult.addColumn("Result");

	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == "userCode") {
				userCode = constraints[i].initialValue;
			} 
		}
		if (userCode == null) {
			datasetResult.addRow(["Gamification error: Missing group gamefication query params"]);
			return datasetResult;
		}
	}
	
	var constraintColleagueGroup1 = DatasetFactory.createConstraint('colleagueGroupPK.colleagueId', userCode, userCode, ConstraintType.MUST);
	var datasetColleagueGroup = DatasetFactory.getDataset('colleagueGroup', ['colleagueGroupPK.groupId'], new Array(constraintColleagueGroup1), null);

	if(datasetColleagueGroup!= null && datasetColleagueGroup.rowsCount > 0) {
		var groupsConstraints = new Array();
		for (var i = 0; i < datasetColleagueGroup.rowsCount; i++) {
			var groupId = datasetColleagueGroup.getValue(i, 'colleagueGroupPK.groupId');
			groupsConstraints.push(DatasetFactory.createConstraint('registerValue', groupId, groupId, ConstraintType.SHOULD));
		}

		var datasetGruposGamificados = DatasetFactory.getDataset('gruposGamificados', null, groupsConstraints, null);

		if(datasetGruposGamificados == null || datasetGruposGamificados.rowsCount == 0) {
			datasetResult.addRow(["Gamification error: User doesn't belong to any gameficated group"]);
			return datasetResult;
		}

	} else {
		datasetResult.addRow(["Gamification error: User doesn't belong to any group"]);
		return datasetResult;
	}
	datasetResult.addRow(["Gamification SUCCESS"]);
	return datasetResult;
	
}