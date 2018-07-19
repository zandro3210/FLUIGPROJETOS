var BannerSummer = SuperWidget.extend({
	listBanner: null,
	widgetUtils: null,
	preferences: {},
	init: function () {
		debugger;
		this.widgetUtils = new widgetUtils(this);
		this.listSlide = "#listSlide_" + this.instanceId;
		eval('this.' + this.mode + '()'); //chama view() ou edit()
	},
	view: function () {

		$(this.DOM).closest('.wcm_widget').find('.wcm_title_widget').hide();
	},
	/* Eh chamada quando a widget eh aberta no modo edicao. */
	edit: function () {
		vm = this.DOM;
		var fields = $(vm.selector).find('.param-save');
		this.widgetUtils.setValues(fields, true);
	},
	bindings: {
		local: {
			"add-slide": ["click_addSlide"],
			"load-slide": ["click_loadRicheidtor"],
			"del-slide": ["click_delSlide"],
			"save": ["click_saveParam"]
		}
	},
	addSlide: function () {

		if (this.validateaddSlide(window["richeditor_" + this.instanceId].getData())) {

			// Criando objeto para ser salvo posteriormente
			var slide = {};
			slide.count = $(this.listSlide + " tbody tr").length == 0 ? 1 : JSON.parse($(this.listSlide + " tbody tr:last").attr("data-jsonSlide")).count + 1;
			slide.content = window["richeditor_" + this.instanceId].getData();
			slide.height = $("#height_" + this.instanceId).val();
			slide.width = $("#width_" + this.instanceId).val();
			// Inserir linha na tabela
			var tr = '<tr data-jsonSlide="">';
			tr += '<td>Slide ' + slide.count + ' </td>';
			tr += '<td>' + slide.height + '</td>'
			tr += '<td>' + slide.width + '</td>'
			tr += '<td> <a data-del-slide class="btn btn-danger"><i class="fas fa-trash-alt"></i></a> <a data-load-slide class="btn btn-info"> <i class="fas fa-eye"></i></a> </td>'
			tr += '</tr>';

			$(this.listSlide).append(tr);
			// Armazenar objeto JSON na tr
			$(this.listSlide + " tbody tr:last").attr("data-jsonSlide", JSON.stringify(slide));

			// Limpar conteúdo para criar novo slide
			this.clearaAddSlide();
			// Salvar lista de Slide
			this.save();

			window.FLUIGC.toast({
				title: 'Slide',
				message: 'adicionado com sucesso!!',
				type: 'success'
			});

		}
	}
	, delSlide: function (element) {
		// Remover Slide
		element.parentElement.parentElement.remove();
		// Salvar 
		this.save();

		window.FLUIGC.toast({
			title: 'Slide',
			message: 'removido com sucesso!',
			type: 'success'
		});
	},
	saveParam: function(){
		this.save();
		window.FLUIGC.toast({
			title: 'Salvo',
			message: 'As configuração do Carousel!!',
			type: 'success'
		});
	}
	, validateaddSlide: function (content) {

		if (content.length == 61) {
			window.FLUIGC.toast({
				title: 'Falha',
				message: 'Por favor, preencha o slide com conteúdo.',
				type: 'danger'
			});
			return false;
		}


		return true;
	}
	, clearaAddSlide: function () {
		$("#width_" + this.instanceId).val("100%");
		$("#heigth" + this.instanceId).val("100%");
		window["richeditor_" + this.instanceId].setData()

	}
	, save: function () {

		// Foreach de objeto slide da tela
		var listSlide = [];
		$.each($(this.listSlide + " tbody tr"), function (key, value) {
			listSlide.push(jQuery.parseJSON(value.getAttribute("data-jsonSlide")));
		});
		this.preferences.height = $("#heightForm_" + this.instanceId).val();
	    this.preferences.width = $("#widthForm_" + this.instanceId).val();
		this.preferences.loop = $("#loop_" + this.instanceId).val();
		this.preferences.autoplay = $("#autoplay_" + this.instanceId).val();
		this.preferences.items = $("#items_" + this.instanceId).val();
		this.preferences.listSlide = JSON.stringify(listSlide);
		this.widgetUtils.saveParams(this.preferences);
	},
	loadRicheidtor: function (element) {

		var obj = JSON.parse(element.parentElement.parentElement.getAttribute("data-jsonSlide"))
		FLUIGC.modal({
			title: 'Preview Slide ' + obj.count,
			content: obj.content,
			id: 'fluig-modal',
			actions: [{
				'label': 'Close',
				'autoClose': true
			}]
		}, function (err, data) {
			if (err) {
				// do error handling
			} else {
				// do something with data
			}
		});
	}

});



