/**
 *
 * @type {widthDefault}
 */
var widthDefault = null;

/**
 *
 * @constructor
 */
var ObjectOpenAlign = function () {
};


/**
 * @type {Align}
 */
ObjectOpenAlign.Align = function () {
};

/**
 *
 * @type {{name: string, connect: null, node: null, nodeBack: null, dataRetorn: null, result: null}}
 */
ObjectOpenAlign.Align.prototype = {
    name: "",
    connect: null,
    node: null,
    nodeBack: null,
    dataRetorn: null,
    result: null
};

/**
 *
 * @type {Array}
 */
ObjectOpenAlign.listAlign = new Array();
/**
 *
 * @type {dna.OutputResultAlign.nodes}
 */
ObjectOpenAlign.nodes = null;
/**
 *
 * @type {ObjectOpenAlign.Align}
 */
ObjectOpenAlign.alignCurrent = null;

/**
 *
 * @param id
 * @returns {dna.OutputResultAlign}
 */
ObjectOpenAlign.openAlign = function (id) {
    if (localStorage.matrixAligns) {
        return JSON.parse(localStorage.matrixAligns)[parseInt(id, 10)];
    }
};

/**
 * @description createAreaPossibility
 */
ObjectOpenAlign.createAreaPossibility = function () {
    var possibilityResult = document.getElementById('possibilityResult');
    possibilityResult.appendChild(this.createFieldPossibility([ 'N', 'W', 'NW' ], "up-left-diagonal: "));
    possibilityResult.appendChild(this.createFieldPossibility([ 'W', 'N', 'NW' ], "left-up-diagonal: "));
    possibilityResult.appendChild(this.createFieldPossibility([ 'N', 'NW', 'W' ], "up-diagonal-left: "));
    possibilityResult.appendChild(this.createFieldPossibility([ 'W', 'NW', 'N' ], "left-diagonal-up: "));
    possibilityResult.appendChild(this.createFieldPossibility([ 'NW', 'N', 'W' ], "diagonal-up-left: "));
    possibilityResult.appendChild(this.createFieldPossibility([ 'NW', 'W', 'N' ], "diagonal-left-up: "));
};


/**
 *
 * @param connect
 * @param text
 * @returns {HTMLElement|*}
 */
ObjectOpenAlign.createFieldPossibility = function (connect, text) {
    var htmlP = document.createElement("p");
    htmlP.innerHTML = text;
    var align = this.createAlign(connect, text);

    htmlP.onclick = function () {
        EventOpenAlign.elementManualCurrent = null;
        EventOpenAlign.clickFieldPossibility(align);
    };

    setTimeout(function () {
        var data = ProcessOpenAlign.alignPossibility(connect);
        align.result = data;
        htmlP.innerHTML = htmlP.innerHTML + "Score=" + data.score;
    }, 0);

    return htmlP;
};

/**
 *
 * @param connect
 * @param name
 * @returns {ObjectOpenAlign.Align}
 */
ObjectOpenAlign.createAlign = function (connect, name) {
    var align = new this.Align();
    align.connect = connect;
    align.name = name;
    this.listAlign.push(align);
    return align;
};

/**
 *
 * @param {dna.OutputResultAlign}
 */
