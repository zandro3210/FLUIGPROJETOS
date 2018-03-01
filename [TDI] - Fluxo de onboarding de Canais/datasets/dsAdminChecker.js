function defineStructure() {
	addColumn("tiuserrole");
	addColumn("tiusercolleague");
	addColumn("tiusername");
}

function onSync(lastSyncDate) {
    var dataset = DatasetBuilder.newDataset();

    dataset.addColumn("role");
    dataset.addColumn("colleague");
    dataset.addColumn("name");

    var roleId = "admin";
    var sender = com.fluig.foundation.mail.EMailSenderFactory.getEMailSender();
    var messageBody = "";
    var usersReceivemail = ["denis.santana@totvs.com.br", "debora.oliveira@totvs.com.br", 
                           "paulo.rsouza@totvs.com.br", "andre.felipe@totvs.com.br", 
                           "rafael.mendes@totvs.com.br", "felipe.valcanaia@totvs.com.br"];
    
    var userswithpermission = new java.util.ArrayList("");
    var usersDenied = new java.util.ArrayList("");
    
    // Usuários com permissão para administração
    userswithpermission.add("denis.santana@totvs.com.br");
    userswithpermission.add("ecm@byyou.com.br");
    userswithpermission.add("gamefication_esb_api");
    userswithpermission.add("paulo.rsouza@totvs.com.br");
    userswithpermission.add("rodrigo.sombrio@totvs.com.br");
    userswithpermission.add("andre.felipe@totvs.com.br");
    userswithpermission.add("denis.santana@totvs.com.br");
    userswithpermission.add("eduardo.gabriel@totvs.com.br");
    userswithpermission.add("felipe.valcanaia@totvs.com.br");
    userswithpermission.add("debora.oliveira@totvs.com.br");
    userswithpermission.add("jv.tdi.portais@totvs.com.br");
    userswithpermission.add("ti.protheustofluig@totvs.com.br");
    userswithpermission.add("rafael.mendes@totvs.com.br");
    userswithpermission.add("cristina.poffo@totvs.com.br");
    userswithpermission.add("deploy@totvs.com.br");
    
    var companyRoleFilter = DatasetFactory.createConstraint("workflowColleagueRolePK.companyId"
            , getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
    var roleFilter = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId"
            , "admin", "admin", ConstraintType.MUST);
    var constraintsRole = new Array(companyRoleFilter, roleFilter);
    var colleaguesByRole = DatasetFactory.getDataset("workflowColleagueRole", [], constraintsRole, []);

    for (var i = 0; i < colleaguesByRole.rowsCount; i++) {
        var companyUserFilter = DatasetFactory.createConstraint("colleaguePK.companyId"
                , getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
        var userFilter = DatasetFactory.createConstraint("colleaguePK.colleagueId"
                , colleaguesByRole.getValue(i, "workflowColleagueRolePK.colleagueId")
                , colleaguesByRole.getValue(i, "workflowColleagueRolePK.colleagueId"), ConstraintType.MUST);
        var constraintsUser = new Array(companyUserFilter, userFilter);
        
        var colleagues = DatasetFactory.getDataset("colleague", [], constraintsUser, []);
        
        // totvsnull soh existe em ambiente de teste
        if (colleagues.getValue(0, "mail") == "totvsnull@totvs.com.br")
        	continue;
        	
        if (!userswithpermission.contains(colleagues.getValue(0, "mail"))){
            usersDenied.add(colleagues.getValue(0, "mail"));
            
            dataset.addRow(new Array(
                    colleaguesByRole.getValue(i,"workflowColleagueRolePK.roleId"),
                    colleaguesByRole.getValue(i, "workflowColleagueRolePK.colleagueId"), 
                    colleagues.getValue(0, "mail")));
        }
    }
    
    if (usersDenied.size() > 0) {
        
        messageBody += "<html>";
        messageBody += "<head>";
        messageBody += "<meta charset='utf-8'>";
        messageBody += "</head>";
        messageBody += "<body>";
        messageBody += "<style>";
        messageBody += "table>thead>tr>th{font:bold;}";
        messageBody += "table>tbody>tr>td{margin:6px;}";
        messageBody += "</style>";
        messageBody += "Olá, <br/><br/>";
        messageBody += "O(s) usuário(s) abaixo está com papel <b>Admin</b> e não tem permissão para ser <b>Administrador</b> no fluig.totvs.com.<br/><br/>";
        messageBody += "<table>";
        messageBody += "<thead>";
        messageBody += "<tr>";
        messageBody += "<th>E-mail</th>";
        messageBody += "</tr>";
        messageBody += "<thead>";
        messageBody += "<tbody>";
        
        for (var p = 0; p < usersDenied.size(); p++) {
            messageBody += "<tr>";
            messageBody += "<td>"+usersDenied.get(p).toString()+"</td>";
            messageBody += "</tr>";
        };
        
        messageBody += "</tbody>";
        messageBody += "</table>";
        messageBody += "</body>";
        messageBody += "</html>";
        
        try {
            sender.simpleEmail(getValue("WKCompany"), 'Usuário sem permissão com papel Admin', "noreply@fluig.com", usersReceivemail, messageBody, "text/html");
            } catch(e) {
            log.error(e);
        }
    }

    return dataset;

}