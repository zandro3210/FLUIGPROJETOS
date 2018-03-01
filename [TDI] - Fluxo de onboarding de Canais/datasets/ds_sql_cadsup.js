function createDataset(fields, constraints, sortFields) {
	var sql = 	"select	frmSup, motivo, SupCargo, SupChapa, SupCodeColigada, SupCodeCoordenador, SupCodeDiretor, SupCodeDirExecutivo, SupCodeGesExecutivo, SupCodeGestor, SupCodeVP, SupCodigo, SupEmail, SupFuncao, SupHierarquia, SupNome, SupNomeColigada from tdi_cadsup";
		
log.info("SQL " + sql);	
	var campos = new Array(sql);
	var dataset = DatasetFactory.getDataset("ds_sql", campos, null, null);
	return dataset;
}