function serviceRest(param) {

	$.ajax({
		url: param.url,
		dataType: param.dataType,
		type: param.method,
		data: param.data,
		success: param.success
	});

}
/**
 * Grupo de funcoes genercias para widgets,
 * 
 * @param objInstance: Objeto da SuperWidget.
 */
function widgetUtils(objInstance) {
	this.objInstance = objInstance;
	/**
	 * Funcao generica para atribuir valor aos campos de parametros da widget.
	 * 
	 * @param elementArray: Array com o objeto JQuery dos campos;
	 * @param isFormElement: Informa se eh um campo (true) ou outro elemento html (false);
	 * @returns void.
	 */
	this.setValues = function (elementArray, isFormElement) {
		var superWidget = this.objInstance;

		for (var i = 0; i < elementArray.length; i++) {
			var elementId = elementArray[i].id;
			var isEmpty = this.isEmpty(superWidget[elementId]);
			var value = (isEmpty) ? '' : superWidget[elementId];

			if (isFormElement) elementArray[i].value = value;
			else elementArray[i].innerText = value;
		}
	};
	/**
	 * Funcao generica para salvar o valor dos campos de parametros da widget.
	 * 
	 * @returns void.
	 */
	this.saveParams = function (preferences) {
		debugger;
		var superWidget = this.objInstance;
		result = WCMSpaceAPI.PageService.UPDATEPREFERENCES({ async: false }, superWidget.instanceId, preferences);

		if (result) return true;
		else return false;
	}
	/**
	 * Funcao que verifica se a String esta vazia.
	 * 
	 * @param string: String a ser verificada;
	 * @returns boolean.
	 */
	this.isEmpty = function (string) {
		return (string == undefined || string == null || string == '');
	};
	/**
	 * Funcao generica para efetuar requisicao REST.
	 * 
	 * @param url: Endereco do servico REST;
	 * @param method: GET ou POST;
	 * @param dataRequest: Objeto com os dados a ser enviado no corpo da requisicao;
	 * @param callback: Funcao a ser chamada ao concluir a requisicao;
	 * @returns void.
	 */
	this.restRequest = function (url, method, dataRequest, callback) {
		var self = this;

		self.loading = FLUIGC.loading("#wcm-content");
		self.loading.show();

		$.ajax({
			url: url,
			type: method,
			data: dataRequest,
			contentType: "application/json",
		}).done(function (data) {
			callback(data.content);
		}).fail(function (XHR, textStatus) {
			console.error(XHR);
			console.error(textStatus);
			FLUIGC.toast({
				message: 'Erro ao efetuar consulta!',
				type: 'danger',
				timeout: 'slow'
			});
		}).always(function () {
			self.loading.hide();
		});
	}
}

/**
 * Retorna um objeto Date (JavaScript) com o ultimo dia do mes.
 * @param date: Sera retornado o ultimo dia do mes informado nesta data.   
 * @returns Date.
 */
function getLastDayOfMonth(date) {
	var month = date.getMonth() + 1;

	date.setMonth(month);
	date.setDate(0);

	return date;
}

/**
 * Converte um objeto Date (JavaScript) para uma string no padrao dd/mm/yyyy.
 * Ou para o formato especificado.
 * 
 * @param date: Data a ser convertida.
 * @param customFormat: Não obrigatório, onde d = dia, m = mes e y = ano.
 * @returns String.
 */
function dateToStringBr(date, customFormat) {
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();

	month = (month < 10) ? '0' + month : month;

	if (customFormat != null) {
		customFormat = customFormat.replace('d', day);
		customFormat = customFormat.replace('m', month);
		customFormat = customFormat.replace('y', year);

		return customFormat;
	}

	return day + '/' + month + '/' + year;
}

