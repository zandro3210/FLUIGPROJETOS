function createDataset(fields, constraints, sortFields) {
     
    //Cria as colunas
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("nmSocio");
    dataset.addColumn("cpfSocio");

     
    //Cria a constraint para buscar os formulários ativos
    var cst = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
    var token = DatasetFactory.createConstraint("token", constraints, constraints, ConstraintType.MUST);
    
    var constraints = new Array(cst,token);
     
    var datasetPrincipal = DatasetFactory.getDataset("CanaisOnBoard2", null, constraints, null);
     
    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
        var documentId = datasetPrincipal.getValue(i, "metadata#id");
        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");
         
        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
        var c1 = DatasetFactory.createConstraint("tablename", "tableQuadroSocietario" ,"tableQuadroSocietario", ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
        var constraintsFilhos = new Array(c1, c2, c3);
 
        //Busca o dataset
        var datasetFilhos = DatasetFactory.getDataset("CanaisOnBoard2", null, constraintsFilhos, null);
 
        for (var j = 0; j < datasetFilhos.rowsCount; j++) {
            //Adiciona os valores nas colunas respectivamente.
            dataset.addRow(new Array(     
                    datasetFilhos.getValue(j, "nmSocio"),
                    datasetFilhos.getValue(j, "cpfSocio")));
        }
    }
     
    return dataset;
}