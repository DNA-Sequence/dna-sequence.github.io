/*! dna-sequence-process - v0.0.1 - 2014-09-27
* https://github.com/samuelklein/dna-sequence-process
* Copyright (c) 2014 Samuel A. Klein; Licensed MIT */
/**
 * this {Array}
 * @param item
 * @param from
 * @returns {boolean}
 */
Array.prototype.contains = function (item, from) {

    return this.indexOf(item, from) !== -1;
};

/**
 * @ignore
 */
if (!window.dna) {
    window.dna = {};
}

//(function (window, dna) {

/**
 *
 * @global
 * @enum
 * @type {{N: string, W: string, S: string, E: string, NW: string, NE: string, SE: string, SW: string}}
 */
window.dna.Connected = {
    /**
     * &#8593; north
     * @type {string}
     */
    N: "N",
    /**
     * &#8592; west
     * @type {string}
     */
    W: "W",
    /**
     * &#8595; south
     * @type {string}
     */
    S: "S",
    /**
     * &#8594; east
     * @type {string}
     */
    E: "E",
    /**
     * &#8598; northwest
     * @type {string}
     */
    NW: "NW",
    /**
     * &#8599; northeast
     * @type {string}
     */
    NE: "NE",
    /**
     * &#8600; southeast
     * @type {string}
     */
    SE: "SE",
    /**
     * &#8601; southwest
     * @type {string}
     */
    SW: "SW"
};

/**
 * @global
 * @enum
 * @type {{GLOBAL: string, LOCAL: string}}
 */
window.dna.MethodSequencing = {
    /**
     * NEEDLEMAN-WUNSCH
     * @type {string}
     */
    GLOBAL: "GLOBAL",
    /**
     * SMITH-WATERMAN
     * @type {string}
     */
    LOCAL: "LOCAL",
    /**
     * SEMI-GLOBAL
     * @type {string}
     */
    SEMIGLOBAL: "SEMIGLOBAL"
};

/**
 * @global
 * @enum
 * @type {{PROTEIN: string, NUCLEOTIDE: string}}
 */
window.dna.TypeElement = {
    /**
     * PROTEIN
     * @type {string}
     */
    PROTEIN: "PROTEIN",
    /**
     * NUCLEOTIDE
     * @type {string}
     */
    NUCLEOTIDE: "NUCLEOTIDE"
};

//    /**
//     *
//     * @type {Connected}
//     */
//    dna.Connected = Connected;
//    /**
//     *
//     * @type {MethodSequencing}
//     */
//    dna.MethodSequencing = MethodSequencing;
//    /**
//     *
//     * @type {TypeElement}
//     */
//    dna.TypeElement = TypeElement;

//})(window, window.dna);




//(function (window, dna) {
/**
 * @global
 * @constructor
 */
window.dna.InputAlign = function () {

};


window.dna.InputAlign.prototype = {
    /**
     * @global
     * @memberOf InputAlign
     * @instance
     * @type {int}
     */
    id: null,
    /**
     * @global
     * @memberOf InputAlign
     * @instance
     * @type {String}
     */
    sequenceA: null,
    /**
     * @global
     * @memberOf InputAlign
     * @instance
     * @type {String}
     */
    sequenceB: null,
    /**
     * @global
     * @memberOf InputAlign
     * @instance
     * @type {TypeElement}
     */
    typeElement: null,
    /**
     * @global
     * @memberOf InputAlign
     * @instance
     * @type {MethodSequencing}
     */
    methodSequencing: null
};


/**
 *
 * @type {InputAlign}
 */
//dna.InputAlign = InputAlign;

//})(window, window.dna);
//(function (window ,dna) {

    /**
     * @global
     * @constructor
     * @type {InputAlign}
     */
    window.dna.InputAlignGlobalLocal = window.dna.InputAlign;

    /**
     * @global
     * @memberOf InputAlignGlobalLocal
     * @instance
     * @type {InputAlign}
     */
    window.dna.InputAlignGlobalLocal.prototype = window.dna.InputAlign.prototype;

    /**
     * @global
     * @memberOf InputAlignGlobalLocal
     * @instance
     * @type {int}
     */
    window.dna.InputAlignGlobalLocal.prototype.gap = null;
    /**
     * @global
     * @memberOf InputAlignGlobalLocal
     * @instance
     * @type {int}
     */
    window.dna.InputAlignGlobalLocal.prototype.match = null;
    /**
     * @global
     * @memberOf InputAlignGlobalLocal
     * @instance
     * @type {int}
     */
    window.dna.InputAlignGlobalLocal.prototype.misMatch = null;

    /**
     * @global
     * @memberOf InputAlignGlobalLocal
     * @instance
     * @type {Array}
     */
    window.dna.InputAlignGlobalLocal.prototype.arrayMisMatch = null;

    /**
     *
     * @type {InputAlignGlobalLocal}
     */
