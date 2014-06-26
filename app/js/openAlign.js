//var urlDefault = "http://localhost:8080/DNA-HTML5/";

var urlDefault = "";

//var refreshIntervalStart = null;

var Align = function(){

};

Align.prototype = {
    name : "",
    connect : null,
    result : null
};

var listAlign = new Array();

var calculation = null;

function start() {
//	clearInterval(refreshIntervalStart);
	mountPossibilityResult();
	openRestJson();

	$(".valueScale").click(function() {
		scaleMatrix($(this).val());
	});

	$("#btnBACK").click(function() {
		history.back();
	});

	$("#matrix").height("100%");
	$("#matrix").height($("#matrix").height() - $(".menuDown").height() - $(".menuUp").height());

}

function mountPossibilityResult() {
	var possibilityResult = document.getElementById('possibilityResult');
	possibilityResult.appendChild(appPossibilityResult([ 'N', 'W', 'NW' ], "1: ", "#00FF99"));
	possibilityResult.appendChild(appPossibilityResult([ 'W', 'N', 'NW' ], "2: ", "#FF0099"));
	possibilityResult.appendChild(appPossibilityResult([ 'N', 'NW', 'W' ], "3: ", "#0099FF"));
	possibilityResult.appendChild(appPossibilityResult([ 'W', 'NW', 'N' ], "4: ", "#FF9900"));
	possibilityResult.appendChild(appPossibilityResult([ 'NW', 'N', 'W' ], "5: ", "#9900FF"));
	possibilityResult.appendChild(appPossibilityResult([ 'NW', 'W', 'N' ], "6: ", "#99ff00"));
}

function appPossibilityResult(connect, text) {
	var p = document.createElement("p");
	p.innerHTML = text;

    var align = new Align();
    align.connect = connect;
    align.name = text;
    listAlign.push(align);

    p.onclick = function() {
        clickPossibilityResult(align);
    };

    setTimeout( function (){
        var data = openRestAligh(connect);
        align.result = data;
        p.innerHTML = p.innerHTML + "Score=" + data.score;
     }, 0);

	return p;
}

function clickPossibilityResult(align) {
	$("rect[cand='true']").attr('class', 'alignCandidate');
	feedsMatrixAlign(align.result);
}

function testAlign(d, cor) {
	for (var i = 0; i < d.nodes.length; i++) {
		var node = d.nodes[i];
		// $("rect[vx=" + node.x + "][vy=" + node.y + "]").attr('fill', cor);
		$("rect[vx=" + node.x + "][vy=" + node.y + "]").attr('class', 'align');

	}

	$("#tableResult").html(mountTableResult(d.resultSequenceA, d.resultSequenceB));
}

function mountTableResult(resultSequenceA, resultSequenceB) {
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
}

function parseSVG(s) {
	var div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
	div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + s + '</svg>';
	var frag = document.createDocumentFragment();
	while (div.firstChild.firstChild) {
		frag.appendChild(div.firstChild.firstChild);
	}
	return frag;
}

function testMatrix(d) {
	var i = 0;
	var jsonmatrix = d.matrixs[0].nodes;

	var sequenceA = d.matrixs[0].sequenceA;
	var sequenceB = d.matrixs[0].sequenceB;

	var htmlSVG = "";

	$('svg').attr("width", (40 + (jsonmatrix.length * 10)));
	$('svg').attr("height", (100 + (jsonmatrix[0].length * 10)));

	$('svg').attr("vwidth", jsonmatrix.length);
	$('svg').attr("vheight", jsonmatrix[0].length);

	for (i = 0; i < sequenceA.length; i++) {
		htmlSVG += '<text class="textSeqA" vx=' + i + ' x="' + (20 + ((i + 1) * 10)) + '" y="10" width="8" height="8" >' + sequenceA[i] + '</text>';
	}

	for (i = 0; i < sequenceB.length; i++) {
		htmlSVG += '<text class="textSeqB" vy=' + i + ' x="5" y="' + (30 + ((i + 1) * 10)) + '" width="8" height="8" >' + sequenceB[i] + '</text>';
	}

	for (i = 0; i < jsonmatrix.length; i++) {
		for (var j = 0; j < jsonmatrix[i].length; j++) {

			if (jsonmatrix[i][j].candidate) {
				htmlSVG += '<rect class="alignCandidate" cand="true" vx="' + i + '" vy="' + j + '" x="' + (20 + (i * 10)) + '" y="' + (20 + (j * 10)) + '" />';
				htmlSVG += '<text class="valueTextCandidate" vx="' + i + '" vy="' + j + '" x="' + (20 + (i * 10)) + '" y="' + (25 + (j * 10)) + '" width="10" height="10" >' + jsonmatrix[i][j].value + '</text>';
			} else {
				htmlSVG += '<rect class="noAlign" cand="false" vx="' + i + '" vy="' + j + '" x="' + (20 + (i * 10)) + '" y="' + (20 + (j * 10)) + '"  />';
				htmlSVG += '<text class="valueText" vx="' + i + '" vy="' + j + '" x="' + (20 + (i * 10)) + '" y="' + (25 + (j * 10)) + '" width="10" height="10" >' + jsonmatrix[i][j].value + '</text>';
			}
		}
	}

	$("#test").append(parseSVG(htmlSVG));

	$('text').css('font', '10px sans-serif;');

	scaleMatrix(20);
}

