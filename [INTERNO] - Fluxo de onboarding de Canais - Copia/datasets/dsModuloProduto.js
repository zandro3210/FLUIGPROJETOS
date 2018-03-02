function createDataset(fields, constraints, sortFields) {
	var product = getProduct(constraints);
	
	if(product == null) return null;
	
	var modules = getModules(product);
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("MODULO");
	
	for(var i=0; i<modules.length; i++){
		dataset.addRow([modules[i]]);
	}
	
	return dataset;
}

/**
 * Retorna o valor da constraint produto.
 * @param constraints
 * @returns String.
 */
function getProduct(constraints){
	if(constraints == null || constraints.length == 0 || constraints[0].fieldName.toLowerCase() != "produto"){
		log.error("Constraint produto deve ser informada!");
		return null;
	}
	else return constraints[0].initialValue;
}

/**
 * Retorna os modulos de acordo com o produto informado.
 * @param product: nome do produto.
 * @returns Array.
 */
function getModules(product){
	if(product == "Protheus") return getModulesOfProtheus();
	else if(product == "RM") return getModulesOfRm();
	else if(product == "Datasul" || product == "Logix") return getModulesOfDatasulOrLogix();
	else if(product == "Fluig") return getModulesOfFluig();
	else if(product == "GoodData") return getModulesOfGoodData();
	else if(product == "Outros") return getModulesOfOther();
}

function getModulesOfProtheus(){
	var modules = [];
	
	modules.push('Controladoria');
	modules.push('Finanças');
	modules.push('PCO');
	modules.push('Viagens / Reserve');
	modules.push('Fiscal');
	modules.push('Compras');
	modules.push('Recebimento');
	modules.push('Estoque');
	modules.push('Vendas');
	modules.push('Faturamento');
	modules.push('PMS');
	modules.push('CRM Geral');
	modules.push('CRM Vendas');
	modules.push('Call Center');
	modules.push('Desenvolvimento');
	modules.push('uMov.me');
	modules.push('Colaboração');
	modules.push('Marketplace');
	modules.push('Tecnologia');
	modules.push('S&OP');
	modules.push('PCP');
	modules.push('MPS');
	modules.push('MRP');
	modules.push('CRP');
	modules.push('APS');
	modules.push('Man.Ativos');
	modules.push('Qualidade');
	modules.push('DPR');
	modules.push('DRP');
	modules.push('Custos');
	modules.push('TMS');
	modules.push('WMS');
	modules.push('ACD');
	modules.push('Sara');
	modules.push('OMS');
	modules.push('GFE');
	modules.push('Importação');
	modules.push('Exportação');
	modules.push('Cambio');
	modules.push('Siscoserv');
	modules.push('Drawback');
	modules.push('Retaguarda');
	modules.push('PDV');
	modules.push('Dispostivos (TEF, SAT, etc)');
	modules.push('Mobilidade');
	modules.push('e-Commerce');
	modules.push('Fiscal');
	modules.push('DMS');
	modules.push('PLS - Protheus');
	modules.push('Totvs HIS');
	modules.push('Serviços');
	modules.push('Gestão de Contratos');
	modules.push('Turismo');
	modules.push('Juridico');
	modules.push('Spub-Gestão Compras Públicas');
	modules.push('Spub-Control.Finanças');
	modules.push('Spub-Vida Funcional');
	modules.push('Spub-Orçamento');
	modules.push('Folha');
	modules.push('Ponto');
	modules.push('Demais módulos RH');
	modules.push('Outros - Especificar');

	return modules;
}

function getModulesOfRm(){
	var modules = [];

	modules.push('Controladoria');
	modules.push('Finanças');
	modules.push('Orçamento');
	modules.push('Viagens / Reserve');
	modules.push('Fiscal');
	modules.push('Compras');
	modules.push('Recebimento');
	modules.push('Estoque');
	modules.push('Vendas');
	modules.push('Faturamento');
	modules.push('Obras');
	modules.push('TIN');
	modules.push('TOP');
	modules.push('Portais - C&P');
	modules.push('Materiais - C&P');
	modules.push('CRM Geral');
	modules.push('CRM Vendas');
	modules.push('Desenvolvimento');
	modules.push('uMov.me');
	modules.push('Colaboração');
	modules.push('Marketplace');
	modules.push('Tecnologia');
	modules.push('S&OP');
	modules.push('PCP');
	modules.push('MPS');
	modules.push('MRP');
	modules.push('CRP');
	modules.push('APS');
	modules.push('Man.Ativos');
	modules.push('Qualidade');
	modules.push('DPR');
	modules.push('DRP');
	modules.push('Custos');
	modules.push('TMS');
	modules.push('WMS');
	modules.push('Coleta de dados');
	modules.push('Embarque');
	modules.push('GFE');
	modules.push('Importação');
	modules.push('Exportação');
	modules.push('Cambio');
	modules.push('Siscoserv');
	modules.push('Drawback');
	modules.push('e-Commerce');
	modules.push('GCH');
	modules.push('RM Saúde');
	modules.push('Educacional');
	modules.push('Gestão de Contratos');
	modules.push('Folha');
	modules.push('Ponto');
	modules.push('RH - Demais módulos');
	modules.push('Outros - Especificar');

	return modules;
}

function getModulesOfDatasulOrLogix(){
	var modules = [];

	modules.push('Controladoria');
	modules.push('Finanças');
	modules.push('Orçamento');
	modules.push('Viagens / Reserve');
	modules.push('Fiscal');
	modules.push('Compras');
	modules.push('Recebimento');
	modules.push('Estoque');
	modules.push('Vendas');
	modules.push('Faturamento');
	modules.push('CRM - Geral');
	modules.push('CRM - Vendas');
	modules.push('Desenvolvimento');
	modules.push('uMov.me');
	modules.push('Colaboração');
	modules.push('Marketplace');
	modules.push('Tecnologia');
	modules.push('S&OP');
	modules.push('PCP');
	modules.push('MPS');
	modules.push('MRP');
	modules.push('CRP');
	modules.push('APS');
	modules.push('Man.Ativos');
	modules.push('Qualidade');
	modules.push('DPR');
	modules.push('DRP');
	modules.push('Custos');
	modules.push('TMS');
	modules.push('WMS');
	modules.push('Coleta de dados');
	modules.push('Sara');
	modules.push('Embarque');
	modules.push('GFE');
	modules.push('Importação');
	modules.push('Exportação');
	modules.push('Cambio');
	modules.push('Siscoserv');
	modules.push('Drawback');
	modules.push('GPS - Datasul');
	modules.push('Gestão de Contratos');
	modules.push('Folha');
	modules.push('Ponto');
	modules.push('RH - Demais módulos');
	modules.push('Outros - Especificar');

	return modules;
}

function getModulesOfFluig(){
	log.info('modules fluig');
	var modules = [];

	modules.push('Identity');
	modules.push('BPM');
	modules.push('ECM');
	modules.push('WCM');
	modules.push('Analytics');
	modules.push('ESB');
	modules.push('LMS');
	
	log.info(modules);
	log.info('@mod');
	
	return modules;
}

function getModulesOfGoodData(){
	var modules = [];

	modules.push('Smart Analytics');
	modules.push('Customizações');
	
	return modules;
}

function getModulesOfOther(){
	var modules = [];

	modules.push('Outros - Especificar');
	
	return modules;
}