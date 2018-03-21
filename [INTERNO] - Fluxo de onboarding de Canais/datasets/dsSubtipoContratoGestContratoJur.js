function createDataset(fields, constraints, sortFields) {
//dsSubtipoContratoGestContratoJur
	
	log.info (" ++ CRIZ2  DATASET dsSubtipoContratoGestContratoJur - INICIO");

	try{
		var dataset = DatasetBuilder.newDataset();
	    
		log.info (" ++ DATASET dsSubtipoContratoGestContratoJur - PTO 1");
		
	    //Cria as colunas
	    dataset.addColumn("item");
	    dataset.addColumn("descricao");
	
	    log.info (" ++ DATASET dsSubtipoContratoGestContratoJur - PTO 2");
	    
		var area = "";
		var tipo = "";

		// para testar comente este if e descomente um dos emails abaixo
		// usado no formulario - campo de nome do banco - busca em partes
		if (fields) {
			if (fields[0] != null){
				area = fields[0]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
				tipo = fields[2]; 
			}
		}
		
	   //teste
		//area = "02";
		//tipo = "01";

		if (area == "01"){
			dataset.addRow(new Array("01", "Ingles"));
			dataset.addRow(new Array("02", "Portugues"));
		}

		
		// 02 Administração de Contratos de Fornecedores
		else if (area == "02" && tipo == "02"){
			dataset.addRow(new Array("01", "TOTVS S.A"));
			dataset.addRow(new Array("02", "Afiliadas"));
		}
		else if (area == "02" && tipo == "04"){
			dataset.addRow(new Array("01", "TOTVS S.A."));
			dataset.addRow(new Array("02", "Demais empresas do grupo TOTVS "));
		}
		else if (area == "02" && tipo == "05"){
			dataset.addRow(new Array("01", "TOTVS S.A."));
			dataset.addRow(new Array("02", "Demais empresas do grupo TOTVS "));
		}
		
		
		//03 Comercial Padrão 
		else if (area == "03"){
			dataset.addRow(new Array("01", "Portugues"));
			dataset.addRow(new Array("02", "Ingles"));
		}
		
		
		// 04 Consulting
		else if (area == "04" && tipo == "01"){
			dataset.addRow(new Array("01", "Portugues"));
			dataset.addRow(new Array("02", "Ingles"));
		}

		
		// 08 Franquias e Canais
		else if (area == "08" && tipo == "01" ){
			dataset.addRow(new Array("01", "Filial"));
			dataset.addRow(new Array("02", "Franquia"));
		}
		else if (area == "08" && tipo == "02" ){
			dataset.addRow(new Array("01", "Filial"));
			dataset.addRow(new Array("02", "Franquia"));
		}
		else if (area == "08" && tipo == "03" ){
			dataset.addRow(new Array("01", "Filial"));
			dataset.addRow(new Array("02", "Franquia"));
		}

		
		// 09 Marketing
		//else if (area == "09" && tipo == "01"){
		else if (area == "09"){
			dataset.addRow(new Array("01", "Anexo"));
			dataset.addRow(new Array("02", "Contrato"));
		}
		
		
		// 12 Private
		else if (area == "12" && tipo == "01"){
			dataset.addRow(new Array("01", "Portugues"));
			dataset.addRow(new Array("02", "Ingles"));
		}
		
		
		// 15 TFS
		else if (area == "15" && tipo == "01"){
			dataset.addRow(new Array("01", "Contrato Padrao"));
			dataset.addRow(new Array("02", "Rescisao"));
		}
				
		// 18 CLOUD
		else if (area == "18" && tipo == "01"){
			dataset.addRow(new Array("01", "Protugues"));
			dataset.addRow(new Array("02", "Ingles"));
		}
		else {
			dataset.addRow(new Array("01", "Nao se Aplica"));
		}
		
	    log.info (" ++ DATASET dsSubtipoContratoGestContratoJur - PTO 3");
	    
	} // try 
	catch(error) {
		log.info (" ++ DATASET dsSubtipoContratoGestContratoJur - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro", "erro")); 
	}

	log.info (" ++ DATASET dsSubtipoContratoGestContratoJur - FIM");
	
    return dataset;

}

