function createDataset(a,d,c){		var b=DatasetBuilder.newDataset();	b.addColumn("Retorno");	var constraint1 = DatasetFactory.createConstraint("processHistoryPK.processInstanceId",0,9999, ConstraintType.MUST);	var constraint2 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);	var constraints = new Array(constraint1,constraint2);	var ph = DatasetFactory.getDataset("processHistory", null, constraints, new Array("stateSequence"));    var cont = 0;	for(var i = 0; i < ph.rowsCount; i++){        var const1 = DatasetFactory.createConstraint("processStatePK.processId", "brv_kgq_ro", "brv_kgq_ro", ConstraintType.MUST);        var const2 = DatasetFactory.createConstraint("processStatePK.sequence", ph.getValue(i,"stateSequence"), ph.getValue(i,"stateSequence"), ConstraintType.MUST);        var constraints3 = new Array(const1,const2);        var dataset3 = DatasetFactory.getDataset("processState", null, constraints3, null);        if(dataset3.getValue(0, "stateDescription") == ""){             cont++;         }    }     log.info("§" + cont);    b.addRow(new Array(cont.toString()));	return b;}