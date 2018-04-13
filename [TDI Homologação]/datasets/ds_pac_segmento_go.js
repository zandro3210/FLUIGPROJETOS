function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("colleagueId");
    dataset.addColumn("nm_segmento");
    
    var colleagueId = null;
    
    if (constraints != null){
		for(var i=0;i<constraints.length;i++) {
			if (constraints[i].fieldName == "colleagueId"){
				colleagueId = constraints[i].initialValue;
			}
		}
	}


    //Cria a constraint para buscar os formularios ativos
    var cst = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
    var constraints = new Array(cst);
     
    var datasetPrincipal = DatasetFactory.getDataset("ds_bp_aprovadores_go", null, constraints, null);
    
    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
        var documentId = datasetPrincipal.getValue(i, "metadata#id");
        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");

        //Cria as constraints para buscar os campos filhos, passando o tablename, numero do formulario e versao
        var c1 = DatasetFactory.createConstraint("tablename", "aprovadores" ,"aprovadores", ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
        var c4 = DatasetFactory.createConstraint("cd_aprovador", colleagueId, colleagueId, ConstraintType.MUST);
        var constraintsFilhos = new Array(c1, c2, c3, c4);
        
        //Busca o dataset
        var datasetFilhos = DatasetFactory.getDataset("ds_bp_aprovadores_go", null, constraintsFilhos, null);
        
        if(datasetFilhos != null && datasetFilhos.rowsCount > 0) {
        
	        var constraintsSegmento = [];
	        
	        constraintsSegmento.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
	        
	        for (var j = 0; j < datasetFilhos.rowsCount; j++) {
	        	constraintsSegmento.push(DatasetFactory.createConstraint("nm_vertical", datasetFilhos.getValue(j, "nm_vertical"), datasetFilhos.getValue(j, "nm_vertical"), ConstraintType.SHOULD));
	        }
	        
	        var datasetSegmento = DatasetFactory.getDataset("ds_bp_segmentos", null, constraintsSegmento, null);
	        
	        for (var k = 0; k < datasetSegmento.rowsCount; k++) {
	            //Adiciona os valores nas colunas respectivamente.
	            dataset.addRow(new Array(
	                    colleagueId,
	                    datasetSegmento.getValue(k, "nm_segmento")
	                    ));
	        }
        }
    }
     
    return dataset;
}function onMobileSync(user) {

}