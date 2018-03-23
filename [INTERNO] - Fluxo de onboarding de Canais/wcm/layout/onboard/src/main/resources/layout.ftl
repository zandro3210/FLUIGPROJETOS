
<html>
<head>
	<title>Fluxo Onboarding</title>
		<script src="/webdesk/vcXMLRPC.js"></script>
	<script  src="http://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="/onboard/resources/js/hmac-sha1.js"></script>
<script src="/onboard/resources/js/hmac-sha256.js"></script>
<script src="/onboard/resources/js/enc-base64-min.js"></script>
<script src="/onboard/resources/js/oauth-1.0a.js"></script>




</head>

<style>
/*ESTILO WEB*/

body{
	font-family: 'Myriad Pro', arial, sans-serif;
	font-size: 14px;
	background: #e1e1e1;
	color:#2f2f2f;
}

div.container{
	width: 95%;
	margin:0 auto;
	background: #FFFFFF;
	padding: 20px;
}

table.info th{
	background: #e5e5e5;
	color:#045028;
	font-weight: bold;
}

table.info {
	width: 70%;
	margin: 30px auto 0 auto;
}

table{
	width:100%;
	padding:10px;
	margin-top:30px;
	max-width: 100%;
	border-collapse: collapse;
	border-spacing: 0;
	text-align: center;
	border:1px solid #DFDFDF;
}

table th, table td{
	padding: 5px 2px;
	font-size: 12px;
}

table th{
	text-transform: uppercase;
	background: #056633;
	color:#FFFFFF;
	border-color: #045028;
	font-weight: normal;
}

table td{
	text-transform: uppercase;
	border-color: #DFDFDF;
}

tr:nth-child(2n+1){
	background:#efefef;
}


.btn{
	border-radius:3px;
	border:0;
	text-transform: uppercase;
	font-weight: bold;
	transition:background ease 0.3s;
	cursor: pointer;
	text-decoration:none;
	background: #056633;
	color: #FFFFFF;
	font-size: 12px;
	padding: 10px 15px;
}

.btn:hover, .btn:visited, .btn:active, .btn:focus{
	background: #04a9c7;
}

hr{
	border-bottom:1px solid #DFDFDF;
	border-top:none;
}

.header{
	border-bottom:2px solid #DFDFDF;
	padding:0 0 20px 0;
}
.header img{
	max-height: 50px;
}

h1{
	font-weight: bold;
	color: #04a9c7;
	text-align:center;
	font-style: italic;
}
h2{
	text-align: center;
	margin: 0;
}

</style>

<body>
	<div class="container">

		<div class="header">
		
			<img src="http://www.fecap.br/novosite/public/img/totvs/totvs.jpg" style="float:right">
		</div>

		<form>
			<h1>Fluxo Onboarding</h1>
			<h2>Atividade Solicitada foi?</h2>
		</center>



		<table class="info">
			
		<br>
		<tr>
				<center>

					<input type="radio" name=PCAPROVA value="true" class="btn">Realizada
					<input type="radio" name=PCAPROVA value="false" class="btn">Cancelada
				
					<button type="submit" id="btnEnviar" name="Enviar" class="btn">Enviar</button>
		         </center>
		</tr>
		<br>


		

		</table>
		<br>
		
		
		</form>

	</div>




<script>

function servicePost(url,data,success){

	var domain = window.location.origin+ "/";
	var oauth = OAuth({
		consumer: {
			'key': '987654321', // Consumer Key:*
			'secret': '123' // Consumer Secret
		},
		signature_method: 'HMAC-SHA1',
		hash_function: function(base_string, key) {
			return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
		}
	});

	var request_data = {
		url:  domain + url, // Altere o endereço da API desejada
		method: 'GET',
		data: data
	};

	var token = {
		'key': 'a9b07478-ba0b-41cb-91b5-6b2cd56b6fd8', // Seu access token
		'secret': '589e3730-c6ce-4a46-baa8-eed97ce126fc0f834f9e-521d-46a3-85e7-dcc14d672eb2' // Seu token secret
	}


	$.ajax({
	url: request_data.url,
	type: request_data.method,
	data: oauth.authorize(request_data, token),
	success: success

	});
	

	//http://spon010113223:8080/api/public/ecm/dataset/search?oauth_consumer_key=987654321&oauth_token=a9b07478-ba0b-41cb-91b5-6b2cd56b6fd8&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1517599064&oauth_nonce=WPKKyJ&oauth_version=1.0&oauth_signature=+kSXhgnQ2Mw+nCkGBAJnh1aEbKw=&datasetId=form_exemple_mail
}

$( document ).ready(function() {
   

	
}); 

$( "#btnEnviar" ).click(function() {
	 debugger;
 tomandoDecisao();
});
function tomandoDecisao(){


	 var url_string = window.location.href; //window.location.href
	var url = new URL(url_string);
	var token = url.searchParams.get("token");
	var task = url.searchParams.get("task");



	var url = "api/public/ecm/dataset/search";
	var data = {
		datasetId: "dsCanaisMoveTask",
		filterFields: "token," + token + ",task," + task
			//	filterFields: "id," + proc +,"id," + documentId + ",version," + documentVersion + ",tablename,tabcliente"
	}


   var success = function(data){
	  console.log(data);
	 
    }

    var result = servicePost(url,data,success);
}
function gerarTabelaProduto(datasetPrincipal){
	var url = "api/public/ecm/dataset/search";
 	for (var i = 0; i < datasetPrincipal.content.length; i++) {
              
		var documentId = datasetPrincipal.content[i]["metadata#id"]; 
		var documentVersion = datasetPrincipal.content[i]["metadata#version"];
		
		var data = {
			datasetId: "CanaisOnBoard2",
	
		}

		var success = function(data){
		console.log(data);
	
		}

		var result = servicePost(url,data,success);
			
			
	}
             
}

  


          
    
    




function enviaRespstaRM(){
	// Chamada do WEBService 
	// URL para do mesmo
    var url = "api/public/ecm/dataset/search";
	// Parâmetros conforme a credencial do WS
	var data = {
		NomedoseuCampo: ValordoseuCampo		
	}

   var success = function(data){
	   // Função caso ocorra tudo corretamente 
	  console.log("Sucesso!")
    }

    var result = servicePost(url,data,success);
}
$( "#btnEnviar" ).click(function() {
	enviaRespstaRM();
	  
});

</script>

</body>
</html>
