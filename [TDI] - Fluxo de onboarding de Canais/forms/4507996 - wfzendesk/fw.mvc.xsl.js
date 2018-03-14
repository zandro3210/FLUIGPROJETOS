/*! TOTVS MVC Functions */
var fwWSURL = "",
    fwLKKey = "",
    fwModel = "",
    fwModule = 0;
var fwSetDate = "dd/mm/yyyy";
var fwSetYear = new Date().getFullYear().toString().substring(0, 2);
var fwECM = false;

function fwInitHtml() {
    $(window).resize(function() {
        fwGridResize($(".fw-grid:visible"))
    });
    $($.jgrid.formatter.date.dayNames).each(function(a, b) {
        $.jgrid.formatter.date.dayNames[a] = utf8_decode(b)
    });
    $($.jgrid.formatter.date.monthNames).each(function(a, b) {
        $.jgrid.formatter.date.monthNames[a] = utf8_decode(b)
    });
    $.datepicker.setDefaults({
        dayNames: $.jgrid.formatter.date.dayNames.slice(7),
        dayNamesShort: $.jgrid.formatter.date.dayNames.slice(0, 7),
        dayNamesMin: fwDayNamesMin($.jgrid.formatter.date.dayNames.slice(0, 7)),
        monthNames: $.jgrid.formatter.date.monthNames.slice(12),
        monthNamesShort: $.jgrid.formatter.date.monthNames.slice(12)
    });
    $.metadata.setType("attr", "data");
    $(".fw-folder").tabs({
        create: function() {
            $(this).bind("tabsshow", function(a, b) {
                fwGridResize($(".fw-grid:visible", b.panel))
            })
        }
    });
    $(".fw-accordion").accordion({
        collapsible: true
    });
    $(".fw-input-date").fwPicture({
        type: "D"
    });
    $(".fw-input-number").fwPicture({
        type: "N"
    });
    $(".fw-input-char").fwPicture({
        type: "C"
    });
    $(".fw-input-select").fwCombo().fwDisabled();
    $(".fw-checkbox").fwDisabled();
    $(".fw-grid").fwFormGrid();
    $(".ui-datepicker").hide();
    $title = $("[title]").tooltip({
        disabled: true
    }).bind("mouseleave focusout", function(b) {
        var a = $(this);
        if (!a.tooltip("option", "disabled")) {
            a.tooltip("close").tooltip("disable")
        }
    });
    if ("onhelp" in window) {
        window.onhelp = function(b) {
            var a = b ? $(b.srcElement) : $(event.srcElement);
            if (a.hasClass("fw-input-date") || a.hasClass("fw-input-number") || a.hasClass("fw-input-char") || a.hasClass("fw-input-select")) {
                if (a.tooltip("option", "disabled")) {
                    a.tooltip("enable").tooltip("open")
                } else {
                    a.tooltip("close").tooltip("disable")
                }
                return false
            }
        }
    } else {
        $title.bind("keydown", function(a) {
            if (a.which == 112) {
                $this = $(this);
                if ($this.tooltip("option", "disabled")) {
                    $this.tooltip("enable").tooltip("open")
                } else {
                    $this.tooltip("close").tooltip("disable")
                }
                a.preventDefault()
            }
        })
    }
}

function fwInitLookUp() {
    $(".fw-input-char").setLookUp()
}

function fwInitECM() {
    var d, c, g, e;
    var a = 1;
    fwECM = true;
    fwInitHtml();
    d = DatasetFactory.createConstraint("key", "FWWSURL", "FWWSURL", ConstraintType.MUST);
    c = DatasetFactory.createConstraint("key", "FWLKKEY", "FWLKKEY", ConstraintType.MUST);
    g = new Array(d, c);
    e = DatasetFactory.getDataset("MP_PARAM", null, g, null);
    for (var b = 0; b < e.values.length; b++) {
        if (e.values[b]["key"].trim() == "FWWSURL") {
            fwWSURL = e.values[b]["value"]
        } else {
            if (e.values[b]["key"].trim() == "FWLKKEY") {
                fwLKKey = e.values[b]["value"]
            }
        }
    }
    fwInitLookUp();
    if (WKDef == "") {
        return
    }
    if (!WKNumState) {
        WKNumState = 1
    }
    if (WKNumState > 1) {
        d = DatasetFactory.createConstraint("processTaskPK.processInstanceId", parentOBJ.ECM.workflowView.processDefinition.processInstanceId, parentOBJ.ECM.workflowView.processDefinition.processInstanceId, ConstraintType.MUST);
        c = DatasetFactory.createConstraint("processTaskPK.movementSequence", WKNumState - 1, WKNumState - 1, ConstraintType.MUST);
        g = new Array(d, c);
        e = DatasetFactory.getDataset("processTask", null, g, null);
        if (e.values.length == 0) {
            return
        }
        a = e.values[0]["choosedSequence"]
    }
    d = DatasetFactory.createConstraint("sequence", a, a, ConstraintType.MUST);
    g = new Array(d);
    e = DatasetFactory.getDataset(WKDef + "_VIEWSTATE", null, g, null);
    for (var b = 0; b < e.values.length; b++) {
        if (e.values[b]["sequence"] == a) {
            var f = "#" + e.values[b]["id"].trim();
            switch (e.values[b]["option"]) {
                case "1":
                    $(f).show();
                    break;
                case "2":
                    $(f).find('input[type!="checkbox"],textarea').each(function(h, i) {
                        $(i).unbind().attr("readonly", true)
                    });
                    $(f).find('select,input[type="checkbox"]').each(function(i, j) {
                        var h = $(j);
                        h.metadata($.extend(h.metadata(), {
                            disabled: true
                        }))
                    });
                    $(f).find("[id$='_GRID']").each(function(h, i) {
                        $(i).jqGrid("setGridParam", {
                            editable: false
                        })
                    });
                    $(f).find("[id$='_NAV']").each(function(h, i) {
                        $(i).hide()
                    });
                    break;
                case "3":
                    $(f).hide();
                    break
            }
        }
    }
}

function fwGridResize(a) {
    a.each(function(b) {
        var c = $(this).width("99.8%");
        $("#" + c.attr("id") + "_GRID").setGridWidth(c.width())
    })
}

function fwStrZero(a, c) {
    var b = a.toString();
    if (b.length < c) {
        b = fwReplicate("0", c - b.length) + b
    }
    return b
}

function fwReplicate(e, a) {
    var b = "";
    for (var d = 0; d < a; d++) {
        b += e
    }
    return b
}

function fwFormatDate(b, a) {
    if (b.search(/yyyy/) >= 0) {
        return $.datepicker.formatDate(b.replace(/yyyy/, "yy"), a)
    }
    return $.datepicker.formatDate(b.replace(/yy/, "y"), a)
}

function fwCtoD(f) {
    var e, h;
    var b = f.length;
    var g = fwSetDate.indexOf("d");
    var a = fwSetDate.indexOf("m");
    var i = fwSetDate.indexOf("y");
    var c = fwSetDate.match(/yyyy/) ? 4 : 2;
    if (g + 2 > b || a + 2 > b || i + c > b) {
        return new Date(1899, 12, 30)
    } else {
        h = f.substr(a, 2) + "/" + f.substr(g, 2);
        if (c == 4) {
            h += "/" + f.substr(i, 4)
        } else {
            h += "/" + fwSetYear + f.substr(i, 2)
        }
        e = Date.parse(h);
        if (!isNaN(e)) {
            return new Date(e)
        }
    }
    return new Date(1899, 12, 30)
}

function fwDtoC(b, c) {
    var d, a;
    if (c == undefined) {
        fwSetDate
    }
    d = c;
    a = c.match(/yyyy/) ? 4 : 2;
    d = d.replace(/dd/, fwStrZero(b.getDate(), 2));
    d = d.replace(/mm/, fwStrZero(b.getMonth() + 1, 2));
    if (a == 4) {
        d = d.replace(/yyyy/, b.getFullYear())
    } else {
        d = d.replace(/yy/, b.getFullYear().toString().substr(2, 2))
    }
    return d
}

