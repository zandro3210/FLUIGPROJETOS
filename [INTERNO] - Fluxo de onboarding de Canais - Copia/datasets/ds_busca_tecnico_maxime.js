function createDataset(fields, constraints, sortFields) {

	//desenv
//	var pacote = "_161._93._16._172._7032";
	var pacote = "_197._102._16._172._7032";

	//PRE
	var pacote = "br.com.totvs.wsautoatendimento.wscorp";
	
	var servico = ServiceManager.getService("MaximeUnifAccess");
	var filter = servico.instantiate(pacote + ".LISTA9");
	var unifaccess = servico.instantiate(pacote + ".UNIFACCESS");
	
	log.info("UNIFACCESS:" + unifaccess);
	
	var ws = unifaccess.getUNIFACCESSSOAP();

	log.info("WS:" + ws)
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("areaAtuacao"); 
	newDataset.addColumn("status"); 
	newDataset.addColumn("bairro");
	newDataset.addColumn("centroCusto");
	newDataset.addColumn("celular");
	newDataset.addColumn("cep");
	newDataset.addColumn("clvl");
	newDataset.addColumn("codSeg");
	newDataset.addColumn("nomeSegmento");
	newDataset.addColumn("complemento");
	newDataset.addColumn("coordenador");
	newDataset.addColumn("nomeCoordenador");
	newDataset.addColumn("cpf");
	newDataset.addColumn("dataAdmissao");
	newDataset.addColumn("dataNascimento");
	newDataset.addColumn("drg");
	newDataset.addColumn("nomeDrg");
	newDataset.addColumn("dtdem");
	newDataset.addColumn("email");
	newDataset.addColumn("emiteOs");
	newDataset.addColumn("empresaFilial");
	newDataset.addColumn("empresa");
	newDataset.addColumn("empresaSoft");
	newDataset.addColumn("endereco");
	newDataset.addColumn("estado");
	newDataset.addColumn("fone");
	newDataset.addColumn("ftp");
	newDataset.addColumn("gestor");
	newDataset.addColumn("nomeGestor");
	newDataset.addColumn("itcl");
	newDataset.addColumn("nomeCargo");
	newDataset.addColumn("matriculaRh");
	newDataset.addColumn("mensagemSa9");
	newDataset.addColumn("municipio");
	newDataset.addColumn("nome");
	newDataset.addColumn("pais");
	newDataset.addColumn("nomePais");
	newDataset.addColumn("premio");
	newDataset.addColumn("produto");
	newDataset.addColumn("nomeProduto");
	newDataset.addColumn("regiao");
	newDataset.addColumn("nomeRegiao");
	newDataset.addColumn("rg");
	newDataset.addColumn("segtotvs");
	newDataset.addColumn("senha");
	newDataset.addColumn("tecnico");
	newDataset.addColumn("tp");
	newDataset.addColumn("tipo");
	newDataset.addColumn("user");
	newDataset.addColumn("cadastroPmo");
	
	var cpf = "";
	var email = "STELLA.VILACA@TOTVS.COM.BR";
	if (constraints != null) {
		for(var c in constraints){
			if (constraints[c].getFieldName() == "cpf"){
				cpf = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "email"){
				email = constraints[c].getInitialValue(); 
			}
		}
	}
	
	log.info("FILTER");
	
	filter.setCCEMAIL(email);
	filter.setCCCPF(cpf);
	
	log.info("GET reotrno:" + email + ":" + cpf);
	
	try {
		var retorno = ws.versa9(filter);
		var lista = retorno.getRETLSTSA9();
		
		for (var i=0;i<lista.size();i++) {
			var r = lista.get(i);
			retorno = r;
			if (r.getCATIVO() == "S") { 
				break;
			}
		}
		
		log.info("ds_busca_tecnico_maxime.js:" + retorno.getCTECNICO() + ":" + retorno.getCNOME());
		
		if (retorno.getCTECNICO() != "" && retorno.getCTECNICO() != null) {
			
			var c1 = DatasetFactory.createConstraint("campo", "YA_SIGLA", "YA_SIGLA", ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint("valor", retorno.getCPAIS(), retorno.getCPAIS(), ConstraintType.MUST);
		    var ds_pais = DatasetFactory.getDataset("ds_pais_maxime", null, new Array(c1, c2), null);

		    var pais = retorno.getCPAIS();
		    if (ds_pais != null && ds_pais.rowsCount > 0) {
		    	pais = ds_pais.getValue(0, "descricao");
		    }
			
		    var ds_segmento = DatasetFactory.getDataset("ds_segmento_maxime", null, null, null);
		    var segmento = retorno.getCCODSEG();
		    if (ds_segmento != null && ds_segmento.rowsCount > 0) {
		    	for (var i=0;i<ds_segmento.rowsCount;i++) {
		    		
		    		log.info("ds_busca_tecnico_maxime:" + ds_segmento.getValue(i, "codigo") + ":" + retorno.getCCODSEG().trim() + ":");
		    		
		    		if (ds_segmento.getValue(i, "codigo") == retorno.getCCODSEG().trim()) {
		    			log.info("ds_busca_tecnico_maxime: ok: " + ds_segmento.getValue(i, "descricao")); 
		    			segmento = ds_segmento.getValue(i, "descricao");
		    		}
		    	}
		    }
		    
		    var ds_drg = DatasetFactory.getDataset("ds_drg_maxime", null, null, null);
		    var drg = retorno.getCDRG();
		    if (ds_drg != null && ds_drg.rowsCount > 0) {
		    	for (var i=0;i<ds_drg.rowsCount;i++) {
		    		
		    		log.info("ds_busca_tecnico_maxime:" + ds_drg.getValue(i, "codigo") + ":" + retorno.getCDRG().trim() + ":");
		    		
		    		if (ds_drg.getValue(i, "codigo") == retorno.getCDRG().trim()) {
		    			log.info("ds_busca_tecnico_maxime: ok: " + ds_drg.getValue(i, "descricao")); 
		    			drg = ds_drg.getValue(i, "descricao");
		    		}
		    	}
		    }
		    
			var c3 = DatasetFactory.createConstraint("campo", "A9_TECNICO", "A9_TECNICO", ConstraintType.MUST);
			var c4 = DatasetFactory.createConstraint("valor", retorno.getCREGIAO(), retorno.getCREGIAO(), ConstraintType.MUST);
		    var ds_regiao = DatasetFactory.getDataset("ds_regiao_maxime", null, new Array(c3, c4), null);

		    var regiao = retorno.getCREGIAO();
		    if (ds_regiao != null && ds_regiao.rowsCount > 0) {
		    	regiao = ds_regiao.getValue(0, "nome");
		    }
		    
		    var ds_cargo = DatasetFactory.getDataset("ds_tipo_recurso_maxime", null, null, null);
		    var cargo = retorno.getCITCT();
		    if (ds_cargo != null && ds_cargo.rowsCount > 0) {
		    	for (var i=0;i<ds_cargo.rowsCount;i++) {
		    		
		    		log.info("ds_busca_tecnico_maxime:" + ds_cargo.getValue(i, "codigo").trim() + ":" + retorno.getCITCT().trim() + ":");
		    		
		    		if (ds_cargo.getValue(i, "codigo").trim() == retorno.getCITCT().trim()) {
		    			log.info("ds_busca_tecnico_maxime: ok: " + ds_cargo.getValue(i, "descricao")); 
		    			cargo = ds_cargo.getValue(i, "descricao");
		    		}
		    	}
		    }
		    
		    var ds_produto = DatasetFactory.getDataset("ds_produto_marca_maxime", null, null, null);
		    var produto = retorno.getSPRODUTO();
		    if (ds_produto != null && ds_produto.rowsCount > 0) {
		    	for (var i=0;i<ds_produto.rowsCount;i++) {
		    		
		    		log.info("ds_busca_tecnico_maxime:" + ds_produto.getValue(i, "codigo") + ":" + retorno.getSPRODUTO().trim() + ":");
		    		
		    		if (ds_produto.getValue(i, "codigo") == retorno.getSPRODUTO().trim()) {
		    			log.info("ds_busca_tecnico_maxime: ok: " + ds_produto.getValue(i, "descricao")); 
		    			produto = ds_produto.getValue(i, "descricao");
		    		}
		    	}
		    }
			
			newDataset.addRow(new Array(retorno.getCAREATU(), 
				    retorno.getCATIVO(), 
				    retorno.getCBAIRRO(), 
				    retorno.getCCCUSTO(), 
				    retorno.getCCELULAR(), 
				    retorno.getCCEP(), 
				    retorno.getCCLVL(), 
				    retorno.getCCODSEG(), 
				    segmento,
				    retorno.getCCOMPLEM(), 
				    retorno.getCCOORD(), 
				    retorno.getCDCOORD(), 
				    retorno.getCCPF(), 
				    formatDate(retorno.getCDATADMS()), 
				    formatDate(retorno.getCDATANASC()), 
				    retorno.getCDRG(), 
				    drg,
				    retorno.getCDTDEM(), 
				    retorno.getCEMAIL(), 
				    retorno.getCEMITOS(), 
				    retorno.getCEMPFIL(), 
				    retorno.getCEMPRESA(), 
				    retorno.getCEMPSOFT(), 
				    retorno.getCENDERECO(), 
				    retorno.getCESTADO(), 
				    retorno.getCFONE(), 
				    retorno.getCFTP(), 
				    retorno.getCGESTOR(), 
				    retorno.getCDSUPER(), 
				    retorno.getCITCT(), 
				    cargo,
				    retorno.getCMATRRH(), 
				    retorno.getCMSGSA9(), 
				    retorno.getCMUNICIP(), 
				    retorno.getCNOME(), 
				    retorno.getCPAIS(), 
				    pais,
				    retorno.getCPREMIO(), 
				    retorno.getSPRODUTO(), 
				    produto,
				    retorno.getCREGIAO(), 
				    regiao, 
				    retorno.getCRG(), 
				    retorno.getCSEGTOTVS(), 
				    retorno.getCSENHA(), 
				    retorno.getCTECNICO(), 
				    retorno.getCTP(), 
				    retorno.getCTIPO(), 
				    retorno.getCUSER(), 
				    retorno.getLCADPMO()));
			
		}
		
		
	}catch(e){   
		newDataset.addRow(new Array(e, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""));
		log.info("ERROR:" + e);
	}
	
	return newDataset;
	
	function formatDate(date) {
		var d = date.getDay();
		var m = date.getMonth();
		var y = date.getYear();
		
		if (d < 10) { d = "0" + d; }
		if (m < 10) { m = "0" + m; }
		
		return d + "/" + m + "/" + y;
		
	}
	
}
