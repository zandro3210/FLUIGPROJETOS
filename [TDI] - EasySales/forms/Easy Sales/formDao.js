var FormDaoProposal = {
	getCustomer: function(customerlId, entity){
		var constraints = [DatasetFactory.createConstraint('codigo', customerlId, '', ConstraintType.MUST)];
		constraints.push(DatasetFactory.createConstraint('entidade', entity, '', ConstraintType.MUST));
        var dataset = DatasetFactory.getDataset('dsEasyCliente', null, constraints, null);
        return dataset.values[0];
	},
/*	getAsksGroupField: function(asksGroups){
		return JSON.parse($('#jsonGruposPerguntas').val());
	},*/		
}

var FormDaoOffer = {
	getModelsOfField: function(){
		var models = $('#jsonModelos').val();
		return JSON.parse(models);
	},
	setModelsField: function(models){
		models = JSON.stringify(models);
		$('#jsonModelos').val(models);
	},
	getAsksGroupsOfDataset: function(modelId){
		var constraints = [DatasetFactory.createConstraint('modelo', modelId, '', ConstraintType.MUST)];
		var dataset = DatasetFactory.getDataset('dsEasyGrupoPergunta', null, constraints, null);
		return dataset.values;
	},
	getAsksGroupsOfField: function(){
		var groups = $('#jsonGruposPerguntas').val();
		return JSON.parse(groups);
	},	
	setAsksGroupField: function(asksGroups){
		asksGroups = JSON.stringify(asksGroups);
		$('#jsonGruposPerguntas').val(asksGroups);
	},
	getAksGroupsValue: function(){
		return JSON.parse($('#jsonGruposPerguntasSel').val());
	},
	setAksGroupsValue: function(input){		
		var $input = $('#jsonGruposPerguntasSel');
		//var $switch = $(this).find('input'); 
		var $switch = input;
		var obj = ($input.val() == '') ? {} : JSON.parse($input.val());
		obj[$switch.getAttribute("name")] = $switch.value;
		
		$('#jsonGruposPerguntasSel').val(JSON.stringify(obj));
		//$switch.trigger('click');
	}
}

var  FormDaoAsk = {
    getAsksOfDataset: function(groupId){
        var constraints = [DatasetFactory.createConstraint('grupo', groupId, '', ConstraintType.MUST)];
        var dataset = DatasetFactory.getDataset('dsEasyQuestions', null, constraints, null);
        //return dataset.values;
        return this.sortAsksByLevel(this.groupAksByCodigo(dataset.values));
    },
    groupAksByCodigo: function(olddataset){
        var dataset = [];
        var groupedData = _.groupBy(olddataset, function (x) { return x.codigo });

        for (var cod in groupedData) {          
            var aux = olddataset.find( x => x.codigo == cod);
            for (i = 1; i < olddataset.filter( x => x.codigo == cod).length; i++) {
            aux.opcoes += ";" + olddataset.filter( x => x.codigo == cod)[i].opcoes;     
            }
            dataset.push(aux);
            
        }
        return dataset;
    },
    sortAsksByLevel: function(datasetValues){
        var levels = [];
        var values = {};
        var sorted = [];
        var levelsFloat = [];
        
        for(var i=0; i<datasetValues.length; i++){
            var row = datasetValues[i];
            var level = row.nivel;
            
            levels.push(level);
            values[level] = row;
        }
        
        $(levels).each(function(){
            levelsFloat.push(parseFloat(this));
        });
        
        //levels.sort(function(a, b){ return a.localeCompare(b)});
        levelsFloat.sort(function(a, b){return a-b});
        levels = levelsFloat;
        
        for(var i=0; i<levels.length; i++){
            var level = levels[i];
            var value = values[level];
            sorted.push(value);
        }
        
        return sorted;
    }
}