function onNotify(subject, receivers, template, params){
	

    log.info("@SubAberturadeChamados onNotify start");

        try{
            //Monta mapa com parâmetros do template
            var parametros = new java.util.HashMap();
            for (i in params) { 
                log.info("@SubAberturadeChamados params[i].name: '" + params[i].name + "' params[i].value: '" + params[i].value+ "'");
                parametros.put(params[i].name,  params[i].value);
            }
            
 
         
            //Este parâmetro é obrigatório e representa o assunto do e-mail
            parametros.put("subject", subject);
            log.info("@SubAberturadeChamados subject: '" + subject + "'");
            //Monta lista de destinatários
            var destinatarios = new java.util.ArrayList();

            
            for (i in receivers) { 
                log.info("@SubAberturadeChamados receivers[i]: '" + receivers[i] + "'");
                destinatarios.add(receivers[i]);
            }
          
            log.info("@SubAberturadeChamados template: '" + template + "'");
            //Envia e-mail
            notifier.notify("zandro3210", template, parametros, destinatarios, "text/html");
         
        } catch(e){
            log.error("@SubAberturadeChamados erro:" + e);
        }
    
	
}