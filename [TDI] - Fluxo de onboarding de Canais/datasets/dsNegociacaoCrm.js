function createDataset(fields, constraints, sortFields) {
		
		log.info("***DATASET NEGOCIACAO CRM: ");
		
		var NOME_SERVICO = "WSECMCRM4";
		var CAMINHO_SERVICO = "localhost.WSECMCRMLocator";		
		var newDataset = DatasetBuilder.newDataset(); 
		newDataset.addColumn("codigo");
		newDataset.addColumn("cliente");
		newDataset.addColumn("condicaoPagamentoCdu");
		newDataset.addColumn("diferencaCdu");
		newDataset.addColumn("diferencaOutros");
		newDataset.addColumn("diferencaSms");
		newDataset.addColumn("diferencaServicos");
		newDataset.addColumn("diretor");
		newDataset.addColumn("dataEmissao");
		newDataset.addColumn("executivo");
		newDataset.addColumn("gar");
		newDataset.addColumn("propostaId");
		newDataset.addColumn("observacoes");
		newDataset.addColumn("regra");
		newDataset.addColumn("responsavel");
		newDataset.addColumn("tipoVenda");
		newDataset.addColumn("totalNegociadoCdu");
		newDataset.addColumn("totalNegociadoOutros");
		newDataset.addColumn("totalNegociadoSms");
		newDataset.addColumn("totalNegociadoServicos");
		newDataset.addColumn("totalTabelaCdu");
		newDataset.addColumn("totalTabelaOutros");
		newDataset.addColumn("totalTabelaSms");
		newDataset.addColumn("totalTabelaServicos");
		newDataset.addColumn("unidade");
		newDataset.addColumn("itemCarencia");
		newDataset.addColumn("itemDesconto");
		newDataset.addColumn("itemId");
		newDataset.addColumn("itemPrecoTabela");
		newDataset.addColumn("itemPrecoTotal");
		newDataset.addColumn("itemPrecoUnitario");
		newDataset.addColumn("itemVencimento");
		newDataset.addColumn("itemProduto");
		newDataset.addColumn("itemQuantidade");
		newDataset.addColumn("propostaVinculadaDescricao");
		newDataset.addColumn("propostaVinculadaEmissao");
		newDataset.addColumn("propostaVinculadaModalidade");
		newDataset.addColumn("propostaVinculadaNegocio");
		newDataset.addColumn("propostaVinculadaOportunidade");
		newDataset.addColumn("propostaVinculadaProposta");
		newDataset.addColumn("NEGOCIACAOESPECIFICA");
		
		log.info("***NEGOCIACAO PONTO1 ");
		
		//var propostaId = "674060F01";
		//var propostaId = "703780ES1";
		if (constraints != null) {
			for(var c in constraints){
				if (constraints[c].getFieldName() == "proposta"){
					propostaId = constraints[c].getInitialValue(); 
				} 
			}
		}
		
		
		var servico = ServiceManager.getService(NOME_SERVICO);
		log.info("Servico: " + servico);

		var instancia = servico.instantiate(CAMINHO_SERVICO);
		log.info("Instancia: " + instancia);

		var ws = instancia.getWSECMCRMSOAP();
		
		log.info("propostaId: " + propostaId);
		
		try {
			var proposta = ws.ENVIANEGESP(propostaId);
			var it = proposta.getITENS();
			var itens = it.getITENSPROPOSTA();
			var pv = proposta.getPROPVINC();
			var propVinc = pv.getPROPOSTASVINCULADAS();	
			
			log.info("itens: " + proposta.getCLIENTE() + ":" + isEmpty(itens) + ":" + isEmpty(propVinc));
			
			if (isEmpty(itens) && isEmpty(propVinc)) {
				newDataset.addRow(new Array(proposta.getCODIGO(), 
						proposta.getCLIENTE(), 
						proposta.getCONDPAGCDU(), 
						proposta.getDIFCDU(), 
						proposta.getDIFOUT(), 
						proposta.getDIFSMS(), 
						proposta.getDIFSRV(), 
						proposta.getDIRETOR(), 
						proposta.getEMISSAO(), 
						proposta.getEXECUTIVO(), 
						proposta.getGAR(), 
						proposta.getIDPROP(), 
						proposta.getOBSERVACOES(), 
						proposta.getREGRA(), 
						proposta.getRESPONSAVEL(), 
						proposta.getTIPOVENDA(), 
						proposta.getTOTNEGCDU(), 
						proposta.getTOTNEGOUT(), 
						proposta.getTOTNEGSMS(), 
						proposta.getTOTNEGSRV(), 
						proposta.getTOTTABCDU(), 
						proposta.getTOTTABOUT(), 
						proposta.getTOTTABSMS(), 
						proposta.getTOTTABSRV(), 
						proposta.getUNIDADE(),
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						proposta.getNEGESPECIFICA())); 
				return newDataset;
			}
			if (!isEmpty(itens)) {
				for (var i=0;i<itens.length;i++) {
					var g = itens[i];
					log.info("item: " + g);
					newDataset.addRow(new Array(proposta.getCODIGO(), 
												proposta.getCLIENTE(), 
												proposta.getCONDPAGCDU(), 
												proposta.getDIFCDU(), 
												proposta.getDIFOUT(), 
												proposta.getDIFSMS(), 
												proposta.getDIFSRV(), 
												proposta.getDIRETOR(), 
												proposta.getEMISSAO(), 
												proposta.getEXECUTIVO(), 
												proposta.getGAR(), 
												proposta.getIDPROP(), 
												proposta.getOBSERVACOES(), 
												proposta.getREGRA(), 
												proposta.getRESPONSAVEL(), 
												proposta.getTIPOVENDA(), 
												proposta.getTOTNEGCDU(), 
												proposta.getTOTNEGOUT(), 
												proposta.getTOTNEGSMS(), 
												proposta.getTOTNEGSRV(), 
												proposta.getTOTTABCDU(), 
												proposta.getTOTTABOUT(), 
												proposta.getTOTTABSMS(), 
												proposta.getTOTTABSRV(), 
												proposta.getUNIDADE(),
												g.getCARENCIA(),
												g.getDESCONTO(),
												g.getITEM_PROP(),
												g.getPRECO_TAB(),
												g.getPRECO_TOT(),
												g.getPRECO_UN(),
												g.getPRI_VENC(),
												g.getPROD_PROP(),
												g.getQTD_PROP(),
												"",
												"",
												"",
												"",
												"",
												"",
												proposta.getNEGESPECIFICA())); 
				}
			} 
			
			if (!isEmpty(propVinc)) {
				for (var i=0;i<propVinc.length;i++) {
					var v = propVinc[i];
					log.info("item: " + v);
					newDataset.addRow(new Array(proposta.getCODIGO(), 
												proposta.getCLIENTE(), 
												proposta.getCONDPAGCDU(), 
												proposta.getDIFCDU(), 
												proposta.getDIFOUT(), 
												proposta.getDIFSMS(), 
												proposta.getDIFSRV(), 
												proposta.getDIRETOR(), 
												proposta.getEMISSAO(), 
												proposta.getEXECUTIVO(), 
												proposta.getGAR(), 
												proposta.getIDPROP(), 
												proposta.getOBSERVACOES(), 
												proposta.getREGRA(), 
												proposta.getRESPONSAVEL(), 
												proposta.getTIPOVENDA(), 
												proposta.getTOTNEGCDU(), 
												proposta.getTOTNEGOUT(), 
												proposta.getTOTNEGSMS(), 
												proposta.getTOTNEGSRV(), 
												proposta.getTOTTABCDU(), 
												proposta.getTOTTABOUT(), 
												proposta.getTOTTABSMS(), 
												proposta.getTOTTABSRV(), 
												proposta.getUNIDADE(),
												"",
												"",
												"",
												"",
												"",
												"",
												"",
												"",
												"",
												v.getDESCR_OPORT(),
												v.getEMISSAO(),
												v.getMODALIDADE(),
												v.getNEGOCIO(),
												v.getOPORTUNIDADE(),
												v.getPROPOSTA(),
												proposta.getNEGESPECIFICA())); 
				}
			}
		} catch (e) {
			log.info("ERRO DATASET dsNegociacaoCrm/catch :" + e.message);
			newDataset.addRow(new Array(e.message, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "","")); 
		}
		
		return newDataset;
		

		function isEmpty(v) {
			return v == null || v.length == 0;
		}
	
}