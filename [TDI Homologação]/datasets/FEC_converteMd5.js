function createDataset(fields, constraints, sortFields) {
	var tokenAluno = '';
	if (constraints != null){
		for (var i = 0; i < constraints.length; i++){
			if (constraints[i].fieldName == 'MD5' && constraints[i].initialValue != ''){
				log.info("===> tokenAluno <===" + constraints[i].initialValue);
				tokenAluno = constraints[i].initialValue;
			}
		}
	}
	
	var dataset = DatasetBuilder.newDataset();
	var serviceProvider = ServiceManager.getServiceInstance("servicoMD5");
	log.info("=====>" + serviceProvider);
	var wsServiceLocator = serviceProvider.instantiate("br.com.totvs.fluig.soap.service.impl.ConverteMD5ImplService");
	var ws = wsServiceLocator.getConverteMD5ImplPort();
	var strMd5 = ws.converteStringMd5(tokenAluno);
	dataset.addColumn('MD5');
	dataset.addRow(new Array(strMd5));
	return dataset;
}