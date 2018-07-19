var MyWidget = SuperWidget.extend({

	modalInformacoes: null,
	modalDialogo: null,
	emailAtual: null,
	modalCriacao:null,
	admin:null,
	//método iniciado quando a widget é carregada
	init: function() {
		$('.hora').mask('00:00');
		var loading = FLUIGC.loading('.super-widget');
		loading.show();

		this.initCalendar();
		this.verifyUserInGroup();

		loading.hide();
	},

	//BIND de eventos
	bindings: {
		local: {
			'adicionarAgendamento': ["click_abrirDialogo"]
		},
		global:{
			'confirmar': ['click_confirmarCancelamento'],
			'cancelar' : ['click_cancelarAgendamento'],
			'salvar' : ['click_salvarAgendamento'],
		 	'confirmar-pessoal': ['click_confirmarCancelamentoPessoal'],
		 	'cancelar-pessoal' : ['click_cancelarAgendamentoPessoal']
		}
	},
	
	loadModalEventInfo: function (event){
		var that = this;
		var actions = [];
		if(that.admin == true){
			actions =  [{
				'label': 'Cancelar agendamento',
				'bind': 'data-confirmar',
			}]
		}
		
		modalInformacoes = FLUIGC.modal({
			title: 'Agenda',
			content: Mustache.render($(".info_agendamento").html(), event),
			id: 'fluig-modal',
			size: 'large',
			actions:actions
		});
		
	},
	loadModalPersonalEventInfo: function(event){
		var that = this;
		
		var actions = [];
		if(that.admin == true){
			actions =  [{
				'label': 'Cancelar agendamento',
				'bind': 'data-confirmar-pessoal',
			}]
		}
		
		
		FLUIGC.modal({
			title: 'Agenda pessoal',
			content: Mustache.render($(".info_agendamento_pessoal").html(), event),
			id: 'pessoal',
			size: 'large',
			actions: actions
		});
	},
	
	initCalendar: function(){
		var that = this;
		var initialLocaleCode = 'pt-br';

		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			defaultDate: new Date().toString(),
			locale: initialLocaleCode,
			navLinks: true, // can click day/week names to navigate views
			selectable: true,
			selectHelper: true,
			aspectRatio: 2.5,
			eventClick: function(calEvent, jsEvent, view) {
				if(calEvent.origem == "processo"){
					that. loadModalEventInfo(calEvent);
				}else if(calEvent.origem =="pessoal"){
					that.loadModalPersonalEventInfo(calEvent);
				}
				

			},
			eventLimit: true, // allow "more" link when too many events
		});

	},
	getInfoFromDataset: function(email){
		try{

			var that = this;
			var dsUsuarios = this.getUser()
			that.emailAtual = "";
			if(email){
				that.emailAtual = email;
			}else{
				that.emailAtual = dsUsuarios.mail;
			}

			var constraint = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);

			var dsAgenda = DatasetFactory.getDataset("dsAgendaArquiteto", null, [constraint], null);

			for(var j = 0; j < dsAgenda.values.length; j++){
				var metaId = dsAgenda.values[j]["metadata#id"];
				var metaVersion = dsAgenda.values[j]["metadata#version"];
				var tableName = "tableSugestaoAgendamento";

				dsAgendamento = that.getPaiFilhoAgendaArquiteto(tableName, metaId, metaVersion, that.emailAtual)

				var eventData;
				for(var i = 0; i < dsAgendamento.values.length; i++){
					var color = this.getColorFromStatus(dsAgendamento.values[i].tipoAgendamento)


					var info = that.bringInfoFromForm(dsAgendamento.values[i].documentid)


					var contato = info.naoCadastrado == "true" ? info.semContato : info.contato;

					if(!that.isCanceled(dsAgendamento.values[i].documentid)){
						var diferenca = moment(dsAgendamento.values[i].dataAgendaTermino, "YYYY-MM-DD").diff(moment(dsAgendamento.values[i].dataAgenda, "YYYY-MM-DD"), "days")
						for(var d = 0; d <= diferenca; d++){
							var data = moment(dsAgendamento.values[i].dataAgenda, "YYYY-MM-DD").add(d, "days").format("YYYY-MM-DD");

							eventData = that.buildEvent(info, dsAgendamento.values[i], data, contato, color, "processo");

							$('#calendar').fullCalendar('renderEvent', eventData, true);
						}

					}


				}

			}

		}catch(e){
			console.log(e);
			FLUIGC.toast({
				title: '',
				message: 'Ocorreu um erro ao processar as informações',
				type: 'danger',
				timeout: 'slow'
			});
		}

	},
	getPersonalTasks: function(){
		var that = this;

		var constraint = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
		var constraintEmail = DatasetFactory.createConstraint("emailTecnico", that.emailAtual, that.emailAtual, ConstraintType.MUST);
		
		var dsAgendamentoPessoal = DatasetFactory.getDataset("dsAgendamentoPessoal", null, [constraint, constraintEmail], null);
		
		if(dsAgendamentoPessoal && dsAgendamentoPessoal.values &&  dsAgendamentoPessoal.values.length> 0){
			for(var i = 0; i < dsAgendamentoPessoal.values.length; i++){
				var diferenca = moment(dsAgendamentoPessoal.values[i].dataAgendaTermino, "YYYY-MM-DD").diff(moment(dsAgendamentoPessoal.values[i].dataAgenda, "YYYY-MM-DD"), "days")
				for(var d = 0; d <= diferenca; d++){
					var data = moment(dsAgendamentoPessoal.values[i].dataAgenda, "YYYY-MM-DD").add(d, "days").format("YYYY-MM-DD");

					eventData = that.buildPersonalEvent(dsAgendamentoPessoal.values[i], data, "#0d69b7", "pessoal");

					$('#calendar').fullCalendar('renderEvent', eventData, true);
				}
			}
		}
		

	},
	getColorFromStatus: function(status){
		var color = "";

		if(status == "Confirmado"){
			color = "#5bc0de"
		}else if(status == "Em Avaliação"){
			color = "#ec971f"
		}else if(status == "Executado"){
			color = "#5cb85c"
		}

		return color;
	},
	buildFilter: function(){
		var that = this;
		var loading = FLUIGC.loading('[id^=MyWidget_]');
		var settings = {
				source: {
					url:  '/api/public/ecm/dataset/search?datasetId=dsArquitetos&searchField=ARQUITETO&filterValues=metadata_active,true,ATIVO,true&',
					contentType: 'application/json',
					pattern: '',
					root: 'content',
					limit: 10,
					offset: 0,
					patternKey: 'searchValue',
					limitkey: 'limit',
					offsetKey: 'offset'
				},
				displayKey: "ARQUITETO",
				style: {
					autocompleteTagClass: 'tag-gray',
					tableSelectedLineClass: 'info'
				},
				table: {
		            header: [
		                {
		                    'title': 'Nome',
		                    'size': 'col-xs-5'
		                },
		                {
		                    'title': 'Email',
		                    'size': 'col-xs-7',
		                }
		            ],
		            renderContent: ['ARQUITETO','EMAIL']
		        }

		}
		var filter =  FLUIGC.filter("#arquiteto", settings);

		filter.on('fluig.filter.item.added', function(data){
			loading.show();
			
			$("#calendar").fullCalendar("removeEvents")
			var email = data.item.EMAIL;
			that.getInfoFromDataset(email);
			that.getPersonalTasks();
			that.verifyEvents();

			loading.hide();
		});
	},
	getUser: function(){
		var user = WCMAPI.getUserCode();
		var filtroUsuario = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
		var dsUsuarios = DatasetFactory.getDataset("colleague", null, [filtroUsuario], null);
		return dsUsuarios.values[0];
	},
	verifyUserInGroup:function(){
		var that = this;
		var user = WCMAPI.getUserCode();
		var groupId = "Central_Ag_Sao_Paulo";

		var constraintUser = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", user, user, ConstraintType.MUST);
		var constraintGrupo = DatasetFactory.createConstraint("colleagueGroupPK.groupId", groupId, groupId, ConstraintType.MUST)

		var constraints = new Array(constraintUser, constraintGrupo);

		var dataset = DatasetFactory.getDataset("colleagueGroup", null, constraints, null);

		if(!dataset.values.length > 0){
			$("#admin").hide();
			this.getInfoFromDataset();
			this.getPersonalTasks();
			that.admin = false;
		}else{
			this.buildFilter();
			that.admin = true;
		}
	},
	verifyEvents : function(){
		var eventos = $("#calendar").fullCalendar("clientEvents");

		if(eventos.length == 0){
			FLUIGC.toast({
				title: '',
				message: 'Não há agendamentos para este usuário',
				type: 'warning'
			});
		}
	},
	getPaiFilhoAgendaArquiteto : function(tableName, metaId, metaVersion, emailUsuario){
		var c1 = DatasetFactory.createConstraint("tablename", tableName, tableName, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("metadata#id", metaId, metaId, ConstraintType.MUST)
		var c3 = DatasetFactory.createConstraint("metadata#version", metaVersion, metaVersion, ConstraintType.MUST)
		var c4 = DatasetFactory.createConstraint("emailTecnico",emailUsuario, emailUsuario, ConstraintType.MUST );
		var c5 = DatasetFactory.createConstraint("tipoAgendamento","Em Avaliação", "Em Avaliação", ConstraintType.SHOULD );
		var c6 = DatasetFactory.createConstraint("tipoAgendamento","Confirmado", "Confirmado", ConstraintType.SHOULD );
		var c7 = DatasetFactory.createConstraint("tipoAgendamento","Executado", "Executado", ConstraintType.SHOULD );
		var c8 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);

		return DatasetFactory.getDataset("dsAgendaArquiteto", null, [c1,c2, c3, c4, c5, c6, c7, c8], null);
	},
	bringInfoFromForm: function(documentId){
		var constraintDocumentId = DatasetFactory.createConstraint("documentid", documentId, documentId, ConstraintType.MUST);
		var ativo = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);

		var dsAgendaArquiteto = DatasetFactory.getDataset("dsAgendaArquiteto", null, [constraintDocumentId, ativo], null);

		return dsAgendaArquiteto.values[0];
	},
	isCanceled: function(documentId){
		try{
			var filtroDocumentId = DatasetFactory.createConstraint("cardDocumentId", documentId, documentId, ConstraintType.MUST);


			var workflowProcess = DatasetFactory.getDataset("workflowProcess", null, [filtroDocumentId], null);
			processo = workflowProcess.values[0];

			var constraintProcessInstance = DatasetFactory.createConstraint("processTaskPK.processInstanceId", processo["workflowProcessPK.processInstanceId"], processo["workflowProcessPK.processInstanceId"], ConstraintType.MUST)

			var processTask = DatasetFactory.getDataset("processTask", null, [constraintProcessInstance], ["processTaskPK.movementSequence"]);

			return processTask.values[processTask.values.length-1].status == 4;
		}catch(e){
			console.log(e);
			return true;
		}
	},
	buildPersonalEvent: function(agendamento,data,  color, status){
		return{
			origem:status,
			title: agendamento.titulo,
			start: data + "T" +agendamento.horaInicio+":00" ,
			end: data + "T" +agendamento.horaFim+":00" ,
			color: color,
			textColor: 'white',
			observacoes: agendamento.observacao,
			documentId: agendamento.documentid,
			horaInicio: agendamento.horaInicio,
			horaFim: agendamento.horaFim,
			atividade: agendamento.titulo,
			observacoes: agendamento.observacao
		}
	},
	buildEvent: function(info, agendamento, data, contato, color, status){
		return {
			origem: status,
			title: info.descCliProspect,
			start: data + "T" +agendamento.horaInicio+":00" ,
			end: data + "T" +agendamento.horaFim+":00" ,
			color: color,
			textColor: 'white',
			executivo: info.ear,
			numOportunidade: info.numOportunidade,
			descOportunidade: info.descOportunidade,
			cliProspect: info.cliProspect,
			descCliProspect: info.descCliProspect,
			unidade: info.unidade,
			segmento: info.segmento,
			entidade: info.entidade,
			endereco: info.endereco,
			municipio: info.municipio,
			contato: contato,
			fone: info.fone,
			email: info.email,
			tipoProjeto: info.tipoProjeto,
			tipoSolicitacao: info.tpSolicitacao,
			localAtendimento: info.localAtendimento,
			tipoDemo: info.tipoDemo,
			produto: info.produto,
			modulo: info.modulos,
			informacoesAdicionais: info.informacoesAdicionais,
			observacoes: agendamento.observacao,
			documentId: info.documentid
		};
	},
	confirmarCancelamento: function (documentId) {
		var documentId = $("#documentId").val();

		modalDialogo = FLUIGC.modal({
			title: 'Confirmação',
			content: Mustache.render($(".dialogo_cancelamento").html(), {documentId}),
			id: 'dialogo',
			size: 'small',
			 actions: [{
				'label': 'Sim',
				 'bind': 'data-cancelar',
			},{
				'label': 'Não',
				'autoClose': true
			}]
		});

	},
	confirmarCancelamentoPessoal: function(){
		var documentId = $("#documentIdPessoal").val();
		
		FLUIGC.modal({
			title: 'Confirmação',
			content: Mustache.render($(".dialogo_cancelamento_pessoal").html(), {documentId}),
			id: 'dialogo_cancelamento_pessoal',
			size: 'small',
			 actions: [{
				'label': 'Sim',
				 'bind': 'data-cancelar-pessoal',
			},{
				'label': 'Não',
				'autoClose': true
			}]
		});
	},
	cancelarAgendamento: function (){
		var that = this;
		var documentId = $("#idDocumento").val();
		var loading = FLUIGC.loading("#dialogo");
		loading.show();
		var filtroDocumentId = DatasetFactory.createConstraint("cardDocumentId", documentId, documentId, ConstraintType.MUST);

		var workflowProcess = DatasetFactory.getDataset("workflowProcess", null, [filtroDocumentId], null);

		if(!workflowProcess || workflowProcess.values.length == 0){
			return FLUIGC.toast({
				title: '',
				message: 'Não foi possível cancelar o agendamento',
				type: 'danger',
				timeout: 'slow'
			});
		}

		var processo = workflowProcess.values[0];
		var companyId = WCMAPI.tenantCode
		var wsUrl = WCMAPI.serverURL + "/webdesk/ECMWorkflowEngineService?wsdl";

		var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.workflow.ecm.technology.totvs.com/">'
			+'<soapenv:Header/>'
			+'<soapenv:Body>'
			+'<ws:cancelInstance>'
			+'<username>rodrigo.sombrio</username>'
			+' <password>Totvs@123</password>'
			+'<companyId>'+companyId+'</companyId>'
			+'<processInstanceId>'+processo["workflowProcessPK.processInstanceId"]+'</processInstanceId>'
			+'<userId>'+WCMAPI.getUserCode()+'</userId>'
			+'<cancelText>Cancelado pela widget de agendas</cancelText>'
			+'</ws:cancelInstance>'
			+'</soapenv:Body>'
			+'</soapenv:Envelope>'

			var parser = new DOMParser();

		var xmlRequest = parser.parseFromString(soapRequest, "text/xml");

		WCMAPI.Create({
			url: wsUrl,
			dataType: "xml",
			contentType: "text/xml",
			data: xmlRequest,
			success: function(){

				FLUIGC.toast({
					title: 'Operação realizada com sucesso!',
					message: "O agendamento foi cancelado",
					type: 'success',
					timeout: 'slow'
				});
			},
			error:function(){
				FLUIGC.toast({
					title: '',
					message: "Não foi possível completar a operação",
					type: 'danger',
					timeout: 'slow'
				});
			},
			complete:function(){
				setTimeout(()=>{
					$("#dialogo").modal('hide');
					$("#fluig-modal").modal('hide');
				},2000)
				$("#calendar").fullCalendar("removeEvents")
				that.getInfoFromDataset(that.emailAtual);
				that.getPersonalTasks();
				loading.hide();
							
			}
		})
	},
	cancelarAgendamentoPessoal:function(){
		var that = this;
		var loading = FLUIGC.loading("#dialogo_cancelamento_pessoal");
		loading.show();
		var documentId = $("#idDocumentoPessoal").val();
		var companyId = WCMAPI.tenantCode
		var wsUrl = WCMAPI.serverURL + "/webdesk/ECMCardService?wsdl";
		
		var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">'+
		+' <soapenv:Header/>'
		+' <soapenv:Body>'
		+'     <ws:deleteCard>'
		+'        <companyId>'+companyId+'</companyId>'
		+'        <username>rodrigo.sombrio</username>'
		+'       <password>Totvs@123</password>'
		+'       <cardId>'+documentId+'</cardId>'
		+'    </ws:deleteCard>'
		+' </soapenv:Body>'
		+'</soapenv:Envelope>'
		
		var parser = new DOMParser();

		var xmlRequest = parser.parseFromString(soapRequest, "text/xml");

		WCMAPI.Create({
			url: wsUrl,
			dataType: "xml",
			contentType: "text/xml",
			data: xmlRequest,
			success: function(){

				FLUIGC.toast({
					title: 'Operação realizada com sucesso!',
					message: "O agendamento foi cancelado",
					type: 'success',
					timeout: 'slow'
				});
			},
			error:function(){
				FLUIGC.toast({
					title: '',
					message: "Não foi possível completar a operação",
					type: 'danger',
					timeout: 'slow'
				});
			},
			complete:function(){
				setTimeout(()=>{
					$("#dialogo_cancelamento_pessoal").modal('hide');
					$("#pessoal").modal('hide');
				},2000)
				
				$("#calendar").fullCalendar("removeEvents")
				that.getInfoFromDataset(that.emailAtual);
				that.getPersonalTasks();
				loading.hide();	
			}
		})
	},
	abrirDialogo: function(){
		
		var that = this;
		
		if(!that.emailAtual){
			return FLUIGC.toast({
				title: 'Selecione um arquiteto!',
				message: 'Não foi possível prosseguir com a solicitação',
				type: 'danger',
				timeout: 'slow'
			});
		}
		var constraintEmail = DatasetFactory.createConstraint("EMAIL",that.emailAtual, that.emailAtual, ConstraintType.MUST );
		var dsArquitetos = DatasetFactory.getDataset("dsArquitetos", null, [constraintEmail], null)
		
		var arquiteto = {
			nome: dsArquitetos.values[0].ARQUITETO,
			email: dsArquitetos.values[0].EMAIL
		}
		modalCriacao = FLUIGC.modal({
			title: 'Adicionar agendamento',
			content: Mustache.render($(".dialogo_criacao").html(), arquiteto),
			id: 'adicionaAgendamento',
			size: 'large',
			 actions: [{
				'label': 'Salvar',
				 'bind': 'data-salvar',
			},{
				'label': 'Cancelar',
				'autoClose': true
			}]
		});
	},
	salvarAgendamento: function(){
		var that = this;
		if(this.isNullOrEmpty($("#nomeArquiteto")) || this.isNullOrEmpty($("#emailArquiteto")) 
			|| this.isNullOrEmpty($("#dataAgenda")) || this.isNullOrEmpty($("#dataAgendaTermino"))
			|| this.isNullOrEmpty($("#horaInicio")) || this.isNullOrEmpty($("#horaFim"))
			|| this.isNullOrEmpty($("#atividade"))){
			
			return FLUIGC.toast({
				title: 'Campos obrigatórios',
				message: 'Por favor, preencha os campos',
				type: 'warning',
				timeout: 'slow'
			});
		}
		
		if(moment($("#dataAgenda").val()).isAfter(moment($("#dataAgendaTermino").val()))){
			return FLUIGC.toast({
				title: 'Erro no preenchimento',
				message: 'Data de término da agenda não pode ser antes do início',
				type: 'warning',
				timeout: 'slow'
			});
		}
		
		if($("#horaInicio").val().length < 5){
			return FLUIGC.toast({
				title: 'Erro no preenchimento!',
				message: 'Horas inconsistentes',
				type: 'warning',
				timeout: 'slow'
			});
		}
		
		if($("#horaFim").val().length < 5){
			return FLUIGC.toast({
				title: 'Erro no preenchimento!',
				message: 'Horas inconsistentes',
				type: 'warning',
				timeout: 'slow'
			});
		}
		
		
		var novoAgendamento = {
				nomeArquiteto: $("#nomeArquiteto").val(),
				emailArquiteto: $("#emailArquiteto").val(),
				dataAgenda: $("#dataAgenda").val(),
				dataAgendaTermino: $("#dataAgendaTermino").val(),
				horaInicio: $("#horaInicio").val(),
				horaFim: $("#horaFim").val(),
				atividade: that.removeAcento($("#atividade").val()),
				observacao: that.removeAcento($("#observacao").val())
		}
		
		this.createCardData(novoAgendamento)
		
	},
	isNullOrEmpty: function(element){
		if(!element || element.val() == ""){
			element.closest("div").addClass("has-error").removeClass("has-success")
			return true
		}else{
			element.closest("div").addClass("has-success").removeClass("has-error")
			return false;
		}
	},
	createCardData: function(agendamento){
		var loading = FLUIGC.loading("#adicionaAgendamento");
		loading.show();
		var that = this;
		
		var wsUrl = WCMAPI.serverURL + "/webdesk/ECMCardService?wsdl";
		var companyId = WCMAPI.tenantCode
		var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">'
			+'   <soapenv:Header/>'
			+'   <soapenv:Body>'
			+'      <ws:create>'
			+'         <companyId>'+companyId+'</companyId>'
			+'         <username>rodrigo.sombrio</username>'
			+'         <password>Totvs@123</password>'
			+'         <card>'
			+'            <item>'
			+'               <cardData>'
			+'               <field>tecnico</field>'
			+'               <value>'+agendamento.nomeArquiteto+'</value>'
			+'               </cardData>'
			+''
			+'               <cardData>'
			+'               <field>emailTecnico</field>'
			+'               <value>'+agendamento.emailArquiteto+'</value>'
			+'               </cardData>'
			+''
			+'               <cardData>'
			+'               <field>dataAgenda</field>'
			+'               <value>'+agendamento.dataAgenda+'</value>'
			+'               </cardData>'
			+''
			+'               <cardData>'
			+'               <field>dataAgendaTermino</field>'
			+'               <value>'+agendamento.dataAgendaTermino+'</value>'
			+'               </cardData>'
			+''
			+'               <cardData>'
			+'               <field>horaInicio</field>'
			+'               <value>'+agendamento.horaInicio+'</value>'
			+'               </cardData>'
			+''
			+'               <cardData>'
			+'               <field>horaFim</field>'
			+'               <value>'+agendamento.horaFim+'</value>'
			+'               </cardData>'
			+''
			+'               <cardData>'
			+'               <field>titulo</field>'
			+'               <value>'+agendamento.atividade+'</value>'
			+'               </cardData>'
			+''
			+'               <cardData>'
			+'               <field>observacao</field>'
			+'               <value>'+agendamento.observacao+'</value>'
			+'               </cardData>'
			+'               <parentDocumentId>5142043</parentDocumentId>'
			+'   '            
			+'            </item>'
			+'         </card>'
			+'      </ws:create>'
			+'   </soapenv:Body>'
			+'</soapenv:Envelope>';

		var parser = new DOMParser();

		var xmlRequest = parser.parseFromString(soapRequest, "text/xml");
		
		WCMAPI.Create({
			url: wsUrl,
			dataType: "xml",
			contentType: "text/xml",
			data: xmlRequest,
			success: function(){
				
				FLUIGC.toast({
			        title: 'Operação realizada com sucesso!',
			        message: "Agendamento realizado",
			        type: 'success'
			    });
			},
			error:function(){
				FLUIGC.toast({
			        title: '',
			        message: "Não foi possível completar a operação",
			        type: 'danger'
			    });
			},
			complete:function(){
				setTimeout(()=>{
					$("#adicionaAgendamento").modal("hide");
				},2000)
				$("#calendar").fullCalendar("removeEvents")
				that.getInfoFromDataset(that.emailAtual);
				that.getPersonalTasks();
				loading.hide();
			}
		})

	},
	removeAcento: function(text){
	    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
	    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
	    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
	    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
	    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
	    text = text.replace(new RegExp('[Ç]','gi'), 'c');
	    return text;   
	}



});

