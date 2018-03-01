$(document).ready(function(){
	
	CustomForm.binding();
	CustomForm.setLinkHref();
	CustomForm.setMandatoryFields();
	CustomForm.setTpContrato();
	
	$('#planilhaClientes').bind('change', handleFileSelect);
	  
	$("#addConditions").on("click", function(){
		var index = wdkAddChild("tblConditions");		
	});
	
	if(CURRENT_STATE == Activity.ZERO || CURRENT_STATE == Activity.INICIO) CustomForm.setServerUrl();
	else CustomForm.disableChild('panelQuadroSocietario');
	
	if(CURRENT_STATE != Activity.INFORMAR_CODIGO_UNIDADE && CURRENT_STATE != Activity.AGUARDAR_ENCERRAMENTO_CHAMADOS) $('#panelCriaoUnidadeCrm').toggle();
	
	if(CURRENT_STATE == Activity.INCLUIR_CLAUSULAS){
		$('#panelInfoCondi').show();
		if($('#tpContrato').val() == "CAT"){ 
			$('#divContratoCAT').show();
			$('#divTotaisClientes').show();
		}else if($('#tpContrato').val() == "CNT CHEF"){
			$('#divContratoCAT').show();
		}
		scrollToElement($('#panelInfoCondi'));
	}
	if($('#tpContrato').val() == '') changeView();
	changeView2();
});



$( "#nrCnpj" ).change(function() {
	debugger; 


	var param = {};
	param.url = 'https://www.receitaws.com.br/v1/cnpj/' + 53113791000122;
	param.method = 'GET';
	param.success =  function(data){
	  console.log(data);
	};
	param.dataType = 'jsonp';
   
	serviceRest(param);	
	
	
   
});



function changeView2(){
	var tpSolic = $("input[name$='tipoSolic']:checked").val();
	
	if(tpSolic == "franquia"){	
		$(".masterpvf").hide();
		$(".cc").show();		
	}else if(tpSolic == "master"){
		
		$(".masterpvf").show();
		$(".cc").hide();
		
	}
}

function changeView(){
	var tpSolic = $("input[name='tipoSolic']:checked").val();
	
	if(tpSolic == "franquia"){	
		$('#tpContrato').children('option[value="CNT"]').show();
		$('#tpContrato').children('option[value="AVT"]').show();
		$('#tpContrato').children('option[value="ANT"]').show();
		$('#tpContrato').children('option[value="CAT"]').show();
		$('#tpContrato').children('option[value="CNT FLUIG"]').show();
		$('#tpContrato').children('option[value="CNT CHEF"]').show();
		$('#tpContrato').children('option[value="MASTER PVF"]').hide();
		$('#tpContrato').children('option[value="PVF"]').hide();
		$('#tpContrato').children('option[value="PVF COM MASTER"]').hide();
		
		$(".masterpvf").hide();
		$(".cc").show();
		$("#slVinculoMaster").val("");
		$("label[for='segmentoAtuacao']").html("Segmento de Atua&ccedil;&atilde;o");	
	}else if(tpSolic == "master"){
		$('#tpContrato').children('option[value="CNT"]').hide();
		$('#tpContrato').children('option[value="AVT"]').hide();
		$('#tpContrato').children('option[value="ANT"]').hide();
		$('#tpContrato').children('option[value="CAT"]').hide();
		$('#tpContrato').children('option[value="CNT FLUIG"]').hide();
		$('#tpContrato').children('option[value="CNT CHEF"]').hide();
		$('#tpContrato').children('option[value="MASTER PVF"]').show();
		$('#tpContrato').children('option[value="PVF"]').show();
		$('#tpContrato').children('option[value="PVF COM MASTER"]').show();
		
		$(".masterpvf").show();
		$(".cc").hide();
		clearField('tpUnidade');
		$("label[for='segmentoAtuacao']").html("Ofertas de Atua&ccedil;&atilde;o");
		
	}
	
	$("#tpContrato").val("");
	clearContainer("divSegmentoAtuacao");
	clearContainer("divChecklistDocumentos");
	clearContainer("divDadosUnidade");
	$("#dsUnidadeResponsavel").val();
}

