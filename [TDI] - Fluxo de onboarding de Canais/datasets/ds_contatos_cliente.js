function createDataset(fields, constraints, sortFields) {

	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CODIGO");
	newDataset.addColumn("NOME");
	
	var loja = "00";
	var cliente = "T00718";
	
	if (constraints != null) {
		for(var c in constraints){
			if (constraints[c].getFieldName() == "loja"){
				loja = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "cliente"){
				cliente = constraints[c].getInitialValue(); 
			}  
		}
	}
	
	log.info("CONTATO_CLIENTE:" + cliente + ":" + loja);
	
	try {
		var service = ServiceManager.getService('CHAMTEC');
		var serviceLocator = service.instantiate('br.com.totvs.cp.erpwsportal.CHAMTECLocator');
//		var serviceLocator = service.instantiate('br.com.totvs.ssimwsportal.CHAMTECLocator');
//		var serviceLocator = service.instantiate('_156._93._16._172.CHAMTECLocator');
		var soap = serviceLocator.getCHAMTECSOAP();
		var contatos = soap.GETCONTATOS("", cliente, loja, "");	
		
		var lista = contatos.getLISTCONTATOS2();
		for (var i=0;i<lista.length;i++) {
			var contato = lista[i];
			newDataset.addRow(new Array(contato.getCODIGO(),
										contato.getNOME()));
		}
		
	} catch (e) {
		log.info(e);
		newDataset.addRow(new Array("Ocorreu um erro:",
									"Esta solicitação poderá ser efetuada somente pelo ESN (Exec. de Soluções e Negócios)."));
	}

return newDataset;		
	
}