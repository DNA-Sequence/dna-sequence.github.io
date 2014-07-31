var ObjectOpenAlign = function () {
};

ObjectOpenAlign.Align = function () {
};

ObjectOpenAlign.Align.prototype = {
    name: "",
    connect: null,
    node: null,
    nodeBack: null,
    dataRetorn: null,
    result: null
};

ObjectOpenAlign.listAlign = new Array();
ObjectOpenAlign.nodes = null;
ObjectOpenAlign.alignCurrent = null;

ObjectOpenAlign.openAlign = function (id) {
    if (localStorage.matrixAligns) {
        return JSON.parse(localStorage.matrixAligns)[parseInt(id, 10)];
    }
};

ObjectOpenAlign.createAreaPossibility = function () {
    var possibilityResult = document.getElementById('possibilityResult');
    possibilityResult.appendChild(this.createFieldPossibility([ 'N', 'W', 'NW' ], "1: "));
    possibilityResult.appendChild(this.createFieldPossibility([ 'W', 'N', 'NW' ], "2: "));
    possibilityResult.appendChild(this.createFieldPossibility([ 'N', 'NW', 'W' ], "3: "));
    possibilityResult.appendChild(this.createFieldPossibility([ 'W', 'NW', 'N' ], "4: "));
    possibilityResult.appendChild(this.createFieldPossibility([ 'NW', 'N', 'W' ], "5: "));
    possibilityResult.appendChild(this.createFieldPossibility([ 'NW', 'W', 'N' ], "6: "));
};

ObjectOpenAlign.createFieldPossibility = function (connect, text) {
    var htmlP = document.createElement("p");
    htmlP.innerHTML = text;
    var align = this.createAlign(connect, text);

    htmlP.onclick = function () {
        EventOpenAlign.clickFieldPossibility(align);
    };

    setTimeout(function () {
        var data = ProcessOpenAlign.alignPossibility(connect);
        align.result = data;
        htmlP.innerHTML = htmlP.innerHTML + "Score=" + data.score;
    }, 0);

    return htmlP;
};

ObjectOpenAlign.createAlign = function (connect, name) {
    var align = new this.Align();
    align.connect = connect;
    align.name = name;
    this.listAlign.push(align);
    return align;
};

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

    $('svg').attr("width", (40 + (this.nodes.length * 10)));
    $('svg').attr("height", (100 + (this.nodes[0].length * 10)));

    $('svg').attr("vwidth", this.nodes.length);
    $('svg').attr("vheight", this.nodes[0].length);

    for (i = 0; i < sequenceA.length; i++) {
        htmlSVG += '<text class="textSeqA" vx=' + i + ' x="' + (20 + ((i + 1) * 10)) + '" y="10" width="8" height="8" >' + sequenceA[i] + '</text>';
    }

    for (i = 0; i < sequenceB.length; i++) {
        htmlSVG += '<text class="textSeqB" vy=' + i + ' x="5" y="' + (30 + ((i + 1) * 10)) + '" width="8" height="8" >' + sequenceB[i] + '</text>';
    }

    for (i = 0; i < this.nodes.length; i++) {
        for (var j = 0; j < this.nodes[i].length; j++) {

            if (this.nodes[i][j].candidate) {
                htmlSVG += '<rect onclick="EventOpenAlign.clickElementRect(this)" class="alignCandidate" cand="true" vx="' + i + '" vy="' + j + '" x="' + (20 + (i * 10)) + '" y="' + (20 + (j * 10)) + '" />';
                htmlSVG += '<text onclick="EventOpenAlign.clickElementText(this)" class="valueTextCandidate" vx="' + i + '" vy="' + j + '" x="' + (20 + (i * 10)) + '" y="' + (25 + (j * 10)) + '" width="10" height="10" >' + this.nodes[i][j].value + '</text>';
            } else {
                htmlSVG += '<rect onclick="EventOpenAlign.clickElementRect(this)" class="noAlign" cand="false" vx="' + i + '" vy="' + j + '" x="' + (20 + (i * 10)) + '" y="' + (20 + (j * 10)) + '"  />';
                htmlSVG += '<text onclick="EventOpenAlign.clickElementText(this)" class="valueText" vx="' + i + '" vy="' + j + '" x="' + (20 + (i * 10)) + '" y="' + (25 + (j * 10)) + '" width="10" height="10" >' + this.nodes[i][j].value + '</text>';
            }
        }
    }

    $("#test").append(this.parseSVG(htmlSVG));

    $('text').css('font', '10px sans-serif;');

    EventOpenAlign.scaleMatrix(20);

};

