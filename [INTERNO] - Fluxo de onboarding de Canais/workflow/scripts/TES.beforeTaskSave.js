function beforeTaskSave(colleagueId,nextSequenceId,userList){
/*	var numProcesso = getValue("WKNumProces");
	var numAtividade = getValue("WKNumState");
	
	hAPI.setCardValue("numAtivAnter", "");
	
	if( numAtividade == 19 && nextSequenceId == 17 ){
		hAPI.setCardValue("numAtivAnter", numAtividade);
		log.info("************ NumAtivAnter ************" + hAPI.getCardValue("numAtivAnter"));
	}

	log.info("************ beforTaskSave ************");
	log.info("************ numProcesso: " + numProcesso);
	log.info("************ numAtividade: " + numAtividade);
	log.info("************ nextSequenceId: " + nextSequenceId);
		
	try {
		var TOTAL_PERGUNTAS = 120; // Ao atualiza este item deve-se atualiza o script
		var cDelimitador = "|";
		
		log.info("     ****** Total de Perguntas: " + TOTAL_PERGUNTAS);
		
		/* Atividades em que ha integracao com Protheus:
		 * 
		 * 19 (se a proxima for 24), 40, 42, 44
		 * 
		 * Atividades em que nao ha integracao com Protheus:
		 * 
		 * 0, 1, 17, 19 (se a proxima for 17), 26, 30, 32, 46, 49, 53, 55
		 * 
		 *
		
		var primeiraIntegracao = false;

		if( numAtividade == 19 && nextSequenceId == 24 ){
			primeiraIntegracao = true;
		}
		
		if( ( numAtividade == 40 || numAtividade == 42 || numAtividade == 44 ) || ( primeiraIntegracao  ) ) {
			
			log.info("************ integracao protheus ************");
			
			var servInstance = ServiceManager.getServiceInstance("WSTESPROPOSAL");
			var serviceHelper = servInstance.getBean();
			log.info("     ******* criou bean do servico *******     ");

			var tesProposal = serviceHelper.instantiate("br.com.microsiga.webservices.tesservices.WSTESPROPOSAL");
			var tesProposalSoap = tesProposal.getWSTESPROPOSALSOAP();
			log.info("     ******* criou servico *******     ");

			log.info("     ******* monta header *******     ");

			// var eaiZAA_PAIS = hAPI.getCardValue("esPais");
			var eaiZAA_PAIS = hAPI.getCardValue("idPaisAnterior");
			log.info("     ******* ZAA_PAIS: " + eaiZAA_PAIS);
			// log.info("     ******* idPaisAnterior: " + hAPI.getCardValue("idPaisAnterior"));
			// log.info("     ******* paisTemp: " + hAPI.getCardValue("paisTemp"));
	
			var eaiZAA_CODPRJ = numProcesso;
			log.info("     ******* ZAA_CODPRJ: " + eaiZAA_CODPRJ);
			
			var eaiZAA_DESC = hAPI.getCardValue("esNomeCliente") + " USER: " + hAPI.getCardValue("nomeUsuario");
			eaiZAA_DESC.replace(cDelimitador, "");
			log.info("     ******* ZAA_DESC: " + eaiZAA_DESC);
			
			var eaiZAA_PROPUE = hAPI.getCardValue("idPropuesta");
			log.info("     ******* ZAA_PROPUE: " + eaiZAA_PROPUE);

			var customEMAIL = hAPI.getCardValue("emailUsuario");
			log.info("     ******* customEMAIL: " + customEMAIL);
			
			var earEMAIL = hAPI.getCardValue("emailEAR");
			log.info("     ******* EMAIL EAR: " + earEMAIL);
			
			var arqEMAIL = hAPI.getCardValue("emailARQ");
			log.info("     ******* EMAIL ARQ: " + arqEMAIL);
			
			log.info("     ******* monta itens *******     ");

			var eaiZAI_CODPRG = "";
			var eaiZAI_RESPUE = "";
			var eaiZAI_OBS = "";
			
			var itemAux = "";
			
			for(var k = 0; k < TOTAL_PERGUNTAS; k++) {
				var wresCode = "resCode";
	  			wresCode = wresCode + k;

	  			var wresResp = "resContenido";
	  			wresResp = wresResp + k;
	  			
	  			var wresTipo = "resTipo";
	  			wresTipo = wresTipo + k;
	  			
	  			var resCode = hAPI.getCardValue(wresCode);
	  			var resResp = hAPI.getCardValue(wresResp);
	  			var resTipo = hAPI.getCardValue(wresTipo);
				
	  			if( resCode == null || resCode == "" ) {
	  				continue;
	  			}
	  			
				eaiZAI_RESPUE = "";
				eaiZAI_OBS = "";
				
				// TIPO CHECKBOX O SWITCH
	  			if(resTipo == "0" && resResp == "true"){
	  				eaiZAI_RESPUE = "1";
	  			}
	  			if(resTipo == "0" && resResp == "false"){
	  				eaiZAI_RESPUE = "2";
	  			}
	  			
	  			// TIPO RADIO
	  			if(resTipo == "1"){
	  				eaiZAI_RESPUE = resResp;
	  			}
	  			
	  			// TIPO MEMO
	  			if(resTipo == "3"){
	  				eaiZAI_OBS = resResp;
	  				log.info("     ******* antes del replace  *******     " + " K " + k + " " + eaiZAI_OBS);
	  				eaiZAI_OBS.replace(cDelimitador,"");
	  				log.info("     ******* despues del replace  *******     " + " K " + k + " " + eaiZAI_OBS);
	  			}
	  			
	  			
	  			// eaiZAI_OBS.replace(cDelimitador,"");
	  			
	  			
	  			
	  			// Nos campos vazios, insere um espaco
				if( resCode == "" ) { resCode = " "; }
				if( eaiZAI_RESPUE == "" ) { eaiZAI_RESPUE = " "; }
				if( eaiZAI_OBS == "" ) { eaiZAI_OBS = " "; }
				
	  			var item = resCode + cDelimitador + eaiZAI_RESPUE + cDelimitador + eaiZAI_OBS + ")#("; // )#(: Indica fim de linha ao servi?o
	  			
	  			itemAux = itemAux + item;
			}	
			
			// Nos campos varios, insere um espaco
			if( eaiZAA_PAIS == "" ) { eaiZAA_PAIS = " "; }
			if( eaiZAA_CODPRJ == "" ) { eaiZAA_CODPRJ = " "; }
			if( eaiZAA_DESC == "" ) { eaiZAA_DESC = " "; }
			if( eaiZAA_PROPUE == "" ) { eaiZAA_PROPUE = " "; }
			if( earEMAIL == "" ) { earEMAIL = " "; }
			if( arqEMAIL == "" ) { arqEMAIL = " "; }
			
			var id = "XXYYZZ";
			
			var operation = "4"; // 3 incluir / 4 alterar
			if( primeiraIntegracao ){
				log.info("     ******* primeira vez *******     ");
				operation = "3"; // 3 incluir / 4 alterar
			}
			
			var headerdef = "ZAA_PAIS" + cDelimitador + "ZAA_CODPRJ" + cDelimitador + "ZAA_DESC" + cDelimitador + "ZAA_PROPUE" + cDelimitador + "CUSTOM_EMAIL" + cDelimitador + "EMAIL_EAR" + cDelimitador + "EMAIL_ARQ";
			
			var headercont = eaiZAA_PAIS + cDelimitador + eaiZAA_CODPRJ + cDelimitador + eaiZAA_DESC + cDelimitador + eaiZAA_PROPUE + cDelimitador + customEMAIL + cDelimitador + earEMAIL + cDelimitador + arqEMAIL;

			var itemdef = "ZAI_CODPRG" + cDelimitador + "ZAI_RESPUE" + cDelimitador + "ZAI_OBS";
			var itemcont = itemAux;

			log.info("     ******* Final: ");
			log.info("     ******* ID: " + id);
			log.info("     ******* OPERATION: " + operation);
			log.info("     ******* HEADERDEF: " + headerdef);
			log.info("     ******* HEADERCONT: " + headercont);
			log.info("     ******* ITEMDEF: " + itemdef);
			log.info("     ******* ITEMCONT: " + itemcont);
			
			log.info("     ******* envia! *******     ");
			
			tesProposalSoap.writeprop(id, operation, headerdef, headercont, itemdef, itemcont);
			
			log.info("     ******* fim! *******     ");
		}	
	} catch(e) {
		log.info(" ***** ERROR BTS: " + e);
	}*/
}