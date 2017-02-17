// Values for the Data Plot, they can also be obtained from a external file
//1x250 data sets.generally periodic wave forms need to be generated.
var sample1 =  periodicWave(10,"square", 2);
var sample2 =  periodicWave(50,"square", 8);


var expectedResult = generateExpectedResult([sample1,sample2]);

$(function(){
    init("#wave_first", [sample1]);
    init("#wave_second", [sample2]);
    plotResult();
    $('button').click(shift);
});


