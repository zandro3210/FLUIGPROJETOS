

function retornaParametrizacao(){
    return  DatasetFactory.getDataset("dscanaisOnboardParametrizacao", null, null, null);   
}


function retornaParametrizacao(param){

    var params = DatasetFactory.getDataset("dscanaisOnboardParametrizacao", null, null, null);
    return params.getValue(0, param);
}