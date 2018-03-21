var Activity = {
	ZERO: 4,
	EMAIL_CORPORATIVO: 9,
	CRIACAO_COD_CRM: 11,
	PORTAL_CLIENTE: 13,
	USUARIO_CRM_VENDAS: 15
}
function ajax(option) { // $.ajax(...) without jquery.
    if (typeof(option.url) == "undefined") {
        try {
            option.url = location.href;
        } catch(e) {
            var ajaxLocation;
            ajaxLocation = document.createElement("a");
            ajaxLocation.href = "";
            option.url = ajaxLocation.href;
        }
    }
    if (typeof(option.type) == "undefined") {
        option.type = "GET";
    }
    if (typeof(option.data) == "undefined") {
        option.data = null;
    } else {
        var data = "";
        for (var x in option.data) {
            if (data != "") {
                data += "&";
            }
            data += encodeURIComponent(x)+"="+encodeURIComponent(option.data[x]);
        };
        option.data = data;
    }
    if (typeof(option.statusCode) == "undefined") { // 4
        option.statusCode = {};
    }
    if (typeof(option.beforeSend) == "undefined") { // 1
        option.beforeSend = function () {};
    }
    if (typeof(option.success) == "undefined") { // 4 et sans erreur
        option.success = function () {};
    }
    if (typeof(option.error) == "undefined") { // 4 et avec erreur
        option.error = function () {};
    }
    if (typeof(option.complete) == "undefined") { // 4
        option.complete = function () {};
    }
    typeof(option.statusCode["404"]);

    var xhr = null;

    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) { try { xhr = new ActiveXObject("Msxml2.XMLHTTP"); } catch(e) { xhr = new ActiveXObject("Microsoft.XMLHTTP"); } }
        else { xhr = new XMLHttpRequest(); }
    } else { alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest..."); return null; }

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 1) {
            option.beforeSend();
        }
        if (xhr.readyState == 4) {
            option.complete(xhr, xhr.status);
            if (xhr.status == 200 || xhr.status == 0) {
                option.success(xhr.responseText);
            } else {
                option.error(xhr.status);
                if (typeof(option.statusCode[xhr.status]) != "undefined") {
                    option.statusCode[xhr.status]();
                }
            }
        }
    };

    if (option.type == "POST") {
        xhr.open(option.type, option.url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.send(option.data);
    } else {
        xhr.open(option.type, option.url+option.data, true);
        xhr.send(null);
    }

}