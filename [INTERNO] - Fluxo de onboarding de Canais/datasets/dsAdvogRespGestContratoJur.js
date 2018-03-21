function createDataset(fields, constraints, sortFields) {

	//dsAdvogRespGestContratoJur
	
	log.info (" ++  DATASET dsAdvogRespGestContratoJur - INICIO");

	try{
		var dataset = DatasetBuilder.newDataset();
	    
		log.info (" ++ DATASET dsAdvogRespGestContratoJur - PTO 1");
		
	    //Cria as colunas
	    dataset.addColumn("item");
	    dataset.addColumn("descricao");
	
	    log.info (" ++ DATASET dsAdvogRespGestContratoJur - PTO 2");
	    
		var area = "";
		var tipo = "";
		var subtipo = "";

		// para testar comente este if e descomente um dos emails abaixo
		// usado no formulario - campo de nome do banco - busca em partes
		if (fields) {
			if (fields[0] != null){
				area = fields[0]; // enviado pelo custom.js - 0 eh conteudo, 1 é nome campo
				tipo = fields[2]; 
				subtipo = fields[4];
			}
		}
		
	    //teste
		//area = "02";

		 // x - selecione
	    if (area == "x"){
	    	 //Cria os registros
		    dataset.addRow(new Array("x", "Selecione a Area!"));
	    }
	    // 01- Acordo de Confidencialidade/NDA
	    else if (area == "01"){
	    	 dataset.addRow(new Array("01", "tamires.branco@totvs.com.br"));	
	    }
	    // 02- Administração de Contratos de Fornecedore
	    else if (area == "02"){
	    	dataset.addRow(new Array("01", "tamires.branco@totvs.com.br"));	
	    }
	    //03- Comercial Padrão  
	    else if (area == "03"){
	    	dataset.addRow(new Array("01", "alfred.azevedo@totvs.com.br"));
	    }
	    //04- Consulting
	    else if (area == "04"){
	    	dataset.addRow(new Array("01", "alfred.azevedo@totvs.com.br"));
	    }
	    //05- Contratos de Fornecimento 
	    else if (area == "05"){
	    	dataset.addRow(new Array("01", "tamires.branco@totvs.com.br"));
	    }
	    //06- Fluig ? Cliente
	    else if (area == "06"){
	    	dataset.addRow(new Array("01", "karen.hamada@totvs.com.br"));
	    }
	    //07- Fluig ? Parceiros 
	    else if (area == "07"){
	    	dataset.addRow(new Array("01", "karen.hamada@totvs.com.br"));
	    }
	    //08- Franquias e Canais
	    else if (area == "08" && tipo == "01"){
	    	dataset.addRow(new Array("01", "tamires.branco@totvs.com.br"));
	    }
	    //08- Franquias e Canais
	    else if (area == "08" && tipo == "02"){
	    	dataset.addRow(new Array("01", "alfred.azevedo@totvs.com.br"));
	    }
	    //09- Marketing 
	    else if (area == "09"){
	    	dataset.addRow(new Array("01", "tamires.branco@totvs.com.br"));
	    }
	    //10- Mercado Internacional
	    else if (area == "10"){
	    	dataset.addRow(new Array("01", "alfred.azevedo@totvs.com.br"));
	    }
	    //11- Parcerias e Alianças 
	    else if (area == "11"){
	    	dataset.addRow(new Array("01", "saulo.grotta@totvs.com.br"));
	    }
	    //12- Private
	    else if (area == "12"){
	    	dataset.addRow(new Array("01", "saulo.grotta@totvs.com.br"));
	    	dataset.addRow(new Array("02", "renan.miranda@totvs.com.br"));
	    }
	    //13- PVT
	    else if (area == "13"){
	    	dataset.addRow(new Array("01", "saulo.grotta@totvs.com.br"));
	    }
	    //14- Setor Público 
	    else if (area == "14"){
	    	dataset.addRow(new Array("01", "saulo.grotta@totvs.com.br"));
	    	dataset.addRow(new Array("02", "renan.miranda@totvs.com.br"));
	    }
	    //15- TFS
	    else if (area == "15"){
	    	dataset.addRow(new Array("01", "karen.hamada@totvs.com.br"));
	    	dataset.addRow(new Array("02", "renan.miranda@totvs.com.br"));
	    }
	    //16- TQTVD
	    else if (area == "16"){
	    	dataset.addRow(new Array("01", "alfred.azevedo@totvs.com.br"));
	    }
	    //17- Tesouraria
	    else if (area == "17"){
	    	dataset.addRow(new Array("01", "saulo.grotta@totvs.com.b"));
	    }		
		
	    //TESTE-DESENV
	    //dataset.addRow(new Array("03", "cristina.poffo@totvs.com.br"));
	    //dataset.addRow(new Array("04", "karen.hamada@totvs.com.br"));

		
	    log.info (" ++ DATASET dsAdvogRespGestContratoJur - PTO 3");
	    
	} // try 
	catch(error) {
		log.info (" ++ DATASET dsAdvogRespGestContratoJur - ERRO:  " + error.message);
		newDataset.addRow(new Array("erro", "erro")); 
	}

	log.info (" ++ DATASET dsAdvogRespGestContratoJur - FIM");
	
    return dataset;

}

