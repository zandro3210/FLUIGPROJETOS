var PRD = "https://wscorp.totvs.com.br";
var HML = "http://spon010113223:8080/";
var SERVER = HML;
var Activity = {
	ZERO: 4,
	EMAIL_CORPORATIVO: 9,
	CRIACAO_COD_CRM: 11,
	PORTAL_CLIENTE: 13,
	USUARIO_CRM_VENDAS: 15,
	CADASTRO_FORNECEDOR: 23
}

function retornaParametrizacao(){
    return  DatasetFactory.getDataset("dscanaisOnboardParametrizacao", null, null, null);   
}


function retornaParametrizacao(param){

    var params = DatasetFactory.getDataset("dscanaisOnboardParametrizacao", null, null, null);
    return params.getValue(0, param);
}