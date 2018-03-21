function createDataset(fields, constraints, sortFields) {
	
	var corpore = ServiceManager.getService('FWWSLSKEY');
	var locator = corpore.instantiate('br.com.totvs.webservices.fwwslskey_apw.FWWSLSKEY');
	var service = locator.getFWWSLSKEYSOAP();
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("HARDLOCK");
	
	var cliente = "T00386";
	
	if (constraints != null) {
		for(var c in constraints){
			if (constraints[c].getFieldName() == "cliente"){
				cliente = constraints[c].getInitialValue(); 
			}
		}
	}

	var token = getToken();
	var hardlock = new java.lang.String(service.getlisthl(token, cliente));
	var lista = hardlock.split("\\|");
	for (var i=0;i<lista.length;i++) {
		var s = new java.lang.String(lista[i]);
		newDataset.addRow(new Array(s.trim()));
	}
	
	return newDataset;		
	
	
	function getToken(){
		var date1 = new java.util.GregorianCalendar();
		date1.setTime(new Date());
		var date2 = new java.util.GregorianCalendar(2001, java.util.Calendar.JANUARY, 01);
		var difDate = ((date1.getTimeInMillis() - date2.getTimeInMillis()) / 86400000);

		var d = difDate.toString();
		d = d.substring(0, d.indexOf("."));
		
		var diferenca = d;

		for (var i=5;i>diferenca.length;i--) {
			diferenca = "0" + diferenca; 
		}
		
		var token = "b349d474-5c1d-43f2-9b30-301c46603703-" + diferenca;
		log.info("TOKENN:"+token);
		return token;
	}	

}