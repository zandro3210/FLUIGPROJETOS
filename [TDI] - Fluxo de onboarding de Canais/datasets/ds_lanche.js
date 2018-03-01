function createDataset(fields, constraints, sortFields) {

	var weekDay = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sabado"][(new Date()).getDay()];

	log.info("Hoje eh dia: "+weekDay)
	var newDataset = DatasetBuilder.newDataset();

	newDataset.addColumn("Lanche");
	newDataset.addColumn("Dia");

	var c1 = DatasetFactory.createConstraint("dia", weekDay, weekDay, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
	var lanches = DatasetFactory.getDataset("ds_lanches", null, new Array(c1,c2), null);
	
	if(lanches.rowsCount > 0){
		newDataset.addRow(new Array('',''));
		for(var i = 0; i < lanches.rowsCount; i++) {
			newDataset.addRow(new Array(lanches.getValue(i,'lanche'), lanches.getValue(i,'dia'))); 
		}
	}else{
		newDataset.addRow(new Array("Não há lanches cadastrados para hoje.", "Não há lanches cadastrados para hoje.")); 
	}
	return newDataset;		
}