function defineStructure() {
}

function onSync(lastSyncDate) {
}

function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
       
    dataset.addColumn("inicio");
    dataset.addColumn("fim");

	var createDate = function (date){
		var dateArray = date.split("/");
		var day = parseInt(dateArray[0]);
		var month = dateArray[1];
		month = month.indexOf("0") > -1 ? month.substring(1,2) : month;
		month = parseInt(month) - 1;
		return new Date(new Date().getFullYear(),month,day);
	}
	
	var cst = [];
	
	cst.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
     
	var datasetParam = DatasetFactory.getDataset("ds_bp_param_alteracao_plano", null, cst, null);
	
	if(datasetParam != null && datasetParam.rowsCount > 0){
		var metadataId = datasetParam.getValue(0, "metadata#id");
		var metadataVersion = datasetParam.getValue(0, "metadata#version");
		
		cst.push(DatasetFactory.createConstraint("metadata#id", metadataId, metadataId, ConstraintType.MUST));
		cst.push(DatasetFactory.createConstraint("metadata#version", metadataVersion, metadataVersion, ConstraintType.MUST));
		cst.push(DatasetFactory.createConstraint("tablename", "parametros", "parametros", ConstraintType.MUST));
		datasetParam = DatasetFactory.getDataset("ds_bp_param_alteracao_plano", null, cst, null);
		
		var dataAtual = new Date();
		dataAtual = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate());
		var sufixoAno =  "/" + dataAtual.getFullYear();
		
		if(datasetParam != null && datasetParam.rowsCount > 0){
			for(var i = 0; i < datasetParam.rowsCount; i++){
				var dataInicio = createDate(datasetParam.getValue(i, "dt_inicio_sistema"));
				var dataFim = createDate(datasetParam.getValue(i, "dt_fim_sistema"));
				
				if (dataAtual >= dataInicio && dataAtual <= dataFim){
					dataset.addRow([datasetParam.getValue(i, "mes_inicio_sistema") + sufixoAno, datasetParam.getValue(i, "mes_fim_sistema") + sufixoAno]);
					break;
				}
			}
		}
	}
	
    return dataset;
}
function onMobileSync(user) {
}

