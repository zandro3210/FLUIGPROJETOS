var RequiredField = {
	/** Habilita o estilo dos campos obrigatorios. **/
	enableStyle: function (){
		$("<style>")
		   .prop("type", "text/css")
		   .html("\
		   .required::after{ \
			content: '*'; \
			color: red; \
		}")
		.appendTo("head");
	},
	/** Inclui o * vermelho nos labels a partir do nome do campo.
	 * @param name: name do campo. Utiliza o name para ser compativel com os campos do tipo radio.
	 **/
	setField: function(name, isRequired){
		var $element = $('input[name="'+name+'"], textarea[name="'+name+'"], select[name="'+name+'"], checkbox[name="'+name+'"]');
	    var $label;
	 
	    if($element.attr('type') == "radio") $label = $($element.parent()[0]).parent().prev();
		else $label = ($element.prev().length == 0) ? $element.parent().prev() : $element.prev();
			 
		if(isRequired == false) $label.removeClass('required');
		else $label.addClass('required');
	},
	setContainer: function(containerId, isRequired){
		var that = this;
		$('#'+containerId).find('input, textarea, select').each(function(i){
			that.setField(this.name, isRequired);
		});
	}	
};