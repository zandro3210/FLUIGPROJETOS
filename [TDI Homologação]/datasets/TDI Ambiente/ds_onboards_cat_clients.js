function createDataset(fields, constraints, sortFields) {
	 
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("NumFormulario");
    dataset.addColumn("codigo");
    dataset.addColumn("nome");
    dataset.addColumn("cnpj");
    dataset.addColumn("receita");
    dataset.addColumn("nps");
    
    //Cria a constraint para buscar os formulários ativos
    var cst = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
    var constraints = new Array(cst,constraints[0]);
     
    var datasetPrincipal = DatasetFactory.getDataset("formcanaisOnBoard", null, constraints, null);
     
    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
        var documentId = datasetPrincipal.getValue(i, "metadata#id");
        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");
         
        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
        var c1 = DatasetFactory.createConstraint("tablename", "tblClientes" ,"tblClientes", ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
        var constraintsFilhos = new Array(c1, c2, c3);
 
        //Busca o dataset
        var datasetFilhos = DatasetFactory.getDataset("formcanaisOnBoard", null, constraintsFilhos, null);
 
        for (var j = 0; j < datasetFilhos.rowsCount; j++) {
            //Adiciona os valores nas colunas respectivamente.
            dataset.addRow(new Array(
                    documentId,
                    datasetFilhos.getValue(j, "tblCodCliente"), 
                    datasetFilhos.getValue(j, "tblNomeCliente"),
                    datasetFilhos.getValue(j, "tblCnpjCliente"), 
                    datasetFilhos.getValue(j, "tblReceitaAnualCliente"), 
                    datasetFilhos.getValue(j, "tblNpsCliente")));
        }
    }
     
    return dataset;
}