function afterProcessCreate(processId){
    log.info("@SubAberturadeChamados afterProcessCreate processId" +  processId);
	hAPI.setCardValue("nrSubsolicitacao", processId);

}