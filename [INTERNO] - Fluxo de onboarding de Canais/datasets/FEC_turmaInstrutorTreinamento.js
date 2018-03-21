function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	var datasetFields = new Array("docId","docVersion","codProcesso", "dtSolicitacao", "tipoTreinamentoPai", "dtInicio", "dtTermino", "codTreinamento", "nomeTreinamento", "cargaHorariaTreinamento", "codInstrutor", "nomeInstrutor");
	var constCodTreinamento = '';
	var constCodInstrutor = '';
	var constCodProcesso = '';
	var constDocId = '';
	
	if(constraints != null){
		for (var i = 0; i < constraints.length; i++){			
			if(constraints[i].fieldName == 'codTreinamento' && constraints[i].initialValue != ''){
				log.info("constCodTreinamento ===>>>" + constraints[i].initialValue);
				codTreinamento = constraints[i].initialValue;
			}
			if(constraints[i].fieldName == 'codInstrutor' && constraints[i].initialValue != ''){
				log.info("constCodInstrutor ===>>>" + constraints[i].initialValue);
				constCodInstrutor = constraints[i].initialValue;
			}
			if(constraints[i].fieldName == 'codProcesso' && constraints[i].initialValue != ''){
				log.info("constCodProcesso ===>>>" + constraints[i].initialValue);
				constCodProcesso = constraints[i].initialValue;
			}
			if(constraints[i].fieldName == 'docId' && constraints[i].initialValue != ''){
				log.info("constDocId ===>>>" + constraints[i].initialValue);
				constDocId = constraints[i].initialValue;
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
    	if (constDocId != ''){
        	var cDocId = DatasetFactory.createConstraint("documentid", constDocId, constDocId, ConstraintType.MUST);
        	constraintsTurma.push(cDocId);
    	}
    	
		var datasetTurma = DatasetFactory.getDataset("FEC_solicitacao_turma", null, constraintsTurma, null);
		var datasetTreinamento = {};
		
		//Cria as constraints para buscar os campos filhos, passando o tablename, n?mero da formul?rio e vers?o
		var c2 = DatasetFactory.createConstraint("tablename", "tbTreinamento" ,"tbTreinamento", ConstraintType.MUST);
		
		if(datasetTurma.rowsCount > 0){
			for(var i = 0; i < datasetTurma.rowsCount; i++) {
		        var docId = datasetTurma.getValue(i, "metadata#id");
		        var docVersion = datasetTurma.getValue(i, "metadata#version");
		        var codProcesso = datasetTurma.getValue(i, "codProcesso");
		        var dtSolicitacao = datasetTurma.getValue(i, "dtSolicitacao");
		        var tipoTreinamentoPai = datasetTurma.getValue(i, "tipoTreinamentoPai");
		        var dtInicio = datasetTurma.getValue(i, "dtInicio");
		        var dtTermino = datasetTurma.getValue(i, "dtTermino");
		        
		        //se for TREINAMENTO
		        if(tipoTreinamentoPai == 'treinamento'){
		        	dataset.addRow(new Array(
			        	docId,
				        docVersion,
				        codProcesso,
				        dtSolicitacao,
				        tipoTreinamentoPai,
				        dtInicio,
				        dtTermino,
				        datasetTurma.getValue(i, "codTreinamentoPai"),
				        datasetTurma.getValue(i, "nomeTreinamentoPai"),
				        '',
				        datasetTurma.getValue(i, "codInstrutorPai"),
				        datasetTurma.getValue(i, "nomeInstrutorPai")
		            )); 
		        }else{
		        	//se for TRILHA
		        	//Cria as constraints para buscar os campos filhos, passando o tablename, n?mero da formul?rio e vers?o
			        var c3 = DatasetFactory.createConstraint("metadata#id", docId, docId, ConstraintType.MUST);
			        var c4 = DatasetFactory.createConstraint("metadata#version", docVersion, docVersion, ConstraintType.MUST);
			        var c5 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
			        var constraintsTreinamento = new Array(c2, c3, c4, c5);
			        
			        if (constCodTreinamento != ''){
			        	var ccodTreinamento = DatasetFactory.createConstraint("codTreinamento", constCodTreinamento, constCodTreinamento, ConstraintType.MUST);
			        	constraintsTreinamento.push(ccodTreinamento);
			    	}
			        if (constCodInstrutor != ''){
			        	var ccodInstrutor = DatasetFactory.createConstraint("codInstrutor", constCodInstrutor, constCodInstrutor, ConstraintType.MUST);
			        	constraintsTreinamento.push(ccodInstrutor);
			    	}
			        
			        datasetTreinamento = DatasetFactory.getDataset("FEC_solicitacao_turma", null, constraintsTreinamento, null);
			        
			        for(var j = 0; j < datasetTreinamento.rowsCount; j++){			        
			        	//Adiciona os valores nas colunas respectivamente.
			            dataset.addRow(new Array(
				        	docId,
					        docVersion,
					        codProcesso,
					        dtSolicitacao,
					        tipoTreinamentoPai,
					        dtInicio,
					        dtTermino,
					        datasetTreinamento.getValue(j, "codTreinamento"),
					        datasetTreinamento.getValue(j, "nomeTreinamento"),
					        datasetTreinamento.getValue(j, "cargaHorariaTreinamento"),
					        datasetTreinamento.getValue(j, "codInstrutor"),
					        datasetTreinamento.getValue(j, "nomeInstrutor")
			            ));
			        }
		        }
			}
		
		}else{
			//trata o dataset vazio
			dataset.addRow( new Array('msg: Não há registros nesse dataset') );			
		}
		
	}catch(e){
		msgError = "Erro ao carregar a FEC_turmaInstrutorTreinamento: " + e;
		log.error(msgError);
		dataset.addColumn("erro");
		dataset.addRow (new Array(msgError));
	}
	
	return dataset;
}