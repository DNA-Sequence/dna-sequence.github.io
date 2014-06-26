/**
 * Created by samuel on 17/06/14.
 */
if (!window.dna) window.dna = {};

(function( window ) {

    var Node = new Class({
        initialize : function() {

        },
        value : null,
        connected : [],
        candidate : false,
        x : null,
        y : null,
        charSeqA: null,
        charSeqB : null
    });

    window.dna.Node = Node;

})(window);