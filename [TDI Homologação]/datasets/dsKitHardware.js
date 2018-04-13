function createDataset(fields, constraints, sortFields) {
	log.info("TESTE DATASET KIT HARDWARE");
	var newDataset = DatasetBuilder.newDataset();
	/*coluna 0*/ newDataset.addColumn("codigo");
	newDataset.addColumn("descricao");
	newDataset.addColumn("tipo");
	newDataset.addColumn("custo");
	newDataset.addColumn("saldo");
	
	log.info("ENTROU DATASET KIT HARDWARE");
	
	/*{codigo: item.getCBCODITPRO(), desc: item.getCBDESITPRO(), tipo: item.getCBTIPOIT(), custo: item.getCBCUSTOIT(), saldo: item.getCBSALDOIT()};*/
    var empresa = "";
    var filial  = "";
    var grupo   = "";
    
    
	if (fields != null) {
		empresa = fields[0];
		filial = fields[1];
		grupo  = fields[2];
	}
	
    
	if (constraints != null && constraints.length > 0) {
		log.info(constraints.length);
		empresa = constraints[0].getInitialValue();
		filial  = constraints[1].getInitialValue();
		grupo  = constraints[2].getInitialValue();

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
		
		var retorno = service.kit(empresa,filial,grupo);
		var listKit = retorno.getLISTAKIT();
		//.getABITENSKIT().getITENSKIT();
		log.info("akie");
		log.info("VALOR DE listCoord:" + listKit.size());
		for(var i =0; i < listKit.size(); i++){
			log.info("DENTRO DO FOR1");
			var kit = listKit.get(i);
			log.info("kit " + kit);
			
			log.info(kit.getCBCODPRO()+ " - " + kit.getCBDESPRO() + " - " + kit.getCBTIPO() );
			/*listItem = kit.getABITENSKIT().getITENSKIT();
			itens = [];//"aa";
			log.info(" x " + itens + " " + listItem.size());
			log.info(" x " + itens + " " + listItem);
			//log.info(" x " + itens + " " + listItem[0]);
			log.info(" x " + itens + " " + listItem.get(0));
			for(var j = 0; j < listItem.size(); j++) {
				item = listItem.get(j);
				log.info("item " + item);
				//itens[j] = {codigo: item.getCBCODITPRO(), desc: item.getCBDESITPRO(), tipo: item.getCBTIPOIT(), custo: item.getCBCUSTOIT(), saldo: item.getCBSALDOIT()};
				newDataset2.addRow(new Array (new Array(item.getCBCODITPRO(),
						item.getCBDESITPRO(),
						item.getCBTIPOIT(),
						item.getCBCUSTOIT(),
						item.getCBSALDOIT()));
			}
			
			log.info("itens " + newDataset2);*/
			
			newDataset.addRow(new Array (
	                kit.getCBCODPRO(),
                    kit.getCBDESPRO(),
                    kit.getCBTIPO(),
                    kit.getCBCUSTO(),
                    kit.getCBSALDO()));
			
			
			log.info("DENTRO DO FOR2");
			
		}
	}catch(error) {
		log.info(error);
		newDataset.addRow(new Array("erro" + error.message)); } 	
		
    return newDataset;

}

