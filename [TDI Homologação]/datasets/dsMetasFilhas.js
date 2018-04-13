function createDataset (fields, constraints, sortFields){
	
	var newDataset = DatasetBuilder.newDataset();

	try{		
		newDataset.addColumn('Codkpi');
		newDataset.addColumn('kpi');
		newDataset.addColumn('CodAbrangencia');
		newDataset.addColumn('abrangencia');
		newDataset.addColumn('peso');
		newDataset.addColumn('orcadoMeta');
		newDataset.addColumn('CodComposicao');
		
		var cAtivo = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
		var lista = DatasetFactory.getDataset("desdobramentometas", null, new Array(cAtivo), null);
		
		if(lista.rowsCount > 0){
			for (var i = 0; i < lista.rowsCount; i++) {
				var c1 = DatasetFactory.createConstraint("tablename", "metas_internas" ,"metas_internas", ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint("metadata#id", lista.getValue(i, "metadata#id"), lista.getValue(i, "metadata#id"), ConstraintType.MUST); 
				var c3 = DatasetFactory.createConstraint("metadata#version", lista.getValue(i, "metadata#version"), lista.getValue(i, "metadata#version"), ConstraintType.MUST); 
				var constraints_filhos = new Array(c1, c2, c3);
				
				var listaFilha = DatasetFactory.getDataset("desdobramentometas", null, constraints_filhos, null);
				
				for(j = 0; j < listaFilha.rowsCount; j++) {
					newDataset.addRow(new Array(listaFilha.getValue(j,"Codkpi"),
												listaFilha.getValue(j,"kpi"),
												listaFilha.getValue(j,"CodAbrangencia"),
												listaFilha.getValue(j,"abrangencia"),
												listaFilha.getValue(j,"peso"),
												listaFilha.getValue(j,"orcadoMeta"),
												listaFilha.getValue(j,"CodComposicao")
											));
				}
			}
		
		}
	}catch(erro){
		newDataset.addColumn('Erro');
		newDataset.addRow(new Array(erro.message));
	}
	return newDataset;
}
