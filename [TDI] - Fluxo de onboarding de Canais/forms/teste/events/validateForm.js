function validateForm(form){
	var CURRENT_STATE = getValue("WKNumState");
	var NEXT_STATE = getValue("WKNextState");
	var COMPLETED_TASK = (getValue("WKCompletTask")=="true");

	if(!COMPLETED_TASK || CURRENT_STATE == NEXT_STATE){
		return;
	}
	
	ValidateFormUtils.objForm = form;
	
	if(CURRENT_STATE == Activity.ZERO || CURRENT_STATE == Activity.INICIO){
		
		ValidateFormUtils.validate("tpContrato", "Tipo de Contrato");
		
		if(form.getValue("tipoSolic") == "franquia"){		
			ValidateFormUtils.validate("dsUnidadeResponsavel", "Unidade Responsável");
			ValidateFormUtils.validate("tpUnidade", "Unidade Própria ou Terceira?");
			
			if(ValidateFormUtils.isEmpty("cbSegAgroindustria") &&
			   ValidateFormUtils.isEmpty("cbSegConstrucao") &&
			   ValidateFormUtils.isEmpty("cbSegDistribuicao") &&
			   ValidateFormUtils.isEmpty("cbSegEducacional") &&
			   ValidateFormUtils.isEmpty("cbSegFinancial") &&
			   ValidateFormUtils.isEmpty("cbSegJuridico") &&
			   ValidateFormUtils.isEmpty("cbSegLogistica") &&
			   ValidateFormUtils.isEmpty("cbSegManufatura") &&
			   ValidateFormUtils.isEmpty("cbSegSaude") &&
			   ValidateFormUtils.isEmpty("cbSegServicos") &&
			   ValidateFormUtils.isEmpty("cbSegVarejo"))
			   ValidateFormUtils.errors += "Selecione pelo menos um Segmento de Atuação!<br/>";
			
		}else if(form.getValue("tipoSolic") == "master"){
			
			ValidateFormUtils.validate("slVinculoMaster", "Vínculo com Master?");
			
			if(form.getValue("slVinculoMaster") == "sim")
				ValidateFormUtils.validate("dsUnidadeResponsavel", "Unidade Responsável");
			
			if(ValidateFormUtils.isEmpty("cbSegDistribuicao") &&
			   ValidateFormUtils.isEmpty("cbSegManufatura") &&
			   ValidateFormUtils.isEmpty("cbSegSaude") &&
			   ValidateFormUtils.isEmpty("cbSegServicos") &&
			   ValidateFormUtils.isEmpty("cbSegVarejo") &&
			   ValidateFormUtils.isEmpty("cbSegServicos") &&
			   ValidateFormUtils.isEmpty("cbSegVestuario") &&
			   ValidateFormUtils.isEmpty("cbSegBeleza") &&
			   ValidateFormUtils.isEmpty("cbSegAppGestao") &&
			   ValidateFormUtils.isEmpty("cbSegBarRestaurante") &&
			   ValidateFormUtils.isEmpty("cbSegOdonto"))
			   ValidateFormUtils.errors += "Selecione pelo menos uma Oferta de Atuação!<br/>";
		}
		
		ValidateFormUtils.validate("nrCnpj", "CNPJ");
		ValidateFormUtils.validate("razaoSocial", "Razão Social");
		ValidateFormUtils.validate("nmFantasia", "Nome Fantasia");
		
		if(form.getValue("tipoSolic") == "master")
			ValidateFormUtils.validate("nrEscricaoEstadual", "Inscrição Estadual");
		
		ValidateFormUtils.validate("endereco", "Endereço");
		ValidateFormUtils.validate("cep", "CEP");
		ValidateFormUtils.validate("uf", "UF");
		ValidateFormUtils.validate("nmMunicipio", "Município");
		ValidateFormUtils.validate("nrTelefone", "Telefone");
		
		ValidateFormUtils.validate("nome", "Nome");
		ValidateFormUtils.validate("email", "E-mail");
		ValidateFormUtils.validate("telefone", "Telefone");
		
		ValidateFormUtils.validateChildSize("nmSocio", "Sócio");		
		ValidateFormUtils.validateChild("nmSocio", "Sócio");
		ValidateFormUtils.validateChild("cpfSocio", "CPF Sócio");
		
		var valuesArray = ["CNT", "AVT", "ANT"];
		ValidateFormUtils.validate("banco", "Banco", "tpContrato", valuesArray);
		ValidateFormUtils.validate("agencia", "Agência", "tpContrato", valuesArray);
		ValidateFormUtils.validate("conta", "Conta", "tpContrato", valuesArray);
		ValidateFormUtils.validate("emailRecebimentoRelatrio", "E-mail para Recebimento de Relatórios de Comissões", "tpContrato", valuesArray);
	}
	else if(CURRENT_STATE == Activity.ANALISAR_SOLICITACAO_FINANCEIRO && form.getValue("_aprovadoFinanceiro") == "false"){
		ValidateFormUtils.validate("_motivoReprovadoFinanceiro", "Motivo da Reprovação");
	}
	else if(CURRENT_STATE == Activity.INFORMAR_CODIGO_UNIDADE){
		ValidateFormUtils.validate("cdChamado", "Código do Chamado");
		ValidateFormUtils.validate("dtSolucaoChamado", "Data de Solução do Chamado");
		ValidateFormUtils.validate("cdCanal", "Código do Canal");
	}
	else if(CURRENT_STATE == Activity.INCLUIR_CLAUSULAS){
		if(form.getValue("tpContrato") == "CAT" || form.getValue("tpContrato") == "CNT CHEF"){
			ValidateFormUtils.validateChildSize("tblCodCliente", "Cliente");
			
			if(form.getValue("tpContrato") == "CAT"){
				ValidateFormUtils.validate("pctMetaCrescimento", "Meta de Crescimento Líquido (ano)");
				ValidateFormUtils.validate("pctMetaNps", "Meta do NPS Médio (ano)");
			}
		}
		
		ValidateFormUtils.validateChild("txtCondicao", "Condição");
	}
	log.info('ValidateFormUtils.errors.trim() '+ ValidateFormUtils.errors.trim());
	if (ValidateFormUtils.errors.trim() != "") throw ValidateFormUtils.errors;
}