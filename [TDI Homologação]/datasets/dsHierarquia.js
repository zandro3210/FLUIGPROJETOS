function createDataset(fields, constraints, sortFields) {
	
	//servico CorporeGlbSSL
	log.info (" ++ criz 1 DATASET DSHIERARQUIA - INICIO ++ " );
	
	try {

		// Cria o dataset
		var newDataset = DatasetBuilder.newDataset();
	    
		/*coluna 0*/ newDataset.addColumn("EMAIL_PARTICIPANTE");
		/*coluna 1*/ newDataset.addColumn("CHAPA_PARTICIPANTE");
		/*coluna 2*/ newDataset.addColumn("PARTICIPANTE"); // nome do participante
		/*coluna 3*/ newDataset.addColumn("CPF_PARTICIPANTE");
		/*coluna 4*/ newDataset.addColumn("CODCCUSTO");
		/*coluna 5*/ newDataset.addColumn("NOME_CCUSTO");
		/*coluna 6*/ newDataset.addColumn("ITEM_CONTABIL");
		/*coluna 7*/ newDataset.addColumn("CLASSE_VALOR");
		/*coluna 8*/ newDataset.addColumn("CODFUNCAO_PARTICIPANTE"); 
		/*coluna 9*/ newDataset.addColumn("FUNCAO_PARTICIPANTE"); 
		/*coluna 10*/ newDataset.addColumn("CODCARGO_PARTICIPANTE"); 
		/*coluna 11*/ newDataset.addColumn("CARGO_PARTICIPANTE"); 
		/*coluna 12*/ newDataset.addColumn("SEXO_PARTICIPANTE"); 
		/*coluna 13*/ newDataset.addColumn("DATA_ADMISSAO"); 
		/*coluna 14*/ newDataset.addColumn("MES_ADMISSAO"); 
		/*coluna 15*/ newDataset.addColumn("ANO_ADMISSAO"); 
		/*coluna 16*/ newDataset.addColumn("DATA_NASCIMENTO"); 
		/*coluna 17*/ newDataset.addColumn("FILIAL_PARTICIPANTE");
		/*coluna 18*/ newDataset.addColumn("COLIGADA_PARTICIPANTE"); 
		/*coluna 19*/ newDataset.addColumn("COD_SECAO_PARTICIPANTE"); 
		/*coluna 20*/ newDataset.addColumn("SECAO_PARTICIPANTE");
		
		/*coluna 21*/ newDataset.addColumn("COORDENADOR"); 
		/*coluna 22*/ newDataset.addColumn("CODFUNCAO_COORD");
		/*coluna 23*/ newDataset.addColumn("FUNCAO_COORD");  
		/*coluna 24*/ newDataset.addColumn("CODCARGO_COORD");  
		/*coluna 25*/ newDataset.addColumn("CARGO_COORD");  
		/*coluna 26*/ newDataset.addColumn("CPF_COORD"); 
		/*coluna 27*/ newDataset.addColumn("EMAIL_COORD");
		
		/*coluna 28*/ newDataset.addColumn("GESTOR"); 
		/*coluna 29*/ newDataset.addColumn("CODFUNCAO_GEST");
		/*coluna 30*/ newDataset.addColumn("FUNCAO_GEST");
		/*coluna 31*/ newDataset.addColumn("CODCARGO_GEST");  
		/*coluna 32*/ newDataset.addColumn("CARGO_GEST");
		/*coluna 33*/ newDataset.addColumn("CPF_GEST");
		/*coluna 34*/ newDataset.addColumn("EMAIL_GEST");  

		/*coluna 35*/ newDataset.addColumn("GESTOR EXECUTIVO");
		/*coluna 36*/ newDataset.addColumn("CODFUNCAO_GEST_EXEC");
		/*coluna 37*/ newDataset.addColumn("FUNCAO_GEST_EXEC");
		/*coluna 38*/ newDataset.addColumn("CODCARGO_GEST_EXEC");
		/*coluna 39*/ newDataset.addColumn("CARGO_GEST_EXEC");
		/*coluna 40*/ newDataset.addColumn("CPF_GEST_EXEC");
		/*coluna 41*/ newDataset.addColumn("EMAIL_GEST_EXEC");
		
		/*coluna 42*/ newDataset.addColumn("DIRETOR");
		/*coluna 43*/ newDataset.addColumn("CODFUNCAO_DIRETOR");
		/*coluna 44*/ newDataset.addColumn("FUNCAO_DIR");
		/*coluna 45*/ newDataset.addColumn("CODCARGO_DIRETOR");
		/*coluna 46*/ newDataset.addColumn("CARGO_DIRETOR");
		/*coluna 47*/ newDataset.addColumn("CPF_DIR");
		/*coluna 48*/ newDataset.addColumn("EMAIL_DIR");
		
		/*coluna 49*/ newDataset.addColumn("DIRETOR EXECUTIVO");
		/*coluna 50*/ newDataset.addColumn("CODFUNCAO_DIR_EXEC");
		/*coluna 51*/ newDataset.addColumn("FUNCAO_DIR_EXEC");
		/*coluna 52*/ newDataset.addColumn("CODCARGO_DIR_EXEC");
		/*coluna 53*/ newDataset.addColumn("CARGO_DIR_EXEC");
		/*coluna 54*/ newDataset.addColumn("CPF_DIR_EXEC");
		/*coluna 55*/ newDataset.addColumn("EMAIL_DIR_EXEC");
		
		/*coluna 56*/ newDataset.addColumn("VP");
		/*coluna 57*/ newDataset.addColumn("CODFUNCAO_VP");
		/*coluna 58*/ newDataset.addColumn("FUNCAO_VP");
		/*coluna 59*/ newDataset.addColumn("CODCARGO_VP");
		/*coluna 60*/ newDataset.addColumn("CARGO_VP");
		/*coluna 61*/ newDataset.addColumn("CPF_VP");
		/*coluna 62*/ newDataset.addColumn("EMAIL_VP");
		
	    var email = "renata.verrone@totvs.com.br";
	
	    // para testar comente este if e descomente um dos emails abaixo
	
	    if (constraints != null) {
			email = constraints[0].getInitialValue(); 
		}
	
	    //teste
		//email = "renata.verrone@totvs.com.br";
	
	    log.info ("++ DATASET DSHIERARQUIA - e-mail:" + email);
 
	    if (email != ""){
			var dataset = DatasetFactory.getDataset("pass_validate_rm", null, null, null);
			var json = dataset.getValue(0, "USER");
			var obj = JSON.parse(json);
			
	    	// Invoca o servico
			var codUsuario = obj.user;
			var senha = obj.pass;
			var codColigada = "0";
			var codAplicacao = "V";
			var codSentenca = "INTEGR_PTH.01";
			var xmlParamsValue = "<PARAM><EMAIL>" + email + "</EMAIL></PARAM>";
			var schema = false;
		
			// SERVICO criado COM OPCAO 2 - Axis ECM 3
			//var periodicService = ServiceManager.getService('CorporeGlbSSL');
			//var serviceLocator = periodicService.instantiate('br.com.totvs.www.br.WsGlbSSLLocator');
			//var service = serviceLocator.getwsGlbSSLSoap();
			 
			
			// SERVICO criado COM OPCAO 1 - CFX 
			var corpore = ServiceManager.getService('CorporeGlbSSL');
			var locator = corpore.instantiate('br.com.totvs.br.WsGlbSSL');
			var service = locator.getWsGlbSSLSoap();
			 
			
			var retorno = service.getResultSQL(codUsuario, senha, codColigada, codAplicacao, codSentenca, xmlParamsValue, schema );
	        
			var DocumentElement = new XML(retorno);
	        log.info (" ++ DATASET DSHIERARQUIA - DADOS DESTINATARIO DESPESA:  " + DocumentElement);
					
	        for each(var elemento in DocumentElement.Row) {
				newDataset.addRow(new Array(
											elemento.EMAIL_PARTICIPANTE.toString(), // COLUNA 0
											elemento.CHAPA_PARTICIPANTE.toString(),
											elemento.PARTICIPANTE.toString(),
											elemento.CPF_PARTICIPANTE.toString(),
											elemento.CODCCUSTO.toString(),
											elemento.NOME_CCUSTO.toString(),
											elemento.ITEM_CONTABIL.toString() , 
											elemento.CLASSE_VALOR.toString(),
											elemento.CODFUNCAO_PARTICIPANTE.toString(),
											elemento.FUNCAO_PARTICIPANTE.toString(),
											elemento.CODCARGO_PARTICIPANTE.toString(), // COLUNA 10
											elemento.CARGO_PARTICIPANTE.toString(),
											elemento.SEXO_PARTICIPANTE.toString(),
											elemento.DATA_ADMISSAO.toString(),
											elemento.MES_ADMISSAO.toString(),
											elemento.ANO_ADMISSAO.toString(),
											elemento.DATA_NASCIMENTO.toString(),
											elemento.FILIAL_PARTICIPANTE.toString(),
											elemento.COLIGADA_PARTICIPANTE.toString(),
											elemento.COD_SECAO_PARTICIPANTE.toString(),
											elemento.SECAO_PARTICIPANTE.toString(), // COLUNA 20
											elemento.COORDENADOR.toString(),
											elemento.CODFUNCAO_COORD.toString(),
											elemento.FUNCAO_COORD.toString(),
											elemento.CODCARGO_COORD.toString(),
											elemento.CARGO_COORD.toString(),
											elemento.CPF_COORD.toString(),
											elemento.EMAIL_COORD.toString(),
											elemento.GESTOR.toString(),
											elemento.CODFUNCAO_GEST.toString(),
											elemento.FUNCAO_GEST.toString(), // COLUNA 30
											elemento.CODCARGO_GEST.toString(),
											elemento.CARGO_GEST.toString(),
											elemento.CPF_GEST.toString(),
											elemento.EMAIL_GEST.toString(),
											elemento.GESTOR_EXECUTIVO.toString(),
											elemento.CODFUNCAO_GEST_EXEC.toString(),
											elemento.FUNCAO_GEST_EXEC.toString(),
											elemento.CODCARGO_GEST_EXEC.toString(),
											elemento.CARGO_GEST_EXEC.toString(),
											elemento.CPF_GEST_EXEC.toString(), // COLUNA 40
											elemento.EMAIL_GEST_EXEC.toString(),
											elemento.DIRETOR.toString(),
											elemento.CODFUNCAO_DIRETOR.toString(),
											elemento.FUNCAO_DIR.toString(),
											elemento.CODCARGO_DIRETOR.toString(),
											elemento.CARGO_DIRETOR.toString(),
											elemento.CPF_DIR.toString(),
											elemento.EMAIL_DIR.toString(),
											elemento.DIRETOR_EXECUTIVO.toString(),
											elemento.CODFUNCAO_DIR_EXEC.toString(), // COLUNA 50
											elemento.FUNCAO_DIR_EXEC.toString(),
											elemento.CODCARGO_DIR_EXEC.toString(),
											elemento.CARGO_DIR_EXEC.toString(),
											elemento.CPF_DIR_EXEC.toString(),
											elemento.EMAIL_DIR_EXEC.toString(),
											elemento.VP.toString(),
											elemento.CODFUNCAO_VP.toString(),
											elemento.FUNCAO_VP.toString(),
											elemento.CODCARGO_VP.toString(),
											elemento.CARGO_VP.toString(), // COLUNA 60
											elemento.CPF_VP.toString(),
											elemento.EMAIL_VP.toString()
										));
				
				log.info (" ++ DATASET DSHIERARQUIA - DADOS USADOS >> " +
						  "elemento.EMAIL_PARTICIPANTE.toString():  " + elemento.EMAIL_PARTICIPANTE.toString() + " - " + // COLUNA 0
						  "elemento.CHAPA_PARTICIPANTE.toString() : " + elemento.CHAPA_PARTICIPANTE.toString() + " - " +
						  "elemento.PARTICIPANTE.toString() : " + elemento.PARTICIPANTE.toString() + " - " +
						  "elemento.CPF_PARTICIPANTE.toString(): " + elemento.CPF_PARTICIPANTE.toString() + " - " +
						  "elemento.CODCCUSTO.toString():" + elemento.CODCCUSTO.toString() + " - " +
						  "elemento.NOME_CCUSTO.toString(): " + elemento.NOME_CCUSTO.toString() + " - " +
						  "elemento.ITEM_CONTABIL.toString(): " + elemento.ITEM_CONTABIL.toString() + " - " +
						  "elemento.CLASSE_VALOR.toString() : " + elemento.CLASSE_VALOR.toString() + " - " +
						  "elemento.CODFUNCAO_PARTICIPANTE.toString() : " + elemento.CODFUNCAO_PARTICIPANTE.toString() + " - " +
						  "elemento.FUNCAO_PARTICIPANTE.toString() : " + elemento.FUNCAO_PARTICIPANTE.toString() + " - " + 
						  "elemento.CODCARGO_PARTICIPANTE.toString() : " + elemento.CODCARGO_PARTICIPANTE.toString() + " - " + //  COLUNA 10
						  "elemento.CARGO_PARTICIPANTE.toString() : " + elemento.CARGO_PARTICIPANTE.toString() + " - " +
						  "elemento.SEXO_PARTICIPANTE.toString() : " + elemento.SEXO_PARTICIPANTE.toString() + " - " +
						  "elemento.DATA_ADMISSAO.toString() : " + elemento.DATA_ADMISSAO.toString() + " - " +
						  "elemento.MES_ADMISSAO.toString() : " + elemento.MES_ADMISSAO.toString() + " - " +
						  "elemento.ANO_ADMISSAO.toString() : " + elemento.ANO_ADMISSAO.toString() + " - " +
						  "elemento.DATA_NASCIMENTO.toString() : " + elemento.DATA_NASCIMENTO.toString() + " - " +
						  "elemento.FILIAL_PARTICIPANTE.toString() : " + elemento.FILIAL_PARTICIPANTE.toString() + " - " +
						  "elemento.COLIGADA_PARTICIPANTE.toString() : " + elemento.COLIGADA_PARTICIPANTE.toString() + " - " +
						  "elemento.COD_SECAO_PARTICIPANTE.toString() : " + elemento.COD_SECAO_PARTICIPANTE.toString() + " - " +
						  "elemento.SECAO_PARTICIPANTE.toString() : " + elemento.SECAO_PARTICIPANTE.toString() + " - " +  // COLUNA 20
						  "elemento.COORDENADOR.toString() : " + elemento.COORDENADOR.toString() + " - " +  
						  "elemento.CODFUNCAO_COORD.toString() : " + elemento.CODFUNCAO_COORD.toString() + " - " +
						  "elemento.FUNCAO_COORD.toString() : " + elemento.FUNCAO_COORD.toString() + " - " +
						  "elemento.CODCARGO_COORD.toString() : " + elemento.CODCARGO_COORD.toString() + " - " +
						  "elemento.CARGO_COORD.toString() : " + elemento.CARGO_COORD.toString() + " - " +
						  "elemento.CPF_COORD.toString() : " + elemento.CPF_COORD.toString() + " - " +
						  "elemento.EMAIL_COORD.toString() : " + elemento.EMAIL_COORD.toString() + " - " +
						  "elemento.GESTOR.toString() : " + elemento.GESTOR.toString() + " - " +
						  "elemento.CODFUNCAO_GEST.toString() : " + elemento.CODFUNCAO_GEST.toString() + " - " +
						  "elemento.FUNCAO_GEST.toString() : " + elemento.FUNCAO_GEST.toString() + " - " + // COLUNA 30
						  "elemento.CODCARGO_GEST.toString() : " + elemento.CODCARGO_GEST.toString() + " - " +
						  "elemento.CARGO_GEST.toString() : " + elemento.CARGO_GEST.toString() + " - " +
						  "elemento.CPF_GEST.toString() : " + elemento.CPF_GEST.toString() + " - " +
						  "elemento.EMAIL_GEST.toString() : " + elemento.EMAIL_GEST.toString() + " - " +
						  "elemento.GESTOR_EXECUTIVO.toString() : " + elemento.GESTOR_EXECUTIVO.toString() + " - " +
						  "elemento.CODFUNCAO_GEST_EXEC.toString() : " + elemento.CODFUNCAO_GEST_EXEC.toString() + " - " +
						  "elemento.FUNCAO_GEST_EXEC.toString() : " + elemento.FUNCAO_GEST_EXEC.toString() + " - " +
						  "elemento.CODCARGO_GEST_EXEC.toString() : " + elemento.CODCARGO_GEST_EXEC.toString() + " - " +
						  "elemento.CARGO_GEST_EXEC.toString() : " + elemento.CARGO_GEST_EXEC.toString() + " - " +
						  "elemento.CPF_GEST_EXEC.toString() : " + elemento.CPF_GEST_EXEC.toString() + " - " + // COLUNA 40
						  "elemento.EMAIL_GEST_EXEC.toString() : " + elemento.EMAIL_GEST_EXEC.toString() + " - " +
						  "elemento.DIRETOR.toString() : " + elemento.DIRETOR.toString() + " - " +
						  "elemento.CODFUNCAO_DIRETOR.toString() : " + elemento.CODFUNCAO_DIRETOR.toString() + " - " +
						  "elemento.FUNCAO_DIR.toString() : " + elemento.FUNCAO_DIR.toString() + " - " +
						  "elemento.CODCARGO_DIRETOR.toString() : " + elemento.CODCARGO_DIRETOR.toString() + " - " +
						  "elemento.CARGO_DIRETOR.toString() : " + elemento.CARGO_DIRETOR.toString() + " - " +
						  "elemento.CPF_DIR.toString() : " + elemento.CPF_DIR.toString() + " - " +
						  "elemento.EMAIL_DIR.toString() : " + elemento.FILIAL_PARTICIPANTE.toString() + " - " +
						  "elemento.DIRETOR_EXECUTIVO.toString() : " + elemento.DIRETOR_EXECUTIVO.toString() + " - " +
						  "elemento.CODFUNCAO_DIR_EXEC.toString() : " + elemento.CODFUNCAO_DIR_EXEC.toString() + " - " + // COLUNA 50
						  "elemento.FUNCAO_DIR_EXEC.toString() : " + elemento.FUNCAO_DIR_EXEC.toString() + " - " +
						  "elemento.CODCARGO_DIR_EXEC.toString() : " + elemento.CODCARGO_DIR_EXEC.toString() + " - " +
						  "elemento.CARGO_DIR_EXEC.toString() : " + elemento.CARGO_DIR_EXEC.toString() + " - " +
						  "elemento.CPF_DIR_EXEC.toString() : " + elemento.CPF_DIR_EXEC.toString() + " - " +
						  "elemento.EMAIL_DIR_EXEC.toString() : " + elemento.EMAIL_DIR_EXEC.toString() + " - " +
						  "elemento.VP.toString() : " + elemento.VP.toString() + " - " +
						  "elemento.CODFUNCAO_VP.toString() : " + elemento.CODFUNCAO_VP.toString() + " - " +
						  "elemento.FUNCAO_VP.toString() : " + elemento.FUNCAO_VP.toString() + " - " +
						  "elemento.CODCARGO_VP.toString() : " + elemento.CODCARGO_VP.toString() + " - " +
						  "elemento.CARGO_VP.toString() : " + elemento.CARGO_VP.toString() + " - " + // COLUNA 60
						  "elemento.CPF_VP.toString() : " + elemento.CPF_VP.toString() + " - " +
						  "elemento.EMAIL_VP.toString() : " + elemento.EMAIL_VP.toString() 
						);
			} // FOR
	    } // IF EMAIL
	} // try 
	catch(error) {
		log.info (" ++ DATASET DSHIERARQUIA - ERRO:  " + error.message);
		newDataset.addRow(new Array(error.message, "erro", "erro", "erro","erro","erro","erro","erro","erro","erro","erro")); 
	}
	 
	log.info (" ++ DATASET DSHIERARQUIA - FIM ++ " );
	return newDataset;
}




