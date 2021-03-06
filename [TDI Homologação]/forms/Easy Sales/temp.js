$(document).ready(function () {
	FormView.binding();
	FormView.enableTabs();
	FormView.setMandatoryFields();
	loadDataTable();
	if (CURRENT_STATE != Activity.ZERO && CURRENT_STATE != Activity.INICIO) { FormViewOffer.loadModelsTab(); }

});

$(document).on("click", "[href='#rlGrafico'][aria-expanded='true']", function () {

	setTimeout(function () {
		loadGraph();
	}, 1000);
});
function loadDataTable() {


	$('.table').DataTable({
		dom: 'Bfrtip',
		buttons: [
			'copyHtml5',
			'excelHtml5',
			'csvHtml5',
			'pdfHtml5'
		],
		language: {
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
function loadGraph() {
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
				data: ['T 2600056', 'T 2600055', 'T 2600054']
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
				data: [189, 190, 200],
				color: '#696a6c'
			},
			{
				name: 'Otimizado',
				type: 'bar',
				stack: '广告',
				data: [177, 168, 9],
				color: '#2f6b89'
			},

		]
	};

	if (option && typeof option === "object") {
		myChart.setOption(option, true);
	}

}
$(document).on("click", ".checkDad", function () {
	debugger;
	checkDad(this);
	loadJsonResposta();
});
function checkDad(element) {
	element = (element.nodeName == undefined) ? element.currentTarget : element;

	var questions = JSON.parse($('#jsonPerguntas').val());

	for (var i = 0; i < questions.length; i++) {
		var quest = questions[i];
		var name = element.name.split('ask_')[1];
		var askCodigo = quest.codigo;
		askCodigo = askCodigo.replace(".", "___");

		if (name == quest.pai) {
			if (questions.find(x => x.codigo == quest.pai).tp == "6"){

				if (quest.nivel.split('.')[1] == 1 && element.value == 1) {
					$('#row_' + askCodigo).removeClass('hidden');
					$('[name="ask_' + askCodigo + '"]').addClass('ask-required');
				}else if (quest.nivel.split('.')[1] == 2 && element.value != 1) {
					$('#row_' + askCodigo).removeClass('hidden');
					$('[name="ask_' + askCodigo + '"]').addClass('ask-required');
				}else{
					$('#row_' + askCodigo).addClass('hidden');
					$('[name="ask_' + askCodigo + '"]').removeClass('ask-required');
				}

			}else if (element.value == 1) {
				$('#row_' + askCodigo).removeClass('hidden');
				$('[name="ask_' + askCodigo + '"]').addClass('ask-required');
			}
			else {
				if (quest.tp == '1') {//SE INPUT FOR RADIO					
					var opcao2 = quest.opcoes.split(';')[1].split('=')[0];
					var idInput = "ask_" + askCodigo + '_' + opcao2;

					$('#' + idInput).attr('checked', true);
					$('#' + idInput).trigger('click');
				}

				$('[name="ask_' + askCodigo + '"]').removeClass('ask-required');
				$('#row_' + askCodigo).addClass('hidden');
			}
		}

	}

}

var filterOptions = {};

function setSelectedZoomItem(selectedItem) {
	switch (selectedItem.inputId) {
		case 'dsNmExecutivo': FormZoom.callbackZoomEar(selectedItem); break;
		case 'proposta': FormZoom.callbackZoomProposal(selectedItem); break;
	}
}

function setFilterZoom() {
	    if (window['data-zoom_' + FormZoom.fieldZoomName] == undefined) setTimeout(setFilterZoom, 1000);
	    else reloadZoomFilterValues(FormZoom.fieldZoomName, FormZoom.filterValues);
}

var beforeSendValidate = function (numState, nextState) {

	if (numState == Activity.PREENCHER_QUESTIONARIO) {
		loadJsonResposta();
	}

	var errors = CustomValidate.validate(numState);
	$('#errosQuestionario').val(errors);

	return true;
}


function loadJsonResposta() {
	var obj = [];
	$('[name*="ask_"]').each(function () {
		if (this.name != undefined) {
			if (this.type == 'radio') {
				if ($('input[name="' + this.name + '"]').is(':checked')) {
					obj.push({ name: this.name, value: $('input[name=' + this.name + ']:checked').val() });
				}
			}
			else if ($(this).hasClass('field-filter')) {
				var filterId = this.id.replace('___', '.').split('ask_')[1];
				var filterQ = JSON.parse($('#jsonPerguntas').val());
				var map = {};
				var finalValue = [];
				for (var fi = 0; fi < filterQ.length; fi++) {
					var current = filterQ[fi];
					if (current.codigo == filterId) {
						var filterMap = current.opcoes.split(';');
						for (var fj = 0; fj < filterMap.length; fj++) {
							var curMap = filterMap[fj];
							var parts = curMap.split('=');
							map[parts[1]] = parts[0];
						}
					}
				}

				var values = this.value.split(',');
				for (var fi = 0; fi < values.length; fi++) {
					finalValue.push(map[values[fi]]);
				}
				obj.push({ name: this.name, value: finalValue.join(';') })
			}
			else {
				obj.push({ name: this.name, value: this.value })
			}
		}
		$('#jsonRespostas').val(JSON.stringify(obj));
	});

}
var CustomValidate = {
	validate: function (numState) {
		var errors = new HashSet();

		if (numState == Activity.PREENCHER_QUESTIONARIO || numState == Activity.MODIFICAR) {
			var that = this;
			//$('[name*="ask_"]').each(function(){
			$('.ask-required').each(function () {
				var $element = $(this);
				errors.add(that.getError($element));
			});
		}

		return errors.getArray().join('<br/>');
	},
	getError: function ($element) {
		var error = '';
		var isRadio = ($element.attr('type') == 'radio');
		var isFilter = $element.hasClass('field-filter');
		//var isVisible = $element.is(':visible');		
		var hasParentVisible = $element.parent().is(':visible');

		if (isRadio) {
			//if(isVisible) error+= (this.isEmpty($element)) ? "É necessário preencher o campo: "+this.getLabel($element) : '';
			error += (this.isEmpty($element)) ? "É necessário preencher o campo: " + this.getLabel($element) : '';
		}
		else if (isFilter) {
			//if(hasParentVisible) error+= (this.isEmpty($element)) ? "É necessário preencher o campo: "+this.getLabel($element) : '';
			error += (this.isEmpty($element)) ? "É necessário preencher o campo: " + this.getLabel($element) : '';
		}
		else {
			//if(isVisible) error+= (this.isEmpty($element)) ? "É necessário preencher o campo: "+this.getLabel($element) : '';
			error += (this.isEmpty($element)) ? "É necessário preencher o campo: " + this.getLabel($element) : '';
		}

		return error;
	},
	getLabel: function ($element) {
		var label = $element.parent().parent().children('label').first().text();
		return label;
	},
	isEmpty: function ($element) {
		var isEmpty = true;
		var isRadio = ($element.attr('type') == 'radio');

		if (isRadio) isEmpty = this.checkRadio($element);
		else isEmpty = this.checkText($element);

		return isEmpty;
	},
	checkRadio: function ($element) {
		var name = $element.attr('name');
		var selector = '[name="' + name + '"]:checked';
		var isEmpty = ($(selector).size() == 0);

		return isEmpty;
	},
	checkText: function ($element) {
		return ($element.val() == '');
	}
}

var autocompleteInstance = {};
function setAutocompleteField(listValues, fieldName) {
	var filter = FLUIGC.autocomplete('#' + fieldName, {
		source: substringMatcher(listValues),
		displayKey: 'description',
		tagClass: 'tag-gray',
		type: 'tagAutocomplete',
		minLength: 0

	});
	filter.on("fluig.autocomplete.selected", function(event) {
		loadJsonResposta();
	});
	autocompleteInstance[fieldName] = filter;
}

/**
 * Localiza os valores na lista do autocomplete.
 * 
 * @param strs: lista de valores.
 * @returns function.
 */
function substringMatcher(strs) {
	return function findMatches(q, cb) {
		var matches, substrRegex;

		matches = [];

		substrRegex = new RegExp(q, 'i');

		$.each(strs, function (i, str) {
			if (substrRegex.test(str)) {
				matches.push({
					description: str
				});
			}
		});
		cb(matches);
	};
}

var HashSet = function () {
	var data = {};

	this.add = function (value) {
		if (value != '' && value != null && value != undefined) data[value] = '';
	}

	this.getArray = function () {
		var array = [];

		for (var key in data) {
			array.push(key);
		}

		return array;
	}
}