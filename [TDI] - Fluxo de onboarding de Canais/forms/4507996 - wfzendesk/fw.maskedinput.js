/*! Masked Input plugin for jQuery
* Copyright (c) 2007-@Year Josh Bush (digitalbush.com)
* Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license) 
* Version: @version */
(function(c){var a=(c.browser.msie?"paste":"input")+".mask";var b=(window.orientation!=undefined);c.mask={definitions:{A:"[A-Za-z]",a:"[A-Za-z]",N:"[A-Za-z0-9]",n:"[A-Za-z0-9]",X:".",x:".","9":"[0-9]","!":"."},dataName:"rawMaskFn"};c.fn.extend({caret:function(f,d){if(this.length==0){return}if(typeof f=="number"){d=(typeof d=="number")?d:f;return this.each(function(){if(this.setSelectionRange){this.setSelectionRange(f,d)}else{if(this.createTextRange){var g=this.createTextRange();g.collapse(true);g.moveEnd("character",d);g.moveStart("character",f);g.select()}}})}else{if(this[0].setSelectionRange){f=this[0].selectionStart;d=this[0].selectionEnd}else{if(document.selection&&document.selection.createRange){var e=document.selection.createRange();f=0-e.duplicate().moveStart("character",-100000);d=f+e.text.length
}}return{begin:f,end:d}}},unmask:function(){return this.trigger("unmask")},mask:function(l,f){if(!l&&this.length>0){var j=c(this[0]);return j.data(c.mask.dataName)()}f=c.extend({placeholder:" ",completed:null,uppercase:false},f);var g=c.mask.definitions;var d=[];var h=[];var e=l.length;var k=null;var i=l.length;c.each(l.split(""),function(m,n){if(n=="?"){i--;e=m}else{if(g[n]){d.push(new RegExp(g[n]));h.push(n);if(k==null){k=d.length-1}}else{d.push(null)}}});return this.trigger("unmask").each(function(){var w=c(this);var q=c.map(l.split(""),function(A,z){if(A!="?"){return g[A]?f.placeholder:A}});var y=w.val();var r=true;function v(z){while(++z<=i&&!d[z]){}return z}function s(z){while(--z>=0&&!d[z]){}return z}function p(C,z){if(C<0){return}for(var B=C,A=v(z);B<i;B++){if(d[B]){if(A<i&&d[B].test(q[A])){q[B]=q[A];q[A]=f.placeholder}else{break}A=v(A)}}u();w.caret(Math.max(k,C))}function m(D){for(var B=D,C=f.placeholder;B<i;B++){if(d[B]){var z=v(B);var A=q[B];q[B]=C;if(z<i&&d[z].test(A)){C=A}else{break}}}}function t(C){var A=C.which;
if(A==8||A==46||(b&&A==127)){var D=w.caret(),B=D.begin,z=D.end;if(z-B==0){B=A!=46?s(B):(z=v(B-1));z=A==46?v(z):z}n(B,z);p(B,z-1);return false}else{if(A==27){w.val(y);w.caret(0,o());return false}}}function x(C){var z=C.which,E=w.caret();if(C.ctrlKey||C.altKey||C.metaKey||z<32){return true}else{if(z){if(E.end-E.begin!=0){n(E.begin,E.end);p(E.begin,E.end-1)}var B=v(E.begin-1);if(B<i){var D=String.fromCharCode(z);if(d[B].test(D)){m(B);q[B]=f.uppercase||h[B]=="!"?D.toUpperCase():D;u();var A=v(B);w.caret(A);if(f.completed&&A>=i){f.completed.call(w)}}}return false}}}function n(B,z){for(var A=B;A<z&&A<i;A++){if(d[A]){q[A]=f.placeholder}}}function u(){return w.val(q.join("")).val()}function o(A){var E=w.val();var D=-1;for(var z=0,C=0;z<i;z++){if(d[z]){q[z]=f.placeholder;while(C++<E.length){var B=E.charAt(C-1);if(d[z].test(B)){q[z]=B;D=z;break}}if(C>E.length){break}}else{if(q[z]==E.charAt(C)&&z!=e){C++;D=z}}}if(!A&&D+1<e){w.val("");n(0,i)}else{if(A||D+1>=e){u();if(!A){w.val(w.val().substring(0,D+1))}}}return(e?z:k)}w.data(c.mask.dataName,function(){return c.map(q,function(A,z){return d[z]&&A!=f.placeholder?A:null
}).join("")});if(!w.attr("readonly")){w.one("unmask",function(){w.unbind(".mask").removeData(c.mask.dataName)}).bind("focus.mask",function(){y=w.val();var A=o(true);u();var z=function(){if(A==l.length){w.caret(0,A)}else{w.caret(A)}};(c.browser.msie?z:function(){setTimeout(z,0)})()}).bind("blur.mask",function(){o(true);if(w.val()!=y){r=false;w.change()}}).bind("keydown.mask",t).bind("keypress.mask",x).bind(a,function(){setTimeout(function(){w.caret(o(true))},0)}).bind("change.mask",function(){if(r){o(true)}else{r=true}}).bind("clearmask",function(){w.val("");n(0,i)})}o()})}})})(jQuery);
