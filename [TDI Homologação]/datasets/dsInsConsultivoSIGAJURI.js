function createDataset(fields, constraints, sortFields) {
	var dsConsultivoSIGAJURI = DatasetBuilder.newDataset();
	dsConsultivoSIGAJURI.addColumn("cdCajuri");
	dsConsultivoSIGAJURI.addColumn("sCodigoJuridico");
	dsConsultivoSIGAJURI.addColumn("sAprovacao");
	
	var cdWF;
	var cdFilialNS7;
	var cdEmpresa;
	var cdAreaSol;
	var dtPrazoTarefa;
	var sSolicitante;
	var sMailAdvogado;
	var cdTipoSol;
	var sDescSol;
	var sObservacao;
	var cdAssJur;
	var sMailSolicitante;
	var sCampoRetorno;
	var sStepDestino;
		
	var retorno = true;
	
	for (var i = 0; i < constraints.length; i++){
		if (constraints[i].fieldName == "cdWF"){
			cdWF = constraints[i].initialValue;
		} else if (constraints[i].fieldName == "cdFilialNS7"){
			cdFilialNS7 = constraints[i].initialValue;			
		} else if (constraints[i].fieldName == "cdEmpresa"){
			cdEmpresa = constraints[i].initialValue;
		} else if (constraints[i].fieldName == "cdAreaSol"){
			cdAreaSol = constraints[i].initialValue;			
		} else if (constraints[i].fieldName == "dtPrazoTarefa"){
			dtPrazoTarefa = constraints[i].initialValue;			
		} else if (constraints[i].fieldName == "sSolicitante"){
			sSolicitante = constraints[i].initialValue;			
		} else if (constraints[i].fieldName == "sMailAdvogado"){
			sMailAdvogado = constraints[i].initialValue;			
		} else if (constraints[i].fieldName == "cdTipoSol"){
			cdTipoSol = constraints[i].initialValue;			
		} else if (constraints[i].fieldName == "sDescSol"){
			sDescSol = constraints[i].initialValue;			
		} else if (constraints[i].fieldName == "sObservacao"){
			sObservacao = constraints[i].initialValue;			
		} else if (constraints[i].fieldName == "cdAssJur"){
			cdAssJur = constraints[i].initialValue;			
		} else if (constraints[i].fieldName == "sMailSolicitante"){
			sMailSolicitante = constraints[i].initialValue;			
		} else if (constraints[i].fieldName == "sCampoRetorno"){
			sCampoRetorno = constraints[i].initialValue;			
		} else if (constraints[i].fieldName == "sStepDestino"){
			sStepDestino = constraints[i].initialValue;			
		}
		
	}
	
	try{

		var service = ServiceManager.getService('SIGAJURI');
		var serviceHelper = service.getBean();
		var serviceLocator = serviceHelper.instantiate('br.com.totvs.cp.wscorp0001._8001.WSFLUIGJURIDICO');
		var IncConsService = serviceLocator.getWSFLUIGJURIDICOSOAP();
		
		var aDados = serviceHelper.instantiate('br.com.totvs.cp.wscorp0001._8001.STRUASSUNTO');
		aDados.setADVOGADO(sMailAdvogado);
		aDados.setAREA(cdAreaSol);
		aDados.setEMPRESA(cdEmpresa);
		aDados.setESCRITORIO(cdFilialNS7);
		aDados.setSOLICITACAO(cdWF);
		aDados.setTIPOSOLICITACAO(cdTipoSol);
		aDados.setTIPOASSUNTOJURIDICO(cdAssJur);
		aDados.setSOLICITANTE(sSolicitante);
		aDados.setEMAILSOLICITANTE(sMailSolicitante);
		aDados.setDESCRICAOSOLICITACAO(sDescSol);
		aDados.setOBSERVACOES(sObservacao);
		aDados.setDATAFW(dtPrazoTarefa);
		aDados.setCAMPORETORNO(sCampoRetorno);
		aDados.setSTEPDESTINO(sStepDestino);
		
		retorno = IncConsService.mtgeraconsultivo(aDados);
		
		dsConsultivoSIGAJURI.addRow(new Array(retorno.getNUMEROCONSULTA(), retorno.getCODIGOJURIDICO(), retorno.getFLUXOAPROVACAO()));
	}
	catch(e){
		dsConsultivoSIGAJURI.addRow(new Array("","",""));
		log.info("dsConsultivoSIGAJURI: Erro ao gerar um assunto consutivo no SIGAJURI: " + e.message);
	}
	
	return dsConsultivoSIGAJURI;
}