//REGRA DE NEGOCIO - TEXTO E-MAIL KAREN:

/*
Cara Cristina,
Em relação ao conjunto área ? tipo de contrato, seguem os links que devem ser realizados:

------------
 * 01 Acordo de Confidencialidade/NDA (#1)
 01 TQTVD
 02 2 partes
 	-Português 
 	-Inglês   
 03 3 partes
 
  -As unidades TOTVS podem ser tanto contratante como contratada.
  -Clientes e fornecedores podem ser tanto contratante como contratada
  -Advogada responsável: Tamires Carla Cangueiro Branco <tamires.branco@totvs.com.br>

------------
 * 02 Administração de Contratos de Fornecedores (#2)         
 01 AGNe
 	-Filial 
 	-Franquia   
 02 AGNi
 03 Finder  
 04 HE
 	-TOTVS S.A.
  	-Demais empresas do grupo TOTVS        
 05 SI  
   	-TOTVS S.A.
  	-Demais empresas do grupo TOTVS
  	                
  -As unidades TOTVS serão contratante
  -Advogada responsável: Tamires Carla Cangueiro Branco <tamires.branco@totvs.com.br>

 ------------
 * 03 Comercial Padrão    
 01 CDU 
 	-Português 
 	-Inglês
 02 BSO       
 03 BPO 
 04 SMS      
 05 SCS        
 06 SLA        
 07 Garantia Estendida
       
  -As unidades TOTVS serão contratadas.
  -Como o contrato é registrado, o solicitante só vai abrir chamado para pedir aditivo (ainda não temos minuta pronta)
  -Advogado responsável: Alfred Schmitke Azevedo <alfred.azevedo@totvs.com.br>

------------
 * 04 Consulting (neste caso só há um modelo, o solicitante não precisa escolher o tipo, apenas se ENG ou PT)  (#3)
 01 Consulting 
	 -Português
	 -Inglês
	 
  -As unidades TOTVS serão contratadas
  -Advogado responsável: Alfred Schmitke Azevedo <alfred.azevedo@totvs.com.br>

------------
 * 05 Contratos de Fornecimento (#4)
 01 Ordem Compra e Fornecimento
 02 Contrato Compra e Fornecimento
 03 Prestação de Serivços
 
  -As unidades TOTVS serão contratante
  -Advogada responsável: Tamires Carla Cangueiro Branco <tamires.branco@totvs.com.br>

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
 
  -As unidades TOTVS serão contratante
  -As minutas ainda não estão finalizadas
  -Advogada responsável: Karen Harumi Hamada <karen.hamada@totvs.com.br>

------------
 * 08 Franquias e Canais  (#5)
 01 GARE 
 	-Filial
 	-Franquia
  
  -Advogada responsável: Tamires Carla Cangueiro Branco <tamires.branco@totvs.com.br>
  
 02 Franquia (não tem minuta padrão)
 
  -Advogado responsável: Alfred Schmitke Azevedo <alfred.azevedo@totvs.com.br>
  -As unidades TOTVS serão contratante

------------
 * 09 Marketing (neste caso só há um modelo, o solicitante não precisa escolher o tipo) (#6)
 01 Marketing
 	-Anexo
 	-Contrato
 	
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
 * 13 PVT  (#7) (há somente uma minuta)
 01 Nao se aplica
 
  -As unidades TOTVS serão contratadas
  -Advogado responsável: Saulo Rodrigo Grotta <saulo.grotta@totvs.com.br> 

 ------------
 * 14 Setor Público 
 01 Consultor  
 
 -As unidades TOTVS serão contratadas   
 -Advogado responsável: Saulo Rodrigo Grotta <saulo.grotta@totvs.com.br>

------------
 * 15 TFS (#8)
 01 YMF 
 	-Contrato Padrão
 	-Rescisão     
 02 TOOLS  
 03 TOTALBANCO   
 
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

 */