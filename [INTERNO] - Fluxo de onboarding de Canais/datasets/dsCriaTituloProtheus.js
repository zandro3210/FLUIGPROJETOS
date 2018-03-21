function createDataset(fields, constraints, sortFields) {


	try{
		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
		
		newDataset.addColumn("CF_MENRET");
		newDataset.addColumn("CF_NUMTIT");
		newDataset.addColumn("CF_INSS");
		newDataset.addColumn("CF_ISS");
		newDataset.addColumn("CF_IRRF");
		newDataset.addColumn("CF_CSLL");
		newDataset.addColumn("CF_PIS");
		newDataset.addColumn("CF_COFINS");
		newDataset.addColumn("CF_VALLIQ");
	
		log.info ("DATASET -  dsCriaTituloProtheus - PTO 1");
		
		var integracao = ServiceManager.getService('FLUIG3');
		
		log.info ("DATASET - dsCriaTituloProtheus - PTO 2 - servico ok");
		
		//2- Locator
			// TESTE
			//var serviceLocator = integracao.instantiate('_197._102._16._172.FLUIGLocator');
			
			//PRODUCAO
			//var serviceLocator = integracao.instantiate('br.com.totvs.wsautoatendimento.wscorp.FLUIGLocator');
		
			// com o pacote pkgWkfSolicPagamento definido
			var serviceLocator = integracao.instantiate('pkgWkfSolicPagamento.FLUIGLocator');
		
		log.info ("DATASET - dsCriaTituloProtheus - PTO 3 - instantiate ok");
		
		//3- metodo dentro do Locator - Soap
		var service = serviceLocator.getFLUIGSOAP();
	
		log.info ("DATASET - dsCriaTituloProtheus - PTO 4 - metodo getFLUIGSOAP ok");
		
		if (constraints != null) {
		
			var cdEmpPag   	 = constraints[0].getInitialValue(); // empresa pagadora
			log.info("DATASET - dsCriaTituloProtheus - constraints[0] - cdEmpPag : " + cdEmpPag);
			
			var cdFilial   	 = constraints[1].getInitialValue(); // empresa pagadora
			log.info("DATASET - dsCriaTituloProtheus - constraints[1] - cdFilial: " + cdFilial);
			
			var cdPrefixo  	 = constraints[2].getInitialValue();
			log.info("DATASET - dsCriaTituloProtheus - constraints[2] - cdPrefixo: " + cdPrefixo);
	
			var cdTipo     	 = constraints[3].getInitialValue();
			log.info("DATASET - dsCriaTituloProtheus - constraints[3] - cdTipo: " + cdTipo);
			
			var cdNatur    	 = constraints[4].getInitialValue();
			log.info("DATASET - dsCriaTituloProtheus - constraints[4] - cdNatur: " + cdNatur);
			
			var cdFornec 	 = constraints[5].getInitialValue();
			log.info("DATASET  - dsCriaTituloProtheus - constraints[5] - cdFornec: " + cdFornec);
			
			var cdLojaFornec = constraints[6].getInitialValue();
			log.info("DATASET  - dsCriaTituloProtheus - constraints[6] - cdLojaFornec: " + cdLojaFornec);
			
			var cdata = constraints[7].getInitialValue();
			log.info("DATASET - dsCriaTituloProtheus - constraints[7] - cdata: " + cdata );

			var ano = cdata.substring(0,4); 
			log.info("DATASET  - dsCriaTituloProtheus - constraints[7] - ano: " + ano);
			
			var mes = cdata.substring(4,6); 
			mes = mes - 1;
			log.info("DATASET  - dsCriaTituloProtheus - constraints[7] - mes: " + mes);
			
			var dia = cdata.substring(6,8);
			log.info("DATASET  - dsCriaTituloProtheus - constraints[7] - dia: " + dia);
			
			var dtvenc = new java.util.Date(ano, mes, dia);
			log.info("DATASET  - dsCriaTituloProtheus - constraints[7] - dtvenc: " + dtvenc);
			
			var cValor	= constraints[8].getInitialValue();
			log.info("DATASET  - dsCriaTituloProtheus - constraint - cValor: " + cValor);
			//var valor	= +cValor; // tipo float
			//log.info("DATASET  - dsCriaTituloProtheus - constraint - valor: " + valor);
			
			var cdHistorico  = constraints[9].getInitialValue();
			log.info("DATASET - dsCriaTituloProtheus - constraint - cdHistorico: " + cdHistorico);
			
			var cdCcusto	 = constraints[10].getInitialValue();
			log.info("DATASET - dsCriaTituloProtheus - constraint - cdCcusto: " + cdCcusto);
			
			var cdItemContab = constraints[11].getInitialValue();
			log.info("DATASET  - dsCriaTituloProtheus - constraint - cdItemContab: " + cdItemContab);
			
			var cdMoeda = constraints[12].getInitialValue();
			log.info("DATASET - dsCriaTituloProtheus - constraint - cdMoeda: " + cdMoeda);
			
			var cdBanco		 = constraints[13].getInitialValue();
			log.info("DATASET - dsCriaTituloProtheus - constraint - cdBanco: " + cdBanco);
			
			var cdAgencia	 = constraints[14].getInitialValue();
			log.info("DATASET - dsCriaTituloProtheus - constraint - cdAgencia: " + cdAgencia);
			
			var cdConta 	 = constraints[15].getInitialValue();
			log.info("DATASET    - dsCriaTituloProtheus - constraint - cdConta: " + cdConta);
			
			var cdvalorMulta 	 = constraints[16].getInitialValue();
			log.info("DATASET - dsCriaTituloProtheus - constraint - cdvalorMulta: " + cdvalorMulta);
			//var vvalorMulta	= +cdvalorMulta; // tipo float
			//log.info("DATASET  - dsCriaTituloProtheus - constraint - vvalorMulta: " + vvalorMulta);
			
			var cdvalorJuros 	 = constraints[17].getInitialValue();
			log.info("DATASET - dsCriaTituloProtheus - constraint - cdvalorJuros: " + cdvalorJuros);
			//var vvalorJuros	= +cdvalorJuros; // tipo float
			//log.info("DATASET  - dsCriaTituloProtheus - constraint - vvalorJuros: " + vvalorJuros);
			
			var cdvalorCMon 	 = constraints[18].getInitialValue();
			log.info("DATASET - dsCriaTituloProtheus - constraint - cdvalorCMon: " + cdvalorCMon);
			//var vvalorCMon	= +cdvalorCMon; // tipo float
			//log.info("DATASET  - dsCriaTituloProtheus - constraint - vvalorCMon: " + vvalorCMon);
			
			var cdvalorTaxas 	 = constraints[19].getInitialValue();
			log.info("DATASET - dsCriaTituloProtheus - constraint - cdvalorTaxas: " + cdvalorTaxas);
			//var vvalorTaxas	= +cdvalorTaxas; // tipo float
			//log.info("DATASET  - dsCriaTituloProtheus - constraint - vvalorTaxas: " + vvalorTaxas);
			
			
			// se vier preenchido, validar contra este num titulo. se nao vier preenchido, gerar automatico sequencial comecando por 1
			var numTitulo 	 = constraints[20].getInitialValue();
			log.info("DATASET - dsCriaTituloProtheus - constraint - numTitulo: " + numTitulo);

			// tipo - sim para pagamento internacional e nao para solic pagamento 
			var cTipo 	 = constraints[21].getInitialValue();
			log.info("DATASET - dsCriaTituloProtheus - constraint - cTipo: " + cTipo);

			/* NAO ENVIA MAIS EH CALCULADO NO PROTHEUS QUANDO RETENCAO = SIM
			var cdvalorIss = constraints[22].getInitialValue();
			log.info("DATASET    - dsCriaTituloProtheus - constraint - cdvalorIss: " + cdvalorIss);
			
			var cdvalorPis = constraints[23].getInitialValue();
			log.info("DATASET    - dsCriaTituloProtheus - constraint - cdvalorPis: " + cdvalorPis);

			var cdvalorCofins = constraints[24].getInitialValue();
			log.info("DATASET    - dsCriaTituloProtheus - constraint - cdvalorCofins: " + cdvalorCofins);

			var cdvalorIrrf = constraints[25].getInitialValue();
			log.info("DATASET    - dsCriaTituloProtheus - constraint - cdvalorIrrf: " + cdvalorIrrf);
			
			var cdvalorInss = constraints[26].getInitialValue();
			log.info("DATASET    - dsCriaTituloProtheus - constraint - cdvalorInss: " + cdvalorInss);

			var cdvalorCsll = constraints[27].getInitialValue();
			log.info("DATASET    - dsCriaTituloProtheus - constraint - cdvalorCsll: " + cdvalorCsll);
			 */
			
			var cRetencao = constraints[22].getInitialValue();
			
			var cAcrescimo	= constraints[23].getInitialValue();
			log.info("DATASET  - dsCriaTituloProtheus - constraint - cAcrescimo: " + cAcrescimo);
			//var cAcrescimo	= new java.lang.Float(parseFloat(cAcrescimo)); // tipo float
			//var vAcrescimo	= +cAcrescimo; // tipo float
			//log.info("DATASET  - dsCriaTituloProtheus - constraint - vAcrescimo: " + vAcrescimo);
			
			var cDecrescimo	= constraints[24].getInitialValue();
			log.info("DATASET  - dsCriaTituloProtheus - constraint - cDecrescimo: " + cDecrescimo);
			//var cDecrescimo	= new java.lang.Float(parseFloat(cDecrescimo)); // tipo float
			//var vDecrescimo	= +cDecrescimo; // tipo float
			//log.info("DATASET  - dsCriaTituloProtheus - constraint - vDecrescimo: " + vDecrescimo);
			
			var cCodClasse = constraints[27].getInitialValue();
			log.info("DATASET  - dsCriaTituloProtheus - constraint - codClasse: " + cCodClasse);
			
			// se for nacional - mandar cod de barras e portador
			if (cTipo != "SIM"){				
				var cCodBarras	= constraints[25].getInitialValue();
				log.info("DATASET  - dsCriaTituloProtheus - constraint - CodBarras: " + cCodBarras);
				
				var cCodPortador	= constraints[26].getInitialValue();
				log.info("DATASET  - dsCriaTituloProtheus - constraint - CodPortador: " + cCodPortador);

				// Invoca o servico
				//var retorno = service.INCPAG(cdEmpPag, cdFilial, cdPrefixo, cdTipo, cdNatur, cdFornec, cdLojaFornec, dtvenc,valor, cdHistorico, cdCcusto, cdItemContab, cdMoeda, cdBanco, cdAgencia, cdConta, cdvalorMulta, cdvalorJuros, cdvalorCMon, cdvalorTaxas, numTitulo, cTipo, cRetencao,cAcrescimo,cDecrescimo,cCodBarras,cCodPortador);
				// TROCADO - ENVIANDO O cvalor - formato string
				var retorno = service.INCPAG(cdEmpPag, cdFilial, cdPrefixo, cdTipo, cdNatur, cdFornec, cdLojaFornec, dtvenc,cValor, cdHistorico, cdCcusto, cdItemContab, cdMoeda, cdBanco, cdAgencia, cdConta, cdvalorMulta, cdvalorJuros, cdvalorCMon, cdvalorTaxas, numTitulo, cTipo, cRetencao,cAcrescimo,cDecrescimo,cCodBarras,cCodPortador,cCodClasse);
				log.info ("DATASET - dsCriaTituloProtheus - retornio IF tipo NAO - nacional:" + retorno);
			}		
			else{
				// se for internacional
				// Invoca o servico
				//var retorno = service.INCPAG(cdEmpPag, cdFilial, cdPrefixo, cdTipo, cdNatur, cdFornec, cdLojaFornec, dtvenc,valor, cdHistorico, cdCcusto, cdItemContab, cdMoeda, cdBanco, cdAgencia, cdConta, cdvalorMulta, cdvalorJuros, cdvalorCMon, cdvalorTaxas, numTitulo, cTipo, cRetencao,cAcrescimo,cDecrescimo,"","");
				// TROCADO - ENVIANDO O cvalor - formato string
				var retorno = service.INCPAG(cdEmpPag, cdFilial, cdPrefixo, cdTipo, cdNatur, cdFornec, cdLojaFornec, dtvenc,cValor, cdHistorico, cdCcusto, cdItemContab, cdMoeda, cdBanco, cdAgencia, cdConta, cdvalorMulta, cdvalorJuros, cdvalorCMon, cdvalorTaxas, numTitulo, cTipo, cRetencao,cAcrescimo,cDecrescimo,"","",cCodClasse);
				log.info ("DATASET - dsCriaTituloProtheus - retornio IF tipo SIM - internacional:" + retorno);
			}
			
			log.info ("DATASET - dsCriaTituloProtheus - constraint - PTO 10!!!!!!:" + retorno);
			var arrayListaTitulo = retorno.getLISTIPAG();
		    
			log.info ("DATASET - dsCriaTituloProtheus - constraint - PTO 11:" + arrayListaTitulo);
		    			
			for (var i = 0; i < arrayListaTitulo.length; i++) {
		  	
				log.info ("DATASET - dsCriaTituloProtheus - constraint - PTO 12.1");
				var r = arrayListaTitulo[i];
				
				newDataset.addRow(new Array(r.getCF_MENRET(), r.getCF_NUMTIT(),r.getCF_INSS(),r.getCF_ISS(), r.getCF_IRRF(), r.getCF_CSLL(), r.getCF_PIS(), r.getCF_COFINS(), r.getCF_VALLIQ()));
				log.info ("DATASET    - dsCriaTituloProtheus - constraint - PTO 12.3");
				log.info ("r.getCF_MENRET(): " + r.getCF_MENRET() +
						  "r.getCF_NUMTIT(): " + r.getCF_NUMTIT() +
						  "r.getCF_INSS(): " + r.getCF_INSS() +
						  "r.getCF_ISS(): " + r.getCF_ISS() +
						  "r.getCF_IRRF(): " + r.getCF_IRRF() +
						  "r.getCF_CSLL(): " + r.getCF_CSLL() +
						  "r.getCF_PIS(): " + r.getCF_PIS()	+
						  "r.getCF_COFINS(): " + r.getCF_COFINS()	+
						  "r.getCF_VALLIQ(): " + r.getCF_VALLIQ()	);
			}
		} // constraints
		
	} // try
	catch(error) {
		log.info ("DATASET  - dsCriaTituloProtheus - constraint - PTO 13:" + error.message);
		newDataset.addRow(new Array("erro",error.message,"erro","erro","erro","erro","erro","erro","erro")); 
	}
	
	log.info ("DATASET  - dsCriaTituloProtheus - constraint - PTO 14 - antes do return newDataset");
	
	return newDataset;
	
}
