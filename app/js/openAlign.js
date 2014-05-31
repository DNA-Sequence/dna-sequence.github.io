//var urlDefault = "http://localhost:8080/DNA-HTML5/";
var urlDefault = "";

var refreshIntervalStart = null;

function InputResultAlign() {

}

InputResultAlign.prototype = {
	idMatrix : 0,
	matrix : null,
	connecteds : []
};

var dados;

function start() {
	clearInterval(refreshIntervalStart);
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
	possibilityResult.appendChild(appPossibilityResult([ 'N', 'W', 'NW' ], "[ 'N', 'W', 'NW' ]", "#00FF99"));
	possibilityResult.appendChild(appPossibilityResult([ 'W', 'N', 'NW' ], "[ 'W', 'N', 'NW' ]", "#FF0099"));
	possibilityResult.appendChild(appPossibilityResult([ 'N', 'NW', 'W' ], "[ 'N', 'NW', 'W' ]", "#0099FF"));
	possibilityResult.appendChild(appPossibilityResult([ 'W', 'NW', 'N' ], "[ 'W', 'NW', 'N' ]", "#FF9900"));
	possibilityResult.appendChild(appPossibilityResult([ 'NW', 'N', 'W' ], "[ 'NW', 'N', 'W' ]", "#9900FF"));
	possibilityResult.appendChild(appPossibilityResult([ 'NW', 'W', 'N' ], "[ 'NW', 'W', 'N' ]", "#99FF00"));
}

function appPossibilityResult(connect, text, cor) {
	var p = document.createElement("p");
	p.innerHTML = text;
	p.onclick = function() {
		clickPossibilityResult(connect, cor);
	};

	return p;
}

function clickPossibilityResult(connect, cor) {
	$("rect[cand='true']").attr('class', 'alignCandidate');
	openRestAligh(connect, cor);
}

function testAlign(d, cor) {
	for (var i = 0; i < d.nodes.length; i++) {
		var node = d.nodes[i];
		// $("rect[vx=" + node.x + "][vy=" + node.y + "]").attr('fill', cor);
		$("rect[vx=" + node.x + "][vy=" + node.y + "]").attr('class', 'align');

	}
	debugger;
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
	var i = 0;
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

	$('svg') //
	.attr("width", (40 + (jsonmatrix.length * 10))) //
	.attr("height", (100 + (jsonmatrix[0].length * 10))) //
	.attr("vwidth", jsonmatrix.length) //
	.attr("vheight", jsonmatrix[0].length);

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

	// openRestAligh([ "N", "NW", "W" ]);
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

	var data = JSON.parse(DnaGWT.calculationGlobalLocal(JSON.stringify(filter)));
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

function openRestAligh(connecteds, cor) {
	var hash = window.location.hash;
	hash = hash.replace("#", "");

	var matrix = JSON.parse(localStorage.matrix);

	var alignGlobal = new InputResultAlign();

	alignGlobal.idMatrix = parseInt(hash, 10);
	alignGlobal.matrix = matrix[0];
	alignGlobal.connecteds = connecteds;

	var data = JSON.parse(DnaGWT.findAlignGlobal(JSON.stringify(alignGlobal)));
	testAlign(data, cor);

	// $.ajax({
	// contentType : "application/json",
	// dataType : "json",
	// type : "POST",
	// url : urlDefault + "rest/DNA/findAlignGlobal",
	// data : JSON.stringify(alignGlobal),
	// success : function(data) {
	// testAlign(data, cor);
	// // localStorage["matrix"] = JSON.stringify(data);
	// console.log(data);
	// }
	// });

	$("#matrix").height("100%");
	$("#matrix").height($("#matrix").height() - $(".menuDown").height() - $(".menuUp").height());
}

$(function() {
	refreshIntervalStart = setInterval(function() {
		try {
			if (DnaGWT) {
				$('link[href*="clean"]').remove();
				start();
			}

		} catch (e) {
		}
	}, 100);
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
