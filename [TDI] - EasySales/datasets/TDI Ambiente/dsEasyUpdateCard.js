function createDataset(fields, constraints, sortFields) {
		log.info("---dsEasyUpdateCard----");



		try {

			var credential = {companyId:"10097",user:"eder.oliveira2@totvs.com.br",password:"Totvs@123"}


			log.error('@updateCardData diz credential.companyI: ' + credential.companyId);	 
			log.error('@updateCardData diz credential.user: ' + credential.user);	 
			log.error('@updateCardData diz credential.password: ' + credential.password);	 
			log.error('@updateCardData diz ools.getParams().codigoForm: ' + Tools.getParams().codigoForm);	 

			
			log.warn('%%%%%% INICIANDO ECMCardService');
			var servico = ServiceManager.getServiceInstance("CardService");
			log.warn('%%%%%% servico: ' + servico);
	
			var locator = servico.instantiate("com.totvs.technology.ecm.dm.ws.ECMCardServiceService");
			log.warn('%%%%%% locator: ' + locator);
	
			var portServico = locator.getCardServicePort();
			log.warn('%%%%%% portServico: ' + portServico);
	
			var cardDocArray = servico.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDtoArray");
			log.warn('%%%%%% cardDocArray: ' + cardDocArray);
	
	
			//------------------------Montar array de objs---------------------------//

			//Objeto do campo d formulário que será alterado.
			var objCampo_1 = servico.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");
			objCampo_1.setField("jsonFavorites");//NOME DO CAMPO DO FORMULÁRIO QUE SERÁ ALTERADO
			objCampo_1.setValue( constraints[0].initialValue);//VALOR QUE SERÁ INSERIDO NO CAMPO
			cardDocArray.getItem().add(objCampo_1);//ADD OBJ CAMPO AO OBJ CARDARRAY

	
			//-------------------------Executando WS---------------------------//
			var WSretorno = portServico.updateCardData(credential.companyId, credential.user, credential.password, Tools.getParams().codigoForm, cardDocArray);

			var retorno = getRetorno(WSretorno);
			log.warn('%%%%%% retorno updateCardData ' + retorno);
	
			log.warn('%%%%%% FINALIZANDO ECMCardService');
		} catch (e) {
			throw "Erro ao atualizar: " + e;
		}


}
function getRetorno(WebServiceMessage) {
    var empresa = WebServiceMessage.getItem().get(0).getCompanyId();
    log.warn('%%%%%% empresa: ' + empresa);
    var documentDescription = WebServiceMessage.getItem().get(0).getDocumentDescription();
    log.warn('%%%%%% documentDescription: ' + documentDescription);
    var documentId = WebServiceMessage.getItem().get(0).getDocumentId();
    log.warn('%%%%%% documentId: ' + documentId);
    var version = WebServiceMessage.getItem().get(0).getVersion();
    log.warn('%%%%%% version: ' + version);
    var message = WebServiceMessage.getItem().get(0).getWebServiceMessage();
    log.warn('%%%%%% message: ' + message);

    if (documentDescription == null || documentDescription == "") {
        throw "Erro ao atualizar ficha (WS): " + message;
    }
    return "Formulário atualizado: " + documentDescription + " --- " + " DocumentId: " + documentId + " --- " + " Versão: " + version;
}
	var Tools = {
		getParams :function(){
	
			var dataset = DatasetFactory.getDataset("dsEasySalesParametrizacao", null, null, null);
			var object = {};
			object.codigoForm =  dataset.getValue(0, "codigoForm");
			return object;
		}
	}
	