function clearField(name){
	var $element = $('input[name="'+name+'"], textarea[name="'+name+'"], select[name="'+name+'"], checkbox[name="'+name+'"], radio[name="'+name+'"]');
	
 
    if($element.attr('type') == "checkbox" || $element.attr('type') == "radio") 
		$element.prop("checked",false)
	else 
		$element.val("");
}

function clearContainer(containerId){
	$('#'+containerId).find('input, textarea, select').each(function(i){
		clearField(this.name);
	});
}	

function scrollToElement(el){
	var posicao = $(el).offset().top;
	$('body').scrollTo(posicao);
}

function scrollToElementDelay(el){
	 setTimeout(function(){
		 var posicao = $(el).offset().top;
		 console.log("posicao: "+posicao);
		 $('body').scrollTo(posicao);
	 }, 100);
	
}

$.fn.scrollTo = function( target, options, callback ){
  if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
  var settings = $.extend({
    scrollTarget  : target,
    offsetTop     : 50,
    duration      : 500,
    easing        : 'swing'
  }, options);
  return this.each(function(){
    var scrollPane = $(this);
    var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
    var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
    scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
      if (typeof callback == 'function') { callback.call(this); }
    });
  });
};

function replaceAll(string, token, newtoken) {
	while (string.indexOf(token) != -1) {
 		string = string.replace(token, newtoken);
	}
	return string;
}

function clearClientTable(table) {
	var tableBody = document.getElementById(table);
	var trashButtons = tableBody.getElementsByTagName("tr");  
	for (var i = trashButtons.length; i > 1; i--) {
		fnWdkRemoveChild(trashButtons[i]);
	}  
}

function formataValor(valor){
	var result = accounting.formatMoney(valor, "", 2, ".", ","); 
	return result;
}	

function handleFileSelect(evt) {
	
	clearClientTable("tblClientes");
	
    var files = evt.target.files; 

    var file = files[0];
    
    var reader = new FileReader();
    reader.readAsText(file);
    
    reader.onload = function(event){
	    var csv = event.target.result;
	    var data = $.csv.toArrays(csv,{separator:";"});
	    var totalReceita = 0;
	    var mediaNps = 0;
	    
	    for(var row in data) {
	    	if(row > 0){
				  var codigo = data[row][0];
				  var nome = data[row][1];
				  var cnpj = data[row][2];
				  var receitaAnual = data[row][3];
				  var nps = data[row][4];		
				  
				  var index = wdkAddChild("tblClientes");
				  $("#tblCodCliente___"+index).val(codigo);
				  $("#tblNomeCliente___"+index).val(nome);
				  $("#tblCnpjCliente___"+index).val(cnpj);
				  $("#tblReceitaAnualCliente___"+index).val(receitaAnual);
				  $("#tblNpsCliente___"+index).val(nps);
				  
				  totalReceita += parseFloat(replaceAll(receitaAnual, ".", "").replace(",","."));
				  mediaNps = (nps != "" && nps != null && nps != "undefined") ? mediaNps+parseInt(nps) : mediaNps;
	      	}
	    }
    	    	    
	    reader.onerror = function(){ 
	    	alert('Unable to read ' + file.fileName);
	    };
	    
	    $("#vlTotalReceitaAnual").val(formataValor(totalReceita));
		$("#pctMediaNps").val( (mediaNps/(data.length-1)).toFixed("2"));
	};		
	
	$('#planilhaClientes').val("");
}

function removeFilterValue(filter){
	window[filter].removeAll();
}

