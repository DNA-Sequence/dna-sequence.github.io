/**
 * Created by samuel on 17/06/14.
 */
if (!window.dna) window.dna = {};

(function( window ) {

    var Connected = window.dna.Connected;

    var CalculationGlobal = new Class({
        Extends : window.dna.AbstractCalculation,
        initialize: function(_inputAlign){
            this.parent(_inputAlign);
            this.calculationNodeGlobal = calculationNodeGlobal;
        },
        calculationNode : calculationNode,
        findAligns : findAligns
    });

//    CalculationGlobal.implement({
//        calculationNode : calculationNode,
//        findAligns : findAligns
//    });

    function calculationNode() {
        this.parent();

        var nodes = this.getOutputAlign().matrixs[0].nodes;

        for (var i = 0; i < nodes.length; i++) {
            for (var j = 0; j < nodes[i].length; j++) {
                this.calculationNodeGlobal( this.organizeNode.getController(nodes[i][j]));
            }
        }
    }

    function calculationNodeGlobal(_nodeController) {
        this.setGaps();
        saveValue(_nodeController);
    }

    function saveValue(_nodeController) {
        var nnw = _nodeController.nodeControllerNW;
        var nn = _nodeController.nodeControllerN;
        var nw = _nodeController.nodeControllerW;

        if (nnw && nnw.getNode().value === null) {
            return;
        }

        if (nn && nn.getNode().value === null) {
            return;
        }

        if (nw && nw.getNode().value === null) {
            return;
        }

        var connecteds = [];

        if (nnw === null && nn === null && nw === null) {
            _nodeController.getNode().value = (0);
            return;
        }

        if (nw === null) {
            _nodeController.getNode().value = (nn.getNode().value + gap);
            connecteds.push(Connected.N);
            return;
        }

        if (nn === null) {
            _nodeController.getNode().value = (nw.getNode().value + gap);
            connecteds.push(Connected.W);
            return;
        }

        var valueN = nn.getNode().value + gap;
        var valueW = nw.getNode().value + gap;
        var valueNW = 0;

        if (_nodeController.valueA === _nodeController.valueB ) {
            valueNW = nnw.getNode().value + match;
        } else {
            valueNW = nnw.getNode().value + misMatch;
        }

        if (valueN >= valueNW && valueN >= valueW) {
            connecteds.push(Connected.N);
        }

        if (valueW >= valueNW && valueW >= valueN) {
            connecteds.push(Connected.W);
        }

        if (valueNW >= valueW && valueNW >= valueN) {
            connecteds.push(Connected.NW);
        }

        _nodeController.getNode().connected = connecteds;

        if (connecteds.contains(Connected.N)) {
            _nodeController.getNode().value = (valueN);
            return;
        }

        if (connecteds.contains(Connected.NW)) {
            _nodeController.getNode().value = (valueNW);
            return;
        }

        if (connecteds.contains(Connected.W)) {
            _nodeController.getNode().value = (valueW);
            return;
        }
    }

    function findAligns(){
        var nodes = this.getOutputAlign().matrixs[0].nodes;
        var nodeController = this.organizeNode.getController(nodes[nodes.length - 1][nodes[0].length - 1]);
        this.findAlignsNode(nodeController);
    }


    window.dna.CalculationGlobal = CalculationGlobal;

})(window);