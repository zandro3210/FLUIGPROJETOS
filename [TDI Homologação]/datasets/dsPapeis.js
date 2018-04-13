function createDataset(fields, constraints, sortFields) {
	// Dataset para recuperar os Papeis do Fluig. Criado para contornar um problema do produto que ocorre ao montar a query SQL de alguns datasets internos padrao.
	
	var dsPapeis = DatasetBuilder.newDataset();
	dsPapeis.addColumn("id");
	dsPapeis.addColumn("Desc");
	
	
	try{
		var fields = new Array();
		var constraints = new Array();
		var sort = new Array();
		
		fields.push("workflowRolePK.roleId");
		fields.push("roleDescription");
		
		sort.push("roleDescription");
		
		var dataset = DatasetFactory.getDataset("workflowRole", fields, constraints, sort);
		
		for (var i = 0; i < dataset.rowsCount; i++){
			dsPapeis.addRow(new Array(dataset.getValue(i, "workflowRolePK.roleId"), dataset.getValue(i, "roleDescription")));
		}
	}
	catch(e){
		dsPapeis.addRow(new Array("0", e.message));
	}
	
    return dsPapeis;	
}