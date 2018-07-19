<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
    crossorigin="anonymous">
<div id="Documentos365_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
     data-params="Documentos365.instance({'mode':'view'})">

<div class="tab-inner">
                    <ul class="tabs active">
                        <h3 class="category-headding ">${title}</h3>
                        <div class="headding-border"></div>
                    </ul>
                   
                    <!-- tabs -->
                    <div class="tab_content">
                        <div class="tab-item-inner tab-item-${instanceId}">
                            
                        </div>
                      
                    </div>
                    <!-- / tab_content -->
                </div>






</div>
  <script>


        $(document).ready(function () {


            var preferences = ${ preferences };

            $.each(preferences.listDocument, function (index, document) {

                     var content = '<div class="box-item wow fadeIn" data-wow-duration="1s">';
                     content += '<div class="img-thumb">';
                     content += '   <a target="_blank" href="' + document.url+'">  <i class="' + document.icon+'"></i></a>';
                     content += '   </div>';
                     content += '  <div class="item-details">';
                     content += '   <h6 style="background-color:' + document.color +'" class="sub-category-title">';
                     content += '     <a target="_blank" href="' + document.url+'">' + document.category +'</a>';
                     content += '  </h6>';
                     content += '  <h3 class="td-module-title">' + document.text +'</h3>';               
                     content += '  </div>';
                     content += '  </div>';

                    $(".tab-item-${instanceId}").append(content);
               
            });
        });

 
    </script>