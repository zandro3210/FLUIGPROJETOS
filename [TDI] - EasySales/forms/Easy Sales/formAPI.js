
var FormAPI = {
    SERVER: null,
    init: function () {
        var PRD = "https://187.94.57.182";
        var HML = "http://172.16.93.222:8091";
        this.SERVER = HML;
    },
    postEar: function () {
        this.init();
        var url = this.SERVER + "/rest/WSRPESESN";
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": url,
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "processData": false,
            "data": $("#jsonExecutivo").val()
        }

        $.ajax(settings)
            .done(function (response) {

                window.FLUIGC.toast({
                    title: 'Integração ESN',
                    message: 'Realizada com sucesso! ',
                    type: 'success'
                });

            }).error(function (response) {
                window["dsNmExecutivo"].clear();
                window.FLUIGC.toast({
                    title: 'Falha na Integração ESN',
                    message: 'Por favor, selecione novamente o executivo ',
                    type: 'danger'
                });
            });
    },
    postClient: function () {
        this.init();
        var url = this.SERVER + "/rest/WSCADCLI";
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": url,
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "processData": false,
            "data": $("#jsonCliente").val()
        }

        $.ajax(settings)
            .done(function (response) {
                $('a[href="#esOfertas"]').trigger('click');
                window.FLUIGC.toast({
                    title: 'Integração Cliente',
                    message: 'Realizada com sucesso! ',
                    type: 'success'
                });

            }).error(function (response) {
                window["proposta"].clear();
                window.FLUIGC.toast({
                    title: 'Falha na Integração Cliente',
                    message: 'Por favor, selecione novamente a proposta ',
                    type: 'danger'
                });
            });
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
    }

}

