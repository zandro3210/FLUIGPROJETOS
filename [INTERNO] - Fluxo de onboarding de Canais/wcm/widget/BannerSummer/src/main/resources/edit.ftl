<script src="/portal/resources/style-guide/js/fluig-style-guide-richeditor.min.js"></script>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
    crossorigin="anonymous">
<div id="BannerSummer_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="BannerSummer.instance({'mode':'edit'})">



    <input type="hidden" class="param-save" id="jsonSlide_${instanceId}" value="" name="jsonSlide_${instanceId}">

    <ul class="nav nav-tabs clearfix" role="tablist">
        <li id="liConteudo" class="active">
            <a data-toggle="tab" href="#tab_Conteudo">Conteúdo</a>
        </li>
        <li id="liCarousel">
            <a data-toggle="tab" href="#tab_Carousel">Configurações do Carousel</a>
        </li>
    </ul>

    <div class="tab-content">
        <!-- CONTEUDO -->
        <div class="tab-pane fade in active" id="tab_Conteudo">

            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">Informações sobre o contéudo</h4>
                </div>
            </div>
            <div class="panel-body">
                <div class="row">

                    <div class="form-group row">
                        <div class="col-md-12">
                            <label for="width">Largura</label>
                            <i class="far fa-question-circle" data-toggle="tooltip" data-placement="top" title="Exemplo 100% ou 300px"></i>
                            <input type="text" class="form-control" id="width_${instanceId}" name="width_${instanceId}" value="100%">

                        </div>
                        <div class="col-md-12">
                            <label for="height">Altura</label>
                            <i class="far fa-question-circle" data-toggle="tooltip" data-placement="top"
                                title="Exemplo 100% ou 300px"></i>
                            <input type="text" class="form-control" id="height_${instanceId}" name="height_${instanceId}" value="100%">

                        </div>
                        <div class="col-md-1">
                            <label for="width">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <button type="button" data-add-slide class="btn btn-default">Adicionar Slide</button>

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <label for="conteudo">Slide</label>
                            <textarea style="height=400" name="conteudo_${instanceId}" id="conteudo_${instanceId}"></textarea>
                        </div>
                        <div class="col-md-12">
                            <label for="banner">Lista de Slides</label>
                            <div style="max-height: 400px; overflow-y: scroll;">
                                <table id="listSlide_${instanceId}" class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#Código</th>
                                            <th>Largura</th>
                                            <th>Altura</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--  CONFIGURAÇÂO DO CAROUSEL -->
        <div class="tab-pane fade " id="tab_Carousel">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">Parametrização</h4>
                </div>
                <div class="panel-body">

                    <div class="form-group row">
                    <div class="col-md-12">
                            <label for="heightForm_${instanceId}">Altura do Carousel</label>
                            <input type="text" class="form-control" id="heightForm_${instanceId}" name="heightForm_${instanceId}" value="100%">
                        </div>
                        <div class="col-md-12">
                              <label for="widthForm_${instanceId}">Largura do Carousel</label>
                              <input type="text" class="form-control" id="widthForm_${instanceId}" name="widthForm_${instanceId}" value="300px">
                        </div>
                        <div class="col-md-12">
                            <label for="loop_${instanceId}">Loop</label>
                            <select class="form-control" id="loop_${instanceId}" name="loop_${instanceId}">
                                <option value="true">Sim</option>
                                <option value="false" selected="selected">Não</option>
                            </select>
                        </div>

                        <div class="col-md-12">
                            <label for="autoplay_${instanceId}">AutoPlay</label>
                            <select class="form-control" id="autoplay_${instanceId}" name="autoplay_${instanceId}">
                                <option value="true" selected="selected">Sim</option>
                                <option value="false">Não</option>
                            </select>
                        </div>

                        <div class="col-md-12">
                            <label for="items_${instanceId}">Quantidade de Slide</label>
                            <input type="number" class="form-control" id="items_${instanceId}" name="items_${instanceId}" value="1">
                        </div>
                    </div>

					<div class="form-group row">
						<div class="col-md-1">
                            <label for="width">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <button type="button" data-save class="btn btn-info">Salvar Configurações</button>
                        </div>
					</div>

                </div>
            </div>

        </div>
        <!--  FIM CONFIGURAÇÂO DO CAROUSEL -->


        <!--  FIM CONTEUDO -->
    </div>
    <script>

        $(document).ready(function () {

            var preferences = ${ preferences };

            $.each(preferences.listSlide, function (index, slide) {
                var tr = '<tr data-jsonSlide="">';
                tr += '<td>Slide ' + slide.count + ' </td>';
                tr += '<td>' + slide.height + '</td>'
                tr += '<td>' + slide.width + '</td>'
                tr += '<td> <a data-del-slide class="btn btn-danger"><i class="fas fa-trash-alt"></i></a> <a data-load-slide class="btn btn-info"> <i class="fas fa-eye"></i></a> </td>'
                tr += '</tr>';
                $("#listSlide_${instanceId}").append(tr);
                $("#listSlide_${instanceId} tbody tr:last").attr("data-jsonSlide", JSON.stringify(slide));
            });

if (preferences.height != null){
  $("#heightForm_${instanceId}").val(preferences.height);
}
            if (preferences.width != null){
    $("#widthForm_${instanceId}").val(preferences.width);
}
                       if (preferences.loop != null){
       $("#loop_${instanceId}").val(preferences.loop);
}
                     if (preferences.autoplay != null){
       $("#autoplay_${instanceId}").val(preferences.autoplay);
}
                     if (preferences.items != null){
         $("#items_${instanceId}").val(preferences.items);
}
            
                  
                   
        });

        var settings = {
            extraPlugins: 'liststyle,fluigimage,image',
            resize_enabled: true,
            width: "auto",
            height: "300",
            allowedContent: true
        };
        var richeditor_${ instanceId } = FLUIGC.richeditor("conteudo_${instanceId}", settings);
        richeditor_${ instanceId }.setData();

    </script>