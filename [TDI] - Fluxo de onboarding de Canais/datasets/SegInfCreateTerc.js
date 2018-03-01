function createDataset(fields, constraints, sortFields) {

	log.info("SEGFIN - TERMO RESP TERCEIROS - DATASET SegInfCreateTerc INICIO");

	// Cria o dataset
	var newDataset = DatasetBuilder.newDataset();

	newDataset.addColumn("RETORNO");
	newDataset.addColumn("MATRTERC");
	newDataset.addColumn("LOGINTERC");
	newDataset.addColumn("SENHATERC");

	try{
		
		log.info("SEGFIN - TERMO RESP TERCEIROS - DATASET SegInfCreateTerc -ANTES SETAAMBIENTE");
		
		//para setar - chama apenas uma vez o dataset
		var res = setaAmbiente();
		var LOGININTEGRADOR = res.getValue(0,"login");
		var PASSWORDINTEGRADOR = res.getValue(0,"password");

		log.info("SEGFIN - TERMO RESP TERCEIROS - DATASET SegInfCreateTerc - LOGININTEGRADOR: " + LOGININTEGRADOR + "PASSINTEGRADOR: " + PASSWORDINTEGRADOR);
		
		var NOME_SERVICO = "ECMColleagueService";
		var CAMINHO_SERVICO = "com.totvs.technology.ecm.foundation.ws.ECMColleagueServiceService";		
		var CAMINHO_SERVICO_COLLEAGEDTO = "com.totvs.technology.ecm.foundation.ws.ColleagueDto";
		var CAMINHO_SERVICO_COLLEAGEDTOARRAY = "com.totvs.technology.ecm.foundation.ws.ColleagueDtoArray";
		var CAMINHO_SERVICO_GROUPDTO = "com.totvs.technology.ecm.foundation.ws.GroupDto";
		var CAMINHO_SERVICO_GROUPDTOARRAY = "com.totvs.technology.ecm.foundation.ws.GroupDtoArray";
		var CAMINHO_SERVICO_ROLEDTO = "com.totvs.technology.ecm.foundation.ws.WorkflowRoleDto";
		var CAMINHO_SERVICO_ROLEDTOARRAY = "com.totvs.technology.ecm.foundation.ws.WorkflowRoleDtoArray";

		var servico = ServiceManager.getService(NOME_SERVICO);
		var instancia = servico.instantiate(CAMINHO_SERVICO);
		var ws = instancia.getColleagueServicePort();

		
		if (constraints != null) {
			var numcompany = constraints[0].getInitialValue();
			var nomeTerc = constraints[1].getInitialValue();
			var mailTerc = constraints[2].getInitialValue();
			log.info("SEGFIN - TERMO RESP TERCEIROS - DATASET SegInfCreateTerc - ENTROU CONSTRAINTS");
		}
		
		log.info("SEGFIN - TERMO RESP TERCEIROS - DATASET SegInfCreateTerc -CONSTRAINTS OK");
		
		//TESTE
		//var numcompany = "10097";
		//var nomeTerc = "terc37 lala";
		//var mailTerc = "terc37@terc37.com.br";
		

		var listaColleagueDto = servico.instantiate(CAMINHO_SERVICO_COLLEAGEDTO);
		log.info("SEGFIN - TERMO RESP TERCEIROS - DATASET SegInfCreateTerc - instantiate(CAMINHO_SERVICO_COLLEAGEDTO) OK");
		
		var login = mailTerc.replace("@",".") + "." + numcompany.toString(); 

		log.info("SEGFIN - TERMO RESP TERCEIROS - DATASET SegInfCreateTerc - VERIFICACAO USUARIO TERC " + 
				 	"login sem @: " + login) ;

		listaColleagueDto.setCompanyId(numcompany);
		listaColleagueDto.setActive(true);
		listaColleagueDto.setAdminUser(false);
		listaColleagueDto.setColleagueName(nomeTerc);
		listaColleagueDto.setLogin(login);
		listaColleagueDto.setColleagueId(login);
		listaColleagueDto.setMail(mailTerc);
		// identity DESligado = senha criptografada
		//listaColleagueDto.setPasswd("261c3b26b737ffc731837e1e35d17b9c");
		// identity ligado = senha nao criptografada
		//listaColleagueDto.setPasswd("Totvs@123");
		//listaColleagueDto.setPasswd("Totvsterc@123");
		// SENHA RANDOMICA COM 12 CARACTERES, LETRA, LETRA MAIUSCULA, NUMERO E CARAC ESPECIAL
		
	   log.info("SEGFIN - TERMO RESP TERCEIROS - DATASET SegInfCreateTerc - VERIFICACAO USUARIO TERC " +
			    "senha randomica - inicializando");

	   var chars = "0123456789!@#$%&*?;.,ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
       var string_length = 9;
       var randomstring = '';
       for (var i=0; i<string_length; i++) {
          var rnum = Math.floor(Math.random() * chars.length);
          randomstring += chars.substring(rnum,rnum+1);
       }
       randomstring = "T6" + randomstring + "@";
       
       log.info("SEGFIN - TERMO RESP TERCEIROS - DATASET SegInfCreateTerc - VERIFICACAO USUARIO TERC " +
    		    "senha randomica - fim - randomstring: " + randomstring);
       listaColleagueDto.setPasswd(randomstring);
		
		var arrayColleague = servico.instantiate(CAMINHO_SERVICO_COLLEAGEDTOARRAY);
		arrayColleague.getItem().add(listaColleagueDto);
		
		log.info("SEGFIN - TERMO RESP TERCEIROS - DATASET SegInfCreateTerc - VERIFICACAO USUARIO TERC " + 
					"arrayColleague: " + arrayColleague) ;

		var listaGroupDto = servico.instantiate(CAMINHO_SERVICO_GROUPDTO);
		listaGroupDto.setCompanyId(numcompany);
		//des
		//listaGroupDto.setGroupId("TTerceiro");
		//pre
		listaGroupDto.setGroupId("TTerceiroTermo");
		
		var arrayGroup= servico.instantiate(CAMINHO_SERVICO_GROUPDTOARRAY);
		arrayGroup.getItem().add(listaGroupDto);

		log.info("SEGFIN - TERMO RESP TERCEIROS - DATASET SegInfCreateTerc - VERIFICACAO USUARIO TERC " + 
				 	"arrayGroup: " + arrayGroup) ;

		var listaRoleDto = servico.instantiate(CAMINHO_SERVICO_ROLEDTO);
		
		var arrayRole = servico.instantiate(CAMINHO_SERVICO_ROLEDTOARRAY);

		log.info("SEGFIN - TERMO RESP TERCEIROS - DATASET SegInfCreateTerc - VERIFICACAO USUARIO TERC " + 
				 	"arrayRole: " + arrayRole) ;

		log.info("SEGFIN - TERMO RESP TERCEIROS - DATASET SegInfCreateTerc - VERIFICACAO USUARIO TERC " + 
					"antescriacao ") ;

		var rsCriacaoNovoUsuario = ws.createColleaguewithDependencies(LOGININTEGRADOR,PASSWORDINTEGRADOR,numcompany,arrayColleague,arrayGroup,arrayRole);
		
		log.info("SEGFIN - TERMO RESP TERCEIROS - DATASET SegInfCreateTerc" + 
				" rsCriacaoNovoUsuario: " + rsCriacaoNovoUsuario) ;

		newDataset.addRow(new Array(rsCriacaoNovoUsuario,login,login,randomstring));	
		
		log.info("SEGFIN - TERMO RESP TERCEIROS - DATASET SegInfCreateTerc" + 
				" depois addrow dataset") ;

	} // try 
	catch(error) {
		log.info (" ++ DATASET DATASET SegInfCreateTerc  - ERRO:  " + error.message);
		newDataset.addRow(new Array(error.message),"erro","erro","erro"); 
	}	
	
	log.info("SEGFIN - TERMO RESP TERCEIROS - DATASET SegInfCreateTerc - ANTES RETURN DATASET");
	return newDataset;	
}


function setaAmbiente(){
	try{
		var res = DatasetFactory.getDataset("dsParamAmbFormWkf", null, null, null);
		if (res){
			if (res.values.length > 0){return res;}
			else return "erro ao retornar dados de ambiente - nao retornou registro";
		}
		else return "erro ao retornar dados de ambiente - retornou nulo";
	}
	catch (e) {
		return "erro ao retornar dados de ambiente - NOK";
	}	
}
