function createDataset(fields, constraints, sortFields) {
	log.info("---->ENTRANDO NO DATASET<-----");
	var dataset = DatasetBuilder.newDataset();
	var datasetFields = new Array("docId","docVersion", "codProcesso", "dtSolicitacao", "dtInicio", "dtTermino", "tipoTreinamentoPai", "codTreinamento", "nomeTreinamentoPai", "cargaHorariaTreinamentoPai", "nomeAluno", "cpfAluno", "tokenAluno", "notaAluno", "codAluno", "pesqSatisfacaoRespondida", "downloadComprovante", "statusTurma", "frequenciaAluno", "turmaConcluida");
	var constTokenAluno = '';
	var constCodProcesso = '';
	var constStatusTurma = '';
	var constPesqSatisfacaoRespondida = '';
	var constDownloadComprovanteAluno = '';
	
	if(constraints != null && constraints.length > 0 ){
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
			if(constraints[i].fieldName == 'pesqSatisfacaoRespondida' && constraints[i].initialValue != ''){
				log.info("constPesqSatisfacaoRespondida ===>>>" + constraints[i].initialValue);
				constPesqSatisfacaoRespondida = constraints[i].initialValue;
			}
			if(constraints[i].fieldName == 'downloadComprovante' && constraints[i].initialValue != ''){
				log.info("constDownloadComprovanteAluno ===>>>" + constraints[i].initialValue);
				constDownloadComprovanteAluno = constraints[i].initialValue;
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
		var datasetTreinamento = {};
		
		//Cria as constraints para buscar os campos filhos, passando o tablename, n?mero da formul?rio e vers?o
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
		        var statusTurma = datasetTurma.getValue(i, "statusTurma");
		        var turmaConcluida = datasetTurma.getValue(i, "turmaConcluida");
		        
		        //Cria as constraints para buscar os campos filhos, passando o tablename, n?mero da formul?rio e vers?o
		        var ct2 = DatasetFactory.createConstraint("metadata#id", docId, docId, ConstraintType.MUST);
		        var ct3 = DatasetFactory.createConstraint("metadata#version", docVersion, docVersion, ConstraintType.MUST);
		        var ct4 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
		        var constraintsTreinamento = new Array(ct1, ct2, ct3, ct4);
		        
		        datasetTreinamento = DatasetFactory.getDataset("FEC_solicitacao_turma", null, constraintsTreinamento, null);
		        var codTreinamento = '';
		        
	        	if( tipoTreinamentoPai == 'treinamento' ){
	        		codTreinamento = datasetTurma.getValue(i, "codTreinamentoPai");
	        	}else{
	        		//if trilha
	        		for(var j = 0; j < datasetTreinamento.rowsCount; j++){
	        			codTreinamento += datasetTreinamento.getValue(j, "codTreinamento")+',';
	        		}
	        		//remove a ultima virgula
			        codTreinamento = codTreinamento.replace(/[,]$/g, '');
	        	}
		        
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
		        if (constPesqSatisfacaoRespondida != ''){
		        	var cpesqSatisfacaoRespondida = DatasetFactory.createConstraint("pesqSatisfacaoRespondida", constPesqSatisfacaoRespondida, constPesqSatisfacaoRespondida, ConstraintType.MUST);
		        	constraintsAluno.push(cpesqSatisfacaoRespondida);
		    	}
		        if (constDownloadComprovanteAluno != ''){
		        	var cDownloadComprovanteAluno = DatasetFactory.createConstraint("downloadComprovante", constDownloadComprovanteAluno, constDownloadComprovanteAluno, ConstraintType.MUST);
		        	constraintsAluno.push(cDownloadComprovanteAluno);
		    	}
		        
		        datasetAluno = DatasetFactory.getDataset("FEC_solicitacao_turma", null, constraintsAluno, null);
		        
		        for(var k = 0; k < datasetAluno.rowsCount; k++){
	        		//Adiciona os valores nas colunas respectivamente.
		            dataset.addRow(new Array(
		            	docId,
		    		    docVersion,
		    		    codProcesso,
		    		    dtSolicitacao,
		    		    dtInicio,
		    		    dtTermino,
		    		    tipoTreinamentoPai,
		    		    codTreinamento,
		    		    nomeTreinamentoPai,
		    		    cargaHorariaTreinamentoPai,
			            datasetAluno.getValue(k, "nomeAluno"),
			            datasetAluno.getValue(k, "cpfAluno"),
			            datasetAluno.getValue(k, "tokenAluno"),
			            datasetAluno.getValue(k, "notaAluno"),
			            datasetAluno.getValue(k, "codAluno"),
			            datasetAluno.getValue(k, "pesqSatisfacaoRespondida"),
			            datasetAluno.getValue(k, "downloadComprovante"),
			            statusTurma,
			            datasetAluno.getValue(k, "frequenciaAluno"),
			            turmaConcluida
		            ));
		        }
			}
		
		}else{
			//trata o dataset vazio
			dataset.addRow( new Array('msg: Não há registros nesse dataset') );
		}
		
	}catch(e){
		msgError = "Erro ao carregar a FEC_turmaAlunoTreinamento: " + e;
		log.error(msgError);
		dataset.addColumn("erro");
		dataset.addRow (new Array(msgError));
	}
	
	return dataset;
}