function fwSoma1(h, b, d, a) {
    var c, g;
    var f = "";
    var e = fwReplicate("9", h.length);
    if (!d) {
        d = false
    }
    if (!a) {
        a = false
    }
    for (c = 0; c < h.length; c++) {
        g = h.substr(c, 1);
        if (!g.match(/[0-9]|[A-Z]|[a-z]/)) {
            f += "0"
        } else {
            f += g
        }
    }
    h = f;
    if ($.isNumeric(h) && h < e && !a) {
        return fwStrZero((new Number(h)).valueOf() + 1, h.length)
    }
    f = "";
    for (c = h.length - 1; c >= 0; c--) {
        g = h.substr(c, 1);
        if (g == "9") {
            g = "A";
            f = g + f;
            break
        } else {
            if (g == "Z" || g == "z") {
                if (d && g != "z") {
                    g = "a";
                    f = g + ret;
                    break
                } else {
                    if (c > 0) {
                        g = "0";
                        f = g + f
                    } else {
                        if (!b) {
                            return fwReplicate("0", b)
                        } else {
                            return "000000"
                        }
                    }
                }
            } else {
                g = String.fromCharCode(g.charCodeAt(0) + 1);
                f = g + f;
                break
            }
        }
    }
    f = h.substr(0, h.length - f.length) + f;
    return f
}

function fwDayNamesMin(c) {
    var a = c.slice(0);
    for (var b = 0; b < c.length; b++) {
        a[b] = a[b].substr(0, 2)
    }
    return c
}

function fwEmpty(a) {
    switch (typeOf(a)) {
        case "undefined":
        case "null":
            return true;
        case "string":
            return a.length === 0 || /^\s*$/.test(a);
        case "number":
            return a === 0;
        case "boolean":
            return !a;
        case "array":
            return a.length > 0
    }
    return false
}

function fwSetValue(b, a) {
    var c = $(b);
    c.trigger("clearmask");
    if (c.data("fwPictureType") == "N") {
        c.autoNumericSet(a)
    } else {
        c.val(a)
    }
}

function typeOf(b) {
    var a = typeof b;
    if (a !== "object") {
        return a
    } else {
        if (Object.prototype.toString.call(b) === "[object Array]") {
            return "array"
        } else {
            if (b === null) {
                return "null"
            } else {
                return "object"
            }
        }
    }
}

function utf8_decode(a) {
    var c = [],
        e = 0,
        g = 0,
        f = 0,
        d = 0,
        b = 0;
    a += "";
    while (e < a.length) {
        f = a.charCodeAt(e);
        if (f < 128) {
            c[g++] = String.fromCharCode(f);
            e++
        } else {
            if (f > 191 && f < 224) {
                d = a.charCodeAt(e + 1);
                c[g++] = String.fromCharCode(((f & 31) << 6) | (d & 63));
                e += 2
            } else {
                d = a.charCodeAt(e + 1);
                b = a.charCodeAt(e + 2);
                c[g++] = String.fromCharCode(((f & 15) << 12) | ((d & 63) << 6) | (b & 63));
                e += 3
            }
        }
    }
    return c.join("")
}
var STR_PAD_LEFT = 1;
var STR_PAD_RIGHT = 2;
var STR_PAD_BOTH = 3;