function request(blob){
	var form = new FormData();
	form.append('fileUpload', blob, blob.name);
	
	$.ajax({
	    type: 'POST',
	    dataType: 'json',
	    contentType : 'application/json',
	    enctype: 'multipart/form-data',
	    processData: false,
        contentType: false,
        cache: false,
	    data : form,
	    url: '/ecm/upload',
	    success: function (data, status, xhr) {
	        console.log(data);
	    },
	    error: function(xhr, status, error) {
	    	console.error(status);
	    	console.error(xhr);
	    	console.error(error);
	    }
	});	
}

function createConstraint(field, value, type, likeSearch) {
	return {
		"_field" : field,
		"_initialValue" : value,
		"_finalValue" : value,
		"_type" : type || 1,
		"_likeSearch" : likeSearch || false
	};
}

function getDatasetAsync(datasetName, fields, constratins, order) {
	return $.ajax({
		url : '/api/public/ecm/dataset/datasets',
		async : true,
		type : 'POST',
		data : JSON.stringify({
			"name" : datasetName,
			"fields" : fields || [],
			"constraints" : constratins || [],
			"order" : order || []
		}),
		contentType : "application/json",
		success : function(data) {
			return data;
		},
		error : function(data) {
			console.log(JSON.stringify(data));
			return data;
		}
	});
}

