function createDataset(fields, constraints, sortFields) {
     
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("numerodocumento");
    dataset.addColumn("unidade");
    dataset.addColumn("datasemana");
    dataset.addColumn("mesanosemana");
    dataset.addColumn("codigosegmento");
    dataset.addColumn("segmento");
    dataset.addColumn("valor");
    dataset.addColumn("valorsaas");
    dataset.addColumn("valorservicos");
     
	var datasemana = "";
	var email = "";
	var mesano = "201607"
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "datasemana"){
				datasemana = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "email"){
				email = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "mesano"){
				mesano = constraints[c].getInitialValue(); 
			}
		}
	}

    var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var c = [c1]; 
    
    if (datasemana != "") {
        var c2 = DatasetFactory.createConstraint("datasemana", datasemana, datasemana, ConstraintType.MUST);
        c.push(c2);
    }
    
    if (mesano != "") {
        var c3 = DatasetFactory.createConstraint("mesanosemana", mesano, mesano, ConstraintType.MUST);
        c.push(c3);
    }
    
    if (email != "") {
        var c4 = DatasetFactory.createConstraint("email", email, email, ConstraintType.MUST);
        c.push(c4);
    }
    
    var forecast = DatasetFactory.getDataset("ds_compromisso_forecast", null, c, sortFields);
    log.info("forecast:" + datasemana + ":" + email + ":" + mesano + ":" + c)
    log.info(forecast)
    if (forecast != null) {
        log.info("forecast:" + datasemana + ":" + forecast.rowsCount)
        for (var i=0; i<forecast.rowsCount; i++) {
            var id = forecast.getValue(i, "metadata#id");
            var version = forecast.getValue(i, "metadata#version");
            
            log.info("forecast:" + id + ":" + version)
             
            var c3 = DatasetFactory.createConstraint("tablename", "tbForecast" ,"tbForecast", ConstraintType.MUST);
            var c4 = DatasetFactory.createConstraint("metadata#id", id, id, ConstraintType.MUST);
            var c5 = DatasetFactory.createConstraint("metadata#version", version, version, ConstraintType.MUST);
     
            var metas = DatasetFactory.getDataset("ds_compromisso_forecast", null, [c3, c4, c5], null);
            log.info("metas:" + metas.rowsCount);
            for (var j=0; j<metas.rowsCount; j++) {
            	log.info("metas: " + metas.getValue(j, "valorservicos"));
                dataset.addRow(new Array(id,
						 				 metas.getValue(j, "codigounidade"),
                						 forecast.getValue(i, "datasemana"),
                						 forecast.getValue(i, "mesanosemana"),
                						 metas.getValue(j, "codigosegmento"), 
                						 metas.getValue(j, "segmento"), 
                						 metas.getValue(j, "valor"),
                						 metas.getValue(j, "valorsaas"),
                						 metas.getValue(j, "valorservicos")));
            }
        }
    }
     
    return dataset;
}