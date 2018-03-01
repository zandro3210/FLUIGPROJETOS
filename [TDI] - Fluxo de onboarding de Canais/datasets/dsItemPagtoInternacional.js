 function createDataset(fields, constraints, sortFields) {

	 // servico FLUIG
	 try{
		
		 var dataset = DatasetBuilder.newDataset();
       
	    //Cria as colunas
	    dataset.addColumn("item");
	    dataset.addColumn("descricao");
	    
		dataset.addRow(new Array("x", "Selecione!"));
	    dataset.addRow(new Array("01", "01- CURSOS E TREINAMENTO	0101020"));
	    dataset.addRow(new Array("02", "02- BOLSA DE ESTUDO	0101021"));
	    dataset.addRow(new Array("03", "03- BOLSA DE IDIOMAS	0101022"));
	    dataset.addRow(new Array("04", "04- PREVIDENCIA PRIVADA	0101023"));
	    dataset.addRow(new Array("05", "05- SERVICOS DE PROCESSAMENTO DE D	0102001"));
	    dataset.addRow(new Array("06", "06- CONSULTORIA	0102002"));
	    dataset.addRow(new Array("07", "07- HONORARIOS ADVOCATICIOS	0102003"));
	    dataset.addRow(new Array("08", "08- AUDITORIA	0102004"));
	    dataset.addRow(new Array("09", "09- SEGURANCA E VIGILANCIA	0102005"));
	    dataset.addRow(new Array("10", "10 - SERVICO DE LIMPEZA E HIGIENE	0102006"));
	    dataset.addRow(new Array("11", "11 - SERVICOS CONTABEIS	0102007"));
	    dataset.addRow(new Array("12", "12 - MARCAS E PATENTES	0102008"));
	    dataset.addRow(new Array("13", "13 - BANCO DE DADOS	0102009"));
	    dataset.addRow(new Array("14", "14 - INFORMACOES COMERCIAIS	0102010"));
	    dataset.addRow(new Array("15", "15 - PARCEIROS DE SERVICOS	0102011"));
	    dataset.addRow(new Array("16", "16 - MATERIAL DE REVENDA	0102013"));
	    dataset.addRow(new Array("17", "17 - SERVICOS DE ARQUIVO	0102014"));
	    dataset.addRow(new Array("18", "18 - SI- COMISSAO HORAS	0102016"));
	    dataset.addRow(new Array("19", "19 - OUTROS SERVICOS DE TERCEIROS	0102017"));
	    dataset.addRow(new Array("20", "20 - LOCOMOCAO	0104001"));
	    dataset.addRow(new Array("21", "21 - HOSPEDAGEM NAO REEMBOLSAVEL	0104002"));
	    dataset.addRow(new Array("22", "22 - HOSPEDAGEM  REEMBOLSAVEL	0104003"));
	    dataset.addRow(new Array("23", "23 - PASSAGENS NAO REEMBOLSAVEL	0104004"));
	    dataset.addRow(new Array("24", "24 - PASSAGENS REEMBOLSAVEL	0104005"));
	    dataset.addRow(new Array("25", "25 - TELEFONE	0104006"));
	    dataset.addRow(new Array("26", "26 - REFEICAO	0104007"));
	    dataset.addRow(new Array("27", "27 - ADTO VIAGEM NAO REEMBOLSAVEL	0104008"));
	    dataset.addRow(new Array("28", "28 - ADTO VIAGEM REEMBOLSAVEL	0104009"));
	    dataset.addRow(new Array("29", "29 - OUTRAS DESPESAS DE VIAGEM	0104010"));
	    dataset.addRow(new Array("30", "30 - ADIANTAMENTO A FORNECEDOR	0104011"));
	    dataset.addRow(new Array("31", "31 - COMPRA DE MOEDA ESTRANGEIRA	0104012"));
	    dataset.addRow(new Array("32", "32 - CARTOES COORPORATIVOS	0104013"));
	    dataset.addRow(new Array("33", "33 - CAUCAO	0104014"));
	    dataset.addRow(new Array("34", "34 - CARTAO SAQUE ITAU	0104015"));
	    dataset.addRow(new Array("35", "35 - MANUTENCAO E REPAROS DE EQUIPA	0105002"));
	    dataset.addRow(new Array("36", "36 - SEGUROS DE EQUIPAMENTOS	0105003"));
	    dataset.addRow(new Array("37", "37 - AQUIS. DE EQUIP. E/OU SOFTWARE	0105004"));
	    dataset.addRow(new Array("38", "38 - AQU.SOFT/CUSTO TX LICENC-PA AU	0105005"));
	    dataset.addRow(new Array("39", "39 - LEASING	0105006"));
	    dataset.addRow(new Array("40", "40 - AQUISICAO DE NOVAS EMPRESAS	0105007"));
	    dataset.addRow(new Array("41", "41 - AGUA E ESGOTO	0106006"));
	    dataset.addRow(new Array("42", "42 - ENERGIA ELETRICA	0106007"));
	    dataset.addRow(new Array("43", "43 - TELEFONIA FIXA	0109001"));
	    dataset.addRow(new Array("44", "44 - TELEFONIA MOVEL	0109002"));
	    dataset.addRow(new Array("45", "45 - INTERNET - LINK	0109003"));
	    dataset.addRow(new Array("46", "46 - MANUTENCAO EQUIPAMENTOS DE COM	0109004"));
	    dataset.addRow(new Array("47", "47 - GENERICO IMPORT DATASUL	0109999"));
	    dataset.addRow(new Array("48", "48 - CORREIO E MALOTE	0112001"));
	    dataset.addRow(new Array("49", "49 - FRETES, CARRETOS E MOTOBOY	0112002"));
	    dataset.addRow(new Array("50", "50 - CONTRIBUICOES E DOACOES	0112003"));
	    dataset.addRow(new Array("51", "51 - ASSINATURA JORNAIS/REVISTAS/PE	0112005"));
	    dataset.addRow(new Array("52", "52 - MENSALIDADE E ANUIDADE DE ENTI	0112006"));
	    dataset.addRow(new Array("53", "53 - DESPESAS LEGAIS (DISTRATRO)	0112007"));
	    dataset.addRow(new Array("54", "54 - OUTRAS DESPESAS	0112008"));
	    dataset.addRow(new Array("55", "55 - CAIXA SUPRIMENTOS	0112009"));
	    dataset.addRow(new Array("56", "56 - GASTOS NOTARIALES	0112010"));
	    dataset.addRow(new Array("57", "57 - TAXAS	0112011"));
	    dataset.addRow(new Array("58", "58 - INCENTIVO FISCAL - ISS	0112012"));
	    dataset.addRow(new Array("59", "59 - MATERIAL PROMOCIONAL	0113001"));
	    dataset.addRow(new Array("60", "60 - FOLHETOS E PROSPECTOS	0113002"));
	    dataset.addRow(new Array("61", "61 - VEICULACOES E ANUNCIOS	0113003"));
	    dataset.addRow(new Array("62", "62 - OUTRAS DESPESAS DE PROPAGANDA	0113004"));
	    dataset.addRow(new Array("63", "63 - LOCACAO	0114001"));
	    dataset.addRow(new Array("64", "64 - MONTAGEM	0114002"));
	    dataset.addRow(new Array("65", "65 - OUTRAS DESPESAS COM EVENTOS	0114004"));
	    dataset.addRow(new Array("66", "66 - DESPESA ANTECIPADA- S/RECIBO	0114005"));
	    dataset.addRow(new Array("67", "67 - COMISSÃO (royalties)	0.115500"));
	    
	    /* antigo
	    //Cria os registros
	    dataset.addRow(new Array("x", "Selecione!"));
	    dataset.addRow(new Array("01", "01- ALUGUEL DE EQUIPAMENTOS - Cod 0.105001"));
	    dataset.addRow(new Array("02", "02- ALUGUEL DE IMOVEIS - Cod 0.106001"));
	    dataset.addRow(new Array("03", "03- AQUISICAO DE EQUIPAMENTOS - Cod 0.105004"));
	    dataset.addRow(new Array("04", "04- AQUISICAO DE SOFTWARE - Cod 0.105005"));
	    dataset.addRow(new Array("05", "05- ASSINATURA JORNAIS/REVISTAS/PERIÓDICOS - Cod 0.112005"));
	    dataset.addRow(new Array("06", "06- AUDITORIA - Cod 0.102004"));
	    dataset.addRow(new Array("07", "07- BANCO DE DADOS - Cod 0.102009"));
	    dataset.addRow(new Array("08", "08- CONSULTORIA - Cod 0.102002"));
	    dataset.addRow(new Array("09", "09- DESPESAS LEGAIS - Cod 0.112007"));
	    dataset.addRow(new Array("10", "10 - FOLHETOS E PROSPECTOS - Cod 0.113002"));
	    dataset.addRow(new Array("11", "11 - HONORARIOS ADVOCATICIOS - Cod 0.102003"));
	    dataset.addRow(new Array("12", "12 - IMPOSTO DE RENDA - Cod 0.110005"));
	    dataset.addRow(new Array("13", "13 - INFORMACOES COMERCIAIS - Cod 0.102010"));
	    dataset.addRow(new Array("14", "14 - INTERNET - LINK - Cod 0.109003"));
	    dataset.addRow(new Array("15", "15 - IOF A PAGAR - Cod 0.110104"));
	    dataset.addRow(new Array("16", "16 - MANUTENCAO E REPAROS DE EQUIPAMENTOS - Cod 0.105002"));
	    dataset.addRow(new Array("17", "17 - MANUTENCAO EQUIPAMENTOS DE COMUNICAÇÃO - Cod 0.109004"));
	    dataset.addRow(new Array("18", "18 - MARCAS E PATENTES - Cod 0.102008"));
	    dataset.addRow(new Array("19", "19 - MATERIAL DE REVENDA - Cod 0.102013"));
	    dataset.addRow(new Array("20", "20 - MATERIAL PROMOCIONAL - Cod 0.113001"));
	    dataset.addRow(new Array("21", "21 - SEGUROS DE EQUIPAMENTOS - cod 0.105003"));
	    dataset.addRow(new Array("22", "22 - SERVICOS CONTABEIS - Cod 0.102007"));
	    dataset.addRow(new Array("23", "23 - SERVICOS DE ARQUIVO - Cod 0.102014"));
	    dataset.addRow(new Array("24", "24 - SERVICOS DE PROCESSAMENTO DE DADOS - Cod 0.102001"));
	    dataset.addRow(new Array("25", "25 - TELEFONIA FIXA - Cod 0.109001"));
	    dataset.addRow(new Array("26", "26 - TELEFONIA MOVEL - Cod 0.109002"));
	    dataset.addRow(new Array("27", "27 - VEICULACOES E ANUNCIOS - Cod 0.113003"));
	    dataset.addRow(new Array("28", "28 - OUTRAS DESPESAS DE PROPAGANDA - Cod 0.113004"));
	    dataset.addRow(new Array("29", "29 - OUTROS SERVICO TERCEIROS - Cod 0.102011"));
	    dataset.addRow(new Array("30", "30 - OUTROS TIPOS DE PAGAMENTOS"));
	    */
	    
	} // try 
	catch(error) {
		log.info (" ++ DATASET dsItemPagtoInternacional - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro", "erro")); 
	}
		    
    return dataset;
}
