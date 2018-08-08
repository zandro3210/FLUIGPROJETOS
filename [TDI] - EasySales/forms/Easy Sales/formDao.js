var FormDaoProposal = {
    getCustomer: function (customerlId, entity) {
        var constraints = [DatasetFactory.createConstraint('codigo', customerlId, '', ConstraintType.MUST)];
        constraints.push(DatasetFactory.createConstraint('entidade', entity, '', ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint('server', FormActivity.getCRM(), '', ConstraintType.MUST));
        var dataset = DatasetFactory.getDataset('dsEasyCliente', null, constraints, null);
        return dataset.values[0];
    },
    /*	getAsksGroupField: function(asksGroups){
            return JSON.parse($('#jsonGruposPerguntas').val());
        },*/
}

var FormDaoOffer = {
    getModelsOfField: function () {
        var models = $('#jsonModelos').val();
        return JSON.parse(models);
    },
    setModelsField: function (models) {
        models = JSON.stringify(models);
        $('#jsonModelos').val(models);
    },
    getAsksGroupsOfDataset: function (modelId) {
        var constraints = [DatasetFactory.createConstraint('modelo', modelId, '', ConstraintType.MUST)];
        var dataset = DatasetFactory.getDataset('dsEasyGrupoPergunta', null, constraints, null);
        return dataset.values;
    },
    getAsksGroupsOfField: function () {
        var groups = $('#jsonGruposPerguntas').val();
        return JSON.parse(groups);
    },
    setAsksGroupField: function (asksGroups) {
        asksGroups = JSON.stringify(asksGroups);
        $('#jsonGruposPerguntas').val(asksGroups);
    },
    getAksGroupsValue: function () {
        return JSON.parse($('#jsonGruposPerguntasSel').val());
    },
    setAksGroupsValue: function () {
        //var $switch = $(this).find('input'); 
        var arrayGroups = [];
        $.each($(".form-checkbox-offer:checked"), function (key, x) {
            var obj = {};
            obj.name = x.getAttribute("name");
            obj.value = x.value;
            obj.id = x.id;
            arrayGroups.push(obj);
        });

        if ($(".form-checkbox-offer:checked").length > 0)
            $("#step2").attr("disabled", false);
        else
            $("#step2").attr("disabled", true);

        $('#jsonGruposPerguntasSel').val(JSON.stringify(arrayGroups));


    }
}

var FormDaoAsk = {
    getAsksOfDataset: function (groupId) {
        var constraints = [DatasetFactory.createConstraint('grupo', groupId, '', ConstraintType.MUST)];
        var dataset = DatasetFactory.getDataset('dsEasyQuestions', null, constraints, null);
        //return dataset.values;
        return this.sortAsksByLevel(this.groupAksByCodigo(dataset.values));
    },
    groupAksByCodigo: function (olddataset) {
        var dataset = [];
        var groupedData = _.groupBy(olddataset, function (x) { return x.codigo });

        for (var cod in groupedData) {
            var aux = olddataset.find(x => x.codigo == cod);
            for (i = 1; i < olddataset.filter(x => x.codigo == cod).length; i++) {
                aux.opcoes += ";" + olddataset.filter(x => x.codigo == cod)[i].opcoes;
            }
            dataset.push(aux);

        }
        return dataset;
    },
    sortAsksByLevel: function (datasetValues) {

        return datasetValues.sort(function (x, b) { return parseFloat(x.nivel - b.nivel) })
    }
}

var FormDaoFavorite = {
    param: null,
    init: function () {

        var dataset = DatasetFactory.getDataset("dsEasySalesParametrizacao", null, null, null);
        this.param = dataset.values[0];


    },
    getFavorite: function () {
        this.init();
        var email = $('#emailUsuario').val();

        var Favorites = this.param.jsonFavorites == "" ? [] : JSON.parse(this.param.jsonFavorites);
        if (Favorites.some(x => x.email == email) && ( Favorites.some(x => x.value[0] == $("#dsNmExecutivo").val()) ||  $("#dsNmExecutivo").val() == null ||  $("#dsNmExecutivo").val() == ""  )) {
 
                var value = Favorites.find(x => x.email == email).value;
                window["dsNmExecutivo"].setValue(value);
                var c1 = DatasetFactory.createConstraint("email", email, null, ConstraintType.MUST);
                var constraints = new Array(c1);
                var dataset = DatasetFactory.getDataset("dsEasyExecutivo", null, constraints, null);

                var selectedItem = dataset.values.find(x => x.codigo == value)
                var filters = 'ear,' + selectedItem.codigo;
                reloadZoomFilterValues('proposta', filters);
                FormViewProposal.setEar(selectedItem);
                this.setStar(); 

        } else {
            this.closeStar();
        }


    },
    setStar: function () {
        $("#starFavorite").html('<i class="fa fa-star" aria-hidden="true"></i>');
        $("#starFavorite").removeClass("off");
        $("#starFavorite").addClass("on");
    },
    closeStar: function () {
        $("#starFavorite").html('<i class="fa fa-star-o" aria-hidden="true"></i>');
        $("#starFavorite").removeClass("on");
        $("#starFavorite").addClass("off");
    },
    delFavorite: function (value) {
        this.init();
        var listFavorites = this.param.jsonFavorites == "" ? [] : JSON.parse(this.param.jsonFavorites);

        listFavorites.splice(listFavorites.findIndex(x => x.email == value), 1);

        var c1 = DatasetFactory.createConstraint("jsonFavorite", JSON.stringify(listFavorites), null, ConstraintType.MUST);
        var constraints = new Array(c1);
        DatasetFactory.getDataset("dsEasyUpdateCard", null, constraints, null);
    },
    setFavorite: function (value) {
        this.init();
        if (this.validateFavorite()) {

            var listFavorites = this.param.jsonFavorites == "" ? [] : JSON.parse(this.param.jsonFavorites);
            var email = $('#emailUsuario').val();
            if (listFavorites.some(x => x.email == email)) {
                listFavorites.filter(x => x.email == email).value == value;
            } else {
                listFavorites.push({ email: $('#emailUsuario').val(), value: value })
            }
            var c1 = DatasetFactory.createConstraint("jsonFavorite", JSON.stringify(listFavorites), null, ConstraintType.MUST);
            var constraints = new Array(c1);
            DatasetFactory.getDataset("dsEasyUpdateCard", null, constraints, null);
            this.setStar();
        }

    },
    validateFavorite: function () {
        if ($("#dsNmExecutivo").val() == null) {
            window.FLUIGC.toast({
                title: 'Falha ao favoritar',
                message: 'Por favor, selecione um executivo para adiciona-lo como favorito.',
                type: 'danger'
            });
            return false;
        }

        return true;
    }
}