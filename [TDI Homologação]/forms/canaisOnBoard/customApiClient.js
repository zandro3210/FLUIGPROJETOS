var CustomApiClient = {
	/** Retorna a url do documento modelo **/
	getDownloadUrl: function(onSuccess){
		var url = '/api/public/2.0/documents/getDownloadURL/'+$('#cdDocumentoModelo').val();
		this.sendRequest('GET', url, onSuccess);
	},
	/** Executa a requisicao **/
	sendRequest: function(type, url, onSuccess){
		var that = this;
		$.ajax({
    	    type: type,
    	    dataType: 'json',
    	    contentType : 'application/json',
    	    url: url,
    	    success: onSuccess,
    	    error: that.onError
    	});
	},
	/** Em caso de Erro **/
	onError: function(xhr, status, error){
		FLUIGC.toast({
			message: 'Erro ao efetuar requisição!',
			type: 'danger',
			timeout: 'slow'
		});
	}
}