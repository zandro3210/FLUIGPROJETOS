var FormView = {
	modelsField: [],
	scopesField: {},
	binding: function () {
		if ($('#dsNmExecutivo').val() == '') FormZoom.setFilterZoomEar();
		//$(document).on('click', '.bootstrap-switch', FormDaoOffer.setAksGroupsValue);		
		$(document).on('click', 'div.panel .btn-primary:not([disabled])', function () {
			FormDaoOffer.setAksGroupsValue(this.control);
		});
		$(document).on('click', '.panel-heading', function () {
			$(this).parent().find('.panel-body').toggle();
		});
		$('#liAlcance').on('click', function () {
			var asks = JSON.parse($('#jsonPerguntas').val());
			$(asks).each(function () {
				if (this.tp == '1' && this.padrao == '1') {
					var askCodigo = this.codigo.replace(".", "___");
					var element = $('[name="ask_' + askCodigo + '"]')[0];
					checkDad(element);
				}
			});
		});
	},
	enableTabs: function () {


		if (CURRENT_STATE == Activity.ZERO || CURRENT_STATE == Activity.INICIO) {
			$('#liOfertas').hide();
			$('#liAlcance').hide();
		}
		$('#liRelatorio').hide();
		if (CURRENT_STATE == Activity.RELATORIO || CURRENT_STATE == Activity.FIM) {
			$('#liRelatorio').show();
		}
	},
	setMandatoryFields: function () {
		RequiredField.enableStyle();

		if (CURRENT_STATE == Activity.ZERO || CURRENT_STATE == Activity.INICIO) {
			RequiredField.setField('dsNmExecutivo');
			RequiredField.setField('proposta');
		}
	}
};

var FormViewProposal = {
	setEar: function (row) {
		var json = '{"EXECUTIVOS":[{"codigo": "' + row.codigo + '", "nome": "' + row.nome + '", "codunidade": "' + row.codunidade + '", "unidade": "' + row.unidade + '", "GAR": ' + row.gar + ', "DAR": ' + row.dar + ',"GO": ' + row.go + '}]}';
		$('#jsonExecutivo').val(json);
		$('#dsCdExecutivo').val(row.codigo);
		$('#dsNmUnidade').val(row.unidade);

		//Elimina todas as linhas da tabela exceto a que serve como modelo para o Fluig.
		while ($('#tblExecutivo tbody tr').length > 1) {
			var rows = $('#tblExecutivo tbody tr');
			var currentFirst = $(rows[1]);
			currentFirst.remove();
		}

		this.addEarRows(JSON.parse(row.gar), 'GAR');
		this.addEarRows(JSON.parse(row.dar), 'DAR');
		this.addEarRows(JSON.parse(row.go), 'GO');
	},
	addEarRows: function (rows, type) {
		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			var index = wdkAddChild('tblExecutivo');

			$('#deTpExecutivo___' + index).val(type);
			$('#deCdExecutivo___' + index).val(row.codigo);
			$('#deNmExecutivo___' + index).val(row.nome);
			$('#deNmUnidade___' + index).val(row.unidade);
		}
	},
	setProposal: function (row) {
		$('#liOfertas').show();

		$('#dpNrProposta').val(row.proposta);
		$('#dpNrRevisao').val(row.revisao);
		$('#dpNrOportunidade').val(row.oportunidade);
		$('#dpNrRevProposta').val(row.revprop);
		$('#dpNrEntidade').val(row.entidade);
		$('#dpStatus').val(row.status);
		$('#dpDtProposta').val(row.data);
		$('#dpCdVendedor').val(row.vendedor);
	},
	setCustomer: function (row) {
		var entity = $('#dpNrEntidade').val();
		var jsonCliente = '{"codseg": "' + row.codseg + '", "entidade": "' + entity + '", "codigo": "' + row.codigo + '", "loja": "' + row.loja + '", "cgc": "' + row.cgc + '", "nome": "' + row.nome + '", "nreduz": "' + row.nreduz + '", "pessoa": "' + row.pessoa + '", "tipo": "' + row.tipo + '", "segmento": "' + row.codseg + '", "endereco": "' + row.endereco + '", "bairro": "' + row.bairro + '", "cidade": "' + row.cidade + '", "uf": "' + row.uf + '", "cep": "' + row.cep + '", "complemento": "' + row.complemento + '", "ddd": "' + row.ddd + '", "telefone": "' + row.telefone + '", "email": "' + row.email + '", "contato": "' + row.contato + '"}'.replaceAll('undefined', '');
		$('#jsonCliente').val(jsonCliente);
		$('#dcCodigo').val(row.codigo);
		$('#dcLoja').val(row.loja);
		$('#dcCgc').val(row.cgc);
		$('#dcNome').val(row.nome);
		$('#dcNreduz').val(row.nreduz);
		$('#dcPessoa').val(row.pessoa);
		$('#dcTipo').val(row.tipo);
		$('#dcCodseg').val(row.codseg);
		$('#dcEndereco').val(row.endereco);
		$('#dcBairro').val(row.bairro);
		$('#dcCidade').val(row.cidade);
		$('#dcUf').val(row.uf);
		$('#dcCep').val(row.cep);
		$('#dcComplemento').val(row.complemento);
		$('#dcDdd').val(row.ddd);
		$('#dcTelefone').val(row.telefone);
		$('#dcEmail').val(row.email);
		$('#dcContato').val(row.contato);
	},

};

