/*!
 * Dna
 * Copyright 2014.
 * Licensed
 */


var arrayMismatch = {};

/**
 *
 * @param date
 * @returns {string}
 */
function formattedDate(date) {
    var d = new Date(date || Date.now()), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return [ day, month, year ].join('/');
}

$(function () {

    i18n.init(function (t) {
        $("body").i18n();
    });

    $('#btnDELETE').click(function () {
        if ($('#listAlign input:checked:first').val()) {
            $('#listAlign input:checked').each(function () {
                /** type Array */
                var tableAlign = openAlign();
                tableAlign.splice(parseInt($(this).val(), 10), 1);
                refreshList(tableAlign);
            });
        }
    });

    $('#btnOPEN').click(function () {
        if ($('#listAlign input:checked:first').val()) {
            window.location.href = 'openAlign.html#' + $('#listAlign input:checked:first').val();
        }
    });

    $('#btnAdd').click(function () {
//        tableArray
        if ($('#valueA').val() && $('#valueB').val() && $('#arraymismatch').val()) {
            $('#tableArray').append("<tr><td><label>" + $('#valueA').val() + "-" + $('#valueB').val() + "</label></td><td><label>" + $('#arraymismatch').val() + "</label></td></tr>");
            window.arrayMismatch[$('#valueA').val() + "-" + $('#valueB').val()] = parseInt($('#arraymismatch').val());
        }
    });


    $('#saveNew').click(function () {
        /** type Array */
        var tableAlign = openAlign();

        var line = new dna.InputAlignGlobalLocal();
        line.date = formattedDate();
        line.typeElement = $('*[name="radio-type"]:checked').val();
        line.sequenceA = $("#dsSequenceA").val();
        line.sequenceB = $("#dsSequenceB").val();

        line.gap = $("#gap").val();
        line.match = $("#match").val();
        line.misMatch = $("#mismatch").val();

        line.arrayMisMatch = arrayMismatch;

        if ($('#checkGlobal').is(':checked')) {
            line.methodSequencing = "GLOBAL";
            line.id = findNextAlign(tableAlign);
            tableAlign.push(JSON.parse(JSON.stringify(line)));
        }

        if ($('#checkLocal').is(":checked")) {
            line.methodSequencing = "LOCAL";
            line.id = findNextAlign(tableAlign);
            tableAlign.push(JSON.parse(JSON.stringify(line)));
        }

        if ($('#checkSemiGlobal').is(':checked')) {
            line.methodSequencing = "SEMIGLOBAL";
            line.id = findNextAlign(tableAlign);
            tableAlign.push(JSON.parse(JSON.stringify(line)));
        }


        refreshList(tableAlign);
    });

    refreshList();

});

/**
 *
 * @param tableAlignOut
 */
function refreshList(tableAlignOut) {
    if (tableAlignOut) {
        localStorage.removeItem("matrixAligns");
        localStorage.setItem("matrixAligns", JSON.stringify(tableAlignOut));
    }

    var tableAlign = openAlign();
    var htmlAlign = "";
    for (var i = 0; i < tableAlign.length; i++) {

        var line = tableAlign[i];

        htmlAlign += '<tr class="line">';
        htmlAlign += '<td><input type="checkbox" value="' + i + '" enabled=false /></td>';
        htmlAlign += '<td class="valueAlign">' + i + '</td>';
        htmlAlign += '<td>1: ' + line.sequenceA + '<br/>2: ' + line.sequenceB + '</td>';
        htmlAlign += '<td>' + line.date + '</td>';
        htmlAlign += '<td>' + line.methodSequencing + '</td>';
        htmlAlign += '</tr>';
    }

    $('#listAlign').html(htmlAlign);
    $('.line').click(function () {
        $(this).toggleClass('lineSelect');
        $(this).find(":checkbox").each(function () {
            if ($(this).parents('tr').hasClass('lineSelect')) {
                this.checked = true;
            } else {
                this.checked = false;
            }
        });
    });

}

/**
 *
 * @returns {tableAlignOut}
 */
function openAlign() {
    var ret;

    if (localStorage.matrixAligns) {
        ret = JSON.parse(localStorage.matrixAligns);
    } else {
        ret = [];
    }
    return ret;
}

/**
 *
 * @param tableAlign
 * @returns {number}
 */
function findNextAlign(tableAlign) {

    var value;
    var array = [];
    tableAlign.forEach(function (align) {
        array.push(align.id);
    });

    value = Math.max.apply(null, array);

    console.log(value);

    if (value >= 0) {
        return value + 1;
    } else {
        return 0;
    }

}
