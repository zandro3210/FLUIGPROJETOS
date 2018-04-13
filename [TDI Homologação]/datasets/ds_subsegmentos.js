function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("idSegmento");
	dataset.addColumn("nmSubsegmento");
	dataset.addColumn("link_eliminar");
	dataset.addColumn("link_zoom");
	dataset.addColumn("codImageFun");
	dataset.addColumn("codImagem");
	dataset.addColumn("btCross");
	
	var btCross = null;
	
	if (constraints != null) {
		for(var i in constraints) {
			if(constraints[i].fieldName == "btCross"){
				btCross = constraints[i].initialValue;
			}			
		}
	}
	
	var cActive = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var constraintsSegmento = [];
	
	constraintsSegmento.push(cActive);
	
	if(btCross != null){
		var ct = btCross == true ? ConstraintType.MUST : ConstraintType.MUST_NOT;
		constraintsSegmento.push(DatasetFactory.createConstraint("btCross", "Sim", "Sim", ct));
	}
	
	var datasetSegmento = DatasetFactory.getDataset("Segmentos", null, constraintsSegmento, ["nmSegmento"]);
	
	if(datasetSegmento != null && datasetSegmento.rowsCount > 0){
		for(var i =0; i < datasetSegmento.rowsCount; i++){
			var nmSegmento = datasetSegmento.getValue(i, "nmSegmento");
			var constraintsSubsegmentos = [];
			
			constraintsSubsegmentos.push(cActive);
			constraintsSubsegmentos.push(DatasetFactory.createConstraint("idSegmento", nmSegmento, nmSegmento, ConstraintType.MUST));
			
			var datasetSubsegmento = DatasetFactory.getDataset("Subsegmentos",null,constraintsSubsegmentos,["nmSubsegmento"]);
			
			if(datasetSubsegmento != null && datasetSubsegmento.rowsCount > 0){
				for(var j = 0; j < datasetSubsegmento.rowsCount; j++){
					dataset.addRow([
					                nmSegmento,
					                datasetSubsegmento.getValue(j,"nmSubsegmento"),
					                datasetSubsegmento.getValue(j,"link_eliminar"),
					                datasetSubsegmento.getValue(j,"link_zoom"),
					                datasetSegmento.getValue(i,"codImageFun"),
					                datasetSegmento.getValue(i,"codImagem"),
					                datasetSegmento.getValue(i,"btCross") == "Sim"
					                ]);
				}
			}else {
				dataset.addRow([
				                nmSegmento,
				                "",
				                "",
				                "",
				                datasetSegmento.getValue(i,"codImageFun"),
				                datasetSegmento.getValue(i,"codImagem"),
				                datasetSegmento.getValue(i,"btCross") == "Sim"
				                ]);
			}
		}
	}
	
	return dataset;
}