var FormViewOffer = {
	setModels: function (models) {
		var template = $('#tplModel').html();
		var html = Mustache.to_html(template, models);

		$('#esOfertas').html(html);
	},
	setAsksGroups: function (asksGroups) {
		var template = $('#tplAsksGroup').html();
		var html = Mustache.to_html(template, asksGroups);
		$('#model_' + asksGroups.model.codigo).addClass("col-md-offset-5 col-sm-offset-5 ");
		$('#model_' + asksGroups.model.codigo).html(html);
	},
	loadModelsTab: function () {
		var models = FormDaoOffer.getModelsOfField();

		FormViewOffer.setModels({ models: models });

		this.loadAsksGroupsTab(models);
	},
	loadAsksGroupsTab: function (models) {
		var asksGroups = FormDaoOffer.getAsksGroupsOfField();
		var switchs = [];
		var values = FormDaoOffer.getAksGroupsValue();
		var groupsCode = [];

		for (var i = 0; i < models.length; i++) {
			var code = models[i].codigo;
			var modori = models[i].modori;
			var obj = asksGroups[modori];
			var value = values['switch_' + code];

			FormViewOffer.setAsksGroups(obj);
			switchs.push({ name: 'switch_' + code, value: value });
		}
		//FLUIGC.switcher.init('.form-switch');


		for (var i = 0; i < switchs.length; i++) {
			var switc = switchs[i];
			var $input = $('input[name="' + switc.name + '"][value="' + switc.value + '"]');
			$input.trigger('click');
			groupsCode.push($input.attr('id'));
		}

		if (CURRENT_STATE == Activity.PREENCHER_QUESTIONARIO || Activity.RELATORIO || CURRENT_STATE == Activity.MODIFICAR || CURRENT_STATE == Activity.FIM) {
			FormViewAsks.setAsksTab(groupsCode, models);
			$("#esOfertas .asksGroups").attr("disabled", true);
			$("div[data-toggle='buttons']").removeAttr("data-toggle");


		}
	}
};

