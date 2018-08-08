
var FormAPI = {
    postEar: function () {
        var objeto = {};
        objeto.url = FormActivity.getEasySales() + "/rest/WSRPESESN"; 
        objeto.data = $("#jsonExecutivo").val();

        var constraints = [DatasetFactory.createConstraint('data', JSON.stringify(objeto), '', ConstraintType.MUST)];
        var dataset = DatasetFactory.getDataset('dsEasyRestPost', null, constraints, null);
        if (typeof dataset.values != "undefined" ){
            window.FLUIGC.toast({
                title: 'Integração ESN',
                message: 'Realizada com sucesso! ',
                type: 'success'
            });
        }else{
            window["dsNmExecutivo"].clear();
            window.FLUIGC.toast({
                title: 'Falha na Integração ESN',
                message: 'Por favor, selecione novamente o executivo ',
                type: 'danger'
            });
        }



    },
    postClient: function () {
        var objeto = {};
        objeto.url = FormActivity.getEasySales() + "/rest/WSCADCLI"; 
        objeto.data = $("#jsonCliente").val();

        var constraints = [DatasetFactory.createConstraint('data', JSON.stringify(objeto), '', ConstraintType.MUST)];
        var dataset = DatasetFactory.getDataset('dsEasyRestPost', null, constraints, null);
        if (typeof dataset.values != "undefined" ){
            $('a[href="#esOfertas"]').trigger('click');
                window.FLUIGC.toast({
                    title: 'Integração Cliente',
                    message: 'Realizada com sucesso! ',
                    type: 'success'
                });
        }else{
            window["proposta"].clear();
            window.FLUIGC.toast({
                title: 'Falha na Integração Cliente',
                message: 'Por favor, selecione novamente a proposta ',
                type: 'danger'
            });
        }
    },
    postPropostal: function () {
        var data = {};
        data.proposta = $("#proposta").val();
        data.jsonExecutivo = $("#jsonExecutivo").val();
        data.jsonGruposPerguntasSel = $("#jsonGruposPerguntasSel").val();
        data.dpNrEntidade = $("#dpNrEntidade").val();
        data.dcCodigo = $("#dcCodigo").val();
        data.dcLoja = $("#dcLoja").val();
        data.dcCodseg = $("#dcCodseg").val();
        data.dcContato = $("#dcContato").val();
        data.dcDdd = $("#dcDdd").val();
        data.dcEmail = $("#dcEmail").val();
        data.dcCidade = $("#dcCidade").val();
        data.dcUf = $("#dcUf").val();
        data.dpNrRevisao = $("#dpNrRevisao").val();
        data.dpNrOportunidade = $("#dpNrOportunidade").val();
        data.dpNrEntidade = $("#dpNrEntidade").val();
        data.nrSolicitacao = $("#nrSolicitacao").val();
        data.dpStatus = $("#dpStatus").val();
        data.jsonRespostas = $("#jsonRespostas").val();
        data.jsonPerguntas = $("#jsonPerguntas").val();
        data.dsNmExecutivo = $("#dsNmExecutivo").val();
        data.jsonModelos = $("#jsonModelos").val();
        data.jsonGruposPerguntas = $("#jsonGruposPerguntas").val();

        
        var constraints = [DatasetFactory.createConstraint('data', JSON.stringify(data), '', ConstraintType.MUST)];
        var dataset = DatasetFactory.getDataset('dsEasySoapProposal', null, constraints, null);
        return dataset.values;
    }, validatePropostal: function(result){

        if (result[0].sendProposal.indexOf("A proposta já está integrada") != -1) {
					

            FLUIGC.modal({
                title: 'Falha ao tentar otimizar proposta',
                content: 'A proposta já está integrada, desejar reiniciar o processo?',
                id: 'fluig-modal',
                actions: [{
                    'label': 'Sim',
                    'bind': 'data-resetprocess'
                }, {
                    'label': 'Fechar',
                    'autoClose': true
                }]
            }, function (err, data) {
                if (err) {
                    // do error handling
                } else {
                    // do something with data
                }
            });

            return false;
        }else  if (result[0].sendProposal.indexOf("Um erro inesperado ocorreu") != -1) {
					
            window.FLUIGC.toast({
                title: 'Falha na otimização da proposta.',
                message: result[0].sendProposal,
                type: 'success'
            });
            return false;
            
        }

        return true;
    }

}

