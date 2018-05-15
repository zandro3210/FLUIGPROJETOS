var CanaisOnboard = SuperWidget.extend({
	mode: null,
	widgetUtils: null,
	file: null,
	formValues: null,
	myLoadingSend: FLUIGC.loading(window),
	page: 1,
	empresa : 0,
	/* Inicio da execucao do script da widget. */
	init: function() {
		this.widgetUtils = new widgetUtils(this);
		eval('this.'+this.mode+'()'); //chama view() ou edit()
	},
	/* Efetua o bind das funcoes nos elementos. */
    bindings: {
    	local: {
    		'on-send': ['click_onSend'],
    		'on-upload': ['change_onUpload'],
    		'on-download': ['click_onDownload'],
    	},
    	global: {}
    },
    /* Eh chamada quando a widget eh aberta no modo edicao. */
    edit: function(){},
    /* Eh chamada quando a widget eh aberta no modo visualizacao. */
    view: function(){
    	var params = this.getUrlParams();
    	if(params != null){
    		$('#nrSolicitacao').val(params.id);
        	$('#dsToken').val(params.tkn);
        	
    		if(params.view == "ul"){
    			$("#divDl").hide();
    			var fields = [];	    	
    	    	var constraints = [];
    	    	var loading = FLUIGC.loading('body');
    	    	
    	    	loading.show();
    	    	constraints.push(this.createConstraint("nrSolicitacao",params.id));
    	    	constraints.push(this.createConstraint("token",params.tkn));	    		    	
    	   
    	    	this.getDataset("formcanaisOnBoard",fields,constraints).done(function(result){
    	    		if(result.values.length > 0){
    	    			$("#cdSolicitante").val(result.values[0].cdSolicitante);
    	    			loading.hide();
    	    		}
    	    	});
    		}
    			
    		else
    			$("#divUl").hide();
    	}else{
    		$("#divDl").hide();
    		$("#divUl").hide();
    	}    	
    },    
    getDataset: function(datasetName, fields, constratins, order) {
        var url = window.location.origin;
        var d = $.Deferred();
        var token = retornaToken();
        var oauth = retornaOauth(); 
        var request_data = {
            url: url+'/api/public/ecm/dataset/datasets',
            method: 'POST',
            ajaxData: JSON.stringify({
                "name":datasetName,
                "fields": fields || [],
                "constraints":constratins || [],
                "order": order || []
            }),
            data: {}
        };
        
        $.ajax({
            url: request_data.url,
            async: false,
            type: request_data.method,
            data: request_data.ajaxData,
            contentType: "application/json",
            headers: oauth.toHeader(oauth.authorize(request_data, token))
        })
        .pipe(function(p){
            return p.content;
        })
        .done(function(result){
        	
            d.resolve(result);
        })
        .fail(function(data){
        	
            d.reject
        });
        return d;
    },
    createConstraint: function(field, value, type, likeSearch){
    	return {
            "_field":field,
            "_initialValue":value,
            "_finalValue":value,
            "_type": type || 1,
            "_likeSearch" : likeSearch || false
         };
    },
    onDownload: function(){
    	var that = this;
    	
    	var myLoading = FLUIGC.loading(window);    
    	myLoading.show();
    	
    	setTimeout(function(){
    		var tokenValido = false;
    		
    		var divHasChild = $("#contrato")[0].hasChildNodes();    		
    		var solic = $('#nrSolicitacao').val().trim();
    		var token = $('#dsToken').val().trim();
    		var oldSolic = $('#nrSolicitacaoOld');
    		var oldToken = $('#dsTokenOld');
    		
			oldSolic.val(solic);
			oldToken.val(token);
			var pdfName = "Contrato.pdf"
			
	    	var fields = [];	    	
	    	var constraints = [];
	    	constraints.push(that.createConstraint("token",token));	    		    	
	    	
	    	that.getDataset("formcanaisOnBoard",fields,constraints).done(function(result){
	    		
	    		if(result.values.length > 0){
	    			var dateInfo = returnDate();
	    			result.values[0].dia = dateInfo.day;
	    			result.values[0].mes = dateInfo.month;
	    			result.values[0].ano = dateInfo.year;
	    			
	    			var getSegments = function(itens){
	    				var segs = [];
	    				
	    				if(itens.cbSegAgroindustria) segs.push(itens.cbSegAgroindustria);
	    				if(itens.cbSegConstrucao) segs.push(itens.cbSegConstrucao);
	    				if(itens.cbSegDistribuicao) segs.push(itens.cbSegDistribuicao);
	    				if(itens.cbSegEducacional) segs.push(itens.cbSegEducacional);
	    				if(itens.cbSegFinancial) segs.push(itens.cbSegFinancial);
	    				if(itens.cbSegJuridico) segs.push(itens.cbSegJuridico);
	    				if(itens.cbSegLogistica) segs.push(itens.cbSegLogistica);
	    				if(itens.cbSegManufatura) segs.push(itens.cbSegManufatura);
	    				if(itens.cbSegSaude) segs.push(itens.cbSegSaude);
	    				if(itens.cbSegServicos) segs.push(itens.cbSegServicos);
	    				if(itens.cbSegVarejo) segs.push(itens.cbSegVarejo);
	    				
	    				var segsFim = [];
	    				
	    				for(var i=0;i<segs.length;i++){
	    					var x = i;
	    					segsFim[i] = {segmentos : segs[i],index: ++x};
	    				}	
	    				
	    				return segsFim;
	    			};
	    			
	    			var segmentList = getSegments(result.values[0]);
	    			
	    			var html = "";
	    			$(".page_template > .header > .h1-contract").empty();
	    			switch(result.values[0].tpContrato){
		    			case "CNT":
		    				
		    				var fields = [];	    	
		    		    	var constraints = [];
		    		    	var conditionsObj = null;
		    		    	
		    		    	constraints.push(that.createConstraint("metadata#id",result.values[0]["metadata#id"]));
		    				
		    				that.getDataset("ds_onboards_condicoes_especificas",fields,constraints).done(function(result){
		    					if(result.values.length > 0){
		    						conditionsObj = result.values;
		    						
		    						for(var i = 0;i<conditionsObj.length;i++){
		    							var x = i;
		    							conditionsObj[i].romanIndex = romanize(++x);
		    						}
		    					}
		    				});	    							    						    				
		    				
		    				var header = 'CONTRATO DE CNT - C&eacute;lula de Neg&oacute;cios TOTVS <span class="version">v2.0</span>';
		    				$(".page_template > .header > .h1-contract").append(header);
		    				
		    				pdfName = "Contrato_CNT.pdf"
		    				html = Mustache.render($(".template_contrato_cnt").html(), {itens:result.values,segmentosAtuacao:segmentList,condicoes:conditionsObj});
		    				break;
		    			case "AVT":
		    			
		    				var fields = [];	    	
		    		    	var constraints = [];
		    		    	var conditionsObj = null;
		    		    	
		    		    	constraints.push(that.createConstraint("metadata#id",result.values[0]["metadata#id"]));
		    				
		    				that.getDataset("ds_onboards_condicoes_especificas",fields,constraints).done(function(result){
		    					if(result.values.length > 0){
		    						conditionsObj = result.values;
		    						
		    						for(var i = 0;i<conditionsObj.length;i++){
		    							var x = i;
		    							conditionsObj[i].romanIndex = romanize(++x);
		    						}
		    					}
		    				});
		    				
		    				var header = 'CONTRATO DE AVT - Agente de Vendas TOTVS <span class="version">v2.0</span>'; 
		    				$(".page_template > .header > .h1-contract").append(header);
		    				pdfName = "Contrato_AVT.pdf"
		    				html = Mustache.render($(".template_contrato_avt").html(), {itens:result.values,segmentosAtuacao:segmentList,condicoes:conditionsObj});
		    				break;
		    			case "CAT":
		    				
		    				var fields = [];	    	
		    		    	var constraints = [];
		    		    	var clientObj = null; 
		    		    	var conditionsObj = null;
		    		    	
		    		    	constraints.push(that.createConstraint("metadata#id",result.values[0]["metadata#id"]));
		    				
		    				that.getDataset("ds_onboards_cat_clients",fields,constraints).done(function(result){
		    					if(result.values.length > 0){
		    						clientObj = result.values;
		    					}
		    				});
		    				
		    				that.getDataset("ds_onboards_condicoes_especificas",fields,constraints).done(function(result){
		    					if(result.values.length > 0){
		    						conditionsObj = result.values;
		    						
		    						var x = 6;
		    						for(var i = 0;i<conditionsObj.length;i++){
		    							conditionsObj[i].romanIndex = romanize(x++);
		    						}
		    					}
		    				});
		    				
		    				var header = 'CONTRATO DE CAT - C&eacute;lula de Atendimento TOTVS <span class="version">v2.0</span>'; 
		    				$(".page_template > .header > .h1-contract").append(header);
		    				pdfName = "Contrato_CAT.pdf"
		    				
		    				html = Mustache.render($(".template_contrato_cat").html(), {itens:result.values,clientes:clientObj,segmentosAtuacao:segmentList,condicoes:conditionsObj});
		    				break;
		    			case "MASTER PVF":
		    				var header = 'CONTRATO DE MASTER PVF - MASTER PONTO DE VENDAS FLY01 <span class="version">v1.0</span>'; 
		    				$(".page_template > .header > .h1-contract").append(header);
		    				pdfName = "Contrato_MasterPVF.pdf"
		    				html = Mustache.render($(".template_contrato_masterpvf_totvs").html(), {itens:result.values});
		    				break;
		    			case "PVF":
		    				var header = 'CONTRATO DE PVF - PONTO DE VENDAS FLY01 <span class="version">v1.0</span>'; 
		    				$(".page_template > .header > .h1-contract").append(header);
		    				pdfName = "Contrato_PVF.pdf"
		    				html = Mustache.render($(".template_contrato_pvf_totvs").html(), {itens:result.values});
		    				break;
		    			case "PVF COM MASTER":
		    				var header = 'CONTRATO PONTO DE VENDAS FLY01 <span class="version">v1.0</span>'; 
		    				$(".page_template > .header > .h1-contract").append(header);
		    				pdfName = "Contrato_PVF_MASTERPVF.pdf"
		    				html = Mustache.render($(".template_contrato_pvf_masterpvf_totvs").html(), {itens:result.values});
		    				break;
		    			default:
		    				break;
	    			}
	    				
	        		$("#contrato").html(html);
	    			tokenValido = true;
	    		}
	        }).fail(function(data){
	        	FLUIGC.toast({
	    			title: '',
	    			message: "Erro na consulta do token!",
	    			type: 'danger'
	    		});
	        });
    		
	    	if(tokenValido){
	    		that.buildNewsletter(myLoading,pdfName);
	    	}else{
	    		FLUIGC.toast({
	    			title: '',
	    			message: "Número da solicitação ou Token incorretos!",
	    			type: 'danger'
	    		});
	    		myLoading.hide();
	    	}
    	}, 100);
    	
    },
    buildNewsletter: function(myLoading,pdfName){
    	var that = this;
		if($('#contrato').contents().length > 0){
			// when we need to add a new page, use a jq object for a template
			// or use a long HTML string, whatever your preference
			$page = $(".page_template:first").clone().removeAttr("id").addClass("page").css("display", "block");
			
			// fun stuff, like adding page numbers to the footer
			$("body").append($page);
			that.page++;
			
			// here is the columnizer magic
			$('#contrato').columnize({
				columns: 1,
				target: ".page:last .content",
				overflow: {
					height: 950,
					id: "#contrato",
					doneFunc: function(){
						that.buildNewsletter(myLoading,pdfName);
					}
				}
			});
		}else{
			
			$('body > .page_template').find('.first').each(function(){
			    if($(this).children().length == 0)
			        $(this).closest(".page_template").remove();
			})
			
			Pdf.initialize($('body > .page_template'), $('#pdf'), null);
    		Pdf.toPdf(myLoading,pdfName);
		}
	},
	
    onUpload: function(event){
    	this.file = event.files[0];
    },
    onSend: function(){
    	var that = this;
    	if(this.file){    		  
    		that.myLoadingSend.show();
    	
    		setTimeout(function(){
    			try{
    				that.widgetUtils.sendToUploadArea(that.file, true, that.saveAndSendTask,that);
    			}catch(e){
    				FLUIGC.toast({
    	    			title: '',
    	    			message: e.message,
    	    			type: 'danger'
    	    		});
    			}
    		}, 100);
    	}else{
    		FLUIGC.toast({
    			title: '',
    			message: "Faça o upload do contrato assinado no botão 'Escolher arquivo'!",
    			type: 'danger'
    		});
    	}
    },
    saveAndSendTask: function(data,instance){
    	var that = this;
    	console.log("file:"+instance.file);
    	try{
    		//WsUtils.saveAndSendTask('erick.moraes@totvs.com.br', 'Totvs@123', WCMAPI.organizationId, "291335840",$('#nrSolicitacao').val(), 51, instance.file.name,instance.saveAndSendTaskResponse,instance);
    		WsUtils.saveAndSendTask('eder.oliveira2.totvs.com.br.10097', 'Totvs@123', WCMAPI.organizationId, $('#cdSolicitante').val(), $('#nrSolicitacao').val(), 51, instance.file.name,instance.saveAndSendTaskResponse,instance);
    	}catch(e){
			FLUIGC.toast({
    			title: '',
    			message: e.message,
    			type: 'danger'
    		});
		}
    },
    saveAndSendTaskResponse: function(data,instance){
    	var that = this;
    	instance.myLoadingSend.hide();
    	var dataXml = data.documentElement.textContent;
    	
    	if(dataXml.indexOf("WDNrDocto") > -1 && 
    			 dataXml.indexOf("iTask") > -1 &&
    			 dataXml.indexOf("cDestino") > -1 &&
    			 dataXml.indexOf("WDNrVersao") > -1){
    		FLUIGC.toast({
    			title: '',
    			message: "Documento enviado com sucesso!",
    			type: 'success'
    		});
    	}else{
    		FLUIGC.toast({
    			title: 'ERRO',
    			message: dataXml,
    			type: 'danger'
    		});
    	}
    	
    	
    },
    getUrlParams: function(){
		var url_string = window.location.href; //window.location.href
		var x = (url_string.indexOf("/p/") >= 0 ? 1:0);
		var url = new URL(url_string);
		empresa = url.pathname.split("/")[ x + 3]
    	var params = {};
    	params.view = url.pathname.split("/")[ x + 4];
		params.id = url.pathname.split("/")[ x + 5];
		params.tkn = url.pathname.split("/")[ x + 6];
    	return params;
    }
});

function returnDate(){
	var dateObj = new Date();
   
	var day = dateObj.getDate();
    
    var locale = "pt-br";
    var month = dateObj.toLocaleString(locale, { month: "long" });
	var year = dateObj.getFullYear();
    
    return {'day':day,'month':month.capitalize(),'year':year};
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function retornaToken(){
    var token = {
		  'public': TOKEN_PUBLIC,
          'secret': TOKEN_SECRET
    };
    
    return token;
}
function retornaOauth(){
    var oauth = OAuth({
        consumer: {
        	 'public': CONSUMER_PUBLIC,
             'secret': CONSUMER_SECRET
        },
        signature_method: 'HMAC-SHA1'
    });
    return oauth;
}

function romanize(num){
    if (!+num)
        return NaN;
    var digits = String(+num).split(""),
        key = ["","c","cc","ccc","CD","D","DC","DCC","DCCC","CM",
               "","x","xx","xxx","xl","l","lx","lxx","lxxx","xc",
               "","i","ii","iii","iv","v","vi","vii","viii","ix"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}