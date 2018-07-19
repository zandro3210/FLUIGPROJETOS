//Funcoes genericas relacionadas ao * vermelho nos campos obrigatorios.

/**
 * Instancia o estilo dos campos obrigatorios. 
 * Chamar no $(document).ready.
 * 
 * @returns
 */
function setRequiredStyle(){
	$("<style>")
	   .prop("type", "text/css")
	   .html("\
	   .required::after{ \
		content: '*'; \
		color: red; \
	}")
	.appendTo("head");
}		

/**
 * Inclui o * vermelho no label a partir do nome do campo.
 * 
 * @param name: name do campo. Utiliza o name para ser compativel com os campos do tipo radio.
 * @returns void.
 */
function setRequired(name, isRequired){
	var $label = $('label[for="'+name+'"]');
	
	if(isRequired == true) $label.addClass('required');
	else $label.removeClass('required');
}