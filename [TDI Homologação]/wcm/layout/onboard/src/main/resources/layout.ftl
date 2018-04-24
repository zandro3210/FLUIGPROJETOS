<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
    <meta name="theme-color" content="#2196F3">
    <title>Fluig - Fluxo On Boarding</title>
    <script src="/webdesk/vcXMLRPC.js"></script>
    <script src="http://code.jquery.com/jquery-3.3.1.min.js"></script>

    <script src="/onboard/resources/js/hmac-sha1.js"></script>
    <script src="/onboard/resources/js/hmac-sha256.js"></script>
    <script src="/onboard/resources/js/enc-base64-min.js"></script>
    <script src="/onboard/resources/js/oauth-1.0a.js"></script>

    <!-- CSS  -->
    <link href="/onboard/resources/css/plugin-min.css" type="text/css" rel="stylesheet">
    <link href="/onboard/resources/css/custom-min.css" type="text/css" rel="stylesheet">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>
    
 <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" type="text/css" rel="stylesheet">
 <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>


</head>
<style>
.toast {
      font-size: 12px; !important;
        line-height: normal !important;
}
</style>
<body id="top" class="scrollspy">


    <!--Navigation-->
    <div class="navbar-fixed">
        <nav id="nav_f" class="default_color" role="navigation">
            <div class="container">
                <div class="nav-wrapper">
                    <a href="#" id="logo-container" class="brand-logo">Tomada de decisão</a>
                    <ul class="right hide-on-med-and-down">
                        <img width="65px" src="https://www.fluig.com/blog/wp-content/uploads/2014/12/fluig-LOGO-RGB-06.png">
                    </ul>
                    <ul id="nav-mobile" class="side-nav">

                    </ul>
                    <a href="#" data-activates="nav-mobile" class="button-collapse">
                        <i class="mdi-navigation-menu"></i>
                    </a>

                </div>
            </div>
        </nav>
    </div>



    <!--Intro and service-->
    <div id="intro" class="section scrollspy">
        <div class="container">
            <div class="row">
                <div class="col s12">
                    <h2 class="center header text_h2"> Fluxo On Boarding -
                        <span class="span_h2">fluig </span>
                    </h2>
                </div>
                <div class="container">

                    <div class="row">
                        <div class="col s12 m12">
                            <div class="card card-avatar">

                                <div class="card-content">
                                    <span id="titulo" class="card-title activator grey-text text-darken-4">Atividade "Criação de E-Mail Corporativo" foi executada com sucesso?</span>
                                        <br>
                                        <form class="col s12">
                                            <div class="row">
                                                <div id="div_criacaoCor" class="input-field col s6 hide">
                                                    <input class="mdl-textfield__input" type="text" id="cdUnidadeVenda">
                                                    <label class="mdl-textfield__label" for="cdUnidadeVenda">Codigo de Unidade de Venda</label>
                                                </div>
                                                <div class="input-field col s6">

                                                    <div class="switch">
                                                        <label>
                                                            Não
                                                            <input id="ckDecisao" type="checkbox">
                                                            <span class="lever"></span>
                                                            Sim
                                                        </label>
                                                    </div>


                                                </div>
                                                <div class="col offset-s7 s5">
                                                    <!-- Modal Trigger -->
                                                    <button  type="button" id="btnEnviar" disabled="disabled" class="btn waves-effect waves-light btn ">Enviar</button>

                                                </div>
                                            </div>

                                        </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>




    <!--Footer-->
    <footer id="contact" class="page-footer default_color scrollspy">
        <div class="container">
            <div class="row">
                <div class="col l6 s12">

                </div>
                <div class="col l3 s12">

                </div>
                <div class="col l3 s12">

                </div>
            </div>
        </div>
        <div class="footer-copyright default_color">
            <div class="container">
                Página exclusiva para o uso do processo fluxo on Boarding</a>
            </div>
        </div>
         
    </div>
    </footer>


    <!--  Scripts-->
    <script src="/onboard/resources/js/plugin-min.js"></script>
    <script src="/onboard/resources/js/custom-min.js"></script>

    <script>
        var url_string = window.location.href; //window.location.href
        var url = new URL(url_string);
        var token = url.searchParams.get("token");
        var task = url.searchParams.get("task");
        var thread = url.searchParams.get("thread");
         var current = url.searchParams.get("current");
        $( document ).ready(function() {
           configuracao();
        });
