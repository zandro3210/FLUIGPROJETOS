function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	var datasetFields = new Array("matriculaUsuario", "nomeUsuario", "companyid", "cardid", "documentid", "nomeParceiro", "cnpjParceiro", "emailParceiro");
	var constMatriculaUsuario = '';
	
	if(constraints != null){
		for (var i = 0; i < constraints.length; i++){			
			if(constraints[i].fieldName == 'matriculaUsuario' && constraints[i].initialValue != ''){
				log.info("matriculaUsuario ===>>>" + constraints[i].initialValue);
				constMatriculaUsuario = constraints[i].initialValue;
			}
		}
	}
	
	for (var i = 0; i < datasetFields.length; i++) {
		dataset.addColumn(datasetFields[i]);
	}
	
	try{
		//Cria a constraint para buscar os formul?rios ativos
		var cp1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
		var constraintsParceiro = new Array(cp1);
	
		var datasetParceiro = DatasetFactory.getDataset("FEC_parceiro", null, constraintsParceiro, null);
		var datasetParceiroFilho = {};
		
		//Cria as constraints para buscar os campos filhos, passando o tablename, n?mero da formul?rio e vers?o
		var cpf1 = DatasetFactory.createConstraint("tablename", "tbParceiro" ,"tbParceiro", ConstraintType.MUST);
		
		if(datasetParceiro.rowsCount > 0) {
			for(var i = 0; i < datasetParceiro.rowsCount; i++) {
				var docId = datasetParceiro.getValue(i, "metadata#id");
		        var docVersion = datasetParceiro.getValue(i, "metadata#version");
		        var companyid = datasetParceiro.getValue(i, "companyid");
		        var cardid = datasetParceiro.getValue(i, "cardid");
		        var nomeParceiro = datasetParceiro.getValue(i, "nomeParceiro");
		        var cnpjParceiro = datasetParceiro.getValue(i, "cnpjParceiro");
		        var emailParceiro = datasetParceiro.getValue(i, "emailParceiro");
		        
		        //Cria as constraints para buscar os campos filhos, passando o tablename, n?mero da formul?rio e vers?o
		        var cpf2 = DatasetFactory.createConstraint("metadata#id", docId, docId, ConstraintType.MUST);
		        var cpf3 = DatasetFactory.createConstraint("metadata#version", docVersion, docVersion, ConstraintType.MUST);
		        var constraintsFilho = new Array(cpf1, cpf2, cpf3);
		        
				if (constMatriculaUsuario != ''){
		        	var cMatriculaUsuario = DatasetFactory.createConstraint("matriculaColleague", constMatriculaUsuario, constMatriculaUsuario, ConstraintType.MUST);
		        	constraintsFilho.push(cMatriculaUsuario);
		    	}
		        
		        datasetParceiroFilho = DatasetFactory.getDataset("FEC_parceiro", null, constraintsFilho, null);
		        
		        for(var k = 0; k < datasetParceiroFilho.rowsCount; k++){
		        	dataset.addRow(new Array(
		        			datasetParceiroFilho.getValue(k, "matriculaColleague"),
		        			datasetParceiroFilho.getValue(k, "nomeColleague"),
		    		        companyid,
		    		        cardid,
		    		        docId,
		    		        nomeParceiro,
		    		        cnpjParceiro,
		    		        emailParceiro
		        	));
		        }
			}
	
		}else{
			//trata o dataset vazio
			dataset.addRow( new Array('Não há registros nesse dataset') );			
		}
	
	}catch(e){
		msgError = "Erro ao carregar a FEC_parceiroUsuario: " + e;
		log.error(msgError);
		dataset.addColumn("erro");
		dataset.addRow (new Array(msgError));
	}

return dataset;
}