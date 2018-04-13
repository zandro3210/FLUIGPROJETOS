function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("code");
	dataset.addColumn("message");
	
	var tempDir = java.lang.System.getProperty("java.io.tmpdir");
	var file = new java.io.File(tempDir + "BP_BASE_CONSOLIDADA.CSV");
	var out = new java.io.PrintWriter(new java.io.BufferedWriter(new java.io.FileWriter(file)));
	var row = null;
	var parametrosDS = null;
	var planejamentosDS = null;
	var earsDS = null;
	var earSegmentosDS = null;
	var adquiridasDS = null;
	var adquiridasUnidadeDS = null;
	var canaisDS = null;
	var ears = [];
	var adquiridas = [];
	var gooddataUsername = null;
	var gooddataPassword = null;
	var gooddataUrl = null;
	var constraints = null;
	var active = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	
	var createRow = function(){
		var row = [];
		for(var i = 0; i < 34; i++){
			row.push("");
		}
		return row;
	}
	
	var addRow = function(out,row){
		out.write(row.join(";")+"\n");
	}
	
	/* consulta de parametros */
	constraints = [];
	constraints.push(active);
	parametrosDS = DatasetFactory.getDataset("ds_bp_param_alteracao_plano", null, constraints, null);
	
	if(parametrosDS == null || parametrosDS.rowsCount == 0){
		throw "Favor preencha a parametrização de integração com o GoodData no formulário BP - Parâmetros Alteração Plano";
	}
	
	gooddataUsername = parametrosDS.getValue(0,"gooddata_username");
	gooddataPassword = parametrosDS.getValue(0,"gooddata_password");
	gooddataUrl = parametrosDS.getValue(0,"gooddata_url_upload");
	
	/* cabecalho */
	
	row = createRow();
	
	row[0] = "ANO REFERENCIA";
	row[1] = "UNIDADE";
	row[2] = "VERTICAL";
	row[3] = "SEGMENTO";
	row[4] = "NOME EAR";
	row[5] = "ATUA?";
	row[6] = "VALOR ESFORÇO";
	row[7] = "VENDAS POR EAR";
	row[8] = "NOME CANAL";
	row[9] = "TIPO CANAL";
	row[10] = "REGIAO CANAL";
	row[11] = "ORIGEM CANAL";
	row[12] = "META CANAL ($)";
	row[13] = "MÊS REFER";
	row[14] = "TIPO CLIENTE";
	row[15] = "# INTEIRA";
	row[16] = "$ INTEIRA";
	row[17] = "$ INTEIRA ACUMULADO";
	row[18] = "$ OUTROS";
	row[19] = "$ OUTROS ACUMULADO";
	row[20] = "MIX BASE/NOVOS";
	row[21] = "TICKET MEDIO";
	row[22] = "# OPORTUNIDADES";
	row[23] = "TAXA DE CONVERSÃO";
	row[24] = "# VENDAS";
	row[25] = "META CDU s/PLAT";
	row[26] = "$ ESTIMADO PLAT";
	row[27] = "FOCO SOW";
	row[28] = "# CLIENTES POR FOCO";
	row[29] = "$ CDU POR FOCO";
	row[30] = "EMPRESA ADQUIRIDA";
	row[31] = "$ ADESÃO/CDU";
	row[32] = "$ RECORRENTE";
	row[33] = "$ PLANO ADQUIRIDAS";
	
	addRow(out,row);
	
	
	/* consulta EARs */
	constraints = [];
	constraints.push(active);
	earsDS = DatasetFactory.getDataset("ds_bp_ears", null, constraints, null);
	if(earsDS != null && earsDS.rowsCount > 0){
		var metadataId = null;
		var metadataVersion = null;
		var tablename = DatasetFactory.createConstraint("tablename", "segmentos", "segmentos", ConstraintType.MUST);
		for(var i = 0; i < earsDS.rowsCount; i++){
			metadataId = earsDS.getValue(i,"metadata#id");
			metadataVersion = earsDS.getValue(i,"metadata#version");
			constraints = [];
			constraints.push(active);
			constraints.push(tablename);
			constraints.push(DatasetFactory.createConstraint("metadata#id", metadataId, metadataId, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("metadata#version", metadataVersion, metadataVersion, ConstraintType.MUST));
			earSegmentosDS = DatasetFactory.getDataset("ds_bp_ears", null, constraints, null);
			if(earSegmentosDS != null && earSegmentosDS.rowsCount > 0){
				for(var j = 0; j < earSegmentosDS.rowsCount; j++){
					var nome = earsDS.getValue(i,"nm_ear");
					ears.push({
						"nome" : nome,
						"unidade" : earSegmentosDS.getValue(j,"unidade"),
						"vertical" : earSegmentosDS.getValue(j,"vertical"),
						"segmento" : earSegmentosDS.getValue(j,"segmento"),
						"atua" : earSegmentosDS.getValue(j,"atua"),
						"esforco" : earSegmentosDS.getValue(j,"esforco"),
						"vendas" : earSegmentosDS.getValue(j,"vendas")
					});
				}
			}
		}
	}
	
	/* consulta adquiridas */
	constraints = [];
	constraints.push(active);
	adquiridasDS = DatasetFactory.getDataset("ds_bp_adquiridas", null, constraints, null);
	if(adquiridasDS != null && adquiridasDS.rowsCount > 0){
		var metadataId = null;
		var metadataVersion = null;
		var tablename = DatasetFactory.createConstraint("tablename", "adquiridas", "adquiridas", ConstraintType.MUST);
		for(var i = 0; i < adquiridasDS.rowsCount; i++){
			metadataId = adquiridasDS.getValue(i,"metadata#id");
			metadataVersion = adquiridasDS.getValue(i,"metadata#version");
			constraints = [];
			constraints.push(active);
			constraints.push(tablename);
			constraints.push(DatasetFactory.createConstraint("metadata#id", metadataId, metadataId, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("metadata#version", metadataVersion, metadataVersion, ConstraintType.MUST));
			adquiridasUnidadeDS = DatasetFactory.getDataset("ds_bp_adquiridas", null, constraints, null);
			if(adquiridasUnidadeDS != null && adquiridasUnidadeDS.rowsCount > 0){
				for(var j = 0; j < adquiridasUnidadeDS.rowsCount; j++){
					var unidade = adquiridasDS.getValue(i,"nm_unidade");
					adquiridas.push({
						"nm_unidade" : unidade,
						"nm_empresa_adq" : adquiridasUnidadeDS.getValue(j,"nm_empresa_adq"),
						"vlr_ticket_medio_adq_base" : adquiridasUnidadeDS.getValue(j,"vlr_ticket_medio_adq_base"),
						"vlr_ticket_medio_adq_novo" : adquiridasUnidadeDS.getValue(j,"vlr_ticket_medio_adq_novo"),
						"qtd_oport_adq_base" : adquiridasUnidadeDS.getValue(j,"qtd_oport_adq_base"),
						"qtd_oport_adq_novo" : adquiridasUnidadeDS.getValue(j,"qtd_oport_adq_novo"),
						"tx_conversao_adq_base" : adquiridasUnidadeDS.getValue(j,"tx_conversao_adq_base"),
						"tx_conversao_adq_novo" : adquiridasUnidadeDS.getValue(j,"tx_conversao_adq_novo"),
						"qtd_vendas_adq_base" : adquiridasUnidadeDS.getValue(j,"qtd_vendas_adq_base"),
						"qtd_vendas_adq_novo" : adquiridasUnidadeDS.getValue(j,"qtd_vendas_adq_novo"),
						"vlr_meta_adq_base" : adquiridasUnidadeDS.getValue(j,"vlr_meta_adq_base"),
						"vlr_meta_adq_novo" : adquiridasUnidadeDS.getValue(j,"vlr_meta_adq_novo"),
						"vlr_total_adq" : adquiridasUnidadeDS.getValue(j,"vlr_total_adq"),
						"exported" : false
					});
				}
			}
		}
	}
	
	/* consulta planejamentos */
	constraints = [];
	constraints.push(active);
	
	planejamentosDS = DatasetFactory.getDataset("ds_bp_planejamentos", null, constraints, null);
	if(planejamentosDS != null && planejamentosDS.rowsCount > 0){
		var metadataId = null;
		var metadataVersion = null;
		var anoReferencia = null;
		var unidade = null;
		var vertical = null;
		var segmento = null;
		var mesReferencia = null;
		for(var i = 0; i < planejamentosDS.rowsCount; i++){
			metadataId = planejamentosDS.getValue(i,"metadata#id");
			metadataVersion = planejamentosDS.getValue(i,"metadata#version");
			anoReferencia = planejamentosDS.getValue(i,"ano_referencia");
			unidade = planejamentosDS.getValue(i,"nm_unidade");
			vertical = planejamentosDS.getValue(i,"nm_vertical");
			segmento = planejamentosDS.getValue(i,"nm_segmento");
			
			/* criacao das linhas para EARs */
			for(var j = 0; j < ears.length; j++){
				if(ears[j].unidade == unidade && ears[j].vertical == vertical && ears[j].segmento == segmento){
					row = createRow();
					
					row[0] = anoReferencia;
					row[1] = unidade;
					row[2] = vertical;
					row[3] = segmento;
					row[4] = ears[j].nome;
					row[5] = ears[j].atua == "S" ? "SIM" : "NÃO";
					row[6] = "" + (parseFloat(ears[j].esforco.replaceAll(",","."))/100);
					row[7] = ears[j].vendas;
					
					addRow(out,row);
				}
			}
			
			/* criacao das linhas para adquiridas */
			for(var j = 0; j < adquiridas.length; j++){
				if(!adquiridas[j].exported && adquiridas[j].nm_unidade == unidade){
					var addTotalAdquiridas = true;
					if(adquiridas[j].vlr_ticket_medio_adq_base != ""){
						row = createRow();
						
						row[0] = anoReferencia;
						row[1] = unidade;
						row[14] = "BASE";
						row[30] = adquiridas[j].nm_empresa_adq;
						row[21] = adquiridas[j].vlr_ticket_medio_adq_base.replaceAll("\\.","").replaceAll(",",".");
						if(adquiridas[j].qtd_oport_adq_base != ""){
							row[22] = adquiridas[j].qtd_oport_adq_base.replaceAll("\\.","").replaceAll(",",".");
						}
						if(adquiridas[j].tx_conversao_adq_base != ""){
							row[23] = "" + (parseFloat(adquiridas[j].tx_conversao_adq_base.replaceAll("\\.","").replaceAll(",","."))/100);
						}
						if(adquiridas[j].qtd_vendas_adq_base != ""){
							row[24] = adquiridas[j].qtd_vendas_adq_base.replaceAll("\\.","").replaceAll(",",".");
						}
						if(adquiridas[j].vlr_meta_adq_base != ""){
							row[25] = adquiridas[j].vlr_meta_adq_base.replaceAll("\\.","").replaceAll(",",".");
						}
						if(adquiridas[j].vlr_total_adq != ""){
							row[33] = adquiridas[j].vlr_total_adq.replaceAll("\\.","").replaceAll(",",".");
							addTotalAdquiridas = false;
						}
						addRow(out,row);
					}
					if(adquiridas[j].vlr_ticket_medio_adq_novo != ""){
						row = createRow();
						
						row[0] = anoReferencia;
						row[1] = unidade;
						row[14] = "NOVOS";
						row[30] = adquiridas[j].nm_empresa_adq;
						row[21] = adquiridas[j].vlr_ticket_medio_adq_novo.replaceAll("\\.","").replaceAll(",",".");
						if(adquiridas[j].qtd_oport_adq_novo != ""){
							row[22] = adquiridas[j].qtd_oport_adq_novo.replaceAll("\\.","").replaceAll(",",".");
						}
						if(adquiridas[j].tx_conversao_adq_novo != ""){
							row[23] = "" + (parseFloat(adquiridas[j].tx_conversao_adq_novo.replaceAll("\\.","").replaceAll(",","."))/100);
						}
						if(adquiridas[j].qtd_vendas_adq_novo != ""){
							row[24] = adquiridas[j].qtd_vendas_adq_novo.replaceAll("\\.","").replaceAll(",",".");
						}
						if(adquiridas[j].vlr_meta_adq_novo != ""){
							row[25] = adquiridas[j].vlr_meta_adq_novo.replaceAll("\\.","").replaceAll(",",".");
						}
						if(addTotalAdquiridas && adquiridas[j].vlr_total_adq != ""){
							row[33] = adquiridas[j].vlr_total_adq.replaceAll("\\.","").replaceAll(",",".");
						}
						addRow(out,row);
					}
					adquiridas[j].exported = true;
				}
			}
			
			/* criacao das linhas para canais */
			constraints = [];
			constraints.push(active);
			constraints.push(DatasetFactory.createConstraint("metadata#id", metadataId, metadataId, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("metadata#version", metadataVersion, metadataVersion, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("tablename", "canais", "canais", ConstraintType.MUST));
			
			canaisDS = DatasetFactory.getDataset("ds_bp_planejamentos", null, constraints, null);
			if(canaisDS != null && canaisDS.rowsCount > 0) {
				for(var j = 0; j < canaisDS.rowsCount; j++){
					row = createRow();
					
					row[0] = anoReferencia;
					row[1] = unidade;
					row[2] = vertical;
					row[3] = segmento;
					row[8] = canaisDS.getValue(j,"nm_canal");
					row[9] = canaisDS.getValue(j,"tipo_canal");
					row[10] = canaisDS.getValue(j,"regiao_canal");
					row[11] = canaisDS.getValue(j,"origem_canal");
					
					if(canaisDS.getValue(j,"vlr_meta_canal") != ""){
						row[12] = canaisDS.getValue(j,"vlr_meta_canal").replaceAll("\\.","").replaceAll(",",".");
					}
					
					addRow(out,row);
				}
			}
			
			/* criacao das linhas para plano saas */
			constraints = [];
			constraints.push(active);
			constraints.push(DatasetFactory.createConstraint("metadata#id", metadataId, metadataId, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("metadata#version", metadataVersion, metadataVersion, ConstraintType.MUST));
			constraints.push(DatasetFactory.createConstraint("tablename", "plano_saas", "plano_saas", ConstraintType.MUST));
			
			saasDS = DatasetFactory.getDataset("ds_bp_planejamentos", null, constraints, null);
			if(saasDS != null && saasDS.rowsCount > 0) {
				for(var j = 0; j < saasDS.rowsCount; j++){
					row = createRow();
					
					row[0] = anoReferencia;
					row[1] = unidade;
					row[2] = vertical;
					row[3] = segmento;
					mesReferencia = saasDS.getValue(j,"ano_mes_ref");
					mesReferencia = mesReferencia.substr(3,4) + "-" + mesReferencia.substr(0,2); 
					row[13] = mesReferencia;
					row[14] = "BASE";
					if(saasDS.getValue(j,"qtd_vendas_int_base") != ""){
						row[15] = saasDS.getValue(j,"qtd_vendas_int_base").replaceAll("\\.","").replaceAll(",",".");
					}
					if(saasDS.getValue(j,"vlr_vendas_int_base") != ""){
						row[16] = saasDS.getValue(j,"vlr_vendas_int_base").replaceAll("\\.","").replaceAll(",",".");
					}
					
					addRow(out,row);
				}

				for(var j = 0; j < saasDS.rowsCount; j++){
					row = createRow();
					
					row[0] = anoReferencia;
					row[1] = unidade;
					row[2] = vertical;
					row[3] = segmento;
					mesReferencia = saasDS.getValue(j,"ano_mes_ref");
					mesReferencia = mesReferencia.substr(3,4) + "-" + mesReferencia.substr(0,2); 
					row[13] = mesReferencia;
					row[14] = "NOVOS";
					if(saasDS.getValue(j,"qtd_vendas_int_novo") != ""){
						row[15] = saasDS.getValue(j,"qtd_vendas_int_novo").replaceAll("\\.","").replaceAll(",",".");
					}
					if(saasDS.getValue(j,"vlr_vendas_int_novo") != ""){
						row[16] = saasDS.getValue(j,"vlr_vendas_int_novo").replaceAll("\\.","").replaceAll(",",".");
					}
					addRow(out,row);
				}
				
				for(var j = 0; j < saasDS.rowsCount; j++){
					row = createRow();
					
					row[0] = anoReferencia;
					row[1] = unidade;
					row[2] = vertical;
					row[3] = segmento;
					mesReferencia = saasDS.getValue(j,"ano_mes_ref");
					mesReferencia = mesReferencia.substr(3,4) + "-" + mesReferencia.substr(0,2); 
					row[13] = mesReferencia;
					row[14] = "OUTROS";
					if(saasDS.getValue(j,"vlr_vendas_outros") != ""){
						row[18] = saasDS.getValue(j,"vlr_vendas_outros").replaceAll("\\.","").replaceAll(",",".");
					}
					addRow(out,row);
				}
			}
			
			/* criacao das linhas para plano cdu */
			var addPTFI = true;
			if(planejamentosDS.getValue(i, "vlr_ticket_medio_base") != ""){
				row = createRow();
				
				row[0] = anoReferencia;
				row[1] = unidade;
				row[2] = vertical;
				row[3] = segmento;
				row[14] = "BASE";
				row[21] = planejamentosDS.getValue(i, "vlr_ticket_medio_base").replaceAll("\\.","").replaceAll(",",".");
				if(planejamentosDS.getValue(i, "qtd_oport_base") != ""){
					row[22] = planejamentosDS.getValue(i,"qtd_oport_base").replaceAll("\\.","").replaceAll(",",".");
				}
				if(planejamentosDS.getValue(i, "tx_conversao_base") != ""){
					row[23] = planejamentosDS.getValue(i, "tx_conversao_base").replaceAll("\\.","").replaceAll(",",".");
				}
				if(planejamentosDS.getValue(i, "qtd_vendas_base") != ""){
					row[24] = planejamentosDS.getValue(i,"qtd_vendas_base").replaceAll("\\.","").replaceAll(",",".");
				}
				if(planejamentosDS.getValue(i, "vlr_meta_cdu_base") != ""){
					row[25] = planejamentosDS.getValue(i, "vlr_meta_cdu_base").replaceAll("\\.","").replaceAll(",",".");
				}
				if(planejamentosDS.getValue(i, "vlr_estimado_plat") != ""){
					row[26] = planejamentosDS.getValue(i, "vlr_estimado_plat").replaceAll("\\.","").replaceAll(",",".");
					addPTFI = false;
				}
				addRow(out,row);
			}
			if(planejamentosDS.getValue(i, "vlr_ticket_medio_novo") != ""){
				row = createRow();
				
				row[0] = anoReferencia;
				row[1] = unidade;
				row[2] = vertical;
				row[3] = segmento;
				row[14] = "NOVOS";
				row[21] = planejamentosDS.getValue(i, "vlr_ticket_medio_novo").replaceAll("\\.","").replaceAll(",",".");
				if(planejamentosDS.getValue(i, "qtd_oport_novo") != ""){
					row[22] = planejamentosDS.getValue(i,"qtd_oport_novo").replaceAll("\\.","").replaceAll(",",".");
				}
				if(planejamentosDS.getValue(i, "tx_conversao_novo") != ""){
					row[23] = planejamentosDS.getValue(i, "tx_conversao_novo").replaceAll("\\.","").replaceAll(",",".");
				}
				if(planejamentosDS.getValue(i, "qtd_vendas_novo") != ""){
					row[24] = planejamentosDS.getValue(i,"qtd_vendas_novo").replaceAll("\\.","").replaceAll(",",".");
				}
				if(planejamentosDS.getValue(i, "vlr_meta_cdu_novo") != ""){
					row[25] = planejamentosDS.getValue(i, "vlr_meta_cdu_novo").replaceAll("\\.","").replaceAll(",",".");
				}
				if(addPTFI && planejamentosDS.getValue(i, "vlr_estimado_plat") != ""){
					row[26] = planejamentosDS.getValue(i, "vlr_estimado_plat").replaceAll("\\.","").replaceAll(",",".");
				}
				addRow(out,row);
			}
		}
	}
	out.flush();
	if(out != null) out.close();
	
	/* integracao gooddata */
	var httpclient = new org.apache.commons.httpclient.HttpClient(); 
	var creds = new org.apache.commons.httpclient.UsernamePasswordCredentials(gooddataUsername, gooddataPassword);
	httpclient.getState().setCredentials(org.apache.commons.httpclient.auth.AuthScope.ANY, creds);
	
	var tempurl = gooddataUrl + file.getName();
	var method = new org.apache.jackrabbit.webdav.client.methods.PutMethod(tempurl);
	
	var requestentity = new org.apache.commons.httpclient.methods.InputStreamRequestEntity(new java.io.FileInputStream(file));
	method.setRequestEntity(requestentity);

	// proxy
//	var config = httpclient.getHostConfiguration();
//	config.setProxy("172.16.98.21",8080);
//	var proxyCredentials = new org.apache.commons.httpclient.UsernamePasswordCredentials("", "");
//	httpclient.getState().setProxyCredentials(org.apache.commons.httpclient.auth.AuthScope.ANY, proxyCredentials);
	
	httpclient.getParams().setAuthenticationPreemptive(true);
	httpclient.executeMethod(method);
	
	log.info("httpclient:" + method.getStatusCode());
	
	dataset.addRow(["1","Base do BP enviada para o gooddata"]);

	return dataset;
}function onMobileSync(user) {

}