function createDataset(fields, constraints, sortFields) {

	try{
	
		var newDataset = DatasetBuilder.newDataset();
		newDataset.addColumn("CB_CODIGO");
		newDataset.addColumn("CB_NOME");
		newDataset.addColumn("CB_CNPJ");
		newDataset.addColumn("CB_CODBANC");
	    newDataset.addColumn("CB_AGENCIA");
		newDataset.addColumn("CB_NUMCONT");
		newDataset.addColumn("CB_TIPO");
		newDataset.addColumn("CB_LOJA");
		newDataset.addColumn("CB_NREDUZ");
		newDataset.addColumn("CB_END");
		newDataset.addColumn("CB_PAIS");
				
		var integracao = ServiceManager.getService('wscorpfluig');
		var serviceLocator = integracao.instantiate('com.totvs.autoatendimento.fluig.FLUIG');
		var service = serviceLocator.getFLUIGSOAP();
		
		var empresa = "00";
		var filial = "00001000100";
		var nome = "mat";
		var cnpj = "";
		
		log.info("constraints :" + constraints )
		if (constraints != null) {
			for(var c in constraints){
				log.info("constraints[c].getFieldName():" + constraints[c].getFieldName())
				if (constraints[c].getFieldName() == "C_EMPRESA"){
					empresa = constraints[c].getInitialValue(); 
				} else if (constraints[c].getFieldName() == "C_FILIAL"){
					filial = constraints[c].getInitialValue(); 
				} else if (constraints[c].getFieldName() == "CB_NOME"){
					nome = constraints[c].getInitialValue(); 
				} else if (constraints[c].getFieldName() == "CNPJ"){
					cnpj = constraints[c].getInitialValue(); 
				}
			}
		} else if (fields && fields != null) {
		    empresa = fields[0]; 
		    filial = fields[2];
		    nome = fields[4];
		    cnpj = fields[6];
		}
		
		log.info("dsforne: " + empresa + ":" + filial + ":" + nome.toUpperCase() + ":" + cnpj);
		
		var retorno = service.fornec(empresa, filial, nome.toUpperCase(), cnpj);
		var list = retorno.getLISTAFORNEC();
	    
		for (var i=0; i<list.size(); i++) {
			var r = list.get(i);
			newDataset.addRow(new Array(r.getCBCODIGO(), r.getCBNOME(), r.getCBCNPJ(), r.getCBCODBANC(), r.getCBAGENCIA(), r.getCBNUMCONT(), r.getCBTIPO(), r.getCBLOJA(), r.getCBNREDUZ(), r.getCBEND(), r.getCBPAIS()));
		}
	}  catch(error) {
		log.info ("DATASET   dsfornecedor - PTO 7:" + error.message);
		newDataset.addRow(new Array("erro",error.message,"erro","erro","erro","erro","erro","erro", "erro", "erro", "erro")); 
	}
		
	return newDataset;	
}