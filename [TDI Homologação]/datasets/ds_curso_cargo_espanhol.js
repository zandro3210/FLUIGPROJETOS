function createDataset(fields, constraints, sortFields) {
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("codigo");
	newDataset.addColumn("descricao");
	newDataset.addColumn("limite");
	newDataset.addColumn("percentual");
	
	log.info("array");
	var codigo = new Array();
	log.info("ok");
	if (constraints != null) {
		for(var c in constraints){
			log.info("constraints cargo:" + constraints[c].getFieldName() + ":" + constraints[c].getInitialValue());
			if (constraints[c].getFieldName() == "codigo"){
				codigo.push(constraints[c].getInitialValue());
			}
		}
	}
	
	var c1 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("ds_opcao_curso_espanhol", null, new Array(c1), null);
	
	if (codigo.length != 0) {
		for (var i=0;i<dataset.rowsCount;i++) {
			for (var x=0;x<codigo.length;x++) {
				if (codigo[x] == dataset.getValue(i, "codigo")) {
					newDataset.addRow(new Array(dataset.getValue(i, "codigo"),
												dataset.getValue(i, "descricao"),
												dataset.getValue(i, "limite"),
												dataset.getValue(i, "percentual")));
				}
			}
		}
	} else {
		for (var i=0;i<dataset.rowsCount;i++) {
			newDataset.addRow(new Array(dataset.getValue(i, "codigo"),
										dataset.getValue(i, "descricao"),
										dataset.getValue(i, "limite"),
										dataset.getValue(i, "percentual")));
		}
	}

	return newDataset;		
}