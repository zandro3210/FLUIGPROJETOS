function createDataset(fields, constraints, sortFields) {
	//Cria dataset de retorno
	var dsRetorno = DatasetBuilder.newDataset();
	
	try{
		//Adiciona colunas
		dsRetorno.addColumn("codUsuario");
		dsRetorno.addColumn("senha");
				
		//Preenche dataset com os registros
		dsRetorno.addRow(['integr_protheus', 'protheus@rm2013']);
		
		return dsRetorno;		
	} catch (exception){
		dsRetorno.addColumn('erro');
		dsRetorno.addRow([exception.message + ' (' + exception.lineNumber + ')']);
		return dsRetorno;
	}
}