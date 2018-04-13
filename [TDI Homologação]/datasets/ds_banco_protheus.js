function createDataset(fields, constraints, sortFields) {

	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CA_CODIGO");
	newDataset.addColumn("CA_NREDUZ");
	newDataset.addColumn("CA_AGENCIA");
	newDataset.addColumn("CA_NUMCONT");
	newDataset.addColumn("CA_NMAG");
	newDataset.addColumn("CA_NOME");
		
	var integracao = ServiceManager.getService('FLUIG3');
	var serviceLocator = integracao.instantiate('pkgWkfSolicPagamento.FLUIGLocator');
	var service = serviceLocator.getFLUIGSOAP();
	
	log.info("ds_banco sombrio inicio")
	
	var empresa = "00";
	var filial = "";
	var banco = null;
	var start = null;
	var end = null;
	if (constraints != null) {
		for(var c in constraints){
			if (constraints[c].getFieldName() == "C_EMPRESA"){
				empresa = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "C_FILIAL"){
				filial = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "CA_NOME"){
				banco = constraints[c].getInitialValue(); 
				banco = banco.toUpperCase();
			} else if (constraints[c].getFieldName() == "ID_BANCO"){
				start = constraints[c].getInitialValue(); 
				end = constraints[c].getInitialValue(); 
			}
		}
	} else if (fields && fields != null) {
	    empresa = fields[0]; 
	    filial = fields[2];
	    banco = fields[4];
	}
	
	
	log.info("ds_banco sombrio:" + empresa + ":" + filial + ":" + start + ":" + end + ":" + banco)
	
	try {
		var retorno = service.BANCO(empresa, filial, start, end, banco, "", "");
		log.info("ds_banco sombrio retorno:" + retorno)
		var list = retorno.getLISTABANCOS();
		log.info("ds_banco sombrio retorno:" + list.length)
	  	for (var i=0; i<list.length; i++) {
			var r = list[i];
			newDataset.addRow(new Array(r.getCA_CODIGO(), r.getCA_NREDUZ(), r.getCA_AGENCIA(), r.getCA_NUMCONT(), r.getCA_NMAG(), r.getCA_NOME()));	
		}
	} catch (error) {
		newDataset.addRow(new Array("erro", error.message, "erro", "erro", "erro","erro")); 
	}	
	return newDataset;	
}