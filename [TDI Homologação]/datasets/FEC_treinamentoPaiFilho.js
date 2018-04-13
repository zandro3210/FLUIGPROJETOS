function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	var datasetFields = new Array("docId","docVersion","tipoTreinamentoPai","codTreinamentoPai","nomeTreinamentoPai","modalidadeTreinamentoPai","cargaHorariaTreinamentoPai","descrTreinamentoPai","codTreinamento","nomeTreinamento", "cargaHorariaTreinamento");
	var tipoTreinamentoPai = '';
	var codTreinamentoPai = '';
	var codTreinamento = '';
	
	if (constraints != null){
		for (var i = 0; i < constraints.length; i++){
			if(constraints[i].fieldName == 'tipoTreinamentoPai' && constraints[i].initialValue != ''){
				log.info("dataset: treinamentoPaiFilho, constraint: tipoTreinamentoPai ===>>> " + constraints[i].initialValue);
				tipoTreinamentoPai = constraints[i].initialValue;
			}else if(constraints[i].fieldName == 'codTreinamentoPai' && constraints[i].initialValue != ''){
				log.info("dataset: treinamentoPaiFilho, constraint: codTreinamentoPai ===>>> " + constraints[i].initialValue);
				codTreinamentoPai = constraints[i].initialValue;
			}else if(constraints[i].fieldName == 'codTreinamento' && constraints[i].initialValue != ''){
				log.info("dataset: treinamentoPaiFilho, constraint: codTreinamento ===>>> " + constraints[i].initialValue);
				codTreinamento = constraints[i].initialValue;
			}
		}
	}
	
	for (var i = 0; i < datasetFields.length; i++) {
		dataset.addColumn(datasetFields[i]);
	}
	
	try{
		//Cria a constraint para buscar os formul?rios ativos
		var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
		var constraintsPrincipal = new Array(c1);
		
		if(tipoTreinamentoPai != ''){
        	var cTipo = DatasetFactory.createConstraint("tipoTreinamentoPai", tipoTreinamentoPai, tipoTreinamentoPai, ConstraintType.MUST);
        	constraintsPrincipal.push(cTipo);
    	}
		
		if(codTreinamentoPai != ''){
        	var cCod = DatasetFactory.createConstraint("codTreinamentoPai", codTreinamentoPai, codTreinamentoPai, ConstraintType.MUST);
        	constraintsPrincipal.push(cCod);
    	}
		
		var datasetPrincipal = DatasetFactory.getDataset("FEC_treinamento", null, constraintsPrincipal, null);
		var datasetFilhos = {};
		
		//Cria as constraints para buscar os campos filhos, passando o tablename, n?mero da formul?rio e vers?o
		var c1 = DatasetFactory.createConstraint("tablename", "tbTreinamento" ,"tbTreinamento", ConstraintType.MUST);
		
		if(datasetPrincipal.rowsCount > 0) {
			for(var i = 0; i < datasetPrincipal.rowsCount; i++) {
		        var documentId = datasetPrincipal.getValue(i, "metadata#id");
		        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");
		        var tipoTreinamentoPai = datasetPrincipal.getValue(i, "tipoTreinamentoPai");
		        var codTreinamentoPai = datasetPrincipal.getValue(i, "codTreinamentoPai");
		        var nomeTreinamentoPai = datasetPrincipal.getValue(i, "nomeTreinamentoPai");
		        var modalidadeTreinamentoPai = datasetPrincipal.getValue(i, "modalidadeTreinamentoPai");
		        var cargaHorariaTreinamentoPai = datasetPrincipal.getValue(i, "cargaHorariaTreinamentoPai");
		        var descrTreinamento = datasetPrincipal.getValue(i, "descrTreinamento");
		        
		        dataset.addRow(new Array(
		    		    documentId,
		    		    documentVersion,
		    		    tipoTreinamentoPai,
		    		    codTreinamentoPai,
		    		    nomeTreinamentoPai,
		    		    modalidadeTreinamentoPai,
		    		    cargaHorariaTreinamentoPai,
		    		    descrTreinamento,
		    		    '',
		    		    '',
		    		    ''
		        ));
		        
		        //Cria as constraints para buscar os campos filhos, passando o tablename, n?mero da formul?rio e vers?o
		        var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
		        var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
		        var constraintsFilhos = new Array(c1, c2, c3);
		        
				if(codTreinamento != ''){
		        	var cCod2 = DatasetFactory.createConstraint("codTreinamento", codTreinamento, codTreinamento, ConstraintType.MUST);
		        	constraintsFilhos.push(cCod2);
		    	}
		        
		        datasetFilhos = DatasetFactory.getDataset("FEC_treinamento", null, constraintsFilhos, null);
		        
		        for (var j = 0; j < datasetFilhos.rowsCount; j++) {
		            //Adiciona os valores nas colunas respectivamente.
		            dataset.addRow(new Array(
		    		    documentId,
		    		    documentVersion,
		    		    '',
		    		    codTreinamentoPai,
		    		    nomeTreinamentoPai,
		    		    modalidadeTreinamentoPai,
		    		    cargaHorariaTreinamentoPai,
		    		    descrTreinamento,
		    		    datasetFilhos.getValue(j, "codTreinamento"),
		    		    datasetFilhos.getValue(j, "nomeTreinamento"),
		    		    datasetFilhos.getValue(j, "cargaHorariaTreinamento")
		            ));
		        }
			}
		
		}else{
			//trata o dataset vazio
			dataset.addRow( new Array('Não há registros nesse dataset.') );			
		}
		
	}catch(e){
		msgError = "Erro ao carregar treinamentoPaiFilho: " + e;
		log.error(msgError);
		dataset.addColumn("erro");
		dataset.addRow (new Array(msgError));
	}
	
	return dataset;
}