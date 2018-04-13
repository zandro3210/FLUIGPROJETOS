function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("sequence");
	dataset.addColumn("colleagueId");
	dataset.addColumn("nome");
	dataset.addColumn("cargo");
	dataset.addColumn("email");
	dataset.addColumn("imagem");
	dataset.addColumn("telefone");
	dataset.addColumn("messaging");
	
	var nmSegmento = null;
	
	if (constraints != null) {
		for(var i in constraints) {
			if(constraints[i].fieldName == "nmSegmento"){
				nmSegmento = constraints[i].initialValue;
			}
		}
	}
	
	if(nmSegmento != null){
    	var cActive = DatasetFactory.createConstraint("metadata#active", true ,true, ConstraintType.MUST);
        	
    	var constraintsSegmentos = [];
    	constraintsSegmentos.push(cActive);
    	constraintsSegmentos.push(DatasetFactory.createConstraint("nmSegmento", nmSegmento, nmSegmento, ConstraintType.MUST));
    	
    	var datasetSegmentos = DatasetFactory.getDataset("Segmentos", null, constraintsSegmentos, null);
    	if(datasetSegmentos != null && datasetSegmentos.rowsCount > 0){
    		var documentId = datasetSegmentos.getValue(0,"metadata#id");
    		var documentVersion = datasetSegmentos.getValue(0,"metadata#version");
    		
    		var constraintsEspecialistas = [];
        	constraintsEspecialistas.push(cActive);
        	constraintsEspecialistas.push(DatasetFactory.createConstraint("tablename", "tabledetailname2" ,"tabledetailname2", ConstraintType.MUST));
        	constraintsEspecialistas.push(DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST));
    		constraintsEspecialistas.push(DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST));
            
            var datasetEspecialistas = DatasetFactory.getDataset("Segmentos", null, constraintsEspecialistas, null);
        
            if(datasetEspecialistas != null && datasetEspecialistas.rowsCount > 0){
	        	for(var i = 0; i < datasetEspecialistas.rowsCount; i++){
	        		var colleagueId = "";
	        		var nome = datasetEspecialistas.getValue(i,"column1_2");
	        		var cargo = datasetEspecialistas.getValue(i,"column2_2");
	        		var email = datasetEspecialistas.getValue(i,"column3_2");
	        		var imagem = datasetEspecialistas.getValue(i,"column4_2");
	        		var telefone = datasetEspecialistas.getValue(i,"column5_2");
	        		var messaging = datasetEspecialistas.getValue(i,"column6_2");
	        		var constraintsColleague = [];
	        		constraintsColleague.push(DatasetFactory.createConstraint("mail", email, email, ConstraintType.MUST))
	        		var datasetColleague = DatasetFactory.getDataset("colleague", null, constraintsColleague, null);
	        		if(datasetColleague != null && datasetColleague.rowsCount > 0){
	        			nome = nome == null || nome.trim() == "" ? datasetColleague.getValue(0,"colleagueName") : nome;
	        			cargo = cargo == null || cargo.trim() == "" ? datasetColleague.getValue(0,"especialization") : cargo;
	        			email = email == null || email.trim() == "" ? datasetColleague.getValue(0,"mail") : email;
	        			telefone = telefone == null || telefone.trim() == "" ? datasetColleague.getValue(0,"extensionNr") : telefone;
	        			colleagueId = datasetColleague.getValue(0,"colleaguePK.colleagueId");
	        		}
	        		dataset.addRow([
	        		                i+1,
	        		                colleagueId,
	        		                nome,
	        		                cargo,
	        		                email,
	        		                imagem,
	        		                telefone,
	        		                messaging
	        		                ]);
	        	}
            }
    	}
	}
	
	return dataset
}