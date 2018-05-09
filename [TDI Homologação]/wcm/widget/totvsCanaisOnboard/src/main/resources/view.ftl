<div id="CanaisOnboard_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="CanaisOnboard.instance({'mode':'view'})">
	<div class="container-fluid">
		<input type="hidden" id="nrSolicitacaoOld" />
		<input type="hidden" id="dsTokenOld" />
		<input id="cdSolicitante" type="hidden"/>
		<div class="container-content">
			<div class="panel">
				<div class="panel-body img-logo">
					<h1 class="text-center text-white">
						<b>Fluxo Onboard</b>
					</h1>
				</div>
			</div>
			<div class="panel panel-info" id="divDl">
				<div class="panel-heading ">
					<h3 class="panel-title">
						<b>Dados da solicita&ccedil;&atilde;o</b>
					</h3>
				</div>
				<div class="panel-body">
					<div class="form-group row">
						<div class="col-md-6">
							<label for="nrSolicitacao" class="required">N&uacute;mero da solicita&ccedil;&atilde;o</label>
							<input name="nrSolicitacao" class="form-control" id="nrSolicitacao" type="text" readonly/>
						</div>
						<div class="col-md-6">
							<label for="dsToken" class="required">Token</label>
							<input name="dsToken" class="form-control" id="dsToken" type="text" readonly/>
						</div>
					</div>
					<div class="form-group row">
						<div style="width:100%">
							<label>&nbsp;</label>
							<button class="btn btn-info form-control" id="downloadButton" data-on-download>Efetuar download</button>
						</div>
					</div>
				</div>
			</div>
			<div class="panel panel-info" id="divUl">
				<div class="panel-heading ">
					<h3 class="panel-title">
						<b>Upload do contrato</b>
					</h3>
				</div>
				<div class="panel-body">
					<div class="form-group row">
						<div class="col-md-6">
							<label for="contratoAssinado" class="required">Contrato assinado</label>
							<input name="contratoAssinado" id="contratoAssinado" type="file" data-on-upload/>
						</div>
						<div class="col-md-6">
							<label>&nbsp;</label>
							<button type="submit" class="btn btn-info form-control" data-on-send>Enviar</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div id="pdf" class="hide">		
		<div id="contrato" class="page-main super-margin"></div>	
	</div>
	
	<div class="page_template" id="page_template">  
		<div class='header'><h1 class="h1-contract"></h1><br></div>  
		<div class='content'></div>  		
	</div>
	
	<script type="text/template" class="template_contrato_cnt">	
		{{#itens}}						
		        <p class="p-contract">De um lado,</p>
		        <p class="p-contract new-paragraph"><b>{{dsUnidadeResponsavel}}</b>, pessoa jur&iacute;dica de direito privado, Franquia TOTVS, com sede na <b>{{unidadeEndereco}}</b> na cidade <b>{{unidadeMunicipio}}</b>, no Estado de <b>{{unidadeEstado}}</b>, CEP <b>{{unidadeCep}}</b>, inscrita no CNPJ/MF sob o n&deg; <b>{{unidadeCnpj}}</b> , neste ato representada na forma de seus atos constitutivos, doravante denominada <b>FRANQUIA TOTVS</b> ou <b>FRANQUEADO</b> conforme o caso,</b>
		        <p class="p-contract">E de outro lado,</p>
		        <p class="p-contract new-paragraph"><b>{{razaoSocial}}</b>, pessoa jur&iacute;dica de direito privado, com sede na <b>{{endereco}}</b>; na cidade <b>{{nmMunicipio}}</b>, no Estado de <b>{{uf}}</b>, CEP <b>{{cep}}</b>, inscrita no CNPJ/MF sob o n&deg; <b>{{nrCnpj}}</b>, neste ato representada na forma de seus atos constitutivos, doravante denominada <b>C&eacute;lula de Neg&oacute;cios TOTVS ("CNT")</b>, </p>
		        <p class="p-contract">e, como interveniente anuente,</p>
		        <p class="p-contract new-paragraph"><b>TOTVS S.A.</b>, pessoa jur&iacute;dica de direito privado, com sede na Rua Desembargador Euclides da Silveira, 232, Casa Verde - S&atilde;o Paulo - SP, CEP 02511-010, inscrita no CNPJ/MF sob o n&deg; 53.113.791/0001-22, neste ato representada na forma de seus atos constitutivos,  doravante denominada <b>TOTVS</b>,</p>
		        <p class="p-contract new-paragraph">Resolvem, por comum acordo, celebrar o <b>Contrato de C&eacute;lula de Neg&oacute;cios TOTVS</b>, doravante denominado simplesmente <b>Contrato</b>, que se reger&aacute; pelas cl&aacute;usulas, defini&ccedil;&otilde;es e condi&ccedil;&otilde;es dispostas a seguir, bem como pelos Anexos abaixo e pela legisla&ccedil;&atilde;o aplic&aacute;vel.</p>
		        <p class="p-contract">DEFININDO QUE:</p>
		        <p class="p-contract indent">
		            S&atilde;o partes integrantes do presente <b>Contrato</b>:</br>
		            <b>Anexo CNT</b>: Cl&aacute;usulas Padr&atilde;o de uma C&eacute;lula de Neg&oacute;cios TOTVS</br>
		            <b>Anexo A</b>: Produtos e Servi&ccedil;os</br>
		            <b>Anexo B</b>: Aspectos Financeiros</br>
		            <b>Anexo C</b>: Manual Operacional CNT Padr&atilde;o</br>
		            <b>Anexo D</b>: Pacto Anticorrup&ccedil;&atilde;o
		        </p>
		        <h2 class="h2-contract">CL&Aacute;USULA A</br>DOS ANEXOS: CNT, A, B, C e D</h2>
		        <p class="p-contract new-paragraph">Fica aqui definido que os Anexos:  CNT, A, B, C e D registrados no <b>3º Oficial de Registro de T&iacute;tulos e Documentos e Civil de Pessoa Jur&iacute;dica da cidade de S&atilde;o Paulo/SP protocolizados e registrados sob o n° 8983159</b>, n&atilde;o ser&atilde;o rubricados e assinados individualmente. As partes, de comum acordo, aceitam, de forma irrevog&aacute;vel e irrestrita, que a assinatura &uacute;nica do <b>Contrato</b> garante a plena aceita&ccedil;&atilde;o dos referidos Anexos.</p>
		        <p class="p-contract new-paragraph">Os termos, frases e express&otilde;es do <b>Contrato</b> tem os significados definidos na Cl&aacute;usula 1 do Anexo CNT.</p>
		        <p class="p-contract new-paragraph">As partes concordam que o Manual Operacional CNT Padr&atilde;o, doravante denominado simplesmente <b>MCNT</b>, &eacute; elaborado e mantido pela <b>TOTVS</b> e dispensam a anexa&ccedil;&atilde;o do mesmo bem como a rubrica de suas p&aacute;ginas. A <b>CNT</b> reconhece e aceita que os documentos contidos no <b>MCNT</b> s&atilde;o v&aacute;lidos at&eacute; a data de validade que constam das suas capas. A <b>TOTVS</b> reserva-se o direito de substituir esses documentos ao final do seu prazo de validade, ou ainda, antes disso, a fim de aperfei&ccedil;o&aacute;-los, atualiz&aacute;-los e atender as necessidades de mercado.</p>		        
	      
	      		<div style="width:100%">				 			       
			       	<h2 class="h2-contract">CL&Aacute;USULA B</br>DA COMUNICA&Ccedil;&Atilde;O</h2>
			        <p class="p-contract new-paragraph">Para todos os efeitos de direito, quaisquer avisos, comunica&ccedil;&otilde;es e notifica&ccedil;&atilde;es referentes ao Contrato e seus Anexos somente ser&atilde;o considerados entregues nos endere&ccedil;os a seguir anunciados:</p>
		        </div>	
		        
		      	 <div>
	        	 	<p class="p-contract" style="float:left;width:50%;padding:0 !important;"><b>TOTVS S.A.</br>
	        						 Aos cuidados do Departamento Jur&iacute;dico</br>	
	        						 Av. Braz Leme, 1000, Jd. S&atilde;o Bento - S&atilde;o Paulo - SP</br>	
	        						 CEP 02511-000 | TEL (011) 2099-7000</b></p>
		             	
			      	<p class="p-contract" style="padding:0 !important;"><b>{{dsUnidadeResponsavel}}<br>	
			       							 Aos cuidados do Departamento Jur&iacute;dico<br>	
			       							 {{unidadeEndereco}} - {{unidadeMunicipio}} - {{unidadeEstado}}<br>	
			        						 CEP {{unidadeCep}} | TEL {{}}</b></p>
	    
	    			 <p class="p-contract" style="width:50%;padding:0 !important;"><b>{{razaoSocial}}<br>	
			       					    Aos cuidados do Departamento Jur&iacute;dico<br>	
			       						{{endereco}} - {{nmMunicipio}} - {{uf}}<br>	
	        							CEP {{cep}} | TEL {{nrTelefone}}</b></p>	
	        	</div>	
		       
		       	<div style="width:100%">
			      	<h2 class="h2-contract">CL&Aacute;USULA C</br>DO(S) SEGMENTO(S) e TERRITORIEDADE</h2>
			      	<p class="p-contract new-paragraph">Fica acordado entre <b>FRANQUIA TOTVS</b> e a <b>CNT</b> que esta est&aacute; autorizada a atuar, em car&aacute;ter n&atilde;o exclusivo, no(s) Segmento(s) e limitada ao Territ&oacute;rio descritos abaixo, desde que cumpra os requisitos e obriga&ccedil;&otilde;es do <b>Contrato</b> s&atilde;o:</p>
			      	
			      	{{#segmentosAtuacao}}
			      		<p class="p-contract new-paragraph">{{index}}) <b>{{segmentos}}</b></p>
		      		{{/segmentosAtuacao}}
		      
			      	<p class="p-contract new-paragraph">Fica definido como o Territ&oacute;rio da opera&ccedil;&atilde;o da <b>CNT</b>, para efeitos deste contrato, as seguintes cidades:</p>
			      	
			      	<p class="p-contract new-paragraph">{{territorio}}</p>
			      	
			      	<p class="p-contract new-paragraph">Fica estabelecido desde j&aacute; que a atua&ccedil;&otilde;o da CNT em cada Produto e/ou Servi&ccedil;o dispon&iacute;vel na Tabela de Pre&ccedil;os e no Anexo A est&aacute; condicionada ao cumprimento com os requisitos do Programa TOTVS de Habilita&ccedil;&otilde;o, Certifica&ccedil;&otilde;o e Homologa&ccedil;&otilde;o por Produto/Servi&ccedil;o.</p>
			      	<p class="p-contract new-paragraph">Esta Cl&aacute;usula C tem validade somente em conjunto com o “Planejamento e Compromisso Anual de Metas da CNT”, definido na Cl&aacute;usula 9 do Anexo CNT, acordado e assinado entre as partes anualmente.
			      	
			       	<h2 class="h2-contract">CL&Aacute;USULA D</br>DAS INFORMA&Ccedil;&Otilde;ES E CONDI&Ccedil;&Otilde;ES ESPEC&Iacute;FICAS</h2>
			        <p class="p-contract new-paragraph">Abaixo est&atilde;o listadas as informa&ccedil;&otilde;es e condi&ccedil;&otilde;es espec&iacute;ficas do <b>Contrato</b>:</p>
			        
			     	{{#condicoes}}
		        	<p class="p-contract new-paragraph"><b>({{romanIndex}})</b> {{condicao}}</p>
			        {{/condicoes}}
					{{^condicoes}}
		        	<p class="p-contract new-paragraph">N&atilde;o existem outras condi&ccedil;&otilde;es espec&iacute;ficas.</p>
			        {{/condicoes}}
		      	</div>
	      	       
		       	<h2 class="h2-contract">CL&Aacute;USULA E</br>DO FORO</h2>
		        <p class="p-contract new-paragraph">Fica de comum acordo eleito o foro da Comarca de S&atilde;o Paulo – SP, para dirimir quaisquer d&uacute;vidas ou controv&eacute;rsias oriundas deste instrumento, respondendo a parte culpada, ou perdedora, pelas despesas, custas processuais e honor&aacute;rios advocat&iacute;cios sucumbenciais que a parte inocente ou vencedora despender para resguardo de seus direitos.</p>
		        
		     	<p class="p-contract new-paragraph">E, por estarem justas e acordadas, as partes firmam o presente <b>Contrato</b> em 03 (tr&ecirc;s) vias de igual teor e para que produzam um s&oacute; efeito, juntamente com as 02 (duas) testemunhas abaixo nomeadas.</p>
		     	</br>
		     	<p class="p-contract">S&atilde;o Paulo, {{dia}} de {{mes}} de {{ano}}.</p>		  
		     	</br>
		     	
		     	<p class="p-contract"><b>{{dsUnidadeResponsavel}}<span class="indent-sign-name">{{razaoSocial}}</span></b></p>	
		     	</br>
		     	<p class="p-contract"><span class="indent-sign-under"></span><span class="indent-sign-name indent-sign-under"></span></br>
		     						  <b>Nome</b>:<span class="indent-sign-name"><b>Nome</b>:</span></p>      	
				</br>
		     	<p class="p-contract"><span class="indent-sign-under"></span><span class="indent-sign-name indent-sign-under"></span></br>
		     						  <b>Nome</b>:<span class="indent-sign-name"><b>Nome</b>:</span></p>      	      
				</br>
		     	<p class="p-contract"><b>TOTVS S.A.</b></p>		     
		     	</br>
		     	<p class="p-contract"><span class="indent-sign-under"></span></br>
		     						  <b>Nome</b>:</p>		
		     	</br>
		     	<p class="p-contract"><span class="indent-sign-under"></span></br>
		     						  <b>Nome</b>:</p>		
				</br>
		     	<p class="p-contract"><b>TESTEMUNHAS:</b></p>	
		     	</br>
		     	<p class="p-contract"><span class="indent-sign-under"></span><span class="indent-sign-name indent-sign-under"></span></br>
		     						  <b>Nome</b>:<span class="indent-sign-name"><b>Nome</b>:</span></br>
		     						  <b>RG</b>:<span class="indent-sign-name"><b>RG</b>:</span></br>
		     						  <b>CPF</b>:<span class="indent-sign-name"><b>CPF</b>:</span></p>   		     	   		     	   		     						  							  				  	
		{{/itens}}		               			
	</script>
	
	<script type="text/template" class="template_contrato_avt">	
		{{#itens}}			
		        <p class="p-contract">De um lado,</p>
		        <p class="p-contract new-paragraph"><b>{{dsUnidadeResponsavel}}</b>, pessoa jur&iacute;dica de direito privado, Franquia TOTVS, com sede na <b>{{unidadeEndereco}}</b> na cidade <b>{{unidadeMunicipio}}</b>, no Estado de <b>{{unidadeEstado}}</b>, CEP <b>{{unidadeCep}}</b>, inscrita no CNPJ/MF sob o n&deg; <b>{{unidadeCnpj}}</b>, doravante denominada <b>FRANQUIA TOTVS</b> ou <b>FRANQUEADO</b> conforme o caso,</b>
		       
		        <p class="p-contract">E de outro lado,</p>
		        <p class="p-contract new-paragraph"><b>{{razaoSocial}}</b>, pessoa jur&iacute;dica de direito privado, com sede na <b>{{endereco}}</b>; na cidade <b>{{nmMunicipio}}</b>, no Estado de <b>{{uf}}</b>, inscrita no CNPJ/MF sob o n&deg; <b>{{nrCnpj}}</b>, doravante denominada <b>Agente de Vendas TOTVS ("AVT")</b>, </p>
		       
		        <p class="p-contract">e, como interveniente anuente,</p>
		        <p class="p-contract new-paragraph"><b>TOTVS S.A.</b>, pessoa jur&iacute;dica de direito privado, com sede na Rua Desembargador Euclides da Silveira, 232, Casa Verde - S&atilde;o Paulo - SP, CEP 02511-010, inscrita no CNPJ/MF sob o n&deg; 53.113.791/0001-22, doravante denominada <b>TOTVS</b>,</p>
		        
		        <p class="p-contract new-paragraph">Resolvem, por comum acordo, celebrar o <b>Contrato de Agente de Vendas TOTVS</b>, doravante denominado simplesmente <b>Contrato</b>, que se reger&aacute; pelas cl&aacute;usulas, defini&ccedil;&otilde;es e condi&ccedil;&otilde;es dispostas a seguir, bem como pelos Anexos abaixo e pela legisla&ccedil;&atilde;o aplic&aacute;vel.</p>
		        
		        <p class="p-contract">DEFININDO QUE:</p>
		        <p class="p-contract indent">
		            S&atilde;o partes integrantes do presente <b>Contrato</b>:</br>
		            <b>Anexo AVT</b>: Cl&aacute;usulas Padr&atilde;o de um Agente de Vendas TOTVS</br>
		            <b>Anexo A</b>: Produtos e Servi&ccedil;os</br>
		            <b>Anexo B</b>: Aspectos Financeiros</br>
		            <b>Anexo C</b>: Manual Operacional AVT Padr&atilde;o</br>
		            <b>Anexo D</b>: Pacto Anticorrup&ccedil;&atilde;o
		        </p>
		        
		        <h2 class="h2-contract">CL&Aacute;USULA A</br>DOS ANEXOS: AVT, A, B, C e D</h2>
		        <p class="p-contract new-paragraph">Fica aqui definido que os Anexos:  AVT, A, B, C e D registrados no <b>3º Oficial de Registro de T&iacute;tulos e Documentos e Civil de Pessoa Jur&iacute;dica da cidade de S&atilde;o Paulo/SP protocolizados e registrados sob o n° 8983157</b>, ser&atilde;o rubricados e assinados individualmente. As partes, de comum acordo, aceitam, de forma irrevog&aacute;vel e irrestrita, que a assinatura &uacute;nica do <b>Contrato</b> garante a plena aceita&ccedil;&atilde;o dos referidos Anexos.</p>
		       
		        <p class="p-contract new-paragraph">Os termos, frases e express&otilde;es do <b>Contrato</b> tem os significados definidos na Cl&aacute;usula 1 do Anexo AVT.</p>
		        
		        <p class="p-contract new-paragraph">As partes concordam que o Manual Operacional AVT Padr&atilde;o, doravante denominado simplesmente <b>MAVT</b>, &eacute; elaborado e mantido pela <b>TOTVS</b> e dispensam a anexa&ccedil;&atilde;o do mesmo bem como a rubrica de suas p&aacute;ginas. O <b>AVT</b> reconhece e aceita que os documentos contidos no <b>MAVT</b> s&atilde;o v&aacute;lidos at&eacute; a data de validade que constam das suas capas. A <b>TOTVS</b> reserva-se o direito de substituir esses documentos ao final do seu prazo de validade, ou ainda, antes disso, a fim de aperfei&ccedil;o&aacute;-los, atualiz&aacute;-los e atender as necessidades de mercado.</p>		        
	      	
		       	<h2 class="h2-contract">CL&Aacute;USULA B</br>DA COMUNICA&Ccedil;&Atilde;O</h2>
		        <p class="p-contract new-paragraph">Para todos os efeitos de direito, quaisquer avisos, comunica&ccedil;&otilde;es e notifica&ccedil;&atilde;es referentes ao Contrato e seus Anexos somente ser&atilde;o considerados entregues nos endere&ccedil;os a seguir anunciados:</p>		        		       
		        
	         	 <div>	
			      	<p class="p-contract" style="float:left;width:50%;padding:0 !important;"><b>{{dsUnidadeResponsavel}}<br>	
			       							 Aos cuidados do Departamento Jur&iacute;dico<br>	
			       							 {{unidadeEndereco}} - {{unidadeMunicipio}} - {{unidadeEstado}}<br>	
			        						 CEP {{unidadeCep}} | TEL {{}}</b></p>
	    
	    			 <p class="p-contract" style="padding:0 !important;"><b>{{razaoSocial}}<br>	
			       					    Aos cuidados do Departamento Jur&iacute;dico<br>	
			       						{{endereco}} - {{nmMunicipio}} - {{uf}}<br>	
	        							CEP {{cep}} | TEL {{nrTelefone}}</b></p>	
	        							
					 <p class="p-contract" style="width:50%;padding:0 !important;"><b>TOTVS S.A.</br>
		         					     Aos cuidados do Departamento Jur&iacute;dico</br>	
		        						 Av. Braz Leme, 1000, Jd. S&atilde;o Bento - S&atilde;o Paulo - SP</br>	
	        						 	 CEP 02511-000 | TEL (011) 2099-7000</b></p>
	        	</div>
	        	
	        	 <div>	
			      	<h2 class="h2-contract">CL&Aacute;USULA C</br>DO(S) SEGMENTO(S) e TERRITORIEDADE</h2>
			      	<p class="p-contract new-paragraph">Fica acordado entre <b>FRANQUIA TOTVS</b> e o <b>AVT</b> que esta est&aacute; autorizada a atuar, em car&aacute;ter n&atilde;o exclusivo, no(s) Segmento(s) e limitada ao Territ&oacute;rio descritos abaixo, desde que cumpra os requisitos e obriga&ccedil;&otilde;es do <b>Contrato</b> s&atilde;o:</p>
			      	
		      		{{#segmentosAtuacao}}
			      		<p class="p-contract new-paragraph">{{index}}) <b>{{segmentos}}</b></p>
		      		{{/segmentosAtuacao}}
			      	
			      	<p class="p-contract new-paragraph">Fica definido como o Territ&oacute;rio da opera&ccedil;&atilde;o da <b>AVT</b>, para efeitos deste contrato, as seguintes cidades:</p>

					<p class="p-contract new-paragraph">{{territorio}}</p>
			      	
			      	<p class="p-contract new-paragraph">Esta Cl&aacute;usula C tem validade somente em conjunto com o “Planejamento e Compromisso Anual de Metas da AVT”, definido na Cl&aacute;usula 10 do Anexo AVT, acordado e assinado entre as partes anualmente.
		      
			       	<h2 class="h2-contract">CL&Aacute;USULA D</br>DAS INFORMA&Ccedil;&Otilde;ES E CONDI&Ccedil;&Otilde;ES ESPEC&Iacute;FICAS</h2>
			        <p class="p-contract new-paragraph">Abaixo est&atilde;o listadas as informa&ccedil;&otilde;es e condi&ccedil;&otilde;es espec&iacute;ficas do <b>Contrato</b>:</p>
			        
			     	{{#condicoes}}
		        	<p class="p-contract new-paragraph"><b>({{romanIndex}})</b> {{condicao}}</p>
			        {{/condicoes}}
					{{^condicoes}}
		        	<p class="p-contract new-paragraph">N&atilde;o existem outras condi&ccedil;&otilde;es espec&iacute;ficas.</p>
			        {{/condicoes}}
			    </div>
	       		 
		       	<h2 class="h2-contract">CL&Aacute;USULA E</br>DO FORO</h2>
		        <p class="p-contract new-paragraph">Fica de comum acordo eleito o foro da Comarca de S&atilde;o Paulo – SP, para dirimir quaisquer d&uacute;vidas ou controv&eacute;rsias oriundas deste instrumento, respondendo a parte culpada, ou perdedora, pelas despesas, custas processuais e honor&aacute;rios advocat&iacute;cios sucumbenciais que a parte inocente ou vencedora despender para resguardo de seus direitos.</p>
		        
		     	<p class="p-contract new-paragraph">E, por estarem justas e acordadas, as partes firmam o presente <b>Contrato</b> em 03 (tr&ecirc;s) vias de igual teor e para que produzam um s&oacute; efeito, juntamente com as 02 (duas) testemunhas abaixo nomeadas.</p>
		     	</br>
		     	<p class="p-contract">S&atilde;o Paulo, {{dia}} de {{mes}} de {{ano}}.</p>		  
		     	</br>
		     	
		     	<p class="p-contract"><b>{{dsUnidadeResponsavel}}<span class="indent-sign-name">{{razaoSocial}}</span></b></p>	
		     	</br>
		     	<p class="p-contract"><span class="indent-sign-under"></span><span class="indent-sign-name indent-sign-under"></span></br>
		     						  <b>Nome</b>:<span class="indent-sign-name"><b>Nome</b>:</span></p>      	
				</br>
		     	<p class="p-contract"><span class="indent-sign-under"></span><span class="indent-sign-name indent-sign-under"></span></br>
		     						  <b>Nome</b>:<span class="indent-sign-name"><b>Nome</b>:</span></p>      	      
				</br>
		     	<p class="p-contract"><b>TOTVS S.A. Interveniente Anuente</b></p>		     
		     	</br>
		     	<p class="p-contract"><span class="indent-sign-under"></span></br>
		     						  <b>Nome</b>:</p>		
		     	</br>
		     	<p class="p-contract"><span class="indent-sign-under"></span></br>
		     						  <b>Nome</b>:</p>		
				</br>
		     	<p class="p-contract"><b>TESTEMUNHAS:</b></p>	
		     	</br>
		     	<p class="p-contract"><span class="indent-sign-under"></span><span class="indent-sign-name indent-sign-under"></span></br>
		     						  <b>Nome</b>:<span class="indent-sign-name"><b>Nome</b>:</span></br>
		     						  <b>RG</b>:<span class="indent-sign-name"><b>RG</b>:</span></br>
		     						  <b>CPF</b>:<span class="indent-sign-name"><b>CPF</b>:</span></p>   		     	   		     	   		     						  							  				  	
	       
		{{/itens}}		               			
	</script>
	
	<script type="text/template" class="template_contrato_cat">	
		{{#itens}}
			
		        <p class="p-contract">De um lado,</p>
		        <p class="p-contract new-paragraph"><b>{{dsUnidadeResponsavel}}</b>, pessoa jur&iacute;dica de direito privado, Franquia TOTVS, com sede na <b>{{unidadeEndereco}}</b> na cidade <b>{{unidadeMunicipio}}</b>, no Estado de <b>{{unidadeEstado}}</b>, CEP <b>{{unidadeCep}}</b>, inscrita no CNPJ/MF sob o n&deg; <b>{{unidadeCnpj}}</b>, doravante denominada <b>FRANQUIA TOTVS</b> ou <b>FRANQUEADO</b> conforme o caso,</b>
		       
		        <p class="p-contract">E de outro lado,</p>
		        <p class="p-contract new-paragraph"><b>{{razaoSocial}}</b>, pessoa jur&iacute;dica de direito privado, com sede na <b>{{endereco}}</b>; na cidade <b>{{nmMunicipio}}</b>, no Estado de <b>{{uf}}</b>, inscrita no CNPJ/MF sob o n&deg; <b>{{nrCnpj}}</b>, doravante denominada <b>C&eacute;lula de Atendimento TOTVS ("CAT")</b>, </p>
		       
		        <p class="p-contract new-paragraph">Resolvem, por comum acordo, celebrar o <b>Contrato de C&eacute;lula de Atendimento TOTVS</b>, doravante denominado simplesmente <b>Contrato</b>, que se reger&aacute; pelas cl&aacute;usulas, defini&ccedil;&otilde;es e condi&ccedil;&otilde;es dispostas a seguir, bem como pelos Anexos abaixo e pela legisla&ccedil;&atilde;o aplic&aacute;vel.</p>
		        
		        <p class="p-contract">DEFININDO QUE:</p>
		        <p class="p-contract indent">
		            S&atilde;o partes integrantes do presente <b>Contrato</b>:</br>
		            <b>Anexo AVT</b>: Cl&aacute;usulas Padr&atilde;o de uma C&eacute;lula de Atendimento TOTVS</br>
		            <b>Anexo A</b>: Produtos e Servi&ccedil;os</br>
		            <b>Anexo B</b>: Aspectos Financeiros</br>
		            <b>Anexo C</b>: Manual Operacional CAT Padr&atilde;o</br>
		            <b>Anexo D</b>: Pacto Anticorrup&ccedil;&atilde;o
		        </p>
		        
		        <h2 class="h2-contract">CL&Aacute;USULA A</br>DOS ANEXOS: CAT, A, B, C e D</h2>
		        <p class="p-contract new-paragraph">Fica aqui definido que os Anexos:  CAT, A, B, C e D registrados no <b>3º Oficial de Registro de T&iacute;tulos e Documentos e Civil de Pessoa Jur&iacute;dica da cidade de S&atilde;o Paulo/SP protocolizados e registrados sob o n° 8983158</b>, n&atilde;o ser&atilde;o rubricados e assinados individualmente. As partes, de comum acordo, aceitam, de forma irrevog&aacute;vel e irrestrita, que a assinatura &uacute;nica do <b>Contrato</b> garante a plena aceita&ccedil;&atilde;o dos referidos Anexos.</p>
		       
		        <p class="p-contract new-paragraph">Os termos, frases e express&otilde;es do <b>Contrato</b> tem os significados definidos na Cl&aacute;usula 1 do Anexo CAT.</p>
		        
		        <p class="p-contract new-paragraph">As partes concordam que o Manual Operacional CAT Padr&atilde;o, doravante denominado simplesmente <b>MCAT</b>, &eacute; elaborado e mantido pela <b>TOTVS</b> e dispensam a anexa&ccedil;&atilde;o do mesmo bem como a rubrica de suas p&aacute;ginas. O <b>CAT</b> reconhece e aceita que os documentos contidos no <b>MCAT</b> s&atilde;o v&aacute;lidos at&eacute; a data de validade que constam das suas capas. A <b>TOTVS</b> reserva-se o direito de substituir esses documentos ao final do seu prazo de validade, ou ainda, antes disso, a fim de aperfei&ccedil;o&aacute;-los, atualiz&aacute;-los e atender as necessidades de mercado.</p>		        
	      			 
		       	<h2 class="h2-contract">CL&Aacute;USULA B</br>DA COMUNICA&Ccedil;&Atilde;O</h2>
		        <p class="p-contract new-paragraph">Para todos os efeitos de direito, quaisquer avisos, comunica&ccedil;&otilde;es e notifica&ccedil;&atilde;es referentes ao Contrato e seus Anexos somente ser&atilde;o considerados entregues nos endere&ccedil;os a seguir anunciados:</p>		        		       
		        
		         <div>	  	
			      	<p class="p-contract" style="width:50%;float:left;padding:0 !important;"><b>{{dsUnidadeResponsavel}}<br>	
			       							 Aos cuidados do Departamento Jur&iacute;dico<br>	
			       							 {{unidadeEndereco}} - {{unidadeMunicipio}} - {{unidadeEstado}}</br>	
	        								 CEP {{unidadeCep}} | TEL {{}}</b></p>
	    
	    			 <p class="p-contract" style="padding:0 !important;"><b>{{razaoSocial}}<br>	
			       					    Aos cuidados do Departamento Jur&iacute;dico<br>	
		       							{{endereco}} - {{nmMunicipio}} - {{uf}}<br>	
	        							CEP {{cep}} | TEL {{nrTelefone}}</b></p>	
	        	</div>
		        
	        	 <div>		        
			      	<h2 class="h2-contract">CL&Aacute;USULA C</br>DO(S) SEGMENTO(S) e TERRITORIEDADE</h2>
			      	<p class="p-contract new-paragraph">Fica acordado entre <b>FRANQUIA TOTVS</b> e o <b>CAT</b> que esta est&aacute; autorizada a atuar, em car&aacute;ter n&atilde;o exclusivo, no(s) Segmento(s) e limitada ao Territ&oacute;rio descritos abaixo, desde que cumpra os requisitos e obriga&ccedil;&otilde;es do <b>Contrato</b> s&atilde;o:</p>
			      	
			      	{{#segmentosAtuacao}}
			      		<p class="p-contract new-paragraph">{{index}}) <b>{{segmentos}}</b></p>
		      		{{/segmentosAtuacao}}
			      	
			      	<p class="p-contract new-paragraph">Fica definido como o Territ&oacute;rio da opera&ccedil;&atilde;o da <b>CAT</b>, para efeitos deste contrato, as seguintes cidades:</p>
			      	
			      	<p class="p-contract new-paragraph"><b>{{territorio}}.</b></p>
			      	
			      	<p class="p-contract new-paragraph">Esta Cl&aacute;usula C tem validade somente em conjunto com o “Planejamento e Compromisso Anual de Metas da CAT”, definido na Cl&aacute;usula 10 do Anexo CAT, acordado e assinado entre as partes anualmente.
		      
			       	<h2 class="h2-contract">CL&Aacute;USULA D</br>DAS INFORMA&Ccedil;&Otilde;ES E CONDI&Ccedil;&Otilde;ES ESPEC&Iacute;FICAS</h2>
			        <p class="p-contract new-paragraph">Abaixo est&atilde;o listadas as informa&ccedil;&otilde;es e condi&ccedil;&otilde;es espec&iacute;ficas do <b>Contrato</b>:</p>
			        
			     	<p class="p-contract new-paragraph"><b>(i)</b> Os Clientes que ser&atilde;o atendidos pela CAT fazem parte de sua lista de clientes e est&atilde;o relacionados abaixo:</p>
		     	</div>
		     	
		     	<div id="tableClientes">
			     	<table class="table table-bordered">
			     		<tr>
			     			<th width="100">C&oacute;digo</th>
				   	 		<th width="200">Nome</th>
					    	<th width="160">CNPJ</th>
					    	<th width="160">Receita Anual Recorrente</th>
					    	<th width="65">NPS</th>
					  	</tr>
					  	{{#clientes}}
					  	<tr>
					  		<td>{{codigo}}</td>
					    	<td>{{nome}}</td>
					    	<td>{{cnpj}}</td>
					    	<td>{{receita}}</td>
					    	<td>+{{nps}}</td>
					  	</tr>
					  	{{/clientes}}
			     	</table>
		     	</div>
		     	<br/>
		     	 <div>	
			     	 <p class="p-contract new-paragraph">Altera&ccedil;&otilde;es na lista de clientes acima devem ser formalizadas, com as respectivas datas de inclus&atilde;o ou exclus&atilde;o e seus motivos, no “Planejamento e Compromisso Anual de Metas da CAT”, conforme Cl&aacute;usula 10 do Anexo CAT.</p>
			        	
			         <p class="p-contract new-paragraph"><b>(ii)</b> O total da receita anual recorrente dos Clientes acima relacionados &eacute; de R$ {{vlTotalReceitaAnual}};</p>
			         
			         <p class="p-contract new-paragraph"><b>(iii)</b> O NPS m&eacute;dio dos Clientes acima relacionados &eacute; de +{{pctMediaNps}};</p>
			         
			         <p class="p-contract new-paragraph"><b>(iv)</b> Para o ano da assinatura deste Contrato a meta de crescimento l&iacute;quido da receita recorrente &eacute; de <b>{{pctMetaCrescimento}}%</b>, ou seja, excluindo-se a corre&ccedil;&atilde;o no per&iacute;odo dos contratos recorrentes destes Cientes pelos &iacute;ndices definidos nos mesmos. Para os demais anos calend&aacute;rios, a meta de crescimento l&iacute;quido da receita recorrente ser&aacute; definida e descrita no “Planejamento e Compromisso Anual de Metas da CAT”, conforme Cl&aacute;usula 9 do Anexo CAT;</p>			        	      			         	     
		        </div>      	
	      	 
		        <p class="p-contract new-paragraph"><b>(v)</b> Para o ano da assinatura deste Contrato a meta do NPS m&eacute;dio (m&eacute;dia aritm&eacute;tica simples) dos Clientes relacionados acima &eacute; de <b>+{{pctMetaNps}}</b>. Para os demais anos calend&acute;rios, a meta de NPS m&eacute;dio ser&aacute; definida e descrita no “Planejamento e Compromisso Anual de Metas da CAT”, conforme Cl&aacute;usula 9 do Anexo CAT;</p>
	        	
	        	{{#condicoes}}
	        	<p class="p-contract new-paragraph"><b>({{romanIndex}})</b> {{condicao}}</p>
		        {{/condicoes}}
				{{^condicoes}}
	        	<p class="p-contract new-paragraph">N&atilde;o existem outras condi&ccedil;&otilde;es espec&iacute;ficas.</p>
		        {{/condicoes}}
				
		       	<h2 class="h2-contract">CL&Aacute;USULA E</br>DO FORO</h2>
		        <p class="p-contract new-paragraph">Fica de comum acordo eleito o foro da Comarca de S&atilde;o Paulo – SP, para dirimir quaisquer d&uacute;vidas ou controv&eacute;rsias oriundas deste instrumento, respondendo a parte culpada, ou perdedora, pelas despesas, custas processuais e honor&aacute;rios advocat&iacute;cios sucumbenciais que a parte inocente ou vencedora despender para resguardo de seus direitos.</p>
		        
		     	<p class="p-contract new-paragraph">E, por estarem justas e acordadas, as partes firmam o presente <b>Contrato</b> em 02 (duas) vias de igual teor e para que produzam um s&oacute; efeito, juntamente com as 02 (duas) testemunhas abaixo nomeadas.</p>
		     	</br>
		     	<p class="p-contract">S&atilde;o Paulo, {{dia}} de {{mes}} de {{ano}}.</p>		  
		     	</br>
		     	
		     	<p class="p-contract"><b>{{dsUnidadeResponsavel}}<span class="indent-sign-name">{{razaoSocial}}</span></b></p>	
		     	</br>
		     	<p class="p-contract"><span class="indent-sign-under"></span><span class="indent-sign-name indent-sign-under"></span></br>
		     						  <b>Nome</b>:<span class="indent-sign-name"><b>Nome</b>:</span></p>      	
				</br>
		     	<p class="p-contract"><span class="indent-sign-under"></span><span class="indent-sign-name indent-sign-under"></span></br>
		     						  <b>Nome</b>:<span class="indent-sign-name"><b>Nome</b>:</span></p>      	      
				</br>
		     
		     	<p class="p-contract"><b>TESTEMUNHAS:</b></p>	
		     	</br>
		     	<p class="p-contract"><span class="indent-sign-under"></span><span class="indent-sign-name indent-sign-under"></span></br>
		     						  <b>Nome</b>:<span class="indent-sign-name"><b>Nome</b>:</span></br>
		     						  <b>RG</b>:<span class="indent-sign-name"><b>RG</b>:</span></br>
		     						  <b>CPF</b>:<span class="indent-sign-name"><b>CPF</b>:</span></p>   		     	   		     	   		     						  							  				  	
	      
		{{/itens}}		               			
	</script>
	
	<script type="text/template" class="template_contrato_masterpvf_totvs">	
		{{#itens}}
		        <p class="p-contract">De um lado,</p>
		        <p class="p-contract new-paragraph"><b>{{razaoSocial}}</b>, pessoa jur&iacute;dica de direito privado, Franquia TOTVS, com sede na <b>{{endereco}}</b> na cidade <b>{{nmMunicipio}}</b>, no Estado de <b>{{uf}}</b>, CEP <b>{{cep}}</b>, inscrita no CNPJ/MF sob o n&deg; <b>{{nrCnpj}}</b> e com Inscri&ccedil;&atilde;o Estadual nº <b>{{nrEscricaoEstadual}}</b>, doravante denominada <b>Master PVF</b> ou <b>Master Ponto de Vendas Fly01</b>,
		       
		        <p class="p-contract">E de outro lado,</p>
		        <p class="p-contract new-paragraph"><b>TOTVS S.A.</b>, pessoa jur&iacute;dica de direito privado, com sede na Avenida Braz Leme, Jardim S&atilde;o Bento, S&atilde;o Paulo/SP, inscrita no CNPJ/MF sob o n&deg; <b>53.113.791/0001-22</b> e com inscri&ccedil;&atilde;o Estadual nº 111.010.945.111, doravante denominada <b>TOTVS</b>, </p>
		       
		        <p class="p-contract new-paragraph">Resolvem, por comum acordo, celebrar o <b>Contrato de Master Ponto de Vendas Fly01</b>, doravante denominado simplesmente <b>Contrato</b>, que se reger&aacute; pelas cl&aacute;usulas, defini&ccedil;&otilde;es e condi&ccedil;&otilde;es dispostas a seguir, bem como pelos Anexos abaixo e pela legisla&ccedil;&atilde;o aplic&aacute;vel.</p>
		        
		        <p class="p-contract">DEFININDO QUE:</p>
		        <p class="p-contract indent">
		            S&atilde;o partes integrantes do presente <b>Contrato</b>:</br>
		            <b>Anexo MASTER PVF</b>: Cl&aacute;usulas Padr&atilde;o de um Master Ponto de Vendas Fly01</br>
		            <b>Anexo A</b>: Produtos e Servi&ccedil;os</br>
		            <b>Anexo B</b>: Aspectos Financeiros</br>
		            <b>Anexo C</b>: Manual Operacional Master PVF Padr&atilde;o</br>
		            <b>Anexo D</b>: Pacto Anticorrup&ccedil;&atilde;o
		        </p>
		        
		        <h2 class="h2-contract">CL&Aacute;USULA A</br>DOS ANEXOS: MASTER PVF, A, B, C e D</h2>
		        <p class="p-contract new-paragraph">Fica aqui definido que os Anexos:  MASTER PVF, A, B, C e D registrados no <b>6º Oficial de Registro de T&iacute;tulos e Documentos e Civil de Pessoa Jur&iacute;dica da Capital</b>, protocolizados e registrados respctivamente sob o nº <b>1.815.456</b>, n&atilde;o ser&atilde;o rubricados e assinados individualmente. As partes, de comum acordo, aceitam, de forma irrevog&aacute;vel e irrestrita, que a assinatura &uacute;nica do <b>Contrato</b> garante a plena aceita&ccedil;&atilde;o dos referidos Anexos.</p>
		       
		        <p class="p-contract new-paragraph">Os termos, frases e express&otilde;es do <b>Contrato</b> tem os significados definidos na Cl&aacute;usula 1 do Anexo MASTER PVF.</p>
		        
		        <p class="p-contract new-paragraph">As partes concordam que o Manual Operacional PVF Padr&atilde;o, doravante denominado simplesmente <b>MPVF</b>, &eacute; elaborado e mantido pela <b>TOTVS</b> e dispensam a anexa&ccedil;&atilde;o do mesmo bem como a rubrica de suas p&aacute;ginas. O <b>Master PVF</b> reconhece e aceita que os documentos contidos no <b>MPVF</b> s&atilde;o v&aacute;lidos at&eacute; a data de validade que constam das suas capas. A <b>TOTVS</b> reserva-se o direito de substituir esses documentos ao final do seu prazo de validade, ou ainda, antes disso, a fim de aperfei&ccedil;o&aacute;-los, atualiz&aacute;-los e atender as necessidades de mercado.</p>		        
	      			 
		       	<h2 class="h2-contract">CL&Aacute;USULA B</br>DA COMUNICA&Ccedil;&Atilde;O</h2>
		        <p class="p-contract new-paragraph">Para todos os efeitos de direito, quaisquer avisos, comunica&ccedil;&otilde;es e notifica&ccedil;&atilde;es referentes ao Contrato e seus Anexos somente ser&atilde;o considerados entregues nos endere&ccedil;os a seguir anunciados:</p>		        		       
		        	
		         <div>	  	
			      	<p class="p-contract" style="width:50%;float:left;padding:0 !important;"><b>TOTVS S.A.<br>	
			       							 Aos cuidados do Departamento Jur&iacute;dico<br>	
			       							 Av. Braz Leme, 1000, Jd. S&atilde;o Bento - S&atilde;o Paulo - SP</br>	
	        						 		 CEP 02511-000 | TEL (011) 2099-7000</b></p>
	    
	    			 <p class="p-contract" style="padding:0 !important;"><b>{{razaoSocial}}<br>	
			       					    Aos cuidados de DEFINIR<br>	
			       						{{endereco}} - {{nmMunicipio}} - {{uf}}<br>	
	        							CEP {{cep}} | TEL {{nrTelefone}}</b></p>	
	        	</div>			        	      			     			      		        
		   
		      	<h2 class="h2-contract">CL&Aacute;USULA C</br>DO PORTF&Oacute;LIO e TERRITORIEDADE</h2>
		      	<p class="p-contract new-paragraph">Fica acordado entre a <b>TOTVS</b> e o <b>Master PVF</b> que este est&aacute; autorizada a atuar, em car&aacute;ter n&atilde;o exclusivo, com os Produtos e/ou Servi&ccedil;os listados na Tabela de Pre&ccedil;os para o mercado de <b>Microempresas</b> em Territ&oacute;rio Nacional, ou seja, em otdo e qualquer munic&iacute;pio do Brasil, desde que cumpra os requisitos e obriga&ccedil;&otilde;es do <b>Contrato.</b></p>
		      	
		      	<p class="p-contract new-paragraph">Fica estabelecido desde j&aacute; que a atua&ccedil;&otilde;o do <b>Master PVF</b> e do(s) seu(s) respectivo(s) <b>PVF(s)</b>, em cada Segmento/Produto/Servi&ccedil;o dispon&iacute;vel na Tabela de Pre&ccedil;os e no Anexo A para o mercado de <b>Microempresas</b>, est&aacute; condicionada ao cumprimento dos requisitos do <b>Programa TOTVS de Habilita&ccedil;&otilde;o, Certifica&ccedil;&otilde;o e Homologa&ccedil;&otilde;o</b> por Segmento/Produto/Servi&ccedil;o.</p>
		      	
		      	<p class="p-contract new-paragraph">Esta Cl&aacute;usula C tem validade somente em conjunto com o “Planejamento e Compromisso Anual de Metas do <b>Master PVF</b>”, definido na Cl&aacute;usula 8 do Anexo <b>Master PVF</b>, acordado e assinado entre as partes anualmente.
	      
		       	<h2 class="h2-contract">CL&Aacute;USULA D</br>N&Atilde;O EXCLUSIVIDADE</h2>
		       	
		        <p class="p-contract new-paragraph">O <b>Master PVF</b> e o(s) seu(s) respectivo(s) <b>PVF(s)</b> n&atilde;o ter&atilde;o qualquer esp&eacute;cie de exclusividade na execu&ccedil;&atilde;o do objeto contratual, seja em rela&ccedil;&atilde;o: à comercializa&ccedil;&atilde;o de Produtos e/ou Servi&ccedil;os e à presta&ccedil;&atilde;o de Servi&ccedil;os dispostos no <b>Anexo A</b>, ao <b>Territ&oacute;rio</b> de atua&ccedil;&atilde;o, ao atendimento de empresas que n&atilde;o estejam cadastradas nos sistemas internos TOTVS ou que estejam em desacordo com as regras e condi&ccedil;&otilde;es de gest&atilde;o destes.</p>

				<p class="p-contract new-paragraph">A <b>TOTVS</b> poder&aacute;, a qualquer tempo, credenciar outros <b>Master PVFs</b> e/ou <b>PVFs</b>, consultores, revendedores e/ou outros Canais de Venda para atua&ccedil;&atilde;o dentro e/ou fora do Territ&oacute;rio, bem como exercer atividades comerciais, sem que tal fato implique em descumprimento do presente <b>Contrato</b>.</p>
		        
		        <p class="p-contract new-paragraph">O <b>Master PVF</b> est&aacute; ciente e ratifica que o objeto desde Contrato &eacute; de car&aacute;ter n&atilde;o exclusivo e que, tem-se como prerrogativa que em sua opera&ccedil;&atilde;o, o <b>Master PVF</b> e o(s) seu(s) respectivo(s) <b>PVFs</b> poder&atilde;o, a seu exclusivo crit&eacute;rio, atuar com portf&oacute;lios concorrentes e/ou complementares aos dispostos no Anexo A, isentando a <b>TOTVS</b> de toda e qualquer responsabilidade sobre a sua opera&ccedil;&atilde;o, conforme Cl&aacute;usula 11 do Anexo <b>Master PVF</b>.</p>
		        
		        <h2 class="h2-contract">CL&Aacute;USULA E</br>DAS INFORMA&Ccedil;&Otidel;ES E CONDI&Ccedil;&Otidel;ES ESPEC&Iacute;FICAS</h2>
		        <p class="p-contract new-paragraph">Abaixo est&atilde;o listadas as informa&ccedil;&otilde;es e condi&ccedil;&otilde;es espec&iacute;ficas do <b>Contrato</b>:</p>
		        
		     	<p class="p-contract new-paragraph"><b>(i)</b> O plano inicial de neg&oacute;cios e as metas iniciais do <b>Master PVF</b> e do(s) seu(s) respectivo(s) <b>PVFs</b> dever&atilde;o ser formalizados em seu primeiro "Planejamento e Compromisso Anual de Metas do <b>Master PVF</b>", tendo este, excepcionalmente, validade da data de assinatura deste <b>Contrato</b> at&eacute; o encerramento do presente ano calend&aacute;rio;</p>
		     	
		     	<p class="p-contract new-paragraph"><b>(ii)</b> CONDI&Ccedil;&Atilde;O ESPEC&Iacute;FICA 01;</p>
		     	
		     	<p class="p-contract new-paragraph">N&atilde;o existem outras condi&ccedil;&otilde;es espec&iacute;ficas.</p>		     
	      	 
		       	<h2 class="h2-contract">CL&Aacute;USULA F</br>DO FORO</h2>
		        <p class="p-contract new-paragraph">Fica de comum acordo eleito o foro da Comarca de S&atilde;o Paulo – SP, para dirimir quaisquer d&uacute;vidas ou controv&eacute;rsias oriundas deste instrumento, respondendo a parte culpada, ou perdedora, pelas despesas, custas processuais e honor&aacute;rios advocat&iacute;cios sucumbenciais que a parte inocente ou vencedora despender para resguardo de seus direitos.</p>
		        
		     	<p class="p-contract new-paragraph">E, por estarem justas e acordadas, as partes firmam o presente <b>Contrato</b> em 02 (duas) vias de igual teor e para que produzam um s&oacute; efeito, juntamente com as 02 (duas) testemunhas abaixo nomeadas.</p>
		     	</br>
		     	<p class="p-contract">S&atilde;o Paulo, {{dia}} de {{mes}} de {{ano}}.</p>		  
		     	</br>
		     	
		     	<p class="p-contract"><b>TOTVS S.A.<span class="indent-sign-name">{{razaoSocial}}</span></b></p>	
		     	</br>
		     	<p class="p-contract"><span class="indent-sign-under"></span><span class="indent-sign-name indent-sign-under"></span></br>
		     						  <b>Nome</b>:<span class="indent-sign-name"><b>Nome</b>:</span></p>      	
				</br>
		     	<p class="p-contract"><span class="indent-sign-under"></span><span class="indent-sign-name indent-sign-under"></span></br>
		     						  <b>Nome</b>:<span class="indent-sign-name"><b>Nome</b>:</span></p>      	      
				</br>
		     
		     	<p class="p-contract"><b>TESTEMUNHAS:</b></p>	
		     	</br>
		     	<p class="p-contract"><span class="indent-sign-under"></span><span class="indent-sign-name indent-sign-under"></span></br>
		     						  <b>Nome</b>:<span class="indent-sign-name"><b>Nome</b>:</span></br>
		     						  <b>RG</b>:<span class="indent-sign-name"><b>RG</b>:</span></br>
		     						  <b>CPF</b>:<span class="indent-sign-name"><b>CPF</b>:</span></p>   		     	   		     	   		     						  							  				  	
	       
		{{/itens}}		               			
	</script>
	
	<script type="text/template" class="template_contrato_pvf_totvs">	
		{{#itens}}
		        <p class="p-contract">De um lado,</p>
		        <p class="p-contract new-paragraph"><b>{{razaoSocial}}</b>, pessoa jur&iacute;dica de direito privado, Franquia TOTVS, com sede na <b>{{endereco}}</b> na cidade <b>{{nmMunicipio}}</b>, no Estado de <b>{{uf}}</b>, CEP <b>{{cep}}</b>, inscrita no CNPJ/MF sob o n&deg; <b>{{nrCnpj}}</b> e com Inscri&ccedil;&atilde;o Estadual nº <b>{{nrEscricaoEstadual}}</b>, doravante denominada <b>PVF</b> ou <b>Ponto de Vendas Fly01</b>,
		       
		        <p class="p-contract">E de outro lado,</p>
		        <p class="p-contract new-paragraph"><b>TOTVS S.A.</b>, pessoa jur&iacute;dica de direito privado, com sede na Avenida Braz Leme, Jardim S&atilde;o Bento, S&atilde;o Paulo/SP, inscrita no CNPJ/MF sob o n&deg; <b>53.113.791/0001-22</b> e com inscri&ccedil;&atilde;o Estadual nº 111.010.945.111, doravante denominada <b>TOTVS</b>, </p>
		       
		        <p class="p-contract new-paragraph">Resolvem, por comum acordo, celebrar o <b>Contrato de Ponto de Vendas Fly01</b>, doravante denominado simplesmente <b>Contrato</b>, que se reger&aacute; pelas cl&aacute;usulas, defini&ccedil;&otilde;es e condi&ccedil;&otilde;es dispostas a seguir, bem como pelos Anexos abaixo e pela legisla&ccedil;&atilde;o aplic&aacute;vel.</p>
		        
		        <p class="p-contract">DEFININDO QUE:</p>
		        <p class="p-contract indent">
		            S&atilde;o partes integrantes do presente <b>Contrato</b>:</br>
		            <b>Anexo PVF</b>: Cl&aacute;usulas Padr&atilde;o de um Ponto de Vendas Fly01</br>
		            <b>Anexo A</b>: Produtos e Servi&ccedil;os</br>
		            <b>Anexo B</b>: Aspectos Financeiros</br>
		            <b>Anexo C</b>: Manual Operacional PVF Padr&atilde;o</br>
		            <b>Anexo D</b>: Pacto Anticorrup&ccedil;&atilde;o
		        </p>
		        
		        <h2 class="h2-contract">CL&Aacute;USULA A</br>DOS ANEXOS: PVF, A, B, C e D</h2>
		        <p class="p-contract new-paragraph">Fica aqui definido que os Anexos: PVF, A, B, C e D registrados no <b>8º Oficial de Registro de T&iacute;tulos e Documentos e Civil de Pessoa Jur&iacute;dica da Capital</b>, protocolizados e registrados respctivamente sob o nº <b>1.414.204</b>, n&atilde;o ser&atilde;o rubricados e assinados individualmente. As partes, de comum acordo, aceitam, de forma irrevog&aacute;vel e irrestrita, que a assinatura &uacute;nica do <b>Contrato</b> garante a plena aceita&ccedil;&atilde;o dos referidos Anexos.</p>
		       
		        <p class="p-contract new-paragraph">Os termos, frases e express&otilde;es do <b>Contrato</b> tem os significados definidos na Cl&aacute;usula 1 do Anexo PVF.</p>
		        
		        <p class="p-contract new-paragraph">As partes concordam que o Manual Operacional PVF Padr&atilde;o, doravante denominado simplesmente <b>MPVF</b>, &eacute; elaborado e mantido pela <b>TOTVS</b> e dispensam a anexa&ccedil;&atilde;o do mesmo bem como a rubrica de suas p&aacute;ginas. O <b>PVF</b> reconhece e aceita que os documentos contidos no <b>MPVF</b> s&atilde;o v&aacute;lidos at&eacute; a data de validade que constam das suas capas. A <b>TOTVS</b> reserva-se o direito de substituir esses documentos ao final do seu prazo de validade, ou ainda, antes disso, a fim de aperfei&ccedil;o&aacute;-los, atualiz&aacute;-los e atender as necessidades de mercado.</p>		        
	      			 
		       	<h2 class="h2-contract">CL&Aacute;USULA B</br>DA COMUNICA&Ccedil;&Atilde;O</h2>
		        <p class="p-contract new-paragraph">Para todos os efeitos de direito, quaisquer avisos, comunica&ccedil;&otilde;es e notifica&ccedil;&atilde;es referentes ao Contrato e seus Anexos somente ser&atilde;o considerados entregues nos endere&ccedil;os a seguir anunciados:</p>		        		       
		        	    
				 <div>	
			      	<p class="p-contract" style="width:50%;float:left;padding:0 !important;"><b>TOTVS S.A.<br>	
			       							 Aos cuidados do Departamento Jur&iacute;dico<br>	
			       							 Av. Braz Leme, 1000, Jd. S&atilde;o Bento - S&atilde;o Paulo - SP</br>	
	        						 		 CEP 02511-000 | TEL (011) 2099-7000</b></p>
	    
	    			 <p class="p-contract" style="padding:0 !important;"><b>{{razaoSocial}}<br>	
			       					    Aos cuidados de DEFINIR<br>	
		       							{{endereco}} - {{nmMunicipio}} - {{uf}}<br>	
	        							CEP {{cep}} | TEL {{nrTelefone}}</b></p>	
	        	</div>	       
		        	   
		      	<h2 class="h2-contract">CL&Aacute;USULA C</br>DO PORTF&Oacute;LIO e TERRITORIEDADE</h2>
		      	<p class="p-contract new-paragraph">Fica acordado entre a <b>TOTVS</b> e o <b>PVF</b> que este est&aacute; autorizada a atuar, em car&aacute;ter n&atilde;o exclusivo, com os Produtos e/ou Servi&ccedil;os listados na Tabela de Pre&ccedil;os para o mercado de <b>Microempresas</b> em Territ&oacute;rio Nacional, ou seja, em otdo e qualquer munic&iacute;pio do Brasil, desde que cumpra os requisitos e obriga&ccedil;&otilde;es do <b>Contrato.</b></p>
		      	
		      	<p class="p-contract new-paragraph">Fica estabelecido desde j&aacute; que a atua&ccedil;&otilde;o do <b>PVF</b> em cada Segmento/Produto/Servi&ccedil;o dispon&iacute;vel na Tabela de Pre&ccedil;os e no Anexo A para o mercado de <b>Microempresas</b>, est&aacute; condicionada ao cumprimento dos requisitos do <b>Programa TOTVS de Habilita&ccedil;&otilde;o, Certifica&ccedil;&otilde;o e Homologa&ccedil;&otilde;o</b> por Segmento/Produto/Servi&ccedil;o.</p>
		      	
		      	<p class="p-contract new-paragraph">Esta Cl&aacute;usula C tem validade somente em conjunto com o “Planejamento e Compromisso Anual de Metas do <b>PVF</b>”, definido na Cl&aacute;usula 8 do Anexo <b>PVF</b>, acordado e assinado entre as partes anualmente.
	      
		       	<h2 class="h2-contract">CL&Aacute;USULA D</br>N&Atilde;O EXCLUSIVIDADE</h2>
		       	
		        <p class="p-contract new-paragraph">O <b>PVF</b> n&atilde;o ter&atilde;o qualquer esp&eacute;cie de exclusividade na execu&ccedil;&atilde;o do objeto contratual, seja em rela&ccedil;&atilde;o: à comercializa&ccedil;&atilde;o de Produtos e/ou Servi&ccedil;os e à presta&ccedil;&atilde;o de Servi&ccedil;os dispostos no <b>Anexo A</b>, ao <b>Territ&oacute;rio</b> de atua&ccedil;&atilde;o, ao atendimento de empresas que n&atilde;o estejam cadastradas nos sistemas internos TOTVS ou que estejam em desacordo com as regras e condi&ccedil;&otilde;es de gest&atilde;o do CRM.</p>

				<p class="p-contract new-paragraph">A <b>TOTVS</b> poder&aacute;, a qualquer tempo, credenciar outros <b>Pontos de Vendas</b>, consultores, revendedores e/ou outros Canais de Venda para atua&ccedil;&atilde;o dentro e/ou fora do Territ&oacute;rio, bem como exercer atividades comerciais, sem que tal fato implique em descumprimento do presente <b>Contrato</b>.</p>
		        
		        <p class="p-contract new-paragraph">O <b>PVF</b> est&aacute; ciente e ratifica que o objeto desde Contrato &eacute; de car&aacute;ter n&atilde;o exclusivo e que, tem-se como prerrogativa que em sua opera&ccedil;&atilde;o, o <b>PVF</b> poder&aacute;, a seu exclusivo crit&eacute;rio, atuar com portf&oacute;lios concorrentes e/ou complementares aos dispostos no Anexo A, isentando a <b>TOTVS</b> de toda e qualquer responsabilidade sobre a sua opera&ccedil;&atilde;o, conforme Cl&aacute;usula 11 do Anexo <b>PVF</b>.</p>
		        
		        <h2 class="h2-contract">CL&Aacute;USULA E</br>DAS INFORMA&Ccedil;&Otidel;ES E CONDI&Ccedil;&Otidel;ES ESPEC&Iacute;FICAS</h2>
		        <p class="p-contract new-paragraph">Abaixo est&atilde;o listadas as informa&ccedil;&otilde;es e condi&ccedil;&otilde;es espec&iacute;ficas do <b>Contrato</b>:</p>
		        
		     	<p class="p-contract new-paragraph"><b>(i)</b> O plano inicial de neg&oacute;cios e as metas iniciais do <b>PVF</b> dever&atilde;o ser formalizados em seu primeiro "Planejamento e Compromisso Anual de Metas do <b>PVF</b>", tendo este, excepcionalmente, validade da data de assinatura deste <b>Contrato</b> at&eacute; o encerramento do presente ano calend&aacute;rio;</p>
		     	
		     	<p class="p-contract new-paragraph"><b>(ii)</b> CONDI&Ccedil;&Atilde;O ESPEC&Iacute;FICA 01;</p>
		     	
		     	<p class="p-contract new-paragraph">N&atilde;o existem outras condi&ccedil;&otilde;es espec&iacute;ficas.</p>		     
	     	 
		       	<h2 class="h2-contract">CL&Aacute;USULA F</br>DO FORO</h2>
		        <p class="p-contract new-paragraph">Fica de comum acordo eleito o foro da Comarca de S&atilde;o Paulo – SP, para dirimir quaisquer d&uacute;vidas ou controv&eacute;rsias oriundas deste instrumento, respondendo a parte culpada, ou perdedora, pelas despesas, custas processuais e honor&aacute;rios advocat&iacute;cios sucumbenciais que a parte inocente ou vencedora despender para resguardo de seus direitos.</p>
		        
		     	<p class="p-contract new-paragraph">E, por estarem justas e acordadas, as partes firmam o presente <b>Contrato</b> em 02 (duas) vias de igual teor e para que produzam um s&oacute; efeito, juntamente com as 02 (duas) testemunhas abaixo nomeadas.</p>
		     	</br>
		     	<p class="p-contract">S&atilde;o Paulo, {{dia}} de {{mes}} de {{ano}}.</p>		  
		     	</br>
		     	
		     	<p class="p-contract"><b>TOTVS S.A.<span class="indent-sign-name">{{razaoSocial}}</span></b></p>	
		     	</br>
		     	<p class="p-contract"><span class="indent-sign-under"></span><span class="indent-sign-name indent-sign-under"></span></br>
		     						  <b>Nome</b>:<span class="indent-sign-name"><b>Nome</b>:</span></p>      	
				</br>
		     	<p class="p-contract"><span class="indent-sign-under"></span><span class="indent-sign-name indent-sign-under"></span></br>
		     						  <b>Nome</b>:<span class="indent-sign-name"><b>Nome</b>:</span></p>      	      
				</br>
		     
		     	<p class="p-contract"><b>TESTEMUNHAS:</b></p>	
		     	</br>
		     	<p class="p-contract"><span class="indent-sign-under"></span><span class="indent-sign-name indent-sign-under"></span></br>
		     						  <b>Nome</b>:<span class="indent-sign-name"><b>Nome</b>:</span></br>
		     						  <b>RG</b>:<span class="indent-sign-name"><b>RG</b>:</span></br>
		     						  <b>CPF</b>:<span class="indent-sign-name"><b>CPF</b>:</span></p>   		     	   		     	   		     						  							  				  	
	       	</div>
		{{/itens}}		               			
	</script>
	
	<script type="text/template" class="template_contrato_pvf_masterpvf_totvs">	
		{{#itens}}
		        <p class="p-contract">De um lado,</p>
		        <p class="p-contract new-paragraph"><b>{{razaoSocial}}</b>, pessoa jur&iacute;dica de direito privado, Franquia TOTVS, com sede na <b>{{endereco}}</b> na cidade <b>{{nmMunicipio}}</b>, no Estado de <b>{{uf}}</b>, CEP <b>{{cep}}</b>, inscrita no CNPJ/MF sob o n&deg; <b>{{nrCnpj}}</b> e com Inscri&ccedil;&atilde;o Estadual nº <b>XXX.XXX.XXX.XXX</b>, neste ato representada na forma de seus atos constitutivos, doravante denominada <b>PVF</b>,
		       
		        <p class="p-contract">E de outro lado,</p>
		        <p class="p-contract new-paragraph"><b>TOTVS S.A.</b>, pessoa jur&iacute;dica de direito privado, com sede na Avenida Braz Leme, Jardim S&atilde;o Bento, S&atilde;o Paulo/SP, inscrita no CNPJ/MF sob o n&deg; <b>53.113.791/0001-22</b> e com inscri&ccedil;&atilde;o Estadual nº 111.010.945.111, neste ato representada na forma de seu EStatuto Social, doravante denominada <b>TOTVS</b>, </p>
		       
			   <p class="p-contract">e, como interveniente anuente,</p>
		        <p class="p-contract new-paragraph"><b>Raz&atilde;o Social</b>, pessoa jur&iacute;dica de direito privado, com sede na ENDERE&Ccedil;O, na vidade de CIDADE, no Estado de ESTADO, inscrita no CNPJ/MF sob o n&deg; XX.XXX.XXX/XXXX-XX, e com inscri&ccedil;&atilde;o Estadual nº XXX.XXX.XXX.XXX, neste ato representada na forma de seus atos constitutivos,  doravante denominada <b>Master PVF</b>,</p>
			   
		        <p class="p-contract new-paragraph">Resolvem, por comum acordo, celebrar o <b>Contrato de Ponto de Vendas Fly01</b>, doravante denominado simplesmente <b>Contrato</b>, que se reger&aacute; pelas cl&aacute;usulas, defini&ccedil;&otilde;es e condi&ccedil;&otilde;es dispostas a seguir, bem como pelos Anexos abaixo e pela legisla&ccedil;&atilde;o aplic&aacute;vel.</p>
		        
		        <p class="p-contract">DEFININDO QUE:</p>
		        <p class="p-contract indent">
		            S&atilde;o partes integrantes do presente <b>Contrato</b>:</br>
		            <b>Anexo PVF</b>: Termos e Condi&ccedil;&otilde;es Gerais ao Contrato Ponto de Vendas Fly01</br>
		            <b>Anexo A</b>: Produtos e Servi&ccedil;os</br>
		            <b>Anexo B</b>: Aspectos Financeiros</br>
		            <b>Anexo C</b>: Manual Operacional PVF Padr&atilde;o</br>
		            <b>Anexo D</b>: Pacto Anticorrup&ccedil;&atilde;o
		        </p>
		        
		        <h2 class="h2-contract">CL&Aacute;USULA A</br>DOS ANEXOS: PVF, A, B, C e D</h2>
		        <p class="p-contract new-paragraph">Fica aqui definido que os Anexos: PVF, A, B, C e D registrados no <b>9º Oficial de Registro de T&iacute;tulos e Documentos e Civil de Pessoa Jur&iacute;dica da Capital</b>, protocolizados e registrados respctivamente sob o nº <b>1.295.769</b>, n&atilde;o ser&atilde;o rubricados e assinados individualmente. As partes, de comum acordo, aceitam, de forma irrevog&aacute;vel e irrestrita, que a assinatura &uacute;nica do <b>Contrato</b> garante a plena aceita&ccedil;&atilde;o dos referidos Anexos.</p>
		       
		        <p class="p-contract new-paragraph">Os termos, frases e express&otilde;es do <b>Contrato</b> tem os significados definidos na Cl&aacute;usula 1 do Anexo PVF.</p>
		        
		        <p class="p-contract new-paragraph">As partes concordam que o Manual Operacional PVF Padr&atilde;o, doravante denominado simplesmente <b>Anexo C</b>, &eacute; elaborado e mantido pela <b>TOTVS</b> e dispensam a anexa&ccedil;&atilde;o do mesmo bem como a rubrica de suas p&aacute;ginas. O <b>PVF</b> reconhece e aceita que os documentos contidos no <b>Anexo C</b> s&atilde;o v&aacute;lidos at&eacute; a data de validade que constam das suas capas. A <b>TOTVS</b> reserva-se o direito de substituir esses documentos ao final do seu prazo de validade, ou ainda, antes disso, a fim de aperfei&ccedil;o&aacute;-los, atualiz&aacute;-los e atender as necessidades de mercado.</p>		        
	      			 
		       	<h2 class="h2-contract">CL&Aacute;USULA B</br>DA COMUNICA&Ccedil;&Atilde;O</h2>
		        <p class="p-contract new-paragraph">Para todos os efeitos de direito, quaisquer avisos, comunica&ccedil;&otilde;es e notifica&ccedil;&atilde;es referentes ao Contrato e seus Anexos somente ser&atilde;o considerados entregues nos endere&ccedil;os a seguir anunciados:</p>		        		       
		        	
		         <div>	
			      	<p class="p-contract" style="float:left;width:50%;padding:0 !important;"><b>{{razaoSocial}}<br>	
	       							   	Aos cuidados do Departamento Jur&iacute;dico<br>	
       									{{endereco}} - {{nmMunicipio}} - {{uf}}<br>	
	        							CEP {{cep}} | TEL {{nrTelefone}}</b></p>	
	    
	    			 <p class="p-contract" style="padding:0 !important;"><b>PJ DO MASTER PVF<br>	
			       					    Aos cuidados do Departamento Jur&iacute;dico<br>	
			       						Endere&ccedil;o completo, cidade e estado<br>	
	        							CEP XXXXX-XXX | TEL (0XX) XXXX-XXXX</b></p>	
	        							
					 <p class="p-contract" style="width:50%;padding:0 !important;"><b>TOTVS S.A.</br>
		         					     Aos cuidados do Departamento Jur&iacute;dico</br>	
		        						 Av. Braz Leme, 1000, Jd. S&atilde;o Bento - S&atilde;o Paulo - SP</br>	
	        						 	 CEP 02511-000 | TEL (011) 2099-7000</b></p>
	        	</div>	         
		        
		      	<h2 class="h2-contract">CL&Aacute;USULA C</br>DO PORTF&Oacute;LIO e TERRITORIEDADE</h2>
		      	<p class="p-contract new-paragraph">Fica acordado entre as partes que o <b>PVF</b> est&aacute; autorizado a atuar, em car&aacute;ter n&atilde;o exclusivo, nos Produtos e/ou Servi&ccedil;os listados na Tabela de Pre&ccedil;os para o mercado de <b>Microempresas</b> em Territ&oacute;rio Nacional, ou seja, em otdo e qualquer munic&iacute;pio do Brasil, desde que cumpra os requisitos e obriga&ccedil;&otilde;es do <b>Contrato.</b></p>
		      	
		      	<p class="p-contract new-paragraph">Fica estabelecido desde j&aacute; que a atua&ccedil;&otilde;o do <b>PVF</b> em cada Segmento/Produto/Servi&ccedil;o dispon&iacute;vel na Tabela de Pre&ccedil;os e no Anexo A para o mercado de <b>Microempresas</b>, est&aacute; condicionada ao cumprimento dos requisitos do <b>Programa TOTVS de Habilita&ccedil;&otilde;o, Certifica&ccedil;&otilde;o e Homologa&ccedil;&otilde;o</b> por Segmento/Produto/Servi&ccedil;o.</p>
		      	
		      	<p class="p-contract new-paragraph">Esta Cl&aacute;usula C tem validade somente em conjunto com o “Planejamento e Compromisso Anual de Metas do <b>PVF</b>”, definido na Cl&aacute;usula 8 do Anexo <b>PVF</b>, acordado e assinado entre as partes anualmente.
	      
		       	<h2 class="h2-contract">CL&Aacute;USULA D</br>N&Atilde;O EXCLUSIVIDADE</h2>
		       	
		        <p class="p-contract new-paragraph">O <b>PVF</b> n&atilde;o ter&atilde;o qualquer esp&eacute;cie de exclusividade na execu&ccedil;&atilde;o do objeto contratual, seja em rela&ccedil;&atilde;o: à comercializa&ccedil;&atilde;o de Produtos e/ou Servi&ccedil;os e à presta&ccedil;&atilde;o de Servi&ccedil;os dispostos no <b>Anexo A</b>, ao <b>Territ&oacute;rio</b> de atua&ccedil;&atilde;o, ao atendimento de empresas que n&atilde;o estejam cadastradas nos sistemas internos TOTVS ou que estejam em desacordo com as regras e condi&ccedil;&otilde;es de gest&atilde;o do CRM.</p>

				<p class="p-contract new-paragraph">A <b>TOTVS</b> poder&aacute;, a qualquer tempo, credenciar outros <b>Pontos de Vendas</b>, consultores, revendedores e/ou outros Canais de Venda para atua&ccedil;&atilde;o dentro e/ou fora do Territ&oacute;rio, bem como exercer atividades comerciais, sem que tal fato implique em descumprimento do presente <b>Contrato</b>.</p>
		        
		        <p class="p-contract new-paragraph">O <b>PVF</b> est&aacute; ciente e ratifica que o objeto desde Contrato &eacute; de car&aacute;ter n&atilde;o exclusivo e que, tem-se como prerrogativa que em sua opera&ccedil;&atilde;o, o <b>PVF</b> poder&aacute;, a seu exclusivo crit&eacute;rio, atuar com portf&oacute;lios concorrentes e/ou complementares aos dispostos no Anexo A, isentando a <b>TOTVS</b> de toda e qualquer responsabilidade sobre a sua opera&ccedil;&atilde;o, conforme Cl&aacute;usula 11 do Anexo <b>PVF</b>.</p>
		        
		        <h2 class="h2-contract">CL&Aacute;USULA E</br>DAS INFORMA&Ccedil;&Otilde;ES E CONDI&Ccedil;&Otilde;ES ESPEC&Iacute;FICAS</h2>
		        <p class="p-contract new-paragraph">Abaixo est&atilde;o listadas as informa&ccedil;&otilde;es e condi&ccedil;&otilde;es espec&iacute;ficas do <b>Contrato</b>:</p>
		        
		     	<p class="p-contract new-paragraph"><b>(i)</b> O plano inicial de neg&oacute;cios e as metas iniciais do <b>PVF</b> dever&atilde;o ser formalizados em seu primeiro "Planejamento e Compromisso Anual de Metas do <b>PVF</b>", tendo este, excepcionalmente, validade da data de assinatura deste <b>Contrato</b> at&eacute; o encerramento do presente ano calend&aacute;rio;</p>
		     	
		     	<p class="p-contract new-paragraph"><b>(ii)</b> CONDI&Ccedil;&Atilde;O ESPEC&Iacute;FICA 01;</p>
		     	
		     	<p class="p-contract new-paragraph">N&atilde;o existem outras condi&ccedil;&otilde;es espec&iacute;ficas.</p>		     	   		 		       
		        
		       	<h2 class="h2-contract">CL&Aacute;USULA F</br>DO FORO</h2>
		        <p class="p-contract new-paragraph">Fica de comum acordo eleito o foro da Comarca de S&atilde;o Paulo – SP, para dirimir quaisquer d&uacute;vidas ou controv&eacute;rsias oriundas deste instrumento, respondendo a parte culpada, ou perdedora, pelas despesas, custas processuais e honor&aacute;rios advocat&iacute;cios sucumbenciais que a parte inocente ou vencedora despender para resguardo de seus direitos.</p>
		        
		     	<p class="p-contract new-paragraph">E, por estarem justas e acordadas, as partes firmam o presente <b>Contrato</b> em 03 (tr&ecirc;s) vias de igual teor e para que produzam um s&oacute; efeito, juntamente com as 02 (duas) testemunhas abaixo nomeadas.</p>
		     	</br>
		     	<p class="p-contract">S&atilde;o Paulo, {{dia}} de {{mes}} de {{ano}}.</p>		  
		     	</br>
		     	
			   	<p class="p-contract"><b>TOTVS S.A.<span class="indent-sign-name-2">PVF</span><span class="indent-sign-name-3">MASTER PVF</span></b></p>	
		     	</br>
		     	<p class="p-contract"><span class="indent-sign-under"></span><span class="indent-sign-name-2 indent-sign-under"></span><span class="indent-sign-name-3 indent-sign-under"></span></br>
		     						  <b>Nome</b>:<span class="indent-sign-name-2"><b>Nome</b>:</span><span class="indent-sign-name-3"><b>Nome</b>:</span></p>      	
				</br>
		     	<p class="p-contract"><span class="indent-sign-under"></span><span class="indent-sign-name-2 indent-sign-under"></span><span class="indent-sign-name-3 indent-sign-under"></span></br>
		     						  <b>Nome</b>:<span class="indent-sign-name-2"><b>Nome</b>:</span><span class="indent-sign-name-3"><b>Nome</b>:</span></p>      	      
				</br> 	
				  								
				<p class="p-contract"><b>TESTEMUNHAS:</b></p>	
				</br>
				<p class="p-contract"><span class="indent-sign-under"></span><span class="indent-sign-name indent-sign-under"></span></br>
									  <b>Nome</b>:<span class="indent-sign-name"><b>Nome</b>:</span></br>
									  <b>RG</b>:<span class="indent-sign-name"><b>RG</b>:</span></br>
									  <b>CPF</b>:<span class="indent-sign-name"><b>CPF</b>:</span></p>  
				
					       
		{{/itens}}		               			
	</script>
</div>