//    dna.InputAlignGlobalLocal = InputAlignGlobalLocal;

//})(window, window.dna);
//(function (window, dna) {

/**
 * @global
 * @constructor
 */
window.dna.InputResultAlign = function () {

};

window.dna.InputResultAlign.prototype = {

    /**
     * @global
     * @memberOf InputResultAlign
     * @instance
     * @type {int}
     */
    idMatrix: null,
    /**
     * @global
     * @memberOf InputResultAlign
     * @instance
     * @type {Matrix}
     */
    matrix: null,
    /**
     * @global
     * @memberOf InputResultAlign
     * @instance
     * @type {Connected}
     */
    connecteds: null,
    /**
     * @global
     * @memberOf InputResultAlign
     * @instance
     * @type {int}
     */
    idPosX: null,
    /**
     * @global
     * @memberOf InputResultAlign
     * @instance
     * @type {int}
     */
    idPosY: null,
    /**
     * @global
     * @memberOf InputResultAlign
     * @instance
     * @type {Node}
     */
    node: null
};

/**
 *
 * @type {InputResultAlign}
 */
//    dna.InputResultAlign = InputResultAlign;

//})(window, window.dna);
//(function (window) {

/**
 * @global
 * @constructor
 */
window.dna.Matrix = function () {

};

window.dna.Matrix.prototype = {
    /**
     * @memberOf Matrix
     * @instance
     * @type {Array.<Node>}
     */
    nodes: [],
    /**
     * @memberOf Matrix
     * @instance
     * @type {Array.<string>}
     */
    sequenceA: [],
    /**
     * @memberOf Matrix
     * @instance
     * @type {Array.<string>}
     */
    sequenceB: []
};

/**
 *
 * @type {Matrix}
 */
//    window.dna.Matrix = Matrix;

//})(window);
//(function (window) {

/**
 * @global
 * @constructor
 */
window.dna.Node = function () {

};

/**
 *
 * @type {{value: {int}, connected: Array, candidate: boolean, x: {int}, y: {int}, charSeqA: {String}, charSeqB: {String}}}
 */
window.dna.Node.prototype = {
    /**
     * @global
     * @memberOf Node
     * @instance
     * @type {int}
     */
    value: null,
    /**
     * @global
     * @memberOf Node
     * @instance
     * @type {Array.<Connected>}
     */
    connected: [],
    /**
     * @global
     * @memberOf Node
     * @instance
     * @type {boolean}
     */
    candidate: false,
    /**
     * @global
     * @memberOf Node
     * @instance
     * @type {int}
     */
    x: null,
    /**
     * @global
     * @memberOf Node
     * @instance
     * @type {int}
     */
    y: null,
    /**
     * @global
     * @memberOf Node
     * @instance
     * @type {String}
     */
    charSeqA: null,
    /**
     * @global
     * @memberOf Node
     * @instance
     * @type {String}
     */
    charSeqB: null
};

/**
 *
 * @type {Node}
 */
//window.dna.Node = Node;

//})(window);
//(function (window) {

/**
 * @global
 * @constructor
 */
window.dna.NodeDetail = function () {

};

window.dna.NodeDetail.prototype = {
    /**
     * @global
     * @memberOf NodeDetail
     * @instance
     * @type {Node}
     */
    node: null,
    /**
     * @global
     * @memberOf NodeDetail
     * @instance
     * @type {Node}
     */
    nodeW: null,
    /**
     * @global
     * @memberOf NodeDetail
     * @instance
     * @type {Node}
     */
    nodeNW: null,
    /**
     * @global
     * @memberOf NodeDetail
     * @instance
     * @type {Node}
     */
    nodeN: null,
    /**
     * @global
     * @memberOf NodeDetail
     * @instance
     * @type {String}
     */
    nodeCalcW: null,
    /**
     * @global
     * @memberOf NodeDetail
     * @instance
     * @type {String}
     */
    nodeCalcNW: null,
    /**
     * @global
     * @memberOf NodeDetail
     * @instance
     * @type {String}
     */
    nodeCalcN: null
};

