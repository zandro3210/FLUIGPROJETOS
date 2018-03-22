function beforeStateEntry(sequenceId){
	log.info("@SubAbeturadeChamados  beforeStateEntry sequenceId: "+sequenceId);
	if(sequenceId == Activity.EMAIL_CORPORATIVO )
	{
		var subject = "Solicitação de Abertura E-Mail Corporativo";
		var template = "abertura_de_chamados";
		var params = [];

		var mensagem = "";
		if (hAPI.getCardValue("tipoSolic") == "master" )
			mensagem += "Víncular a nuvem de relacionamento FlyPartners"
		else
			mensagem += "Necessário acesso aos portais (Portal do Cliente, fluig TOTVS e Academia Virtual)"

		mensagem +="<br/><br/><br/><table>";
			mensagem +="<tr>";
				mensagem +="<th>Campos<th/>";
				mensagem +="<th>Valores<th/>";
			mensagem +="</tr>";
			mensagem +="<tr>";
				mensagem +="<td>Razão Social</td>";
				mensagem +="<td>" +  hAPI.getCardValue("razaoSocial") +"</td>";
			mensagem +="</tr>";
			mensagem +="<tr>";
				mensagem +="<td>CNPJ</td>";
				mensagem +="<td>" +  hAPI.getCardValue("nrCnpj") +"</td>";
			mensagem +="</tr>";
			mensagem +="<tr>";
				mensagem +="<td>Sugestão de E-mail</td>";
				mensagem +="<td>" +  hAPI.getCardValue("sugestaoEmail") +"</td>";
			mensagem +="</tr>";
		mensagem +="</table>";
		
		var url = "<a style='color:red;' href='" + SERVER + "portal/p/7143/FluxoOnBoard?token=" + hAPI.getCardValue("token") + "&task="+  Activity.EMAIL_CORPORATIVO + "'>Por favor após terminar atividade clique aqui </a><br />";		
		params.push({name:"TITULO",value: "E-mail Corporativo - Fluxo onBoard"});
		params.push({name:"MENSAGEM",value: mensagem});
	    params.push({name:"URL",value: url  });

		var receivers = [];
		receivers.push("meninodexte16@msn.com");
		log.info("@SubAbeturadeChamados  beforeStateEntry onNotify() ");
		onNotify(subject, receivers, template, params,  "text/html" );
	} 
	
}






