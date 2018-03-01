function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	var datasetFields = new Array("docId","docVersion", "codProcesso", "codAvaliacao", "tipoTreinamentoPai", "codTreinamentoPai", "nomeAvaliacao", "tipoAvaliacao", "statusAvaliacao");
	var constCodTreinamentoPai = '';
	var constCodProcesso = '';
	var constStatusAvaliacao = '';
	var constCodAvaliacao = '';
	var constTipoAvaliacao = '';
	
	if(constraints != null){
		for (var i = 0; i < constraints.length; i++){			
			if(constraints[i].fieldName == 'codTreinamentoPai' && constraints[i].initialValue != ''){
				log.info("codTreinamentoPai ===>>>" + constraints[i].initialValue);
				constCodTreinamentoPai = constraints[i].initialValue;
			}
			if(constraints[i].fieldName == 'codProcesso' && constraints[i].initialValue != ''){
				log.info("constCodProcesso ===>>>" + constraints[i].initialValue);
				constCodProcesso = constraints[i].initialValue;
			}
			if(constraints[i].fieldName == 'statusAvaliacao' && constraints[i].initialValue != ''){
				log.info("constStatusAvaliacao ===>>>" + constraints[i].initialValue);
				constStatusAvaliacao = constraints[i].initialValue;
			}
			if(constraints[i].fieldName == 'codAvaliacao' && constraints[i].initialValue != ''){
				log.info("constCodAvaliacao ===>>>" + constraints[i].initialValue);
				constCodAvaliacao = constraints[i].initialValue;
			}
			if(constraints[i].fieldName == 'tipoAvaliacao' && constraints[i].initialValue != ''){
				log.info("constTipoAvaliacao ===>>>" + constraints[i].initialValue);
				constTipoAvaliacao = constraints[i].initialValue;
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
		
		var datasetTurma = DatasetFactory.getDataset("FEC_solicitacao_turma", null, constraintsTurma, null);
		var datasetAvaliacao = {};
		
		//Cria as constraints para buscar os campos filhos, passando o tablename, n?mero da formul?rio e vers?o
		var ca1 = DatasetFactory.createConstraint("tablename", "tbAvaliacao" ,"tbAvaliacao", ConstraintType.MUST);
		var ca4 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
		
		if(datasetTurma.rowsCount > 0){
			for(var i = 0; i < datasetTurma.rowsCount; i++) {
		        var docId = datasetTurma.getValue(i, "metadata#id");
		        var docVersion = datasetTurma.getValue(i, "metadata#version");
		        var codProcesso = datasetTurma.getValue(i, "codProcesso");
		        var tipoTreinamentoPai = datasetTurma.getValue(i, "tipoTreinamentoPai");
		        
		        //Cria as constraints para buscar os campos filhos, passando o tablename, n?mero da formul?rio e vers?o
		        var ca2 = DatasetFactory.createConstraint("metadata#id", docId, docId, ConstraintType.MUST);
		        var ca3 = DatasetFactory.createConstraint("metadata#version", docVersion, docVersion, ConstraintType.MUST);
		        var constraintsAvaliacao = new Array(ca1, ca2, ca3, ca4);
		        
		        if (constCodTreinamentoPai != ''){
		        	var ccodTreinamentoPai = DatasetFactory.createConstraint("codTreinamentoPai", constCodTreinamentoPai, constCodTreinamentoPai, ConstraintType.MUST);
		        	constraintsAvaliacao.push(ccodTreinamentoPai);
		    	}
		        
		        if (constStatusAvaliacao != ''){
		        	var cStatusAvaliacao = DatasetFactory.createConstraint("statusAvaliacao", constStatusAvaliacao, constStatusAvaliacao, ConstraintType.MUST);
		        	constraintsAvaliacao.push(cStatusAvaliacao);
		    	}
		        if (constTipoAvaliacao != ''){
		        	var cTipoAvaliacao = DatasetFactory.createConstraint("tipoAvaliacao", constTipoAvaliacao, constTipoAvaliacao, ConstraintType.MUST);
		        	constraintsAvaliacao.push(cTipoAvaliacao);
		    	}
		        
		        if (constCodAvaliacao != ''){
		        	var cCodAvaliacao = DatasetFactory.createConstraint("codAvaliacao", constCodAvaliacao, constCodAvaliacao, ConstraintType.MUST);
		        	constraintsAvaliacao.push(cCodAvaliacao);
		    	}
		        
		        //Define os campos para ordenação
		        //var sortingFields = new Array("tipoAvaliacao");
		        
		        datasetAvaliacao = DatasetFactory.getDataset("FEC_solicitacao_turma", null, constraintsAvaliacao, null);
		        
		        for(var k = 0; k < datasetAvaliacao.rowsCount; k++){
		        	//Busca o documentid da Avaliação em questão
			        var nomeAvaliacao = datasetAvaliacao.getValue(k, "nomeAvaliacao");
			        var tipoAvaliacao = datasetAvaliacao.getValue(k, "tipoAvaliacao");
			        
		        	var ca4 = DatasetFactory.createConstraint("nomeAvaliacao", nomeAvaliacao, nomeAvaliacao, ConstraintType.MUST);
			        var constraintsAvaliacao2 = new Array(ca4);
			        datasetAvaliacao2 = DatasetFactory.getDataset("FEC_avaliacao", null, constraintsAvaliacao2, null);
		        	
	        		//Adiciona os valores nas colunas respectivamente.
		            dataset.addRow(new Array(
		            	docId,
		    		    docVersion,
		    		    codProcesso,
		    		    datasetAvaliacao2.getValue(0, "documentid"),
		    		    tipoTreinamentoPai,
		    		    datasetAvaliacao.getValue(k, "treinamentoAvaliacao"),
		    		    nomeAvaliacao,
		    		    tipoAvaliacao,
		    		    datasetAvaliacao.getValue(k, "statusAvaliacao")
		            ));
		        }
			}
		
		}else{
			//trata o dataset vazio
			dataset.addRow( new Array('msg: Não há registros nesse dataset') );
		}
		
	}catch(e){
		msgError = "Erro ao carregar a FEC_turmaAvaliacao: " + e;
		log.error(msgError);
		dataset.addColumn("erro");
		dataset.addRow (new Array(msgError));
	}
	
	return dataset;
}