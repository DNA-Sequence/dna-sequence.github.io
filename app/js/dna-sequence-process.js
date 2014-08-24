/*! dna-sequence-process - v0.0.1 - 2014-08-23
* https://github.com/samuelklein/dna-sequence-process
* Copyright (c) 2014 Samuel A. Klein; Licensed MIT */
Array.prototype.contains = function (item, from) {
    return this.indexOf(item, from) !== -1;
};

if (!window.dna) {
    window.dna = {};
}

(function (window) {

    var Connected = {
        /**
         * &#8593; north
         */
        N: "N",
        /**
         * &#8592; west
         */
        W: "W",
        /**
         * &#8595; south
         */
        S: "S",
        /**
         * &#8594; east
         */
        E: "E",
        /**
         *
         * &#8598; northwest
         */
        NW: "NW",
        /**
         * &#8599; northeast
         */
        NE: "NE",
        /**
         * &#8600; southeast
         */
        SE: "SE",
        /**
         * &#8601; southwest
         */
        SW: "SW"
    };

    var MethodSequencing = {
        /**
         * NEEDLEMAN-WUNSCH
         */
        GLOBAL: "GLOBAL",
        /**
         * SMITH-WATERMAN
         */
        LOCAL: "LOCAL"
    };

    var TypeElement = {
        PROTEIN: "PROTEIN",
        NUCLEOTIDE: "NUCLEOTIDE"
    };

    window.dna.Connected = Connected;
    window.dna.MethodSequencing = MethodSequencing;
    window.dna.TypeElement = TypeElement;

})(window);




