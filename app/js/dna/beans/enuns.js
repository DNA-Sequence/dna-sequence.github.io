/**
 * Created by samuel on 17/06/14.
 */
if(!window.dna) window.dna = {};
(function( window ) {

    var Connected = {
        /**
         * &#8593; north
         */
        N : "N",
        /**
         * &#8592; west
         */
        W : "W",
        /**
         * &#8595; south
         */
        S : "S",
        /**
         * &#8594; east
         */
        E : "E",
        /**
         *
         * &#8598; northwest
         */
        NW : "NW",
        /**
         * &#8599; northeast
         */
        NE : "NE",
        /**
         * &#8600; southeast
         */
        SE : "SE",
        /**
         * &#8601; southwest
         */
        SW : "SW"
    };

    var MethodSequencing = {
        /**
         * NEEDLEMAN-WUNSCH
         */
        GLOBAL: "GLOBAL",
        /**
         * SMITH-WATERMAN
         */
        LOCAL : "LOCAL"
    };

    var TypeElement = {
        PROTEIN :"PROTEIN",
        NUCLEOTIDE : "NUCLEOTIDE"
    };

    window.dna.Connected = Connected;
    window.dna.MethodSequencing = MethodSequencing;
    window.dna.TypeElement = TypeElement;

})(window);



