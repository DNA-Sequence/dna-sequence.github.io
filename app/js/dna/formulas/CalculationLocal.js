/**
 * Created by samuel on 17/06/14.
 */
if (!window.dna) window.dna = {};

(function( window ) {

    var Connected = window.dna.Connected;

    var CalculationLocal = new Class( {
        Extends : window.dna.AbstractCalculation,
        initialize: function(_inputAlign){
            this.parent(_inputAlign);
            this.calculationNodeGlobal = calculationNodeGlobal;
        },
        calculationNode : calculationNode,
        findAligns : findAligns
    });

    function calculationNode() {
        this.parent();

        var nodes = this.getOutputAlign().matrixs[0].nodes;

        for (var i = 0; i < nodes.length; i++) {
            for (var j = 0; j < nodes[i].length; j++) {
                this.calculationNodeGlobal(this.organizeNode.getController(nodes[i][j]));
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

        _nodeController.getNode().connected = (connecteds);

        if (nnw === null && nn === null && nw === null) {
            _nodeController.getNode().value = (0);
            return;
        }

        if (nw === null) {
            var value = (nn.getNode().value + gap);
            if (value < 0) {
                value = 0;
            }

            _nodeController.getNode().value = value;
            connecteds.push(Connected.N);
            return;
        }

        if (nn === null) {
            var _value = (nw.getNode().value + gap);
            if (_value < 0) {
                _value = 0;
            }

            _nodeController.getNode().value = _value;
            connecteds.push(Connected.W);
            return;
        }

        var valueN = nn.getNode().value + gap;
        var valueW = nw.getNode().value + gap;
        var valueNW = 0;

        if (valueN < 0) {
            valueN = 0;
        }
        if (valueW < 0) {
            valueW = 0;
        }

        if (_nodeController.valueA == _nodeController.valueB ) {
            valueNW = nnw.getNode().value + match;
        } else {
            valueNW = nnw.getNode().value + misMatch;
        }

        if (valueNW < 0) {
            valueNW = 0;
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

        var posx = nodes.length;
        var posy = nodes[0].length;
        var nodeController = null;
        var i;
        for (i = 1; i < posx; i++) {
            nodeController = this.organizeNode.getController(nodes[i][posy - 1]);
            this.findAlignsNode(nodeController);
        }

        for (i = 1; i < posy - 1; i++) {
            nodeController = this.organizeNode.getController(nodes[posx - 1][i]);
            this.findAlignsNode(nodeController);
        }

    }


    window.dna.CalculationLocal = CalculationLocal;

})(window);