//REGRA DE NEGOCIO - TEXTO E-MAIL KAREN:

/*
TIPOS						DOCUMENTOS RELACIONADOS

------------
* 01 Acordo de Confidencialidade/NDA (#1)
01 TQTVD
	-Português  				nao tem doc
	-Inglês    				nda tqtvd 
02 2 partes
	-Português 				pt nda
	-Inglês    				eng nda bicol
03 3 partes
	-Português 				pt 3 partes 
	-Inglês  				nao tem doc

 -As unidades TOTVS podem ser tanto contratante como contratada.
 -Clientes e fornecedores podem ser tanto contratante como contratada
 -Advogada responsável: Tamires Carla Cangueiro Branco <tamires.branco@totvs.com.br>

------------
** VER DOCS COM TAMIRES
* 02 Administração de Contratos de Fornecedores (#2)         
02 AGNi 
	TOTVS					#2 Modelo AGNi 2014 - Anticorrupção -  05.05.2014
	Afiliadas 				nao tem doc
04 HE				
	-TOTVS S.A.				#2 Modelo Contrato HE 2014 23.06.2014 - pgto dia 25		
	- Afiliadas 				#2 Modelo Contrato HE 2- não TOTVS       
05 SI  
  	-TOTVS S.A.				#2 Modelo SI 2014 - Anticorrupção - 05.05.2014
 	-Demais empresas do grupo TOTVS 	#2 Modelo SI 2014 (não TOTVS) - Anticorrupção - 05.05.2014

06 Ordem de Compra e Fornecimento  //#4 Ordem de Compra e Fornecimento - Anticorrupção - 06.05.2014 e Condições Gerais da Ordem Compra  - Anticorrupção - 02.06.2014
07 contrato de Compra e Fornecimento 	#4 Contrato de Compra e Fornecimento - Anticorrupção - 06.05.2014 e Condiçõe Gerais da Compra e Fornecimento - Anticorrupção - 06.05.2014
08 Prestacao de Servicos#4 Contrato de Prestação de Serviços - Anticorrupção -  06.05.2014 e Condições Gerais da Prestação de Serviços - Anticorrupção -  02.06.2014

 -As unidades TOTVS serão contratante
 -Advogada responsável: Tamires Carla Cangueiro Branco <tamires.branco@totvs.com.br>

------------
* 03 Comercial Padrão    
01 CDU / SMS / SCS
	-Português  				Contrato Padrão_ 1.901.975
	-Inglês					Contrato Padrão 2009 Inglês
02 BSO       					VERIFICAR KAREN
03 BPO 					Contrato_modelo_2014_BPO
06 SLA        					VERIFICAR KAREN
07 Garantia Estendida				VERIFICAR KAREN
      
 -As unidades TOTVS serão contratadas.
 -Como o contrato é registrado, o solicitante só vai abrir chamado para pedir aditivo (ainda não temos minuta pronta)
 -Advogado responsável: Alfred Schmitke Azevedo <alfred.azevedo@totvs.com.br>

------------
* 04 Consulting (neste caso só há um modelo, o solicitante não precisa escolher o tipo, apenas se ENG ou PT)  (#3)
01 Consulting 					
	 -Português				#3 Minuta padrão Consulting contrato master  CORES - ALINHADA COM DENIS 21 05 14
	 -Inglês
	 
 -As unidades TOTVS serão contratadas
 -Advogado responsável: Alfred Schmitke Azevedo <alfred.azevedo@totvs.com.br>

------------
* 06 Fluig ? Cliente (neste caso só há um modelo, o solicitante não precisa escolher o tipo)
01 Nao se aplica
 
 -As unidades TOTVS serão contratadas.
 -Como o contrato é registrado, o solicitante só vai abrir chamado para pedir aditivo (ainda não temos minuta pronta)
 -Advogada responsável: Karen Harumi Hamada <karen.hamada@totvs.com.br>

------------
* 07 Fluig ? Parceiros 
01 VAR
02 Consultoria
03 Especialista de Segmento
04 Desenvolvedor                               
05 Software House
06 Fluigstore
07 Prestadora de Servicos

 -As unidades TOTVS serão contratante
 -As minutas ainda não estão finalizadas
 -Advogada responsável: Karen Harumi Hamada <karen.hamada@totvs.com.br>

------------
* 08 Franquias e Canais  (#5)
01 GARE 		
	-TOTVS S.A				#5 Minuta Padrão GARE_por Segmento_Filiais TOTVS
	-Franquia				#5 Minuta Padrão GARE_por Segmento_Franquias TOTVS
 
 -Advogada responsável: Tamires Carla Cangueiro Branco <tamires.branco@totvs.com.br>
 
02 AGNe
	-TOTVS S.A				aguardo tamires
	-Franquia				aguardo tamires

03 Finder
	-TOTVS S.A				aguardo tamires
	 -Franquia				aguardo tamires
	
04 Franquia (não tem minuta padrão)		VERIFICAR KAREN

 -Advogado responsável: Alfred Schmitke Azevedo <alfred.azevedo@totvs.com.br>
 -As unidades TOTVS serão contratante

------------
* 09 Marketing (neste caso só há um modelo, o solicitante não precisa escolher o tipo) (#6)
TROCADO NOME 01 Marketing
01 Eventos	
	-Anexo					#6 ANEXO AO CONTRATO DE PARTICIPAÇÃO EM EVENTOS
	-Contrato				#6 Contrato de Patrocínio PADRAO 200312
	
-As unidades TOTVS serão contratante
-Advogada responsável: Tamires Carla Cangueiro Branco <tamires.branco@totvs.com.br>

------------
* 10 Mercado Internacional (não há minuta padrão)
01 Nao se aplica 
 -As unidades TOTVS serão contratadas
 -Advogado responsável: Alfred Schmitke Azevedo <alfred.azevedo@totvs.com.br>

------------
* 11 Parcerias e Alianças 
01 Nao se aplica

 -As unidades TOTVS serão contratante
 -Advogado responsável: Saulo Rodrigo Grotta <saulo.grotta@totvs.com.br>

------------
* 12 Private (não tem minuta padrão)
01 CDU 
	-Português 
	-Inglês
02 BSO       
03 BPO 
04 SMS      
05 SCS        
06 SLA        
07 Garantia Estendida
    
-As unidades TOTVS serão contratadas
- Advogado responsável: Saulo Rodrigo Grotta <saulo.grotta@totvs.com.br>

------------
* 13 PVT  (#7) (há somente uma minuta)		#7 Contrato PVT - 06.05.2014
01 Nao se aplica

 -As unidades TOTVS serão contratadas
 -Advogado responsável: Saulo Rodrigo Grotta <saulo.grotta@totvs.com.br> 

------------
* 14 Setor Público 
01 Consultor  								Contrato de Consultoria Setor Publico	
02 Declaracoes
03 Contratos em geral

-As unidades TOTVS serão contratadas   
-Advogado responsável: Saulo Rodrigo Grotta <saulo.grotta@totvs.com.br>

------------
* 15 TFS (#8)
01 YMF 
	-Contrato Padrão						#8 Contrato Padrão YMF			
	-Rescisão     							#8 Modelo Rescisão YMF
02 TOOLS  									#8 Contrato  Padrão TOOLS
03 TOTALBANCO								#8 Contrato Padrão TB 27072012
		
 -As unidades TOTVS serão contratadas
 -Advogada responsável: Karen Harumi Hamada <karen.hamada@totvs.com.br>

------------
* 16 TQTVD (não há minuta padrão)
01 Nao se aplica

 -As unidades TOTVS serão contratadas
 -Advogado responsável: Alfred Schmitke Azevedo <alfred.azevedo@totvs.com.br>

-------------
* 17 Tesouraria  (não há minuta padrão) 
01 Nao se aplica
	
-As unidades TOTVS serão contratantes 
-Advogado responsável: Saulo Rodrigo Grotta <saulo.grotta@totvs.com.br>
-------------
* 18 CLOUD
01 CLOUD
	- Portugues				Asp PDF
	- ingles	
	
-Advogado responsável: Saulo Rodrigo Grotta <alfred.azevedo@totvs.com.br>

*/
