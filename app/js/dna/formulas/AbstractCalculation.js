/**
 * Created by samuel on 17/06/14.
 */
if (!window.dna) window.dna = {};

(function( window ) {

    var AbstractCalculation = new Class( {
        Extends : window.dna.Calculation,
        initialize : function(_inputAlign) {
            this.inputAlign = _inputAlign;
            this.outputAlign = null;
            this.outputResultAlign = null;
            this.inputResultAlign = null;
            this.organizeNode = null;
            this.gap = null;
            this.match = null;
            this.misMatch = null;
            this.createMatrix = createMatrix;
            this.executeOrganizeNode = executeOrganizeNode;
            this.findAlignNode = findAlignNode;
            this.align = align;
        },
        getOutputAlign: function () {
            return this.outputAlign;
        },
        getOutputResultAlign: function () {
            return this.outputResultAlign;
        },
        setInputResultAlign: function (_inputResultAlign) {
            this.inputResultAlign = _inputResultAlign;
        },
        calculationNode: calculationNode,
        findAligns: findAligns,
        findAlign: findAlign,
        findAlignsNode : findAlignsNode,
        setGaps : setGaps
    });


//    AbstractCalculation.implement({
//        getOutputAlign: function () {
//            return this.outputAlign;
//        },
//        getOutputResultAlign: function () {
//            return this.outputResultAlign;
//        },
//        setInputResultAlign: function (_inputResultAlign) {
//            this.inputResultAlign = _inputResultAlign;
//        },
//        calculationNode: calculationNode,
//        findAligns: findAligns,
//        findAlign: findAlign,
//        findAlignsNode : findAlignsNode,
//        setGaps : setGaps
//    });
//    AbstractCalculation.prototype.setGaps = setGaps;

    function calculationNode(){
        this.outputAlign = new window.dna.OutputAlign();
        var list = [];
        var matrix = this.createMatrix();
        list.push(matrix);
        this.executeOrganizeNode(matrix);
        this.outputAlign.matrixs = list;
    }

    function executeOrganizeNode(_matrix) {
        this.organizeNode = new window.dna.OrganizeNode(_matrix);
        this.organizeNode.sequenceA = (this.inputAlign.sequenceA);
        this.organizeNode.sequenceB = (this.inputAlign.sequenceB);
        this.organizeNode.organize();
    }

    function findAligns(){

    }

    function findAlign(){
        var listNode = [];
        var listConnecteds = this.inputResultAlign.connecteds;
        this.outputResultAlign = new window.dna.OutputResultAlign();

        var nodeController = null;

        if (this.inputResultAlign.node) {
            nodeController = this.organizeNode.getController(this.inputResultAlign.node);
        } else {
            var nodes = this.outputAlign.matrixs[0].nodes;
            nodeController = this.organizeNode.getController(nodes[nodes.length - 1][nodes[0].length - 1]);
        }

        var sbSeqA = new StringBuffer();
        var sbSeqB = new StringBuffer();

        listNode.push(nodeController.getNode());
        this.findAlignNode(listNode, nodeController, listConnecteds, sbSeqA, sbSeqB);

        console.log(sbSeqA);
        console.log(sbSeqB);

        this.outputResultAlign.nodes = (listNode);
        this.outputResultAlign.resultSequenceA = (sbSeqA.toString());
        this.outputResultAlign.resultSequenceB = (sbSeqB.toString());
    }

    function createMatrix() {
        var matrix = new window.dna.Matrix();

        var arrayA = this.inputAlign.sequenceA;
        var arrayB = this.inputAlign.sequenceB;
        var nodes = [];

        for (var i = 0; i < arrayA.length + 1; i++) {
            for (var j = 0; j < arrayB.length + 1; j++) {

                var n = new window.dna.Node();
                n.x = (i);
                n.y = (j);
                try {
                    n.charSeqA = (arrayA[i - 1]);
                } catch (exception) {
                    n.charSeqA = (" ");
                }

                try {
                    n.charSeqB = (arrayB[j - 1]);
                } catch (exception) {
                    n.charSeqB = (" ");
                }

                if (!nodes[i]) {
                    nodes[i] = [];
                }

                nodes[i][j] = n;
            }
        }

        matrix.nodes = (nodes);
        matrix.sequenceA = (arrayA);
        matrix.sequenceB = (arrayB);

        return matrix;
    }

    function setGaps() {
        if (this.inputAlign !== window.dna.InputAlignGlobalLocal) {
            gap = -1;
            match = 2;
            misMatch = -2;
        } else {
            var inputAlignGlobalLocal = this.inputAlign;
            gap = inputAlignGlobalLocal.gap;
            match = inputAlignGlobalLocal.match;
            misMatch = inputAlignGlobalLocal.misMatch;
        }
    }

    function findAlignsNode(nodeController) {

        var node = nodeController.getNode();

        if (!node.candidate) {
            node.candidate = (true);
            var nextNode = null;

            nextNode = align(nodeController, window.dna.Connected.W);
            if (nextNode) {
                this.findAlignsNode(nextNode);
            }
            nextNode = align(nodeController, window.dna.Connected.N);
            if (nextNode) {
                this.findAlignsNode(nextNode);
            }
            nextNode = align(nodeController, window.dna.Connected.NW);
            if (nextNode) {
                this.findAlignsNode(nextNode);
            }
            return nextNode;
        }

        return null;
    }

    function findAlignNode(_listNode, _nodeController, _listConnecteds, _sbSeqA, _sbSeqB) {

        var node = _nodeController.getNode();

        if (node.candidate) {
            var nextNode = null;
            var Connected = window.dna.Connected;
            for ( var key in _listConnecteds) {
                nextNode = this.align(_nodeController, _listConnecteds[key]);
                if (nextNode) {

                    if (_listConnecteds[key] == Connected.W) {
                        _sbSeqA.insert(0, node.charSeqA);
                        _sbSeqB.insert( 0,  "_");
                    } else if (_listConnecteds[key] == Connected.N) {
                        _sbSeqA.insert( 0,  "_");
                        _sbSeqB.insert( 0,  node.charSeqB);
                    } else if (_listConnecteds[key] == Connected.NW) {
                        _sbSeqA.insert(0, node.charSeqA);
                        _sbSeqB.insert( 0,  node.charSeqB);
                    } else {
                        _sbSeqA.insert( 0,  "_");
                        _sbSeqB.insert( 0,  "_");
                    }

                    _listNode.push(nextNode.getNode());
                    this.findAlignNode(_listNode, nextNode, _listConnecteds, _sbSeqA, _sbSeqB);
                    break;
                }
            }
        }
    }

    function align(nodeController, connected) {

        if (nodeController.getNode().connected !== null) {
            if (nodeController.getNode().connected.contains(connected)) {
                return nodeController.getNodeControle(connected);
            }
        }

        return null;
    }

    window.dna.AbstractCalculation = AbstractCalculation;

})(window);