function pad(f, a, e, b) {
    if (typeof(a) == "undefined") {
        var a = 0
    }
    if (typeof(e) == "undefined") {
        var e = " "
    }
    if (typeof(b) == "undefined") {
        var b = STR_PAD_RIGHT
    }
    if (a + 1 >= f.length) {
        switch (b) {
            case STR_PAD_LEFT:
                f = Array(a + 1 - f.length).join(e) + f;
                break;
            case STR_PAD_BOTH:
                var c = Math.ceil((padlen = a - f.length) / 2);
                var d = padlen - c;
                f = Array(d + 1).join(e) + f + Array(c + 1).join(e);
                break;
            default:
                f = f + Array(a + 1 - f.length).join(e);
                break
        }
    }
    return f
}(function($) {
    $.fn.setLookUp = function(p) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.metadata();
            if (data.lookup) {
                var $clone = $.lookUpBtn.clone(true).data("obj", $this.attr("name")).data("key", data.lookup);
                $this.after($clone).bind("keydown", function(event) {
                    if (event.keyCode == 114) {
                        $(".fw-lookup-button", $(this).parent()).click();
                        event.stopPropagation();
                        return false
                    }
                })
            }
        })
    };
    $.lookUpBtn = $('<div class="fw-lookup-button"><span class="ui-icon ui-icon-search"></span></div>').click(function(event) {
        var $this = $(this);
        var obj = new Object();
        if (fwECM) {
            obj.userCode = parent.WCMAPI.userCode;
            obj.userEmail = parent.WCMAPI.userEmail
        }
        $(document).find("input,select,textarea").each(function(i, e) {
            var $e = $(e);
            var value = $e.data("rawMaskFn") ? ($e.blur(), $e.mask()) : $e.val();
            var len;
            if ($e.hasClass("fw-input-char")) {
                if ($e.attr("maxlength")) {
                    len = parseInt($e.attr("maxlength"));
                    if (len > 0) {
                        value = pad(value, len, " ", STR_PAD_RIGHT)
                    }
                }
            } else {
                if ($e.hasClass("fw-input-number")) {
                    if (value.trim().length > 0) {
                        value = parseFloat($e.autoNumericGet());
                        if (isNaN(value)) {
                            value = 0
                        }
                    } else {
                        value = 0
                    }
                } else {
                    if ($e.hasClass("fw-input-date")) {
                        if (value.trim().length == 0) {
                            value = "Date()"
                        } else {
                            value = fwCtoD($e.val());
                            if (value.getTime() < 0) {
                                value = "Date()"
                            } else {
                                value = "Date(" + value.getTime() + ")"
                            }
                        }
                    }
                }
            }
            eval("obj." + $e.attr("name") + " = value")
        });
        window.open("fwlookup.htm?key=" + $this.data("key") + "&field=" + $this.data("obj") + "&memVar=" + Base64.encode(JSON.stringify(obj)) + "&module=" + fwModule + "&url=" + fwWSURL + "/w_fwlkjsonp.apl&keylogin=" + fwLKKey, "fwlookup", "width=608,height=423,location=0,directories=no,menubar=0,scrollbars=0,resizable=0,titlebar=0");
        event.stopPropagation();
        return false
    });
    $.fwDisabled = $.fn.fwDisabled = function(p) {
        return this.each(function() {
            $(this).mousedown(function() {
                return !$(this).metadata().disabled
            }).click(function() {
                return !$(this).metadata().disabled
            })
        })
    }
})(jQuery);
(function(a) {
    a.fn.fwCombo = function(d) {
        if (typeof(d) == "string") {
            var c = a.jgrid.getAccessor(a.fn.fwCombo, d);
            if (!c) {
                throw ("fwCombo - No such method: " + d)
            }
            var b = a.makeArray(arguments).slice(1);
            return c.apply(this, b)
        }
        return this.each(function() {
            if (a(this).is("select")) {
                var f = a.extend(true, {}, a.fn.fwCombo.defaults, d),
                    e = a('<div class="' + f.textClass + '"><div></div><span class="ui-icon ui-icon-circle-triangle-s"></span></div>'),
                    g = a(this).wrap('<div class="' + f.mainClass + '"></div>').before(e).change(function() {
                        var h = a(this);
                        a(".fw-select-text div", h.parent()).html(h.fwComboText())
                    });
                a("div", e).html(g.fwComboText())
            }
        })
    };
    a.fn.fwComboText = function() {
        var b, d, c = a("option:selected", this);
        if (c.length == 0) {
            c = a("option", this).first()
        }
        d = c.text();
        b = d.indexOf("=");
        if (b > 0) {
            return d.substring(b + 1)
        }
        return d
    };
    a.fn.fwCombo.update = function() {
        return this.each(function() {
            a(this).trigger("change")
        })
    };
    a.fn.fwCombo.defaults = {
        mainClass: "fw-select",
        textClass: "fw-select-text"
    }
})(jQuery);
(function($) {
    $.fn.fwFormGrid = function(options) {
        var opts = $.extend({}, $.fn.fwFormGrid.defaults, options);
        return this.each(function() {
            var $this = $(this);
            var mdata = $this.metadata();
            var name = $this.attr("id");
            var navID = name + "_NAV";
            var $grid = $("#" + name + "_GRID");
            var $input = $("#" + name + "_DATA");
            var data = '{"rows":' + ($.trim($input.val()).length == 0 ? "[]" : $input.val()) + "}";
            var insertLine = mdata.insertLine == undefined || mdata.insertLine;
            var deleteLine = mdata.deleteLine == undefined || mdata.deleteLine;
            var updateLine = mdata.updateLine == undefined || mdata.updateLine;
            $('<div id="' + navID + '"/>').appendTo($this);
            navID = "#" + navID;
            $(mdata.colModel).each(function(idx, col) {
                if (col.fwType) {
                    var size = col.fwSize,
                        options, defaultValue = "",
                        dataInit = "",
                        charSize = "A",
                        addWidth = 0;
                    col.index = col.name;
                    col.editoptions = {};
                    col.editable = col.editable && updateLine;
                    switch (col.fwType) {
                        case "M":
                            col.edittype = "textarea";
                            size = size == 0 || size == 10 ? 56 : size;
                            size = size > 80 ? 80 : size;
                            charSize = "0";
                            if (col.editable) {
                                col.editoptions.rows = "7";
                                col.editoptions.dataInit = textArea
                            }
                            break;
                        case "C":
                            defaultValue = "01";
                            options = col.fwOptions;
                            if (col.fwOptions && col.fwOptions.length > 0) {
                                addWidth = 16;
                                col.edittype = "select";
                                col.formatter = selectFormat;
                                col.unformat = selectUnformat;
                                col.editoptions.value = "";
                                options = col.fwOptions.split(";");
                                $(options).each(function(idx, elem) {
                                    var item = elem.split("=");
                                    if (idx > 0) {
                                        col.editoptions.value += ";"
                                    }
                                    if (item.length > 1) {
                                        col.editoptions.value += item[0] + ":" + elem
                                    } else {
                                        col.editoptions.value += elem + ":" + elem
                                    }
                                });
                                if (col.editable) {
                                    col.editoptions.dataInit = selectInit
                                }
                            } else {
                                if (col.editable) {
                                    col.editoptions.maxlength = size;
                                    if (col.fwPicture) {
                                        dataInit += "$(e).fwPicture({type:'C',picture:'" + col.fwPicture + "'});"
                                    }
                                    col.editoptions.dataInit = eval("(function(e){" + dataInit + "})")
                                }
                            }
                            break;
                        case "N":
                            defaultValue = "1";
                            col.align = "right";
                            if (col.editable) {
                                dataInit += "$(e).fwPicture({type:'N',picture:'" + (col.fwPicture ? col.fwPicture : "9") + "'});";
                                col.editoptions.dataInit = eval("(function(e){" + dataInit + "})")
                            }
                            break;
                        case "D":
                            if (col.editable) {
                                dataInit += "$(e).fwPicture({type:'D',picture:'" + (col.fwPicture ? col.fwPicture : "") + "'});";
                                col.editoptions.dataInit = eval("(function(e){" + dataInit + "})")
                            }
                            break;
                        case "L":
                            defaultValue = "false";
                            col.align = "center";
                            col.edittype = "checkbox";
                            col.formatter = checkboxFormat;
                            col.unformat = checkboxUnformat;
                            if (col.editable) {
                                col.editoptions.value = "T:F";
                                col.editoptions.dataInit = checkbox
                            }
                            break
                    }
                    if (col.fwIncrement) {
                        col.editoptions.defaultValue = eval("(function(){return incrementField.call(this,'" + col.name + "','" + defaultValue + "','" + col.fwType + "')})")
                    }
                    col.width = colWidth(size, mdata.colNames[idx], options, charSize) + addWidth
                }
            });
            $grid.jqGrid($.extend(true, opts, mdata, {
                datastr: data,
                pager: navID
            })).navGrid(navID, $.extend({}, $.fn.fwFormGrid.navGridDefaults, {
                add: insertLine,
                del: deleteLine
            })).on("keydown", function(event) {
                var $t = $(this),
                    selrow = $t.jqGrid("getGridParam", "selrow");
                switch (event.keyCode) {
                    case 38:
                        if (!obrigat.call(this)) {
                            event.stopImmediatePropagation()
                        }
                        break;
                    case 40:
                        if (!obrigat.call(this)) {
                            event.stopImmediatePropagation()
                        } else {
                            if ($("tr:last", this).attr("id") == selrow) {
                                addRow.call(this)
                            }
                        }
                        break;
                    case 46:
                        if (selrow) {
                            delRow.call(this, selrow)
                        }
                        break;
                    default:
                        if (event.keyCode >= 48 && event.keyCode <= 90) {
                            $t.jqGrid("setGridParam", {
                                keyCode: event.keyCode
                            });
                            editCell.call(this)
                        }
                        break
                }
            }).bindKeys({
                onEnter: editCell,
                onLeftKey: function(rowid) {
                    var $t = $(this),
                        iCol = parseInt($t.jqGrid("getGridParam", "iCol"), 10),
                        iRow = parseInt($t.jqGrid("getGridParam", "iRow"), 10);
                    if (!isNaN(iCol) && iCol > 2 && iRow >= 0) {
                        $t.trigger($.Event("click", {
                            target: $("tr:eq(" + iRow + ") td:eq(" + (iCol - 1) + ")", this)
                        }))
                    }
                },
                onRightKey: function(rowid) {
                    var $t = $(this),
                        iCol = parseInt($t.jqGrid("getGridParam", "iCol"), 10),
                        iRow = parseInt($t.jqGrid("getGridParam", "iRow"), 10);
                    if (!isNaN(iCol) && iCol >= 0 && iRow >= 0) {
                        $t.trigger($.Event("click", {
                            target: $("tr:eq(" + iRow + ") td:eq(" + (iCol + 1) + ")", this)
                        }))
                    }
                }
            }).setGridWidth($this.width("99.8%").width()).jqGrid("setGridParam", {
                fwInput: $input
            })
        })
    };
    $.fn.fwFormGrid.defaults = {
        editable: true,
        datatype: "jsonstring",
        hoverrows: false,
        altRows: true,
        altclass: "altrow",
        cellEdit: false,
        cellsubmit: "clientArray",
        editurl: "clientArray",
        pgbuttons: false,
        pginput: false,
        jsonReader: {
            cell: null,
            repeatitems: false
        },
        afterSaveCell: function(rowid, name, content, iRow, iCol) {
            var $t = $(this),
                savedRow = $t.jqGrid("getGridParam", "savedRow");
            $t.jqGrid("getGridParam", "fwInput").val(JSON.stringify($t.jqGrid("getGridParam", "data")));
            $("#" + rowid + " td:eq(" + iCol + ")", $t.focus()).removeClass("ui-state-highlight").addClass("ui-state-active").parent().removeClass("ui-state-hover")
        },
        afterRestoreCell: function(rowid, content, iRow, iCol) {
            $("#" + rowid + " td:eq(" + iCol + ")", $(this).focus()).removeClass("ui-state-highlight").addClass("ui-state-active").parent().removeClass("ui-state-hover")
        },
        beforeEditCell: function(rowid, name, content, iRow, iCol) {
            var $t = $(this),
                c = $t.jqGrid("getGridParam", "iCol"),
                r = $t.jqGrid("getGridParam", "iRow");
            if (iCol != c || iRow != r) {
                cellDeselect.call(this, r, c)
            }
            $("#" + rowid, $t).removeClass("ui-state-hover")
        },
        formatCell: function(rowid, cellname, value, iRow, iCol) {
            var $t = $(this),
                k = $t.jqGrid("getGridParam", "keyCode");
            if (k) {
                value = String.fromCharCode(k);
                $t.jqGrid("setGridParam", {
                    keyCode: null
                })
            }
            return value
        },
        onCellSelect: cellSelect,
        onSelectRow: function(rowid, status, e) {
            var $t = $(this);
            $("#" + rowid, $t).removeClass("ui-state-highlight");
            if (status) {
                var iCol = parseInt($t.jqGrid("getGridParam", "iCol"), 10),
                    iRow = parseInt($t.jqGrid("getGridParam", "iRow"), 10);
                if (!isNaN(iCol) && iCol >= 0 && iRow >= 0 && iRow != $t.getInd(rowid)) {
                    cellSelect.call(this, rowid, iCol)
                }
            }
        },
        ondblClickRow: editCell,
        rowattr: function(rd, cur) {
            var ret = {};
            ret["class"] = rd.deleted == "1" ? "deleted" : "row";
            return ret
        },
        beforeSelectRow: function(rowid, e) {
            var $t = $(this);
            if (rowid !== $t.jqGrid("getGridParam", "selrow")) {
                return obrigat.call(this)
            }
            return true
        },
        onSelectCell: function(rowid, name, content, iRow, iCol) {
            $("#" + rowid + " td:eq(" + iCol + ")", this).removeClass("ui-state-highlight").addClass("ui-state-active").parent().removeClass("ui-state-hover");
            $(this).jqGrid("setGridParam", {
                keyCode: null
            })
        }
    };
    $.fn.fwFormGrid.navGridDefaults = {
        edit: false,
        add: true,
        del: true,
        refresh: false,
        search: false,
        addfunc: addRow,
        delfunc: delRow
    };

    function addRow() {
        var $grid = $(this);
        if ($grid.jqGrid("getGridParam", "editable")) {
            var data = $grid.jqGrid("getGridParam", "data"),
                savedRow = $grid.jqGrid("getGridParam", "savedRow"),
                rowid = "new_row_" + (data.length + 1),
                $t = this;
            if (savedRow.length > 0) {
                $grid.jqGrid("saveCell", savedRow[0].id, savedRow[0].ic)
            }
            if (!obrigat.call(this)) {
                cellSelect.call(this, $grid.jqGrid("getGridParam", "selrow"), $grid.jqGrid("getGridParam", "iCol"));
                return
            }
            $grid.jqGrid("addRow", {
                position: "last",
                useFormatter: true,
                rowID: rowid
            });

            function scrGrid(iR) {
                var ch = $($t.grid.bDiv)[0].clientHeight,
                    st = $($t.grid.bDiv)[0].scrollTop,
                    rpos = $t.rows[iR].offsetTop,
                    rh = $t.rows[iR].clientHeight;
                if (rpos + rh >= ch + st) {
                    $($t.grid.bDiv)[0].scrollTop = rpos - (ch + st) + rh + st
                } else {
                    if (rpos < ch + st) {
                        if (rpos < st) {
                            $($t.grid.bDiv)[0].scrollTop = rpos
                        }
                    }
                }
            }
            scrGrid(data.length);
            cellSelect.call(this, rowid, 2);
            $grid.jqGrid("setSelection", rowid)
        }
    }

    function obrigat(rowid) {
        var $t = $(this),
            ret = true;
        if ($t.jqGrid("getGridParam", "editable")) {
            var ind = $t.getInd(rowid ? rowid : $t.jqGrid("getGridParam", "selrow"));
            if (ind) {
                var data = $t.jqGrid("getGridParam", "data"),
                    colModel = $t.jqGrid("getGridParam", "colModel");
                ind--;
                if (data[ind]["deleted"] == "0") {
                    $(colModel).each(function(idx, col) {
                        if (col.fwObrigat && fwEmpty(data[ind][col.name])) {
                            alert($.jgrid.format($.fwText.obrigat, $t.jqGrid("getGridParam", "colNames")[idx], col.name));
                            ret = false;
                            return false
                        }
                    })
                }
            }
        }
        return ret
    }

    function cellSelect(rowid, iCol) {
        var $t = $(this);
        var savedRow = $t.jqGrid("getGridParam", "savedRow");
        var s = {
            cellEdit: false
        };
        var iRow = $t.getInd(rowid);
        var c = parseInt($t.jqGrid("getGridParam", "iCol"), 10),
            r = parseInt($t.jqGrid("getGridParam", "iRow"), 10);
        if (savedRow.length > 0) {
            $t.jqGrid("saveCell", savedRow[0].id, savedRow[0].ic)
        }
        if (isNaN(c) || c != iCol || r != iRow) {
            if (!isNaN(c)) {
                cellDeselect.call(this, r, c)
            }
            $("#" + rowid + " td:eq(" + iCol + ")", $t).addClass("ui-state-active cell-selected");
            s.iCol = iCol;
            s.iRow = iRow
        }
        $t.jqGrid("setGridParam", s)
    }

    function cellDeselect(iRow, iCol) {
        $("tr:eq(" + iRow + ") td:eq(" + iCol + ")", this).removeClass("edit-cell ui-state-highlight dirty-cell ui-state-active cell-selected")
    }

    function delRow(rowid) {
        var $t = $(this);
        if ($t.jqGrid("getGridParam", "editable")) {
            var ind = $t.getInd(rowid);
            var data = $t.jqGrid("getGridParam", "data");
            var savedRow = $t.jqGrid("getGridParam", "savedRow");
            if (savedRow.length > 0) {
                $t.jqGrid("saveCell", savedRow[0].id, savedRow[0].ic)
            }
            if (ind) {
                if (data[ind - 1].deleted == "0") {
                    data[ind - 1].deleted = "1";
                    $("#" + rowid, $t).addClass("deleted").find("td").addClass("not-editable-cell")
                } else {
                    data[ind - 1].deleted = "0";
                    $("#" + rowid, $t).removeClass("deleted").find("td").removeClass("not-editable-cell")
                }
                $t.jqGrid("getGridParam", "fwInput").val(JSON.stringify(data))
            }
        }
    }

    function editCell() {
        var $t = $(this),
            iCol = parseInt($t.jqGrid("getGridParam", "iCol"), 10),
            iRow = parseInt($t.jqGrid("getGridParam", "iRow"), 10);
        if ($t.jqGrid("getGridParam", "editable") && !isNaN(iCol) && iCol >= 0 && iRow >= 0) {
            $t.jqGrid("setGridParam", {
                cellEdit: true
            });
            try {
                $t.jqGrid("editCell", iRow, iCol, true)
            } catch (_) {}
        }
    }

    function textArea(e) {
        $(e).on("keydown", function(event) {
            if (event.keyCode == 13) {
                event.stopImmediatePropagation()
            }
        })
    }

    function select() {
        var $obj = $(this);
        $obj.unbind("focus").fwCombo({
            mainClass: "select",
            textClass: "select-text"
        })
    }

    function selectInit(obj) {
        $(obj).focus(function() {
            select.call(this)
        })
    }

    function selectFormat(cellvalue, options, rowObject) {
        if (!cellvalue) {
            return ""
        }
        var v = ret = cellvalue;
        try {
            $(options.colModel.editoptions.value.split(";")).each(function(i, e) {
                var arr = e.split(":");
                if (cellvalue == arr[0]) {
                    arr = arr[1].split("=");
                    if (arr.length > 1) {
                        ret = arr[1];
                        v = arr[0]
                    } else {
                        v = ret = arr[0]
                    }
                }
            })
        } catch (e) {
            v = ret = cellvalue
        }
        return "<span value='" + v + "'>" + ret + "</span>"
    }

    function selectUnformat(cellvalue, options, cell) {
        return $("span", cell).first().attr("value")
    }

    function checkbox(obj) {
        var _this = this;
        $(obj).change(function() {
            cellSelect.call(_this, _this.p.selrow, _this.p.iCol);
            return false
        })
    }

    function checkboxFormat(cellvalue, options, rowObject) {
        if (!cellvalue) {
            cellvalue = "F"
        }
        if (cellvalue == "T") {
            return '<div class="ui-state-default ui-corner-all" title=".ui-icon-check" style="width:16px;height:16px;display:inline-block;zoom:1;*display:inline;margin-top:3px"><span class="ui-icon ui-icon-check" value="T"><span style="display:none">T</span></span></div>'
        }
        return '<div class="ui-state-default ui-corner-all" title=".ui-icon-check" style="width:16px;height:16px;display:inline-block;zoom:1;*display:inline;margin-top:3px"><span value="F"><span style="display:none">F</span></span></div>'
    }

    function checkboxUnformat(cellvalue, options, cell) {
        if (cellvalue) {
            return cellvalue
        }
        return ""
    }

    function incrementField(field, initValue, fieldType) {
        var value, data, pos = -1;
        if (this.p.records == 0) {
            return initValue.toString()
        }
        data = $(this).getRowData();
        $(this.p.colModel).each(function(i) {
            if (this.name === field) {
                pos = i;
                return false
            }
        });
        if (pos >= 0) {
            value = data[data.length - 1][field];
            switch (fieldType) {
                case "C":
                    return fwSoma1(value);
                case "N":
                    return ((new Number(value)).valueOf() + 1).toString();
                case "D":
                    value = fwCtoD(value);
                    value.setDate(value.getDate() + 1);
                    return fwDtoC(value);
                case "L":
                    "false"
            }
        }
        return ""
    }

    function colWidth(fieldSize, title, options, chr) {
        var size = Math.max(fieldSize, $.trim(title).length),
            str = "";
        if (options && options.length > 0) {
            $(options).each(function(i, e) {
                var arr = e.split("=");
                if (arr.length > 1) {
                    size = Math.max(size, $.trim(arr[1]).length)
                }
            })
        }
        if (!chr) {
            chr = "A"
        }
        for (var i = 0; i < size; i++) {
            str += chr
        }
        if (!document.getElementById("fw-grid-width")) {
            $("body").append('<div class="fw-grid ui-state-default ui-th-column ui-th-ltr" style="visibility: hidden; white-space: nowrap;"><span class="ui-jqgrid-view" id="fw-grid-width"/></div>')
        }
        return $("#fw-grid-width").html(str).width()
    }
})(jQuery); /*! TOTVS ADVPL Picture */
(function(a) {
    a.fn.fwPicture = function(b) {
        return this.each(function() {
            var c = a(this),
                g = b.picture,
                k;
            c.data("fwPictureType", b.type);
            var j, e;
            if (!g) {
                var h = c.metadata();
                g = h ? h.picture : ""
            }
            if (g) {
                var l = false,
                    f = false;
                if (g.substring(0, 1) == "@") {
                    g += " ";
                    picArr = g.split("");
                    for (j = 1; j < picArr.length; j++) {
                        if (picArr[j] == " ") {
                            break
                        }
                        switch (picArr[j].toUpperCase()) {
                            case "!":
                                l = true;
                                break;
                            case "S":
                                break;
                            case "E":
                                f = true;
                                break;
                            case "D":
                                break;
                            case "R":
                                break
                        }
                    }
                    g = a.trim(g.substring(j + 1, g.length))
                }
            } else {
                g = ""
            }
            switch (b.type) {
                case "N":
                    e = {
                        aSep: ",",
                        aDec: ".",
                        vMax: "9",
                        vMin: "-9",
                        dGroup: 3,
                        wEmpty: "zero"
                    };
                    if (g.length > 0) {
                        k = g;
                        e.vMax = g.replace(/,/g, "");
                        e.vMin = "-" + e.vMax;
                        var d = g.lastIndexOf(".");
                        if (d > 0) {
                            g = g.substring(0, d)
                        }
                        picArr = g.split(",");
                        d = picArr.length - 1;
                        for (j = 4; j >= 2; j--) {
                            if ((new RegExp("9{" + j + "}").test(picArr[d]))) {
                                e.dGroup = j;
                                break
                            }
                        }
                    } else {
                        k = "9"
                    }
                    if (f) {
                        e.aSep = ".";
                        e.aDec = ","
                    }
                    c.autoNumeric(e).css("text-align", "right").autoNumericSet(c.val());
                    break;
                case "C":
                    if (g.length > 0) {
                        k = g;
                        c.mask("?" + g, {
                            uppercase: l
                        })
                    } else {
                        k = fwReplicate("W", c.attr("maxlength"));
                        if (l) {
                            c.mask("?" + fwReplicate("X", c.attr("maxlength")), {
                                uppercase: l
                            })
                        }
                    }
                    break;
                case "D":
                    g = fwSetDate.replace(/[mMdDyY]/g, "9");
                    k = g;
                    e = {
                        dateFormat: fwSetDate.toLowerCase()
                    };
                    if (f) {
                        picArr = fwSetDate.split("");
                        if (picArr[0] == "m" && picArr[1] == "m") {
                            picArr[0] = picArr[1] = "d";
                            picArr[3] = picArr[4] = "m";
                            e.dateFormat = picArr.join("")
                        }
                    }
                    c.mask(g, {
                        uppercase: l
                    });
                    if (!c.attr("readonly")) {
                        c.datepicker(e)
                    }
                    break;
                default:
                    if (g.length > 0) {
                        c.mask(g, {
                            uppercase: l
                        })
                    }
                    break;
                    if (c.attr("readonly")) {
                        c.unbind().die().off().attr("readonly", true)
                    }
                    if (k) {
                        $body = a("body");
                        $div = a("<div/>").copyCSS(c).html(k).css("width", "");
                        $body.append($div);
                        width = $div.width();
                        $div.remove();
                        if (width > $body.width()) {
                            width = $body.width() - (c.outerWidth(true) - c.width());
                            parents = c.parents();
                            for (j = 0; j < parents.length; j++) {
                                $parent = a(parents[j]);
                                width -= $parent.outerWidth(true) - $parent.width()
                            }
                        }
                        c.width(width)
                    }
            }
        })
    };
    a.fn.copyCSS = function(b) {
        var h = a(b).get(0);
        var k = {};
        var d, c;
        if (window.getComputedStyle) {
            var f = function(l, i) {
                return i.toUpperCase()
            };
            if (d = window.getComputedStyle(h, null)) {
                var m, e;
                if (d.length) {
                    for (var j = 0, g = d.length; j < g; j++) {
                        c = d[j];
                        m = c.replace(/\-([a-z])/, f);
                        e = d.getPropertyValue(c);
                        k[m] = e
                    }
                } else {
                    for (c in d) {
                        m = c.replace(/\-([a-z])/, f);
                        e = d.getPropertyValue(c) || d[c];
                        k[m] = e
                    }
                }
                return this.css(k)
            }
        }
        if (d = h.currentStyle) {
            for (c in d) {
                k[c] = d[c]
            }
            return this.css(k)
        }
        if (d = h.style) {
            for (c in d) {
                if (typeof d[c] != "function") {
                    k[c] = d[c]
                }
            }
        }
        return this.css(k)
    }
})(jQuery); /*! TOTVS classe FwSerialize*/
fwDeserializer = function(b) {
    var a = {};
    var c = $("OBJECT:first", b);
    if (c) {
        arrDeserialize = function(d) {
            $("VALUES:first", this).children().each(function(j, m) {
                var h = $(m);
                if (h.is("VLR")) {
                    switch (h.attr("t")) {
                        case "E":
                            break;
                        case "A":
                            d.push([]);
                            arrDeserialize.call(m, d[d.length - 1]);
                            break;
                        case "C":
                            d.push($("v", m).text());
                            break;
                        case "N":
                            d.push(parseFloat($("v", m).text()));
                            break;
                        case "L":
                            d.push($("v", m).text() == ".T.");
                            break;
                        case "U":
                            d.push(null);
                            break;
                        case "D":
                            var g = $("v", m).text().split("/");
                            var l = $("f", m).text().split("");
                            var n = new Date();
                            for (var j = 0; j < l.length; j++) {
                                if (fwEmpty(g[j])) {
                                    n = null;
                                    break
                                }
                                switch (l[j]) {
                                    case "D":
                                        n.setDate(g[j]);
                                        break;
                                    case "M":
                                        n.setMonth(parseInt(g[j]) - 1);
                                        break;
                                    case "Y":
                                        if (g[j].length == 2) {
                                            g[j] = n.getFullYear().toString().substr(0, 2) + g[j]
                                        }
                                        n.setYear(g[j]);
                                        break
                                }
                            }
                            d.push(n);
                            break;
                        default:
                            var k = $("OBJECT:first", m);
                            if (k.is("OBJECT")) {
                                d.push({});
                                objDeserialize.call(k, d[d.length - 1])
                            } else {
                                d.push(null)
                            }
                            break
                    }
                }
            })
        };
        objDeserialize = function(d) {
            $(this).children().each(function(j, l) {
                if ($(l).is("D")) {
                    var g = $(l).attr("n");
                    switch ($(l).attr("t")) {
                        case "A":
                            d[g] = [];
                            arrDeserialize.call(l, d[g]);
                            break;
                        case "C":
                            d[g] = $("v", l).text();
                            break;
                        case "N":
                            d[g] = parseFloat($("v", l).text());
                            break;
                        case "L":
                            d[g] = $("v", l).text() == ".T.";
                            break;
                        case "D":
                            var h = $("v", l).text().split("/");
                            var k = $("f", l).text().split("");
                            var m = new Date();
                            for (var j = 0; j < k.length; j++) {
                                if (fwEmpty(h[j])) {
                                    m = null;
                                    break
                                }
                                switch (k[j]) {
                                    case "D":
                                        m.setDate(h[j]);
                                        break;
                                    case "M":
                                        m.setMonth(parseInt(h[j]) - 1);
                                        break;
                                    case "Y":
                                        m.setYear(h[j]);
                                        break
                                }
                            }
                            d.push(m);
                            break;
                        case "U":
                        default:
                            d[g] = null;
                            break
                    }
                }
            })
        };
        objDeserialize.call(c, a)
    }
    return a
}; /*! TOTVS LookUp */
(function($) {
    $.fn.fwLookUp = function(p) {
        if (typeof(p) == "string") {
            var fn = $.jgrid.getAccessor($.fn.fwLookUp, p);
            if (!fn) {
                throw ("fwLookUp - No such method: " + p)
            }
            var args = $.makeArray(arguments).slice(1);
            return fn.apply(this, args)
        }
        return this.each(function() {
            var $this = $(this),
                $msg = $('<div id="fw-lookup-dialog-msg"><p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span><span id="fw-lookup-msg"></span></p></div>');
            $this.parent("body").append('<div id="fw-lookup-wait"><p><span class="fw-wait"></span><span>' + $.fwText.wait + "</span></p></div>");
            fwLookUp = $.extend(fwLookUp, p);
            if (!fwLookUp.ws) {
                fwLookUp.ws = new fwWsLookUp(fwLookUp.url, fwLookUp.keyLogin)
            }
            $this.parent("body").append($msg);
            $msg.dialog({
                autoOpen: false,
                resizable: false,
                height: 415,
                width: 600,
                modal: true,
                buttons: {
                    Ok: function() {
                        if (fwLookUp.msgClose) {
                            window.close()
                        } else {
                            $(this).dialog("close")
                        }
                    }
                },
                open: function() {
                    $("#fw-lookup-wait").hide();
                    $("#fw-lookup-msg").html($.fwText.lookUpError + "<br/><br/><strong>" + fwLookUp.msg + "</strong>")
                }
            });
            $this.dialog({
                autoOpen: false,
                resizable: false,
                height: 415,
                width: 600,
                modal: true,
                closeOnEscape: false,
                buttons: [{
                    text: "OK",
                    click: function() {
                        fwLookUp.getreturn()
                    }
                }, {
                    text: $.fwText.cancel,
                    click: function() {
                        window.close()
                    }
                }],
                open: function() {
                    $("#fw-lookup-wait").hide();
                    $("#fw-lookup-grid").jqGrid("setGridWidth", $("#fw-lookup").width())
                },
                draggable: false,
                position: {
                    my: "left top",
                    at: "left top",
                    of: "window"
                }
            });
            $("#fw-lookup-btnseek").button().click(function() {
                fwLookUp.seek($("#fw-lookup-seek").val())
            });
            $("#fw-lookup-index").fwCombo().change(function() {
                var value = $("option:selected", this).val();
                fwLookUp.ws.setIndex(value, null, showMsg);
                fwLookUp.load(eval(value) - 1)
            })
        })
    };
    $.fn.fwLookUp.open = function(key) {
        return this.each(function() {
            fwLookUp.seektext = $.trim($(this).val());
            fwLookUp.elem = $(this);
            if (fwLookUp.struct) {
                fwLookUp.index = 0;
                $("#fw-lookup-grid").jqGrid("clearGridData").setGridParam({
                    page: 1
                }).trigger("reloadGrid")
            }
            fwLookUp.ws.getStruct(fwLookUp.key, function(struct) {
                var $index = $("#fw-lookup-index");
                fwLookUp.struct = struct;
                fwLookUp.index = 0;
                fwLookUp.data = null;
                $index.empty();
                $(struct.AINDEXSEARCH).each(function(i, e) {
                    $index.append('<option value="' + eval(e[1]) + '">' + $.trim(e[3]) + "</option>")
                });
                $index.fwCombo("update");
                fwLookUp.load(0);
                document.title = struct.CTITLE;
                $("#fw-lookup").dialog("open")
            }, function(message) {
                fwLookUp.msgClose = true;
                showMsg(message)
            })
        })
    };
    $.fwLookUpSettings = function(url, keyLogin) {
        fwLookUp.ws = new fwWsLookUp(url, keyLogin)
    };
    fwLookUp = {
        ws: null,
        key: null,
        struct: null,
        index: 0,
        data: null,
        field: null,
        form: null,
        msgClose: false,
        msg: "",
        module: 0
    };
    fwLookUp.load = function(index) {
        var data = this.struct;
        var colNames = new Array();
        var colModel = new Array();
        this.index = index;
        $(data.AINDEXSEARCH[index][4]).each(function(i, col) {
            colNames[i] = $.trim(col.CDESCRI);
            colModel[i] = {
                name: $.trim(i.toString()),
                index: $.trim(i.toString()),
                width: colWidth(col)
            };
            if (col.CDICTYPE == "N") {
                colModel[i].align = "right";
                colModel[i].formatter = col.NDECIMAL == 0 ? "integer" : "number"
            } else {
                if (col.AINFOS.length > 0) {
                    colModel[i].AINFOS = col.AINFOS;
                    colModel[i].formatter = function(cellvalue, options, rowObject) {
                        if (!cellvalue) {
                            return ""
                        }
                        var ret = cellvalue;
                        try {
                            $(options.colModel.AINFOS).each(function(i, e) {
                                var arr = e.split("=");
                                if (cellvalue == arr[0]) {
                                    ret = arr.length > 1 ? arr[1] : arr[0];
                                    return false
                                }
                            })
                        } catch (e) {
                            ret = cellvalue
                        }
                        return $.trim(ret)
                    }
                }
            }
        });
        $("#fw-lookup-grid").jqGrid("clearGridData").jqGrid("GridUnload");
        $("#fw-lookup-grid").jqGrid({
            cmTemplate: {
                sortable: false,
                fixed: true,
                editable: false
            },
            hoverrows: false,
            altRows: true,
            altclass: "altrow",
            height: 230,
            colNames: colNames,
            colModel: colModel,
            pager: "#fw-lookup-nav",
            pginput: false,
            rowNum: 10,
            width: 570,
            datatype: function(postdata) {
                if (fwLookUp.seektext && fwLookUp.seektext.length > 0) {
                    fwLookUp.ws.seek(fwLookUp.seektext, function(recno) {
                        if (recno > 0) {
                            fwLookUp.ws.getPage(recno, 0, postdata.rows, fwLookUp.memVar, fwLookUp.module, function(data) {
                                fwLookUp.page(data)
                            }, showMsg)
                        } else {
                            fwLookUp.skip("first", postdata)
                        }
                    }, showMsg)
                } else {
                    fwLookUp.skip("first", postdata)
                }
            },
            onPaging: function(pgButton) {
                fwLookUp.skip(pgButton, $(this).getGridParam("postData"));
                return "stop"
            }
        }).bindKeys()
    };
    fwLookUp.skip = function(pgButton, postdata) {
        var recno = null,
            skip = 0;
        if (pgButton.match(/^first/)) {
            recno = 0;
            skip = 0
        } else {
            if (pgButton.match(/^last/)) {
                if (this.data && !this.data.LEOF) {
                    recno = -1;
                    skip = -(postdata.rows - 1)
                }
            } else {
                if (pgButton.match(/^next/)) {
                    if (this.data && !this.data.LEOF) {
                        recno = this.data.ALINES[this.data.ALINES.length - 1][1];
                        skip = 1
                    }
                } else {
                    if (pgButton.match(/^prev/)) {
                        recno = this.data.ALINES[0][1];
                        skip = -postdata.rows
                    }
                }
            }
        }
        if (recno != null) {
            fwLookUp.ws.getPage(recno, skip, postdata.rows, fwLookUp.memVar, fwLookUp.module, function(data) {
                fwLookUp.page(data)
            }, showMsg)
        }
    };
    fwLookUp.page = function(data) {
        var $grid = $("#fw-lookup-grid"),
            lines = "",
            $struct = $(this.struct.AINDEXSEARCH[this.index][4]);
        this.data = data;
        $(data.ALINES).each(function(j, e) {
            var line = "",
                value;
            $struct.each(function(i) {
                if (i > 0) {
                    line += ","
                }
                if (e[0][i] instanceof Date) {
                    value = fwDtoC(e[0][i], opener.window.fwSetDate == undefined ? "dd/mm/yyyy" : opener.window.fwSetDate)
                } else {
                    if (e[0][i] == null) {
                        value = ""
                    } else {
                        value = e[0][i]
                    }
                }
                line += '"' + $.trim(value) + '"'
            });
            if (j > 0) {
                lines += ","
            }
            lines += '{"id":"' + (j + 1) + '","cell":[' + line + "]}"
        });
        $grid.jqGrid("clearGridData");
        $grid[0].addJSONData(eval('({"total":"3","page":"2","records":"' + data.ALINES.length + '","rows":[' + lines + "]})"))
    };
    fwLookUp.callback = function(lines) {
        if (window.opener && !window.opener.closed) {
            var next = 0,
                name = this.field,
                $document = $(window.opener.document);
            var $input = $document.find('input[name="' + this.field + '"]').first();
            if (!$input.attr("readonly")) {
                fwLookUp.setValue($input.get(), lines[0][0]);
                $document.find("input").each(function(i, e) {
                    var $e = $(e);
                    if ($e.attr("name") == name) {
                        next = 1
                    } else {
                        if (next > 0) {
                            if (next >= lines.length) {
                                return false
                            }
                            fwLookUp.setValue(e, lines[next][0]);
                            next++
                        }
                    }
                })
            }
        }
    };
    fwLookUp.setValue = function(e, v) {
        var value;
        if (v instanceof Date) {
            value = fwDtoC(v, opener.window.fwSetDate == undefined ? "dd/mm/yyyy" : opener.window.fwSetDate)
        } else {
            if (v == null) {
                value = ""
            } else {
                value = v
            }
        }
        if (opener.window.fwSetValue != undefined) {
            opener.window.fwSetValue(e, value)
        } else {
            $(e).val(value)
        }
    };
    fwLookUp.getreturn = function() {
        if (window.opener && !window.opener.closed) {
            var $grid = $("#fw-lookup-grid"),
                selrow = $grid.jqGrid("getGridParam", "selrow"),
                ind = 0;
            if (selrow) {
                ind = $grid.jqGrid("getInd", selrow) - 1;
                if (ind >= 0) {
                    this.ws.getReturn(this.data.ALINES[ind][1], function(data) {
                        if (data.ALINES && data.ALINES.length > 0) {
                            fwLookUp.callback(data.ALINES)
                        }
                        window.close()
                    }, showMsg)
                }
            }
        }
    };
    fwLookUp.seek = function(text) {
        if ($.trim(text) != "") {
            fwLookUp.ws.seek(text, function(recno) {
                if (recno > 0) {
                    fwLookUp.ws.getPage(recno, 0, $("#fw-lookup-grid").jqGrid("getGridParam", "postData").rows, fwLookUp.memVar, fwLookUp.module, function(data) {
                        fwLookUp.page(data)
                    }, showMsg)
                }
            }, showMsg)
        }
    };

    function showMsg(message) {
        fwLookUp.msg = message;
        $("#fw-lookup-dialog-msg").dialog("open")
    }

    function colWidth(col) {
        var size = Math.max(eval(col.NSIZE), $.trim(col.CTITLE).length),
            str = "";
        if (col.AINFOS.length > 0) {
            $(col.AINFOS).each(function(i, e) {
                var arr = e.split("=");
                if (arr.length > 1) {
                    size = Math.max(size, $.trim(arr[1]).length)
                }
            })
        }
        for (var i = 0; i < size; i++) {
            str += "A"
        }
        return $("#fw-lookup-width").html(str).width()
    }
})(jQuery); /*! TOTVS LookUp Web Service*/
function fwWsLookUp(b, a) {
    this.url = b;
    this.keyLogin = a
}
fwWsLookUp.prototype.getStruct = function(a, b, d) {
    var c = this;
    if (this.token == "") {
        this.wsMethodCall(this.stringFormat(this.messages.login, [this.keyLogin]), "LOGIN", {
            success: function(f, e, g) {
                if (f.error && f.error.length > 0) {
                    if ($.isFunction(d)) {
                        d.call(this, f.error)
                    }
                } else {
                    c.token = f.result;
                    c.wsMethodCall(c.stringFormat(c.messages.getStruct, [c.token, a]), "GETSTRUCT", {
                        success: function(i, h, j) {
                            if (i.error && i.error.length > 0) {
                                if ($.isFunction(d)) {
                                    d.call(this, i.error)
                                }
                            } else {
                                if ($.isFunction(b)) {
                                    var k = Base64.decode(i.result);
                                    b.call(this, fwDeserializer($.parseXML(k)))
                                }
                            }
                        }
                    })
                }
            }
        })
    } else {
        this.wsMethodCall(this.stringFormat(this.messages.getStruct, [this.token, a]), "GETSTRUCT", {
            success: function(f, e, g) {
                if (f.error && f.error.length > 0) {
                    if ($.isFunction(d)) {
                        d.call(this, f.error)
                    }
                } else {
                    if ($.isFunction(b)) {
                        var h = Base64.decode(f.result);
                        b.call(this, fwDeserializer($.parseXML(h)))
                    }
                }
            }
        })
    }
};
fwWsLookUp.prototype.getPage = function(f, d, a, h, b, c, g) {
    var e = this;
    if (this.token != "") {
        this.wsMethodCall(this.stringFormat(this.messages.getPage, [this.token, f, d, a, h, b]), "GETPAGE2EX", {
            success: function(j, i, k) {
                if (j.error && j.error.length > 0) {
                    if ($.isFunction(g)) {
                        g.call(this, j.error)
                    }
                } else {
                    if ($.isFunction(c)) {
                        var l = Base64.decode(j.result);
                        c.call(this, fwDeserializer($.parseXML(l)))
                    }
                }
            }
        })
    }
};
fwWsLookUp.prototype.getReturn = function(c, a, d) {
    var b = this;
    if (this.token != "") {
        this.wsMethodCall(this.stringFormat(this.messages.getReturn, [this.token, c]), "GETRETURN", {
            success: function(f, e, g) {
                if (f.error && f.error.length > 0) {
                    if ($.isFunction(d)) {
                        d.call(this, f.error)
                    }
                } else {
                    if ($.isFunction(a)) {
                        var h = Base64.decode(f.result);
                        a.call(this, fwDeserializer($.parseXML(h)))
                    }
                }
            }
        })
    }
};
fwWsLookUp.prototype.seek = function(a, b, d) {
    var c = this;
    if (this.token != "") {
        this.wsMethodCall(this.stringFormat(this.messages.seek, [this.token, a]), "SEEK", {
            success: function(f, e, g) {
                if (f.error && f.error.length > 0) {
                    if ($.isFunction(d)) {
                        d.call(this, f.error)
                    }
                } else {
                    if ($.isFunction(b)) {
                        b.call(this, f.result)
                    }
                }
            }
        })
    }
};
fwWsLookUp.prototype.setIndex = function(a, b, d) {
    var c = this;
    if (this.token != "") {
        this.wsMethodCall(this.stringFormat(this.messages.setIndex, [this.token, a]), "SETINDEX", {
            success: function(f, e, g) {
                if (f.error && f.error.length > 0) {
                    if ($.isFunction(d)) {
                        d.call(this, f.error)
                    }
                } else {
                    if ($.isFunction(b)) {
                        b.call(this, f.result)
                    }
                }
            }
        })
    }
};
fwWsLookUp.prototype.wsMethodCall = function(c, b, a) {
    if ($.trim(this.url).length > 0) {
        $.ajax($.extend({
            url: this.url,
            dataType: "jsonp",
            data: "soapaction=" + b + "&param=" + c,
            crossDomain: true,
            timeout: 30000
        }, a))
    }
};
fwWsLookUp.prototype.stringFormat = function(e, a) {
    var d = e;
    for (var b = 0; b < a.length; b++) {
        var c = new RegExp("\\{" + b + "\\}", "gi");
        d = d.replace(c, a[b])
    }
    return d
};
fwWsLookUp.prototype.keyLogin = "";
fwWsLookUp.prototype.url = "";
fwWsLookUp.prototype.token = "";
fwWsLookUp.prototype.messages = {
    login: '{"KEYLOGIN":"{0}"}',
    getStruct: '{"TOKEN":"{0}","CKEY":"{1}"}',
    getPage: '{"TOKEN":"{0}","NRECNOINI":{1},"NSKIP":{2},"NLINES":{3},"CMEMVAR":"{4}","NMODULE":{5}}',
    getReturn: '{"TOKEN":"{0}","NRECNOINI":{1}}',
    seek: '{"TOKEN":"{0}","CKEY":"{1}"}',
    setIndex: '{"TOKEN":"{0}","CINDEX":"{1}"}'
};

