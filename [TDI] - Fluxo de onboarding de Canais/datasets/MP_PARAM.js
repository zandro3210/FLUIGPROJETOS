function createDataset(fields, constraints, sortFields) {
var newDataset = DatasetBuilder.newDataset();
var key = [], value = [], company = [];
var mp_param = [];

mp_param.push(new Array("FWWSURL","http://wscorp0001.cp.totvs.com.br:8001/","10673280000152__PA"));

mp_param.push(new Array("FWLKKEY"," ","10673280000152__PA"));

mp_param.push(new Array("FWWSURL","http://wscorp10001.cp.totvs.com.br:8007/","TME031112BC0"));

mp_param.push(new Array("FWLKKEY"," ","TME031112BC0"));

mp_param.push(new Array("FWWSURL","http://wscorp40001.cp.totvs.com.br:8016/","900942446-8"));

mp_param.push(new Array("FWLKKEY"," ","900942446-8"));

mp_param.push(new Array("FWWSURL","http://wscorp20051.cp.totvs.com.br:8008/","30696155190"));

mp_param.push(new Array("FWLKKEY"," ","30696155190"));

mp_param.push(new Array("FWWSURL","http://wscorp10001.cp.totvs.com.br:8007/","AAA010101AAA"));

mp_param.push(new Array("FWLKKEY"," ","AAA010101AAA"));

mp_param.push(new Array("IDMURL","",""));

mp_param.push(new Array("IDMAPPID","",""));

mp_param.push(new Array("FWWSURL","http://wscorp0001.cp.totvs.com.br:8001/","53113791000122_111010945111_SP"));

mp_param.push(new Array("FWLKKEY"," ","53113791000122_111010945111_SP"));

if (constraints != null){
    for (var i = 0; i < constraints.length; i++) {
        if (constraints[i].fieldName == "company") { 
            company.push(constraints[i]);
        }
        else if (constraints[i].fieldName == "value") {
            value.push(constraints[i]);
        }
        else if (constraints[i].fieldName == "key") {
            key.push(constraints[i]);
        }
    }
}

newDataset.addColumn("key");
newDataset.addColumn("value");
newDataset.addColumn("company");

for (var i = 0; i < mp_param.length; i++){
	if (checkConstraint(key, mp_param[i][0]) && 
		checkConstraint(value, mp_param[i][1]) &&
		checkConstraint(company, mp_param[i][2])){

		newDataset.addRow(mp_param[i]);
	}
}
return newDataset;
}

function checkConstraint(constraint, value){
	if (constraint.length == 0)
		return true;

	for (var i = 0; i < constraint.length; i++){
		if (constraint[i].constraintType == ConstraintType.MUST){
			if (constraint[i].initialValue == value)
				return true;
		}
		else if (constraint[i].contraintType == ConstraintType.MUST_NOT){
			if (constraint[i].initialValue != value)
				return true;
		}
	}
	return false;
}
