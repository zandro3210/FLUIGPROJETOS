function createDataset(fields, constraints, sortFields) {
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("tipo");
	newDataset.addColumn("resultado");
	var login;
	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			log.info("CST:" + constraints[i].initialValue);
			login = constraints[i].initialValue;
			log.info("CST2:" + login);
		}
	}else{
		login = "daniel.koepp";
	}
	
	
	login = java.text.Normalizer.normalize(login, java.text.Normalizer.Form.NFD);
	login = login.replaceAll("[^\\p{ASCII}]", "");	
	
	var NOME_SERVICO = 'infraws';
	var CAMINHO_SERVICO = 'com.totvs.infraws.ad.PSScripts';
	var servico = ServiceManager.getService(NOME_SERVICO);
	var instancia = servico.instantiate(CAMINHO_SERVICO);
	var SOAP = instancia.getBasicHttpBindingIPSScripts();
	var fn,sn;
	var retorno = SOAP.checkUser(login);
	retorno = java.text.Normalizer.normalize(retorno, java.text.Normalizer.Form.NFD);
	retorno = retorno.replaceAll("[^\\p{ASCII}]", "");
	
	if (retorno.trim().equals("Usuario ja existe!")){
		log.info("LOGIN1:" + login);
		splitada = new String(login).trim().split(".");
	      fn = splitada[0];
	      sn = splitada[1];
		newDataset.addRow(new Array("0",SOAP.generateUsername(fn,sn)));
	}
	if (retorno.trim().equals("Usuario bloqueado!")){
		splitada = new String(login).trim().split(".");
	      fn = splitada[0];
	      sn = splitada[1];		
	      newDataset.addRow(new Array("1",SOAP.generateUsername(fn,sn)));
	}else{
		newDataset.addRow(new Array("2",SOAP.checkUser(login)));
	}
	
	
	return newDataset;
}