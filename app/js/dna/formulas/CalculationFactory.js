/**
 * Created by samuel on 17/06/14.
 */
/**
 * Created by samuel on 17/06/14.
 */
if (!window.dna) window.dna = {};

(function( window ) {

    var CalculationFactory = {
        createCalculation : createCalculation
    };

    function createCalculation(inputAlign) {
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

    window.dna.CalculationFactory = CalculationFactory;

})(window);