/* Estrutura do wservice com todos os campos CAMPO/TAG RETORNO
SELECT MATRIZ.*
FROM
(SELECT DISTINCT  VP.NOME 'VP',  
VP.CODFUNCAO 'CODFUNCAO_VP',  
VP.FUNCAO 'FUNCAO_VP',  
VP.CODCARGO 'CODCARGO_VP',  
VP.CARGO 'CARGO_VP',  
VP.CPF 'CPF_VP',  
VP.EMAIL 'EMAIL_VP',  
DIRETOREXECUTIVO.NOME 'DIRETOR_EXECUTIVO',  
DIRETOREXECUTIVO.CODFUNCAO 'CODFUNCAO_DIR_EXEC',  
DIRETOREXECUTIVO.FUNCAO 'FUNCAO_DIR_EXEC',  
DIRETOREXECUTIVO.CODCARGO 'CODCARGO_DIR_EXEC',  
DIRETOREXECUTIVO.CARGO 'CARGO_DIR_EXEC',  
DIRETOREXECUTIVO.CPF 'CPF_DIR_EXEC',  
DIRETOREXECUTIVO.EMAIL 'EMAIL_DIR_EXEC',  
DIRETOR.NOME 'DIRETOR',  
DIRETOR.CODFUNCAO 'CODFUNCAO_DIRETOR',  
DIRETOR.FUNCAO 'FUNCAO_DIR',  
DIRETOR.CODCARGO 'CODCARGO_DIRETOR',  
DIRETOR.CARGO 'CARGO_DIRETOR',  
DIRETOR.CPF 'CPF_DIR',
  
DIRETOR.EMAIL 'EMAIL_DIR',  
GESTOREXECUTIVO.NOME 'GESTOR_EXECUTIVO',  
GESTOREXECUTIVO.CODFUNCAO 'CODFUNCAO_GEST_EXEC',  
GESTOREXECUTIVO.FUNCAO 'FUNCAO_GEST_EXEC',  
GESTOREXECUTIVO.CODCARGO 'CODCARGO_GEST_EXEC',  
GESTOREXECUTIVO.CARGO 'CARGO_GEST_EXEC',  
GESTOREXECUTIVO.CPF 'CPF_GEST_EXEC',  
GESTOREXECUTIVO.EMAIL 'EMAIL_GEST_EXEC',  
GESTOR.NOME 'GESTOR',  
GESTOR.CODFUNCAO 'CODFUNCAO_GEST',  
GESTOR.FUNCAO 'FUNCAO_GEST',  
GESTOR.CODCARGO 'CODCARGO_GEST',  
GESTOR.CARGO 'CARGO_GEST',  
GESTOR.CPF 'CPF_GEST',  
GESTOR.EMAIL 'EMAIL_GEST',  
COORDENADOR.NOME 'COORDENADOR',  
COORDENADOR.CODFUNCAO 'CODFUNCAO_COORD',  
COORDENADOR.FUNCAO 'FUNCAO_COORD',  
COORDENADOR.CODCARGO 'CODCARGO_COORD',  
COORDENADOR.CARGO 'CARGO_COORD',
  
COORDENADOR.CPF 'CPF_COORD',  
COORDENADOR.EMAIL 'EMAIL_COORD',  
PFUNC.NOME 'PARTICIPANTE',  
PFUNC.CHAPA 'CHAPA_PARTICIPANTE',
PFUNCAO.CODIGO 'CODFUNCAO_PARTICIPANTE',  
PFUNCAO.NOME 'FUNCAO_PARTICIPANTE',  
PCARGO.CODIGO 'CODCARGO_PARTICIPANTE',  
PCARGO.NOME 'CARGO_PARTICIPANTE',  
PPESSOA.CPF 'CPF_PARTICIPANTE',  
PPESSOA.EMAIL 'EMAIL_PARTICIPANTE',  
PPESSOA.SEXO 'SEXO_PARTICIPANTE',  
PFUNC.DATAADMISSAO 'DATA_ADMISSAO',  
MONTH(PFUNC.DATAADMISSAO) 'MES_ADMISSAO',  
YEAR(PFUNC.DATAADMISSAO) 'ANO_ADMISSAO',  
PPESSOA.DTNASCIMENTO 'DATA_NASCIMENTO',  
GCOLIGADA.NOMEFANTASIA 'COLIGADA_PARTICIPANTE',  
GFILIAL.NOMEFANTASIA 'FILIAL_PARTICIPANTE',  
PSECAO.CODIGO 'COD_SECAO_PARTICIPANTE',  
PSECAO.DESCRICAO 'SECAO_PARTICIPANTE',  
PCCUSTO.CODCCUSTO 'CODCCUSTO',
  
PCCUSTO.NOME 'NOME_CCUSTO'  ,
PFUNC.INTEGRCONTABIL 'ITEM_CONTABIL',
PFUNC.INTEGRGERENCIAL 'CLASSE_VALOR',
EXISTE_REQUISICAO,
TIPO_REQUISICAO
*/