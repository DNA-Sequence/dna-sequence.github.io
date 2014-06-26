
//requirejs(["js/libs/prototype.js",
//           "js/dna/beans/enuns.js",
//           "js/dna/beans/InputAlign.js",
//           "js/dna/beans/InputAlignGlobalLocal.js",
//           "js/dna/beans/Matrix.js",
//           "js/dna/beans/Node.js",
//           "js/dna/beans/OutputAlign.js",
//           "js/dna/beans/OutputResultAlign.js",
//           "js/dna/util/StringBuffer.js",
//           "js/dna/formulas/Calculation.js",
//           "js/dna/formulas/AbstractCalculation.js",
//           "js/dna/formulas/CalculationFactory.js",
//           "js/dna/formulas/CalculationGlobal.js",
//           "js/dna/formulas/CalculationLocal.js",
//           "js/dna/formulas/NodeController.js",
//           "js/dna/formulas/OrganizeNode.js"
//    ]);


//function InputAlignGlobalLocal() {
//	this.date = formattedDate();
//}
//
//InputAlignGlobalLocal.prototype = {
//	id : 0,
//	seq : null,
//	sequenceA : null,
//	sequenceB : null,
//	typeElement : null,
//	methodSequencing : null,
//	date : null,
//	gap : null,
//	match : null,
//	misMatch : null
//};

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

$(function() {

    i18n.init(function(t) {
        $("body").i18n();
    });

	$("#gapLocal").hide();
	$("#gapGlobal").hide();

	$('#checkLocal').click(function() {
		if ($(this).is(':checked')) {
			$("#gapLocal").show();
		} else {
			$("#gapLocal").hide();
		}
	});

	$('#btnDELETE').click(function() {
		$('#listAlign input:checked').each(function() {
			/** type Array */
			var tableAlign = openAlign();
			tableAlign.splice(parseInt($(this).val(), 10), 1);
			refreshList(tableAlign);
		});
	});

	$('#btnOPEN').click(function() {
		window.location.href = 'openAlign.html#' + $('#listAlign input:checked:first').val();
	});

	$('#checkGlobal').click(function() {
		if ($(this).is(':checked')) {
			$("#gapGlobal").show();
		} else {
			$("#gapGlobal").hide();
		}
	});

	$('#saveNew').click(function() {
		/** type Array */
		var tableAlign = openAlign();

		var line = new dna.InputAlignGlobalLocal();
        line.date = formattedDate();
		line.typeElement = $('*[name="radio-type"]:checked').val();
		line.sequenceA = $("#dsSequenceA").val();
		line.sequenceB = $("#dsSequenceB").val();

		if ($('#checkGlobal').is(':checked')) {
			line.methodSequencing = "GLOBAL";
			line.gap = $("#Ggap").val();
			line.match = $("#Gmatch").val();
			line.misMatch = $("#Gmismatch").val();
			line.id = findNextAlign(tableAlign);
			tableAlign.push(JSON.parse(JSON.stringify(line)));
		}

		if ($('#checkLocal').is(":checked")) {
			line.methodSequencing = "LOCAL";
			line.gap = $("#Lgap").val();
			line.match = $("#Lmatch").val();
			line.misMatch = $("#Lmismatch").val();
			line.id = findNextAlign(tableAlign);
			tableAlign.push(JSON.parse(JSON.stringify(line)));
		}

		refreshList(tableAlign);
	});

	refreshList();

});

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
	$('.line').click(function() {
		$(this).toggleClass('lineSelect');
		$(this).find(":checkbox").each(function() {
			if ($(this).parents('tr').hasClass('lineSelect')) {
				this.checked = true;
			} else {
				this.checked = false;
			}
		});
	});

}

function openAlign() {
	var ret;

	if (localStorage.matrixAligns) {
		ret = JSON.parse(localStorage.matrixAligns);
	} else {
		ret = [];
	}
	return ret;
}

function findNextAlign(tableAlign) {

    var value;
	var array = [];
	tableAlign.forEach(function(align) {
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