ObjectOpenAlign.createMatrix = function (data) {
    var matrix = null;

    if (data.matrixs && data.matrixs[0]) {
        matrix = data.matrixs[0];
    } else {
        matrix = data;
    }

    this.nodes = matrix.nodes;

    var sequenceA = matrix.sequenceA;
    var sequenceB = matrix.sequenceB;

    var htmlSVG = "";

    $('#matrix svg').attr("width", (40 + (this.nodes.length * 10)));
    $('#matrix svg').attr("height", (100 + (this.nodes[0].length * 10)));

    $('#matrix svg').attr("vwidth", this.nodes.length);
    $('#matrix svg').attr("vheight", this.nodes[0].length);

    for (i = 0; i < sequenceA.length; i++) {
        htmlSVG += '<text class="textSeqA" vx=' + i + ' x="' + (20 + ((i + 1) * 10)) + '" y="15" width="8" height="8" >' + sequenceA[i] + '</text>';
    }

    for (i = 0; i < sequenceB.length; i++) {
        htmlSVG += '<text class="textSeqB" vy=' + i + ' x="5" y="' + (30 + ((i + 1) * 10)) + '" width="8" height="8" >' + sequenceB[i] + '</text>';
    }

    for (i = 0; i < this.nodes.length; i++) {
        for (var j = 0; j < this.nodes[i].length; j++) {

            if (this.nodes[i][j].candidate) {
                htmlSVG += '<rect onclick="EventOpenAlign.clickElementRect(this)" class="noAlign" cand="true" vx="' + i + '" vy="' + j + '" x="' + (20 + (i * 10)) + '" y="' + (20 + (j * 10)) + '" />';
                htmlSVG += '<text onclick="EventOpenAlign.clickElementText(this)" class="valueTextCandidate" vx="' + i + '" vy="' + j + '" x="' + (20 + (i * 10)) + '" y="' + (25 + (j * 10)) + '" width="10" height="10" >' + this.nodes[i][j].value + '</text>';
            } else {
                htmlSVG += '<rect onclick="EventOpenAlign.clickElementRect(this)" class="noAlign" cand="false" vx="' + i + '" vy="' + j + '" x="' + (20 + (i * 10)) + '" y="' + (20 + (j * 10)) + '"  />';
                htmlSVG += '<text onclick="EventOpenAlign.clickElementText(this)" class="valueText" vx="' + i + '" vy="' + j + '" x="' + (20 + (i * 10)) + '" y="' + (25 + (j * 10)) + '" width="10" height="10" >' + this.nodes[i][j].value + '</text>';
            }
        }
    }

    $("#test").append(this.parseSVG(htmlSVG));

    $('#matrix svg text').css('font', '10px sans-serif;');

    EventOpenAlign.scaleMatrix(40);

};

/**
 *
 * @param s
 * @returns {DocumentFragment|*}
 */
ObjectOpenAlign.parseSVG = function (s) {
    var div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + s + '</svg>';
    var frag = document.createDocumentFragment();
    while (div.firstChild.firstChild) {
        frag.appendChild(div.firstChild.firstChild);
    }
    return frag;
};

/**
 *
 * @param resultSequenceA
 * @param resultSequenceB
 * @returns {string}
 */
ObjectOpenAlign.mountTableResult = function (resultSequenceA, resultSequenceB) {
    var htmlStr = "";
    htmlStr += "<tbody>";
    htmlStr += "<tr>";
    var i = 0;
    for (i = 0; i < resultSequenceA.length; i++) {
        htmlStr += "<td>";
        htmlStr += resultSequenceA[i];
        htmlStr += "</td>";
    }
    htmlStr += "</tr>";

    htmlStr += "<tr>";
    i = 0;
    for (i = 0; i < resultSequenceA.length; i++) {
        htmlStr += "<td>";
        htmlStr += resultSequenceB[i];
        htmlStr += "</td>";
    }
    htmlStr += "</tr>";

    htmlStr += "</tbody>";

    return htmlStr;
};

/**
 *
 * @param rect
 */
