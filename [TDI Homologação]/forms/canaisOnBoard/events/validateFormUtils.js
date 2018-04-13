var ValidateFormUtils = {
	objForm: null,
	errors: "",
	/** valida o campo **/
	validate: function(fieldName, label, fieldCondition, valuesArrayCondition){
		if(fieldCondition == null) this.checkField(fieldName, label);
		else{
			var isCheck = this.checkConditions(fieldCondition, valuesArrayCondition);
			if(isCheck) this.checkField(fieldName, label);
		}
	},
	/** valida o campo pai filho **/
	validateChild: function(fieldName, label){
		var cardData = this.objForm.getCardData();	
		var iterator = cardData.keySet().iterator();
		
		while (iterator.hasNext()) {
			var key = iterator.next();
			if(key.startsWith(fieldName+"___")) this.checkField(key, label);
		}
	},
	/** valida se existe ao menos uma linha **/
	validateChildSize: function(fieldName, label){
		var cardData = this.objForm.getCardData();	
		var iterator = cardData.keySet().iterator();
		
		while (iterator.hasNext()) {
			var key = iterator.next();
			if(key.startsWith(fieldName+"___")) return;
		}
		this.errors+= "É necessário incluir ao menos um "+label+"!<br/>";
	},
	checkField: function(fieldName, label){
		if(this.isEmpty(fieldName)) this.onError(label);
	},
	checkConditions: function(fieldName, valuesArray){
		for(var i=0; i<valuesArray.length; i++){
			if(valuesArray[i] == this.objForm.getValue(fieldName)) return true;
		}
		return false;
	},
	onError: function(label){
		this.errors+= "É necessário preencher o campo "+label+"!<br/>";
	},
	isEmpty: function(fieldName){
		if(this.objForm.getValue(fieldName) == null) return true;
		else return this.objForm.getValue(fieldName).trim().isEmpty();
	}
}