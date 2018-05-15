//Variaveis utilizadas pelo ajaxUtils.
//devfluigcp-01
var TOKEN_PUBLIC = 'f232bd45-782b-468f-b2ab-b520b8091811';
var TOKEN_SECRET = '1a1b05d1-768a-4dfa-a5dc-decee8c91bd244ec5e41-839f-42d0-a680-247988d8ad37';
//10.80.129.52
//var TOKEN_PUBLIC = '958837b8-edee-471e-acf5-5f7e5e5c7ec8';
//var TOKEN_SECRET = 'c570cb5c-4c08-4c53-99d6-2bbd023f12a4e6ed057d-6f14-4a5c-9372-2d10976ff5e6';
var CONSUMER_PUBLIC = 'homofluxoonboard';
var CONSUMER_SECRET = '123';


var AjaxUtils = new function ajaxUtils(){
	/**
	 * Funcao generica para efetuar requisicao REST.
	 * 
	 * @param url: Endereco do servico REST;
	 * @param method: GET ou POST;
	 * @param dataRequest: Objeto com os dados a ser enviado no corpo da requisicao;
	 * @param isOauth: Indica se deve utilizar autenticacao Oauth ou nao;
	 * @param callback: Funcao a ser chamada ao concluir a requisicao;
	 * @returns void.
	 */
	this.request = function(url, method, dataRequest, isOauth, callback,instance){
		var ajaxData = (dataRequest == null) ? '' : JSON.stringify(dataRequest);
    	var header = this.getHeader(url, method, ajaxData);

    	$.ajax({
    	    type: method,
    	    dataType: 'json',
    	    contentType : 'application/json',
    	    enctype: 'multipart/form-data',
    	    processData: false,
            contentType: false,
            cache: false,
    	    headers : header,
    	    data : dataRequest,
    	    url: url,
    	    success: function (data, status, xhr) {
    	        callback(data,instance);
    	    },
    	    error: function(xhr, status, error) {
    	        this.ajaxError(xhr, status);
    	    }
    	});	
    }
	
	this.ajaxError = function(xhr, status){
		console.error(xhr);
		console.error(status);
		FLUIGC.toast({
			message: 'Erro ao efetuar consulta!',
			type: 'danger',
			timeout: 'slow'
		});
	}
	
	this.getHeader = function(url, method, ajaxData){
		var consumer = this.getConsumer();
    	var oauthParams = {consumer: consumer, signature_method: 'HMAC-SHA1'};
    	var oauth = OAuth(oauthParams);
    	var requestData = {url: url, method: method, ajaxData: ajaxData, data: {}};
    	var token = this.getToken();
    	var authorize = oauth.authorize(requestData, token);
    	
    	return oauth.toHeader(authorize);
	}
	
	this.getConsumer = function(){
		return {'public': CONSUMER_PUBLIC, 'secret': CONSUMER_SECRET};
	}
	
	this.getToken = function(){
		return {'public': TOKEN_PUBLIC, 'secret': TOKEN_SECRET};
	}
}