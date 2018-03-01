function createDataset(fields, constraints, sortFields) {
	// dsParamAmbFormWkf.js

	var dataset = DatasetFactory.getDataset("pass_validate", null, null, null);
	var json = dataset.getValue(0, "USER");
	var obj = JSON.parse(json);

	// Invoca o servico
	var codUsuario = obj.user;
	var senha = obj.pass;
	
	
	var newDataset = DatasetBuilder.newDataset();
	/*1*/ newDataset.addColumn("login");
	/*2*/ newDataset.addColumn("matricula");
	/*3*/ newDataset.addColumn("password");
	
	// colocar mais parametros abaixo do ultimo
	/*4*/ newDataset.addColumn("emailTeste");  // ainda nao usado
	/*5*/ newDataset.addColumn("pastaOrigem"); // solicpagametno, pagtoInternacional, auxilio creche
	/*6*/ newDataset.addColumn("pastaDestino"); // solicpagametno, pagtoInternacional, auxilio creche
	/*7*/ newDataset.addColumn("linkIdentity"); // SegInfTermoResponsabilidade

	
	// em caso de variavel particular de um processo, 
	// pode-se usar a constraint de cod_def_proces
	var ambiente = "";
	var l_ambiente = false;
	var cod_def_proces = "";
	var formAtual = "";
	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
	         if (constraints[i].fieldName == "ambiente") { l_ambiente = true; ambiente = constraints[i].initialValue; }
	         else if (constraints[i].fieldName == "cod_def_proces") { cod_def_proces = constraints[i].initialValue; }
	         else if (constraints[i].fieldName == "formAtual") { formAtual = constraints[i].initialValue; }
	     }
	}
	if (l_ambiente == false){
		retAmbiente = DatasetFactory.getDataset("dsParamAmbSetFormWkf", null, null, null);
		if (retAmbiente){
			if (retAmbiente.values.length > 0){
				ambiente = retAmbiente.getValue(0, "ambiente");
			}
			else {return "erro ao retornar dados de ambiente - nao retorou registro ambiente";}
		}
		else {return "erro ao retornar dados de ambiente - retornou nulo ambiente";}
	}
	
	var arrayAmb = new Array();

	//---------------------------------------
	if (ambiente == "LOCAL"){
		/*1*/ arrayAmb.push ("cristina.poffo");
		/*2*/ arrayAmb.push ("cristina.poffo");
		/*3*/ arrayAmb.push ("123");
		/*4*/ arrayAmb.push ("");
		/*5 - pastaOrigem*/
			if (cod_def_proces == ""){arrayAmb.push ("");}
			else{
				if (cod_def_proces == "SolicitarPagamento"){
					if (formAtual == ""){arrayAmb.push ("37");}
					else {arrayAmb.push(formAtual);}
				}	
				else if (cod_def_proces == "PagtoInternacionalB"){arrayAmb.push ("");}
				else if (cod_def_proces == "ADMGENTE-ReembolsoAuxilioCreche"){arrayAmb.push ("");}
				else if (cod_def_proces == "CST-TombamentoAtividade"){arrayAmb.push ("");}
				else if (cod_def_proces == "CST_pagamentoHE"){
					if (formAtual == ""){arrayAmb.push ("");}
					else {arrayAmb.push(formAtual);}
				}	
				else {arrayAmb.push ("");}
			}
						
		/* fim 5*/

		/*6 - pastaDestino*/
			if (cod_def_proces == ""){arrayAmb.push ("");}
			else{
				if (cod_def_proces == "SolicitarPagamento"){arrayAmb.push ("38");}		
				else if (cod_def_proces == "PagtoInternacionalB"){arrayAmb.push ("");}				
				else if (cod_def_proces == "ADMGENTE-ReembolsoAuxilioCreche"){arrayAmb.push ("");}
				else if (cod_def_proces == "CST-TombamentoAtividade"){arrayAmb.push ("");}
				else if (cod_def_proces == "CST_pagamentoHE"){arrayAmb.push ("");}
				else {arrayAmb.push ("");}
			}
		/* fim 6*/
		
		/*7 - link email */ 
		if (cod_def_proces == ""){arrayAmb.push ("");}
		else{
			if (cod_def_proces == "SegInfTermoResponsabilidade"){arrayAmb.push ("nao tem ");}
			else {arrayAmb.push ("");}
		}
		/* fim 7*/			
	}
	
	//---------------------------------------	
	if (ambiente == "DESENV"){
		/*1*/ arrayAmb.push (codUsuario);
		/*2*/ arrayAmb.push ("intmobtemp");
		/*3*/ arrayAmb.push ("");
		/*4*/ arrayAmb.push ("");
		/*5 - pastaOrigem*/
			if (cod_def_proces == ""){arrayAmb.push ("");}
			else{
				if (cod_def_proces == "SolicitarPagamento"){
					if (formAtual == ""){arrayAmb.push ("1714768");}
					else {arrayAmb.push(formAtual);}
				}	
				else if (cod_def_proces == "PagtoInternacionalB"){arrayAmb.push ("2329071");}
				else if (cod_def_proces == "ADMGENTE-ReembolsoAuxilioCreche"){arrayAmb.push ("2074448");}
				else if (cod_def_proces == "CST-TombamentoAtividade"){arrayAmb.push ("1731954");}
				else if (cod_def_proces == "CST_pagamentoHE"){
					if (formAtual == ""){arrayAmb.push ("2471759");}
					else {arrayAmb.push(formAtual);}
				}	
				else {arrayAmb.push ("");}
			}
		/* fim 5*/
		/*6 - pastaDestino*/
			if (cod_def_proces == ""){arrayAmb.push ("");}
			else{
				if (cod_def_proces == "SolicitarPagamento"){arrayAmb.push ("1711582");}
				else if (cod_def_proces == "PagtoInternacionalB"){arrayAmb.push ("2300288");}
				else if (cod_def_proces == "ADMGENTE-ReembolsoAuxilioCreche"){arrayAmb.push ("2073646");}
				else if (cod_def_proces == "CST-TombamentoAtividade"){arrayAmb.push ("2471606");}
				else if (cod_def_proces == "CST_pagamentoHE"){arrayAmb.push ("2466175");}
				else {arrayAmb.push ("");}
			}
		/* fim 6*/
		/*7 - link email */ 
		if (cod_def_proces == ""){arrayAmb.push ("");}
		else{
			if (cod_def_proces == "SegInfTermoResponsabilidade"){arrayAmb.push ("nao tem ");}
			else {arrayAmb.push ("");}
		}
		/* fim 7*/			
	}
	
	//---------------------------------------
	else if (ambiente == "PREFLUIG14"){
		
		/*1*/ arrayAmb.push ("cristina.poffo@totvs.com.br");
		/*2*/ arrayAmb.push ("");
		/*3*/ arrayAmb.push ("");
		/*4*/ arrayAmb.push ("");
		
		/*5 - pastaOrigem*/
			if (cod_def_proces == ""){arrayAmb.push ("");}
			else{
				if (cod_def_proces == "SolicitarPagamento"){
					if (formAtual == ""){arrayAmb.push ("2686260");}
					else {arrayAmb.push(formAtual);}
				}	
				else if (cod_def_proces == "PagtoInternacionalB"){arrayAmb.push ("2329071");}
				else if (cod_def_proces == "ADMGENTE-ReembolsoAuxilioCreche"){arrayAmb.push ("2074448");}
				else if (cod_def_proces == "CST-TombamentoAtividade"){arrayAmb.push ("2358120");}
				else if (cod_def_proces == "CST_pagamentoHE"){
					if (formAtual == ""){arrayAmb.push ("2415345");}
					else {arrayAmb.push(formAtual);}
				}	
				else {arrayAmb.push ("");}
			}
		/* fim 5*/
		/*6 - pastaDestino*/ 
			if (cod_def_proces == ""){arrayAmb.push ("");}
			else{
				if (cod_def_proces == "SolicitarPagamento"){arrayAmb.push ("2366982");}
				else if (cod_def_proces == "PagtoInternacionalB"){arrayAmb.push ("2300288");}
				else if (cod_def_proces == "ADMGENTE-ReembolsoAuxilioCreche"){arrayAmb.push ("2073646");}
				else if (cod_def_proces == "CST-TombamentoAtividade"){arrayAmb.push ("2393037");}
				else if (cod_def_proces == "CST_pagamentoHE"){arrayAmb.push ("2415346");}
				else {arrayAmb.push ("");}
			}
		/* fim 6*/
			
		/*7 - link email */ 
			if (cod_def_proces == ""){arrayAmb.push ("");}
			else{
				if (cod_def_proces == "SegInfTermoResponsabilidade"){arrayAmb.push ("https://tdi.customerfi.com");}
				else {arrayAmb.push ("");}
			}
		/* fim 7*/
	}
	
	//---------------------------------------
	else if (ambiente == "PREFLUIGP12"){
		/*1*/ arrayAmb.push (codUsuario);
		/*2*/ arrayAmb.push ("intmobtemp");
		/*3*/ arrayAmb.push (senha);
		/*4*/ arrayAmb.push ("");
		/*5 - pastaOrigem*/
			if (cod_def_proces == ""){arrayAmb.push ("");}
			else{
				if (cod_def_proces == "SolicitarPagamento"){
					if (formAtual == ""){arrayAmb.push ("2686260");}
					else {arrayAmb.push(formAtual);}
				}	
				else if (cod_def_proces == "PagtoInternacionalB"){arrayAmb.push ("2329071");}
				else if (cod_def_proces == "ADMGENTE-ReembolsoAuxilioCreche"){arrayAmb.push ("2074448");}
				else if (cod_def_proces == "CST-TombamentoAtividade"){arrayAmb.push ("2358120");}
				else if (cod_def_proces == "CST_pagamentoHE"){
					if (formAtual == ""){arrayAmb.push ("2415345");}
					else {arrayAmb.push(formAtual);}
				}	
				else {arrayAmb.push ("");}
			}
		/* fim 5*/
		/*6 - pastaDestino*/ 
			if (cod_def_proces == ""){arrayAmb.push ("");}
			else{
				if (cod_def_proces == "SolicitarPagamento"){arrayAmb.push ("2366982");}
				else if (cod_def_proces == "PagtoInternacionalB"){arrayAmb.push ("2300288");}
				else if (cod_def_proces == "ADMGENTE-ReembolsoAuxilioCreche"){arrayAmb.push ("2073646");}
				else if (cod_def_proces == "CST-TombamentoAtividade"){arrayAmb.push ("2393037");}
				else if (cod_def_proces == "CST_pagamentoHE"){arrayAmb.push ("2415346");}
				else {arrayAmb.push ("");}
			}
		/* fim 6*/
		/*7 - link email */ 
		if (cod_def_proces == ""){arrayAmb.push ("");}
		else{
			if (cod_def_proces == "SegInfTermoResponsabilidade"){arrayAmb.push ("https://p12.customerfi.com");}
			else {arrayAmb.push ("");}
		}
		/* fim 7*/
	}
	
	//---------------------------------------
	else if (ambiente == "PRODUCAO"){
		/*1*/ arrayAmb.push (codUsuario);
		/*2*/ arrayAmb.push ("intmobtemp");
		/*3*/ arrayAmb.push (senha);
		/*4*/ arrayAmb.push ("");
		/*5 - pastaOrigem*/
			if (cod_def_proces == ""){arrayAmb.push ("");}
			else{
				if (cod_def_proces == "SolicitarPagamento"){
						if (formAtual == ""){arrayAmb.push ("2686260");}
						else {arrayAmb.push(formAtual);}
				}		
				else if (cod_def_proces == "PagtoInternacionalB"){arrayAmb.push ("2329071");}
				else if (cod_def_proces == "ADMGENTE-ReembolsoAuxilioCreche"){arrayAmb.push ("2074448");}
				else if (cod_def_proces == "CST-TombamentoAtividade"){arrayAmb.push ("2358120");}
				else if (cod_def_proces == "CST_pagamentoHE"){
					if (formAtual == ""){arrayAmb.push ("2415345");}
					else {arrayAmb.push(formAtual);}
				}	
				else {arrayAmb.push ("");}
			}
		/* fim 5*/
		/*6 - pastaDestino*/ 
			if (cod_def_proces == ""){arrayAmb.push ("");}
			else{
				if (cod_def_proces == "SolicitarPagamento"){arrayAmb.push ("2366982");}
				else if (cod_def_proces == "PagtoInternacionalB"){arrayAmb.push ("2300288");}
				else if (cod_def_proces == "ADMGENTE-ReembolsoAuxilioCreche"){arrayAmb.push ("2073646");}
				else if (cod_def_proces == "CST-TombamentoAtividade"){arrayAmb.push ("2393037");}
				else if (cod_def_proces == "CST_pagamentoHE"){arrayAmb.push ("2415346");}
				else {arrayAmb.push ("");}
			}
		/* fim 6*/
		/*7 - link email */ 
		if (cod_def_proces == ""){arrayAmb.push ("");}
		else{
			if (cod_def_proces == "SegInfTermoResponsabilidade"){arrayAmb.push ("http://app.fluigidentity.com");}
			else {arrayAmb.push ("");}
		}
		/* fim 7*/			
	}

	newDataset.addRow(arrayAmb);
	return newDataset;
}