(function (window) {
    var InputAlign = function () {

    };

    InputAlign.prototype = {
        id: null,
        sequenceA: null,
        sequenceB: null,
        typeElement: null,
        methodSequencing: null
    };


    window.dna.InputAlign = InputAlign;

})(window);
(function (window) {

    var InputAlignGlobalLocal = window.dna.InputAlign;

    InputAlignGlobalLocal.prototype = window.dna.InputAlign.prototype;

    InputAlignGlobalLocal.prototype.gap = null;
    InputAlignGlobalLocal.prototype.match = null;
    InputAlignGlobalLocal.prototype.misMatch = null;

    window.dna.InputAlignGlobalLocal = InputAlignGlobalLocal;

})(window);
(function (window) {

    var InputResultAlign = function () {

    };

    InputResultAlign.prototype = {
        idMatrix: null,
        matrix: null,
        connecteds: null,
        idPosX: null,
        idPosY: null,
        node: null
    };

    window.dna.InputResultAlign = InputResultAlign;

})(window);
(function (window) {

    var Matrix = function () {

    };

    Matrix.prototype = {
        nodes: [],
        sequenceA: [],
        sequenceB: []
    };

    window.dna.Matrix = Matrix;

})(window);
(function (window) {

    var Node = function () {

    };

    Node.prototype = {
        value: null,
        connected: [],
        candidate: false,
        x: null,
        y: null,
        charSeqA: null,
        charSeqB: null
    };

    window.dna.Node = Node;

})(window);
(function (window) {

    var NodeDetail = function () {

    };

    NodeDetail.prototype = {
        node : null,
        nodeW : null,
        nodeNW : null,
        nodeN : null,
        nodeCalcW : null,
        nodeCalcNW : null,
        nodeCalcN : null
    };

    window.dna.NodeDetail = NodeDetail;

})(window);
(function (window) {

    var OutputAlign = function () {

    };

    OutputAlign.prototype = {
        id: null,
        matrixs: null
    };

    window.dna.OutputAlign = OutputAlign;

})(window);
(function (window) {

    var OutputResultAlign = function () {

    };

    OutputResultAlign.prototype = {
        nodes: [],
        resultSequenceA: null,
        resultSequenceB: null,
        score: null
    };

    window.dna.OutputResultAlign = OutputResultAlign;

})(window);
(function (window) {

    var StringBuffer = function (_string) {
        this.string = "";
        if (_string) {
            this.string = _string;
        }
    };

    StringBuffer.prototype = {
        insert: function (index, _s) {

            if (index > 0) {
                this.string = this.string.substring(0, index) + _s + this.string.substring(index, this.string.length);
            } else {
                this.string = _s + this.string;
            }

            return this.string;
        },
        toString: function () {
            return this.string;
        }
    };

    window.StringBuffer = StringBuffer;

})(window);
(function (window) {

    var Calculation = function () {

    };

    Calculation.prototype.getOutputAlign = function () {

    };

    Calculation.prototype.getOutputResultAlign = function () {

    };

    Calculation.prototype.setInputResultAlign = function () {

    };

    Calculation.prototype.calculationNode = function () {

    };

    Calculation.prototype.findAligns = function () {

    };

    Calculation.prototype.findAlign = function () {

    };

    Calculation.prototype.nodeVicinity = function (){

    };

    Calculation.prototype.nodeDetail = function (){

    };

    Calculation.prototype.methodSequencing = null;


    window.dna.Calculation = Calculation;

})(window);
(function (window, StringBuffer, dna) {

    var AbstractCalculation = function (_inputAlign) {
        this.inputAlign = _inputAlign;
        this.outputAlign = null;
        this.outputResultAlign = null;
        this.inputResultAlign = null;
        this.organizeNode = null;
        this.gap = null;
        this.match = null;
        this.misMatch = null;

        this.getCalcNode = function (node, pointer){
            if(node){
                var value = node.value + pointer;
                return "" + node.value + " + (" + pointer + ") = " + value;
            } else {
                return "";
            }
        };

        this.align = function (nodeController, connected) {

            if (nodeController.getNode().connected !== null) {
                if (nodeController.getNode().connected.contains(connected)) {
                    return nodeController.getNodeControle(connected);
                }
            }

            return null;
        };
        this.createMatrix = function () {
            var matrix = new dna.Matrix();

            var arrayA = this.inputAlign.sequenceA;
            var arrayB = this.inputAlign.sequenceB;
            var nodes = [];

            for (var i = 0; i < arrayA.length + 1; i++) {
                for (var j = 0; j < arrayB.length + 1; j++) {

                    var n = new dna.Node();
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
        };
        this.executeOrganizeNode = function (_matrix) {
            this.organizeNode = new dna.OrganizeNode(_matrix);
            this.organizeNode.sequenceA = (this.inputAlign.sequenceA);
            this.organizeNode.sequenceB = (this.inputAlign.sequenceB);
            this.organizeNode.organize();
        };
        this.findAlignNode = function (_listNode, _nodeController, _listConnecteds, sequence) {

            var node = _nodeController.getNode();

            if (node.candidate) {
                var nextNode = null;
                var Connected = dna.Connected;

                for (var key in _listConnecteds) {
                    nextNode = this.align(_nodeController, _listConnecteds[key]);
                    if (nextNode) {

                        if (_listConnecteds[key] === Connected.W) {
                            sequence.sbSeqA.insert(0, node.charSeqA);
                            sequence.sbSeqB.insert(0, "_");
                            sequence.score += this.gap;
                        } else if (_listConnecteds[key] === Connected.N) {
                            sequence.sbSeqA.insert(0, "_");
                            sequence.sbSeqB.insert(0, node.charSeqB);
                            sequence.score += this.gap;
                        } else if (_listConnecteds[key] === Connected.NW) {
                            sequence.sbSeqA.insert(0, node.charSeqA);
                            sequence.sbSeqB.insert(0, node.charSeqB);
                            if (node.charSeqA === node.charSeqB) {
                                sequence.score += this.match;
                            } else {
                                sequence.score += this.misMatch;
                            }

                        } else {
                            sequence.sbSeqA.insert(0, "_");
                            sequence.sbSeqB.insert(0, "_");
                        }

                        _listNode.push(nextNode.getNode());
                        this.findAlignNode(_listNode, nextNode, _listConnecteds, sequence);
                        break;
                    }
                }
            }
        };
    };

    AbstractCalculation.prototype = new dna.Calculation();
    AbstractCalculation.prototype.constructor = AbstractCalculation;

    AbstractCalculation.prototype.getOutputAlign = function () {
        return this.outputAlign;
    };

    AbstractCalculation.prototype.getOutputResultAlign = function () {
        return this.outputResultAlign;
    };

    AbstractCalculation.prototype.setInputResultAlign = function (_inputResultAlign) {
        this.inputResultAlign = _inputResultAlign;
    };

    AbstractCalculation.prototype.calculationNode = function () {
        this.outputAlign = new window.dna.OutputAlign();
        var list = [];
        var matrix = this.createMatrix();
        list.push(matrix);
        this.executeOrganizeNode(matrix);
        this.outputAlign.matrixs = list;
    };

    AbstractCalculation.prototype.findAligns = function () {

    };

    AbstractCalculation.prototype.findAlign = function () {
        var listNode = [];
        var listConnecteds = this.inputResultAlign.connecteds;
        this.outputResultAlign = new dna.OutputResultAlign();

        var nodeController = null;

        if (this.inputResultAlign.node) {
            nodeController = this.organizeNode.getController(this.inputResultAlign.node);
        } else {
            var nodes = this.outputAlign.matrixs[0].nodes;
            nodeController = this.organizeNode.getController(nodes[nodes.length - 1][nodes[0].length - 1]);
        }

        var sequence = {
            sbSeqA: new StringBuffer(),
            sbSeqB: new StringBuffer(),
            score: 0
        };

//            var sbSeqB = new StringBuffer();
//            var sbSeqA = new StringBuffer();

        listNode.push(nodeController.getNode());
        this.findAlignNode(listNode, nodeController, listConnecteds, sequence);

        this.outputResultAlign.nodes = (listNode);
        this.outputResultAlign.resultSequenceA = (sequence.sbSeqA.toString());
        this.outputResultAlign.resultSequenceB = (sequence.sbSeqB.toString());
        this.outputResultAlign.score = sequence.score;
    };

    AbstractCalculation.prototype.findAlignsNode = function (nodeController) {

        var node = nodeController.getNode();

        if (!node.candidate) {
            node.candidate = (true);
            var nextNode = null;

            nextNode = this.align(nodeController, dna.Connected.W);
            if (nextNode) {
                this.findAlignsNode(nextNode);
            }
            nextNode = this.align(nodeController, dna.Connected.N);
            if (nextNode) {
                this.findAlignsNode(nextNode);
            }
            nextNode = this.align(nodeController, dna.Connected.NW);
            if (nextNode) {
                this.findAlignsNode(nextNode);
            }
            return nextNode;
        }

        return null;
    };

    AbstractCalculation.prototype.setGaps = function () {
        if (this.inputAlign !== dna.InputAlignGlobalLocal) {
            this.gap = -1;
            this.match = 2;
            this.misMatch = -2;
        } else {
            var inputAlignGlobalLocal = this.inputAlign;
            this.gap = inputAlignGlobalLocal.gap;
            this.match = inputAlignGlobalLocal.match;
            this.misMatch = inputAlignGlobalLocal.misMatch;
        }
    };

    AbstractCalculation.prototype.nodeVicinity = function (dataRetorn, nodeOld, node) {

        if (dataRetorn === null) {
            dataRetorn = {
                arrayNode: null,
                arrayNodeAlign: [],
                score: 0,
                sbSeqA: new StringBuffer(),
                sbSeqB: new StringBuffer()
            };
        }

        var nodeController = this.organizeNode.getController(node);

        if (nodeOld) {

            dataRetorn.arrayNodeAlign.push(node);
            var nodeOldController = this.organizeNode.getController(nodeOld);

            if (nodeController.getNode() !== nodeOldController.getNode()) {

                if (nodeOldController.nodeW === nodeController.getNode()) {
                    dataRetorn.sbSeqA.insert(0, nodeOld.charSeqA ? nodeOld.charSeqA : "_");
                    dataRetorn.sbSeqB.insert(0, "_");
                    dataRetorn.score += this.gap;
                } else if (nodeOldController.nodeN === nodeController.getNode()) {
                    dataRetorn.sbSeqA.insert(0, "_");
                    dataRetorn.sbSeqB.insert(0, nodeOld.charSeqB ? nodeOld.charSeqB : "_");
                    dataRetorn.score += this.gap;
                } else if (nodeOldController.nodeNW === nodeController.getNode()) {
                    dataRetorn.sbSeqA.insert(0, nodeOld.charSeqA ? nodeOld.charSeqA : "_");
                    dataRetorn.sbSeqB.insert(0, nodeOld.charSeqB ? nodeOld.charSeqB : "_");
                    if (nodeOld.charSeqA && nodeOld.charSeqB) {
                        if (nodeOld.charSeqA === nodeOld.charSeqB) {
                            dataRetorn.score += this.match;
                        } else {
                            dataRetorn.score += this.misMatch;
                        }
                    }
                } else {
                    dataRetorn.sbSeqA.insert(0, "_");
                    dataRetorn.sbSeqB.insert(0, "_");
                }
            }


        }

        dataRetorn.arrayNode = [];

        for (var i = 0; i < node.connected.length; i++) {
            dataRetorn.arrayNode.push(nodeController["node" + node.connected[i]]);
        }


        return dataRetorn;
    };

    AbstractCalculation.prototype.nodeDetail = function (node) {
        var nodeController = this.organizeNode.getController(node);

        var nodeDetail = new dna.NodeDetail();

        nodeDetail.node = node;
        nodeDetail.nodeN = nodeController.nodeN;
        nodeDetail.nodeNW = nodeController.nodeNW;
        nodeDetail.nodeW = nodeController.nodeW;

        nodeDetail.nodeCalcN = this.getCalcNode(nodeController.nodeN, this.gap);
        nodeDetail.nodeCalcW = this.getCalcNode(nodeController.nodeW, this.gap);
        if (node.charSeqA === node.charSeqB) {
            nodeDetail.nodeCalcNW = this.getCalcNode(nodeController.nodeNW, this.match);
        } else {
            nodeDetail.nodeCalcNW = this.getCalcNode(nodeController.nodeNW, this.misMatch);
        }

        return nodeDetail;
    };




    dna.AbstractCalculation = AbstractCalculation;

})(window, window.StringBuffer, window.dna);
/**
 * Created by samuel on 17/06/14.
 */

(function (window, dna) {

    var CalculationFactory = {
        createCalculation: function (inputAlign) {
            if (inputAlign) {
                switch (inputAlign.methodSequencing) {
                    case dna.MethodSequencing.GLOBAL:
                        return new dna.CalculationGlobal(inputAlign);
                    case dna.MethodSequencing.LOCAL:
                        return new dna.CalculationLocal(inputAlign);
                }
            }
            throw ("Method Sequencing not defined");
        }
    };


    window.dna.CalculationFactory = CalculationFactory;

})(window, window.dna);
(function (window, dna) {

    var Connected = window.dna.Connected;

    var CalculationGlobal = function (_inputAlign) {
        dna.AbstractCalculation.call(this, _inputAlign);

        this.calculationNodeGlobal = function (_nodeController) {
            this.setGaps();
            this.saveValue(_nodeController);
        };

        this.saveValue = function (_nodeController) {
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

            try {
                if (nnw === null && nn === null && nw === null) {
                    _nodeController.getNode().value = (0);
                    return;
                }

                if (nw === null) {
                    _nodeController.getNode().value = (nn.getNode().value + this.gap);
                    connecteds.push(Connected.N);
                    return;
                }

                if (nn === null) {
                    _nodeController.getNode().value = (nw.getNode().value + this.gap);
                    connecteds.push(Connected.W);
                    return;
                }

                var valueN = nn.getNode().value + this.gap;
                var valueW = nw.getNode().value + this.gap;
                var valueNW = 0;

                if (_nodeController.valueA === _nodeController.valueB) {
                    valueNW = nnw.getNode().value + this.match;
                } else {
                    valueNW = nnw.getNode().value + this.misMatch;
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
            } finally {
                _nodeController.getNode().connected = connecteds;
            }
        };
    };


    CalculationGlobal.prototype = new dna.AbstractCalculation();
    CalculationGlobal.prototype.constructor = CalculationGlobal;

    CalculationGlobal.prototype.calculationNode = function () {
        dna.AbstractCalculation.prototype.calculationNode.call(this);

        var nodes = this.getOutputAlign().matrixs[0].nodes;

        for (var i = 0; i < nodes.length; i++) {
            for (var j = 0; j < nodes[i].length; j++) {
                this.calculationNodeGlobal(this.organizeNode.getController(nodes[i][j]));
            }
        }
    };

    CalculationGlobal.prototype.findAligns = function () {
        var nodes = this.getOutputAlign().matrixs[0].nodes;
        var nodeController = this.organizeNode.getController(nodes[nodes.length - 1][nodes[0].length - 1]);
        this.findAlignsNode(nodeController);
    };

    CalculationGlobal.prototype.methodSequencing = dna.MethodSequencing.GLOBAL;

    dna.CalculationGlobal = CalculationGlobal;

})(window, window.dna);
(function (window, dna) {

    var Connected = dna.Connected;

    var CalculationLocal = function (_inputAlign) {
        dna.AbstractCalculation.call(this, _inputAlign);

        this.calculationNodeGlobal = function (_nodeController) {
            this.setGaps();
            this.saveValue(_nodeController);
        };
        this.saveValue = function (_nodeController) {
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
                var value = (nn.getNode().value + this.gap);
                if (value < 0) {
                    value = 0;
                }

                _nodeController.getNode().value = value;
                connecteds.push(Connected.N);
                return;
            }

            if (nn === null) {
                var _value = (nw.getNode().value + this.gap);
                if (_value < 0) {
                    _value = 0;
                }

                _nodeController.getNode().value = _value;
                connecteds.push(Connected.W);
                return;
            }

            var valueN = nn.getNode().value + this.gap;
            var valueW = nw.getNode().value + this.gap;
            var valueNW = 0;

            if (valueN < 0) {
                valueN = 0;
            }
            if (valueW < 0) {
                valueW = 0;
            }

            if (_nodeController.valueA === _nodeController.valueB) {
                valueNW = nnw.getNode().value + this.match;
            } else {
                valueNW = nnw.getNode().value + this.misMatch;
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
        };
    };

    CalculationLocal.prototype = new dna.AbstractCalculation();
    CalculationLocal.prototype.constructor = CalculationLocal;


    CalculationLocal.prototype.calculationNode = function () {
        dna.AbstractCalculation.prototype.calculationNode.call(this);

        var nodes = this.getOutputAlign().matrixs[0].nodes;

        for (var i = 0; i < nodes.length; i++) {
            for (var j = 0; j < nodes[i].length; j++) {
                this.calculationNodeGlobal(this.organizeNode.getController(nodes[i][j]));
            }
        }

    };

    CalculationLocal.prototype.findAligns = function () {
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

    };

    CalculationLocal.prototype.methodSequencing = dna.MethodSequencing.LOCAL;

    dna.CalculationLocal = CalculationLocal;

})(window, window.dna);
/**
 * Created by samuel on 17/06/14.
 */

(function (window) {

    var Connected = window.dna.Connected;

    var NodeController = function (_node, _positionA, _positionB) {
        this.node = _node;
        this.positionA = _positionA;
        this.positionB = _positionB;
    };

    NodeController.prototype = {
        valueA: null,
        valueB: null,
        nodeN: null,
        nodeW: null,
        nodeS: null,
        nodeE: null,
        nodeNE: null,
        nodeNW: null,
        nodeSE: null,
        nodeSW: null,
        nodeControllerN: null,
        nodeControllerW: null,
        nodeControllerS: null,
        nodeControllerE: null,
        nodeControllerNE: null,
        nodeControllerNW: null,
        nodeControllerSE: null,
        nodeControllerSW: null,
        isPossibleN_NW_W: function () {

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
        },
        getNodeControle: function (connected) {
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
        },
        getNode: function () {
            return this.node;
        },
        setNode: function (connected, node) {

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
        },
        setNodeController: function (connected, nodeController) {

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
        },
        setSequenceNode: function (sequenceNodeType, value) {

            switch (sequenceNodeType) {
                case "A":
                    this.valueA = value;
                    break;
                case "B":
                    this.valueB = value;
                    break;
            }
        }
    };

    window.dna.NodeController = NodeController;

})(window);
(function (window, dna) {

    var Connected = dna.Connected;

    var OrganizeNode = function (_matrix) {
        this.matrix = _matrix;
        this.controllers = [];
        this.addNodeController = function (nodeController) {
            this.controllers[this.getValuePosController(nodeController)] = nodeController;
        };
        this.execute = function (node) {
            if (this.controllers[this.getValuePosController(node)]) {
                this.executeController(this.controllers[this.getValuePosController(node)]);
            }
        };
        this.executeController = function (node) {
            for (var c in dna.Connected) {
                var nodeFound = this.searchNode(node, c);
                if (nodeFound !== null) {
                    node.setNodeController(c, nodeFound);
                    node.setNode(c, nodeFound.getNode());
                }
            }

            node.setSequenceNode("A", this.getValuesSequence("A", node));
            node.setSequenceNode("B", this.getValuesSequence("B", node));

        };
        this.getValuesSequence = function (value, nodeController) {
            if (value === "A") {
                if (nodeController.positionA === 0) {
                    return "";
                }

                return this.sequenceA[nodeController.positionA - 1];
            } else if (value === "B") {
                if (nodeController.positionB === 0) {
                    return "";
                }

                return this.sequenceB[nodeController.positionB - 1];
            }

            return "";
        };
        this.searchNode = function (node, value) {
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

//                    if (posA < 0 || posB < 0 || this.sequenceB.length < posB || this.sequenceA.length < posA) {
//
//                        return null;
//                    }

                var nodeFound;

                try {
                    nodeFound = nodes[posA][posB];
                } catch (e) {
                }

                if (nodeFound) {
                    return this.controllers[this.getValuePosController(nodeFound)];
                }
                return null;
            } catch (exception) {
                //TODO
                console.log(exception);
            }
            return null;
        };

        this.getValuePosController = function (nodeController) {
            if (nodeController) {
                if (nodeController.positionA !== undefined) {
                    return nodeController.positionA + "-" + nodeController.positionB;
                }
                if (nodeController.x !== undefined) {
                    return nodeController.x + "-" + nodeController.y;
                }
            }
        };
    };

    OrganizeNode.prototype = {
        addNode: function (node, positionA, positionB) {
            this.addNodeController(new dna.NodeController(node, positionA, positionB));
        },
        organize: function () {

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

        },
        matrix: this.matrix,
        sequenceA: this.sequenceA,
        sequenceB: this.sequenceB,
        getController: function () {
            if (arguments && arguments.length > 0) {
                if (arguments.length > 1) {
                    return this.controllers[arguments[0] + "-" + arguments[1]];
                } else {
                    return this.controllers[this.getValuePosController(arguments[0])];
                }
            }
        }

    };

    dna.OrganizeNode = OrganizeNode;

})(window, window.dna);