var FormViewReport = {
	loadTable: function () {
		var objeto = jQuery.parseJSON($("#jsonGrafico").val());
		if (objeto == "" || objeto == "undefined") {
			var result = $.get(SERVER + "/rest/WSGETREPORT?Proposta=" + $("#proposta").val());
			if (result.status == 200)
				$("#jsonGrafico").val(result.responseText);
			objeto = result.responseText;
		}
		var dataset = [];


		$.each(objeto.PERGUNTAS, function (key, x) {
			var jsonAsks = [];
			jsonAsks.push(x.Pergunta);
			jsonAsks.push(x.Descricao);
			jsonAsks.push(x["EDT Pai"]);
			jsonAsks.push(x.Tarefa);
			dataset.push(jsonAsks);
		});


		$('#tableAks').DataTable({
			"paging": true,
			"searching": true,
			"data": dataset,
			"aaSorting": [],
			"columns": [
				{ title: "Pergunta" },
				{ title: "Descrição" },
				{ title: "Edt Pai" },
				{ title: "Tarefa" }
			],
			"dom": 'Bfrtip',
			"lengthMenu": [
				[ 10, 25, 50, -1 ],
				[ '10 linhas', '25 linhas', '50 linhas', 'Todos' ]
			],
			"buttons": [
				{ extend: 'copy', className: 'hidden-xs hidden-sm',text:"Copiar" },
				{ extend: 'excel', className: 'hidden-xs hidden-sm'  ,text: "Excel"},
				{ extend: 'csv', className: 'hidden-xs hidden-sm',text:"Csv" },
				{ extend: 'pdf', className: 'hidden-xs hidden-sm',text:"PDF" },
				{ extend: 'pageLength', className: '',text:"Linhas" },
			],
			"language": {
				"sEmptyTable": "Nenhum registro encontrado",
				"sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
				"sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
				"sInfoFiltered": "(Filtrados de _MAX_ registros)",
				"sInfoPostFix": "",
				"sInfoThousands": ".",
				"sLengthMenu": "_MENU_ resultados por página",
				"sLoadingRecords": "Carregando...",
				"sProcessing": "Processando...",
				"sZeroRecords": "Nenhum registro encontrado",
				"sSearch": "Pesquisar",
				"oPaginate": {
					"sNext": "Próximo",
					"sPrevious": "Anterior",
					"sFirst": "Primeiro",
					"sLast": "Último"
				},
				"oAria": {
					"sSortAscending": ": Ordenar colunas de forma ascendente",
					"sSortDescending": ": Ordenar colunas de forma descendente"
				}
			}

		});




		dataset = [];
		$.each(objeto.ORCAMENTO, function (key, x) {
			var jsonBudget = [];
			jsonBudget.push(x.Descricao);
			jsonBudget.push(x["Modelo Origem"]);
			jsonBudget.push(x["Horas Original"]);
			jsonBudget.push(x["Modelo Otimizado"]);
			jsonBudget.push(x["Horas Otimizado"]);
			jsonBudget.push(parseInt(parseInt(x["Horas Otimizado"]) - x["Horas Original"]));
			jsonBudget.push(typeof x.Nivel == "undefined" ?"":x.Nivel);
			dataset.push(jsonBudget);
		});

		$("#tableBudget").append('<tfoot><tr><th></th><th></th><th></th><th></th><th></th><th></th></tr></tfoot>');
		$('#tableBudget').DataTable({
			"paging": true,
			"searching": true,
			"data": dataset,
			"aaSorting": [],
			"aoColumnDefs": [ {
				"aTargets": [2,4],
				"fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
				  if ( oData[6] != "" ) {
					$(nTd).addClass('father');
				  }
				}
			  } ],
			  "initComplete": function (settings, json) {
				this.api().columns('.sum').every(function () {
					var column = this;
					var sum = 0;
					$.each(column.nodes().to$().not('.father'), function( index, value ) {
					   sum += parseInt(value.innerText);
					});
					
		
					$(column.footer()).html('Total: ' + sum);
				});
			},
			"columns": [
				{ title: "Descrição" },
				{ title: "Modelo Origem" },
				{ title: "Horas Original" , className: "sum" },
				{ title: "Modelo Otimizado" },
				{ title: "Horas Otimizada" , className: "sum"  },
				{ title: "Horas Resultado" , className: "sum"  }
			],
			"dom": 'Bfrtip',
			"lengthMenu": [
				[ 10, 25, 50, -1 ],
				[ '10 linhas', '25 linhas', '50 linhas', 'Todos' ]
			],
			"buttons": [
				{ extend: 'copy', className: 'hidden-xs hidden-sm',text:"Copiar" },
				{ extend: 'excel', className: 'hidden-xs hidden-sm'  ,text: "Excel"},
				{ extend: 'csv', className: 'hidden-xs hidden-sm',text:"Csv" },
				{ extend: 'pdf', className: 'hidden-xs hidden-sm',text:"PDF" },
				{ extend: 'pageLength', className: '',text:"Linhas" },
			],
			"createdRow": function (row, data, index) {
				if (data[5] > 0) {
					$('td', row).eq(5).addClass('rowUp');
				} else {
					$('td', row).eq(5).addClass('rowDown');
				}
			},
			"language": {
				"sEmptyTable": "Nenhum registro encontrado",
				"sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
				"sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
				"sInfoFiltered": "(Filtrados de _MAX_ registros)",
				"sInfoPostFix": "",
				"sInfoThousands": ".",
				"sLengthMenu": "_MENU_ resultados por página",
				"sLoadingRecords": "Carregando...",
				"sProcessing": "Processando...",
				"sZeroRecords": "Nenhum registro encontrado",
				"sSearch": "Pesquisar",
				"oPaginate": {
					"sNext": "Próximo",
					"sPrevious": "Anterior",
					"sFirst": "Primeiro",
					"sLast": "Último"
				},
				"oAria": {
					"sSortAscending": ": Ordenar colunas de forma ascendente",
					"sSortDescending": ": Ordenar colunas de forma descendente"
				}
			}

		});




		if (objeto.ACELERADORES.length > 0) {


			dataset = [];
			$.each(objeto.ACELERADORES, function (key, x) {
				var jsonAccelerator = [];
				jsonAccelerator.push(x.Pergunta);
				jsonAccelerator.push(x["Tipo Acelerador"]);
				jsonAccelerator.push(x.Acelerador);
				jsonAccelerator.push(x.Descricao);
				dataset.push(jsonAccelerator);
			});


			$('#tableAccelerators').DataTable({
				"paging": true,
				"searching": true,
				"data": dataset,
				"aaSorting": [],
				"columns": [
					{ title: "Pergunta" },
					{ title: "Tipo Acelerador" },
					{ title: "Acelerador" },
					{ title: "Descrição" }
				],
				"dom": 'Bfrtip',
				"lengthMenu": [
					[ 10, 25, 50, -1 ],
					[ '10 linhas', '25 linhas', '50 linhas', 'Todos' ]
				],
				"buttons": [
					{ extend: 'copy', className: 'hidden-xs hidden-sm',text:"Copiar" },
					{ extend: 'excel', className: 'hidden-xs hidden-sm'  ,text: "Excel"},
					{ extend: 'csv', className: 'hidden-xs hidden-sm',text:"Csv" },
					{ extend: 'pdf', className: 'hidden-xs hidden-sm',text:"PDF" },
					{ extend: 'pageLength', className: '',text:"Linhas" },
				],
				"language": {
					"sEmptyTable": "Nenhum registro encontrado",
					"sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
					"sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
					"sInfoFiltered": "(Filtrados de _MAX_ registros)",
					"sInfoPostFix": "",
					"sInfoThousands": ".",
					"sLengthMenu": "_MENU_ resultados por página",
					"sLoadingRecords": "Carregando...",
					"sProcessing": "Processando...",
					"sZeroRecords": "Nenhum registro encontrado",
					"sSearch": "Pesquisar",
					"oPaginate": {
						"sNext": "Próximo",
						"sPrevious": "Anterior",
						"sFirst": "Primeiro",
						"sLast": "Último"
					},
					"oAria": {
						"sSortAscending": ": Ordenar colunas de forma ascendente",
						"sSortDescending": ": Ordenar colunas de forma descendente"
					}
				}

			});
		}
	},
	loadGraph: function () {
		var data = jQuery.parseJSON($("#jsonGrafico").val());
		var modelos = [];
		var arrayHorasOriginal = [];
		var arrayHorasOtimizada = [];
		$.each(data.ORCAMENTO, function (key, x) {
			modelos.push(x.Descricao);
			arrayHorasOriginal.push(x["Horas Original"]);
			arrayHorasOtimizada.push(x["Horas Otimizado"]);
		});

		$("#DoughnutGraph").removeAttr("_echarts_instance_");
		var dom = document.getElementById("DoughnutGraph");
		var myChart = echarts.init(dom);
		var app = {};
		option = null;
		app.title = 'Gráfico de otimização';

		option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {
				data: ['Normal', 'Otimizado']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: modelos
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			series: [
				{
					name: 'Normal',
					type: 'bar',
					data: arrayHorasOriginal,
					color: '#696a6c'
				},
				{
					name: 'Otimizado',
					type: 'bar',
					stack: '广告',
					data: arrayHorasOtimizada,
					color: '#2f6b89'
				},

			]
		};

		if (option && typeof option === "object") {
			myChart.setOption(option, true);
		}
	}
}
var FormViewAsks = {
	setAsks: function (asks, $panel) {
		for (var j = 0; j < asks.length; j++) {
			var ask = asks[j];
			var temp = this.getTemp(ask);
			var defaultValue = '';
			var askCodigo = ask.codigo;
			askCodigo = askCodigo.replace(".", "___");

			$("div.panel-collapse." + ask.modulo).append(temp);


			if (ask.tp == 5) {
				var filterOpcoes = ask.opcoes.split(';');
				var list = [];
				var map = {};
				for (var k = 0; k < filterOpcoes.length; k++) {
					var op = filterOpcoes[k].split('=');
					var num = op[0];
					var desc = op[1];
					list.push(desc);
					map[desc] = num;
					if (num == ask.padrao) defaultValue = desc;
				}
				setAutocompleteField(list, 'ask_' + askCodigo);
				filterOptions['ask_' + askCodigo + '_filter'] = map;
			}

			if (ask.padrao != '') {
				if (ask.tp == '1') {
					$('[name="ask_' + askCodigo + '"][value="' + ask.padrao + '"]').attr('checked', true);
					if (ask.padrao == "1") checkDad($('[name="ask_' + askCodigo + '"][value="' + ask.padrao + '"]')[0]);
				}
				if (ask.tp == '5') {
					autocompleteInstance['ask_' + askCodigo].add({ description: defaultValue });
					$('#ask_' + askCodigo).val(ask.padrao);
				}
				else $('#ask_' + askCodigo).val(ask.padrao);
			}
		}

		if (CURRENT_STATE == Activity.MODIFICAR || CURRENT_STATE == Activity.FIM || CURRENT_STATE == Activity.RELATORIO) {

			this.loadAskResposta();
		}
		//SE ATIVIDADE FIM DISABILITA TODOSO S INPUTS
		if (CURRENT_STATE == Activity.FIM || CURRENT_STATE == Activity.RELATORIO) {

			$("#conteudo :input").attr("disabled", true);

		}


	},
	getTemp: function (ask) {
		//SE TIVER PAI E FOR DO TIPO
		if (ask.pai != "") {
			var classHidden = "";
			var questions = JSON.parse($('#jsonPerguntas').val());

			for (var i = 0; i < questions.length; i++) {
				var quest = questions[i];

				if (ask.pai == quest.codigo) {
					if (quest.tp == 1) {
						classHidden = "hidden";
					}
				}
			}
		}
		var askCodigo = ask.codigo;

		askCodigo = askCodigo.replace(".", "___");
		var template = $('#tplAsks').html();
		template = template.replace("{{tipo}}", ask.tipo);
		template = template.replace("{{classHidden}}", classHidden);
		template = template.replace(/\{{askCodigo}}/g, askCodigo)
		template = template.replace("{{nome}}", $.trim(ask.nivel) + ' - ' + $.trim(ask.nome));
		template = template.replace("{{help}}", ($.trim(ask.obs).length == 0 ? "" : "data-toggle=\"tooltip\" data-placement=\"top\" title=\"" + ask.obs + "\""));

		return template;

	},
	setAsksTab: function (switchs, models) {
		var defs = [];
		var defaultmodulo = "Diversos";
		for (var i = 0; i < switchs.length; i++) {
			var switc = switchs[i];
			var code = switc.split('askGroup_')[1];
			var asks = FormDaoAsk.getAsksOfDataset(code);
			var asksArray = [];

			for (var j = 0; j < asks.length; j++) {
				var ask = asks[j];
				var askCodigo = ask.codigo;
				var requiredClass = (ask.pai == '') ? 'ask-required' : '';

				askCodigo = askCodigo.replace(".", "___");
				ask["tp"] = ask.tipo;
				defs.push(ask);


				if (ask.pai.length > 0)
					ask.modulo = asks.find(x => x.codigo == ask.pai).modulo;

				if (ask.modulo.trim() == "") {
					ask.modulo = defaultmodulo;
					ask.nomemodulo = defaultmodulo;
				}


				if (ask.tipo == "1") {
					var options = ask.opcoes.split(';').sort();
					ask.tipo = '';
					for (var k = 0; k < options.length; k++) {

						var option = options[k];
						//	ask.tipo+= '<input name="ask_'+askCodigo+'" class="checkDad '+requiredClass+'" id="ask_'+askCodigo+'_'+option.split('=')[0]+'" type="radio" value="'+option.split('=')[0]+'"/>&nbsp;'+option.split('=')[1]+'&nbsp;';
						ask.tipo += "<input data-id='" + ask.codigo + "' data-dad='" + ask.pai + "' name='ask_" + askCodigo + "' class='checkDad " + requiredClass + "' id='ask_" + askCodigo + "_" + option.split('=')[0] + "' type='radio' value='" + option.split('=')[0] + "'/>&nbsp;" + option.split('=')[1] + "&nbsp;";

					}
				}
				else if (ask.tipo == "2") {
					// ask.tipo = '<select name="ask_'+askCodigo+'" class="checkDad form-control '+requiredClass+'" id="ask_'+askCodigo+'">';
					ask.tipo = "<select data-id='" + ask.codigo + "' data-dad='" + ask.pai + "' name='ask_" + askCodigo + "' class='checkDad form-control " + requiredClass + "' id='ask_" + askCodigo + "'>";
					var options = ask.opcoes.split(';');
					for (var k = 0; k < options.length; k++) {
						var option = options[k];
						//ask.tipo+= '<option name="ask_'+askCodigo+'" class="checkDad" id="ask_'+askCodigo+'" value="'+option.split('=')[0]+'">'+option.split('=')[1]+'</option>';
						ask.tipo += "<option  name='ask_" + askCodigo + "' class='checkDad' id='ask_" + askCodigo + "' value='" + option.split('=')[0] + "'>" + option.split('=')[1] + "</option>";

					}
					ask.tipo += '</select>';
				}
				else if (ask.tipo == "3") {
					// ask.tipo = '<input name="ask_'+askCodigo+'" class="checkDad form-control input-number '+requiredClass+'" id="ask_'+askCodigo+'" type="text" mask="000000000000000"/>';
					ask.tipo = "<input data-id='" + ask.codigo + "' data-dad='" + ask.pai + "' name='ask_" + askCodigo + "' class='checkDad form-control input-number " + requiredClass + "' id='ask_" + askCodigo + "' type='text' mask='000000000000000'/>";
				}
				else if (ask.tipo == "4") {
					// ask.tipo = '<textarea name="ask_'+ask.codigo+'" class="checkDad form-control '+requiredClass+'" id="ask_'+askCodigo+'"></textarea>';
					ask.tipo = "<textarea data-id='" + ask.codigo + "' data-dad='" + ask.pai + "'  name='ask_" + ask.codigo + "' class='checkDad form-control " + requiredClass + "' id='ask_" + askCodigo + " ></textarea>";
				}
				else if (ask.tipo == "5") {
					//ask.tipo = '<input name="ask_'+askCodigo+'" id="ask_'+askCodigo+'" type="text"/><input name="ask_'+askCodigo+'_filter" class="checkDad" id="ask_'+askCodigo+'_filter" type="text" class="form-control"/>';
					ask.tipo = "<input data-id='" + ask.codigo + "' data-dad='" + ask.pai + "' name='ask_" + askCodigo + "' class='checkDad field-filter form-control " + requiredClass + "' id='ask_" + askCodigo + "'  type='text'/>";
				} else if (ask.tipo == "6") {
					var options = ask.opcoes.split(';');
					ask.tipo = '';
					for (var k = 0; k < options.length; k++) {

						var option = options[k];
						//	ask.tipo+= '<input name="ask_'+askCodigo+'" class="checkDad '+requiredClass+'" id="ask_'+askCodigo+'_'+option.split('=')[0]+'" type="radio" value="'+option.split('=')[0]+'"/>&nbsp;'+option.split('=')[1]+'&nbsp;';
						ask.tipo += "<input data-id='" + ask.codigo + "' data-dad='" + ask.pai + "' name='ask_" + askCodigo + "' class='checkDad checkIf " + requiredClass + "' id='ask_" + askCodigo + "_" + option.split('=')[0] + "' type='radio' value='" + option.split('=')[0] + "'/>&nbsp;" + option.split('=')[1] + "&nbsp;";

					}
				}
				asksArray.push(ask);
			}
			defs = $.each(defs, function (index, x) {
				x.obs = x.obs.replace(/\”/g, "'").replace(/\"/g, "'");

				return x;
			});
			$('#jsonPerguntas').val(JSON.stringify(defs).replace(/\\n/g, ""));


			var panel = '<div class="panel-group"><div class="panel panel-info"><div class="panel-heading"><h4 class="panel-title">' + models[i].descmod + '</h4></div><div class="panel panel-default"><div class="panel-body" id="panel_' + models[i].codigo + '"></div></div></div>';
			$('#conteudo').html(panel);
			var $panel = $('#panel_' + models[i].codigo);

			this.formatGroup(asksArray, $panel);
			this.setAsks(asksArray, $panel);
			this.loadAskResposta();
		}

		//if($('#jsonPerguntas').val() == ""){
		//	$('#jsonPerguntas').val(JSON.stringify(defs));
		//}
	},
	formatGroup: function (defs, panelFather) {
		var groupedData = _.groupBy(defs, function (x) { return x.modulo });
		var template = $('#tplCollapse').html();
		var html = "";
		var i = 0;
		for (var name in groupedData) {
			var panel = template;
			panel = panel.replace("{{templateindex}}", panelFather[0].id + '_' + i);
			panel = panel.replace("{{templateindex}}", panelFather[0].id + '_' + i);
			panel = panel.replace("{{name}}", name);
			panel = panel.replace("{{modulonome}}", groupedData[name][0].nomemodulo);
			i++;
			html += panel;

		}
		$('#conteudo').html(html);


	},
	loadAskResposta: function () {

		if ($('#jsonRespostas').val().length > 0) {
			var answers = JSON.parse($('#jsonRespostas').val());
			for (var i = 0; i < answers.length; i++) {
				var answer = answers[i];
				var inputType = $('input[name=' + answer.name + ']').attr('type');

				if (inputType == 'radio' && answer.value != undefined) {
					var id = answer.name + "_" + answer.value;
					$("#" + id).attr('checked', 'checked');
				}
				else if ($('input[name=' + answer.name + ']').hasClass('field-filter')) {
					var auxValues = answer.value.split(';');


					for (name in filterOptions[answer.name + "_filter"]) {


						if (auxValues.find(x => x == filterOptions[answer.name + "_filter"][name])) {

							autocompleteInstance[answer.name].add({ description: name });
						}
					}

				}
				else {
					$('[name="' + answer.name + '"]').not('option').val(answer.value);
				}
			}

			// habilitar DIV's		
			$.each($(".checkDad[data-dad=''][type='radio']:checked"), function (key, x) {
				if (x.value == "1") {
					$("[data-dad=" + this.getAttribute('data-id') + "]").closest('.row_ask').removeClass("hidden");
				} else {
					$("[data-dad=" + this.getAttribute('data-id') + "]").closest('.row_ask').addClass("hidden");
				}
			});
		}
	}
};


