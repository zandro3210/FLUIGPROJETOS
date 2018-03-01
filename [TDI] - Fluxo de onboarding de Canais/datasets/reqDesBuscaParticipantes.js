function createDataset(fields, constraints, sortFields) {	// Cria o dataset	var newDataset = DatasetBuilder.newDataset();	newDataset.addColumn("Coligada");	newDataset.addColumn("Filial");	newDataset.addColumn("Chapa");	newDataset.addColumn("Codigo");	newDataset.addColumn("Nome");	newDataset.addColumn("Secao");	newDataset.addColumn("CC");	newDataset.addColumn("Item");	newDataset.addColumn("Classe");	newDataset.addColumn("Email");	newDataset.addColumn("DtAdmissao");	newDataset.addColumn("CIPA");	newDataset.addColumn("CPF");	newDataset.addColumn("emailGestor");	newDataset.addColumn("nomeSecao");	newDataset.addColumn("nomeFuncao");	newDataset.addColumn("nomeCC");	newDataset.addColumn("nomeItem");	newDataset.addColumn("nomeClasse");	newDataset.addColumn("nomeColigada");	newDataset.addColumn("nomeFilial");	newDataset.addColumn("coligadaSuperior");	newDataset.addColumn("chapaSuperior");	newDataset.addColumn("unidade");	// Conecta o servico e busca os participantes	var periodicService = ServiceManager.getService('wsRequisicaoDesligamento');	var serviceHelper  	= periodicService.getBean();	var serviceLocator 	= serviceHelper.instantiate('br.com.totvs.www.br.WsGlbSSLLocator');	var service         = serviceLocator.getwsGlbSSLSoap();	// Invoca o servico	try {			var retorno = service.getResultSQL(fields[0],fields[1],0,fields[3],fields[4],fields[5],false);				var DocumentElement = new XML(retorno);				for each(elemento in DocumentElement.Row) { 					newDataset.addRow(new Array(										elemento.CODCOLIGADA.toString(),										elemento.CODFILIAL.toString(),										elemento.CHAPA.toString(), 										elemento.COD_FUNCAO.toString(),										elemento.NOME.toString(),										elemento.COD_SECAO.toString(),										elemento.CODCCUSTO.toString(),										elemento.ITEM.toString(),										elemento.CLASSE.toString(),										elemento.EMAIL.toString(),										elemento.DATAADMISSAO.toString(),										elemento.MEMBROCIPA.toString(),										elemento.CPF.toString(),										elemento.EMAIL_GEST.toString(),										elemento.NOME_SECAO.toString(),										elemento.NOME_FUNCAO.toString(),										elemento.NOME_CCUSTO.toString(),										elemento.DESCRICAO_ITEM.toString(),										elemento.DESCRICAO_CLASSE.toString(),										elemento.NOME_COLIGADA.toString(),										elemento.NOME_FILIAL.toString(),                                        elemento.COLIGADA_CHEFE.toString(),                                        elemento.CHAPA_CHEFE.toString(),										elemento.UNIDADE.toString()));		}	} 	catch(error) { 		newDataset.addRow(new Array(error.message, "erro", "erro", "erro","erro")); 	}	return newDataset;}