function defineStructure() {
	addColumn("CODIGO_UNIDADE");
	addColumn("CODIGO_ARQUITETO");
	addColumn("PRODUTO");
	addColumn("MODULO");
	addColumn("TIPO");
	addColumn("METADATA_ID");
	addColumn("VERSION");
	
	setKey(["PRODUTO","MODULO"]);
	setKey(["PRODUTO","MODULO","CODIGO_UNIDADE"]);
}
function onSync(lastSyncDate) {
	//Cria a estrutura de retorno
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("CODIGO_UNIDADE");
	dataset.addColumn("CODIGO_ARQUITETO");
	dataset.addColumn("PRODUTO");
	dataset.addColumn("MODULO");
	dataset.addColumn("TIPO");
	dataset.addColumn("METADATA_ID");
	dataset.addColumn("VERSION");
	
	var constraintEliminar = new Array();
	
	//Busca cadastro dos módulos
	var cActive = DatasetFactory.createConstraint("metadata#active",true,true,ConstraintType.MUST);
	var dsModulos = DatasetFactory.getDataset("dsModulosProdutos",null,[cActive],null);
	
	for(var i = 0 ; i < dsModulos.rowsCount ; i++){
		var PRODUTO = dsModulos.getValue(i,"produto");
		var MODULO = dsModulos.getValue(i,"MODULO");
		var METADATA_ID = dsModulos.getValue(i,"metadata#id");
		var VERSION = dsModulos.getValue(i,"version");
		
		var acao = verificaAcao(PRODUTO,MODULO,METADATA_ID,VERSION);
		
		if(acao == "atualizar"){
			var cProduto = DatasetFactory.createConstraint("PRODUTO",PRODUTO,PRODUTO,ConstraintType.MUST);
			var cModulo = DatasetFactory.createConstraint("MODULO",MODULO,MODULO,ConstraintType.MUST);
			var ds = DatasetFactory.getDataset("dsMatrizArquitetos",null,[cProduto,cModulo],null);
			
			for (var j = 0 ; j < ds.rowsCount ; j++){
				dataset.deleteRow(new Array(
									ds.getValue(j,"CODIGO_UNIDADE"),
									ds.getValue(j,"CODIGO_ARQUITETO"),
									ds.getValue(j,"PRODUTO"),
									ds.getValue(j,"MODULO"),
									ds.getValue(j,"TIPO"),
									ds.getValue(j,"METADATA_ID"),
									ds.getValue(j,"VERSION")));
			}
		}
		
		var cId = DatasetFactory.createConstraint("metadata#id",METADATA_ID,METADATA_ID,ConstraintType.MUST);
		var cVersion = DatasetFactory.createConstraint("version",VERSION,VERSION,ConstraintType.MUST);
		var cTablename = DatasetFactory.createConstraint("tablename","matriz","matriz",ConstraintType.MUST);
		var dsMatriz = DatasetFactory.getDataset("dsModulosProdutos",null,[cId,cVersion,cTablename],null);
		
		for(var j = 0 ; j < dsMatriz.rowsCount ; j++){
			
			var CODIGO_ARQUITETO = dsMatriz.getValue(j,"CODIGO_ARQUITETO");
			var CODIGO_UNIDADE = buscaUnidade(CODIGO_ARQUITETO);
			var TIPO = dsMatriz.getValue(j,"TIPO_SOLICITACAO");
			
			dataset.addOrUpdateRow(new Array(CODIGO_UNIDADE,CODIGO_ARQUITETO,PRODUTO,MODULO,TIPO,METADATA_ID,VERSION));
		}
		
		constraintEliminar.push(DatasetFactory.createConstraint("METADATA_ID",METADATA_ID,METADATA_ID,ConstraintType.MUST_NOT));
		
	}
	
	//Elimina registros que não estão mais na matriz
	var dsEliminar = DatasetFactory.getDataset("dsMatrizArquitetos",null,constraintEliminar,null);
	if(dsEliminar != null){
		for (var e = 0 ; e < dsEliminar.rowsCount ; e++){
			dataset.deleteRow(new Array(
					dsEliminar.getValue(e,"CODIGO_UNIDADE"),
					dsEliminar.getValue(e,"CODIGO_ARQUITETO"),
					dsEliminar.getValue(e,"PRODUTO"),
					dsEliminar.getValue(e,"MODULO"),
					dsEliminar.getValue(e,"TIPO"),
					dsEliminar.getValue(e,"METADATA_ID"),
					dsEliminar.getValue(e,"VERSION")));
		}
	}
	
	return dataset;
	
}
function createDataset(fields, constraints, sortFields) {

}function onMobileSync(user) {

}

function verificaAcao(PRODUTO,MODULO,METADATA_ID,VERSION){
	var cProduto = DatasetFactory.createConstraint("PRODUTO",PRODUTO,PRODUTO,ConstraintType.MUST);
	var cModulo = DatasetFactory.createConstraint("MODULO",MODULO,MODULO,ConstraintType.MUST);
	var ds = DatasetFactory.getDataset("dsMatrizArquitetos",null,[cProduto,cModulo],null);
	
	if(ds == null || ds.rowsCount < 1){
		return "incluir";
	}else if(METADATA_ID != ds.getValue(0,"metadata#id") || VERSION != ds.getValue(0,"version")){
		return "atualizar"
	}
}

function buscaUnidade(CODIGO_ARQUITETO){
	var cActive = DatasetFactory.createConstraint("metadata#active",true,true,ConstraintType.MUST);
	var cArquiteto = DatasetFactory.createConstraint("CODIGO",CODIGO_ARQUITETO,CODIGO_ARQUITETO,ConstraintType.MUST);
	var dsArquiteto = DatasetFactory.getDataset("dsArquitetos",null,[cActive,cArquiteto],null);
	
	if(dsArquiteto != null && dsArquiteto.rowsCount > 0){
		return dsArquiteto.getValue(0,"CODIGO_UNIDADE");
	}else{
		return "";
	}
}
