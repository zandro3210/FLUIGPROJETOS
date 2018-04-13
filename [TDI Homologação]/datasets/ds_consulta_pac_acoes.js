function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("descricao");
    dataset.addColumn("ind_performance");


    //Cria a constraint para buscar os formularios ativos
    var cst = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
    var constraints = new Array(cst);

    var datasetPrincipal = DatasetFactory.getDataset("ds_pac_acoes", null, constraints, null);

    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
        var documentId = datasetPrincipal.getValue(i, "metadata#id");
        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");

        //Cria as constraints para buscar os campos filhos, passando o tablename, numero do formulario e versao
        var c1 = DatasetFactory.createConstraint("tablename", "acoes" ,"acoes", ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
        var constraintsFilhos = new Array(c1, c2, c3);

        //Busca o dataset
        var datasetFilhos = DatasetFactory.getDataset("ds_pac_acoes", null, constraintsFilhos, null);

        for (var j = 0; j < datasetFilhos.rowsCount; j++) {
            //Adiciona os valores nas colunas respectivamente.
            dataset.addRow(new Array(
                    datasetFilhos.getValue(j, "descricao"),
                    datasetFilhos.getValue(j, "ind_performance")
                    ));
        }
    }

    return dataset;
}
function onMobileSync(user) {

}
