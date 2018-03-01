function createDataset(fields, constraints, sortFields) {

//	var HOST = "https://train.dev.cloudtotvs.com.br"; 
	// dev	var TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidHJhaW4uYXBpIn0sImlzcyI6InRyYWluLmRldi5jbG91ZHRvdHZzLmNvbS5iciJ9.QDhWihpzkeVrItzVQkIv4k3ZFZ0_gcpnBTskoJy72II";
	
	var HOST = "http://fluig.totvs.com";
	var path = "/api/public/ecm/dataset/datasets";
	var method = "POST";
	
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "path"){
				path = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "method"){
				method = constraints[c].getInitialValue(); 
			}  
		}
	}
	
	try {
		var url = new java.net.URL(HOST + path);
		var conn = url.openConnection();
		conn.setRequestMethod(method);
		//conn.setRequestProperty("Authorization", TOKEN);

		var reader = new java.io.InputStreamReader(conn.getInputStream());
		var scanner = new java.util.Scanner(reader).useDelimiter("\\A");
		var json = scanner.hasNext() ? scanner.next() : "";		
	} catch (e) {
		var json = '{"message": "error", "error": "' +  e.message + '"}';
	}
	
//	var json = '{"message":"success", "contract_itens":{"offers":[{"name":"ID INTERA COMPLETAO","offer_code":"7191001004","amount":3},{"name":"ID INT DEDICADO 1º AO 50º","offer_code":"7191001005","amount":50},{"name":"ID INT DEDICADO 51º AO 100º","offer_code":"7191001014","amount":50},{"name":"ID INT DEDICADO 101º AO 250º","offer_code":"7191001015","amount":150},{"name":"ID INT DEDICADO 251º AO 500º","offer_code":"7191001016","amount":250},{"name":"ID INT DEDICADO 501º AO 1000º","offer_code":"7191001017","amount":500},{"name":"ID INT DEDICADO \u003e 1001º","offer_code":"7191001018","amount":497}], "products":[{"name":"sample_name","versions":["1.0.1","1.2.1"], "environments":[{"name":"production","group":"Ambiente","applicable_group":"Produto"}], "group":"Produto","applicable_group":"Cliente"}, {"name":"sample_name_sombrio","versions":["1.0","1.2"], "environments":[{"name":"production","group":"Ambiente","applicable_group":"Produto"}, {"name":"test","group":"Ambiente","applicable_group":"Produto"}], "group":"Produto","applicable_group":"Cliente"}], "additional_packages":[{"id":null,"name":"discoApp","amount":1,"price":null,"type":"magnetico","group":"StoreAPP","applicable_group":"Ambiente"},{"id":null,"name":"ssd","amount":2,"price":null,"type":"magnetico","group":"StoreAPP","applicable_group":"Ambiente"},{"id":null,"name":"cdrom","amount":5,"price":null,"type":"magnetico","group":"StoreAPP","applicable_group":"Ambiente"}]}}';

	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("json");
	newDataset.addRow(new Array(json));
	return newDataset; 
} 
