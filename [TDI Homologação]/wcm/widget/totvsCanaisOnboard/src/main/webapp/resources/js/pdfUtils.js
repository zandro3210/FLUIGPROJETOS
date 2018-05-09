var Pdf = {
    templates: {},
    destiny: {},
    callback: {},
    images: null,
    index: null,
    initialize: function($template, $destiny, callback){
        this.templates = $template;
        this.destiny = $destiny;
        this.callback = callback;
        this.images = [];
        this.index = 0;
    },
    toPdf: function(myLoading,pdfName){
        var a4Width = 595.28 * 1.33333 - 80;
        this.destiny.removeClass('hide');
        this.destiny.width(a4Width).css('max-width', 'none');
        this.createCanvas(myLoading,pdfName);             
    },
    createCanvas: function(myLoading,pdfName){
        var that = this;
       
        var template = $(that.templates[that.index]);
        
        html2canvas(template, {
            imageTimeout: 2000,
            removeContainer: true,
            onrendered: function(canvas) {
                var img = canvas.toDataURL();  
                
                that.images.push(img);
                if(that.index < that.templates.length-1){
                    that.index++;
                    that.createCanvas(myLoading,pdfName);
                }
                else{
                	that.createPdf(pdfName);
                	myLoading.hide();
                }
                
                
            }            
        });         
    },
    createPdf: function(pdfName){
    	var that = this;
        var doc = new jsPDF({unit: 'px', format: 'a4'});
       
        for(var i=0; i<that.images.length; i++){
    		if(i>0)
    			doc.addPage();
    		
            doc.addImage(that.images[i], 'JPEG', 14, 15);
        }
        
        if(this.callback == null || this.callback == undefined){
        	doc.save(pdfName);
        }
        else{
        	var blob = doc.output('blob');
        	this.callback(blob);
        }        
        this.destiny.addClass('hide');
        $(".page_template:not(#page_template)").remove();
    }    
}