function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	var datasetFields = new Array("companyId","colleagueId", "roleId","colleagueName","mail");
	
	var datasetColleague = {};
	var datasetWorkflowRole = {};
	
	var roles = ["FEC_adminAmbiente", "FEC_parceiroTreinamento", "FEC_instrutor"];
	var companyId = getValue("WKCompany");
	var roleId = '';
	var constColleagueId = '';
	
	if(constraints != null){
		for (var i = 0; i < constraints.length; i++){			
			if(constraints[i].fieldName == 'roleId' && constraints[i].initialValue != ''){
				log.info("roleId ===>>>" + constraints[i].initialValue);
				roleId = constraints[i].initialValue;
			}
		}
		for (var i = 0; i < constraints.length; i++){			
			if(constraints[i].fieldName == 'colleagueId' && constraints[i].initialValue != ''){
				log.info("colleagueId ===>>>" + constraints[i].initialValue);
				constColleagueId = constraints[i].initialValue;
			}
		}
	}
	
	for (var i = 0; i < datasetFields.length; i++) {
		dataset.addColumn(datasetFields[i]);
	}
	
	try{
		//Cria as constraints para buscar os campos no dataset workflowColleagueRole
		var constraints1 = new Array();
		var c4 = null;
		
		for(var k = 0; k < roles.length; k++){
        		c4 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", roles[k], roles[k], ConstraintType.SHOULD);
        	constraints1.push(c4);
	    }
		
        if (roleId != ''){
        	var croleId = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", roleId, roleId, ConstraintType.MUST);
        	constraints1.push(croleId);
    	}
		
		var c1 = DatasetFactory.createConstraint("workflowColleagueRolePK.companyId", companyId, companyId, ConstraintType.MUST);
		constraints1.push(c1);
		
		if (constColleagueId != ''){
        	var cColleagueId = DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", constColleagueId, constColleagueId, ConstraintType.MUST);
        	constraints1.push(cColleagueId);
    	}
		
		datasetWorkflowRole = DatasetFactory.getDataset("workflowColleagueRole", null, constraints1, ['workflowColleagueRolePK.colleagueId']);
		
		//variaveis temporarias
		var tempColleagueId = '';
		var roleId = '';
		var colleagueName = '';
		var mail = '';
		
		var cursorRoleColleague = 0;
		
		if(datasetWorkflowRole.rowsCount > 0){
			for(var i = 0; i < datasetWorkflowRole.rowsCount; i++){
				var colleagueId = datasetWorkflowRole.getValue(i, "workflowColleagueRolePK.colleagueId");
				
				log.info("==========> colleagueId: " + colleagueId);
				
				if (tempColleagueId == '' || tempColleagueId != colleagueId){
					cursorRoleColleague = 0;
				}
				
				cursorRoleColleague += 1;
				
				//aqui
				var roleColleagueLength = 0;
				for(var j = 0; j < datasetWorkflowRole.rowsCount; j++){
					if( datasetWorkflowRole.getValue(j, "workflowColleagueRolePK.colleagueId") == colleagueId ){
						roleColleagueLength ++;
					}
				}
				
				roleId = roleId + datasetWorkflowRole.getValue(i, "workflowColleagueRolePK.roleId")+',';
				
				log.info("==========> roleId: " + roleId);
				log.info("==========> cursorRoleColleague: " + cursorRoleColleague);
				log.info("==========> roleColleagueLength: " + roleColleagueLength);
				
				if (cursorRoleColleague == roleColleagueLength){
					var c2 = DatasetFactory.createConstraint("colleaguePK.companyId", companyId, companyId, ConstraintType.MUST);
					var c3 = DatasetFactory.createConstraint("colleaguePK.colleagueId", colleagueId, colleagueId, ConstraintType.MUST);
			        var constraints2 = new Array(c2, c3);
			        

			        
			        datasetColleague = DatasetFactory.getDataset("colleague", null, constraints2, null);
					
			        colleagueName = datasetColleague.getValue(0, "colleagueName");
			        mail = datasetColleague.getValue(0, "mail");
			        
		        	roleId = roleId.replace(/[,]$/g, '');
					
					dataset.addRow(new Array(
				    	companyId,
				    	colleagueId,
				    	roleId,
				    	colleagueName,
				    	mail
					));	
					
					roleId = '';
			    }
				
				tempColleagueId = colleagueId;
			}
		}
		
	}catch(e){
		msgError = "Erro ao carregar FEC_colleagueRole : " + e;
		log.error(msgError);
		dataset.addColumn("erro");
		dataset.addRow (new Array(msgError));
	}
	
	return dataset;
}