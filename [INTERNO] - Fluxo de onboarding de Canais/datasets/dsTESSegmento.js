function createDataset(fields, constraints, sortFields) {
		
	var dataset = DatasetBuilder.newDataset();
	
	var servInstance = ServiceManager.getServiceInstance("TES");
	var serviceHelper = servInstance.getBean();
	
	/* 
	 Par�metros del Servicio:
�����* 1: ID
�����* 2: PARAM1 (Tipo de retorno)
�����* ���������� Valores: 	1 - Propuestas:	KEY1 (pa�s)
�����* ������������������ �	2 - Preguntas:	KEY1 (codigo propuesta)
�����* ������������������� 	3 - Segmentos:	(no es necesario KEY)
   	 *                     	4 - Premisas:	KEY1 (pa�s)
	 *						5 - Pa�ses:		(no es necesario KEY)
	 *					
�����* 3: KEY1 -> Depende de la informaci�n solicitada 
�����* 4: KEY2 -> No se utiliza en este momento (18/03/2015)
	*/
	
	var tesServices = serviceHelper.instantiate("br.com.microsiga.webservices.tesservices.TESSERVICES");
	var tesServiceSoap = tesServices.getTESSERVICESSOAP();
	
	var xmlData = tesServiceSoap.getdata("1", "3", "", "");

	var xml = new XML(xmlData);
	
	
	if( xml.length() > 0 && xml.*.length() > 0 ){
		
		// Cria os cabe?alhos
		var primogenito = xml.child(0);
		for( var i = 0; i < primogenito.*.length(); i++ ) {
			dataset.addColumn(primogenito.child(i).localName());
		}
		
		// Resgata os valores
		for( var i = 0; i < xml.*.length(); i++ ){
			var filho = xml.child(i);
			var values = [];
			for( var k = 0; k < filho.*.length(); k++ ){
				values[k] =  filho.child(k).toString();
			}
			dataset.addRow(values);
		}
	} else {
		dataset.addColumn(new Array("Exception"));
		dataset.addRow(new Array("No results"));
	}	
	
	return dataset;
}

