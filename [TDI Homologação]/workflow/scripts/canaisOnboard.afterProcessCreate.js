function afterProcessCreate(processId){
    log.info("@afterProcessCreate processId" +  processId);
	hAPI.setCardValue("nrSolicitacao", processId);
	
	var token = java.util.Calendar.getInstance().getTimeInMillis().toString()+processId.toString();
	var shuffledToken = token.shuffle();
	hAPI.setCardValue("token", shuffledToken);
}

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}