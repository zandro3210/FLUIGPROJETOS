function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn('average');
	
	try{
		
		var total = fields.length;
		var count = parseFloat(0);
		var fix = sortFields[0];
		
		for(var i = 0; i < fields.length; i++){			
			count +=  ( fields[i] == "" ? parseFloat("0") : parseFloat(fields[i]) );
			
			log.info(" ===>>> fields["+i+"] ===>>> "+fields[i]);
			
			log.info(" ===>>> parseFloat(fields["+i+"]) ===>>> "+parseFloat(fields[i]) );
			log.info(' ===>>> count++ ===>>>'+count );
		}
		count = count / total;
		
		log.info(' ===>>> count.toFixed('+fix+') ===>>>'+count.toFixed(fix) );
		
		count = count.toFixed(fix);
	
	    dataset.addRow([count]);
	}catch(e){
		dataset.addRow([e.message]);
	}
	
	return dataset;
}