ObjectOpenAlign.verifyNode = function (rect, openManual) {
    var align = this.alignCurrent;

    if (rect) {
        var x = rect.getAttribute("vx");
        var y = rect.getAttribute("vy");

        var node = this.nodes[x][y];

        if (ProcessOpenAlign.calculation.methodSequencing === dna.MethodSequencing.LOCAL || ProcessOpenAlign.calculation.methodSequencing === dna.MethodSequencing.SEMIGLOBAL) {
            if (!align.nodeBack) {
                align.nodeBack = node;
            }
        }

        align.dataRetorn = ProcessOpenAlign.calculation.nodeVicinity(align.dataRetorn, align.nodeBack, node);
        align.nodeBack = node;
    } else {
        if(!openManual){
            align.dataRetorn = ProcessOpenAlign.calculation.nodeVicinity(align.dataRetorn, null, null);
        }
    }


    var nodesC = null;

    if (align.dataRetorn.arrayNode) {
        nodesC = align.dataRetorn.arrayNode;
    }


    var nodesAlign = null;

    if (align.dataRetorn.arrayNodeAlign) {
        nodesAlign = align.dataRetorn.arrayNodeAlign;
    }

    $("#matrix rect").attr('class', 'noAlign');
    $("#matrix rect[cand='true']").attr('class', 'alignCandidate');


    $("#tableResult").html(ObjectOpenAlign.mountTableResult(align.dataRetorn.sbSeqA.toString(), align.dataRetorn.sbSeqB.toString()));

    if (nodesC) {
        for (var i = 0; i < nodesC.length; i++) {
            var nodeC = nodesC[i];
            $("#matrix rect[vx=" + nodeC.x + "][vy=" + nodeC.y + "]").attr('class', 'alignCandidateSelect');
        }
    }

    if (nodesAlign) {
        for (i = 0; i < nodesAlign.length; i++) {
            var nodeAlign = nodesAlign[i];
            $("#matrix rect[vx=" + nodeAlign.x + "][vy=" + nodeAlign.y + "]").attr('class', 'alignSelect');
        }
    }


    $(rect).attr('class', 'alignSelectNow');

    EventOpenAlign.updateScoreManual(align.dataRetorn.score);

    EventOpenAlign.resetScrollMatrix();
};

/**
 *
 * @param element
 */
ObjectOpenAlign.openDetailRect = function (element) {
    var x = element.getAttribute("vx");
    var y = element.getAttribute("vy");

    console.log(this.nodes[x][y]);

    var node = this.nodes[x][y];

    var nodeDetail = ProcessOpenAlign.calculation.nodeDetail(node);


    $('#DetailNode').html(node.value);
    if (nodeDetail.nodeW) {
        $('#DetailNodeW').html(nodeDetail.nodeW.value);
    }
    if (nodeDetail.nodeN) {
        $('#DetailNodeN').html(nodeDetail.nodeN.value);
    }
    if (nodeDetail.nodeNW) {
        $('#DetailNodeNW').html(nodeDetail.nodeNW.value);
    }

    $('#DetailConnectN').hide();
    $('#DetailConnectNW').hide();
    $('#DetailConnectW').hide();

    $('#DetailCalcN').html(nodeDetail.nodeCalcN);
    $('#DetailCalcNW').html(nodeDetail.nodeCalcNW);
    $('#DetailCalcW').html(nodeDetail.nodeCalcW);


    $('#DetailSumN').html(nodeDetail.nodeSumN);
    $('#DetailSumNW').html(nodeDetail.nodeSumNW);
    $('#DetailSumW').html(nodeDetail.nodeSumW);

    $('#DetailSeqA').html(node.charSeqA);
    $('#DetailSeqB').html(node.charSeqB);





    for (var i = 0; i < node.connected.length; i++) {
        $('#DetailConnect' + node.connected[i]).show();
    }

    $('#pageDetailRec').modal({
        show: true,
        keyboard: true
    });

};

/**
 *
 * @constructor
 */
var EventOpenAlign = {

};

/**
 *
 * @type {HTMLElement|*}
 */
EventOpenAlign.elementManualCurrent = null;

/**
 * updateScoreManual
 */
EventOpenAlign.updateScoreManual = function (score) {

    if (this.elementManualCurrent) {
        var num = this.elementManualCurrent.getAttribute('num');
        this.elementManualCurrent.setAttribute('score', score);

        this.elementManualCurrent.innerHTML = "Manual " + num + ": " + score;
    }
}

