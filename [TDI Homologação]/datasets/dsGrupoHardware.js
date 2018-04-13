function createDataset(fields, constraints, sortFields) {
	log.info("TESTE DATASET GRUPO HARDWARE" + fields + " " + constraints);
	
	var newDataset = DatasetBuilder.newDataset();
	
	/*coluna 0*/ newDataset.addColumn("codigo");
	newDataset.addColumn("descricao");
	
	log.info("ENTROU DATASET GRUPO HARDWARE");
	
	
    var empresa = "";
    var filial  = "";
    
	if (fields != null) {
		empresa = fields[0];
		filial = fields[1];
	}
	
	if (constraints != null && constraints.length > 0) {
		log.info(constraints.length);
		empresa = constraints[0].getInitialValue();
		filial  = constraints[1].getInitialValue();
    
		log.info("VALOR2 DO CONSTRAINTS: " + constraints[0].getInitialValue());
	}
	
	log.info("VALOR DA EMPRESA : " + empresa + " | FILIAL : " + filial);	

	if(empresa == null || empresa == ""){
		empresa = "00";
	}
	
	if(filial == null || filial == ""){
		filial = "01";
	}
	
	log.info("DEPOIS DO FIELDS");
	// Conecta o servico - nome do cadastro de servicos!! 
	var periodicService = ServiceManager.getService('TDI_ESTOQUE_INFRA');
	//var serviceLocator = periodicService.instantiate('_197._102._16._172._7032.ESTOQUEINFRA');
	var serviceLocator = periodicService.instantiate('br.com.totvs.wsautoatendimento.wscorp.ESTOQUEINFRA');
	var service = serviceLocator.getESTOQUEINFRASOAP();
	
	log.info("DEPOIS DE CONECTAR");
	
	try{
		
		var retorno = service.grupo(empresa,filial);
		var listGrupo = retorno.getLISTAGRUPO();
		
		log.info("VALOR DE listCoord:" + listGrupo.size());
		
		for(var i =0; i < listGrupo.size(); i++){
			log.info("DENTRO DO FOR1");
			var grupo = listGrupo.get(i);
			newDataset.addRow(new Array (
	                grupo.getCACODIGO(),
                    grupo.getCADESCR()));
			
			
			log.info("DENTRO DO FOR2");
			
		}
	}catch(error) {newDataset.addRow(new Array("erro" + error.message)); } 	
		
    return newDataset;

}