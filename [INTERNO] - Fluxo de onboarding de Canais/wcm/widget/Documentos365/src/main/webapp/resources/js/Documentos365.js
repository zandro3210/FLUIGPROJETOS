var Documentos365 = SuperWidget.extend({
  listDocument: null,
  widgetUtils: null,
  preferences: {},
  init: function () {
    debugger;
    this.widgetUtils = new widgetUtils(this);
    this.listDocument = "#listDocument_" + this.instanceId;
    eval('this.' + this.mode + '()'); //chama view() ou edit()
  },
  view: function () {

    $(this.DOM).closest('.wcm_widget').find('.wcm_title_widget').hide();
  },
  /* Eh chamada quando a widget eh aberta no modo edicao. */
  edit: function () {
  

  },
  bindings: {
    local: {
      "add-document": ["click_addDocument"],
      "load-document": ["click_loadRicheidtor"],
      "del-document": ["click_delDocument"],
      "save": ["click_saveParam"]
    }
  },
  addDocument: function () {

    if (this.validateaddDocument(window["text_" + this.instanceId].getData())) {

      // Criando objeto para ser salvo posteriormente
      var document = {};
      document.count = $(this.listDocument + " tbody tr").length == 0 ? 1 : JSON.parse($(this.listDocument + " tbody tr:last").attr("data-jsonDocument")).count + 1;
      document.icon = $("#icon_" + this.instanceId).val();
      document.category = $("#category_" + this.instanceId).val();
      document.color = $("#color_" + this.instanceId).val();
      document.url = $("#url_" + this.instanceId).val();
      document.text = window["text_" + this.instanceId].getData();
      // Inserir linha na tabela
      var tr = '<tr data-jsonDocument="">';
      tr += '<td>Documento ' + document.count + ' </td>';
      tr += '<td>' + document.category + '</td>';
      tr += '<td>' + document.color + '</td>';
      tr += '<td>' + document.url + '</td>'
      tr += '<td> <a data-del-document class="btn btn-danger"><i class="fas fa-trash-alt"></i></a> <a data-load-document class="btn btn-info"> <i class="fas fa-eye"></i></a> </td>'
      tr += '</tr>';

      $(this.listDocument).append(tr);
      // Armazenar objeto JSON na tr
      $(this.listDocument + " tbody tr:last").attr("data-jsonDocument", JSON.stringify(document));

      // Limpar conteúdo para criar novo documento
      this.clearAddDocument();
      // Salvar lista de Documento
      this.save();

      window.FLUIGC.toast({
        title: 'Slide',
        message: 'adicionado com sucesso!!',
        type: 'success'
      });

    }
  },
  delDocument: function (element) {
    debugger;
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
  saveParam: function () {
    this.save();
    window.FLUIGC.toast({
      title: 'Salvo',
      message: 'As configuração do Documento!!',
      type: 'success'
    });
  },
  validateaddDocument: function (content) {

    if (content.length == 61) {
      window.FLUIGC.toast({
        title: 'Falha',
        message: 'Por favor, preencha o texto com conteúdo.',
        type: 'danger'
      });
      return false;
    }


    return true;
  }, 
  clearAddDocument: function () {

    $("#icon_" + this.instanceId).val("");
    $("#category_" + this.instanceId).val("");
    $("#color_" + this.instanceId).val("");
    $("#url_" + this.instanceId).val("");
    window["text_" + this.instanceId].setData()

  }, 
  save: function () {

    // Foreach de objeto slide da tela
    var listDocument = [];
    $.each($(this.listDocument + " tbody tr"), function (key, value) {
      listDocument.push(jQuery.parseJSON(value.getAttribute("data-jsonDocument")));
    });
    this.preferences.title = $("#title_" + this.instanceId).val();
    this.preferences.listDocument = JSON.stringify(listDocument);
    this.widgetUtils.saveParams(this.preferences);
  },
  loadRicheidtor: function (element) {

    var obj = JSON.parse(element.parentElement.parentElement.getAttribute("data-jsonDocument"))
    FLUIGC.modal({
      title: 'Preview Document ' + obj.count,
      content: obj.text,
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

