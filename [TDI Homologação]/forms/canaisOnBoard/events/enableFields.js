function enableFields(form){
	var CURRENT_STATE = getValue("WKNumState");
	
	if(CURRENT_STATE != Activity.ZERO && CURRENT_STATE != Activity.INICIO){
		form.setEnabled("tipoSolic", false);
		form.setEnabled("slVinculoMaster", false);
		form.setEnabled("cdUnidadeResponsavel", false);
		form.setEnabled("tpUnidade", false);
		form.setEnabled("tpContrato", false);
		
		form.setEnabled("cbSegAgroindustria", false);
		form.setEnabled("cbSegConstrucao", false);
		form.setEnabled("cbSegDistribuicao", false);
		form.setEnabled("cbSegEducacional", false);
		form.setEnabled("cbSegFinancial", false);
		form.setEnabled("cbSegJuridico", false);
		form.setEnabled("cbSegLogistica", false);
		form.setEnabled("cbSegManufatura", false);
		form.setEnabled("cbSegSaude", false);
		form.setEnabled("cbSegServicos", false);
		form.setEnabled("cbSegVarejo", false);
		form.setEnabled("cbSegVestuario", false);
		form.setEnabled("cbSegBeleza", false);
		form.setEnabled("cbSegAppGestao", false);
		form.setEnabled("cbSegBarRestaurante", false);
		form.setEnabled("cbSegOdonto", false);
		
		form.setEnabled("fgCopiaRg", false);
		form.setEnabled("fgRelatorioFaturamento", false);
		form.setEnabled("fgEireli", false);
		form.setEnabled("objetoCanalTotvs", false);
		form.setEnabled("cartaoCnpj", false);
		form.setEnabled("contratoSocial", false);
		form.setEnabled("certidaoNegativa", false);
		form.setEnabled("carteiraClientes", false);
		
		form.setEnabled("nrCnpj", false);
		form.setEnabled("razaoSocial", false);
		form.setEnabled("nmFantasia", false);
		form.setEnabled("endereco", false);
		form.setEnabled("cep", false);
		form.setEnabled("uf", false);
		form.setEnabled("nmMunicipio", false);
		form.setEnabled("nrTelefone", false);
		form.setEnabled("website", false);
		
		form.setEnabled("nome", false);
		form.setEnabled("email", false);
		form.setEnabled("telefone", false);
		
		form.setHideDeleteButton(true);
		form.setEnabled("nmSocio", false);
		form.setEnabled("cpfSocio", false);
		
		form.setEnabled("banco", false);
		form.setEnabled("agencia", false);
		form.setEnabled("conta", false);
		form.setEnabled("emailRecebimentoRelatrio", false);
		
		form.setEnabled("observacoes", false);
		
		form.setEnabled("cdChamado", false);
		form.setEnabled("dtSolucaoChamado", false);
		form.setEnabled("cdCanal", false);
	}

}