function StringBuffer() {
    this.buffer = []
}
StringBuffer.prototype.append = function append(a) {
    this.buffer.push(a);
    return this
};
StringBuffer.prototype.toString = function toString() {
    return this.buffer.join("")
};
var Base64 = {
    codex: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(c) {
        var a = new StringBuffer();
        var b = new Utf8EncodeEnumerator(c);
        while (b.moveNext()) {
            var j = b.current;
            b.moveNext();
            var h = b.current;
            b.moveNext();
            var f = b.current;
            var i = j >> 2;
            var g = ((j & 3) << 4) | (h >> 4);
            var e = ((h & 15) << 2) | (f >> 6);
            var d = f & 63;
            if (isNaN(h)) {
                e = d = 64
            } else {
                if (isNaN(f)) {
                    d = 64
                }
            }
            a.append(this.codex.charAt(i) + this.codex.charAt(g) + this.codex.charAt(e) + this.codex.charAt(d))
        }
        return a.toString()
    },
    decode: function(c) {
        var b = new StringBuffer();
        var f = new Base64DecodeEnumerator(c);
        while (f.moveNext()) {
            var a = f.current;
            if (a < 128) {
                b.append(String.fromCharCode(a))
            } else {
                if ((a > 191) && (a < 224)) {
                    f.moveNext();
                    var e = f.current;
                    b.append(String.fromCharCode(((a & 31) << 6) | (e & 63)))
                } else {
                    f.moveNext();
                    var e = f.current;
                    f.moveNext();
                    var d = f.current;
                    b.append(String.fromCharCode(((a & 15) << 12) | ((e & 63) << 6) | (d & 63)))
                }
            }
        }
        return b.toString()
    }
};