function scaleMatrix(value) {

	$('svg').each(function() {
		$(this).attr("width", (40 + ($(this).attr('vwidth') * value))).attr("height", (100 + ($(this).attr('vheight') * value)));
	});

	$("rect").each(function() {
		var i = $(this).attr('vx');
		var j = $(this).attr('vy');
		$(this).attr('width', value).attr('height', value).attr('x', (20 + (i * value))).attr('y', (20 + (j * value)));
	});

	$(".valueText,.valueTextCandidate").each(function() {
		var i = $(this).attr('vx');
		var j = $(this).attr('vy');

		var w = 20 + (value / 2);

		$(this).attr('x', (w - 5 + (i * value))).attr('y', ((w + 5) + (j * value)));
	});

	$(".textSeqA").each(function() {
		var i = parseInt($(this).attr('vx'), 10);
		var w = 15 + (value / 2);

		$(this).attr('x', (w + ((i + 1) * value)));
	});

	$(".textSeqB").each(function() {
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
}

function openRestJson() {
	var hash = window.location.hash;
	hash = hash.replace("#", "");
	/** type InputAlignGlobalLocal */
	var filter = openAlign(hash);

	delete filter.date;

	console.log(JSON.stringify(filter));

    calculation = dna.CalculationFactory.createCalculation(filter);
    calculation.calculationNode();
    calculation.findAligns();


//	var data = JSON.parse(DnaGWT.calculationGlobalLocal(JSON.stringify(filter)));

    var data  = calculation.getOutputAlign();
	testMatrix(data);
	localStorage.matrix = JSON.stringify(data);

	// $.ajax({
	// contentType : "application/json",
	// dataType : "json",
	// type : "POST",
	// // url:
	// //
	// "http://www.samuelklein.com.br/DNA-HTML5/rest/DNA/InputAlignGlobalLocal",
	// url : urlDefault + "rest/DNA/InputAlignGlobalLocal",
	// data : JSON.stringify(filter),
	// success : function(data) {
	// testMatrix(data);
	// localStorage.matrix = JSON.stringify(data);
	// }
	// });

}

function feedsMatrixAlign(outputResultAlign){
    testAlign(outputResultAlign);

    $("#matrix").height("100%");
    $("#matrix").height($("#matrix").height() - $(".menuDown").height() - $(".menuUp").height());

}

function openRestAligh(connecteds, cor) {
	var hash = window.location.hash;
	hash = hash.replace("#", "");

	var matrix = JSON.parse(localStorage.matrix);

	var alignGlobal = new dna.InputResultAlign();

	alignGlobal.idMatrix = parseInt(hash, 10);
	alignGlobal.matrix = matrix[0];
	alignGlobal.connecteds = connecteds;

    calculation.setInputResultAlign(alignGlobal);
    calculation.findAlign();

//	var data = JSON.parse(DnaGWT.findAlignGlobal(JSON.stringify(alignGlobal)));
    var data = calculation.getOutputResultAlign();

    return data;
}

$(function() {
    var widthDefault = $("#matrix").width();

    $("#btnScore").click( function(){
        $("#possibilityResult").toggle(function (){
            $("#col-matrix").toggleClass("col-md-9");
            if( $(this).is(":hidden") ) {
                $("#matrix").width($(".row").width() - 20);
            } else {
                $("#matrix").width(widthDefault);
            }
        } );
    } );

    $('link[href*="clean"]').remove();

    setTimeout(function(){
        start();
    } ,0);

//	refreshIntervalStart = setInterval(function() {
//		try {
//			if (DnaGWT) {
//
//			}
//
//		} catch (e) {
//		}
//	}, 100);
	// testeJson();
});

function openAlign(id) {
	if (localStorage.matrixAligns) {
		return JSON.parse(localStorage.matrixAligns)[parseInt(id, 10)];
	}
}

i18n.init(function(t) {
	$("body").i18n();
});
