function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    var type = getType(constraints);
    var credential;
     
    dataset.addColumn('company');
    dataset.addColumn('user');
    dataset.addColumn('password');
     
    if(type == null) return null;
     
    credential = getCredential(type);
     
    if(credential == null) return null;
         
    dataset.addRow(credential);
     
    return dataset;
}

/**
 * Retorna o tipo passado via constraint.
 * 
 * @param constraints.
 * @returns {String}.
 */
function getType(constraints){
    if(constraints.length == 0 || constraints[0].fieldName.toLowerCase() != 'type'){
        log.error('@ds_connector/getType diz: constraint type é obrigatória.');
        return null;
    }
    else return constraints[0].initialValue;
}
 
/**
 * Retorna o usuario e senha de acordo com o tipo informado.
 * 
 * @param type
 * @returns [company, user, password].
 */
function getCredential(type){
	if(type == "fluig") return ["1", "adm", "adm"];
	else if(type == "canaisProtheus") return ["", "consulta", "!Consulta@2017!"];
	else if(type == "oauth-tdi"){
		var oauth = getOauthTdi();
		return ["", "", JSON.stringify(oauth)];
	}
    else{
        log.error("@ds_connector/getCredential diz: type não mapeado.");
        return null;
    }
     
    return credential;
}

function getOauthTdi(){
	var oauth = {
		token: {
			publica: '9a3295f8-60f2-4065-abab-2d78400bb328',
			secret: 'e6dc9754-df9f-411c-8fe2-fb3f2b736ee87f407459-8433-4c13-bae2-4ab62896515c'
		},
		consumer: {
			publica: 'TDI',
			secret: 'Totvs@123'
		}
	};
	return oauth;
}