var CustomForm = {
	/**	Adiciona funcionalidades customizadas nos eventos dos elementos **/
	binding: function(){
		PersonPlugin.enable();		
		this.enableCalendar();
		$('#cdUnidadeResponsavel').on('blur', this.getUnitData);
		$('#cdUnidadeResponsavel').on('change', this.getUnitData);
		$('input[name="tpUnidade"]').on('click', this.setChannelType);
		$('#tpContrato').on('change', this.setRequiredPanel);
		$("input[name='tipoSolic']").on('change', this.setRequiredPanel);
		$("input[name='tipoSolic']").on('change', this.setRequiredUnit);
		$('#slVinculoMaster').on('change', this.setRequiredUnit);
		$('#slVinculoMaster').on('change', this.setTpContrato);
		$('#uf').on('change', this.setCityFilter);
		$('.upper').on('keyup', this.upperValue);
	},
	upperValue: function(){
		this.value = this.value.toUpperCase();
	},
	setTpContrato: function(){	
		if($('#slVinculoMaster').val() == "sim"){
			$('#tpContrato').children('option[value="MASTER PVF"]').hide();
			$('#tpContrato').children('option[value="PVF"]').hide();
			$('#tpContrato').children('option[value="PVF COM MASTER"]').show();
		}else{
			$('#tpContrato').children('option[value="MASTER PVF"]').show();
			$('#tpContrato').children('option[value="PVF"]').show();
			$('#tpContrato').children('option[value="PVF COM MASTER"]').hide();
		}
	},
	getUnitData: function(){
		var codUnit = $('#cdUnidadeResponsavel').val();
		
		var constraints = [];
		constraints.push(createConstraint("codUnidade", codUnit));

		getDatasetAsync("dsCanaisDadosUnidade", null, constraints, null).success(function(data) {
			var dataset = data.content;
			if(dataset.values.length > 0){
				$("#dsUnidadeResponsavel").val(dataset.values[0]["RazaoSocial"]);
				$("#unidadeEndereco").val(dataset.values[0]["Endereco"]);
				$("#unidadeMunicipio").val(dataset.values[0]["Municipio"]);
				$("#unidadeEstado").val(dataset.values[0]["Estado"]);
				$("#unidadeCep").val(dataset.values[0]["CEP"]);
				$("#unidadeCnpj").val(dataset.values[0]["CNPJ"]);		
				
				var fields = ["ZD8_CIDADE"];
				var constraints = [];
				constraints.push(createConstraint("ZD8_FRQTER", codUnit));
				
				getDatasetAsync("cadastroMunicipios", fields, constraints, null).success(function(data) {
					var dataset = data.content;
					var territorios = [];
					for(var i=0;i<dataset.values.length;i++){
						territorios.push(dataset.values[i]["ZD8_CIDADE"]);
					}
					$("#territorio").val(territorios.join());
				});
			}else{
				FLUIGC.toast({
					message: "Nenhuma unidade encontrada com este código!",
					type: 'warning',
					timeout: 'slow'
				});
				clearContainer("divDadosUnidade");
				$("#dsUnidadeResponsavel").val("");
				$("#territorio").val("");
				$("#codPlanilha").val("");
				$("#codItem").val("");
				$("#codTerritorio").val("");
				$("#codMunicipio").val("");
			}
		});
		
	},	
	/** Armazena no formulario a url do servidor. **/
	setServerUrl: function(){
		$("#dsUrlServidor").val(parent.WCMAPI.getServerURL());
	},	
	/** Altera o valor do campo pvfMasterCat **/
	setChannelType: function(){
		var input = this;
		var value = (input.id == 'tpUnidadePropria') ? 'sim' : 'não';
		$('#pvfMasterCat').val(value);
	},
	/** Altera o endereco do link de documento modelo **/
	setLinkHref: function(data){
		CustomApiClient.getDownloadUrl(function(data){
			$('#linkTemplate').attr('href', data.content);
		});		
	},
	/** Inclui o calendario (datepicker) em todos os campos com botao de calendario. **/
	enableCalendar: function(){
	    var calendars = []; 
	    //Habilita o datepicker em si
	    $('.fluigicon-calendar').each(function(){
	        var inputId = '#'+$(this).parent().prev().attr('id');
	        calendars[inputId] = FLUIGC.calendar(inputId);
	    });
	     
	    //Inclui o evento onClick nos botoes
	    $('.fluigicon-calendar').parent().on('click',function(){
	        var inputId = '#'+$(this).prev().attr('id');
	        calendars[inputId].show();
	    });
	},
	/** Marca ou desmarca como obrigatorio os campos do painel Dados Bancarios. **/
	setRequiredPanel: function(){
		var input = this;
		var isRequired = (input.value == 'CNT' || input.value == 'AVT' || input.value == 'ANT'); 
			
		RequiredField.setContainer('panelDadosBancarios', isRequired);
	},
	setRequiredUnit: function(){
		if($("input[name='tipoSolic']:checked").val() == "franquia" ||
		  ($("input[name='tipoSolic']:checked").val() == "master") && $("#slVinculoMaster").val() == "sim"){
			RequiredField.setField('cdUnidadeResponsavel');
			RequiredField.setField('dsUnidadeResponsavel');
		}else{
			RequiredField.setField('cdUnidadeResponsavel',false);
			RequiredField.setField('dsUnidadeResponsavel',false);
		}
	},
	setMandatoryFields: function(){
		RequiredField.enableStyle();
		
		if(CURRENT_STATE == Activity.ZERO || CURRENT_STATE == Activity.INICIO){
			
			this.setRequiredUnit();
			
			RequiredField.setField('slVinculoMaster');
			RequiredField.setField('tpUnidade');
			RequiredField.setField('tpContrato');
			RequiredField.setField('segmentoAtuacao',null,true);
			
			RequiredField.setContainer('panelDadosdaEmpresa');
			RequiredField.setField('website', false);						
			RequiredField.setField('nmCnae', false);
			
			RequiredField.setContainer('panelDadosdoContrato2');
			RequiredField.setContainer('panelDadosBancarios');
			
			//$('table b').addClass('required');
		}
	},
	disableChild: function(containerId){
		$('#'+containerId).find('input[name*="___"]').attr('readonly',true);
		$('#'+containerId).find('.fluigicon-trash').hide();
		$('#'+containerId).find('.btn').closest('tr').hide();
	},
	setCityFilter: function(){
		var input = this;
		var filterValues = 'ZD8_EST,'+input.value; 
		reloadZoomFilterValues('nmMunicipio', filterValues);
	}
};