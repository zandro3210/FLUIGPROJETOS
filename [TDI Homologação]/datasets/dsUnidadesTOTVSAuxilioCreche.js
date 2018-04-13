function createDataset(fields, constraints, sortFields) {
	
	log.info (" ++ DATASET dsUnidadesTOTVSAuxilioCreche - INICIO");

	try{
		var dataset = DatasetBuilder.newDataset();
	    
		log.info (" ++ DATASET dsUnidadesTOTVSAuxilioCreche - PTO 1");
		
	    //Cria as colunas
	    dataset.addColumn("item");
	    dataset.addColumn("descricao");
	
	    log.info (" ++ DATASET dsUnidadesTOTVSAuxilioCreche - PTO 2");
	    
	    //Cria os registros
	    dataset.addRow(new Array("x", "Selecione!","X"));
	    dataset.addRow(new Array("1", "01- MATRIZ(ATÉ 60 MESES)"));
	    dataset.addRow(new Array("2", "02- RMS SP(ATÉ 60 MESES)"));
	    dataset.addRow(new Array("3", "03- RMS SALVADOR(ATÉ 60 MESES)"));
	    dataset.addRow(new Array("4", "04- ALPHAVILLE(ATÉ 60 MESES)"));
	    dataset.addRow(new Array("5", "05- CAMPINAS(ATÉ 60 MESES)"));
	    dataset.addRow(new Array("6", "06- NORDESTE(ATÉ 6 ANOS e 11 MESES)"));
	    dataset.addRow(new Array("7", "07- TOTVS RIO(ATÉ 12 MESES) - DIREITO A 6 PARCELAS"));
	    //dataset.addRow(new Array("8", "08- FILIAL RIO(ATÉ 12 MESES) - DIREITO A 6 PARCELAS"));
	    dataset.addRow(new Array("9", "09- MACAÉ(ATÉ 12 MESES)  - DIREITO A 6 PARCELAS"));
	    dataset.addRow(new Array("10", "10- TQTVD (ATÉ 12 MESES)  - DIREITO A 6 PARCELAS"));
	    dataset.addRow(new Array("11", "11- BELO HORIZONTE (ATÉ 28 MESES)"));
	    dataset.addRow(new Array("12", "12- PC GOIÂNIA (ATÉ 48 MESES)"));
		dataset.addRow(new Array("13", "13- PC BELO HORIZONTE (ATÉ 48 MESES)"));
		dataset.addRow(new Array("14", "14- PC FORTALEZA (ATÉ 48 MESES)"));
		dataset.addRow(new Array("15", "15- PORTO ALEGRE (ATÉ 60 MESES)"));
		dataset.addRow(new Array("16", "16- ASSIS (ATÉ 60 MESES)"));
		dataset.addRow(new Array("17", "17- CAXIAS (ATÉ 60 MESES)"));
		dataset.addRow(new Array("18", "18- JOINVILLE (ATÉ 12 MESES)"));
	  
	    log.info (" ++ DATASET dsUnidadesTOTVSAuxilioCreche - PTO 3");
	    
	} // try 
	catch(error) {
		log.info (" ++ DATASET dsUnidadesTOTVSAuxilioCreche - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro", "erro")); 
	}

	log.info (" ++ DATASET dsUnidadesTOTVSAuxilioCreche - FIM");
	
    return dataset;

}