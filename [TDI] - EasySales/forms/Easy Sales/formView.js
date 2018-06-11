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
		$('#model_' + asksGroups.model.codigo).addClass("col-md-offset-5");
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

		if (CURRENT_STATE == Activity.PREENCHER_QUESTIONARIO || CURRENT_STATE == Activity.MODIFICAR || CURRENT_STATE == Activity.FIM) {
			FormViewAsks.setAsksTab(groupsCode, models);
			$("#esOfertas .asksGroups").attr("disabled", true);
			$("div[data-toggle='buttons']").removeAttr("data-toggle");

			
		}
	}
};

var FormViewAsks = {
	setAsks: function (asks, $panel) {
		for (var j = 0; j < asks.length; j++) {
			var ask = asks[j];
			var temp = this.getTemp(ask);
			var defaultValue = '';
			var askCodigo = ask.codigo;
			askCodigo = askCodigo.replace(".", "___");
			debugger;
			$("div.panel-collapse."+ ask.modulo).append(temp);
			

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

		if (CURRENT_STATE == Activity.MODIFICAR || CURRENT_STATE == Activity.FIM) {

			this.loadAskResposta();

			//SE ATIVIDADE FIM DISABILITA TODOSO S INPUTS
			if (CURRENT_STATE == Activity.FIM) {

				$("#conteudo :input").attr("disabled", true);

			}

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
		var temp = '<div class="form-group row ' + ask.modulo + ' ' + classHidden + '" id="row_' + askCodigo + '" ><label class="col-md-6 col-sm-6 col-xs-12 control-label text-right" title="' + ask.obs + '">' + $.trim(ask.nivel) + ' - ' + $.trim(ask.nome) + '</label>';
		temp += '<div class="col-md-6 col-sm-6 col-xs-12" title="' + ask.obs + '">' + ask.tipo + '</div></div>';
		return temp;

	},
	setAsksTab: function (switchs, models) {
		var defs = [];

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

				if (ask.tipo == "1") {
					var options = ask.opcoes.split(';');
					ask.tipo = '';
					for (var k = 0; k < options.length; k++) {

						var option = options[k];
						//	ask.tipo+= '<input name="ask_'+askCodigo+'" class="checkDad '+requiredClass+'" id="ask_'+askCodigo+'_'+option.split('=')[0]+'" type="radio" value="'+option.split('=')[0]+'"/>&nbsp;'+option.split('=')[1]+'&nbsp;';
						ask.tipo += "<input data-id='" + ask.codigo +"' data-dad='" + ask.pai + "' name='ask_" + askCodigo + "' class='checkDad " + requiredClass + "' id='ask_" + askCodigo + "_" + option.split('=')[0] + "' type='radio' value='" + option.split('=')[0] + "'/>&nbsp;" + option.split('=')[1] + "&nbsp;";

					}
				}
				else if (ask.tipo == "2") {
					// ask.tipo = '<select name="ask_'+askCodigo+'" class="checkDad form-control '+requiredClass+'" id="ask_'+askCodigo+'">';
					ask.tipo = "<select name='ask_" + askCodigo + "' class='checkDad form-control " + requiredClass + "' id='ask_" + askCodigo + "'>";
					var options = ask.opcoes.split(';');
					for (var k = 0; k < options.length; k++) {
						var option = options[k];
						//ask.tipo+= '<option name="ask_'+askCodigo+'" class="checkDad" id="ask_'+askCodigo+'" value="'+option.split('=')[0]+'">'+option.split('=')[1]+'</option>';
						ask.tipo += "<option data-id='" + ask.codigo +"' data-dad='" + ask.pai + "' name='ask_" + askCodigo + "' class='checkDad' id='ask_" + askCodigo + "' value='" + option.split('=')[0] + "'>" + option.split('=')[1] + "</option>";

					}
					ask.tipo += '</select>';
				}
				else if (ask.tipo == "3") {
					// ask.tipo = '<input name="ask_'+askCodigo+'" class="checkDad form-control input-number '+requiredClass+'" id="ask_'+askCodigo+'" type="text" mask="000000000000000"/>';
					ask.tipo = "<input data-id='" + ask.codigo +"' data-dad='" + ask.pai + "' name='ask_" + askCodigo + "' class='checkDad form-control input-number " + requiredClass + "' id='ask_" + askCodigo + "' type='text' mask='000000000000000'/>";
				}
				else if (ask.tipo == "4") {
					// ask.tipo = '<textarea name="ask_'+ask.codigo+'" class="checkDad form-control '+requiredClass+'" id="ask_'+askCodigo+'"></textarea>';
					ask.tipo = "<textarea data-id='" + ask.codigo +"' data-dad='" + ask.pai + "'  name='ask_" + ask.codigo + "' class='checkDad form-control " + requiredClass + "' id='ask_" + askCodigo + " ></textarea>";
				}
				else if (ask.tipo == "5") {
					//ask.tipo = '<input name="ask_'+askCodigo+'" id="ask_'+askCodigo+'" type="text"/><input name="ask_'+askCodigo+'_filter" class="checkDad" id="ask_'+askCodigo+'_filter" type="text" class="form-control"/>';
					ask.tipo = "<input data-id='" + ask.codigo +"' data-dad='" + ask.pai + "' name='ask_" + askCodigo + "' class='checkDad field-filter form-control " + requiredClass + "' id='ask_" + askCodigo + "'  type='text'/>";
				}
				asksArray.push(ask);
			}
			$('#jsonPerguntas').val(JSON.stringify(defs));
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
		debugger;
		var groupedData = _.groupBy(defs, function (x) { return x.modulo });
		var template = $('#tplCollapse').html();
		var html = "";
		var i = 0;
		for (var name in groupedData) {
			var panel = template;
			panel = panel.replace("{{templateindex}}",panelFather[0].id + '_' + i);
			panel = panel.replace("{{templateindex}}",panelFather[0].id + '_' + i);
			panel = panel.replace("{{name}}",name);
			panel = panel.replace("{{name}}",name);
			i++;
			html += panel;
		
		}
		$('#conteudo').html(html);


	},loadAskResposta: function(){

		var answers = JSON.parse($('#jsonRespostas').val());

			for (var i = 0; i < answers.length; i++) {

				var answer = answers[i];
				var inputType = $('input[name=' + answer.name + ']').attr('type');

				if (inputType == 'radio' && answer.value != undefined) {

					var id = answer.name + "_" + answer.value;

					$("#" + id).attr('checked', 'checked');

				} else {

					$('[name="' + answer.name + '"]').val(answer.value);

				}

			}
	
	}
};