/**
 *
 * @type {NodeDetail}
 */
//    window.dna.NodeDetail = NodeDetail;

//})(window);
//(function (window, dna) {

/**
 * @global
 * @constructor
 */
window.dna.OutputAlign = function () {

};

window.dna.OutputAlign.prototype = {
    /**
     * @global
     * @memberOf OutputAlign
     * @instance
     * @type {int}
     */
    id: null,
    /**
     * @global
     * @memberOf OutputAlign
     * @instance
     * @type {Array.<Matrix>}
     */
    matrixs: null
};

/**
 *
 * @type {OutputAlign}
 */
//    dna.OutputAlign = OutputAlign;

//})(window, window.dna);
//(function (window, dna) {

/**
 * @global
 * @constructor
 */
window.dna.OutputResultAlign = function () {

};

/**
 *
 * @type {{nodes: Array, resultSequenceA: {String}, resultSequenceB: {String}, score: {int}}}
 */
window.dna.OutputResultAlign.prototype = {
    /**
     * @global
     * @memberOf OutputResultAlign
     * @instance
     * @type {Array.<Node>}
     */
    nodes: [],
    /**
     * @global
     * @memberOf OutputResultAlign
     * @instance
     * @type {String}
     */
    resultSequenceA: null,
    /**
     * @global
     * @memberOf OutputResultAlign
     * @instance
     * @type {String}
     */
    resultSequenceB: null,
    /**
     * @global
     * @memberOf OutputResultAlign
     * @instance
     * @type {int}
     */
    score: null
};

/**
 *
 * @type {OutputResultAlign}
 */
//    dna.OutputResultAlign = OutputResultAlign;

//})(window, window.dna);
(function (window) {

    /**
     *
     * @param _string
     * @constructor
     */
    var StringBuffer = function (_string) {
        this.string = "";
        if (_string) {
            this.string = _string;
        }
    };

    /**
     *
     * @type {{insert: insert, toString: toString}}
     */
    StringBuffer.prototype = {
        /**
         *
         * @param index
         * @param _s
         * @returns {string}
         */
        insert: function (index, _s) {

            if (index > 0) {
                this.string = this.string.substring(0, index) + _s + this.string.substring(index, this.string.length);
            } else {
                this.string = _s + this.string;
            }

            return this.string;
        },
        /**
         *
         * @returns {string}
         */
        toString: function () {
            return this.string;
        }
    };

    /**
     *
     * @type {StringBuffer}
     */
    window.StringBuffer = StringBuffer;

})(window);
//(function (window,dna) {

/**
 * @global
 * @constructor
 */
window.dna.Calculation = function () {

};

/**
 * @global
 * @memberOf Calculation
 * @instance
 * @description getOutputAlign
 */
window.dna.Calculation.prototype.getOutputAlign = function () {

};

/**
 * @global
 * @memberOf Calculation
 * @instance
 * @description getOutputResultAlign
 */
window.dna.Calculation.prototype.getOutputResultAlign = function () {

};

/**
 * @global
 * @memberOf Calculation
 * @instance
 * @description setInputResultAlign
 */
window.dna.Calculation.prototype.setInputResultAlign = function () {

};

/**
 * @global
 * @memberOf Calculation
 * @instance
 * @description calculationNode
 */
window.dna.Calculation.prototype.calculationNode = function () {

};

/**
 * @global
 * @memberOf Calculation
 * @instance
 * @description findAligns
 */
window.dna.Calculation.prototype.findAligns = function () {

};

/**
 * @global
 * @memberOf Calculation
 * @instance
 * @description findAlign
 */
window.dna.Calculation.prototype.findAlign = function () {

};

/**
 * @global
 * @memberOf Calculation
 * @instance
 * @description nodeVicinity
 */
window.dna.Calculation.prototype.nodeVicinity = function () {

};

/**
 * @global
 * @memberOf Calculation
 * @instance
 * @description nodeDetail
 */
window.dna.Calculation.prototype.nodeDetail = function () {

};

/**
 * @global
 * @memberOf Calculation
 * @instance
 * @type {MethodSequencing}
 */
window.dna.Calculation.prototype.methodSequencing = null;

/**
 * @type {Calculation}
 */
//    dna.Calculation = Calculation;

//})(window, window.dna);
//(function (window, StringBuffer, dna) {


