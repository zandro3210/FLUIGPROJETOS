function validate_currency(field,decimalPlaces){
	var value = field.value;	
	
	if(isNaN(field.value.replace(',', ''))){
		return false;
	};
	
	if(field.value.length == 0){
		field.value = '0';
	};	
	value = value.replaceAll(".","");
	if (value.indexOf(",") != -1) {
		var integer = value.substring(0, value.indexOf(","));
		var decimal = value.substring(value.indexOf(",") + 1);
		value = setCurrencyDots(integer) + "," + setDecimalValue(decimal,decimalPlaces);
	} else {
		value = setCurrencyDots(value) + ","+returnDecimals(decimalPlaces);
	}
	field.value = value;
};

function returnDecimals(places){
	var retorno = '';
	for(var i = 0;i<places;i++){
		retorno += '0';
	}
	return retorno;
}

function setCurrencyDots(value){
	value = (value == '') ? '0' : value;
	var result = '';
	for (var i = 0; i <= value.length; i++){
		if (result.length != 0 && (result.replaceAll(".","").length % 3 == 0))
			result = value.charAt(value.length - i) + "." + result;
		else
			result = value.charAt(value.length - i) + result;
	}
	return result;
}
function setDecimalValue(value,places){
	var result = value + returnDecimals(places);
	result = result.substring(0, places);
	return result;
}