ObjectOpenAlign.parseSVG = function (s) {
    var div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + s + '</svg>';
    var frag = document.createDocumentFragment();
    while (div.firstChild.firstChild) {
        frag.appendChild(div.firstChild.firstChild);
    }
    return frag;
};

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

ObjectOpenAlign.verifyNode = function (rect) {
    var align = this.alignCurrent;

    if (rect) {
        var x = rect.getAttribute("vx");
        var y = rect.getAttribute("vy");

        var node = this.nodes[x][y];

        align.dataRetorn = ProcessOpenAlign.calculation.nodeVicinity(align.dataRetorn, align.nodeBack, node);
        align.nodeBack = node;
    }

    var nodesC = align.dataRetorn.arrayNode;

    var nodesAlign = align.dataRetorn.arrayNodeAlign;

    $("rect[cand='true']").attr('class', 'alignCandidate');

    $("#tableResult").html(ObjectOpenAlign.mountTableResult(align.dataRetorn.sbSeqA.toString(), align.dataRetorn.sbSeqB.toString()));

    for (var i = 0; i < nodesC.length; i++) {
        var nodeC = nodesC[i];
        $("rect[vx=" + nodeC.x + "][vy=" + nodeC.y + "]").attr('class', 'alignCandidateSelect');
    }

    for (i = 0; i < nodesAlign.length; i++) {
        var nodeAlign = nodesAlign[i];
        $("rect[vx=" + nodeAlign.x + "][vy=" + nodeAlign.y + "]").attr('class', 'alignSelect');
    }

    EventOpenAlign.resetScrollMatrix();
};

var EventOpenAlign = {

};

EventOpenAlign.clickFieldPossibility = function (align) {
    $("rect[cand='true']").attr('class', 'alignCandidate');

    for (var i = 0; i < align.result.nodes.length; i++) {
        var node = align.result.nodes[i];
        // $("rect[vx=" + node.x + "][vy=" + node.y + "]").attr('fill', cor);
        $("rect[vx=" + node.x + "][vy=" + node.y + "]").attr('class', 'align');

    }

    $("#tableResult").html(ObjectOpenAlign.mountTableResult(align.result.resultSequenceA, align.result.resultSequenceB));

    $("#matrix").height("100%");
    $("#matrix").height($("#matrix").height() - $(".menuDown").height() - $(".menuUp").height());

};