/**
 *
 * @param {dna.OutputResultAlign}
 */
EventOpenAlign.clickFieldPossibility = function (align) {
    $("#matrix rect[cand='true']").attr('class', 'alignCandidate');

    for (var i = 0; i < align.result.nodes.length; i++) {
        var node = align.result.nodes[i];
        // $("#matrix rect[vx=" + node.x + "][vy=" + node.y + "]").attr('fill', cor);
        $("#matrix rect[vx=" + node.x + "][vy=" + node.y + "]").attr('class', 'align');

    }

    $("#tableResult").html(ObjectOpenAlign.mountTableResult(align.result.resultSequenceA, align.result.resultSequenceB));

    $("#matrix").height($('body').height() - $(".menuDown").height() - $(".menuUp").height() - 80);
    $("#matrix").width($('body').width() - 260);

};

/**
 *
 * @param value
 */
EventOpenAlign.scaleMatrix = function (value) {
    $('#matrix svg').each(function () {
        $(this).attr("width", (40 + ($(this).attr('vwidth') * value))).attr("height", (100 + ($(this).attr('vheight') * value)));
    });

    $("#matrix rect").each(function () {
        var i = $(this).attr('vx');
        var j = $(this).attr('vy');
        $(this).attr('width', value).attr('height', value).attr('x', (20 + (i * value))).attr('y', (20 + (j * value)));

    });

    $(".valueText,.valueTextCandidate").each(function () {
        var i = $(this).attr('vx');
        var j = $(this).attr('vy');

        var w = 20 + (value / 2);

        $(this).attr('width', value).attr('height', value).attr('x', (20 + (i * value) + (value / 2))).attr('y', ((w + 5) + (j * value)));

//        $(this).attr('width', value).attr('height', value).attr('x', (w - 5 + (i * value))).attr('y', ((w + 5) + (j * value)));
    });

    $(".textSeqA").each(function () {
        var i = parseInt($(this).attr('vx'), 10);
        var w = 15 + (value / 2);

        $(this).attr('x', (w + ((i + 1) * value)));
    });

    $(".textSeqB").each(function () {
        var j = parseInt($(this).attr('vy'), 10);

        var w = 25 + (value / 2);

        $(this).attr('y', (w + ((j + 1) * value)));
    });

//    $(".valueTextCandidate").hide();
//    $(".valueText").hide();
//    if (value >= 20) {
//        $(".valueTextCandidate").show();
//    }


    $('#matrix svg text').css('font', value + 'px sans-serif;');
    $('.valueTextCandidate').css('font-size', value / 2);
    $('.valueText').css('font-size', value / 2);


    $("#matrix Text").undelegate("dblclick").dblclick(function () {
        try {
            ObjectOpenAlign.openDetailRect($("#matrix rect[vx=" + this.getAttribute("vx") + "][vy=" + this.getAttribute("vy") + "]")[0]);
        } catch (e) {
        }
    });

    $("#matrix rect").undelegate("dblclick").dblclick(function () {
        ObjectOpenAlign.openDetailRect(this);
    });
};

/**
 *
 * @param {HTMLElement}
 */
EventOpenAlign.clickElementText = function (ele) {

    this.clickElementRect($("#matrix rect[vx=" + ele.getAttribute("vx") + "][vy=" + ele.getAttribute("vy") + "]")[0]);
};

/**
 *
 * @param {HTMLElement}
 */
EventOpenAlign.clickElementRect = function (ele) {

    if ($(ele).is(".alignCandidateSelect")) {
        $(".alignSelectNow").attr("class", "alignSelect");
        $(".alignCandidateSelect").attr("class", "alignCandidate");
        $(ele).attr("class", "alignSelectNow");
        ObjectOpenAlign.verifyNode(ele, false);
    }

};

/**
 * @description clickPossibilityManual
 */
