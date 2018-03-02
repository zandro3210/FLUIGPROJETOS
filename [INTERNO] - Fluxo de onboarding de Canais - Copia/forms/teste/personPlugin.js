var PersonPlugin = {
	enable: function(){
		$(document).on('blur', '.cpf', this.checkCpf);
		$(document).on('blur', '.cnpj', this.checkCnpj);
		
		$(document).on('focus', '.cpf', function(){
			$(this).mask('000.000.000-00');
		});
		$(document).on('focus', '.cnpj', function(){
			$(this).mask('00.000.000/0000-00');
		});
	},
	checkCnpj: function(){
		var f = true;
		var e = this.value;
		
		if(e == '') return;
		
		if (e.match(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/) != null) {
			var t = e.substring(0, 2);
			var n = e.substring(3, 6);
			var r = e.substring(7, 10);
			var i = e.substring(11, 15);
			var o = e.substring(16, 18);
			var u;
			var a;
			
			a = t + n + r + i + o;
			s = a;
			c = s.substr(0, 12);
			var l = s.substr(12, 2);
			var h = 0;
			for (u = 0; u < 12; u++)
				h += c.charAt(11 - u) * (2 + u % 8);
			if (h == 0)
				f = false;
			h = 11 - h % 11;
			if (h > 9)
				h = 0;
			if (l.charAt(0) != h)
				f = false;
			h *= 2;
			for (u = 0; u < 12; u++) {
				h += c.charAt(11 - u) * (2 + (u + 1) % 8)
			}
			h = 11 - h % 11;
			if (h > 9)
				h = 0;
			if (l.charAt(1) != h)
				f = false;
		}
		else f = false;
		
		if(f==false) PersonPlugin.onError($(this));
	},
	checkCpf: function(){
		var a = true;
		var e = this.value;
		
		if(e == '') return;
		
		if (e.match(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/) != null) {
			var t = e.substring(0, 3);
			var n = e.substring(4, 7);
			var r = e.substring(8, 11);
			var i = e.substring(12, 14);
			var o;
			var u;
			u = t + n + r + i;
			s = u;
			c = s.substr(0, 9);
			var f = s.substr(9, 2);
			var l = 0;
			for (o = 0; o < 9; o++) {
				l += c.charAt(o) * (10 - o)
			}
			if (l == 0)
				a = false;
			l = 11 - l % 11;
			if (l > 9)
				l = 0;
			if (f.charAt(0) != l)
				a = false;
			l *= 2;
			for (o = 0; o < 9; o++) {
				l += c.charAt(o) * (11 - o)
			}
			l = 11 - l % 11;
			if (l > 9)
				l = 0;
			if (f.charAt(1) != l)
				a = false;
		}
		else a = false;
		
		if(a==false) 
			PersonPlugin.onError($(this));
		else{
			//Retirado if por solictacao de Marcio.
			//if($("input[name='tpUnidade']:checked").val() == "propria" || $("#slVinculoMaster").val() == "nao")
				PersonPlugin.validaVinculo($(this));
		}
			
	},
	validaVinculo: function($field){
		var cpf = replaceAll($field.val(),".","").replace("-","");
		
		var constraints = [];
		constraints.push(createConstraint("cpf", cpf));
		
		getDatasetAsync("dsCanaisVinculo", null, constraints, null).success(function(data) {
			var dataset = data.content;
			var status = JSON.parse(dataset.values[0]["vinculoOk"]);
			if(!status.Status){
				$field.val('');
				FLUIGC.toast({
					message: status.Mensagem,
					type: 'danger',
					timeout: 'slow'
				});
			}
		});		
	},
	onError: function($field){
		var type = ($field.hasClass('cpf')) ? 'CPF' : 'CNPJ';
		$field.val('');
		
		FLUIGC.toast({
			message: type+' informado está incorreto!',
			type: 'danger',
			timeout: 'slow'
		});
	}
};