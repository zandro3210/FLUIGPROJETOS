/**
 * Grupo de funcoes genercias para widgets,
 * 
 * @param objInstance: Objeto da SuperWidget.
 */
function widgetUtils(objInstance){
	this.objInstance = objInstance;
	
	this.sendToUploadArea = function(file, isOauth, callback,instance){
    	var url =  window.location.origin +'/ecm/upload';
    	var form = new FormData();
    	form.append('fileUpload', file);
    	AjaxUtils.request(url, 'POST', form, isOauth, callback,instance);
	}
	/**
	 * Funcao generica para atribuir valor aos campos de parametros da widget.
	 * 
	 * @param elementArray: Array com o objeto JQuery dos campos;
	 * @param isFormElement: Informa se eh um campo (true) ou outro elemento html (false);
	 * @returns void.
	 *
	this.setValues = function(elementArray, isFormElement){
		var superWidget = this.objInstance;
		
		for(var i=0; i<elementArray.length; i++){
    		var elementId = elementArray[i].id;
    		var isEmpty = this.isEmpty(superWidget[elementId]);
    		var value = (isEmpty) ? '' : superWidget[elementId];
    		
    		if(isFormElement) $('#'+elementId).val(value);
    		else $('#'+elementId).text(value);
    	}
	};
	/**
	 * Funcao generica para salvar o valor dos campos de parametros da widget.
	 * 
	 * @returns void.
	 *
	this.saveParams = function(){
		var superWidget = this.objInstance;
		var args = {};
    	var result;    	
    	var fields = $(superWidget.DOM.selector).find('.param-save');
    	
    	for(var i=0; i<fields.length; i++){
    		var fieldId = fields[i].id;
    		args[fieldId] = $('#'+fieldId, superWidget.DOM).val().replace(/:/g,'.');
    		//Substitui o : por . por que a widget da erro e nao renderiza.
    	}
    	
        result = WCMSpaceAPI.PageService.UPDATEPREFERENCES({async : false}, superWidget.instanceId, args);
        
        if (result) WCMC.messageInfo(result.message);
        else WCMC.messageError('Erro ao gravar parâmetros!');
	}
	/**
	 * Funcao que verifica se a String esta vazia.
	 * 
	 * @param string: String a ser verificada;
	 * @returns boolean.
	 *
	this.isEmpty = function(string){
		return (string == undefined || string == null || string == '');
	};*/	
}