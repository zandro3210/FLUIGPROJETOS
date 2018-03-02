function createDataset(fields, constraints, sortFields) {
//	var sql = "SELECT * FROM GAME_COLLABORATOR_TAG_EVENT LIMIT 100 ";
	var sql = "SELECT * FROM GAME_COLLABORATOR_TAG_EVENT GCTE, GAME_COLLABORATOR GC";
	sql += " WHERE GCTE.COLLABORATOR_ID = GC.COLLABORATOR_ID LIMIT 100 ";
	
	return DatasetFactory.getDataset("ds_sql", new Array(sql), null, null);
}