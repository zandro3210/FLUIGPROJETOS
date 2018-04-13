function createDataset(fields, constraints, sortFields) {
	
	// Cria o dataset
	var newDataset = DatasetBuilder.newDataset();
    newDataset.addColumn("PARTICIPANTE");
    newDataset.addColumn("NOME_CCUSTO");
    newDataset.addColumn("CODCCUSTO");
    newDataset.addColumn("ITEM_CONTABIL");
    newDataset.addColumn("CLASSE_VALOR");
    newDataset.addColumn("GESTOR");
    	
	// Conecta o servico e busca os participantes
	var periodicService = ServiceManager.getService('TransfRHParticipantes');
	
	var serviceHelper = periodicService.getBean();
	var serviceLocator =
	serviceHelper.instantiate('org.tempuri.ServiceLocator');
	var service = serviceLocator.getServiceSoap();
	
var email = "jucane.medeiros@totvs.com.br";

if (fields != null) {
    email = fields[0];
}

	// Invoca o servico
	try {

        var retorno = service.obterDadosChefia("", email);

		var DocumentElement = new XML(retorno);

		for each(elemento in DocumentElement.Chefe) { 
			newDataset.addRow(new Array(elemento.PARTICIPANTE.toString(),elemento.NOME_CCUSTO.toString(),elemento.CODCCUSTO.toString(),elemento.ITEM_CONTABIL.toString(), elemento.CLASSE_VALOR.toString(),elemento.GESTOR.toString()));			
		}
	} catch(error) { newDataset.addRow(new Array(error.message, "erro", "erro", "erro","erro","erro")); }
	return newDataset;
}