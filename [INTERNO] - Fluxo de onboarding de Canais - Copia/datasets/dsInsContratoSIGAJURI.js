function createDataset(fields, constraints, sortFields) {
	var dsContratoSIGAJURI = DatasetBuilder.newDataset();
	dsContratoSIGAJURI.addColumn("cdCajuri");
	dsContratoSIGAJURI.addColumn("sCodigoJuridico");
	dsContratoSIGAJURI.addColumn("sAprovacao");
	
	var retorno = true;
	
	try{

		var service = ServiceManager.getService('SIGAJURI');
		var serviceHelper = service.getBean();
		var serviceLocator = serviceHelper.instantiate('br.com.totvs.cp.wscorp0001._8001.WSFLUIGJURIDICO');
		var IncContService = serviceLocator.getWSFLUIGJURIDICOSOAP();
		
		var aDados = serviceHelper.instantiate('br.com.totvs.cp.wscorp0001._8001.STRUCONTRATOASSUNTO');
		
		for (var i = 0; i < constraints.length; i++){
			if (constraints[i].fieldName == "cdWF"){
				aDados.setSOLICITACAO(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "cdFilialNS7"){
				aDados.setESCRITORIO(constraints[i].initialValue);			
			} else if (constraints[i].fieldName == "cdAreaSol"){
				aDados.setAREA(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "dtPrazoTarefa"){
				aDados.setDATAINCLUSAO(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "sSolicitante"){
				aDados.setSOLICITANTE(constraints[i].initialValue);			
			} else if (constraints[i].fieldName == "sMailAdvogado"){	
				aDados.setADVOGADO(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "cdTipoCon"){		
				aDados.setTIPOCONTRATO(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "sDescSol"){
				aDados.setDESCRICAOSOLICITACAO(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "sObservacao"){
				aDados.setOBSERVACOES(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "cdAssJur"){
				aDados.setTIPOASSUNTOJURIDICO(constraints[i].initialValue);			
			} else if (constraints[i].fieldName == "sMailSolicitante"){		
				aDados.setEMAILSOLICITANTE(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "sCampoRetorno"){
				aDados.setCAMPORETORNO(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "sStepDestinoConc"){
				aDados.setSTEPDESTINOCONC(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "sRazaoSocial"){
				aDados.setNOMEPARTEC(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "sCnpj"){
				aDados.setCGCPARTEC(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "sEndereco"){	
				aDados.setENDERECOPARTEC(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "sBairro"){
				aDados.setBAIRROPARTEC(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "sEstado"){
				aDados.setESTADOPARTEC(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "sCidade"){			
				aDados.setMUNICIPIOPARTEC(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "sCep"){
				aDados.setCEPPARTEC(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "cdAtivo"){
				aDados.setPOLOATIVO(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "cdPassivo"){
				aDados.setPOLOPASSIVO(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "cdEntPassivo"){		
				aDados.setENTPOLOPASSIVO(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "cdEntAtivo"){			
				aDados.setENTPOLOATIVO(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "sTipoParte"){
				aDados.setTIPOPESSOAPARTEC(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "sRenovacao"){		
				aDados.setRENOVACAOAUTO(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "sValor"){
				aDados.setVALORCONTRATO(constraints[i].initialValue.replace(".","").replace(",","."));
			} else if (constraints[i].fieldName == "sVigenciaDe"){
				aDados.setVIGENCIAINICIO(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "sVigenciaAte"){
				aDados.setVIGENCIAFIM(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "sCondPagamento"){
				aDados.setCONDICAO(constraints[i].initialValue);
			} else if (constraints[i].fieldName == "sStepDestinoCanc"){
				aDados.setSTEPDESTINOCANC(constraints[i].initialValue);
			}
		}
					
		retorno = IncContService.mtgeracontratoassuntojuridico(aDados);
		
		dsContratoSIGAJURI.addRow(new Array(retorno.getNUMEROCONSULTA(), retorno.getCODIGOJURIDICO(), retorno.getFLUXOAPROVACAO()));
	}
	catch(e){
		dsContratoSIGAJURI.addRow(new Array("","",""));
		log.info("dsContratoSIGAJURI: Erro ao gerar um assunto contrato no SIGAJURI: " + e.message);
	}
	
	return dsContratoSIGAJURI;
}