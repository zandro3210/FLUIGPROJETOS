function createDataset (fields, constraints, sortFields){
	log.info('Inicio dataset metas');
	
	var dtinicial = "";
	var dtfinal = "";
	var situacao = "";
	
	if ((constraints != null) && (constraints.length > 0)) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "dataSolicitacao") {
                dtinicial = constraints[i].initialValue; 
                dtfinal = constraints[i].finalValue;
            }
            if (constraints[i].fieldName == "situacao") {
            	situacao = constraints[i].initialValue;
            }
        }
    }
	
	var newDataset = DatasetBuilder.newDataset();

	try{
		// Dados exclusivos do dataset principal
		newDataset.addColumn('metadata#id');
		newDataset.addColumn('dataSolicitacao');
		newDataset.addColumn('numeroSolicitacao');
		newDataset.addColumn('matriculaSolicitante');
		newDataset.addColumn('situacao');
		newDataset.addColumn('nomeSolicitante');
		newDataset.addColumn('dataAprovacao');
		newDataset.addColumn('statusAprovacao');
		newDataset.addColumn('observacaoAprovacao');
		newDataset.addColumn('matriculaParticipante');
		newDataset.addColumn('nomeParticipante');
		newDataset.addColumn('dataAprovacaoPlan');
		newDataset.addColumn('matriculaAprovadorPlan');
		newDataset.addColumn('aprovadorPlan');
		newDataset.addColumn('statusAprovacaoPlan');
		newDataset.addColumn('matriculaAprovacaoPlan');
		newDataset.addColumn('observacaoAprovacaoPlan');
		newDataset.addColumn('dataAprovacaoSup');
		newDataset.addColumn('matriculaAprovadorSup');
		newDataset.addColumn('nomeSup');
		newDataset.addColumn('statusAprovacaoSup');
		newDataset.addColumn('observacaoAprovacaoSup');
		newDataset.addColumn('matriculaSuperiorParticipante');
		newDataset.addColumn('mailParticipante');
		newDataset.addColumn('emailSuperiorParticipante');
		newDataset.addColumn('nomeSuperior');
		newDataset.addColumn('observacoesSuperior');
		
		// Dados exclusivos do detalhe
		newDataset.addColumn('CodComposicao');
		newDataset.addColumn('Codkpi');
		newDataset.addColumn('kpi');
		//newDataset.addColumn('CodAbrangencia');
		newDataset.addColumn('abrangencia');
		newDataset.addColumn('peso');
		newDataset.addColumn('orcadoMeta');
		
		var cAtivo = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
		//var cPeriodo = DatasetFactory.createConstraint("dataSolicitacao", dtinicial, dtfinal, ConstraintType.MUST_NOT);
		var lista = DatasetFactory.getDataset("desdobramentometas", null, new Array(cAtivo), null);
		
		if(lista.rowsCount > 0){
			for (var i = 0; i < lista.rowsCount; i++) {
				
				// Validações número da solicitação
				if (lista.getValue(i,"numeroSolicitacao").equals(""))
					continue; 
				
				var c1 = DatasetFactory.createConstraint("tablename", "metas" ,"metas", ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint("metadata#id", lista.getValue(i, "metadata#id"), lista.getValue(i, "metadata#id"), ConstraintType.MUST); 
				var c3 = DatasetFactory.createConstraint("metadata#version", lista.getValue(i, "metadata#version"), lista.getValue(i, "metadata#version"), ConstraintType.MUST);
				var c4 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
				var constraints_filhos = new Array(c1, c2, c3, c4);
				
				var listaFilha = DatasetFactory.getDataset("desdobramentometas", null, constraints_filhos, null);
				
				for(var j = 0; j < listaFilha.rowsCount; j++) {
					
					intSituacao = -1;
					
					/*
					var c5 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST);
					var c6 = DatasetFactory.createConstraint("processHistoryPK.processInstanceId", lista.getValue(i,"numeroSolicitacao"), lista.getValue(i,"numeroSolicitacao"), ConstraintType.MUST);
					var dsProcessHistory = DatasetFactory.getDataset("processHistory", null, new Array(c5,c6), null);
					
					if (dsProcessHistory.rowsCount > 0)
						intSituacao = dsProcessHistory.getValue(0, "stateSequence");
					*/
					
					
					if ((constraints != null) && (constraints.length > 0)) {
						//Validações data
						var dia = lista.getValue(i,"dataSolicitacao").substr(0,2);
						var mes = lista.getValue(i,"dataSolicitacao").substr(3,2);
						var ano = lista.getValue(i,"dataSolicitacao").substr(6,4);
						var dateDtSolicitacao = (new java.util.GregorianCalendar(ano, mes - 1, dia));

						ano = dtinicial.substr(0,4);
						mes = dtinicial.substr(5,2);
						dia = dtinicial.substr(8,2);
						var dateDtInicial = (new java.util.GregorianCalendar(ano, mes - 1, dia));
						
						ano = dtfinal.substr(0,4);
						mes = dtfinal.substr(5,2);
						dia = dtfinal.substr(8,2);
						var dateDtFinal = (new java.util.GregorianCalendar(ano, mes - 1, dia));
						
						if (dateDtInicial.after(dateDtSolicitacao))
							continue;
						
						if (dateDtFinal.before(dateDtSolicitacao))
							continue;
						
						// Validações atividade
						if (situacao != "*") {
							// Aprovação do planejamento
							if (situacao == "1" && intSituacao != 6)
								continue;
							// Aprovação do superior
							if (situacao == "2" && intSituacao != 7)
								continue;
							// Finalizado
							if (situacao == "3" && intSituacao != -1)
								continue;
						}
					}
					
					var colleagueId = lista.getValue(i,"matriculaAprovadorPlan");
					var constraint = DatasetFactory.createConstraint("colleaguePK.colleagueId", colleagueId, colleagueId, ConstraintType.MUST);
					var constraints_colleague = new Array(constraint);
					var datasetColleague = DatasetFactory.getDataset("colleague", null, constraints_colleague, null);
					var nomePlan = "";
					if (datasetColleague.rowsCount > 0)
						nomePlan = datasetColleague.getValue(0, "colleagueName"); 
					
					var colleagueId = lista.getValue(i,"matriculaAprovadorSup");
					var constraint = DatasetFactory.createConstraint("colleaguePK.colleagueId", colleagueId, colleagueId, ConstraintType.MUST);
					var constraints_colleague = new Array(constraint);
					var datasetColleague = DatasetFactory.getDataset("colleague", null, constraints_colleague, null);
					var nomeSup = "";
					if (datasetColleague.rowsCount > 0)
						nomeSup = datasetColleague.getValue(0, "colleagueName"); 
					
					newDataset.addRow(new Array(lista.getValue(i,"metadata#id"),
							lista.getValue(i,"dataSolicitacao"),
							lista.getValue(i,"numeroSolicitacao"),
							lista.getValue(i,"matriculaSolicitante"),
							intSituacao,
							lista.getValue(i,"nomeSolicitante"),
							lista.getValue(i,"dataAprovacao"),
							lista.getValue(i,"statusAprovacao"),
							lista.getValue(i,"observacaoAprovacao"),
							lista.getValue(i,"matriculaParticipante"),
							lista.getValue(i,"nomeParticipante"),
							lista.getValue(i,"dataAprovacaoPlan"),
							lista.getValue(i,"matriculaAprovadorPlan"),
							nomePlan,
							lista.getValue(i,"statusAprovacaoPlan"),
							lista.getValue(i,"matriculaAprovacaoPlan"),
							lista.getValue(i,"observacaoAprovacaoPlan"),
							lista.getValue(i,"dataAprovacaoSup"),
							lista.getValue(i,"matriculaAprovadorSup"),
							nomeSup,
							lista.getValue(i,"statusAprovacaoSup"),
							lista.getValue(i,"observacaoAprovacaoSup"),
							lista.getValue(i,"matriculaSuperiorParticipante"),
							lista.getValue(i,"mailParticipante"),
							lista.getValue(i,"emailSuperiorParticipante"),
							lista.getValue(i,"nomeSuperior"),
							lista.getValue(i,"observacoesSuperior"),
							
							listaFilha.getValue(j,"CodComposicao"),
							listaFilha.getValue(j,"Codkpi"),
							listaFilha.getValue(j,"kpi"),
							//listaFilha.getValue(j,"CodAbrangencia"),
							listaFilha.getValue(j,"abrangencia"),
							listaFilha.getValue(j,"peso"),
							listaFilha.getValue(j,"orcadoMeta")
						));
				}
			}
		
		}
	}catch(erro){
		log.info('Erro dataset metas' + erro);
		newDataset.addColumn('Erro');
		newDataset.addRow(new Array(erro.message));
	}
	return newDataset;
}
