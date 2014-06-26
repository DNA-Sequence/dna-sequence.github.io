/**
 * Created by samuel on 18/06/14.
 */

var teste2 = new dna.InputAlignGlobalLocal();

teste2.id = 2;
teste2.typeElement = "PROTEINA";
teste2.sequenceA = "samuel";
teste2.sequenceB = "SSamuel";
teste2.methodSequencing = "GLOBAL";
teste2.gap = -1;
teste2.match = 2;
teste2.misMatch = -2;

var calculation = dna.CalculationFactory.createCalculation(teste2);

calculation.calculationNode();
calculation.findAligns();
