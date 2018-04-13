 function createDataset(fields, constraints, sortFields) {
	 try{
		 var dataset = DatasetBuilder.newDataset();
       
	    //Cria as colunas
	    dataset.addColumn("item");
	    dataset.addColumn("descricao");
	
	    //Cria os registros
	    dataset.addRow(new Array("x", "Selecione!"));
	    dataset.addRow(new Array("00", "PAGAMENTO ANTECIPADO"));
	    dataset.addRow(new Array("01", "01- Vale Refeição"));
	    dataset.addRow(new Array("02", "02- Vale Transporte"));
	    dataset.addRow(new Array("03", "03- Pagamento Judicial"));
	    dataset.addRow(new Array("04", "04- Prêmio"));
	    dataset.addRow(new Array("05", "05- Décimo Terceiro"));
	    dataset.addRow(new Array("06", "06- Férias"));
	    dataset.addRow(new Array("07", "07- Recisão Contratual"));
	    dataset.addRow(new Array("08", "08- Empréstimo"));
	    dataset.addRow(new Array("09", "09- Auxílio Creche"));
	    dataset.addRow(new Array("10", "10 - Comissão"));
	    dataset.addRow(new Array("11", "11 - Depósito Não Localizado"));
	    dataset.addRow(new Array("12", "12 - Devolução Clientes"));
	    dataset.addRow(new Array("13", "13 - Outros - Pagamentos"));
	    dataset.addRow(new Array("14", "14 - Salário"));
	    dataset.addRow(new Array("15", "15 - Pensão Alimentícia"));
	    dataset.addRow(new Array("16", "16 - Distrato"));
	    dataset.addRow(new Array("17", "17 - Reembolso Maratonas"));
	    dataset.addRow(new Array("18", "18 - Contribuição Sindical"));
	    dataset.addRow(new Array("19", "19 - Impostos"));
	} // try 
	catch(error) {
		log.info (" ++ DATASET dsItemSolicPagamento - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro", "erro")); 
	}

    return dataset;
}
