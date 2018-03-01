function createDataset(fields, constraints, sortFields){
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("colleagueId");
	dataset.addColumn("colleagueName");
	dataset.addColumn("mail");
	
	try {
		
		var c1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "usuario_rio", "usuario_rio", ConstraintType.MUST);
		var constraintsDataset = new Array(c1);
		
		var workflowColleagueRole = DatasetFactory.getDataset("colleagueGroup", null, constraintsDataset, null);
	
		var filter = getConstraints(constraints);
		
		if(filter.codigo == null || filter.codigo == undefined) filter.codigo = "";
		
		var user;
		
		for(var i =0;i < workflowColleagueRole.rowsCount;i++){
			user = getUser(workflowColleagueRole.getValue(i,"colleagueGroupPK.colleagueId"));
			
			dataset = verificarFiltro(dataset, filter.codigo, user.login, user.colleagueName, user.mail);
		}
	} catch (e) {
		dataset.addRow([e.toString()]);
	}
	
	return dataset;
}

/**
 * Retorna os dados do usuario.
 * 
 * @param colleagueId: Matricula do usuario.
 * @returns {User}.
 */
function getUser(colleagueId){
	var constraints = new Array();
	var dataset = null;
	var user = {"colleagueName":""};
	
	constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", colleagueId, colleagueId, ConstraintType.MUST));
	
	dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
	
	if(dataset.rowsCount > 0) {
		user.login = dataset.getValue(0,"login");
		user.colleagueName = dataset.getValue(0,"colleagueName");
		user.mail = dataset.getValue(0,"mail");
	}
	else{
		log.error("### Usuario nao encontrado para a matricula: "+colleagueId);
	}
	
	return user;
}

function verificarFiltro(dataset, filtro, login, nome, email) {
	if(login.indexOf(filtro.toUpperCase()) !=-1 || nome.toUpperCase().indexOf(filtro.toUpperCase()) !=-1 || email.toUpperCase().indexOf(filtro.toUpperCase()) !=-1 || filtro == ""){
		dataset.addRow([login, nome, email]);
	}
	
	return dataset;
}

function getConstraints(constraints){
	var params = new Object();
	
	if(constraints.length > 0){
		for (var i in constraints){
			if(constraints[i].fieldName == "mail") params.codigo = constraints[i].initialValue;
		}
	} else{
		log.error("#não foram enviados os params");
	}	
    return params;
}