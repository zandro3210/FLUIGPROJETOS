function beforeStateEntry(sequenceId){
	log.info("@beforeStateEntry CANAISONBOARDS diz: "+sequenceId);
	if(sequenceId == Activity.ANALISAR_CNPJ )
	{
		hAPI.setCardValue("thash", encrypt("onboard",hAPI.getCardValue("nrSolicitacao")));
	} 
	
}
function encrypt(key, value) {
	var result="";
	for(i=0;i<value.length;++i)
	{
	  result+=String.fromCharCode(key[i % key.length]^value.charCodeAt(i));
	}
	log.info("@beforeStateEntry encrypt result: "+result);
	return result;
  }
  
  function decrypt()
  {
   var result="";
	for(i=0;i<value.length;++i)
	{
	  result+=String.fromCharCode(key[i % key.length]^value.charCodeAt(i));
	}
	return result;
  }