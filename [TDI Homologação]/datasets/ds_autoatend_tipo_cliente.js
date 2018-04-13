function createDataset(fields, constraints, sortFields) {
	
	var corpore = ServiceManager.getService('AUTOATENDIMENTO');
	var locator = corpore.instantiate('br.com.totvs.wsautoatendimento.wscorp.AUTOATENDIMENTOLocator');
	var service = locator.getAUTOATENDIMENTOSOAP();
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("LOJA");
	newDataset.addColumn("CODIGO");
	newDataset.addColumn("TIPO");
	newDataset.addColumn("SMSATUAL");
	
	var loja = "00";
	var cliente = "99061"
	var empresa = "00";
	var filial = "01";
	
	if (constraints != null) {
		for(var c in constraints){
			if (constraints[c].getFieldName() == "loja"){
				loja = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "cliente") {
				cliente = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "empresa") {
				empresa = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "filial") {
				filial = constraints[c].getInitialValue(); 
			}
		}
	}
	
	log.info("ds__autoatend_tipo_cliente.js:" + loja + ":" + cliente + ":" + empresa + ":" + filial); 

	var array = service.DADOS_CADASTRAIS(empresa, filial, cliente, loja);
	var list = array.getLISTACADASTRAIS();
	var tipo = new Object();
	for (var i=0;i<list.length;i++) {
		var c = list[i];

		if (c.getCG_CAMPO() == "A1_SITCLI") {
			tipo["sitcli"] = c.getCG_CONTEUDO();
		}
		if (c.getCG_CAMPO() == "A1_PRIMSMS") {
			tipo["primsms"] = c.getCG_CONTEUDO();
		}
		if (c.getCG_CAMPO() == "A1_DTULREC") {
			tipo["dtulrec"] = c.getCG_CONTEUDO();
		}
	}
	
	log.info("ds__autoatend_tipo_cliente.js:" + tipo["sitcli"] + ":" + tipo["primsms"] + ":" + tipo["dtulrec"]);
	
	var c = new Date();
	c.setFullYear(c.getFullYear()-1);
	
	var tipoCliente = "";
	if (tipo["sitcli"] == "A") {
		if (tipo["primsms"] == "" || tipo["primsms"] == null) {
			tipoCliente = "NOVO";
		} else {
			var dataPrimSms = tipo["primsms"].split("/");
			var y = parseInt(dataPrimSms[2]);
			if (y>80) { y = "19" + y; }
			else { y = "20" + y; }
			y = parseInt(y);
			var m = parseInt(dataPrimSms[1]);
			m--;
			var dt = new Date(y, m, dataPrimSms[0]);
			if (dt<c) {
				tipoCliente = "BASE";
			} else {
				tipoCliente = "NOVO";
			}
		}
	} else {
		if (tipo["dtulrec"] == "" || tipo["dtulrec"] == null) {
			tipoCliente = "NOVO";
		} else {
			var dtulrec = tipo["dtulrec"].split("/");
			var y = parseInt(dtulrec[2]);
			if (y>80) { y = "19" + y; }
			else { y = "20" + y; }
			y = parseInt(y);
			var m = parseInt(dtulrec[1]);
			m--;
			var dt = new Date(y, m, dtulrec[0]);
			if (dt>=c) {
				tipoCliente = "NOVO";
			}
		}
	}
	
	array = service.CONSULTA_CONTRATOS(cliente, loja);
	list = array.getLISTACONTRATOS();
	var total = 0;
	for (var i=0;i<list.length;i++) {
		var ctr = list[i];
		var it = ctr.getAI_ITENS_CONTRATO();
		var item = it.getITENS_CONTRATO();
		for (var x=0;x<item.length;x++) {
			var lc = item[x];
			var linha = lc.getCI_LINHA();
			var venc = lc.getCI_VENCIMENTO();
			
			log.info("ds_autoatend_tipo_cliente:" + linha + ":" + venc);
			
			if (linha.indexOf("SMS") != -1) {
				var civencimento = venc.split("/");
				var y = parseInt(civencimento[2]);
				if (y>80) { y = "19" + y; }
				else { y = "20" + y; }
				y = parseInt(y);
				var m = +civencimento[1];
				m--;
				
				log.info("ds_autoatend_tipo_cliente:" + y + ":" + m + ":" + civencimento[0]);
				
				var dt = new Date(y, m, civencimento[0]);
				var today = new Date();
				log.info("ds_autoatend_tipo_cliente:" + dt + ":" + today);
				if (dt>today) {
 					var temp = lc.getCI_VALTOTAL();
					while (temp.indexOf(".") != -1) {
						temp = temp.replace(".", "");
					}
					temp = temp.replace(",", ".");
					
					total += parseFloat(temp);
					log.info("ds_autoatend_tipo_cliente.js:" + linha + ":" + venc + ":" + lc.getCI_VALTOTAL());
				}
			}
		}
	}

	var ftotal = moedaF(parseFloat(total).toFixed(2).toString());
	
	log.info("ds_autoatend_tipo_cliente.js:" + total + ":" + ftotal);
	
	newDataset.addRow(new Array(loja,
								cliente,
								tipoCliente,
								total));
	
	return newDataset;		
}

function moedaF(v) {
	v = v.replace(/\D/g,"");
	v = v.replace(/(\d{1})(\d{8})$/,"$1.$2");  
	v = v.replace(/(\d{1})(\d{5})$/,"$1.$2"); 
	v = v.replace(/(\d{1})(\d{1,2})$/,"$1,$2");        
	return v;
}