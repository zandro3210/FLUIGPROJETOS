$(document).ready(function(){
	

	if (CURRENT_STATE == Activity.CRIACAO_COD_CRM)
		ajustarSteps(2);
       
	if (CURRENT_STATE == Activity.PORTAL_CLIENTE)
		ajustarSteps(3);

	if (CURRENT_STATE == Activity.USUARIO_CRM_VENDAS)
		ajustarSteps(4);

	if (CURRENT_STATE == Activity.CADASTRO_FORNECEDOR)
		ajustarSteps(5);
	
	

	 	

});

function ajustarSteps(index){
	for (i = 0; (i+1) < index; i++) { 
		$("#step"+ (i+1)).removeClass();
		$("#step"+ (i+1)).addClass('previous visited');
	}
	$("#step"+index).addClass('active');
}

