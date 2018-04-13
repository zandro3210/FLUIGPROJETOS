function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	var datasetFields = new Array("docId", "docVersion", "codProcesso", "dtSolicitacao", "nomeTreinamento", "cargaHorariaTreinamento", "dtInicio", "dtTermino", "nomeInstrutor", "nomeParceiro", "nomeAluno", "cpfAluno", "emailAluno", "frequenciaAluno", "notaAluno");
	var constCodProcesso = '';
	var initialDate = '';
	var finalDate = '';
	
	if(constraints != null && constraints.length > 0 ){
		for (var i = 0; i < constraints.length; i++){			
			if(constraints[i].fieldName == 'codProcesso' && constraints[i].initialValue != ''){
				log.info("constCodProcesso ===>>>" + constraints[i].initialValue);
				constCodProcesso = constraints[i].initialValue;
			}
			if(constraints[i].fieldName == 'dtSolicitacao' && constraints[i].initialValue != '' && constraints[i].finalValue != ''){
				log.info("constDtSolicitacao ===>>>" + constraints[i].initialValue);
				initialDate = constraints[i].initialValue;
				finalDate = constraints[i].finalValue;
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
		
    	if (initialDate != ''){
        	var cDtSolicitacao = DatasetFactory.createConstraint("dtSolicitacao", initialDate, finalDate, ConstraintType.MUST);
        	constraintsTurma.push(cDtSolicitacao);
    	}
		
		var datasetTurma = DatasetFactory.getDataset("FEC_solicitacao_turma", null, constraintsTurma, null);
		var datasetTreinamento = {};
		var ct1 = DatasetFactory.createConstraint("tablename", "tbTreinamento" ,"tbTreinamento", ConstraintType.MUST);        
		
		if(datasetTurma.rowsCount > 0){
			for(var i = 0; i < datasetTurma.rowsCount; i++) {				
		        var docId = datasetTurma.getValue(i, "metadata#id");
		        var docVersion = datasetTurma.getValue(i, "metadata#version");
		        var codProcesso = datasetTurma.getValue(i, "codProcesso");
		        var dtSolicitacao = datasetTurma.getValue(i, "dtSolicitacao");
		        var dtInicio = datasetTurma.getValue(i, "dtInicio");
		        var dtTermino = datasetTurma.getValue(i, "dtTermino");
		        var tipoTreinamentoPai = datasetTurma.getValue(i, "tipoTreinamentoPai");
		        var nomeTreinamentoPai = datasetTurma.getValue(i, "nomeTreinamentoPai");
		        var cargaHorariaTreinamentoPai = datasetTurma.getValue(i, "cargaHorariaTreinamentoPai");
		        var nomeInstrutor = "";
		        var nomeParceiroTreinamento = "";
		        
		        //Cria as constraints para buscar os campos filhos, passando o tablename, n?mero da formul?rio e vers?o
		        var ct2 = DatasetFactory.createConstraint("metadata#id", docId, docId, ConstraintType.MUST);
		        var ct3 = DatasetFactory.createConstraint("metadata#version", docVersion, docVersion, ConstraintType.MUST);
		        var ct4 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
		        var constraintsTreinamento = new Array(ct1, ct2, ct3, ct4);
		        
		        datasetTreinamento = DatasetFactory.getDataset("FEC_solicitacao_turma", null, constraintsTreinamento, null);
		        
	        	if( tipoTreinamentoPai == 'treinamento' ){
	        		nomeInstrutor = datasetTurma.getValue(i, "nomeInstrutorPai");
	        		nomeParceiroTreinamento = datasetTurma.getValue(i, "nomeParceiroPai");
	        	}else{
	        		//if trilha
	        		nomeInstrutor = datasetTreinamento.getValue(0, "nomeInstrutor");
	        		nomeParceiroTreinamento = datasetTreinamento.getValue(0, "nomeParceiro");
	        	}
		        
		        var datasetAluno = {};
		        //Cria as constraints para buscar os campos filhos, passando o tablename, n?mero da formul?rio e vers?o
		        var ca1 = DatasetFactory.createConstraint("tablename", "tbAluno" ,"tbAluno", ConstraintType.MUST);
		        var ca2 = DatasetFactory.createConstraint("metadata#id", docId, docId, ConstraintType.MUST);
		        var ca3 = DatasetFactory.createConstraint("metadata#version", docVersion, docVersion, ConstraintType.MUST);
		        var ca4 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
		        var constraintsAluno = new Array(ca1, ca2, ca3, ca4);
		        
		        datasetAluno = DatasetFactory.getDataset("FEC_solicitacao_turma", null, constraintsAluno, null);
		        
		        for(var k = 0; k < datasetAluno.rowsCount; k++){
	        		//Adiciona os valores nas colunas respectivamente.
		            dataset.addRow(new Array(
		            	docId,
		    		    docVersion,
		    		    codProcesso,
		    		    dtSolicitacao,
		    		    nomeTreinamentoPai,
		    		    cargaHorariaTreinamentoPai,
		    		    dtInicio,
		    		    dtTermino,
		    		    nomeInstrutor,
		    		    nomeParceiroTreinamento,
			            datasetAluno.getValue(k, "nomeAluno"),
			            datasetAluno.getValue(k, "cpfAluno"),
			            datasetAluno.getValue(k, "emailAluno"),
			            datasetAluno.getValue(k, "frequenciaAluno"),
			            datasetAluno.getValue(k, "notaAluno")
		            ));
		        }
			}
		
		}else{
			//trata o dataset vazio
			dataset.addRow( new Array('msg: Não há registros nesse dataset') );
		}
		
	}catch(e){
		msgError = "Erro ao carregar a FEC_birt: " + e;
		log.error(msgError);
		dataset.addColumn("erro");
		dataset.addRow (new Array(msgError));
	}
	
	return dataset;
}