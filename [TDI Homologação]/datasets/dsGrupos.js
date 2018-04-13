function createDataset(fields, constraints, sortFields) {
	// Dataset para recuperar os Grupos do Fluig. Criado para contornar um problema do produto que ocorre ao montar a query SQL de alguns datasets internos padrao.
	
	var dsGrupos = DatasetBuilder.newDataset();
	dsGrupos.addColumn("id");
	dsGrupos.addColumn("Desc");
	
	
	try{
		var fields = new Array();
		var constraints = new Array();
		var sort = new Array();
		
		fields.push("groupPK.groupId");
		fields.push("groupDescription");
		
		sort.push("groupDescription");
		
		var dataset = DatasetFactory.getDataset("group", fields, constraints, sort);
		
		for (var i = 0; i < dataset.rowsCount; i++){
			dsGrupos.addRow(new Array(dataset.getValue(i, "groupPK.groupId"), dataset.getValue(i, "groupDescription")));
		}
	}
	catch(e){
		dsGrupos.addRow(new Array("0", e.message));
	}

	
    return dsGrupos;	
}