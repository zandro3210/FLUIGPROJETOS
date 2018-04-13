function removeMask(event, field, maskName){
	if (maskName == 'currency') {
    	field.value = unformatField(maskName, field.value);    	    	
    }
    
    try { field.select(); } catch (e) { }
}

function applyMask(event,obj){
	var charCode = (event.which) ? event.which : event.keyCode;

	console.log("$.browser.mozilla: "+$.browser.mozilla);
	console.log("event.keyCode: "+event.keyCode);
	console.log("event.which: "+event.which);
	console.log("charCode: "+charCode);
	if($.browser.mozilla){
		if ((event.which < 48 || event.which > 57) && (event.keyCode < 37 || event.keyCode > 40) && event.which != 44 && event.keyCode != 46 && event.which != 8 && event.keyCode != 9){
			event.preventDefault();
		} 
	}else{
		if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode != 44){
			event.preventDefault();
		} 
	}
	
	
	if(charCode == 44 && $(obj).val().indexOf(',') != -1) {
		event.preventDefault();
	} 
}

function isAllowedKeys(event, ch){
	var key = getKey(event);
	var invalidChars = "'%&("; 
	if (invalidChars.indexOf(ch) != -1){
	   return false;
	}
	var isAllowedKeys = false;
	if (getCurrentlyBrowser() == "opera" && key == 46) { // tecla del do opera
		key = event.which;
	}
	// tab / backspace / setas (direita, cima, esquerda, baixo) / delete
	if (key == 0 || key == 8 || key == 9 || key == 37 || key == 38 || key == 39 || key == 40)
		isAllowedKeys = true;
	return isAllowedKeys;
}
function isNumeric(sText){
	var validChars = "0123456789";
	var isNumber = true;
	var Char;
	for (i = 0; i < sText.length && isNumber == true; i++){ 
		Char = sText.charAt(i);
		if (validChars.indexOf(Char) == -1){
		   isNumber = false;
		}
	}
	return isNumber;
}
function isCurrency(sText){
	var validChars = "0123456789,";
	var isCurrency = true;
	var Char;
	for (i = 0; i < sText.length && isCurrency == true; i++){ 
		Char = sText.charAt(i); 
		if (validChars.indexOf(Char) == -1){
		   isCurrency = false;
		}
	}
	return isCurrency;
}
function isNotSpecialChar(sText){
	var validChars = "qwertyuiopçlkjhgfdsazxcvbnmQWERTYUIOPÇLKJHGFDSAZXCVBNM 0123456789";
	var isSpecialChar = true;
	var Char;
	for (i = 0; i < sText.length && isSpecialChar == true; i++){ 
		Char = sText.charAt(i); 
		if (validChars.indexOf(Char) == -1){
		   isSpecialChar = false;
		}
	}
	return isSpecialChar;
}

function isNotSpecialCharAccent(sText){
	var validChars = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM 0123456789áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ";
	var isSpecialChar = true;
	var Char;
	for (i = 0; i < sText.length && isSpecialChar == true; i++){ 
		Char = sText.charAt(i); 
		if (validChars.indexOf(Char) == -1){
		   isSpecialChar = false;
		}
	}
	return isSpecialChar;
}

function unformatField(type, value){
	var result = value.replaceAll(".", "");
	if (type != 'currency') {
		result = result.replaceAll(",", "");
	}
	result = result.replaceAll("-", "");
	result = result.replaceAll("/", "");
	result = result.replaceAll(":", "");
	return result;
}  
function getKey(e){
	return window.event ? window.event.keyCode : e? e.which : 0;
};