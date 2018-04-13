function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {


    log.info("@dsCanaisTableFilhos fields[0]:'" + fields[0].toString()+ "'");

    var fields = JSON.parse(fields[0].toString());
    log.info("@dsCanaisTableFilhos Objeto instanciado");
    //Cria as colunas
    var dataset = DatasetBuilder.newDataset();
    var constraint = new Array();
   // {"colunas":["tablecriacaoCordescricao","tablecriacaoCoridzendesk","tablecriacaoCorvaluezendesk"],"dataset":"dscanaisOnboardParametrizacao","tabela":"tablecriacaoCor","where":[]}
    for (i = 0; i < fields.colunas.length; i++) { 
        log.info("@dsCanaisTableFilhos fields.colunas[i]:" +fields.colunas[i]);
        dataset.addColumn(fields.colunas[i]);
    }
    for (i = 0; i < fields.where.length; i++) { 
        log.info("@dsCanaisTableFilhos where[i].name:" +fields.where[i].name);
        log.info("@dsCanaisTableFilhos where[i].value1:" +fields.where[i].value1);
        log.info("@dsCanaisTableFilhos where[i].value2:" +fields.where[i].value2);
        constraint.push(DatasetFactory.createConstraint(fields.where[i].name, fields.where[i].value1, fields.where[i].value2, ConstraintType.MUST));
    }

   
    //Cria a constraint para buscar os formulários ativos
    var cst = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
    log.info("@dsCanaisTableFilhos fields.dataset:" + fields.dataset);
    log.info("@dsCanaisTableFilhos fields.tabela:" + fields.tabela);
    
    constraint.push(cst);

     
    var datasetPrincipal = DatasetFactory.getDataset(fields.dataset, null, constraint, null);
     
    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
        var documentId = datasetPrincipal.getValue(i, "metadata#id");
        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");
         
        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
        var c1 = DatasetFactory.createConstraint("tablename", fields.tabela ,fields.tabela, ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
        var constraintsFilhos = new Array(c1, c2, c3);
 
        //Busca o dataset
        var datasetFilhos = DatasetFactory.getDataset(fields.dataset, null, constraintsFilhos, null);
 
        for (var j = 0; j < datasetFilhos.rowsCount; j++) {
            //Adiciona os valores nas colunas respectivamente.

            var row = new Array();
            for (i = 0; i < fields.colunas.length; i++) { 
                log.info("@dsCanaisTableFilhos colunas[i]:" + fields.colunas[i] + "  value:" + datasetFilhos.getValue(j,fields.colunas[i]));
                row.push(datasetFilhos.getValue(j,fields.colunas[i]));
            }
           
            dataset.addRow(row);
        }
    }
     
    return dataset;
}function onMobileSync(user) {

}