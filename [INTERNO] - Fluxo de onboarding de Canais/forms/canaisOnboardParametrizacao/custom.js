$( document ).ready(function() {

	configuracaoZendesk();
});

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
function carregarCombos(){

	carregarGrupoZendesk();
}
var access_token;
function configuracaoZendesk(){

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://apimanager-homolog.totvs.com/api/token",
		"method": "POST",
		"headers": {
		  "authorization": "Basic MUZ5ZDNRUUVlVGVXZ1VmdUd4Y2Q3YnI5d1k0YTowS1lSN1hKU3pjWkJ5N1hKTF9BYjlQUUNLQkVh",
		  "content-type": "application/x-www-form-urlencoded",
		},
		"data": {
		  "grant_type": "client_credentials"
		}
	  }
	  
	  $.ajax(settings).done(function (data) {
		access_token = data.access_token;
		carregarCombos();
	  });

}
function carregarGrupoZendesk(){
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://apimanager-homolog.totvs.com/api/zendesk/1.0/groups",
		"method": "GET",
		"headers": {
		  "authorization-zendesk": "Basic bGVhbmRyb0Bha3RpZW5vdy5jb20vdG9rZW46RVNNa0VNRFladnRYMEVWSzBUSTVGRXYxYkgyWm5hbnUxZ3hxY29kUw==",
		  "authorization": "Bearer " + access_token,
		}
	  }
	  $("#criacaoCorgrupo").find('option').remove();
	  $("#criacaoCorgrupo").append($('<option>', {
		value: "",
		text: "(Selecione)"
	 }));
	  $.ajax(settings).done(function (data) {
		$.each( data.groups, function( index, value ) {
			$("#criacaoCorgrupo").append($('<option>', {
				value: value.id,
				text: value.name
			}));		  
		});
		$("#criacaoCorgrupo").val($("#nmcriacaoCorgrupo").val());
	  });

	 
}
$(document).on('change', "#criacaoCorgrupo", function () {
	$("#nmcriacaoCorgrupo").val(this.value);
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


