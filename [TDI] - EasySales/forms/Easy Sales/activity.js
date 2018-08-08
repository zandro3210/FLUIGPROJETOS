var Activity = {
	ZERO: 0,
	INICIO: 1,
	PREENCHER_QUESTIONARIO: 83,
	MODIFICAR: 82,
	RELATORIO: 104,
	ENVIAR_DADOS_DO_QUESTIONARIO: 106,
	FIM: 72
}


var FormActivity = {
    getEasySales: function () {
		var dataset = DatasetFactory.getDataset("dsEasySalesParametrizacao", null, null, null);
		return dataset.values[0].SERVER_EASY;
	},
	getCRM: function(){
		var dataset = DatasetFactory.getDataset("dsEasySalesParametrizacao", null, null, null);
		return dataset.values[0].SERVER_CRM;		
	}

}
