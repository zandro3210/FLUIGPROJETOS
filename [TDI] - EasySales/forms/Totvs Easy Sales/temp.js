$(document).ready(function(){
	FormView.binding();
	FormView.enableTabs();
	FormView.setMandatoryFields();
	if(CURRENT_STATE != Activity.ZERO && CURRENT_STATE != Activity.INICIO) FormViewOffer.loadModelsTab();
	
	$(document).on('click', '.checkDad', checkDad);	
});

function checkDad(element){
	element = (element.nodeName == undefined) ? this : element;
	var questions = JSON.parse($('#jsonPerguntas').val());
	
	for(var i=0; i<questions.length; i++){	
		var quest = questions[i];
		var name = element.name.split('ask_')[1];
		var askCodigo= quest.codigo;
		askCodigo = askCodigo.replace(".", "___");
		
		if(name == quest.pai){			
			if(element.value == 1){				
				$('#row_'+askCodigo).removeClass('hidden');				
				$('[name="ask_'+askCodigo+'"]').addClass('ask-required');
			}
			else{				
				if(quest.tp == '1'){//SE INPUT FOR RADIO					
					var opcao2 = quest.opcoes.split(';')[1].split('=')[0];
					var idInput = "ask_"+askCodigo+'_'+opcao2;
					
					$('#'+idInput).attr('checked', true);
					$('#'+idInput).trigger('click');				
				}
				
				$('[name="ask_'+askCodigo+'"]').removeClass('ask-required');
				$('#row_'+askCodigo).addClass('hidden');			
			}			
		}		
	}
}

var filterOptions = {};

function setSelectedZoomItem(selectedItem){ 
	switch(selectedItem.inputId){
		case 'dsNmExecutivo': FormZoom.callbackZoomEar(selectedItem); break;
		case 'proposta': FormZoom.callbackZoomProposal(selectedItem); break;
	}
}

function setFilterZoom(){
    if(window['data-zoom_'+FormZoom.fieldZoomName] == undefined) setTimeout(setFilterZoom, 1000);
    else reloadZoomFilterValues(FormZoom.fieldZoomName, FormZoom.filterValues);
}

var beforeSendValidate = function(numState, nextState){
	var obj = [];
	
	if(numState == Activity.PREENCHER_QUESTIONARIO){
		//$('#liAlcance a').trigger('click');
				
		$('[name*="ask_"]').each(function(){
			if(this.name != undefined){				
				if(this.type == 'radio'){					
					if($('input[name="'+this.name+'"]').is(':checked')){						
						obj.push({name: this.name, value: $('input[name='+this.name+']:checked').val()});					
					}					
				}				
				else if($(this).hasClass('field-filter')){
					var filterId = this.id.replace('___','.').split('ask_')[1];
					var filterQ = JSON.parse($('#jsonPerguntas').val());
					var map = {};
					var finalValue = [];
					for(var fi=0; fi<filterQ.length; fi++){
						var current = filterQ[fi];
						if(current.codigo == filterId){
							var filterMap = current.opcoes.split(';');
							for(var fj=0; fj<filterMap.length; fj++){
								var curMap = filterMap[fj];
								var parts = curMap.split('=');
								map[parts[1]] = parts[0];
							}							
						}
					}
					
					var values = this.value.split(',');
					for(var fi=0; fi<values.length; fi++){
						finalValue.push(map[values[fi]]);
					}
					obj.push({name: this.name, value: finalValue.join(';')})	
				}
				else{					
					obj.push({name: this.name, value: this.value})					
				}				
			}	
			$('#jsonRespostas').val(JSON.stringify(obj));
		});
	}
	
	var errors = CustomValidate.validate(numState);
	
	$('#errosQuestionario').val(errors);	
	
	return true;
}

var CustomValidate = {
	validate: function(numState){
		var errors = new HashSet();

		if(numState == Activity.PREENCHER_QUESTIONARIO || numState == Activity.MODIFICAR){
			var that = this;
			//$('[name*="ask_"]').each(function(){
			$('.ask-required').each(function(){
				var $element = $(this);
				errors.add(that.getError($element));				
			});
		}
		
		return errors.getArray().join('<br/>');
	},
	getError: function($element){
		var error = '';
		var isRadio = ($element.attr('type') == 'radio');
		var isFilter = $element.hasClass('field-filter');
		//var isVisible = $element.is(':visible');		
		var hasParentVisible = $element.parent().is(':visible');
		
		if(isRadio){
			//if(isVisible) error+= (this.isEmpty($element)) ? "É necessário preencher o campo: "+this.getLabel($element) : '';
			error+= (this.isEmpty($element)) ? "É necessário preencher o campo: "+this.getLabel($element) : '';
		} 
		else if(isFilter){
			//if(hasParentVisible) error+= (this.isEmpty($element)) ? "É necessário preencher o campo: "+this.getLabel($element) : '';
			error+= (this.isEmpty($element)) ? "É necessário preencher o campo: "+this.getLabel($element) : '';
		} 
		else{
			//if(isVisible) error+= (this.isEmpty($element)) ? "É necessário preencher o campo: "+this.getLabel($element) : '';
			error+= (this.isEmpty($element)) ? "É necessário preencher o campo: "+this.getLabel($element) : '';
		}
		
		return error;
	},
	getLabel: function($element){
		var label = $element.parent().parent().children('label').first().text();
		return label;
	},
	isEmpty: function($element){
		var isEmpty = true;
		var isRadio = ($element.attr('type') == 'radio');
		
		if(isRadio) isEmpty = this.checkRadio($element);
		else isEmpty = this.checkText($element);
		
		return isEmpty;
	},
	checkRadio: function($element){
		var name = $element.attr('name');
		var selector = '[name="'+name+'"]:checked';
		var isEmpty = ($(selector).size() == 0);
		
		return isEmpty;
	},
	checkText: function($element){
		return ($element.val() == '');
	}
}

var autocompleteInstance = {};
function setAutocompleteField(listValues, fieldName){
	var filter = FLUIGC.autocomplete('#'+fieldName, {
	    source: substringMatcher(listValues),
	    displayKey: 'description',
	    tagClass: 'tag-gray',
	    type: 'tagAutocomplete',
	    minLength: 0
	});

	autocompleteInstance[fieldName] = filter;
}

/**
 * Localiza os valores na lista do autocomplete.
 * 
 * @param strs: lista de valores.
 * @returns function.
 */
function substringMatcher(strs) {
	return function findMatches(q, cb) {
        var matches, substrRegex;
 
        matches = [];
 
        substrRegex = new RegExp(q, 'i');
 
        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
                matches.push({
                    description: str
                 });
            }
        });
        cb(matches);
    };
}

var HashSet = function(){
	var data = {};
	
	this.add = function(value){
		if(value != '' && value != null && value != undefined) data[value] = '';
	}
	
	this.getArray = function(){
		var array = [];
		
		for(var key in data){
			array.push(key);
		}
		
		return array;
	}
}