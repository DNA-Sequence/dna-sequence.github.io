/**
 * Created by samuel on 18/06/14.
 */
if (!window.dna) window.dna = {};

(function( window ) {

    var Connected = window.dna.Connected;

    var OrganizeNode = new Class({
        initialize : function(_matrix) {
            this.matrix = _matrix;
            this.controllers = [];
            this.addNodeController = addNodeController;
            this.executeOrganizeNode = executeController;
            this.execute = execute;
            this.executeController = executeController;
            this.getValuesSequence = getValuesSequence;
            this.searchNode = searchNode;
        },
        addNode : addNode,
        organize : organize,
        matrix : this.matrix,
        sequenceA : this.sequenceA,
        sequenceB : this.sequenceB,
        getController : getController

    });

    function addNode(node, positionA, positionB){
        this.addNodeController(new dna.NodeController(node, positionA, positionB));
    }

    function addNodeController(nodeController) {
        this.controllers[getValuePosController(nodeController)] = nodeController;
    }

    function execute(node) {
        if (this.controllers[getValuePosController(node)]) {
            this.executeController(this.controllers[getValuePosController(node)]);
        }
    }

    function executeController(node) {
        for ( var c in dna.Connected) {
            var nodeFound = this.searchNode(node, c);
            if (nodeFound !== null) {
                node.setNodeController(c, nodeFound);
                node.setNode(c, nodeFound.getNode());
            }
        }

        node.setSequenceNode( "A", this.getValuesSequence("A", node));
        node.setSequenceNode( "B", this.getValuesSequence("B", node));

    }

    function getValuesSequence(value, nodeController) {
        if (value == "A") {
            if (nodeController.positionA === 0) {
                return "";
            }

            return this.sequenceA[nodeController.positionA - 1];
        } else if (value == "B") {
            if (nodeController.positionB === 0) {
                return "";
            }

            return this.sequenceB[nodeController.positionB - 1];
        }

        return "";
    }

    function searchNode(node, value) {
        var posA = node.positionA;
        var posB = node.positionB;
        var nodes = this.matrix.nodes;

        try {

            switch (value) {
                case Connected.N:
                    posB -= 1;
                    break;
                case Connected.S:
                    posB += 1;
                    break;
                case Connected.W:
                    posA -= 1;
                    break;
                case Connected.E:
                    posA += 1;
                    break;
                case Connected.NW:
                    posA -= 1;
                    posB -= 1;
                    break;
                case Connected.NE:
                    posA += 1;
                    posB -= 1;
                    break;
                case Connected.SW:
                    posA -= 1;
                    posB += 1;
                    break;
                case Connected.SE:
                    posA += 1;
                    posB += 1;
                    break;
            }

            if (posA < 0 || posB < 0 || this.sequenceB.length < posB || this.sequenceA.length < posA) {
                return null;
            }

            var nodeFound = nodes[posA][posB];

            if (nodeFound !== null) {
                return this.controllers[getValuePosController(nodeFound)];
            }
            return null;
        } catch (exception) {
            //TODO
            console.log(exception);
        }
        return null;
    }

    function organize() {

        var nodes = this.matrix.nodes;
        var i;
        var j;
        for (i = 0; i < nodes.length; i++) {
            for (j = 0; j < nodes[i].length; j++) {
                this.addNode(nodes[i][j], i, j);
            }
        }
        for (i = 0; i < nodes.length; i++) {
            for (j = 0; j < nodes[i].length; j++) {
                this.execute(nodes[i][j]);
            }
        }

    }

    function getController() {
        if (arguments && arguments.length > 0) {
            if (arguments.length > 1) {
                return this.controllers[arguments[0] + "-" + arguments[1]];
            } else {
                return this.controllers[getValuePosController(arguments[0])];
            }
        }
    }

    function getValuePosController(nodeController){
        if(nodeController){
            if(nodeController.positionA !== undefined){
                return nodeController.positionA + "-" + nodeController.positionB;
            }
            if(nodeController.x !== undefined){
                return nodeController.x + "-" + nodeController.y;
            }
        }
    }


    window.dna.OrganizeNode = OrganizeNode;

})(window);