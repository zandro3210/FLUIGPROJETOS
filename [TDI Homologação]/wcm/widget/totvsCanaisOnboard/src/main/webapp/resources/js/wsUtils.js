var WsUtils = new function wsUtils(){
	this.workflowUrl = WCMAPI.getServerURL()+'/webdesk/ECMWorkflowEngineService?wsdl';
	
	this.saveAndSendTask = function(username, password, companyId, userId, processInstanceId, choosedState, fileName, callback,instance){
		userId = "<userId>"+userId+"</userId>";
		username = "<username>"+username+"</username>";
		password = "<password>"+password+"</password>";
		companyId = "<companyId>"+companyId+"</companyId>";
		processInstanceId = "<processInstanceId>"+processInstanceId+"</processInstanceId>";
		choosedState = "<choosedState>"+choosedState+"</choosedState>";
		
		description = "<description>"+fileName+"</description>";
		fileName = "<fileName>"+fileName+"</fileName>";
		//fileContent = "<filecontent></filecontent>";
		
		var bodyXml = '<ws:saveAndSendTask>'+username+password+companyId+processInstanceId+choosedState+'<colleagueIds></colleagueIds><comments></comments>'+userId+'<completeTask>true</completeTask><attachments><item><attachments>'+fileName+'<filecontent></filecontent></attachments><deleted>false</deleted>'+description+'<newAttach>true</newAttach></item></attachments><cardData></cardData><appointment></appointment><managerMode>false</managerMode><threadSequence>0</threadSequence></ws:saveAndSendTask>';
		var xml = this.getSoap(bodyXml);
		console.log(xml);
		this.request(this.workflowUrl, xml, callback,instance);
	}
	
	this.getSoap = function(body){
		var head = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.workflow.ecm.technology.totvs.com/"><soapenv:Header/><soapenv:Body>';
		var footer = '</soapenv:Body></soapenv:Envelope>';
		
		return head+body+footer;
	}
		
	this.request = function(url, xml, callback,instance){
		WCMAPI.Create({
		    url: url,
		    contentType: "text/xml",
		    dataType: "xml",
		    data: xml,
		    success: function(data){
				if(callback != null) callback(data,instance);
		    }
		});
	}
}