function Utf8EncodeEnumerator(a) {
    this._input = a;
    this._index = -1;
    this._buffer = []
}
Utf8EncodeEnumerator.prototype = {
    current: Number.NaN,
    moveNext: function() {
        if (this._buffer.length > 0) {
            this.current = this._buffer.shift();
            return true
        } else {
            if (this._index >= (this._input.length - 1)) {
                this.current = Number.NaN;
                return false
            } else {
                var a = this._input.charCodeAt(++this._index);
                if ((a == 13) && (this._input.charCodeAt(this._index + 1) == 10)) {
                    a = 10;
                    this._index += 2
                }
                if (a < 128) {
                    this.current = a
                } else {
                    if ((a > 127) && (a < 2048)) {
                        this.current = (a >> 6) | 192;
                        this._buffer.push((a & 63) | 128)
                    } else {
                        this.current = (a >> 12) | 224;
                        this._buffer.push(((a >> 6) & 63) | 128);
                        this._buffer.push((a & 63) | 128)
                    }
                }
                return true
            }
        }
    }
};

function Base64DecodeEnumerator(a) {
    this._input = a;
    this._index = -1;
    this._buffer = []
}
Base64DecodeEnumerator.prototype = {
    current: 64,
    moveNext: function() {
        if (this._buffer.length > 0) {
            this.current = this._buffer.shift();
            return true
        } else {
            if (this._index >= (this._input.length - 1)) {
                this.current = 64;
                return false
            } else {
                var g = Base64.codex.indexOf(this._input.charAt(++this._index));
                var f = Base64.codex.indexOf(this._input.charAt(++this._index));
                var e = Base64.codex.indexOf(this._input.charAt(++this._index));
                var d = Base64.codex.indexOf(this._input.charAt(++this._index));
                var c = (g << 2) | (f >> 4);
                var b = ((f & 15) << 4) | (e >> 2);
                var a = ((e & 3) << 6) | d;
                this.current = c;
                if (e != 64) {
                    this._buffer.push(b)
                }
                if (d != 64) {
                    this._buffer.push(a)
                }
                return true
            }
        }
    }
};