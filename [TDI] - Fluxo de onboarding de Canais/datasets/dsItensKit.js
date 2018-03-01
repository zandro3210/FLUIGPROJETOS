function createDataset(fields, constraints, sortFields) {
	log.info("TESTE DATASET ITENS KIT HARDWARE");
	var newDataset = DatasetBuilder.newDataset();
	/*coluna 0*/ newDataset.addColumn("codigo");
	newDataset.addColumn("descricao");
	newDataset.addColumn("tipo");
	newDataset.addColumn("custo");
	newDataset.addColumn("saldo");

	log.info("ENTROU DATASET ITENS KIT HARDWARE");
	
	/*{codigo: item.getCBCODITPRO(), desc: item.getCBDESITPRO(), tipo: item.getCBTIPOIT(), custo: item.getCBCUSTOIT(), saldo: item.getCBSALDOIT()};*/
    var empresa = "";
    var filial  = "";
    var grupo   = "";
    
	if (fields != null) {
		empresa = fields[0];
		filial  = fields[1];
		grupo   = fields[2];
	}
	
    
	if (constraints != null && constraints.length > 0) {
		log.info(constraints.length);
		empresa = constraints[0].getInitialValue();
		filial  = constraints[1].getInitialValue();
		grupo   = constraints[2].getInitialValue();
		log.info("VALOR2 DO CONSTRAINTS: " + constraints[0].getInitialValue());
	}
	
	log.info("VALOR DA EMPRESA : " + empresa + " | FILIAL : " + filial + " | GRUPO : " + grupo);	

	if(empresa == null || empresa == ""){
		empresa = "00";
	}
	
	if(filial == null || filial == ""){
		filial = "01";
	}

	if(grupo == null || grupo == ""){
		grupo = "000001";
	}


	log.info("DEPOIS DO FIELDS "  + empresa + " | FILIAL : " + filial + " | GRUPO : " + grupo);
	// Conecta o servico - nome do cadastro de servicos!! 
	var periodicService = ServiceManager.getService('TDI_ESTOQUE_INFRA');
	//var serviceLocator = periodicService.instantiate('_197._102._16._172._7032.ESTOQUEINFRA');
	var serviceLocator = periodicService.instantiate('br.com.totvs.wsautoatendimento.wscorp.ESTOQUEINFRA');
	var service = serviceLocator.getESTOQUEINFRASOAP();
	
	log.info("DEPOIS DE CONECTAR");
	
	try{
		
		var retorno = service.itkt(empresa,filial,grupo);
		var itensKit = retorno.getITENSKIT();
		//.getABITENSKIT().getITENSKIT();
		log.info("akie");
		log.info("VALOR DE listCoord:" + itensKit.size());
		for(var i =0; i < itensKit.size(); i++){
			//log.info("DENTRO DO FOR1");
			item = itensKit.get(i);
			log.info(" alo " + item.getCECODITPRO());
			newDataset.addRow(new Array(item.getCECODITPRO(),
					item.getCEDESITPRO(),
					item.getCETIPOIT(),
					item.getCECUSTOIT(),
					item.getCESALDOIT()));

		//log.info("DENTRO DO FOR2");
			
		}
	}catch(error) {
		log.info(error);
		newDataset.addRow(new Array("erro" + error.message,"","","","")); } 	
		
    return newDataset;

}