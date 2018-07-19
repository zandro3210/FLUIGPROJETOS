<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
	data-params="MyWidget.instance()">

	<section id="admin" class="row">
		<div id="filtroArquiteto" class="row">
			<div class="form-group col-md-4">
				<label>Arquiteto: </label>
				<input type="text" id="arquiteto" name="arquiteto" class="form-control" />
			</div>
		</div>

		<div id="painel" class="row">
			<div class=" form-group col-md-4">
				<input type="button" name="botaoAdiciona" class="btn btn-primary"
					value="Adicionar agentamento" data-adicionarAgendamento />
			</div>
		</div>
	</section>
	
	<div id="calendar">
	</div>

	<div class="footer-btns">
		<div class="btn-group">
			<div class="tipo">Legendas:</div>
			<div class="btn btn-warning">Agenda aguardando liberação</div>
			<div class="btn btn-info">Agenda confirmada</div>
			<div class="btn btn-success">Agenda executada</div>
			<div class="btn btn-danger">Agenda pessoal</div>
		</div>
	</div>

	<script src="/webdesk/vcXMLRPC.js"></script>
	<script type="text/template" class="info_agendamento">
		<div class="form-group row">
			<div class="col-md-6 form-group">
				<label for="data">Executivo</label>
				<input type="text" value="{{executivo}}" readonly="readonly"
					class="form-control " />
			</div>
			<div class="col-md-6 form-group">
				<label for="data">Pedido</label>
				<input type="text" value="{{numOportunidade}}" readonly="readonly"
					class="form-control" />
			</div>
		</div>
		<div class="form-group row">
			<div class="col-md-4">
				<label for="descOportunidade">Desc. Oportunidade</label>
				<input type="text" value="{{descOportunidade}}" class="form-control"
					name="descOportunidade" id="descOportunidade" readonly="">
			</div>
			<div class="col-md-2">
				<label for="cliProspect">Cli/Prospect:</label>
				<input type="text" value="{{cliProspect}}" class="form-control"
					name="cliProspect" id="cliProspect" readonly="">
			</div>
			<div class="col-md-6">
				<label for="descCliProspect">Desc. Cli/Prospect:</label>
				<input type="text" value="{{descCliProspect}}" class="form-control"
					name="descCliProspect" id="descCliProspect" readonly="">
			</div>
		</div>
		<div class="form-group row">
			<div class="col-md-3">
				<label for="unidade">Unidade:</label>
				<input type="text" value="{{unidade}}" class="form-control"
					name="unidade" id="unidade" readonly="">
			</div>
			<div class="col-md-3">
				<label for="segmento">Segmento:</label>
				<input type="text" value="{{segmento}}" class="form-control"
					name="segmento" id="segmento" readonly="">
			</div>
			<div class="col-md-6">
				<label for="entidade">Entidade:</label>
				<input type="text" value="{{entidade}}" class="form-control"
					name="entidade" id="entidade" readonly="">
			</div>
		</div>
		<div class="form-group row">
			<div class="col-md-6">
				<label for="endereco">Endereço:</label>
				<input type="text" value="{{endereco}}" class="form-control"
					name="endereco" id="endereco" readonly="">
			</div>
			<div class="col-md-6">
				<label for="municipio">Município:</label>
				<input type="text" value="{{municipio}}" class="form-control"
					name="municipio" id="municipio" readonly="">
			</div>
		</div>
		<div class="form-group row">
			<div class="col-md-4">
				<label for="contato">Contato:</label>
				<input type="text" value="{{contato}}" class="form-control"
					name="contato" readonly="" />
			</div>
			<div class="col-md-2">
				<label for="fone">Fone:</label>
				<input type="text" value="{{fone}}" class="form-control" name="fone"
					id="fone" readonly="">
			</div>
			<div class="col-md-6">
				<label for="email">E-mail:</label>
				<input type="text" value="{{email}}" class="form-control"
					name="email" id="email" readonly="">
			</div>
		</div>
		<div class="form-group row ">
			<div class="col-md-6">
				<label for="tipoProjeto">Tipo Projeto:</label>
				<input type="text" value="{{tipoProjeto}}" class="form-control"
					name="tipoProjeto" id="tipoProjeto" readonly="">
			</div>
			<div class="col-md-6">
				<label for="tipoProjeto">Tipo Solicitação:</label>
				<input type="text" value="{{tipoSolicitacao}}" class="form-control"
					name="tpSolicitacao" id="tpSolicitacao" readonly="">
			</div>
		</div>
		<div class="form-group row">
			<div class="col-md-4">
				<label for="localAtendimento">Local Atendimento:</label>
				<input type="text" value="{{localAtendimento}}" class="form-control"
					name="localAtendimento" id="localAtendimento" readonly="">
			</div>
			<div class="col-md-4">
				<label for="tipoDemo">Tipo Demo:</label>
				<input type="text" value="{{tipoDemo}}" class="form-control"
					name="tipoDemo" id="tipoDemo" readonly="">
			</div>
			<div class="col-md-4">
				<label for="produto">Produto:</label>
				<input type="text" value="{{produto}}" class="form-control"
					name="produto" id="produto" readonly="">
			</div>
		</div>
		<div class="form-group row">
			<div class="col-md-12">
				<label for="modulos">Módulos:</label>
				<input type="text" value="{{modulo}}" class="form-control"
					name="modulos" id="modulos" readonly="">
			</div>
		</div>
		<div class="form-group row">
			<div class="col-md-12">
				<label for="informacoesAdicionais">Informações Adicionais:</label>
				<textarea class="form-control" name="informacoesAdicionais"
					id="informacoesAdicionais" readonly="">{{informacoesAdicionais}}
				</textarea>
			</div>
		</div>
		<div class="form-group row">
			<div class="col-md-12">
				<label for="observacoes">Observações:</label>
				<textarea class="form-control" name="observacoes" id="observacoes"
					readonly="">{{observacoes}}</textarea>
			</div>
		</div>
		<input type="hidden" value="{{documentId}}" id="documentId" />
		<hr />
	</script>


	<script type="text/template" class="dialogo_cancelamento_pessoal">
		<input type="hidden" value="{{documentId}}" id="idDocumentoPessoal" />
		Deseja realmente cancelar este agendamento?
	</script>
	<script type="text/template" class="dialogo_cancelamento">
		<input type="hidden" value="{{documentId}}" id="idDocumento" />
		Deseja realmente cancelar este agendamento?
	</script>
	
	<script type="text/template" class="info_agendamento_pessoal">
		<div class="form-group row ">
			<div class="col-md-6">
				<label for="horaInicio">Hora início:</label>
				<input type="text" value="{{horaInicio}}" class="form-control"
					name="horaInicio" id="horaInicio" readonly="">
			</div>
			<div class="col-md-6">
				<label for="horaTermino">Hora término:</label>
				<input type="text" value="{{horaFim}}" class="form-control"
					name="horaTermino" id="horaTermino" readonly="">
			</div>
		</div>
		<div class="form-group row">
			<div class="col-md-12">
				<label for="atividade">Atividade:</label>
				<textarea class="form-control" name="atividade"
					id="atividade" readonly="">{{atividade}}
				</textarea>
			</div>
		</div>
		<div class="form-group row">
			<div class="col-md-12">
				<label for="observacoes">Observações:</label>
				<textarea class="form-control" name="observacoes" id="observacoes"
					readonly="">{{observacoes}}</textarea>
			</div>
		</div>
		<input type="hidden" value="{{documentId}}" id="documentIdPessoal" />
		<hr />
	</script>

	<script type="text/template" class="dialogo_criacao">
		<div class="row">
			<div class="form-group col-lg-6">
				<label for="nome">Arquiteto</label>
				<input type="text" id="nomeArquiteto" class="form-control"
					readonly value="{{nome}}" />
			</div>
			<div class="form-group col-lg-6">
				<label for="nome">E-mail</label>
				<input type="text" id="emailArquiteto" class="form-control"
					readonly value="{{email}}" />
			</div>
		</div>
		<div class="row">
			<div class="form-group col-lg-3">
				<label>Início da agenda</label>
				<input type="date" class="form-control fluig-date" name="dataAgenda"
					id="dataAgenda">
			</div>
			<div class="form-group col-lg-3">
				<label>Término da agenda</label>
				<input type="date" class="form-control fluig-date" name="dataAgendaTermino"
					id="dataAgendaTermino">
			</div>
			<div class="form-group col-lg-3">
				<label>Hora de início</label>
				<input type="text" class="form-control hora" name="horaInicio" id="horaInicio"
					mask="00:00">
			</div>
			<div class="form-group col-lg-3">
				<label>Hora de término</label>
				<input type="text" class="form-control hora" name="horaFim" id="horaFim"
					mask="00:00">
			</div>
		</div>
		<div class="row">
			<div class="form-group col-lg-6">
				<label>Atividade</label>
				<input type="text" name="atividade" id="atividade" class="form-control" />
			</div>
		</div>
		<div class="row">
			<div class="form-group col-lg-12">
				<label>Observações</label>
				<textarea class="form-control" name="observacao" id="observacao"></textarea>
			</div>
		</div>
	</script>
</div>