EventOpenAlign.clickPossibilityManual = function () {

    var p = document.createElement("p");
    p.setAttribute('num', (ObjectOpenAlign.listAlign.length + 1));
    p.setAttribute('score', 0);

    p.innerHTML = "Manual " + (ObjectOpenAlign.listAlign.length + 1) + ": 0";

    var align = new ObjectOpenAlign.Align();
    align.name = p.innerHTML;
    ObjectOpenAlign.listAlign.push(align);
    EventOpenAlign.elementManualCurrent = p;
    $("#matrix rect").attr('class', 'noAlign');
    $("#matrix rect[cand='true']").attr('class', 'alignCandidate');


    p.onclick = function () {
        EventOpenAlign.elementManualCurrent = p;
        ObjectOpenAlign.alignCurrent = align;
        ObjectOpenAlign.verifyNode(null, true);
    };

    setTimeout(function () {

        ObjectOpenAlign.alignCurrent = align;

        var outputAlign = ProcessOpenAlign.calculation.getOutputAlign();

        var nodes = outputAlign.matrixs[0].nodes;

        if (ProcessOpenAlign.calculation.methodSequencing === dna.MethodSequencing.GLOBAL) {
            var node = nodes[nodes.length - 1][nodes[0].length - 1];
            align.nodeBack = node;

            var rect = $("#matrix rect[vx=" + node.x + "][vy=" + node.y + "]").attr('class', 'alignSelectNow');

            ObjectOpenAlign.verifyNode(rect[0], false);

        } else if (ProcessOpenAlign.calculation.methodSequencing === dna.MethodSequencing.LOCAL) {
            var node = null;

            for (var i = 0; i < nodes.length; i++) {
                node = nodes[i][nodes[0].length - 1];
                $("#matrix rect[vx=" + node.x + "][vy=" + node.y + "]").attr('class', 'alignCandidateSelect');
            }

            for (var i = 0; i < nodes[0].length; i++) {
                node = nodes[nodes.length - 1][i];
                $("#matrix rect[vx=" + node.x + "][vy=" + node.y + "]").attr('class', 'alignCandidateSelect');
            }
        } else if (ProcessOpenAlign.calculation.methodSequencing === dna.MethodSequencing.SEMIGLOBAL) {
            var node = null;
            ObjectOpenAlign.verifyNode();
        }

        var elemMatrix = document.getElementById('matrix');

        elemMatrix.scrollTop = elemMatrix.scrollHeight;
        elemMatrix.scrollLeft = elemMatrix.scrollWidth;

    }, 0);

    var possibilityResult = document.getElementById('possibilityResult');
    possibilityResult.appendChild(p);

};

/**
 * @description resetScrollMatrix
 */
EventOpenAlign.resetScrollMatrix = function () {
    if ($(this).is(":hidden")) {
        $("#matrix").width($(".row").width() - 20);
    } else {
        $("#matrix").width(widthDefault);
    }

    var elemMatrix = $("#matrix")[0];
    var eScrollTop = elemMatrix.scrollTop;
    var eScrollLeft = elemMatrix.scrollLeft;

    $("#matrix").height($('body').height() - $(".menuDown").height() - $(".menuUp").height() - 80);
    $("#matrix").width($('body').width() - 260);

    elemMatrix.scrollTop = eScrollTop;
    elemMatrix.scrollLeft = eScrollLeft;
};

/**
 *
 * @param mouseEvent
 * @returns {boolean}
 */
EventOpenAlign.oncontextmenu = function (mouseEvent) {
    var element = mouseEvent.toElement;

    if (!element) {
        element = mouseEvent.target;
    }

    if (element.tagName === 'text') {
        try {
            ObjectOpenAlign.openDetailRect($("#matrix rect[vx=" + element.getAttribute("vx") + "][vy=" + element.getAttribute("vy") + "]")[0]);
        } catch (e) {
        }
        return false;
    } else if (element.tagName === 'rect') {
        ObjectOpenAlign.openDetailRect(element);
        return false;
    }

    return true;
};

