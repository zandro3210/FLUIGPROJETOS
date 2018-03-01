function createDataset(fields, constraints, sortFields) {
	
	var newDataset = DatasetBuilder.newDataset();
	
	try {
		newDataset.addColumn("TESTE");
		
		var xml1 = "<?xml version='1.0' encoding='UTF-8' ?> <PACA009M Operation='3' version='1.01'><ZPPMASTER modeltype='FIELDS'><ZPP_CCUSTO order='1'><value>101100100</value></ZPP_CCUSTO><ZPP_NOME order='2'><value>acesso teste2</value></ZPP_NOME> <ZPP_CPF order='3'> <value>05355848907</value>  </ZPP_CPF>  <ZPP_ENDERE order='4'> <value>1</value></ZPP_ENDERE>  <ZPP_ENDNUM order='5'> <value>1</value></ZPP_ENDNUM>  <ZPP_COMPLE order='6'>  <value>1</value></ZPP_COMPLE><ZPP_BAIRRO order='7'>  <value>1</value></ZPP_BAIRRO><ZPP_CIDADE order='8'><value>CORUPA</value> </ZPP_CIDADE> <ZPP_UF order='9'><value>SC</value> </ZPP_UF> <ZPP_CEP order='10'><value>89218610</value> </ZPP_CEP>  <ZPP_EMAILE order='11'> <value>externo@externo</value>  </ZPP_EMAILE><ZPP_EMAILI order='12'><value>leonardo.kume@totvs.com.br</value> </ZPP_EMAILI> <ZPP_FONE order='13'> <value>4730273263</value> </ZPP_FONE><ZPP_CEL order='14'><value>4739263748</value>  </ZPP_CEL> <ZPP_LOGIN order='15'> <value>acesso.teste2</value></ZPP_LOGIN><ZPP_TPPESS order='16'><value>F</value></ZPP_TPPESS>  <ZPP_DTNASC order='17'><value>19850801</value></ZPP_DTNASC>  <ZPP_DTADMI order='18'><value>20100801</value></ZPP_DTADMI> <ZPP_SEXO order='19'> <value>M</value>  </ZPP_SEXO><ZPP_TELCOM order='20'><value>(26) 37485-736</value>  </ZPP_TELCOM>";
		var xml2 = "<ZPP_CELCOM order='21'><value>(37) 48374-837</value>  </ZPP_CELCOM>  <ZPP_PAIS order='22'>  <value>017</value> </ZPP_PAIS><ZPP_DVIAGE order='23'><value>1</value></ZPP_DVIAGE>  <ZPP_EMP order='24'>  <value>1</value>  </ZPP_EMP><ZPP_FIL order='25'>  <value>1</value>  </ZPP_FIL><ZPP_SITFOL order='26'>  <value>A</value> </ZPP_SITFOL><ZPP_APELID order='27'>  <value>1</value> </ZPP_APELID><ZPP_RG order='28'>  <value>2324442</value></ZPP_RG><ZPP_CHAPA order='29'><value>1</value> </ZPP_CHAPA> <ZPP_NVLCAR order='30'><value>1</value>  </ZPP_NVLCAR> <ZPP_DEPART order='31'><value>1</value>  </ZPP_DEPART> <ZPP_FUNCAO order='32'><value>1</value></ZPP_FUNCAO><ZPP_ITCT order='33'><value>1</value></ZPP_ITCT> <ZPP_CLVAL order='34'>  <value>1</value></ZPP_CLVAL> <ZPP_BCDPTO order='35'>  <value>1</value> </ZPP_BCDPTO><ZPP_AGDPTO order='36'>  <value>1</value> </ZPP_AGDPTO> <ZPP_CTDPTO order='37'><value>1</value>  </ZPP_CTDPTO> <ZPP_TIPTEC order='38'><value>AN</value> </ZPP_TIPTEC>  <ZPP_REGIAO order='39'><value>TFS031</value>  </ZPP_REGIAO>  <ZPP_COORD order='40'> <value>T06343</value>  </ZPP_COORD> <ZPP_EMITOS order='41'>  <value>2</value> </ZPP_EMITOS><ZPP_FATURA order='42'>  <value>2</value> </ZPP_FATURA> <ZPP_RESCRN order='43'><value>2</value>  </ZPP_RESCRN> <ZPP_DTACOM order='44'><value>20150619</value></ZPP_DTACOM><ZPP_TPOAGE order='45'>  <value>1</value> </ZPP_TPOAGE><ZPP_EMPPRD order='46'>  <value>00</value></ZPP_EMPPRD><ZPP_DRG order='47'> <value>001</value></ZPP_DRG><ZPP_SEGMEN order='48'>  <value>000003</value></ZPP_SEGMEN><ZPP_IMPLAN order='49'>  <value>T06343</value></ZPP_IMPLAN><ZPP_PREMIO order='50'>  <value>2</value> </ZPP_PREMIO>  <ZPP_FTP order='51'><value>2</value></ZPP_FTP> <ZPP_CONFOS order='52'><value>2</value></ZPP_CONFOS>";
		var xml3 = "<ZPP_ACECSA order='53'><value>1</value></ZPP_ACECSA><ZPP_GPPCSA order='54'><value>2</value></ZPP_GPPCSA><ZPP_COPCSA order='55'><value>2</value></ZPP_COPCSA><ZPP_ACETIW order='56'><value>1</value></ZPP_ACETIW><ZPP_ACEPMS order='57'><value>1</value>  </ZPP_ACEPMS> <ZPP_ADMPMS order='58'><value>2</value>  </ZPP_ADMPMS> <ZPP_RETIMP order='59'><value>1</value>  </ZPP_RETIMP> <ZPP_RETIVA order='60'><value>1</value>  </ZPP_RETIVA><ZPP_RECIVA order='61'> <value>1</value></ZPP_RECIVA><ZPP_CCONTA order='62'> <value>1</value></ZPP_CCONTA>  <ZPP_RECIB order='63'> <value>1</value></ZPP_RECIB><ZPP_LIBFPR order='64'><value>2</value></ZPP_LIBFPR> <ZPP_CARRO order='65'><value>2</value>  </ZPP_CARRO>  <ZPP_TERCEI order='66'><value>2</value>  </ZPP_TERCEI> <ZPP_USARDA order='67'><value>2</value>  </ZPP_USARDA> <ZPP_LIBAVU order='68'><value>2</value>  </ZPP_LIBAVU><ZPP_LIMDES order='69'>  <value>2</value> </ZPP_LIMDES><ZPP_TPACES order='70'>  <value>2</value> </ZPP_TPACES><ZPP_LIMPRO order='71'> <value>1</value></ZPP_LIMPRO><ZPP_TPROSP order='72'> <value>1</value></ZPP_TPROSP><ZPP_AGN order='73'><value>1</value></ZPP_AGN>  <ZPP_FILIAL order='74'><value></value></ZPP_FILIAL><ZPP_SOLFLU order='76'><value>289944</value></ZPP_SOLFLU><ZPP_USRSOL order='77'><value>000000</value></ZPP_USRSOL><ZPP_PERFIL order='78'><value>000006</value></ZPP_PERFIL><ZPP_ORIGEM order='79'><value></value></ZPP_ORIGEM><ZPP_TIPOAC order='80'><value>1</value></ZPP_TIPOAC><ZPP_TIPOUS order='81'><value>1</value></ZPP_TIPOUS><ZPP_DTAGEN order='82'><value>20150619</value></ZPP_DTAGEN><ZPP_MOTIVO order='83'><value>motivo</value></ZPP_MOTIVO><ZPP_NOMGES order='84'><value>Adilson Bona</value></ZPP_NOMGES><ZPP_STATUS order='85'><value>1</value></ZPP_STATUS><ZPP_MOTREP order='86'><value></value></ZPP_MOTREP><ZPP_CARGO order='87'><value>1</value></ZPP_CARGO></ZPPMASTER></PACA009M>";
		
		//var xml = "<?xml version='1.0' encoding='UTF-8' ?> <PACA009M Operation='3' version='1.01'><ZPPMASTER modeltype='FIELDS'><ZPP_CCUSTO order='1'><value>101100100</value></ZPP_CCUSTO><ZPP_NOME order='2'><value>acesso teste2</value></ZPP_NOME> <ZPP_CPF order='3'> <value>05355848907</value>  </ZPP_CPF>  <ZPP_ENDERE order='4'> <value>1</value></ZPP_ENDERE>  <ZPP_ENDNUM order='5'> <value>1</value></ZPP_ENDNUM>  <ZPP_COMPLE order='6'>  <value>1</value></ZPP_COMPLE><ZPP_BAIRRO order='7'>  <value>1</value></ZPP_BAIRRO><ZPP_CIDADE order='8'><value>CORUPA</value> </ZPP_CIDADE> <ZPP_UF order='9'><value>SC</value> </ZPP_UF> <ZPP_CEP order='10'><value>89218610</value> </ZPP_CEP>  <ZPP_EMAILE order='11'> <value>externo@externo</value>  </ZPP_EMAILE><ZPP_EMAILI order='12'><value>leonardo.kume@totvs.com.br</value> </ZPP_EMAILI> <ZPP_FONE order='13'> <value>4730273263</value> </ZPP_FONE><ZPP_CEL order='14'><value>4739263748</value>  </ZPP_CEL> <ZPP_LOGIN order='15'> <value>acesso.teste2</value></ZPP_LOGIN><ZPP_TPPESS order='16'><value>F</value></ZPP_TPPESS>  <ZPP_DTNASC order='17'><value>19850801</value></ZPP_DTNASC>  <ZPP_DTADMI order='18'><value>20100801</value></ZPP_DTADMI> <ZPP_SEXO order='19'> <value>M</value>  </ZPP_SEXO><ZPP_TELCOM order='20'><value>00</value>  </ZPP_TELCOM><ZPP_CELCOM order='21'><value>0000</value>  </ZPP_CELCOM>  <ZPP_PAIS order='22'>  <value>017</value> </ZPP_PAIS><ZPP_DVIAGE order='23'><value>1</value></ZPP_DVIAGE>  <ZPP_EMP order='24'>  <value>1</value>  </ZPP_EMP><ZPP_FIL order='25'>  <value>1</value>  </ZPP_FIL><ZPP_SITFOL order='26'>  <value>A</value> </ZPP_SITFOL><ZPP_APELID order='27'>  <value>1</value> </ZPP_APELID><ZPP_RG order='28'>  <value>2324442</value></ZPP_RG><ZPP_CHAPA order='29'><value>1</value> </ZPP_CHAPA> <ZPP_NVLCAR order='30'><value>1</value>  </ZPP_NVLCAR> <ZPP_DEPART order='31'><value>1</value>  </ZPP_DEPART> <ZPP_FUNCAO order='32'><value>1</value></ZPP_FUNCAO><ZPP_ITCT order='33'><value>1</value></ZPP_ITCT> <ZPP_CLVAL order='34'>  <value>1</value></ZPP_CLVAL> <ZPP_BCDPTO order='35'>  <value>1</value> </ZPP_BCDPTO><ZPP_AGDPTO order='36'>  <value>1</value> </ZPP_AGDPTO> <ZPP_CTDPTO order='37'><value>1</value>  </ZPP_CTDPTO> <ZPP_TIPTEC order='38'><value>AN</value> </ZPP_TIPTEC>  <ZPP_REGIAO order='39'><value>TFS031</value>  </ZPP_REGIAO>  <ZPP_COORD order='40'> <value>T06343</value>  </ZPP_COORD> <ZPP_EMITOS order='41'>  <value>2</value> </ZPP_EMITOS><ZPP_FATURA order='42'>  <value>2</value> </ZPP_FATURA> <ZPP_RESCRN order='43'><value>2</value>  </ZPP_RESCRN> <ZPP_DTACOM order='44'><value>20150619</value></ZPP_DTACOM><ZPP_TPOAGE order='45'>  <value>1</value> </ZPP_TPOAGE><ZPP_EMPPRD order='46'>  <value>00</value></ZPP_EMPPRD><ZPP_DRG order='47'> <value>001</value></ZPP_DRG><ZPP_SEGMEN order='48'>  <value>000003</value></ZPP_SEGMEN><ZPP_IMPLAN order='49'>  <value>T06343</value></ZPP_IMPLAN><ZPP_PREMIO order='50'>  <value>2</value> </ZPP_PREMIO>  <ZPP_FTP order='51'><value>2</value></ZPP_FTP> <ZPP_CONFOS order='52'><value>2</value></ZPP_CONFOS><ZPP_ACECSA order='53'><value>1</value></ZPP_ACECSA><ZPP_GPPCSA order='54'><value>2</value></ZPP_GPPCSA><ZPP_COPCSA order='55'><value>2</value></ZPP_COPCSA><ZPP_ACETIW order='56'><value>1</value></ZPP_ACETIW><ZPP_ACEPMS order='57'><value>1</value>  </ZPP_ACEPMS> <ZPP_ADMPMS order='58'><value>2</value>  </ZPP_ADMPMS> <ZPP_RETIMP order='59'><value>1</value>  </ZPP_RETIMP> <ZPP_RETIVA order='60'><value>1</value>  </ZPP_RETIVA><ZPP_RECIVA order='61'> <value>1</value></ZPP_RECIVA><ZPP_CCONTA order='62'> <value>1</value></ZPP_CCONTA>  <ZPP_RECIB order='63'> <value>1</value></ZPP_RECIB><ZPP_LIBFPR order='64'><value>2</value></ZPP_LIBFPR> <ZPP_CARRO order='65'><value>2</value>  </ZPP_CARRO>  <ZPP_TERCEI order='66'><value>2</value>  </ZPP_TERCEI> <ZPP_USARDA order='67'><value>2</value>  </ZPP_USARDA> <ZPP_LIBAVU order='68'><value>2</value>  </ZPP_LIBAVU><ZPP_LIMDES order='69'>  <value>2</value> </ZPP_LIMDES><ZPP_TPACES order='70'>  <value>2</value> </ZPP_TPACES><ZPP_LIMPRO order='71'> <value>1</value></ZPP_LIMPRO><ZPP_TPROSP order='72'> <value>1</value></ZPP_TPROSP><ZPP_AGN order='73'><value>1</value></ZPP_AGN>  <ZPP_FILIAL order='74'><value></value></ZPP_FILIAL><ZPP_SOLFLU order='76'><value>289944</value></ZPP_SOLFLU><ZPP_USRSOL order='77'><value>000000</value></ZPP_USRSOL><ZPP_PERFIL order='78'><value>000006</value></ZPP_PERFIL><ZPP_ORIGEM order='79'><value></value></ZPP_ORIGEM><ZPP_TIPOAC order='80'><value>1</value></ZPP_TIPOAC><ZPP_TIPOUS order='81'><value>1</value></ZPP_TIPOUS><ZPP_DTAGEN order='82'><value>20150619</value></ZPP_DTAGEN><ZPP_MOTIVO order='83'><value>motivo</value></ZPP_MOTIVO><ZPP_NOMGES order='84'><value>Adilson Bona</value></ZPP_NOMGES><ZPP_STATUS order='85'><value>1</value></ZPP_STATUS><ZPP_MOTREP order='86'><value></value></ZPP_MOTREP><ZPP_CARGO order='87'><value>1</value></ZPP_CARGO></ZPPMASTER></PACA009M>";
		var xml = "<?xml version='1.0' encoding='UTF-8' ?> <PACA009M Operation='3' version='1.01'><ZPPMASTER modeltype='FIELDS'><ZPP_CCUSTO order='1'><value>101100100</value></ZPP_CCUSTO><ZPP_NOME order='2'><value>acesso teste2</value></ZPP_NOME> <ZPP_CPF order='3'> <value>05355848907</value>  </ZPP_CPF>  <ZPP_ENDERE order='4'> <value>1</value></ZPP_ENDERE>  <ZPP_ENDNUM order='5'> <value>1</value></ZPP_ENDNUM>  <ZPP_COMPLE order='6'>  <value>1</value></ZPP_COMPLE><ZPP_BAIRRO order='7'>  <value>1</value></ZPP_BAIRRO><ZPP_CIDADE order='8'><value>CORUPA</value> </ZPP_CIDADE> <ZPP_UF order='9'><value>SC</value> </ZPP_UF> <ZPP_CEP order='10'><value>89218610</value> </ZPP_CEP>  <ZPP_EMAILE order='11'> <value>externo@externo</value>  </ZPP_EMAILE><ZPP_EMAILI order='12'><value>leonardo.kume@totvs.com.as asd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sadasd asd sad sa dsada sad</value> </ZPP_EMAILI> <ZPP_FONE order='13'> <value>4730273263</value> </ZPP_FONE><ZPP_CEL order='14'><value>4739263748</value>  </ZPP_CEL> <ZPP_LOGIN order='15'> <value>acesso.teste2</value></ZPP_LOGIN><ZPP_TPPESS order='16'><value>F</value></ZPP_TPPESS>  <ZPP_DTNASC order='17'><value>19850801</value></ZPP_DTNASC>  <ZPP_DTADMI order='18'><value>20100801</value></ZPP_DTADMI> <ZPP_SEXO order='19'> <value>M</value>  </ZPP_SEXO><ZPP_TELCOM order='20'><value>00</value>  </ZPP_TELCOM><ZPP_CELCOM order='21'><value>0000</value>  </ZPP_CELCOM>  <ZPP_PAIS order='22'>  <value>017</value> </ZPP_PAIS><ZPP_DVIAGE order='23'><value>1</value></ZPP_DVIAGE>  <ZPP_EMP order='24'>  <value>1</value>  </ZPP_EMP><ZPP_FIL order='25'>  <value>1</value>  </ZPP_FIL><ZPP_SITFOL order='26'>  <value>A</value> </ZPP_SITFOL><ZPP_APELID order='27'>  <value>1</value> </ZPP_APELID><ZPP_RG order='28'>  <value>2324442</value></ZPP_RG><ZPP_CHAPA order='29'><value>1</value> </ZPP_CHAPA> <ZPP_NVLCAR order='30'><value>1</value>  </ZPP_NVLCAR> <ZPP_DEPART order='31'><value>1</value>  </ZPP_DEPART> <ZPP_FUNCAO order='32'><value>1</value></ZPP_FUNCAO><ZPP_ITCT order='33'><value>1</value></ZPP_ITCT> <ZPP_CLVAL order='34'>  <value>1</value></ZPP_CLVAL> <ZPP_BCDPTO order='35'>  <value>1</value> </ZPP_BCDPTO><ZPP_AGDPTO order='36'>  <value>1</value> </ZPP_AGDPTO> <ZPP_CTDPTO order='37'><value>1</value>  </ZPP_CTDPTO> <ZPP_TIPTEC order='38'><value>AN</value> </ZPP_TIPTEC>  <ZPP_REGIAO order='39'><value>TFS031</value>  </ZPP_REGIAO>  <ZPP_COORD order='40'> <value>T06343</value>  </ZPP_COORD> <ZPP_EMITOS order='41'>  <value>2</value> </ZPP_EMITOS><ZPP_FATURA order='42'>  <value>2</value> </ZPP_FATURA> <ZPP_RESCRN order='43'><value>2</value>  </ZPP_RESCRN> <ZPP_DTACOM order='44'><value>20150619</value></ZPP_DTACOM><ZPP_TPOAGE order='45'>  <value>1</value> </ZPP_TPOAGE>  </ZPPMASTER></PACA009M>";
		
		var testeWS = ServiceManager.getService('CC_PerfilAcesso3');
		var locator = testeWS.instantiate('com.totvs.protheus.perfilacesso3.PERFILACESSO');
		var service = locator.getPERFILACESSOSOAP();
		
		var retorno = service.intsolicit(new java.math.BigInteger(3), new java.lang.String(xml));
		
		newDataset.addRow(new Array("OK"));
	}
	catch(error) {
		newDataset.addRow(new Array(error.message)); 
	}
	
	return newDataset;	
}