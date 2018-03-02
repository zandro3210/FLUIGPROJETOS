function displayFields(form, customHTML) {
	var CURRENT_STATE = getValue("WKNumState");

	DisplayFieldsUtils.start(form, customHTML);

	if (CURRENT_STATE == Activity.ZERO || CURRENT_STATE == Activity.INICIO) {
		form.setValue("nrAnexo", '0');

		DisplayFieldsUtils.setUserInfo("cdSolicitante", "nmSolicitante", "dsEmailSolicitante");
		DisplayFieldsUtils.setToday("dtInclusao");
	}
	
	DisplayFieldsUtils.setTemplateId();
}

var DisplayFieldsUtils = {
	objForm: null,
	start: function(form, customHtml){
		this.objForm = form;
		
		customHtml.append("<script> var CURRENT_STATE = "+getValue("WKNumState")+";</script>");
		form.setShowDisabledFields(true);
		form.setHidePrintLink(true);
	},
	/** Armazena no formulario os dados do usuario autenticado. */
	setUserInfo: function(codeField, nameField, emailField) {
		user = fluigAPI.getUserService().getCurrent();
		this.objForm.setValue(codeField, user.getCode());
		if(nameField != null) this.objForm.setValue(nameField, user.getFullName());
		if(emailField != null) this.objForm.setValue(emailField, user.getEmail());
	},
	/** Armazena no formulario a data atual. */
	setToday: function(dateField) {
		var formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
		var date = new java.util.Date();

		this.objForm.setValue(dateField, formatter.format(date));
	},
	setTemplateId: function(){
		var dataset = DatasetFactory.getDataset("dsCanaisModeloCsv", null, null, null);
		var id = dataset.getValue(0, "documentId");
		this.objForm.setValue("cdDocumentoModelo", id);
	}
}