EventOpenAlign.scaleMatrix = function (value) {
    $('svg').each(function () {
        $(this).attr("width", (40 + ($(this).attr('vwidth') * value))).attr("height", (100 + ($(this).attr('vheight') * value)));
    });

    $("rect").each(function () {
        var i = $(this).attr('vx');
        var j = $(this).attr('vy');
        $(this).attr('width', value).attr('height', value).attr('x', (20 + (i * value))).attr('y', (20 + (j * value)));
    });

    $(".valueText,.valueTextCandidate").each(function () {
        var i = $(this).attr('vx');
        var j = $(this).attr('vy');

        var w = 20 + (value / 2);

        $(this).attr('x', (w - 5 + (i * value))).attr('y', ((w + 5) + (j * value)));
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

    $(".valueTextCandidate").hide();
    $(".valueText").hide();
    if (value >= 20) {
        $(".valueTextCandidate").show();
    }

    $('text').css('font', value + 'px sans-serif;');
};

EventOpenAlign.clickElementText = function (ele) {
    this.clickElementRect($("rect[vx=" + ele.getAttribute("vx") + "][vy=" + ele.getAttribute("vy") + "]")[0]);
};

EventOpenAlign.clickElementRect = function (ele) {

    if ($(ele).is(".alignCandidateSelect")) {
        $(".alignCandidateSelect").attr("class", "alignCandidate");
        $(ele).attr("class", "alignSelect");
        ObjectOpenAlign.verifyNode(ele);
    }

};

EventOpenAlign.clickPossibilityManual = function () {

    var p = document.createElement("p");
    p.innerHTML = "Manual " + (ObjectOpenAlign.listAlign.length + 1) + ": ";

    var align = new ObjectOpenAlign.Align();
    align.name = p.innerHTML;
    ObjectOpenAlign.listAlign.push(align);

    p.onclick = function () {
        ObjectOpenAlign.alignCurrent = align;
        ObjectOpenAlign.verifyNode(null);

//        clickPossibilityResult(align);
//        clickPossibilityManual(align);
    };

    setTimeout(function () {

        ObjectOpenAlign.alignCurrent = align;

        var outputAlign = ProcessOpenAlign.calculation.getOutputAlign();

        var nodes = outputAlign.matrixs[0].nodes;

        if (ProcessOpenAlign.calculation.methodSequencing === dna.MethodSequencing.GLOBAL) {
            var node = nodes[nodes.length - 1][nodes[0].length - 1];
            align.nodeBack = node;

            var rect = $("rect[vx=" + node.x + "][vy=" + node.y + "]").attr('class', 'alignSelect');

            ObjectOpenAlign.verifyNode(rect[0]);

        } else if (ProcessOpenAlign.calculation.methodSequencing === dna.MethodSequencing.LOCAL) {
            var node = null;

            for (var i = 0; i < nodes.length; i++) {
                node = nodes[i][nodes[0].length - 1];
                $("rect[vx=" + node.x + "][vy=" + node.y + "]").attr('class', 'alignCandidateSelect');
            }

            for (var i = 0; i < nodes[0].length; i++) {
                node = nodes[nodes.length - 1][i];
                $("rect[vx=" + node.x + "][vy=" + node.y + "]").attr('class', 'alignCandidateSelect');
            }

        }

    }, 0);

    var possibilityResult = document.getElementById('possibilityResult');
    possibilityResult.appendChild(p);

};

EventOpenAlign.resetScrollMatrix = function (){
    $("#col-matrix").toggleClass("col-md-9");
    if ($(this).is(":hidden")) {
        $("#matrix").width($(".row").width() - 20);
    } else {
        $("#matrix").width(widthDefault);
    }
};


var ProcessOpenAlign = {

};

ProcessOpenAlign.calculation = null;

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

ProcessOpenAlign.startProcess = function () {
    var hash = window.location.hash;
    hash = hash.replace("#", "");
    var inputAlignResult = ObjectOpenAlign.openAlign(hash);

    delete inputAlignResult.date;

//    this.methodSequencing = inputAlignResult.methodSequencing;

    console.log(JSON.stringify(inputAlignResult));

    this.calculation = dna.CalculationFactory.createCalculation(inputAlignResult);
    this.calculation.calculationNode();
    this.calculation.findAligns();

    var data = this.calculation.getOutputAlign();
    console.log(data);
    ObjectOpenAlign.createMatrix(data);
    localStorage.matrix = JSON.stringify(data);
};

function start() {
//	clearInterval(refreshIntervalStart);
    ObjectOpenAlign.createAreaPossibility();
    ProcessOpenAlign.startProcess();

    $(".valueScale").click(function () {
        EventOpenAlign.scaleMatrix($(this).val());
    });

    $("#btnBACK").click(function () {
        history.back();
    });

    $("#matrix").height("100%");
    $("#matrix").height($("#matrix").height() - $(".menuDown").height() - $(".menuUp").height());

}

$(function () {
    var widthDefault = $("#matrix").width();

    $("#btnScore").click(function () {
        $("#possibilityResult").toggle(function () {
            EventOpenAlign.resetScrollMatrix();
        });
    });

    $('link[href*="clean"]').remove();

    setTimeout(function () {
        start();
    }, 0);

    $(".alignCandidateSelect").click(function () {
        console.log("Testes" + this);
    });

});

i18n.init(function (t) {
    $("body").i18n();
});