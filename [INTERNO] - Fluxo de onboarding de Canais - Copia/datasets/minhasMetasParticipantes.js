function createDataset(fields, constraints, sortFields) 
{
	var codigoEmpresa = "10097";
	
//	Tabelas no Desenv
//	var tabelaMeta = "fluig13x.ml10097297";
//	var tabelaParticipante = "fluig13x.ml10097298";
//	var tabelaDocumento = "fluig13x.documento";
	
//	Tabelas no Prefluig
//	var tabelaMeta = "pre_producao_fluig.ml10097219";
//	var tabelaParticipante = "pre_producao_fluig.ml10097220";
	
//	Tabelas no Fluig
	var tabelaMeta = "fluigdb.ml10097438";
	var tabelaParticipante = "fluigdb.ml10097439";
	var tabelaDocumento = "fluigdb.documento";
	var codigoFichario = "2581594";

//	Tabelas no Pr�-Fluig 1.4
//	var tabelaMeta = "pre_producao_fluig14.ml10097439";
//	var tabelaParticipante = "pre_producao_fluig14.ml10097440";
//	var tabelaDocumento = "pre_producao_fluig14.documento";
//	var codigoFichario = "2556175";
	
//	Tabelas no Fluid Lidiomar
//	var tabelaMeta = "fluig14x.ml001007";
//	var tabelaParticipante = "fluig14x.ml001008";
	
	var codigoDS = "java:/jdbc/FluigDSRO";
	
	var query = "SELECT meta.ID, 				meta.textCodigo, 			participante.textCodigoParticipantesMinhaMeta, 	participante.textNomeParticipantesMinhaMeta, ";
	query += "meta.textDescricao, 				meta.textDataIndicadores, 	meta.textTipoValorMeta, 						meta.textDirecional, ";
	query += "meta.textTipoMeta, 				meta.textOrcadoJaneiro, 	meta.textRealizadoJaneiro, 						meta.textOrcadoFevereiro, ";
	query += "meta.textRealizadoFevereiro, 		meta.textOrcadoMarco, 		meta.textRealizadoMarco, 						meta.textOrcadoAbril, ";
	query += "meta.textRealizadoAbril, 			meta.textOrcadoMaio, 		meta.textRealizadoMaio, 						meta.textOrcadoJunho, ";
	query += "meta.textRealizadoJunho, 			meta.textOrcadoJulho, 		meta.textRealizadoJulho, 						meta.textOrcadoAgosto, ";
	query += "meta.textRealizadoAgosto, 		meta.textOrcadoSetembro, 	meta.textRealizadoSetembro, 					meta.textOrcadoOutubro, ";
	query += "meta.textRealizadoOutubro, 		meta.textOrcadoNovembro, 	meta.textRealizadoNovembro, 					meta.textOrcadoDezembro, ";
	query += "meta.textRealizadoDezembro, 		meta.textOrcadoYTDJaneiro, 	meta.textRealizadoYTDJaneiro, 					meta.textOrcadoYTDFevereiro, ";
	query += "meta.textRealizadoYTDFevereiro, 	meta.textOrcadoYTDMarco, 	meta.textRealizadoYTDMarco, 					meta.textOrcadoYTDAbril, ";
	query += "meta.textRealizadoYTDAbril, 		meta.textOrcadoYTDMaio, 	meta.textRealizadoYTDMaio, 						meta.textOrcadoYTDJunho, ";
	query += "meta.textRealizadoYTDJunho, 		meta.textOrcadoYTDJulho, 	meta.textRealizadoYTDJulho, 					meta.textOrcadoYTDAgosto, ";
	query += "meta.textRealizadoYTDAgosto, 		meta.textOrcadoYTDSetembro, meta.textRealizadoYTDSetembro, 					meta.textOrcadoYTDOutubro, ";
	query += "meta.textRealizadoYTDOutubro, 	meta.textOrcadoYTDNovembro, meta.textRealizadoYTDNovembro, 					meta.textOrcadoYTDDezembro, ";
	query += "meta.textRealizadoYTDDezembro, 	meta.orYTDTotal, 			meta.reYTDTotal, 								meta.textEbtida, ";
	query += "meta.textMesReferencia ";
	query += "FROM " + tabelaMeta +" meta, "+ tabelaParticipante +" participante, "+ tabelaDocumento +" doc ";
	query += "WHERE doc.cod_empresa = "+ codigoEmpresa;
	query += " AND doc.NR_DOCUMENTO_PAI = " + codigoFichario;
	query += " AND doc.LOG_DELETE = 0 ";
	query += " AND doc.VERSAO_ATIVA = 1 ";
	query += " AND meta.ID = doc.COD_REG_LISTA ";
	query += " AND participante.masterid = meta.id ";
	if(constraints[0].initialValue == "PQ")
		query += " AND meta.textTipoMeta = '"+constraints[0].initialValue + "'";
	else
		query += " AND participante.textCodigoParticipantesMinhaMeta = '"+constraints[0].initialValue + "'";
	var dataset = DatasetBuilder.newDataset();
	var ic = new javax.naming.InitialContext();
	var ds = ic.lookup(codigoDS);

	var con = null;
	var st = null;

	try {
		con = ds.getConnection();
		st = con.createStatement();
		var rs = st.executeQuery(query);
		var column = 0;
		dataset.addColumn("idIndicador"						);  column++;
		dataset.addColumn("textCodigo"						);  column++;
		dataset.addColumn("textCodigoParticipantesMinhaMeta");  column++;
		dataset.addColumn("textNomeParticipantesMinhaMeta"	);  column++;
		dataset.addColumn("textDescricao"					);  column++;
		dataset.addColumn("textDataIndicadores"				);  column++;
		dataset.addColumn("textTipoValorMeta"				);  column++;
		dataset.addColumn("textDirecional"					);  column++;
		dataset.addColumn("textTipoMeta"					);  column++;
		dataset.addColumn("textOrcadoJaneiro"				);  column++;
		dataset.addColumn("textRealizadoJaneiro"			); 	column++;	 
		dataset.addColumn("textOrcadoFevereiro"				); 	column++;  
		dataset.addColumn("textRealizadoFevereiro"			);	column++; 
		dataset.addColumn("textOrcadoMarco"					); 	column++;     
		dataset.addColumn("textRealizadoMarco"				); 	column++;   		
		dataset.addColumn("textOrcadoAbril"					); 	column++;     		
		dataset.addColumn("textRealizadoAbril"				);  column++;
		dataset.addColumn("textOrcadoMaio"					);  column++;
		dataset.addColumn("textRealizadoMaio"				);  column++;
		dataset.addColumn("textOrcadoJunho"					); 	column++;	 
		dataset.addColumn("textRealizadoJunho"				); 	column++;  
		dataset.addColumn("textOrcadoJulho"					);	column++; 
		dataset.addColumn("textRealizadoJulho"				); 	column++;     
		dataset.addColumn("textOrcadoAgosto"				); 	column++;   		
		dataset.addColumn("textRealizadoAgosto"				); 	column++;     		
		dataset.addColumn("textOrcadoSetembro"				);  column++;
		dataset.addColumn("textRealizadoSetembro"			); 	column++;	 
		dataset.addColumn("textOrcadoOutubro"				); 	column++;  
		dataset.addColumn("textRealizadoOutubro"			);	column++; 
		dataset.addColumn("textOrcadoNovembro"				); 	column++;     
		dataset.addColumn("textRealizadoNovembro"			); 	column++;   		
		dataset.addColumn("textOrcadoDezembro"				); 	column++;     		
		dataset.addColumn("textRealizadoDezembro"			);  column++;
		dataset.addColumn("textOrcadoYTDJaneiro"			);  column++;
		dataset.addColumn("textRealizadoYTDJaneiro"			); 	column++;	 
		dataset.addColumn("textOrcadoYTDFevereiro"			); 	column++;  
		dataset.addColumn("textRealizadoYTDFevereiro"		);	column++; 
		dataset.addColumn("textOrcadoYTDMarco"				); 	column++;     
		dataset.addColumn("textRealizadoYTDMarco"			); 	column++;   		
		dataset.addColumn("textOrcadoYTDAbril"				); 	column++;     		
		dataset.addColumn("textRealizadoYTDAbril"			);  column++;
		dataset.addColumn("textOrcadoYTDMaio"				);  column++;
		dataset.addColumn("textRealizadoYTDMaio"			);  column++;
		dataset.addColumn("textOrcadoYTDJunho"				); 	column++;	 
		dataset.addColumn("textRealizadoYTDJunho"			); 	column++;  
		dataset.addColumn("textOrcadoYTDJulho"				);	column++; 
		dataset.addColumn("textRealizadoYTDJulho"			); 	column++;     
		dataset.addColumn("textOrcadoYTDAgosto"				); 	column++;   		
		dataset.addColumn("textRealizadoYTDAgosto"			); 	column++;     		
		dataset.addColumn("textOrcadoYTDSetembro"			);  column++;
		dataset.addColumn("textRealizadoYTDSetembro"		); 	column++;	 
		dataset.addColumn("textOrcadoYTDOutubro"			); 	column++;  
		dataset.addColumn("textRealizadoYTDOutubro"			);	column++; 
		dataset.addColumn("textOrcadoYTDNovembro"			); 	column++;     
		dataset.addColumn("textRealizadoYTDNovembro"		); 	column++;   		
		dataset.addColumn("textOrcadoYTDDezembro"			); 	column++;     		
		dataset.addColumn("textRealizadoYTDDezembro"		);  column++;
		dataset.addColumn("orYTDTotal"						);  column++;
		dataset.addColumn("reYTDTotal"						);  column++;
		dataset.addColumn("textEbtida"						);  column++;
		dataset.addColumn("textMesReferencia"				);  column++;
		while(rs.next()) 
		{
			var row = new Array();
			for(var i = 0; i < column; i++)
				row.push(rs.getString(i + 1));
			dataset.addRow(row);
		}
	}
	catch(e)
	{
		log.info("Erro Dataset: "+e.message);
	}

	if (st != null) st.close();
	if (con != null) con.close();

	return dataset;
}