/**
 * Created by samuel on 17/06/14.
 */
if (!window.dna) window.dna = {};

(function( window ) {

    var InputAlignGlobalLocal = new Class( {
        Extends : window.dna.InputAlign,
        initialize: function() {

        },
        gap : null,
        match : null,
        misMatch : null
    });


    window.dna.InputAlignGlobalLocal = InputAlignGlobalLocal;

})(window);