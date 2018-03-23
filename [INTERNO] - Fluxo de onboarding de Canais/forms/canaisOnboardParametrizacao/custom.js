

$(document).on('change', "#usuarioAdm", function () {
	if (this.value != "") {
		var filter = new Object();
		filter["login"] = this.value;
		var colleagues = retornaUsuario(filter);
		if (colleagues.length > 0) {

			$("#nmAdmUsername").val(colleagues[0].colleagueName);
			$("#nmAdmCompanyid").val(colleagues[0]["colleaguePK.companyId"]);
			$("#nmAdmUserid").val(colleagues[0]["colleaguePK.colleagueId"]);

		} else {
			$("#nmAdmUsername").val("");
			$("#nmAdmCompanyid").val("");
			$("#nmAdmUserid").val("");
			$("#usuarioAdm").empty().change()
		}
	}
});

$(document).on('change', "#usuarioResponsavelMovimentacao", function () {
	if (this.value != "") {
		var filter = new Object();
		filter["login"] = this.value;
		var colleagues = retornaUsuario(filter);
		if (colleagues.length > 0) {
			$("#nmMatriculaaberturachamado").val(colleagues[0].login);
		} else {
			FLUIGC.toast({
				message: "Usuário não encontrado",
				type: 'danger'
			});
			$("#usuarioResponsavelMovimentacao").empty().change()
		}
	}

});


function retornaUsuario(filter) {
	// var filter = new Object();
	// filter["login"] = "adm"; 
	var colleagues = DatasetFactory.getDatasetValues("colleague", filter);
	return colleagues;
}