var Activity = {
	ZERO: 4,
	EMAIL_CORPORATIVO: 9,
	CRIACAO_COD_CRM: 11,
	PORTAL_CLIENTE: 13,
	USUARIO_CRM_VENDAS: 15,
	CADASTRO_FORNECEDOR: 23,
	JOIN_CHAMADOS: 27
}

        function configuracao(){
            if (thread == 2 && current == 11){
                   $("#div_criacaoCor").removeClass("hide");
            }
            if (current == 11 ){
                $("#titulo").text("Criação de código de unidade no CRM");
            }
            if (current == 13 ){
                $("#titulo").text("Inclusão no portal do cliente");
            }
            if (current == 15 ){
                $("#titulo").text("Criação de usário CRM e Estrutura de Vendas");
            }
            if (current == 23 ){
                $("#titulo").text("Cadastro de fornecedor");
            }

        }
        $("#ckDecisao").change(function () {
            $("#btnEnviar").attr("disabled",!$("#ckDecisao")["0"].checked);
        });


        function servicePost(url, data, success) {

            var domain = window.location.origin + "/";
            var oauth = OAuth({
                consumer: {
                    'key': 'homofluxoonboard', // Consumer Key:*
                    'secret': '123' // Consumer Secret
                },
                signature_method: 'HMAC-SHA1',
                hash_function: function (base_string, key) {
                    return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
                }
            });

            var request_data = {
                url: domain + url, // Altere o endereço da API desejada
                method: 'GET',
                data: data
            };

            var token = {
                'key': 'f232bd45-782b-468f-b2ab-b520b8091811', // Seu access token
                'secret': '1a1b05d1-768a-4dfa-a5dc-decee8c91bd244ec5e41-839f-42d0-a680-247988d8ad37' // Seu token secret
            }


            $.ajax({
                url: request_data.url,
                type: request_data.method,
                data: oauth.authorize(request_data, token),
                success: success

            });


            //http://spon010113223:8080/api/public/ecm/dataset/search?oauth_consumer_key=987654321&oauth_token=a9b07478-ba0b-41cb-91b5-6b2cd56b6fd8&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1517599064&oauth_nonce=WPKKyJ&oauth_version=1.0&oauth_signature=+kSXhgnQ2Mw+nCkGBAJnh1aEbKw=&datasetId=form_exemple_mail
        }

	
        $("#btnEnviar").click(function () {
			debugger;
            if (fValidar())
                tomandoDecisao();
        });
        function fValidar(){
            if (thread == 2 &&  current == 11){
                if ($("#cdUnidadeVenda").val().length == 0 && $("#div_criacaoCor").hasClass("hide") == false){
                    toastr.error('Por favor preencha o código de unidade de venda')
                    return false;
                }
                 
            }
            
            return true;
        }
        function tomandoDecisao() {

            var param_gen = "";
           if (thread == 2 && $("#div_criacaoCor").hasClass("hide") == false)
                param_gen = ",param," + $("#cdUnidadeVenda").val()
         

            var url = "api/public/ecm/dataset/search";
            var data = {
                datasetId: "dsCanaisMoveTask",
                filterFields: "token," + token + ",task," + task + ",thread," + thread + param_gen
                //	filterFields: "id," + proc +,"id," + documentId + ",version," + documentVersion + ",tablename,tabcliente"
            }


            var success = function (data) {
                toastr.success('Atividade movimentada com sucesso!')
                $("#btnEnviar").prop("disabled",true);
                $("#ckDecisao").prop("disabled",true); 
                $("#cdUnidadeVenda").prop("disabled",true);
            }

            var result = servicePost(url, data, success);
        }
       








    </script>
</body>

</html>