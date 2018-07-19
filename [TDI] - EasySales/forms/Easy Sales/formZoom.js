var FormZoom = {
	fieldZoomName: '',
	filterValues: '',
	setFilterZoomEar: function(){
		this.fieldZoomName = 'dsNmExecutivo';
		this.filterValues = 'email,'+$('#emailUsuario').val();
		setFilterZoom();
	},
	callbackZoomEar: function(selectedItem){
		var filters = 'ear,'+selectedItem.codigo;			
		reloadZoomFilterValues('proposta', filters);
		
		FormViewProposal.setEar(selectedItem);
		FormAPI.postEar();
	},
	callbackZoomProposal: function(selectedItem){
		var customer = FormDaoProposal.getCustomer(selectedItem.codigo, selectedItem.entidade);
		var models = this.normalizeModels(JSON.parse(selectedItem.modelos));
		var asksGroupField = {};
		
		FormDaoOffer.setModelsField(models);
		FormViewProposal.setProposal(selectedItem);
		FormViewProposal.setCustomer(customer);
		
		FormViewOffer.setModels({models: models});
			FormAPI.postClient();
		for(var i=0; i<models.length; i++){
			var modelId = models[i].modori;
			var asksGroups = FormDaoOffer.getAsksGroupsOfDataset(modelId);
			var obj = {asksGroups: asksGroups, model: models[i]};
			
			FormViewOffer.setAsksGroups(obj);
			asksGroupField[modelId] = obj;
		}
		
		FormDaoOffer.setAsksGroupField(asksGroupField);
		FLUIGC.switcher.init('.form-switch');
	
	},
	/** O codigo do modelo por padrao possui espaco. Esta funcao gera uma propriedade codigo sem espacos. **/
	normalizeModels: function(models){
		for(var i=0; i<models.length; i++){
			models[i]['codigo'] = models[i].modori.replaceAll(' ','');
		}
		return models;
	}
};