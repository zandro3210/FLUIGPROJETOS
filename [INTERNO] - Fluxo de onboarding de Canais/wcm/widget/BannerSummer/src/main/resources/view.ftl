
<div  id="BannerSummer_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
     data-params="BannerSummer.instance({mode:'view'})">

  
    <div  class="owl-carousel owl-theme owl-theme-${instanceId}">

    </div>


</div>

<script>


$(document).ready(function() {

	var preferences = ${preferences};
	$.each(preferences.listSlide, function( index, value ) {
        $(".owl-theme-${instanceId}").append('<div style="height:'+ preferences.height + ';width:'+ preferences.width +'" class="item">' + value.content +'</div>');
	});

    $(".owl-theme-${instanceId}").css("height",preferences.height);
    $(".owl-theme-${instanceId}").css("width",preferences.width);
    $('.owl-theme-${instanceId}').owlCarousel({
    loop:preferences.loop,
    items:preferences.items,
     autoplay:preferences.autoplay,
      navigation : true,
   navigationText : ['<span class="fa-stack"><i class="fa fa-circle fa-stack-1x"></i><i class="fa fa-chevron-circle-left fa-stack-1x fa-inverse"></i></span>','<span class="fa-stack"><i class="fa fa-circle fa-stack-1x"></i><i class="fa fa-chevron-circle-right fa-stack-1x fa-inverse"></i></span>']
    });
			

});

</script>