/**
 * @global
 * @extends {Calculation}
 * @param {InputAlign} _inputAlign
 * @constructor
 */
window.dna.AbstractCalculation = function (_inputAlign) {

    this.inputAlign = _inputAlign;
    this.outputAlign = null;
    this.outputResultAlign = null;
    this.inputResultAlign = null;
    /**
     *
     * @type {window.dna.OrganizeNode}
     */
    this.organizeNode = null;
    this.gap = null;
    this.match = null;
    this.misMatch = null;
    /**
     *
     * @type {Array}
     */
    this.arrayMisMatch = null;

    /**
     * @private
     * @param {Node} node
     * @param {int} pointer
     * @returns {string}
     */
    this.getCalcNode = function (node, pointer) {
        if (node) {
            var value = node.value + pointer;
            return "" + node.value + " + (" + pointer + ") = " + value;
        } else {
            return "";
        }
    };

    /**
     * @private
     * @param {NodeController} nodeController
     * @param {Connected} connected
     * @returns {NodeController}
     */
    this.align = function (nodeController, connected) {

        if (nodeController.getNode().connected !== null) {
            if (nodeController.getNode().connected.contains(connected)) {
                return nodeController.getNodeControle(connected);
            }
        }

        return null;
    };

    /**
     * @private
     * @returns {Matrix}
     */
    this.createMatrix = function () {
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
    };

    /**
     * @public
     * @param {Matrix}
     */
    this.executeOrganizeNode = function (_matrix) {
        this.organizeNode = new window.dna.OrganizeNode(_matrix);
        this.organizeNode.sequenceA = (this.inputAlign.sequenceA);
        this.organizeNode.sequenceB = (this.inputAlign.sequenceB);
        this.organizeNode.organize();
    };

    /**
     * @public
     * @param {Array.<Node>} _listNode
     * @param {NodeController} _nodeController
     * @param {Array.<Connected>} _listConnecteds
     * @param {String} sequence
     */
    this.findAlignNode = function (_listNode, _nodeController, _listConnecteds, sequence) {

        var node = _nodeController.getNode();

        if (node.candidate) {
            var nextNode = null;
            var Connected = window.dna.Connected;

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

/**
 *
 * @type {Calculation}
 */
window.dna.AbstractCalculation.prototype = new window.dna.Calculation();

/**
 *
 * @type {window.dna.AbstractCalculation}
 */
window.dna.AbstractCalculation.prototype.constructor = window.dna.AbstractCalculation;

/**
 *
 * @returns {null|*|AbstractCalculation.outputAlign}
 */
window.dna.AbstractCalculation.prototype.getOutputAlign = function () {
    return this.outputAlign;
};

/**
 *
 * @returns {null|*|window.dna.AbstractCalculation.outputResultAlign}
 */
window.dna.AbstractCalculation.prototype.getOutputResultAlign = function () {
    return this.outputResultAlign;
};

/**
 *
 * @param _inputResultAlign
 */
window.dna.AbstractCalculation.prototype.setInputResultAlign = function (_inputResultAlign) {
    this.inputResultAlign = _inputResultAlign;
};

/**
 * @description calculationNode
 */
window.dna.AbstractCalculation.prototype.calculationNode = function () {
    this.outputAlign = new window.dna.OutputAlign();
    var list = [];
    var matrix = this.createMatrix();
    list.push(matrix);
    this.executeOrganizeNode(matrix);
    this.outputAlign.matrixs = list;
};

window.dna.AbstractCalculation.prototype.findAligns = function () {

};

window.dna.AbstractCalculation.prototype.findAlign = function () {

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

    var sequence = {
        sbSeqA: new window.StringBuffer(),
        sbSeqB: new window.StringBuffer(),
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

/**
 *
 * @param nodeController
 * @returns {Node}
 */
window.dna.AbstractCalculation.prototype.findAlignsNode = function (nodeController) {


    var Connected = window.dna.Connected;

    var node = nodeController.getNode();

    if (!node.candidate) {
        node.candidate = (true);
        var nextNode = null;

        nextNode = this.align(nodeController, Connected.W);
        if (nextNode) {
            this.findAlignsNode(nextNode);
        }
        nextNode = this.align(nodeController, Connected.N);
        if (nextNode) {
            this.findAlignsNode(nextNode);
        }
        nextNode = this.align(nodeController, Connected.NW);
        if (nextNode) {
            this.findAlignsNode(nextNode);
        }
        return nextNode;
    }

    return null;
};

/**
 * @description setGaps
 *
 */
window.dna.AbstractCalculation.prototype.setGaps = function () {

    this.gap = -1;
    this.match = 2;
    this.misMatch = -2;
    this.arrayMisMatch = {};

    /**
     *
     * @type {InputAlignGlobalLocal|*|window.dna.AbstractCalculation.inputAlign}
     */
    var inputAlignGlobalLocal = this.inputAlign;

    if (inputAlignGlobalLocal.gap) {
        this.gap = parseInt(inputAlignGlobalLocal.gap);
    }
    if (inputAlignGlobalLocal.match) {
        this.match = parseInt(inputAlignGlobalLocal.match);
    }

    if (inputAlignGlobalLocal.misMatch) {
        this.misMatch = parseInt(inputAlignGlobalLocal.misMatch);
    }

    if (inputAlignGlobalLocal.arrayMisMatch) {
        this.arrayMisMatch = inputAlignGlobalLocal.arrayMisMatch;
    }

};

/**
 *
 * @param dataRetorn
 * @param {Node} nodeOld
 * @param {Node} node
 * @returns {*}
 */
window.dna.AbstractCalculation.prototype.nodeVicinity = function (dataRetorn, nodeOld, node) {

    if (dataRetorn === null) {
        dataRetorn = {
            arrayNode: null,
            arrayNodeAlign: [],
            score: 0,
            sbSeqA: new window.StringBuffer(),
            sbSeqB: new window.StringBuffer()
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

/**
 *
 * @param node
 * @returns {NodeDetail}
 */
window.dna.AbstractCalculation.prototype.nodeDetail = function (node) {
    var nodeController = this.organizeNode.getController(node);

    /**
     *
     * @type {Window.dna.NodeDetail}
     */
    var nodeDetail = new window.dna.NodeDetail();

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


/**
 * @type {window.dna.AbstractCalculation}
 */
//    dna.AbstractCalculation = AbstractCalculation;

//})(window, window.StringBuffer, window.dna);
//(function (window, dna) {

/**
 * @global
 * @constructor
 * @type {{createCalculation: createCalculation}}
 */
window.dna.CalculationFactory = {
    /**
     *
     * @static
     * @memberOf CalculationFactory
     * @returns {Calculation}
     */
    createCalculation: function (inputAlign) {
        if (inputAlign) {
            switch (inputAlign.methodSequencing) {
                case window.dna.MethodSequencing.GLOBAL:
                    return new window.dna.CalculationGlobal(inputAlign);
                case window.dna.MethodSequencing.LOCAL:
                    return new window.dna.CalculationLocal(inputAlign);
                case window.dna.MethodSequencing.SEMIGLOBAL:
                    return new window.dna.CalculationSemiGlobal(inputAlign);
            }
        }
        throw ("Method Sequencing not defined");
    }
};

/**
 *
 * @type {CalculationFactory}
 */
//    dna.CalculationFactory = CalculationFactory;

//})(window, window.dna);
//(function (window, dna) {

/**
 *
 * @type {Connected}
 */


/**
 * @global
 * @extends {Calculation}
 * @param {InputAlign} _inputAlign
 * @constructor
 */
window.dna.CalculationGlobal = function (_inputAlign) {

    var Connected = window.dna.Connected;
    /**
     * @description call AbstractCalculation
     */
    window.dna.AbstractCalculation.call(this, _inputAlign);

    /**
     *
     * @param {NodeController} _nodeController
     */
    this.calculationNodeGlobal = function (_nodeController) {
        this.setGaps();
        this.saveValue(_nodeController);
    };

    /**
     *
     * @param {NodeController} _nodeController
     */
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
                _nodeController.getNode().value = 0;
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


/**
 *
 * @type {AbstractCalculation}
 */
window.dna.CalculationGlobal.prototype = new window.dna.AbstractCalculation();
/**
 *
 * @type {CalculationGlobal}
 */
window.dna.CalculationGlobal.prototype.constructor = window.dna.CalculationGlobal;

/**
 * @description calculationNode
 *
 */
window.dna.CalculationGlobal.prototype.calculationNode = function () {
    window.dna.AbstractCalculation.prototype.calculationNode.call(this);

    var nodes = this.getOutputAlign().matrixs[0].nodes;

    for (var i = 0; i < nodes.length; i++) {
        for (var j = 0; j < nodes[i].length; j++) {
            this.calculationNodeGlobal(this.organizeNode.getController(nodes[i][j]));
        }
    }
};

/**
 * @description findAligns
 *
 */
window.dna.CalculationGlobal.prototype.findAligns = function () {
    var nodes = this.getOutputAlign().matrixs[0].nodes;
    var nodeController = this.organizeNode.getController(nodes[nodes.length - 1][nodes[0].length - 1]);
    this.findAlignsNode(nodeController);
};

/**
 *
 * @type {MethodSequencing}
 */
window.dna.CalculationGlobal.prototype.methodSequencing = window.dna.MethodSequencing.GLOBAL;

/**
 *
 * @type {CalculationGlobal}
 */
//    dna.CalculationGlobal = CalculationGlobal;

//})(window, window.dna);
//(function (window, dna, StringBuffer) {

/**
 * @global
 * @extends {Calculation}
 * @param {InputAlign} _inputAlign
 * @constructor
 */
window.dna.CalculationSemiGlobal = function (_inputAlign) {
    /**
     * @description call AbstractCalculation
     */
    window.dna.AbstractCalculation.call(this, _inputAlign);

    /**
     *
     * @param {NodeController} _nodeController
     */
    this.calculationNodeGlobal = function (_nodeController) {
        this.setGaps();
        this.saveValue(_nodeController);
    };

    /**
     *
     * @param {NodeController} _nodeController
     */
    this.saveValue = function (_nodeController) {

        var Connected = window.dna.Connected;

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
                _nodeController.getNode().value = 0;
                return;
            }

            if (nw === null) {
                _nodeController.getNode().value = 0;
                return;
            }

            if (nn === null) {
                _nodeController.getNode().value = 0;
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


/**
 *
 * @type {AbstractCalculation}
 */
window.dna.CalculationSemiGlobal.prototype = new window.dna.AbstractCalculation();
/**
 *
 * @type {CalculationGlobal}
 */
window.dna.CalculationSemiGlobal.prototype.constructor = window.dna.CalculationSemiGlobal;

/**
 * @description calculationNode
 *
 */
window.dna.CalculationSemiGlobal.prototype.calculationNode = function () {
    window.dna.AbstractCalculation.prototype.calculationNode.call(this);

    var nodes = this.getOutputAlign().matrixs[0].nodes;

    for (var i = 0; i < nodes.length; i++) {
        for (var j = 0; j < nodes[i].length; j++) {
            this.calculationNodeGlobal(this.organizeNode.getController(nodes[i][j]));
        }
    }
};

/**
 * @description findAligns
 *
 */
window.dna.CalculationSemiGlobal.prototype.findAligns = function () {
    var nodes = this.getOutputAlign().matrixs[0].nodes;
    var nodeController = this.organizeNode.getController(nodes[nodes.length - 1][nodes[0].length - 1]);
    this.findAlignsNode(nodeController);
};

/**
 *
 * @param dataRetorn
 * @param nodeOld
 * @param node
 */
window.dna.CalculationSemiGlobal.prototype.nodeVicinity = function (dataRetorn, nodeOld, node) {

    if (!nodeOld && !node) {
        if (dataRetorn === null) {
            dataRetorn = {
                arrayNode: null,
                arrayNodeAlign: [],
                score: 0,
                sbSeqA: new window.StringBuffer(),
                sbSeqB: new window.StringBuffer()
            };
        }

        dataRetorn.arrayNode = this.getMaxNodeStart();

        return dataRetorn;
    } else {
        /**
         * @description call AbstractCalculation
         */
        return window.dna.AbstractCalculation.prototype.nodeVicinity.call(this, dataRetorn, nodeOld, node);
    }
};

window.dna.CalculationSemiGlobal.prototype.getMaxNodeStart = function () {
    return this.organizeNode.getArrayMaxNodeControllerSemiGlobal();
};

/**
 *
 * @type {MethodSequencing}
 */
window.dna.CalculationSemiGlobal.prototype.methodSequencing = window.dna.MethodSequencing.SEMIGLOBAL;

/**
 *
 * @type {CalculationGlobal}
 */
//    dna.CalculationSemiGlobal = CalculationSemiGlobal;

//})(window, window.dna, window.StringBuffer);
//(function (window, dna) {

/**
 *
 * @type {Connected|Window.dna.Connected|*}
 */
//    var Connected = dna.Connected;

/**
 * @global
 * @param {InputAlign} _inputAlign
 * @extends {Calculation}
 * @constructor
 */
window.dna.CalculationLocal = function (_inputAlign) {
    /**
     * @description call AbstractCalculation
     */
    window.dna.AbstractCalculation.call(this, _inputAlign);

    /**
     *
     * @param {NodeController} _nodeController
     */
    this.calculationNodeGlobal = function (_nodeController) {
        this.setGaps();
        this.saveValue(_nodeController);
    };

    /**
     * @private
     * @param {Node} node
     * @param {int} pointer
     * @returns {string}
     */
    this.getCalcNode = function (node, pointer) {
        if (node) {
            var value = node.value + pointer;

            var _retorn = "";

            _retorn += "" + node.value;
            _retorn += " + (" + pointer + ") = ";

            if (value < 0) {
                _retorn += "(" + value;
                _retorn += " < 0) = 0";
            } else {
                _retorn += "" + value;
            }

            return _retorn;
        } else {
            return "";
        }
    };

    /**
     *
     * @param {NodeController} _nodeController
     */
    this.saveValue = function (_nodeController) {

        var Connected = window.dna.Connected;

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

/**
 *
 * @type {window.dna.AbstractCalculation}
 */
window.dna.CalculationLocal.prototype = new window.dna.AbstractCalculation();
/**
 *
 * @type {CalculationLocal}
 */
window.dna.CalculationLocal.prototype.constructor = window.dna.CalculationLocal;

/**
 * @description calculationNode
 */
window.dna.CalculationLocal.prototype.calculationNode = function () {
    window.dna.AbstractCalculation.prototype.calculationNode.call(this);

    var nodes = this.getOutputAlign().matrixs[0].nodes;

    for (var i = 0; i < nodes.length; i++) {
        for (var j = 0; j < nodes[i].length; j++) {
            this.calculationNodeGlobal(this.organizeNode.getController(nodes[i][j]));
        }
    }

};

/**
 * @description findAligns
 */
window.dna.CalculationLocal.prototype.findAligns = function () {
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

/**
 *
 * @type {MethodSequencing.LOCAL|*}
 */
window.dna.CalculationLocal.prototype.methodSequencing = window.dna.MethodSequencing.LOCAL;

/**
 *
 * @type {CalculationLocal}
 */
//    dna.CalculationLocal = CalculationLocal;

//})(window, window.dna);
/**
 * Created by samuel on 17/06/14.
 */

//(function (window, dna) {


/**
 *
 * @type {Connected|Window.dna.Connected|*}
 */

/**
 *
 * @global
 * @param {Node} _node
 * @param {String} _positionA
 * @param {String} _positionB
 * @constructor
 */
window.dna.NodeController = function (_node, _positionA, _positionB) {
    this.node = _node;
    this.positionA = _positionA;
    this.positionB = _positionB;
};

window.dna.NodeController.prototype = {
    /**
     * @type {String}
     */
    valueA: null,
    /**
     * @type {String}
     */
    valueB: null,
    /**
     * @type {Node}
     */
    nodeN: null,
    /**
     * @type {Node}
     */
    nodeW: null,
    /**
     * @type {Node}
     */
    nodeS: null,
    /**
     * @type {Node}
     */
    nodeE: null,
    /**
     * @type {Node}
     */
    nodeNE: null,
    /**
     * @type {Node}
     */
    nodeNW: null,
    /**
     * @type {Node}
     */
    nodeSE: null,
    /**
     * @type {Node}
     */
    nodeSW: null,
    /**
     * @type {NodeController}
     */
    nodeControllerN: null,
    /**
     * @type {NodeController}
     */
    nodeControllerW: null,
    /**
     * @type {NodeController}
     */
    nodeControllerS: null,
    /**
     * @type {NodeController}
     */
    nodeControllerE: null,
    /**
     * @type {NodeController}
     */
    nodeControllerNE: null,
    /**
     * @type {NodeController}
     */
    nodeControllerNW: null,
    /**
     * @type {NodeController}
     */
    nodeControllerSE: null,
    /**
     * @type {NodeController}
     */
    nodeControllerSW: null,
    /**
     *
     * @returns {boolean}
     */
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
    /**
     *
     * @param {Connected} connected
     * @returns {NodeController}
     */
    getNodeControle: function (connected) {

        var Connected = window.dna.Connected;

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
    /**
     *
     * @returns {Node}
     */
    getNode: function () {
        return this.node;
    },
    /**
     *
     * @param {Connected} connected
     * @param {Node} node
     */
    setNode: function (connected, node) {
        var Connected = window.dna.Connected;

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
    /**
     *
     * @param {Connected} connected
     * @param {NodeController} nodeController
     */
    setNodeController: function (connected, nodeController) {

        var Connected = window.dna.Connected;

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
    /**
     *
     * @param {String} sequenceNodeType
     * @param {String} value
     */
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

/**
 *
 * @type {NodeController}
 */
//    dna.NodeController = NodeController;

//})(window, window.dna);
//(function (window, dna) {

/**
 * @global
 * @param {Matrix} _matrix
 * @constructor
 */
window.dna.OrganizeNode = function (_matrix) {

    /**
     *
     * @type {Connected|Window.dna.Connected|*}
     */
    var Connected = window.dna.Connected;

    /**
     *
     * @type {window.dna.Matrix}
     */
    this.matrix = _matrix;
    /**
     *
     * @type {Array}
     */
    this.controllers = [];

    /**
     *
     * @param nodeController
     */
    this.addNodeController = function (nodeController) {
        this.controllers[this.getValuePosController(nodeController)] = nodeController;
    };

    /**
     *
     * @param node
     */
    this.execute = function (node) {
        if (this.controllers[this.getValuePosController(node)]) {
            this.executeController(this.controllers[this.getValuePosController(node)]);
        }
    };

    /**
     *
     * @param node
     */
    this.executeController = function (node) {
        for (var c in Connected) {
            var nodeFound = this.searchNode(node, c);
            if (nodeFound !== null) {
                node.setNodeController(c, nodeFound);
                node.setNode(c, nodeFound.getNode());
            }
        }

        node.setSequenceNode("A", this.getValuesSequence("A", node));
        node.setSequenceNode("B", this.getValuesSequence("B", node));

    };

    /**
     *
     * @param value
     * @param nodeController
     * @returns {String}
     */
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

    /**
     *
     * @param node
     * @param value
     * @returns {window.dna.NodeController}
     */
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

    /**
     *
     * @param nodeController
     * @returns {string}
     */
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

/**
 *
 * @type {{addNode: addNode, organize: organize, matrix: *, sequenceA: *, sequenceB: *, getController: getController}}
 */
window.dna.OrganizeNode.prototype = {
    /**
     *
     * @param node
     * @param positionA
     * @param positionB
     */
    addNode: function (node, positionA, positionB) {
        this.addNodeController(new window.dna.NodeController(node, positionA, positionB));
    },

    /**
     * @description organize
     */
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
    /**
     *
     * @returns {window.dna.NodeController}
     */
    getController: function () {
        if (arguments && arguments.length > 0) {
            if (arguments.length > 1) {
                return this.controllers[arguments[0] + "-" + arguments[1]];
            } else {
                return this.controllers[this.getValuePosController(arguments[0])];
            }
        }
    },
    /**
     *
     * @returns [window.dna.NodeController]
     */
    getArrayMaxNodeControllerSemiGlobal: function () {

        var arrayMax = [];

        var nodes = this.matrix.nodes;
        var i = 0;
        /**
         *
         * @type {window.dna.Node}
         */
        var node = null;


        for (i = 0; i < nodes.length; i++) {
            node = nodes[i][nodes[0].length - 1];
            if (arrayMax.length === 0) {
                arrayMax.push(node);
            } else {
                if (parseInt(arrayMax[0].value) === parseInt(node.value)) {
                    arrayMax.push(node);
                } else if (parseInt(arrayMax[0].value) < parseInt(node.value)) {
                    arrayMax = [];
                    arrayMax.push(node);
                }
            }
        }
        for (i = 0; i < nodes[0].length; i++) {
            node = nodes[nodes.length - 1][i];
            if (arrayMax.length === 0) {
                arrayMax.push(node);
            } else {
                if (parseInt(arrayMax[0].value) === parseInt(node.value)) {
                    arrayMax.push(node);
                } else if (parseInt(arrayMax[0].value) < parseInt(node.value)) {
                    arrayMax = [];
                    arrayMax.push(node);
                }
            }
        }


        return arrayMax;
    }

};

/**
 *
 * @type {OrganizeNode}
 */
//window.dna.OrganizeNode = OrganizeNode;

//})(window, window.dna);