/**
 *  @description getParameterCss
 */
EventOpenAlign.getParameterCss = function () {

    $.get(
        'hbs/parameterCss.hbs',
        function (script) {
            var template = Handlebars.compile(script);

            if (localStorage.parameterCss) {
                $('#parameterCss').remove();
                $('head').append(template(JSON.parse(localStorage.parameterCss)));
                $('#idParameter').html(JSON.stringify(JSON.parse(localStorage.parameterCss), null, 4));
            } else {
                $.getJSON(
                    'json/parameterCss.json',
                    function (json) {
                        $('#parameterCss').remove();
                        localStorage.parameterCss = JSON.stringify(json);
                        $('head').append(template(json));
                        $('#idParameter').html(json);
                    }
                );
            }

        }
    );

};

/**
 *
 * @param script
 */
EventOpenAlign.salveParameterCss = function (script) {

    localStorage.parameterCss = script;

    this.getParameterCss();
};

/**
 *
 * @constructor
 */
var ProcessOpenAlign = {

};

/**
 *
 * @type {dna.Calculation}
 */
ProcessOpenAlign.calculation = null;

/**
 *
 * @param connect
 * @returns {dna.OutputResultAlign}
 */
ProcessOpenAlign.alignPossibility = function (connect) {
    var hash = window.location.hash;
    hash = hash.replace("#", "");

    var matrix = JSON.parse(localStorage.matrix);

    var alignGlobal = new dna.InputResultAlign();

    alignGlobal.idMatrix = parseInt(hash, 10);
    alignGlobal.matrix = matrix[0];
    alignGlobal.connecteds = connect;

    this.calculation.setInputResultAlign(alignGlobal);
    this.calculation.findAlign();

    var data = this.calculation.getOutputResultAlign();
    console.log(data);
    return data;
};

/**
 *  @description startProcess
 */
ProcessOpenAlign.startProcess = function () {
    var hash = window.location.hash;
    hash = hash.replace("#", "");
    var inputAlignResult = ObjectOpenAlign.openAlign(hash);

    delete inputAlignResult.date;

//    inputAlignResult.arrayMisMatch = new Array();
//    inputAlignResult.arrayMisMatch["A-C"] = 10;


    this.calculation = dna.CalculationFactory.createCalculation(inputAlignResult);
    this.calculation.calculationNode();
    this.calculation.findAligns();

    var data = this.calculation.getOutputAlign();
    ObjectOpenAlign.createMatrix(data);
    localStorage.matrix = JSON.stringify(data);
};


/**
 * @description start
 */
function start() {
    ObjectOpenAlign.createAreaPossibility();
    ProcessOpenAlign.startProcess();

    $(".valueScale").click(function () {
        EventOpenAlign.scaleMatrix($(this).val());
    });

    $("#btnBACK").click(function () {
        history.back();
    });

    $("#matrix").height($('body').height() - $(".menuDown").height() - $(".menuUp").height() - 80);
    $("#matrix").width($('body').width() - 260);

}

$(function () {
    widthDefault = $("#matrix").width();

    $("#btnScore").click(function () {
        $("#possibilityResult").toggle();
    });

    $('link[href*="clean"]').remove();

    setTimeout(function () {
        start();
    }, 0);

    $(".alignCandidateSelect").click(function () {
        console.log("Testes" + this);
    });

    $("#saveNew").click(function () {
        EventOpenAlign.salveParameterCss(JSON.stringify(JSON.parse($("#idParameter").text())));
    });

    document.oncontextmenu = EventOpenAlign.oncontextmenu;
    EventOpenAlign.getParameterCss();
});

/**
 * @description i18n.init
 *
 */
i18n.init(function (t) {
    $("body").i18n();
});