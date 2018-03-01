function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	var datasetFields = new Array("docId","docVersion","dtAtual", "nomeAvaliacao", "tipoAvaliacao", "codTreinamentoPai", "nomeTreinamentoPai", "codQuestao", "enunciadoQuestao", "alt1Questao", "alt2Questao", "alt3Questao", "alt4Questao", "alt5Questao", "gabaritoQuestao", "gabaritoAvaliacao" );
	var constCodTreinamentoPai = '';
	var constDocId = '';
	var constNomeAvaliacao = '';
	
	if(constraints != null){
		for (var i = 0; i < constraints.length; i++){			
			if(constraints[i].fieldName == 'codTreinamentoPai' && constraints[i].initialValue != ''){
				log.info("codTreinamentoPai ===>>>" + constraints[i].initialValue);
				constCodTreinamentoPai = constraints[i].initialValue;
			}
			if(constraints[i].fieldName == 'nomeAvaliacao' && constraints[i].initialValue != ''){
				log.info(" nomeAvaliacao ===>>>" + constraints[i].initialValue);
				constNomeAvaliacao = constraints[i].initialValue;
			}
			if(constraints[i].fieldName == 'docId' && constraints[i].initialValue != ''){
				log.info(" docId ===>>>" + constraints[i].initialValue);
				constDocId = constraints[i].initialValue;
			}
		}
	}
	
	for (var i = 0; i < datasetFields.length; i++) {
		dataset.addColumn(datasetFields[i]);
	}
	
	try{
		//Cria a constraint para buscar os formul?rios ativos
		var ca1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
		var constraintsPrincipal = new Array(ca1);
		
		if (constNomeAvaliacao != ''){
        	var cNomeAvaliacao = DatasetFactory.createConstraint("nomeAvaliacao", constNomeAvaliacao, constNomeAvaliacao, ConstraintType.MUST);
        	constraintsPrincipal.push(cNomeAvaliacao);
    	}
		if (constDocId != ''){
        	var cDocId = DatasetFactory.createConstraint("documentid", constDocId, constDocId, ConstraintType.MUST);
        	constraintsPrincipal.push(cDocId);
    	}
		
        //Define os campos para ordenação
        var sortingFields = new Array("tipoAvaliacao");
		
		var datasetAvaliacao = DatasetFactory.getDataset("FEC_avaliacao", null, constraintsPrincipal, sortingFields);
		var datasetTreinamento = {};
		
		//Cria as constraints para buscar os campos filhos, passando o tablename, n?mero da formul?rio e vers?o
		var ct1 = DatasetFactory.createConstraint("tablename", "tbTreinamento" ,"tbTreinamento", ConstraintType.MUST);
		
		if(datasetAvaliacao.rowsCount > 0) {
			for(var i = 0; i < datasetAvaliacao.rowsCount; i++) {
		        var docId = datasetAvaliacao.getValue(i, "metadata#id");
		        var docVersion = datasetAvaliacao.getValue(i, "metadata#version");
		        var dtAtual = datasetAvaliacao.getValue(i, "dtAtual");
		        var nomeAvaliacao = datasetAvaliacao.getValue(i, "nomeAvaliacao");
		        var tipoAvaliacao = datasetAvaliacao.getValue(i, "tipoAvaliacao");
		        var gabaritoAvaliacao = datasetAvaliacao.getValue(i, "gabaritoAvaliacao");
		         
		        //Cria as constraints para buscar os campos filhos, passando o tablename, n?mero da formul?rio e vers?o
		        var ct2 = DatasetFactory.createConstraint("metadata#id", docId, docId, ConstraintType.MUST);
		        var ct3 = DatasetFactory.createConstraint("metadata#version", docVersion, docVersion, ConstraintType.MUST);
		        var constraintsTreinamento = new Array(ct1, ct2, ct3);
		        
		        /*if (constCodTreinamentoPai != ''){
		        	var ccodTreinamentoPai = DatasetFactory.createConstraint("codTreinamentoPai", constCodTreinamentoPai, constCodTreinamentoPai, ConstraintType.MUST);
		        	constraintsTreinamento.push(ccodTreinamentoPai);
		        }*/
		        
		        datasetTreinamento = DatasetFactory.getDataset("FEC_avaliacao", null, constraintsTreinamento, null);
		        var codTreinamentoPai = '';
		        var nomeTreinamentoPai = '';
		        
		        for(var j = 0; j < datasetTreinamento.rowsCount; j++){
		        	codTreinamentoPai += datasetTreinamento.getValue(j, "codTreinamentoPai")+',';
		        	nomeTreinamentoPai += datasetTreinamento.getValue(j, "nomeTreinamentoPai")+',';
		        }
		        //remove a ultima virgula
		        codTreinamentoPai = codTreinamentoPai.replace(/[,]$/g, '');
		        nomeTreinamentoPai = nomeTreinamentoPai.replace(/[,]$/g, '');
		        
		        var datasetQuestao = {};
		        //Cria as constraints para buscar os campos filhos, passando o tablename, n?mero da formul?rio e vers?o
		        var cq1 = DatasetFactory.createConstraint("tablename", "tbQuestao" ,"tbQuestao", ConstraintType.SHOULD);
		        var cq2 = DatasetFactory.createConstraint("metadata#id", docId, docId, ConstraintType.MUST);
		        var cq3 = DatasetFactory.createConstraint("metadata#version", docVersion, docVersion, ConstraintType.MUST);
		        var constraintsQuestao = new Array(cq1, cq2, cq3);
		        
		        datasetQuestao = DatasetFactory.getDataset("FEC_avaliacao", null, constraintsQuestao, null);
		        
		        for(var k = 0; k < datasetQuestao.rowsCount; k++){
		        	if(codTreinamentoPai != '' ){
		        		//constraint codTreinamentoPai
		        		if (constCodTreinamentoPai == '' || codTreinamentoPai.match(constCodTreinamentoPai) ){	        		
				            //Adiciona os valores nas colunas respectivamente.
		        			dataset.addRow(new Array(
					        	docId,
				    		    docVersion,
				    		    dtAtual,
				    		    nomeAvaliacao,
				    		    tipoAvaliacao,
					            codTreinamentoPai,
					            nomeTreinamentoPai,
				    		    datasetQuestao.getValue(k, "codQuestao"),
				    		    datasetQuestao.getValue(k, "enunciadoQuestao"),
				    		    datasetQuestao.getValue(k, "alt1Questao"),
				    		    datasetQuestao.getValue(k, "alt2Questao"),
				    		    datasetQuestao.getValue(k, "alt3Questao"),
				    		    datasetQuestao.getValue(k, "alt4Questao"),
				    		    datasetQuestao.getValue(k, "alt5Questao"),
				    		    datasetQuestao.getValue(k, "gabaritoQuestao"),
				    		    gabaritoAvaliacao
				            ));
		        		}
		        	}
		        }
			}
		
		}else{
			//trata o dataset vazio
			dataset.addRow( new Array('Não há registros nesse dataset') );			
		}
		
	}catch(e){
		msgError = "Erro ao carregar a FEC_avaliacaoPaiFilho: " + e;
		log.error(msgError);
		dataset.addColumn("erro");
		dataset.addRow (new Array(msgError));
	}
	
	return dataset;
}