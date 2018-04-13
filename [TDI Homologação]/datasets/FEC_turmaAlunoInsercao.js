function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	var datasetFields = new Array("docId","docVersion","codProcesso","statusTurma","nomeAluno","cpfAluno","tokenAluno","notaAluno","codAluno","pesqSatisfacaoRespondida","downloadComprovante","frequenciaAluno","novoAluno","emailAluno","telAluno1");
	var constTokenAluno = '';
	var constCodProcesso = '';
	var constStatusTurma = '';
	
	if(constraints != null){
		for (var i = 0; i < constraints.length; i++){			
			if(constraints[i].fieldName == 'tokenAluno' && constraints[i].initialValue != ''){
				log.info(" constTokenAluno ===>>>" + constraints[i].initialValue);
				constTokenAluno = constraints[i].initialValue;
			}
			if(constraints[i].fieldName == 'codProcesso' && constraints[i].initialValue != ''){
				log.info("constCodProcesso ===>>>" + constraints[i].initialValue);
				constCodProcesso = constraints[i].initialValue;
			}
			if(constraints[i].fieldName == 'statusTurma' && constraints[i].initialValue != ''){
				log.info("constStatusTurma ===>>>" + constraints[i].initialValue);
				constStatusTurma = constraints[i].initialValue;
			}
		}
	}
	
	for (var i = 0; i < datasetFields.length; i++) {
		dataset.addColumn(datasetFields[i]);
	}
	
	try{
		//Cria a constraint para buscar os formul?rios ativos
		var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
		var constraintsTurma = new Array(c1);
		
		if (constCodProcesso != ''){
        	var ccodProcesso = DatasetFactory.createConstraint("codProcesso", constCodProcesso, constCodProcesso, ConstraintType.MUST);
        	constraintsTurma.push(ccodProcesso);
    	}
    	if (constStatusTurma != ''){
        	var cStatusTurma = DatasetFactory.createConstraint("statusTurma", constStatusTurma, constStatusTurma, ConstraintType.MUST);
        	constraintsTurma.push(cStatusTurma);
    	}
		
		var datasetTurma = DatasetFactory.getDataset("FEC_solicitacao_turma", null, constraintsTurma, null);        
		
		if(datasetTurma.rowsCount > 0){
			for(var i = 0; i < datasetTurma.rowsCount; i++) {				
		        var docId = datasetTurma.getValue(i, "metadata#id");
		        var docVersion = datasetTurma.getValue(i, "metadata#version");
		        var codProcesso = datasetTurma.getValue(i, "codProcesso");
		        var statusTurma = datasetTurma.getValue(i, "statusTurma");
		        
		        var datasetAluno = {};
		        //Cria as constraints para buscar os campos filhos, passando o tablename, n?mero da formul?rio e vers?o
		        var ca1 = DatasetFactory.createConstraint("tablename", "tbAluno" ,"tbAluno", ConstraintType.MUST);
		        var ca2 = DatasetFactory.createConstraint("metadata#id", docId, docId, ConstraintType.MUST);
		        var ca3 = DatasetFactory.createConstraint("metadata#version", docVersion, docVersion, ConstraintType.MUST);
		        var ca4 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
		        var constraintsAluno = new Array(ca1, ca2, ca3, ca4);
		        
		        if (constTokenAluno != ''){
		        	var ctokenAluno = DatasetFactory.createConstraint("tokenAluno", constTokenAluno, constTokenAluno, ConstraintType.MUST);
		        	constraintsAluno.push(ctokenAluno);
		    	}
		        
		        datasetAluno = DatasetFactory.getDataset("FEC_solicitacao_turma", null, constraintsAluno, null);
		        
		        for(var k = 0; k < datasetAluno.rowsCount; k++){
	        		//Adiciona os valores nas colunas respectivamente.
		            dataset.addRow(new Array(
		            	docId,
		    		    docVersion,
		    		    codProcesso,
		    		    statusTurma,
			            datasetAluno.getValue(k, "nomeAluno"),
			            datasetAluno.getValue(k, "cpfAluno"),
			            datasetAluno.getValue(k, "tokenAluno"),
			            datasetAluno.getValue(k, "notaAluno"),
			            datasetAluno.getValue(k, "codAluno"),
			            datasetAluno.getValue(k, "pesqSatisfacaoRespondida"),
			            datasetAluno.getValue(k, "downloadComprovante"),
			            datasetAluno.getValue(k, "frequenciaAluno"),
			            datasetAluno.getValue(k, "novoAluno"),
			            datasetAluno.getValue(k, "emailAluno"),
			            datasetAluno.getValue(k, "telAluno1")
		            ));
		        }
			}
		
		}else{
			//trata o dataset vazio
			dataset.addRow( new Array('msg: Não há registros nesse dataset') );
		}
		
	}catch(e){
		msgError = "Erro ao carregar a FEC_turmaAlunoInsercao: " + e;
		log.error(msgError);
		dataset.addColumn("erro");
		dataset.addRow (new Array(msgError));
	}
	
	return dataset;
}