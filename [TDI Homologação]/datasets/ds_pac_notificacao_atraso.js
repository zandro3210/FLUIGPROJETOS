function defineStructure() {
	addColumn("processId", DatasetFieldType.STRING);
	addColumn("userCode", DatasetFieldType.STRING);
	addColumn("userMail", DatasetFieldType.STRING);
	addColumn("dueDate", DatasetFieldType.STRING);
	addColumn("status", DatasetFieldType.STRING);
	addColumn("daysToExpire", DatasetFieldType.NUMBER);
	
	setKey([ "processId" ]);
	
	addIndex([ "processId" ]);
}
function onSync(lastSyncDate) {
	var newDataset = DatasetBuilder.newDataset();
	var dataset = createDataset();
	
	for(var i = 0; i < dataset.rowsCount; i++){
		newDataset.addOrUpdateRow([
			dataset.getValue(i, "processId"),
			dataset.getValue(i, "userCode"),
			dataset.getValue(i, "userMail"),
			dataset.getValue(i, "dueDate"),
			dataset.getValue(i, "status"),
			String(dataset.getValue(i, "daysToExpire"))
		]);
	}
	
	return newDataset;
}
function createDataset(fields, constraints, sortFields) {
	log.info("PAC - Executando notificação de tarefas atrasadas");
	
	var buildDate = function(value){
		var date = java.util.Calendar.getInstance();
		if(value){
			var day = value.substring(0,2);
			if(day.startsWith("0")){
				day = day.substring(1,2);
			}
			day = parseInt(day);
			var month = value.substring(3,5);
			if(month.startsWith("0")){
				month = month.substring(1,2);
			}
			month = parseInt(month)-1;
			var year = value.substring(6,10);
			year = parseInt(year);
			date.set(java.util.Calendar.DATE,day);
			date.set(java.util.Calendar.MONTH,month);
			date.set(java.util.Calendar.YEAR,year);
		}
		date.set(java.util.Calendar.HOUR_OF_DAY,0);
		date.set(java.util.Calendar.MINUTE,0);
		date.set(java.util.Calendar.SECOND,0);
		date.set(java.util.Calendar.MILLISECOND,0);
		return date;
	};
	
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("processId");
	dataset.addColumn("userCode");
	dataset.addColumn("userMail");
	dataset.addColumn("dueDate");
	dataset.addColumn("status");
	dataset.addColumn("daysToExpire"); // 0 quando expirada
	
	var fields = null;
	var constraints = [];
	var order = [ "responsavel_id" ];
	
	constraints.push(DatasetFactory.createConstraint("metadata#active",true,true,ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint("status","andamento","andamento",ConstraintType.SHOULD));
	constraints.push(DatasetFactory.createConstraint("status","atrasada","atrasada",ConstraintType.SHOULD));
	
	var dsAcoes = DatasetFactory.getDataset("ds_pac_execucao", fields, constraints, order);
	
	if(dsAcoes != null && dsAcoes.rowsCount > 0){
		var messages = {};
		var today = buildDate();
		var tolerance = buildDate();
		tolerance.add(java.util.Calendar.DATE,15);
		
		log.info("PAC - today=" + today);
		
		for(var i = 0; i < dsAcoes.rowsCount; i++){
			var acao = {
					"processId": dsAcoes.getValue(i, "num_process"),
					"unidade": dsAcoes.getValue(i, "nm_unidade"),
					"segmento": dsAcoes.getValue(i, "nm_segmento"),
					"oferta": dsAcoes.getValue(i, "oferta"),
					"foco": dsAcoes.getValue(i, "foco"),
					"descricao": dsAcoes.getValue(i, "descricao"),
					"emailResponsavel": dsAcoes.getValue(i, "responsavel"),
					"idResponsavel": dsAcoes.getValue(i, "responsavel_id"),
					"nomeResponsavel": dsAcoes.getValue(i, "responsavel_nome"),
					"detalhe": dsAcoes.getValue(i, "detalhe"),
					"indPerformance": dsAcoes.getValue(i, "ind_performance"),
					"prazo": dsAcoes.getValue(i, "prazoAprovado"),
					"resultado": dsAcoes.getValue(i, "resultado"),
					"status": dsAcoes.getValue(i, "status"),
					"observacoes": dsAcoes.getValue(i, "observacoes")
			};
			
			var prazo = buildDate(acao.prazo);
			
			if(prazo.compareTo(tolerance) <= 0){
				var daysToExpire = 0;
				if(prazo.compareTo(today) > 0){
					daysToExpire = (prazo.getTimeInMillis() - today.getTimeInMillis())/(1000*60*60*24); 
				}
				
				acao.status = daysToExpire > 0 ? "Em Andamento" : "Atrasada";
				
				if(messages[acao.idResponsavel]){
					messages[acao.idResponsavel].push(acao);
				} else{
					messages[acao.idResponsavel] = [ acao ];
				}
				
				dataset.addRow([
				        acao.processId,
				        acao.idResponsavel,
				        acao.emailResponsavel,
				        acao.prazo,
				        acao.status,
				        daysToExpire
				]);
			}
		}
		
		var sender = com.fluig.foundation.mail.EMailSenderFactory.getEMailSender();
		var companyId = getValue("WKCompany");
		
		for(var dest in messages){
			var acoes = messages[dest];
			acoes.sort(function(i1, i2) {
				return buildDate(i1.prazo).compareTo(buildDate(i2.prazo));
			});
			
			var nome = acoes[0].nomeResponsavel;
			var email = acoes[0].emailResponsavel;
			
			log.info("PAC - Enviando e-mail para " + email);
			
			var messageBody = "<html>";
			messageBody += "<head>";
			messageBody += "<meta charset='utf-8'>";
			messageBody += "</head>";
			messageBody += "<body>";
			messageBody += "<style>";
			messageBody += "table>thead>tr>th{font:bold;}";
			messageBody += "table>tbody>tr>td{margin:6px;}";
			messageBody += "</style>";
			messageBody += "Olá, " + nome + "<br/><br/>";
			messageBody += "As seguintes ações sob sua responsabilidade encontram-se atrasadas ou próximas de atrasar. Favor verificar.<br/><br/>";
			messageBody += "<table>";
			messageBody += "<thead>";
			messageBody += "<tr>";
			messageBody += "<th>Ação</th>";
			messageBody += "<th>Prazo</th>";
			messageBody += "<th>Status</th>";
			messageBody += "</tr>";
			messageBody += "<thead>";
			messageBody += "<tbody>";
			acoes.forEach(function(item){
				messageBody += "<tr>";
				messageBody += "<td>"+item.descricao+"</td>";
				messageBody += "<td>"+item.prazo+"</td>";
				messageBody += "<td>"+item.status+"</td>";
				messageBody += "</tr>";
			});
			messageBody += "</tbody>";
			messageBody += "</table>";
			messageBody += "</body>";
			messageBody += "</html>";
			try{
				sender.simpleEmail(companyId, 'PAC - Tarefas em atraso', "noreply@fluig.com", [email], messageBody, "text/html");
			}catch(e){
				log.error(e);
			}
		}
	}
	
	log.info("PAC - Notificacao de tarefas atrasadas finalizada");
	return dataset;
}function onMobileSync(user) {

}