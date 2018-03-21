function createDataset(fields, constraints, sortFields) {

	// dsContasUnidadesGestContratoJur.js
	
	
	log.info (" ++ DATASET dsContasUnidadesGestContratoJur.js - INICIO");

	try{
		var dataset = DatasetBuilder.newDataset();
	    
		log.info (" ++ DATASET dsContasUnidadesGestContratoJur.js - PTO 1");
		
	    //Cria as colunas
	    dataset.addColumn("Unidade");
	    dataset.addColumn("CNPJ");
	    dataset.addColumn("Banco");
	    dataset.addColumn("Agencia");
	    dataset.addColumn("Conta");
	
	    log.info (" ++ DATASET dsContasUnidadesGestContratoJur.js - PTO 2");
	
	    var cnpjUnidade = "";
		// para testar comente este if e descomente um dos emails abaixo
		// usado no formulario - campo de nome do banco - busca em partes
		if (fields) {
			if (fields[0] != null){
				cnpjUnidade = fields[0]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
			}
		}

		//teste
		//cnpjUnidade = "53113791000122";
		
		 log.info (" ++ DATASET dsContasUnidadesGestContratoJur.js - PTO 1.5 - cnpj: " + cnpjUnidade);
		 
		 if (cnpjUnidade == "53.113.791/0001-22"){
			 dataset.addRow(new Array("TOTVS S.A. - MATRIZ", "53.113.791/0001-22", "Itaú", "1024", "27005-8"));	 
		 }
		 else if (cnpjUnidade == "02.497.398/0001-49"){
			 dataset.addRow(new Array("TOTVS RIO SOFTWARE LTDA. ", "02.497.398/0001-49", "Itaú", "1024", "30100-2"));
		 }
		 else if (cnpjUnidade == "09.131.273/0001-40"){
			dataset.addRow(new Array("TQTVD SOFTWARE LTDA. ", "09.131.273/0001-40", "Itaú", "1024", "49829-5"));
		 }
		 else if (cnpjUnidade == "53.113.791/0017-90"){
			dataset.addRow(new Array("TOTVS S.A. - FILIAL JOINVILLE (DATASUL)	", "53.113.791/0017-90", "Itaú", "1295", "07280-3"));
		 }
		 else if (cnpjUnidade == "07.577.599/0001-70"){
			dataset.addRow(new Array("TOTVS BRASILIA SOFTWARE LTDA.", "07.577.599/0001-70", "Itaú", "1024", "44549-4"));
		 }
		 else if (cnpjUnidade == "22.003.149/0001-67"){
			dataset.addRow(new Array("PC INFORMATICA S.A.", "22.003.149/0001-67", "Itaú", "0656", "50923-9"));
		 }
		 else if (cnpjUnidade == "07.363.764/0001-90"){
			dataset.addRow(new Array("TOTVS NORDESTE SOFTWARE LTDA.	", "07.363.764/0001-90", "Itaú", "1024", "43821-8"));
		 }
		 else if (cnpjUnidade == "53.113.791/0010-13"){
			dataset.addRow(new Array("TOTVS S.A. - FILIAL ALPHAVILLE	", "53.113.791/0010-13", "Itaú", "1024", "58663-6"));	 
		 }
		 else if (cnpjUnidade == "53.113.791/0008-07"){
			dataset.addRow(new Array("TOTVS S.A. - FILIAL RIO	", "53.113.791/0008-07", "Itaú", "1024", "01345-8"));
		 }
		 else if (cnpjUnidade == "53.113.791/0011-02"){
			 dataset.addRow(new Array("TOTVS S.A. - FILIAL POA	", "53.113.791/0011-02", "Itaú", "1024", "01341-7"));
		 }
		 else if (cnpjUnidade == "53.113.791/0012-85"){
			 dataset.addRow(new Array("TOTVS S.A. - FILIAL BH	", "53.113.791/0012-85", "Itaú", "1024", "52109-6"));
		 }
		 else if (cnpjUnidade == "53.113.791/0006-37"){
			 dataset.addRow(new Array("TOTVS S.A. - FILIAN JOINVILLE (LOGOCENTER)", "53.113.791/0006-37", "Itaú", "1024", "45045-2"));
		 }
		 else if (cnpjUnidade ==  "53.113.791/0019-51"){
			 dataset.addRow(new Array("TOTVS S.A. - FILIAL CAMPINAS	", "53.113.791/0019-51", "Itaú", "1024", "01606-3"));
		 }
		 else if (cnpjUnidade == "15.760.400/0001-72"){
			 dataset.addRow(new Array("TOTVS VENTURES PARTICIPAÇÕES LTDA.", "15.760.400/0001-72", "Itaú", "1024", "03483-5"));		
		 }
		 else if (cnpjUnidade == "53.113.791/0023-38" ){
			 dataset.addRow(new Array("TOTVS S.A. - FILIAL MACAÉ", "53.113.791/0023-38", "Itaú", "1024", "03842-2"));
		 }
		 else if (cnpjUnidade == "05.320.808/0001-70" ){
			 dataset.addRow(new Array("RMS SOFTWARE S.A.", "05.320.808/0001-70", "Itaú", "1145", "19396-5"));
		 }
		 else if (cnpjUnidade == "09.106.380/0001-18"){
			 dataset.addRow(new Array("P2RX SOLUÇÕES EM SOFTWARE S.A.", "09.106.380/0001-18", "ITAÚ", "0143", "01611-1"));
		 }
		 else if (cnpjUnidade == "20.121.772/0001-99"){
			 dataset.addRow(new Array("TOTVS RESULTADOS EM OUTSOURCING LTDA.", "20.121.772/0001-99", "ITAÚ", "1024", "04878-5"));
		 }
		 else if (cnpjUnidade == "53.113.791/0026-80"){
			 dataset.addRow(new Array("TOTVS S.A. - FILIAL CAXIAS DO SUL", "53.113.791/0026-80", "ITAÚ", "1024", "05594-7"));
		 }
		 else if (cnpjUnidade == "53.113.791/0025-08"){
			 dataset.addRow(new Array("TOTVS S.A. - FILIAL SOROCABA", "53.113.791/0025-08", "ITAÚ", "1024", "05678-8"));
		 }
		 else if (cnpjUnidade == "04.364.470/0001-95"){
			 dataset.addRow(new Array("CIASHOP - SOLUÇÕES PARA COMÉRCIO ELETRÔNICO S.A.", "04.364.470/0001-95", "BRADESCO", "3096", "0000396-4"));
		 }
		 else {
			 dataset.addRow(new Array("Unidade sem CNPJ", "", "", "", ""));
		 }
		
		log.info (" ++ DATASET dsContasUnidadesGestContratoJur - PTO 3");
    
	} // try 
	catch(error) {
		log.info (" ++ DATASET dsContasUnidadesGestContratoJur - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro", error.message, "erro", "erro", "erro")); 
	}

	log.info (" ++ DATASET dsContasUnidadesGestContratoJur - FIM");
	
    return dataset;

}
	
	//REGRA DE NEGOCIO - TEXTO E-MAIL KAREN:

	/*
	 
1 TOTVS S.A. - MATRIZ	
53.113.791/0001-22	
Banco 	Itaú
Agência	1024
Conta	27005-8
	
2 TOTVS RIO SOFTWARE LTDA.  	
02.497.398/0001-49	
Banco 	Itaú
Agência	1024
Conta	30100-2
	
3 TQTVD SOFTWARE LTDA. 	
09.131.273/0001-40	
Banco 	Itaú
Agência	1024
Conta	49829-5
	
4 TOTVS S.A. - FILIAL JOINVILLE (DATASUL)	
53.113.791/0017-90	
Banco 	Itaú
Agência	1295
Conta	07280-3
	
5 TOTVS BRASILIA SOFTWARE LTDA. 	
07.577.599/0001-70	
Banco 	Itaú
Agência	1024
Conta	44549-4
	
6 PC INFORMATICA S.A.	
22.003.149/0001-67	
Banco 	Itaú
Agência	0656
Conta	50923-9
	
7 TOTVS NORDESTE SOFTWARE LTDA.	
07.363.764/0001-90	
Banco 	Itaú
Agência	1024
Conta	43821-8
	
8 TOTVS S.A. - FILIAL ALPHAVILLE	
53.113.791/0010-13	
Banco 	Itaú
Agência	1024
Conta	58663-6
	
9 TOTVS S.A. - FILIAL RIO	
53.113.791/0008-07	
Banco 	Itaú
Agência	1024
Conta	01345-8
	
10 TOTVS S.A. - FILIAL POA	
53.113.791/0011-02	
Banco 	Itaú
Agência	1024
Conta	01341-7
	
11 TOTVS S.A. - FILIAL BH	
53.113.791/0012-85	
Banco 	Itaú
Agência	1024
Conta	52109-6
	
12 TOTVS S.A. - FILIAN JOINVILLE (LOGOCENTER)	
53.113.791/0006-37	
Banco 	Itaú
Agência	1024
Conta	45045-2
	
13 TOTVS S.A. - FILIAL CAMPINAS	
53.113.791/0019-51	
Banco 	Itaú
Agência	1024
Conta	01606-3
	
14 TOTVS VENTURES PARTICIPAÇÕES LTDA. 	
15.760.400/0001-72	
Banco 	Itaú
Agência	1024
Conta	03483-5
	
15 TOTVS S.A. - FILIAL MACAÉ	
53.113.791/0023-38	
Banco 	Itaú
Agência	1024
Conta	03842-2
	
16 RMS SOFTWARE S.A.	
05.320.808/0001-70	
Banco 	Itaú
Agência	1145
Conta	19396-5
	
17 P2RX SOLUÇÕES EM SOFTWARE S.A.	
09.106.380/0001-18	
Banco 	ITAÚ
Agência	0143
Conta	01611-1
	
18 TOTVS RESULTADOS EM OUTSOURCING LTDA. 	
20.121.772/0001-99	
Banco 	ITAÚ
Agência	1024
Conta	04878-5
	
19 TOTVS S.A. - FILIAL CAXIAS DO SUL	
53.113.791/0026-80	
Banco 	ITAÚ
Agência	1024
Conta	05594-7
	
20 TOTVS S.A. - FILIAL SOROCABA	
53.113.791/0025-08	
Banco 	ITAÚ
Agência	1024
Conta	05678-8
	
21 CIASHOP - SOLUÇÕES PARA COMÉRCIO ELETRÔNICO S.A. 	
04.364.470/0001-95	
Banco 	BRADESCO
Agência	3096
Conta	0000396-4
	 */
	
