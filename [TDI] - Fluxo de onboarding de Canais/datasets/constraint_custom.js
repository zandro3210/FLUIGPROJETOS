// Localfunction createDataset(fields, constraints, sortFields) {	var c3 = DatasetFactory.createConstraint("txtCodigo2", "Tec", "Tec", ConstraintType.MUST);   var c2 = DatasetFactory.createConstraint("txtCodigo", "Vendas", "Vendas", ConstraintType.MUST);		       var c1 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST); 		var constraints = new Array(c3, c2, c1);		var dataset = DatasetFactory.getDataset("constraint_test", null, constraints, null);		if (dataset.rowsCount != null)  {		var newDataset = DatasetBuilder.newDataset();				for (i=0; i<dataset.getColumnsCount(); i++) {			newDataset.addColumn(dataset.getColumnName(i));		}						for(i = 0; i < dataset.rowsCount; i++) {						var rows = new Array();						for (j=0; j<dataset.getColumnsCount(); j++) {				rows[j] = dataset.getValue(i, dataset.getColumnName(j)); 				}									newDataset.addRow(rows);		}				return newDataset;	}   }