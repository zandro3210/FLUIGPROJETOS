function createDataset(fields, constraints, sortFields) {

    if (constraints != null) {
    	try {
    		var newDataset = DatasetBuilder.newDataset();
    		newDataset.addColumn("CODIGO");
    		newDataset.addColumn("DESCRICAO");

    		//var zoom = "pais";
    		var NOME_SERVICO = 'CC_PerfilAcesso3';
    		var CAMINHO_SERVICO = 'com.totvs.protheus.perfilacesso3.PERFILACESSO';
    		
    		var servico = ServiceManager.getService(NOME_SERVICO);
    		var instancia = servico.instantiate(CAMINHO_SERVICO);
    		var SOAP = instancia.getPERFILACESSOSOAP();
    	    var zoom = constraints[0].getInitialValue(); 
    		
    		var wsReturn = SOAP.lstzoom(zoom);
    		var wsZoom = wsReturn.getCZOOM();

    		for (var i = 0; i < wsZoom.size(); i++){
    			newDataset.addRow(new Array(wsZoom.get(i).getCCODIGO(), wsZoom.get(i).getCDESCRI().trim()));
    		}
    		
    	}
    	catch(error) {    		
    		newDataset.addRow(new Array("ERRO2",error.message)); 
    	}
	}	
    else{
    	newDataset.addRow(new Array("ERRO1", "ZOOM NAO ENVIADO POR PARAMETRO"));
    }
    	return newDataset;
}