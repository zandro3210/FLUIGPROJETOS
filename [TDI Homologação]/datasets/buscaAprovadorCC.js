function createDataset(fields, constraints, sortFields) {

    if (constraints != null) {
    	try {
    		var newDataset = DatasetBuilder.newDataset();
    		newDataset.addColumn("DESCRICAO");

    		//var cc = "603310103";
    		var NOME_SERVICO = 'CC_PerfilAcesso3';
    		var CAMINHO_SERVICO = 'com.totvs.protheus.perfilacesso3.PERFILACESSO';
    		
    		var servico = ServiceManager.getService(NOME_SERVICO);
    		var instancia = servico.instantiate(CAMINHO_SERVICO);
    		var SOAP = instancia.getPERFILACESSOSOAP();
    	    var cc = constraints[0].getInitialValue(); 
    		
    		var wsReturn = SOAP.gestor(cc);
    		
    		newDataset.addRow(new Array(wsReturn));
    		
    	}
    	catch(error) {    		
    		newDataset.addRow(new Array(error.message)); 
    	}
	}	
    else{
    	newDataset.addRow(new Array("CENTRO DE CUSTO NAO ENVIADO POR PARAMETRO"));
    }
    	return newDataset;
}