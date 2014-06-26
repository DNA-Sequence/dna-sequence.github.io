/**
 * Created by samuel on 18/06/14.
 */
/**
 * Created by samuel on 17/06/14.
 */
if (!window.dna) window.dna = {};

(function( window ) {

    var Connected = window.dna.Connected;

    var NodeController = new Class({
        initialize : function(_node, _positionA, _positionB) {
            this.node = _node;
            this.positionA = _positionA;
            this.positionB = _positionB;
        },
        valueA : null,
        valueB : null,
        nodeN : null,
        nodeW : null,
        nodeS : null,
        nodeE : null,
        nodeNE : null,
        nodeNW : null,
        nodeSE : null,
        nodeSW : null,
        nodeControllerN : null,
        nodeControllerW : null,
        nodeControllerS : null,
        nodeControllerE : null,
        nodeControllerNE : null,
        nodeControllerNW : null,
        nodeControllerSE : null,
        nodeControllerSW : null,
        isPossibleN_NW_W : isPossibleN_NW_W,
        getNodeControle : getNodeControle,
        getNode : getNode,
        setNode : setNode,
        setNodeController : setNodeController,
        setSequenceNode : setSequenceNode
    });

    function isPossibleN_NW_W() {

        if (this.node.value !== null) {
            return false;
        }

        if (this.nodeN !== null) {
            if (this.nodeN.value === null) {
                return false;
            }
        }

        if (this.nodeNW !== null) {
            if (this.nodeNW.value === null) {
                return false;
            }
        }

        if (this.nodeW !== null) {
            if (this.nodeW.value === null) {
                return false;
            }
        }

        return true;
    }

    function getNode(){
        return this.node;
    }

    function getNodeControle(connected) {
        switch (connected) {
            case Connected.N:
                return this.nodeControllerN;
            case Connected.S:
                return this.nodeControllerS;
            case Connected.W:
                return this.nodeControllerW;
            case Connected.E:
                return this.nodeControllerE;
            case Connected.NE:
                return this.nodeControllerNE;
            case Connected.NW:
                return this.nodeControllerNW;
            case Connected.SE:
                return this.nodeControllerSE;
            case Connected.SW:
                return this.nodeControllerSW;
        }

        return null;
    }

    function setNode(connected, node) {

        switch (connected) {

            case Connected.N:
                this.nodeN = node;
                break;
            case Connected.W:
                this.nodeW = node;
                break;
            case Connected.S:
                this.nodeS = node;
                break;
            case Connected.E:
                this.nodeE = node;
                break;
            case Connected.NE:
                this.nodeNE = node;
                break;
            case Connected.NW:
                this.nodeNW = node;
                break;
            case Connected.SE:
                this.nodeSE = node;
                break;
            case Connected.SW:
                this.nodeSW = node;
                break;
        }
    }

    function setNodeController(connected, nodeController) {

        switch (connected) {
            case Connected.N:
                this.nodeControllerN = nodeController;
                break;
            case Connected.W:
                this.nodeControllerW = nodeController;
                break;
            case Connected.S:
                this.nodeControllerS = nodeController;
                break;
            case Connected.E:
                this.nodeControllerE = nodeController;
                break;
            case Connected.NE:
                this.nodeControllerNE = nodeController;
                break;
            case Connected.NW:
                this.nodeControllerNW = nodeController;
                break;
            case Connected.SE:
                this.nodeControllerSE = nodeController;
                break;
            case Connected.SW:
                this.nodeControllerSW = nodeController;
                break;
        }
    }

    function setSequenceNode(sequenceNodeType, value) {

        switch (sequenceNodeType) {
            case "A":
                this.valueA = value;
                break;
            case "B":
                this.valueB = value;
                break;
        }
    }

    window.dna.NodeController = NodeController;

})(window);