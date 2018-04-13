function createDataset(fields, constraints, sortFields) {

	try{
		var dataset = DatasetBuilder.newDataset();
	    
	    //Cria as colunas
	    dataset.addColumn("item");
	    dataset.addColumn("descricao");
	    dataset.addColumn("codMoeda");
	
	    //Cria os registros
	    dataset.addRow(new Array("x", "Selecione!","X"));
	    dataset.addRow(new Array("1", "01- DÓLAR AMERICANO - USD","US$"));
	    dataset.addRow(new Array("2", "02- EURO - EUR","\u20AC")); // o codigo do euro somente em ascii, senao retorna "?"
	    dataset.addRow(new Array("3", "03- LIBRA ESTERLINA - GBP","£"));
	    dataset.addRow(new Array("4", "04- DÓLAR CANADENSE - CAD","C$"));
	    dataset.addRow(new Array("5", "05- DÓLAR AUSTRALIANO - AUD","A$"));
	    dataset.addRow(new Array("6", "06- BOLIVAR FORTE - VENEZUELA - VEF","$"));
	    dataset.addRow(new Array("7", "07- BOLIVIANO - BOLÍVIA - BOB","Bs"));
	    dataset.addRow(new Array("8", "08- FRANCO SUÍCO - CHF","Fr"));
	    dataset.addRow(new Array("9", "09- GUARANI - PARAGUAI - PYG","$"));
	    dataset.addRow(new Array("10", "10- IENE - JPY","¥"));
	    dataset.addRow(new Array("11", "11- NOVO SOL - PERU - PEN","$"));
	    dataset.addRow(new Array("12", "12- PESO ARGENTINO - ARS","$"));
	    dataset.addRow(new Array("13", "13- PESO CHILENO - CLP","$"));
	    dataset.addRow(new Array("14", "14- PESO COLOMBIANO - COP","$"));
	    dataset.addRow(new Array("15", "15- PESO MEXICANO - MXN","$"));
	    dataset.addRow(new Array("16", "16- PESO URUGUAIO - UYU","$"));
	    dataset.addRow(new Array("17", "17- OUTRAS MOEDAS - -","-"));
	} // try 
	catch(error) {
		log.info (" ++ DATASET dsMoedaPagtoInternacional - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro", "erro", "erro")); 
	}

    return dataset;

}